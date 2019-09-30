/* eslint-env jquery,amd */
/*!
 * @author Lander Laparra
 */

/**
 * Presenta los elementos que presenta una tabla rup_table en formato listado. Pensado para movilidad.
 *
 * @summary Componente RUP List.
 * @module rup_list
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {

        // AMD. Register as an anonymous module.
        define(['jquery', './rup.base'], factory);
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
            load: function () {}
        },

        _setOption: function (key, value) {
            var opciones = this.options;
            switch (key) {
            case 'rowNum':
                opciones.rowNum['value'] = value;
                opciones.page = 1;
                this.reload();
                break;
            case 'page':
                opciones.page = value;
                this.reload();
                break;
            case 'sidx':
                opciones.sidx['value'] = value;
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

        _validateSkeleton: function () {
            var id = this.element.attr('id');
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

        _create: function () {
            var self = this;

            if (!self._validateSkeleton()) {
                $.rup_messages('msgAlert', {
                    title: 'Esqueleto no válido',
                    message: 'El esqueleto HTML sobre el que montar el listado no es correcto'
                });
                return;
            }

            var opciones = self.options;

            // Si el nÃºmero de pÃ¡ginas visibles se ha definido menor que 3 se eleva a 3 que es el mÃ­nimo
            opciones.visiblePages = opciones.visiblePages < 3 ? 3 : opciones.visiblePages;

            opciones._idContent = self.element.attr('id') + '-content';
            opciones.content = $('#' + opciones._idContent);

            opciones.feedback = $('#' + opciones.feedback).rup_feedback({
                gotoTop: false
            });

            opciones._idItemTemplate = self.element.attr('id') + '-itemTemplate';
            opciones.itemTemplate = $('#' + opciones._idItemTemplate);

            opciones._idListHeader = {};
            opciones._idListHeader.header = self.element.attr('id') + '-header';
            opciones._idListHeader.pagenav = self.element.attr('id') + '-header-nav';
            opciones._idListHeader.pagePrev = self.element.attr('id') + '-header-page-prev';
            opciones._idListHeader.pageNext = self.element.attr('id') + '-header-page-next';
            opciones._idListHeader.pagenav = self.element.attr('id') + '-header-nav';
            opciones._idListHeader.rowNum = self.element.attr('id') + '-header-rowNum';
            opciones._idListHeader.sidx = self.element.attr('id') + '-header-sidx';
            opciones._idListHeader.sord = self.element.attr('id') + '-header-sord';

            opciones._header = {};
            opciones._header.obj = $('#' + opciones._idListHeader.header);
            opciones._header.pagenav = $('#' + opciones._idListHeader.pagenav);
            opciones._header.pagePrev = $('#' + opciones._idListHeader.pagePrev);
            opciones._header.pageNext = $('#' + opciones._idListHeader.pageNext);
            opciones._header.rowNum = $('#' + opciones._idListHeader.rowNum);
            opciones._header.sidx = $('#' + opciones._idListHeader.sidx);
            opciones._header.sord = $('#' + opciones._idListHeader.sord);

            if (opciones.createFooter) {
                var footerHTML = $('<div>').append(opciones._header.obj.clone()).html().replace(/header/g, 'footer');
                $('#' + self.element.attr('id')).after(footerHTML);
            }

            opciones._idListFooter = {};
            opciones._idListFooter.footer = self.element.attr('id') + '-footer';
            opciones._idListFooter.pagenav = self.element.attr('id') + '-footer-nav';
            opciones._idListFooter.pagePrev = self.element.attr('id') + '-footer-page-prev';
            opciones._idListFooter.pageNext = self.element.attr('id') + '-footer-page-next';
            opciones._idListFooter.rowNum = self.element.attr('id') + '-footer-rowNum';
            opciones._idListFooter.sidx = self.element.attr('id') + '-footer-sidx';
            opciones._idListFooter.sord = self.element.attr('id') + '-footer-sord';

            opciones._footer = {};
            opciones._footer.obj = $('#' + opciones._idListFooter.footer);
            opciones._footer.pagenav = $('#' + opciones._idListFooter.pagenav);
            opciones._footer.pagePrev = $('#' + opciones._idListFooter.pagePrev);
            opciones._footer.pageNext = $('#' + opciones._idListFooter.pageNext);
            opciones._footer.rowNum = $('#' + opciones._idListFooter.rowNum);
            opciones._footer.sidx = $('#' + opciones._idListFooter.sidx);
            opciones._footer.sord = $('#' + opciones._idListFooter.sord);

            // RowNum select to rup-combo
            var rowNumRupConf = {
                source: opciones.rowNum.source,
                width: 'initial',
                selected: opciones.rowNum.value,
                rowStriping: true,
                ordered: false,
                change: function () {
                    if (!$(this).rup_combo('isDisabled')) {
                        opciones._header.rowNum.rup_combo('disable');
                        opciones._footer.rowNum.rup_combo('disable');
                        opciones._header.rowNum.rup_combo('setRupValue', $(this).rup_combo('getRupValue'));
                        opciones._footer.rowNum.rup_combo('setRupValue', $(this).rup_combo('getRupValue'));
                        self._setOption('rowNum', $(this).rup_combo('getRupValue'));
                        opciones._header.rowNum.rup_combo('enable');
                        opciones._footer.rowNum.rup_combo('enable');
                    }
                }
            };
            opciones._header.rowNum.rup_combo(rowNumRupConf);
            opciones._header.rowNum = $('#' + opciones._idListHeader.rowNum);
            opciones._footer.rowNum.rup_combo(rowNumRupConf);
            opciones._footer.rowNum = $('#' + opciones._idListFooter.rowNum);

            // Sidx select to rup-combo
            var sidxRupConf = {
                source: opciones.sidx.source,
                width: 'initial',
                selected: opciones.sidx.value,
                rowStriping: true,
                ordered: false,
                change: function () {
                    if (!$(this).rup_combo('isDisabled')) {
                        opciones._header.sidx.rup_combo('disable');
                        opciones._footer.sidx.rup_combo('disable');
                        opciones._header.sidx.rup_combo('setRupValue', $(this).rup_combo('getRupValue'));
                        opciones._footer.sidx.rup_combo('setRupValue', $(this).rup_combo('getRupValue'));
                        self._setOption('sidx', $(this).rup_combo('getRupValue'));
                        opciones._header.sidx.rup_combo('enable');
                        opciones._footer.sidx.rup_combo('enable');
                    }
                }
            };
            opciones._header.sidx.rup_combo(sidxRupConf);
            opciones._header.sidx = $('#' + opciones._idListHeader.sidx);
            opciones._footer.sidx.rup_combo(sidxRupConf);
            opciones._footer.sidx = $('#' + opciones._idListFooter.sidx);

            // InicializaciÃ³n sord
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

            // Funcionamiento botÃ³n sord
            $('#' + opciones._idListHeader.sord + ', #' + opciones._idListFooter.sord).on('click', function () {
                sordH.toggleClass('fa-sort-amount-asc');
                sordH.toggleClass('fa-sort-amount-desc');
                sordF.toggleClass('fa-sort-amount-asc');
                sordF.toggleClass('fa-sort-amount-desc');
                self._setOption('sord', sordH.hasClass('fa-sort-amount-asc') ? 'asc' : 'desc');
            });

            // AsociaciÃ³n de eventos
            self.element.on('load', opciones.load);

            // Funcionalidad pagenav Ant./Sig.
            opciones._header.pagePrev.on('click', function () {
                self._setOption('page', opciones._header.pagenav.find('.page-item.page.active').prev('[data-page]').data('page'));
            });
            opciones._header.pageNext.on('click', function () {
                self._setOption('page', opciones._header.pagenav.find('.page-item.page.active').next('[data-page]').data('page'));
            });
            opciones._footer.pagePrev.on('click', function () {
                self._setOption('page', opciones._footer.pagenav.find('.page-item.page.active').prev('[data-page]').data('page'));
            });
            opciones._footer.pageNext.on('click', function () {
                self._setOption('page', opciones._footer.pagenav.find('.page-item.page.active').next('[data-page]').data('page'));
            });

            $('#' + opciones._idItemTemplate).hide();
        },

        _pagenavManagement: function (numPages) {
            var self = this;
            var opciones = this.options;
            var $pagenavH = opciones._header.pagenav;
            var $pagenavH_prev = opciones._header.pagePrev;
            var $pagenavH_next = opciones._header.pageNext;
            var $pagenavF = opciones._footer.pagenav;
            var $pagenavF_prev = opciones._footer.pagePrev;
            var $pagenavF_next = opciones._footer.pageNext;

            // Si el nÃºmero de pÃ¡ginas a mostrar es superior a las configuradas como visibles hay que mostrar el separador
            if (numPages > opciones.visiblePages + 1) {
                // Mostrar las pÃ¡ginas visibles antes del separador
                var initPage = 1;
                var endPage = 1;
                if (opciones.page >= opciones.visiblePages) {
                    if (opciones.page + opciones.visiblePages - 1 > numPages) {
                        initPage = numPages - opciones.visiblePages + 1;
                    } else {
                        initPage = opciones.page - 1;
                    }

                    // Se aÃ±ade la pÃ¡gina inicial
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
                    // AÃ±adir el nÃºmero de la pÃ¡gina final
                    let page = '<li data-page="' + numPages + '" class="page-item page"><a class="page-link" href="javascript:void(0)">' + numPages + '</a></li>';
                    $pagenavH.find('.page-separator:last').after(page);
                    $pagenavF.find('.page-separator:last').after(page);
                }
            } else {
                // AÃ±adir todas las pÃ¡ginas al nav
                for (i = numPages; i > 0; i--) {
                    let page = '<li data-page="' + i + '" class="page-item page"><a class="page-link" href="javascript:void(0)">' + i + '</a></li>';
                    $pagenavH_prev.after(page);
                    $pagenavF_prev.after(page);
                }
            }

            // Ocultar el pagenav si sÃ³lo se muestra una Ãºnica pÃ¡gina
            if (numPages > 1) {
                opciones._header.pagenav.show();
                opciones._footer.pagenav.show();
            } else {
                opciones._header.pagenav.hide();
                opciones._footer.pagenav.hide();
            }

            // Marcar la pÃ¡gina actual como activa
            $('#' + opciones._idListHeader.pagenav + ' ' + '.page[data-page="' + opciones.page + '"]').toggleClass('active');
            $('#' + opciones._idListFooter.pagenav + ' ' + '.page[data-page="' + opciones.page + '"]').toggleClass('active');

            // Funcionamiento del pagenav
            $('#' + opciones._idListHeader.pagenav + ' .page-item.page, #' + opciones._idListFooter.pagenav + ' .page-item.page')
                .on('click', function () {
                    // La pÃ¡gina activa se desactiva
                    $('#' + opciones._idListHeader.pagenav + ' .page-item.page.active').toggleClass('active');
                    $('#' + opciones._idListFooter.pagenav + ' .page-item.page.active').toggleClass('active');
                    // La pÃ¡gina seleccionada se activa
                    $(this).toggleClass('active');
                    self._setOption('page', $(this).data('page'));
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

        _lock: function () {
            var opciones = this.options;

            opciones.content.css('opacity', '0.3');
            var overlay;
            if ($('#' + this.element.attr('id') + '-overlay').length > 0) {
                overlay = $('#' + this.element.attr('id') + '-overlay');
            } else {
                overlay = jQuery('<div id="' + this.element.attr('id') + '-overlay"> </div>');
                overlay.prependTo(opciones.content);
            }
            overlay.width(opciones.content.width());
            overlay.height(opciones.content.height());
        },

        _unlock: function () {
            var opciones = this.options;

            opciones.content.css('opacity', '1');
            $('#' + this.element.attr('id') + '-overlay').remove();
        },

        destroy: function () {
            // TODO: Eliminar el componente.
            $.Widget.prototype.destroy.apply(this, arguments);
        },

        _doFilter: function () {
            var self = this;
            var opciones = this.options;
            var $itemTemplate = opciones.itemTemplate;
            var $pagenavH = opciones._header.pagenav;
            var $pagenavF = opciones._footer.pagenav;

            // Componer el filtro
            var filter = {
                filter: $('#' + opciones.filterForm).rup_form('formToJson'),
                page: opciones.page,
                rows: opciones.rowNum.value,
                sidx: opciones.sidx.value,
                sord: opciones.sord
            };

            opciones.feedback.rup_feedback('hide');
            opciones.feedback.rup_feedback('destroy').rup_feedback({
                gotoTop: false
            }); //FIXME: Pendiente de correcciÃ³n UDA

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
                            opciones.content.slideDown();

                            self.element.trigger('load');
                            self._unlock();
                        } else {
                            if (xhr.rows.length > 0) {
                                var initRecord = ((opciones.page - 1) * parseInt(opciones.rowNum.value)) + 1;
                                var endRecord = initRecord + xhr.rows.length - 1;
                                var records = parseInt(xhr.records) == 0 ? xhr.rows.length : xhr.records;
                                var msgRecords =
                                    $.rup.i18nTemplate($.rup.i18n.base.rup_table.defaults, 'recordtext', initRecord, endRecord, records);
                                opciones.feedback.rup_feedback('set', msgRecords, 'ok');

                                self._pagenavManagement(Math.ceil(xhr.records / opciones.rowNum.value));

                                $.each(xhr.rows, function (index, elem) {
                                    var $item = $itemTemplate.clone(true, true);
                                    $item.attr('id', $item.attr('id') + '_' + elem[opciones.key]);

                                    var elemArr = $.rup_utils.jsontoarray(elem);
                                    var elemArrKeys = Object.keys($.rup_utils.jsontoarray(elem));

                                    for (var i = 0; i < elemArrKeys.length; ++i) {
                                        $item.find('[id="' + elemArrKeys[i] + '_label"]')
                                            .text(opciones.colNames[elemArrKeys[i]] ? opciones.colNames[elemArrKeys[i]] : elemArrKeys[i])
                                            .attr('id', elemArrKeys[i] + '_label_' + elem[opciones.key]);
                                        $item.find('[id="' + elemArrKeys[i] + '_value"]')
                                            .text(elemArr[elemArrKeys[i]])
                                            .attr('id', elemArrKeys[i] + '_value_' + elem[opciones.key]);
                                    }

                                    self.element.append($item);
                                });

                                // si ha resultados se muestran cabecera/pie y listado
                                opciones._header.obj.show();
                                self.element.show();
                                opciones._footer.obj.show();

                                // Si no se estÃ¡ mostrando el content se despliega
                                opciones.content.slideDown();
                            } else {
                                // Si no se devuelven resultados
                                opciones._header.obj.hide();
                                self.element.hide();
                                opciones._footer.obj.hide();
                                opciones.feedback.rup_feedback('set', $.rup.i18n.base.rup_table.defaults.emptyrecords, 'alert');
                                opciones.content.slideDown();
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
                        self._unlock();
                    },
                    error: function (XMLHttpResponse) {
                        opciones.feedback.rup_feedback('set', XMLHttpResponse.responseText, 'error');
                        opciones._header.obj.hide();
                        self.element.hide();
                        opciones._footer.obj.hide();
                        opciones.content.slideDown();

                        self.element.trigger('load');
                        self._unlock();
                    }
                });
            } else {
                self.element.trigger('load');
                self._unlock();
            }
        },

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
        }

        // , _init: function (message, type, imgClass) {}
    });
}));