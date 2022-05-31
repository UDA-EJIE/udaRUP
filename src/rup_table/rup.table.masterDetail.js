/**
 * Módulo que permite toda la seleción simple
 *
 * @summary 		Extensión del componente RUP Datatable
 * @module			"rup.table.masterDetail"
 * @version     1.0.0
 * @license
 * Licencia con arreglo a la EUPL, Versión 1.1 exclusivamente (la «Licencia»);
 * Solo podrá usarse esta obra si se respeta la Licencia.
 * Puede obtenerse una copia de la Licencia en
 *
 *      http://ec.europa.eu/idabc/eupl.html
 *
 * Salvo cuando lo exija la legislación aplicable o se acuerde por escrito,
 * el programa distribuido con arreglo a la Licencia se distribuye «TAL CUAL»,
 * SIN GARANTÍAS NI CONDICIONES DE NINGÚN TIPO, ni expresas ni implícitas.
 * Véase la Licencia en el idioma concreto que rige los permisos y limitaciones
 * que establece la Licencia.
 * @copyright   Copyright 2018 E.J.I.E., S.A.
 *
 */

/*global define */
/*global jQuery */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery', 'datatables.net'], function ($) {
            return factory($, window, document);
        });
    } else if (typeof exports === 'object') {
        // CommonJS
        module.exports = function (root, $) {
            if (!root) {
                root = window;
            }

            if (!$ || !$.fn.dataTable) {
                $ = require('datatables.net')(root, $).$;
            }

            return factory($, root, root.document);
        };
    } else {
        // Browser
        factory(jQuery, window, document);
    }
}(function ($, window, document, undefined) {
    'use strict';
    var DataTable = $.fn.dataTable;


    // Version information for debugger
    DataTable.masterDetail = {};

    DataTable.masterDetail.version = '1.2.4';

    /**
	 * Se inicializa el componente select
	 *
	 * @name init
	 * @function
	 * @since UDA 3.4.0 // Table 1.0.0
	 * 
	 * @param {object} dt - Es el objeto table.
	 *
	 */
    DataTable.masterDetail.init = function (dt) {
        var ctx = dt.settings()[0];
        //se crear el hidden en el formulario. 
        let masterPKInputId = '#' + ctx.sTableId + '_filter_masterPK';
        var $hiddenPKMaster = $(masterPKInputId);

        if ($hiddenPKMaster.length === 0) {
            const msgError = jQuery.rup.i18nTemplate(jQuery.rup.i18n.base, 'rup_table.errors.noMasterPKField.msg', ctx.oInit.filter.$filterContainer.attr('id'), masterPKInputId);
            $.rup_messages('msgError', {
                title: jQuery.rup.i18nTemplate(jQuery.rup.i18n.base, 'rup_table.errors.noMasterPKField.title'),
                message: msgError
            });
            throw msgError;
        }

        var rowsBody = $(ctx.oInit.masterDetail.master + ' > tbody');

        var tableMaster = $(ctx.oInit.masterDetail.master).DataTable();

        //Se edita el row/fila.
        rowsBody.on('click.DT', 'tr:not(.group)', function () {
            //var tableMaster = $(ctx.oInit.masterDetail.master).DataTable();
            var rowSelected = tableMaster.rows('.selected').indexes();
            if (rowSelected[0] !== undefined) { //Se ha deseleccionado, no entrar.
                var row = tableMaster.rows(rowSelected).data();
                var id = DataTable.Api().rupTable.getIdPk(row[0], tableMaster.context[0].oInit);
                $hiddenPKMaster.data('nid',row[0].nid);
                $hiddenPKMaster.val('' + id);
                $('#' + ctx.sTableId + '_filter_filterButton').click();
            } else { //se deselecciona
                _deselectMaster(dt, ctx, $hiddenPKMaster);
            }

        });

        //Se filtra.
        tableMaster.on('tableAfterReorderData', function () {
            var multi = tableMaster.context[0].multiselection;
            if (multi.selectedIds.length === 0) {
                _deselectMaster(dt, ctx, $hiddenPKMaster);
            } else {
                $hiddenPKMaster.val('' + multi.selectedIds[0]);
                $('#' + ctx.sTableId + '_filter_filterButton').click();
            }

        });

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Local functions
	 */

    function _deselectMaster(dt, ctx, $hiddenPKMaster) {
        $hiddenPKMaster.val('-1');
        $hiddenPKMaster.data('nid',undefined);
        $('#' + ctx.sTableId + ' > tbody tr').remove();
        var asStripeClasses = ctx.asStripeClasses;
        var iStripes = asStripeClasses.length;
        var numberVisibles = dt.columns().responsiveHidden().reduce(function (a, b) {
            return b === true ? a + 1 : a;
        }, 0);
        var $tr = $('<tr></tr>', {
            'class': iStripes ? asStripeClasses[0] : ''
        })
            .append($('<td></td>', {
                'valign': 'top',
                'colSpan': numberVisibles,
                'class': ctx.oClasses.sRowEmpty
            }).html(ctx.oLanguage.sZeroRecords))[0];
        $('#' + ctx.sTableId + ' > tbody').append($tr);
        ctx.seeker.search.$searchRow.hide();
        $('#' + ctx.sTableId + 'addButton_1').prop('disabled', true);
        DataTable.Api().select.deselect(ctx);
    }

    /**
	 * Devuelve un objeto json con la clave primaria del registro correspondiente de la tabla maestra.
	 *
	 * @function getMasterTablePkObject
	 * @param {object} options - Opciones de configuración de la acción de inserción.
	 * @return {object} - Objeto json con la clave primaria del registro correspondiente de la tabla maestra
	 *
	 */
    function _getMasterTablePkObject(ctx) {

        var masterPkValue = $('#' + ctx.sTableId+'_filter_masterPK').val();
        var masterPkName = ctx.oInit.masterDetail.masterPrimaryKey;

        function nestJSON(key, value) {
            var retObj = {};
            var splitedKey = key.split('.');
            if (splitedKey.length === 1) {
                retObj[key] = value;
                return retObj;
            } else {
                retObj[splitedKey[0]] = nestJSON(key.substr(key.indexOf('.') + 1), value);
                return retObj;
            }
        }
        //Inicio compatibilidad con masterPrimaryKey compuestas
        if (Array.isArray(masterPkName) && masterPkName.length > 0 && (masterPkValue !== undefined)) {
            var multiplePkToken = ctx.oInit.masterDetail.multiplePkToken;
            var splitedMasterPkValue = masterPkValue.split(multiplePkToken);
            var retPkObj = {};
            if (splitedMasterPkValue.length === masterPkName.length) {
                $.each(masterPkName, function (index, value) {
                    jQuery.extend(true, retPkObj, nestJSON(value, splitedMasterPkValue[index]));
                });
            }
            return retPkObj;
            //Fin compatibilidad con masterPrimaryKey compuestas
        } else {
            if (masterPkValue !== undefined) {
                return nestJSON(masterPkName, masterPkValue);
            } else if (masterPkValue === undefined) {
                return null;
            }
        }
    }

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * DataTables selectors
	 */


    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * DataTables API
	 *
	 * For complete documentation, please refer to the docs/api directory or the
	 * DataTables site
	 */

    // Local variables to improve compression
    var apiRegister = DataTable.Api.register;

    apiRegister('masterDetail()', function () {
        return this.iterator('table', function (ctx) {
            DataTable.masterDetail.init(new DataTable.Api(ctx));
        });
    });

    apiRegister('masterDetail.getMasterTablePkObject()', function (ctx) {
        return _getMasterTablePkObject(ctx);
    });


    // Common events with suitable namespaces
    function namespacedEvents(config) {
        var unique = config._eventNamespace;

        return 'draw.dt.DT' + unique + ' select.dt.DT' + unique + ' deselect.dt.DT' + unique;
    }


    /* * * ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Initialisation
	 */

    // DataTables creation - check if select has been defined in the options. Note
    // this required that the table be in the document! If it isn't then something
    // needs to trigger this method unfortunately. The next major release of
    // DataTables will rework the events and address this.
    $(document).on('preInit.dt.dtSelect', function (e, ctx) {
        if (e.namespace !== 'dt') {
            return;
        }
        if (ctx.oInit.masterDetail !== undefined) {
            DataTable.masterDetail.init(new DataTable.Api(ctx));
        }
    });


    return DataTable.masterDetail;
}));