// /* jslint multistr: true */
// function generateHtml(idDatatable) {
//     var html =
//         '<div class="row">\
//         <div class="col-md-12">\
//             <form id="' + idDatatable + '_filter_form">\
//                 <div id="' + idDatatable + '_filter_toolbar" class="formulario_legend"></div>\
//                 <fieldset id="' + idDatatable + '_filter_fieldset" class="rup-table-filter-fieldset">\
//                     <div class="row">\
//                         <div class="form-groupMaterial col-sm">\
//                         	<input type="text" name="id" id="id_filter_table" />\
//                             <label for="id_filter_table">Id</label>\
//                         </div>\
//                         <div class="form-groupMaterial col-sm">\
//                         	<input type="text" name="nombre" id="nombre_filter_table" />\
//                             <label for="nombre_filter_table">Nombre</label>\
//                         </div>\
//                         <div class="form-groupMaterial col-sm">\
//                         	<input type="text" name="apellido1" id="apellido1_filter_table" />\
//                             <label for="apellido1_filter_table">Apellidos</label>\
//                         </div>\
//                         <div class="form-groupMaterial col-sm">\
//                         	<input type="text" name="fechaAlta" id="fechaAlta_filter_table" />\
//                             <label for="fechaAlta_filter_table">Fecha Alta</label>\
//                         </div>\
//                     </div>\
//                     <!-- Botonera del formulario de filtrado -->\
//                     <div id="' + idDatatable + '_filter_buttonSet" class="text-right">\
//                         <!-- Enlace de limpiar -->\
//                         <button id="' + idDatatable + '_filter_cleanButton" type="button" class="btn-material btn-material-primary-low-emphasis mr-2">\
//                         <i class="mdi mdi-eraser"></i>\
//                         	<span>Limpiar</span>\
//                         </button>\
//                         <!-- Botón de filtrado -->\
//                         <button id="' + idDatatable + '_filter_filterButton" type="button" class="btn-material btn-material-primary-high-emphasis">\
//                         	<i class="mdi mdi-filter"></i>\
//                         	<span>Filtrar</span> \
//                         </button>\
//                     </div>\
//                 </fieldset>\
//             </form>\
//         <div>\
//     <div>\
//     <div id="' + idDatatable + '_detail_div" class="rup-table-formEdit-detail">\
//         <div id ="' + idDatatable + '_detail_navigation" class="row no-gutters"></div>\
//         <hr class="m-1">\
//         <div class="dialog-content-material" >\
//             <form id="' + idDatatable + '_detail_form">\
//                 <div id ="' + idDatatable + '_detail_feedback"></div>\
//                 <div class="form-row">\
//                     <div class="form-groupMaterial col-sm">\
//                     	<input type="text" name="id" id="id_detail_table" />\
//                         <label for="id_detail_table">Id</label>\
//                     </div>\
//                     <div class="form-groupMaterial col-sm">\
//                     	<input type="text" name="nombre" id="nombre_detail_table" />\
//                         <label for="nombre_detail_table">Nombre</label>\
//                     </div>\
//                     <div class="form-groupMaterial col-sm">\
//                     	<input type="text" name="apellido1" id="apellido1_detail_table" />\
//                         <label for="apellido1_detail_table">Apellidos</label>\
//                     </div>\
//                     <div class="form-groupMaterial col-sm">\
//                     	<input type="text" name="fechaAlta" id="fechaAlta_detail_table" />\
//                         <label for="fechaAlta_detail_table">Fecha Alta</label>\
//                     </div>\
//                 </div>\
//                 \
//             </form>\
//         </div>\
//         <div class="rup-table-buttonpanel-material">\
//             <div class="text-right">\
//                 <button id="' + idDatatable + '_detail_button_cancel" type="button">\
//                 	Cancelar\
//                 </button>\
//                 <button id="' + idDatatable + '_detail_button_save" type="button">\
//                     Guardar\
//                 </button>\
//                 <button id="' + idDatatable + '_detail_button_save_repeat" type="button">\
//                     Guardar y continuar\
//                 </button>\
//             </div>\
//         </div>\
//     </div>\
//     <div class="row">\
//         <div class="col-md-12">\
//             <table id="' + idDatatable + '" class="tableFit table-striped table-bordered table-material" \
//                 data-filter-form="#' + idDatatable + '_filter_form">\
//                 <thead>\
//                     <tr>\
//                         <th data-col-prop="id">Id</th>\
//                         <th data-col-prop="nombre">Nombre</th>\
//                         <th data-col-prop="apellido1">Apellidos</th>\
//                         <th data-col-prop="fechaAlta" data-col-sidx="fecha_alta" data-col-type="Datepicker">Fecha alta</th>\
//                     </tr>\
//                 </thead>\
//             </table>\
//         </div>\
//     </div>';
//     return html;
// }
// function createDatatable1(ctx, callback) {
//     var idDatatable = '';
//     var opts = {};
//     if (ctx == 0) {
//         idDatatable = 'example';
//         $.extend(opts, true, {
//             multiSelect: {
//                 style: 'multi'
//             }
//         });
//     } else {
//         idDatatable = 'example1';
//         $.extend(opts, true, {
//             multiSelect: {
//                 style: 'simple'
//             }
//         });
//     }

