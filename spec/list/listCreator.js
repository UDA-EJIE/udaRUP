/* eslint multistr: 0 */
/* eslint-env jquery */

import 'jquery';

function getHtml(idLista) {
    return '' +
            '<form id="listFilterForm">' +
            '<fieldset>' +
                '<div class="row pb-2">' +
                    '<div class="col-md-1"/>' +
                    '<div class="col-md-4">' +
                        '<div class="row">' +
                            '<label for="listFilterUsuario">Usuario:</label>' +
                            '<div class="col-md-1"/>' +
                            '<input id="listFilterUsuario" type="text" name="usuario" class="col-md-9">' +
                        '</div>' +
                    '</div>' +
                    '<div class="col-md-2"/>' +
                    '<div class="col-md-4">' +
                        '<div class="row">' +
                            '<label for="listFilterEmail">Email:</label>' +
                            '<div class="col-md-1"/>' +
                            '<input id="listFilterEmail" type="email" name="email" class="col-md-9">' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="row pb-2">' +
                    '<div class="col-md-1"/>' +
                    '<div class="col-md-4">' +
                        '<div class="row">' +
                            '<label for="listFilterEdad">Edad:</label>' +
                            '<div class="col-md-1"/>' +
                            '<input id="listFilterEdad" type="number" name="edad" class="col-md-9">' +
                        '</div>' +
                    '</div>' +
                    '<div class="col-md-2"/>' +
                    '<div class="col-md-4">' +
                        '<div class="row">' +
                            '<label for="listFilterCodCliente">Codigo cliente:</label>' +
                            '<div class="col-md-1"/>' +
                            '<input id="listFilterCodCliente" type="number" name="codCliente" class="col-md-8">' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="row">' +
                    '<div class="col-md-5"/>' +
                    '<button id="listFilterAceptar" class="mdi mdi-filter col-md-2"> Filtrar </button>' +
                    '<div class="col-md-1"/>' +
                    '<button id="listFilterLimpiar" class="mdi mdi-broom col-md-2"> Limpiar </button>' +
                '</div>' +
            '</fieldset>' +
        '</form>' +
        '<div id="' + idLista +'-feedback" />' +
        '<div id="' + idLista +'-content">' +
            '<div id="rup-list-header" class="row">' +
                '<div id="rup-list-header-selectables" class="col-md-3">' +
                    'Opciones de seleccion:' +
                '</div>' +
                '<div class="col-md-2">' +
                    '<label for="' + idLista +'-header-rowNum">Elementos por página:</label>' +
                    '<select id="' + idLista +'-header-rowNum"/>' +
                '</div>' +
                '<!-- Ordenar por -->' +
                '<div class="col-md-3">' +
                    '<div class="row">' +
                        '<div class="col-md-7">' +
                            '<label for="' + idLista +'-header-sidx">Ordenar por:</label>' +
                            '<select id="' + idLista +'-header-sidx"/>' +
                        '</div>' +
                        '<div class="col-md-2">' +
                            '<button id="' + idLista +'-header-sord">' +
                                '<i class="mdi mdi-sort"/>' +
                            '</button>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<!-- Navegación -->' +
                '<div class="col-md-4">' +
                    '<nav id="' + idLista +'-header-nav">' +
                        '<ul class="pagination">' +
                            '<li id="' + idLista +'-header-page-prev" class="page-item disabled">' +
                                '<a href="javascript:void(0)" class="page-link d-none d-lg-flex" tabindex="-1">Anterior</a>' +
                                '<a href="javascript:void(0)" class="page-link d-lg-none" tabindex="-1">' +
                                    '<span class="mdi mdi-arrow-right-bold-circle-outline mdi-rotate-180"/>' +
                                '</a>' +
                            '</li>' +
                            '<li class="page-item page-separator disabled">' +
                                '<a class="page-link" tabindex="-1">...</a>' +
                            '</li>' +
                            '<li class="page-item page-separator disabled">' +
                                '<a class="page-link" tabindex="-1">...</a>' +
                            '</li>' +
                            '<li id="' + idLista +'-header-page-next" class="page-item disabled">' +
                                '<a href="javascript:void(0)" class="page-link d-none d-lg-flex">Siguiente</a>' +
                                '<a href="javascript:void(0)" class="page-link d-lg-none" tabindex="-1">' +
                                    '<span class="mdi mdi-arrow-right-bold-circle-outline"/>' +
                                '</a>' +
                            '</li>' +
                        '</ul>' +
                    '</nav>' +
                '</div>' +
            '</div>' +
            '<div id="' + idLista +'"></div>' +
            '<div id="' + idLista +'-itemTemplate" class="row" style="border: 1px solid gray; display:flex;margin:3px;padding:3px;">' +
                '<div class="col-md-1" style="border-right: 1px solid gray;display:flex;justify-content:center;align-items:center;">' +
                    '<span class="mdi mdi-account-circle" style="transform:scale(2);"/>' +
                '</div>' +
                '<div class="col-md-2" style="border-right: 1px solid gray;display:flex;align-items:center;flex-direction:column;">' +
                    '<div style="border-bottom: 1px gray solid;">' +
                        '<b><span id="usuario_label" /></b>: <span id="usuario_value"/>' +
                    '</div>' +
                    '<div>' +
                        '<b><span id="edad_label"/></b>: <span id="edad_value"/>' +
                    '</div>' +
                '</div>' +
                '<div class="col-md-2" style="border-right: 1px solid gray;display:flex;align-items:center;flex-direction:column;">' +
                    '<div><span class="mdi mdi-email"/><span id="email_label"/></div>' +
                    '<div><span id="email_value"/></div>' +
                '</div>' +
                '<div class="col-md-4" style="border-right: 1px solid gray;display:flex;align-items:center;flex-direction:column;">' +
                    '<div style="border-bottom: 1px solid gray;">' +
                        '<span id="codCliente_label"/>: <span id="codCliente_value"/>' +
                    '</div>' +
                    '<div>' +
                        '<span id="credito_label"/>: <span id="credito_value"/> <span class="mdi mdi-cash-multiple"/>' +
                    '</div>' +
                '</div>' +
                '<div class="col-md-3" style="display: flex; justify-content:space-around;">' +
                    '<span class="mdi mdi-36px mdi-account-edit"/>' +
                    '<span class="mdi mdi-36px mdi-account-remove"/>' +
                    '<span class="mdi mdi-36px mdi-settings"/>' +
                '</div>' +
            '</div>' +
        '</div>';
}

