import $ from 'jquery';
window.jQuery = $;
window.$ = $;

// Cargar dependencias con orden explícito
import 'jquery-ui/ui/widgets/dialog';
import 'jquery-ui/ui/widgets/datepicker'; // <- requerido primero
import './src/index.js'; 


const context = require.context('./src', true, /\.js$/);
context.keys()
  .filter((key) =>
    !key.includes('bootstrap-calendar/js/templates.js') &&
    !key.includes('bootstrap-calendar/js/calendar.js') &&
    !key.includes('bootstrap-calendar/js/app.js')
  )
  .forEach(context);