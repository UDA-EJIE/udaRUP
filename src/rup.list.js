/* eslint-env jquery,amd */
/*!
 * @author Lander Laparra
 */

/**
 * Presenta los elementos que presenta una tabla rup_table en formato listado. Pensado para movilidad.
 *
 * @summary Componente RUP List.
 * @module rup_list
 * @example
 * $('#rup-list').rup_list({
 *      action: '/demo/list/filter',
 *      filterForm: 'listFilterForm',
 *      feedback: 'rup-list-feedback',
 *      visiblePages: 3,
 *      key: 'codigoPK',
 *      selectable: {
 *          multi: true,
 *          selector: '.list-item'
 *      },
 *      sidx: {
 *          source: [{
 *              value: 'USUARIO',
 *              i18nCaption: 'Usuario'
 *          }, {
 *              value: 'EDAD',
 *              i18nCaption: 'Edad'
 *          }, {
 *              value: 'CODCLIENTE',
 *              i18nCaption: 'Codigo cliente'
 *          }],
 *          value: 'EDAD,USUARIO'
 *      },
 *      rowNum: {
 *          source: [{
 *              value: '5',
 *              i18nCaption: 'Cinco'
 *          }, {
 *              value: '10',
 *              i18nCaption: 'Diez'
 *          }, {
 *              value: '20',
 *              i18nCaption: 'Veinte'
 *          }],
 *          value: '5'
 *      },
 *      isMultiSort: true,
 *      modElement: (ev, item, json) => {
 *          var userVal = item.find('#usuario_value_' + json.codigoPK);
 *          userVal.text(userVal.text() + ' :D');
 *      },
 *      load: () => {}
 * });
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {

        // AMD. Register as an anonymous module.
        define(['jquery', 'rup.base', 'rup.button'], factory);
    } else {

        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    $.widget('$.rup_list', {
        options: {
            filterForm: null,
            action: null,
            feedback: null,
            key: null,
            colNames: {
                source: [],
                value: null
            },
            rowNum: {
                source: [{
                    value: '5',
                    i18nCaption: '5'
                }, {
                    value: '10',
                    i18nCaption: '10'
                }, {
                    value: '20',
                    i18nCaption: '20'
                }, {
                    value: '30',
                    i18nCaption: '30'
                }],
                value: '5'
            },
            page: 1,
            sidx: {
                source: [],
                value: null
            },
            sord: 'asc',
            visiblePages: 5,
            createFooter: true,
            modElement: () => {},
            load: function () {}
        },

        /**
         * Método interno para cambiar el valor de algunas opciones
         * 
         * @name _changeOption
         * @function
         * @param {String} key 
         * @param {*} value 
         */
        _changeOption: function (key, value) {
            var opciones = this.options;
            switch (key) {
            case 'rowNum':
                opciones.rowNum.value = value;
                opciones.page = 1;
                this.reload();
                break;
            case 'page':
                opciones.page = value;
                this.reload();
                break;
            case 'sidx':
                opciones.sidx.value = value;
                opciones.page = 1;
                this.reload();
                break;
            case 'sord':
                opciones.sord = value;
                opciones.page = 1;
                this.reload();
                break;
            }
        },

        /**
         * Método interno que valida que el esqueleto html es válido para el componente
         * @name _validateSkeleton
         * @function
         */
        _validateSkeleton: function () {
            var id = this.element.attr('id');
            if (this.options.selectable && this.options.selectable.multi) {
                return $('#' + id + '-header-selectables').length;
            }
            return $('#' + id + '-content').length &&
                $('#' + id + '-header').length &&
                $('select').filter(function () {
                    return this.id == (id + '-header-rowNum');
                }).length &&
                $('select').filter(function () {
                    return this.id == (id + '-header-sidx');
                }).length &&
                $('button, a').filter(function () {
                    return this.id == (id + '-header-sord');
                }).length &&
                $('nav, div').filter(function () {
                    return this.id == (id + '-header-nav');
                }).length &&
                $('#' + id + '-itemTemplate').length;
        },

        /**
         * Método interno que configura el componente
         * @name _create
         * @function
         */
        _create: function () {
            global.initRupI18nPromise.then(() => {
                const self = this;
                const selfId = self.element.attr('id');

                if (!self._validateSkeleton()) {
                    $.rup_messages('msgAlert', {
                        title: 'Esqueleto no válido',
                        message: 'El esqueleto HTML sobre el que montar el listado no es correcto'
                    });
                    return;
                }

                var opciones = self.options;

                // Si el número de páginas visibles se ha definido menor que 3 se eleva a 3 que es el mínimo
                opciones.visiblePages = opciones.visiblePages < 3 ? 3 : opciones.visiblePages;

                /**
                 * CONTENT
                 */
                opciones._idContent = selfId + '-content';
                opciones._content = $('#' + opciones._idContent);
                opciones._content.addClass('rup_list-content');

                /**
                 * OVERLAY (Lock & Unlock)
                 */
                opciones._idOverlay = selfId + '-overlay';
                opciones._overlay = jQuery('<div id="' + opciones._idOverlay + '"><div class="loader"></div></div>');
                opciones._overlay.addClass('rup_list-overlay');

                /**
                 * FEEDBACK
                 */
                opciones.feedback = $('#' + opciones.feedback).rup_feedback({
                    gotoTop: false
                });
                opciones.feedback.addClass('rup_list-feedback');

                /**
                 * TEMPLATE
                 */
                opciones._idItemTemplate = selfId + '-itemTemplate';
                opciones._itemTemplate = $('#' + opciones._idItemTemplate);
                opciones._itemTemplate.addClass('rup_list-itemTemplate');

                /**
                 * HEADER
                 */
                // HEADER ELEMENTS IDs MAP
                opciones._idListHeader = {};
                opciones._idListHeader.header = selfId + '-header';
                opciones._idListHeader.pagenav = selfId + '-header-nav';
                opciones._idListHeader.pagePrev = selfId + '-header-page-prev';
                opciones._idListHeader.pageNext = selfId + '-header-page-next';
                opciones._idListHeader.pagenav = selfId + '-header-nav';
                opciones._idListHeader.rowNum = selfId + '-header-rowNum';
                opciones._idListHeader.sidx = selfId + '-header-sidx';
                opciones._idListHeader.sord = selfId + '-header-sord';
                opciones._idListHeader.selectables = selfId + '-header-selectables';
                // HEADER $OBJECTS MAP
                opciones._header = {};
                opciones._header.obj = $('#' + opciones._idListHeader.header);
                opciones._header.pagenav = $('#' + opciones._idListHeader.pagenav);
                opciones._header.pagePrev = $('#' + opciones._idListHeader.pagePrev);
                opciones._header.pageNext = $('#' + opciones._idListHeader.pageNext);
                opciones._header.rowNum = $('#' + opciones._idListHeader.rowNum);
                opciones._header.sidx = $('#' + opciones._idListHeader.sidx);
                opciones._header.sord = $('#' + opciones._idListHeader.sord);
                opciones._header.selectables = $('#' + opciones._idListHeader.selectables);
                // HEADER $OBJECTS CLASS ASSIGNMENT
                opciones._header.obj.addClass('rup_list-header');
                opciones._header.pagenav.addClass('rup_list-header-nav');
                opciones._header.pagePrev.addClass('rup_list-header-page-prev');
                opciones._header.pageNext.addClass('rup_list-header-page-next');
                opciones._header.rowNum.addClass('rup_list-header-rowNum');
                opciones._header.sidx.addClass('rup_list-header-sidx');
                opciones._header.sord.addClass('rup_list-header-sord');
                opciones._header.selectables.addClass('rup_list-header-selectables');

                if (opciones.createFooter) {
                    var footerHTML = $('<div>').append(opciones._header.obj.clone()).html().replace(/header/g, 'footer');
                    $('#' + selfId).after(footerHTML);
                }

                /**
                 * FOOTER
                 */
                // FOOTER ELEMENTS IDs MAP
                opciones._idListFooter = {};
                opciones._idListFooter.footer = selfId + '-footer';
                opciones._idListFooter.pagenav = selfId + '-footer-nav';
                opciones._idListFooter.pagePrev = selfId + '-footer-page-prev';
                opciones._idListFooter.pageNext = selfId + '-footer-page-next';
                opciones._idListFooter.rowNum = selfId + '-footer-rowNum';
                opciones._idListFooter.sidx = selfId + '-footer-sidx';
                opciones._idListFooter.sord = selfId + '-footer-sord';
                opciones._idListFooter.selectables = selfId + '-footer-selectables';
                // FOOTER $OBJECTS MAP
                opciones._footer = {};
                opciones._footer.obj = $('#' + opciones._idListFooter.footer);
                opciones._footer.pagenav = $('#' + opciones._idListFooter.pagenav);
                opciones._footer.pagePrev = $('#' + opciones._idListFooter.pagePrev);
                opciones._footer.pageNext = $('#' + opciones._idListFooter.pageNext);
                opciones._footer.rowNum = $('#' + opciones._idListFooter.rowNum);
                opciones._footer.sidx = $('#' + opciones._idListFooter.sidx);
                opciones._footer.sord = $('#' + opciones._idListFooter.sord);
                opciones._footer.selectables = $('#' + opciones._idListFooter.selectables);
                // FOOTER $OBJECTS CLASS ASSIGNMENT
                opciones._footer.obj.addClass('rup_list-footer');
                opciones._footer.pagenav.addClass('rup_list-footer-nav');
                opciones._footer.pagePrev.addClass('rup_list-footer-page-prev');
                opciones._footer.pageNext.addClass('rup_list-footer-page-next');
                opciones._footer.rowNum.addClass('rup_list-footer-rowNum');
                opciones._footer.sidx.addClass('rup_list-footer-sidx');
                opciones._footer.sord.addClass('rup_list-footer-sord');
                opciones._footer.selectables.addClass('rup_list-footer-selectables');

                /**
                 * ROWNUM
                 */ 
                self._rownumInit.apply(self);

                /**
                 * SORT - MULTISORT
                 */
                if (!opciones.isMultiSort) {
                    // Sidx select to rup-combo
                    self._sidxComboInit.apply(self);
                    // Inicialización sord
                    self._sordButtonInit(self);
                } else {
                    // Inicialización del multisort
                    self._multisortInit.apply(self);
                }

                // Asociación de eventos
                $('#' + self.element[0].id).on('load', opciones.load);
                $('#' + self.element[0].id).on('modElement', (e, item, json) => {
                    opciones.modElement(e, item, json);
                    self.element.append(item);
                });

                /**
                 * PAGENAV
                 */
                self._pagenavInit.apply(self);

                //Gestion de multiselección
                if (opciones.selectable) {
                    $(opciones.selectable.selector).attr('rup-list-selector', 'enabled');
                    $('[rup-list-selector="enabled"]').click(function (e) {
                        let clickedElemIdArr = e.currentTarget.id.split('_');
                        let clickedPK = clickedElemIdArr[clickedElemIdArr.length - 1];
                        if (opciones.multiselection.selectedIds == null) {
                            opciones.multiselection.selectedIds = [];
                        }
                        if (opciones.multiselection.selectedRowsPerPage == null) {
                            opciones.multiselection.selectedRowsPerPage = [];
                        }
                        if (opciones.multiselection.selectedIds.includes(clickedPK)) {
                            let index = opciones.multiselection.selectedIds.indexOf(clickedPK);
                            opciones.multiselection.selectedIds.splice(index, 1);
                            opciones.multiselection.selectedRowsPerPage = opciones.multiselection.selectedRowsPerPage.filter(elem =>
                                elem.id != self.element[0].id + '-itemTemplate_' + clickedPK
                            );
                            $('#' + self.element[0].id + '-itemTemplate_' + clickedPK).removeClass('list-item-selected');
                        } else {
                            if (!opciones.selectable.multi) {
                                opciones.multiselection.selectedAll = false;
                                opciones.multiselection.selectedIds = [];
                                opciones.multiselection.selectedRowsPerPage = [];
                            }
                            opciones.multiselection.selectedRowsPerPage.push({
                                id: self.element[0].id + '-itemTemplate_' + clickedPK,
                                line: (function () {
                                    let cont = 0;
                                    let final = 0;
                                    self.element.children().toArray().forEach(element => {
                                        if (element.id == self.element.id + '-itemTemplate_' + clickedPK) {
                                            final = cont;
                                        }
                                        cont++;
                                    });
                                    return final;
                                })(),
                                page: opciones.page
                            });
                            opciones.multiselection.selectedIds.push(clickedPK);
                            $('#' + self.element[0].id + '-itemTemplate_' + clickedPK).addClass('list-item-selected');
                        }
                        if (opciones.multiselection.selectedIds.length == 0) {
                            opciones.multiselection.selectedIds = null;
                        }
                        if (opciones.multiselection.selectedRowsPerPage.length == 0) {
                            opciones.multiselection.selectedRowsPerPage = null;
                        }
                    });
                    opciones.multiselection = {
                        selectedIds: null,
                        selectedAll: false,
                        selectedRowsPerPage: null
                    };
                    self._generateSelectablesBtnGroup();
                }

                $('#' + opciones._idItemTemplate).hide();
                $('#' + self.element[0].id).trigger('initComplete');
            });
        },

        /**
         * Método interno que configura el boton de alternar el sord en la ordenación simple
         * @name _sordButtonInit
         * @function
         */
        _sordButtonInit: function () {
            const self = this;
            const opciones = self.options;

            var sordH = opciones._header.sord.find('i');
            var sordF = opciones._footer.sord.find('i');
            if (opciones.sord === 'asc') {
                sordH.addClass('fa-sort-amount-asc');
                sordF.addClass('fa-sort-amount-asc');
                sordH.removeClass('fa-sort-amount-desc');
                sordF.removeClass('fa-sort-amount-desc');
            } else {
                sordH.addClass('fa-sort-amount-desc');
                sordF.addClass('fa-sort-amount-desc');
                sordH.removeClass('fa-sort-amount-asc');
                sordF.removeClass('fa-sort-amount-asc');
            }
            // Funcionamiento botón sord
            $('#' + opciones._idListHeader.sord + ', #' + opciones._idListFooter.sord).on('click', function () {
                sordH.toggleClass('fa-sort-amount-asc');
                sordH.toggleClass('fa-sort-amount-desc');
                sordF.toggleClass('fa-sort-amount-asc');
                sordF.toggleClass('fa-sort-amount-desc');
                self._changeOption('sord', sordH.hasClass('fa-sort-amount-asc') ? 'asc' : 'desc');
            });
        },

        /**
         * Método interno que configura el combo de seleccion de sidx en la ordenación simple
         * @name _sidxComboInit
         * @function
         */
        _sidxComboInit: function () {
            const self = this;
            const opciones = self.options;

            var sidxRupConf = {
                source: opciones.sidx.source,
                width: 'initial',
                selected: opciones.sidx.value,
                rowStriping: true,
                ordered: false,
                change: function () {
                    if (!$('#' + this.id).rup_combo('isDisabled')) {
                        opciones._header.sidx.rup_combo('disable');
                        opciones._footer.sidx.rup_combo('disable');
                        opciones._header.sidx.rup_combo('setRupValue', $('#' + this.id).rup_combo('getRupValue'));
                        opciones._footer.sidx.rup_combo('setRupValue', $('#' + this.id).rup_combo('getRupValue'));
                        self._changeOption('sidx', $('#' + this.id).rup_combo('getRupValue'));
                        opciones._header.sidx.rup_combo('enable');
                        opciones._footer.sidx.rup_combo('enable');
                    }
                }
            };
            opciones._header.sidx.rup_combo(sidxRupConf);
            opciones._header.sidx = $('#' + opciones._idListHeader.sidx);
            opciones._footer.sidx.rup_combo(sidxRupConf);
            opciones._footer.sidx = $('#' + opciones._idListFooter.sidx);
        },

        /**
         * Método interno que configura los elementos de la multiordenación.
         * @name _multisortInit
         * @function
         */
        _multisortInit: function () {
            const self = this;
            const opciones = self.options;

            // Creamos un apartado en opciones
            opciones.multiorder = {
                sidx: opciones.sidx.value,
                sord: (() => {
                    if(opciones.sord){
                        let sordArr = opciones.sord.split(',');
                        let sidxArr = opciones.sidx.value.split(',');
                        if(sordArr.length == sidxArr.length){
                            return opciones.sord;
                        }
                        if(sordArr.length > sidxArr.length){
                            return sordArr.splice(0, sidxArr.length).join(',');
                        }
                        if(sordArr.length < sidxArr.length){
                            let diff = sidxArr.length - sordArr.length;
                            for(let i = 0; i<diff; i++) {
                                sordArr.push('asc');
                            }
                            return sordArr.join(',');
                        }
                    } else {
                        let sordArr = [];
                        for(let i = 0; i < opciones.sidx.value.split(',').length; i++) {
                            sordArr.push('asc');
                        }
                        return sordArr.join(',');
                    }
                })()
            };
            // Generamos un span para el resumen
            var $spanResumen = $('<ul class="rup_list-multiorder-summary"/>');
            opciones._header.sidx.wrap('<div class="tmp-orderchange"/>');
            opciones._footer.sidx.wrap('<div class="tmp-orderchange"/>');
            $('.tmp-orderchange').children().remove();
            $('.tmp-orderchange').append($spanResumen.clone());
            $('.rup_list-multiorder-summary').unwrap();
            let $summaryMultiOrder = $('<li class="badge badge-pill badge-primary"/>');
            opciones.multiorder.sidx.split(',').map((e) => {
                return e.trim();
            }).forEach((e, i) => {
                let $tmpSum = $summaryMultiOrder.clone();
                let geti18n = (val) => {
                    let srcVal = opciones.sidx.source.filter(x => x.value == val);
                    return srcVal[0].i18nCaption;
                };
                let sordBadge = $('<span/>');
                sordBadge.text(' ');
                let arrSord = opciones.multiorder.sord.split(',').map((e) => {
                    return e.trim();
                });
                if (arrSord[i] == 'asc') {
                    sordBadge.addClass('mdi mdi-chevron-up');
                } else {
                    sordBadge.addClass('mdi mdi-chevron-down');
                }
                $tmpSum.append(geti18n(e)).append(sordBadge.clone());
                $('.rup_list-multiorder-summary').append($tmpSum.clone());
            });
            // Creamos el botón para el dialogo
            var $btnOrderDialog = $('<button class="rup_list-multiorder-dialogbtn"></button>');
            $btnOrderDialog.addClass('mdi mdi-pencil');
            opciones._header.sord.wrap('<div class="tmp-orderchange"></div>');
            opciones._footer.sord.wrap('<div class="tmp-orderchange"></div>');
            $('.tmp-orderchange').children().remove();
            $('.tmp-orderchange').append($btnOrderDialog.clone());
            $('.rup_list-multiorder-dialogbtn').unwrap();
            //Creamos el dialogo
            var $multiorderDialog = $('<div id="multiorderDialog" class="rup_list-multiorder-dialog" style="display:none"></div>');
            $multiorderDialog.append('<div class="rup_list-multiorder-orderfields"></div>');
            $multiorderDialog.append('<div class="rup_list-multiorder-ordersort"></div>');
            $('body').append($multiorderDialog);
            //Creamos el contenido del diálogo
            opciones.sidx.source.forEach((el) => {
                let $btn = $('<button></button>');
                $btn.attr('ord-value', el.value);
                $btn.text(el.i18nCaption);
                $('.rup_list-multiorder-orderfields').append($btn.clone());
            });
            $('.rup_list-multiorder-orderfields').children().on('click', function (e) {
                self._actualizarOrdenMulti(e, $(this));
            }); // trigger('click', [btnobj, asc/desc])
            //Creamos el componente para el dialogo
            $('#multiorderDialog').rup_dialog({
                type: $.rup.dialog.DIV,
                autoOpen: false,
                modal: true,
                resizable: true,
                width: '90%',
                position: null,
                title: 'Multiordenación',
                buttons: [{
                    text: 'cerrar',
                    click: () => {
                        $('#multiorderDialog').rup_dialog('close');
                        self.element.rup_list('filter');
                    }
                }]
            });
            // Establecemos el boton para el dialogo
            $('.rup_list-multiorder-dialogbtn').click(() => {
                $('#multiorderDialog').rup_dialog('open');
            });
        },

        /**
         * Método interno que configura el combo de elementos de lista por página
         * @name _rownumInit
         * @function
         */
        _rownumInit: function () {
            const self = this;
            const opciones = self.options;

            var rowNumRupConf = {
                source: opciones.rowNum.source,
                width: 'initial',
                selected: opciones.rowNum.value,
                rowStriping: true,
                ordered: false,
                change: function () {
                    if (!$('#' + this.id).rup_combo('isDisabled')) {
                        if (this.id == 'rup-list-footer-rowNum' && !opciones._header.rowNum.rup_combo('isDisabled')) {
                            opciones._header.rowNum.rup_combo('setRupValue', $('#' + this.id).rup_combo('getRupValue'));
                            opciones._header.rowNum.rup_combo('disable');
                        }
                        if (this.id == 'rup-list-header-rowNum' && !opciones._footer.rowNum.rup_combo('isDisabled')) {
                            opciones._footer.rowNum.rup_combo('setRupValue', $('#' + this.id).rup_combo('getRupValue'));
                            opciones._footer.rowNum.rup_combo('disable');
                        }
                        self._changeOption('rowNum', $('#' + this.id).rup_combo('getRupValue'));
                        opciones._header.rowNum.rup_combo('enable');
                        opciones._footer.rowNum.rup_combo('enable');
                    }
                }
            };
            opciones._header.rowNum.rup_combo(rowNumRupConf);
            opciones._header.rowNum = $('#' + opciones._idListHeader.rowNum);
            opciones._footer.rowNum.rup_combo(rowNumRupConf);
            opciones._footer.rowNum = $('#' + opciones._idListFooter.rowNum);
        },

        /**
         * Método interno que configura el nav de la paginación
         * @name _pagenavInit
         * @function
         */
        _pagenavInit: function () {
            const self = this;
            const opciones = self.options;

            var onPageChange = (elem) => {
                if ($(elem).is('.disabled')) {
                    return false;
                }
                let maxpage = $('.page').eq(-1).attr('data-page');
                let actualPage = opciones._header.pagenav.find('.page-item.page.active').attr('data-page');
                if (actualPage == 1) {
                    opciones._header.pagePrev.addClass('disabled');
                    opciones._footer.pagePrev.addClass('disabled');
                    opciones._header.pageNext.removeClass('disabled');
                    opciones._footer.pageNext.removeClass('disabled');
                    return true;
                }
                if (actualPage == maxpage) {
                    opciones._header.pagePrev.removeClass('disabled');
                    opciones._footer.pagePrev.removeClass('disabled');
                    opciones._header.pageNext.addClass('disabled');
                    opciones._footer.pageNext.addClass('disabled');
                    return true;
                }
                opciones._header.pagePrev.removeClass('disabled');
                opciones._footer.pagePrev.removeClass('disabled');
                opciones._header.pageNext.removeClass('disabled');
                opciones._footer.pageNext.removeClass('disabled');
                return true;
            };
            opciones._header.pagePrev.on('click', function () {
                if (!onPageChange(this)) {
                    return;
                }
                self._changeOption('page', opciones._header.pagenav.find('.page-item.page.active').prev('[data-page]').data('page'));
            });
            opciones._header.pageNext.on('click', function () {
                if (!onPageChange(this)) {
                    return;
                }
                self._changeOption('page', opciones._header.pagenav.find('.page-item.page.active').next('[data-page]').data('page'));
            });
            opciones._footer.pagePrev.on('click', function () {
                if (!onPageChange(this)) {
                    return;
                }
                self._changeOption('page', opciones._header.pagenav.find('.page-item.page.active').prev('[data-page]').data('page'));
            });
            opciones._footer.pageNext.on('click', function () {
                if (!onPageChange(this)) {
                    return;
                }
                self._changeOption('page', opciones._header.pagenav.find('.page-item.page.active').next('[data-page]').data('page'));
            });
        },

        /**
         * Método interno que crea la estructura de las líneas en la multiordenación
         * 
         * @name _actualizarOrdenMulti
         * @function
         * @param {Event} e 
         * @param {JQueryObj} self  Objeto JQuery del botón
         * @param {String} ord  Direccion de la ordenación con la que se va a generar la línea
         */
        _actualizarOrdenMulti: function (e, self, ord = 'asc') {
            var ctx = $(this)[0];
            var sortDiv = $('.rup_list-multiorder-ordersort');
            var opciones = ctx.options;
            // Añadimos las opciones al componente
            if (opciones.multiorder.sidx.length) {
                let tmpSidxArr = opciones.multiorder.sidx.split(',').map((e) => {
                    return e.trim();
                });
                tmpSidxArr.push(self.attr('ord-value'));
                let tmpSordArr = opciones.multiorder.sord.split(',').map((e) => {
                    return e.trim();
                });
                tmpSordArr.push(ord);
                opciones.multiorder.sidx = tmpSidxArr.join(',');
                opciones.multiorder.sord = tmpSordArr.join(',');
            }
            //Creamos la linea
            let $operateLine = $('<div></div>');
            $operateLine.attr('ord-value', self.attr('ord-value'));
            $operateLine.addClass('rup_list-ord-line');
            //Creamos los apartados de ordenacion, label y sord
            let $apOrd = $('<div></div>');
            $apOrd.addClass('rup_list-apord');
            let $labelOrd = $('<div class="rup_list-multiorder-label"></div>');
            $labelOrd.text(self.text());
            let $sord = $('<span></span>');
            $sord.addClass('rup_list-multi-sord badge badge-secondary mdi');
            $sord.attr('direction', ord);
            let $quitOrd = $('<span></span>');
            $quitOrd.addClass('mdi mdi-cancel');

            $operateLine.append($apOrd).append($labelOrd).append($sord).append($quitOrd);

            sortDiv.append($operateLine.clone());
            ctx._fnOrderOfOrderFields(ctx, $('[ord-value="' + self.attr('ord-value') + '"]', sortDiv));
            self.remove();

        },
        
        /**
         * Método interno que da funcionalidad a cada línea en la multiordenación
         * 
         * @name _fnOrderOfOrderFields
         * @function
         * @param {JQuery} ctx La instancia de rup_list
         * @param {JQuery} line Objeto JQuery de la línea a la que se va a dar funcionalidad
         */
        _fnOrderOfOrderFields: function (ctx, line) {
            //Creamos el groupButton
            var opciones = ctx.options;
            let $btnGroupOrd = $('<div></div>');
            $btnGroupOrd.addClass('btn-group');
            let $btnUp = $('<button></button>').addClass('mdi mdi-arrow-up');
            let $btnDown = $('<button></button>').addClass('mdi mdi-arrow-down');
            $btnGroupOrd.append($btnUp).append($btnDown);
            //Lo añadimos a la linea
            $('.rup_list-apord', line).append($btnGroupOrd.clone());
            //Función de guardado de la multiordenación
            var save = () => {
                opciones.multiorder = {
                    sidx: opciones.sidx.value,
                    sord: 'asc'
                };
                var sortDiv = $('.rup_list-multiorder-ordersort');
                let sidxArr = [];
                let sordArr = [];
                sortDiv.children().toArray().forEach((elem) => {
                    sidxArr.push($(elem).attr('ord-value'));
                    sordArr.push($('.rup_list-multi-sord', $(elem)).attr('direction'));
                });
                if (sidxArr.length > 0) {
                    opciones.multiorder.sidx = sidxArr.join(',');
                    opciones.multiorder.sord = sordArr.join(',');
                }
                //Crear el label de resumen
                let $summaryMultiOrder = $('<span class="badge badge-pill badge-primary"></span>');
                $('.rup_list-multiorder-summary').children().remove();
                opciones.multiorder.sidx.split(',').map((e) => {
                    return e.trim();
                }).forEach((e, i) => {
                    let $tmpSum = $summaryMultiOrder.clone();
                    let geti18n = (val) => {
                        let srcVal = opciones.sidx.source.filter(x => x.value == val);
                        return srcVal[0].i18nCaption;
                    };
                    let sordBadge = $('<span></span>');
                    sordBadge.text(' ');
                    let arrSord = opciones.multiorder.sord.split(',').map((e) => {
                        return e.trim();
                    });
                    if (arrSord[i] == 'asc') {
                        sordBadge.addClass('mdi mdi-chevron-up');
                    } else {
                        sordBadge.addClass('mdi mdi-chevron-down');
                    }
                    $tmpSum.append(geti18n(e)).append(sordBadge.clone());
                    $('.rup_list-multiorder-summary').append($tmpSum.clone());
                });

            };
            //funcionalidad del groupButton
            $('.mdi-arrow-up', line).click(function () {
                if (line.is(':first-child')) {
                    return;
                }
                line.prev().before(line);
                save();
            });
            $('.mdi-arrow-down', line).click(function () {
                if (line.is(':last-child')) {
                    return;
                }
                line.next().after(line);
                save();
            });
            //ponemos icono al sord
            if ($('.rup_list-multi-sord').attr('direction') == 'asc') {
                $('.rup_list-multi-sord').addClass('mdi-chevron-up');
            } else {
                $('.rup_list-multi-sord').addClass('mdi-chevron-down');
            }
            $('.rup_list-multi-sord').text(' ');
            //funcionalidad del sord
            $('.rup_list-multi-sord', line).off('click');
            $('.rup_list-multi-sord', line).click(() => {
                if ($('.rup_list-multi-sord', line).attr('direction') == 'asc') {
                    $('.rup_list-multi-sord', line).attr('direction', 'desc');
                    $('.rup_list-multi-sord', line).addClass('mdi-chevron-down');
                    $('.rup_list-multi-sord', line).removeClass('mdi-chevron-up');
                } else {
                    $('.rup_list-multi-sord', line).attr('direction', 'asc');
                    $('.rup_list-multi-sord', line).addClass('mdi-chevron-up');
                    $('.rup_list-multi-sord', line).removeClass('mdi-chevron-down');
                }
                save();
            });
            //funcionalidad de retirar la ordenación
            $('.mdi-cancel', line).click(() => {
                //recreamos el botón
                let $btn = $('<button></button>');
                $btn.attr('ord-value', line.attr('ord-value'));
                $btn.addClass('btn-material btn-material-sm btn-material-primary-low-emphasis');
                let text = ctx.options.sidx.source.filter(x => x.value == line.attr('ord-value'))[0].i18nCaption;
                $btn.text(text);
                $('.rup_list-multiorder-orderfields').append($btn.clone());
                $('.rup_list-multiorder-orderfields').children().off('click');
                $('.rup_list-multiorder-orderfields').children().on('click', function (e) {
                    ctx._actualizarOrdenMulti(e, $(this));
                });
                // Eliminamos la linea
                line.remove();
                save();
            });

            save();
        },

        /**
         * Método interno para seleccionar todos los elementos de la lista.
         * 
         * @name _selectAll
         * @function
         */
        _selectAll: function () {
            const self = this;
            const opciones = self.options;

            opciones.multiselection.selectedAll = true;
            opciones.multiselection.selectedIds = [];
            opciones.multiselection.selectedRowsPerPage = [];

            self._getPageIds().forEach((elem) => {
                opciones.multiselection.selectedIds.push(elem.split('_').pop());
                opciones.multiselection.selectedRowsPerPage.push({
                    id: elem,
                    line: (function () {
                        let cont = 0;
                        let final = 0;
                        self.element.children().toArray().forEach(element => {
                            if (element.id == elem) {
                                final = cont;
                            }
                            cont++;
                        });
                        return final;
                    })(),
                    page: opciones.page
                });
                $('#' + elem).addClass('list-item-selected');
            });
            $('#' + self.element[0].id).trigger('listAfterMultiselection');
        },

        /**
         * Método interno para deseleccionar todos los elementos de la lista
         * 
         * @name _deselectAll
         * @function
         */
        _deselectAll: function () {
            const self = this;
            const opciones = self.options;

            opciones.multiselection.selectedAll = false;
            opciones.multiselection.selectedIds = null;
            opciones.multiselection.selectedRowsPerPage = null;
            self._getPageIds().forEach((elem) => {
                $('#' + elem).removeClass('list-item-selected');
            });
            $('#' + self.element[0].id).trigger('listAfterMultiselection');
        },

        /**
         * Método interno para seleccionar todos los elementos en la página actual
         * 
         * @name _selectPage
         * @function
         */
        _selectPage: function () {
            const self = this;
            const opciones = self.options;

            if (opciones.multiselection.selectedIds == null) {
                opciones.multiselection.selectedIds = [];
            }
            if (opciones.multiselection.selectedRowsPerPage == null) {
                opciones.multiselection.selectedRowsPerPage = [];
            }
            if (opciones.multiselection.selectedAll == false) {
                self._getPageIds().forEach((arrElem) => {
                    let tmp = opciones.multiselection.selectedRowsPerPage.filter(x => x.id == arrElem);
                    if (tmp.length == 0) {
                        let id = arrElem.split('_').pop();
                        opciones.multiselection.selectedIds.push(id);
                        opciones.multiselection.selectedRowsPerPage.push({
                            id: arrElem,
                            line: (function () {
                                let cont = 0;
                                let final = 0;
                                self.element.children().toArray().forEach(element => {
                                    if (element.id == arrElem) {
                                        final = cont;
                                    }
                                    cont++;
                                });
                                return final;
                            })(),
                            page: opciones.page
                        });
                        $('#' + arrElem).addClass('list-item-selected');
                    }
                });
            } else {
                self._getPageIds().forEach((arrElem) => {
                    let tmp = opciones.multiselection.selectedRowsPerPage.fiter(x => x.id == arrElem);
                    if (tmp.length == 0) {
                        let id = arrElem.split('_').pop();
                        opciones.multiselection.selectedIds = opciones.multiselection.selectedIds.filter(z => z != id);
                        opciones.multiselection.selectedRowsPerPage = opciones.multiselection.selectedRowsPerPage.filter(z => z.id != arrElem);
                        $('#' + arrElem).addClass('list-item-selected');
                    }
                });
            }
            if (opciones.multiselection.selectedIds.length == 0) {
                opciones.multiselection.selectedIds = null;
            }
            if (opciones.multiselection.selectedRowsPerPage.length == 0) {
                opciones.multiselection.selectedRowsPerPage = null;
            }
            $('#' + self.element[0].id).trigger('listAfterMultiselection');
        },

        /**
         * Método interno para deseleccionar todos los elementos en la página actual
         * 
         * @name _deselectPage
         * @function
         */
        _deselectPage: function () {
            const self = this;
            const opciones = self.options;

            if (opciones.multiselection.selectedIds == null) {
                opciones.multiselection.selectedIds = [];
            }
            if (opciones.multiselection.selectedRowsPerPage == null) {
                opciones.multiselection.selectedRowsPerPage = [];
            }
            if (opciones.multiselection.selectedAll == false) {
                self._getPageIds().forEach((arrElem) => {
                    let tmp = opciones.multiselection.selectedRowsPerPage.filter(x => x.id == arrElem);
                    if (tmp.length > 0) {
                        let id = arrElem.split('_').pop();
                        opciones.multiselection.selectedIds = opciones.multiselection.selectedIds.filter(z => z != id);
                        opciones.multiselection.selectedRowsPerPage = opciones.multiselection.selectedRowsPerPage.filter(z => z.id != arrElem);
                        $('#' + arrElem).removeClass('list-item-selected');
                    }
                });
            } else {
                self._getPageIds().forEach((arrElem) => {
                    let tmp = opciones.multiselection.selectedRowsPerPage.filter(x => x.id == arrElem);
                    if (tmp.length == 0) {
                        let id = arrElem.split('_').pop();
                        opciones.multiselection.selectedIds.push(id);
                        opciones.multiselection.selectedRowsPerPage.push({
                            id: arrElem,
                            line: (function () {
                                let cont = 0;
                                let final = 0;
                                self.element.children().toArray().forEach(element => {
                                    if (element.id == arrElem) {
                                        final = cont;
                                    }
                                    cont++;
                                });
                                return final;
                            })(),
                            page: opciones.page
                        });
                    }
                    $('#' + arrElem).removeClass('list-item-selected');
                });
            }
            if (opciones.multiselection.selectedIds.length == 0) {
                opciones.multiselection.selectedIds = null;
            }
            if (opciones.multiselection.selectedRowsPerPage.length == 0) {
                opciones.multiselection.selectedRowsPerPage = null;
            }
            $('#' + self.element[0].id).trigger('listAfterMultiselection');
        },

        /**
         * Método interno que genera el desplegable de multiseleccion
         * 
         * @name _generateSelectablesBtnGroup
         * @function
         */
        _generateSelectablesBtnGroup: function () {
            const self = this;
            const selfId = self.element.attr('id');
            const opciones = self.options;

            let $btnGroup = $('<div></div>');
            $btnGroup.addClass('btn-group h-100').attr('role', 'group');
            let $displayButton = $('<button></button>');
            $displayButton.addClass('dropdown-toggle')
                .attr('id', selfId + '-display-selectables').attr('type', 'button')
                .attr('data-toggle', 'dropdown').attr('aria-haspopup', true)
                .attr('aria-expanded', false).text(opciones._header.selectables.text());
            let $menudiv = $('<div></div>').addClass('dropdown-menu').attr('aria-labelledby', selfId + '-display-selectables');

            let $selectPage = $('<a></a>').addClass('dropdown-item selectable-selectPage').text('Seleccionar la página actual');
            let $deselectPage = $('<a></a>').addClass('dropdown-item selectable-deselectPage').text('Deseleccionar la página actual');
            let $selectAll = $('<a></a>').addClass('dropdown-item selectable-selectAll').text('Seleccionar todo');
            let $deselectAll = $('<a></a>').addClass('dropdown-item selectable-deselectAll').text('Deseleccionar todo');

            $menudiv.append($selectPage).append($deselectPage).append($selectAll).append($deselectAll);

            $btnGroup.append($displayButton).append($menudiv);
            opciones._header.selectables.text('');
            opciones._header.selectables.append($btnGroup.clone());

            if (opciones.createFooter) {
                opciones._footer.selectables.text('');
                opciones._footer.selectables.append($btnGroup.clone());
            }

            //Creamos funcionalidad
            $('.selectable-selectAll').on('click', () => {
                self._selectAll.apply(self);
            });
            $('.selectable-deselectAll').on('click', () => {
                self._deselectAll.apply(self);
            });
            $('.selectable-selectPage').on('click', () => {
                self._selectPage.apply(self);
            });
            $('.selectable-deselectPage').on('click', () => {
                self._deselectPage.apply(self);
            });
        },

        /**
         * Método interno para obtener los Ids de la página actual
         * 
         * @name _getPageIds
         * @function
         */
        _getPageIds: function () {
            var self = this;
            var keys = [];
            $('#' + self.element[0].id).children().toArray().forEach((elem) => {
                keys.push($(elem)[0].id);
            });
            return keys;
        },

        /**
         * Método interno que otorga funcionalidad a la paginación
         * 
         * @name _pagenavManagement
         * @function
         * @param {Number} numPages Número total de páginas
         */
        _pagenavManagement: function (numPages) {
            var self = this;
            var opciones = this.options;
            var $pagenavH = opciones._header.pagenav;
            var $pagenavH_prev = opciones._header.pagePrev;
            var $pagenavH_next = opciones._header.pageNext;
            var $pagenavF = opciones._footer.pagenav;
            var $pagenavF_prev = opciones._footer.pagePrev;
            var $pagenavF_next = opciones._footer.pageNext;

            // Si el número de páginas a mostrar es superior a las configuradas como visibles hay que mostrar el separador
            if (numPages > opciones.visiblePages + 1) {
                // Mostrar las páginas visibles antes del separador
                var initPage = 1;
                var endPage = 1;
                if (opciones.page >= opciones.visiblePages) {
                    if (opciones.page + opciones.visiblePages - 1 > numPages) {
                        initPage = numPages - opciones.visiblePages + 1;
                    } else {
                        initPage = opciones.page - 1;
                    }

                    // Se añade la página inicial
                    var page = '<li data-page="' + 1 + '" class="page-item page"><a class="page-link" href="javascript:void(0)">' + 1 + '</a></li>';
                    $pagenavH.find('.page-separator:first').before(page);
                    $pagenavF.find('.page-separator:first').before(page);

                    if (opciones.page - opciones.visiblePages > 0) {
                        // Mostrar el separador de inicio
                        $pagenavH.find('.page-separator:first').show();
                        $pagenavF.find('.page-separator:first').show();
                    }
                }
                endPage = initPage + opciones.visiblePages < numPages ? initPage + opciones.visiblePages : numPages + 1;
                for (var i = initPage; i < endPage; i++) {
                    let page = '<li data-page="' + i + '" class="page-item page"><a class="page-link" href="javascript:void(0)">' + i + '</a></li>';
                    $pagenavH.find('.page-separator:last').before(page);
                    $pagenavF.find('.page-separator:last').before(page);
                }

                if (opciones.page + opciones.visiblePages - 1 < numPages) {
                    // Mostrar el separador de fin
                    $pagenavH.find('.page-separator:last').show();
                    $pagenavF.find('.page-separator:last').show();
                }

                if (endPage < numPages) {
                    // Añadir el número de la página final
                    let page = '<li data-page="' + numPages + '" class="page-item page"><a class="page-link" href="javascript:void(0)">' + numPages + '</a></li>';
                    $pagenavH.find('.page-separator:last').after(page);
                    $pagenavF.find('.page-separator:last').after(page);
                }
            } else {
                // Añadir todas las páginas al nav
                for (let i = numPages; i > 0; i--) {
                    let page = '<li data-page="' + i + '" class="page-item page"><a class="page-link" href="javascript:void(0)">' + i + '</a></li>';
                    $pagenavH_prev.after(page);
                    $pagenavF_prev.after(page);
                }
            }

            // Ocultar el pagenav si sólo se muestra una única página
            if (numPages > 1) {
                opciones._header.pagenav.show();
                opciones._footer.pagenav.show();
            } else {
                opciones._header.pagenav.hide();
                opciones._footer.pagenav.hide();
            }

            // Marcar la página actual como activa
            $('#' + opciones._idListHeader.pagenav + ' ' + '.page[data-page="' + opciones.page + '"]').toggleClass('active');
            $('#' + opciones._idListFooter.pagenav + ' ' + '.page[data-page="' + opciones.page + '"]').toggleClass('active');

            // Funcionamiento del pagenav
            $('#' + opciones._idListHeader.pagenav + ' .page-item.page, #' + opciones._idListFooter.pagenav + ' .page-item.page')
                .on('click', function () {
                    // La página activa se desactiva
                    $('#' + opciones._idListHeader.pagenav + ' .page-item.page.active').toggleClass('active');
                    $('#' + opciones._idListFooter.pagenav + ' .page-item.page.active').toggleClass('active');
                    // La página seleccionada se activa
                    $(this).toggleClass('active');
                    self._changeOption('page', $(this).data('page'));
                });

            if (opciones.page > 1) {
                $pagenavH_prev.removeClass('disabled');
                $pagenavF_prev.removeClass('disabled');
            } else {
                $pagenavH_prev.addClass('disabled');
                $pagenavF_prev.addClass('disabled');
            }
            if (opciones.page < numPages) {
                $pagenavH_next.removeClass('disabled');
                $pagenavF_next.removeClass('disabled');
            } else {
                $pagenavH_next.addClass('disabled');
                $pagenavF_next.addClass('disabled');
            }
        },

        /**
         * Método que bloquea el componente
         * 
         * @name lock
         * @function
         * @example
         * $('#rup-list').rup_list('lock');
         */
        lock: function () {
            this._lock();
        },

        /**
         * Método que desbloquea el componente
         * 
         * @name unlock
         * @function
         * @example
         * $('#rup-list').rup_list('unlock');
         */
        unlock: function () {
            this._unlock();
        },

        /**
         * Método interno que se encarga del bloqueo del componente
         * 
         * @name _lock
         * @function
         */
        _lock: function () {
            const self = this;
            const opciones = self.options;

            opciones._content.css('opacity', '0.3');

            $('#' + opciones._idOverlay).remove();
            opciones._overlay.prependTo(opciones._content);

            opciones._overlay.width(opciones._content.width());
            opciones._overlay.height(opciones._content.height());
        },

        /**
         * Método interno que se encarga del desbloqueo del componente
         * 
         * @name _unlock
         * @function
         */
        _unlock: function () {
            const self = this;
            const opciones = self.options;

            opciones._content.css('opacity', '1');
            $('#' + opciones._idOverlay).remove();
        },

        /**
         * Método para destruir el componente
         * 
         * @name destroy
         * @function
         * @example
         * $('#rup-list').rup_list('destroy');
         */ 
        destroy: function () {
            // TODO: Eliminar el componente.
            var self = this;
            let id = self.element[0].id;
            $('#' + id).children().remove();
            $('#' + id + '-header').remove();
            if (self.options.createFooter) {
                $('#' + id + '-footer').remove();
            }
            self.options.feedback.rup_feedback('destroy');
            $.Widget.prototype.destroy.apply(this, arguments);
        },

        /**
         * Método interno que se encarga de realizar el filtrado y construir la lista desde los datos recibidos
         * 
         * @name _doFilter
         * @function
         */
        _doFilter: function () {
            var self = this;
            var opciones = this.options;
            var $itemTemplate = opciones._itemTemplate;
            var $pagenavH = opciones._header.pagenav;
            var $pagenavF = opciones._footer.pagenav;

            // Validar si la ordenacion es simple o múltiple
            var sidx = '';
            var sord = '';
            if (opciones.isMultiSort) {
                sidx = opciones.multiorder.sidx;
                sord = opciones.multiorder.sord;
            } else {
                sidx = opciones.sidx.value;
                sord = opciones.sord;
            }
            // Componer el filtro
            var filter = {
                filter: $('#' + opciones.filterForm).rup_form('formToJson'),
                page: opciones.page,
                rows: opciones.rowNum.value,
                sidx: sidx,
                sord: sord,
                multiselection: opciones.multiselection,
                core: {
                    pkNames: [opciones.key],
                    pkToken: '~'
                }
            };

            opciones.feedback.rup_feedback('hide');

            if ($('#' + opciones.filterForm).rup_form('valid')) {
                jQuery.rup_ajax({
                    url: opciones.action,
                    type: 'POST',
                    dataType: 'json',
                    data: JSON.stringify(filter),
                    contentType: 'application/json',
                    success: function (xhr) {
                        $pagenavH.find('.page').remove();
                        $pagenavF.find('.page').remove();

                        $pagenavH.find('.page-separator').hide();
                        $pagenavF.find('.page-separator').hide();

                        if (xhr === null || xhr.length === 0) {
                            opciones._header.obj.hide();
                            self.element.hide();
                            opciones._footer.obj.hide();
                            opciones.feedback.rup_feedback('set', $.rup.i18n.base.rup_table.errors.errorOnGet, 'error');
                            opciones._content.slideDown();

                            self.element.trigger('load');
                            self._unlock();
                        } else {
                            if (xhr.rows.length > 0) {
                                var initRecord = ((opciones.page - 1) * parseInt(opciones.rowNum.value)) + 1;
                                var endRecord = initRecord + xhr.rows.length - 1;
                                var records = parseInt(xhr.records) == 0 ? xhr.rows.length : xhr.records;
                                var msgRecords =
                                    $.rup.i18nTemplate($.rup.i18n.base.rup_table.defaults, 'recordtext', initRecord, endRecord, records);
                                opciones.feedback.rup_feedback({});
                                opciones.feedback.rup_feedback('set', msgRecords, 'ok');

                                self._pagenavManagement(Math.ceil(xhr.records / opciones.rowNum.value));

                                $.each(xhr.rows, function (index, elem) {
                                    var $item = $itemTemplate.clone(true, true);
                                    $item.attr('id', $item.attr('id') + '_' + elem[opciones.key]);

                                    var elemArr = $.rup_utils.jsontoarray(elem);
                                    var elemArrKeys = Object.keys($.rup_utils.jsontoarray(elem));
                                    if (opciones.selectable) {
                                        let selectorElement = $(opciones.selectable.selector, $item);
                                        selectorElement.attr('id', selectorElement.attr('id') + '_' + elem[opciones.key]);
                                    }
                                    if (xhr.reorderedSelection) {
                                        let tmp = xhr.reorderedSelection.filter(arrItem => arrItem.pk[opciones.key] == elem[opciones.key]);
                                        if ((tmp.length > 0 && !xhr.selectedAll) || (tmp.length == 0 && xhr.selectedAll)) {
                                            $item.addClass('list-item-selected');
                                        }
                                    }

                                    for (var i = 0; i < elemArrKeys.length; ++i) {
                                        $item.find('[id="' + elemArrKeys[i] + '_label"]')
                                            .text(opciones.colNames[elemArrKeys[i]] ? opciones.colNames[elemArrKeys[i]] : elemArrKeys[i])
                                            .attr('id', elemArrKeys[i] + '_label_' + elem[opciones.key]);
                                        $item.find('[id="' + elemArrKeys[i] + '_value"]')
                                            .text(elemArr[elemArrKeys[i]])
                                            .attr('id', elemArrKeys[i] + '_value_' + elem[opciones.key]);
                                    }
                                    $('#' + self.element[0].id).trigger('modElement', [$item, elem]);
                                });

                                // si ha resultados se muestran cabecera/pie y listado
                                opciones._header.obj.show();
                                self.element.show();
                                opciones._footer.obj.show();

                                // Si no se estÃ¡ mostrando el content se despliega
                                opciones._content.slideDown();
                            } else {
                                // Si no se devuelven resultados
                                opciones._header.obj.hide();
                                self.element.hide();
                                opciones._footer.obj.hide();
                                opciones.feedback.rup_feedback('set', $.rup.i18n.base.rup_table.defaults.emptyrecords, 'alert');
                                opciones._content.slideDown();
                            }
                        }

                        self.element
                            .children().each(function (i, e) {
                                setTimeout(function () {
                                    $(e).show('drop', {}, 200, function () {
                                        if ($(e).next().length == 0) {
                                            self.element.css('height', 'auto');
                                        }
                                    });
                                }, 50 + (i * 50));
                            });

                        self.element.trigger('load');
                        // $('#' + self.element[0].id).trigger('load');
                        self._unlock();
                    },
                    error: function (XMLHttpResponse) {
                        opciones.feedback.rup_feedback('set', XMLHttpResponse.responseText, 'error');
                        opciones._header.obj.hide();
                        self.element.hide();
                        opciones._footer.obj.hide();
                        opciones._content.slideDown();

                        self.element.trigger('load');
                        self._unlock();
                    }
                });
            } else {
                self.element.trigger('load');
                self._unlock();
            }
        },

        /**
         * Método que se encarga de realizar una recarga de la lista
         * 
         * @name reload
         * @function
         * @example
         * $('#rup-list').rup_list('reload');
         */
        reload: function () {
            var self = this;

            self._lock();

            if (self.element.children().length > 0) {
                // Eliminar el listado actual y buscar el nuevo
                self.element
                    .css('height', self.element.outerHeight() + 16)
                    .children().each(function (i, e) {
                        setTimeout(function () {
                            $(e).hide('drop', {}, 200, function () {
                                $(this).remove();

                                // Si hemos llegado al Ãºltimo elemento procedemos a buscar el nuevo listado
                                if (self.element.children().length == 0) {
                                    self._doFilter();
                                }
                            });
                        }, 50 + (i * 50));
                    });
            } else {
                self._doFilter();
            }
        },

        /**
         * Método que se encarga de realizar el filtrado de la lista
         * 
         * @name filter
         * @function
         * @example
         * $('#rup-list').rup_list('filter');
         */
        filter: function () {
            var self = this;
            var opciones = this.options;
            opciones.page = 1;

            self._lock();

            if (self.element.children().length > 0) {
                // Eliminar el listado actual y buscar el nuevo
                self.element
                    .css('height', self.element.outerHeight() + 16)
                    .children().each(function (i, e) {
                        setTimeout(function () {
                            $(e).hide('drop', {}, 200, function () {
                                $(this).remove();

                                // Si hemos llegado al Ãºltimo elemento procedemos a buscar el nuevo listado
                                if (self.element.children().length == 0) {
                                    self._doFilter();
                                }
                            });
                        }, 50 + (i * 50));
                    });
            } else {
                self._doFilter();
            }
        },

        /**
         * Método para cambiar la página actual.
         * 
         * @name page
         * @function
         * @param {Number} page La página a la que navegar
         * @example
         * $('#rup-list').rup_list('page', 3);
         */
        page: function (page) {
            var self = this;
            self._changeOption('page', page);
        },

        /**
         * Método que obtiene la información de la selección actual
         * 
         * @name getSelectedIds
         * @function
         * @example
         * $('#rup-list').rup_list('getSelectedIds');
         */
        getSelectedIds: function () {
            var self = this;
            var options = self.options.multiselection;
            return {
                selectedIds: options.selectedIds,
                selectedAll: options.selectedAll
            };
        }


        // , _init: function (message, type, imgClass) {}
    });
}));