function commonListOptions(idLista) {
    return {
        action: '/demo/list/filter',
        filterForm: 'listFilterForm',
        feedback: idLista + '-feedback',
        key: 'codigoPK',
        selectable: {
            multi: true,
            selector: '.list-item'
        },
        modElement: () => { },
        visiblePages: 2,
        sidx: {
            source: [{
                value: 'USUARIO',
                i18nCaption: 'Usuario'
            }, {
                value: 'EDAD',
                i18nCaption: 'Edad'
            }, {
                value: 'CODCLIENTE',
                i18nCaption: 'Codigo cliente'
            }],
            value: 'USUARIO'
        },
        rowNum: {
            source: [{
                value: '5',
                i18nCaption: 'Cinco'
            }, {
                value: '10',
                i18nCaption: 'Diez'
            }, {
                value: '20',
                i18nCaption: 'Veinte'
            }],
            value: '5'
        }
    };
}

function commonListCreator(idLista, callback) {
    $('#content').append(getHtml(idLista));
    $('#listFilterLimpiar').on('click', (e) => {
        e.stopImmediatePropagation();
        e.preventDefault();
        $('#listFilterForm').find('input').val('');
        $('#rup-list').rup_list('filter');
    });
    $('#listFilterAceptar').on('click', (e) => {
        e.stopImmediatePropagation();
        e.preventDefault();
        $('#rup-list').rup_list('filter');
    });
    $('#' + idLista).on('initComplete', callback);
    let opts = commonListOptions(idLista);
    return opts;
}

export function createList(idLista, callback){
    let opts = commonListCreator(idLista, callback);
    $('#' + idLista).rup_list(opts);
} 

export function createListScrollx5(idLista, callback){
    let opts = commonListCreator(idLista, callback);
    opts.isScrollList = true;
    opts.rowNum.value = 5;
    $('#' + idLista).rup_list(opts);
}

export function createListScrollx10(idLista, callback){
    let opts = commonListCreator(idLista, callback);
    opts.isScrollList = true;
    opts.rowNum.value = 10;
    $('#' + idLista).rup_list(opts);
}

export function createHeaderSticky(idLista, callback){
    let opts = commonListCreator(idLista, callback);
    opts.isHeaderSticky = true;
    $('#' + idLista).rup_list(opts);
}

export function createShowHide(idLista, callback){
    let opts = commonListCreator(idLista, callback);
    opts.show = {
        animation: 'fade',
        delay: 1000
    };
    opts.hide = {
        animation: 'fade',
        delay: 1000
    };
    $('#' + idLista).rup_list(opts);
}

export function createImpresionHTML(idLista, callback){
    let opts = commonListCreator(idLista, callback);
    opts.print = './print.css';
    $('#' + idLista).rup_list(opts);
}

export function createListMultiorder(idLista, callback){
    let opts = commonListCreator(idLista, callback);
    opts.isMultiSort = true;
    opts.sidx.value = 'EDAD,USUARIO';
    opts.sord = 'asc, desc';

    $('#' + idLista).rup_list(opts);
}