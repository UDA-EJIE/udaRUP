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
        <label for="apellido1_filter_table" class="formulario_linea_label">Primer apellido:</label>\
        <input type="text" name="apellido1" class="formulario_linea_input form-control" id="apellido1_filter_table" />\
      </div>\
    </div>\
    <div class="col-xs-6 col-md-3">\
      <div class="form-group form-group-sm">\
        <label for="apellido2_filter_table" class="formulario_linea_label">Segundo apellido:</label>\
        <input type="text" name="apellido2" class="formulario_linea_input form-control" id="apellido2_filter_table" />\
      </div>\
    </div>\
  </div>\
  <div class="row">\
    <div class="col-xs-6 col-md-3">\
      <div class="form-group form-group-sm">\
        <label for="ejie_filter_table" class="formulario_linea_label">Ejie:</label>\
        <div style="float: left;"><select id="ejie_filter_table" name="ejie" class="rup-combo form-control" ></select></div>\
      </div>\
    </div>\
    <div class="col-xs-6 col-md-3">\
      <div class="form-group form-group-sm">\
        <label for="fechaAlta_filter_table" class="formulario_linea_label">Fecha de alta:</label>\
        <input type="text" name="fechaAlta" class="formulario_linea_input form-control" id="fechaAlta_filter_table" />\
      </div>\
    </div>\
    <div class="col-xs-6 col-md-3">\
      <div class="form-group form-group-sm">\
        <label for="fechaBaja_filter_table" class="formulario_linea_label">Fecha de baja:</label>\
        <input type="text" name="fechaBaja" class="formulario_linea_input form-control" id="fechaBaja_filter_table" />\
      </div>\
    </div>\
    <div class="col-xs-6 col-md-3">\
      <div class="form-group form-group-sm">\
        <label for="rol_filter_table" class="formulario_linea_label">Rol:</label>\
        <input type="text" name="rol" class="formulario_linea_input form-control" id="rol_filter_table" />\
      </div>\
    </div>\
  </div>\
  <!-- Botonera del formulario de filtrado -->\
  <div id="example_filter_buttonSet" class="right_buttons">\
      <!-- Enlace de limpiar -->\
      <!-- <button id="example_filter_cleanLink" type="button" class="btn btn-warning btn-block">Limpiar</button> -->\
      <a id="example_filter_cleanLink" href="javascript:void(0)" class="rup-enlaceCancelar">Limpiar</a>\
      <!-- Botón de filtrado -->\
      <button id="example_filter_filterButton" type="button" class="btn btn-info btn-block">Filtrar</button>\
  </div>\
</fieldset>\
</form>\
<table id="example" class="tableFit table-striped table-bordered" \
  data-url-base="'+ dataUrl +'"\
  data-filter-form="#example_filter_form" \
  cellspacing="0">\
      <thead>\
          <tr>\
              <th data-col-prop="id">Id</th>\
              <th data-col-prop="nombre">Nombre</th>\
              <th data-col-prop="apellido1">Primer apellido</th>\
              <th data-col-prop="ejie" data-col-type="Checkbox">Ejie</th>\
              <th data-col-prop="fechaAlta" data-col-sidx="fecha_alta" data-col-type="Datepicker">Fecha alta</th>\
              <th data-col-prop="fechaBaja" data-col-sidx="fecha_baja" data-col-type="Datepicker">Fecha baja</th>\
              <th data-col-prop="rol" data-col-type="combo">Rol</th>\
          </tr>\
      </thead>\
      <tfoot>\
        <tr>\
            <th>Id</th>\
            <th>Nombre</th>\
            <th>Primer apellido</th>\
            <th>Ejie</th>\
            <th>Fecha alta</th>\
            <th>Fecha baja</th>\
            <th>Rol</th>\
        </tr>\
      </tfoot>\
</table>\
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
                  <label for="apellido1_detail_table">Primer apellido:</label>\
                  <input type="text" name="apellido1" class="formulario_linea_input" id="apellido1_detail_table" />\
              </div>\
              <div class="floating_left_pad_right one-column">\
                  <label for="apellido2_detail_table">Segundo apellido:</label>\
                  <input type="text" name="apellido2" class="formulario_linea_input" id="apellido2_detail_table" />\
              </div>\
              <div class="floating_left_pad_right one-column">\
                  <label for="ejie_detail_table">ejie:</label>\
                  <input type="checkbox" id="ejie_detail_table" name="ejie"  value="1"/>\
              </div>\
              <div class="floating_left_pad_right one-column">\
                  <label for="fechaAlta_detail_table">fechaAlta:</label>\
                  <input type="text" name="fechaAlta" class="formulario_linea_input" id="fechaAlta_detail_table" />\
              </div>\
              <div class="floating_left_pad_right one-column" style="clear: left;">\
                  <label for="fechaBaja_detail_table">fechaBaja:</label>\
                  <input type="text" name="fechaBaja" class="formulario_linea_input" id="fechaBaja_detail_table" />\
              </div>\
              <div class="floating_left_pad_right one-column">\
                  <label for="rol_detail_table">rol:</label>\
                  <select id="rol_detail_table" name="rol" class="formulario_linea_input" ></select>\
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
</div>';

var _html = html;
export { _html as html };