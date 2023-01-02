/*!
 * Copyright 2016 E.J.I.E., S.A.
 *
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
 */

/* eslint-disable no-console */

import Printd from 'printd';

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
 *          userVal.text(userVal.text() + ' -Added');
 *      },
 *      load: () => {}
 * });
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {

        // AMD. Register as an anonymous module.
        define(['jquery', 'rup.base', 'rup.button', 'rup.autocomplete', 'rup.dialog'], factory);
    } else {

        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    //*******************************************************
    // DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
    //*******************************************************

    /**
     * @description Opciones por defecto de configuración del componente.
     * @name defaults
     * @property {String} [action=null] - Determina la url contra la que se hacen las llamadas del listado.
     * @property {String} [filterForm=null] - Determina el selector del formulario de filtrado del listado.
     * @property {String} [feedback=null] - Determina el selector del feedback.
     * @property {Number} [visiblePages=5] - Determina el número de páginas que serán visibles desde la paginación (mínimo 3).
     * @property {String} [key=null] - Determina el identificador de cada tarjeta que vendrá especificado en el JSON.
     * @property {Object} [rowNum=Object] - Determina la configuracion de la seleccion de elementos por página.
     * @property {Object} [sidx = Object] - Determina los campos por los que se podrán ordenar los elementos
     * @property {String} [sord=null] - Determina la dirección de la ordenación
     * @property {Number} [page=1] - Determina página en la que se inicia por defecto
     * @property {boolean} [createFooter=true] - Si es true crea una copia del header en la parte inferior del listado
     * @property {String} [sord=null] - Determina la dirección de la ordenación
     * @property {Funcion} [modElement=() =>{}] - Callback que se ejecuta antes del añadido de cada tarjeta al listado
     * @property {Funcion} [load=() => {}] - Callback que se ejecuta tras cada filtrado
     * @property {Object} [selectable=Object] - Determina la configuración de la selección
     * @property {boolean} [isMultiSort=false] - Si es true el modo de ordenación cambia a multiordenación
     * @property {boolean} [isScrollList=false] - Si es true quita la paginación a favor de una carga dinámica de las tarjetas
     *
     */

    /**
     * @description Opciones por defecto de configuración de rowNum
     * @name defaultsRowNum
     *
     * @property {Array} [sorce=Array] - Es un array de objetos con las propiedades value e i18nCaption que serán los elementos disponibles para la seleccion de los elementos por página
     * @property {String} [value=5] - Valor del source por defecto
     */

    /**
     * @description Opciones por defecto de configuración de sidx
     * @name defaultsSidx
     *
     * @property {Array} [sorce=Array] - Es un array de objetos con las propiedades value e i18nCaption que serán los elementos disponibles para la seleccion de la ordenacion.
     * @property {String} [value=5] - Valor del source por defecto. En caso de ser multiOrdenacion se pueden añadir campos separados por comas
     */

    /**
     * @description Opciones por defecto de configuración de selectable
     * @name defaultsSelectable
     *
     * @property {boolean} [multi=null] - Si es true será de selección múltiple, de ser false será de seleccion simple.
     * @property {selector} [value=null] - Selctor JQuery sobre el que se deberá hacer click para seleccionar o deseleccionar elementos.
     */

    /**
     * @description Eventos lanzados sobre rup-list
     * @name defaultsEvents
     *
     * @property [initComplete] - Se lanza una vez el componente ha sido inicializado.
     * @property [listAfterMultiselection] - Se lanza tras finalizar operaciones de multiseleccion desde el desplegable.
     * @property [rup_list-mord-inited] - Se lanza una vez se ha inicializado la característica de multiorder
     * @property [rup_list-mord-changed] - Se lanza cuando se vería la multiordenación
     */

    $.widget('$.rup_list', {
        isFiltering: $.Deferred(),
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
            loader: () => {},
            modElement: () => {},
            load: function () {}
        },

        /**
         * Método interno para cambiar el valor de algunas opciones
         *
         * @name _changeOption
         * @private
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
         * @private
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
         * @private
         * @function
         */
        _create: function () {
            global.initRupI18nPromise.then(() => {
                const self = this;
                const selfId = self.element.attr('id');

                if (!self._validateSkeleton()) {
                    $.rup_messages('msgAlert', {
                        title: $.rup.i18n.base.rup_list.errors.validateSkeletonDialog.title,
                        message: $.rup.i18n.base.rup_list.errors.validateSkeletonDialog.msg
                    });
                    console.error($.rup.i18n.base.rup_list.errors.validateSkeletonDialog.msg);
                    return;
                }

                var opciones = self.options;

                $(self.element).addClass('rup_list');

                // A11Y
                $(self.element).attr('role', 'listbox');
                $(self.element).attr('aria-live', 'polite');
                if (opciones.selectable && opciones.selectable.multi) {
                    $(self.element).attr('aria-multiselectable', 'true');
                } else {
                    $(self.element).attr('aria-multiselectable', 'false');
                }

                // Si el número de páginas visibles se ha definido menor que 3 se eleva a 3 que es el mínimo
                opciones.visiblePages = opciones.visiblePages < 3 ? 3 : opciones.visiblePages;

                /**
                 * CONTENT
                 */
                opciones._idContent = selfId + '-content';
                opciones._content = $('#' + opciones._idContent);
                opciones._content.addClass('rup_list-content');
                opciones._content.hide();

                /**
                 * OVERLAY (Lock & Unlock)
                 */
                self._loader.apply(self);

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
                opciones._itemTemplate.hide();
                opciones._itemTemplate.attr('aria-hidden', 'true');

                /**
                 * HEADER & FOOTER
                 */
                var populateHeaderFooterOpts = (isFooter) => {
                    let idObj = isFooter ? '_idListFooter' : '_idListHeader';
                    let obj = isFooter ? '_footer' : '_header';
                    let label = isFooter ? '-footer' : '-header';

                    // HEADER ELEMENTS IDs MAP
                    opciones[idObj] = {};
                    opciones[idObj].multiSort = {};
                    opciones[idObj].header = selfId + label;
                    opciones[idObj].pagenav = selfId + label + '-nav';
                    opciones[idObj].pagePrev = selfId + label + '-page-prev';
                    opciones[idObj].pageNext = selfId + label + '-page-next';
                    opciones[idObj].pagenav = selfId + label + '-nav';
                    opciones[idObj].rowNum = selfId + label + '-rowNum';
                    opciones[idObj].sidx = selfId + label + '-sidx';
                    opciones[idObj].sord = selfId + label + '-sord';
                    opciones[idObj].selectables = selfId + label + '-selectables';
                    // HEADER $OBJECTS MAP
                    opciones[obj] = {};
                    opciones[obj].obj = $('#' + opciones[idObj].header);
                    opciones[obj].multiSort = {};
                    opciones[obj].pagenav = $('#' + opciones[idObj].pagenav);
                    opciones[obj].pagePrev = $('#' + opciones[idObj].pagePrev);
                    opciones[obj].pageNext = $('#' + opciones[idObj].pageNext);
                    opciones[obj].rowNum = $('#' + opciones[idObj].rowNum);
                    opciones[obj].sidx = $('#' + opciones[idObj].sidx);
                    opciones[obj].sord = $('#' + opciones[idObj].sord);
                    opciones[obj].selectables = $('#' + opciones[idObj].selectables);
                    // HEADER $OBJECTS CLASS ASSIGNMENT
                    opciones[obj].obj.addClass('rup_list' + label);
                    opciones[obj].pagenav.addClass('rup_list' + label + '-nav');
                    opciones[obj].pagePrev.addClass('rup_list' + label + '-page-prev');
                    opciones[obj].pageNext.addClass('rup_list' + label + '-page-next');
                    opciones[obj].rowNum.addClass('rup_list' + label + '-rowNum');
                    opciones[obj].sidx.addClass('rup_list' + label + '-sidx');
                    opciones[obj].sord.addClass('rup_list' + label + '-sord');
                    opciones[obj].selectables.addClass('rup_list' + label + '-selectables');
                };
                populateHeaderFooterOpts();
                if (opciones.createFooter) {
                    var footerHTML = $('<div>').append(opciones._header.obj.clone()).html().replace(/header/g, 'footer');
                    $('#' + selfId).after(footerHTML);
                }
                populateHeaderFooterOpts(true);

                /**
                 * MULTISORT DIALOG
                 */
                opciones._idMultiSortDialog = selfId + '-mord-dialog';

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

                /**
                 * SELECT/MULTISELECT
                 */
                if (opciones.selectable) {
                    opciones._header.selectables.show();
                    if(opciones.createFooter){
                        opciones._footer.selectables.show();
                    }
                    self._selectablesInit.apply(self);
                } else {
                    opciones._header.selectables.hide();
                    if(opciones.createFooter){
                        opciones._footer.selectables.hide();
                    }
                }

                /**
                 * SCROLL LIST
                 */
                if (opciones.isScrollList) {
                    self._scrollListInit.apply(self);
                }

                /**
                 * PRINT
                 */
                if (opciones.print) {
                    self._print.apply(self);
                }

                /**
                 * MULTIFILTER
                 */
                if (opciones.isMultiFilter) {
                    self._multiFilter.apply(self);
                }

                self.isFiltering.resolve();

                /** 
                 * INIT COMPLETE EVENT
                 */
                if (opciones.isMultisort) {
                    $('#' + self.element[0].id).on('rup_list-mord-inited', () => {
                        $('#' + self.element[0].id).trigger('initComplete');
                    });
                } else {
                    $('#' + self.element[0].id).trigger('initComplete');
                }

                //Se audita el componente
                $.rup.auditComponent('rup_list', 'init');
            }).catch((error) => {
                console.error('Error al inicializar el componente:\n', error);
            });
        },

        /**
         * Método interno que inicializa el listado con seleccionables
         * @name _selectablesInit
         * @private
         * @function
         */
        _selectablesInit: function () {
            var self = this;
            var opciones = self.options;

            $('#' + self.element[0].id + '-content').find(opciones.selectable.selector).attr('rup-list-selector', 'enabled');

            opciones.multiselection = {
                selectedIds: null,
                selectedAll: false,
                selectedRowsPerPage: null
            };

            if (opciones.selectable.multi) {
                self._generateSelectablesBtnGroup();
            }

            var isControl = false,
                isShift = false,
                modeAll;

            if (opciones.isSuperSelect) {
                $(document).on('keydown', (e) => {
                    if (e.keyCode == '17') {
                        isControl = true;
                    } else if (e.keyCode == '16') {
                        isShift = true;
                    }
                });

                $(document).on('keyup', (e) => {
                    if (e.keyCode == '17') {
                        isControl = false;
                    } else if (e.keyCode == '16') {
                        isShift = false;
                    }
                });
            }
            
            opciones._content.find(opciones.selectable.selector).on('click keyup', (e) => {
                const $clickedEl = $(e.currentTarget);

                if (e.type === 'click' ||
                    (e.type === 'keyup' && (e.keyCode == '13' || e.keyCode == '32'))) {
                    let clickedPK = $clickedEl.data('pk');

                    if (opciones.multiselection.selectedIds == null) {
                        opciones.multiselection.selectedIds = [];
                    }

                    if (opciones.multiselection.selectedRowsPerPage == null) {
                        opciones.multiselection.selectedRowsPerPage = [];
                    }

                    if (opciones.multiselection.selectedAll) {
                        modeAll = true;
                    } else {
                        modeAll = false;
                    }

                    if (opciones.isSuperSelect) {
                        if (isShift && isControl) {
                            if (opciones.multiselection.selectedIds[opciones.multiselection.selectedIds.length - 1]) {
                                let posicionClicked = getPosicion(opciones.multiselection.selectedIds[opciones.multiselection.selectedIds.length - 1], clickedPK);
                                let newRangeLastClickedPK = opciones.multiselection.selectedIds[opciones.multiselection.selectedIds.length - 1];
                                if (posicionClicked[0] > posicionClicked[1]) {
                                    deselect($clickedEl, newRangeLastClickedPK, modeAll);
                                    selectRange(newRangeLastClickedPK, clickedPK, modeAll);
                                } else {
                                    selectRange(newRangeLastClickedPK, clickedPK, modeAll);
                                }
                            } else {
                                select($clickedEl, modeAll);
                            }
                        } else if (!isShift && isControl) {
                            if (opciones.multiselection.selectedIds.includes(clickedPK)) {
                                deselect($clickedEl, modeAll);
                            } else {
                                select($clickedEl, modeAll);
                            }
                        } else if (isShift && !isControl) {
                            if (opciones.multiselection.selectedIds[opciones.multiselection.selectedIds.length - 1]) {
                                let newRangeLastClickedPK = opciones.multiselection.selectedIds[0];
                                deselectRest(modeAll);
                                selectRange(newRangeLastClickedPK, clickedPK, modeAll);
                            } else {
                                select($clickedEl, modeAll);
                            }
                        } else if (!isShift && !isControl) {
                            if (opciones.multiselection.selectedIds.includes(clickedPK)) {
                                deselect($clickedEl, modeAll);
                            } else {
                                deselectRest(modeAll);
                                select($clickedEl, modeAll);
                            }
                        }
                    } else {
                        if (opciones.multiselection.selectedIds.includes(clickedPK)) {
                            deselect($clickedEl, modeAll);
                        } else {
                            select($clickedEl, modeAll);
                        }
                    }
                }
            });

            let select = ($clickedEl, modeAll) => {
                let clickedPK = $clickedEl.data('pk');

                if (!opciones.selectable.multi) {
                    opciones.multiselection.selectedAll = false;
                    opciones.multiselection.selectedIds = [];
                    opciones.multiselection.selectedRowsPerPage = [];
                    self.element.find('.rup_list-item-selected').each((i, e) => {
                        $(e).removeClass('rup_list-item-selected');
                        $(e).attr('aria-selected', 'false');
                    });
                }
                opciones.multiselection.selectedRowsPerPage.push({
                    id: clickedPK,
                    line: (function () {
                        let cont = 0;
                        let final = 0;
                        self.element.children().toArray().forEach(element => {
                            if (element.id == $clickedEl.attr('id')) {
                                final = cont;
                            }
                            cont++;
                        });
                        return final;
                    })(),
                    page: (function () {
                        if (opciones.isScrollList) {
                            return 1;
                        } else {
                            return opciones.page;
                        }
                    })()
                });
                opciones.multiselection.selectedIds.push(clickedPK);
                if (!modeAll) {
                    $clickedEl.addClass('rup_list-item-selected');
                    $clickedEl.attr('aria-selected', 'true');
                } else {
                    $clickedEl.removeClass('rup_list-item-selected');
                    $clickedEl.removeClass('aria-selected', 'false');
                }
            };

            let deselect = ($clickedEl, modeAll) => {
                let clickedPK = $clickedEl.data('pk');
                let index = opciones.multiselection.selectedIds.indexOf(clickedPK);

                opciones.multiselection.selectedIds.splice(index, 1);
                opciones.multiselection.selectedRowsPerPage = opciones.multiselection.selectedRowsPerPage.filter(elem =>
                    elem.id != clickedPK
                );
                if (!modeAll) {
                    $clickedEl.removeClass('rup_list-item-selected');
                    $clickedEl.attr('aria-selected', 'false');
                } else {
                    $clickedEl.addClass('rup_list-item-selected');
                    $clickedEl.attr('aria-selected', 'true');
                }
            };

            let deselectRest = (modeAll) => {
                let deselectRestItem = (index) => {
                    const item2SelectPk = String(opciones.content[index][opciones.key]);
                    const deselectRestItem = self.element.find('.rup_list-item').filter((i, e) => {
                        return $(e).data('pk') == item2SelectPk;
                    });
                    if (!modeAll) {
                        deselectRestItem.removeClass('rup_list-item-selected');
                        deselectRestItem.attr('aria-selected', 'false');
                    } else {
                        deselectRestItem.addClass('rup_list-item-selected');
                        deselectRestItem.attr('aria-selected', 'true');
                    }
                };

                if (!modeAll) {
                    opciones.multiselection.selectedAll = false;
                } else {
                    opciones.multiselection.selectedAll = true;
                }
                opciones.multiselection.selectedIds = [];
                opciones.multiselection.selectedRowsPerPage = [];

                for (let i = 0; i < opciones.content.length; i++) {
                    deselectRestItem(i);
                }
            };

            let selectRange = (lastClickedPK, clickedPK, modeAll) => {
                let selectRangeItem = (index) => {
                    const item2SelectPk = String(opciones.content[index][opciones.key]);
                    if (!opciones.multiselection.selectedIds.includes(item2SelectPk)) {
                        let $item2Select = $('.rup_list-item').filter((i, e) => {
                            return $(e).data('pk') == item2SelectPk;
                        });
                        select($item2Select, modeAll);
                    }
                };

                var posicionClicked = getPosicion(lastClickedPK, clickedPK);
                if (posicionClicked[0] > posicionClicked[1]) {
                    for (let i = posicionClicked[1]; i <= posicionClicked[0]; i++) {
                        selectRangeItem(i);
                    }
                } else {
                    for (let i = posicionClicked[1]; i >= posicionClicked[0]; i--) {
                        selectRangeItem(i);
                    }
                }
            };

            let getPosicion = (lastClickedPK, clickedPK) => {
                var posicionClicked = {};
                for (let i = 0; i < opciones.content.length; i++) {
                    if (opciones.content[i][opciones.key] == clickedPK) {
                        posicionClicked[0] = i;
                    } else if (opciones.content[i][opciones.key] == lastClickedPK) {
                        posicionClicked[1] = i;
                    }
                }
                return posicionClicked;
            };
        },

        /**
         * Método interno que crea el scrollList
         * @name _scrollListInit
         * @private
         * @function
         */
        _scrollListInit: function () {
            var self = this;

            self.options.stepLoad = self.element.children().length / self.options.rowNum.value;
            self.options.stepOnLoad = false;

            self.options.stepCounter = 0;

            $(self.element).on('scrollListPageNext', function () {
                return self.options.page++;
            });

            $(self.element).on('scrollListPagePrev', function () {
                return self.options.page--;
            });

            $(window).on('scroll', function () {
                var windowHeight = document.documentElement.clientHeight,
                    targetOpciones = self.element[0].getBoundingClientRect(),
                    targetHeight = targetOpciones.height,
                    targetTopPoint = targetOpciones.top,
                    targetButtomPoint = targetHeight + targetTopPoint + 150;

                self.options.stepLoad = self.element.children().length / self.options.rowNum.value;

                if (self.options.stepLoad == self.options.page) {
                    if (targetButtomPoint < windowHeight) {
                        self.options.stepCounter++;
                        if (self.options.stepCounter == 1) {
                            if (self.element.children().length <= self.options.rowNum.value * self.options.page) {
                                if (!self.options.stepOnLoad) {
                                    self.options.stepOnLoad = true;
                                    self._lock();
                                    $(self.element).trigger('scrollListPageNext');

                                    $.when(self.isFiltering).done(() => {
                                        // Reiniciar la promesa de filtrado
                                        delete self.isFiltering;
                                        self.isFiltering = $.Deferred();
                                        self._doFilter();
                                    });
                                }
                            }
                        }
                    }
                }
            });
        },

        /**
         * Método que aplica el modo 'sticky' al header
         * @name _headerSticky
         * @private
         * @function
         */
        _headerSticky: function () {
            const self = this;
            const opciones = self.options;

            $(window).on('resize', function () {
                opciones._header.obj.css('width', self.element.css('width'));
            });

            $(window).on('scroll', function () {
                if ($('.rup-navbar.navbar').hasClass('rup-navbar-sticky')) {
                    window.scrollHeight = $('.rup-navbar').height();
                } else {
                    window.scrollHeight = 0;
                }

                var targetOpciones = opciones._header.obj[0].getBoundingClientRect(),
                    targetTopPoint = targetOpciones.top;

                if (opciones._header.obj.hasClass('rup_list-sticky')) {
                    targetOpciones = self.element[0].getBoundingClientRect();
                    targetTopPoint = targetOpciones.top;
                }

                opciones._header.obj.css('width', self.element.css('width'));

                if (targetTopPoint < window.scrollHeight) {
                    opciones._header.obj.addClass('rup_list-sticky');
                    self.element.css({
                        'padding-top': opciones._header.obj[0].offsetHeight
                    });
                    opciones._header.obj.css({
                        'top': window.scrollHeight
                    });
                } else if (targetTopPoint >= window.scrollHeight) {
                    if (opciones._header.obj.hasClass('rup_list-sticky')) {
                        opciones._header.obj.removeClass('rup_list-sticky');
                        self.element.css({
                            'padding-top': 0
                        });
                        opciones._header.obj.css({
                            'top': 0
                        });
                    }
                }
            });
        },

        /**
         * Método que crea el loader
         * @name _loader
         * @private
         * @function
         */
        _loader: function () {
            const self = this;
            const opciones = self.options;
            const selfId = self.element.attr('id');

            if (!opciones._overlay) {
                opciones._idOverlay = selfId + '-overlay';
                opciones._overlay = jQuery('<div id="' + opciones._idOverlay + '" class="rup_list-overlay"></div>');
                opciones._overlay.append('<div class="rup_list-overlay-layer"></div>').append('<div class="rup_list-overlay-loader"></div>');
            }

            opciones.loader(opciones._overlay);
        },

        /**
         * Método que lanza la impresión HTML
         * @name _print
         * @private
         * @function
         */
        _print: function () {
            const self = this;
            const opciones = self.options;

            if ($('#' + opciones.filterForm).find('#listPrint').length == 0) {
                opciones.btnPrint = $('<button id="listPrint">Imprimir</button>');
                opciones.btnPrint.appendTo($('#' + opciones.filterForm));
                opciones.btnPrint[0].disabled = true;
                opciones.btnPrint.on('click', btnPrintMain);
            }

            function btnPrintMain(e) {
                e.preventDefault();
                var doc = new Printd(),
                    printDoc = $('<div id="print-doc"></div>'),
                    printTagStyle = $('<link>', {
                        'id': 'rup-list-link-print',
                        'rel': 'stylesheet',
                        // 'media': 'print',
                        'href': opciones.print
                    }),
                    sidx = '',
                    sord = '';


                if (opciones.isMultiSort) {
                    sidx = opciones.multiorder.sidx;
                    sord = opciones.multiorder.sord;
                } else {
                    sidx = opciones.sidx.value;
                    sord = opciones.sord;
                }

                // Si el formulario de filtrado indicado es correcto se parsea
                let filterForm = {};
                if($(`form[id="${opciones.filterForm}"]`).length==1){
                    filterForm = $('#' + opciones.filterForm).rup_form('formToJson');
                }

                var filter = {
                    filter: filterForm,
                    page: 1,
                    rows: opciones.records,
                    sidx: sidx,
                    sord: sord,
                    multiselection: opciones.multiselection,
                    core: {
                        pkNames: [opciones.key],
                        pkToken: '~'
                    }
                };

                printDoc.append(printTagStyle);

                jQuery.rup_ajax({
                    url: opciones.action,
                    type: 'POST',
                    dataType: 'json',
                    data: JSON.stringify(filter),
                    contentType: 'application/json',
                    success: function (xhr) {
                        if (!opciones.multiselection.selectedIds || opciones.multiselection.selectedIds.length == 0) {
                            for (var i = 0; i < xhr.rows.length; i++) {
                                printDoc.append($('<p>' + xhr.rows[i][opciones.key] + '</p>'));
                            }
                        } else {
                            for (var x = 0; x < xhr.rows.length; x++) {
                                for (var y = 0; y < xhr.reorderedSelection.length; y++) {
                                    if (xhr.rows[x][opciones.key] == xhr.reorderedSelection[y].pk[opciones.key]) {
                                        printDoc.append($('<p>' + xhr.rows[x][opciones.key] + '</p>'));
                                    }
                                }
                            }
                        }
                        doc.print(printDoc[0]);
                    }
                });
            }
        },

        /**
         * Método interno que configura MultiFilter
         * @name _multiFilter
         * @private
         * @function
         */
        _multiFilter: function () {
            const self = this;
            const opciones = self.options;

            opciones.multiFilter = {};
            opciones.multiFilter._filterSelector = 'generated';
            opciones.multiFilter._filterUser = 'udaPruebas';
            opciones.multiFilter._dialogId = self.element[0].id + '_dropdownDialog';

            opciones.multiFilter.$btn = $('#' + opciones.filterForm).find('button').eq(0);
            opciones.multiFilter.$dialog = $('<div id="' + opciones.multiFilter._dialogId + '" class="dialog-content-material"><div id="' + opciones.multiFilter._dialogId + '_feedback" role="alert"></div><form><div class="form-row"><div class="form-groupMaterial col-12"><label for="' + opciones.multiFilter._dialogId + '_combo">Filtros</label><input id="' + opciones.multiFilter._dialogId + '_combo" /></div></div><div class="form-row"><div class="checkbox-material col-12"><input type="checkbox" id="' + opciones.multiFilter._dialogId + '-defaultFilter" /><label for="' + opciones.multiFilter._dialogId + '-defaultFilter">Filtro por defecto</label></div></div></form></div>');

            opciones.multiFilter.$btn.after(opciones.multiFilter.$dialog);

            opciones.multiFilter.$combo = $('#' + opciones.multiFilter._dialogId + '_combo');
            opciones.multiFilter.$feedback = $('#' + opciones.multiFilter._dialogId + '_feedback');

            opciones.multiFilter.$feedback.rup_feedback({
                block: false,
                delay: 2000
            });

            // Dropdown dialog
            opciones.multiFilter.$btn.rup_button({
                dropdown: {
                    dropdownDialog: opciones.multiFilter._dialogId,
                    dropdownDialogConfig: {
                        autoOpen: false,
                        modal: true,
                        resizable: true,
                        title: '<i class=\'mdi mdi-filter\' aria-hidden=\'true\'></i>Administración de filtros',
                        width: '380px',
                        buttons: [{
                            id: opciones.multiFilter._dialogId + '_btn_save',
                            text: 'Guardar',
                            click: function () {
                                if ($('#' + opciones.filterForm).rup_form('formToJson').length != 0) {
                                    var elem = {
                                        filtro: {
                                            filterSelector: opciones.multiFilter._filterSelector,
                                            filterName: opciones.multiFilter.$label.val(),
                                            filterValue: JSON.stringify($('#' + opciones.filterForm).rup_form('formToJson')),
                                            filterDefault: opciones.multiFilter.$dialog.find('#' + opciones.multiFilter._dialogId + '-defaultFilter')[0].checked,
                                            filterUser: opciones.multiFilter._filterUser
                                        }
                                    };
                                    $.rup_ajax({
                                        url: opciones.action + '/./multiFilter/add',
                                        type: 'POST',
                                        dataType: 'json',
                                        data: JSON.stringify(elem),
                                        contentType: 'application/json',
                                        success: () => {
                                            opciones.multiFilter.$feedback.rup_feedback('set', $.rup.i18n.base.rup_jqtable.plugins.multifilter.ok, 'ok');
                                        },
                                        error: () => {
                                            opciones.multiFilter.$feedback.rup_feedback('set', $.rup.i18n.base.rup_jqtable.plugins.multifilter.error, 'error');
                                        }
                                    });
                                }

                            }
                        },
                        {
                            id: opciones.multiFilter._dialogId + '_btn_apply',
                            text: 'Aplicar',
                            click: function () {
                                if (opciones.multiFilter.selected) {
                                    opciones.multiFilter.$dialog.dialog('close');
                                    self.element.rup_list('filter');
                                }
                            }
                        },
                        {
                            id: opciones.multiFilter._dialogId + '_btn_delete',
                            text: 'Eliminar',
                            click: function () {
                                if (opciones.multiFilter.selected) {
                                    var elem = {
                                        filtro: {
                                            filterSelector: opciones.multiFilter.selected.filterSelector,
                                            filterName: opciones.multiFilter.selected.filterName,
                                            filterValue: JSON.stringify(opciones.multiFilter.selected.filterValue),
                                            filterDefault: opciones.multiFilter.selected.filterDefault,
                                            filterUser: opciones.multiFilter.selected.filterUser
                                        }
                                    };
                                    $.rup_ajax({
                                        url: opciones.action + '/./multiFilter/delete',
                                        type: 'POST',
                                        dataType: 'json',
                                        data: JSON.stringify(elem),
                                        contentType: 'application/json',
                                        success: () => {
                                            opciones.multiFilter.$feedback.rup_feedback('set', $.rup.i18n.base.rup_jqtable.plugins.multifilter.ok, 'ok');
                                            opciones.multiFilter.$combo.rup_autocomplete('set', '', '');
                                            opciones.multiFilter.$label.data('tmp.loadObjects.term', null);
                                            opciones.multiFilter.$label.data('loadObjects', {});
                                            opciones.multiFilter.$label.data('tmp.data', {});
                                        },
                                        error: () => {
                                            opciones.multiFilter.$feedback.rup_feedback('set', $.rup.i18n.base.rup_jqtable.plugins.multifilter.error, 'error');
                                        }
                                    });
                                }
                            }
                        },
                        {
                            id: opciones.multiFilter._dialogId + '_btn_cancel',
                            text: 'Cancelar',
                            click: function () {
                                opciones.multiFilter.$dialog.dialog('close');
                            },
                            btnType: $.rup.dialog.LINK
                        }
                        ]
                    }
                }
            });

            opciones.multiFilter.$combo.rup_autocomplete({
                source: opciones.action +
                    '/./multiFilter/getAll?filterSelector=' +
                    opciones.multiFilter._filterSelector + '&user=' +
                    opciones.multiFilter._filterUser,
                sourceParam: {
                    label: 'filterName',
                    value: 'filterDefault',
                    data: 'filterValue',
                    category: 'filter'
                },
                method: 'GET',
                menuMaxHeight: 325,
                minLength: 3,
                combobox: true,
                contains: true,
                select: function () {
                    if (opciones.multiFilter.$combo.rup_autocomplete('getRupValue')) {
                        opciones.multiFilter.selected = {
                            filterSelector: opciones.multiFilter._filterSelector,
                            filterName: opciones.multiFilter.$combo.rup_autocomplete('getRupValue'),
                            filterDefault: opciones.multiFilter.$dialog.find('#' + opciones.multiFilter._dialogId + '-defaultFilter')[0].checked,
                            filterUser: opciones.multiFilter._filterUser
                        };
                        $.rup_ajax({
                            url: opciones.action +
                                '/./multiFilter/getAll?filterSelector=' +
                                opciones.multiFilter._filterSelector + '&user=' +
                                opciones.multiFilter._filterUser,
                            type: 'GET',
                            dataType: 'json',
                            contentType: 'application/json',
                            success: function (data) {
                                if (opciones.multiFilter.selected.filterName) {
                                    for (let i = 0; i < data.length; i++) {
                                        if (opciones.multiFilter.selected.filterName == data[i].filterName) {
                                            opciones.multiFilter.selected.filterValue = JSON.parse(data[i].filterValue);
                                            opciones.multiFilter.selected.filterDefault = data[i].filterDefault;
                                        }
                                    }
                                    if (opciones.multiFilter.selected.filterDefault) {
                                        opciones.multiFilter.$dialog.find('#' + opciones.multiFilter._dialogId + '-defaultFilter')[0].checked = true;
                                    } else {
                                        opciones.multiFilter.$dialog.find('#' + opciones.multiFilter._dialogId + '-defaultFilter')[0].checked = false;
                                    }

                                    $('#' + opciones.filterForm).find('input').val('');
                                    for (let i = 0; i < $('#' + opciones.filterForm).find('input').length; i++) {
                                        if (opciones.multiFilter.selected.filterValue[$('#' + opciones.filterForm).find('input').eq(i).attr('name')] != undefined) {
                                            $('#' + opciones.filterForm).find('input').eq(i).val(opciones.multiFilter.selected.filterValue[$('#' + opciones.filterForm).find('input').eq(i).attr('name')]);
                                        }
                                    }
                                }
                            },
                            error: () => {
                                opciones.multiFilter.$feedback.rup_feedback('set', $.rup.i18n.base.rup_jqtable.plugins.multifilter.error, 'error');
                            }
                        });
                    }
                }
            });

            opciones.multiFilter.$label = $('#' + opciones.multiFilter._dialogId + '_combo_label');

            //filtro por derecho
            $.rup_ajax({
                url: opciones.action +
                    '/./multiFilter/getDefault?filterSelector=' +
                    opciones.multiFilter._filterSelector + '&user=' +
                    opciones.multiFilter._filterUser,
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json',
                success: function (data) {
                    opciones.multiFilter.$label.val(data.filterName);
                    data.filterValue = JSON.parse(data.filterValue);
                    if (data.filterDefault) {
                        opciones.multiFilter.$dialog.find('#' + opciones.multiFilter._dialogId + '-defaultFilter')[0].checked = true;
                    } else {
                        opciones.multiFilter.$dialog.find('#' + opciones.multiFilter._dialogId + '-defaultFilter')[0].checked = false;
                    }
                    for (let i = 0; i < $('#' + opciones.filterForm).find('input').length; i++) {
                        if (data.filterValue[$('#' + opciones.filterForm).find('input').eq(i).attr('name')] != undefined) {
                            $('#' + opciones.filterForm).find('input').eq(i).val(data.filterValue[$('#' + opciones.filterForm).find('input').eq(i).attr('name')]);
                        }
                    }
                }
            });

            opciones.multiFilter.$label.data('uiAutocomplete')._renderItem = (ul, item) => {
                return $('<li></li>').data(
                    'item.autocomplete', item).append(
                    '<a>' + item.label + '</a>')
                    .appendTo(ul);
            };
            opciones.multiFilter.$label.off('blur click');
        },

        /**
         * Método interno que configura el boton de alternar el sord en la ordenación simple
         * @name _sordButtonInit
         * @private
         * @function
         */
        _sordButtonInit: function () {
            const self = this;
            const opciones = self.options;

            var sordH = opciones._header.sord;
            var sordF = opciones._footer.sord;

            sordH.attr('aria-controls', self.element.attr('id'));
            if(opciones.createFooter){
                sordF.attr('aria-controls', self.element.attr('id'));
            }

            if (opciones.sord === 'asc') {
                sordH.addClass('asc');
                sordH.removeClass('desc');
                sordH.attr('aria-label', $.rup.i18n.base.rup_list.sort.asc);
                if(opciones.createFooter){
                    sordF.addClass('asc');
                    sordF.removeClass('desc');
                    sordF.attr('aria-label', $.rup.i18n.base.rup_list.sort.asc);
                }
            } else {
                sordH.addClass('desc');
                sordH.removeClass('asc');
                sordH.attr('aria-label', $.rup.i18n.base.rup_list.sort.desc);
                if(opciones.createFooter){
                    sordF.addClass('desc');
                    sordF.removeClass('asc');
                    sordF.attr('aria-label', $.rup.i18n.base.rup_list.sort.desc);
                }
            }
            // Funcionamiento botón sord
            $('#' + opciones._idListHeader.sord + ', #' + opciones._idListFooter.sord).on('click', function () {
                sordH.toggleClass('asc');
                sordH.toggleClass('desc');
                if(opciones.createFooter){
                    sordF.toggleClass('asc');
                    sordF.toggleClass('desc');
                }
                let label = sordH.hasClass('asc') ? $.rup.i18n.base.rup_list.sort.asc : $.rup.i18n.base.rup_list.sort.desc;
                sordH.attr('aria-label', label);
                if(opciones.createFooter){
                    sordF.attr('aria-label', label);
                }
                self._changeOption('sord', sordH.hasClass('asc') ? 'asc' : 'desc');
            });
        },

        /**
         * Método interno que configura el combo de seleccion de sidx en la ordenación simple
         * @name _sidxComboInit
         * @private
         * @function
         */
        _sidxComboInit: function () {
            const self = this;
            const opciones = self.options;

            let doChange = function(obj, change){
                if (!$('#' + obj.id).rup_combo('isDisabled')) {
                	let iden = opciones._header.sidx[0].id;
                    $('#'+iden).rup_combo('setRupValue', $('#' + obj.id).rup_combo('getRupValue'));
                    if(opciones.createFooter){
                    	iden = opciones._footer.sidx[0].id;
                    	$('#'+iden).rup_combo('setRupValue', $('#' + obj.id).rup_combo('getRupValue'));
                    }
                    if(change){
                        self._changeOption('sidx', $('#' + obj.id).rup_combo('getRupValue'));
                    }
                }
            };

            let changeH = function(){
                doChange(this, true);
            };
            let changeF = function(){
                doChange(this, false);
            };

            var sidxRupConf = {
                source: opciones.sidx.source,
                width: 'initial',
                selected: opciones.sidx.value,
                rowStriping: true,
                ordered: false,
                change: changeH
            };
            opciones._header.sidx.rup_combo(sidxRupConf);
            opciones._header.sidx = $('#' + opciones._idListHeader.sidx);
            if(opciones.createFooter){
                var sidxRupConfFoot = {
                        source: opciones.sidx.source,
                        width: 'initial',
                        selected: opciones.sidx.value,
                        rowStriping: true,
                        ordered: false,
                        change: changeF
                    };
       
                opciones._footer.sidx.rup_combo(sidxRupConfFoot);
                opciones._footer.sidx = $('#' + opciones._idListFooter.sidx);
            }
        },

        /**
         * Método interno que configura los elementos de la multiordenación.
         * @name _multisortInit
         * @private
         * @function
         */
        _multisortInit: function () {
            const self = this;
            const opciones = self.options;
            const selfId = self.element.attr('id');

            // Creamos un apartado en opciones
            opciones.multiorder = {
                sidx: opciones.sidx.value,
                sord: (() => {
                    if (opciones.sord) {
                        let sordArr = opciones.sord.split(',');
                        let sidxArr = opciones.sidx.value.split(',');
                        if (sordArr.length == sidxArr.length) {
                            return opciones.sord;
                        }
                        if (sordArr.length > sidxArr.length) {
                            return sordArr.splice(0, sidxArr.length).join(',');
                        }
                        if (sordArr.length < sidxArr.length) {
                            let diff = sidxArr.length - sordArr.length;
                            for (let i = 0; i < diff; i++) {
                                sordArr.push('asc');
                            }
                            return sordArr.join(',');
                        }
                    } else {
                        let sordArr = [];
                        for (let i = 0; i < opciones.sidx.value.split(',').length; i++) {
                            sordArr.push('asc');
                        }
                        return sordArr.join(',');
                    }
                })()
            };

            let doInit = (isFooter) => {
                let idObj = isFooter ? '_idListFooter' : '_idListHeader';
                let obj = isFooter ? '_footer' : '_header';
                let label = isFooter ? '-footer-' : '-header-';

                opciones[idObj].multiSort.dialog = selfId + label + 'mord-dialog';
                opciones[idObj].multiSort.summary = selfId + label + 'mord-summary';
                opciones[idObj].multiSort.edit = selfId + label + 'mord-edit';

                // Generamos un span para el resumen
                let $spanResumen = $('<ul id="' + opciones[idObj].multiSort.summary + '" class="rup_list-mord-summary p-0"></ul>');
                let $tmpWrapSummary = $('<div class="tmp-orderchange"/>');
                opciones[obj].sidx.wrap($tmpWrapSummary);
                $tmpWrapSummary = opciones[obj].sidx.parent();
                $tmpWrapSummary.children().remove();
                $tmpWrapSummary.append($spanResumen);
                $spanResumen.unwrap();
                opciones[obj].multiSort.summary = $('#' + opciones[idObj].multiSort.summary);

                // Se rellena el resumen con el order por defecto
                opciones.multiorder.sidx.split(',').map((e) => {
                    return e.trim();
                }).forEach((e, i) => {
                    if (e !== '') {
                        let $tmpSum = $('<li class="rup_list-mord-summary-badge badge badge-pill badge-primary rounded-0 mr-1"></li>');
                        let geti18n = (val) => {
                            let srcVal = opciones.sidx.source.filter(x => x.value == val);
                            return srcVal[0].i18nCaption;
                        };
                        let sordBadge = $('<span class="rup_list-mord-summary-badge-sord"></span>');
                        sordBadge.text(' ');
                        let arrSord = opciones.multiorder.sord.split(',').map((e) => {
                            return e.trim();
                        });
                        if (arrSord[i] == 'asc') {
                            sordBadge.addClass('asc mdi mdi-chevron-up');
                            sordBadge.attr('aria-label', $.rup.i18n.base.rup_list.sort.asc);
                        } else {
                            sordBadge.addClass('desc mdi mdi-chevron-down');
                            sordBadge.attr('aria-label', $.rup.i18n.base.rup_list.sort.desc);
                        }
                        $tmpSum.append(geti18n(e)).append(sordBadge.clone());
                        $spanResumen.append($tmpSum.clone());
                    }
                });

                // Creamos el botón para el dialogo
                var $btnOrderDialog = $(`<button id="${opciones[idObj].multiSort.edit}" class="rup_list-mord-dialogbtn mdi mdi-pencil"></button>`);
                $btnOrderDialog.attr('aria-haspopup', 'true');
                $btnOrderDialog.attr('aria-expanded', 'false');
                $btnOrderDialog.attr('aria-label', $.rup.i18n.base.rup_list.openMordDialog);

                let $tmpWrapEditMord = $('<div class="tmp-orderchange"></div>');
                opciones[obj].sord.wrap($tmpWrapEditMord);
                $tmpWrapEditMord = opciones[obj].sord.parent();
                $tmpWrapEditMord.children().remove();
                $tmpWrapEditMord.append($btnOrderDialog);
                $btnOrderDialog.unwrap();
                opciones[obj].multiSort.edit = $('#' + opciones[idObj].multiSort.edit);

                // Establecemos el boton para el dialogo
                opciones[obj].multiSort.edit.on('click keyup', (e) => {
                    if (e.type === 'click' || (e.type === 'keyup' && e.keyCode == '13')) {
                        opciones._multiSortDialog.rup_dialog('open');
                    }
                });


                let arrSidx = opciones.multiorder.sidx.split(',').map(a => a.trim());
                let arrSord = opciones.multiorder.sord.split(',').map(a => a.trim());

                if (arrSidx.length > 0) {
                    let cont = 0;
                    $(self.element).on('rup_list-mord-changed', () => {
                        cont++;
                        if (cont == arrSidx.length) {
                            $(self.element).trigger('rup_list-mord-inited');
                        }
                    });
                    arrSidx.forEach((elem, i) => {
                        $('button[data-ordValue="' + elem + '"]').trigger('click', [arrSord[i], true]);
                    });
                } else {
                    $(self.element).trigger('rup_list-mord-inited');
                }
            };

            //Creamos el dialogo
            $('<div id="' + opciones._idMultiSortDialog + '" class="rup_list-mord-dialog" style="display:none"></div>')
                .append(`
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title">${$.rup.i18n.base.rup_list.multiSortDialog.msg1}</h5>
                            <h5 class="card-subtitle mb-4 text-muted">${$.rup.i18n.base.rup_list.multiSortDialog.msg2}</h5>
                            <div id="${opciones._idMultiSortDialog}-orderfields" class="rup_list-mord-orderfields" aria-live="polite"></div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title">${$.rup.i18n.base.rup_list.multiSortDialog.msg3}</h4>
                            <h5 class="card-subtitle mb-4 text-muted">${$.rup.i18n.base.rup_list.multiSortDialog.msg4}</h5>
                            <div id="${opciones._idMultiSortDialog}-ordersort" class="rup_list-mord-ordersort" aria-live="polite"></div>
                        </div>
                    </div>
                `)
                .appendTo('body');
            opciones._multiSortDialog = $('#' + opciones._idMultiSortDialog);

            //Creamos el contenido del diálogo
            opciones.sidx.source.forEach((el) => {
                let $btn = $(`
                    <button class="rup_list-mord-field" data-ordValue="${el.value}">
                        ${el.i18nCaption}
                        <i class="mdi mdi-plus"></i>
                    </button>
                `);
                $btn.attr('aria-controls', `${opciones._idMultiSortDialog}-orderfields ${opciones._idMultiSortDialog}-ordersort`);
                $('.rup_list-mord-orderfields').append($btn.clone());
            });
            $('.rup_list-mord-orderfields').children().on('click', function (e, param, isInit) {
                self._actualizarOrdenMulti.apply(self, [e, param, isInit]);
            });

            //Creamos el componente para el dialogo
            opciones._multiSortDialog.rup_dialog({
                type: $.rup.dialog.DIV,
                autoOpen: false,
                modal: true,
                resizable: false,
                width: 'auto',
                title: $.rup.i18n.base.rup_list.multiSortDialog.title,
                buttons: [{
                    text: 'cerrar',
                    click: () => {
                        opciones._multiSortDialog.rup_dialog('close');
                    }
                }],
                open: () => {
                    $(self.element).trigger('rup_list-mord-dialogOpen');
                    opciones._header.multiSort.edit.attr('aria-expanded', true);
                    if(opciones.createFooter){
                        opciones._footer.multiSort.edit.attr('aria-expanded', true);
                    }
                },
                onBeforeClose: () => {
                    $(self.element).trigger('rup_list-mord-dialogClose');
                    opciones._header.multiSort.edit.attr('aria-expanded', false);
                    if(opciones.createFooter){
                        opciones._footer.multiSort.edit.attr('aria-expanded', false);
                    }
                }
            });

            doInit();
            if (opciones.createFooter) {
                doInit(true);
            }
        },

        /**
         * Método interno que configura el combo de elementos de lista por página
         * @name _rownumInit
         * @private
         * @function
         */
        _rownumInit: function () {
            const self = this;
            const opciones = self.options;

           let doChange = function(obj, change){
                if(opciones.createFooter){
                	let iden = opciones._header.rowNum[0].id;
                    if (obj.id == 'rup-list-footer-rowNum') {
                    	$('#'+iden).rup_combo('setRupValue', $('#' + obj.id).rup_combo('getRupValue'));
                    }
                    if (obj.id == 'rup-list-header-rowNum') {
                    	iden = opciones._footer.rowNum[0].id;
                    	$('#'+iden).rup_combo('setRupValue', $('#' + obj.id).rup_combo('getRupValue'));
                    }
                }
                if(change){
                    self._changeOption('rowNum', $('#' + obj.id).rup_combo('getRupValue'));
                }
            };


            let changeH = function(){
                doChange(this, true);
            };
            let changeF = function(){
                doChange(this, false);
            };

            var rowNumRupConf = {
                source: opciones.rowNum.source,
                width: 'initial',
                selected: opciones.rowNum.value,
                rowStriping: true,
                ordered: false,
                change: changeH
            };

            let iden = opciones._header.rowNum[0].id;
            $('#'+iden).rup_combo(rowNumRupConf);
            opciones._header.rowNum = $('#' + opciones._idListHeader.rowNum);
            
            if(opciones.createFooter){
                var rowNumRupConfFoot = {
                        source: opciones.rowNum.source,
                        width: 'initial',
                        selected: opciones.rowNum.value,
                        rowStriping: true,
                        ordered: false,
                        change: changeF
                    };
               
                let idenFoot = opciones._footer.rowNum[0].id;
                $('#'+idenFoot).rup_combo(rowNumRupConfFoot);
                opciones._footer.rowNum = $('#' + opciones._idListFooter.rowNum);
            }
        },

        /**
         * Método interno para deshabilitar botones de paginación
         * @private
         * @function
         * @param $navItem Objeto JQuery con el ítem de la navegación sobre el que actuar
         */
        _disableNavItem: function ($navItem) {
            $navItem.addClass('disabled');
            $navItem.attr('aria-disabled', 'true');
            $navItem.attr('tabindex', '-1');
        },

        /**
         * Método interno para habilitar botones de paginación
         * @private
         * @function
         * @param $navItem Objeto JQuery con el ítem de la navegación sobre el que actuar
         */
        _enableNavItem: function ($navItem) {
            $navItem.removeClass('disabled');
            $navItem.attr('aria-disabled', 'false');
            $navItem.attr('tabindex', '0');
        },

        /**
         * Método interno que configura el nav de la paginación
         * @name _pagenavInit
         * @private
         * @function
         */
        _pagenavInit: function () {
            const self = this;
            const opciones = self.options;

            $('.page-separator').hide()
                .attr('aria-hidden', 'true');

            // A11Y
            opciones._header.pagenav.attr('aria-label', $.rup.i18n.base.rup_list.paginacion);
            opciones._header.pagenav.attr('aria-controls', self.element.attr('id'));
            opciones._header.pagePrev
                .attr('role', 'button')
                .attr('aria-controls', self.element.attr('id'))
                .attr('aria-label', $.rup.i18n.base.rup_list.paginaAnterior);
            opciones._header.pageNext
                .attr('role', 'button')
                .attr('aria-controls', self.element.attr('id'))
                .attr('aria-label', $.rup.i18n.base.rup_list.paginaSiguiente);
            if(opciones.createFooter){
                opciones._footer.pagenav.attr('aria-label', $.rup.i18n.base.rup_list.paginacion);
                opciones._footer.pagenav.attr('aria-controls', self.element.attr('id'));
                opciones._footer.pagePrev
                    .attr('role', 'button')
                    .attr('aria-controls', self.element.attr('id'))
                    .attr('aria-label', $.rup.i18n.base.rup_list.paginaAnterior);
                opciones._footer.pageNext
                    .attr('role', 'button')
                    .attr('aria-controls', self.element.attr('id'))
                    .attr('aria-label', $.rup.i18n.base.rup_list.paginaSiguiente);
            }

            var onPageChange = (elem) => {
                if ($(elem).is('.disabled')) {
                    return false;
                }
                let maxpage = $('.page').eq(-1).attr('data-page');
                let actualPage = opciones._header.pagenav.find('.rup_list-page-item.page.active').attr('data-page');
                if (actualPage == 1) {
                    self._disableNavItem(opciones._header.pagePrev);
                    self._enableNavItem(opciones._header.pageNext);
                    if(opciones.createFooter){
                        self._disableNavItem(opciones._footer.pagePrev);
                        self._enableNavItem(opciones._footer.pageNext);
                    }
                    return true;
                }
                if (actualPage == maxpage) {
                    self._enableNavItem(opciones._header.pagePrev);
                    self._disableNavItem(opciones._header.pageNext);
                    if(opciones.createFooter){
                        self._enableNavItem(opciones._footer.pagePrev);
                        self._disableNavItem(opciones._footer.pageNext);
                    }
                    return true;
                }
                self._enableNavItem(opciones._header.pagePrev);
                self._enableNavItem(opciones._header.pageNext);
                if(opciones.createFooter){
                    self._enableNavItem(opciones._footer.pagePrev);
                    self._enableNavItem(opciones._footer.pageNext);
                }
                return true;
            };
            opciones._header.pagePrev.on('click', function () {
                if (!onPageChange(this)) {
                    return;
                }
                self._changeOption('page', opciones._header.pagenav.find('.rup_list-page-item.page.active').prev('[data-page]').data('page'));
            });
            opciones._header.pageNext.on('click', function () {
                if (!onPageChange(this)) {
                    return;
                }
                self._changeOption('page', opciones._header.pagenav.find('.rup_list-page-item.page.active').next('[data-page]').data('page'));
            });
            if(opciones.createFooter){
                opciones._footer.pagePrev.on('click', function () {
                    if (!onPageChange(this)) {
                        return;
                    }
                    self._changeOption('page', opciones._header.pagenav.find('.rup_list-page-item.page.active').prev('[data-page]').data('page'));
                });
                opciones._footer.pageNext.on('click', function () {
                    if (!onPageChange(this)) {
                        return;
                    }
                    self._changeOption('page', opciones._header.pagenav.find('.rup_list-page-item.page.active').next('[data-page]').data('page'));
                });
            }
        },

        /**
         * Método interno que crea la estructura de las líneas en la multiordenación
         *
         * @name _actualizarOrdenMulti
         * @private
         * @function
         * @param {Event} e
         * @param {JQueryObj} self  Objeto JQuery del botón
         * @param {String} ord  Direccion de la ordenación con la que se va a generar la línea
         */
        _actualizarOrdenMulti: function (e, ord = 'asc', isInit = 'false') {
            const self = this;
            const opciones = self.options;

            var sortDiv = $('.rup_list-mord-ordersort');

            // Añadimos las opciones al componente
            if (opciones.multiorder.sidx.length) {
                let tmpSidxArr = opciones.multiorder.sidx.split(',').map((e) => {
                    return e.trim();
                });
                let tmpSordArr = opciones.multiorder.sord.split(',').map((e) => {
                    return e.trim();
                });
                if (tmpSidxArr.indexOf($(e.target).attr('data-ordValue')) == -1) {
                    tmpSidxArr.push($(e.target).attr('data-ordValue'));
                    tmpSordArr.push(ord);
                }
                opciones.multiorder.sidx = tmpSidxArr.join(',');
                opciones.multiorder.sord = tmpSordArr.join(',');
            }
            //Creamos la linea
            let $operateLine = $(`
                <div id="${opciones._idMultiSortDialog}-ord-line-${$(e.target).attr('data-ordValue')}" 
                    class="rup_list-ord-line btn-group mb-3" 
                    data-ordValue="${$(e.target).attr('data-ordValue')}"
                    role="toolbar" 
                    aria-controls="${self.element[0].id}"
                    aria-label="${$(e.target).text().trim()}, ${$.rup.i18n.base.rup_list.sort[ord]}">
                    <div class="rup_list-apord input-group-text"></div>
                    <button class="rup_list-mord-up btn btn-secondary p-1 mdi mdi-arrow-up"
                        aria-label="${$.rup.i18n.base.rup_list.mordSubir}"
                        aria-controls="${self.element[0].id} ${opciones._idMultiSortDialog}-ord-line-${$(e.target).attr('data-ordValue')}"></button>
                    <button class="rup_list-mord-down btn btn-secondary p-1 mdi mdi-arrow-down"
                        aria-label="${$.rup.i18n.base.rup_list.mordBajar}"
                        aria-controls="${self.element[0].id} ${opciones._idMultiSortDialog}-ord-line-${$(e.target).attr('data-ordValue')}"></button>
                    <div class="rup_list-mord-label input-group-text rounded-0 w-50" aria-hidden="true">${$(e.target).text()}</div>
                    <button aria-controls="${self.element[0].id}"
                        class="rup_list-mord btn btn-secondary mdi" 
                        data-direction="${ord}"
                        aria-label="${$.rup.i18n.base.rup_list.sort[ord]}"></button>
                    <button aria-controls="${self.element[0].id}"
                        aria-label="${$.rup.i18n.base.rup_list.quitarCampoOrden}"
                        class="rup_list-mord-remove btn btn-danger mdi mdi-close-circle"></button>
                </div>
            `);
            $operateLine.find('button').rup_button();
            $(e.target).remove();
            sortDiv.append($operateLine);

            self._fnOrderOfOrderFields.apply(self, [$('[data-ordValue="' + $(e.target).attr('data-ordValue') + '"]', sortDiv), isInit]);
        },

        /**
         * Método interno que da funcionalidad a cada línea en la multiordenación
         *
         * @name _fnOrderOfOrderFields
         * @private
         * @function
         * @param {JQuery} ctx La instancia de rup_list
         * @param {JQuery} line Objeto JQuery de la línea a la que se va a dar funcionalidad
         */
        _fnOrderOfOrderFields: function (line, isInit) {
            const self = this;
            const opciones = self.options;

            //Función de guardado de la multiordenación
            var save = () => {
                opciones.multiorder.sidx = '';
                opciones.multiorder.sord = '';
                var $sortDiv = $('.rup_list-mord-ordersort');
                let sidxArr = [];
                let sordArr = [];
                $sortDiv.children().toArray().forEach((elem) => {
                    if (sidxArr.indexOf($(elem).attr('data-ordValue')) == -1) {
                        sidxArr.push($(elem).attr('data-ordValue'));
                        sordArr.push($('.rup_list-mord', $(elem)).attr('data-direction'));
                    }
                });
                if (sidxArr.length > 0) {
                    opciones.multiorder.sidx = sidxArr.join(',');
                    opciones.multiorder.sord = sordArr.join(',');
                }

                //Crear el label de resumen
                opciones._content.find('.rup_list-mord-summary').empty();
                if (opciones.multiorder.sidx != null && opciones.multiorder.sidx.length > 0) {
                    opciones.multiorder.sidx.split(',').map((e) => {
                        return e.trim();
                    }).forEach((e, i) => {
                        let geti18n = (val) => {
                            let srcVal = opciones.sidx.source.filter(x => x.value == val);
                            return srcVal[0].i18nCaption;
                        };
                        let sordBadge = $('<span></span>')
                            .text(' ');
                        let arrSord = opciones.multiorder.sord.split(',').map((e) => {
                            return e.trim();
                        });
                        if (arrSord[i] == 'asc') {
                            sordBadge.addClass('mdi mdi-chevron-up');
                        } else {
                            sordBadge.addClass('mdi mdi-chevron-down');
                        }
                        $('<li class="rup_list-mord-summary-badge badge badge-pill badge-primary rounded-0 mr-1"></li>')
                            .append(geti18n(e)).append(sordBadge.clone())
                            .appendTo(opciones._content.find('.rup_list-mord-summary'));
                    });
                }

                // Función para dehabilitar los botones de reordenación correspondientes
                opciones._multiSortDialog.find('.rup_list-mord-up, .rup_list-mord-down').button('enable');
                opciones._multiSortDialog.find('.rup_list-mord-up, .rup_list-mord-down').attr('aria-disabled', 'false');
                opciones._multiSortDialog.find('.rup_list-mord-up, .rup_list-mord-down').attr('tabindex', '0');
                opciones._multiSortDialog.find('.rup_list-mord-up').first().button('disable');
                opciones._multiSortDialog.find('.rup_list-mord-down').last().button('disable');
                opciones._multiSortDialog.find('.rup_list-mord-up').first().attr('aria-disabled', 'true');
                opciones._multiSortDialog.find('.rup_list-mord-down').last().attr('aria-disabled', 'true');
                opciones._multiSortDialog.find('.rup_list-mord-up').first().attr('tabindex', '-1');
                opciones._multiSortDialog.find('.rup_list-mord-down').last().attr('tabindex', '-1');

                let ariaSummary = $('.rup_list-ord-line').toArray()
                    .map((e) => {
                        return $(e).attr('aria-label') + '; ';
                    })
                    .reduce((rest, el) => {
                        return rest + el;
                    }, '');
                $sortDiv.attr('aria-label', ariaSummary ?
                    $.rup.i18n.base.rup_list.ariaSummary + ariaSummary : $.rup.i18n.base.rup_list.ariaSummaryEmpty);

                $(self.element).trigger('rup_list-mord-changed');

                if (isInit != true) {
                    isInit = false;
                    this.reload();
                } else {
                    isInit = false;
                }
            };

            // Funcionalidad de los botones de reordenación
            $('.rup_list-mord-up', line).click(function () {
                if ($(line).is(':first-child')) {
                    return;
                }
                $(line).prev().before(line);
                $(this).focus();
                save();
            });
            $('.rup_list-mord-down', line).click(function () {
                if ($(line).is(':last-child')) {
                    return;
                }
                $(line).next().after(line);
                $(this).focus();
                save();
            });

            //ponemos icono al sord
            if ($('.rup_list-mord', line).attr('data-direction') == 'asc') {
                $('.rup_list-mord', line).addClass('mdi-chevron-up');
            } else {
                $('.rup_list-mord', line).addClass('mdi-chevron-down');
            }
            $('.rup_list-mord').text(' ');

            //funcionalidad del sord
            $('.rup_list-mord', line).off('click');
            $('.rup_list-mord', line).click(() => {
                if ($('.rup_list-mord', line).attr('data-direction') == 'asc') {
                    $('.rup_list-mord', line).attr('data-direction', 'desc');
                    $('.rup_list-mord', line).attr('aria-label', $.rup.i18n.base.rup_list.sort.desc);
                    $('.rup_list-mord', line).addClass('mdi-chevron-down');
                    $('.rup_list-mord', line).removeClass('mdi-chevron-up');

                    // Se cambia el aria-label de la línea entera para que sea entendible
                    $('.rup_list-mord', line).parent()
                        .attr('aria-label', `${$('.rup_list-mord', line).parent().text().trim()}, ${$.rup.i18n.base.rup_list.sort.desc}`);
                } else {
                    $('.rup_list-mord', line).attr('data-direction', 'asc');
                    $('.rup_list-mord', line).attr('aria-label', $.rup.i18n.base.rup_list.sort.asc);
                    $('.rup_list-mord', line).addClass('mdi-chevron-up');
                    $('.rup_list-mord', line).removeClass('mdi-chevron-down');

                    // Se cambia el aria-label de la línea entera para que sea entendible
                    $('.rup_list-mord', line).parent()
                        .attr('aria-label', `${$('.rup_list-mord', line).parent().text().trim()}, ${$.rup.i18n.base.rup_list.sort.asc}`);
                }
                save();
            });

            //funcionalidad de retirar la ordenación
            $('.rup_list-mord-remove', line).click(() => {
                //recreamos el botón
                let $btn = $(`
                    <button class="rup_list-mord-field btn btn-material btn-material-sm btn-material-primary-low-emphasis"
                        data-ordValue="${$(line).attr('data-ordValue')}">
                        ${opciones.sidx.source.filter(x => x.value == $(line).attr('data-ordValue'))[0].i18nCaption}
                        <i class="mdi mdi-plus"></i>
                    </button>
                `);
                $('.rup_list-mord-orderfields').append($btn.clone());
                $('.rup_list-mord-orderfields').children().off('click');
                $('.rup_list-mord-orderfields').children().on('click', function (e) {
                    self._actualizarOrdenMulti.apply(self, [e]);
                });
                // Eliminamos la linea
                $(line).remove();
                save();
            });

            save();
        },

        /**
         * Método interno para seleccionar todos los elementos de la lista.
         *
         * @name _selectAll
         * @private
         * @function
         */
        _selectAll: function () {
            const self = this;
            const opciones = self.options;

            opciones.multiselection.selectedAll = true;
            opciones.multiselection.selectedIds = [];
            opciones.multiselection.selectedRowsPerPage = [];

            self._getPageElementsIds().forEach((elem) => {
                $('#' + elem).addClass('rup_list-item-selected');
                $('#' + elem).attr('aria-selected', 'true');
            });
            $('#' + self.element[0].id).trigger('listAfterMultiselection');
        },

        /**
         * Método interno para deseleccionar todos los elementos de la lista
         *
         * @name _deselectAll
         * @private
         * @function
         */
        _deselectAll: function () {
            const self = this;
            const opciones = self.options;

            opciones.multiselection.selectedAll = false;
            opciones.multiselection.selectedIds = null;
            opciones.multiselection.selectedRowsPerPage = null;
            self._getPageElementsIds().forEach((elem) => {
                $('#' + elem).removeClass('rup_list-item-selected');
                $('#' + elem).attr('aria-selected', 'false');
            });
            $('#' + self.element[0].id).trigger('listAfterMultiselection');
        },

        /**
         * Método interno para seleccionar todos los elementos en la página actual
         *
         * @name _selectPage
         * @private
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
                        $('#' + self.options._idItemTemplate + '_' + arrElem).addClass('rup_list-item-selected');
                        $('#' + self.options._idItemTemplate + '_' + arrElem).attr('aria-selected', 'true');
                    }
                });
            } else {
                self._getPageIds().forEach((arrElem) => {
                    let tmp = opciones.multiselection.selectedRowsPerPage.filter(x => x.id == arrElem);
                    if (tmp.length > 0) {
                        let id = arrElem.split('_').pop();
                        opciones.multiselection.selectedIds = opciones.multiselection.selectedIds.filter(z => z != id);
                        opciones.multiselection.selectedRowsPerPage = opciones.multiselection.selectedRowsPerPage.filter(z => z.id != arrElem);
                        $('#' + self.options._idItemTemplate + '_' + arrElem).addClass('rup_list-item-selected');
                        $('#' + self.options._idItemTemplate + '_' + arrElem).attr('aria-selected', 'true');
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
         * @private
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
                        $('#' + self.options._idItemTemplate + '_' + arrElem).removeClass('rup_list-item-selected');
                        $('#' + self.options._idItemTemplate + '_' + arrElem).attr('aria-selected', 'false');
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
                    $('#' + self.options._idItemTemplate + '_' + arrElem).removeClass('rup_list-item-selected');
                    $('#' + self.options._idItemTemplate + '_' + arrElem).attr('aria-selected', 'false');
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
         * @private
         * @function
         */
        _generateSelectablesBtnGroup: function () {
            const self = this;
            const selfId = self.element.attr('id');
            const opciones = self.options;

            let $btnGroup = $(`
                <div class="btn-group h-100" role="group">
                    <button id="${selfId + '-display-selectables'}"
                        class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        ${opciones._header.selectables.text()}
                    </button>
                    <div class="dropdown-menu" aria-labelledby="${selfId + '-display-selectables'}">
                        <button class="dropdown-item selectable-selectPage">
                            ${$.rup.i18n.base.rup_list.multiselection.selectAllPage}
                        </button>
                        <button class="dropdown-item selectable-deselectPage">
                            ${$.rup.i18n.base.rup_list.multiselection.deselectAllPage}
                        </button>
                        <button class="dropdown-item selectable-selectAll">
                            ${$.rup.i18n.base.rup_list.multiselection.selectAll}
                        </button>
                        <button class="dropdown-item selectable-deselectAll">
                            ${$.rup.i18n.base.rup_list.multiselection.deselectAll}
                        </button>
                    </div>
                </div>
            `);

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
         * Método interno para obtener los Ids de los elementos de la página actual
         *
         * @name _getPageElementsIds
         * @private
         * @function
         */
        _getPageElementsIds: function () {
            var self = this;
            var keys = [];
            $('#' + self.element[0].id).children().toArray().forEach((elem) => {
                keys.push(String($(elem)[0].id));
            });
            return keys;
        },

        /**
         * Método interno para obtener los Ids de la página actual
         *
         * @name _getPageIds
         * @private
         * @function
         */
        _getPageIds: function () {
            var self = this;
            var keys = [];
            $('#' + self.element[0].id).children().toArray().forEach((elem) => {
                keys.push(String($(elem).data('pk')));
            });
            return keys;
        },

        /**
         * Método interno que otorga funcionalidad a la paginación
         *
         * @name _pagenavManagement
         * @private
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
                    var $page = $('<li data-page="' + 1 + '"><div class="page-link" href="javascript:void(0)">' + 1 + '</div></li>');
                    $page.addClass('rup_list-page-item page-item page');
                    $page.attr('tabindex', '0');
                    $page.attr('role', 'button');
                    $page.attr('aria-controls', self.element.attr('id'));
                    $page.attr('aria-label', $.rup.i18nTemplate($.rup.i18n.base.rup_list, 'paginaLabel', 1, numPages));
                    $pagenavH.find('.page-separator').first().before($page);
                    $pagenavF.find('.page-separator').first().before($page.clone());

                    if (opciones.page - opciones.visiblePages > 0) {
                        // Mostrar el separador de inicio
                        $pagenavH.find('.page-separator').first().show();
                        $pagenavH.find('.page-separator').first().attr('aria-hidden', 'false');
                        $pagenavF.find('.page-separator').first().show();
                        $pagenavF.find('.page-separator').first().attr('aria-hidden', 'false');
                    }
                }
                endPage = initPage + opciones.visiblePages < numPages ? initPage + opciones.visiblePages : numPages + 1;
                for (var i = initPage; i < endPage; i++) {
                    let $page = $('<li data-page="' + i + '"><div class="page-link" href="javascript:void(0)">' + i + '</div></li>');
                    $page.addClass('rup_list-page-item page-item page');
                    $page.attr('tabindex', '0');
                    $page.attr('role', 'button');
                    $page.attr('aria-controls', self.element.attr('id'));
                    $page.attr('aria-label', $.rup.i18nTemplate($.rup.i18n.base.rup_list, 'paginaLabel', i, numPages));
                    $pagenavH.find('.page-separator').last().before($page);
                    $pagenavF.find('.page-separator').last().before($page.clone());
                }

                if (opciones.page + opciones.visiblePages - 1 < numPages) {
                    // Mostrar el separador de fin
                    $pagenavH.find('.page-separator').last().show();
                    $pagenavH.find('.page-separator').last().attr('aria-hidden', 'false');
                    $pagenavF.find('.page-separator').last().show();
                    $pagenavF.find('.page-separator').last().attr('aria-hidden', 'false');
                }

                if (endPage < numPages) {
                    // Añadir el número de la página final
                    let $page = $('<li data-page="' + numPages + '"><div class="page-link" href="javascript:void(0)">' + numPages + '</div></li>');
                    $page.addClass('rup_list-page-item page-item page');
                    $page.attr('tabindex', '0');
                    $page.attr('role', 'button');
                    $page.attr('aria-controls', self.element.attr('id'));
                    $page.attr('aria-label', $.rup.i18nTemplate($.rup.i18n.base.rup_list, 'paginaLabel', numPages, numPages));
                    $pagenavH.find('.page-separator').last().after($page);
                    $pagenavF.find('.page-separator').last().after($page.clone());
                }
            } else {
                // Añadir todas las páginas al nav
                for (let i = numPages; i > 0; i--) {
                    let $page = $('<li data-page="' + i + '"><div class="page-link" href="javascript:void(0)">' + i + '</div></li>');
                    $page.addClass('rup_list-page-item page-item page');
                    $page.attr('tabindex', '0');
                    $page.attr('role', 'button');
                    $page.attr('aria-controls', self.element.attr('id'));
                    $page.attr('aria-label', $.rup.i18nTemplate($.rup.i18n.base.rup_list, 'paginaLabel', i, numPages));
                    $pagenavH_prev.after($page);
                    $pagenavF_prev.after($page.clone());
                }
            }

            // Ocultar el pagenav si sólo se muestra una única página
            if (numPages > 1) {
                opciones._header.pagenav.show();
                if(opciones.createFooter){
                    opciones._footer.pagenav.show();
                }
            } else {
                opciones._header.pagenav.hide();
                if(opciones.createFooter){
                    opciones._footer.pagenav.hide();
                }
            }

            const $activePageHeader = $('#' + opciones._idListHeader.pagenav + ' ' + '.page[data-page="' + opciones.page + '"]');
            const $activePageFooter = $('#' + opciones._idListFooter.pagenav + ' ' + '.page[data-page="' + opciones.page + '"]');
            // Marcar la página actual como activa
            $activePageHeader.toggleClass('active');
            $activePageHeader.attr('aria-current', 'true');
            $activePageFooter.toggleClass('active');
            $activePageFooter.attr('aria-current', 'true');

            // Funcionamiento del pagenav
            $('#' + opciones._idListHeader.pagenav + ' .rup_list-page-item.page, #' + opciones._idListFooter.pagenav + ' .rup_list-page-item.page')
                .on('click', function () {
                    const $pageActiveHeader = $('#' + opciones._idListHeader.pagenav + ' .rup_list-page-item.page.active');
                    const $pageActiveFooter = $('#' + opciones._idListFooter.pagenav + ' .rup_list-page-item.page.active');

                    // La página activa se desactiva
                    $pageActiveHeader.toggleClass('active');
                    $pageActiveHeader.attr('aria-current', 'false');
                    $pageActiveFooter.toggleClass('active');
                    $pageActiveFooter.attr('aria-current', 'false');
                    // La página seleccionada se activa
                    $(this).toggleClass('active');
                    $(this).attr('aria-current', 'true');
                    self._changeOption('page', $(this).data('page'));
                });

            if (opciones.page > 1) {
                self._enableNavItem($pagenavH_prev);
                self._enableNavItem($pagenavF_prev);
            } else {
                self._disableNavItem($pagenavH_prev);
                self._disableNavItem($pagenavF_prev);
            }
            if (opciones.page < numPages) {
                self._enableNavItem($pagenavH_next);
                self._enableNavItem($pagenavF_next);
            } else {
                self._disableNavItem($pagenavH_next);
                self._disableNavItem($pagenavF_next);
            }
        },
        /**
         * Método interno que se encarga de reordenar del servidor
         *
         * @name _reorderDataFromServer
         * @private
         * @function
         */
        _reorderDataFromServer: function (self, opciones, xhr) {
        	let reorderSelection = xhr.reorderedSelection;
            if(reorderSelection !== null && reorderSelection.length > 0 && xhr.records != reorderSelection.length){
            	 //Se mira la nueva reordenacion y se ordena.
            	opciones.multiselection.selectedIds = [];
            	opciones.multiselection.selectedRowsPerPage = []; //Viene del servidor por eso la linea de la pagina es 1 menos.

                $.each(reorderSelection, function (index, p) {
                  var arra = {
                    id: p.pk[opciones.key],
                    page: p.page,
                    line: p.pageLine - 1
                  };
                  opciones.multiselection.selectedIds.splice(index, 0, arra.id);
                  opciones.multiselection.selectedRowsPerPage.splice(index, 0, arra);
                });
                $('#' + self.element[0].id).triggerHandler('listAfterReorderData',opciones);
            }
        },

        /**
         * Método interno que se encarga del bloqueo del componente
         *
         * @name _lock
         * @private
         * @function
         */
        _lock: function () {
            const self = this;
            const opciones = self.options;

            if (opciones.isScrollList && opciones.stepOnLoad) {
                $('#' + opciones._idOverlay).remove();
                opciones._overlay.css({
                    'position': 'relative',
                    'height': 'auto'
                });
                self.element.after(opciones._overlay);
            } else {
                opciones._header.obj.css('opacity', '0.3');
                self.element.css('opacity', '0.3');
                if(opciones.createFooter){
                    opciones._footer.obj.css('opacity', '0.3');
                }

                $('#' + opciones._idOverlay).remove();
                opciones._overlay.css({
                    'position': 'absolute'
                });
                opciones._content.prepend(opciones._overlay);
                opciones._overlay.height(opciones._content.height());
            }
        },

        /**
         * Método interno que se encarga del desbloqueo del componente
         *
         * @name _unlock
         * @private
         * @function
         */
        _unlock: function () {
            const self = this;
            const opciones = self.options;

            opciones._header.obj.css('opacity', '1');
            self.element.css('opacity', '1');
            if(opciones.createFooter){
                opciones._footer.obj.css('opacity', '1');
            }
            $('#' + opciones._idOverlay).remove();
        },

        /**
         * Método para destruir el componente
         *
         * @name destroy
         * @public
         * @function
         * @example
         * $('#rup-list').rup_list('destroy');
         */
        destroy: function () {
            const self = this;
            const opciones = this.options;

            $(self.element).empty();
            if(opciones.createFooter){
                opciones._footer.obj.remove();
            }
            opciones.feedback.rup_feedback('destroy');
            $.Widget.prototype.destroy.apply(this, arguments);
        },

        /**
         * Método interno que se encarga de realizar el filtrado y construir la lista desde los datos recibidos
         *
         * @name _doFilter
         * @private
         * @function
         */
        _doFilter: function () {
            const self = this;
            const opciones = this.options;
            const $itemTemplate = opciones._itemTemplate;
            const $pagenavH = opciones._header.pagenav;
            const $pagenavF = opciones._footer.pagenav;

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

            /**
             * SHOW, HIDE
             */
            if (opciones.show) {
                if (opciones.show.constructor == Object) {
                    opciones.show = opciones.show;
                }
            } else if (opciones.show == false) {
                opciones.show = {};
                opciones.animation = false;
            } else {
                opciones.show = {};
                opciones.show.animation = 'drop';
                opciones.show.delay = 200;
            }

            if (opciones.hide) {
                if (opciones.hide.constructor == Object) {
                    opciones.hide = opciones.hide;
                }
            } else if (opciones.hide == false) {
                opciones.hide = {};
                opciones.animation = false;
            } else {
                opciones.hide = {};
                opciones.hide.animation = 'drop';
                opciones.hide.delay = 200;
            }

            if (opciones.btnPrint) {
                if (opciones.btnPrint[0].disabled) {
                    opciones.btnPrint[0].disabled = false;
                }
            }

            // Si hay formulario de filtrado se valida antes de filtrar
            let canFilter = true;
            if($(`form[id="${opciones.filterForm}"]`).length==1){
                canFilter = $('#' + opciones.filterForm).rup_form('valid');
            }

            if (canFilter) {
                jQuery.rup_ajax({
                    url: opciones.action,
                    type: 'POST',
                    dataType: 'json',
                    data: JSON.stringify(filter),
                    contentType: 'application/json',
                    success: function (xhr) {
                        $pagenavH.find('.page').remove();
                        $pagenavH.find('.page-separator').hide();
                        $pagenavH.find('.page-separator').attr('aria-hidden', 'true');
                        $pagenavF.find('.page').remove();
                        $pagenavF.find('.page-separator').hide();
                        $pagenavF.find('.page-separator').attr('aria-hidden', 'true');

                        if (xhr === null || xhr.length === 0) {
                            opciones._header.obj.hide();
                            self.element.hide();
                            if(opciones.createFooter){
                                opciones._footer.obj.hide();
                            }
                            opciones.feedback.rup_feedback('set', $.rup.i18n.base.rup_table.errors.errorOnGet, 'error');
                            opciones._content.slideDown();

                            self.element.trigger('load');
                            $(self.element).attr('aria-live', 'polite');
                            self.isFiltering.resolve();
                            self._unlock();
                        } else {
                            if (xhr.rows && xhr.rows.length > 0) {
                            	self._reorderDataFromServer(self, opciones, xhr);
                                var initRecord = ((opciones.page - 1) * parseInt(opciones.rowNum.value)) + 1;
                                var endRecord = initRecord + xhr.rows.length - 1;
                                var records = parseInt(xhr.records) == 0 ? xhr.rows.length : xhr.records;
                                opciones.records = records;
                                var msgRecords =
                                    $.rup.i18nTemplate($.rup.i18n.base.rup_table.defaults, 'recordtext', initRecord, endRecord, records);
                                opciones.feedback.rup_feedback({});
                                opciones.feedback.rup_feedback('set', msgRecords, 'ok');

                                self._pagenavManagement(Math.ceil(xhr.records / opciones.rowNum.value));

                                $.each(xhr.rows, function (index, elem) {
                                    var $item = $itemTemplate.clone(true, true);
                                    $item.removeClass('rup_list-itemTemplate');
                                    $item.addClass('rup_list-item');
                                    $item.attr('id', $item.attr('id') + '_' + elem[opciones.key]);
                                    $item.data('all', elem);
                                    $item.data('pk', elem[opciones.key]);

                                    var elemArr = $.rup_utils.jsontoarray(elem);
                                    var elemArrKeys = Object.keys($.rup_utils.jsontoarray(elem));
                                    if (opciones.selectable) {
                                        let selectorElement = $(opciones.selectable.selector, $item);
                                        selectorElement.attr('id', selectorElement.attr('id') + '_' + elem[opciones.key]);
                                    }
                                    if (xhr.reorderedSelection) {
                                        let tmp = xhr.reorderedSelection.filter(arrItem => arrItem.pk[opciones.key] == elem[opciones.key]);
                                        if ((tmp.length > 0 && !xhr.selectedAll) || (tmp.length == 0 && xhr.selectedAll)
                                        		|| (xhr.records == xhr.reorderedSelection.length)) {
                                            $item.addClass('rup_list-item-selected');
                                            $item.attr('aria-selected', 'true');
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
                                if(opciones.createFooter){
                                    opciones._footer.obj.show();
                                }

                                // Si no se está mostrando el content se despliega
                                opciones._content.slideDown();

                                if (!opciones.content) {
                                    opciones.content = {};
                                }

                                if (opciones.content.length == 0 || opciones.content.length == undefined) {
                                    opciones.content = xhr.rows;
                                } else {
                                    if (!opciones.isScrollList) {
                                        opciones.content = xhr.rows;
                                    } else {
                                        var x = opciones.content.length;
                                        for (let i = 0; i < xhr.rows.length; i++) {
                                            opciones.content[x + i] = xhr.rows[i];
                                        }
                                    }
                                }

                                // A11Y
                                $('.rup_list-item').attr('role', 'listitem');
                                if (opciones.selectable) {
                                    $(opciones.selectable.selector + '.rup_list-item').attr('tabindex', '0');
                                    $(opciones.selectable.selector + '.rup_list-item').attr('role', 'option');
                                }
                            } else {
                                // Si no se devuelven resultados
                                opciones._header.obj.hide();
                                self.element.hide();
                                if(opciones.createFooter){
                                    opciones._footer.obj.hide();
                                }
                                opciones.feedback.rup_feedback('set', $.rup.i18n.base.rup_table.defaults.emptyrecords, 'alert');
                                opciones._content.slideDown();
                                self.element.trigger('load');
                                self.isFiltering.resolve();
                                self._unlock();
                            }
                        }

                        if (opciones.isScrollList) {
                            $pagenavH.hide();
                            $pagenavF.hide();
                        }

                        if (opciones.isHeaderSticky) {
                            self._headerSticky.apply(self);
                        }

                        self.element
                            .children().each(function (i, e) {
                                setTimeout(function () {
                                    $(e).show(opciones.show.animation, {}, opciones.show.delay, function () {
                                        if ($(e).next().length == 0) {
                                            self.element.css('height', 'auto');
                                            self.element.trigger('load');
                                            if (opciones.isScrollList && opciones.stepOnLoad) {
                                                self.isFiltering.resolve();
                                                self._unlock();
                                            }
                                            if (opciones.isScrollList) {
                                                self.options.stepLoad = self.element.children().length / self.options.rowNum.value;
                                                self.options.stepOnLoad = false;
                                                self.options.stepCounter = 0;
                                            }
                                        }
                                        if (i === self.element.children().length -1 && !opciones.stepOnLoad) {
                                            $('.rup_list-item').removeAttr('aria-hidden');
                                            self.isFiltering.resolve();
                                            self._unlock();
                                        }
                                    });
                                    if (!opciones.show.animation) {
                                        if ($(e).next().length == 0) {
                                            self.element.css('height', 'auto');
                                            self.element.trigger('load');
                                            if (opciones.isScrollList && opciones.stepOnLoad) {
                                                self.isFiltering.resolve();
                                                self._unlock();
                                            }
                                            if (opciones.isScrollList) {
                                                self.options.stepLoad = self.element.children().length / self.options.rowNum.value;
                                                self.options.stepOnLoad = false;
                                                self.options.stepCounter = 0;
                                            }
                                        }
                                    }
                                }, 50 + (i * 50));
                            });
                    },
                    error: function (XMLHttpResponse) {
                        opciones.feedback.rup_feedback('set', XMLHttpResponse.responseText, 'error');
                        opciones._header.obj.hide();
                        self.element.hide();
                        if(opciones.createFooter){
                            opciones._footer.obj.hide();
                        }
                        opciones._content.slideDown();

                        self.element.trigger('load');
                        self.isFiltering.resolve();
                        self._unlock();
                    }
                });
            } else {
                self.element.trigger('load');
                self.isFiltering.resolve();
                self._unlock();
            }
        },

        /**
         * Método que se encarga de realizar una recarga de la lista
         *
         * @name reload
         * @public
         * @function
         * @example
         * $('#rup-list').rup_list('reload');
         */
        reload: function () {
            var self = this,
                opciones = self.options;

            $.when(self.isFiltering).done(() => {
                // Reiniciar la promesa de filtrado
                delete self.isFiltering;
                self.isFiltering = $.Deferred();

                self._lock();

                if (self.element.children().length > 0) {
                    // Eliminar el listado actual y buscar el nuevo
                    self.element
                        .css('height', self.element.outerHeight() + 16)
                        .children().each(function (i, e) {
                            setTimeout(function () {
                                $(e).hide(opciones.hide.animation, {}, opciones.hide.delay, function () {
                                    $(this).attr('aria-hidden', 'true');
                                    $(this).remove();

                                    // Si hemos llegado al último elemento procedemos a buscar el nuevo listado
                                    if (self.element.children().length == 0) {
                                        self._doFilter();
                                    }
                                });
                            }, 50 + (i * 50));
                        });
                } else {
                    self._doFilter();
                }
            });
        },

        /**
         * Método que se encarga de realizar el filtrado de la lista
         *
         * @name filter
         * @public
         * @function
         * @example
         * $('#rup-list').rup_list('filter');
         */
        filter: function () {
            var self = this;
            var opciones = this.options;
            opciones.page = 1;

            $.when(self.isFiltering).done(() => {
                // Reiniciar la promesa de filtrado
                delete self.isFiltering;
                self.isFiltering = $.Deferred();

                self._lock();

                if (self.element.children().length > 0) {
                    // Eliminar el listado actual y buscar el nuevo
                    self.element
                        .css('height', self.element.outerHeight() + 16)
                        .children().each(function (i, e) {
                            setTimeout(function () {
                                $(e).hide(opciones.hide.animation, {}, opciones.hide.delay, function () {
                                    $(this).remove();
                                    $(this).attr('aria-hidden', 'true');
                                    if (opciones.isScrollList) {
                                        self._deselectAll();
                                    }
                                    // Si hemos llegado al último elemento procedemos a buscar el nuevo listado
                                    if (self.element.children().length == 0) {
                                        self._doFilter();
                                    }
                                });
                            }, 50 + (i * 50));
                        });
                } else {
                    self._doFilter();
                }
            });
        },

        /**
         * Método para cambiar la página actual.
         *
         * @name page
         * @public
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
         * @public
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
    });
}));