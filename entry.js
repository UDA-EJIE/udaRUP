import $ from 'jquery';
window.jQuery = $;
window.$ = $;

import 'jquery-ui/ui/effects/effect-slide';
import 'jquery-ui/ui/effect'; // Core de efectos

// Cargar dependencias con orden explícito
import 'jquery-ui/ui/widgets/dialog';
import 'jquery-ui/ui/widgets/datepicker'; // <- requerido primero
import 'jquery-ui/ui/widgets/tabs';
import './src/index.js'; 


const context = require.context('./src', true, /\.js$/);
context.keys()
  .filter((key) =>
    !key.includes('bootstrap-calendar/js/templates.js') &&
    !key.includes('bootstrap-calendar/js/calendar.js') &&
    !key.includes('bootstrap-calendar/js/app.js')
  )
  .forEach(context);