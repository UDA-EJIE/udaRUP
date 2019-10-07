import 'jquery';
import 'jquery-migrate';
import 'bootstrap';
import '../../dist/css/externals/bootstrap/bootstrap.min.css';
import 'highlight.js/styles/atom-one-dark.css';
import '../../scss/rup-base.scss';
import '../../scss/rup-theme.scss';
import '../../scss/main.scss';
import '../demo.scss';

import {
    RupResponsiveDemoApp
} from 'app.js';

global.$ = global.jQuery = jQuery;

RupResponsiveDemoApp.start();