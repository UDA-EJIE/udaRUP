
/**
 * VENDOR
 */
import 'jquery';
import 'jquery-migrate';
import 'bootstrap';

import 'bootstrap/scss/bootstrap.scss';


/**
 * RUP
 */
import './helper/handlebars-helper-i18n.js';
import './rup.base';
import './rup.utils';
import './rup.accordion';
import './rup.autocomplete';
import './rup.breadCrumb';
import './rup.button';
import './rup.chart';
import './rup.combo';
import './rup.contextMenu';
import './rup_table/rup.table';
import './rup.date';
import './rup.dav';
import './rup.dialog';
import './rup.feedback';
import './rup.form';
import './rup.lang';
import './rup.menu';
import './rup.message';
import './rup.navbar';
import './rup.progressbar';
import './rup.report';
import './rup.slider';
import './rup.spinner';
import './rup.sticky';
import './rup.jqtable';
import './rup.tabs';
import './rup.time';
import './rup.toolbar';
import './rup.tooltip';
import './rup.tree';
import './rup.upload';
import './rup.validate';
import './rup.wizard';
import './rup.list';
import './rup.calendar';
import './rup.select';
import Rup from './templates';

import '../scss/rup-base.scss';
import '../scss/rup-theme.scss';


/**
 * GLOBAL DEFINITIONS
 */

global.Rup = Rup;
global.$ = global.jQuery = $;