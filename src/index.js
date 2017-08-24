import 'expose-loader?jQuery!jquery';
import 'expose-loader?$!jquery';

global.$ = global.jQuery = $;

import './rup.base';
import './rup.utils';
import './rup.accordion';
import './rup.autocomplete';
import './rup.breadCrumb';
import './rup.button';
import './rup.chart';
import './rup.combo';
import './rup.contextMenu';
import './datatable/rup.datatable';
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
import './rup.table';
import './rup.tabs';
import './rup.time';
import './rup.toolbar';
import './rup.tooltip';
import './rup.tree';
import './rup.upload';
import './rup.validate';
import './rup.wizard';

import 'tether';
