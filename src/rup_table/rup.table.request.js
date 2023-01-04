/**
  * Encargado de mapear el objeto de base de datos al multiSelect
  *
  * @summary 		Extensión del componente RUP Datatable
  * @module			"rup.table.request"
  * @version     1.0.0
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
  * @copyright   Copyright 2018 E.J.I.E., S.A.
  *
  */

'use strict';

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.returnExports = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {

    var TableRequest = function(data){

        var start = data.start,
            length = data.length,
            page = (start / length) + 1,
            sidx = '', sord = '';

        if (data.order.length == 1){
            sidx = data.columns[data.order[0].column].colSidx ||  data.columns[data.order[0].column].data;
            sord = data.order[0].dir;
            
            delete data.columns[data.order[0].column].colSidx;
        }else if (data.order.length > 1){
        	for (let i = 0; i<data.order.length; i++) {
        			sidx += data.columns[data.order[i].column].colSidx || data.columns[data.order[i].column].data;
        			sord += data.order[i].dir;
        		if(i<data.order.length-1){
        			sidx += ' ,';
        			sord += ' ,';
        		}
                
                delete data.columns[data.order[i].column].colSidx;
        	}
        }

        // super(length, (start / length) + 1, 'id', 'asc');
        this._data = data;
        this._start = start;
        this._length = length;
        this._filter = data.filter;

        this._rows = length;
        this._page = page;
        this._sidx = sidx;
        this._sord = sord;
        this._filter = data.filter;
    };

    TableRequest.prototype = {

        set rows(rows) {
            this._rows = rows;
        },
        get rows() {
            return this._rows;
        },
        set page(page) {
            this._page = page;
        },
        get page() {
            return this._page;
        },
        set sidx(sidx) {
            this._sidx = sidx;
        },
        get sidx() {
            return this._sidx;
        },
        set sord(sord) {
            this._sord = sord;
        },
        get sord() {
            return this._sord;
        },
        set filter(filter) {
            this._filter = filter;
        },
        get filter() {
            return this._filter;
        }
    };

    /**
        * Obtiene el objeto a mapear en el multiselect.
        *
        * @name getData
        * @function
        * @since UDA 3.4.0 // Table 1.0.0
        *
        * @return {TableRequest}
        *
      */
    TableRequest.prototype.getData = function(){

        return {
            rows: this._rows,
            page: this._page,
            sidx: this._sidx,
            sord: this._sord,
            filter: this._filter,
            nd: Date.now(),
            core: {
                pkToken: '~',
                pkNames: ['id']
            }
        };

    };

    return TableRequest;

}));
