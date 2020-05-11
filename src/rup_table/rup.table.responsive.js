/**
 * Módulo que permite a la tabla adaptarse dinámicamente al ancho disponible.
 * 
 * @summary     Extensión del componente Responsive
 * @version     1.0.0
 * @file        rup.table.responsive.js
 * @license
 * Licencia con arreglo a la EUPL, Versión 1.1 exclusivamente (la «Licencia»);
 * Solo podrá usarse esta obra si se respeta la Licencia.
 * Puede obtenerse una copia de la Licencia en
 *
 *      http://ec.europa.eu/idabc/eupl.html
 *
 * Salvo cuando lo exija la legislación aplicable o se acuerde por escrito,
 * el programa distribuido con arreglo a la Licencia se distribuye «TAL CUAL»,
 * SIN GARANTÍAS NI CONDICIONES DE NINGÚN TIPO, ni expresas ni implícitas.
 * Véase la Licencia en el idioma concreto que rige los permisos y limitaciones
 * que establece la Licencia.
 * @copyright   Copyright 2019 E.J.I.E., S.A.
 */
(function( factory ){
    if ( typeof define === 'function' && define.amd ) {
        // AMD
        define( ['jquery', 'datatables.net', 'datatables.net-bs4', 'datatables.net-responsive', 'datatables.net-responsive-bs4'], function ( $ ) {
            return factory( $, window, document );
        } );
    }
    else if ( typeof exports === 'object' ) {
        // CommonJS
        module.exports = function (root, $) {
            if ( ! root ) {
                root = window;
            }

            if ( ! $ || ! $.fn.dataTable ) {
                $ = require('datatables.net')(root, $).$;
            }

            return factory( $, root, root.document );
        };
    }
    else {
        // Browser
        factory( jQuery, window, document );
    }
}(function($) {
    'use strict';
    var DataTable = $.fn.dataTable;

    DataTable.Responsive.prototype._detailsObj = function(rowIdx)
    {
        var that = this;
        var dt = this.s.dt;

        return $.map( this.s.columns, function( col, i ) {
        // Never and control columns should not be passed to the renderer
            if ( col.never || col.control ) {
                return;
            }

            return {
                title:       dt.settings()[0].aoColumns[ i ].sTitle.substring(dt.settings()[0].aoColumns[ i ].sTitle.indexOf('<span>'), dt.settings()[0].aoColumns[ i ].sTitle.indexOf('</span>') + 7),
                data:        dt.cell( rowIdx, i ).render( that.c.orthogonal ),
                hidden:      dt.column( i ).visible() && !that.s.current[ i ],
                columnIndex: i,
                rowIndex:    rowIdx
            };
        } );
    };

}));