//     var defaults = {
//         urlBase: window.location.origin+'/x21aAppWar/table',
//         pageLength: 9,
//         fixedHeader: {
//             footer: false,
//             header: true
//         },
//         filter: {
//             id: idDatatable + '_filter_form',
//             filterToolbar: idDatatable + '_filter_toolbar',
//             collapsableLayerId: idDatatable + '_filter_fieldset'
//         },
//         formEdit: {
//             detailForm: '#' + idDatatable + '_detail_div',
//             validate: {
//                 rules: {
//                     nombre: {
//                         required: true
//                     },
//                     apellido1: {
//                         required: true
//                     },
//                     fechaAlta: {
//                         date: true
//                     },
//                     fechaBaja: {
//                         date: true
//                     }
//                 }
//             },
//             titleForm: 'Modificar registro'
//         },
//         buttons: {
//             'activate': true
//         },
//         seeker: {
//             colModel: [{
//                 name: 'id',
//                 index: 'id',
//                 editable: true,
//                 width: 80,
//                 formoptions: {
//                     rowpos: 1,
//                     colpos: 1
//                 }
//             }, {
//                 name: 'nombre',
//                 index: 'nombre',
//                 editable: true,
//                 formoptions: {
//                     rowpos: 2,
//                     colpos: 1
//                 }
//             }, {
//                 name: 'apellido1',
//                 index: 'apellidos',
//                 editable: true,
//                 formoptions: {
//                     rowpos: 3,
//                     colpos: 1
//                 },
//                 classes: 'ui-ellipsis'
//             }, {name: 'fechaAlta',  index: 'fecha_alta', editable:true, hidden:false, width: 120,
// 				rupType: 'date',
// 				rwdClasses:'hidden-xs hidden-sm hidden-md',
// 				editoptions:{
// 					labelMaskId : 'fecha-mask',
// 					showButtonPanel : true,
// 					showOtherMonths : true,
// 					noWeekend : true
// 				}
// 				, formoptions:{rowpos:2, colpos:2}
// 			}]
//         },
//         colReorder: {
//             fixedColumnsLeft: 1
//         },
//         initComplete: function () {
//             setTimeout(function () {
//                 callback();
//             }, 300);
            
//         }
//     };

//     $.extend(opts, true, defaults);

//     if ($('#content').length == 0) {
//         $('body').append('<div id="content" class="container mt-4"></div>');
//     }
//     var html = generateHtml(idDatatable);
//     $('#content').append(html);
//     $('#' + idDatatable).rup_table(opts);

// }

// function createDatatable2(callback) {
//     var idDatatable = 'example2';
//     var opts = {
//         multiSelect: {
//             style: 'multi'
//         },
//         urlBase: window.location.origin+'/x21aAppWar/table',
//         // serverSide: true,
//         // deferLoading: 15,
//         pageLength: 5,
//         fixedHeader: {
//             footer: false,
//             header: true
//         },
//         filter: {
//             id: idDatatable + '_filter_form',
//             filterToolbar: idDatatable + '_filter_toolbar',
//             collapsableLayerId: idDatatable + '_filter_fieldset'
//         },
//         formEdit: {
//             detailForm: '#' + idDatatable + '_detail_div',
//             validate: {
//                 rules: {
//                     nombre: {
//                         required: true
//                     },
//                     apellido1: {
//                         required: true
//                     },
//                     fechaAlta: {
//                         date: true
//                     },
//                     fechaBaja: {
//                         date: true
//                     }
//                 }
//             },
//             titleForm: 'Modificar registro'
//         },
//         buttons: {
//             'activate': true
//         },
//         seeker: {
//             colModel: [{
//                 name: 'id',
//                 index: 'id',
//                 editable: true,
//                 width: 80,
//                 formoptions: {
//                     rowpos: 1,
//                     colpos: 1
//                 }
//             }, {
//                 name: 'nombre',
//                 index: 'nombre',
//                 editable: true,
//                 formoptions: {
//                     rowpos: 2,
//                     colpos: 1
//                 }
//             }, {
//                 name: 'apellidos',
//                 index: 'apellidos',
//                 editable: true,
//                 formoptions: {
//                     rowpos: 3,
//                     colpos: 1
//                 },
//                 classes: 'ui-ellipsis'
//             }, {
//                 name: 'edad',
//                 index: 'edad',
//                 editable: true,
//                 formoptions: {
//                     rowpos: 4,
//                     colpos: 1
//                 }
//             }]
//         },
//         colReorder: {
//             fixedColumnsLeft: 1
//         },
//         initComplete: function () {
//             setTimeout(function () {
//                 $('#' + idDatatable + ' > tbody').children().remove();
//                 callback();
//             }, 300);
//         }
//     };

//     if ($('#content').length == 0) {
//         $('body').append('<div id="content" class="container mt-4"></div>');
//     }
//     var html = generateHtml(idDatatable);
//     $('#content').append(html);
//     $('#' + idDatatable).rup_table(opts);
// }