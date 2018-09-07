/* jslint multistr: true */

var dataUrl = 'http://localhost:8081/demo/datatable/remote';
var html = '<form id="example_filter_form">\
<div id="example_filter_toolbar" class="formulario_legend"></div>\
<fieldset id="example_filter_fieldset" class="rup-table-filter-fieldset">\
  <div class="row">\
    <div class="col-xs-6 col-md-3">\
      <div class="form-group form-group-sm">\
        <label for="id_filter_table" class="formulario_linea_label">Id:</label>\
        <input type="text" name="id" class="formulario_linea_input form-control" id="id_filter_table" />\
      </div>\
    </div>\
    <div class="col-xs-6 col-md-3">\
      <div class="form-group form-group-sm">\
        <label for="nombre_filter_table" class="formulario_linea_label">Nombre:</label>\
        <input type="text" name="nombre" class="formulario_linea_input form-control" id="nombre_filter_table" />\
      </div>\
    </div>\
    <div class="col-xs-6 col-md-3">\
      <div class="form-group form-group-sm">\
        <label for="apellidos_filter_table" class="formulario_linea_label">Apellidos:</label>\
        <input type="text" name="apellidos" class="formulario_linea_input form-control" id="apellidos_filter_table" />\
      </div>\
    </div>\
    <div class="col-xs-6 col-md-3">\
      <div class="form-group form-group-sm">\
        <label for="edad_filter_table" class="formulario_linea_label">Edad:</label>\
        <input type="text" name="edad" class="formulario_linea_input form-control" id="edad_filter_table" />\
      </div>\
    </div>\
  </div>\
  <!-- Botonera del formulario de filtrado -->\
  <div id="example_filter_buttonSet" class="right_buttons">\
      <!-- Enlace de limpiar -->\
      <!-- <button id="example_filter_cleanLink" type="button" class="btn btn-warning btn-block">Limpiar</button> -->\
      <a id="example_filter_cleanLink" href="javascript:void(0)" class="rup-enlaceCancelar">Limpiar</a>\
      <!-- Botón de filtrado -->\
      <button id="example_filter_filterButton" type="button" class="btn btn-info btn-block rup-filtrar">Filtrar</button>\
  </div>\
</fieldset>\
</form>\
<div id="example_detail_div" class="rup-table-formEdit-detail">\
  <div id ="example_detail_navigation"></div>\
  <div class="ui-dialog-content ui-widget-content" >\
      <form id="example_detail_form">\
          <div id ="example_detail_feedback"></div>\
          <div class="floating_left_pad_right">\
              <div class="floating_left_pad_right one-column">\
                  <label for="id_detailForm_table">id:</label>\
                  <input type="text" name="id" class="formulario_linea_input" id="id_detailForm_table" />\
              </div>\
              <div class="floating_left_pad_right one-column">\
                  <label for="nombre_detail_table">Nombre:</label>\
                  <input type="text" name="nombre" class="formulario_linea_input" id="nombre_detail_table" />\
              </div>\
              <div class="floating_left_pad_right one-column">\
                  <label for="apellidos_detail_table">Apellidos:</label>\
                  <input type="text" name="apellidos" class="formulario_linea_input" id="apellidos_detail_table" />\
              </div>\
              <div class="floating_left_pad_right one-column">\
                  <label for="edad_detail_table">Edad:</label>\
                  <input type="text" name="edad" class="formulario_linea_input" id="edad_detail_table" />\
              </div>\
          </div>\
          \
      </form>\
  </div>\
  <div class="rup-table-buttonpane ui-widget-content ui-helper-clearfix">\
      <div class="ui-dialog-buttonset">\
          <button id="example_detail_button_save" class="btn btn-outline-success" type="button">\
              Guardar\
          </button>\
          <button id="example_detail_button_save_repeat" class="btn btn-outline-success" type="button">\
              Guardar y continuar\
          </button>\
          <button id="example_detail_link_cancel" class="btn btn-outline-danger" type="button">\
              Cancelar\
          </button>\
      </div>\
  </div>\
</div>\
<table id="example" class="tableFit table-striped table-bordered" \
  data-filter-form="#example_filter_form" \
  cellspacing="0">\
      <thead>\
          <tr>\
              <th data-col-prop="id">Id</th>\
              <th data-col-prop="nombre">Nombre</th>\
              <th data-col-prop="apellidos">Apellidos</th>\
              <th data-col-prop="edad">Edad</th>\
          </tr>\
      </thead>\
      <tfoot>\
        <tr>\
            <th>Id</th>\
            <th>Nombre</th>\
            <th>Apellidos</th>\
            <th>Edad</th>\
        </tr>\
      </tfoot>\
</table>';

var _html = html;
export { _html as html };