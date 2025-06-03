import $ from 'jquery';
window.jQuery = $;
window.$ = $;

// Cargar dependencias con orden explícito
import './src/external/bootstrap-calendar/js/calendar.js';
import './src/external/bootstrap-calendar/js/app.js'; // usa .calendar()

const context = require.context('./src', true, /\.js$/);
context.keys()
  .filter((key) =>
    !key.includes('bootstrap-calendar/js/templates.js') &&
    !key.includes('bootstrap-calendar/js/calendar.js') &&
    !key.includes('bootstrap-calendar/js/app.js')
  )
  .forEach(context);