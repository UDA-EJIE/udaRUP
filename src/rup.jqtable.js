
        ( function( factory ) {
         if ( typeof define === "function" && define.amd ) {

            // AMD. Register as an anonymous module.
            define( ["jquery","./rup.base","./rup.form", "./rup.contextMenu", "./rup.toolbar","./rup.report","./core/utils/form2object"], factory );
         } else {

            // Browser globals
            factory( jQuery );
         }
        } ( 
            function( $ ) {
               initRupI18nPromise.then(() => {
                  // ==ClosureCompiler==
// @compilation_level SIMPLE_OPTIMIZATIONS

/*
 * @license jqGrid  4.4.4  - jQuery Grid
 * Copyright (c) 2008, Tony Tomov, tony@trirand.com
 * Dual licensed under the MIT and GPL licenses
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
 * Date: 2013-01-30
 */
//jsHint options
/*jshint evil:true, eqeqeq:false, eqnull:true, devel:true */
/*global jQuery, DOMParser, ActiveXObject */

var rp_ge = {};

(function ($) {
	'use strict';
	$.jgrid = $.jgrid || {};
	$.extend($.jgrid,{
		version : '4.4.4',
		htmlDecode : function(value){
			if(value && (value=='&nbsp;' || value=='&#160;' || (value.length===1 && value.charCodeAt(0)===160))) { return '';}
			return !value ? value : String(value).replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&quot;/g, '"').replace(/&amp;/g, '&');
		},
		htmlEncode : function (value){
			return !value ? value : String(value).replace(/&/g, '&amp;').replace(/\"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
		},
		format : function(format){ //jqgformat
			var args = $.makeArray(arguments).slice(1);
			if(format==null) { format = ''; }
			return format.replace(/\{(\d+)\}/g, function(m, i){
				return args[i];
			});
		},
		msie : navigator.appName == 'Microsoft Internet Explorer',
		msiever : function () {
			var rv = -1;
			var ua = navigator.userAgent;
			var re  = new RegExp('MSIE ([0-9]{1,}[\.0-9]{0,})');
			if (re.exec(ua) != null) {
				rv = parseFloat( RegExp.$1 );
			}
			return rv;
		},
		getCellIndex : function (cell) {
			var c = $(cell);
			if (c.is('tr')) { return -1; }
			c = (!c.is('td') && !c.is('th') ? c.closest('td,th') : c)[0];
			if ($.jgrid.msie) { return $.inArray(c, c.parentNode.cells); }
			return c.cellIndex;
		},
		stripHtml : function(v) {
			v = String(v);
			var regexp = /<("[^"]*"|'[^']*'|[^'">])*>/gi;
			if (v) {
				v = v.replace(regexp,'');
				return (v && v !== '&nbsp;' && v !== '&#160;') ? v.replace(/\"/g,'\'') : '';
			}
			return v;
		},
		stripPref : function (pref, id) {
			var obj = $.type( pref );
			if( obj == 'string' || obj =='number') {
				pref =  String(pref);
				id = pref !== '' ? String(id).replace(String(pref), '') : id;
			}
			return id;
		},
		stringToDoc : function (xmlString) {
			var xmlDoc;
			if(typeof xmlString !== 'string') { return xmlString; }
			try	{
				var parser = new DOMParser();
				xmlDoc = parser.parseFromString(xmlString,'text/xml');
			}
			catch(e) {
				xmlDoc = new ActiveXObject('Microsoft.XMLDOM');
				xmlDoc.async=false;
				xmlDoc.loadXML(xmlString);
			}
			return (xmlDoc && xmlDoc.documentElement && xmlDoc.documentElement.tagName != 'parsererror') ? xmlDoc : null;
		},
		parse : function(jsonString) {
			var js = jsonString;
			if (js.substr(0,9) == 'while(1);') { js = js.substr(9); }
			if (js.substr(0,2) == '/*') { js = js.substr(2,js.length-4); }
			if(!js) { js = '{}'; }
			return ($.jgrid.useJSON===true && typeof JSON === 'object' && typeof JSON.parse === 'function') ?
				JSON.parse(js) :
				eval('(' + js + ')');
		},
		parseDate : function(format, date) {
			var tsp = {m : 1, d : 1, y : 1970, h : 0, i : 0, s : 0, u:0},k,hl,dM, regdate = /[\\\/:_;.,\t\T\s-]/;
			if(date && date != null){
				date = $.trim(date);
				date = date.split(regdate);
				if ($.jgrid.formatter.date.masks[format] !== undefined) {
					format = $.jgrid.formatter.date.masks[format];
				}
				format = format.split(regdate);
				var dfmt  = $.jgrid.formatter.date.monthNames;
				var afmt  = $.jgrid.formatter.date.AmPm;
				var h12to24 = function(ampm, h){
					if (ampm === 0){ if (h === 12) { h = 0;} }
					else { if (h !== 12) { h += 12; } }
					return h;
				};
				for(k=0,hl=format.length;k<hl;k++){
					if(format[k] == 'M') {
						dM = $.inArray(date[k],dfmt);
						if(dM !== -1 && dM < 12){
							date[k] = dM+1;
							tsp.m = date[k];
						}
					}
					if(format[k] == 'F') {
						dM = $.inArray(date[k],dfmt);
						if(dM !== -1 && dM > 11){
							date[k] = dM+1-12;
							tsp.m = date[k];
						}
					}
					if(format[k] == 'a') {
						dM = $.inArray(date[k],afmt);
						if(dM !== -1 && dM < 2 && date[k] == afmt[dM]){
							date[k] = dM;
							tsp.h = h12to24(date[k], tsp.h);
						}
					}
					if(format[k] == 'A') {
						dM = $.inArray(date[k],afmt);
						if(dM !== -1 && dM > 1 && date[k] == afmt[dM]){
							date[k] = dM-2;
							tsp.h = h12to24(date[k], tsp.h);
						}
					}
					if (format[k] === 'g') {
						tsp.h = parseInt(date[k], 10);
					}
					if(date[k] !== undefined) {
						tsp[format[k].toLowerCase()] = parseInt(date[k],10);
					}
				}
				tsp.m = parseInt(tsp.m,10)-1;
				var ty = tsp.y;
				if (ty >= 70 && ty <= 99) {tsp.y = 1900+tsp.y;}
				else if (ty >=0 && ty <=69) {tsp.y= 2000+tsp.y;}
				if(tsp.j !== undefined) { tsp.d = tsp.j; }
				if(tsp.n !== undefined) { tsp.m = parseInt(tsp.n,10)-1; }
			}
			return new Date(tsp.y, tsp.m, tsp.d, tsp.h, tsp.i, tsp.s, tsp.u);
		},
		jqID : function(sid){
			return String(sid).replace(/[!"#$%&'()*+,.\/:; <=>?@\[\\\]\^`{|}~]/g,'\\$&');
		},
		guid : 1,
		uidPref: 'jqg',
		randId : function( prefix )	{
			return (prefix || $.jgrid.uidPref) + ($.jgrid.guid++);
		},
		getAccessor : function(obj, expr) {
			var ret,p,prm = [], i;
			if( typeof expr === 'function') { return expr(obj); }
			ret = obj[expr];
			if(ret===undefined) {
				try {
					if ( typeof expr === 'string' ) {
						prm = expr.split('.');
					}
					i = prm.length;
					if( i ) {
						ret = obj;
						while (ret && i--) {
							p = prm.shift();
							ret = ret[p];
						}
					}
				} catch (e) {}
			}
			return ret;
		},
		getXmlData: function (obj, expr, returnObj) {
			var ret, m = typeof expr === 'string' ? expr.match(/^(.*)\[(\w+)\]$/) : null;
			if (typeof expr === 'function') { return expr(obj); }
			if (m && m[2]) {
			// m[2] is the attribute selector
			// m[1] is an optional element selector
			// examples: "[id]", "rows[page]"
				return m[1] ? $(m[1], obj).attr(m[2]) : $(obj).attr(m[2]);
			}
			ret = $(expr, obj);
			if (returnObj) { return ret; }
			//$(expr, obj).filter(':last'); // we use ':last' to be more compatible with old version of jqGrid
			return ret.length > 0 ? $(ret).text() : undefined;
		},
		cellWidth : function () {
			var $testDiv = $('<div class=\'ui-jqgrid\' style=\'left:10000px\'><table class=\'ui-jqgrid-btable\' style=\'width:5px;\'><tr class=\'jqgrow\'><td style=\'width:5px;\'></td></tr></table></div>'),
				testCell = $testDiv.appendTo('body')
					.find('td')
					.width();
			$testDiv.remove();
			return testCell !== 5;
		},
		cell_width : true,
		ajaxOptions: {},
		from : function(source){
		// Original Author Hugo Bonacci
		// License MIT http://jlinq.codeplex.com/license
			var QueryObject=function(d,q){
				if(typeof d==='string'){
					d=$.data(d);
				}
				var self=this,
					_data=d,
					_usecase=true,
					_trim=false,
					_query=q,
					_stripNum = /[\$,%]/g,
					_lastCommand=null,
					_lastField=null,
					_orDepth=0,
					_negate=false,
					_queuedOperator='',
					_sorting=[],
					_useProperties=true;
				if(typeof d==='object'&&d.push) {
					if(d.length>0){
						if(typeof d[0]!=='object'){
							_useProperties=false;
						}else{
							_useProperties=true;
						}
					}
				}else{
					throw 'data provides is not an array';
				}
				this._hasData=function(){
					return _data===null?false:_data.length===0?false:true;
				};
				this._getStr=function(s){
					var phrase=[];
					if(_trim){
						phrase.push('jQuery.trim(');
					}
					phrase.push('String('+s+')');
					if(_trim){
						phrase.push(')');
					}
					if(!_usecase){
						phrase.push('.toLowerCase()');
					}
					return phrase.join('');
				};
				this._strComp=function(val){
					if(typeof val==='string'){
						return'.toString()';
					}
					return'';
				};
				this._group=function(f,u){
					return({field:f.toString(),unique:u,items:[]});
				};
				this._toStr=function(phrase){
					if(_trim){
						phrase=$.trim(phrase);
					}
					phrase=phrase.toString().replace(/\\/g,'\\\\').replace(/\"/g,'\\"');
					return _usecase ? phrase : phrase.toLowerCase();
				};
				this._funcLoop=function(func){
					var results=[];
					$.each(_data,function(i,v){
						results.push(func(v));
					});
					return results;
				};
				this._append=function(s){
					var i;
					if(_query===null){
						_query='';
					} else {
						_query+=_queuedOperator === '' ? ' && ' :_queuedOperator;
					}
					for (i=0;i<_orDepth;i++){
						_query+='(';
					}
					if(_negate){
						_query+='!';
					}
					_query+='('+s+')';
					_negate=false;
					_queuedOperator='';
					_orDepth=0;
				};
				this._setCommand=function(f,c){
					_lastCommand=f;
					_lastField=c;
				};
				this._resetNegate=function(){
					_negate=false;
				};
				this._repeatCommand=function(f,v){
					if(_lastCommand===null){
						return self;
					}
					if(f!==null&&v!==null){
						return _lastCommand(f,v);
					}
					if(_lastField===null){
						return _lastCommand(f);
					}
					if(!_useProperties){
						return _lastCommand(f);
					}
					return _lastCommand(_lastField,f);
				};
				this._equals=function(a,b){
					return(self._compare(a,b,1)===0);
				};
				this._compare=function(a,b,d){
					var toString = Object.prototype.toString;
					if( d === undefined) { d = 1; }
					if(a===undefined) { a = null; }
					if(b===undefined) { b = null; }
					if(a===null && b===null){
						return 0;
					}
					if(a===null&&b!==null){
						return 1;
					}
					if(a!==null&&b===null){
						return -1;
					}
					if (toString.call(a) === '[object Date]' && toString.call(b) === '[object Date]') {
						if (a < b) { return -d; }
						if (a > b) { return d; }
						return 0;
					}
					if(!_usecase && typeof a !== 'number' && typeof b !== 'number' ) {
						a=String(a);
						b=String(b);
					}
					if(a<b){return -d;}
					if(a>b){return d;}
					return 0;
				};
				this._performSort=function(){
					if(_sorting.length===0){return;}
					_data=self._doSort(_data,0);
				};
				this._doSort=function(d,q){
					var by=_sorting[q].by,
						dir=_sorting[q].dir,
						type = _sorting[q].type,
						dfmt = _sorting[q].datefmt;
					if(q==_sorting.length-1){
						return self._getOrder(d, by, dir, type, dfmt);
					}
					q++;
					var values=self._getGroup(d,by,dir,type,dfmt), results=[], i, j, sorted;
					for(i=0;i<values.length;i++){
						sorted=self._doSort(values[i].items,q);
						for(j=0;j<sorted.length;j++){
							results.push(sorted[j]);
						}
					}
					return results;
				};
				this._getOrder=function(data,by,dir,type, dfmt){
					var sortData=[],_sortData=[], newDir = dir=='a' ? 1 : -1, i,ab,j,
						findSortKey;

					if(type === undefined ) { type = 'text'; }
					if (type == 'float' || type== 'number' || type== 'currency' || type== 'numeric') {
						findSortKey = function($cell) {
							var key = parseFloat( String($cell).replace(_stripNum, ''));
							return isNaN(key) ? 0.00 : key;
						};
					} else if (type=='int' || type=='integer') {
						findSortKey = function($cell) {
							return $cell ? parseFloat(String($cell).replace(_stripNum, '')) : 0;
						};
					} else if(type == 'date' || type == 'datetime') {
						findSortKey = function($cell) {
							return $.jgrid.parseDate(dfmt,$cell).getTime();
						};
					} else if($.isFunction(type)) {
						findSortKey = type;
					} else {
						findSortKey = function($cell) {
							$cell = $cell ? $.trim(String($cell)) : '';
							return _usecase ? $cell : $cell.toLowerCase();
						};
					}
					$.each(data,function(i,v){
						ab = by!=='' ? $.jgrid.getAccessor(v,by) : v;
						if(ab === undefined) { ab = ''; }
						ab = findSortKey(ab, v);
						_sortData.push({ 'vSort': ab,'index':i});
					});

					_sortData.sort(function(a,b){
						a = a.vSort;
						b = b.vSort;
						return self._compare(a,b,newDir);
					});
					j=0;
					var nrec= data.length;
					// overhead, but we do not change the original data.
					while(j<nrec) {
						i = _sortData[j].index;
						sortData.push(data[i]);
						j++;
					}
					return sortData;
				};
				this._getGroup=function(data,by,dir,type, dfmt){
					var results=[],
						group=null,
						last=null, val;
					$.each(self._getOrder(data,by,dir,type, dfmt),function(i,v){
						val = $.jgrid.getAccessor(v, by);
						if(val == null) { val = ''; }
						if(!self._equals(last,val)){
							last=val;
							if(group !== null){
								results.push(group);
							}
							group=self._group(by,val);
						}
						group.items.push(v);
					});
					if(group !== null){
						results.push(group);
					}
					return results;
				};
				this.ignoreCase=function(){
					_usecase=false;
					return self;
				};
				this.useCase=function(){
					_usecase=true;
					return self;
				};
				this.trim=function(){
					_trim=true;
					return self;
				};
				this.noTrim=function(){
					_trim=false;
					return self;
				};
				this.execute=function(){
					var match=_query, results=[];
					if(match === null){
						return self;
					}
					$.each(_data,function(){
						if(eval(match)){results.push(this);}
					});
					_data=results;
					return self;
				};
				this.data=function(){
					return _data;
				};
				this.select=function(f){
					self._performSort();
					if(!self._hasData()){ return[]; }
					self.execute();
					if($.isFunction(f)){
						var results=[];
						$.each(_data,function(i,v){
							results.push(f(v));
						});
						return results;
					}
					return _data;
				};
				this.hasMatch=function(){
					if(!self._hasData()) { return false; }
					self.execute();
					return _data.length>0;
				};
				this.andNot=function(f,v,x){
					_negate=!_negate;
					return self.and(f,v,x);
				};
				this.orNot=function(f,v,x){
					_negate=!_negate;
					return self.or(f,v,x);
				};
				this.not=function(f,v,x){
					return self.andNot(f,v,x);
				};
				this.and=function(f,v,x){
					_queuedOperator=' && ';
					if(f===undefined){
						return self;
					}
					return self._repeatCommand(f,v,x);
				};
				this.or=function(f,v,x){
					_queuedOperator=' || ';
					if(f===undefined) { return self; }
					return self._repeatCommand(f,v,x);
				};
				this.orBegin=function(){
					_orDepth++;
					return self;
				};
				this.orEnd=function(){
					if (_query !== null){
						_query+=')';
					}
					return self;
				};
				this.isNot=function(f){
					_negate=!_negate;
					return self.is(f);
				};
				this.is=function(f){
					self._append('this.'+f);
					self._resetNegate();
					return self;
				};
				this._compareValues=function(func,f,v,how,t){
					var fld;
					if(_useProperties){
						fld='jQuery.jgrid.getAccessor(this,\''+f+'\')';
					}else{
						fld='this';
					}
					if(v===undefined) { v = null; }
					//var val=v===null?f:v,
					var val =v,
						swst = t.stype === undefined ? 'text' : t.stype;
					if(v !== null) {
						switch(swst) {
						case 'int':
						case 'integer':
							val = (isNaN(Number(val)) || val==='') ? '0' : val; // To be fixed with more inteligent code
							fld = 'parseInt('+fld+',10)';
							val = 'parseInt('+val+',10)';
							break;
						case 'float':
						case 'number':
						case 'numeric':
							val = String(val).replace(_stripNum, '');
							val = (isNaN(Number(val)) || val==='') ? '0' : val; // To be fixed with more inteligent code
							fld = 'parseFloat('+fld+')';
							val = 'parseFloat('+val+')';
							break;
						case 'date':
						case 'datetime':
							val = String($.jgrid.parseDate(t.newfmt || 'Y-m-d',val).getTime());
							fld = 'jQuery.jgrid.parseDate("'+t.srcfmt+'",'+fld+').getTime()';
							break;
						default :
							fld=self._getStr(fld);
							val=self._getStr('"'+self._toStr(val)+'"');
						}
					}
					self._append(fld+' '+how+' '+val);
					self._setCommand(func,f);
					self._resetNegate();
					return self;
				};
				this.equals=function(f,v,t){
					return self._compareValues(self.equals,f,v,'==',t);
				};
				this.notEquals=function(f,v,t){
					return self._compareValues(self.equals,f,v,'!==',t);
				};
				this.isNull = function(f,v,t){
					return self._compareValues(self.equals,f,null,'===',t);
				};
				this.greater=function(f,v,t){
					return self._compareValues(self.greater,f,v,'>',t);
				};
				this.less=function(f,v,t){
					return self._compareValues(self.less,f,v,'<',t);
				};
				this.greaterOrEquals=function(f,v,t){
					return self._compareValues(self.greaterOrEquals,f,v,'>=',t);
				};
				this.lessOrEquals=function(f,v,t){
					return self._compareValues(self.lessOrEquals,f,v,'<=',t);
				};
				this.startsWith=function(f,v){
					var val = (v==null) ? f: v,
						length=_trim ? $.trim(val.toString()).length : val.toString().length;
					if(_useProperties){
						self._append(self._getStr('jQuery.jgrid.getAccessor(this,\''+f+'\')')+'.substr(0,'+length+') == '+self._getStr('"'+self._toStr(v)+'"'));
					}else{
						length=_trim?$.trim(v.toString()).length:v.toString().length;
						self._append(self._getStr('this')+'.substr(0,'+length+') == '+self._getStr('"'+self._toStr(f)+'"'));
					}
					self._setCommand(self.startsWith,f);
					self._resetNegate();
					return self;
				};
				this.endsWith=function(f,v){
					var val = (v==null) ? f: v,
						length=_trim ? $.trim(val.toString()).length:val.toString().length;
					if(_useProperties){
						self._append(self._getStr('jQuery.jgrid.getAccessor(this,\''+f+'\')')+'.substr('+self._getStr('jQuery.jgrid.getAccessor(this,\''+f+'\')')+'.length-'+length+','+length+') == "'+self._toStr(v)+'"');
					} else {
						self._append(self._getStr('this')+'.substr('+self._getStr('this')+'.length-"'+self._toStr(f)+'".length,"'+self._toStr(f)+'".length) == "'+self._toStr(f)+'"');
					}
					self._setCommand(self.endsWith,f);self._resetNegate();
					return self;
				};
				this.contains=function(f,v){
					if(_useProperties){
						self._append(self._getStr('jQuery.jgrid.getAccessor(this,\''+f+'\')')+'.indexOf("'+self._toStr(v)+'",0) > -1');
					}else{
						self._append(self._getStr('this')+'.indexOf("'+self._toStr(f)+'",0) > -1');
					}
					self._setCommand(self.contains,f);
					self._resetNegate();
					return self;
				};
				this.groupBy=function(by,dir,type, datefmt){
					if(!self._hasData()){
						return null;
					}
					return self._getGroup(_data,by,dir,type, datefmt);
				};
				this.orderBy=function(by,dir,stype, dfmt){
					dir = dir == null ? 'a' :$.trim(dir.toString().toLowerCase());
					if(stype == null) { stype = 'text'; }
					if(dfmt == null) { dfmt = 'Y-m-d'; }
					if(dir=='desc'||dir=='descending'){dir='d';}
					if(dir=='asc'||dir=='ascending'){dir='a';}
					_sorting.push({by:by,dir:dir,type:stype, datefmt: dfmt});
					return self;
				};
				return self;
			};
			return new QueryObject(source,null);
		},
		getMethod: function (name) {
			return this.getAccessor($.fn.jqGrid, name);
		},
		extend : function(methods) {
			$.extend($.fn.jqGrid,methods);
			if (!this.no_legacy_api) {
				$.fn.extend(methods);
			}
		}
	});

	$.fn.jqGrid = function( pin ) {
		if (typeof pin === 'string') {
			var fn = $.jgrid.getMethod(pin);
			if (!fn) {
				throw ('jqGrid - No such method: ' + pin);
			}
			var args = $.makeArray(arguments).slice(1);
			return fn.apply(this,args);
		}
		return this.each( function() {
			if(this.grid) {return;}

			var p = $.extend(true,{
				url: '',
				height: 150,
				page: 1,
				rowNum: 20,
				rowTotal : null,
				records: 0,
				pager: '',
				pgbuttons: true,
				pginput: true,
				colModel: [],
				rowList: [],
				colNames: [],
				sortorder: 'asc',
				sortname: '',
				datatype: 'xml',
				mtype: 'GET',
				altRows: false,
				selarrrow: [],
				savedRow: [],
				shrinkToFit: true,
				xmlReader: {},
				jsonReader: {},
				subGrid: false,
				subGridModel :[],
				reccount: 0,
				lastpage: 0,
				lastsort: 0,
				selrow: null,
				beforeSelectRow: null,
				onSelectRow: null,
				onSortCol: null,
				ondblClickRow: null,
				onRightClickRow: null,
				onPaging: null,
				onSelectAll: null,
				onInitGrid : null,
				loadComplete: null,
				gridComplete: null,
				loadError: null,
				loadBeforeSend: null,
				afterInsertRow: null,
				beforeRequest: null,
				beforeProcessing : null,
				onHeaderClick: null,
				viewrecords: false,
				loadonce: false,
				multiselect: false,
				multikey: false,
				editurl: null,
				search: false,
				caption: '',
				hidegrid: true,
				hiddengrid: false,
				postData: {},
				userData: {},
				treeGrid : false,
				treeGridModel : 'nested',
				treeReader : {},
				treeANode : -1,
				ExpandColumn: null,
				tree_root_level : 0,
				prmNames: {page:'page',rows:'rows', sort: 'sidx',order: 'sord', search:'_search', nd:'nd', id:'id',oper:'oper',editoper:'edit',addoper:'add',deloper:'del', subgridid:'id', npage: null, totalrows:'totalrows'},
				forceFit : false,
				gridstate : 'visible',
				cellEdit: false,
				cellsubmit: 'remote',
				nv:0,
				loadui: 'enable',
				toolbar: [false,''],
				scroll: false,
				multiboxonly : false,
				deselectAfterSort : true,
				scrollrows : false,
				autowidth: false,
				scrollOffset :18,
				cellLayout: 5,
				subGridWidth: 20,
				multiselectWidth: 20,
				gridview: false,
				rownumWidth: 25,
				rownumbers : false,
				pagerpos: 'center',
				recordpos: 'right',
				footerrow : false,
				userDataOnFooter : false,
				hoverrows : true,
				altclass : 'ui-priority-secondary',
				viewsortcols : [false,'vertical',true],
				resizeclass : '',
				autoencode : false,
				remapColumns : [],
				ajaxGridOptions :{},
				direction : 'ltr',
				toppager: false,
				headertitles: false,
				scrollTimeout: 40,
				data : [],
				_index : {},
				grouping : false,
				groupingView : {groupField:[],groupOrder:[], groupText:[],groupColumnShow:[],groupSummary:[], showSummaryOnHide: false, sortitems:[], sortnames:[], summary:[],summaryval:[], plusicon: 'ui-icon-circlesmall-plus', minusicon: 'ui-icon-circlesmall-minus', displayField: []},
				ignoreCase : false,
				cmTemplate : {},
				idPrefix : ''
			}, $.jgrid.defaults, pin || {});
			var ts= this, grid={
				headers:[],
				cols:[],
				footers: [],
				dragStart: function(i,x,y) {
					this.resizing = { idx: i, startX: x.clientX, sOL : y[0]};
					this.hDiv.style.cursor = 'col-resize';
					this.curGbox = $('#rs_m'+$.jgrid.jqID(p.id),'#gbox_'+$.jgrid.jqID(p.id));
					this.curGbox.css({display:'block',left:y[0],top:y[1],height:y[2]});
					$(ts).triggerHandler('jqGridResizeStart', [x, i]);
					if($.isFunction(p.resizeStart)) { p.resizeStart.call(this,x,i); }
					document.onselectstart=function(){return false;};
				},
				dragMove: function(x) {
					if(this.resizing) {
						var diff = x.clientX-this.resizing.startX,
							h = this.headers[this.resizing.idx],
							newWidth = p.direction === 'ltr' ? h.width + diff : h.width - diff, hn, nWn;
						if(newWidth > 33) {
							this.curGbox.css({left:this.resizing.sOL+diff});
							if(p.forceFit===true ){
								hn = this.headers[this.resizing.idx+p.nv];
								nWn = p.direction === 'ltr' ? hn.width - diff : hn.width + diff;
								if(nWn >33) {
									h.newWidth = newWidth;
									hn.newWidth = nWn;
								}
							} else {
								this.newWidth = p.direction === 'ltr' ? p.tblwidth+diff : p.tblwidth-diff;
								h.newWidth = newWidth;
							}
						}
					}
				},
				dragEnd: function() {
					this.hDiv.style.cursor = 'default';
					if(this.resizing) {
						var idx = this.resizing.idx,
							nw = this.headers[idx].newWidth || this.headers[idx].width;
						nw = parseInt(nw,10);
						this.resizing = false;
						$('#rs_m'+$.jgrid.jqID(p.id)).css('display','none');
						p.colModel[idx].width = nw;
						this.headers[idx].width = nw;
						this.headers[idx].el.style.width = nw + 'px';
						this.cols[idx].style.width = nw+'px';
						if(this.footers.length>0) {this.footers[idx].style.width = nw+'px';}
						if(p.forceFit===true){
							nw = this.headers[idx+p.nv].newWidth || this.headers[idx+p.nv].width;
							this.headers[idx+p.nv].width = nw;
							this.headers[idx+p.nv].el.style.width = nw + 'px';
							this.cols[idx+p.nv].style.width = nw+'px';
							if(this.footers.length>0) {this.footers[idx+p.nv].style.width = nw+'px';}
							p.colModel[idx+p.nv].width = nw;
						} else {
							p.tblwidth = this.newWidth || p.tblwidth;
							$('table:first',this.bDiv).css('width',p.tblwidth+'px');
							$('table:first',this.hDiv).css('width',p.tblwidth+'px');
							this.hDiv.scrollLeft = this.bDiv.scrollLeft;
							if(p.footerrow) {
								$('table:first',this.sDiv).css('width',p.tblwidth+'px');
								this.sDiv.scrollLeft = this.bDiv.scrollLeft;
							}
						}
						$(ts).triggerHandler('jqGridResizeStop', [nw, idx]);
						if($.isFunction(p.resizeStop)) { p.resizeStop.call(this,nw,idx); }
					}
					this.curGbox = null;
					document.onselectstart=function(){return true;};
				},
				populateVisible: function() {
					if (grid.timer) { clearTimeout(grid.timer); }
					grid.timer = null;
					var dh = $(grid.bDiv).height();
					if (!dh) { return; }
					var table = $('table:first', grid.bDiv);
					var rows, rh;
					if(table[0].rows.length) {
						try {
							rows = table[0].rows[1];
							rh = rows ? $(rows).outerHeight() || grid.prevRowHeight : grid.prevRowHeight;
						} catch (pv) {
							rh = grid.prevRowHeight;
						}
					}
					if (!rh) { return; }
					grid.prevRowHeight = rh;
					var rn = p.rowNum;
					var scrollTop = grid.scrollTop = grid.bDiv.scrollTop;
					var ttop = Math.round(table.position().top) - scrollTop;
					var tbot = ttop + table.height();
					var div = rh * rn;
					var page, npage, empty;
					if ( tbot < dh && ttop <= 0 &&
					(p.lastpage===undefined||parseInt((tbot + scrollTop + div - 1) / div,10) <= p.lastpage))
					{
						npage = parseInt((dh - tbot + div - 1) / div,10);
						if (tbot >= 0 || npage < 2 || p.scroll === true) {
							page = Math.round((tbot + scrollTop) / div) + 1;
							ttop = -1;
						} else {
							ttop = 1;
						}
					}
					if (ttop > 0) {
						page = parseInt(scrollTop / div,10) + 1;
						npage = parseInt((scrollTop + dh) / div,10) + 2 - page;
						empty = true;
					}
					if (npage) {
						if (p.lastpage && (page > p.lastpage || p.lastpage==1 || (page === p.page && page===p.lastpage)) ) {
							return;
						}
						if (grid.hDiv.loading) {
							grid.timer = setTimeout(grid.populateVisible, p.scrollTimeout);
						} else {
							p.page = page;
							if (empty) {
								grid.selectionPreserver(table[0]);
								grid.emptyRows.call(table[0], false, false);
							}
							grid.populate(npage);
						}
					}
				},
				scrollGrid: function( e ) {
					if(p.scroll) {
						var scrollTop = grid.bDiv.scrollTop;
						if(grid.scrollTop === undefined) { grid.scrollTop = 0; }
						if (scrollTop != grid.scrollTop) {
							grid.scrollTop = scrollTop;
							if (grid.timer) { clearTimeout(grid.timer); }
							grid.timer = setTimeout(grid.populateVisible, p.scrollTimeout);
						}
					}
					grid.hDiv.scrollLeft = grid.bDiv.scrollLeft;
					if(p.footerrow) {
						grid.sDiv.scrollLeft = grid.bDiv.scrollLeft;
					}
					if( e ) { e.stopPropagation(); }
				},
				selectionPreserver : function(ts) {
					var p = ts.p,
						sr = p.selrow, sra = p.selarrrow ? $.makeArray(p.selarrrow) : null,
						left = ts.grid.bDiv.scrollLeft,
						restoreSelection = function() {
							var i;
							p.selrow = null;
							p.selarrrow = [];
							if(p.multiselect && sra && sra.length>0) {
								for(i=0;i<sra.length;i++){
									if (sra[i] != sr) {
										$(ts).jqGrid('setSelection',sra[i],false, null);
									}
								}
							}
							if (sr) {
								$(ts).jqGrid('setSelection',sr,false,null);
							}
							ts.grid.bDiv.scrollLeft = left;
							$(ts).unbind('.selectionPreserver', restoreSelection);
						};
					$(ts).bind('jqGridGridComplete.selectionPreserver', restoreSelection);
				}
			};
			if(this.tagName.toUpperCase()!='TABLE') {
				alert('Element is not a table');
				return;
			}
			if(document.documentMode !== undefined ) { // IE only
				if(document.documentMode <= 5) {
					alert('Grid can not be used in this (\'quirks\') mode!');
					return;
				}
			}
			$(this).empty().attr('tabindex','0');
			this.p = p ;
			this.p.useProp = !!$.fn.prop;
			var i, dir;
			if(this.p.colNames.length === 0) {
				for (i=0;i<this.p.colModel.length;i++){
					this.p.colNames[i] = this.p.colModel[i].label || this.p.colModel[i].name;
				}
			}
			if( this.p.colNames.length !== this.p.colModel.length ) {
				alert($.jgrid.errors.model);
				return;
			}
			var gv = $('<div class=\'ui-jqgrid-view\'></div>'),
				isMSIE = $.jgrid.msie;
			ts.p.direction = $.trim(ts.p.direction.toLowerCase());
			if($.inArray(ts.p.direction,['ltr','rtl']) == -1) { ts.p.direction = 'ltr'; }
			dir = ts.p.direction;

			$(gv).insertBefore(this);
			$(this).removeClass('scroll').appendTo(gv);
			var eg = $('<div class=\'ui-jqgrid ui-widget ui-widget-content ui-corner-all\'></div>');
			$(eg).attr({'id' : 'gbox_'+this.id,'dir':dir}).insertBefore(gv);
			$(gv).attr('id','gview_'+this.id).appendTo(eg);
			$('<div class=\'ui-widget-overlay jqgrid-overlay\' id=\'lui_'+this.id+'\'></div>').insertBefore(gv);
			$('<div class=\'loading ui-state-default ui-state-active\' id=\'load_'+this.id+'\'>'+this.p.loadtext+'</div>').insertBefore(gv);
			$(this).attr({cellspacing:'0',cellpadding:'0',border:'0','role':'grid','aria-multiselectable':!!this.p.multiselect,'aria-labelledby':'gbox_'+this.id});
			var sortkeys = ['shiftKey','altKey','ctrlKey'],
				intNum = function(val,defval) {
					val = parseInt(val,10);
					if (isNaN(val)) { return defval || 0;}
					return val;
				},
				formatCol = function (pos, rowInd, tv, rawObject, rowId, rdata){
					var cm = ts.p.colModel[pos],
						ral = cm.align, result='style="', clas = cm.classes, nm = cm.name, celp, acp=[];
					if(ral) { result += 'text-align:'+ral+';'; }
					if(cm.hidden===true) { result += 'display:none;'; }
					if(rowInd===0) {
						result += 'width: '+grid.headers[pos].width+'px;';
					} else if (cm.cellattr && $.isFunction(cm.cellattr))
					{
						celp = cm.cellattr.call(ts, rowId, tv, rawObject, cm, rdata);
						if(celp && typeof celp === 'string') {
							celp = celp.replace(/style/i,'style').replace(/title/i,'title');
							if(celp.indexOf('title') > -1) { cm.title=false;}
							if(celp.indexOf('class') > -1) { clas = undefined;}
							acp = celp.split('style');
							if(acp.length === 2 ) {
								acp[1] =  $.trim(acp[1].replace('=',''));
								if(acp[1].indexOf('\'') === 0 || acp[1].indexOf('"') === 0) {
									acp[1] = acp[1].substring(1);
								}
								result += acp[1].replace(/'/gi,'"');
							} else {
								result += '"';
							}
						}
					}
					if(!acp.length) { acp[0] = ''; result += '"';}
					result += (clas !== undefined ? (' class="'+clas+'"') :'') + ((cm.title && tv) ? (' title="'+$.jgrid.stripHtml(tv)+'"') :'');
					result += ' aria-describedby="'+ts.p.id+'_'+nm+'"';
					return result + acp[0];
				},
				cellVal =  function (val) {
					return val == null || val === '' ? '&#160;' : (ts.p.autoencode ? $.jgrid.htmlEncode(val) : String(val));
				},
				formatter = function (rowId, cellval , colpos, rwdat, _act){
					var cm = ts.p.colModel[colpos],v;
					if(cm.formatter !== undefined) {
						rowId = String(ts.p.idPrefix) !== '' ? $.jgrid.stripPref(ts.p.idPrefix, rowId) : rowId;
						var opts= {rowId: rowId, colModel:cm, gid:ts.p.id, pos:colpos };
						if($.isFunction( cm.formatter ) ) {
							v = cm.formatter.call(ts,cellval,opts,rwdat,_act);
						} else if($.fmatter){
							v = $.fn.fmatter.call(ts,cm.formatter,cellval,opts,rwdat,_act);
						} else {
							v = cellVal(cellval);
						}
					} else {
						v = cellVal(cellval);
					}
					return v;
				},
				addCell = function(rowId,cell,pos,irow, srvr, rdata) {
					var v,prp;
					v = formatter(rowId,cell,pos,srvr,'add');
					prp = formatCol( pos,irow, v, srvr, rowId, rdata);
					return '<td role="gridcell" '+prp+'>'+v+'</td>';
				},
				addMulti = function(rowid,pos,irow,checked){
					var	v = '<input role="checkbox" type="checkbox"'+' id="jqg_'+ts.p.id+'_'+rowid+'" class="cbox" name="jqg_'+ts.p.id+'_'+rowid+'"' + (checked ? 'checked="checked"' : '')+'/>',
						prp = formatCol( pos,irow,'',null, rowid, true);
					return '<td role="gridcell" '+prp+'>'+v+'</td>';
				},
				addRowNum = function (pos,irow,pG,rN) {
					var v =  (parseInt(pG,10)-1)*parseInt(rN,10)+1+irow,
						prp = formatCol( pos,irow,v, null, irow, true);
					return '<td role="gridcell" class="ui-state-default jqgrid-rownum" '+prp+'>'+v+'</td>';
				},
				reader = function (datatype) {
					var field, f=[], j=0, i;
					for(i =0; i<ts.p.colModel.length; i++){
						field = ts.p.colModel[i];
						if (field.name !== 'cb' && field.name !=='subgrid' && field.name !=='rn') {
							f[j]= datatype == 'local' ?
								field.name :
								( (datatype=='xml' || datatype === 'xmlstring') ? field.xmlmap || field.name : field.jsonmap || field.name );
							j++;
						}
					}
					return f;
				},
				orderedCols = function (offset) {
					var order = ts.p.remapColumns;
					if (!order || !order.length) {
						order = $.map(ts.p.colModel, function(v,i) { return i; });
					}
					if (offset) {
						order = $.map(order, function(v) { return v<offset?null:v-offset; });
					}
					return order;
				},
				emptyRows = function (scroll, locdata) {
					var firstrow;
					if (this.p.deepempty) {
						$(this.rows).slice(1).remove();
					} else {
						firstrow = this.rows.length > 0 ? this.rows[0] : null;
						$(this.firstChild).empty().append(firstrow);
					}
					if (scroll && this.p.scroll) {
						$(this.grid.bDiv.firstChild).css({height: 'auto'});
						$(this.grid.bDiv.firstChild.firstChild).css({height: 0, display: 'none'});
						if (this.grid.bDiv.scrollTop !== 0) {
							this.grid.bDiv.scrollTop = 0;
						}
					}
					if(locdata === true && this.p.treeGrid) {
						this.p.data = []; this.p._index = {};
					}
				},
				refreshIndex = function() {
					var datalen = ts.p.data.length, idname, i, val,
						ni = ts.p.rownumbers===true ? 1 :0,
						gi = ts.p.multiselect ===true ? 1 :0,
						si = ts.p.subGrid===true ? 1 :0;

					if(ts.p.keyIndex === false || ts.p.loadonce === true) {
						idname = ts.p.localReader.id;
					} else {
						idname = ts.p.colModel[ts.p.keyIndex+gi+si+ni].name;
					}
					for(i =0;i < datalen; i++) {
						val = $.jgrid.getAccessor(ts.p.data[i],idname);
						if (val === undefined) { val=String(i+1); }
						ts.p._index[val] = i;
					}
				},
				constructTr = function(id, hide, altClass, rd, cur, selected) {
					var tabindex = '-1', restAttr = '', attrName, style = hide ? 'display:none;' : '',
						classes = 'ui-widget-content jqgrow ui-row-' + ts.p.direction + altClass + (selected ? ' ui-state-highlight' : ''),
						rowAttrObj = $.isFunction(ts.p.rowattr) ? ts.p.rowattr.call(ts, rd, cur) : {};
					if(!$.isEmptyObject( rowAttrObj )) {
						if (rowAttrObj.hasOwnProperty('id')) {
							id = rowAttrObj.id;
							delete rowAttrObj.id;
						}
						if (rowAttrObj.hasOwnProperty('tabindex')) {
							tabindex = rowAttrObj.tabindex;
							delete rowAttrObj.tabindex;
						}
						if (rowAttrObj.hasOwnProperty('style')) {
							style += rowAttrObj.style;
							delete rowAttrObj.style;
						}
						if (rowAttrObj.hasOwnProperty('class')) {
							classes += ' ' + rowAttrObj['class'];
							delete rowAttrObj['class'];
						}
						// dot't allow to change role attribute
						try { delete rowAttrObj.role; } catch(ra){}
						for (attrName in rowAttrObj) {
							if (rowAttrObj.hasOwnProperty(attrName)) {
								restAttr += ' ' + attrName + '=' + rowAttrObj[attrName];
							}
						}
					}
					return '<tr role="row" id="' + id + '" tabindex="' + tabindex + '" class="' + classes + '"' +
				(style === '' ? '' : ' style="' + style + '"') + restAttr + '>';
				},
				addXmlData = function (xml,t, rcnt, more, adjust) {
					var startReq = new Date(),
						locdata = (ts.p.datatype != 'local' && ts.p.loadonce) || ts.p.datatype == 'xmlstring',
						xmlid = '_id_', xmlRd = ts.p.xmlReader,
						frd = ts.p.datatype == 'local' ? 'local' : 'xml';
					if(locdata) {
						ts.p.data = [];
						ts.p._index = {};
						ts.p.localReader.id = xmlid;
					}
					ts.p.reccount = 0;
					if($.isXMLDoc(xml)) {
						if(ts.p.treeANode===-1 && !ts.p.scroll) {
							emptyRows.call(ts, false, true);
							rcnt=1;
						} else { rcnt = rcnt > 1 ? rcnt :1; }
					} else { return; }
					var self= $(ts), i,fpos,ir=0,v,gi=ts.p.multiselect===true?1:0,si=0,addSubGridCell,ni=ts.p.rownumbers===true?1:0,idn, getId,f=[],F,rd ={}, xmlr,rid, rowData=[], cn=(ts.p.altRows === true) ? ' '+ts.p.altclass:'',cn1;
					if(ts.p.subGrid===true) {
						si = 1;
						addSubGridCell = $.jgrid.getMethod('addSubGridCell');
					}
					if(!xmlRd.repeatitems) {f = reader(frd);}
					if( ts.p.keyIndex===false) {
						idn = $.isFunction( xmlRd.id ) ?  xmlRd.id.call(ts, xml) : xmlRd.id;
					} else {
						idn = ts.p.keyIndex;
					}
					if(f.length>0 && !isNaN(idn)) {
						if (ts.p.remapColumns && ts.p.remapColumns.length) {
							idn = $.inArray(idn, ts.p.remapColumns);
						}
						idn=f[idn];
					}
					if( String(idn).indexOf('[') === -1 ) {
						if (f.length) {
							getId = function( trow, k) {return $(idn,trow).text() || k;};
						} else {
							getId = function( trow, k) {return $(xmlRd.cell,trow).eq(idn).text() || k;};
						}
					}
					else {
						getId = function( trow, k) {return trow.getAttribute(idn.replace(/[\[\]]/g,'')) || k;};
					}
					ts.p.userData = {};
					ts.p.page = $.jgrid.getXmlData( xml,xmlRd.page ) || ts.p.page || 0;
					ts.p.lastpage = $.jgrid.getXmlData( xml,xmlRd.total );
					if(ts.p.lastpage===undefined) { ts.p.lastpage=1; }
					ts.p.records = $.jgrid.getXmlData( xml,xmlRd.records ) || 0;
					if($.isFunction(xmlRd.userdata)) {
						ts.p.userData = xmlRd.userdata.call(ts, xml) || {};
					} else {
						$.jgrid.getXmlData(xml, xmlRd.userdata, true).each(function() {ts.p.userData[this.getAttribute('name')]= $(this).text();});
					}
					var gxml = $.jgrid.getXmlData( xml, xmlRd.root, true);
					gxml = $.jgrid.getXmlData( gxml, xmlRd.row, true);
					if (!gxml) { gxml = []; }
					var gl = gxml.length, j=0, grpdata=[], rn = parseInt(ts.p.rowNum,10), br=ts.p.scroll?$.jgrid.randId():1, altr;
					if (gl > 0 &&  ts.p.page <= 0) { ts.p.page = 1; }
					if(gxml && gl){
						if (adjust) { rn *= adjust+1; }
						var afterInsRow = $.isFunction(ts.p.afterInsertRow), hiderow=false, groupingPrepare;
						if(ts.p.grouping)  {
							hiderow = ts.p.groupingView.groupCollapse === true;
							groupingPrepare = $.jgrid.getMethod('groupingPrepare');
						}
						while (j<gl) {
							xmlr = gxml[j];
							rid = getId(xmlr,br+j);
							rid  = ts.p.idPrefix + rid;
							altr = rcnt === 0 ? 0 : rcnt+1;
							cn1 = (altr+j)%2 == 1 ? cn : '';
							var iStartTrTag = rowData.length;
							rowData.push('');
							if( ni ) {
								rowData.push( addRowNum(0,j,ts.p.page,ts.p.rowNum) );
							}
							if( gi ) {
								rowData.push( addMulti(rid,ni,j, false) );
							}
							if( si ) {
								rowData.push( addSubGridCell.call(self,gi+ni,j+rcnt) );
							}
							if(xmlRd.repeatitems){
								if (!F) { F=orderedCols(gi+si+ni); }
								var cells = $.jgrid.getXmlData( xmlr, xmlRd.cell, true);
								$.each(F, function (k) {
									var cell = cells[this];
									if (!cell) { return false; }
									v = cell.textContent || cell.text;
									rd[ts.p.colModel[k+gi+si+ni].name] = v;
									rowData.push( addCell(rid,v,k+gi+si+ni,j+rcnt,xmlr, rd) );
								});
							} else {
								for(i = 0; i < f.length;i++) {
									v = $.jgrid.getXmlData( xmlr, f[i]);
									rd[ts.p.colModel[i+gi+si+ni].name] = v;
									rowData.push( addCell(rid, v, i+gi+si+ni, j+rcnt, xmlr, rd) );
								}
							}
							rowData[iStartTrTag] = constructTr(rid, hiderow, cn1, rd, xmlr, false);
							rowData.push('</tr>');
							if(ts.p.grouping) {
								grpdata = groupingPrepare.call(self,rowData, grpdata, rd, j);
								rowData = [];
							}
							if(locdata || ts.p.treeGrid === true) {
								rd[xmlid] = rid;
								ts.p.data.push(rd);
								ts.p._index[rid] = ts.p.data.length-1;
							}
							if(ts.p.gridview === false ) {
								$('tbody:first',t).append(rowData.join(''));
								self.triggerHandler('jqGridAfterInsertRow', [rid, rd, xmlr]);
								if(afterInsRow) {ts.p.afterInsertRow.call(ts,rid,rd,xmlr);}
								rowData=[];
							}
							rd={};
							ir++;
							j++;
							if(ir==rn) {break;}
						}
					}
					if(ts.p.gridview === true) {
						fpos = ts.p.treeANode > -1 ? ts.p.treeANode: 0;
						if(ts.p.grouping) {
							self.jqGrid('groupingRender',grpdata,ts.p.colModel.length);
							grpdata = null;
						} else if(ts.p.treeGrid === true && fpos > 0) {
							$(ts.rows[fpos]).after(rowData.join(''));
						} else {
							$('tbody:first',t).append(rowData.join(''));
						}
					}
					if(ts.p.subGrid === true ) {
						try {self.jqGrid('addSubGrid',gi+ni);} catch (_){}
					}
					ts.p.totaltime = new Date() - startReq;
					if(ir>0) { if(ts.p.records===0) { ts.p.records=gl;} }
					rowData =null;
					if( ts.p.treeGrid === true) {
						try {self.jqGrid('setTreeNode', fpos+1, ir+fpos+1);} catch (e) {}
					}
					if(!ts.p.treeGrid && !ts.p.scroll) {ts.grid.bDiv.scrollTop = 0;}
					ts.p.reccount=ir;
					ts.p.treeANode = -1;
					if(ts.p.userDataOnFooter) { self.jqGrid('footerData','set',ts.p.userData,true); }
					if(locdata) {
						ts.p.records = gl;
						ts.p.lastpage = Math.ceil(gl/ rn);
					}
					if (!more) { ts.updatepager(false,true); }
					if(locdata) {
						while (ir<gl) {
							xmlr = gxml[ir];
							rid = getId(xmlr,ir+br);
							rid  = ts.p.idPrefix + rid;
							if(xmlRd.repeatitems){
								if (!F) { F=orderedCols(gi+si+ni); }
								var cells2 = $.jgrid.getXmlData( xmlr, xmlRd.cell, true);
								$.each(F, function (k) {
									var cell = cells2[this];
									if (!cell) { return false; }
									v = cell.textContent || cell.text;
									rd[ts.p.colModel[k+gi+si+ni].name] = v;
								});
							} else {
								for(i = 0; i < f.length;i++) {
									v = $.jgrid.getXmlData( xmlr, f[i]);
									rd[ts.p.colModel[i+gi+si+ni].name] = v;
								}
							}
							rd[xmlid] = rid;
							ts.p.data.push(rd);
							ts.p._index[rid] = ts.p.data.length-1;
							rd = {};
							ir++;
						}
					}
				},
				addJSONData = function(data,t, rcnt, more, adjust) {
					var startReq = new Date();
					if(data) {
						if(ts.p.treeANode === -1 && !ts.p.scroll) {
							emptyRows.call(ts, false, true);
							rcnt=1;
						} else { rcnt = rcnt > 1 ? rcnt :1; }
					} else { return; }

					var dReader, locid = '_id_', frd,
						locdata = (ts.p.datatype != 'local' && ts.p.loadonce) || ts.p.datatype == 'jsonstring';
					if(locdata) { ts.p.data = []; ts.p._index = {}; ts.p.localReader.id = locid;}
					ts.p.reccount = 0;
					if(ts.p.datatype == 'local') {
						dReader =  ts.p.localReader;
						frd= 'local';
					} else {
						dReader =  ts.p.jsonReader;
						frd='json';
					}
					var self = $(ts), ir=0,v,i,j,f=[],F,cur,gi=ts.p.multiselect?1:0,si=0,addSubGridCell,ni=ts.p.rownumbers===true?1:0,len,drows,idn,rd={}, fpos, idr,rowData=[],cn=(ts.p.altRows === true) ? ' '+ts.p.altclass:'',cn1,lp;
					ts.p.page = $.jgrid.getAccessor(data,dReader.page) || ts.p.page || 0;
					lp = $.jgrid.getAccessor(data,dReader.total);
					if(ts.p.subGrid===true) {
						si = 1;
						addSubGridCell = $.jgrid.getMethod('addSubGridCell');
					}
					ts.p.lastpage = lp === undefined ? 1 : lp;
					ts.p.records = $.jgrid.getAccessor(data,dReader.records) || 0;
					ts.p.userData = $.jgrid.getAccessor(data,dReader.userdata) || {};
					if(!dReader.repeatitems) {
						F = f = reader(frd);
					}
					if( ts.p.keyIndex===false ) {
						idn = $.isFunction(dReader.id) ? dReader.id.call(ts, data) : dReader.id;
					} else {
						idn = ts.p.keyIndex;
					}
					if(f.length>0 && !isNaN(idn)) {
						if (ts.p.remapColumns && ts.p.remapColumns.length) {
							idn = $.inArray(idn, ts.p.remapColumns);
						}
						idn=f[idn];
					}
					drows = $.jgrid.getAccessor(data,dReader.root);
					if (!drows) { drows = []; }
					len = drows.length; i=0;
					if (len > 0 && ts.p.page <= 0) { ts.p.page = 1; }
					var rn = parseInt(ts.p.rowNum,10),br=ts.p.scroll?$.jgrid.randId():1, altr, selected=false, selr;
					if (adjust) { rn *= adjust+1; }
					if(ts.p.datatype === 'local' && !ts.p.deselectAfterSort) {
						selected = true;
					}
					var afterInsRow = $.isFunction(ts.p.afterInsertRow), grpdata=[],hiderow=false, groupingPrepare;
					if(ts.p.grouping)  {
						hiderow = ts.p.groupingView.groupCollapse === true;
						groupingPrepare = $.jgrid.getMethod('groupingPrepare');
					}
					while (i<len) {
						cur = drows[i];
						idr = $.jgrid.getAccessor(cur,idn);
						if(idr === undefined) {
							idr = br+i;
							if(f.length===0){
								if(dReader.cell){
									var ccur = $.jgrid.getAccessor(cur,dReader.cell);
									idr = ccur !== undefined ? ccur[idn] || idr : idr;
									ccur=null;
								}
							}
						}
						idr  = ts.p.idPrefix + idr;
						altr = rcnt === 1 ? 0 : rcnt;
						cn1 = (altr+i)%2 == 1 ? cn : '';
						if( selected) {
							if( ts.p.multiselect) {
								selr = ($.inArray(idr, ts.p.selarrrow) !== -1);
							} else {
								selr = (idr === ts.p.selrow);
							}
						}
						var iStartTrTag = rowData.length;
						rowData.push('');
						if( ni ) {
							rowData.push( addRowNum(0,i,ts.p.page,ts.p.rowNum) );
						}
						if( gi ){
							rowData.push( addMulti(idr,ni,i,selr) );
						}
						if( si ) {
							rowData.push( addSubGridCell.call(self,gi+ni,i+rcnt) );
						}
						if (dReader.repeatitems) {
							if(dReader.cell) {cur = $.jgrid.getAccessor(cur,dReader.cell);}
							if (!F) { F=orderedCols(gi+si+ni); }
						}
						for (j=0;j<F.length;j++) {
							v = $.jgrid.getAccessor(cur,F[j]);
							rd[ts.p.colModel[j+gi+si+ni].name] = v;
							rowData.push( addCell(idr,v,j+gi+si+ni,i+rcnt,cur, rd) );
						}
						rowData[iStartTrTag] = constructTr(idr, hiderow, cn1, rd, cur, selr);
						rowData.push( '</tr>' );
						if(ts.p.grouping) {
							grpdata = groupingPrepare.call(self,rowData, grpdata, rd, i);
							rowData = [];
						}
						if(locdata || ts.p.treeGrid===true) {
							rd[locid] = idr;
							ts.p.data.push(rd);
							ts.p._index[idr] = ts.p.data.length-1;
						}
						if(ts.p.gridview === false ) {
							$('#'+$.jgrid.jqID(ts.p.id)+' tbody:first').append(rowData.join(''));
							self.triggerHandler('jqGridAfterInsertRow', [idr, rd, cur]);
							if(afterInsRow) {ts.p.afterInsertRow.call(ts,idr,rd,cur);}
							rowData=[];//ari=0;
						}
						rd={};
						ir++;
						i++;
						if(ir==rn) { break; }
					}
					if(ts.p.gridview === true ) {
						fpos = ts.p.treeANode > -1 ? ts.p.treeANode: 0;
						if(ts.p.grouping) {
							self.jqGrid('groupingRender',grpdata,ts.p.colModel.length);
							grpdata = null;
						} else if(ts.p.treeGrid === true && fpos > 0) {
							$(ts.rows[fpos]).after(rowData.join(''));
						} else {
							$('#'+$.jgrid.jqID(ts.p.id)+' tbody:first').append(rowData.join(''));
						}
					}
					if(ts.p.subGrid === true ) {
						try { self.jqGrid('addSubGrid',gi+ni);} catch (_){}
					}
					ts.p.totaltime = new Date() - startReq;
					if(ir>0) {
						if(ts.p.records===0) { ts.p.records=len; }
					}
					rowData = null;
					if( ts.p.treeGrid === true) {
						try {self.jqGrid('setTreeNode', fpos+1, ir+fpos+1);} catch (e) {}
					}
					if(!ts.p.treeGrid && !ts.p.scroll) {ts.grid.bDiv.scrollTop = 0;}
					ts.p.reccount=ir;
					ts.p.treeANode = -1;
					if(ts.p.userDataOnFooter) { self.jqGrid('footerData','set',ts.p.userData,true); }
					if(locdata) {
						ts.p.records = len;
						ts.p.lastpage = Math.ceil(len/ rn);
					}
					if (!more) { ts.updatepager(false,true); }
					if(locdata) {
						while (ir<len && drows[ir]) {
							cur = drows[ir];
							idr = $.jgrid.getAccessor(cur,idn);
							if(idr === undefined) {
								idr = br+ir;
								if(f.length===0){
									if(dReader.cell){
										var ccur2 = $.jgrid.getAccessor(cur,dReader.cell);
										idr = ccur2[idn] || idr;
										ccur2=null;
									}
								}
							}
							if(cur) {
								idr  = ts.p.idPrefix + idr;
								if (dReader.repeatitems) {
									if(dReader.cell) {cur = $.jgrid.getAccessor(cur,dReader.cell);}
									if (!F) { F=orderedCols(gi+si+ni); }
								}

								for (j=0;j<F.length;j++) {
									v = $.jgrid.getAccessor(cur,F[j]);
									rd[ts.p.colModel[j+gi+si+ni].name] = v;
								}
								rd[locid] = idr;
								ts.p.data.push(rd);
								ts.p._index[idr] = ts.p.data.length-1;
								rd = {};
							}
							ir++;
						}
					}
				},
				addLocalData = function() {
					var st, fndsort=false, cmtypes={}, grtypes=[], grindexes=[], srcformat, sorttype, newformat;
					if(!$.isArray(ts.p.data)) {
						return;
					}
					var grpview = ts.p.grouping ? ts.p.groupingView : false, lengrp, gin;
					$.each(ts.p.colModel,function(){
						sorttype = this.sorttype || 'text';
						if(sorttype == 'date' || sorttype == 'datetime') {
							if(this.formatter && typeof this.formatter === 'string' && this.formatter == 'date') {
								if(this.formatoptions && this.formatoptions.srcformat) {
									srcformat = this.formatoptions.srcformat;
								} else {
									srcformat = $.jgrid.formatter.date.srcformat;
								}
								if(this.formatoptions && this.formatoptions.newformat) {
									newformat = this.formatoptions.newformat;
								} else {
									newformat = $.jgrid.formatter.date.newformat;
								}
							} else {
								srcformat = newformat = this.datefmt || 'Y-m-d';
							}
							cmtypes[this.name] = {'stype': sorttype, 'srcfmt': srcformat,'newfmt':newformat};
						} else {
							cmtypes[this.name] = {'stype': sorttype, 'srcfmt':'','newfmt':''};
						}
						if(ts.p.grouping ) {
							for(gin =0, lengrp = grpview.groupField.length; gin< lengrp; gin++) {
								if( this.name == grpview.groupField[gin]) {
									var grindex = this.name;
									if (this.index) {
										grindex = this.index;
									}
									grtypes[gin] = cmtypes[grindex];
									grindexes[gin]= grindex;
								}
							}
						}
						if(!fndsort && (this.index == ts.p.sortname || this.name == ts.p.sortname)){
							st = this.name; // ???
							fndsort = true;
						}
					});
					if(ts.p.treeGrid) {
						$(ts).jqGrid('SortTree', st, ts.p.sortorder, cmtypes[st].stype, cmtypes[st].srcfmt);
						return;
					}
					var compareFnMap = {
							'eq':function(queryObj) {return queryObj.equals;},
							'ne':function(queryObj) {return queryObj.notEquals;},
							'lt':function(queryObj) {return queryObj.less;},
							'le':function(queryObj) {return queryObj.lessOrEquals;},
							'gt':function(queryObj) {return queryObj.greater;},
							'ge':function(queryObj) {return queryObj.greaterOrEquals;},
							'cn':function(queryObj) {return queryObj.contains;},
							'nc':function(queryObj,op) {return op === 'OR' ? queryObj.orNot().contains : queryObj.andNot().contains;},
							'bw':function(queryObj) {return queryObj.startsWith;},
							'bn':function(queryObj,op) {return op === 'OR' ? queryObj.orNot().startsWith : queryObj.andNot().startsWith;},
							'en':function(queryObj,op) {return op === 'OR' ? queryObj.orNot().endsWith : queryObj.andNot().endsWith;},
							'ew':function(queryObj) {return queryObj.endsWith;},
							'ni':function(queryObj,op) {return op === 'OR' ? queryObj.orNot().equals : queryObj.andNot().equals;},
							'in':function(queryObj) {return queryObj.equals;},
							'nu':function(queryObj) {return queryObj.isNull;},
							'nn':function(queryObj,op) {return op === 'OR' ? queryObj.orNot().isNull : queryObj.andNot().isNull;}

						},
						query = $.jgrid.from(ts.p.data);
					if (ts.p.ignoreCase) { query = query.ignoreCase(); }
					function tojLinq ( group ) {
						var s = 0, index, gor, ror, opr, rule;
						if (group.groups != null) {
							gor = group.groups.length && group.groupOp.toString().toUpperCase() === 'OR';
							if (gor) {
								query.orBegin();
							}
							for (index = 0; index < group.groups.length; index++) {
								if (s > 0 && gor) {
									query.or();
								}
								try {
									tojLinq(group.groups[index]);
								} catch (e) {alert(e);}
								s++;
							}
							if (gor) {
								query.orEnd();
							}
						}
						if (group.rules != null) {
							//if(s>0) {
							//	var result = query.select();
							//	query = $.jgrid.from( result);
							//	if (ts.p.ignoreCase) { query = query.ignoreCase(); }
							//}
							try{
								ror = group.rules.length && group.groupOp.toString().toUpperCase() === 'OR';
								if (ror) {
									query.orBegin();
								}
								for (index = 0; index < group.rules.length; index++) {
									rule = group.rules[index];
									opr = group.groupOp.toString().toUpperCase();
									if (compareFnMap[rule.op] && rule.field ) {
										if(s > 0 && opr && opr === 'OR') {
											query = query.or();
										}
										query = compareFnMap[rule.op](query, opr)(rule.field, rule.data, cmtypes[rule.field]);
									}
									s++;
								}
								if (ror) {
									query.orEnd();
								}
							} catch (g) {alert(g);}
						}
					}

					if (ts.p.search === true) {
						var srules = ts.p.postData.filters;
						if(srules) {
							if(typeof srules === 'string') { srules = $.jgrid.parse(srules);}
							tojLinq( srules );
						} else {
							try {
								query = compareFnMap[ts.p.postData.searchOper](query)(ts.p.postData.searchField, ts.p.postData.searchString,cmtypes[ts.p.postData.searchField]);
							} catch (se){}
						}
					}
					if(ts.p.grouping) {
						for(gin=0; gin<lengrp;gin++) {
							query.orderBy(grindexes[gin],grpview.groupOrder[gin],grtypes[gin].stype, grtypes[gin].srcfmt);
						}
					}
					if (st && ts.p.sortorder && fndsort) {
						if(ts.p.sortorder.toUpperCase() == 'DESC') {
							query.orderBy(ts.p.sortname, 'd', cmtypes[st].stype, cmtypes[st].srcfmt);
						} else {
							query.orderBy(ts.p.sortname, 'a', cmtypes[st].stype, cmtypes[st].srcfmt);
						}
					}
					var queryResults = query.select(),
						recordsperpage = parseInt(ts.p.rowNum,10),
						total = queryResults.length,
						page = parseInt(ts.p.page,10),
						totalpages = Math.ceil(total / recordsperpage),
						retresult = {};
					queryResults = queryResults.slice( (page-1)*recordsperpage , page*recordsperpage );
					query = null;
					cmtypes = null;
					retresult[ts.p.localReader.total] = totalpages;
					retresult[ts.p.localReader.page] = page;
					retresult[ts.p.localReader.records] = total;
					retresult[ts.p.localReader.root] = queryResults;
					retresult[ts.p.localReader.userdata] = ts.p.userData;
					queryResults = null;
					return  retresult;
				},
				updatepager = function(rn, dnd) {
					var cp, last, base, from,to,tot,fmt, pgboxes = '', sppg,
						tspg = ts.p.pager ? '_'+$.jgrid.jqID(ts.p.pager.substr(1)) : '',
						tspg_t = ts.p.toppager ? '_'+ts.p.toppager.substr(1) : '';
					base = parseInt(ts.p.page,10)-1;
					if(base < 0) { base = 0; }
					base = base*parseInt(ts.p.rowNum,10);
					to = base + ts.p.reccount;
					if (ts.p.scroll) {
						var rows = $('tbody:first > tr:gt(0)', ts.grid.bDiv);
						base = to - rows.length;
						ts.p.reccount = rows.length;
						var rh = rows.outerHeight() || ts.grid.prevRowHeight;
						if (rh) {
							var top = base * rh;
							var height = parseInt(ts.p.records,10) * rh;
							$('>div:first',ts.grid.bDiv).css({height : height}).children('div:first').css({height:top,display:top?'':'none'});
						}
						ts.grid.bDiv.scrollLeft = ts.grid.hDiv.scrollLeft;
					}
					pgboxes = ts.p.pager || '';
					pgboxes += ts.p.toppager ?  (pgboxes ? ',' + ts.p.toppager : ts.p.toppager) : '';
					if(pgboxes) {
						fmt = $.jgrid.formatter.integer || {};
						cp = intNum(ts.p.page);
						last = intNum(ts.p.lastpage);
						$('.selbox',pgboxes)[ this.p.useProp ? 'prop' : 'attr' ]('disabled',false);
						if(ts.p.pginput===true) {
							$('.ui-pg-input',pgboxes).val(ts.p.page);
							sppg = ts.p.toppager ? '#sp_1'+tspg+',#sp_1'+tspg_t : '#sp_1'+tspg;
							$(sppg).html($.fmatter ? $.fmatter.util.NumberFormat(ts.p.lastpage,fmt):ts.p.lastpage);

						}
						if (ts.p.viewrecords){
							if(ts.p.reccount === 0) {
								$('.ui-paging-info',pgboxes).html(ts.p.emptyrecords);
							} else {
								from = base+1;
								tot=ts.p.records;
								if($.fmatter) {
									from = $.fmatter.util.NumberFormat(from,fmt);
									to = $.fmatter.util.NumberFormat(to,fmt);
									tot = $.fmatter.util.NumberFormat(tot,fmt);
								}
								$('.ui-paging-info',pgboxes).html($.jgrid.format(ts.p.recordtext,from,to,tot));
							}
						}
						if(ts.p.pgbuttons===true) {
							if(cp<=0) {cp = last = 0;}
							if(cp==1 || cp === 0) {
								$('#first'+tspg+', #prev'+tspg).addClass('ui-state-disabled').removeClass('ui-state-hover');
								if(ts.p.toppager) { $('#first_t'+tspg_t+', #prev_t'+tspg_t).addClass('ui-state-disabled').removeClass('ui-state-hover'); }
							} else {
								$('#first'+tspg+', #prev'+tspg).removeClass('ui-state-disabled');
								if(ts.p.toppager) { $('#first_t'+tspg_t+', #prev_t'+tspg_t).removeClass('ui-state-disabled'); }
							}
							if(cp==last || cp === 0) {
								$('#next'+tspg+', #last'+tspg).addClass('ui-state-disabled').removeClass('ui-state-hover');
								if(ts.p.toppager) { $('#next_t'+tspg_t+', #last_t'+tspg_t).addClass('ui-state-disabled').removeClass('ui-state-hover'); }
							} else {
								$('#next'+tspg+', #last'+tspg).removeClass('ui-state-disabled');
								if(ts.p.toppager) { $('#next_t'+tspg_t+', #last_t'+tspg_t).removeClass('ui-state-disabled'); }
							}
						}
					}
					if(rn===true && ts.p.rownumbers === true) {
						$('td.jqgrid-rownum',ts.rows).each(function(i){
							$(this).html(base+1+i);
						});
					}
					if(dnd && ts.p.jqgdnd) { $(ts).jqGrid('gridDnD','updateDnD');}
					$(ts).triggerHandler('jqGridGridComplete');
					if($.isFunction(ts.p.gridComplete)) {ts.p.gridComplete.call(ts);}
					$(ts).triggerHandler('jqGridAfterGridComplete');
				},
				beginReq = function() {
					ts.grid.hDiv.loading = true;
					if(ts.p.hiddengrid) { return;}
					switch(ts.p.loadui) {
					case 'disable':
						break;
					case 'enable':
						$('#load_'+$.jgrid.jqID(ts.p.id)).show();
						break;
					case 'block':
						$('#lui_'+$.jgrid.jqID(ts.p.id)).show();
						$('#load_'+$.jgrid.jqID(ts.p.id)).show();
						break;
					}
				},
				endReq = function() {
					ts.grid.hDiv.loading = false;
					switch(ts.p.loadui) {
					case 'disable':
						break;
					case 'enable':
						$('#load_'+$.jgrid.jqID(ts.p.id)).hide();
						break;
					case 'block':
						$('#lui_'+$.jgrid.jqID(ts.p.id)).hide();
						$('#load_'+$.jgrid.jqID(ts.p.id)).hide();
						break;
					}
				},
				populate = function (npage) {
					if(!ts.grid.hDiv.loading) {
						var pvis = ts.p.scroll && npage === false,
							prm = {}, dt, dstr, pN=ts.p.prmNames;
						if(ts.p.page <=0) { ts.p.page = 1; }
						if(pN.search !== null) {prm[pN.search] = ts.p.search;} if(pN.nd !== null) {prm[pN.nd] = new Date().getTime();}
						if(pN.rows !== null) {prm[pN.rows]= ts.p.rowNum;} if(pN.page !== null) {prm[pN.page]= ts.p.page;}
						if(pN.sort !== null) {prm[pN.sort]= ts.p.sortname;} if(pN.order !== null) {prm[pN.order]= ts.p.sortorder;}
						if(ts.p.rowTotal !== null && pN.totalrows !== null) { prm[pN.totalrows]= ts.p.rowTotal; }
						var lcf = $.isFunction(ts.p.loadComplete), lc = lcf ? ts.p.loadComplete : null;
						var adjust = 0;
						npage = npage || 1;
						if (npage > 1) {
							if(pN.npage !== null) {
								prm[pN.npage] = npage;
								adjust = npage - 1;
								npage = 1;
							} else {
								lc = function(req) {
									ts.p.page++;
									ts.grid.hDiv.loading = false;
									if (lcf) {
										ts.p.loadComplete.call(ts,req);
									}
									populate(npage-1);
								};
							}
						} else if (pN.npage !== null) {
							delete ts.p.postData[pN.npage];
						}
						if(ts.p.grouping) {
							$(ts).jqGrid('groupingSetup');
							var grp = ts.p.groupingView, gi, gs='';
							for(gi=0;gi<grp.groupField.length;gi++) {
								var index = grp.groupField[gi];
								$.each(ts.p.colModel, function(cmIndex, cmValue) {
									if (cmValue.name == index && cmValue.index){
										index = cmValue.index;
									}
								} );
								gs += index +' '+grp.groupOrder[gi]+', ';
							}
							prm[pN.sort] = gs + prm[pN.sort];
						}
						$.extend(ts.p.postData,prm);
						var rcnt = !ts.p.scroll ? 1 : ts.rows.length-1;
						var bfr = $(ts).triggerHandler('jqGridBeforeRequest');
						if (bfr === false || bfr === 'stop') { return; }
						if ($.isFunction(ts.p.datatype)) { ts.p.datatype.call(ts,ts.p.postData,'load_'+ts.p.id); return;}
						if ($.isFunction(ts.p.beforeRequest)) {
							bfr = ts.p.beforeRequest.call(ts);
							if(bfr === undefined) { bfr = true; }
							if ( bfr === false ) { return; }
						}
						dt = ts.p.datatype.toLowerCase();
						switch(dt)
						{
						case 'json':
						case 'jsonp':
						case 'xml':
						case 'script':
							$.ajax($.extend({
								url:ts.p.url,
								type:ts.p.mtype,
								dataType: dt ,
								data: $.isFunction(ts.p.serializeGridData)? ts.p.serializeGridData.call(ts,ts.p.postData) : ts.p.postData,
								success:function(data,st, xhr) {
									if ($.isFunction(ts.p.beforeProcessing)) {
										if (ts.p.beforeProcessing.call(ts, data, st, xhr) === false) {
											endReq();
											return;
										}
									}
									if(dt === 'xml') { addXmlData(data,ts.grid.bDiv,rcnt,npage>1,adjust); }
									else { addJSONData(data,ts.grid.bDiv,rcnt,npage>1,adjust); }
									$(ts).triggerHandler('jqGridLoadComplete', [data]);
									if(lc) { lc.call(ts,data); }
									$(ts).triggerHandler('jqGridAfterLoadComplete', [data]);
									if (pvis) { ts.grid.populateVisible(); }
									if( ts.p.loadonce || ts.p.treeGrid) {ts.p.datatype = 'local';}
									data=null;
									if (npage === 1) { endReq(); }
								},
								error:function(xhr,st,err){
									if($.isFunction(ts.p.loadError)) { ts.p.loadError.call(ts,xhr,st,err); }
									if (npage === 1) { endReq(); }
									xhr=null;
								},
								beforeSend: function(xhr, settings ){
									var gotoreq = true;
									if($.isFunction(ts.p.loadBeforeSend)) {
										gotoreq = ts.p.loadBeforeSend.call(ts,xhr, settings);
									}
									if(gotoreq === undefined) { gotoreq = true; }
									if(gotoreq === false) {
										return false;
									}
									beginReq();
								}
							},$.jgrid.ajaxOptions, ts.p.ajaxGridOptions));
							break;
						case 'xmlstring':
							beginReq();
							dstr = $.jgrid.stringToDoc(ts.p.datastr);
							addXmlData(dstr,ts.grid.bDiv);
							$(ts).triggerHandler('jqGridLoadComplete', [dstr]);
							if(lcf) {ts.p.loadComplete.call(ts,dstr);}
							$(ts).triggerHandler('jqGridAfterLoadComplete', [dstr]);
							ts.p.datatype = 'local';
							ts.p.datastr = null;
							endReq();
							break;
						case 'jsonstring':
							beginReq();
							if(typeof ts.p.datastr === 'string') { dstr = $.jgrid.parse(ts.p.datastr); }
							else { dstr = ts.p.datastr; }
							addJSONData(dstr,ts.grid.bDiv);
							$(ts).triggerHandler('jqGridLoadComplete', [dstr]);
							if(lcf) {ts.p.loadComplete.call(ts,dstr);}
							$(ts).triggerHandler('jqGridAfterLoadComplete', [dstr]);
							ts.p.datatype = 'local';
							ts.p.datastr = null;
							endReq();
							break;
						case 'local':
						case 'clientside':
							beginReq();
							ts.p.datatype = 'local';
							var req = addLocalData();
							addJSONData(req,ts.grid.bDiv,rcnt,npage>1,adjust);
							$(ts).triggerHandler('jqGridLoadComplete', [req]);
							if(lc) { lc.call(ts,req); }
							$(ts).triggerHandler('jqGridAfterLoadComplete', [req]);
							if (pvis) { ts.grid.populateVisible(); }
							endReq();
							break;
						}
					}
				},
				setHeadCheckBox = function ( checked ) {
					$('#cb_'+$.jgrid.jqID(ts.p.id),ts.grid.hDiv)[ts.p.useProp ? 'prop': 'attr']('checked', checked);
					var fid = ts.p.frozenColumns ? ts.p.id+'_frozen' : '';
					if(fid) {
						$('#cb_'+$.jgrid.jqID(ts.p.id),ts.grid.fhDiv)[ts.p.useProp ? 'prop': 'attr']('checked', checked);
					}
				},
				setPager = function (pgid, tp){
					// TBD - consider escaping pgid with pgid = $.jgrid.jqID(pgid);
					var sep = '<td class=\'ui-pg-button ui-state-disabled\' style=\'width:4px;\'><span class=\'ui-separator\'></span></td>',
						pginp = '',
						pgl='<table cellspacing=\'0\' cellpadding=\'0\' border=\'0\' style=\'table-layout:auto;\' class=\'ui-pg-table\'><tbody><tr>',
						str='', pgcnt, lft, cent, rgt, twd, tdw, i,
						clearVals = function(onpaging){
							var ret;
							if ($.isFunction(ts.p.onPaging) ) { ret = ts.p.onPaging.call(ts,onpaging); }
							ts.p.selrow = null;
							if(ts.p.multiselect) {ts.p.selarrrow =[]; setHeadCheckBox( false );}
							ts.p.savedRow = [];
							if(ret=='stop') {return false;}
							return true;
						};
					pgid = pgid.substr(1);
					tp += '_' + pgid;
					pgcnt = 'pg_'+pgid;
					lft = pgid+'_left'; cent = pgid+'_center'; rgt = pgid+'_right';
					$('#'+$.jgrid.jqID(pgid) )
						.append('<div id=\''+pgcnt+'\' class=\'ui-pager-control\' role=\'group\'><table cellspacing=\'0\' cellpadding=\'0\' border=\'0\' class=\'ui-pg-table\' style=\'width:100%;table-layout:fixed;height:100%;\' role=\'row\'><tbody><tr><td id=\''+lft+'\' align=\'left\'></td><td id=\''+cent+'\' align=\'center\' style=\'white-space:pre;\'></td><td id=\''+rgt+'\' align=\'right\'></td></tr></tbody></table></div>')
						.attr('dir','ltr'); //explicit setting
					if(ts.p.rowList.length >0){
						str = '<td dir=\''+dir+'\'>';
						str +='<select class=\'ui-pg-selbox\' role=\'listbox\'>';
						for(i=0;i<ts.p.rowList.length;i++){
							str +='<option role="option" value="'+ts.p.rowList[i]+'"'+((ts.p.rowNum == ts.p.rowList[i])?' selected="selected"':'')+'>'+ts.p.rowList[i]+'</option>';
						}
						str +='</select></td>';
					}
					if(dir=='rtl') { pgl += str; }
					if(ts.p.pginput===true) { pginp= '<td dir=\''+dir+'\'>'+$.jgrid.format(ts.p.pgtext || '','<input class=\'ui-pg-input\' type=\'text\' size=\'2\' maxlength=\'7\' value=\'0\' role=\'textbox\'/>','<span id=\'sp_1_'+$.jgrid.jqID(pgid)+'\'></span>')+'</td>';}
					if(ts.p.pgbuttons===true) {
						var po=['first'+tp,'prev'+tp, 'next'+tp,'last'+tp]; if(dir=='rtl') { po.reverse(); }
						pgl += '<td id=\''+po[0]+'\' class=\'ui-pg-button ui-corner-all\'><span class=\'ui-icon ui-icon-seek-first\'></span></td>';
						pgl += '<td id=\''+po[1]+'\' class=\'ui-pg-button ui-corner-all\'><span class=\'ui-icon ui-icon-seek-prev\'></span></td>';
						pgl += pginp !== '' ? sep+pginp+sep:'';
						pgl += '<td id=\''+po[2]+'\' class=\'ui-pg-button ui-corner-all\'><span class=\'ui-icon ui-icon-seek-next\'></span></td>';
						pgl += '<td id=\''+po[3]+'\' class=\'ui-pg-button ui-corner-all\'><span class=\'ui-icon ui-icon-seek-end\'></span></td>';
					} else if (pginp !== '') { pgl += pginp; }
					if(dir=='ltr') { pgl += str; }
					pgl += '</tr></tbody></table>';
					if(ts.p.viewrecords===true) {$('td#'+pgid+'_'+ts.p.recordpos,'#'+pgcnt).append('<div dir=\''+dir+'\' style=\'text-align:'+ts.p.recordpos+'\' class=\'ui-paging-info\'></div>');}
					$('td#'+pgid+'_'+ts.p.pagerpos,'#'+pgcnt).append(pgl);
					tdw = $('.ui-jqgrid').css('font-size') || '11px';
					$(document.body).append('<div id=\'testpg\' class=\'ui-jqgrid ui-widget ui-widget-content\' style=\'font-size:'+tdw+';visibility:hidden;\' ></div>');
					twd = $(pgl).clone().appendTo('#testpg').width();
					$('#testpg').remove();
					if(twd > 0) {
						if(pginp !== '') { twd += 50; } //should be param
						$('td#'+pgid+'_'+ts.p.pagerpos,'#'+pgcnt).width(twd);
					}
					ts.p._nvtd = [];
					ts.p._nvtd[0] = twd ? Math.floor((ts.p.width - twd)/2) : Math.floor(ts.p.width/3);
					ts.p._nvtd[1] = 0;
					pgl=null;
					$('.ui-pg-selbox','#'+pgcnt).bind('change',function() {
						if(!clearVals('records')) { return false; }
						ts.p.page = Math.round(ts.p.rowNum*(ts.p.page-1)/this.value-0.5)+1;
						ts.p.rowNum = this.value;
						if(ts.p.pager) { $('.ui-pg-selbox',ts.p.pager).val(this.value); }
						if(ts.p.toppager) { $('.ui-pg-selbox',ts.p.toppager).val(this.value); }
						populate();
						return false;
					});
					if(ts.p.pgbuttons===true) {
						$('.ui-pg-button','#'+pgcnt).hover(function(){
							if($(this).hasClass('ui-state-disabled')) {
								this.style.cursor='default';
							} else {
								$(this).addClass('ui-state-hover');
								this.style.cursor='pointer';
							}
						},function() {
							if(!$(this).hasClass('ui-state-disabled')) {
								$(this).removeClass('ui-state-hover');
								this.style.cursor= 'default';
							}
						});
						$('#first'+$.jgrid.jqID(tp)+', #prev'+$.jgrid.jqID(tp)+', #next'+$.jgrid.jqID(tp)+', #last'+$.jgrid.jqID(tp)).click( function() {
							var cp = intNum(ts.p.page,1),
								last = intNum(ts.p.lastpage,1), selclick = false,
								fp=true, pp=true, np=true,lp=true;
							if(last ===0 || last===1) {fp=false;pp=false;np=false;lp=false; }
							else if( last>1 && cp >=1) {
								if( cp === 1) { fp=false; pp=false; }
								//else if( cp>1 && cp <last){ }
								else if( cp===last){ np=false;lp=false; }
							} else if( last>1 && cp===0 ) { np=false;lp=false; cp=last-1;}
							if(!clearVals(this.id)) { return false; }
							if( this.id === 'first'+tp && fp ) { ts.p.page=1; selclick=true;}
							if( this.id === 'prev'+tp && pp) { ts.p.page=(cp-1); selclick=true;}
							if( this.id === 'next'+tp && np) { ts.p.page=(cp+1); selclick=true;}
							if( this.id === 'last'+tp && lp) { ts.p.page=last; selclick=true;}
							if(selclick) {
								populate();
							}
							return false;
						});
					}
					if(ts.p.pginput===true) {
						$('input.ui-pg-input','#'+pgcnt).keypress( function(e) {
							var key = e.charCode || e.keyCode || 0;
							if(key == 13) {
								if(!clearVals('user')) { return false; }
								ts.p.page = ($(this).val()>0) ? $(this).val():ts.p.page;
								populate();
								return false;
							}
							return this;
						});
					}
				},
				sortData = function (index, idxcol,reload,sor){
					if(!ts.p.colModel[idxcol].sortable) { return; }
					var so;
					if(ts.p.savedRow.length > 0) {return;}
					if(!reload) {
						if( ts.p.lastsort == idxcol ) {
							if( ts.p.sortorder == 'asc') {
								ts.p.sortorder = 'desc';
							} else if(ts.p.sortorder == 'desc') { ts.p.sortorder = 'asc';}
						} else { ts.p.sortorder = ts.p.colModel[idxcol].firstsortorder || 'asc'; }
						ts.p.page = 1;
					}
					if(sor) {
						if(ts.p.lastsort == idxcol && ts.p.sortorder == sor && !reload) { return; }
						ts.p.sortorder = sor;
					}
					var previousSelectedTh = ts.grid.headers[ts.p.lastsort].el, newSelectedTh = ts.grid.headers[idxcol].el;

					$('span.ui-grid-ico-sort',previousSelectedTh).addClass('ui-state-disabled');
					$(previousSelectedTh).attr('aria-selected','false');
					$('span.ui-icon-'+ts.p.sortorder,newSelectedTh).removeClass('ui-state-disabled');
					$(newSelectedTh).attr('aria-selected','true');
					if(!ts.p.viewsortcols[0]) {
						if(ts.p.lastsort != idxcol) {
							$('span.s-ico',previousSelectedTh).hide();
							$('span.s-ico',newSelectedTh).show();
						}
					}
					index = index.substring(5 + ts.p.id.length + 1); // bad to be changed!?!
					ts.p.sortname = ts.p.colModel[idxcol].index || index;
					so = ts.p.sortorder;
					if ($(ts).triggerHandler('jqGridSortCol', [index, idxcol, so]) === 'stop') {
						ts.p.lastsort = idxcol;
						return;
					}
					if($.isFunction(ts.p.onSortCol)) {if (ts.p.onSortCol.call(ts,index,idxcol,so)=='stop') {ts.p.lastsort = idxcol; return;}}
					if(ts.p.datatype == 'local') {
						if(ts.p.deselectAfterSort) {$(ts).jqGrid('resetSelection');}
					} else {
						ts.p.selrow = null;
						if(ts.p.multiselect){setHeadCheckBox( false );}
						ts.p.selarrrow =[];
						ts.p.savedRow =[];
					}
					if(ts.p.scroll) {
						var sscroll = ts.grid.bDiv.scrollLeft;
						emptyRows.call(ts, true, false);
						ts.grid.hDiv.scrollLeft = sscroll;
					}
					if(ts.p.subGrid && ts.p.datatype=='local') {
						$('td.sgexpanded','#'+$.jgrid.jqID(ts.p.id)).each(function(){
							$(this).trigger('click');
						});
					}
					populate();
					ts.p.lastsort = idxcol;
					if(ts.p.sortname != index && idxcol) {ts.p.lastsort = idxcol;}
				},
				setColWidth = function () {
					var initwidth = 0, brd=$.jgrid.cell_width? 0: intNum(ts.p.cellLayout,0), vc=0, lvc, scw=intNum(ts.p.scrollOffset,0),cw,hs=false,aw,gw=0,
						cl = 0, cr;
					$.each(ts.p.colModel, function() {
						if(this.hidden === undefined) {this.hidden=false;}
						if(ts.p.grouping && ts.p.autowidth) {
							var ind = $.inArray(this.name, ts.p.groupingView.groupField);
							if(ind !== -1) {
								this.hidden = !ts.p.groupingView.groupColumnShow[ind];
							}
						}
						this.widthOrg = cw = intNum(this.width,0);
						if(this.hidden===false){
							initwidth += cw+brd;
							if(this.fixed) {
								gw += cw+brd;
							} else {
								vc++;
							}
							cl++;
						}
					});
					if(isNaN(ts.p.width)) {
						ts.p.width  = initwidth + ((ts.p.shrinkToFit ===false && !isNaN(ts.p.height)) ? scw : 0);
					}
					grid.width = ts.p.width;
					ts.p.tblwidth = initwidth;
					if(ts.p.shrinkToFit ===false && ts.p.forceFit === true) {ts.p.forceFit=false;}
					if(ts.p.shrinkToFit===true && vc > 0) {
						aw = grid.width-brd*vc-gw;
						if(!isNaN(ts.p.height)) {
							aw -= scw;
							hs = true;
						}
						initwidth =0;
						$.each(ts.p.colModel, function(i) {
							if(this.hidden === false && !this.fixed){
								cw = Math.round(aw*this.width/(ts.p.tblwidth-brd*vc-gw));
								this.width =cw;
								initwidth += cw;
								lvc = i;
							}
						});
						cr =0;
						if (hs) {
							if(grid.width-gw-(initwidth+brd*vc) !== scw){
								cr = grid.width-gw-(initwidth+brd*vc)-scw;
							}
						} else if(!hs && Math.abs(grid.width-gw-(initwidth+brd*vc)) !== 1) {
							cr = grid.width-gw-(initwidth+brd*vc);
						}
						ts.p.colModel[lvc].width += cr;
						ts.p.tblwidth = initwidth+cr+brd*vc+gw;
						if(ts.p.tblwidth > ts.p.width) {
							ts.p.colModel[lvc].width -= (ts.p.tblwidth - parseInt(ts.p.width,10));
							ts.p.tblwidth = ts.p.width;
						}
					}
				},
				nextVisible= function(iCol) {
					var ret = iCol, j=iCol, i;
					for (i = iCol+1;i<ts.p.colModel.length;i++){
						if(ts.p.colModel[i].hidden !== true ) {
							j=i; break;
						}
					}
					return j-ret;
				},
				getOffset = function (iCol) {
					var i, ret = [0], brd1 = $.jgrid.cell_width ? 0 : ts.p.cellLayout;
					for(i=0;i<=iCol;i++){
						if(ts.p.colModel[i].hidden === false ) {
							ret[0] += ts.p.colModel[i].width+brd1;
						}
					}
					if(ts.p.direction=='rtl') { ret[0] = ts.p.width - ret[0]; }
					ret[0] -= ts.grid.bDiv.scrollLeft;
					ret.push($(ts.grid.hDiv).position().top);
					ret.push($(ts.grid.bDiv).offset().top - $(ts.grid.hDiv).offset().top + $(ts.grid.bDiv).height());
					return ret;
				},
				getColumnHeaderIndex = function (th) {
					var i, headers = ts.grid.headers, ci = $.jgrid.getCellIndex(th);
					for (i = 0; i < headers.length; i++) {
						if (th === headers[i].el) {
							ci = i;
							break;
						}
					}
					return ci;
				};
			this.p.id = this.id;
			if ($.inArray(ts.p.multikey,sortkeys) == -1 ) {ts.p.multikey = false;}
			ts.p.keyIndex=false;
			for (i=0; i<ts.p.colModel.length;i++) {
				ts.p.colModel[i] = $.extend(true, {}, ts.p.cmTemplate, ts.p.colModel[i].template || {}, ts.p.colModel[i]);
				if (ts.p.keyIndex === false && ts.p.colModel[i].key===true) {
					ts.p.keyIndex = i;
				}
			}
			ts.p.sortorder = ts.p.sortorder.toLowerCase();
			$.jgrid.cell_width = $.jgrid.cellWidth();
			if(ts.p.grouping===true) {
				ts.p.scroll = false;
				ts.p.rownumbers = false;
				//ts.p.subGrid = false; expiremental
				//			ts.p.treeGrid = false;
				ts.p.gridview = true;
			}
			if(this.p.treeGrid === true) {
				try { $(this).jqGrid('setTreeGrid');} catch (_) {}
				if(ts.p.datatype != 'local') { ts.p.localReader = {id: '_id_'};	}
			}
			if(this.p.subGrid) {
				try { $(ts).jqGrid('setSubGrid');} catch (s){}
			}
			if(this.p.multiselect) {
				this.p.colNames.unshift('<input role=\'checkbox\' id=\'cb_'+this.p.id+'\' class=\'cbox\' type=\'checkbox\'/>');
				this.p.colModel.unshift({name:'cb',width:$.jgrid.cell_width ? ts.p.multiselectWidth+ts.p.cellLayout : ts.p.multiselectWidth,sortable:false,resizable:false,hidedlg:true,search:false,align:'center',fixed:true});
			}
			if(this.p.rownumbers) {
				this.p.colNames.unshift('');
				this.p.colModel.unshift({name:'rn',width:ts.p.rownumWidth,sortable:false,resizable:false,hidedlg:true,search:false,align:'center',fixed:true});
			}
			ts.p.xmlReader = $.extend(true,{
				root: 'rows',
				row: 'row',
				page: 'rows>page',
				total: 'rows>total',
				records : 'rows>records',
				repeatitems: true,
				cell: 'cell',
				id: '[id]',
				userdata: 'userdata',
				subgrid: {root:'rows', row: 'row', repeatitems: true, cell:'cell'}
			}, ts.p.xmlReader);
			ts.p.jsonReader = $.extend(true,{
				root: 'rows',
				page: 'page',
				total: 'total',
				records: 'records',
				repeatitems: true,
				cell: 'cell',
				id: 'id',
				userdata: 'userdata',
				subgrid: {root:'rows', repeatitems: true, cell:'cell'}
			},ts.p.jsonReader);
			ts.p.localReader = $.extend(true,{
				root: 'rows',
				page: 'page',
				total: 'total',
				records: 'records',
				repeatitems: false,
				cell: 'cell',
				id: 'id',
				userdata: 'userdata',
				subgrid: {root:'rows', repeatitems: true, cell:'cell'}
			},ts.p.localReader);
			if(ts.p.scroll){
				ts.p.pgbuttons = false; ts.p.pginput=false; ts.p.rowList=[];
			}
			if(ts.p.data.length) { refreshIndex(); }
			var thead = '<thead><tr class=\'ui-jqgrid-labels\' role=\'rowheader\'>',
				tdc, idn, w, res, sort,
				td, ptr, tbody, imgs,iac='',idc='';
			if(ts.p.shrinkToFit===true && ts.p.forceFit===true) {
				for (i=ts.p.colModel.length-1;i>=0;i--){
					if(!ts.p.colModel[i].hidden) {
						ts.p.colModel[i].resizable=false;
						break;
					}
				}
			}
			if(ts.p.viewsortcols[1] == 'horizontal') {iac=' ui-i-asc';idc=' ui-i-desc';}
			tdc = isMSIE ?  'class=\'ui-th-div-ie\'' :'';
			imgs = '<span class=\'s-ico\' style=\'display:none\'><span sort=\'asc\' class=\'ui-grid-ico-sort ui-icon-asc'+iac+' ui-state-disabled ui-icon ui-icon-triangle-1-n ui-sort-'+dir+'\'></span>';
			imgs += '<span sort=\'desc\' class=\'ui-grid-ico-sort ui-icon-desc'+idc+' ui-state-disabled ui-icon ui-icon-triangle-1-s ui-sort-'+dir+'\'></span></span>';
			for(i=0;i<this.p.colNames.length;i++){
				var tooltip = ts.p.headertitles ? (' title="'+$.jgrid.stripHtml(ts.p.colNames[i])+'"') :'';
				thead += '<th id=\''+ts.p.id+'_'+ts.p.colModel[i].name+'\' role=\'columnheader\' class=\'ui-state-default ui-th-column ui-th-'+dir+'\''+ tooltip+'>';
				idn = ts.p.colModel[i].index || ts.p.colModel[i].name;
				thead += '<div id=\'jqgh_'+ts.p.id+'_'+ts.p.colModel[i].name+'\' '+tdc+'>'+ts.p.colNames[i];
				if(!ts.p.colModel[i].width)  { ts.p.colModel[i].width = 150; }
				else { ts.p.colModel[i].width = parseInt(ts.p.colModel[i].width,10); }
				if(typeof ts.p.colModel[i].title !== 'boolean') { ts.p.colModel[i].title = true; }
				if (idn == ts.p.sortname) {
					ts.p.lastsort = i;
				}
				thead += imgs+'</div></th>';
			}
			thead += '</tr></thead>';
			imgs = null;
			$(this).append(thead);
			$('thead tr:first th',this).hover(function(){$(this).addClass('ui-state-hover');},function(){$(this).removeClass('ui-state-hover');});
			if(this.p.multiselect) {
				var emp=[], chk;
				$('#cb_'+$.jgrid.jqID(ts.p.id),this).bind('click',function(){
					ts.p.selarrrow = [];
					var froz = ts.p.frozenColumns === true ? ts.p.id + '_frozen' : '';
					if (this.checked) {
						$(ts.rows).each(function(i) {
							if (i>0) {
								if(!$(this).hasClass('ui-subgrid') && !$(this).hasClass('jqgroup') && !$(this).hasClass('ui-state-disabled')){
									$('#jqg_'+$.jgrid.jqID(ts.p.id)+'_'+$.jgrid.jqID(this.id) )[ts.p.useProp ? 'prop': 'attr']('checked',true);
									$(this).addClass('ui-state-highlight').attr('aria-selected','true');
									ts.p.selarrrow.push(this.id);
									ts.p.selrow = this.id;
									if(froz) {
										$('#jqg_'+$.jgrid.jqID(ts.p.id)+'_'+$.jgrid.jqID(this.id), ts.grid.fbDiv )[ts.p.useProp ? 'prop': 'attr']('checked',true);
										$('#'+$.jgrid.jqID(this.id), ts.grid.fbDiv).addClass('ui-state-highlight');
									}
								}
							}
						});
						chk=true;
						emp=[];
					}
					else {
						$(ts.rows).each(function(i) {
							if(i>0) {
								if(!$(this).hasClass('ui-subgrid') && !$(this).hasClass('ui-state-disabled')){
									$('#jqg_'+$.jgrid.jqID(ts.p.id)+'_'+$.jgrid.jqID(this.id) )[ts.p.useProp ? 'prop': 'attr']('checked', false);
									$(this).removeClass('ui-state-highlight').attr('aria-selected','false');
									emp.push(this.id);
									if(froz) {
										$('#jqg_'+$.jgrid.jqID(ts.p.id)+'_'+$.jgrid.jqID(this.id), ts.grid.fbDiv )[ts.p.useProp ? 'prop': 'attr']('checked',false);
										$('#'+$.jgrid.jqID(this.id), ts.grid.fbDiv).removeClass('ui-state-highlight');
									}
								}
							}
						});
						ts.p.selrow = null;
						chk=false;
					}
					$(ts).triggerHandler('jqGridSelectAll', [chk ? ts.p.selarrrow : emp, chk]);
					if($.isFunction(ts.p.onSelectAll)) {ts.p.onSelectAll.call(ts, chk ? ts.p.selarrrow : emp,chk);}
				});
			}

			if(ts.p.autowidth===true) {
				var pw = $(eg).innerWidth();
				ts.p.width = pw > 0?  pw: 'nw';
			}
			setColWidth();
			$(eg).css('width',grid.width+'px').append('<div class=\'ui-jqgrid-resize-mark\' id=\'rs_m'+ts.p.id+'\'>&#160;</div>');
			$(gv).css('width',grid.width+'px');
			thead = $('thead:first',ts).get(0);
			var	tfoot = '';
			if(ts.p.footerrow) { tfoot += '<table role=\'grid\' style=\'width:'+ts.p.tblwidth+'px\' class=\'ui-jqgrid-ftable\' cellspacing=\'0\' cellpadding=\'0\' border=\'0\'><tbody><tr role=\'row\' class=\'ui-widget-content footrow footrow-'+dir+'\'>'; }
			var thr = $('tr:first',thead),
				firstr = '<tr class=\'jqgfirstrow\' role=\'row\' style=\'height:auto\'>';
			ts.p.disableClick=false;
			$('th',thr).each(function ( j ) {
				w = ts.p.colModel[j].width;
				if(ts.p.colModel[j].resizable === undefined) {ts.p.colModel[j].resizable = true;}
				if(ts.p.colModel[j].resizable){
					res = document.createElement('span');
					$(res).html('&#160;').addClass('ui-jqgrid-resize ui-jqgrid-resize-'+dir)
						.css('cursor','col-resize');
					$(this).addClass(ts.p.resizeclass);
				} else {
					res = '';
				}
				$(this).css('width',w+'px').prepend(res);
				var hdcol = '';
				if( ts.p.colModel[j].hidden ) {
					$(this).css('display','none');
					hdcol = 'display:none;';
				}
				firstr += '<td role=\'gridcell\' style=\'height:0px;width:'+w+'px;'+hdcol+'\'></td>';
				grid.headers[j] = { width: w, el: this };
				sort = ts.p.colModel[j].sortable;
				if( typeof sort !== 'boolean') {ts.p.colModel[j].sortable =  true; sort=true;}
				var nm = ts.p.colModel[j].name;
				if( !(nm == 'cb' || nm=='subgrid' || nm=='rn') ) {
					if(ts.p.viewsortcols[2]){
						$('>div',this).addClass('ui-jqgrid-sortable');
					}
				}
				if(sort) {
					if(ts.p.viewsortcols[0]) {$('div span.s-ico',this).show(); if(j==ts.p.lastsort){ $('div span.ui-icon-'+ts.p.sortorder,this).removeClass('ui-state-disabled');}}
					else if( j == ts.p.lastsort) {$('div span.s-ico',this).show();$('div span.ui-icon-'+ts.p.sortorder,this).removeClass('ui-state-disabled');}
				}
				if(ts.p.footerrow) { tfoot += '<td role=\'gridcell\' '+formatCol(j,0,'', null, '', false)+'>&#160;</td>'; }
			}).mousedown(function(e) {
				if ($(e.target).closest('th>span.ui-jqgrid-resize').length != 1) { return; }
				var ci = getColumnHeaderIndex(this);
				if(ts.p.forceFit===true) {ts.p.nv= nextVisible(ci);}
				grid.dragStart(ci, e, getOffset(ci));
				return false;
			}).click(function(e) {
				if (ts.p.disableClick) {
					ts.p.disableClick = false;
					return false;
				}
				var s = 'th>div.ui-jqgrid-sortable',r,d;
				if (!ts.p.viewsortcols[2]) { s = 'th>div>span>span.ui-grid-ico-sort'; }
				var t = $(e.target).closest(s);
				if (t.length != 1) { return; }
				var ci = getColumnHeaderIndex(this);
				if (!ts.p.viewsortcols[2]) { r=true;d=t.attr('sort'); }
				sortData( $('div',this)[0].id, ci, r, d);
				return false;
			});
			if (ts.p.sortable && $.fn.sortable) {
				try {
					$(ts).jqGrid('sortableColumns', thr);
				} catch (e){}
			}
			if(ts.p.footerrow) { tfoot += '</tr></tbody></table>'; }
			firstr += '</tr>';
			tbody = document.createElement('tbody');
			this.appendChild(tbody);
			$(this).addClass('ui-jqgrid-btable').append(firstr);
			firstr = null;
			var hTable = $('<table class=\'ui-jqgrid-htable\' style=\'width:'+ts.p.tblwidth+'px\' role=\'grid\' aria-labelledby=\'gbox_'+this.id+'\' cellspacing=\'0\' cellpadding=\'0\' border=\'0\'></table>').append(thead),
				hg = (ts.p.caption && ts.p.hiddengrid===true) ? true : false,
				hb = $('<div class=\'ui-jqgrid-hbox' + (dir=='rtl' ? '-rtl' : '' )+'\'></div>');
			thead = null;
			grid.hDiv = document.createElement('div');
			$(grid.hDiv)
				.css({ width: grid.width+'px'})
				.addClass('ui-state-default ui-jqgrid-hdiv')
				.append(hb);
			$(hb).append(hTable);
			hTable = null;
			if(hg) { $(grid.hDiv).hide(); }
			if(ts.p.pager){
			// TBD -- escape ts.p.pager here?
				if(typeof ts.p.pager === 'string') {if(ts.p.pager.substr(0,1) !='#') { ts.p.pager = '#'+ts.p.pager;} }
				else { ts.p.pager = '#'+ $(ts.p.pager).attr('id');}
				$(ts.p.pager).css({width: grid.width+'px'}).addClass('ui-state-default ui-jqgrid-pager ui-corner-bottom').appendTo(eg);
				if(hg) {$(ts.p.pager).hide();}
				setPager(ts.p.pager,'');
			}
			if( ts.p.cellEdit === false && ts.p.hoverrows === true) {
				$(ts).bind('mouseover',function(e) {
					ptr = $(e.target).closest('tr.jqgrow');
					if($(ptr).attr('class') !== 'ui-subgrid') {
						$(ptr).addClass('ui-state-hover');
					}
				}).bind('mouseout',function(e) {
					ptr = $(e.target).closest('tr.jqgrow');
					$(ptr).removeClass('ui-state-hover');
				});
			}
			var ri,ci, tdHtml;
			$(ts).before(grid.hDiv).click(function(e) {
				td = e.target;
				ptr = $(td,ts.rows).closest('tr.jqgrow');
				if($(ptr).length === 0 || ptr[0].className.indexOf( 'ui-state-disabled' ) > -1 || ($(td,ts).closest('table.ui-jqgrid-btable').attr('id') || '').replace('_frozen','') !== ts.id ) {
					return this;
				}
				var scb = $(td).hasClass('cbox'),
					cSel = $(ts).triggerHandler('jqGridBeforeSelectRow', [ptr[0].id, e]);
				cSel = (cSel === false || cSel === 'stop') ? false : true;
				if(cSel && $.isFunction(ts.p.beforeSelectRow)) { cSel = ts.p.beforeSelectRow.call(ts,ptr[0].id, e); }
				if (td.tagName == 'A' || ((td.tagName == 'INPUT' || td.tagName == 'TEXTAREA' || td.tagName == 'OPTION' || td.tagName == 'SELECT' ) && !scb) ) { return; }
				if(cSel === true) {
					ri = ptr[0].id;
					ci = $.jgrid.getCellIndex(td);
					tdHtml = $(td).closest('td,th').html();
					$(ts).triggerHandler('jqGridCellSelect', [ri,ci,tdHtml,e]);
					if($.isFunction(ts.p.onCellSelect)) {
						ts.p.onCellSelect.call(ts,ri,ci,tdHtml,e);
					}
					if(ts.p.cellEdit === true) {
						if(ts.p.multiselect && scb){
							$(ts).jqGrid('setSelection', ri ,true,e);
						} else {
							ri = ptr[0].rowIndex;
							try {$(ts).jqGrid('editCell',ri,ci,true);} catch (_) {}
						}
					} else if ( !ts.p.multikey ) {
						if(ts.p.multiselect && ts.p.multiboxonly) {
							if(scb){$(ts).jqGrid('setSelection',ri,true,e);}
							else {
								var frz = ts.p.frozenColumns ? ts.p.id+'_frozen' : '';
								$(ts.p.selarrrow).each(function(i,n){
									var ind = ts.rows.namedItem(n);
									$(ind).removeClass('ui-state-highlight');
									$('#jqg_'+$.jgrid.jqID(ts.p.id)+'_'+$.jgrid.jqID(n))[ts.p.useProp ? 'prop': 'attr']('checked', false);
									if(frz) {
										$('#'+$.jgrid.jqID(n), '#'+$.jgrid.jqID(frz)).removeClass('ui-state-highlight');
										$('#jqg_'+$.jgrid.jqID(ts.p.id)+'_'+$.jgrid.jqID(n), '#'+$.jgrid.jqID(frz))[ts.p.useProp ? 'prop': 'attr']('checked', false);
									}
								});
								ts.p.selarrrow = [];
								$(ts).jqGrid('setSelection',ri,true,e);
							}
						} else {
							$(ts).jqGrid('setSelection',ri,true,e);
						}
					} else {
						if(e[ts.p.multikey]) {
							$(ts).jqGrid('setSelection',ri,true,e);
						} else if(ts.p.multiselect && scb) {
							scb = $('#jqg_'+$.jgrid.jqID(ts.p.id)+'_'+ri).is(':checked');
							$('#jqg_'+$.jgrid.jqID(ts.p.id)+'_'+ri)[ts.p.useProp ? 'prop' : 'attr']('checked', scb);
						}
					}
				}
			}).bind('reloadGrid', function(e,opts) {
				if(ts.p.treeGrid ===true) {	ts.p.datatype = ts.p.treedatatype;}
				if (opts && opts.current) {
					ts.grid.selectionPreserver(ts);
				}
				if(ts.p.datatype=='local'){ $(ts).jqGrid('resetSelection');  if(ts.p.data.length) { refreshIndex();} }
				else if(!ts.p.treeGrid) {
					ts.p.selrow=null;
					if(ts.p.multiselect) {ts.p.selarrrow =[];setHeadCheckBox(false);}
					ts.p.savedRow = [];
				}
				if(ts.p.scroll) {emptyRows.call(ts, true, false);}
				if (opts && opts.page) {
					var page = opts.page;
					if (page > ts.p.lastpage) { page = ts.p.lastpage; }
					if (page < 1) { page = 1; }
					ts.p.page = page;
					if (ts.grid.prevRowHeight) {
						ts.grid.bDiv.scrollTop = (page - 1) * ts.grid.prevRowHeight * ts.p.rowNum;
					} else {
						ts.grid.bDiv.scrollTop = 0;
					}
				}
				if (ts.grid.prevRowHeight && ts.p.scroll) {
					delete ts.p.lastpage;
					ts.grid.populateVisible();
				} else {
					ts.grid.populate();
				}
				if(ts.p._inlinenav===true) {$(ts).jqGrid('showAddEditButtons');}
				return false;
			})
				.dblclick(function(e) {
					td = e.target;
					ptr = $(td,ts.rows).closest('tr.jqgrow');
					if($(ptr).length === 0 ){return;}
					ri = ptr[0].rowIndex;
					ci = $.jgrid.getCellIndex(td);
					$(ts).triggerHandler('jqGridDblClickRow', [$(ptr).attr('id'),ri,ci,e]);
					if ($.isFunction(this.p.ondblClickRow)) { ts.p.ondblClickRow.call(ts,$(ptr).attr('id'),ri,ci, e); }
				})
				.bind('contextmenu', function(e) {
					td = e.target;
					ptr = $(td,ts.rows).closest('tr.jqgrow');
					if($(ptr).length === 0 ){return;}
					if(!ts.p.multiselect) {	$(ts).jqGrid('setSelection',ptr[0].id,true,e);	}
					ri = ptr[0].rowIndex;
					ci = $.jgrid.getCellIndex(td);
					$(ts).triggerHandler('jqGridRightClickRow', [$(ptr).attr('id'),ri,ci,e]);
					if ($.isFunction(this.p.onRightClickRow)) { ts.p.onRightClickRow.call(ts,$(ptr).attr('id'),ri,ci, e); }
				});
			grid.bDiv = document.createElement('div');
			if(isMSIE) { if(String(ts.p.height).toLowerCase() === 'auto') { ts.p.height = '100%'; } }
			$(grid.bDiv)
				.append($('<div style="position:relative;'+(isMSIE && $.jgrid.msiever() < 8 ? 'height:0.01%;' : '')+'"></div>').append('<div></div>').append(this))
				.addClass('ui-jqgrid-bdiv')
				.css({ height: ts.p.height+(isNaN(ts.p.height)?'':'px'), width: (grid.width)+'px'})
				.scroll(grid.scrollGrid);
			$('table:first',grid.bDiv).css({width:ts.p.tblwidth+'px'});
			if( !$.support.tbody ) { //IE
				if( $('tbody',this).length == 2 ) { $('tbody:gt(0)',this).remove();}
			}
			if(ts.p.multikey){
				if( $.jgrid.msie) {
					$(grid.bDiv).bind('selectstart',function(){return false;});
				} else {
					$(grid.bDiv).bind('mousedown',function(){return false;});
				}
			}
			if(hg) {$(grid.bDiv).hide();}
			grid.cDiv = document.createElement('div');
			var arf = ts.p.hidegrid===true ? $('<a role=\'link\' href=\'javascript:void(0)\'></a>').addClass('ui-jqgrid-titlebar-close HeaderButton').hover(
				function(){ arf.addClass('ui-state-hover');},
				function() {arf.removeClass('ui-state-hover');})
				.append('<span class=\'ui-icon ui-icon-circle-triangle-n\'></span>').css((dir=='rtl'?'left':'right'),'0px') : '';
			$(grid.cDiv).append(arf).append('<span class=\'ui-jqgrid-title'+(dir=='rtl' ? '-rtl' :'' )+'\'>'+ts.p.caption+'</span>')
				.addClass('ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix');
			$(grid.cDiv).insertBefore(grid.hDiv);
			if( ts.p.toolbar[0] ) {
				grid.uDiv = document.createElement('div');
				if(ts.p.toolbar[1] == 'top') {$(grid.uDiv).insertBefore(grid.hDiv);}
				else if (ts.p.toolbar[1]=='bottom' ) {$(grid.uDiv).insertAfter(grid.hDiv);}
				if(ts.p.toolbar[1]=='both') {
					grid.ubDiv = document.createElement('div');
					$(grid.uDiv).addClass('ui-userdata ui-state-default').attr('id','t_'+this.id).insertBefore(grid.hDiv);
					$(grid.ubDiv).addClass('ui-userdata ui-state-default').attr('id','tb_'+this.id).insertAfter(grid.hDiv);
					if(hg)  {$(grid.ubDiv).hide();}
				} else {
					$(grid.uDiv).width(grid.width).addClass('ui-userdata ui-state-default').attr('id','t_'+this.id);
				}
				if(hg) {$(grid.uDiv).hide();}
			}
			if(ts.p.toppager) {
				ts.p.toppager = $.jgrid.jqID(ts.p.id)+'_toppager';
				grid.topDiv = $('<div id=\''+ts.p.toppager+'\'></div>')[0];
				ts.p.toppager = '#'+ts.p.toppager;
				$(grid.topDiv).addClass('ui-state-default ui-jqgrid-toppager').width(grid.width).insertBefore(grid.hDiv);
				setPager(ts.p.toppager,'_t');
			}
			if(ts.p.footerrow) {
				grid.sDiv = $('<div class=\'ui-jqgrid-sdiv\'></div>')[0];
				hb = $('<div class=\'ui-jqgrid-hbox'+(dir=='rtl'?'-rtl':'')+'\'></div>');
				$(grid.sDiv).append(hb).width(grid.width).insertAfter(grid.hDiv);
				$(hb).append(tfoot);
				grid.footers = $('.ui-jqgrid-ftable',grid.sDiv)[0].rows[0].cells;
				if(ts.p.rownumbers) { grid.footers[0].className = 'ui-state-default jqgrid-rownum'; }
				if(hg) {$(grid.sDiv).hide();}
			}
			hb = null;
			if(ts.p.caption) {
				var tdt = ts.p.datatype;
				if(ts.p.hidegrid===true) {
					$('.ui-jqgrid-titlebar-close',grid.cDiv).click( function(e){
						var onHdCl = $.isFunction(ts.p.onHeaderClick),
							elems = '.ui-jqgrid-bdiv, .ui-jqgrid-hdiv, .ui-jqgrid-pager, .ui-jqgrid-sdiv',
							counter, self = this;
						if(ts.p.toolbar[0]===true) {
							if( ts.p.toolbar[1]=='both') {
								elems += ', #' + $(grid.ubDiv).attr('id');
							}
							elems += ', #' + $(grid.uDiv).attr('id');
						}
						counter = $(elems,'#gview_'+$.jgrid.jqID(ts.p.id)).length;

						if(ts.p.gridstate == 'visible') {
							$(elems,'#gbox_'+$.jgrid.jqID(ts.p.id)).slideUp('fast', function() {
								counter--;
								if (counter === 0) {
									$('span',self).removeClass('ui-icon-circle-triangle-n').addClass('ui-icon-circle-triangle-s');
									ts.p.gridstate = 'hidden';
									if($('#gbox_'+$.jgrid.jqID(ts.p.id)).hasClass('ui-resizable')) { $('.ui-resizable-handle','#gbox_'+$.jgrid.jqID(ts.p.id)).hide(); }
									$(ts).triggerHandler('jqGridHeaderClick', [ts.p.gridstate,e]);
									if(onHdCl) {if(!hg) {ts.p.onHeaderClick.call(ts,ts.p.gridstate,e);}}
								}
							});
						} else if(ts.p.gridstate == 'hidden'){
							$(elems,'#gbox_'+$.jgrid.jqID(ts.p.id)).slideDown('fast', function() {
								counter--;
								if (counter === 0) {
									$('span',self).removeClass('ui-icon-circle-triangle-s').addClass('ui-icon-circle-triangle-n');
									if(hg) {ts.p.datatype = tdt;populate();hg=false;}
									ts.p.gridstate = 'visible';
									if($('#gbox_'+$.jgrid.jqID(ts.p.id)).hasClass('ui-resizable')) { $('.ui-resizable-handle','#gbox_'+$.jgrid.jqID(ts.p.id)).show(); }
									$(ts).triggerHandler('jqGridHeaderClick', [ts.p.gridstate,e]);
									if(onHdCl) {if(!hg) {ts.p.onHeaderClick.call(ts,ts.p.gridstate,e);}}
								}
							});
						}
						return false;
					});
					if(hg) {ts.p.datatype='local'; $('.ui-jqgrid-titlebar-close',grid.cDiv).trigger('click');}
				}
			} else {$(grid.cDiv).hide();}
			$(grid.hDiv).after(grid.bDiv)
				.mousemove(function (e) {
					if(grid.resizing){grid.dragMove(e);return false;}
				});
			$('.ui-jqgrid-labels',grid.hDiv).bind('selectstart', function () { return false; });
			$(document).mouseup(function () {
				if(grid.resizing) {	grid.dragEnd(); return false;}
				return true;
			});
			ts.formatCol = formatCol;
			ts.sortData = sortData;
			ts.updatepager = updatepager;
			ts.refreshIndex = refreshIndex;
			ts.setHeadCheckBox = setHeadCheckBox;
			ts.constructTr = constructTr;
			ts.formatter = function ( rowId, cellval , colpos, rwdat, act){return formatter(rowId, cellval , colpos, rwdat, act);};
			$.extend(grid,{populate : populate, emptyRows: emptyRows});
			this.grid = grid;
			ts.addXmlData = function(d) {addXmlData(d,ts.grid.bDiv);};
			ts.addJSONData = function(d) {addJSONData(d,ts.grid.bDiv);};
			this.grid.cols = this.rows[0].cells;
			$(ts).triggerHandler('jqGridInitGrid');
			if ($.isFunction( ts.p.onInitGrid )) { ts.p.onInitGrid.call(ts); }

			populate();ts.p.hiddengrid=false;
		});
	};
	$.jgrid.extend({
		getGridParam : function(pName) {
			var $t = this[0];
			if (!$t || !$t.grid) {return;}
			if (!pName) { return $t.p; }
			return $t.p[pName] !== undefined ? $t.p[pName] : null;
		},
		setGridParam : function (newParams){
			return this.each(function(){
				if (this.grid && typeof newParams === 'object') {$.extend(true,this.p,newParams);}
			});
		},
		getDataIDs : function () {
			var ids=[], i=0, len, j=0;
			this.each(function(){
				len = this.rows.length;
				if(len && len>0){
					while(i<len) {
						if($(this.rows[i]).hasClass('jqgrow')) {
							ids[j] = this.rows[i].id;
							j++;
						}
						i++;
					}
				}
			});
			return ids;
		},
		setSelection : function(selection,onsr, e) {
			return this.each(function(){
				var $t = this, stat,pt, ner, ia, tpsr, fid;
				if(selection === undefined) { return; }
				onsr = onsr === false ? false : true;
				pt=$t.rows.namedItem(String(selection));
				if(!pt || !pt.className || pt.className.indexOf( 'ui-state-disabled' ) > -1 ) { return; }
				function scrGrid(iR){
					var ch = $($t.grid.bDiv)[0].clientHeight,
						st = $($t.grid.bDiv)[0].scrollTop,
						rpos = $($t.rows[iR]).position().top,
						rh = $t.rows[iR].clientHeight;
					if(rpos+rh >= ch+st) { $($t.grid.bDiv)[0].scrollTop = rpos-(ch+st)+rh+st; }
					else if(rpos < ch+st) {
						if(rpos < st) {
							$($t.grid.bDiv)[0].scrollTop = rpos;
						}
					}
				}
				if($t.p.scrollrows===true) {
					ner = $t.rows.namedItem(selection).rowIndex;
					if(ner >=0 ){
						scrGrid(ner);
					}
				}
				if($t.p.frozenColumns === true ) {
					fid = $t.p.id+'_frozen';
				}
				if(!$t.p.multiselect) {
					if(pt.className !== 'ui-subgrid') {
						if( $t.p.selrow != pt.id) {
							$($t.rows.namedItem($t.p.selrow)).removeClass('ui-state-highlight').attr({'aria-selected':'false', 'tabindex' : '-1'});
							$(pt).addClass('ui-state-highlight').attr({'aria-selected':'true', 'tabindex' : '0'});//.focus();
							if(fid) {
								$('#'+$.jgrid.jqID($t.p.selrow), '#'+$.jgrid.jqID(fid)).removeClass('ui-state-highlight');
								$('#'+$.jgrid.jqID(selection), '#'+$.jgrid.jqID(fid)).addClass('ui-state-highlight');
							}
							stat = true;
						} else {
							stat = false;
						}
						$t.p.selrow = pt.id;
						$($t).triggerHandler('jqGridSelectRow', [pt.id, stat, e]);
						if( $t.p.onSelectRow && onsr) { $t.p.onSelectRow.call($t, pt.id, stat, e); }
					}
				} else {
				//unselect selectall checkbox when deselecting a specific row
					$t.setHeadCheckBox( false );
					$t.p.selrow = pt.id;
					ia = $.inArray($t.p.selrow,$t.p.selarrrow);
					if (  ia === -1 ){
						if(pt.className !== 'ui-subgrid') { $(pt).addClass('ui-state-highlight').attr('aria-selected','true');}
						stat = true;
						$t.p.selarrrow.push($t.p.selrow);
					} else {
						if(pt.className !== 'ui-subgrid') { $(pt).removeClass('ui-state-highlight').attr('aria-selected','false');}
						stat = false;
						$t.p.selarrrow.splice(ia,1);
						tpsr = $t.p.selarrrow[0];
						$t.p.selrow = (tpsr === undefined) ? null : tpsr;
					}
					$('#jqg_'+$.jgrid.jqID($t.p.id)+'_'+$.jgrid.jqID(pt.id))[$t.p.useProp ? 'prop': 'attr']('checked',stat);
					if(fid) {
						if(ia === -1) {
							$('#'+$.jgrid.jqID(selection), '#'+$.jgrid.jqID(fid)).addClass('ui-state-highlight');
						} else {
							$('#'+$.jgrid.jqID(selection), '#'+$.jgrid.jqID(fid)).removeClass('ui-state-highlight');
						}
						$('#jqg_'+$.jgrid.jqID($t.p.id)+'_'+$.jgrid.jqID(selection), '#'+$.jgrid.jqID(fid))[$t.p.useProp ? 'prop': 'attr']('checked',stat);
					}
					$($t).triggerHandler('jqGridSelectRow', [pt.id, stat, e]);
					if( $t.p.onSelectRow && onsr) { $t.p.onSelectRow.call($t, pt.id , stat, e); }
				}
			});
		},
		resetSelection : function( rowid ){
			return this.each(function(){
				var t = this, ind, sr, fid;
				if( t.p.frozenColumns === true ) {
					fid = t.p.id+'_frozen';
				}
				if(rowid !== undefined ) {
					sr = rowid === t.p.selrow ? t.p.selrow : rowid;
					$('#'+$.jgrid.jqID(t.p.id)+' tbody:first tr#'+$.jgrid.jqID(sr)).removeClass('ui-state-highlight').attr('aria-selected','false');
					if (fid) { $('#'+$.jgrid.jqID(sr), '#'+$.jgrid.jqID(fid)).removeClass('ui-state-highlight'); }
					if(t.p.multiselect) {
						$('#jqg_'+$.jgrid.jqID(t.p.id)+'_'+$.jgrid.jqID(sr), '#'+$.jgrid.jqID(t.p.id))[t.p.useProp ? 'prop': 'attr']('checked',false);
						if(fid) { $('#jqg_'+$.jgrid.jqID(t.p.id)+'_'+$.jgrid.jqID(sr), '#'+$.jgrid.jqID(fid))[t.p.useProp ? 'prop': 'attr']('checked',false); }
						t.setHeadCheckBox( false);
					}
					sr = null;
				} else if(!t.p.multiselect) {
					if(t.p.selrow) {
						$('#'+$.jgrid.jqID(t.p.id)+' tbody:first tr#'+$.jgrid.jqID(t.p.selrow)).removeClass('ui-state-highlight').attr('aria-selected','false');
						if(fid) { $('#'+$.jgrid.jqID(t.p.selrow), '#'+$.jgrid.jqID(fid)).removeClass('ui-state-highlight'); }
						t.p.selrow = null;
					}
				} else {
					$(t.p.selarrrow).each(function(i,n){
						ind = t.rows.namedItem(n);
						$(ind).removeClass('ui-state-highlight').attr('aria-selected','false');
						$('#jqg_'+$.jgrid.jqID(t.p.id)+'_'+$.jgrid.jqID(n))[t.p.useProp ? 'prop': 'attr']('checked',false);
						if(fid) {
							$('#'+$.jgrid.jqID(n), '#'+$.jgrid.jqID(fid)).removeClass('ui-state-highlight');
							$('#jqg_'+$.jgrid.jqID(t.p.id)+'_'+$.jgrid.jqID(n), '#'+$.jgrid.jqID(fid))[t.p.useProp ? 'prop': 'attr']('checked',false);
						}
					});
					t.setHeadCheckBox( false );
					t.p.selarrrow = [];
				}
				if(t.p.cellEdit === true) {
					if(parseInt(t.p.iCol,10)>=0  && parseInt(t.p.iRow,10)>=0) {
						$('td:eq('+t.p.iCol+')',t.rows[t.p.iRow]).removeClass('edit-cell ui-state-highlight');
						$(t.rows[t.p.iRow]).removeClass('selected-row ui-state-hover');
					}
				}
				t.p.savedRow = [];
			});
		},
		getRowData : function( rowid ) {
			var res = {}, resall, getall=false, len, j=0;
			this.each(function(){
				var $t = this,nm,ind;
				if(rowid === undefined) {
					getall = true;
					resall = [];
					len = $t.rows.length;
				} else {
					ind = $t.rows.namedItem(rowid);
					if(!ind) { return res; }
					len = 2;
				}
				while(j<len){
					if(getall) { ind = $t.rows[j]; }
					if( $(ind).hasClass('jqgrow') ) {
						$('td[role="gridcell"]',ind).each( function(i) {
							nm = $t.p.colModel[i].name;
							if ( nm !== 'cb' && nm !== 'subgrid' && nm !== 'rn') {
								if($t.p.treeGrid===true && nm == $t.p.ExpandColumn) {
									res[nm] = $.jgrid.htmlDecode($('span:first',this).html());
								} else {
									try {
										res[nm] = $.unformat.call($t,this,{rowId:ind.id, colModel:$t.p.colModel[i]},i);
									} catch (e){
										res[nm] = $.jgrid.htmlDecode($(this).html());
									}
								}
							}
						});
						if(getall) { resall.push(res); res={}; }
					}
					j++;
				}
			});
			return resall || res;
		},
		delRowData : function(rowid) {
			var success = false, rowInd, ia, ri;
			this.each(function() {
				var $t = this;
				rowInd = $t.rows.namedItem(rowid);
				if(!rowInd) {return false;}
				ri = rowInd.rowIndex;
				$(rowInd).remove();
				$t.p.records--;
				$t.p.reccount--;
				$t.updatepager(true,false);
				success=true;
				if($t.p.multiselect) {
					ia = $.inArray(rowid,$t.p.selarrrow);
					if(ia != -1) { $t.p.selarrrow.splice(ia,1);}
				}
				if ($t.p.multiselect && $t.p.selarrrow.length > 0) {
					$t.p.selrow = $t.p.selarrrow[$t.p.selarrrow.length-1];
				} else {
					$t.p.selrow = null;
				}
				if($t.p.datatype == 'local') {
					var id = $.jgrid.stripPref($t.p.idPrefix, rowid),
						pos = $t.p._index[id];
					if(pos !== undefined) {
						$t.p.data.splice(pos,1);
						$t.refreshIndex();
					}
				}
				if( $t.p.altRows === true && success ) {
					var cn = $t.p.altclass;
					$($t.rows).each(function(i){
						if(i % 2 ==1) { $(this).addClass(cn); }
						else { $(this).removeClass(cn); }
					});
				}
			});
			return success;
		},
		setRowData : function(rowid, data, cssp) {
			var nm, success=true, title;
			this.each(function(){
				if(!this.grid) {return false;}
				var t = this, vl, ind, cp = typeof cssp, lcdata={};
				ind = t.rows.namedItem(rowid);
				if(!ind) { return false; }
				if( data ) {
					try {
						$(this.p.colModel).each(function(i){
							nm = this.name;
							if( data[nm] !== undefined) {
								lcdata[nm] = this.formatter && typeof this.formatter === 'string' && this.formatter == 'date' ? $.unformat.date.call(t,data[nm],this) : data[nm];
								vl = t.formatter( rowid, data[nm], i, data, 'edit');
								title = this.title ? {'title':$.jgrid.stripHtml(vl)} : {};
								if(t.p.treeGrid===true && nm == t.p.ExpandColumn) {
									$('td[role=\'gridcell\']:eq('+i+') > span:first',ind).html(vl).attr(title);
								} else {
									$('td[role=\'gridcell\']:eq('+i+')',ind).html(vl).attr(title);
								}
							}
						});
						if(t.p.datatype == 'local') {
							var id = $.jgrid.stripPref(t.p.idPrefix, rowid),
								pos = t.p._index[id], key;
							if(t.p.treeGrid) {
								for(key in t.p.treeReader){
									if(t.p.treeReader.hasOwnProperty(key)) {
										delete lcdata[t.p.treeReader[key]];
									}
								}
							}
							if(pos !== undefined) {
								t.p.data[pos] = $.extend(true, t.p.data[pos], lcdata);
							}
							lcdata = null;
						}
					} catch (e) {
						success = false;
					}
				}
				if(success) {
					if(cp === 'string') {$(ind).addClass(cssp);} else if(cp === 'object') {$(ind).css(cssp);}
					$(t).triggerHandler('jqGridAfterGridComplete');
				}
			});
			return success;
		},
		addRowData : function(rowid,rdata,pos,src) {
			if(!pos) {pos = 'last';}
			var success = false, nm, row, gi, si, ni,sind, i, v, prp='', aradd, cnm, cn, data, cm, id;
			if(rdata) {
				if($.isArray(rdata)) {
					aradd=true;
					pos = 'last';
					cnm = rowid;
				} else {
					rdata = [rdata];
					aradd = false;
				}
				this.each(function() {
					var t = this, datalen = rdata.length;
					ni = t.p.rownumbers===true ? 1 :0;
					gi = t.p.multiselect ===true ? 1 :0;
					si = t.p.subGrid===true ? 1 :0;
					if(!aradd) {
						if(rowid !== undefined) { rowid = String(rowid);}
						else {
							rowid = $.jgrid.randId();
							if(t.p.keyIndex !== false) {
								cnm = t.p.colModel[t.p.keyIndex+gi+si+ni].name;
								if(rdata[0][cnm] !== undefined) { rowid = rdata[0][cnm]; }
							}
						}
					}
					cn = t.p.altclass;
					var k = 0, cna ='', lcdata = {},
						air = $.isFunction(t.p.afterInsertRow) ? true : false;
					while(k < datalen) {
						data = rdata[k];
						row=[];
						if(aradd) {
							try {
								rowid = data[cnm];
								if(rowid===undefined) {
									rowid = $.jgrid.randId();
								}
							}
							catch (e) {rowid = $.jgrid.randId();}
							cna = t.p.altRows === true ?  (t.rows.length-1)%2 === 0 ? cn : '' : '';
						}
						id = rowid;
						rowid  = t.p.idPrefix + rowid;
						if(ni){
							prp = t.formatCol(0,1,'',null,rowid, true);
							row[row.length] = '<td role="gridcell" class="ui-state-default jqgrid-rownum" '+prp+'>0</td>';
						}
						if(gi) {
							v = '<input role="checkbox" type="checkbox"'+' id="jqg_'+t.p.id+'_'+rowid+'" class="cbox"/>';
							prp = t.formatCol(ni,1,'', null, rowid, true);
							row[row.length] = '<td role="gridcell" '+prp+'>'+v+'</td>';
						}
						if(si) {
							row[row.length] = $(t).jqGrid('addSubGridCell',gi+ni,1);
						}
						for(i = gi+si+ni; i < t.p.colModel.length;i++){
							cm = t.p.colModel[i];
							nm = cm.name;
							lcdata[nm] = data[nm];
							v = t.formatter( rowid, $.jgrid.getAccessor(data,nm), i, data );
							prp = t.formatCol(i,1,v, data, rowid, lcdata);
							row[row.length] = '<td role="gridcell" '+prp+'>'+v+'</td>';
						}
						row.unshift( t.constructTr(rowid, false, cna, lcdata, data, false ) );
						row[row.length] = '</tr>';
						if(t.rows.length === 0){
							$('table:first',t.grid.bDiv).append(row.join(''));
						} else {
							switch (pos) {
							case 'last':
								$(t.rows[t.rows.length-1]).after(row.join(''));
								sind = t.rows.length-1;
								break;
							case 'first':
								$(t.rows[0]).after(row.join(''));
								sind = 1;
								break;
							case 'after':
								sind = t.rows.namedItem(src);
								if (sind) {
									if($(t.rows[sind.rowIndex+1]).hasClass('ui-subgrid')) { $(t.rows[sind.rowIndex+1]).after(row); }
									else { $(sind).after(row.join('')); }
								}
								sind++;
								break;
							case 'before':
								sind = t.rows.namedItem(src);
								if(sind) {$(sind).before(row.join(''));sind=sind.rowIndex;}
								sind--;
								break;
							}
						}
						if(t.p.subGrid===true) {
							$(t).jqGrid('addSubGrid',gi+ni, sind);
						}
						t.p.records++;
						t.p.reccount++;
						$(t).triggerHandler('jqGridAfterInsertRow', [rowid,data,data]);
						if(air) { t.p.afterInsertRow.call(t,rowid,data,data); }
						k++;
						if(t.p.datatype == 'local') {
							lcdata[t.p.localReader.id] = id;
							t.p._index[id] = t.p.data.length;
							t.p.data.push(lcdata);
							lcdata = {};
						}
					}
					if( t.p.altRows === true && !aradd) {
						if (pos == 'last') {
							if ((t.rows.length-1)%2 == 1)  {$(t.rows[t.rows.length-1]).addClass(cn);}
						} else {
							$(t.rows).each(function(i){
								if(i % 2 ==1) { $(this).addClass(cn); }
								else { $(this).removeClass(cn); }
							});
						}
					}
					t.updatepager(true,true);
					success = true;
				});
			}
			return success;
		},
		footerData : function(action,data, format) {
			var nm, success=false, res={}, title;
			function isEmpty(obj) {
				var i;
				for(i in obj) {
					if (obj.hasOwnProperty(i)) { return false; }
				}
				return true;
			}
			if(action === undefined) { action = 'get'; }
			if(typeof format !== 'boolean') { format  = true; }
			action = action.toLowerCase();
			this.each(function(){
				var t = this, vl;
				if(!t.grid || !t.p.footerrow) {return false;}
				if(action == 'set') { if(isEmpty(data)) { return false; } }
				success=true;
				$(this.p.colModel).each(function(i){
					nm = this.name;
					if(action == 'set') {
						if( data[nm] !== undefined) {
							vl = format ? t.formatter( '', data[nm], i, data, 'edit') : data[nm];
							title = this.title ? {'title':$.jgrid.stripHtml(vl)} : {};
							$('tr.footrow td:eq('+i+')',t.grid.sDiv).html(vl).attr(title);
							success = true;
						}
					} else if(action == 'get') {
						res[nm] = $('tr.footrow td:eq('+i+')',t.grid.sDiv).html();
					}
				});
			});
			return action == 'get' ? res : success;
		},
		showHideCol : function(colname,show) {
			return this.each(function() {
				var $t = this, fndh=false, brd=$.jgrid.cell_width ? 0: $t.p.cellLayout, cw;
				if (!$t.grid ) {return;}
				if( typeof colname === 'string') {colname=[colname];}
				show = show != 'none' ? '' : 'none';
				var sw = show === '' ? true :false,
					gh = $t.p.groupHeader && (typeof $t.p.groupHeader === 'object' || $.isFunction($t.p.groupHeader) );
				if(gh) { $($t).jqGrid('destroyGroupHeader', false); }
				$(this.p.colModel).each(function(i) {
					if ($.inArray(this.name,colname) !== -1 && this.hidden === sw) {
						if($t.p.frozenColumns === true && this.frozen === true) {
							return true;
						}
						$('tr',$t.grid.hDiv).each(function(){
							$(this.cells[i]).css('display', show);
						});
						$($t.rows).each(function(){
							if (!$(this).hasClass('jqgroup')) {
								$(this.cells[i]).css('display', show);
							}
						});
						if($t.p.footerrow) { $('tr.footrow td:eq('+i+')', $t.grid.sDiv).css('display', show); }
						cw =  parseInt(this.width,10);
						if(show === 'none') {
							$t.p.tblwidth -= cw+brd;
						} else {
							$t.p.tblwidth += cw+brd;
						}
						this.hidden = !sw;
						fndh=true;
						$($t).triggerHandler('jqGridShowHideCol', [sw,this.name,i]);
					}
				});
				if(fndh===true) {
					if($t.p.shrinkToFit === true && !isNaN($t.p.height)) { $t.p.tblwidth += parseInt($t.p.scrollOffset,10);}
					$($t).jqGrid('setGridWidth',$t.p.shrinkToFit === true ? $t.p.tblwidth : $t.p.width );
				}
				if( gh )  {
					$($t).jqGrid('setGroupHeaders',$t.p.groupHeader);
				}
			});
		},
		hideCol : function (colname) {
			return this.each(function(){$(this).jqGrid('showHideCol',colname,'none');});
		},
		showCol : function(colname) {
			return this.each(function(){$(this).jqGrid('showHideCol',colname,'');});
		},
		remapColumns : function(permutation, updateCells, keepHeader)
		{
			function resortArray(a) {
				var ac;
				if (a.length) {
					ac = $.makeArray(a);
				} else {
					ac = $.extend({}, a);
				}
				$.each(permutation, function(i) {
					a[i] = ac[this];
				});
			}
			var ts = this.get(0);
			function resortRows(parent, clobj) {
				$('>tr'+(clobj||''), parent).each(function() {
					var row = this;
					var elems = $.makeArray(row.cells);
					$.each(permutation, function() {
						var e = elems[this];
						if (e) {
							row.appendChild(e);
						}
					});
				});
			}
			resortArray(ts.p.colModel);
			resortArray(ts.p.colNames);
			resortArray(ts.grid.headers);
			resortRows($('thead:first', ts.grid.hDiv), keepHeader && ':not(.ui-jqgrid-labels)');
			if (updateCells) {
				resortRows($('#'+$.jgrid.jqID(ts.p.id)+' tbody:first'), '.jqgfirstrow, tr.jqgrow, tr.jqfoot');
			}
			if (ts.p.footerrow) {
				resortRows($('tbody:first', ts.grid.sDiv));
			}
			if (ts.p.remapColumns) {
				if (!ts.p.remapColumns.length){
					ts.p.remapColumns = $.makeArray(permutation);
				} else {
					resortArray(ts.p.remapColumns);
				}
			}
			ts.p.lastsort = $.inArray(ts.p.lastsort, permutation);
			if(ts.p.treeGrid) { ts.p.expColInd = $.inArray(ts.p.expColInd, permutation); }
			$(ts).triggerHandler('jqGridRemapColumns', [permutation, updateCells, keepHeader]);
		},
		setGridWidth : function(nwidth, shrink) {
			return this.each(function(){
				if (!this.grid ) {return;}
				var $t = this, cw,
					initwidth = 0, brd=$.jgrid.cell_width ? 0: $t.p.cellLayout, lvc, vc=0, hs=false, scw=$t.p.scrollOffset, aw, gw=0,
					cl = 0,cr;
				if(typeof shrink !== 'boolean') {
					shrink=$t.p.shrinkToFit;
				}
				if(isNaN(nwidth)) {return;}
				nwidth = parseInt(nwidth,10);
				$t.grid.width = $t.p.width = nwidth;
				$('#gbox_'+$.jgrid.jqID($t.p.id)).css('width',nwidth+'px');
				$('#gview_'+$.jgrid.jqID($t.p.id)).css('width',nwidth+'px');
				$($t.grid.bDiv).css('width',nwidth+'px');
				$($t.grid.hDiv).css('width',nwidth+'px');
				if($t.p.pager ) {$($t.p.pager).css('width',nwidth+'px');}
				if($t.p.toppager ) {$($t.p.toppager).css('width',nwidth+'px');}
				if($t.p.toolbar[0] === true){
					$($t.grid.uDiv).css('width',nwidth+'px');
					if($t.p.toolbar[1]=='both') {$($t.grid.ubDiv).css('width',nwidth+'px');}
				}
				if($t.p.footerrow) { $($t.grid.sDiv).css('width',nwidth+'px'); }
				if(shrink ===false && $t.p.forceFit === true) {$t.p.forceFit=false;}
				if(shrink===true) {
					$.each($t.p.colModel, function() {
						if(this.hidden===false){
							cw = this.widthOrg;
							initwidth += cw+brd;
							if(this.fixed) {
								gw += cw+brd;
							} else {
								vc++;
							}
							cl++;
						}
					});
					if(vc  === 0) { return; }
					$t.p.tblwidth = initwidth;
					aw = nwidth-brd*vc-gw;
					if(!isNaN($t.p.height)) {
						if($($t.grid.bDiv)[0].clientHeight < $($t.grid.bDiv)[0].scrollHeight || $t.rows.length === 1){
							hs = true;
							aw -= scw;
						}
					}
					initwidth =0;
					var cle = $t.grid.cols.length >0;
					$.each($t.p.colModel, function(i) {
						if(this.hidden === false && !this.fixed){
							cw = this.widthOrg;
							cw = Math.round(aw*cw/($t.p.tblwidth-brd*vc-gw));
							if (cw < 0) { return; }
							this.width =cw;
							initwidth += cw;
							$t.grid.headers[i].width=cw;
							$t.grid.headers[i].el.style.width=cw+'px';
							if($t.p.footerrow) { $t.grid.footers[i].style.width = cw+'px'; }
							if(cle) { $t.grid.cols[i].style.width = cw+'px'; }
							lvc = i;
						}
					});

					if (!lvc) { return; }

					cr =0;
					if (hs) {
						if(nwidth-gw-(initwidth+brd*vc) !== scw){
							cr = nwidth-gw-(initwidth+brd*vc)-scw;
						}
					} else if( Math.abs(nwidth-gw-(initwidth+brd*vc)) !== 1) {
						cr = nwidth-gw-(initwidth+brd*vc);
					}
					$t.p.colModel[lvc].width += cr;
					$t.p.tblwidth = initwidth+cr+brd*vc+gw;
					if($t.p.tblwidth > nwidth) {
						var delta = $t.p.tblwidth - parseInt(nwidth,10);
						$t.p.tblwidth = nwidth;
						cw = $t.p.colModel[lvc].width = $t.p.colModel[lvc].width-delta;
					} else {
						cw= $t.p.colModel[lvc].width;
					}
					$t.grid.headers[lvc].width = cw;
					$t.grid.headers[lvc].el.style.width=cw+'px';
					if(cle) { $t.grid.cols[lvc].style.width = cw+'px'; }
					if($t.p.footerrow) {
						$t.grid.footers[lvc].style.width = cw+'px';
					}
				}
				if($t.p.tblwidth) {
					$('table:first',$t.grid.bDiv).css('width',$t.p.tblwidth+'px');
					$('table:first',$t.grid.hDiv).css('width',$t.p.tblwidth+'px');
					$t.grid.hDiv.scrollLeft = $t.grid.bDiv.scrollLeft;
					if($t.p.footerrow) {
						$('table:first',$t.grid.sDiv).css('width',$t.p.tblwidth+'px');
					}
				}
			});
		},
		setGridHeight : function (nh) {
			return this.each(function (){
				var $t = this;
				if(!$t.grid) {return;}
				var bDiv = $($t.grid.bDiv);
				bDiv.css({height: nh+(isNaN(nh)?'':'px')});
				if($t.p.frozenColumns === true){
				//follow the original set height to use 16, better scrollbar width detection
					$('#'+$.jgrid.jqID($t.p.id)+'_frozen').parent().height(bDiv.height() - 16);
				}
				$t.p.height = nh;
				if ($t.p.scroll) { $t.grid.populateVisible(); }
			});
		},
		setCaption : function (newcap){
			return this.each(function(){
				this.p.caption=newcap;
				$('span.ui-jqgrid-title, span.ui-jqgrid-title-rtl',this.grid.cDiv).html(newcap);
				$(this.grid.cDiv).show();
			});
		},
		setLabel : function(colname, nData, prop, attrp ){
			return this.each(function(){
				var $t = this, pos=-1;
				if(!$t.grid) {return;}
				if(colname !== undefined) {
					$($t.p.colModel).each(function(i){
						if (this.name == colname) {
							pos = i;return false;
						}
					});
				} else { return; }
				if(pos>=0) {
					var thecol = $('tr.ui-jqgrid-labels th:eq('+pos+')',$t.grid.hDiv);
					if (nData){
						var ico = $('.s-ico',thecol);
						$('[id^=jqgh_]',thecol).empty().html(nData).append(ico);
						$t.p.colNames[pos] = nData;
					}
					if (prop) {
						if(typeof prop === 'string') {$(thecol).addClass(prop);} else {$(thecol).css(prop);}
					}
					if(typeof attrp === 'object') {$(thecol).attr(attrp);}
				}
			});
		},
		setCell : function(rowid,colname,nData,cssp,attrp, forceupd) {
			return this.each(function(){
				var $t = this, pos =-1,v, title;
				if(!$t.grid) {return;}
				if(isNaN(colname)) {
					$($t.p.colModel).each(function(i){
						if (this.name == colname) {
							pos = i;return false;
						}
					});
				} else {pos = parseInt(colname,10);}
				if(pos>=0) {
					var ind = $t.rows.namedItem(rowid);
					if (ind){
						var tcell = $('td:eq('+pos+')',ind);
						if(nData !== '' || forceupd === true) {
							v = $t.formatter(rowid, nData, pos,ind,'edit');
							title = $t.p.colModel[pos].title ? {'title':$.jgrid.stripHtml(v)} : {};
							if($t.p.treeGrid && $('.tree-wrap',$(tcell)).length>0) {
								$('span',$(tcell)).html(v).attr(title);
							} else {
								$(tcell).html(v).attr(title);
							}
							if($t.p.datatype == 'local') {
								var cm = $t.p.colModel[pos], index;
								nData = cm.formatter && typeof cm.formatter === 'string' && cm.formatter == 'date' ? $.unformat.date.call($t,nData,cm) : nData;
								index = $t.p._index[rowid];
								if(index !== undefined) {
									$t.p.data[index][cm.name] = nData;
								}
							}
						}
						if(typeof cssp === 'string'){
							$(tcell).addClass(cssp);
						} else if(cssp) {
							$(tcell).css(cssp);
						}
						if(typeof attrp === 'object') {$(tcell).attr(attrp);}
					}
				}
			});
		},
		getCell : function(rowid,col) {
			var ret = false;
			this.each(function(){
				var $t=this, pos=-1;
				if(!$t.grid) {return;}
				if(isNaN(col)) {
					$($t.p.colModel).each(function(i){
						if (this.name === col) {
							pos = i;return false;
						}
					});
				} else {pos = parseInt(col,10);}
				if(pos>=0) {
					var ind = $t.rows.namedItem(rowid);
					if(ind) {
						try {
							ret = $.unformat.call($t,$('td:eq('+pos+')',ind),{rowId:ind.id, colModel:$t.p.colModel[pos]},pos);
						} catch (e){
							ret = $.jgrid.htmlDecode($('td:eq('+pos+')',ind).html());
						}
					}
				}
			});
			return ret;
		},
		getCol : function (col, obj, mathopr) {
			var ret = [], val, sum=0, min, max, v;
			obj = typeof obj !== 'boolean' ? false : obj;
			if(mathopr === undefined) { mathopr = false; }
			this.each(function(){
				var $t=this, pos=-1;
				if(!$t.grid) {return;}
				if(isNaN(col)) {
					$($t.p.colModel).each(function(i){
						if (this.name === col) {
							pos = i;return false;
						}
					});
				} else {pos = parseInt(col,10);}
				if(pos>=0) {
					var ln = $t.rows.length, i =0;
					if (ln && ln>0){
						while(i<ln){
							if($($t.rows[i]).hasClass('jqgrow')) {
								try {
									val = $.unformat.call($t,$($t.rows[i].cells[pos]),{rowId:$t.rows[i].id, colModel:$t.p.colModel[pos]},pos);
								} catch (e) {
									val = $.jgrid.htmlDecode($t.rows[i].cells[pos].innerHTML);
								}
								if(mathopr) {
									v = parseFloat(val);
									sum += v;
									if (max === undefined) {max = min = v;}
									min = Math.min(min, v);
									max = Math.max(max, v);
								}
								else if(obj) { ret.push( {id:$t.rows[i].id,value:val} ); }
								else { ret.push( val ); }
							}
							i++;
						}
						if(mathopr) {
							switch(mathopr.toLowerCase()){
							case 'sum': ret =sum; break;
							case 'avg': ret = sum/ln; break;
							case 'count': ret = ln; break;
							case 'min': ret = min; break;
							case 'max': ret = max; break;
							}
						}
					}
				}
			});
			return ret;
		},
		clearGridData : function(clearfooter) {
			return this.each(function(){
				var $t = this;
				if(!$t.grid) {return;}
				if(typeof clearfooter !== 'boolean') { clearfooter = false; }
				if($t.p.deepempty) {$('#'+$.jgrid.jqID($t.p.id)+' tbody:first tr:gt(0)').remove();}
				else {
					var trf = $('#'+$.jgrid.jqID($t.p.id)+' tbody:first tr:first')[0];
					$('#'+$.jgrid.jqID($t.p.id)+' tbody:first').empty().append(trf);
				}
				if($t.p.footerrow && clearfooter) { $('.ui-jqgrid-ftable td',$t.grid.sDiv).html('&#160;'); }
				$t.p.selrow = null; $t.p.selarrrow= []; $t.p.savedRow = [];
				$t.p.records = 0;$t.p.page=1;$t.p.lastpage=0;$t.p.reccount=0;
				$t.p.data = []; $t.p._index = {};
				$t.updatepager(true,false);
			});
		},
		getInd : function(rowid,rc){
			var ret =false,rw;
			this.each(function(){
				rw = this.rows.namedItem(rowid);
				if(rw) {
					ret = rc===true ? rw: rw.rowIndex;
				}
			});
			return ret;
		},
		bindKeys : function( settings ){
			var o = $.extend({
				onEnter: null,
				onSpace: null,
				onLeftKey: null,
				onRightKey: null,
				scrollingRows : true
			},settings || {});
			return this.each(function(){
				var $t = this;
				if( !$('body').is('[role]') ){$('body').attr('role','application');}
				$t.p.scrollrows = o.scrollingRows;
				$($t).keydown(function(event){
					var target = $($t).find('tr[tabindex=0]')[0], id, r, mind,
						expanded = $t.p.treeReader.expanded_field;
					//check for arrow keys
					if(target) {
						mind = $t.p._index[target.id];
						if(event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40){
						// up key
							if(event.keyCode === 38 ){
								r = target.previousSibling;
								id = '';
								if(r) {
									if($(r).is(':hidden')) {
										while(r) {
											r = r.previousSibling;
											if(!$(r).is(':hidden') && $(r).hasClass('jqgrow')) {id = r.id;break;}
										}
									} else {
										id = r.id;
									}
								}
								$($t).jqGrid('setSelection', id, true, event);
								event.preventDefault();
							}
							//if key is down arrow
							if(event.keyCode === 40){
								r = target.nextSibling;
								id ='';
								if(r) {
									if($(r).is(':hidden')) {
										while(r) {
											r = r.nextSibling;
											if(!$(r).is(':hidden') && $(r).hasClass('jqgrow') ) {id = r.id;break;}
										}
									} else {
										id = r.id;
									}
								}
								$($t).jqGrid('setSelection', id, true, event);
								event.preventDefault();
							}
							// left
							if(event.keyCode === 37 ){
								if($t.p.treeGrid && $t.p.data[mind][expanded]) {
									$(target).find('div.treeclick').trigger('click');
								}
								$($t).triggerHandler('jqGridKeyLeft', [$t.p.selrow]);
								if($.isFunction(o.onLeftKey)) {
									o.onLeftKey.call($t, $t.p.selrow);
								}
							}
							// right
							if(event.keyCode === 39 ){
								if($t.p.treeGrid && !$t.p.data[mind][expanded]) {
									$(target).find('div.treeclick').trigger('click');
								}
								$($t).triggerHandler('jqGridKeyRight', [$t.p.selrow]);
								if($.isFunction(o.onRightKey)) {
									o.onRightKey.call($t, $t.p.selrow);
								}
							}
						}
						//check if enter was pressed on a grid or treegrid node
						else if( event.keyCode === 13 ){
							$($t).triggerHandler('jqGridKeyEnter', [$t.p.selrow]);
							if($.isFunction(o.onEnter)) {
								o.onEnter.call($t, $t.p.selrow);
							}
						} else if(event.keyCode === 32) {
							$($t).triggerHandler('jqGridKeySpace', [$t.p.selrow]);
							if($.isFunction(o.onSpace)) {
								o.onSpace.call($t, $t.p.selrow);
							}
						}
					}
				});
			});
		},
		unbindKeys : function(){
			return this.each(function(){
				$(this).unbind('keydown');
			});
		},
		getLocalRow : function (rowid) {
			var ret = false, ind;
			this.each(function(){
				if(rowid !== undefined) {
					ind = this.p._index[rowid];
					if(ind >= 0 ) {
						ret = this.p.data[ind];
					}
				}
			});
			return ret;
		}
	});
})(jQuery);
/*jshint eqeqeq:false */
/*global jQuery */
(function($){
/**
 * jqGrid extension for custom methods
 * Tony Tomov tony@trirand.com
 * http://trirand.com/blog/
 *
 * Wildraid wildraid@mail.ru
 * Oleg Kiriljuk oleg.kiriljuk@ok-soft-gmbh.com
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
**/
	'use strict';
	$.jgrid.extend({
		getColProp : function(colname){
			var ret ={}, $t = this[0];
			if ( !$t.grid ) { return false; }
			var cM = $t.p.colModel, i;
			for ( i=0;i<cM.length;i++ ) {
				if ( cM[i].name == colname ) {
					ret = cM[i];
					break;
				}
			}
			return ret;
		},
		setColProp : function(colname, obj){
		//do not set width will not work
			return this.each(function(){
				if ( this.grid ) {
					if ( obj ) {
						var cM = this.p.colModel, i;
						for ( i=0;i<cM.length;i++ ) {
							if ( cM[i].name == colname ) {
								$.extend(true, this.p.colModel[i],obj);
								break;
							}
						}
					}
				}
			});
		},
		sortGrid : function(colname,reload, sor){
			return this.each(function(){
				var $t=this,idx=-1,i;
				if ( !$t.grid ) { return;}
				if ( !colname ) { colname = $t.p.sortname; }
				for ( i=0;i<$t.p.colModel.length;i++ ) {
					if ( $t.p.colModel[i].index == colname || $t.p.colModel[i].name==colname ) {
						idx = i;
						break;
					}
				}
				if ( idx!=-1 ){
					var sort = $t.p.colModel[idx].sortable;
					if ( typeof sort !== 'boolean' ) { sort =  true; }
					if ( typeof reload !=='boolean' ) { reload = false; }
					if ( sort ) { $t.sortData('jqgh_'+$t.p.id+'_' + colname, idx, reload, sor); }
				}
			});
		},
		clearBeforeUnload : function () {
			return this.each(function(){
				var grid = this.grid;
				grid.emptyRows.call(this, true, true); // this work quick enough and reduce the size of memory leaks if we have someone

				//$(document).unbind("mouseup"); // TODO add namespace
				$(grid.hDiv).unbind('mousemove'); // TODO add namespace
				$(this).unbind();

				grid.dragEnd = null;
				grid.dragMove = null;
				grid.dragStart = null;
				grid.emptyRows = null;
				grid.populate = null;
				grid.populateVisible = null;
				grid.scrollGrid = null;
				grid.selectionPreserver = null;

				grid.bDiv = null;
				grid.cDiv = null;
				grid.hDiv = null;
				grid.cols = null;
				var i, l = grid.headers.length;
				for (i = 0; i < l; i++) {
					grid.headers[i].el = null;
				}

				this.formatCol = null;
				this.sortData = null;
				this.updatepager = null;
				this.refreshIndex = null;
				this.setHeadCheckBox = null;
				this.constructTr = null;
				this.formatter = null;
				this.addXmlData = null;
				this.addJSONData = null;
			});
		},
		GridDestroy : function () {
			return this.each(function(){
				if ( this.grid ) {
					if ( this.p.pager ) { // if not part of grid
						$(this.p.pager).remove();
					}
					try {
						$(this).jqGrid('clearBeforeUnload');
						$('#gbox_'+$.jgrid.jqID(this.id)).remove();
					} catch (_) {}
				}
			});
		},
		GridUnload : function(){
			return this.each(function(){
				if ( !this.grid ) {return;}
				var defgrid = {id: $(this).attr('id'),cl: $(this).attr('class')};
				if (this.p.pager) {
					$(this.p.pager).empty().removeClass('ui-state-default ui-jqgrid-pager corner-bottom');
				}
				var newtable = document.createElement('table');
				$(newtable).attr({id:defgrid.id});
				newtable.className = defgrid.cl;
				var gid = $.jgrid.jqID(this.id);
				$(newtable).removeClass('ui-jqgrid-btable');
				if( $(this.p.pager).parents('#gbox_'+gid).length === 1 ) {
					$(newtable).insertBefore('#gbox_'+gid).show();
					$(this.p.pager).insertBefore('#gbox_'+gid);
				} else {
					$(newtable).insertBefore('#gbox_'+gid).show();
				}
				$(this).jqGrid('clearBeforeUnload');
				$('#gbox_'+gid).remove();
			});
		},
		setGridState : function(state) {
			return this.each(function(){
				if ( !this.grid ) {return;}
				var $t = this;
				if(state == 'hidden'){
					$('.ui-jqgrid-bdiv, .ui-jqgrid-hdiv','#gview_'+$.jgrid.jqID($t.p.id)).slideUp('fast');
					if($t.p.pager) {$($t.p.pager).slideUp('fast');}
					if($t.p.toppager) {$($t.p.toppager).slideUp('fast');}
					if($t.p.toolbar[0]===true) {
						if( $t.p.toolbar[1]=='both') {
							$($t.grid.ubDiv).slideUp('fast');
						}
						$($t.grid.uDiv).slideUp('fast');
					}
					if($t.p.footerrow) { $('.ui-jqgrid-sdiv','#gbox_'+$.jgrid.jqID($t.p.id)).slideUp('fast'); }
					$('.ui-jqgrid-titlebar-close span',$t.grid.cDiv).removeClass('ui-icon-circle-triangle-n').addClass('ui-icon-circle-triangle-s');
					$t.p.gridstate = 'hidden';
				} else if(state=='visible') {
					$('.ui-jqgrid-hdiv, .ui-jqgrid-bdiv','#gview_'+$.jgrid.jqID($t.p.id)).slideDown('fast');
					if($t.p.pager) {$($t.p.pager).slideDown('fast');}
					if($t.p.toppager) {$($t.p.toppager).slideDown('fast');}
					if($t.p.toolbar[0]===true) {
						if( $t.p.toolbar[1]=='both') {
							$($t.grid.ubDiv).slideDown('fast');
						}
						$($t.grid.uDiv).slideDown('fast');
					}
					if($t.p.footerrow) { $('.ui-jqgrid-sdiv','#gbox_'+$.jgrid.jqID($t.p.id)).slideDown('fast'); }
					$('.ui-jqgrid-titlebar-close span',$t.grid.cDiv).removeClass('ui-icon-circle-triangle-s').addClass('ui-icon-circle-triangle-n');
					$t.p.gridstate = 'visible';
				}

			});
		},
		filterToolbar : function(p){
			p = $.extend({
				autosearch: true,
				searchOnEnter : true,
				beforeSearch: null,
				afterSearch: null,
				beforeClear: null,
				afterClear: null,
				searchurl : '',
				stringResult: false,
				groupOp: 'AND',
				defaultSearch : 'bw'
			},p  || {});
			return this.each(function(){
				var $t = this;
				if(this.ftoolbar) { return; }
				var triggerToolbar = function() {
					var sdata={}, j=0, v, nm, sopt={},so;
					$.each($t.p.colModel,function(){
						nm = this.index || this.name;
						so  = (this.searchoptions && this.searchoptions.sopt) ? this.searchoptions.sopt[0] : this.stype=='select'?  'eq' : p.defaultSearch;
						v = $('#gs_'+$.jgrid.jqID(this.name), (this.frozen===true && $t.p.frozenColumns === true) ?  $t.grid.fhDiv : $t.grid.hDiv).val();
						if(v) {
							sdata[nm] = v;
							sopt[nm] = so;
							j++;
						} else {
							try {
								delete $t.p.postData[nm];
							} catch (z) {}
						}
					});
					var sd =  j>0 ? true : false;
					if(p.stringResult === true || $t.p.datatype == 'local') {
						var ruleGroup = '{"groupOp":"' + p.groupOp + '","rules":[';
						var gi=0;
						$.each(sdata,function(i,n){
							if (gi > 0) {ruleGroup += ',';}
							ruleGroup += '{"field":"' + i + '",';
							ruleGroup += '"op":"' + sopt[i] + '",';
							n+='';
							ruleGroup += '"data":"' + n.replace(/\\/g,'\\\\').replace(/\"/g,'\\"') + '"}';
							gi++;
						});
						ruleGroup += ']}';
						$.extend($t.p.postData,{filters:ruleGroup});
						$.each(['searchField', 'searchString', 'searchOper'], function(i, n){
							if($t.p.postData.hasOwnProperty(n)) { delete $t.p.postData[n];}
						});
					} else {
						$.extend($t.p.postData,sdata);
					}
					var saveurl;
					if($t.p.searchurl) {
						saveurl = $t.p.url;
						$($t).jqGrid('setGridParam',{url:$t.p.searchurl});
					}
					var bsr = $($t).triggerHandler('jqGridToolbarBeforeSearch') === 'stop' ? true : false;
					if(!bsr && $.isFunction(p.beforeSearch)){bsr = p.beforeSearch.call($t);}
					if(!bsr) { $($t).jqGrid('setGridParam',{search:sd}).trigger('reloadGrid',[{page:1}]); }
					if(saveurl) {$($t).jqGrid('setGridParam',{url:saveurl});}
					$($t).triggerHandler('jqGridToolbarAfterSearch');
					if($.isFunction(p.afterSearch)){p.afterSearch.call($t);}
				};
				var clearToolbar = function(trigger){
					var sdata={}, j=0, nm;
					trigger = (typeof trigger !== 'boolean') ? true : trigger;
					$.each($t.p.colModel,function(){
						var v;
						if(this.searchoptions && this.searchoptions.defaultValue !== undefined) { v = this.searchoptions.defaultValue; }
						nm = this.index || this.name;
						switch (this.stype) {
						case 'select' :
							$('#gs_'+$.jgrid.jqID(this.name)+' option',(this.frozen===true && $t.p.frozenColumns === true) ?  $t.grid.fhDiv : $t.grid.hDiv).each(function (i){
								if(i===0) { this.selected = true; }
								if ($(this).val() == v) {
									this.selected = true;
									return false;
								}
							});
							if ( v !== undefined ) {
								// post the key and not the text
								sdata[nm] = v;
								j++;
							} else {
								try {
									delete $t.p.postData[nm];
								} catch(e) {}
							}
							break;
						case 'text':
							$('#gs_'+$.jgrid.jqID(this.name),(this.frozen===true && $t.p.frozenColumns === true) ?  $t.grid.fhDiv : $t.grid.hDiv).val(v);
							if(v !== undefined) {
								sdata[nm] = v;
								j++;
							} else {
								try {
									delete $t.p.postData[nm];
								} catch (y){}
							}
							break;
						}
					});
					var sd =  j>0 ? true : false;
					if(p.stringResult === true || $t.p.datatype == 'local') {
						var ruleGroup = '{"groupOp":"' + p.groupOp + '","rules":[';
						var gi=0;
						$.each(sdata,function(i,n){
							if (gi > 0) {ruleGroup += ',';}
							ruleGroup += '{"field":"' + i + '",';
							ruleGroup += '"op":"' + 'eq' + '",';
							n+='';
							ruleGroup += '"data":"' + n.replace(/\\/g,'\\\\').replace(/\"/g,'\\"') + '"}';
							gi++;
						});
						ruleGroup += ']}';
						$.extend($t.p.postData,{filters:ruleGroup});
						$.each(['searchField', 'searchString', 'searchOper'], function(i, n){
							if($t.p.postData.hasOwnProperty(n)) { delete $t.p.postData[n];}
						});
					} else {
						$.extend($t.p.postData,sdata);
					}
					var saveurl;
					if($t.p.searchurl) {
						saveurl = $t.p.url;
						$($t).jqGrid('setGridParam',{url:$t.p.searchurl});
					}
					var bcv = $($t).triggerHandler('jqGridToolbarBeforeClear') === 'stop' ? true : false;
					if(!bcv && $.isFunction(p.beforeClear)){bcv = p.beforeClear.call($t);}
					if(!bcv) {
						if(trigger) {
							$($t).jqGrid('setGridParam',{search:sd}).trigger('reloadGrid',[{page:1}]);
						}
					}
					if(saveurl) {$($t).jqGrid('setGridParam',{url:saveurl});}
					$($t).triggerHandler('jqGridToolbarAfterClear');
					if($.isFunction(p.afterClear)){p.afterClear();}
				};
				var toggleToolbar = function(){
					var trow = $('tr.ui-search-toolbar',$t.grid.hDiv),
						trow2 = $t.p.frozenColumns === true ?  $('tr.ui-search-toolbar',$t.grid.fhDiv) : false;
					if(trow.css('display')=='none') {
						trow.show();
						if(trow2) {
							trow2.show();
						}
					} else {
						trow.hide();
						if(trow2) {
							trow2.hide();
						}
					}
				};
				// create the row
				var tr = $('<tr class=\'ui-search-toolbar\' role=\'rowheader\'></tr>');
				var timeoutHnd;
				$.each($t.p.colModel,function(){
					var cm=this, thd , th, soptions,surl,self;
					th = $('<th role=\'columnheader\' class=\'ui-state-default ui-th-column ui-th-'+$t.p.direction+'\'></th>');
					thd = $('<div style=\'position:relative;height:100%;padding-right:0.3em;\'></div>');
					if(this.hidden===true) { $(th).css('display','none');}
					this.search = this.search === false ? false : true;
					if(this.stype === undefined) {this.stype='text';}
					soptions = $.extend({},this.searchoptions || {});
					if(this.search){
						switch (this.stype)
						{
						case 'select':
							surl = this.surl || soptions.dataUrl;
							if(surl) {
							// data returned should have already constructed html select
							// primitive jQuery load
								self = thd;
								$.ajax($.extend({
									url: surl,
									dataType: 'html',
									success: function(res) {
										if(soptions.buildSelect !== undefined) {
											var d = soptions.buildSelect(res);
											if (d) { $(self).append(d); }
										} else {
											$(self).append(res);
										}
										if(soptions.defaultValue !== undefined) { $('select',self).val(soptions.defaultValue); }
										$('select',self).attr({name:cm.index || cm.name, id: 'gs_'+cm.name});
										if(soptions.attr) {$('select',self).attr(soptions.attr);}
										$('select',self).css({width: '100%'});
										// preserve autoserch
										$.jgrid.bindEv( $('select',self)[0], soptions, $t);
										if(p.autosearch===true){
											$('select',self).change(function(){
												triggerToolbar();
												return false;
											});
										}
										res=null;
									}
								}, $.jgrid.ajaxOptions, $t.p.ajaxSelectOptions || {} ));
							} else {
								var oSv, sep, delim;
								if(cm.searchoptions) {
									oSv = cm.searchoptions.value === undefined ? '' : cm.searchoptions.value;
									sep = cm.searchoptions.separator === undefined ? ':' : cm.searchoptions.separator;
									delim = cm.searchoptions.delimiter === undefined ? ';' : cm.searchoptions.delimiter;
								} else if(cm.editoptions) {
									oSv = cm.editoptions.value === undefined ? '' : cm.editoptions.value;
									sep = cm.editoptions.separator === undefined ? ':' : cm.editoptions.separator;
									delim = cm.editoptions.delimiter === undefined ? ';' : cm.editoptions.delimiter;
								}
								if (oSv) {
									var elem = document.createElement('select');
									elem.style.width = '100%';
									$(elem).attr({name:cm.index || cm.name, id: 'gs_'+cm.name});
									var so, sv, ov, key, k;
									if(typeof oSv === 'string') {
										so = oSv.split(delim);
										for(k=0; k<so.length;k++){
											sv = so[k].split(sep);
											ov = document.createElement('option');
											ov.value = sv[0]; ov.innerHTML = sv[1];
											elem.appendChild(ov);
										}
									} else if(typeof oSv === 'object' ) {
										for (key in oSv) {
											if(oSv.hasOwnProperty(key)) {
												ov = document.createElement('option');
												ov.value = key; ov.innerHTML = oSv[key];
												elem.appendChild(ov);
											}
										}
									}
									if(soptions.defaultValue !== undefined) { $(elem).val(soptions.defaultValue); }
									if(soptions.attr) {$(elem).attr(soptions.attr);}
									$.jgrid.bindEv( elem , soptions, $t);
									$(thd).append(elem);
									if(p.autosearch===true){
										$(elem).change(function(){
											triggerToolbar();
											return false;
										});
									}
								}
							}
							break;
						case 'text':
							var df = soptions.defaultValue !== undefined ? soptions.defaultValue: '';
							$(thd).append('<input type=\'text\' style=\'width:95%;padding:0px;\' name=\''+(cm.index || cm.name)+'\' id=\'gs_'+cm.name+'\' value=\''+df+'\'/>');
							if(soptions.attr) {$('input',thd).attr(soptions.attr);}
							$.jgrid.bindEv( $('input',thd)[0], soptions, $t);
							if(p.autosearch===true){
								if(p.searchOnEnter) {
									$('input',thd).keypress(function(e){
										var key = e.charCode || e.keyCode || 0;
										if(key == 13){
											triggerToolbar();
											return false;
										}
										return this;
									});
								} else {
									$('input',thd).keydown(function(e){
										var key = e.which;
										switch (key) {
										case 13:
											return false;
										case 9 :
										case 16:
										case 37:
										case 38:
										case 39:
										case 40:
										case 27:
											break;
										default :
											if(timeoutHnd) { clearTimeout(timeoutHnd); }
											timeoutHnd = setTimeout(function(){triggerToolbar();},500);
										}
									});
								}
							}
							break;
						}
					}
					$(th).append(thd);
					$(tr).append(th);
				});
				$('table thead',$t.grid.hDiv).append(tr);
				this.ftoolbar = true;
				this.triggerToolbar = triggerToolbar;
				this.clearToolbar = clearToolbar;
				this.toggleToolbar = toggleToolbar;
			});
		},
		destroyFilterToolbar: function () {
			return this.each(function () {
				if (!this.ftoolbar) {
					return;
				}
				this.triggerToolbar = null;
				this.clearToolbar = null;
				this.toggleToolbar = null;
				this.ftoolbar = false;
				$(this.grid.hDiv).find('table thead tr.ui-search-toolbar').remove();
			});
		},
		destroyGroupHeader : function(nullHeader)
		{
			if(nullHeader === undefined) {
				nullHeader = true;
			}
			return this.each(function()
			{
				var $t = this, $tr, i, l, headers, $th, $resizing, grid = $t.grid,
					thead = $('table.ui-jqgrid-htable thead', grid.hDiv), cm = $t.p.colModel, hc;
				if(!grid) { return; }

				$(this).unbind('.setGroupHeaders');
				$tr = $('<tr>', {role: 'rowheader'}).addClass('ui-jqgrid-labels');
				headers = grid.headers;
				for (i = 0, l = headers.length; i < l; i++) {
					hc = cm[i].hidden ? 'none' : '';
					$th = $(headers[i].el)
						.width(headers[i].width)
						.css('display',hc);
					try {
						$th.removeAttr('rowSpan');
					} catch (rs) {
					//IE 6/7
						$th.attr('rowSpan',1);
					}
					$tr.append($th);
					$resizing = $th.children('span.ui-jqgrid-resize');
					if ($resizing.length>0) {// resizable column
						$resizing[0].style.height = '';
					}
					$th.children('div')[0].style.top = '';
				}
				$(thead).children('tr.ui-jqgrid-labels').remove();
				$(thead).prepend($tr);

				if(nullHeader === true) {
					$($t).jqGrid('setGridParam',{ 'groupHeader': null});
				}
			});
		},
		setGroupHeaders : function ( o ) {
			o = $.extend({
				useColSpanStyle :  false,
				groupHeaders: []
			},o  || {});
			return this.each(function(){
				this.p.groupHeader = o;
				var ts = this,
					i, cmi, skip = 0, $tr, $colHeader, th, $th, thStyle,
					iCol,
					cghi,
					//startColumnName,
					numberOfColumns,
					titleText,
					cVisibleColumns,
					colModel = ts.p.colModel,
					cml = colModel.length,
					ths = ts.grid.headers,
					$htable = $('table.ui-jqgrid-htable', ts.grid.hDiv),
					$trLabels = $htable.children('thead').children('tr.ui-jqgrid-labels:last').addClass('jqg-second-row-header'),
					$thead = $htable.children('thead'),
					$theadInTable,
					$firstHeaderRow = $htable.find('.jqg-first-row-header');
				if($firstHeaderRow[0] === undefined) {
					$firstHeaderRow = $('<tr>', {role: 'row', 'aria-hidden': 'true'}).addClass('jqg-first-row-header').css('height', 'auto');
				} else {
					$firstHeaderRow.empty();
				}
				var $firstRow,
					inColumnHeader = function (text, columnHeaders) {
						var length = columnHeaders.length, i;
						for (i = 0; i < length; i++) {
							if (columnHeaders[i].startColumnName === text) {
								return i;
							}
						}
						return -1;
					};

				$(ts).prepend($thead);
				$tr = $('<tr>', {role: 'rowheader'}).addClass('ui-jqgrid-labels jqg-third-row-header');
				for (i = 0; i < cml; i++) {
					th = ths[i].el;
					$th = $(th);
					cmi = colModel[i];
					// build the next cell for the first header row
					thStyle = { height: '0px', width: ths[i].width + 'px', display: (cmi.hidden ? 'none' : '')};
					$('<th>', {role: 'gridcell'}).css(thStyle).addClass('ui-first-th-'+ts.p.direction).appendTo($firstHeaderRow);

					th.style.width = ''; // remove unneeded style
					iCol = inColumnHeader(cmi.name, o.groupHeaders);
					if (iCol >= 0) {
						cghi = o.groupHeaders[iCol];
						numberOfColumns = cghi.numberOfColumns;
						titleText = cghi.titleText;

						// caclulate the number of visible columns from the next numberOfColumns columns
						for (cVisibleColumns = 0, iCol = 0; iCol < numberOfColumns && (i + iCol < cml); iCol++) {
							if (!colModel[i + iCol].hidden) {
								cVisibleColumns++;
							}
						}

						// The next numberOfColumns headers will be moved in the next row
						// in the current row will be placed the new column header with the titleText.
						// The text will be over the cVisibleColumns columns
						$colHeader = $('<th>').attr({role: 'columnheader'})
							.addClass('ui-state-default ui-th-column-header ui-th-'+ts.p.direction)
							.css({'height':'22px', 'border-top': '0px none'})
							.html(titleText);
						if(cVisibleColumns > 0) {
							$colHeader.attr('colspan', String(cVisibleColumns));
						}
						if (ts.p.headertitles) {
							$colHeader.attr('title', $colHeader.text());
						}
						// hide if not a visible cols
						if( cVisibleColumns === 0) {
							$colHeader.hide();
						}

						$th.before($colHeader); // insert new column header before the current
						$tr.append(th);         // move the current header in the next row

						// set the coumter of headers which will be moved in the next row
						skip = numberOfColumns - 1;
					} else {
						if (skip === 0) {
							if (o.useColSpanStyle) {
							// expand the header height to two rows
								$th.attr('rowspan', '2');
							} else {
								$('<th>', {role: 'columnheader'})
									.addClass('ui-state-default ui-th-column-header ui-th-'+ts.p.direction)
									.css({'display': cmi.hidden ? 'none' : '', 'border-top': '0px none'})
									.insertBefore($th);
								$tr.append(th);
							}
						} else {
						// move the header to the next row
						//$th.css({"padding-top": "2px", height: "19px"});
							$tr.append(th);
							skip--;
						}
					}
				}
				$theadInTable = $(ts).children('thead');
				$theadInTable.prepend($firstHeaderRow);
				$tr.insertAfter($trLabels);
				$htable.append($theadInTable);

				if (o.useColSpanStyle) {
				// Increase the height of resizing span of visible headers
					$htable.find('span.ui-jqgrid-resize').each(function () {
						var $parent = $(this).parent();
						if ($parent.is(':visible')) {
							this.style.cssText = 'height: ' + $parent.height() + 'px !important; cursor: col-resize;';
						}
					});

					// Set position of the sortable div (the main lable)
					// with the column header text to the middle of the cell.
					// One should not do this for hidden headers.
					$htable.find('div.ui-jqgrid-sortable').each(function () {
						var $ts = $(this), $parent = $ts.parent();
						if ($parent.is(':visible') && $parent.is(':has(span.ui-jqgrid-resize)')) {
							$ts.css('top', ($parent.height() - $ts.outerHeight()) / 2 + 'px');
						}
					});
				}

				$firstRow = $theadInTable.find('tr.jqg-first-row-header');
				$(ts).bind('jqGridResizeStop.setGroupHeaders', function (e, nw, idx) {
					$firstRow.find('th').eq(idx).width(nw);
				});
			});
		},
		setFrozenColumns : function () {
			return this.each(function() {
				if ( !this.grid ) {return;}
				var $t = this, cm = $t.p.colModel,i=0, len = cm.length, maxfrozen = -1, frozen= false;
				// TODO treeGrid and grouping  Support
				if($t.p.subGrid === true || $t.p.treeGrid === true || $t.p.cellEdit === true || $t.p.sortable || $t.p.scroll || $t.p.grouping )
				{
					return;
				}
				if($t.p.rownumbers) { i++; }
				if($t.p.multiselect) { i++; }

				// get the max index of frozen col
				while(i<len)
				{
				// from left, no breaking frozen
					if(cm[i].frozen === true)
					{
						frozen = true;
						maxfrozen = i;
					} else {
						break;
					}
					i++;
				}
				if( maxfrozen>=0 && frozen) {
					var top = $t.p.caption ? $($t.grid.cDiv).outerHeight() : 0,
						hth = $('.ui-jqgrid-htable','#gview_'+$.jgrid.jqID($t.p.id)).height();
					//headers
					if($t.p.toppager) {
						top = top + $($t.grid.topDiv).outerHeight();
					}
					if($t.p.toolbar[0] === true) {
						if($t.p.toolbar[1] != 'bottom') {
							top = top + $($t.grid.uDiv).outerHeight();
						}
					}
					$t.grid.fhDiv = $('<div style="position:absolute;left:0px;top:'+top+'px;height:'+hth+'px;" class="frozen-div ui-state-default ui-jqgrid-hdiv"></div>');
					$t.grid.fbDiv = $('<div style="position:absolute;left:0px;top:'+(parseInt(top,10)+parseInt(hth,10) + 1)+'px;overflow-y:hidden" class="frozen-bdiv ui-jqgrid-bdiv"></div>');
					$('#gview_'+$.jgrid.jqID($t.p.id)).append($t.grid.fhDiv);
					var htbl = $('.ui-jqgrid-htable','#gview_'+$.jgrid.jqID($t.p.id)).clone(true);
					// groupheader support - only if useColSpanstyle is false
					if($t.p.groupHeader) {
						$('tr.jqg-first-row-header, tr.jqg-third-row-header', htbl).each(function(){
							$('th:gt('+maxfrozen+')',this).remove();
						});
						var swapfroz = -1, fdel = -1;
						$('tr.jqg-second-row-header th', htbl).each(function(){
							var cs= parseInt($(this).attr('colspan'),10);
							if(cs) {
								swapfroz = swapfroz+cs;
								fdel++;
							}
							if(swapfroz === maxfrozen) {
								return false;
							}
						});
						if(swapfroz !== maxfrozen) {
							fdel = maxfrozen;
						}
						$('tr.jqg-second-row-header', htbl).each(function(){
							$('th:gt('+fdel+')',this).remove();
						});
					} else {
						$('tr',htbl).each(function(){
							$('th:gt('+maxfrozen+')',this).remove();
						});
					}
					$(htbl).width(1);
					// resizing stuff
					$($t.grid.fhDiv).append(htbl)
						.mousemove(function (e) {
							if($t.grid.resizing){ $t.grid.dragMove(e);return false; }
						});
					$($t).bind('jqGridResizeStop.setFrozenColumns', function (e, w, index) {
						var rhth = $('.ui-jqgrid-htable',$t.grid.fhDiv);
						$('th:eq('+index+')',rhth).width( w );
						var btd = $('.ui-jqgrid-btable',$t.grid.fbDiv);
						$('tr:first td:eq('+index+')',btd).width( w );
					});
					// sorting stuff
					$($t).bind('jqGridOnSortCol.setFrozenColumns', function (index, idxcol) {

						var previousSelectedTh = $('tr.ui-jqgrid-labels:last th:eq('+$t.p.lastsort+')',$t.grid.fhDiv), newSelectedTh = $('tr.ui-jqgrid-labels:last th:eq('+idxcol+')',$t.grid.fhDiv);

						$('span.ui-grid-ico-sort',previousSelectedTh).addClass('ui-state-disabled');
						$(previousSelectedTh).attr('aria-selected','false');
						$('span.ui-icon-'+$t.p.sortorder,newSelectedTh).removeClass('ui-state-disabled');
						$(newSelectedTh).attr('aria-selected','true');
						if(!$t.p.viewsortcols[0]) {
							if($t.p.lastsort != idxcol) {
								$('span.s-ico',previousSelectedTh).hide();
								$('span.s-ico',newSelectedTh).show();
							}
						}
					});

					// data stuff
					//TODO support for setRowData
					$('#gview_'+$.jgrid.jqID($t.p.id)).append($t.grid.fbDiv);
					$($t.grid.bDiv).scroll(function () {
						$($t.grid.fbDiv).scrollTop($(this).scrollTop());
					});
					if($t.p.hoverrows === true) {
						$('#'+$.jgrid.jqID($t.p.id)).unbind('mouseover').unbind('mouseout');
					}
					$($t).bind('jqGridAfterGridComplete.setFrozenColumns', function () {
						$('#'+$.jgrid.jqID($t.p.id)+'_frozen').remove();
						$($t.grid.fbDiv).height($($t.grid.bDiv).height()-16);
						var btbl = $('#'+$.jgrid.jqID($t.p.id)).clone(true);
						$('tr',btbl).each(function(){
							$('td:gt('+maxfrozen+')',this).remove();
						});

						$(btbl).width(1).attr('id',$t.p.id+'_frozen');
						$($t.grid.fbDiv).append(btbl);
						if($t.p.hoverrows === true) {
							$('tr.jqgrow', btbl).hover(
								function(){ $(this).addClass('ui-state-hover'); $('#'+$.jgrid.jqID(this.id), '#'+$.jgrid.jqID($t.p.id)).addClass('ui-state-hover'); },
								function(){ $(this).removeClass('ui-state-hover'); $('#'+$.jgrid.jqID(this.id), '#'+$.jgrid.jqID($t.p.id)).removeClass('ui-state-hover'); }
							);
							$('tr.jqgrow', '#'+$.jgrid.jqID($t.p.id)).hover(
								function(){ $(this).addClass('ui-state-hover'); $('#'+$.jgrid.jqID(this.id), '#'+$.jgrid.jqID($t.p.id)+'_frozen').addClass('ui-state-hover');},
								function(){ $(this).removeClass('ui-state-hover'); $('#'+$.jgrid.jqID(this.id), '#'+$.jgrid.jqID($t.p.id)+'_frozen').removeClass('ui-state-hover'); }
							);
						}
						btbl=null;
					});
					$t.p.frozenColumns = true;
				}
			});
		},
		destroyFrozenColumns :  function() {
			return this.each(function() {
				if ( !this.grid ) {return;}
				if(this.p.frozenColumns === true) {
					var $t = this;
					$($t.grid.fhDiv).remove();
					$($t.grid.fbDiv).remove();
					$t.grid.fhDiv = null; $t.grid.fbDiv=null;
					$(this).unbind('.setFrozenColumns');
					if($t.p.hoverrows === true) {
						var ptr;
						$('#'+$.jgrid.jqID($t.p.id)).bind('mouseover',function(e) {
							ptr = $(e.target).closest('tr.jqgrow');
							if($(ptr).attr('class') !== 'ui-subgrid') {
								$(ptr).addClass('ui-state-hover');
							}
						}).bind('mouseout',function(e) {
							ptr = $(e.target).closest('tr.jqgrow');
							$(ptr).removeClass('ui-state-hover');
						});
					}
					this.p.frozenColumns = false;
				}
			});
		}
	});
})(jQuery);
/*
 * jqModal - Minimalist Modaling with jQuery
 *   (http://dev.iceburg.net/jquery/jqmodal/)
 *
 * Copyright (c) 2007,2008 Brice Burgess <bhb@iceburg.net>
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * $Version: 07/06/2008 +r13
 */
(function($) {
	$.fn.jqm=function(o){
		var p={
			overlay: 50,
			closeoverlay : true,
			overlayClass: 'jqmOverlay',
			closeClass: 'jqmClose',
			trigger: '.jqModal',
			ajax: F,
			ajaxText: '',
			target: F,
			modal: F,
			toTop: F,
			onShow: F,
			onHide: F,
			onLoad: F
		};
		return this.each(function(){if(this._jqm)return H[this._jqm].c=$.extend({},H[this._jqm].c,o);s++;this._jqm=s;
			H[s]={c:$.extend(p,$.jqm.params,o),a:F,w:$(this).addClass('jqmID'+s),s:s};
			if(p.trigger)$(this).jqmAddTrigger(p.trigger);
		});};

	$.fn.jqmAddClose=function(e){return hs(this,e,'jqmHide');};
	$.fn.jqmAddTrigger=function(e){return hs(this,e,'jqmShow');};
	$.fn.jqmShow=function(t){return this.each(function(){$.jqm.open(this._jqm,t);});};
	$.fn.jqmHide=function(t){return this.each(function(){$.jqm.close(this._jqm,t);});};

	$.jqm = {
		hash:{},
		open:function(s,t){var h=H[s],c=h.c,cc='.'+c.closeClass,z=(parseInt(h.w.css('z-index')));z=(z>0)?z:3000;var o=$('<div></div>').css({height:'100%',width:'100%',position:'fixed',left:0,top:0,'z-index':z-1,opacity:c.overlay/100});if(h.a)return F;h.t=t;h.a=true;h.w.css('z-index',z);
			if(c.modal) {if(!A[0])setTimeout(function(){L('bind');},1);A.push(s);}
			else if(c.overlay > 0) {if(c.closeoverlay) h.w.jqmAddClose(o);}
			else o=F;

			h.o=(o)?o.addClass(c.overlayClass).prependTo('body'):F;

			if(c.ajax) {var r=c.target||h.w,u=c.ajax;r=(typeof r == 'string')?$(r,h.w):$(r);u=(u.substr(0,1) == '@')?$(t).attr(u.substring(1)):u;
				r.html(c.ajaxText).load(u,function(){if(c.onLoad)c.onLoad.call(this,h);if(cc)h.w.jqmAddClose($(cc,h.w));e(h);});}
			else if(cc)h.w.jqmAddClose($(cc,h.w));

			if(c.toTop&&h.o)h.w.before('<span id="jqmP'+h.w[0]._jqm+'"></span>').insertAfter(h.o);
			(c.onShow)?c.onShow(h):h.w.show();e(h);return F;
		},
		close:function(s){var h=H[s];if(!h.a)return F;h.a=F;
			if(A[0]){A.pop();if(!A[0])L('unbind');}
			if(h.c.toTop&&h.o)$('#jqmP'+h.w[0]._jqm).after(h.w).remove();
			if(h.c.onHide)h.c.onHide(h);else{h.w.hide();if(h.o)h.o.remove();} return F;
		},
		params:{}};
	var s=0,H=$.jqm.hash,A=[],F=false,
		e=function(h){f(h);},
		f=function(h){try{$(':input:visible',h.w)[0].focus();}catch(_){}},
		L=function(t){$(document)[t]('keypress',m)[t]('keydown',m)[t]('mousedown',m);},
		m=function(e){var h=H[A[A.length-1]],r=(!$(e.target).parents('.jqmID'+h.s)[0]);if(r)f(h);return !r;},
		hs=function(w,t,c){return w.each(function(){var s=this._jqm;$(t).each(function() {
			if(!this[c]){this[c]=[];$(this).click(function(){for(var i in {jqmShow:1,jqmHide:1})for(var s in this[i])if(H[this[i][s]])H[this[i][s]].w[i](this);return F;});}this[c].push(s);});});};
})(jQuery);/*
 * jqDnR - Minimalistic Drag'n'Resize for jQuery.
 *
 * Copyright (c) 2007 Brice Burgess <bhb@iceburg.net>, http://www.iceburg.net
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * $Version: 2007.08.19 +r2
 */

(function($){
	$.fn.jqDrag=function(h){return i(this,h,'d');};
	$.fn.jqResize=function(h,ar){return i(this,h,'r',ar);};
	$.jqDnR={
		dnr:{},
		e:0,
		drag:function(v){
			if(M.k == 'd'){E.css({left:M.X+v.pageX-M.pX,top:M.Y+v.pageY-M.pY});}
			else {
				E.css({width:Math.max(v.pageX-M.pX+M.W,0),height:Math.max(v.pageY-M.pY+M.H,0)});
				if(M1){E1.css({width:Math.max(v.pageX-M1.pX+M1.W,0),height:Math.max(v.pageY-M1.pY+M1.H,0)});}
			}
			return false;
		},
		stop:function(){
		//E.css('opacity',M.o);
			$(document).unbind('mousemove',J.drag).unbind('mouseup',J.stop);
		}
	};
	var J=$.jqDnR,M=J.dnr,E=J.e,E1,M1,
		i=function(e,h,k,aR){
			return e.each(function(){
				h=(h)?$(h,e):e;
				h.bind('mousedown',{e:e,k:k},function(v){
					var d=v.data,p={};E=d.e;E1 = aR ? $(aR) : false;
					// attempt utilization of dimensions plugin to fix IE issues
					if(E.css('position') != 'relative'){try{E.position(p);}catch(e){}}
					M={
						X:p.left||f('left')||0,
						Y:p.top||f('top')||0,
						W:f('width')||E[0].scrollWidth||0,
						H:f('height')||E[0].scrollHeight||0,
						pX:v.pageX,
						pY:v.pageY,
						k:d.k
						//o:E.css('opacity')
					};
					// also resize
					if(E1 && d.k != 'd'){
						M1={
							X:p.left||f1('left')||0,
							Y:p.top||f1('top')||0,
							W:E1[0].offsetWidth||f1('width')||0,
							H:E1[0].offsetHeight||f1('height')||0,
							pX:v.pageX,
							pY:v.pageY,
							k:d.k
						};
					} else {M1 = false;}
					//E.css({opacity:0.8});
					if($('input.hasDatepicker',E[0])[0]) {
						try {$('input.hasDatepicker',E[0]).datepicker('hide');}catch (dpe){}
					}
					$(document).mousemove($.jqDnR.drag).mouseup($.jqDnR.stop);
					return false;
				});
			});
		},
		f=function(k){return parseInt(E.css(k),10)||false;},
		f1=function(k){return parseInt(E1.css(k),10)||false;};
})(jQuery);/*
	The below work is licensed under Creative Commons GNU LGPL License.

	Original work:

	License:     http://creativecommons.org/licenses/LGPL/2.1/
	Author:      Stefan Goessner/2006
	Web:         http://goessner.net/

	Modifications made:

	Version:     0.9-p5
	Description: Restructured code, JSLint validated (no strict whitespaces),
	             added handling of empty arrays, empty strings, and int/floats values.
	Author:      Michael Schøler/2008-01-29
	Web:         http://michael.hinnerup.net/blog/2008/01/26/converting-json-to-xml-and-xml-to-json/

	Description: json2xml added support to convert functions as CDATA
	             so it will be easy to write characters that cause some problems when convert
	Author:      Tony Tomov
*/

/*global alert */
var xmlJsonClass = {
	// Param "xml": Element or document DOM node.
	// Param "tab": Tab or indent string for pretty output formatting omit or use empty string "" to supress.
	// Returns:     JSON string
	xml2json: function(xml, tab) {
		if (xml.nodeType === 9) {
			// document node
			xml = xml.documentElement;
		}
		var nws = this.removeWhite(xml);
		var obj = this.toObj(nws);
		var json = this.toJson(obj, xml.nodeName, '\t');
		return '{\n' + tab + (tab ? json.replace(/\t/g, tab) : json.replace(/\t|\n/g, '')) + '\n}';
	},

	// Param "o":   JavaScript object
	// Param "tab": tab or indent string for pretty output formatting omit or use empty string "" to supress.
	// Returns:     XML string
	json2xml: function(o, tab) {
		var toXml = function(v, name, ind) {
			var xml = '';
			var i, n;
			if (v instanceof Array) {
				if (v.length === 0) {
					xml += ind + '<'+name+'>__EMPTY_ARRAY_</'+name+'>\n';
				}
				else {
					for (i = 0, n = v.length; i < n; i += 1) {
						var sXml = ind + toXml(v[i], name, ind+'\t') + '\n';
						xml += sXml;
					}
				}
			}
			else if (typeof(v) === 'object') {
				var hasChild = false;
				xml += ind + '<' + name;
				var m;
				for (m in v) if (v.hasOwnProperty(m)) {
					if (m.charAt(0) === '@') {
						xml += ' ' + m.substr(1) + '="' + v[m].toString() + '"';
					}
					else {
						hasChild = true;
					}
				}
				xml += hasChild ? '>' : '/>';
				if (hasChild) {
					for (m in v) if (v.hasOwnProperty(m)) {
						if (m === '#text') {
							xml += v[m];
						}
						else if (m === '#cdata') {
							xml += '<![CDATA[' + v[m] + ']]>';
						}
						else if (m.charAt(0) !== '@') {
							xml += toXml(v[m], m, ind+'\t');
						}
					}
					xml += (xml.charAt(xml.length - 1) === '\n' ? ind : '') + '</' + name + '>';
				}
			}
			else if (typeof(v) === 'function') {
				xml += ind + '<' + name + '>' + '<![CDATA[' + v + ']]>' + '</' + name + '>';
			}
			else {
				if (v === undefined ) { v = ''; }
				if (v.toString() === '""' || v.toString().length === 0) {
					xml += ind + '<' + name + '>__EMPTY_STRING_</' + name + '>';
				}
				else {
					xml += ind + '<' + name + '>' + v.toString() + '</' + name + '>';
				}
			}
			return xml;
		};
		var xml = '';
		var m;
		for (m in o) if (o.hasOwnProperty(m)) {
			xml += toXml(o[m], m, '');
		}
		return tab ? xml.replace(/\t/g, tab) : xml.replace(/\t|\n/g, '');
	},
	// Internal methods
	toObj: function(xml) {
		var o = {};
		var FuncTest = /function/i;
		if (xml.nodeType === 1) {
			// element node ..
			if (xml.attributes.length) {
				// element with attributes ..
				var i;
				for (i = 0; i < xml.attributes.length; i += 1) {
					o['@' + xml.attributes[i].nodeName] = (xml.attributes[i].nodeValue || '').toString();
				}
			}
			if (xml.firstChild) {
				// element has child nodes ..
				var textChild = 0, cdataChild = 0, hasElementChild = false;
				var n;
				for (n = xml.firstChild; n; n = n.nextSibling) {
					if (n.nodeType === 1) {
						hasElementChild = true;
					}
					else if (n.nodeType === 3 && n.nodeValue.match(/[^ \f\n\r\t\v]/)) {
						// non-whitespace text
						textChild += 1;
					}
					else if (n.nodeType === 4) {
						// cdata section node
						cdataChild += 1;
					}
				}
				if (hasElementChild) {
					if (textChild < 2 && cdataChild < 2) {
						// structured element with evtl. a single text or/and cdata node ..
						this.removeWhite(xml);
						for (n = xml.firstChild; n; n = n.nextSibling) {
							if (n.nodeType === 3) {
								// text node
								o['#text'] = this.escape(n.nodeValue);
							}
							else if (n.nodeType === 4) {
								// cdata node
								if (FuncTest.test(n.nodeValue)) {
									o[n.nodeName] = [o[n.nodeName], n.nodeValue];
								} else {
									o['#cdata'] = this.escape(n.nodeValue);
								}
							}
							else if (o[n.nodeName]) {
								// multiple occurence of element ..
								if (o[n.nodeName] instanceof Array) {
									o[n.nodeName][o[n.nodeName].length] = this.toObj(n);
								}
								else {
									o[n.nodeName] = [o[n.nodeName], this.toObj(n)];
								}
							}
							else {
								// first occurence of element ..
								o[n.nodeName] = this.toObj(n);
							}
						}
					}
					else {
						// mixed content
						if (!xml.attributes.length) {
							o = this.escape(this.innerXml(xml));
						}
						else {
							o['#text'] = this.escape(this.innerXml(xml));
						}
					}
				}
				else if (textChild) {
					// pure text
					if (!xml.attributes.length) {
						o = this.escape(this.innerXml(xml));
						if (o === '__EMPTY_ARRAY_') {
							o = '[]';
						} else if (o === '__EMPTY_STRING_') {
							o = '';
						}
					}
					else {
						o['#text'] = this.escape(this.innerXml(xml));
					}
				}
				else if (cdataChild) {
					// cdata
					if (cdataChild > 1) {
						o = this.escape(this.innerXml(xml));
					}
					else {
						for (n = xml.firstChild; n; n = n.nextSibling) {
							if(FuncTest.test(xml.firstChild.nodeValue)) {
								o = xml.firstChild.nodeValue;
								break;
							} else {
								o['#cdata'] = this.escape(n.nodeValue);
							}
						}
					}
				}
			}
			if (!xml.attributes.length && !xml.firstChild) {
				o = null;
			}
		}
		else if (xml.nodeType === 9) {
			// document.node
			o = this.toObj(xml.documentElement);
		}
		else {
			alert('unhandled node type: ' + xml.nodeType);
		}
		return o;
	},
	toJson: function(o, name, ind, wellform) {
		if(wellform === undefined) wellform = true;
		var json = name ? ('"' + name + '"') : '', tab = '\t', newline = '\n';
		if(!wellform) {
			tab= ''; newline= '';
		}

		if (o === '[]') {
			json += (name ? ':[]' : '[]');
		}
		else if (o instanceof Array) {
			var n, i, ar=[];
			for (i = 0, n = o.length; i < n; i += 1) {
				ar[i] = this.toJson(o[i], '', ind + tab, wellform);
			}
			json += (name ? ':[' : '[') + (ar.length > 1 ? (newline + ind + tab + ar.join(','+newline + ind + tab) + newline + ind) : ar.join('')) + ']';
		}
		else if (o === null) {
			json += (name && ':') + 'null';
		}
		else if (typeof(o) === 'object') {
			var arr = [], m;
			for (m in o) {
				if (o.hasOwnProperty(m)) {
					arr[arr.length] = this.toJson(o[m], m, ind + tab, wellform);
				}
			}
			json += (name ? ':{' : '{') + (arr.length > 1 ? (newline + ind + tab + arr.join(','+newline + ind + tab) + newline + ind) : arr.join('')) + '}';
		}
		else if (typeof(o) === 'string') {
			/*
			var objRegExp  = /(^-?\d+\.?\d*$)/;
			var FuncTest = /function/i;
			var os = o.toString();
			if (objRegExp.test(os) || FuncTest.test(os) || os==="false" || os==="true") {
				// int or float
				json += (name && ":")  + "\"" +os + "\"";
			}
			else {
			*/
			json += (name && ':') + '"' + o.replace(/\\/g,'\\\\').replace(/\"/g,'\\"') + '"';
			//}
		}
		else {
			json += (name && ':') +  o.toString();
		}
		return json;
	},
	innerXml: function(node) {
		var s = '';
		if ('innerHTML' in node) {
			s = node.innerHTML;
		}
		else {
			var asXml = function(n) {
				var s = '', i;
				if (n.nodeType === 1) {
					s += '<' + n.nodeName;
					for (i = 0; i < n.attributes.length; i += 1) {
						s += ' ' + n.attributes[i].nodeName + '="' + (n.attributes[i].nodeValue || '').toString() + '"';
					}
					if (n.firstChild) {
						s += '>';
						for (var c = n.firstChild; c; c = c.nextSibling) {
							s += asXml(c);
						}
						s += '</' + n.nodeName + '>';
					}
					else {
						s += '/>';
					}
				}
				else if (n.nodeType === 3) {
					s += n.nodeValue;
				}
				else if (n.nodeType === 4) {
					s += '<![CDATA[' + n.nodeValue + ']]>';
				}
				return s;
			};
			for (var c = node.firstChild; c; c = c.nextSibling) {
				s += asXml(c);
			}
		}
		return s;
	},
	escape: function(txt) {
		return txt.replace(/[\\]/g, '\\\\').replace(/[\"]/g, '\\"').replace(/[\n]/g, '\\n').replace(/[\r]/g, '\\r');
	},
	removeWhite: function(e) {
		e.normalize();
		var n;
		for (n = e.firstChild; n; ) {
			if (n.nodeType === 3) {
				// text node
				if (!n.nodeValue.match(/[^ \f\n\r\t\v]/)) {
					// pure whitespace text node
					var nxt = n.nextSibling;
					e.removeChild(n);
					n = nxt;
				}
				else {
					n = n.nextSibling;
				}
			}
			else if (n.nodeType === 1) {
				// element node
				this.removeWhite(n);
				n = n.nextSibling;
			}
			else {
				// any other node
				n = n.nextSibling;
			}
		}
		return e;
	}
};/*
**
 * formatter for values but most of the values if for jqGrid
 * Some of this was inspired and based on how YUI does the table datagrid but in jQuery fashion
 * we are trying to keep it as light as possible
 * Joshua Burnett josh@9ci.com
 * http://www.greenbill.com
 *
 * Changes from Tony Tomov tony@trirand.com
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
 *
**/
/*jshint eqeqeq:false */
/*global jQuery */

(function($) {
	'use strict';
	$.fmatter = {};
	//opts can be id:row id for the row, rowdata:the data for the row, colmodel:the column model for this column
	//example {id:1234,}
	$.extend($.fmatter,{
		isBoolean : function(o) {
			return typeof o === 'boolean';
		},
		isObject : function(o) {
			return (o && (typeof o === 'object' || $.isFunction(o))) || false;
		},
		isString : function(o) {
			return typeof o === 'string';
		},
		isNumber : function(o) {
			return typeof o === 'number' && isFinite(o);
		},
		isNull : function(o) {
			return o === null;
		},
		isUndefined : function(o) {
			return o === undefined;
		},
		isValue : function (o) {
			return (this.isObject(o) || this.isString(o) || this.isNumber(o) || this.isBoolean(o));
		},
		isEmpty : function(o) {
			if(!this.isString(o) && this.isValue(o)) {
				return false;
			}
			if (!this.isValue(o)){
				return true;
			}
			o = $.trim(o).replace(/\&nbsp\;/ig,'').replace(/\&#160\;/ig,'');
			return o==='';
		}
	});
	$.fn.fmatter = function(formatType, cellval, opts, rwd, act) {
		// build main options before element iteration
		var v=cellval;
		opts = $.extend({}, $.jgrid.formatter, opts);

		try {
			v = $.fn.fmatter[formatType].call(this, cellval, opts, rwd, act);
		} catch(fe){}
		return v;
	};
	$.fmatter.util = {
		// Taken from YAHOO utils
		NumberFormat : function(nData,opts) {
			if(!$.fmatter.isNumber(nData)) {
				nData *= 1;
			}
			if($.fmatter.isNumber(nData)) {
				var bNegative = (nData < 0);
				var sOutput = String(nData);
				var sDecimalSeparator = opts.decimalSeparator || '.';
				var nDotIndex;
				if($.fmatter.isNumber(opts.decimalPlaces)) {
					// Round to the correct decimal place
					var nDecimalPlaces = opts.decimalPlaces;
					var nDecimal = Math.pow(10, nDecimalPlaces);
					sOutput = String(Math.round(nData*nDecimal)/nDecimal);
					nDotIndex = sOutput.lastIndexOf('.');
					if(nDecimalPlaces > 0) {
					// Add the decimal separator
						if(nDotIndex < 0) {
							sOutput += sDecimalSeparator;
							nDotIndex = sOutput.length-1;
						}
						// Replace the "."
						else if(sDecimalSeparator !== '.'){
							sOutput = sOutput.replace('.',sDecimalSeparator);
						}
						// Add missing zeros
						while((sOutput.length - 1 - nDotIndex) < nDecimalPlaces) {
							sOutput += '0';
						}
					}
				}
				if(opts.thousandsSeparator) {
					var sThousandsSeparator = opts.thousandsSeparator;
					nDotIndex = sOutput.lastIndexOf(sDecimalSeparator);
					nDotIndex = (nDotIndex > -1) ? nDotIndex : sOutput.length;
					var sNewOutput = sOutput.substring(nDotIndex);
					var nCount = -1, i;
					for (i=nDotIndex; i>0; i--) {
						nCount++;
						if ((nCount%3 === 0) && (i !== nDotIndex) && (!bNegative || (i > 1))) {
							sNewOutput = sThousandsSeparator + sNewOutput;
						}
						sNewOutput = sOutput.charAt(i-1) + sNewOutput;
					}
					sOutput = sNewOutput;
				}
				// Prepend prefix
				sOutput = (opts.prefix) ? opts.prefix + sOutput : sOutput;
				// Append suffix
				sOutput = (opts.suffix) ? sOutput + opts.suffix : sOutput;
				return sOutput;

			}
			return nData;
		},
		// Tony Tomov
		// PHP implementation. Sorry not all options are supported.
		// Feel free to add them if you want
		DateFormat : function (format, date, newformat, opts)  {
			var	token = /\\.|[dDjlNSwzWFmMntLoYyaABgGhHisueIOPTZcrU]/g,
				timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
				timezoneClip = /[^-+\dA-Z]/g,
				msDateRegExp = new RegExp('^\/Date\\((([-+])?[0-9]+)(([-+])([0-9]{2})([0-9]{2}))?\\)\/$'),
				msMatch = ((typeof date === 'string') ? date.match(msDateRegExp): null),
				pad = function (value, length) {
					value = String(value);
					length = parseInt(length,10) || 2;
					while (value.length < length)  { value = '0' + value; }
					return value;
				},
				ts = {m : 1, d : 1, y : 1970, h : 0, i : 0, s : 0, u:0},
				timestamp=0, dM, k,hl,
				dateFormat=['i18n'];
			// Internationalization strings
			dateFormat.i18n = {
				dayNames: opts.dayNames,
				monthNames: opts.monthNames
			};
			if( opts.masks.hasOwnProperty(format) ) { format = opts.masks[format]; }
			if( !isNaN( date - 0 ) && String(format).toLowerCase() == 'u') {
				//Unix timestamp
				timestamp = new Date( parseFloat(date)*1000 );
			} else if(date.constructor === Date) {
				timestamp = date;
				// Microsoft date format support
			} else if( msMatch !== null ) {
				timestamp = new Date(parseInt(msMatch[1], 10));
				if (msMatch[3]) {
					var offset = Number(msMatch[5]) * 60 + Number(msMatch[6]);
					offset *= ((msMatch[4] == '-') ? 1 : -1);
					offset -= timestamp.getTimezoneOffset();
					timestamp.setTime(Number(Number(timestamp) + (offset * 60 * 1000)));
				}
			} else {
				date = String(date).split(/[\\\/:_;.,\t\T\s-]/);
				format = format.split(/[\\\/:_;.,\t\T\s-]/);
				// parsing for month names
				for(k=0,hl=format.length;k<hl;k++){
					if(format[k] == 'M') {
						dM = $.inArray(date[k],dateFormat.i18n.monthNames);
						if(dM !== -1 && dM < 12){date[k] = dM+1;}
					}
					if(format[k] == 'F') {
						dM = $.inArray(date[k],dateFormat.i18n.monthNames);
						if(dM !== -1 && dM > 11){date[k] = dM+1-12;}
					}
					if(date[k]) {
						ts[format[k].toLowerCase()] = parseInt(date[k],10);
					}
				}
				if(ts.f) {ts.m = ts.f;}
				if( ts.m === 0 && ts.y === 0 && ts.d === 0) {
					return '&#160;' ;
				}
				ts.m = parseInt(ts.m,10)-1;
				var ty = ts.y;
				if (ty >= 70 && ty <= 99) {ts.y = 1900+ts.y;}
				else if (ty >=0 && ty <=69) {ts.y= 2000+ts.y;}
				timestamp = new Date(ts.y, ts.m, ts.d, ts.h, ts.i, ts.s, ts.u);
			}

			if( opts.masks.hasOwnProperty(newformat) )  {
				newformat = opts.masks[newformat];
			} else if ( !newformat ) {
				newformat = 'Y-m-d';
			}
			var
				G = timestamp.getHours(),
				i = timestamp.getMinutes(),
				j = timestamp.getDate(),
				n = timestamp.getMonth() + 1,
				o = timestamp.getTimezoneOffset(),
				s = timestamp.getSeconds(),
				u = timestamp.getMilliseconds(),
				w = timestamp.getDay(),
				Y = timestamp.getFullYear(),
				N = (w + 6) % 7 + 1,
				z = (new Date(Y, n - 1, j) - new Date(Y, 0, 1)) / 86400000,
				flags = {
					// Day
					d: pad(j),
					D: dateFormat.i18n.dayNames[w],
					j: j,
					l: dateFormat.i18n.dayNames[w + 7],
					N: N,
					S: opts.S(j),
					//j < 11 || j > 13 ? ['st', 'nd', 'rd', 'th'][Math.min((j - 1) % 10, 3)] : 'th',
					w: w,
					z: z,
					// Week
					W: N < 5 ? Math.floor((z + N - 1) / 7) + 1 : Math.floor((z + N - 1) / 7) || ((new Date(Y - 1, 0, 1).getDay() + 6) % 7 < 4 ? 53 : 52),
					// Month
					F: dateFormat.i18n.monthNames[n - 1 + 12],
					m: pad(n),
					M: dateFormat.i18n.monthNames[n - 1],
					n: n,
					t: '?',
					// Year
					L: '?',
					o: '?',
					Y: Y,
					y: String(Y).substring(2),
					// Time
					a: G < 12 ? opts.AmPm[0] : opts.AmPm[1],
					A: G < 12 ? opts.AmPm[2] : opts.AmPm[3],
					B: '?',
					g: G % 12 || 12,
					G: G,
					h: pad(G % 12 || 12),
					H: pad(G),
					i: pad(i),
					s: pad(s),
					u: u,
					// Timezone
					e: '?',
					I: '?',
					O: (o > 0 ? '-' : '+') + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
					P: '?',
					T: (String(timestamp).match(timezone) || ['']).pop().replace(timezoneClip, ''),
					Z: '?',
					// Full Date/Time
					c: '?',
					r: '?',
					U: Math.floor(timestamp / 1000)
				};
			return newformat.replace(token, function ($0) {
				return flags.hasOwnProperty($0) ? flags[$0] : $0.substring(1);
			});
		}
	};
	$.fn.fmatter.defaultFormat = function(cellval, opts) {
		return ($.fmatter.isValue(cellval) && cellval!=='' ) ?  cellval : opts.defaultValue || '&#160;';
	};
	$.fn.fmatter.email = function(cellval, opts) {
		if(!$.fmatter.isEmpty(cellval)) {
			return '<a href="mailto:' + cellval + '">' + cellval + '</a>';
		}
		return $.fn.fmatter.defaultFormat(cellval,opts );
	};
	$.fn.fmatter.checkbox =function(cval, opts) {
		var op = $.extend({},opts.checkbox), ds;
		if(opts.colModel !== undefined && !$.fmatter.isUndefined(opts.colModel.formatoptions)) {
			op = $.extend({},op,opts.colModel.formatoptions);
		}
		if(op.disabled===true) {ds = 'disabled="disabled"';} else {ds='';}
		if($.fmatter.isEmpty(cval) || $.fmatter.isUndefined(cval) ) {cval = $.fn.fmatter.defaultFormat(cval,op);}
		cval=String(cval);
		cval=cval.toLowerCase();
		var bchk = cval.search(/(false|0|no|n|off)/i)<0 ? ' checked=\'checked\' ' : '';
		return '<input type="checkbox" ' + bchk  + ' value="'+ cval+'" offval="no" '+ds+ '/>';
	};
	$.fn.fmatter.link = function(cellval, opts) {
		var op = {target:opts.target};
		var target = '';
		if(opts.colModel !== undefined && !$.fmatter.isUndefined(opts.colModel.formatoptions)) {
			op = $.extend({},op,opts.colModel.formatoptions);
		}
		if(op.target) {target = 'target=' + op.target;}
		if(!$.fmatter.isEmpty(cellval)) {
			return '<a '+target+' href="' + cellval + '">' + cellval + '</a>';
		}
		return $.fn.fmatter.defaultFormat(cellval,opts);
	};
	$.fn.fmatter.showlink = function(cellval, opts) {
		var op = {baseLinkUrl: opts.baseLinkUrl,showAction:opts.showAction, addParam: opts.addParam || '', target: opts.target, idName: opts.idName},
			target = '', idUrl;
		if(opts.colModel !== undefined && !$.fmatter.isUndefined(opts.colModel.formatoptions)) {
			op = $.extend({},op,opts.colModel.formatoptions);
		}
		if(op.target) {target = 'target=' + op.target;}
		idUrl = op.baseLinkUrl+op.showAction + '?'+ op.idName+'='+opts.rowId+op.addParam;
		if($.fmatter.isString(cellval) || $.fmatter.isNumber(cellval)) {	//add this one even if its blank string
			return '<a '+target+' href="' + idUrl + '">' + cellval + '</a>';
		}
		return $.fn.fmatter.defaultFormat(cellval,opts);
	};
	$.fn.fmatter.integer = function(cellval, opts) {
		var op = $.extend({},opts.integer);
		if(opts.colModel !== undefined && !$.fmatter.isUndefined(opts.colModel.formatoptions)) {
			op = $.extend({},op,opts.colModel.formatoptions);
		}
		if($.fmatter.isEmpty(cellval)) {
			return op.defaultValue;
		}
		return $.fmatter.util.NumberFormat(cellval,op);
	};
	$.fn.fmatter.number = function (cellval, opts) {
		var op = $.extend({},opts.number);
		if(opts.colModel !== undefined && !$.fmatter.isUndefined(opts.colModel.formatoptions)) {
			op = $.extend({},op,opts.colModel.formatoptions);
		}
		if($.fmatter.isEmpty(cellval)) {
			return op.defaultValue;
		}
		return $.fmatter.util.NumberFormat(cellval,op);
	};
	$.fn.fmatter.currency = function (cellval, opts) {
		var op = $.extend({},opts.currency);
		if(opts.colModel !== undefined && !$.fmatter.isUndefined(opts.colModel.formatoptions)) {
			op = $.extend({},op,opts.colModel.formatoptions);
		}
		if($.fmatter.isEmpty(cellval)) {
			return op.defaultValue;
		}
		return $.fmatter.util.NumberFormat(cellval,op);
	};
	$.fn.fmatter.date = function (cellval, opts, rwd, act) {
		var op = $.extend({},opts.date);
		if(opts.colModel !== undefined && !$.fmatter.isUndefined(opts.colModel.formatoptions)) {
			op = $.extend({},op,opts.colModel.formatoptions);
		}
		if(!op.reformatAfterEdit && act=='edit'){
			return $.fn.fmatter.defaultFormat(cellval, opts);
		}
		if(!$.fmatter.isEmpty(cellval)) {
			return $.fmatter.util.DateFormat(op.srcformat,cellval,op.newformat,op);
		}
		return $.fn.fmatter.defaultFormat(cellval, opts);
	};
	$.fn.fmatter.select = function (cellval,opts) {
		// jqGrid specific
		cellval = String(cellval);
		var oSelect = false, ret=[], sep, delim;
		if(!$.fmatter.isUndefined(opts.colModel.formatoptions)){
			oSelect= opts.colModel.formatoptions.value;
			sep = opts.colModel.formatoptions.separator === undefined ? ':' : opts.colModel.formatoptions.separator;
			delim = opts.colModel.formatoptions.delimiter === undefined ? ';' : opts.colModel.formatoptions.delimiter;
		} else if(!$.fmatter.isUndefined(opts.colModel.editoptions)){
			oSelect= opts.colModel.editoptions.value;
			sep = opts.colModel.editoptions.separator === undefined ? ':' : opts.colModel.editoptions.separator;
			delim = opts.colModel.editoptions.delimiter === undefined ? ';' : opts.colModel.editoptions.delimiter;
		}
		if (oSelect) {
			var	msl =  opts.colModel.editoptions.multiple === true ? true : false,
				scell = [], sv;
			if(msl) {scell = cellval.split(',');scell = $.map(scell,function(n){return $.trim(n);});}
			if ($.fmatter.isString(oSelect)) {
				// mybe here we can use some caching with care ????
				var so = oSelect.split(delim), j=0, i;
				for(i=0; i<so.length;i++){
					sv = so[i].split(sep);
					if(sv.length > 2 ) {
						sv[1] = $.map(sv,function(n,i){if(i>0) {return n;}}).join(sep);
					}
					if(msl) {
						if($.inArray(sv[0],scell)>-1) {
							ret[j] = sv[1];
							j++;
						}
					} else if($.trim(sv[0])==$.trim(cellval)) {
						ret[0] = sv[1];
						break;
					}
				}
			} else if($.fmatter.isObject(oSelect)) {
				// this is quicker
				if(msl) {
					ret = $.map(scell, function(n){
						return oSelect[n];
					});
				} else {
					ret[0] = oSelect[cellval] || '';
				}
			}
		}
		cellval = ret.join(', ');
		return  cellval === '' ? $.fn.fmatter.defaultFormat(cellval,opts) : cellval;
	};
	$.fn.fmatter.rowactions = function(act) {
		var $tr = $(this).closest('tr.jqgrow'),
			$actionsDiv = $(this).parent(),
			rid = $tr.attr('id'),
			$grid = $(this).closest('table.ui-jqgrid-btable'),
			$t = $grid[0],
			p = $t.p,
			cm = p.colModel[$.jgrid.getCellIndex(this)],
			op = {
				keys: false,
				onEdit: null,
				onSuccess: null,
				afterSave: null,
				onError: null,
				afterRestore: null,
				extraparam: {},
				url: null,
				restoreAfterError: true,
				mtype: 'POST',
				delOptions: {},
				editOptions: {}
			},
			saverow = function(rowid, res) {
				if($.isFunction(op.afterSave)) { op.afterSave.call($t, rowid, res); }
				$actionsDiv.find('div.ui-inline-edit,div.ui-inline-del').show();
				$actionsDiv.find('div.ui-inline-save,div.ui-inline-cancel').hide();
			},
			restorerow = function(rowid) {
				if($.isFunction(op.afterRestore)) { op.afterRestore.call($t, rowid); }
				$actionsDiv.find('div.ui-inline-edit,div.ui-inline-del').show();
				$actionsDiv.find('div.ui-inline-save,div.ui-inline-cancel').hide();
			};

		if (!$.fmatter.isUndefined(cm.formatoptions)) {
			op = $.extend(op,cm.formatoptions);
		}
		if (!$.fmatter.isUndefined(p.editOptions)) {
			op.editOptions = p.editOptions;
		}
		if (!$.fmatter.isUndefined(p.delOptions)) {
			op.delOptions = p.delOptions;
		}
		if ($tr.hasClass('jqgrid-new-row')){
			op.extraparam[p.prmNames.oper] = p.prmNames.addoper;
		}
		var actop = {
			keys: op.keys,
			oneditfunc: op.onEdit,
			successfunc: op.onSuccess,
			url: op.url,
			extraparam: op.extraparam,
			aftersavefunc: saverow,
			errorfunc: op.onError,
			afterrestorefunc: restorerow,
			restoreAfterError: op.restoreAfterError,
			mtype: op.mtype
		};
		switch(act)
		{
		case 'edit':
			$grid.jqGrid('editRow', rid, actop);
			$actionsDiv.find('div.ui-inline-edit,div.ui-inline-del').hide();
			$actionsDiv.find('div.ui-inline-save,div.ui-inline-cancel').show();
			$grid.triggerHandler('jqGridAfterGridComplete');
			break;
		case 'save':
			if ($grid.jqGrid('saveRow', rid, actop)) {
				$actionsDiv.find('div.ui-inline-edit,div.ui-inline-del').show();
				$actionsDiv.find('div.ui-inline-save,div.ui-inline-cancel').hide();
				$grid.triggerHandler('jqGridAfterGridComplete');
			}
			break;
		case 'cancel' :
			$grid.jqGrid('restoreRow', rid, restorerow);
			$actionsDiv.find('div.ui-inline-edit,div.ui-inline-del').show();
			$actionsDiv.find('div.ui-inline-save,div.ui-inline-cancel').hide();
			$grid.triggerHandler('jqGridAfterGridComplete');
			break;
		case 'del':
			$grid.jqGrid('delGridRow', rid, op.delOptions);
			break;
		case 'formedit':
			$grid.jqGrid('setSelection', rid);
			$grid.jqGrid('editGridRow', rid, op.editOptions);
			break;
		}
	};
	$.fn.fmatter.actions = function(cellval,opts) {
		var op={keys:false, editbutton:true, delbutton:true, editformbutton: false},
			rowid=opts.rowId, str='',ocl;
		if(!$.fmatter.isUndefined(opts.colModel.formatoptions)) {
			op = $.extend(op,opts.colModel.formatoptions);
		}
		if(rowid === undefined || $.fmatter.isEmpty(rowid)) {return '';}
		if(op.editformbutton){
			ocl = 'onclick=jQuery.fn.fmatter.rowactions.call(this,\'formedit\'); onmouseover=jQuery(this).addClass(\'ui-state-hover\'); onmouseout=jQuery(this).removeClass(\'ui-state-hover\'); ';
			str += '<div title=\''+$.jgrid.nav.edittitle+'\' style=\'float:left;cursor:pointer;\' class=\'ui-pg-div ui-inline-edit\' '+ocl+'><span class=\'ui-icon ui-icon-pencil\'></span></div>';
		} else if(op.editbutton){
			ocl = 'onclick=jQuery.fn.fmatter.rowactions.call(this,\'edit\'); onmouseover=jQuery(this).addClass(\'ui-state-hover\'); onmouseout=jQuery(this).removeClass(\'ui-state-hover\') ';
			str += '<div title=\''+$.jgrid.nav.edittitle+'\' style=\'float:left;cursor:pointer;\' class=\'ui-pg-div ui-inline-edit\' '+ocl+'><span class=\'ui-icon ui-icon-pencil\'></span></div>';
		}
		if(op.delbutton) {
			ocl = 'onclick=jQuery.fn.fmatter.rowactions.call(this,\'del\'); onmouseover=jQuery(this).addClass(\'ui-state-hover\'); onmouseout=jQuery(this).removeClass(\'ui-state-hover\'); ';
			str += '<div title=\''+$.jgrid.nav.deltitle+'\' style=\'float:left;margin-left:5px;\' class=\'ui-pg-div ui-inline-del\' '+ocl+'><span class=\'ui-icon ui-icon-trash\'></span></div>';
		}
		ocl = 'onclick=jQuery.fn.fmatter.rowactions.call(this,\'save\'); onmouseover=jQuery(this).addClass(\'ui-state-hover\'); onmouseout=jQuery(this).removeClass(\'ui-state-hover\'); ';
		str += '<div title=\''+$.jgrid.edit.bSubmit+'\' style=\'float:left;display:none\' class=\'ui-pg-div ui-inline-save\' '+ocl+'><span class=\'ui-icon ui-icon-disk\'></span></div>';
		ocl = 'onclick=jQuery.fn.fmatter.rowactions.call(this,\'cancel\'); onmouseover=jQuery(this).addClass(\'ui-state-hover\'); onmouseout=jQuery(this).removeClass(\'ui-state-hover\'); ';
		str += '<div title=\''+$.jgrid.edit.bCancel+'\' style=\'float:left;display:none;margin-left:5px;\' class=\'ui-pg-div ui-inline-cancel\' '+ocl+'><span class=\'ui-icon ui-icon-cancel\'></span></div>';
		return '<div style=\'margin-left:8px;\'>' + str + '</div>';
	};
	$.unformat = function (cellval,options,pos,cnt) {
		// specific for jqGrid only
		var ret, formatType = options.colModel.formatter,
			op =options.colModel.formatoptions || {}, sep,
			re = /([\.\*\_\'\(\)\{\}\+\?\\])/g,
			unformatFunc = options.colModel.unformat||($.fn.fmatter[formatType] && $.fn.fmatter[formatType].unformat);
		if(unformatFunc !== undefined && $.isFunction(unformatFunc) ) {
			ret = unformatFunc.call(this, $(cellval).text(), options, cellval);
		} else if(!$.fmatter.isUndefined(formatType) && $.fmatter.isString(formatType) ) {
			var opts = $.jgrid.formatter || {}, stripTag;
			switch(formatType) {
			case 'integer' :
				op = $.extend({},opts.integer,op);
				sep = op.thousandsSeparator.replace(re,'\\$1');
				stripTag = new RegExp(sep, 'g');
				ret = $(cellval).text().replace(stripTag,'');
				break;
			case 'number' :
				op = $.extend({},opts.number,op);
				sep = op.thousandsSeparator.replace(re,'\\$1');
				stripTag = new RegExp(sep, 'g');
				ret = $(cellval).text().replace(stripTag,'').replace(op.decimalSeparator,'.');
				break;
			case 'currency':
				op = $.extend({},opts.currency,op);
				sep = op.thousandsSeparator.replace(re,'\\$1');
				stripTag = new RegExp(sep, 'g');
				ret = $(cellval).text();
				if (op.prefix && op.prefix.length) {
					ret = ret.substr(op.prefix.length);
				}
				if (op.suffix && op.suffix.length) {
					ret = ret.substr(0, ret.length - op.suffix.length);
				}
				ret = ret.replace(stripTag,'').replace(op.decimalSeparator,'.');
				break;
			case 'checkbox':
				var cbv = (options.colModel.editoptions) ? options.colModel.editoptions.value.split(':') : ['Yes','No'];
				ret = $('input',cellval).is(':checked') ? cbv[0] : cbv[1];
				break;
			case 'select' :
				ret = $.unformat.select(cellval,options,pos,cnt);
				break;
			case 'actions':
				return '';
			default:
				ret= $(cellval).text();
			}
		}
		return ret !== undefined ? ret : cnt===true ? $(cellval).text() : $.jgrid.htmlDecode($(cellval).html());
	};
	$.unformat.select = function (cellval,options,pos,cnt) {
		// Spacial case when we have local data and perform a sort
		// cnt is set to true only in sortDataArray
		var ret = [];
		var cell = $(cellval).text();
		if(cnt===true) {return cell;}
		var op = $.extend({}, !$.fmatter.isUndefined(options.colModel.formatoptions) ? options.colModel.formatoptions: options.colModel.editoptions),
			sep = op.separator === undefined ? ':' : op.separator,
			delim = op.delimiter === undefined ? ';' : op.delimiter;

		if(op.value){
			var oSelect = op.value,
				msl =  op.multiple === true ? true : false,
				scell = [], sv;
			if(msl) {scell = cell.split(',');scell = $.map(scell,function(n){return $.trim(n);});}
			if ($.fmatter.isString(oSelect)) {
				var so = oSelect.split(delim), j=0, i;
				for(i=0; i<so.length;i++){
					sv = so[i].split(sep);
					if(sv.length > 2 ) {
						sv[1] = $.map(sv,function(n,i){if(i>0) {return n;}}).join(sep);
					}
					if(msl) {
						if($.inArray(sv[1],scell)>-1) {
							ret[j] = sv[0];
							j++;
						}
					} else if($.trim(sv[1])==$.trim(cell)) {
						ret[0] = sv[0];
						break;
					}
				}
			} else if($.fmatter.isObject(oSelect) || $.isArray(oSelect) ){
				if(!msl) {scell[0] =  cell;}
				ret = $.map(scell, function(n){
					var rv;
					$.each(oSelect, function(i,val){
						if (val == n) {
							rv = i;
							return false;
						}
					});
					if( rv !== undefined ) {return rv;}
				});
			}
			return ret.join(', ');
		}
		return cell || '';
	};
	$.unformat.date = function (cellval, opts) {
		var op = $.jgrid.formatter.date || {};
		if(!$.fmatter.isUndefined(opts.formatoptions)) {
			op = $.extend({},op,opts.formatoptions);
		}
		if(!$.fmatter.isEmpty(cellval)) {
			return $.fmatter.util.DateFormat(op.newformat,cellval,op.srcformat,op);
		}
		return $.fn.fmatter.defaultFormat(cellval, opts);
	};
})(jQuery);
/*jshint eqeqeq:false */
/*global jQuery */
(function($){
/*
 * jqGrid common function
 * Tony Tomov tony@trirand.com
 * http://trirand.com/blog/
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
*/
	'use strict';
	$.extend($.jgrid,{
		// Modal functions
		showModal : function(h) {
			h.w.show();
		},
		closeModal : function(h) {
			h.w.hide().attr('aria-hidden','true');
			if(h.o) {h.o.remove();}
		},
		hideModal : function (selector,o) {
			o = $.extend({jqm : true, gb :''}, o || {});
			if(o.onClose) {
				var oncret = o.gb && typeof o.gb === 'string' && o.gb.substr(0,6) === '#gbox_' ? o.onClose.call($('#' + o.gb.substr(6))[0], selector) : o.onClose(selector);
				if (typeof oncret === 'boolean'  && !oncret ) { return; }
			}
			if ($.fn.jqm && o.jqm === true) {
				$(selector).attr('aria-hidden','true').jqmHide();
			} else {
				if(o.gb !== '') {
					try {$('.jqgrid-overlay:first',o.gb).hide();} catch (e){}
				}
				$(selector).hide().attr('aria-hidden','true');
			}
		},
		//Helper functions
		findPos : function(obj) {
			var curleft = 0, curtop = 0;
			if (obj.offsetParent) {
				do {
					curleft += obj.offsetLeft;
					curtop += obj.offsetTop;
				} while (obj = obj.offsetParent);
			//do not change obj == obj.offsetParent
			}
			return [curleft,curtop];
		},
		createModal : function(aIDs, content, p, insertSelector, posSelector, appendsel, css) {
			p = $.extend(true, {}, $.jgrid.jqModal || {}, p);
			var mw  = document.createElement('div'), rtlsup, self = this;
			css = $.extend({}, css || {});
			rtlsup = $(p.gbox).attr('dir') == 'rtl' ? true : false;
			mw.className= 'ui-widget ui-widget-content ui-corner-all ui-jqdialog';
			mw.id = aIDs.themodal;
			var mh = document.createElement('div');
			mh.className = 'ui-jqdialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix';
			mh.id = aIDs.modalhead;
			$(mh).append('<span class=\'ui-jqdialog-title\'>'+p.caption+'</span>');
			var ahr= $('<a href=\'javascript:void(0)\' class=\'ui-jqdialog-titlebar-close ui-corner-all\'></a>')
				.hover(function(){ahr.addClass('ui-state-hover');},
					function(){ahr.removeClass('ui-state-hover');})
				.append('<span class=\'ui-icon ui-icon-closethick\'></span>');
			$(mh).append(ahr);
			if(rtlsup) {
				mw.dir = 'rtl';
				$('.ui-jqdialog-title',mh).css('float','right');
				$('.ui-jqdialog-titlebar-close',mh).css('left',0.3+'em');
			} else {
				mw.dir = 'ltr';
				$('.ui-jqdialog-title',mh).css('float','left');
				$('.ui-jqdialog-titlebar-close',mh).css('right',0.3+'em');
			}
			var mc = document.createElement('div');
			$(mc).addClass('ui-jqdialog-content ui-widget-content').attr('id',aIDs.modalcontent);
			$(mc).append(content);
			mw.appendChild(mc);
			$(mw).prepend(mh);
			if(appendsel===true) { $('body').append(mw); } //append as first child in body -for alert dialog
			else if (typeof appendsel === 'string') {
				$(appendsel).append(mw);
			} else {$(mw).insertBefore(insertSelector);}
			$(mw).css(css);
			if(p.jqModal === undefined) {p.jqModal = true;} // internal use
			var coord = {};
			if ( $.fn.jqm && p.jqModal === true) {
				if(p.left ===0 && p.top===0 && p.overlay) {
					var pos = [];
					pos = $.jgrid.findPos(posSelector);
					p.left = pos[0] + 4;
					p.top = pos[1] + 4;
				}
				coord.top = p.top+'px';
				coord.left = p.left;
			} else if(p.left !==0 || p.top!==0) {
				coord.left = p.left;
				coord.top = p.top+'px';
			}
			$('a.ui-jqdialog-titlebar-close',mh).click(function(){
				var oncm = $('#'+$.jgrid.jqID(aIDs.themodal)).data('onClose') || p.onClose;
				var gboxclose = $('#'+$.jgrid.jqID(aIDs.themodal)).data('gbox') || p.gbox;
				self.hideModal('#'+$.jgrid.jqID(aIDs.themodal),{gb:gboxclose,jqm:p.jqModal,onClose:oncm});
				return false;
			});
			if (p.width === 0 || !p.width) {p.width = 300;}
			if(p.height === 0 || !p.height) {p.height =200;}
			if(!p.zIndex) {
				var parentZ = $(insertSelector).parents('*[role=dialog]').filter(':first').css('z-index');
				if(parentZ) {
					p.zIndex = parseInt(parentZ,10)+2;
				} else {
					p.zIndex = 950;
				}
			}
			var rtlt = 0;
			if( rtlsup && coord.left && !appendsel) {
				rtlt = $(p.gbox).width()- (!isNaN(p.width) ? parseInt(p.width,10) :0) - 8; // to do
				// just in case
				coord.left = parseInt(coord.left,10) + parseInt(rtlt,10);
			}
			if(coord.left) { coord.left += 'px'; }
			$(mw).css($.extend({
				width: isNaN(p.width) ? 'auto': p.width+'px',
				height:isNaN(p.height) ? 'auto' : p.height + 'px',
				zIndex:p.zIndex,
				overflow: 'hidden'
			},coord))
				.attr({tabIndex: '-1','role':'dialog','aria-labelledby':aIDs.modalhead,'aria-hidden':'true'});
			if(p.drag === undefined) { p.drag=true;}
			if(p.resize === undefined) {p.resize=true;}
			if (p.drag) {
				$(mh).css('cursor','move');
				if($.fn.jqDrag) {
					$(mw).jqDrag(mh);
				} else {
					try {
						$(mw).draggable({handle: $('#'+$.jgrid.jqID(mh.id))});
					} catch (e) {}
				}
			}
			if(p.resize) {
				if($.fn.jqResize) {
					$(mw).append('<div class=\'jqResize ui-resizable-handle ui-resizable-se ui-icon ui-icon-gripsmall-diagonal-se\'></div>');
					$('#'+$.jgrid.jqID(aIDs.themodal)).jqResize('.jqResize',aIDs.scrollelm ? '#'+$.jgrid.jqID(aIDs.scrollelm) : false);
				} else {
					try {
						$(mw).resizable({handles: 'se, sw',alsoResize: aIDs.scrollelm ? '#'+$.jgrid.jqID(aIDs.scrollelm) : false});
					} catch (r) {}
				}
			}
			if(p.closeOnEscape === true){
				$(mw).keydown( function( e ) {
					if( e.which == 27 ) {
						var cone = $('#'+$.jgrid.jqID(aIDs.themodal)).data('onClose') || p.onClose;
						self.hideModal('#'+$.jgrid.jqID(aIDs.themodal),{gb:p.gbox,jqm:p.jqModal,onClose: cone});
					}
				});
			}
		},
		viewModal : function (selector,o){
			o = $.extend({
				toTop: true,
				overlay: 10,
				modal: false,
				overlayClass : 'ui-widget-overlay',
				onShow: $.jgrid.showModal,
				onHide: $.jgrid.closeModal,
				gbox: '',
				jqm : true,
				jqM : true
			}, o || {});
			if ($.fn.jqm && o.jqm === true) {
				if(o.jqM) { $(selector).attr('aria-hidden','false').jqm(o).jqmShow(); }
				else {$(selector).attr('aria-hidden','false').jqmShow();}
			} else {
				if(o.gbox !== '') {
					$('.jqgrid-overlay:first',o.gbox).show();
					$(selector).data('gbox',o.gbox);
				}
				$(selector).show().attr('aria-hidden','false');
				try{$(':input:visible',selector)[0].focus();}catch(_){}
			}
		},
		info_dialog : function(caption, content,c_b, modalopt) {
			var mopt = {
				width:290,
				height:'auto',
				dataheight: 'auto',
				drag: true,
				resize: false,
				left:250,
				top:170,
				zIndex : 1000,
				jqModal : true,
				modal : false,
				closeOnEscape : true,
				align: 'center',
				buttonalign : 'center',
				buttons : []
				// {text:'textbutt', id:"buttid", onClick : function(){...}}
				// if the id is not provided we set it like info_button_+ the index in the array - i.e info_button_0,info_button_1...
			};
			$.extend(true, mopt, $.jgrid.jqModal || {}, {caption:'<b>'+caption+'</b>'}, modalopt || {});
			var jm = mopt.jqModal, self = this;
			if($.fn.jqm && !jm) { jm = false; }
			// in case there is no jqModal
			var buttstr ='', i;
			if(mopt.buttons.length > 0) {
				for(i=0;i<mopt.buttons.length;i++) {
					if(mopt.buttons[i].id === undefined) { mopt.buttons[i].id = 'info_button_'+i; }
					buttstr += '<a href=\'javascript:void(0)\' id=\''+mopt.buttons[i].id+'\' class=\'fm-button ui-state-default ui-corner-all\'>'+mopt.buttons[i].text+'</a>';
				}
			}
			var dh = isNaN(mopt.dataheight) ? mopt.dataheight : mopt.dataheight+'px',
				cn = 'text-align:'+mopt.align+';';
			var cnt = '<div id=\'info_id\'>';
			cnt += '<div id=\'infocnt\' style=\'margin:0px;padding-bottom:1em;width:100%;overflow:auto;position:relative;height:'+dh+';'+cn+'\'>'+content+'</div>';
			cnt += c_b ? '<div class=\'ui-widget-content ui-helper-clearfix\' style=\'text-align:'+mopt.buttonalign+';padding-bottom:0.8em;padding-top:0.5em;background-image: none;border-width: 1px 0 0 0;\'><a href=\'javascript:void(0)\' id=\'closedialog\' class=\'fm-button ui-state-default ui-corner-all\'>'+c_b+'</a>'+buttstr+'</div>' :
				buttstr !== ''  ? '<div class=\'ui-widget-content ui-helper-clearfix\' style=\'text-align:'+mopt.buttonalign+';padding-bottom:0.8em;padding-top:0.5em;background-image: none;border-width: 1px 0 0 0;\'>'+buttstr+'</div>' : '';
			cnt += '</div>';

			try {
				if($('#info_dialog').attr('aria-hidden') == 'false') {
					$.jgrid.hideModal('#info_dialog',{jqm:jm});
				}
				$('#info_dialog').remove();
			} catch (e){}
			$.jgrid.createModal({
				themodal:'info_dialog',
				modalhead:'info_head',
				modalcontent:'info_content',
				scrollelm: 'infocnt'},
			cnt,
			mopt,
			'','',true
			);
			// attach onclick after inserting into the dom
			if(buttstr) {
				$.each(mopt.buttons,function(i){
					$('#'+$.jgrid.jqID(this.id),'#info_id').bind('click',function(){mopt.buttons[i].onClick.call($('#info_dialog')); return false;});
				});
			}
			$('#closedialog', '#info_id').click(function(){
				self.hideModal('#info_dialog',{jqm:jm});
				return false;
			});
			$('.fm-button','#info_dialog').hover(
				function(){$(this).addClass('ui-state-hover');},
				function(){$(this).removeClass('ui-state-hover');}
			);
			if($.isFunction(mopt.beforeOpen) ) { mopt.beforeOpen(); }
			$.jgrid.viewModal('#info_dialog',{
				onHide: function(h) {
					h.w.hide().remove();
					if(h.o) { h.o.remove(); }
				},
				modal :mopt.modal,
				jqm:jm
			});
			if($.isFunction(mopt.afterOpen) ) { mopt.afterOpen(); }
			try{ $('#info_dialog').focus();} catch (m){}
		},
		bindEv: function  (el, opt, $t) {
			if($.isFunction(opt.dataInit)) {
				opt.dataInit.call($t,el);
			}
			if(opt.dataEvents) {
				$.each(opt.dataEvents, function() {
					if (this.data !== undefined) {
						$(el).bind(this.type, this.data, this.fn);
					} else {
						$(el).bind(this.type, this.fn);
					}
				});
			}
		},
		// Form Functions
		createEl : function(eltype,options,vl,autowidth, ajaxso) {
			var elem = '', $t = this;
			function setAttributes(elm, atr, exl ) {
				var exclude = ['dataInit','dataEvents','dataUrl', 'buildSelect','sopt', 'searchhidden', 'defaultValue', 'attr', 'custom_element', 'custom_value'];
				if(exl !== undefined && $.isArray(exl)) {
					$.merge(exclude, exl);
				}
				$.each(atr, function(key, value){
					if($.inArray(key, exclude) === -1) {
						$(elm).attr(key,value);
					}
				});
				if(!atr.hasOwnProperty('id')) {
					$(elm).attr('id', $.jgrid.randId());
				}
			}
			switch (eltype)
			{
			case 'textarea' :
				elem = document.createElement('textarea');
				if(autowidth) {
					if(!options.cols) { $(elem).css({width:'98%'});}
				} else if (!options.cols) { options.cols = 20; }
				if(!options.rows) { options.rows = 2; }
				if(vl=='&nbsp;' || vl=='&#160;' || (vl.length==1 && vl.charCodeAt(0)==160)) {vl='';}
				elem.value = vl;
				setAttributes(elem, options);
				$(elem).attr({'role':'textbox','multiline':'true'});
				break;
			case 'checkbox' : //what code for simple checkbox
				elem = document.createElement('input');
				elem.type = 'checkbox';
				if( !options.value ) {
					var vl1 = vl.toLowerCase();
					if(vl1.search(/(false|0|no|off|undefined)/i)<0 && vl1!=='') {
						elem.checked=true;
						elem.defaultChecked=true;
						elem.value = vl;
					} else {
						elem.value = 'on';
					}
					$(elem).attr('offval','off');
				} else {
					var cbval = options.value.split(':');
					if(vl === cbval[0]) {
						elem.checked=true;
						elem.defaultChecked=true;
					}
					elem.value = cbval[0];
					$(elem).attr('offval',cbval[1]);
				}
				setAttributes(elem, options, ['value']);
				$(elem).attr('role','checkbox');
				break;
			case 'select' :
				elem = document.createElement('select');
				elem.setAttribute('role','select');
				var msl, ovm = [];
				if(options.multiple===true) {
					msl = true;
					elem.multiple='multiple';
					$(elem).attr('aria-multiselectable','true');
				} else { msl = false; }
				if(options.dataUrl !== undefined) {
					var rowid = options.name ? String(options.id).substring(0, String(options.id).length - String(options.name).length - 1) : String(options.id),
						postData = options.postData || ajaxso.postData;

					if ($t.p && $t.p.idPrefix) {
						rowid = $.jgrid.stripPref($t.p.idPrefix, rowid);
					} else {
						postData = undefined; // don't use postData for searching from jqFilter. One can implement the feature in the future if required.
					}
					$.ajax($.extend({
						url: options.dataUrl,
						type : 'GET',
						dataType: 'html',
						data: $.isFunction(postData) ? postData.call($t, rowid, vl, String(options.name)) : postData,
						context: {elem:elem, options:options, vl:vl},
						success: function(data){
							var a,	ovm = [], elem = this.elem, vl = this.vl,
								options = $.extend({},this.options),
								msl = options.multiple===true;
							if($.isFunction(options.buildSelect)) {
								var b = options.buildSelect.call($t,data);
								a = $(b).html();
							} else {
								a = $(data).html();
							}
							if(a) {
								$(elem).append(a);
								setAttributes(elem, options);
								if(options.size === undefined) { options.size =  msl ? 3 : 1;}
								if(msl) {
									ovm = vl.split(',');
									ovm = $.map(ovm,function(n){return $.trim(n);});
								} else {
									ovm[0] = $.trim(vl);
								}
								//$(elem).attr(options);
								setTimeout(function(){
									$('option',elem).each(function(i){
										//if(i===0) { this.selected = ""; }
										// fix IE8/IE7 problem with selecting of the first item on multiple=true
										if (i === 0 && elem.multiple) { this.selected = false; }
										$(this).attr('role','option');
										if($.inArray($.trim($(this).text()),ovm) > -1 || $.inArray($.trim($(this).val()),ovm) > -1 ) {
											this.selected= 'selected';
										}
									});
								},0);
							}
						}
					},ajaxso || {}));
				} else if(options.value) {
					var i;
					if(options.size === undefined) {
						options.size = msl ? 3 : 1;
					}
					if(msl) {
						ovm = vl.split(',');
						ovm = $.map(ovm,function(n){return $.trim(n);});
					}
					if(typeof options.value === 'function') { options.value = options.value(); }
					var so,sv, ov,
						sep = options.separator === undefined ? ':' : options.separator,
						delim = options.delimiter === undefined ? ';' : options.delimiter;
					if(typeof options.value === 'string') {
						so = options.value.split(delim);
						for(i=0; i<so.length;i++){
							sv = so[i].split(sep);
							if(sv.length > 2 ) {
								sv[1] = $.map(sv,function(n,ii){if(ii>0) { return n;} }).join(sep);
							}
							ov = document.createElement('option');
							ov.setAttribute('role','option');
							ov.value = sv[0]; ov.innerHTML = sv[1];
							elem.appendChild(ov);
							if (!msl &&  ($.trim(sv[0]) == $.trim(vl) || $.trim(sv[1]) == $.trim(vl))) { ov.selected ='selected'; }
							if (msl && ($.inArray($.trim(sv[1]), ovm)>-1 || $.inArray($.trim(sv[0]), ovm)>-1)) {ov.selected ='selected';}
						}
					} else if (typeof options.value === 'object') {
						var oSv = options.value, key;
						for (key in oSv) {
							if (oSv.hasOwnProperty(key ) ){
								ov = document.createElement('option');
								ov.setAttribute('role','option');
								ov.value = key; ov.innerHTML = oSv[key];
								elem.appendChild(ov);
								if (!msl &&  ( $.trim(key) == $.trim(vl) || $.trim(oSv[key]) == $.trim(vl)) ) { ov.selected ='selected'; }
								if (msl && ($.inArray($.trim(oSv[key]),ovm)>-1 || $.inArray($.trim(key),ovm)>-1)) { ov.selected ='selected'; }
							}
						}
					}
					setAttributes(elem, options, ['value']);
				}
				break;
			case 'text' :
			case 'password' :
			case 'button' :
				var role;
				if(eltype=='button') { role = 'button'; }
				else { role = 'textbox'; }
				elem = document.createElement('input');
				elem.type = eltype;
				elem.value = vl;
				setAttributes(elem, options);
				if(eltype != 'button'){
					if(autowidth) {
						if(!options.size) { $(elem).css({width:'98%'}); }
					} else if (!options.size) { options.size = 20; }
				}
				$(elem).attr('role',role);
				break;
			case 'image' :
			case 'file' :
				elem = document.createElement('input');
				elem.type = eltype;
				setAttributes(elem, options);
				break;
			case 'custom' :
				elem = document.createElement('span');
				try {
					if($.isFunction(options.custom_element)) {
						var celm = options.custom_element.call($t,vl,options);
						if(celm) {
							celm = $(celm).addClass('customelement').attr({id:options.id,name:options.name});
							$(elem).empty().append(celm);
						} else {
							throw 'e2';
						}
					} else {
						throw 'e1';
					}
				} catch (e) {
					if (e=='e1') { $.jgrid.info_dialog($.jgrid.errors.errcap,'function \'custom_element\' '+$.jgrid.edit.msg.nodefined, $.jgrid.edit.bClose);}
					if (e=='e2') { $.jgrid.info_dialog($.jgrid.errors.errcap,'function \'custom_element\' '+$.jgrid.edit.msg.novalue,$.jgrid.edit.bClose);}
					else { $.jgrid.info_dialog($.jgrid.errors.errcap,typeof e==='string'?e:e.message,$.jgrid.edit.bClose); }
				}
				break;
			}
			return elem;
		},
		// Date Validation Javascript
		checkDate : function (format, date) {
			var daysInFebruary = function(year){
					// February has 29 days in any year evenly divisible by four,
					// EXCEPT for centurial years which are not also divisible by 400.
					return (((year % 4 === 0) && ( year % 100 !== 0 || (year % 400 === 0))) ? 29 : 28 );
				},
				daysArray = function(n) {
					var i;
					for (i = 1; i <= n; i++) {
						this[i] = 31;
						if (i==4 || i==6 || i==9 || i==11) {this[i] = 30;}
						if (i==2) {this[i] = 29;}
					}
					return this;
				};

			var tsp = {}, sep;
			format = format.toLowerCase();
			//we search for /,-,. for the date separator
			if(format.indexOf('/') != -1) {
				sep = '/';
			} else if(format.indexOf('-') != -1) {
				sep = '-';
			} else if(format.indexOf('.') != -1) {
				sep = '.';
			} else {
				sep = '/';
			}
			format = format.split(sep);
			date = date.split(sep);
			if (date.length != 3) { return false; }
			var j=-1,yln, dln=-1, mln=-1, i;
			for(i=0;i<format.length;i++){
				var dv =  isNaN(date[i]) ? 0 : parseInt(date[i],10);
				tsp[format[i]] = dv;
				yln = format[i];
				if(yln.indexOf('y') != -1) { j=i; }
				if(yln.indexOf('m') != -1) { mln=i; }
				if(yln.indexOf('d') != -1) { dln=i; }
			}
			if (format[j] == 'y' || format[j] == 'yyyy') {
				yln=4;
			} else if(format[j] =='yy'){
				yln = 2;
			} else {
				yln = -1;
			}
			var daysInMonth = daysArray(12),
				strDate;
			if (j === -1) {
				return false;
			}
			strDate = tsp[format[j]].toString();
			if(yln == 2 && strDate.length == 1) {yln = 1;}
			if (strDate.length != yln || (tsp[format[j]]===0 && date[j]!='00')){
				return false;
			}
			if(mln === -1) {
				return false;
			}
			strDate = tsp[format[mln]].toString();
			if (strDate.length<1 || tsp[format[mln]]<1 || tsp[format[mln]]>12){
				return false;
			}
			if(dln === -1) {
				return false;
			}
			strDate = tsp[format[dln]].toString();
			if (strDate.length<1 || tsp[format[dln]]<1 || tsp[format[dln]]>31 || (tsp[format[mln]]==2 && tsp[format[dln]]>daysInFebruary(tsp[format[j]])) || tsp[format[dln]] > daysInMonth[tsp[format[mln]]]){
				return false;
			}
			return true;
		},
		isEmpty : function(val)
		{
			if (val.match(/^\s+$/) || val === '')	{
				return true;
			}
			return false;
		},
		checkTime : function(time){
			// checks only hh:ss (and optional am/pm)
			var re = /^(\d{1,2}):(\d{2})([ap]m)?$/,regs;
			if(!$.jgrid.isEmpty(time))
			{
				regs = time.match(re);
				if(regs) {
					if(regs[3]) {
						if(regs[1] < 1 || regs[1] > 12) { return false; }
					} else {
						if(regs[1] > 23) { return false; }
					}
					if(regs[2] > 59) {
						return false;
					}
				} else {
					return false;
				}
			}
			return true;
		},
		checkValues : function(val, valref,g, customobject, nam) {
			var edtrul,i, nm, dft, len;
			if(customobject === undefined) {
				if(typeof valref==='string'){
					for( i =0, len=g.p.colModel.length;i<len; i++){
						if(g.p.colModel[i].name==valref) {
							edtrul = g.p.colModel[i].editrules;
							valref = i;
							try { nm = g.p.colModel[i].formoptions.label; } catch (e) {}
							break;
						}
					}
				} else if(valref >=0) {
					edtrul = g.p.colModel[valref].editrules;
				}
			} else {
				edtrul = customobject;
				nm = nam===undefined ? '_' : nam;
			}
			if(edtrul) {
				if(!nm) { nm = g.p.colNames[valref]; }
				if(edtrul.required === true) {
					if( $.jgrid.isEmpty(val) )  { return [false,nm+': '+$.jgrid.edit.msg.required,'']; }
				}
				// force required
				var rqfield = edtrul.required === false ? false : true;
				if(edtrul.number === true) {
					if( !(rqfield === false && $.jgrid.isEmpty(val)) ) {
						if(isNaN(val)) { return [false,nm+': '+$.jgrid.edit.msg.number,'']; }
					}
				}
				if(edtrul.minValue !== undefined && !isNaN(edtrul.minValue)) {
					if (parseFloat(val) < parseFloat(edtrul.minValue) ) { return [false,nm+': '+$.jgrid.edit.msg.minValue+' '+edtrul.minValue,''];}
				}
				if(edtrul.maxValue !== undefined && !isNaN(edtrul.maxValue)) {
					if (parseFloat(val) > parseFloat(edtrul.maxValue) ) { return [false,nm+': '+$.jgrid.edit.msg.maxValue+' '+edtrul.maxValue,''];}
				}
				var filter;
				if(edtrul.email === true) {
					if( !(rqfield === false && $.jgrid.isEmpty(val)) ) {
						// taken from $ Validate plugin
						filter = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i;
						if(!filter.test(val)) {return [false,nm+': '+$.jgrid.edit.msg.email,''];}
					}
				}
				if(edtrul.integer === true) {
					if( !(rqfield === false && $.jgrid.isEmpty(val)) ) {
						if(isNaN(val)) { return [false,nm+': '+$.jgrid.edit.msg.integer,'']; }
						if ((val % 1 !== 0) || (val.indexOf('.') != -1)) { return [false,nm+': '+$.jgrid.edit.msg.integer,''];}
					}
				}
				if(edtrul.date === true) {
					if( !(rqfield === false && $.jgrid.isEmpty(val)) ) {
						if(g.p.colModel[valref].formatoptions && g.p.colModel[valref].formatoptions.newformat) {
							dft = g.p.colModel[valref].formatoptions.newformat;
						} else {
							dft = g.p.colModel[valref].datefmt || 'Y-m-d';
						}
						if(!$.jgrid.checkDate (dft, val)) { return [false,nm+': '+$.jgrid.edit.msg.date+' - '+dft,'']; }
					}
				}
				if(edtrul.time === true) {
					if( !(rqfield === false && $.jgrid.isEmpty(val)) ) {
						if(!$.jgrid.checkTime (val)) { return [false,nm+': '+$.jgrid.edit.msg.date+' - hh:mm (am/pm)','']; }
					}
				}
				if(edtrul.url === true) {
					if( !(rqfield === false && $.jgrid.isEmpty(val)) ) {
						filter = /^(((https?)|(ftp)):\/\/([\-\w]+\.)+\w{2,3}(\/[%\-\w]+(\.\w{2,})?)*(([\w\-\.\?\\\/+@&#;`~=%!]*)(\.\w{2,})?)*\/?)/i;
						if(!filter.test(val)) {return [false,nm+': '+$.jgrid.edit.msg.url,''];}
					}
				}
				if(edtrul.custom === true) {
					if( !(rqfield === false && $.jgrid.isEmpty(val)) ) {
						if($.isFunction(edtrul.custom_func)) {
							var ret = edtrul.custom_func.call(g,val,nm);
							return $.isArray(ret) ? ret : [false,$.jgrid.edit.msg.customarray,''];
						}
						return [false,$.jgrid.edit.msg.customfcheck,''];
					}
				}
			}
			return [true,'',''];
		}
	});
})(jQuery);
/*
 * jqFilter  jQuery jqGrid filter addon.
 * Copyright (c) 2011, Tony Tomov, tony@trirand.com
 * Dual licensed under the MIT and GPL licenses
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
 *
 * The work is inspired from this Stefan Pirvu
 * http://www.codeproject.com/KB/scripting/json-filtering.aspx
 *
 * The filter uses JSON entities to hold filter rules and groups. Here is an example of a filter:

{ "groupOp": "AND",
      "groups" : [
        { "groupOp": "OR",
            "rules": [
                { "field": "name", "op": "eq", "data": "England" },
                { "field": "id", "op": "le", "data": "5"}
             ]
        }
      ],
      "rules": [
        { "field": "name", "op": "eq", "data": "Romania" },
        { "field": "id", "op": "le", "data": "1"}
      ]
}
*/
/*jshint eqeqeq:false, eqnull:true, devel:true */
/*global jQuery */

(function ($) {
	'use strict';

	$.fn.jqFilter = function( arg ) {
		if (typeof arg === 'string') {

			var fn = $.fn.jqFilter[arg];
			if (!fn) {
				throw ('jqFilter - No such method: ' + arg);
			}
			var args = $.makeArray(arguments).slice(1);
			return fn.apply(this,args);
		}

		var p = $.extend(true,{
			filter: null,
			columns: [],
			onChange : null,
			afterRedraw : null,
			checkValues : null,
			error: false,
			errmsg : '',
			errorcheck : true,
			showQuery : true,
			sopt : null,
			ops : [
				{'name': 'eq', 'description': 'equal', 'operator':'='},
				{'name': 'ne', 'description': 'not equal', 'operator':'<>'},
				{'name': 'lt', 'description': 'less', 'operator':'<'},
				{'name': 'le', 'description': 'less or equal','operator':'<='},
				{'name': 'gt', 'description': 'greater', 'operator':'>'},
				{'name': 'ge', 'description': 'greater or equal', 'operator':'>='},
				{'name': 'bw', 'description': 'begins with', 'operator':'LIKE'},
				{'name': 'bn', 'description': 'does not begin with', 'operator':'NOT LIKE'},
				{'name': 'in', 'description': 'in', 'operator':'IN'},
				{'name': 'ni', 'description': 'not in', 'operator':'NOT IN'},
				{'name': 'ew', 'description': 'ends with', 'operator':'LIKE'},
				{'name': 'en', 'description': 'does not end with', 'operator':'NOT LIKE'},
				{'name': 'cn', 'description': 'contains', 'operator':'LIKE'},
				{'name': 'nc', 'description': 'does not contain', 'operator':'NOT LIKE'},
				{'name': 'nu', 'description': 'is null', 'operator':'IS NULL'},
				{'name': 'nn', 'description': 'is not null', 'operator':'IS NOT NULL'}
			],
			numopts : ['eq','ne', 'lt', 'le', 'gt', 'ge', 'nu', 'nn', 'in', 'ni'],
			stropts : ['eq', 'ne', 'bw', 'bn', 'ew', 'en', 'cn', 'nc', 'nu', 'nn', 'in', 'ni'],
			strarr : ['text', 'string', 'blob'],
			_gridsopt : [], // grid translated strings, do not tuch
			groupOps : [{ op: 'AND', text: 'AND' },	{ op: 'OR',  text: 'OR' }],
			groupButton : true,
			ruleButtons : true,
			direction : 'ltr'
		}, $.jgrid.filter, arg || {});
		return this.each( function() {
			if (this.filter) {return;}
			this.p = p;
			// setup filter in case if they is not defined
			if (this.p.filter === null || this.p.filter === undefined) {
				this.p.filter = {
					groupOp: this.p.groupOps[0].op,
					rules: [],
					groups: []
				};
			}
			var i, len = this.p.columns.length, cl,
				isIE = /msie/i.test(navigator.userAgent) && !window.opera;

			// translating the options
			if(this.p._gridsopt.length) {
			// ['eq','ne','lt','le','gt','ge','bw','bn','in','ni','ew','en','cn','nc']
				for(i=0;i<this.p._gridsopt.length;i++) {
					this.p.ops[i].description = this.p._gridsopt[i];
				}
			}
			this.p.initFilter = $.extend(true,{},this.p.filter);

			// set default values for the columns if they are not set
			if( !len ) {return;}
			for(i=0; i < len; i++) {
				cl = this.p.columns[i];
				if( cl.stype ) {
				// grid compatibility
					cl.inputtype = cl.stype;
				} else if(!cl.inputtype) {
					cl.inputtype = 'text';
				}
				if( cl.sorttype ) {
				// grid compatibility
					cl.searchtype = cl.sorttype;
				} else if (!cl.searchtype) {
					cl.searchtype = 'string';
				}
				if(cl.hidden === undefined) {
				// jqGrid compatibility
					cl.hidden = false;
				}
				if(!cl.label) {
					cl.label = cl.name;
				}
				if(cl.index) {
					cl.name = cl.index;
				}
				if(!cl.hasOwnProperty('searchoptions')) {
					cl.searchoptions = {};
				}
				if(!cl.hasOwnProperty('searchrules')) {
					cl.searchrules = {};
				}

			}
			if(this.p.showQuery) {
				$(this).append('<table class=\'queryresult ui-widget ui-widget-content\' style=\'display:block;max-width:440px;border:0px none;\' dir=\''+this.p.direction+'\'><tbody><tr><td class=\'query\'></td></tr></tbody></table>');
			}
			/*
		 *Perform checking.
		 *
		*/
			var checkData = function(val, colModelItem) {
				var ret = [true,''];
				if($.isFunction(colModelItem.searchrules)) {
					ret = colModelItem.searchrules(val, colModelItem);
				} else if($.jgrid && $.jgrid.checkValues) {
					try {
						ret = $.jgrid.checkValues(val, -1, null, colModelItem.searchrules, colModelItem.label);
					} catch (e) {}
				}
				if(ret && ret.length && ret[0] === false) {
					p.error = !ret[0];
					p.errmsg = ret[1];
				}
			};
			/* moving to common
		randId = function() {
			return Math.floor(Math.random()*10000).toString();
		};
		*/

			this.onchange = function (  ){
			// clear any error
				this.p.error = false;
				this.p.errmsg='';
				return $.isFunction(this.p.onChange) ? this.p.onChange.call( this, this.p ) : false;
			};
			/*
		 * Redraw the filter every time when new field is added/deleted
		 * and field is  changed
		 */
			this.reDraw = function() {
				$('table.group:first',this).remove();
				var t = this.createTableForGroup(p.filter, null);
				$(this).append(t);
				if($.isFunction(this.p.afterRedraw) ) {
					this.p.afterRedraw.call(this, this.p);
				}
			};
			/*
		 * Creates a grouping data for the filter
		 * @param group - object
		 * @param parentgroup - object
		 */
			this.createTableForGroup = function(group, parentgroup) {
				var that = this,  i;
				// this table will hold all the group (tables) and rules (rows)
				var table = $('<table class=\'group ui-widget ui-widget-content\' style=\'border:0px none;\'><tbody></tbody></table>'),
					// create error message row
					align = 'left';
				if(this.p.direction == 'rtl') {
					align = 'right';
					table.attr('dir','rtl');
				}
				if(parentgroup === null) {
					table.append('<tr class=\'error\' style=\'display:none;\'><th colspan=\'5\' class=\'ui-state-error\' align=\''+align+'\'></th></tr>');
				}

				var tr = $('<tr></tr>');
				table.append(tr);
				// this header will hold the group operator type and group action buttons for
				// creating subgroup "+ {}", creating rule "+" or deleting the group "-"
				var th = $('<th colspan=\'5\' align=\''+align+'\'></th>');
				tr.append(th);

				if(this.p.ruleButtons === true) {
					// dropdown for: choosing group operator type
					var groupOpSelect = $('<select class=\'opsel\'></select>');
					th.append(groupOpSelect);
					// populate dropdown with all posible group operators: or, and
					var str= '', selected;
					for (i = 0; i < p.groupOps.length; i++) {
						selected =  group.groupOp === that.p.groupOps[i].op ? ' selected=\'selected\'' :'';
						str += '<option value=\''+that.p.groupOps[i].op+'\'' + selected+'>'+that.p.groupOps[i].text+'</option>';
					}

					groupOpSelect
						.append(str)
						.bind('change',function() {
							group.groupOp = $(groupOpSelect).val();
							that.onchange(); // signals that the filter has changed
						});
				}
				// button for adding a new subgroup
				var inputAddSubgroup ='<span></span>';
				if(this.p.groupButton) {
					inputAddSubgroup = $('<input type=\'button\' value=\'+ {}\' title=\'Add subgroup\' class=\'add-group\'/>');
					inputAddSubgroup.bind('click',function() {
						if (group.groups === undefined ) {
							group.groups = [];
						}

						group.groups.push({
							groupOp: p.groupOps[0].op,
							rules: [],
							groups: []
						}); // adding a new group

						that.reDraw(); // the html has changed, force reDraw

						that.onchange(); // signals that the filter has changed
						return false;
					});
				}
				th.append(inputAddSubgroup);
				if(this.p.ruleButtons === true) {
					// button for adding a new rule
					var inputAddRule = $('<input type=\'button\' value=\'+\' title=\'Add rule\' class=\'add-rule ui-add\'/>'), cm;
					inputAddRule.bind('click',function() {
						//if(!group) { group = {};}
						if (group.rules === undefined) {
							group.rules = [];
						}
						for (i = 0; i < that.p.columns.length; i++) {
							// but show only serchable and serchhidden = true fields
							var searchable = (that.p.columns[i].search === undefined) ?  true: that.p.columns[i].search ,
								hidden = (that.p.columns[i].hidden === true),
								ignoreHiding = (that.p.columns[i].searchoptions.searchhidden === true);
							if ((ignoreHiding && searchable) || (searchable && !hidden)) {
								cm = that.p.columns[i];
								break;
							}
						}

						var opr;
						if( cm.searchoptions.sopt ) {opr = cm.searchoptions.sopt;}
						else if(that.p.sopt) { opr= that.p.sopt; }
						else if  ( $.inArray(cm.searchtype, that.p.strarr) !== -1 ) {opr = that.p.stropts;}
						else {opr = that.p.numopts;}

						group.rules.push({
							field: cm.name,
							op: opr[0],
							data: ''
						}); // adding a new rule

						that.reDraw(); // the html has changed, force reDraw
						// for the moment no change have been made to the rule, so
						// this will not trigger onchange event
						return false;
					});
					th.append(inputAddRule);
				}

				// button for delete the group
				if (parentgroup !== null) { // ignore the first group
					var inputDeleteGroup = $('<input type=\'button\' value=\'-\' title=\'Delete group\' class=\'delete-group\'/>');
					th.append(inputDeleteGroup);
					inputDeleteGroup.bind('click',function() {
						// remove group from parent
						for (i = 0; i < parentgroup.groups.length; i++) {
							if (parentgroup.groups[i] === group) {
								parentgroup.groups.splice(i, 1);
								break;
							}
						}

						that.reDraw(); // the html has changed, force reDraw

						that.onchange(); // signals that the filter has changed
						return false;
					});
				}

				// append subgroup rows
				if (group.groups !== undefined) {
					for (i = 0; i < group.groups.length; i++) {
						var trHolderForSubgroup = $('<tr></tr>');
						table.append(trHolderForSubgroup);

						var tdFirstHolderForSubgroup = $('<td class=\'first\'></td>');
						trHolderForSubgroup.append(tdFirstHolderForSubgroup);

						var tdMainHolderForSubgroup = $('<td colspan=\'4\'></td>');
						tdMainHolderForSubgroup.append(this.createTableForGroup(group.groups[i], group));
						trHolderForSubgroup.append(tdMainHolderForSubgroup);
					}
				}
				if(group.groupOp === undefined) {
					group.groupOp = that.p.groupOps[0].op;
				}

				// append rules rows
				if (group.rules !== undefined) {
					for (i = 0; i < group.rules.length; i++) {
						table.append(
							this.createTableRowForRule(group.rules[i], group)
						);
					}
				}

				return table;
			};
			/*
		 * Create the rule data for the filter
		 */
			this.createTableRowForRule = function(rule, group ) {
			// save current entity in a variable so that it could
			// be referenced in anonimous method calls

				var that=this, tr = $('<tr></tr>'),
					//document.createElement("tr"),

					// first column used for padding
					//tdFirstHolderForRule = document.createElement("td"),
					i, op, trpar, cm, str='', selected;
				//tdFirstHolderForRule.setAttribute("class", "first");
				tr.append('<td class=\'first\'></td>');


				// create field container
				var ruleFieldTd = $('<td class=\'columns\'></td>');
				tr.append(ruleFieldTd);


				// dropdown for: choosing field
				var ruleFieldSelect = $('<select></select>'), ina, aoprs = [];
				ruleFieldTd.append(ruleFieldSelect);
				ruleFieldSelect.bind('change',function() {
					rule.field = $(ruleFieldSelect).val();

					trpar = $(this).parents('tr:first');
					for (i=0;i<that.p.columns.length;i++) {
						if(that.p.columns[i].name ===  rule.field) {
							cm = that.p.columns[i];
							break;
						}
					}
					if(!cm) {return;}
					cm.searchoptions.id = $.jgrid.randId();
					if(isIE && cm.inputtype === 'text') {
						if(!cm.searchoptions.size) {
							cm.searchoptions.size = 10;
						}
					}
					var elm = $.jgrid.createEl(cm.inputtype,cm.searchoptions, '', true, that.p.ajaxSelectOptions, true);
					$(elm).addClass('input-elm');
					//that.createElement(rule, "");

					if( cm.searchoptions.sopt ) {op = cm.searchoptions.sopt;}
					else if(that.p.sopt) { op= that.p.sopt; }
					else if  ($.inArray(cm.searchtype, that.p.strarr) !== -1) {op = that.p.stropts;}
					else {op = that.p.numopts;}
					// operators
					var s ='', so = 0;
					aoprs = [];
					$.each(that.p.ops, function() { aoprs.push(this.name); });
					for ( i = 0 ; i < op.length; i++) {
						ina = $.inArray(op[i],aoprs);
						if(ina !== -1) {
							if(so===0) {
								rule.op = that.p.ops[ina].name;
							}
							s += '<option value=\''+that.p.ops[ina].name+'\'>'+that.p.ops[ina].description+'</option>';
							so++;
						}
					}
					$('.selectopts',trpar).empty().append( s );
					$('.selectopts',trpar)[0].selectedIndex = 0;
					if( $.jgrid.msie && $.jgrid.msiever() < 9) {
						var sw = parseInt($('select.selectopts',trpar)[0].offsetWidth, 10) + 1;
						$('.selectopts',trpar).width( sw );
						$('.selectopts',trpar).css('width','auto');
					}
					// data
					$('.data',trpar).empty().append( elm );
					$.jgrid.bindEv( elm, cm.searchoptions, that);
					$('.input-elm',trpar).bind('change',function( e ) {
						var tmo = $(this).hasClass('ui-autocomplete-input') ? 200 :0;
						setTimeout(function(){
							var elem = e.target;
							rule.data = elem.nodeName.toUpperCase() === 'SPAN' && cm.searchoptions && $.isFunction(cm.searchoptions.custom_value) ?
								cm.searchoptions.custom_value($(elem).children('.customelement:first'), 'get') : elem.value;
							that.onchange(); // signals that the filter has changed
						}, tmo);
					});
					setTimeout(function(){ //IE, Opera, Chrome
						rule.data = $(elm).val();
						that.onchange();  // signals that the filter has changed
					}, 0);
				});

				// populate drop down with user provided column definitions
				var j=0;
				for (i = 0; i < that.p.columns.length; i++) {
				// but show only serchable and serchhidden = true fields
					var searchable = (that.p.columns[i].search === undefined) ? true: that.p.columns[i].search,
						hidden = (that.p.columns[i].hidden === true),
						ignoreHiding = (that.p.columns[i].searchoptions.searchhidden === true);
					if ((ignoreHiding && searchable) || (searchable && !hidden)) {
						selected = '';
						if(rule.field === that.p.columns[i].name) {
							selected = ' selected=\'selected\'';
							j=i;
						}
						str += '<option value=\''+that.p.columns[i].name+'\'' +selected+'>'+that.p.columns[i].label+'</option>';
					}
				}
				ruleFieldSelect.append( str );


				// create operator container
				var ruleOperatorTd = $('<td class=\'operators\'></td>');
				tr.append(ruleOperatorTd);
				cm = p.columns[j];
				// create it here so it can be referentiated in the onchange event
				//var RD = that.createElement(rule, rule.data);
				cm.searchoptions.id = $.jgrid.randId();
				if(isIE && cm.inputtype === 'text') {
					if(!cm.searchoptions.size) {
						cm.searchoptions.size = 10;
					}
				}
				var ruleDataInput = $.jgrid.createEl(cm.inputtype,cm.searchoptions, rule.data, true, that.p.ajaxSelectOptions, true);
				if(rule.op == 'nu' || rule.op == 'nn') {
					$(ruleDataInput).attr('readonly','true');
					$(ruleDataInput).attr('disabled','true');
				} //retain the state of disabled text fields in case of null ops
				// dropdown for: choosing operator
				var ruleOperatorSelect = $('<select class=\'selectopts\'></select>');
				ruleOperatorTd.append(ruleOperatorSelect);
				ruleOperatorSelect.bind('change',function() {
					rule.op = $(ruleOperatorSelect).val();
					trpar = $(this).parents('tr:first');
					var rd = $('.input-elm',trpar)[0];
					if (rule.op === 'nu' || rule.op === 'nn') { // disable for operator "is null" and "is not null"
						rule.data = '';
						rd.value = '';
						rd.setAttribute('readonly', 'true');
						rd.setAttribute('disabled', 'true');
					} else {
						rd.removeAttribute('readonly');
						rd.removeAttribute('disabled');
					}

					that.onchange();  // signals that the filter has changed
				});

				// populate drop down with all available operators
				if( cm.searchoptions.sopt ) {op = cm.searchoptions.sopt;}
				else if(that.p.sopt) { op= that.p.sopt; }
				else if  ($.inArray(cm.searchtype, that.p.strarr) !== -1) {op = that.p.stropts;}
				else {op = that.p.numopts;}
				str='';
				$.each(that.p.ops, function() { aoprs.push(this.name); });
				for ( i = 0; i < op.length; i++) {
					ina = $.inArray(op[i],aoprs);
					if(ina !== -1) {
						selected = rule.op === that.p.ops[ina].name ? ' selected=\'selected\'' : '';
						str += '<option value=\''+that.p.ops[ina].name+'\''+selected+'>'+that.p.ops[ina].description+'</option>';
					}
				}
				ruleOperatorSelect.append( str );
				// create data container
				var ruleDataTd = $('<td class=\'data\'></td>');
				tr.append(ruleDataTd);

				// textbox for: data
				// is created previously
				//ruleDataInput.setAttribute("type", "text");
				ruleDataTd.append(ruleDataInput);
				$.jgrid.bindEv( ruleDataInput, cm.searchoptions, that);
				$(ruleDataInput)
					.addClass('input-elm')
					.bind('change', function() {
						rule.data = cm.inputtype === 'custom' ? cm.searchoptions.custom_value($(this).children('.customelement:first'),'get') : $(this).val();
						that.onchange(); // signals that the filter has changed
					});

				// create action container
				var ruleDeleteTd = $('<td></td>');
				tr.append(ruleDeleteTd);

				// create button for: delete rule
				if(this.p.ruleButtons === true) {
					var ruleDeleteInput = $('<input type=\'button\' value=\'-\' title=\'Delete rule\' class=\'delete-rule ui-del\'/>');
					ruleDeleteTd.append(ruleDeleteInput);
					//$(ruleDeleteInput).html("").height(20).width(30).button({icons: {  primary: "ui-icon-minus", text:false}});
					ruleDeleteInput.bind('click',function() {
						// remove rule from group
						for (i = 0; i < group.rules.length; i++) {
							if (group.rules[i] === rule) {
								group.rules.splice(i, 1);
								break;
							}
						}

						that.reDraw(); // the html has changed, force reDraw

						that.onchange(); // signals that the filter has changed
						return false;
					});
				}
				return tr;
			};

			this.getStringForGroup = function(group) {
				var s = '(', index;
				if (group.groups !== undefined) {
					for (index = 0; index < group.groups.length; index++) {
						if (s.length > 1) {
							s += ' ' + group.groupOp + ' ';
						}
						try {
							s += this.getStringForGroup(group.groups[index]);
						} catch (eg) {alert(eg);}
					}
				}

				if (group.rules !== undefined) {
					try{
						for (index = 0; index < group.rules.length; index++) {
							if (s.length > 1) {
								s += ' ' + group.groupOp + ' ';
							}
							s += this.getStringForRule(group.rules[index]);
						}
					} catch (e) {alert(e);}
				}

				s += ')';

				if (s === '()') {
					return ''; // ignore groups that don't have rules
				}
				return s;
			};
			this.getStringForRule = function(rule) {
				var opUF = '',opC='', i, cm, ret, val,
					numtypes = ['int', 'integer', 'float', 'number', 'currency']; // jqGrid
				for (i = 0; i < this.p.ops.length; i++) {
					if (this.p.ops[i].name === rule.op) {
						opUF = this.p.ops[i].operator;
						opC = this.p.ops[i].name;
						break;
					}
				}
				for (i=0; i<this.p.columns.length; i++) {
					if(this.p.columns[i].name === rule.field) {
						cm = this.p.columns[i];
						break;
					}
				}
				if (cm == null) { return ''; }
				val = rule.data;
				if(opC === 'bw' || opC === 'bn') { val = val+'%'; }
				if(opC === 'ew' || opC === 'en') { val = '%'+val; }
				if(opC === 'cn' || opC === 'nc') { val = '%'+val+'%'; }
				if(opC === 'in' || opC === 'ni') { val = ' ('+val+')'; }
				if(p.errorcheck) { checkData(rule.data, cm); }
				if($.inArray(cm.searchtype, numtypes) !== -1 || opC === 'nn' || opC === 'nu') { ret = rule.field + ' ' + opUF + ' ' + val; }
				else { ret = rule.field + ' ' + opUF + ' "' + val + '"'; }
				return ret;
			};
			this.resetFilter = function () {
				this.p.filter = $.extend(true,{},this.p.initFilter);
				this.reDraw();
				this.onchange();
			};
			this.hideError = function() {
				$('th.ui-state-error', this).html('');
				$('tr.error', this).hide();
			};
			this.showError = function() {
				$('th.ui-state-error', this).html(this.p.errmsg);
				$('tr.error', this).show();
			};
			this.toUserFriendlyString = function() {
				return this.getStringForGroup(p.filter);
			};
			this.toString = function() {
			// this will obtain a string that can be used to match an item.
				var that = this;
				function getStringRule(rule) {
					if(that.p.errorcheck) {
						var i, cm;
						for (i=0; i<that.p.columns.length; i++) {
							if(that.p.columns[i].name === rule.field) {
								cm = that.p.columns[i];
								break;
							}
						}
						if(cm) {checkData(rule.data, cm);}
					}
					return rule.op + '(item.' + rule.field + ',\'' + rule.data + '\')';
				}

				function getStringForGroup(group) {
					var s = '(', index;

					if (group.groups !== undefined) {
						for (index = 0; index < group.groups.length; index++) {
							if (s.length > 1) {
								if (group.groupOp === 'OR') {
									s += ' || ';
								}
								else {
									s += ' && ';
								}
							}
							s += getStringForGroup(group.groups[index]);
						}
					}

					if (group.rules !== undefined) {
						for (index = 0; index < group.rules.length; index++) {
							if (s.length > 1) {
								if (group.groupOp === 'OR') {
									s += ' || ';
								}
								else  {
									s += ' && ';
								}
							}
							s += getStringRule(group.rules[index]);
						}
					}

					s += ')';

					if (s === '()') {
						return ''; // ignore groups that don't have rules
					}
					return s;
				}

				return getStringForGroup(this.p.filter);
			};

			// Here we init the filter
			this.reDraw();

			if(this.p.showQuery) {
				this.onchange();
			}
			// mark is as created so that it will not be created twice on this element
			this.filter = true;
		});
	};
	$.extend($.fn.jqFilter,{
	/*
	 * Return SQL like string. Can be used directly
	 */
		toSQLString : function()
		{
			var s ='';
			this.each(function(){
				s = this.toUserFriendlyString();
			});
			return s;
		},
		/*
	 * Return filter data as object.
	 */
		filterData : function()
		{
			var s;
			this.each(function(){
				s = this.p.filter;
			});
			return s;

		},
		getParameter : function (param) {
			if(param !== undefined) {
				if (this.p.hasOwnProperty(param) ) {
					return this.p[param];
				}
			}
			return this.p;
		},
		resetFilter: function() {
			return this.each(function(){
				this.resetFilter();
			});
		},
		addFilter: function (pfilter) {
			if (typeof pfilter === 'string') {
				pfilter = $.jgrid.parse( pfilter );
			}
			this.each(function(){
				this.p.filter = pfilter;
				this.reDraw();
				this.onchange();
			});
		}

	});
})(jQuery);
/*jshint eqeqeq:false, eqnull:true, devel:true */
/*global xmlJsonClass, jQuery */
(function($){
/**
 * jqGrid extension for form editing Grid Data
 * Tony Tomov tony@trirand.com
 * http://trirand.com/blog/
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
**/
	'use strict';

	$.jgrid.extend({
		searchGrid : function (p) {
			p = $.extend(true, {
				recreateFilter: false,
				drag: true,
				sField:'searchField',
				sValue:'searchString',
				sOper: 'searchOper',
				sFilter: 'filters',
				loadDefaults: true, // this options activates loading of default filters from grid's postData for Multipe Search only.
				beforeShowSearch: null,
				afterShowSearch : null,
				onInitializeSearch: null,
				afterRedraw : null,
				afterChange: null,
				closeAfterSearch : false,
				closeAfterReset: false,
				closeOnEscape : false,
				searchOnEnter : false,
				multipleSearch : false,
				multipleGroup : false,
				//cloneSearchRowOnAdd: true,
				top : 0,
				left: 0,
				jqModal : true,
				modal: false,
				resize : true,
				width: 450,
				height: 'auto',
				dataheight: 'auto',
				showQuery: false,
				errorcheck : true,
				// translation
				// if you want to change or remove the order change it in sopt
				// ['eq','ne','lt','le','gt','ge','bw','bn','in','ni','ew','en','cn','nc'],
				sopt: null,
				stringResult: undefined,
				onClose : null,
				onSearch : null,
				onReset : null,
				toTop : true,
				overlay : 30,
				columns : [],
				tmplNames : null,
				tmplFilters : null,
				// translations - later in lang file
				tmplLabel : ' Template: ',
				showOnLoad: false,
				layer: null
			}, $.jgrid.search, p || {});
			return this.each(function() {
				var $t = this;
				if(!$t.grid) {return;}
				var fid = 'fbox_'+$t.p.id,
					showFrm = true,
					IDs = {themodal:'searchmod'+fid,modalhead:'searchhd'+fid,modalcontent:'searchcnt'+fid, scrollelm : fid},
					defaultFilters  = $t.p.postData[p.sFilter];
				if(typeof defaultFilters === 'string') {
					defaultFilters = $.jgrid.parse( defaultFilters );
				}
				if(p.recreateFilter === true) {
					$('#'+$.jgrid.jqID(IDs.themodal)).remove();
				}
				function showFilter(_filter) {
					showFrm = $($t).triggerHandler('jqGridFilterBeforeShow', [_filter]);
					if(showFrm === undefined) {
						showFrm = true;
					}
					if(showFrm && $.isFunction(p.beforeShowSearch)) {
						showFrm = p.beforeShowSearch.call($t,_filter);
					}
					if(showFrm) {
						$.jgrid.viewModal('#'+$.jgrid.jqID(IDs.themodal),{gbox:'#gbox_'+$.jgrid.jqID(fid),jqm:p.jqModal, modal:p.modal, overlay: p.overlay, toTop: p.toTop});
						$($t).triggerHandler('jqGridFilterAfterShow', [_filter]);
						if($.isFunction(p.afterShowSearch)) {
							p.afterShowSearch.call($t, _filter);
						}
					}
				}
				if ( $('#'+$.jgrid.jqID(IDs.themodal))[0] !== undefined ) {
					showFilter($('#fbox_'+$.jgrid.jqID(+$t.p.id)));
				} else {
					var fil = $('<div><div id=\''+fid+'\' class=\'searchFilter\' style=\'overflow:auto\'></div></div>').insertBefore('#gview_'+$.jgrid.jqID($t.p.id)),
						align = 'left', butleft ='';
					if($t.p.direction == 'rtl') {
						align = 'right';
						butleft = ' style=\'text-align:left\'';
						fil.attr('dir','rtl');
					}
					var columns = $.extend([],$t.p.colModel),
						bS  ='<a href=\'javascript:void(0)\' id=\''+fid+'_search\' class=\'fm-button ui-state-default ui-corner-all fm-button-icon-right ui-reset\'><span class=\'ui-icon ui-icon-search\'></span>'+p.Find+'</a>',
						bC  ='<a href=\'javascript:void(0)\' id=\''+fid+'_reset\' class=\'fm-button ui-state-default ui-corner-all fm-button-icon-left ui-search\'><span class=\'ui-icon ui-icon-arrowreturnthick-1-w\'></span>'+p.Reset+'</a>',
						bQ = '', tmpl='', colnm, found = false, bt, cmi=-1;
					if(p.showQuery) {
						bQ ='<a href=\'javascript:void(0)\' id=\''+fid+'_query\' class=\'fm-button ui-state-default ui-corner-all fm-button-icon-left\'><span class=\'ui-icon ui-icon-comment\'></span>Query</a>';
					}
					if(!p.columns.length) {
						$.each(columns, function(i,n){
							if(!n.label) {
								n.label = $t.p.colNames[i];
							}
							// find first searchable column and set it if no default filter
							if(!found) {
								var searchable = (n.search === undefined) ?  true: n.search ,
									hidden = (n.hidden === true),
									ignoreHiding = (n.searchoptions && n.searchoptions.searchhidden === true);
								if ((ignoreHiding && searchable) || (searchable && !hidden)) {
									found = true;
									colnm = n.index || n.name;
									cmi =i;
								}
							}
						});
					} else {
						columns = p.columns;
					}
					// old behaviour
					if( (!defaultFilters && colnm) || p.multipleSearch === false  ) {
						var cmop = 'eq';
						if(cmi >=0 && columns[cmi].searchoptions && columns[cmi].searchoptions.sopt) {
							cmop = columns[cmi].searchoptions.sopt[0];
						} else if(p.sopt && p.sopt.length) {
							cmop = p.sopt[0];
						}
						defaultFilters = {'groupOp': 'AND',rules:[{'field':colnm,'op':cmop,'data':''}]};
					}
					found = false;
					if(p.tmplNames && p.tmplNames.length) {
						found = true;
						tmpl = p.tmplLabel;
						tmpl += '<select class=\'ui-template\'>';
						tmpl += '<option value=\'default\'>Default</option>';
						$.each(p.tmplNames, function(i,n){
							tmpl += '<option value=\''+i+'\'>'+n+'</option>';
						});
						tmpl += '</select>';
					}

					bt = '<table class=\'EditTable\' style=\'border:0px none;margin-top:5px\' id=\''+fid+'_2\'><tbody><tr><td colspan=\'2\'><hr class=\'ui-widget-content\' style=\'margin:1px\'/></td></tr><tr><td class=\'EditButton\' style=\'text-align:'+align+'\'>'+bC+tmpl+'</td><td class=\'EditButton\' '+butleft+'>'+bQ+bS+'</td></tr></tbody></table>';
					fid = $.jgrid.jqID( fid);
					$('#'+fid).jqFilter({
						columns : columns,
						filter: p.loadDefaults ? defaultFilters : null,
						showQuery: p.showQuery,
						errorcheck : p.errorcheck,
						sopt: p.sopt,
						groupButton : p.multipleGroup,
						ruleButtons : p.multipleSearch,
						afterRedraw : p.afterRedraw,
						_gridsopt : $.jgrid.search.odata,
						ajaxSelectOptions: $t.p.ajaxSelectOptions,
						groupOps: p.groupOps,
						onChange : function() {
							if(this.p.showQuery) {
								$('.query',this).html(this.toUserFriendlyString());
							}
							if ($.isFunction(p.afterChange)) {
								p.afterChange.call($t, $('#'+fid), p);
							}
						},
						direction : $t.p.direction
					});
					fil.append( bt );
					if(found && p.tmplFilters && p.tmplFilters.length) {
						$('.ui-template', fil).bind('change', function(){
							var curtempl = $(this).val();
							if(curtempl=='default') {
								$('#'+fid).jqFilter('addFilter', defaultFilters);
							} else {
								$('#'+fid).jqFilter('addFilter', p.tmplFilters[parseInt(curtempl,10)]);
							}
							return false;
						});
					}
					if(p.multipleGroup === true) {p.multipleSearch = true;}
					$($t).triggerHandler('jqGridFilterInitialize', [$('#'+fid)]);
					if($.isFunction(p.onInitializeSearch) ) {
						p.onInitializeSearch.call($t, $('#'+fid));
					}
					p.gbox = '#gbox_'+fid;
					if (p.layer) {
						$.jgrid.createModal(IDs ,fil,p,'#gview_'+$.jgrid.jqID($t.p.id),$('#gbox_'+$.jgrid.jqID($t.p.id))[0], '#'+$.jgrid.jqID(p.layer), {position: 'relative'});
					} else {
						$.jgrid.createModal(IDs ,fil,p,'#gview_'+$.jgrid.jqID($t.p.id),$('#gbox_'+$.jgrid.jqID($t.p.id))[0]);
					}
					if (p.searchOnEnter || p.closeOnEscape) {
						$('#'+$.jgrid.jqID(IDs.themodal)).keydown(function (e) {
							var $target = $(e.target);
							if (p.searchOnEnter && e.which === 13 && // 13 === $.ui.keyCode.ENTER
								!$target.hasClass('add-group') && !$target.hasClass('add-rule') &&
								!$target.hasClass('delete-group') && !$target.hasClass('delete-rule') &&
								(!$target.hasClass('fm-button') || !$target.is('[id$=_query]'))) {
								$('#'+fid+'_search').focus().click();
								return false;
							}
							if (p.closeOnEscape && e.which === 27) { // 27 === $.ui.keyCode.ESCAPE
								$('#'+$.jgrid.jqID(IDs.modalhead)).find('.ui-jqdialog-titlebar-close').focus().click();
								return false;
							}
						});
					}
					if(bQ) {
						$('#'+fid+'_query').bind('click', function(){
							$('.queryresult', fil).toggle();
							return false;
						});
					}
					if (p.stringResult===undefined) {
					// to provide backward compatibility, inferring stringResult value from multipleSearch
						p.stringResult = p.multipleSearch;
					}
					$('#'+fid+'_search').bind('click', function(){
						var fl = $('#'+fid),
							sdata={}, res ,
							filters = fl.jqFilter('filterData');
						if(p.errorcheck) {
							fl[0].hideError();
							if(!p.showQuery) {fl.jqFilter('toSQLString');}
							if(fl[0].p.error) {
								fl[0].showError();
								return false;
							}
						}

						if(p.stringResult) {
							try {
							// xmlJsonClass or JSON.stringify
								res = xmlJsonClass.toJson(filters, '', '', false);
							} catch (e) {
								try {
									res = JSON.stringify(filters);
								} catch (e2) { }
							}
							if(typeof res==='string') {
								sdata[p.sFilter] = res;
								$.each([p.sField,p.sValue, p.sOper], function() {sdata[this] = '';});
							}
						} else {
							if(p.multipleSearch) {
								sdata[p.sFilter] = filters;
								$.each([p.sField,p.sValue, p.sOper], function() {sdata[this] = '';});
							} else {
								sdata[p.sField] = filters.rules[0].field;
								sdata[p.sValue] = filters.rules[0].data;
								sdata[p.sOper] = filters.rules[0].op;
								sdata[p.sFilter] = '';
							}
						}
						$t.p.search = true;
						$.extend($t.p.postData,sdata);
						$($t).triggerHandler('jqGridFilterSearch');
						if($.isFunction(p.onSearch) ) {
							p.onSearch.call($t);
						}
						$($t).trigger('reloadGrid',[{page:1}]);
						if(p.closeAfterSearch) {
							$.jgrid.hideModal('#'+$.jgrid.jqID(IDs.themodal),{gb:'#gbox_'+$.jgrid.jqID($t.p.id),jqm:p.jqModal,onClose: p.onClose});
						}
						return false;
					});
					$('#'+fid+'_reset').bind('click', function(){
						var sdata={},
							fl = $('#'+fid);
						$t.p.search = false;
						if(p.multipleSearch===false) {
							sdata[p.sField] = sdata[p.sValue] = sdata[p.sOper] = '';
						} else {
							sdata[p.sFilter] = '';
						}
						fl[0].resetFilter();
						if(found) {
							$('.ui-template', fil).val('default');
						}
						$.extend($t.p.postData,sdata);
						$($t).triggerHandler('jqGridFilterReset');
						if($.isFunction(p.onReset) ) {
							p.onReset.call($t);
						}
						$($t).trigger('reloadGrid',[{page:1}]);
						return false;
					});
					showFilter($('#'+fid));
					$('.fm-button:not(.ui-state-disabled)',fil).hover(
						function(){$(this).addClass('ui-state-hover');},
						function(){$(this).removeClass('ui-state-hover');}
					);
				}
			});
		},
		editGridRow : function(rowid, p){
			p = $.extend(true, {
				top : 0,
				left: 0,
				width: 300,
				datawidth: 'auto',
				height: 'auto',
				dataheight: 'auto',
				modal: false,
				overlay : 30,
				drag: true,
				resize: true,
				url: null,
				mtype : 'POST',
				clearAfterAdd :true,
				closeAfterEdit : false,
				reloadAfterSubmit : true,
				onInitializeForm: null,
				beforeInitData: null,
				beforeShowForm: null,
				afterShowForm: null,
				beforeSubmit: null,
				afterSubmit: null,
				onclickSubmit: null,
				afterComplete: null,
				onclickPgButtons : null,
				afterclickPgButtons: null,
				editData : {},
				recreateForm : false,
				jqModal : true,
				closeOnEscape : false,
				addedrow : 'first',
				topinfo : '',
				bottominfo: '',
				saveicon : [],
				closeicon : [],
				savekey: [false,13],
				navkeys: [false,38,40],
				checkOnSubmit : false,
				checkOnUpdate : false,
				_savedData : {},
				processing : false,
				onClose : null,
				ajaxEditOptions : {},
				serializeEditData : null,
				viewPagerButtons : true
			}, $.jgrid.edit, p || {});
			rp_ge[$(this)[0].p.id] = p;
			return this.each(function(){
				var $t = this;
				if (!$t.grid || !rowid) {return;}
				var gID = $t.p.id,
					frmgr = 'FrmGrid_'+gID, frmtborg = 'TblGrid_'+gID, frmtb = '#'+$.jgrid.jqID(frmtborg),
					IDs = {themodal:'editmod'+gID,modalhead:'edithd'+gID,modalcontent:'editcnt'+gID, scrollelm : frmgr},
					onBeforeShow = $.isFunction(rp_ge[$t.p.id].beforeShowForm) ? rp_ge[$t.p.id].beforeShowForm : false,
					onAfterShow = $.isFunction(rp_ge[$t.p.id].afterShowForm) ? rp_ge[$t.p.id].afterShowForm : false,
					onBeforeInit = $.isFunction(rp_ge[$t.p.id].beforeInitData) ? rp_ge[$t.p.id].beforeInitData : false,
					onInitializeForm = $.isFunction(rp_ge[$t.p.id].onInitializeForm) ? rp_ge[$t.p.id].onInitializeForm : false,
					showFrm = true,
					maxCols = 1, maxRows=0,	postdata, extpost, newData, diff, frmoper;
				frmgr = $.jgrid.jqID(frmgr);
				if (rowid === 'new') {
					rowid = '_empty';
					frmoper = 'add';
					p.caption=rp_ge[$t.p.id].addCaption;
				} else {
					p.caption=rp_ge[$t.p.id].editCaption;
					frmoper = 'edit';
				}
				if(p.recreateForm===true && $('#'+$.jgrid.jqID(IDs.themodal))[0] !== undefined) {
					$('#'+$.jgrid.jqID(IDs.themodal)).remove();
				}
				var closeovrl = true;
				if(p.checkOnUpdate && p.jqModal && !p.modal) {
					closeovrl = false;
				}
				function getFormData(){
					$(frmtb+' > tbody > tr > td > .FormElement').each(function() {
						var celm = $('.customelement', this);
						if (celm.length) {
							var  elem = celm[0], nm = $(elem).attr('name');
							$.each($t.p.colModel, function(){
								if(this.name === nm && this.editoptions && $.isFunction(this.editoptions.custom_value)) {
									try {
										postdata[nm] = this.editoptions.custom_value.call($t, $('#'+$.jgrid.jqID(nm),frmtb),'get');
										if (postdata[nm] === undefined) {throw 'e1';}
									} catch (e) {
										if (e==='e1') {$.jgrid.info_dialog($.jgrid.errors.errcap,'function \'custom_value\' '+$.jgrid.edit.msg.novalue,$.jgrid.edit.bClose);}
										else {$.jgrid.info_dialog($.jgrid.errors.errcap,e.message,$.jgrid.edit.bClose);}
									}
									return true;
								}
							});
						} else {
							switch ($(this).get(0).type) {
							case 'checkbox':
								if($(this).is(':checked')) {
									postdata[this.name]= $(this).val();
								}else {
									var ofv = $(this).attr('offval');
									postdata[this.name]= ofv;
								}
								break;
							case 'select-one':
								postdata[this.name]= $('option:selected',this).val();
								extpost[this.name]= $('option:selected',this).text();
								break;
							case 'select-multiple':
								postdata[this.name]= $(this).val();
								if(postdata[this.name]) {postdata[this.name] = postdata[this.name].join(',');}
								else {postdata[this.name] ='';}
								var selectedText = [];
								$('option:selected',this).each(
									function(i,selected){
										selectedText[i] = $(selected).text();
									}
								);
								extpost[this.name]= selectedText.join(',');
								break;
							case 'password':
							case 'text':
							case 'textarea':
							case 'button':
								postdata[this.name] = $(this).val();

								break;
							}
							if($t.p.autoencode) {postdata[this.name] = $.jgrid.htmlEncode(postdata[this.name]);}
						}
					});
					return true;
				}
				function createData(rowid,obj,tb,maxcols){
					var nm, hc,trdata, cnt=0,tmp, dc,elc, retpos=[], ind=false,
						tdtmpl = '<td class=\'CaptionTD\'>&#160;</td><td class=\'DataTD\'>&#160;</td>', tmpl='', i; //*2
					for (i =1; i<=maxcols;i++) {
						tmpl += tdtmpl;
					}
					if(rowid != '_empty') {
						ind = $(obj).jqGrid('getInd',rowid);
					}
					$(obj.p.colModel).each( function(i) {
						nm = this.name;
						// hidden fields are included in the form
						if(this.editrules && this.editrules.edithidden === true) {
							hc = false;
						} else {
							hc = this.hidden === true ? true : false;
						}
						dc = hc ? 'style=\'display:none\'' : '';
						if ( nm !== 'cb' && nm !== 'subgrid' && this.editable===true && nm !== 'rn') {
							if(ind === false) {
								tmp = '';
							} else {
								if(nm == obj.p.ExpandColumn && obj.p.treeGrid === true) {
									tmp = $('td[role=\'gridcell\']:eq('+i+')',obj.rows[ind]).text();
								} else {
									try {
										tmp =  $.unformat.call(obj, $('td[role=\'gridcell\']:eq('+i+')',obj.rows[ind]),{rowId:rowid, colModel:this},i);
									} catch (_) {
										tmp =  (this.edittype && this.edittype == 'textarea') ? $('td[role=\'gridcell\']:eq('+i+')',obj.rows[ind]).text() : $('td[role=\'gridcell\']:eq('+i+')',obj.rows[ind]).html();
									}
									if(!tmp || tmp == '&nbsp;' || tmp == '&#160;' || (tmp.length==1 && tmp.charCodeAt(0)==160) ) {tmp='';}
								}
							}
							var opt = $.extend({}, this.editoptions || {} ,{id:nm,name:nm}),
								frmopt = $.extend({}, {elmprefix:'',elmsuffix:'',rowabove:false,rowcontent:''}, this.formoptions || {}),
								rp = parseInt(frmopt.rowpos,10) || cnt+1,
								cp = parseInt((parseInt(frmopt.colpos,10) || 1)*2,10);
							if(rowid == '_empty' && opt.defaultValue ) {
								tmp = $.isFunction(opt.defaultValue) ? opt.defaultValue.call($t) : opt.defaultValue;
							}
							if(!this.edittype) {this.edittype = 'text';}
							if($t.p.autoencode) {tmp = $.jgrid.htmlDecode(tmp);}
							elc = $.jgrid.createEl.call($t,this.edittype,opt,tmp,false,$.extend({},$.jgrid.ajaxOptions,obj.p.ajaxSelectOptions || {}));
							if(tmp === '' && this.edittype == 'checkbox') {tmp = $(elc).attr('offval');}
							if(tmp === '' && this.edittype == 'select') {tmp = $('option:eq(0)',elc).text();}
							if(rp_ge[$t.p.id].checkOnSubmit || rp_ge[$t.p.id].checkOnUpdate) {rp_ge[$t.p.id]._savedData[nm] = tmp;}
							$(elc).addClass('FormElement');
							if( $.inArray(this.edittype, ['text','textarea','password','select']) > -1) {
								$(elc).addClass('ui-widget-content ui-corner-all');
							}
							trdata = $(tb).find('tr[rowpos='+rp+']');
							if(frmopt.rowabove) {
								var newdata = $('<tr><td class=\'contentinfo\' colspan=\''+(maxcols*2)+'\'>'+frmopt.rowcontent+'</td></tr>');
								$(tb).append(newdata);
								newdata[0].rp = rp;
							}
							if ( trdata.length===0 ) {
								trdata = $('<tr '+dc+' rowpos=\''+rp+'\'></tr>').addClass('FormData').attr('id','tr_'+nm);
								$(trdata).append(tmpl);
								$(tb).append(trdata);
								trdata[0].rp = rp;
							}
							$('td:eq('+(cp-2)+')',trdata[0]).html(frmopt.label === undefined ? obj.p.colNames[i]: frmopt.label);
							$('td:eq('+(cp-1)+')',trdata[0]).append(frmopt.elmprefix).append(elc).append(frmopt.elmsuffix);
							if($.isFunction(opt.custom_value) && rowid !== '_empty' ) {
								opt.custom_value.call($t, $('#'+nm,'#'+frmgr),'set',tmp);
							}
							$.jgrid.bindEv( elc, opt, $t);
							retpos[cnt] = i;
							cnt++;
						}
					});
					if( cnt > 0) {
						var idrow = $('<tr class=\'FormData\' style=\'display:none\'><td class=\'CaptionTD\'></td><td colspan=\''+ (maxcols*2-1)+'\' class=\'DataTD\'><input class=\'FormElement\' id=\'id_g\' type=\'text\' name=\''+obj.p.id+'_id\' value=\''+rowid+'\'/></td></tr>');
						idrow[0].rp = cnt+999;
						$(tb).append(idrow);
						if(rp_ge[$t.p.id].checkOnSubmit || rp_ge[$t.p.id].checkOnUpdate) {rp_ge[$t.p.id]._savedData[obj.p.id+'_id'] = rowid;}
					}
					return retpos;
				}
				function fillData(rowid,obj,fmid){
					var nm,cnt=0,tmp, fld,opt,vl,vlc;
					if(rp_ge[$t.p.id].checkOnSubmit || rp_ge[$t.p.id].checkOnUpdate) {rp_ge[$t.p.id]._savedData = {};rp_ge[$t.p.id]._savedData[obj.p.id+'_id']=rowid;}
					var cm = obj.p.colModel;
					if(rowid == '_empty') {
						$(cm).each(function(){
							nm = this.name;
							opt = $.extend({}, this.editoptions || {} );
							fld = $('#'+$.jgrid.jqID(nm),'#'+fmid);
							if(fld && fld.length && fld[0] !== null) {
								vl = '';
								if(opt.defaultValue ) {
									vl = $.isFunction(opt.defaultValue) ? opt.defaultValue.call($t) : opt.defaultValue;
									if(fld[0].type=='checkbox') {
										vlc = vl.toLowerCase();
										if(vlc.search(/(false|0|no|off|undefined)/i)<0 && vlc!=='') {
											fld[0].checked = true;
											fld[0].defaultChecked = true;
											fld[0].value = vl;
										} else {
											fld[0].checked = false;
											fld[0].defaultChecked = false;
										}
									} else {fld.val(vl);}
								} else {
									if( fld[0].type=='checkbox' ) {
										fld[0].checked = false;
										fld[0].defaultChecked = false;
										vl = $(fld).attr('offval');
									} else if (fld[0].type && fld[0].type.substr(0,6)=='select') {
										fld[0].selectedIndex = 0;
									} else {
										fld.val(vl);
									}
								}
								if(rp_ge[$t.p.id].checkOnSubmit===true || rp_ge[$t.p.id].checkOnUpdate) {rp_ge[$t.p.id]._savedData[nm] = vl;}
							}
						});
						$('#id_g','#'+fmid).val(rowid);
						return;
					}
					var tre = $(obj).jqGrid('getInd',rowid,true);
					if(!tre) {return;}
					$('td[role="gridcell"]',tre).each( function(i) {
						nm = cm[i].name;
						// hidden fields are included in the form
						if ( nm !== 'cb' && nm !== 'subgrid' && nm !== 'rn' && cm[i].editable===true) {
							if(nm == obj.p.ExpandColumn && obj.p.treeGrid === true) {
								tmp = $(this).text();
							} else {
								try {
									tmp =  $.unformat.call(obj, $(this),{rowId:rowid, colModel:cm[i]},i);
								} catch (_) {
									tmp = cm[i].edittype=='textarea' ? $(this).text() : $(this).html();
								}
							}
							if($t.p.autoencode) {tmp = $.jgrid.htmlDecode(tmp);}
							if(rp_ge[$t.p.id].checkOnSubmit===true || rp_ge[$t.p.id].checkOnUpdate) {rp_ge[$t.p.id]._savedData[nm] = tmp;}
							nm = $.jgrid.jqID(nm);
							switch (cm[i].edittype) {
							case 'password':
							case 'text':
							case 'button' :
							case 'image':
							case 'textarea':
								if(tmp == '&nbsp;' || tmp == '&#160;' || (tmp.length==1 && tmp.charCodeAt(0)==160) ) {tmp='';}
								$('#'+nm,'#'+fmid).val(tmp);
								break;
							case 'select':
								var opv = tmp.split(',');
								opv = $.map(opv,function(n){return $.trim(n);});
								$('#'+nm+' option','#'+fmid).each(function(){
									if (!cm[i].editoptions.multiple && ($.trim(tmp) == $.trim($(this).text()) || opv[0] == $.trim($(this).text()) || opv[0] == $.trim($(this).val())) ){
										this.selected= true;
									} else if (cm[i].editoptions.multiple){
										if(  $.inArray($.trim($(this).text()), opv ) > -1 || $.inArray($.trim($(this).val()), opv ) > -1  ){
											this.selected = true;
										}else{
											this.selected = false;
										}
									} else {
										this.selected = false;
									}
								});
								break;
							case 'checkbox':
								tmp = String(tmp);
								if(cm[i].editoptions && cm[i].editoptions.value) {
									var cb = cm[i].editoptions.value.split(':');
									if(cb[0] == tmp) {
										$('#'+nm,'#'+fmid)[$t.p.useProp ? 'prop': 'attr']('checked',true);
										$('#'+nm,'#'+fmid)[$t.p.useProp ? 'prop': 'attr']('defaultChecked',true); //ie
									} else {
										$('#'+nm,'#'+fmid)[$t.p.useProp ? 'prop': 'attr']('checked', false);
										$('#'+nm,'#'+fmid)[$t.p.useProp ? 'prop': 'attr']('defaultChecked', false); //ie
									}
								} else {
									tmp = tmp.toLowerCase();
									if(tmp.search(/(false|0|no|off|undefined)/i)<0 && tmp!=='') {
										$('#'+nm,'#'+fmid)[$t.p.useProp ? 'prop': 'attr']('checked',true);
										$('#'+nm,'#'+fmid)[$t.p.useProp ? 'prop': 'attr']('defaultChecked',true); //ie
									} else {
										$('#'+nm,'#'+fmid)[$t.p.useProp ? 'prop': 'attr']('checked', false);
										$('#'+nm,'#'+fmid)[$t.p.useProp ? 'prop': 'attr']('defaultChecked', false); //ie
									}
								}
								break;
							case 'custom' :
								try {
									if(cm[i].editoptions && $.isFunction(cm[i].editoptions.custom_value)) {
										cm[i].editoptions.custom_value.call($t, $('#'+nm,'#'+fmid),'set',tmp);
									} else {throw 'e1';}
								} catch (e) {
									if (e=='e1') {$.jgrid.info_dialog($.jgrid.errors.errcap,'function \'custom_value\' '+$.jgrid.edit.msg.nodefined,$.jgrid.edit.bClose);}
									else {$.jgrid.info_dialog($.jgrid.errors.errcap,e.message,$.jgrid.edit.bClose);}
								}
								break;
							}
							cnt++;
						}
					});
					if(cnt>0) {$('#id_g',frmtb).val(rowid);}
				}
				function setNulls() {
					$.each($t.p.colModel, function(i,n){
						if(n.editoptions && n.editoptions.NullIfEmpty === true) {
							if(postdata.hasOwnProperty(n.name) && postdata[n.name] === '') {
								postdata[n.name] = 'null';
							}
						}
					});
				}
				function postIt() {
					var copydata, ret=[true,'',''], onCS = {}, opers = $t.p.prmNames, idname, oper, key, selr, i;

					var retvals = $($t).triggerHandler('jqGridAddEditBeforeCheckValues', [$('#'+frmgr), frmoper]);
					if(retvals && typeof retvals === 'object') {postdata = retvals;}

					if($.isFunction(rp_ge[$t.p.id].beforeCheckValues)) {
						retvals = rp_ge[$t.p.id].beforeCheckValues.call($t, postdata,$('#'+frmgr),postdata[$t.p.id+'_id'] == '_empty' ? opers.addoper : opers.editoper);
						if(retvals && typeof retvals === 'object') {postdata = retvals;}
					}
					for( key in postdata ){
						if(postdata.hasOwnProperty(key)) {
							ret = $.jgrid.checkValues.call($t,postdata[key],key,$t);
							if(ret[0] === false) {break;}
						}
					}
					setNulls();
					if(ret[0]) {
						onCS = $($t).triggerHandler('jqGridAddEditClickSubmit', [rp_ge[$t.p.id], postdata, frmoper]);
						if( onCS === undefined && $.isFunction( rp_ge[$t.p.id].onclickSubmit)) {
							onCS = rp_ge[$t.p.id].onclickSubmit.call($t, rp_ge[$t.p.id], postdata) || {};
						}
						ret = $($t).triggerHandler('jqGridAddEditBeforeSubmit', [postdata, $('#'+frmgr), frmoper]);
						if(ret === undefined) {
							ret = [true,'',''];
						}
						if( ret[0] && $.isFunction(rp_ge[$t.p.id].beforeSubmit))  {
							ret = rp_ge[$t.p.id].beforeSubmit.call($t,postdata,$('#'+frmgr));
						}
					}

					if(ret[0] && !rp_ge[$t.p.id].processing) {
						rp_ge[$t.p.id].processing = true;
						$('#sData', frmtb+'_2').addClass('ui-state-active');
						oper = opers.oper;
						idname = opers.id;
						// we add to pos data array the action - the name is oper
						postdata[oper] = ($.trim(postdata[$t.p.id+'_id']) == '_empty') ? opers.addoper : opers.editoper;
						if(postdata[oper] != opers.addoper) {
							postdata[idname] = postdata[$t.p.id+'_id'];
						} else {
						// check to see if we have allredy this field in the form and if yes lieve it
							if( postdata[idname] === undefined ) {postdata[idname] = postdata[$t.p.id+'_id'];}
						}
						delete postdata[$t.p.id+'_id'];
						postdata = $.extend(postdata,rp_ge[$t.p.id].editData,onCS);
						if($t.p.treeGrid === true)  {
							if(postdata[oper] == opers.addoper) {
								selr = $($t).jqGrid('getGridParam', 'selrow');
								var tr_par_id = $t.p.treeGridModel == 'adjacency' ? $t.p.treeReader.parent_id_field : 'parent_id';
								postdata[tr_par_id] = selr;
							}
							for(i in $t.p.treeReader){
								if($t.p.treeReader.hasOwnProperty(i)) {
									var itm = $t.p.treeReader[i];
									if(postdata.hasOwnProperty(itm)) {
										if(postdata[oper] == opers.addoper && i === 'parent_id_field') {continue;}
										delete postdata[itm];
									}
								}
							}
						}

						postdata[idname] = $.jgrid.stripPref($t.p.idPrefix, postdata[idname]);
						var ajaxOptions = $.extend({
							url: rp_ge[$t.p.id].url || $($t).jqGrid('getGridParam','editurl'),
							type: rp_ge[$t.p.id].mtype,
							data: $.isFunction(rp_ge[$t.p.id].serializeEditData) ? rp_ge[$t.p.id].serializeEditData.call($t,postdata) :  postdata,
							complete:function(data,status){
								var key;
								postdata[idname] = $t.p.idPrefix + postdata[idname];
								if(status != 'success') {
									ret[0] = false;
									ret[1] = $($t).triggerHandler('jqGridAddEditErrorTextFormat', [data, frmoper]);
									if ($.isFunction(rp_ge[$t.p.id].errorTextFormat)) {
										ret[1] = rp_ge[$t.p.id].errorTextFormat.call($t, data);
									} else {
										ret[1] = status + ' Status: \'' + data.statusText + '\'. Error code: ' + data.status;
									}
								} else {
								// data is posted successful
								// execute aftersubmit with the returned data from server
									ret = $($t).triggerHandler('jqGridAddEditAfterSubmit', [data, postdata, frmoper]);
									if(ret === undefined) {
										ret = [true,'',''];
									}
									if( ret[0] && $.isFunction(rp_ge[$t.p.id].afterSubmit) ) {
										ret = rp_ge[$t.p.id].afterSubmit.call($t, data,postdata);
									}
								}
								if(ret[0] === false) {
									$('#FormError>td',frmtb).html(ret[1]);
									$('#FormError',frmtb).show();
								} else {
								// remove some values if formattaer select or checkbox
									$.each($t.p.colModel, function(){
										if(extpost[this.name] && this.formatter && this.formatter=='select') {
											try {delete extpost[this.name];} catch (e) {}
										}
									});
									postdata = $.extend(postdata,extpost);
									if($t.p.autoencode) {
										$.each(postdata,function(n,v){
											postdata[n] = $.jgrid.htmlDecode(v);
										});
									}
									//rp_ge[$t.p.id].reloadAfterSubmit = rp_ge[$t.p.id].reloadAfterSubmit && $t.p.datatype != "local";
									// the action is add
									if(postdata[oper] == opers.addoper ) {
									//id processing
									// user not set the id ret[2]
										if(!ret[2]) {ret[2] = $.jgrid.randId();}
										postdata[idname] = ret[2];
										if(rp_ge[$t.p.id].closeAfterAdd) {
											if(rp_ge[$t.p.id].reloadAfterSubmit) {$($t).trigger('reloadGrid');}
											else {
												if($t.p.treeGrid === true){
													$($t).jqGrid('addChildNode',ret[2],selr,postdata );
												} else {
													$($t).jqGrid('addRowData',ret[2],postdata,p.addedrow);
													$($t).jqGrid('setSelection',ret[2]);
												}
											}
											$.jgrid.hideModal('#'+$.jgrid.jqID(IDs.themodal),{gb:'#gbox_'+$.jgrid.jqID(gID),jqm:p.jqModal,onClose: rp_ge[$t.p.id].onClose});
										} else if (rp_ge[$t.p.id].clearAfterAdd) {
											if(rp_ge[$t.p.id].reloadAfterSubmit) {$($t).trigger('reloadGrid');}
											else {
												if($t.p.treeGrid === true){
													$($t).jqGrid('addChildNode',ret[2],selr,postdata );
												} else {
													$($t).jqGrid('addRowData',ret[2],postdata,p.addedrow);
												}
											}
											fillData('_empty',$t,frmgr);
										} else {
											if(rp_ge[$t.p.id].reloadAfterSubmit) {$($t).trigger('reloadGrid');}
											else {
												if($t.p.treeGrid === true){
													$($t).jqGrid('addChildNode',ret[2],selr,postdata );
												} else {
													$($t).jqGrid('addRowData',ret[2],postdata,p.addedrow);
												}
											}
										}
									} else {
									// the action is update
										if(rp_ge[$t.p.id].reloadAfterSubmit) {
											$($t).trigger('reloadGrid');
											if( !rp_ge[$t.p.id].closeAfterEdit ) {setTimeout(function(){$($t).jqGrid('setSelection',postdata[idname]);},1000);}
										} else {
											if($t.p.treeGrid === true) {
												$($t).jqGrid('setTreeRow', postdata[idname],postdata);
											} else {
												$($t).jqGrid('setRowData', postdata[idname],postdata);
											}
										}
										if(rp_ge[$t.p.id].closeAfterEdit) {$.jgrid.hideModal('#'+$.jgrid.jqID(IDs.themodal),{gb:'#gbox_'+$.jgrid.jqID(gID),jqm:p.jqModal,onClose: rp_ge[$t.p.id].onClose});}
									}
									if($.isFunction(rp_ge[$t.p.id].afterComplete)) {
										copydata = data;
										setTimeout(function(){
											$($t).triggerHandler('jqGridAddEditAfterComplete', [copydata, postdata, $('#'+frmgr), frmoper]);
											rp_ge[$t.p.id].afterComplete.call($t, copydata, postdata, $('#'+frmgr));
											copydata=null;
										},500);
									}
									if(rp_ge[$t.p.id].checkOnSubmit || rp_ge[$t.p.id].checkOnUpdate) {
										$('#'+frmgr).data('disabled',false);
										if(rp_ge[$t.p.id]._savedData[$t.p.id+'_id'] !='_empty'){
											for(key in rp_ge[$t.p.id]._savedData) {
												if(rp_ge[$t.p.id]._savedData.hasOwnProperty(key) && postdata[key]) {
													rp_ge[$t.p.id]._savedData[key] = postdata[key];
												}
											}
										}
									}
								}
								rp_ge[$t.p.id].processing=false;
								$('#sData', frmtb+'_2').removeClass('ui-state-active');
								try{$(':input:visible','#'+frmgr)[0].focus();} catch (e){}
							}
						}, $.jgrid.ajaxOptions, rp_ge[$t.p.id].ajaxEditOptions );

						if (!ajaxOptions.url && !rp_ge[$t.p.id].useDataProxy) {
							if ($.isFunction($t.p.dataProxy)) {
								rp_ge[$t.p.id].useDataProxy = true;
							} else {
								ret[0]=false;ret[1] += ' '+$.jgrid.errors.nourl;
							}
						}
						if (ret[0]) {
							if (rp_ge[$t.p.id].useDataProxy) {
								var dpret = $t.p.dataProxy.call($t, ajaxOptions, 'set_'+$t.p.id);
								if(dpret === undefined) {
									dpret = [true, ''];
								}
								if(dpret[0] === false ) {
									ret[0] = false;
									ret[1] = dpret[1] || 'Error deleting the selected row!' ;
								} else {
									if(ajaxOptions.data.oper == opers.addoper && rp_ge[$t.p.id].closeAfterAdd ) {
										$.jgrid.hideModal('#'+$.jgrid.jqID(IDs.themodal),{gb:'#gbox_'+$.jgrid.jqID(gID),jqm:p.jqModal, onClose: rp_ge[$t.p.id].onClose});
									}
									if(ajaxOptions.data.oper == opers.editoper && rp_ge[$t.p.id].closeAfterEdit ) {
										$.jgrid.hideModal('#'+$.jgrid.jqID(IDs.themodal),{gb:'#gbox_'+$.jgrid.jqID(gID),jqm:p.jqModal, onClose: rp_ge[$t.p.id].onClose});
									}
								}
							} else {
								$.ajax(ajaxOptions);
							}
						}
					}
					if(ret[0] === false) {
						$('#FormError>td',frmtb).html(ret[1]);
						$('#FormError',frmtb).show();
					// return;
					}
				}
				function compareData(nObj, oObj ) {
					var ret = false,key;
					for (key in nObj) {
						if(nObj.hasOwnProperty(key) && nObj[key] != oObj[key]) {
							ret = true;
							break;
						}
					}
					return ret;
				}
				function checkUpdates () {
					var stat = true;
					$('#FormError',frmtb).hide();
					if(rp_ge[$t.p.id].checkOnUpdate) {
						postdata = {};extpost={};
						getFormData();
						newData = $.extend({},postdata,extpost);
						diff = compareData(newData,rp_ge[$t.p.id]._savedData);
						if(diff) {
							$('#'+frmgr).data('disabled',true);
							$('.confirm','#'+IDs.themodal).show();
							stat = false;
						}
					}
					return stat;
				}
				function restoreInline()
				{
					var i;
					if (rowid !== '_empty' && $t.p.savedRow !== undefined && $t.p.savedRow.length > 0 && $.isFunction($.fn.jqGrid.restoreRow)) {
						for (i=0;i<$t.p.savedRow.length;i++) {
							if ($t.p.savedRow[i].id == rowid) {
								$($t).jqGrid('restoreRow',rowid);
								break;
							}
						}
					}
				}
				function updateNav(cr, posarr){
					var totr = posarr[1].length-1;
					if (cr===0) {
						$('#pData',frmtb+'_2').addClass('ui-state-disabled');
					} else if( posarr[1][cr-1] !== undefined && $('#'+$.jgrid.jqID(posarr[1][cr-1])).hasClass('ui-state-disabled')) {
						$('#pData',frmtb+'_2').addClass('ui-state-disabled');
					} else {
						$('#pData',frmtb+'_2').removeClass('ui-state-disabled');
					}

					if (cr==totr) {
						$('#nData',frmtb+'_2').addClass('ui-state-disabled');
					} else if( posarr[1][cr+1] !== undefined && $('#'+$.jgrid.jqID(posarr[1][cr+1])).hasClass('ui-state-disabled')) {
						$('#nData',frmtb+'_2').addClass('ui-state-disabled');
					} else {
						$('#nData',frmtb+'_2').removeClass('ui-state-disabled');
					}
				}
				function getCurrPos() {
					var rowsInGrid = $($t).jqGrid('getDataIDs'),
						selrow = $('#id_g',frmtb).val(),
						pos = $.inArray(selrow,rowsInGrid);
					return [pos,rowsInGrid];
				}

				if ( $('#'+$.jgrid.jqID(IDs.themodal))[0] !== undefined ) {
					showFrm = $($t).triggerHandler('jqGridAddEditBeforeInitData', [$('#'+$.jgrid.jqID(frmgr)), frmoper]);
					if(showFrm === undefined) {
						showFrm = true;
					}
					if(showFrm && onBeforeInit) {
						showFrm = onBeforeInit.call($t,$('#'+frmgr));
					}
					if(showFrm === false) {return;}
					restoreInline();
					$('.ui-jqdialog-title','#'+$.jgrid.jqID(IDs.modalhead)).html(p.caption);
					$('#FormError',frmtb).hide();
					if(rp_ge[$t.p.id].topinfo) {
						$('.topinfo',frmtb).html(rp_ge[$t.p.id].topinfo);
						$('.tinfo',frmtb).show();
					} else {
						$('.tinfo',frmtb).hide();
					}
					if(rp_ge[$t.p.id].bottominfo) {
						$('.bottominfo',frmtb+'_2').html(rp_ge[$t.p.id].bottominfo);
						$('.binfo',frmtb+'_2').show();
					} else {
						$('.binfo',frmtb+'_2').hide();
					}
					// filldata
					fillData(rowid,$t,frmgr);
					///
					if(rowid=='_empty' || !rp_ge[$t.p.id].viewPagerButtons) {
						$('#pData, #nData',frmtb+'_2').hide();
					} else {
						$('#pData, #nData',frmtb+'_2').show();
					}
					if(rp_ge[$t.p.id].processing===true) {
						rp_ge[$t.p.id].processing=false;
						$('#sData', frmtb+'_2').removeClass('ui-state-active');
					}
					if($('#'+frmgr).data('disabled')===true) {
						$('.confirm','#'+$.jgrid.jqID(IDs.themodal)).hide();
						$('#'+frmgr).data('disabled',false);
					}
					$($t).triggerHandler('jqGridAddEditBeforeShowForm', [$('#'+frmgr), frmoper]);
					if(onBeforeShow) { onBeforeShow.call($t, $('#'+frmgr)); }
					$('#'+$.jgrid.jqID(IDs.themodal)).data('onClose',rp_ge[$t.p.id].onClose);
					$.jgrid.viewModal('#'+$.jgrid.jqID(IDs.themodal),{gbox:'#gbox_'+$.jgrid.jqID(gID),jqm:p.jqModal, jqM: false, overlay: p.overlay, modal:p.modal});
					if(!closeovrl) {
						$('.jqmOverlay').click(function(){
							if(!checkUpdates()) {return false;}
							$.jgrid.hideModal('#'+$.jgrid.jqID(IDs.themodal),{gb:'#gbox_'+$.jgrid.jqID(gID),jqm:p.jqModal, onClose: rp_ge[$t.p.id].onClose});
							return false;
						});
					}
					$($t).triggerHandler('jqGridAddEditAfterShowForm', [$('#'+frmgr), frmoper]);
					if(onAfterShow) { onAfterShow.call($t, $('#'+frmgr)); }
				} else {
					var dh = isNaN(p.dataheight) ? p.dataheight : p.dataheight+'px',
						dw = isNaN(p.datawidth) ? p.datawidth : p.datawidth+'px',
						frm = $('<form name=\'FormPost\' id=\''+frmgr+'\' class=\'FormGrid\' onSubmit=\'return false;\' style=\'width:'+dw+';overflow:auto;position:relative;height:'+dh+';\'></form>').data('disabled',false),
						tbl = $('<table id=\''+frmtborg+'\' class=\'EditTable\' cellspacing=\'0\' cellpadding=\'0\' border=\'0\'><tbody></tbody></table>');
					showFrm = $($t).triggerHandler('jqGridAddEditBeforeInitData', [$('#'+frmgr), frmoper]);
					if(showFrm === undefined) {
						showFrm = true;
					}
					if(showFrm && onBeforeInit) {
						showFrm = onBeforeInit.call($t,$('#'+frmgr));
					}
					if(showFrm === false) {return;}
					restoreInline();
					$($t.p.colModel).each( function() {
						var fmto = this.formoptions;
						maxCols = Math.max(maxCols, fmto ? fmto.colpos || 0 : 0 );
						maxRows = Math.max(maxRows, fmto ? fmto.rowpos || 0 : 0 );
					});
					$(frm).append(tbl);
					var flr = $('<tr id=\'FormError\' style=\'display:none\'><td class=\'ui-state-error\' colspan=\''+(maxCols*2)+'\'></td></tr>');
					flr[0].rp = 0;
					$(tbl).append(flr);
					//topinfo
					flr = $('<tr style=\'display:none\' class=\'tinfo\'><td class=\'topinfo\' colspan=\''+(maxCols*2)+'\'>'+rp_ge[$t.p.id].topinfo+'</td></tr>');
					flr[0].rp = 0;
					$(tbl).append(flr);
					// set the id.
					// use carefull only to change here colproperties.
					// create data
					var rtlb = $t.p.direction == 'rtl' ? true :false,
						bp = rtlb ? 'nData' : 'pData',
						bn = rtlb ? 'pData' : 'nData';
					createData(rowid,$t,tbl,maxCols);
					// buttons at footer
					var bP = '<a href=\'javascript:void(0)\' id=\''+bp+'\' class=\'fm-button ui-state-default ui-corner-left\'><span class=\'ui-icon ui-icon-triangle-1-w\'></span></a>',
						bN = '<a href=\'javascript:void(0)\' id=\''+bn+'\' class=\'fm-button ui-state-default ui-corner-right\'><span class=\'ui-icon ui-icon-triangle-1-e\'></span></a>',
						bS  ='<a href=\'javascript:void(0)\' id=\'sData\' class=\'fm-button ui-state-default ui-corner-all\'>'+p.bSubmit+'</a>',
						bC  ='<a href=\'javascript:void(0)\' id=\'cData\' class=\'fm-button ui-state-default ui-corner-all\'>'+p.bCancel+'</a>';
					var bt = '<table border=\'0\' cellspacing=\'0\' cellpadding=\'0\' class=\'EditTable\' id=\''+frmtborg+'_2\'><tbody><tr><td colspan=\'2\'><hr class=\'ui-widget-content\' style=\'margin:1px\'/></td></tr><tr id=\'Act_Buttons\'><td class=\'navButton\'>'+(rtlb ? bN+bP : bP+bN)+'</td><td class=\'EditButton\'>'+bS+bC+'</td></tr>';
					bt += '<tr style=\'display:none\' class=\'binfo\'><td class=\'bottominfo\' colspan=\'2\'>'+rp_ge[$t.p.id].bottominfo+'</td></tr>';
					bt += '</tbody></table>';
					if(maxRows >  0) {
						var sd=[];
						$.each($(tbl)[0].rows,function(i,r){
							sd[i] = r;
						});
						sd.sort(function(a,b){
							if(a.rp > b.rp) {return 1;}
							if(a.rp < b.rp) {return -1;}
							return 0;
						});
						$.each(sd, function(index, row) {
							$('tbody',tbl).append(row);
						});
					}
					p.gbox = '#gbox_'+$.jgrid.jqID(gID);
					var cle = false;
					if(p.closeOnEscape===true){
						p.closeOnEscape = false;
						cle = true;
					}
					var tms = $('<div></div>').append(frm).append(bt);
					$.jgrid.createModal(IDs,tms,p,'#gview_'+$.jgrid.jqID($t.p.id),$('#gbox_'+$.jgrid.jqID($t.p.id))[0]);
					if(rtlb) {
						$('#pData, #nData',frmtb+'_2').css('float','right');
						$('.EditButton',frmtb+'_2').css('text-align','left');
					}
					if(rp_ge[$t.p.id].topinfo) {$('.tinfo',frmtb).show();}
					if(rp_ge[$t.p.id].bottominfo) {$('.binfo',frmtb+'_2').show();}
					tms = null;bt=null;
					$('#'+$.jgrid.jqID(IDs.themodal)).keydown( function( e ) {
						var wkey = e.target;
						if ($('#'+frmgr).data('disabled')===true ) {return false;}//??
						if(rp_ge[$t.p.id].savekey[0] === true && e.which == rp_ge[$t.p.id].savekey[1]) { // save
							if(wkey.tagName != 'TEXTAREA') {
								$('#sData', frmtb+'_2').trigger('click');
								return false;
							}
						}
						if(e.which === 27) {
							if(!checkUpdates()) {return false;}
							if(cle)	{$.jgrid.hideModal('#'+$.jgrid.jqID(IDs.themodal),{gb:p.gbox,jqm:p.jqModal, onClose: rp_ge[$t.p.id].onClose});}
							return false;
						}
						if(rp_ge[$t.p.id].navkeys[0]===true) {
							if($('#id_g',frmtb).val() == '_empty') {return true;}
							if(e.which == rp_ge[$t.p.id].navkeys[1]){ //up
								$('#pData', frmtb+'_2').trigger('click');
								return false;
							}
							if(e.which == rp_ge[$t.p.id].navkeys[2]){ //down
								$('#nData', frmtb+'_2').trigger('click');
								return false;
							}
						}
					});
					if(p.checkOnUpdate) {
						$('a.ui-jqdialog-titlebar-close span','#'+$.jgrid.jqID(IDs.themodal)).removeClass('jqmClose');
						$('a.ui-jqdialog-titlebar-close','#'+$.jgrid.jqID(IDs.themodal)).unbind('click')
							.click(function(){
								if(!checkUpdates()) {return false;}
								$.jgrid.hideModal('#'+$.jgrid.jqID(IDs.themodal),{gb:'#gbox_'+$.jgrid.jqID(gID),jqm:p.jqModal,onClose: rp_ge[$t.p.id].onClose});
								return false;
							});
					}
					p.saveicon = $.extend([true,'left','ui-icon-disk'],p.saveicon);
					p.closeicon = $.extend([true,'left','ui-icon-close'],p.closeicon);
					// beforeinitdata after creation of the form
					if(p.saveicon[0]===true) {
						$('#sData',frmtb+'_2').addClass(p.saveicon[1] == 'right' ? 'fm-button-icon-right' : 'fm-button-icon-left')
							.append('<span class=\'ui-icon '+p.saveicon[2]+'\'></span>');
					}
					if(p.closeicon[0]===true) {
						$('#cData',frmtb+'_2').addClass(p.closeicon[1] == 'right' ? 'fm-button-icon-right' : 'fm-button-icon-left')
							.append('<span class=\'ui-icon '+p.closeicon[2]+'\'></span>');
					}
					if(rp_ge[$t.p.id].checkOnSubmit || rp_ge[$t.p.id].checkOnUpdate) {
						bS  ='<a href=\'javascript:void(0)\' id=\'sNew\' class=\'fm-button ui-state-default ui-corner-all\' style=\'z-index:1002\'>'+p.bYes+'</a>';
						bN  ='<a href=\'javascript:void(0)\' id=\'nNew\' class=\'fm-button ui-state-default ui-corner-all\' style=\'z-index:1002\'>'+p.bNo+'</a>';
						bC  ='<a href=\'javascript:void(0)\' id=\'cNew\' class=\'fm-button ui-state-default ui-corner-all\' style=\'z-index:1002\'>'+p.bExit+'</a>';
						var zI = p.zIndex  || 999;zI ++;
						$('<div class=\'ui-widget-overlay jqgrid-overlay confirm\' style=\'z-index:'+zI+';display:none;\'>&#160;'+'</div><div class=\'confirm ui-widget-content ui-jqconfirm\' style=\'z-index:'+(zI+1)+'\'>'+p.saveData+'<br/><br/>'+bS+bN+bC+'</div>').insertAfter('#'+frmgr);
						$('#sNew','#'+$.jgrid.jqID(IDs.themodal)).click(function(){
							postIt();
							$('#'+frmgr).data('disabled',false);
							$('.confirm','#'+$.jgrid.jqID(IDs.themodal)).hide();
							return false;
						});
						$('#nNew','#'+$.jgrid.jqID(IDs.themodal)).click(function(){
							$('.confirm','#'+$.jgrid.jqID(IDs.themodal)).hide();
							$('#'+frmgr).data('disabled',false);
							setTimeout(function(){$(':input','#'+frmgr)[0].focus();},0);
							return false;
						});
						$('#cNew','#'+$.jgrid.jqID(IDs.themodal)).click(function(){
							$('.confirm','#'+$.jgrid.jqID(IDs.themodal)).hide();
							$('#'+frmgr).data('disabled',false);
							$.jgrid.hideModal('#'+$.jgrid.jqID(IDs.themodal),{gb:'#gbox_'+$.jgrid.jqID(gID),jqm:p.jqModal,onClose: rp_ge[$t.p.id].onClose});
							return false;
						});
					}
					// here initform - only once
					$($t).triggerHandler('jqGridAddEditInitializeForm', [$('#'+frmgr), frmoper]);
					if(onInitializeForm) {onInitializeForm.call($t,$('#'+frmgr));}
					if(rowid=='_empty' || !rp_ge[$t.p.id].viewPagerButtons) {$('#pData,#nData',frmtb+'_2').hide();} else {$('#pData,#nData',frmtb+'_2').show();}
					$($t).triggerHandler('jqGridAddEditBeforeShowForm', [$('#'+frmgr), frmoper]);
					if(onBeforeShow) { onBeforeShow.call($t, $('#'+frmgr));}
					$('#'+$.jgrid.jqID(IDs.themodal)).data('onClose',rp_ge[$t.p.id].onClose);
					$.jgrid.viewModal('#'+$.jgrid.jqID(IDs.themodal),{gbox:'#gbox_'+$.jgrid.jqID(gID),jqm:p.jqModal, overlay: p.overlay,modal:p.modal});
					if(!closeovrl) {
						$('.jqmOverlay').click(function(){
							if(!checkUpdates()) {return false;}
							$.jgrid.hideModal('#'+$.jgrid.jqID(IDs.themodal),{gb:'#gbox_'+$.jgrid.jqID(gID),jqm:p.jqModal, onClose: rp_ge[$t.p.id].onClose});
							return false;
						});
					}
					$($t).triggerHandler('jqGridAddEditAfterShowForm', [$('#'+frmgr), frmoper]);
					if(onAfterShow) { onAfterShow.call($t, $('#'+frmgr)); }
					$('.fm-button','#'+$.jgrid.jqID(IDs.themodal)).hover(
						function(){$(this).addClass('ui-state-hover');},
						function(){$(this).removeClass('ui-state-hover');}
					);
					$('#sData', frmtb+'_2').click(function(){
						postdata = {};extpost={};
						$('#FormError',frmtb).hide();
						// all depend on ret array
						//ret[0] - succes
						//ret[1] - msg if not succes
						//ret[2] - the id  that will be set if reload after submit false
						getFormData();
						if(postdata[$t.p.id+'_id'] == '_empty')	{postIt();}
						else if(p.checkOnSubmit===true ) {
							newData = $.extend({},postdata,extpost);
							diff = compareData(newData,rp_ge[$t.p.id]._savedData);
							if(diff) {
								$('#'+frmgr).data('disabled',true);
								$('.confirm','#'+$.jgrid.jqID(IDs.themodal)).show();
							} else {
								postIt();
							}
						} else {
							postIt();
						}
						return false;
					});
					$('#cData', frmtb+'_2').click(function(){
						if(!checkUpdates()) {return false;}
						$.jgrid.hideModal('#'+$.jgrid.jqID(IDs.themodal),{gb:'#gbox_'+$.jgrid.jqID(gID),jqm:p.jqModal,onClose: rp_ge[$t.p.id].onClose});
						return false;
					});
					$('#nData', frmtb+'_2').click(function(){
						if(!checkUpdates()) {return false;}
						$('#FormError',frmtb).hide();
						var npos = getCurrPos();
						npos[0] = parseInt(npos[0],10);
						if(npos[0] != -1 && npos[1][npos[0]+1]) {
							$($t).triggerHandler('jqGridAddEditClickPgButtons', ['next',$('#'+frmgr),npos[1][npos[0]]]);
							var nposret;
							if($.isFunction(p.onclickPgButtons)) {
								nposret = p.onclickPgButtons.call($t, 'next',$('#'+frmgr),npos[1][npos[0]]);
								if( nposret !== undefined && nposret === false ) {return false;}
							}
							if( $('#'+$.jgrid.jqID(npos[1][npos[0]+1])).hasClass('ui-state-disabled')) {return false;}
							fillData(npos[1][npos[0]+1],$t,frmgr);
							$($t).jqGrid('setSelection',npos[1][npos[0]+1]);
							$($t).triggerHandler('jqGridAddEditAfterClickPgButtons', ['next',$('#'+frmgr),npos[1][npos[0]]]);
							if($.isFunction(p.afterclickPgButtons)) {
								p.afterclickPgButtons.call($t, 'next',$('#'+frmgr),npos[1][npos[0]+1]);
							}
							updateNav(npos[0]+1,npos);
						}
						return false;
					});
					$('#pData', frmtb+'_2').click(function(){
						if(!checkUpdates()) {return false;}
						$('#FormError',frmtb).hide();
						var ppos = getCurrPos();
						if(ppos[0] != -1 && ppos[1][ppos[0]-1]) {
							$($t).triggerHandler('jqGridAddEditClickPgButtons', ['prev',$('#'+frmgr),ppos[1][ppos[0]]]);
							var pposret;
							if($.isFunction(p.onclickPgButtons)) {
								pposret = p.onclickPgButtons.call($t, 'prev',$('#'+frmgr),ppos[1][ppos[0]]);
								if( pposret !== undefined && pposret === false ) {return false;}
							}
							if( $('#'+$.jgrid.jqID(ppos[1][ppos[0]-1])).hasClass('ui-state-disabled')) {return false;}
							fillData(ppos[1][ppos[0]-1],$t,frmgr);
							$($t).jqGrid('setSelection',ppos[1][ppos[0]-1]);
							$($t).triggerHandler('jqGridAddEditAfterClickPgButtons', ['prev',$('#'+frmgr),ppos[1][ppos[0]]]);
							if($.isFunction(p.afterclickPgButtons)) {
								p.afterclickPgButtons.call($t, 'prev',$('#'+frmgr),ppos[1][ppos[0]-1]);
							}
							updateNav(ppos[0]-1,ppos);
						}
						return false;
					});
				}
				var posInit =getCurrPos();
				updateNav(posInit[0],posInit);

			});
		},
		viewGridRow : function(rowid, p){
			p = $.extend(true, {
				top : 0,
				left: 0,
				width: 0,
				datawidth: 'auto',
				height: 'auto',
				dataheight: 'auto',
				modal: false,
				overlay: 30,
				drag: true,
				resize: true,
				jqModal: true,
				closeOnEscape : false,
				labelswidth: '30%',
				closeicon: [],
				navkeys: [false,38,40],
				onClose: null,
				beforeShowForm : null,
				beforeInitData : null,
				viewPagerButtons : true
			}, $.jgrid.view, p || {});
			rp_ge[$(this)[0].p.id] = p;
			return this.each(function(){
				var $t = this;
				if (!$t.grid || !rowid) {return;}
				var gID = $t.p.id,
					frmgr = 'ViewGrid_'+$.jgrid.jqID( gID  ), frmtb = 'ViewTbl_' + $.jgrid.jqID( gID ),
					frmgr_id = 'ViewGrid_'+gID, frmtb_id = 'ViewTbl_'+gID,
					IDs = {themodal:'viewmod'+gID,modalhead:'viewhd'+gID,modalcontent:'viewcnt'+gID, scrollelm : frmgr},
					onBeforeInit = $.isFunction(rp_ge[$t.p.id].beforeInitData) ? rp_ge[$t.p.id].beforeInitData : false,
					showFrm = true,
					maxCols = 1, maxRows=0;
				function focusaref(){ //Sfari 3 issues
					if(rp_ge[$t.p.id].closeOnEscape===true || rp_ge[$t.p.id].navkeys[0]===true) {
						setTimeout(function(){$('.ui-jqdialog-titlebar-close','#'+$.jgrid.jqID(IDs.modalhead)).focus();},0);
					}
				}
				function createData(rowid,obj,tb,maxcols){
					var nm, hc,trdata, cnt=0,tmp, dc, retpos=[], ind=false, i,
						tdtmpl = '<td class=\'CaptionTD form-view-label ui-widget-content\' width=\''+p.labelswidth+'\'>&#160;</td><td class=\'DataTD form-view-data ui-helper-reset ui-widget-content\'>&#160;</td>', tmpl='',
						tdtmpl2 = '<td class=\'CaptionTD form-view-label ui-widget-content\'>&#160;</td><td class=\'DataTD form-view-data ui-widget-content\'>&#160;</td>',
						fmtnum = ['integer','number','currency'],max1 =0, max2=0 ,maxw,setme, viewfld;
					for (i=1;i<=maxcols;i++) {
						tmpl += i == 1 ? tdtmpl : tdtmpl2;
					}
					// find max number align rigth with property formatter
					$(obj.p.colModel).each( function() {
						if(this.editrules && this.editrules.edithidden === true) {
							hc = false;
						} else {
							hc = this.hidden === true ? true : false;
						}
						if(!hc && this.align==='right') {
							if(this.formatter && $.inArray(this.formatter,fmtnum) !== -1 ) {
								max1 = Math.max(max1,parseInt(this.width,10));
							} else {
								max2 = Math.max(max2,parseInt(this.width,10));
							}
						}
					});
					maxw  = max1 !==0 ? max1 : max2 !==0 ? max2 : 0;
					ind = $(obj).jqGrid('getInd',rowid);
					$(obj.p.colModel).each( function(i) {
						nm = this.name;
						setme = false;
						// hidden fields are included in the form
						if(this.editrules && this.editrules.edithidden === true) {
							hc = false;
						} else {
							hc = this.hidden === true ? true : false;
						}
						dc = hc ? 'style=\'display:none\'' : '';
						viewfld = (typeof this.viewable !== 'boolean') ? true : this.viewable;
						if ( nm !== 'cb' && nm !== 'subgrid' && nm !== 'rn' && viewfld) {
							if(ind === false) {
								tmp = '';
							} else {
								if(nm == obj.p.ExpandColumn && obj.p.treeGrid === true) {
									tmp = $('td:eq('+i+')',obj.rows[ind]).text();
								} else {
									tmp = $('td:eq('+i+')',obj.rows[ind]).html();
								}
							}
							setme = this.align === 'right' && maxw !==0 ? true : false;
							var frmopt = $.extend({},{rowabove:false,rowcontent:''}, this.formoptions || {}),
								rp = parseInt(frmopt.rowpos,10) || cnt+1,
								cp = parseInt((parseInt(frmopt.colpos,10) || 1)*2,10);
							if(frmopt.rowabove) {
								var newdata = $('<tr><td class=\'contentinfo\' colspan=\''+(maxcols*2)+'\'>'+frmopt.rowcontent+'</td></tr>');
								$(tb).append(newdata);
								newdata[0].rp = rp;
							}
							trdata = $(tb).find('tr[rowpos='+rp+']');
							if ( trdata.length===0 ) {
								trdata = $('<tr '+dc+' rowpos=\''+rp+'\'></tr>').addClass('FormData').attr('id','trv_'+nm);
								$(trdata).append(tmpl);
								$(tb).append(trdata);
								trdata[0].rp = rp;
							}
							$('td:eq('+(cp-2)+')',trdata[0]).html('<b>'+ (frmopt.label === undefined ? obj.p.colNames[i]: frmopt.label)+'</b>');
							$('td:eq('+(cp-1)+')',trdata[0]).append('<span>'+tmp+'</span>').attr('id','v_'+nm);
							if(setme){
								$('td:eq('+(cp-1)+') span',trdata[0]).css({'text-align':'right',width:maxw+'px'});
							}
							retpos[cnt] = i;
							cnt++;
						}
					});
					if( cnt > 0) {
						var idrow = $('<tr class=\'FormData\' style=\'display:none\'><td class=\'CaptionTD\'></td><td colspan=\''+ (maxcols*2-1)+'\' class=\'DataTD\'><input class=\'FormElement\' id=\'id_g\' type=\'text\' name=\'id\' value=\''+rowid+'\'/></td></tr>');
						idrow[0].rp = cnt+99;
						$(tb).append(idrow);
					}
					return retpos;
				}
				function fillData(rowid,obj){
					var nm, hc,cnt=0,tmp, opt,trv;
					trv = $(obj).jqGrid('getInd',rowid,true);
					if(!trv) {return;}
					$('td',trv).each( function(i) {
						nm = obj.p.colModel[i].name;
						// hidden fields are included in the form
						if(obj.p.colModel[i].editrules && obj.p.colModel[i].editrules.edithidden === true) {
							hc = false;
						} else {
							hc = obj.p.colModel[i].hidden === true ? true : false;
						}
						if ( nm !== 'cb' && nm !== 'subgrid' && nm !== 'rn') {
							if(nm == obj.p.ExpandColumn && obj.p.treeGrid === true) {
								tmp = $(this).text();
							} else {
								tmp = $(this).html();
							}
							opt = $.extend({},obj.p.colModel[i].editoptions || {});
							nm = $.jgrid.jqID('v_'+nm);
							$('#'+nm+' span','#'+frmtb).html(tmp);
							if (hc) {$('#'+nm,'#'+frmtb).parents('tr:first').hide();}
							cnt++;
						}
					});
					if(cnt>0) {$('#id_g','#'+frmtb).val(rowid);}
				}
				function updateNav(cr,posarr){
					var totr = posarr[1].length-1;
					if (cr===0) {
						$('#pData','#'+frmtb+'_2').addClass('ui-state-disabled');
					} else if( posarr[1][cr-1] !== undefined && $('#'+$.jgrid.jqID(posarr[1][cr-1])).hasClass('ui-state-disabled')) {
						$('#pData',frmtb+'_2').addClass('ui-state-disabled');
					} else {
						$('#pData','#'+frmtb+'_2').removeClass('ui-state-disabled');
					}
					if (cr==totr) {
						$('#nData','#'+frmtb+'_2').addClass('ui-state-disabled');
					} else if( posarr[1][cr+1] !== undefined && $('#'+$.jgrid.jqID(posarr[1][cr+1])).hasClass('ui-state-disabled')) {
						$('#nData',frmtb+'_2').addClass('ui-state-disabled');
					} else {
						$('#nData','#'+frmtb+'_2').removeClass('ui-state-disabled');
					}
				}
				function getCurrPos() {
					var rowsInGrid = $($t).jqGrid('getDataIDs'),
						selrow = $('#id_g','#'+frmtb).val(),
						pos = $.inArray(selrow,rowsInGrid);
					return [pos,rowsInGrid];
				}

				if ( $('#'+$.jgrid.jqID(IDs.themodal))[0] !== undefined ) {
					if(onBeforeInit) {
						showFrm = onBeforeInit.call($t,$('#'+frmgr));
						if(showFrm === undefined) {
							showFrm = true;
						}
					}
					if(showFrm === false) {return;}
					$('.ui-jqdialog-title','#'+$.jgrid.jqID(IDs.modalhead)).html(p.caption);
					$('#FormError','#'+frmtb).hide();
					fillData(rowid,$t);
					if($.isFunction(rp_ge[$t.p.id].beforeShowForm)) {rp_ge[$t.p.id].beforeShowForm.call($t,$('#'+frmgr));}
					$.jgrid.viewModal('#'+$.jgrid.jqID(IDs.themodal),{gbox:'#gbox_'+$.jgrid.jqID(gID),jqm:p.jqModal, jqM: false, overlay: p.overlay, modal:p.modal});
					focusaref();
				} else {
					var dh = isNaN(p.dataheight) ? p.dataheight : p.dataheight+'px',
						dw = isNaN(p.datawidth) ? p.datawidth : p.datawidth+'px',
						frm = $('<form name=\'FormPost\' id=\''+frmgr_id+'\' class=\'FormGrid\' style=\'width:'+dw+';overflow:auto;position:relative;height:'+dh+';\'></form>'),
						tbl =$('<table id=\''+frmtb_id+'\' class=\'EditTable\' cellspacing=\'1\' cellpadding=\'2\' border=\'0\' style=\'table-layout:fixed\'><tbody></tbody></table>');
					if(onBeforeInit) {
						showFrm = onBeforeInit.call($t,$('#'+frmgr));
						if(showFrm === undefined) {
							showFrm = true;
						}
					}
					if(showFrm === false) {return;}
					$($t.p.colModel).each( function() {
						var fmto = this.formoptions;
						maxCols = Math.max(maxCols, fmto ? fmto.colpos || 0 : 0 );
						maxRows = Math.max(maxRows, fmto ? fmto.rowpos || 0 : 0 );
					});
					// set the id.
					$(frm).append(tbl);
					createData(rowid, $t, tbl, maxCols);
					var rtlb = $t.p.direction == 'rtl' ? true :false,
						bp = rtlb ? 'nData' : 'pData',
						bn = rtlb ? 'pData' : 'nData',

						// buttons at footer
						bP = '<a href=\'javascript:void(0)\' id=\''+bp+'\' class=\'fm-button ui-state-default ui-corner-left\'><span class=\'ui-icon ui-icon-triangle-1-w\'></span></a>',
						bN = '<a href=\'javascript:void(0)\' id=\''+bn+'\' class=\'fm-button ui-state-default ui-corner-right\'><span class=\'ui-icon ui-icon-triangle-1-e\'></span></a>',
						bC  ='<a href=\'javascript:void(0)\' id=\'cData\' class=\'fm-button ui-state-default ui-corner-all\'>'+p.bClose+'</a>';
					if(maxRows >  0) {
						var sd=[];
						$.each($(tbl)[0].rows,function(i,r){
							sd[i] = r;
						});
						sd.sort(function(a,b){
							if(a.rp > b.rp) {return 1;}
							if(a.rp < b.rp) {return -1;}
							return 0;
						});
						$.each(sd, function(index, row) {
							$('tbody',tbl).append(row);
						});
					}
					p.gbox = '#gbox_'+$.jgrid.jqID(gID);
					var bt = $('<div></div>').append(frm).append('<table border=\'0\' class=\'EditTable\' id=\''+frmtb+'_2\'><tbody><tr id=\'Act_Buttons\'><td class=\'navButton\' width=\''+p.labelswidth+'\'>'+(rtlb ? bN+bP : bP+bN)+'</td><td class=\'EditButton\'>'+bC+'</td></tr></tbody></table>');
					$.jgrid.createModal(IDs,bt,p,'#gview_'+$.jgrid.jqID($t.p.id),$('#gview_'+$.jgrid.jqID($t.p.id))[0]);
					if(rtlb) {
						$('#pData, #nData','#'+frmtb+'_2').css('float','right');
						$('.EditButton','#'+frmtb+'_2').css('text-align','left');
					}
					if(!p.viewPagerButtons) {$('#pData, #nData','#'+frmtb+'_2').hide();}
					bt = null;
					$('#'+IDs.themodal).keydown( function( e ) {
						if(e.which === 27) {
							if(rp_ge[$t.p.id].closeOnEscape) {$.jgrid.hideModal('#'+$.jgrid.jqID(IDs.themodal),{gb:p.gbox,jqm:p.jqModal, onClose: p.onClose});}
							return false;
						}
						if(p.navkeys[0]===true) {
							if(e.which === p.navkeys[1]){ //up
								$('#pData', '#'+frmtb+'_2').trigger('click');
								return false;
							}
							if(e.which === p.navkeys[2]){ //down
								$('#nData', '#'+frmtb+'_2').trigger('click');
								return false;
							}
						}
					});
					p.closeicon = $.extend([true,'left','ui-icon-close'],p.closeicon);
					if(p.closeicon[0]===true) {
						$('#cData','#'+frmtb+'_2').addClass(p.closeicon[1] == 'right' ? 'fm-button-icon-right' : 'fm-button-icon-left')
							.append('<span class=\'ui-icon '+p.closeicon[2]+'\'></span>');
					}
					if($.isFunction(p.beforeShowForm)) {p.beforeShowForm.call($t,$('#'+frmgr));}
					$.jgrid.viewModal('#'+$.jgrid.jqID(IDs.themodal),{gbox:'#gbox_'+$.jgrid.jqID(gID),jqm:p.jqModal,overlay: p.overlay, modal:p.modal});
					$('.fm-button:not(.ui-state-disabled)','#'+frmtb+'_2').hover(
						function(){$(this).addClass('ui-state-hover');},
						function(){$(this).removeClass('ui-state-hover');}
					);
					focusaref();
					$('#cData', '#'+frmtb+'_2').click(function(){
						$.jgrid.hideModal('#'+$.jgrid.jqID(IDs.themodal),{gb:'#gbox_'+$.jgrid.jqID(gID),jqm:p.jqModal, onClose: p.onClose});
						return false;
					});
					$('#nData', '#'+frmtb+'_2').click(function(){
						$('#FormError','#'+frmtb).hide();
						var npos = getCurrPos();
						npos[0] = parseInt(npos[0],10);
						if(npos[0] != -1 && npos[1][npos[0]+1]) {
							if($.isFunction(p.onclickPgButtons)) {
								p.onclickPgButtons.call($t,'next',$('#'+frmgr),npos[1][npos[0]]);
							}
							fillData(npos[1][npos[0]+1],$t);
							$($t).jqGrid('setSelection',npos[1][npos[0]+1]);
							if($.isFunction(p.afterclickPgButtons)) {
								p.afterclickPgButtons.call($t,'next',$('#'+frmgr),npos[1][npos[0]+1]);
							}
							updateNav(npos[0]+1,npos);
						}
						focusaref();
						return false;
					});
					$('#pData', '#'+frmtb+'_2').click(function(){
						$('#FormError','#'+frmtb).hide();
						var ppos = getCurrPos();
						if(ppos[0] != -1 && ppos[1][ppos[0]-1]) {
							if($.isFunction(p.onclickPgButtons)) {
								p.onclickPgButtons.call($t,'prev',$('#'+frmgr),ppos[1][ppos[0]]);
							}
							fillData(ppos[1][ppos[0]-1],$t);
							$($t).jqGrid('setSelection',ppos[1][ppos[0]-1]);
							if($.isFunction(p.afterclickPgButtons)) {
								p.afterclickPgButtons.call($t,'prev',$('#'+frmgr),ppos[1][ppos[0]-1]);
							}
							updateNav(ppos[0]-1,ppos);
						}
						focusaref();
						return false;
					});
				}
				var posInit =getCurrPos();
				updateNav(posInit[0],posInit);
			});
		},
		delGridRow : function(rowids,p) {
			p = $.extend(true, {
				top : 0,
				left: 0,
				width: 240,
				height: 'auto',
				dataheight : 'auto',
				modal: false,
				overlay: 30,
				drag: true,
				resize: true,
				url : '',
				mtype : 'POST',
				reloadAfterSubmit: true,
				beforeShowForm: null,
				beforeInitData : null,
				afterShowForm: null,
				beforeSubmit: null,
				onclickSubmit: null,
				afterSubmit: null,
				jqModal : true,
				closeOnEscape : false,
				delData: {},
				delicon : [],
				cancelicon : [],
				onClose : null,
				ajaxDelOptions : {},
				processing : false,
				serializeDelData : null,
				useDataProxy : false
			}, $.jgrid.del, p ||{});
			rp_ge[$(this)[0].p.id] = p;
			return this.each(function(){
				var $t = this;
				if (!$t.grid ) {return;}
				if(!rowids) {return;}
				var onBeforeShow = $.isFunction( rp_ge[$t.p.id].beforeShowForm  ),
					onAfterShow = $.isFunction( rp_ge[$t.p.id].afterShowForm ),
					onBeforeInit = $.isFunction(rp_ge[$t.p.id].beforeInitData) ? rp_ge[$t.p.id].beforeInitData : false,
					gID = $t.p.id, onCS = {},
					showFrm = true,
					dtbl = 'DelTbl_'+$.jgrid.jqID(gID),postd, idname, opers, oper,
					dtbl_id = 'DelTbl_' + gID,
					IDs = {themodal:'delmod'+gID,modalhead:'delhd'+gID,modalcontent:'delcnt'+gID, scrollelm: dtbl};
				if ($.isArray(rowids)) {rowids = rowids.join();}
				if ( $('#'+$.jgrid.jqID(IDs.themodal))[0] !== undefined ) {
					if(onBeforeInit) {
						showFrm = onBeforeInit.call($t,$('#'+dtbl));
						if(showFrm === undefined) {
							showFrm = true;
						}
					}
					if(showFrm === false) {return;}
					$('#DelData>td','#'+dtbl).text(rowids);
					$('#DelError','#'+dtbl).hide();
					if( rp_ge[$t.p.id].processing === true) {
						rp_ge[$t.p.id].processing=false;
						$('#dData', '#'+dtbl).removeClass('ui-state-active');
					}
					if(onBeforeShow) {rp_ge[$t.p.id].beforeShowForm.call($t,$('#'+dtbl));}
					$.jgrid.viewModal('#'+$.jgrid.jqID(IDs.themodal),{gbox:'#gbox_'+$.jgrid.jqID(gID),jqm:rp_ge[$t.p.id].jqModal,jqM: false, overlay: rp_ge[$t.p.id].overlay, modal:rp_ge[$t.p.id].modal});
					if(onAfterShow) {rp_ge[$t.p.id].afterShowForm.call($t,$('#'+dtbl));}
				} else {
					var dh = isNaN(rp_ge[$t.p.id].dataheight) ? rp_ge[$t.p.id].dataheight : rp_ge[$t.p.id].dataheight+'px',
						dw = isNaN(p.datawidth) ? p.datawidth : p.datawidth+'px',
						tbl = '<div id=\''+dtbl_id+'\' class=\'formdata\' style=\'width:'+dw+';overflow:auto;position:relative;height:'+dh+';\'>';
					tbl += '<table class=\'DelTable\'><tbody>';
					// error data
					tbl += '<tr id=\'DelError\' style=\'display:none\'><td class=\'ui-state-error\'></td></tr>';
					tbl += '<tr id=\'DelData\' style=\'display:none\'><td >'+rowids+'</td></tr>';
					tbl += '<tr><td class="delmsg" style="white-space:pre;">'+rp_ge[$t.p.id].msg+'</td></tr><tr><td >&#160;</td></tr>';
					// buttons at footer
					tbl += '</tbody></table></div>';
					var bS  = '<a href=\'javascript:void(0)\' id=\'dData\' class=\'fm-button ui-state-default ui-corner-all\'>'+p.bSubmit+'</a>',
						bC  = '<a href=\'javascript:void(0)\' id=\'eData\' class=\'fm-button ui-state-default ui-corner-all\'>'+p.bCancel+'</a>';
					tbl += '<table cellspacing=\'0\' cellpadding=\'0\' border=\'0\' class=\'EditTable\' id=\''+dtbl+'_2\'><tbody><tr><td><hr class=\'ui-widget-content\' style=\'margin:1px\'/></td></tr><tr><td class=\'DelButton EditButton\'>'+bS+'&#160;'+bC+'</td></tr></tbody></table>';
					p.gbox = '#gbox_'+$.jgrid.jqID(gID);
					$.jgrid.createModal(IDs,tbl,p,'#gview_'+$.jgrid.jqID($t.p.id),$('#gview_'+$.jgrid.jqID($t.p.id))[0]);

					if(onBeforeInit) {
						showFrm = onBeforeInit.call($t,$('#'+dtbl));
						if(showFrm === undefined) {
							showFrm = true;
						}
					}
					if(showFrm === false) {return;}

					$('.fm-button','#'+dtbl+'_2').hover(
						function(){$(this).addClass('ui-state-hover');},
						function(){$(this).removeClass('ui-state-hover');}
					);
					p.delicon = $.extend([true,'left','ui-icon-scissors'],rp_ge[$t.p.id].delicon);
					p.cancelicon = $.extend([true,'left','ui-icon-cancel'],rp_ge[$t.p.id].cancelicon);
					if(p.delicon[0]===true) {
						$('#dData','#'+dtbl+'_2').addClass(p.delicon[1] == 'right' ? 'fm-button-icon-right' : 'fm-button-icon-left')
							.append('<span class=\'ui-icon '+p.delicon[2]+'\'></span>');
					}
					if(p.cancelicon[0]===true) {
						$('#eData','#'+dtbl+'_2').addClass(p.cancelicon[1] == 'right' ? 'fm-button-icon-right' : 'fm-button-icon-left')
							.append('<span class=\'ui-icon '+p.cancelicon[2]+'\'></span>');
					}
					$('#dData','#'+dtbl+'_2').click(function(){
						var ret=[true,''], pk,
							postdata = $('#DelData>td','#'+dtbl).text(); //the pair is name=val1,val2,...
						onCS = {};
						if( $.isFunction( rp_ge[$t.p.id].onclickSubmit ) ) {onCS = rp_ge[$t.p.id].onclickSubmit.call($t,rp_ge[$t.p.id], postdata) || {};}
						if( $.isFunction( rp_ge[$t.p.id].beforeSubmit ) ) {ret = rp_ge[$t.p.id].beforeSubmit.call($t,postdata);}
						if(ret[0] && !rp_ge[$t.p.id].processing) {
							rp_ge[$t.p.id].processing = true;
							opers = $t.p.prmNames;
							postd = $.extend({},rp_ge[$t.p.id].delData, onCS);
							oper = opers.oper;
							postd[oper] = opers.deloper;
							idname = opers.id;
							postdata = String(postdata).split(',');
							if(!postdata.length) { return false; }
							for(pk in postdata) {
								if(postdata.hasOwnProperty(pk)) {
									postdata[pk] = $.jgrid.stripPref($t.p.idPrefix, postdata[pk]);
								}
							}
							postd[idname] = postdata.join();
							$(this).addClass('ui-state-active');
							var ajaxOptions = $.extend({
								url: rp_ge[$t.p.id].url || $($t).jqGrid('getGridParam','editurl'),
								type: rp_ge[$t.p.id].mtype,
								data: $.isFunction(rp_ge[$t.p.id].serializeDelData) ? rp_ge[$t.p.id].serializeDelData.call($t,postd) : postd,
								complete:function(data,status){
									var i;
									if(status != 'success') {
										ret[0] = false;
										if ($.isFunction(rp_ge[$t.p.id].errorTextFormat)) {
											ret[1] = rp_ge[$t.p.id].errorTextFormat.call($t,data);
										} else {
											ret[1] = status + ' Status: \'' + data.statusText + '\'. Error code: ' + data.status;
										}
									} else {
									// data is posted successful
									// execute aftersubmit with the returned data from server
										if( $.isFunction( rp_ge[$t.p.id].afterSubmit ) ) {
											ret = rp_ge[$t.p.id].afterSubmit.call($t,data,postd);
										}
									}
									if(ret[0] === false) {
										$('#DelError>td','#'+dtbl).html(ret[1]);
										$('#DelError','#'+dtbl).show();
									} else {
										if(rp_ge[$t.p.id].reloadAfterSubmit && $t.p.datatype != 'local') {
											$($t).trigger('reloadGrid');
										} else {
											if($t.p.treeGrid===true){
												try {$($t).jqGrid('delTreeNode',$t.p.idPrefix+postdata[0]);} catch(e){}
											} else {
												for(i=0;i<postdata.length;i++) {
													$($t).jqGrid('delRowData',$t.p.idPrefix+ postdata[i]);
												}
											}
											$t.p.selrow = null;
											$t.p.selarrrow = [];
										}
										if($.isFunction(rp_ge[$t.p.id].afterComplete)) {
											setTimeout(function(){rp_ge[$t.p.id].afterComplete.call($t,data,postdata);},500);
										}
									}
									rp_ge[$t.p.id].processing=false;
									$('#dData', '#'+dtbl+'_2').removeClass('ui-state-active');
									if(ret[0]) {$.jgrid.hideModal('#'+$.jgrid.jqID(IDs.themodal),{gb:'#gbox_'+$.jgrid.jqID(gID),jqm:p.jqModal, onClose: rp_ge[$t.p.id].onClose});}
								}
							}, $.jgrid.ajaxOptions, rp_ge[$t.p.id].ajaxDelOptions);


							if (!ajaxOptions.url && !rp_ge[$t.p.id].useDataProxy) {
								if ($.isFunction($t.p.dataProxy)) {
									rp_ge[$t.p.id].useDataProxy = true;
								} else {
									ret[0]=false;ret[1] += ' '+$.jgrid.errors.nourl;
								}
							}
							if (ret[0]) {
								if (rp_ge[$t.p.id].useDataProxy) {
									var dpret = $t.p.dataProxy.call($t, ajaxOptions, 'del_'+$t.p.id);
									if(dpret === undefined) {
										dpret = [true, ''];
									}
									if(dpret[0] === false ) {
										ret[0] = false;
										ret[1] = dpret[1] || 'Error deleting the selected row!' ;
									} else {
										$.jgrid.hideModal('#'+$.jgrid.jqID(IDs.themodal),{gb:'#gbox_'+$.jgrid.jqID(gID),jqm:p.jqModal, onClose: rp_ge[$t.p.id].onClose});
									}
								}
								else {$.ajax(ajaxOptions);}
							}
						}

						if(ret[0] === false) {
							$('#DelError>td','#'+dtbl).html(ret[1]);
							$('#DelError','#'+dtbl).show();
						}
						return false;
					});
					$('#eData', '#'+dtbl+'_2').click(function(){
						$.jgrid.hideModal('#'+$.jgrid.jqID(IDs.themodal),{gb:'#gbox_'+$.jgrid.jqID(gID),jqm:rp_ge[$t.p.id].jqModal, onClose: rp_ge[$t.p.id].onClose});
						return false;
					});
					if(onBeforeShow) {rp_ge[$t.p.id].beforeShowForm.call($t,$('#'+dtbl));}
					$.jgrid.viewModal('#'+$.jgrid.jqID(IDs.themodal),{gbox:'#gbox_'+$.jgrid.jqID(gID),jqm:rp_ge[$t.p.id].jqModal, overlay: rp_ge[$t.p.id].overlay, modal:rp_ge[$t.p.id].modal});
					if(onAfterShow) {rp_ge[$t.p.id].afterShowForm.call($t,$('#'+dtbl));}
				}
				if(rp_ge[$t.p.id].closeOnEscape===true) {
					setTimeout(function(){$('.ui-jqdialog-titlebar-close','#'+$.jgrid.jqID(IDs.modalhead)).focus();},0);
				}
			});
		},
		navGrid : function (elem, o, pEdit,pAdd,pDel,pSearch, pView) {
			o = $.extend({
				edit: true,
				editicon: 'ui-icon-pencil',
				add: true,
				addicon:'ui-icon-plus',
				del: true,
				delicon:'ui-icon-trash',
				search: true,
				searchicon:'ui-icon-search',
				refresh: true,
				refreshicon:'ui-icon-refresh',
				refreshstate: 'firstpage',
				view: false,
				viewicon : 'ui-icon-document',
				position : 'left',
				closeOnEscape : true,
				beforeRefresh : null,
				afterRefresh : null,
				cloneToTop : false,
				alertwidth : 200,
				alertheight : 'auto',
				alerttop: null,
				alertleft: null,
				alertzIndex : null
			}, $.jgrid.nav, o ||{});
			return this.each(function() {
				if(this.nav) {return;}
				var alertIDs = {themodal: 'alertmod_' + this.p.id, modalhead: 'alerthd_' + this.p.id,modalcontent: 'alertcnt_' + this.p.id},
					$t = this, twd, tdw;
				if(!$t.grid || typeof elem !== 'string') {return;}
				if ($('#'+alertIDs.themodal)[0] === undefined) {
					if(!o.alerttop && !o.alertleft) {
						if (window.innerWidth !== undefined) {
							o.alertleft = window.innerWidth;
							o.alerttop = window.innerHeight;
						} else if (document.documentElement !== undefined && document.documentElement.clientWidth !== undefined && document.documentElement.clientWidth !== 0) {
							o.alertleft = document.documentElement.clientWidth;
							o.alerttop = document.documentElement.clientHeight;
						} else {
							o.alertleft=1024;
							o.alerttop=768;
						}
						o.alertleft = o.alertleft/2 - parseInt(o.alertwidth,10)/2;
						o.alerttop = o.alerttop/2-25;
					}
					$.jgrid.createModal(alertIDs,
						'<div>'+o.alerttext+'</div><span tabindex=\'0\'><span tabindex=\'-1\' id=\'jqg_alrt\'></span></span>',
						{
							gbox:'#gbox_'+$.jgrid.jqID($t.p.id),
							jqModal:true,
							drag:true,
							resize:true,
							caption:o.alertcap,
							top:o.alerttop,
							left:o.alertleft,
							width:o.alertwidth,
							height: o.alertheight,
							closeOnEscape:o.closeOnEscape,
							zIndex: o.alertzIndex
						},
						'#gview_'+$.jgrid.jqID($t.p.id),
						$('#gbox_'+$.jgrid.jqID($t.p.id))[0],
						true
					);
				}
				var clone = 1, i,
					onHoverIn = function () {
						if (!$(this).hasClass('ui-state-disabled')) {
							$(this).addClass('ui-state-hover');
						}
					},
					onHoverOut = function () {
						$(this).removeClass('ui-state-hover');
					};
				if(o.cloneToTop && $t.p.toppager) {clone = 2;}
				for(i = 0; i<clone; i++) {
					var tbd,
						navtbl = $('<table cellspacing=\'0\' cellpadding=\'0\' border=\'0\' class=\'ui-pg-table navtable\' style=\'float:left;table-layout:auto;\'><tbody><tr></tr></tbody></table>'),
						sep = '<td class=\'ui-pg-button ui-state-disabled\' style=\'width:4px;\'><span class=\'ui-separator\'></span></td>',
						pgid, elemids;
					if(i===0) {
						pgid = elem;
						elemids = $t.p.id;
						if(pgid == $t.p.toppager) {
							elemids += '_top';
							clone = 1;
						}
					} else {
						pgid = $t.p.toppager;
						elemids = $t.p.id+'_top';
					}
					if($t.p.direction == 'rtl') {$(navtbl).attr('dir','rtl').css('float','right');}
					if (o.add) {
						pAdd = pAdd || {};
						tbd = $('<td class=\'ui-pg-button ui-corner-all\'></td>');
						$(tbd).append('<div class=\'ui-pg-div\'><span class=\'ui-icon '+o.addicon+'\'></span>'+o.addtext+'</div>');
						$('tr',navtbl).append(tbd);
						$(tbd,navtbl)
							.attr({'title':o.addtitle || '',id : pAdd.id || 'add_'+elemids})
							.click(function(){
								if (!$(this).hasClass('ui-state-disabled')) {
									if ($.isFunction( o.addfunc )) {
										o.addfunc.call($t);
									} else {
										$($t).jqGrid('editGridRow','new',pAdd);
									}
								}
								return false;
							}).hover(onHoverIn, onHoverOut);
						tbd = null;
					}
					if (o.edit) {
						tbd = $('<td class=\'ui-pg-button ui-corner-all\'></td>');
						pEdit = pEdit || {};
						$(tbd).append('<div class=\'ui-pg-div\'><span class=\'ui-icon '+o.editicon+'\'></span>'+o.edittext+'</div>');
						$('tr',navtbl).append(tbd);
						$(tbd,navtbl)
							.attr({'title':o.edittitle || '',id: pEdit.id || 'edit_'+elemids})
							.click(function(){
								if (!$(this).hasClass('ui-state-disabled')) {
									var sr = $t.p.selrow;
									if (sr) {
										if($.isFunction( o.editfunc ) ) {
											o.editfunc.call($t, sr);
										} else {
											$($t).jqGrid('editGridRow',sr,pEdit);
										}
									} else {
										$.jgrid.viewModal('#'+alertIDs.themodal,{gbox:'#gbox_'+$.jgrid.jqID($t.p.id),jqm:true});
										$('#jqg_alrt').focus();
									}
								}
								return false;
							}).hover(onHoverIn, onHoverOut);
						tbd = null;
					}
					if (o.view) {
						tbd = $('<td class=\'ui-pg-button ui-corner-all\'></td>');
						pView = pView || {};
						$(tbd).append('<div class=\'ui-pg-div\'><span class=\'ui-icon '+o.viewicon+'\'></span>'+o.viewtext+'</div>');
						$('tr',navtbl).append(tbd);
						$(tbd,navtbl)
							.attr({'title':o.viewtitle || '',id: pView.id || 'view_'+elemids})
							.click(function(){
								if (!$(this).hasClass('ui-state-disabled')) {
									var sr = $t.p.selrow;
									if (sr) {
										if($.isFunction( o.viewfunc ) ) {
											o.viewfunc.call($t, sr);
										} else {
											$($t).jqGrid('viewGridRow',sr,pView);
										}
									} else {
										$.jgrid.viewModal('#'+alertIDs.themodal,{gbox:'#gbox_'+$.jgrid.jqID($t.p.id),jqm:true});
										$('#jqg_alrt').focus();
									}
								}
								return false;
							}).hover(onHoverIn, onHoverOut);
						tbd = null;
					}
					if (o.del) {
						tbd = $('<td class=\'ui-pg-button ui-corner-all\'></td>');
						pDel = pDel || {};
						$(tbd).append('<div class=\'ui-pg-div\'><span class=\'ui-icon '+o.delicon+'\'></span>'+o.deltext+'</div>');
						$('tr',navtbl).append(tbd);
						$(tbd,navtbl)
							.attr({'title':o.deltitle || '',id: pDel.id || 'del_'+elemids})
							.click(function(){
								if (!$(this).hasClass('ui-state-disabled')) {
									var dr;
									if($t.p.multiselect) {
										dr = $t.p.selarrrow;
										if(dr.length===0) {dr = null;}
									} else {
										dr = $t.p.selrow;
									}
									if(dr){
										if($.isFunction( o.delfunc )){
											o.delfunc.call($t, dr);
										}else{
											$($t).jqGrid('delGridRow',dr,pDel);
										}
									} else  {
										$.jgrid.viewModal('#'+alertIDs.themodal,{gbox:'#gbox_'+$.jgrid.jqID($t.p.id),jqm:true});$('#jqg_alrt').focus();
									}
								}
								return false;
							}).hover(onHoverIn, onHoverOut);
						tbd = null;
					}
					if(o.add || o.edit || o.del || o.view) {$('tr',navtbl).append(sep);}
					if (o.search) {
						tbd = $('<td class=\'ui-pg-button ui-corner-all\'></td>');
						pSearch = pSearch || {};
						$(tbd).append('<div class=\'ui-pg-div\'><span class=\'ui-icon '+o.searchicon+'\'></span>'+o.searchtext+'</div>');
						$('tr',navtbl).append(tbd);
						$(tbd,navtbl)
							.attr({'title':o.searchtitle  || '',id:pSearch.id || 'search_'+elemids})
							.click(function(){
								if (!$(this).hasClass('ui-state-disabled')) {
									if($.isFunction( o.searchfunc )) {
										o.searchfunc.call($t, pSearch);
									} else {
										$($t).jqGrid('searchGrid',pSearch);
									}
								}
								return false;
							}).hover(onHoverIn, onHoverOut);
						if (pSearch.showOnLoad && pSearch.showOnLoad === true) {
							$(tbd,navtbl).click();
						}
						tbd = null;
					}
					if (o.refresh) {
						tbd = $('<td class=\'ui-pg-button ui-corner-all\'></td>');
						$(tbd).append('<div class=\'ui-pg-div\'><span class=\'ui-icon '+o.refreshicon+'\'></span>'+o.refreshtext+'</div>');
						$('tr',navtbl).append(tbd);
						$(tbd,navtbl)
							.attr({'title':o.refreshtitle  || '',id: 'refresh_'+elemids})
							.click(function(){
								if (!$(this).hasClass('ui-state-disabled')) {
									if($.isFunction(o.beforeRefresh)) {o.beforeRefresh.call($t);}
									$t.p.search = false;
									try {
										var gID = $t.p.id;
										$t.p.postData.filters ='';
										$('#fbox_'+$.jgrid.jqID(gID)).jqFilter('resetFilter');
										if($.isFunction($t.clearToolbar)) {$t.clearToolbar.call($t,false);}
									} catch (e) {}
									switch (o.refreshstate) {
									case 'firstpage':
										$($t).trigger('reloadGrid', [{page:1}]);
										break;
									case 'current':
										$($t).trigger('reloadGrid', [{current:true}]);
										break;
									}
									if($.isFunction(o.afterRefresh)) {o.afterRefresh.call($t);}
								}
								return false;
							}).hover(onHoverIn, onHoverOut);
						tbd = null;
					}
					tdw = $('.ui-jqgrid').css('font-size') || '11px';
					$('body').append('<div id=\'testpg2\' class=\'ui-jqgrid ui-widget ui-widget-content\' style=\'font-size:'+tdw+';visibility:hidden;\' ></div>');
					twd = $(navtbl).clone().appendTo('#testpg2').width();
					$('#testpg2').remove();
					$(pgid+'_'+o.position,pgid).append(navtbl);
					if($t.p._nvtd) {
						if(twd > $t.p._nvtd[0] ) {
							$(pgid+'_'+o.position,pgid).width(twd);
							$t.p._nvtd[0] = twd;
						}
						$t.p._nvtd[1] = twd;
					}
					tdw =null;twd=null;navtbl =null;
					this.nav = true;
				}
			});
		},
		navButtonAdd : function (elem, p) {
			p = $.extend({
				caption : 'newButton',
				title: '',
				buttonicon : 'ui-icon-newwin',
				onClickButton: null,
				position : 'last',
				cursor : 'pointer'
			}, p ||{});
			return this.each(function() {
				if( !this.grid)  {return;}
				if( typeof elem === 'string' && elem.indexOf('#') !== 0) {elem = '#'+$.jgrid.jqID(elem);}
				var findnav = $('.navtable',elem)[0], $t = this;
				if (findnav) {
					if( p.id && $('#'+$.jgrid.jqID(p.id), findnav)[0] !== undefined )  {return;}
					var tbd = $('<td></td>');
					if(p.buttonicon.toString().toUpperCase() == 'NONE') {
						$(tbd).addClass('ui-pg-button ui-corner-all').append('<div class=\'ui-pg-div\'>'+p.caption+'</div>');
					} else	{
						$(tbd).addClass('ui-pg-button ui-corner-all').append('<div class=\'ui-pg-div\'><span class=\'ui-icon '+p.buttonicon+'\'></span>'+p.caption+'</div>');
					}
					if(p.id) {$(tbd).attr('id',p.id);}
					if(p.position=='first'){
						if(findnav.rows[0].cells.length ===0 ) {
							$('tr',findnav).append(tbd);
						} else {
							$('tr td:eq(0)',findnav).before(tbd);
						}
					} else {
						$('tr',findnav).append(tbd);
					}
					$(tbd,findnav)
						.attr('title',p.title  || '')
						.click(function(e){
							if (!$(this).hasClass('ui-state-disabled')) {
								if ($.isFunction(p.onClickButton) ) {p.onClickButton.call($t,e);}
							}
							return false;
						})
						.hover(
							function () {
								if (!$(this).hasClass('ui-state-disabled')) {
									$(this).addClass('ui-state-hover');
								}
							},
							function () {$(this).removeClass('ui-state-hover');}
						);
				}
			});
		},
		navSeparatorAdd:function (elem,p) {
			p = $.extend({
				sepclass : 'ui-separator',
				sepcontent: '',
				position : 'last'
			}, p ||{});
			return this.each(function() {
				if( !this.grid)  {return;}
				if( typeof elem === 'string' && elem.indexOf('#') !== 0) {elem = '#'+$.jgrid.jqID(elem);}
				var findnav = $('.navtable',elem)[0];
				if(findnav) {
					var sep = '<td class=\'ui-pg-button ui-state-disabled\' style=\'width:4px;\'><span class=\''+p.sepclass+'\'></span>'+p.sepcontent+'</td>';
					if (p.position === 'first') {
						if (findnav.rows[0].cells.length === 0) {
							$('tr', findnav).append(sep);
						} else {
							$('tr td:eq(0)', findnav).before(sep);
						}
					} else {
						$('tr', findnav).append(sep);
					}
				}
			});
		},
		GridToForm : function( rowid, formid ) {
			return this.each(function(){
				var $t = this, i;
				if (!$t.grid) {return;}
				var rowdata = $($t).jqGrid('getRowData',rowid);
				if (rowdata) {
					for(i in rowdata) {
						if(rowdata.hasOwnProperty(i)) {
							if ( $('[name='+$.jgrid.jqID(i)+']',formid).is('input:radio') || $('[name='+$.jgrid.jqID(i)+']',formid).is('input:checkbox'))  {
								$('[name='+$.jgrid.jqID(i)+']',formid).each( function() {
									if( $(this).val() == rowdata[i] ) {
										$(this)[$t.p.useProp ? 'prop': 'attr']('checked',true);
									} else {
										$(this)[$t.p.useProp ? 'prop': 'attr']('checked', false);
									}
								});
							} else {
								// this is very slow on big table and form.
								$('[name='+$.jgrid.jqID(i)+']',formid).val(rowdata[i]);
							}
						}
					}
				}
			});
		},
		FormToGrid : function(rowid, formid, mode, position){
			return this.each(function() {
				var $t = this;
				if(!$t.grid) {return;}
				if(!mode) {mode = 'set';}
				if(!position) {position = 'first';}
				var fields = $(formid).serializeArray();
				var griddata = {};
				$.each(fields, function(i, field){
					griddata[field.name] = field.value;
				});
				if(mode=='add') {$($t).jqGrid('addRowData',rowid,griddata, position);}
				else if(mode=='set') {$($t).jqGrid('setRowData',rowid,griddata);}
			});
		}
	});
})(jQuery);
/*jshint eqeqeq:false, eqnull:true, devel:true */
/*global jQuery */
(function($){
/**
 * jqGrid extension for manipulating Grid Data
 * Tony Tomov tony@trirand.com
 * http://trirand.com/blog/
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
**/
	'use strict';
	$.jgrid.inlineEdit = $.jgrid.inlineEdit || {};
	$.jgrid.extend({
		//Editing
		editRow : function(rowid,keys,oneditfunc,successfunc, url, extraparam, aftersavefunc,errorfunc, afterrestorefunc) {
		// Compatible mode old versions
			var o={}, args = $.makeArray(arguments).slice(1);

			if( $.type(args[0]) === 'object' ) {
				o = args[0];
			} else {
				if (keys !== undefined) { o.keys = keys; }
				if ($.isFunction(oneditfunc)) { o.oneditfunc = oneditfunc; }
				if ($.isFunction(successfunc)) { o.successfunc = successfunc; }
				if (url !== undefined) { o.url = url; }
				if (extraparam !== undefined) { o.extraparam = extraparam; }
				if ($.isFunction(aftersavefunc)) { o.aftersavefunc = aftersavefunc; }
				if ($.isFunction(errorfunc)) { o.errorfunc = errorfunc; }
				if ($.isFunction(afterrestorefunc)) { o.afterrestorefunc = afterrestorefunc; }
			// last two not as param, but as object (sorry)
			//if (restoreAfterError !== undefined) { o.restoreAfterError = restoreAfterError; }
			//if (mtype !== undefined) { o.mtype = mtype || "POST"; }
			}
			o = $.extend(true, {
				keys : false,
				oneditfunc: null,
				successfunc: null,
				url: null,
				extraparam: {},
				aftersavefunc: null,
				errorfunc: null,
				afterrestorefunc: null,
				restoreAfterError: true,
				mtype: 'POST'
			}, $.jgrid.inlineEdit, o );

			// End compatible
			return this.each(function(){
				var $t = this, nm, tmp, editable, cnt=0, focus=null, svr={}, ind,cm;
				if (!$t.grid ) { return; }
				ind = $($t).jqGrid('getInd',rowid,true);
				if( ind === false ) {return;}
				editable = $(ind).attr('editable') || '0';
				if (editable == '0' && !$(ind).hasClass('not-editable-row')) {
					cm = $t.p.colModel;
					$('td[role="gridcell"]',ind).each( function(i) {
						nm = cm[i].name;
						var treeg = $t.p.treeGrid===true && nm == $t.p.ExpandColumn;
						if(treeg) { tmp = $('span:first',this).html();}
						else {
							try {
								tmp = $.unformat.call($t,this,{rowId:rowid, colModel:cm[i]},i);
							} catch (_) {
								tmp =  ( cm[i].edittype && cm[i].edittype == 'textarea' ) ? $(this).text() : $(this).html();
							}
						}
						if ( nm != 'cb' && nm != 'subgrid' && nm != 'rn') {
							if($t.p.autoencode) { tmp = $.jgrid.htmlDecode(tmp); }
							svr[nm]=tmp;
							if(cm[i].editable===true) {
								if(focus===null) { focus = i; }
								if (treeg) { $('span:first',this).html(''); }
								else { $(this).html(''); }
								var opt = $.extend({},cm[i].editoptions || {},{id:rowid+'_'+nm,name:nm});
								if(!cm[i].edittype) { cm[i].edittype = 'text'; }
								if(tmp == '&nbsp;' || tmp == '&#160;' || (tmp.length==1 && tmp.charCodeAt(0)==160) ) {tmp='';}
								var elc = $.jgrid.createEl.call($t,cm[i].edittype,opt,tmp,true,$.extend({},$.jgrid.ajaxOptions,$t.p.ajaxSelectOptions || {}));
								$(elc).addClass('editable');
								if(treeg) { $('span:first',this).append(elc); }
								else { $(this).append(elc); }
								$.jgrid.bindEv( elc, opt, $t);
								//Again IE
								if(cm[i].edittype == 'select' && cm[i].editoptions!==undefined && cm[i].editoptions.multiple===true  && cm[i].editoptions.dataUrl===undefined && $.jgrid.msie) {
									$(elc).width($(elc).width());
								}
								cnt++;
							}
						}
					});
					if(cnt > 0) {
						svr.id = rowid; $t.p.savedRow.push(svr);
						$(ind).attr('editable','1');
						$('td:eq('+focus+') input',ind).focus();
						if(o.keys===true) {
							$(ind).bind('keydown',function(e) {
								if (e.keyCode === 27) {
									$($t).jqGrid('restoreRow',rowid, o.afterrestorefunc);
									if($t.p._inlinenav) {
										try {
											$($t).jqGrid('showAddEditButtons');
										} catch (eer1) {}
									}
									return false;
								}
								if (e.keyCode === 13) {
									var ta = e.target;
									if(ta.tagName == 'TEXTAREA') { return true; }
									if( $($t).jqGrid('saveRow', rowid, o ) ) {
										if($t.p._inlinenav) {
											try {
												$($t).jqGrid('showAddEditButtons');
											} catch (eer2) {}
										}
									}
									return false;
								}
							});
						}
						$($t).triggerHandler('jqGridInlineEditRow', [rowid, o]);
						if( $.isFunction(o.oneditfunc)) { o.oneditfunc.call($t, rowid); }
					}
				}
			});
		},
		saveRow : function(rowid, successfunc, url, extraparam, aftersavefunc,errorfunc, afterrestorefunc) {
		// Compatible mode old versions
			var args = $.makeArray(arguments).slice(1), o = {};

			if( $.type(args[0]) === 'object' ) {
				o = args[0];
			} else {
				if ($.isFunction(successfunc)) { o.successfunc = successfunc; }
				if (url !== undefined) { o.url = url; }
				if (extraparam !== undefined) { o.extraparam = extraparam; }
				if ($.isFunction(aftersavefunc)) { o.aftersavefunc = aftersavefunc; }
				if ($.isFunction(errorfunc)) { o.errorfunc = errorfunc; }
				if ($.isFunction(afterrestorefunc)) { o.afterrestorefunc = afterrestorefunc; }
			}
			o = $.extend(true, {
				successfunc: null,
				url: null,
				extraparam: {},
				aftersavefunc: null,
				errorfunc: null,
				afterrestorefunc: null,
				restoreAfterError: true,
				mtype: 'POST'
			}, $.jgrid.inlineEdit, o );
			// End compatible

			var success = false;
			var $t = this[0], nm, tmp={}, tmp2={}, tmp3= {}, editable, fr, cv, ind;
			if (!$t.grid ) { return success; }
			ind = $($t).jqGrid('getInd',rowid,true);
			if(ind === false) {return success;}
			editable = $(ind).attr('editable');
			o.url = o.url || $t.p.editurl;
			if (editable==='1') {
				var cm;
				$('td[role="gridcell"]',ind).each(function(i) {
					cm = $t.p.colModel[i];
					nm = cm.name;
					if ( nm != 'cb' && nm != 'subgrid' && cm.editable===true && nm != 'rn' && !$(this).hasClass('not-editable-cell')) {
						switch (cm.edittype) {
						case 'checkbox':
							var cbv = ['Yes','No'];
							if(cm.editoptions ) {
								cbv = cm.editoptions.value.split(':');
							}
							tmp[nm]=  $('input',this).is(':checked') ? cbv[0] : cbv[1];
							break;
						case 'text':
						case 'password':
						case 'textarea':
						case 'button' :
							tmp[nm]=$('input, textarea',this).val();
							break;
						case 'select':
							if(!cm.editoptions.multiple) {
								tmp[nm] = $('select option:selected',this).val();
								tmp2[nm] = $('select option:selected', this).text();
							} else {
								var sel = $('select',this), selectedText = [];
								tmp[nm] = $(sel).val();
								if(tmp[nm]) { tmp[nm]= tmp[nm].join(','); } else { tmp[nm] =''; }
								$('select option:selected',this).each(
									function(i,selected){
										selectedText[i] = $(selected).text();
									}
								);
								tmp2[nm] = selectedText.join(',');
							}
							if(cm.formatter && cm.formatter == 'select') { tmp2={}; }
							break;
						case 'custom' :
							try {
								if(cm.editoptions && $.isFunction(cm.editoptions.custom_value)) {
									tmp[nm] = cm.editoptions.custom_value.call($t, $('.customelement',this),'get');
									if (tmp[nm] === undefined) { throw 'e2'; }
								} else { throw 'e1'; }
							} catch (e) {
								if (e=='e1') { $.jgrid.info_dialog($.jgrid.errors.errcap,'function \'custom_value\' '+$.jgrid.edit.msg.nodefined,$.jgrid.edit.bClose); }
								if (e=='e2') { $.jgrid.info_dialog($.jgrid.errors.errcap,'function \'custom_value\' '+$.jgrid.edit.msg.novalue,$.jgrid.edit.bClose); }
								else { $.jgrid.info_dialog($.jgrid.errors.errcap,e.message,$.jgrid.edit.bClose); }
							}
							break;
						}
						cv = $.jgrid.checkValues(tmp[nm],i,$t);
						if(cv[0] === false) {
							cv[1] = tmp[nm] + ' ' + cv[1];
							return false;
						}
						if($t.p.autoencode) { tmp[nm] = $.jgrid.htmlEncode(tmp[nm]); }
						if(o.url !== 'clientArray' && cm.editoptions && cm.editoptions.NullIfEmpty === true) {
							if(tmp[nm] === '') {
								tmp3[nm] = 'null';
							}
						}
					}
				});
				if (cv[0] === false){
					try {
						var positions = $.jgrid.findPos($('#'+$.jgrid.jqID(rowid), $t.grid.bDiv)[0]);
						$.jgrid.info_dialog($.jgrid.errors.errcap,cv[1],$.jgrid.edit.bClose,{left:positions[0],top:positions[1]});
					} catch (e) {
						alert(cv[1]);
					}
					return success;
				}
				var idname, opers = $t.p.prmNames, oldRowId = rowid;
				if ($t.p.keyIndex === false) {
					idname = opers.id;
				} else {
					idname = $t.p.colModel[$t.p.keyIndex +
					($t.p.rownumbers === true ? 1 : 0) +
					($t.p.multiselect === true ? 1 : 0) +
					($t.p.subGrid === true ? 1 : 0)].name;
				}
				if(tmp) {
					tmp[opers.oper] = opers.editoper;
					if (tmp[idname] === undefined) {
						tmp[idname] = rowid;
					} else if (ind.id !== $t.p.idPrefix + tmp[idname]) {
					// rename rowid
						var oldid = $.jgrid.stripPref($t.p.idPrefix, rowid);
						if ($t.p._index[oldid] !== undefined) {
							$t.p._index[tmp[idname]] = $t.p._index[oldid];
							delete $t.p._index[oldid];
						}
						rowid = $t.p.idPrefix + tmp[idname];
						$(ind).attr('id', rowid);
						if ($t.p.selrow === oldRowId) {
							$t.p.selrow = rowid;
						}
						if ($.isArray($t.p.selarrrow)) {
							var i = $.inArray(oldRowId, $t.p.selarrrow);
							if (i>=0) {
								$t.p.selarrrow[i] = rowid;
							}
						}
						if ($t.p.multiselect) {
							var newCboxId = 'jqg_' + $t.p.id + '_' + rowid;
							$('input.cbox',ind)
								.attr('id', newCboxId)
								.attr('name', newCboxId);
						}
					// TODO: to test the case of frozen columns
					}
					if($t.p.inlineData === undefined) { $t.p.inlineData ={}; }
					tmp = $.extend({},tmp,$t.p.inlineData,o.extraparam);
				}
				if (o.url == 'clientArray') {
					tmp = $.extend({},tmp, tmp2);
					if($t.p.autoencode) {
						$.each(tmp,function(n,v){
							tmp[n] = $.jgrid.htmlDecode(v);
						});
					}
					var k, resp = $($t).jqGrid('setRowData',rowid,tmp);
					$(ind).attr('editable','0');
					for(k=0;k<$t.p.savedRow.length;k++) {
						if( $t.p.savedRow[k].id == oldRowId) {fr = k; break;}
					}
					if(fr >= 0) { $t.p.savedRow.splice(fr,1); }
					$($t).triggerHandler('jqGridInlineAfterSaveRow', [rowid, resp, tmp, o]);
					if( $.isFunction(o.aftersavefunc) ) { o.aftersavefunc.call($t, rowid,resp, o); }
					success = true;
					$(ind).unbind('keydown');
				} else {
					$('#lui_'+$.jgrid.jqID($t.p.id)).show();
					tmp3 = $.extend({},tmp,tmp3);
					tmp3[idname] = $.jgrid.stripPref($t.p.idPrefix, tmp3[idname]);
					$.ajax($.extend({
						url:o.url,
						data: $.isFunction($t.p.serializeRowData) ? $t.p.serializeRowData.call($t, tmp3) : tmp3,
						type: o.mtype,
						async : false, //?!?
						complete: function(res,stat){
							$('#lui_'+$.jgrid.jqID($t.p.id)).hide();
							if (stat === 'success'){
								var ret = true, sucret, k;
								sucret = $($t).triggerHandler('jqGridInlineSuccessSaveRow', [res, rowid, o]);
								if (!$.isArray(sucret)) {sucret = [true, tmp];}
								if (sucret[0] && $.isFunction(o.successfunc)) {sucret = o.successfunc.call($t, res);}
								if($.isArray(sucret)) {
								// expect array - status, data, rowid
									ret = sucret[0];
									tmp = sucret[1] || tmp;
								} else {
									ret = sucret;
								}
								if (ret===true) {
									if($t.p.autoencode) {
										$.each(tmp,function(n,v){
											tmp[n] = $.jgrid.htmlDecode(v);
										});
									}
									tmp = $.extend({},tmp, tmp2);
									$($t).jqGrid('setRowData',rowid,tmp);
									$(ind).attr('editable','0');
									for(k=0;k<$t.p.savedRow.length;k++) {
										if( $t.p.savedRow[k].id == rowid) {fr = k; break;}
									}
									if(fr >= 0) { $t.p.savedRow.splice(fr,1); }
									$($t).triggerHandler('jqGridInlineAfterSaveRow', [rowid, res, tmp, o]);
									if( $.isFunction(o.aftersavefunc) ) { o.aftersavefunc.call($t, rowid,res); }
									success = true;
									$(ind).unbind('keydown');
								} else {
									$($t).triggerHandler('jqGridInlineErrorSaveRow', [rowid, res, stat, null, o]);
									if($.isFunction(o.errorfunc) ) {
										o.errorfunc.call($t, rowid, res, stat, null);
									}
									if(o.restoreAfterError === true) {
										$($t).jqGrid('restoreRow',rowid, o.afterrestorefunc);
									}
								}
							}
						},
						error:function(res,stat,err){
							$('#lui_'+$.jgrid.jqID($t.p.id)).hide();
							$($t).triggerHandler('jqGridInlineErrorSaveRow', [rowid, res, stat, err, o]);
							if($.isFunction(o.errorfunc) ) {
								o.errorfunc.call($t, rowid, res, stat, err);
							} else {
								var rT = res.responseText || res.statusText;
								try {
									$.jgrid.info_dialog($.jgrid.errors.errcap,'<div class="ui-state-error">'+ rT +'</div>', $.jgrid.edit.bClose,{buttonalign:'right'});
								} catch(e) {
									alert(rT);
								}
							}
							if(o.restoreAfterError === true) {
								$($t).jqGrid('restoreRow',rowid, o.afterrestorefunc);
							}
						}
					}, $.jgrid.ajaxOptions, $t.p.ajaxRowOptions || {}));
				}
			}
			return success;
		},
		restoreRow : function(rowid, afterrestorefunc) {
		// Compatible mode old versions
			var args = $.makeArray(arguments).slice(1), o={};

			if( $.type(args[0]) === 'object' ) {
				o = args[0];
			} else {
				if ($.isFunction(afterrestorefunc)) { o.afterrestorefunc = afterrestorefunc; }
			}
			o = $.extend(true, $.jgrid.inlineEdit, o );

			// End compatible

			return this.each(function(){
				var $t= this, fr, ind, ares={}, k;
				if (!$t.grid ) { return; }
				ind = $($t).jqGrid('getInd',rowid,true);
				if(ind === false) {return;}
				for(k=0;k<$t.p.savedRow.length;k++) {
					if( $t.p.savedRow[k].id == rowid) {fr = k; break;}
				}
				if(fr >= 0) {
					if($.isFunction($.fn.datepicker)) {
						try {
							$('input.hasDatepicker','#'+$.jgrid.jqID(ind.id)).datepicker('hide');
						} catch (e) {}
					}
					$.each($t.p.colModel, function(){
						if(this.editable === true && $t.p.savedRow[fr].hasOwnProperty(this.name)) {
							ares[this.name] = $t.p.savedRow[fr][this.name];
						}
					});
					$($t).jqGrid('setRowData',rowid,ares);
					$(ind).attr('editable','0').unbind('keydown');
					$t.p.savedRow.splice(fr,1);
					if($('#'+$.jgrid.jqID(rowid), '#'+$.jgrid.jqID($t.p.id)).hasClass('jqgrid-new-row')){
						setTimeout(function(){$($t).jqGrid('delRowData',rowid);},0);
					}
				}
				$($t).triggerHandler('jqGridInlineAfterRestoreRow', [rowid]);
				if ($.isFunction(o.afterrestorefunc))
				{
					o.afterrestorefunc.call($t, rowid);
				}
			});
		},
		addRow : function ( p ) {
			p = $.extend(true, {
				rowID : null,
				initdata : {},
				position :'first',
				useDefValues : true,
				useFormatter : false,
				addRowParams : {extraparam:{}}
			},p  || {});
			return this.each(function(){
				if (!this.grid ) { return; }
				var $t = this;
				p.rowID = $.isFunction(p.rowID) ? p.rowID.call($t, p) : ( (p.rowID != null) ? p.rowID : $.jgrid.randId());
				if(p.useDefValues === true) {
					$($t.p.colModel).each(function(){
						if( this.editoptions && this.editoptions.defaultValue ) {
							var opt = this.editoptions.defaultValue,
								tmp = $.isFunction(opt) ? opt.call($t) : opt;
							p.initdata[this.name] = tmp;
						}
					});
				}
				$($t).jqGrid('addRowData', p.rowID, p.initdata, p.position);
				p.rowID = $t.p.idPrefix + p.rowID;
				$('#'+$.jgrid.jqID(p.rowID), '#'+$.jgrid.jqID($t.p.id)).addClass('jqgrid-new-row');
				if(p.useFormatter) {
					$('#'+$.jgrid.jqID(p.rowID)+' .ui-inline-edit', '#'+$.jgrid.jqID($t.p.id)).click();
				} else {
					var opers = $t.p.prmNames,
						oper = opers.oper;
					p.addRowParams.extraparam[oper] = opers.addoper;
					$($t).jqGrid('editRow', p.rowID, p.addRowParams);
					$($t).jqGrid('setSelection', p.rowID);
				}
			});
		},
		inlineNav : function (elem, o) {
			o = $.extend({
				edit: true,
				editicon: 'ui-icon-pencil',
				add: true,
				addicon:'ui-icon-plus',
				save: true,
				saveicon:'ui-icon-disk',
				cancel: true,
				cancelicon:'ui-icon-cancel',
				addParams : {},
				editParams : {},
				restoreAfterSelect : true
			}, $.jgrid.nav, o ||{});
			return this.each(function(){
				if (!this.grid ) { return; }
				var $t = this, onSelect, gID = $.jgrid.jqID($t.p.id);
				$t.p._inlinenav = true;
				// detect the formatactions column
				if(o.addParams.useFormatter === true) {
					var cm = $t.p.colModel,i;
					for (i = 0; i<cm.length; i++) {
						if(cm[i].formatter && cm[i].formatter === 'actions' ) {
							if(cm[i].formatoptions) {
								var defaults =  {
										keys:false,
										onEdit : null,
										onSuccess: null,
										afterSave:null,
										onError: null,
										afterRestore: null,
										extraparam: {},
										url: null
									},
									ap = $.extend( defaults, cm[i].formatoptions );
								o.addParams.addRowParams = {
									'keys' : ap.keys,
									'oneditfunc' : ap.onEdit,
									'successfunc' : ap.onSuccess,
									'url' : ap.url,
									'extraparam' : ap.extraparam,
									'aftersavefunc' : ap.afterSavef,
									'errorfunc': ap.onError,
									'afterrestorefunc' : ap.afterRestore
								};
							}
							break;
						}
					}
				}
				if(o.add) {
					$($t).jqGrid('navButtonAdd', elem,{
						caption : o.addtext,
						title : o.addtitle,
						buttonicon : o.addicon,
						id : $t.p.id+'_iladd',
						onClickButton : function () {
							$($t).jqGrid('addRow', o.addParams);
							if(!o.addParams.useFormatter) {
								$('#'+gID+'_ilsave').removeClass('ui-state-disabled');
								$('#'+gID+'_ilcancel').removeClass('ui-state-disabled');
								$('#'+gID+'_iladd').addClass('ui-state-disabled');
								$('#'+gID+'_iledit').addClass('ui-state-disabled');
							}
						}
					});
				}
				if(o.edit) {
					$($t).jqGrid('navButtonAdd', elem,{
						caption : o.edittext,
						title : o.edittitle,
						buttonicon : o.editicon,
						id : $t.p.id+'_iledit',
						onClickButton : function () {
							var sr = $($t).jqGrid('getGridParam','selrow');
							if(sr) {
								$($t).jqGrid('editRow', sr, o.editParams);
								$('#'+gID+'_ilsave').removeClass('ui-state-disabled');
								$('#'+gID+'_ilcancel').removeClass('ui-state-disabled');
								$('#'+gID+'_iladd').addClass('ui-state-disabled');
								$('#'+gID+'_iledit').addClass('ui-state-disabled');
							} else {
								$.jgrid.viewModal('#alertmod',{gbox:'#gbox_'+gID,jqm:true});$('#jqg_alrt').focus();
							}
						}
					});
				}
				if(o.save) {
					$($t).jqGrid('navButtonAdd', elem,{
						caption : o.savetext || '',
						title : o.savetitle || 'Save row',
						buttonicon : o.saveicon,
						id : $t.p.id+'_ilsave',
						onClickButton : function () {
							var sr = $t.p.savedRow[0].id;
							if(sr) {
								var opers = $t.p.prmNames,
									oper = opers.oper;
								if(!o.editParams.extraparam) {
									o.editParams.extraparam = {};
								}
								if($('#'+$.jgrid.jqID(sr), '#'+gID ).hasClass('jqgrid-new-row')) {
									o.editParams.extraparam[oper] = opers.addoper;
								} else {
									o.editParams.extraparam[oper] = opers.editoper;
								}
								if( $($t).jqGrid('saveRow', sr, o.editParams) ) {
									$($t).jqGrid('showAddEditButtons');
								}
							} else {
								$.jgrid.viewModal('#alertmod',{gbox:'#gbox_'+gID,jqm:true});$('#jqg_alrt').focus();
							}
						}
					});
					$('#'+gID+'_ilsave').addClass('ui-state-disabled');
				}
				if(o.cancel) {
					$($t).jqGrid('navButtonAdd', elem,{
						caption : o.canceltext || '',
						title : o.canceltitle || 'Cancel row editing',
						buttonicon : o.cancelicon,
						id : $t.p.id+'_ilcancel',
						onClickButton : function () {
							var sr = $t.p.savedRow[0].id;
							if(sr) {
								$($t).jqGrid('restoreRow', sr, o.editParams);
								$($t).jqGrid('showAddEditButtons');
							} else {
								$.jgrid.viewModal('#alertmod',{gbox:'#gbox_'+gID,jqm:true});$('#jqg_alrt').focus();
							}
						}
					});
					$('#'+gID+'_ilcancel').addClass('ui-state-disabled');
				}
				if(o.restoreAfterSelect === true) {
					if($.isFunction($t.p.beforeSelectRow)) {
						onSelect = $t.p.beforeSelectRow;
					} else {
						onSelect =  false;
					}
					$t.p.beforeSelectRow = function(id, stat) {
						var ret = true;
						if($t.p.savedRow.length > 0 && $t.p._inlinenav===true && ( id !== $t.p.selrow && $t.p.selrow !==null) ) {
							if($t.p.selrow == o.addParams.rowID ) {
								$($t).jqGrid('delRowData', $t.p.selrow);
							} else {
								$($t).jqGrid('restoreRow', $t.p.selrow, o.editParams);
							}
							$($t).jqGrid('showAddEditButtons');
						}
						if(onSelect) {
							ret = onSelect.call($t, id, stat);
						}
						return ret;
					};
				}

			});
		},
		showAddEditButtons : function()  {
			return this.each(function(){
				if (!this.grid ) { return; }
				var gID = $.jgrid.jqID(this.p.id);
				$('#'+gID+'_ilsave').addClass('ui-state-disabled');
				$('#'+gID+'_ilcancel').addClass('ui-state-disabled');
				$('#'+gID+'_iladd').removeClass('ui-state-disabled');
				$('#'+gID+'_iledit').removeClass('ui-state-disabled');
			});
		}
		//end inline edit
	});
})(jQuery);
/*jshint eqeqeq:false */
/*global jQuery */
(function($){
/*
**
 * jqGrid extension for cellediting Grid Data
 * Tony Tomov tony@trirand.com
 * http://trirand.com/blog/
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
**/
/**
 * all events and options here are aded anonynous and not in the base grid
 * since the array is to big. Here is the order of execution.
 * From this point we use jQuery isFunction
 * formatCell
 * beforeEditCell,
 * onSelectCell (used only for noneditable cels)
 * afterEditCell,
 * beforeSaveCell, (called before validation of values if any)
 * beforeSubmitCell (if cellsubmit remote (ajax))
 * afterSubmitCell(if cellsubmit remote (ajax)),
 * afterSaveCell,
 * errorCell,
 * serializeCellData - new
 * Options
 * cellsubmit (remote,clientArray) (added in grid options)
 * cellurl
 * ajaxCellOptions
* */
	'use strict';
	$.jgrid.extend({
		editCell : function (iRow,iCol, ed){
			return this.each(function (){
				var $t = this, nm, tmp,cc, cm;
				if (!$t.grid || $t.p.cellEdit !== true) {return;}
				iCol = parseInt(iCol,10);
				// select the row that can be used for other methods
				$t.p.selrow = $t.rows[iRow].id;
				if (!$t.p.knv) {$($t).jqGrid('GridNav');}
				// check to see if we have already edited cell
				if ($t.p.savedRow.length>0) {
				// prevent second click on that field and enable selects
					if (ed===true ) {
						if(iRow == $t.p.iRow && iCol == $t.p.iCol){
							return;
						}
					}
					// save the cell
					$($t).jqGrid('saveCell',$t.p.savedRow[0].id,$t.p.savedRow[0].ic);
				} else {
					window.setTimeout(function () { $('#'+$.jgrid.jqID($t.p.knv)).attr('tabindex','-1').focus();},0);
				}
				cm = $t.p.colModel[iCol];
				nm = cm.name;
				if (nm=='subgrid' || nm=='cb' || nm=='rn') {return;}
				cc = $('td:eq('+iCol+')',$t.rows[iRow]);
				if (cm.editable===true && ed===true && !cc.hasClass('not-editable-cell')) {
					if(parseInt($t.p.iCol,10)>=0  && parseInt($t.p.iRow,10)>=0) {
						$('td:eq('+$t.p.iCol+')',$t.rows[$t.p.iRow]).removeClass('edit-cell ui-state-highlight');
						$($t.rows[$t.p.iRow]).removeClass('selected-row ui-state-hover');
					}
					$(cc).addClass('edit-cell ui-state-highlight');
					$($t.rows[iRow]).addClass('selected-row ui-state-hover');
					try {
						tmp =  $.unformat.call($t,cc,{rowId: $t.rows[iRow].id, colModel:cm},iCol);
					} catch (_) {
						tmp = ( cm.edittype && cm.edittype == 'textarea' ) ? $(cc).text() : $(cc).html();
					}
					if($t.p.autoencode) { tmp = $.jgrid.htmlDecode(tmp); }
					if (!cm.edittype) {cm.edittype = 'text';}
					$t.p.savedRow.push({id:iRow,ic:iCol,name:nm,v:tmp});
					if(tmp === '&nbsp;' || tmp === '&#160;' || (tmp.length===1 && tmp.charCodeAt(0)===160) ) {tmp='';}
					if($.isFunction($t.p.formatCell)) {
						var tmp2 = $t.p.formatCell.call($t, $t.rows[iRow].id,nm,tmp,iRow,iCol);
						if(tmp2 !== undefined ) {tmp = tmp2;}
					}
					var opt = $.extend({}, cm.editoptions || {} ,{id:iRow+'_'+nm,name:nm});
					var elc = $.jgrid.createEl.call($t,cm.edittype,opt,tmp,true,$.extend({},$.jgrid.ajaxOptions,$t.p.ajaxSelectOptions || {}));
					$($t).triggerHandler('jqGridBeforeEditCell', [$t.rows[iRow].id, nm, tmp, iRow, iCol]);
					if ($.isFunction($t.p.beforeEditCell)) {
						$t.p.beforeEditCell.call($t, $t.rows[iRow].id,nm,tmp,iRow,iCol);
					}
					$(cc).html('').append(elc).attr('tabindex','0');
					$.jgrid.bindEv( elc, opt, $t);
					window.setTimeout(function () { $(elc).focus();},0);
					$('input, select, textarea',cc).bind('keydown',function(e) {
						if (e.keyCode === 27) {
							if($('input.hasDatepicker',cc).length >0) {
								if( $('.ui-datepicker').is(':hidden') )  { $($t).jqGrid('restoreCell',iRow,iCol); }
								else { $('input.hasDatepicker',cc).datepicker('hide'); }
							} else {
								$($t).jqGrid('restoreCell',iRow,iCol);
							}
						} //ESC
						if (e.keyCode === 13) {
							$($t).jqGrid('saveCell',iRow,iCol);
							// Prevent default action
							return false;
						} //Enter
						if (e.keyCode === 9)  {
							if(!$t.grid.hDiv.loading ) {
								if (e.shiftKey) {$($t).jqGrid('prevCell',iRow,iCol);} //Shift TAb
								else {$($t).jqGrid('nextCell',iRow,iCol);} //Tab
							} else {
								return false;
							}
						}
						e.stopPropagation();
					});
					$($t).triggerHandler('jqGridAfterEditCell', [$t.rows[iRow].id, nm, tmp, iRow, iCol]);
					if ($.isFunction($t.p.afterEditCell)) {
						$t.p.afterEditCell.call($t, $t.rows[iRow].id,nm,tmp,iRow,iCol);
					}
				} else {
					if (parseInt($t.p.iCol,10)>=0  && parseInt($t.p.iRow,10)>=0) {
						$('td:eq('+$t.p.iCol+')',$t.rows[$t.p.iRow]).removeClass('edit-cell ui-state-highlight');
						$($t.rows[$t.p.iRow]).removeClass('selected-row ui-state-hover');
					}
					cc.addClass('edit-cell ui-state-highlight');
					$($t.rows[iRow]).addClass('selected-row ui-state-hover');
					tmp = cc.html().replace(/\&#160\;/ig,'');
					$($t).triggerHandler('jqGridSelectCell', [$t.rows[iRow].id, nm, tmp, iRow, iCol]);
					if ($.isFunction($t.p.onSelectCell)) {
						$t.p.onSelectCell.call($t, $t.rows[iRow].id,nm,tmp,iRow,iCol);
					}
				}
				$t.p.iCol = iCol; $t.p.iRow = iRow;
			});
		},
		saveCell : function (iRow, iCol){
			return this.each(function(){
				var $t= this, fr;
				if (!$t.grid || $t.p.cellEdit !== true) {return;}
				if ( $t.p.savedRow.length >= 1) {fr = 0;} else {fr=null;}
				if(fr !== null) {
					var cc = $('td:eq('+iCol+')',$t.rows[iRow]),v,v2,
						cm = $t.p.colModel[iCol], nm = cm.name, nmjq = $.jgrid.jqID(nm) ;
					switch (cm.edittype) {
					case 'select':
						if(!cm.editoptions.multiple) {
							v = $('#'+iRow+'_'+nmjq+' option:selected',$t.rows[iRow]).val();
							v2 = $('#'+iRow+'_'+nmjq+' option:selected',$t.rows[iRow]).text();
						} else {
							var sel = $('#'+iRow+'_'+nmjq,$t.rows[iRow]), selectedText = [];
							v = $(sel).val();
							if(v) { v.join(',');} else { v=''; }
							$('option:selected',sel).each(
								function(i,selected){
									selectedText[i] = $(selected).text();
								}
							);
							v2 = selectedText.join(',');
						}
						if(cm.formatter) { v2 = v; }
						break;
					case 'checkbox':
						var cbv  = ['Yes','No'];
						if(cm.editoptions){
							cbv = cm.editoptions.value.split(':');
						}
						v = $('#'+iRow+'_'+nmjq,$t.rows[iRow]).is(':checked') ? cbv[0] : cbv[1];
						v2=v;
						break;
					case 'password':
					case 'text':
					case 'textarea':
					case 'button' :
						v = $('#'+iRow+'_'+nmjq,$t.rows[iRow]).val();
						v2=v;
						break;
					case 'custom' :
						try {
							if(cm.editoptions && $.isFunction(cm.editoptions.custom_value)) {
								v = cm.editoptions.custom_value.call($t, $('.customelement',cc),'get');
								if (v===undefined) { throw 'e2';} else { v2=v; }
							} else { throw 'e1'; }
						} catch (e) {
							if (e=='e1') { $.jgrid.info_dialog($.jgrid.errors.errcap,'function \'custom_value\' '+$.jgrid.edit.msg.nodefined,$.jgrid.edit.bClose); }
							if (e=='e2') { $.jgrid.info_dialog($.jgrid.errors.errcap,'function \'custom_value\' '+$.jgrid.edit.msg.novalue,$.jgrid.edit.bClose); }
							else {$.jgrid.info_dialog($.jgrid.errors.errcap,e.message,$.jgrid.edit.bClose); }
						}
						break;
					}
					// The common approach is if nothing changed do not do anything
					if (v2 !== $t.p.savedRow[fr].v){
						var vvv = $($t).triggerHandler('jqGridBeforeSaveCell', [$t.rows[iRow].id, nm, v, iRow, iCol]);
						if (vvv) {v = vvv; v2=vvv;}
						if ($.isFunction($t.p.beforeSaveCell)) {
							var vv = $t.p.beforeSaveCell.call($t, $t.rows[iRow].id,nm, v, iRow,iCol);
							if (vv) {v = vv; v2=vv;}
						}
						var cv = $.jgrid.checkValues(v,iCol,$t);
						if(cv[0] === true) {
							var addpost = $($t).triggerHandler('jqGridBeforeSubmitCell', [$t.rows[iRow].id, nm, v, iRow, iCol]) || {};
							if ($.isFunction($t.p.beforeSubmitCell)) {
								addpost = $t.p.beforeSubmitCell.call($t, $t.rows[iRow].id,nm, v, iRow,iCol);
								if (!addpost) {addpost={};}
							}
							if( $('input.hasDatepicker',cc).length >0) { $('input.hasDatepicker',cc).datepicker('hide'); }
							if ($t.p.cellsubmit == 'remote') {
								if ($t.p.cellurl) {
									var postdata = {};
									if($t.p.autoencode) { v = $.jgrid.htmlEncode(v); }
									postdata[nm] = v;
									var idname,oper, opers;
									opers = $t.p.prmNames;
									idname = opers.id;
									oper = opers.oper;
									postdata[idname] = $.jgrid.stripPref($t.p.idPrefix, $t.rows[iRow].id);
									postdata[oper] = opers.editoper;
									postdata = $.extend(addpost,postdata);
									$('#lui_'+$.jgrid.jqID($t.p.id)).show();
									$t.grid.hDiv.loading = true;
									$.ajax( $.extend( {
										url: $t.p.cellurl,
										data :$.isFunction($t.p.serializeCellData) ? $t.p.serializeCellData.call($t, postdata) : postdata,
										type: 'POST',
										complete: function (result, stat) {
											$('#lui_'+$t.p.id).hide();
											$t.grid.hDiv.loading = false;
											if (stat == 'success') {
												var ret = $($t).triggerHandler('jqGridAfterSubmitCell', [$t, result, postdata.id, nm, v, iRow, iCol]) || [true, ''];
												if (ret[0] === true && $.isFunction($t.p.afterSubmitCell)) {
													ret = $t.p.afterSubmitCell.call($t, result,postdata.id,nm,v,iRow,iCol);
												}
												if(ret[0] === true){
													$(cc).empty();
													$($t).jqGrid('setCell',$t.rows[iRow].id, iCol, v2, false, false, true);
													$(cc).addClass('dirty-cell');
													$($t.rows[iRow]).addClass('edited');
													$($t).triggerHandler('jqGridAfterSaveCell', [$t.rows[iRow].id, nm, v, iRow, iCol]);
													if ($.isFunction($t.p.afterSaveCell)) {
														$t.p.afterSaveCell.call($t, $t.rows[iRow].id,nm, v, iRow,iCol);
													}
													$t.p.savedRow.splice(0,1);
												} else {
													$.jgrid.info_dialog($.jgrid.errors.errcap,ret[1],$.jgrid.edit.bClose);
													$($t).jqGrid('restoreCell',iRow,iCol);
												}
											}
										},
										error:function(res,stat,err) {
											$('#lui_'+$.jgrid.jqID($t.p.id)).hide();
											$t.grid.hDiv.loading = false;
											$($t).triggerHandler('jqGridErrorCell', [res, stat, err]);
											if ($.isFunction($t.p.errorCell)) {
												$t.p.errorCell.call($t, res,stat,err);
												$($t).jqGrid('restoreCell',iRow,iCol);
											} else {
												$.jgrid.info_dialog($.jgrid.errors.errcap,res.status+' : '+res.statusText+'<br/>'+stat,$.jgrid.edit.bClose);
												$($t).jqGrid('restoreCell',iRow,iCol);
											}
										}
									}, $.jgrid.ajaxOptions, $t.p.ajaxCellOptions || {}));
								} else {
									try {
										$.jgrid.info_dialog($.jgrid.errors.errcap,$.jgrid.errors.nourl,$.jgrid.edit.bClose);
										$($t).jqGrid('restoreCell',iRow,iCol);
									} catch (e) {}
								}
							}
							if ($t.p.cellsubmit == 'clientArray') {
								$(cc).empty();
								$($t).jqGrid('setCell',$t.rows[iRow].id,iCol, v2, false, false, true);
								$(cc).addClass('dirty-cell');
								$($t.rows[iRow]).addClass('edited');
								$($t).triggerHandler('jqGridAfterSaveCell', [$t.rows[iRow].id, nm, v, iRow, iCol]);
								if ($.isFunction($t.p.afterSaveCell)) {
									$t.p.afterSaveCell.call($t, $t.rows[iRow].id,nm, v, iRow,iCol);
								}
								$t.p.savedRow.splice(0,1);
							}
						} else {
							try {
								window.setTimeout(function(){$.jgrid.info_dialog($.jgrid.errors.errcap,v+' '+cv[1],$.jgrid.edit.bClose);},100);
								$($t).jqGrid('restoreCell',iRow,iCol);
							} catch (e) {}
						}
					} else {
						$($t).jqGrid('restoreCell',iRow,iCol);
					}
				}
				window.setTimeout(function () { $('#'+$.jgrid.jqID($t.p.knv)).attr('tabindex','-1').focus();},0);
			});
		},
		restoreCell : function(iRow, iCol) {
			return this.each(function(){
				var $t= this, fr;
				if (!$t.grid || $t.p.cellEdit !== true ) {return;}
				if ( $t.p.savedRow.length >= 1) {fr = 0;} else {fr=null;}
				if(fr !== null) {
					var cc = $('td:eq('+iCol+')',$t.rows[iRow]);
					// datepicker fix
					if($.isFunction($.fn.datepicker)) {
						try {
							$('input.hasDatepicker',cc).datepicker('hide');
						} catch (e) {}
					}
					$(cc).empty().attr('tabindex','-1');
					$($t).jqGrid('setCell',$t.rows[iRow].id, iCol, $t.p.savedRow[fr].v, false, false, true);
					$($t).triggerHandler('jqGridAfterRestoreCell', [$t.rows[iRow].id, $t.p.savedRow[fr].v, iRow, iCol]);
					if ($.isFunction($t.p.afterRestoreCell)) {
						$t.p.afterRestoreCell.call($t, $t.rows[iRow].id, $t.p.savedRow[fr].v, iRow, iCol);
					}
					$t.p.savedRow.splice(0,1);
				}
				window.setTimeout(function () { $('#'+$t.p.knv).attr('tabindex','-1').focus();},0);
			});
		},
		nextCell : function (iRow,iCol) {
			return this.each(function (){
				var $t = this, nCol=false, i;
				if (!$t.grid || $t.p.cellEdit !== true) {return;}
				// try to find next editable cell
				for (i=iCol+1; i<$t.p.colModel.length; i++) {
					if ( $t.p.colModel[i].editable ===true) {
						nCol = i; break;
					}
				}
				if(nCol !== false) {
					$($t).jqGrid('editCell',iRow,nCol,true);
				} else {
					if ($t.p.savedRow.length >0) {
						$($t).jqGrid('saveCell',iRow,iCol);
					}
				}
			});
		},
		prevCell : function (iRow,iCol) {
			return this.each(function (){
				var $t = this, nCol=false, i;
				if (!$t.grid || $t.p.cellEdit !== true) {return;}
				// try to find next editable cell
				for (i=iCol-1; i>=0; i--) {
					if ( $t.p.colModel[i].editable ===true) {
						nCol = i; break;
					}
				}
				if(nCol !== false) {
					$($t).jqGrid('editCell',iRow,nCol,true);
				} else {
					if ($t.p.savedRow.length >0) {
						$($t).jqGrid('saveCell',iRow,iCol);
					}
				}
			});
		},
		GridNav : function() {
			return this.each(function () {
				var  $t = this;
				if (!$t.grid || $t.p.cellEdit !== true ) {return;}
				// trick to process keydown on non input elements
				$t.p.knv = $t.p.id + '_kn';
				var selection = $('<div style=\'position:fixed;top:-1000000px;width:1px;height:1px;\' tabindex=\'0\'><div tabindex=\'-1\' style=\'width:1px;height:1px;\' id=\''+$t.p.knv+'\'></div></div>'),
					i, kdir;
				function scrollGrid(iR, iC, tp){
					if (tp.substr(0,1)=='v') {
						var ch = $($t.grid.bDiv)[0].clientHeight,
							st = $($t.grid.bDiv)[0].scrollTop,
							nROT = $t.rows[iR].offsetTop+$t.rows[iR].clientHeight,
							pROT = $t.rows[iR].offsetTop;
						if(tp == 'vd') {
							if(nROT >= ch) {
								$($t.grid.bDiv)[0].scrollTop = $($t.grid.bDiv)[0].scrollTop + $t.rows[iR].clientHeight;
							}
						}
						if(tp == 'vu'){
							if (pROT < st ) {
								$($t.grid.bDiv)[0].scrollTop = $($t.grid.bDiv)[0].scrollTop - $t.rows[iR].clientHeight;
							}
						}
					}
					if(tp=='h') {
						var cw = $($t.grid.bDiv)[0].clientWidth,
							sl = $($t.grid.bDiv)[0].scrollLeft,
							nCOL = $t.rows[iR].cells[iC].offsetLeft+$t.rows[iR].cells[iC].clientWidth,
							pCOL = $t.rows[iR].cells[iC].offsetLeft;
						if(nCOL >= cw+parseInt(sl,10)) {
							$($t.grid.bDiv)[0].scrollLeft = $($t.grid.bDiv)[0].scrollLeft + $t.rows[iR].cells[iC].clientWidth;
						} else if (pCOL < sl) {
							$($t.grid.bDiv)[0].scrollLeft = $($t.grid.bDiv)[0].scrollLeft - $t.rows[iR].cells[iC].clientWidth;
						}
					}
				}
				function findNextVisible(iC,act){
					var ind, i;
					if(act == 'lft') {
						ind = iC+1;
						for (i=iC;i>=0;i--){
							if ($t.p.colModel[i].hidden !== true) {
								ind = i;
								break;
							}
						}
					}
					if(act == 'rgt') {
						ind = iC-1;
						for (i=iC; i<$t.p.colModel.length;i++){
							if ($t.p.colModel[i].hidden !== true) {
								ind = i;
								break;
							}
						}
					}
					return ind;
				}

				$(selection).insertBefore($t.grid.cDiv);
				$('#'+$t.p.knv)
					.focus()
					.keydown(function (e){
						kdir = e.keyCode;
						if($t.p.direction == 'rtl') {
							if(kdir===37) { kdir = 39;}
							else if (kdir===39) { kdir = 37; }
						}
						switch (kdir) {
						case 38:
							if ($t.p.iRow-1 >0 ) {
								scrollGrid($t.p.iRow-1,$t.p.iCol,'vu');
								$($t).jqGrid('editCell',$t.p.iRow-1,$t.p.iCol,false);
							}
							break;
						case 40 :
							if ($t.p.iRow+1 <=  $t.rows.length-1) {
								scrollGrid($t.p.iRow+1,$t.p.iCol,'vd');
								$($t).jqGrid('editCell',$t.p.iRow+1,$t.p.iCol,false);
							}
							break;
						case 37 :
							if ($t.p.iCol -1 >=  0) {
								i = findNextVisible($t.p.iCol-1,'lft');
								scrollGrid($t.p.iRow, i,'h');
								$($t).jqGrid('editCell',$t.p.iRow, i,false);
							}
							break;
						case 39 :
							if ($t.p.iCol +1 <=  $t.p.colModel.length-1) {
								i = findNextVisible($t.p.iCol+1,'rgt');
								scrollGrid($t.p.iRow,i,'h');
								$($t).jqGrid('editCell',$t.p.iRow,i,false);
							}
							break;
						case 13:
							if (parseInt($t.p.iCol,10)>=0 && parseInt($t.p.iRow,10)>=0) {
								$($t).jqGrid('editCell',$t.p.iRow,$t.p.iCol,true);
							}
							break;
						default :
							return true;
						}
						return false;
					});
			});
		},
		getChangedCells : function (mthd) {
			var ret=[];
			if (!mthd) {mthd='all';}
			this.each(function(){
				var $t= this,nm;
				if (!$t.grid || $t.p.cellEdit !== true ) {return;}
				$($t.rows).each(function(j){
					var res = {};
					if ($(this).hasClass('edited')) {
						$('td',this).each( function(i) {
							nm = $t.p.colModel[i].name;
							if ( nm !== 'cb' && nm !== 'subgrid') {
								if (mthd=='dirty') {
									if ($(this).hasClass('dirty-cell')) {
										try {
											res[nm] = $.unformat.call($t,this,{rowId:$t.rows[j].id, colModel:$t.p.colModel[i]},i);
										} catch (e){
											res[nm] = $.jgrid.htmlDecode($(this).html());
										}
									}
								} else {
									try {
										res[nm] = $.unformat.call($t,this,{rowId:$t.rows[j].id,colModel:$t.p.colModel[i]},i);
									} catch (e) {
										res[nm] = $.jgrid.htmlDecode($(this).html());
									}
								}
							}
						});
						res.id = this.id;
						ret.push(res);
					}
				});
			});
			return ret;
		}
		/// end  cell editing
	});
})(jQuery);
/*jshint eqeqeq:false */
/*global jQuery */
(function($){
/**
 * jqGrid extension for SubGrid Data
 * Tony Tomov tony@trirand.com
 * http://trirand.com/blog/
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
**/
	'use strict';
	$.jgrid.extend({
		setSubGrid : function () {
			return this.each(function (){
				var $t = this, cm, i,
					suboptions = {
						plusicon : 'ui-icon-plus',
						minusicon : 'ui-icon-minus',
						openicon: 'ui-icon-carat-1-sw',
						expandOnLoad:  false,
						delayOnLoad : 50,
						selectOnExpand : false,
						reloadOnExpand : true
					};
				$t.p.subGridOptions = $.extend(suboptions, $t.p.subGridOptions || {});
				$t.p.colNames.unshift('');
				$t.p.colModel.unshift({name:'subgrid',width: $.jgrid.cell_width ?  $t.p.subGridWidth+$t.p.cellLayout : $t.p.subGridWidth,sortable: false,resizable:false,hidedlg:true,search:false,fixed:true});
				cm = $t.p.subGridModel;
				if(cm[0]) {
					cm[0].align = $.extend([],cm[0].align || []);
					for(i=0;i<cm[0].name.length;i++) { cm[0].align[i] = cm[0].align[i] || 'left';}
				}
			});
		},
		addSubGridCell :function (pos,iRow) {
			var prp='',ic,sid;
			this.each(function(){
				prp = this.formatCol(pos,iRow);
				sid= this.p.id;
				ic = this.p.subGridOptions.plusicon;
			});
			return '<td role="gridcell" aria-describedby="'+sid+'_subgrid" class="ui-sgcollapsed sgcollapsed" '+prp+'><a href=\'javascript:void(0);\'><span class=\'ui-icon '+ic+'\'></span></a></td>';
		},
		addSubGrid : function( pos, sind ) {
			return this.each(function(){
				var ts = this;
				if (!ts.grid ) { return; }
				//-------------------------
				var subGridCell = function(trdiv,cell,pos)
				{
					var tddiv = $('<td align=\''+ts.p.subGridModel[0].align[pos]+'\'></td>').html(cell);
					$(trdiv).append(tddiv);
				};
				var subGridXml = function(sjxml, sbid){
					var tddiv, i,  sgmap,
						dummy = $('<table cellspacing=\'0\' cellpadding=\'0\' border=\'0\'><tbody></tbody></table>'),
						trdiv = $('<tr></tr>');
					for (i = 0; i<ts.p.subGridModel[0].name.length; i++) {
						tddiv = $('<th class=\'ui-state-default ui-th-subgrid ui-th-column ui-th-'+ts.p.direction+'\'></th>');
						$(tddiv).html(ts.p.subGridModel[0].name[i]);
						$(tddiv).width( ts.p.subGridModel[0].width[i]);
						$(trdiv).append(tddiv);
					}
					$(dummy).append(trdiv);
					if (sjxml){
						sgmap = ts.p.xmlReader.subgrid;
						$(sgmap.root+' '+sgmap.row, sjxml).each( function(){
							trdiv = $('<tr class=\'ui-widget-content ui-subtblcell\'></tr>');
							if(sgmap.repeatitems === true) {
								$(sgmap.cell,this).each( function(i) {
									subGridCell(trdiv, $(this).text() || '&#160;',i);
								});
							} else {
								var f = ts.p.subGridModel[0].mapping || ts.p.subGridModel[0].name;
								if (f) {
									for (i=0;i<f.length;i++) {
										subGridCell(trdiv, $(f[i],this).text() || '&#160;',i);
									}
								}
							}
							$(dummy).append(trdiv);
						});
					}
					var pID = $('table:first',ts.grid.bDiv).attr('id')+'_';
					$('#'+$.jgrid.jqID(pID+sbid)).append(dummy);
					ts.grid.hDiv.loading = false;
					$('#load_'+$.jgrid.jqID(ts.p.id)).hide();
					return false;
				};
				var subGridJson = function(sjxml, sbid){
					var tddiv,result,i,cur, sgmap,j,
						dummy = $('<table cellspacing=\'0\' cellpadding=\'0\' border=\'0\'><tbody></tbody></table>'),
						trdiv = $('<tr></tr>');
					for (i = 0; i<ts.p.subGridModel[0].name.length; i++) {
						tddiv = $('<th class=\'ui-state-default ui-th-subgrid ui-th-column ui-th-'+ts.p.direction+'\'></th>');
						$(tddiv).html(ts.p.subGridModel[0].name[i]);
						$(tddiv).width( ts.p.subGridModel[0].width[i]);
						$(trdiv).append(tddiv);
					}
					$(dummy).append(trdiv);
					if (sjxml){
						sgmap = ts.p.jsonReader.subgrid;
						result = $.jgrid.getAccessor(sjxml, sgmap.root);
						if ( result !== undefined ) {
							for (i=0;i<result.length;i++) {
								cur = result[i];
								trdiv = $('<tr class=\'ui-widget-content ui-subtblcell\'></tr>');
								if(sgmap.repeatitems === true) {
									if(sgmap.cell) { cur=cur[sgmap.cell]; }
									for (j=0;j<cur.length;j++) {
										subGridCell(trdiv, cur[j] || '&#160;',j);
									}
								} else {
									var f = ts.p.subGridModel[0].mapping || ts.p.subGridModel[0].name;
									if(f.length) {
										for (j=0;j<f.length;j++) {
											subGridCell(trdiv, cur[f[j]] || '&#160;',j);
										}
									}
								}
								$(dummy).append(trdiv);
							}
						}
					}
					var pID = $('table:first',ts.grid.bDiv).attr('id')+'_';
					$('#'+$.jgrid.jqID(pID+sbid)).append(dummy);
					ts.grid.hDiv.loading = false;
					$('#load_'+$.jgrid.jqID(ts.p.id)).hide();
					return false;
				};
				var populatesubgrid = function( rd )
				{
					var sid,dp, i, j;
					sid = $(rd).attr('id');
					dp = {nd_: (new Date().getTime())};
					dp[ts.p.prmNames.subgridid]=sid;
					if(!ts.p.subGridModel[0]) { return false; }
					if(ts.p.subGridModel[0].params) {
						for(j=0; j < ts.p.subGridModel[0].params.length; j++) {
							for(i=0; i<ts.p.colModel.length; i++) {
								if(ts.p.colModel[i].name === ts.p.subGridModel[0].params[j]) {
									dp[ts.p.colModel[i].name]= $('td:eq('+i+')',rd).text().replace(/\&#160\;/ig,'');
								}
							}
						}
					}
					if(!ts.grid.hDiv.loading) {
						ts.grid.hDiv.loading = true;
						$('#load_'+$.jgrid.jqID(ts.p.id)).show();
						if(!ts.p.subgridtype) { ts.p.subgridtype = ts.p.datatype; }
						if($.isFunction(ts.p.subgridtype)) {
							ts.p.subgridtype.call(ts, dp);
						} else {
							ts.p.subgridtype = ts.p.subgridtype.toLowerCase();
						}
						switch(ts.p.subgridtype) {
						case 'xml':
						case 'json':
							$.ajax($.extend({
								type:ts.p.mtype,
								url: ts.p.subGridUrl,
								dataType:ts.p.subgridtype,
								data: $.isFunction(ts.p.serializeSubGridData)? ts.p.serializeSubGridData.call(ts, dp) : dp,
								complete: function(sxml) {
									if(ts.p.subgridtype === 'xml') {
										subGridXml(sxml.responseXML, sid);
									} else {
										subGridJson($.jgrid.parse(sxml.responseText),sid);
									}
									sxml=null;
								}
							}, $.jgrid.ajaxOptions, ts.p.ajaxSubgridOptions || {}));
							break;
						}
					}
					return false;
				};
				var _id, pID,atd, nhc=0, bfsc, r;
				$.each(ts.p.colModel,function(){
					if(this.hidden === true || this.name === 'rn' || this.name === 'cb') {
						nhc++;
					}
				});
				var len = ts.rows.length, i=1;
				if( sind !== undefined && sind > 0) {
					i = sind;
					len = sind+1;
				}
				while(i < len) {
					if($(ts.rows[i]).hasClass('jqgrow')) {
						$(ts.rows[i].cells[pos]).bind('click', function() {
							var tr = $(this).parent('tr')[0];
							r = tr.nextSibling;
							if($(this).hasClass('sgcollapsed')) {
								pID = ts.p.id;
								_id = tr.id;
								if(ts.p.subGridOptions.reloadOnExpand === true || ( ts.p.subGridOptions.reloadOnExpand === false && !$(r).hasClass('ui-subgrid') ) ) {
									atd = pos >=1 ? '<td colspan=\''+pos+'\'>&#160;</td>':'';
									bfsc = $(ts).triggerHandler('jqGridSubGridBeforeExpand', [pID + '_' + _id, _id]);
									bfsc = (bfsc === false || bfsc === 'stop') ? false : true;
									if(bfsc && $.isFunction(ts.p.subGridBeforeExpand)) {
										bfsc = ts.p.subGridBeforeExpand.call(ts, pID+'_'+_id,_id);
									}
									if(bfsc === false) {return false;}
									$(tr).after( '<tr role=\'row\' class=\'ui-subgrid\'>'+atd+'<td class=\'ui-widget-content subgrid-cell\'><span class=\'ui-icon '+ts.p.subGridOptions.openicon+'\'></span></td><td colspan=\''+parseInt(ts.p.colNames.length-1-nhc,10)+'\' class=\'ui-widget-content subgrid-data\'><div id='+pID+'_'+_id+' class=\'tablediv\'></div></td></tr>' );
									$(ts).triggerHandler('jqGridSubGridRowExpanded', [pID + '_' + _id, _id]);
									if( $.isFunction(ts.p.subGridRowExpanded)) {
										ts.p.subGridRowExpanded.call(ts, pID+'_'+ _id,_id);
									} else {
										populatesubgrid(tr);
									}
								} else {
									$(r).show();
								}
								$(this).html('<a href=\'javascript:void(0);\'><span class=\'ui-icon '+ts.p.subGridOptions.minusicon+'\'></span></a>').removeClass('sgcollapsed').addClass('sgexpanded');
								if(ts.p.subGridOptions.selectOnExpand) {
									$(ts).jqGrid('setSelection',_id);
								}
							} else if($(this).hasClass('sgexpanded')) {
								bfsc = $(ts).triggerHandler('jqGridSubGridRowColapsed', [pID + '_' + _id, _id]);
								bfsc = (bfsc === false || bfsc === 'stop') ? false : true;
								if( bfsc &&  $.isFunction(ts.p.subGridRowColapsed)) {
									_id = tr.id;
									bfsc = ts.p.subGridRowColapsed.call(ts, pID+'_'+_id,_id );
								}
								if(bfsc===false) {return false;}
								if(ts.p.subGridOptions.reloadOnExpand === true) {
									$(r).remove('.ui-subgrid');
								} else if($(r).hasClass('ui-subgrid')) { // incase of dynamic deleting
									$(r).hide();
								}
								$(this).html('<a href=\'javascript:void(0);\'><span class=\'ui-icon '+ts.p.subGridOptions.plusicon+'\'></span></a>').removeClass('sgexpanded').addClass('sgcollapsed');
							}
							return false;
						});
					}
					i++;
				}
				if(ts.p.subGridOptions.expandOnLoad === true) {
					$(ts.rows).filter('.jqgrow').each(function(index,row){
						$(row.cells[0]).click();
					});
				}
				ts.subGridXml = function(xml,sid) {subGridXml(xml,sid);};
				ts.subGridJson = function(json,sid) {subGridJson(json,sid);};
			});
		},
		expandSubGridRow : function(rowid) {
			return this.each(function () {
				var $t = this;
				if(!$t.grid && !rowid) {return;}
				if($t.p.subGrid===true) {
					var rc = $(this).jqGrid('getInd',rowid,true);
					if(rc) {
						var sgc = $('td.sgcollapsed',rc)[0];
						if(sgc) {
							$(sgc).trigger('click');
						}
					}
				}
			});
		},
		collapseSubGridRow : function(rowid) {
			return this.each(function () {
				var $t = this;
				if(!$t.grid && !rowid) {return;}
				if($t.p.subGrid===true) {
					var rc = $(this).jqGrid('getInd',rowid,true);
					if(rc) {
						var sgc = $('td.sgexpanded',rc)[0];
						if(sgc) {
							$(sgc).trigger('click');
						}
					}
				}
			});
		},
		toggleSubGridRow : function(rowid) {
			return this.each(function () {
				var $t = this;
				if(!$t.grid && !rowid) {return;}
				if($t.p.subGrid===true) {
					var rc = $(this).jqGrid('getInd',rowid,true);
					if(rc) {
						var sgc = $('td.sgcollapsed',rc)[0];
						if(sgc) {
							$(sgc).trigger('click');
						} else {
							sgc = $('td.sgexpanded',rc)[0];
							if(sgc) {
								$(sgc).trigger('click');
							}
						}
					}
				}
			});
		}
	});
})(jQuery);
/**
 * jqGrid extension - Tree Grid
 * Tony Tomov tony@trirand.com
 * http://trirand.com/blog/
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
**/

/*jshint eqeqeq:false */
/*global jQuery */
(function($) {
	'use strict';
	$.jgrid.extend({
		setTreeNode : function(i, len){
			return this.each(function(){
				var $t = this;
				if( !$t.grid || !$t.p.treeGrid ) {return;}
				var expCol = $t.p.expColInd,
					expanded = $t.p.treeReader.expanded_field,
					isLeaf = $t.p.treeReader.leaf_field,
					level = $t.p.treeReader.level_field,
					icon = $t.p.treeReader.icon_field,
					loaded = $t.p.treeReader.loaded,  lft, rgt, curLevel, ident,lftpos, twrap,
					ldat, lf;
				while(i<len) {
					var ind = $t.rows[i].id, dind = $t.p._index[ind], expan;
					ldat = $t.p.data[dind];
					//$t.rows[i].level = ldat[level];
					if($t.p.treeGridModel == 'nested') {
						if(!ldat[isLeaf]) {
							lft = parseInt(ldat[$t.p.treeReader.left_field],10);
							rgt = parseInt(ldat[$t.p.treeReader.right_field],10);
							// NS Model
							ldat[isLeaf] = (rgt === lft+1) ? 'true' : 'false';
							$t.rows[i].cells[$t.p._treeleafpos].innerHTML = ldat[isLeaf];
						}
					}
					//else {
					//row.parent_id = rd[$t.p.treeReader.parent_id_field];
					//}
					if (ldat===undefined){i++,len++;continue;}
					curLevel = parseInt(ldat[level],10);
					if($t.p.tree_root_level === 0) {
						ident = curLevel+1;
						lftpos = curLevel;
					} else {
						ident = curLevel;
						lftpos = curLevel -1;
					}
					twrap = '<div class=\'tree-wrap tree-wrap-'+$t.p.direction+'\' style=\'width:'+(ident*18)+'px;\'>';
					twrap += '<div style=\''+($t.p.direction=='rtl' ? 'right:' : 'left:')+(lftpos*18)+'px;\' class=\'ui-icon ';


					if(ldat[loaded] !== undefined) {
						if(ldat[loaded]=='true' || ldat[loaded]===true) {
							ldat[loaded] = true;
						} else {
							ldat[loaded] = false;
						}
					}
					if(ldat[isLeaf] == 'true' || ldat[isLeaf] === true) {
						twrap += ((ldat[icon] !== undefined && ldat[icon] !== '') ? ldat[icon] : $t.p.treeIcons.leaf)+' tree-leaf treeclick';
						ldat[isLeaf] = true;
						lf='leaf';
					} else {
						ldat[isLeaf] = false;
						lf='';
					}
					ldat[expanded] = ((ldat[expanded] == 'true' || ldat[expanded] === true) ? true : false) && (ldat[loaded] || ldat[loaded] === undefined);
					if(ldat[expanded] === false) {
						twrap += ((ldat[isLeaf] === true) ? '\'' : $t.p.treeIcons.plus+' tree-plus treeclick\'');
					} else {
						twrap += ((ldat[isLeaf] === true) ? '\'' : $t.p.treeIcons.minus+' tree-minus treeclick\'');
					}

					twrap += '></div></div>';
					$($t.rows[i].cells[expCol]).wrapInner('<span class=\'cell-wrapper'+lf+'\'></span>').prepend(twrap);

					if(curLevel !== parseInt($t.p.tree_root_level,10)) {
						var pn = $($t).jqGrid('getNodeParent',ldat);
						expan = pn && pn.hasOwnProperty(expanded) ? pn[expanded] : true;
						if( !expan ){
							$($t.rows[i]).css('display','none');
						}
					}
					$($t.rows[i].cells[expCol])
						.find('div.treeclick')
						.bind('click',function(e){
							var target = e.target || e.srcElement,
								ind2 =$(target,$t.rows).closest('tr.jqgrow')[0].id,
								pos = $t.p._index[ind2];
							if(!$t.p.data[pos][isLeaf]){
								if($t.p.data[pos][expanded]){
									$($t).jqGrid('collapseRow',$t.p.data[pos]);
									$($t).jqGrid('collapseNode',$t.p.data[pos]);
								} else {
									$($t).jqGrid('expandRow',$t.p.data[pos]);
									$($t).jqGrid('expandNode',$t.p.data[pos]);
								}
							}
							return false;
						});
					if($t.p.ExpandColClick === true) {
						$($t.rows[i].cells[expCol])
							.find('span.cell-wrapper')
							.css('cursor','pointer')
							.bind('click',function(e) {
								var target = e.target || e.srcElement,
									ind2 =$(target,$t.rows).closest('tr.jqgrow')[0].id,
									pos = $t.p._index[ind2];
								if(!$t.p.data[pos][isLeaf]){
									if($t.p.data[pos][expanded]){
										$($t).jqGrid('collapseRow',$t.p.data[pos]);
										$($t).jqGrid('collapseNode',$t.p.data[pos]);
									} else {
										$($t).jqGrid('expandRow',$t.p.data[pos]);
										$($t).jqGrid('expandNode',$t.p.data[pos]);
									}
								}
								$($t).jqGrid('setSelection',ind2);
								return false;
							});
					}
					i++;
				}

			});
		},
		setTreeGrid : function() {
			return this.each(function (){
				var $t = this, i=0, pico, ecol = false, nm, key, tkey, dupcols=[];
				if(!$t.p.treeGrid) {return;}
				if(!$t.p.treedatatype ) {$.extend($t.p,{treedatatype: $t.p.datatype});}
				$t.p.subGrid = false;$t.p.altRows =false;
				$t.p.pgbuttons = false;$t.p.pginput = false;
				$t.p.gridview =  true;
				if($t.p.rowTotal === null ) { $t.p.rowNum = 10000; }
				$t.p.multiselect = false;$t.p.rowList = [];
				$t.p.expColInd = 0;
				pico = 'ui-icon-triangle-1-' + ($t.p.direction=='rtl' ? 'w' : 'e');
				$t.p.treeIcons = $.extend({plus:pico,minus:'ui-icon-triangle-1-s',leaf:'ui-icon-radio-off'},$t.p.treeIcons || {});
				if($t.p.treeGridModel == 'nested') {
					$t.p.treeReader = $.extend({
						level_field: 'level',
						left_field:'lft',
						right_field: 'rgt',
						leaf_field: 'isLeaf',
						expanded_field: 'expanded',
						loaded: 'loaded',
						icon_field: 'icon'
					},$t.p.treeReader);
				} else if($t.p.treeGridModel == 'adjacency') {
					$t.p.treeReader = $.extend({
						level_field: 'level',
						parent_id_field: 'parent',
						leaf_field: 'isLeaf',
						expanded_field: 'expanded',
						loaded: 'loaded',
						icon_field: 'icon'
					},$t.p.treeReader );
				}
				for ( key in $t.p.colModel){
					if($t.p.colModel.hasOwnProperty(key)) {
						nm = $t.p.colModel[key].name;
						if( nm == $t.p.ExpandColumn && !ecol ) {
							ecol = true;
							$t.p.expColInd = i;
						}
						i++;
						//
						for(tkey in $t.p.treeReader) {
							if($t.p.treeReader.hasOwnProperty(tkey) && $t.p.treeReader[tkey] == nm) {
								dupcols.push(nm);
							}
						}
					}
				}
				$.each($t.p.treeReader,function(j,n){
					if(n && $.inArray(n, dupcols) === -1){
						if(j==='leaf_field') { $t.p._treeleafpos= i; }
						i++;
						$t.p.colNames.push(n);
						$t.p.colModel.push({name:n,width:1,hidden:true,sortable:false,resizable:false,hidedlg:true,editable:true,search:false});
					}
				});
			});
		},
		expandRow: function (record){
			this.each(function(){
				var $t = this;
				if(!$t.grid || !$t.p.treeGrid) {return;}
				var childern = $($t).jqGrid('getNodeChildren',record),
					//if ($($t).jqGrid("isVisibleNode",record)) {
					expanded = $t.p.treeReader.expanded_field,
					rows = $t.rows;
				$(childern).each(function(){
					var id  = $.jgrid.getAccessor(this,$t.p.localReader.id);
					$(rows.namedItem(id)).css('display','');
					if(this[expanded]) {
						$($t).jqGrid('expandRow',this);
					}
				});
			//}
			});
		},
		collapseRow : function (record) {
			this.each(function(){
				var $t = this;
				if(!$t.grid || !$t.p.treeGrid) {return;}
				var childern = $($t).jqGrid('getNodeChildren',record),
					expanded = $t.p.treeReader.expanded_field,
					rows = $t.rows;
				$(childern).each(function(){
					var id  = $.jgrid.getAccessor(this,$t.p.localReader.id);
					$(rows.namedItem(id)).css('display','none');
					if(this[expanded]){
						$($t).jqGrid('collapseRow',this);
					}
				});
			});
		},
		// NS ,adjacency models
		getRootNodes : function() {
			var result = [];
			this.each(function(){
				var $t = this;
				if(!$t.grid || !$t.p.treeGrid) {return;}
				switch ($t.p.treeGridModel) {
				case 'nested' :
					var level = $t.p.treeReader.level_field;
					$($t.p.data).each(function(){
						if(parseInt(this[level],10) === parseInt($t.p.tree_root_level,10)) {
							result.push(this);
						}
					});
					break;
				case 'adjacency' :
					var parent_id = $t.p.treeReader.parent_id_field;
					$($t.p.data).each(function(){
						if(this[parent_id] === null || String(this[parent_id]).toLowerCase() == 'null') {
							result.push(this);
						}
					});
					break;
				}
			});
			return result;
		},
		getNodeDepth : function(rc) {
			var ret = null;
			this.each(function(){
				if(!this.grid || !this.p.treeGrid) {return;}
				var $t = this;
				switch ($t.p.treeGridModel) {
				case 'nested' :
					var level = $t.p.treeReader.level_field;
					ret = parseInt(rc[level],10) - parseInt($t.p.tree_root_level,10);
					break;
				case 'adjacency' :
					ret = $($t).jqGrid('getNodeAncestors',rc).length;
					break;
				}
			});
			return ret;
		},
		getNodeParent : function(rc) {
			var result = null;
			this.each(function(){
				var $t = this;
				if(!$t.grid || !$t.p.treeGrid) {return;}
				switch ($t.p.treeGridModel) {
				case 'nested' :
					var lftc = $t.p.treeReader.left_field,
						rgtc = $t.p.treeReader.right_field,
						levelc = $t.p.treeReader.level_field,
						lft = parseInt(rc[lftc],10), rgt = parseInt(rc[rgtc],10), level = parseInt(rc[levelc],10);
					$(this.p.data).each(function(){
						if(parseInt(this[levelc],10) === level-1 && parseInt(this[lftc],10) < lft && parseInt(this[rgtc],10) > rgt) {
							result = this;
							return false;
						}
					});
					break;
				case 'adjacency' :
					var parent_id = $t.p.treeReader.parent_id_field,
						dtid = $t.p.localReader.id;
					$(this.p.data).each(function(){
						if(this[dtid] == rc[parent_id] ) {
							result = this;
							return false;
						}
					});
					break;
				}
			});
			return result;
		},
		getNodeChildren : function(rc) {
			var result = [];
			this.each(function(){
				var $t = this;
				if(!$t.grid || !$t.p.treeGrid) {return;}
				switch ($t.p.treeGridModel) {
				case 'nested' :
					var lftc = $t.p.treeReader.left_field,
						rgtc = $t.p.treeReader.right_field,
						levelc = $t.p.treeReader.level_field,
						lft = parseInt(rc[lftc],10), rgt = parseInt(rc[rgtc],10), level = parseInt(rc[levelc],10);
					$(this.p.data).each(function(){
						if(parseInt(this[levelc],10) === level+1 && parseInt(this[lftc],10) > lft && parseInt(this[rgtc],10) < rgt) {
							result.push(this);
						}
					});
					break;
				case 'adjacency' :
					var parent_id = $t.p.treeReader.parent_id_field,
						dtid = $t.p.localReader.id;
					$(this.p.data).each(function(){
						if(this[parent_id] == rc[dtid]) {
							result.push(this);
						}
					});
					break;
				}
			});
			return result;
		},
		getFullTreeNode : function(rc) {
			var result = [];
			this.each(function(){
				var $t = this, len;
				if(!$t.grid || !$t.p.treeGrid) {return;}
				switch ($t.p.treeGridModel) {
				case 'nested' :
					var lftc = $t.p.treeReader.left_field,
						rgtc = $t.p.treeReader.right_field,
						levelc = $t.p.treeReader.level_field,
						lft = parseInt(rc[lftc],10), rgt = parseInt(rc[rgtc],10), level = parseInt(rc[levelc],10);
					$(this.p.data).each(function(){
						if(parseInt(this[levelc],10) >= level && parseInt(this[lftc],10) >= lft && parseInt(this[lftc],10) <= rgt) {
							result.push(this);
						}
					});
					break;
				case 'adjacency' :
					if(rc) {
						result.push(rc);
						var parent_id = $t.p.treeReader.parent_id_field,
							dtid = $t.p.localReader.id;
						$(this.p.data).each(function(i){
							len = result.length;
							for (i = 0; i < len; i++) {
								if (result[i][dtid] == this[parent_id]) {
									result.push(this);
									break;
								}
							}
						});
					}
					break;
				}
			});
			return result;
		},
		// End NS, adjacency Model
		getNodeAncestors : function(rc) {
			var ancestors = [];
			this.each(function(){
				if(!this.grid || !this.p.treeGrid) {return;}
				var parent = $(this).jqGrid('getNodeParent',rc);
				while (parent) {
					ancestors.push(parent);
					parent = $(this).jqGrid('getNodeParent',parent);
				}
			});
			return ancestors;
		},
		isVisibleNode : function(rc) {
			var result = true;
			this.each(function(){
				var $t = this;
				if(!$t.grid || !$t.p.treeGrid) {return;}
				var ancestors = $($t).jqGrid('getNodeAncestors',rc),
					expanded = $t.p.treeReader.expanded_field;
				$(ancestors).each(function(){
					result = result && this[expanded];
					if(!result) {return false;}
				});
			});
			return result;
		},
		isNodeLoaded : function(rc) {
			var result;
			this.each(function(){
				var $t = this;
				if(!$t.grid || !$t.p.treeGrid) {return;}
				var isLeaf = $t.p.treeReader.leaf_field;
				if(rc !== undefined ) {
					if(rc.loaded !== undefined) {
						result = rc.loaded;
					} else if( rc[isLeaf] || $($t).jqGrid('getNodeChildren',rc).length > 0){
						result = true;
					} else {
						result = false;
					}
				} else {
					result = false;
				}
			});
			return result;
		},
		expandNode : function(rc) {
			return this.each(function(){
				if(!this.grid || !this.p.treeGrid) {return;}
				var expanded = this.p.treeReader.expanded_field,
					parent = this.p.treeReader.parent_id_field,
					loaded = this.p.treeReader.loaded,
					level = this.p.treeReader.level_field,
					lft = this.p.treeReader.left_field,
					rgt = this.p.treeReader.right_field;

				if(!rc[expanded]) {
					var id = $.jgrid.getAccessor(rc,this.p.localReader.id);
					var rc1 = $('#'+$.jgrid.jqID(id),this.grid.bDiv)[0];
					var position = this.p._index[id];
					if( $(this).jqGrid('isNodeLoaded',this.p.data[position]) ) {
						rc[expanded] = true;
						$('div.treeclick',rc1).removeClass(this.p.treeIcons.plus+' tree-plus').addClass(this.p.treeIcons.minus+' tree-minus');
					} else if (!this.grid.hDiv.loading) {
						rc[expanded] = true;
						$('div.treeclick',rc1).removeClass(this.p.treeIcons.plus+' tree-plus').addClass(this.p.treeIcons.minus+' tree-minus');
						this.p.treeANode = rc1.rowIndex;
						this.p.datatype = this.p.treedatatype;
						if(this.p.treeGridModel == 'nested') {
							$(this).jqGrid('setGridParam',{postData:{nodeid:id,n_left:rc[lft],n_right:rc[rgt],n_level:rc[level]}});
						} else {
							$(this).jqGrid('setGridParam',{postData:{nodeid:id,parentid:rc[parent],n_level:rc[level]}} );
						}
						$(this).trigger('reloadGrid');
						rc[loaded] = true;
						if(this.p.treeGridModel == 'nested') {
							$(this).jqGrid('setGridParam',{postData:{nodeid:'',n_left:'',n_right:'',n_level:''}});
						} else {
							$(this).jqGrid('setGridParam',{postData:{nodeid:'',parentid:'',n_level:''}});
						}
					}
				}
			});
		},
		collapseNode : function(rc) {
			return this.each(function(){
				if(!this.grid || !this.p.treeGrid) {return;}
				var expanded = this.p.treeReader.expanded_field;
				if(rc[expanded]) {
					rc[expanded] = false;
					var id = $.jgrid.getAccessor(rc,this.p.localReader.id);
					var rc1 = $('#'+$.jgrid.jqID(id),this.grid.bDiv)[0];
					$('div.treeclick',rc1).removeClass(this.p.treeIcons.minus+' tree-minus').addClass(this.p.treeIcons.plus+' tree-plus');
				}
			});
		},
		SortTree : function( sortname, newDir, st, datefmt) {
			return this.each(function(){
				if(!this.grid || !this.p.treeGrid) {return;}
				var i, len,
					rec, records = [], $t = this, query, roots,
					rt = $(this).jqGrid('getRootNodes');
				// Sorting roots
				query = $.jgrid.from(rt);
				query.orderBy(sortname,newDir,st, datefmt);
				roots = query.select();

				// Sorting children
				for (i = 0, len = roots.length; i < len; i++) {
					rec = roots[i];
					records.push(rec);
					$(this).jqGrid('collectChildrenSortTree',records, rec, sortname, newDir,st, datefmt);
				}
				$.each(records, function(index) {
					var id  = $.jgrid.getAccessor(this,$t.p.localReader.id);
					$('#'+$.jgrid.jqID($t.p.id)+ ' tbody tr:eq('+index+')').after($('tr#'+$.jgrid.jqID(id),$t.grid.bDiv));
				});
				query = null;roots=null;records=null;
			});
		},
		collectChildrenSortTree : function(records, rec, sortname, newDir,st, datefmt) {
			return this.each(function(){
				if(!this.grid || !this.p.treeGrid) {return;}
				var i, len,
					child, ch, query, children;
				ch = $(this).jqGrid('getNodeChildren',rec);
				query = $.jgrid.from(ch);
				query.orderBy(sortname, newDir, st, datefmt);
				children = query.select();
				for (i = 0, len = children.length; i < len; i++) {
					child = children[i];
					records.push(child);
					$(this).jqGrid('collectChildrenSortTree',records, child, sortname, newDir, st, datefmt);
				}
			});
		},
		// experimental
		setTreeRow : function(rowid, data) {
			var success=false;
			this.each(function(){
				var t = this;
				if(!t.grid || !t.p.treeGrid) {return;}
				success = $(t).jqGrid('setRowData',rowid,data);
			});
			return success;
		},
		delTreeNode : function (rowid) {
			return this.each(function () {
				var $t = this, rid = $t.p.localReader.id, i,
					left = $t.p.treeReader.left_field,
					right = $t.p.treeReader.right_field, myright, width, res, key;
				if(!$t.grid || !$t.p.treeGrid) {return;}
				var rc = $t.p._index[rowid];
				if (rc !== undefined) {
				// nested
					myright = parseInt($t.p.data[rc][right],10);
					width = myright -  parseInt($t.p.data[rc][left],10) + 1;
					var dr = $($t).jqGrid('getFullTreeNode',$t.p.data[rc]);
					if(dr.length>0){
						for (i=0;i<dr.length;i++){
							$($t).jqGrid('delRowData',dr[i][rid]);
						}
					}
					if( $t.p.treeGridModel === 'nested') {
					// ToDo - update grid data
						res = $.jgrid.from($t.p.data)
							.greater(left,myright,{stype:'integer'})
							.select();
						if(res.length) {
							for( key in res) {
								if(res.hasOwnProperty(key)) {
									res[key][left] = parseInt(res[key][left],10) - width ;
								}
							}
						}
						res = $.jgrid.from($t.p.data)
							.greater(right,myright,{stype:'integer'})
							.select();
						if(res.length) {
							for( key in res) {
								if(res.hasOwnProperty(key)) {
									res[key][right] = parseInt(res[key][right],10) - width ;
								}
							}
						}
					}
				}
			});
		},
		addChildNode : function( nodeid, parentid, data, expandData ) {
		//return this.each(function(){
			var $t = this[0];
			if(data) {
			// we suppose tha the id is autoincremet and
				var expanded = $t.p.treeReader.expanded_field,
					isLeaf = $t.p.treeReader.leaf_field,
					level = $t.p.treeReader.level_field,
					//icon = $t.p.treeReader.icon_field,
					parent = $t.p.treeReader.parent_id_field,
					left = $t.p.treeReader.left_field,
					right = $t.p.treeReader.right_field,
					loaded = $t.p.treeReader.loaded,
					method, parentindex, parentdata, parentlevel, i, len, max=0, rowind = parentid, leaf, maxright;
				if(expandData===undefined) {expandData = false;}
				if ( nodeid === undefined || nodeid === null ) {
					i = $t.p.data.length-1;
					if(	i>= 0 ) {
						while(i>=0){max = Math.max(max, parseInt($t.p.data[i][$t.p.localReader.id],10)); i--;}
					}
					nodeid = max+1;
				}
				var prow = $($t).jqGrid('getInd', parentid);
				leaf = false;
				// if not a parent we assume root
				if ( parentid === undefined  || parentid === null || parentid==='') {
					parentid = null;
					rowind = null;
					method = 'last';
					parentlevel = $t.p.tree_root_level;
					i = $t.p.data.length+1;
				} else {
					method = 'after';
					parentindex = $t.p._index[parentid];
					parentdata = $t.p.data[parentindex];
					parentid = parentdata[$t.p.localReader.id];
					parentlevel = parseInt(parentdata[level],10)+1;
					var childs = $($t).jqGrid('getFullTreeNode', parentdata);
					// if there are child nodes get the last index of it
					if(childs.length) {
						i = childs[childs.length-1][$t.p.localReader.id];
						rowind = i;
						i = $($t).jqGrid('getInd',rowind)+1;
					} else {
						i = $($t).jqGrid('getInd', parentid)+1;
					}
					// if the node is leaf
					if(parentdata[isLeaf]) {
						leaf = true;
						parentdata[expanded] = true;
						//var prow = $($t).jqGrid('getInd', parentid);
						$($t.rows[prow])
							.find('span.cell-wrapperleaf').removeClass('cell-wrapperleaf').addClass('cell-wrapper')
							.end()
							.find('div.tree-leaf').removeClass($t.p.treeIcons.leaf+' tree-leaf').addClass($t.p.treeIcons.minus+' tree-minus');
						$t.p.data[parentindex][isLeaf] = false;
						parentdata[loaded] = true;
					}
				}
				len = i+1;

				if( data[expanded]===undefined)  {data[expanded]= false;}
				if( data[loaded]===undefined )  { data[loaded] = false;}
				data[level] = parentlevel;
				if( data[isLeaf]===undefined) {data[isLeaf]= true;}
				if( $t.p.treeGridModel === 'adjacency') {
					data[parent] = parentid;
				}
				if( $t.p.treeGridModel === 'nested') {
				// this method requiere more attention
					var query, res, key;
					//maxright = parseInt(maxright,10);
					// ToDo - update grid data
					if(parentid !== null) {
						maxright = parseInt(parentdata[right],10);
						query = $.jgrid.from($t.p.data);
						query = query.greaterOrEquals(right,maxright,{stype:'integer'});
						res = query.select();
						if(res.length) {
							for( key in res) {
								if(res.hasOwnProperty(key)) {
									res[key][left] = res[key][left] > maxright ? parseInt(res[key][left],10) +2 : res[key][left];
									res[key][right] = res[key][right] >= maxright ? parseInt(res[key][right],10) +2 : res[key][right];
								}
							}
						}
						data[left] = maxright;
						data[right]= maxright+1;
					} else {
						maxright = parseInt( $($t).jqGrid('getCol', right, false, 'max'), 10);
						res = $.jgrid.from($t.p.data)
							.greater(left,maxright,{stype:'integer'})
							.select();
						if(res.length) {
							for( key in res) {
								if(res.hasOwnProperty(key)) {
									res[key][left] = parseInt(res[key][left],10) +2 ;
								}
							}
						}
						res = $.jgrid.from($t.p.data)
							.greater(right,maxright,{stype:'integer'})
							.select();
						if(res.length) {
							for( key in res) {
								if(res.hasOwnProperty(key)) {
									res[key][right] = parseInt(res[key][right],10) +2 ;
								}
							}
						}
						data[left] = maxright+1;
						data[right] = maxright + 2;
					}
				}
				if( parentid === null || $($t).jqGrid('isNodeLoaded',parentdata) || leaf ) {
					$($t).jqGrid('addRowData', nodeid, data, method, rowind);
					$($t).jqGrid('setTreeNode', i, len);
				}
				if(parentdata && !parentdata[expanded] && expandData) {
					$($t.rows[prow])
						.find('div.treeclick')
						.click();
				}
			}
		//});
		}
	});
})(jQuery);
/*jshint eqeqeq:false, eqnull:true */
/*global jQuery */
// Grouping module
(function($){
	'use strict';
	$.extend($.jgrid,{
		template : function(format){ //jqgformat
			var args = $.makeArray(arguments).slice(1), j, al = args.length;
			if(format==null) { format = ''; }
			return format.replace(/\{([\w\-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g, function(m,i){
				if(!isNaN(parseInt(i,10))) {
					return args[parseInt(i,10)];
				}
				for(j=0; j < al;j++) {
					if($.isArray(args[j])) {
						var nmarr = args[ j ],
							k = nmarr.length;
						while(k--) {
							if(i===nmarr[k].nm) {
								return nmarr[k].v;
							}
						}
					}
				}
			});
		}
	});
	$.jgrid.extend({
		groupingSetup : function () {
			return this.each(function (){
				var $t = this, i, j, cml, cm = $t.p.colModel, grp = $t.p.groupingView;
				if(grp !== null && ( (typeof grp === 'object') || $.isFunction(grp) ) ) {
					if(!grp.groupField.length) {
						$t.p.grouping = false;
					} else {
						if (grp.visibiltyOnNextGrouping === undefined) {
							grp.visibiltyOnNextGrouping = [];
						}

						grp.lastvalues=[];
						grp.groups =[];
						grp.counters =[];
						for(i=0;i<grp.groupField.length;i++) {
							if(!grp.groupOrder[i]) {
								grp.groupOrder[i] = '';
							}
							if(!grp.groupText[i]) {
								grp.groupText[i] = '{0}';
							}
							if( typeof grp.groupColumnShow[i] !== 'boolean') {
								grp.groupColumnShow[i] = true;
							}
							if( typeof grp.groupSummary[i] !== 'boolean') {
								grp.groupSummary[i] = false;
							}
							if(grp.groupColumnShow[i] === true) {
								grp.visibiltyOnNextGrouping[i] = true;
								$($t).jqGrid('showCol',grp.groupField[i]);
							} else {
								grp.visibiltyOnNextGrouping[i] = $('#'+$.jgrid.jqID($t.p.id+'_'+grp.groupField[i])).is(':visible');
								$($t).jqGrid('hideCol',grp.groupField[i]);
							}
						}
						grp.summary =[];
						for(j=0, cml = cm.length; j < cml; j++) {
							if(cm[j].summaryType) {
								grp.summary.push({nm:cm[j].name,st:cm[j].summaryType, v: '', sr: cm[j].summaryRound, srt: cm[j].summaryRoundType || 'round'});
							}
						}
					}
				} else {
					$t.p.grouping = false;
				}
			});
		},
		groupingPrepare : function (rData, gdata, record, irow) {
			this.each(function(){
				var grp = this.p.groupingView, $t= this, i,
					grlen = grp.groupField.length,
					fieldName,
					v,
					displayName,
					displayValue,
					changed = 0;
				for(i=0;i<grlen;i++) {
					fieldName = grp.groupField[i];
					displayName = grp.displayField[i];
					v = record[fieldName];
					displayValue = displayName == null ? null : record[displayName];

					if( displayValue == null ) {
						displayValue = v;
					}
					if( v !== undefined ) {
						if(irow === 0 ) {
						// First record always starts a new group
							grp.groups.push({idx:i,dataIndex:fieldName,value:v, displayValue: displayValue, startRow: irow, cnt:1, summary : [] } );
							grp.lastvalues[i] = v;
							grp.counters[i] = {cnt:1, pos:grp.groups.length-1, summary: $.extend(true,[],grp.summary)};
							$.each(grp.counters[i].summary,function() {
								if ($.isFunction(this.st)) {
									this.v = this.st.call($t, this.v, this.nm, record);
								} else {
									this.v = $($t).jqGrid('groupingCalculations.handler',this.st, this.v, this.nm, this.sr, this.srt, record);
								}
							});
							grp.groups[grp.counters[i].pos].summary = grp.counters[i].summary;
						} else {
							if( typeof v !== 'object' && grp.lastvalues[i] !== v ) {
							// This record is not in same group as previous one
								grp.groups.push({idx:i,dataIndex:fieldName,value:v, displayValue: displayValue, startRow: irow, cnt:1, summary : [] } );
								grp.lastvalues[i] = v;
								changed = 1;
								grp.counters[i] = {cnt:1, pos:grp.groups.length-1, summary: $.extend(true,[],grp.summary)};
								$.each(grp.counters[i].summary,function() {
									if ($.isFunction(this.st)) {
										this.v = this.st.call($t, this.v, this.nm, record);
									} else {
										this.v = $($t).jqGrid('groupingCalculations.handler',this.st, this.v, this.nm, this.sr, this.srt, record);
									}
								});
								grp.groups[grp.counters[i].pos].summary = grp.counters[i].summary;
							} else {
								if (changed === 1) {
								// This group has changed because an earlier group changed.
									grp.groups.push({idx:i,dataIndex:fieldName,value:v, displayValue: displayValue, startRow: irow, cnt:1, summary : [] } );
									grp.lastvalues[i] = v;
									grp.counters[i] = {cnt:1, pos:grp.groups.length-1, summary: $.extend(true,[],grp.summary)};
									$.each(grp.counters[i].summary,function() {
										if ($.isFunction(this.st)) {
											this.v = this.st.call($t, this.v, this.nm, record);
										} else {
											this.v = $($t).jqGrid('groupingCalculations.handler',this.st, this.v, this.nm, this.sr, this.srt, record);
										}
									});
									grp.groups[grp.counters[i].pos].summary = grp.counters[i].summary;
								} else {
									grp.counters[i].cnt += 1;
									grp.groups[grp.counters[i].pos].cnt = grp.counters[i].cnt;
									$.each(grp.counters[i].summary,function() {
										if ($.isFunction(this.st)) {
											this.v = this.st.call($t, this.v, this.nm, record);
										} else {
											this.v = $($t).jqGrid('groupingCalculations.handler',this.st, this.v, this.nm, this.sr, this.srt, record);
										}
									});
									grp.groups[grp.counters[i].pos].summary = grp.counters[i].summary;
								}
							}
						}
					}
				}
				gdata.push( rData );
			});
			return gdata;
		},
		groupingToggle : function(hid){
			this.each(function(){
				var $t = this,
					grp = $t.p.groupingView,
					strpos = hid.split('_'),
					//uid = hid.substring(0,strpos+1),
					num = parseInt(strpos[strpos.length-2], 10);
				strpos.splice(strpos.length-2,2);
				var uid = strpos.join('_'),
					minus = grp.minusicon,
					plus = grp.plusicon,
					tar = $('#'+$.jgrid.jqID(hid)),
					r = tar.length ? tar[0].nextSibling : null,
					tarspan = $('#'+$.jgrid.jqID(hid)+' span.'+'tree-wrap-'+$t.p.direction),
					collapsed = false, tspan;
				if( tarspan.hasClass(minus) ) {
					if(grp.showSummaryOnHide) {
						if(r){
							while(r) {
								if($(r).hasClass('jqfoot') ) {
									var lv = parseInt($(r).attr('jqfootlevel'),10);
									if(  lv <= num) {
										break;
									}
								}
								$(r).hide();
								r = r.nextSibling;
							}
						}
					} else  {
						if(r){
							while(r) {
								if( $(r).hasClass(uid+'_'+String(num) ) || $(r).hasClass(uid+'_'+String(num-1))) { break; }
								$(r).hide();
								r = r.nextSibling;
							}
						}
					}
					tarspan.removeClass(minus).addClass(plus);
					collapsed = true;
				} else {
					if(r){
						while(r) {
							if($(r).hasClass(uid+'_'+String(num)) || $(r).hasClass(uid+'_'+String(num-1)) ) { break; }
							$(r).show();
							tspan = $(r).find('span.'+'tree-wrap-'+$t.p.direction);
							if( tspan && $(tspan).hasClass(plus) ) {
								$(tspan).removeClass(plus).addClass(minus);
							}
							r = r.nextSibling;
						}
					}
					tarspan.removeClass(plus).addClass(minus);
				}
				$($t).triggerHandler('jqGridGroupingClickGroup', [hid , collapsed]);
				if( $.isFunction($t.p.onClickGroup)) { $t.p.onClickGroup.call($t, hid , collapsed); }

			});
			return false;
		},
		groupingRender : function (grdata, colspans ) {
			return this.each(function(){
				var $t = this,
					grp = $t.p.groupingView,
					str = '', icon = '', hid, clid, pmrtl = grp.groupCollapse ? grp.plusicon : grp.minusicon, gv, cp=[], len =grp.groupField.length;
				pmrtl += ' tree-wrap-'+$t.p.direction;
				$.each($t.p.colModel, function (i,n){
					var ii;
					for(ii=0;ii<len;ii++) {
						if(grp.groupField[ii] === n.name ) {
							cp[ii] = i;
							break;
						}
					}
				});
				var toEnd = 0;
				function findGroupIdx( ind , offset, grp) {
					var ret = false, i;
					if(offset===0) {
						ret = grp[ind];
					} else {
						var id = grp[ind].idx;
						if(id===0) {
							ret = grp[ind];
						}  else {
							for(i=ind;i >= 0; i--) {
								if(grp[i].idx === id-offset) {
									ret = grp[i];
									break;
								}
							}
						}
					}
					return ret;
				}
				var sumreverse = $.makeArray(grp.groupSummary);
				sumreverse.reverse();
				$.each(grp.groups,function(i,n){
					toEnd++;
					clid = $t.p.id+'ghead_'+n.idx;
					hid = clid+'_'+i;
					icon = '<span style=\'cursor:pointer;\' class=\'ui-icon '+pmrtl+'\' onclick="jQuery(\'#'+$.jgrid.jqID($t.p.id)+'\').jqGrid(\'groupingToggle\',\''+hid+'\');return false;"></span>';
					try {
						gv = $t.formatter(hid, n.displayValue, cp[n.idx], n.value );
					} catch (egv) {
						gv = n.displayValue;
					}
					str += '<tr id="'+hid+'" role="row" class= "ui-widget-content jqgroup ui-row-'+$t.p.direction+' '+clid+'"><td style="padding-left:'+(n.idx * 12) + 'px;'+'" colspan="'+colspans+'">'+icon+$.jgrid.template(grp.groupText[n.idx], gv, n.cnt, n.summary)+'</td></tr>';
					var leaf = len-1 === n.idx;
					if( leaf ) {
						var gg = grp.groups[i+1], k, kk, ik;
						var end = gg !== undefined ?  grp.groups[i+1].startRow : grdata.length;
						for(kk=n.startRow;kk<end;kk++) {
							str += grdata[kk].join('');
						}
						var jj;
						if (gg !== undefined) {
							for (jj = 0; jj < grp.groupField.length; jj++) {
								if (gg.dataIndex === grp.groupField[jj]) {
									break;
								}
							}
							toEnd = grp.groupField.length - jj;
						}
						for (ik = 0; ik < toEnd; ik++) {
							if(!sumreverse[ik]) { continue; }
							var hhdr = '';
							if(grp.groupCollapse && !grp.showSummaryOnHide) {
								hhdr = ' style="display:none;"';
							}
							str += '<tr'+hhdr+' jqfootlevel="'+(n.idx-ik)+'" role="row" class="ui-widget-content jqfoot ui-row-'+$t.p.direction+'">';
							var fdata = findGroupIdx(i, ik, grp.groups),
								cm = $t.p.colModel,
								vv, grlen = fdata.cnt;
							for(k=0; k<colspans;k++) {
								var tmpdata = '<td '+$t.formatCol(k,1,'')+'>&#160;</td>',
									tplfld = '{0}';
								$.each(fdata.summary,function(){
									if(this.nm === cm[k].name) {
										if(cm[k].summaryTpl)  {
											tplfld = cm[k].summaryTpl;
										}
										if(typeof this.st === 'string' && this.st.toLowerCase() === 'avg') {
											if(this.v && grlen > 0) {
												this.v = (this.v/grlen);
											}
										}
										try {
											vv = $t.formatter('', this.v, k, this);
										} catch (ef) {
											vv = this.v;
										}
										tmpdata= '<td '+$t.formatCol(k,1,'')+'>'+$.jgrid.format(tplfld,vv)+ '</td>';
										return false;
									}
								});
								str += tmpdata;
							}
							str += '</tr>';
						}
						toEnd = jj;
					}
				});
				$('#'+$.jgrid.jqID($t.p.id)+' tbody:first').append(str);
				// free up memory
				str = null;
			});
		},
		groupingGroupBy : function (name, options ) {
			return this.each(function(){
				var $t = this;
				if(typeof name === 'string') {
					name = [name];
				}
				var grp = $t.p.groupingView;
				$t.p.grouping = true;

				//Set default, in case visibilityOnNextGrouping is undefined
				if (grp.visibiltyOnNextGrouping === undefined) {
					grp.visibiltyOnNextGrouping = [];
				}
				var i;
				// show previous hidden groups if they are hidden and weren't removed yet
				for(i=0;i<grp.groupField.length;i++) {
					if(!grp.groupColumnShow[i] && grp.visibiltyOnNextGrouping[i]) {
						$($t).jqGrid('showCol',grp.groupField[i]);
					}
				}
				// set visibility status of current group columns on next grouping
				for(i=0;i<name.length;i++) {
					grp.visibiltyOnNextGrouping[i] = $('#'+$.jgrid.jqID($t.p.id)+'_'+$.jgrid.jqID(name[i])).is(':visible');
				}
				$t.p.groupingView = $.extend($t.p.groupingView, options || {});
				grp.groupField = name;
				$($t).trigger('reloadGrid');
			});
		},
		groupingRemove : function (current) {
			return this.each(function(){
				var $t = this;
				if(current === undefined) {
					current = true;
				}
				$t.p.grouping = false;
				if(current===true) {
					var grp = $t.p.groupingView, i;
					// show previous hidden groups if they are hidden and weren't removed yet
					for(i=0;i<grp.groupField.length;i++) {
						if (!grp.groupColumnShow[i] && grp.visibiltyOnNextGrouping[i]) {
							$($t).jqGrid('showCol', grp.groupField);
						}
					}
					$('tr.jqgroup, tr.jqfoot','#'+$.jgrid.jqID($t.p.id)+' tbody:first').remove();
					$('tr.jqgrow:hidden','#'+$.jgrid.jqID($t.p.id)+' tbody:first').show();
				} else {
					$($t).trigger('reloadGrid');
				}
			});
		},
		groupingCalculations : {
			handler: function(fn, v, field, round, roundType, rc) {
				var funcs = {
					sum: function() {
						return parseFloat(v||0) + parseFloat((rc[field]||0));
					},

					min: function() {
						if(v==='') {
							return parseFloat(rc[field]||0);
						}
						return Math.min(parseFloat(v),parseFloat(rc[field]||0));
					},

					max: function() {
						if(v==='') {
							return parseFloat(rc[field]||0);
						}
						return Math.max(parseFloat(v),parseFloat(rc[field]||0));
					},

					count: function() {
						if(v==='') {v=0;}
						if(rc.hasOwnProperty(field)) {
							return v+1;
						}
						return 0;
					},

					avg: function() {
					// the same as sum, but at end we divide it
					// so use sum instead of duplicating the code (?)
						return funcs.sum();
					}
				};

				if(!funcs[fn]) {
					throw ('jqGrid Grouping No such method: ' + fn);
				}
				var res = funcs[fn]();

				if (round != null) {
					if (roundType == 'fixed') {
						res = res.toFixed(round);
					} else {
						var mul = Math.pow(10, round);
						res = Math.round(res * mul) / mul;
					}
				}

				return res;
			}
		}
	});
})(jQuery);
/*jshint eqeqeq:false, eqnull:true, devel:true */
/*global jQuery, xmlJsonClass */
(function($){
/*
 * jqGrid extension for constructing Grid Data from external file
 * Tony Tomov tony@trirand.com
 * http://trirand.com/blog/
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
**/

	'use strict';
	$.jgrid.extend({
		jqGridImport : function(o) {
			o = $.extend({
				imptype : 'xml', // xml, json, xmlstring, jsonstring
				impstring: '',
				impurl: '',
				mtype: 'GET',
				impData : {},
				xmlGrid :{
					config : 'roots>grid',
					data: 'roots>rows'
				},
				jsonGrid :{
					config : 'grid',
					data: 'data'
				},
				ajaxOptions :{}
			}, o || {});
			return this.each(function(){
				var $t = this;
				var xmlConvert = function (xml,o) {
					var cnfg = $(o.xmlGrid.config,xml)[0];
					var xmldata = $(o.xmlGrid.data,xml)[0], jstr, jstr1, key;
					if(xmlJsonClass.xml2json && $.jgrid.parse) {
						jstr = xmlJsonClass.xml2json(cnfg,' ');
						jstr = $.jgrid.parse(jstr);
						for(key in jstr) {
							if(jstr.hasOwnProperty(key)) {
								jstr1=jstr[key];
							}
						}
						if(xmldata) {
							// save the datatype
							var svdatatype = jstr.grid.datatype;
							jstr.grid.datatype = 'xmlstring';
							jstr.grid.datastr = xml;
							$($t).jqGrid( jstr1 ).jqGrid('setGridParam',{datatype:svdatatype});
						} else {
							$($t).jqGrid( jstr1 );
						}
						jstr = null;jstr1=null;
					} else {
						alert('xml2json or parse are not present');
					}
				};
				var jsonConvert = function (jsonstr,o){
					if (jsonstr && typeof jsonstr == 'string') {
						var _jsonparse = false;
						if($.jgrid.useJSON) {
							$.jgrid.useJSON = false;
							_jsonparse = true;
						}
						var json = $.jgrid.parse(jsonstr);
						if(_jsonparse) { $.jgrid.useJSON = true; }
						var gprm = json[o.jsonGrid.config];
						var jdata = json[o.jsonGrid.data];
						if(jdata) {
							var svdatatype = gprm.datatype;
							gprm.datatype = 'jsonstring';
							gprm.datastr = jdata;
							$($t).jqGrid( gprm ).jqGrid('setGridParam',{datatype:svdatatype});
						} else {
							$($t).jqGrid( gprm );
						}
					}
				};
				switch (o.imptype){
				case 'xml':
					$.ajax($.extend({
						url:o.impurl,
						type:o.mtype,
						data: o.impData,
						dataType:'xml',
						complete: function(xml,stat) {
							if(stat == 'success') {
								xmlConvert(xml.responseXML,o);
								$($t).triggerHandler('jqGridImportComplete', [xml, o]);
								if($.isFunction(o.importComplete)) {
									o.importComplete(xml);
								}
							}
							xml=null;
						}
					}, o.ajaxOptions));
					break;
				case 'xmlstring' :
					// we need to make just the conversion and use the same code as xml
					if(o.impstring && typeof o.impstring == 'string') {
						var xmld = $.jgrid.stringToDoc(o.impstring);
						if(xmld) {
							xmlConvert(xmld,o);
							$($t).triggerHandler('jqGridImportComplete', [xmld, o]);
							if($.isFunction(o.importComplete)) {
								o.importComplete(xmld);
							}
							o.impstring = null;
						}
						xmld = null;
					}
					break;
				case 'json':
					$.ajax($.extend({
						url:o.impurl,
						type:o.mtype,
						data: o.impData,
						dataType:'json',
						complete: function(json) {
							try {
								jsonConvert(json.responseText,o );
								$($t).triggerHandler('jqGridImportComplete', [json, o]);
								if($.isFunction(o.importComplete)) {
									o.importComplete(json);
								}
							} catch (ee){}
							json=null;
						}
					}, o.ajaxOptions ));
					break;
				case 'jsonstring' :
					if(o.impstring && typeof o.impstring == 'string') {
						jsonConvert(o.impstring,o );
						$($t).triggerHandler('jqGridImportComplete', [o.impstring, o]);
						if($.isFunction(o.importComplete)) {
							o.importComplete(o.impstring);
						}
						o.impstring = null;
					}
					break;
				}
			});
		},
		jqGridExport : function(o) {
			o = $.extend({
				exptype : 'xmlstring',
				root: 'grid',
				ident: '\t'
			}, o || {});
			var ret = null;
			this.each(function () {
				if(!this.grid) { return;}
				var key, gprm = $.extend(true, {},$(this).jqGrid('getGridParam'));
				// we need to check for:
				// 1.multiselect, 2.subgrid  3. treegrid and remove the unneded columns from colNames
				if(gprm.rownumbers) {
					gprm.colNames.splice(0,1);
					gprm.colModel.splice(0,1);
				}
				if(gprm.multiselect) {
					gprm.colNames.splice(0,1);
					gprm.colModel.splice(0,1);
				}
				if(gprm.subGrid) {
					gprm.colNames.splice(0,1);
					gprm.colModel.splice(0,1);
				}
				gprm.knv = null;
				if(gprm.treeGrid) {
					for (key in gprm.treeReader) {
						if(gprm.treeReader.hasOwnProperty(key)) {
							gprm.colNames.splice(gprm.colNames.length-1);
							gprm.colModel.splice(gprm.colModel.length-1);
						}
					}
				}
				switch (o.exptype) {
				case 'xmlstring' :
					ret = '<'+o.root+'>'+xmlJsonClass.json2xml(gprm,o.ident)+'</'+o.root+'>';
					break;
				case 'jsonstring' :
					ret = '{'+ xmlJsonClass.toJson(gprm,o.root,o.ident,false)+'}';
					if(gprm.postData.filters !== undefined) {
						ret=ret.replace(/filters":"/,'filters":');
						ret=ret.replace(/}]}"/,'}]}');
					}
					break;
				}
			});
			return ret;
		},
		excelExport : function(o) {
			o = $.extend({
				exptype : 'remote',
				url : null,
				oper: 'oper',
				tag: 'excel',
				exportOptions : {}
			}, o || {});
			return this.each(function(){
				if(!this.grid) { return;}
				var url;
				if(o.exptype == 'remote') {
					var pdata = $.extend({},this.p.postData);
					pdata[o.oper] = o.tag;
					var params = jQuery.param(pdata);
					if(o.url.indexOf('?') != -1) { url = o.url+'&'+params; }
					else { url = o.url+'?'+params; }
					window.location = url;
				}
			});
		}
	});
})(jQuery);
/*jshint evil:true, eqeqeq:false, eqnull:true, devel:true */
/*global jQuery */
(function($){
/*
**
 * jqGrid addons using jQuery UI
 * Author: Mark Williams
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
 * depends on jQuery UI
**/
	'use strict';
	if ($.jgrid.msie && $.jgrid.msiever()==8) {
		$.expr[':'].hidden = function(elem) {
			return elem.offsetWidth === 0 || elem.offsetHeight === 0 ||
			elem.style.display == 'none';
		};
	}
	// requiere load multiselect before grid
	$.jgrid._multiselect = false;
	if($.ui) {
		if ($.ui.multiselect ) {
			if($.ui.multiselect.prototype._setSelected) {
				var setSelected = $.ui.multiselect.prototype._setSelected;
				$.ui.multiselect.prototype._setSelected = function(item,selected) {
					var ret = setSelected.call(this,item,selected);
					if (selected && this.selectedList) {
						var elt = this.element;
						this.selectedList.find('li').each(function() {
							if ($(this).data('optionLink')) {
								$(this).data('optionLink').remove().appendTo(elt);
							}
						});
					}
					return ret;
				};
			}
			if($.ui.multiselect.prototype.destroy) {
				$.ui.multiselect.prototype.destroy = function() {
					this.element.show();
					this.container.remove();
					if ($.Widget === undefined) {
						$.widget.prototype.destroy.apply(this, arguments);
					} else {
						$.Widget.prototype.destroy.apply(this, arguments);
					}
				};
			}
			$.jgrid._multiselect = true;
		}
	}

	$.jgrid.extend({
		sortableColumns : function (tblrow)
		{
			return this.each(function (){
				var ts = this, tid= $.jgrid.jqID( ts.p.id );
				function start() {ts.p.disableClick = true;}
				var sortable_opts = {
					'tolerance' : 'pointer',
					'axis' : 'x',
					'scrollSensitivity': '1',
					'items': '>th:not(:has(#jqgh_'+tid+'_cb'+',#jqgh_'+tid+'_rn'+',#jqgh_'+tid+'_subgrid),:hidden)',
					'placeholder': {
						element: function(item) {
							var el = $(document.createElement(item[0].nodeName))
								.addClass(item[0].className+' ui-sortable-placeholder ui-state-highlight')
								.removeClass('ui-sortable-helper')[0];
							return el;
						},
						update: function(self, p) {
							p.height(self.currentItem.innerHeight() - parseInt(self.currentItem.css('paddingTop')||0, 10) - parseInt(self.currentItem.css('paddingBottom')||0, 10));
							p.width(self.currentItem.innerWidth() - parseInt(self.currentItem.css('paddingLeft')||0, 10) - parseInt(self.currentItem.css('paddingRight')||0, 10));
						}
					},
					'update': function(event, ui) {
						var p = $(ui.item).parent(),
							th = $('>th', p),
							colModel = ts.p.colModel,
							cmMap = {}, tid= ts.p.id+'_';
						$.each(colModel, function(i) { cmMap[this.name]=i; });
						var permutation = [];
						th.each(function() {
							var id = $('>div', this).get(0).id.replace(/^jqgh_/, '').replace(tid,'');
							if (cmMap.hasOwnProperty(id)) {
								permutation.push(cmMap[id]);
							}
						});

						$(ts).jqGrid('remapColumns',permutation, true, true);
						if ($.isFunction(ts.p.sortable.update)) {
							ts.p.sortable.update(permutation);
						}
						setTimeout(function(){ts.p.disableClick=false;}, 50);
					}
				};
				if (ts.p.sortable.options) {
					$.extend(sortable_opts, ts.p.sortable.options);
				} else if ($.isFunction(ts.p.sortable)) {
					ts.p.sortable = { 'update' : ts.p.sortable };
				}
				if (sortable_opts.start) {
					var s = sortable_opts.start;
					sortable_opts.start = function(e,ui) {
						start();
						s.call(this,e,ui);
					};
				} else {
					sortable_opts.start = start;
				}
				if (ts.p.sortable.exclude) {
					sortable_opts.items += ':not('+ts.p.sortable.exclude+')';
				}
				tblrow.sortable(sortable_opts).data('sortable').floating = true;
			});
		},
		columnChooser : function(opts) {
			var self = this;
			if($('#colchooser_'+$.jgrid.jqID(self[0].p.id)).length ) { return; }
			var selector = $('<div id="colchooser_'+self[0].p.id+'" style="position:relative;overflow:hidden"><div><select multiple="multiple"></select></div></div>');
			var select = $('select', selector);

			function insert(perm,i,v) {
				if(i>=0){
					var a = perm.slice();
					var b = a.splice(i,Math.max(perm.length-i,i));
					if(i>perm.length) { i = perm.length; }
					a[i] = v;
					return a.concat(b);
				}
			}
			opts = $.extend({
				'width' : 420,
				'height' : 240,
				'classname' : null,
				'done' : function(perm) { if (perm) { self.jqGrid('remapColumns', perm, true); } },
				/* msel is either the name of a ui widget class that
               extends a multiselect, or a function that supports
               creating a multiselect object (with no argument,
               or when passed an object), and destroying it (when
               passed the string "destroy"). */
				'msel' : 'multiselect',
				/* "msel_opts" : {}, */

				/* dlog is either the name of a ui widget class that
               behaves in a dialog-like way, or a function, that
               supports creating a dialog (when passed dlog_opts)
               or destroying a dialog (when passed the string
               "destroy")
               */
				'dlog' : 'dialog',
				'dialog_opts' : {
					'minWidth': 470
				},
				/* dlog_opts is either an option object to be passed
               to "dlog", or (more likely) a function that creates
               the options object.
               The default produces a suitable options object for
               ui.dialog */
				'dlog_opts' : function(opts) {
					var buttons = {};
					buttons[opts.bSubmit] = function() {
						opts.apply_perm();
						opts.cleanup(false);
					};
					buttons[opts.bCancel] = function() {
						opts.cleanup(true);
					};
					return $.extend(true, {
						'buttons': buttons,
						'close': function() {
							opts.cleanup(true);
						},
						'modal' : opts.modal || false,
						'resizable': opts.resizable || true,
						'width': opts.width+20
					}, opts.dialog_opts || {});
				},
				/* Function to get the permutation array, and pass it to the
               "done" function */
				'apply_perm' : function() {
					$('option',select).each(function() {
						if (this.selected) {
							self.jqGrid('showCol', colModel[this.value].name);
						} else {
							self.jqGrid('hideCol', colModel[this.value].name);
						}
					});

					var perm = [];
					//fixedCols.slice(0);
					$('option:selected',select).each(function() { perm.push(parseInt(this.value,10)); });
					$.each(perm, function() { delete colMap[colModel[parseInt(this,10)].name]; });
					$.each(colMap, function() {
						var ti = parseInt(this,10);
						perm = insert(perm,ti,ti);
					});
					if (opts.done) {
						opts.done.call(self, perm);
					}
				},
				/* Function to cleanup the dialog, and select. Also calls the
               done function with no permutation (to indicate that the
               columnChooser was aborted */
				'cleanup' : function(calldone) {
					call(opts.dlog, selector, 'destroy');
					call(opts.msel, select, 'destroy');
					selector.remove();
					if (calldone && opts.done) {
						opts.done.call(self);
					}
				},
				'msel_opts' : {}
			}, $.jgrid.col, opts || {});
			if($.ui) {
				if ($.ui.multiselect ) {
					if(opts.msel == 'multiselect') {
						if(!$.jgrid._multiselect) {
						// should be in language file
							alert('Multiselect plugin loaded after jqGrid. Please load the plugin before the jqGrid!');
							return;
						}
						opts.msel_opts = $.extend($.ui.multiselect.defaults,opts.msel_opts);
					}
				}
			}
			if (opts.caption) {
				selector.attr('title', opts.caption);
			}
			if (opts.classname) {
				selector.addClass(opts.classname);
				select.addClass(opts.classname);
			}
			if (opts.width) {
				$('>div',selector).css({'width': opts.width,'margin':'0 auto'});
				select.css('width', opts.width);
			}
			if (opts.height) {
				$('>div',selector).css('height', opts.height);
				select.css('height', opts.height - 10);
			}
			var colModel = self.jqGrid('getGridParam', 'colModel');
			var colNames = self.jqGrid('getGridParam', 'colNames');
			var colMap = {}, fixedCols = [];

			select.empty();
			$.each(colModel, function(i) {
				colMap[this.name] = i;
				if (this.hidedlg) {
					if (!this.hidden) {
						fixedCols.push(i);
					}
					return;
				}

				select.append('<option value=\''+i+'\' '+
																										(this.hidden?'':'selected=\'selected\'')+'>'+$.jgrid.stripHtml(colNames[i])+'</option>');
			});
			function call(fn, obj) {
				if (!fn) { return; }
				if (typeof fn == 'string') {
					if ($.fn[fn]) {
						$.fn[fn].apply(obj, $.makeArray(arguments).slice(2));
					}
				} else if ($.isFunction(fn)) {
					fn.apply(obj, $.makeArray(arguments).slice(2));
				}
			}

			var dopts = $.isFunction(opts.dlog_opts) ? opts.dlog_opts.call(self, opts) : opts.dlog_opts;
			call(opts.dlog, selector, dopts);
			var mopts = $.isFunction(opts.msel_opts) ? opts.msel_opts.call(self, opts) : opts.msel_opts;
			call(opts.msel, select, mopts);
		},
		sortableRows : function (opts) {
		// Can accept all sortable options and events
			return this.each(function(){
				var $t = this;
				if(!$t.grid) { return; }
				// Currently we disable a treeGrid sortable
				if($t.p.treeGrid) { return; }
				if($.fn.sortable) {
					opts = $.extend({
						'cursor':'move',
						'axis' : 'y',
						'items': '.jqgrow'
					},
					opts || {});
					if(opts.start && $.isFunction(opts.start)) {
						opts._start_ = opts.start;
						delete opts.start;
					} else {opts._start_=false;}
					if(opts.update && $.isFunction(opts.update)) {
						opts._update_ = opts.update;
						delete opts.update;
					} else {opts._update_ = false;}
					opts.start = function(ev,ui) {
						$(ui.item).css('border-width','0px');
						$('td',ui.item).each(function(i){
							this.style.width = $t.grid.cols[i].style.width;
						});
						if($t.p.subGrid) {
							var subgid = $(ui.item).attr('id');
							try {
								$($t).jqGrid('collapseSubGridRow',subgid);
							} catch (e) {}
						}
						if(opts._start_) {
							opts._start_.apply(this,[ev,ui]);
						}
					};
					opts.update = function (ev,ui) {
						$(ui.item).css('border-width','');
						if($t.p.rownumbers === true) {
							$('td.jqgrid-rownum',$t.rows).each(function( i ){
								$(this).html( i+1+(parseInt($t.p.page,10)-1)*parseInt($t.p.rowNum,10) );
							});
						}
						if(opts._update_) {
							opts._update_.apply(this,[ev,ui]);
						}
					};
					$('tbody:first',$t).sortable(opts);
					$('tbody:first',$t).disableSelection();
				}
			});
		},
		gridDnD : function(opts) {
			return this.each(function(){
				var $t = this, i, cn;
				if(!$t.grid) { return; }
				// Currently we disable a treeGrid drag and drop
				if($t.p.treeGrid) { return; }
				if(!$.fn.draggable || !$.fn.droppable) { return; }
				function updateDnD ()
				{
					var datadnd = $.data($t,'dnd');
					$('tr.jqgrow:not(.ui-draggable)',$t).draggable($.isFunction(datadnd.drag) ? datadnd.drag.call($($t),datadnd) : datadnd.drag);
				}
				var appender = '<table id=\'jqgrid_dnd\' class=\'ui-jqgrid-dnd\'></table>';
				if($('#jqgrid_dnd')[0] === undefined) {
					$('body').append(appender);
				}

				if(typeof opts == 'string' && opts == 'updateDnD' && $t.p.jqgdnd===true) {
					updateDnD();
					return;
				}
				opts = $.extend({
					'drag' : function (opts) {
						return $.extend({
							start : function (ev, ui) {
								var i, subgid;
								// if we are in subgrid mode try to collapse the node
								if($t.p.subGrid) {
									subgid = $(ui.helper).attr('id');
									try {
										$($t).jqGrid('collapseSubGridRow',subgid);
									} catch (e) {}
								}
								// hack
								// drag and drop does not insert tr in table, when the table has no rows
								// we try to insert new empty row on the target(s)
								for (i=0;i<$.data($t,'dnd').connectWith.length;i++){
									if($($.data($t,'dnd').connectWith[i]).jqGrid('getGridParam','reccount') == '0' ){
										$($.data($t,'dnd').connectWith[i]).jqGrid('addRowData','jqg_empty_row',{});
									}
								}
								ui.helper.addClass('ui-state-highlight');
								$('td',ui.helper).each(function(i) {
									this.style.width = $t.grid.headers[i].width+'px';
								});
								if(opts.onstart && $.isFunction(opts.onstart) ) { opts.onstart.call($($t),ev,ui); }
							},
							stop :function(ev,ui) {
								var i, ids;
								if(ui.helper.dropped && !opts.dragcopy) {
									ids = $(ui.helper).attr('id');
									if(ids === undefined) { ids = $(this).attr('id'); }
									$($t).jqGrid('delRowData',ids );
								}
								// if we have a empty row inserted from start event try to delete it
								for (i=0;i<$.data($t,'dnd').connectWith.length;i++){
									$($.data($t,'dnd').connectWith[i]).jqGrid('delRowData','jqg_empty_row');
								}
								if(opts.onstop && $.isFunction(opts.onstop) ) { opts.onstop.call($($t),ev,ui); }
							}
						},opts.drag_opts || {});
					},
					'drop' : function (opts) {
						return $.extend({
							accept: function(d) {
								if (!$(d).hasClass('jqgrow')) { return d;}
								var tid = $(d).closest('table.ui-jqgrid-btable');
								if(tid.length > 0 && $.data(tid[0],'dnd') !== undefined) {
									var cn = $.data(tid[0],'dnd').connectWith;
									return $.inArray('#'+$.jgrid.jqID(this.id),cn) != -1 ? true : false;
								}
								return false;
							},
							drop: function(ev, ui) {
								if (!$(ui.draggable).hasClass('jqgrow')) { return; }
								var accept = $(ui.draggable).attr('id');
								var getdata = ui.draggable.parent().parent().jqGrid('getRowData',accept);
								if(!opts.dropbyname) {
									var j =0, tmpdata = {}, nm, key;
									var dropmodel = $('#'+$.jgrid.jqID(this.id)).jqGrid('getGridParam','colModel');
									try {
										for (key in getdata) {
											if (getdata.hasOwnProperty(key)) {
												nm = dropmodel[j].name;
												if( !(nm == 'cb' || nm =='rn' || nm == 'subgrid' )) {
													if(getdata.hasOwnProperty(key) && dropmodel[j]) {
														tmpdata[nm] = getdata[key];
													}
												}
												j++;
											}
										}
										getdata = tmpdata;
									} catch (e) {}
								}
								ui.helper.dropped = true;
								if(opts.beforedrop && $.isFunction(opts.beforedrop) ) {
									//parameters to this callback - event, element, data to be inserted, sender, reciever
									// should return object which will be inserted into the reciever
									var datatoinsert = opts.beforedrop.call(this,ev,ui,getdata,$('#'+$.jgrid.jqID($t.p.id)),$(this));
									if (datatoinsert !== undefined && datatoinsert !== null && typeof datatoinsert == 'object') { getdata = datatoinsert; }
								}
								if(ui.helper.dropped) {
									var grid;
									if(opts.autoid) {
										if($.isFunction(opts.autoid)) {
											grid = opts.autoid.call(this,getdata);
										} else {
											grid = Math.ceil(Math.random()*1000);
											grid = opts.autoidprefix+grid;
										}
									}
									// NULL is interpreted as undefined while null as object
									$('#'+$.jgrid.jqID(this.id)).jqGrid('addRowData',grid,getdata,opts.droppos);
								}
								if(opts.ondrop && $.isFunction(opts.ondrop) ) { opts.ondrop.call(this,ev,ui, getdata); }
							}}, opts.drop_opts || {});
					},
					'onstart' : null,
					'onstop' : null,
					'beforedrop': null,
					'ondrop' : null,
					'drop_opts' : {
						'activeClass': 'ui-state-active',
						'hoverClass': 'ui-state-hover'
					},
					'drag_opts' : {
						'revert': 'invalid',
						'helper': 'clone',
						'cursor': 'move',
						'appendTo' : '#jqgrid_dnd',
						'zIndex': 5000
					},
					'dragcopy': false,
					'dropbyname' : false,
					'droppos' : 'first',
					'autoid' : true,
					'autoidprefix' : 'dnd_'
				}, opts || {});

				if(!opts.connectWith) { return; }
				opts.connectWith = opts.connectWith.split(',');
				opts.connectWith = $.map(opts.connectWith,function(n){return $.trim(n);});
				$.data($t,'dnd',opts);

				if($t.p.reccount != '0' && !$t.p.jqgdnd) {
					updateDnD();
				}
				$t.p.jqgdnd = true;
				for (i=0;i<opts.connectWith.length;i++){
					cn =opts.connectWith[i];
					$(cn).droppable($.isFunction(opts.drop) ? opts.drop.call($($t),opts) : opts.drop);
				}
			});
		},
		gridResize : function(opts) {
			return this.each(function(){
				var $t = this, gID = $.jgrid.jqID($t.p.id);
				if(!$t.grid || !$.fn.resizable) { return; }
				opts = $.extend({}, opts || {});
				if(opts.alsoResize ) {
					opts._alsoResize_ = opts.alsoResize;
					delete opts.alsoResize;
				} else {
					opts._alsoResize_ = false;
				}
				if(opts.stop && $.isFunction(opts.stop)) {
					opts._stop_ = opts.stop;
					delete opts.stop;
				} else {
					opts._stop_ = false;
				}
				opts.stop = function (ev, ui) {
					$($t).jqGrid('setGridParam',{height:$('#gview_'+gID+' .ui-jqgrid-bdiv').height()});
					$($t).jqGrid('setGridWidth',ui.size.width,opts.shrinkToFit);
					if(opts._stop_) { opts._stop_.call($t,ev,ui); }
				};
				if(opts._alsoResize_) {
					var optstest = '{\'#gview_'+gID+' .ui-jqgrid-bdiv\':true,\'' +opts._alsoResize_+'\':true}';
					opts.alsoResize = eval('('+optstest+')'); // the only way that I found to do this
				} else {
					opts.alsoResize = $('.ui-jqgrid-bdiv','#gview_'+gID);
				}
				delete opts._alsoResize_;
				$('#gbox_'+gID).resizable(opts);
			});
		}
	});

})(jQuery);
/*
 Transform a table to a jqGrid.
 Peter Romianowski <peter.romianowski@optivo.de>
 If the first column of the table contains checkboxes or
 radiobuttons then the jqGrid is made selectable.
*/
// Addition - selector can be a class or id
function tableToGrid(selector, options) {
	jQuery(selector).each(function() {
		if(this.grid) {return;} //Adedd from Tony Tomov
		// This is a small "hack" to make the width of the jqGrid 100%
		jQuery(this).width('99%');
		var w = jQuery(this).width();

		// Text whether we have single or multi select
		var inputCheckbox = jQuery('tr td:first-child input[type=checkbox]:first', jQuery(this));
		var inputRadio = jQuery('tr td:first-child input[type=radio]:first', jQuery(this));
		var selectMultiple = inputCheckbox.length > 0;
		var selectSingle = !selectMultiple && inputRadio.length > 0;
		var selectable = selectMultiple || selectSingle;
		//var inputName = inputCheckbox.attr("name") || inputRadio.attr("name");

		// Build up the columnModel and the data
		var colModel = [];
		var colNames = [];
		jQuery('th', jQuery(this)).each(function() {
			if (colModel.length === 0 && selectable) {
				colModel.push({
					name: '__selection__',
					index: '__selection__',
					width: 0,
					hidden: true
				});
				colNames.push('__selection__');
			} else {
				colModel.push({
					name: jQuery(this).attr('id') || jQuery.trim(jQuery.jgrid.stripHtml(jQuery(this).html())).split(' ').join('_'),
					index: jQuery(this).attr('id') || jQuery.trim(jQuery.jgrid.stripHtml(jQuery(this).html())).split(' ').join('_'),
					width: jQuery(this).width() || 150
				});
				colNames.push(jQuery(this).html());
			}
		});
		var data = [];
		var rowIds = [];
		var rowChecked = [];
		jQuery('tbody > tr', jQuery(this)).each(function() {
			var row = {};
			var rowPos = 0;
			jQuery('td', jQuery(this)).each(function() {
				if (rowPos === 0 && selectable) {
					var input = jQuery('input', jQuery(this));
					var rowId = input.attr('value');
					rowIds.push(rowId || data.length);
					if (input.is(':checked')) {
						rowChecked.push(rowId);
					}
					row[colModel[rowPos].name] = input.attr('value');
				} else {
					row[colModel[rowPos].name] = jQuery(this).html();
				}
				rowPos++;
			});
			if(rowPos >0) { data.push(row); }
		});

		// Clear the original HTML table
		jQuery(this).empty();

		// Mark it as jqGrid
		jQuery(this).addClass('scroll');

		jQuery(this).jqGrid(jQuery.extend({
			datatype: 'local',
			width: w,
			colNames: colNames,
			colModel: colModel,
			multiselect: selectMultiple
		//inputName: inputName,
		//inputValueCol: imputName != null ? "__selection__" : null
		}, options || {}));

		// Add data
		var a;
		for (a = 0; a < data.length; a++) {
			var id = null;
			if (rowIds.length > 0) {
				id = rowIds[a];
				if (id && id.replace) {
				// We have to do this since the value of a checkbox
				// or radio button can be anything
					id = encodeURIComponent(id).replace(/[.\-%]/g, '_');
				}
			}
			if (id === null) {
				id = a + 1;
			}
			jQuery(this).jqGrid('addRowData',id, data[a]);
		}

		// Set the selection
		for (a = 0; a < rowChecked.length; a++) {
			jQuery(this).jqGrid('setSelection',rowChecked[a]);
		}
	});

}

/*!
 * Copyright 2013 E.J.I.E., S.A.
 *
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
 */
var rp_ge = {};
(function ($) {
	
	/*
	 * MODIFICACIONES UDA
	 * Se han convertido los siguientes métodos privados en públicos para permitir su extensión.
	 * - getFormData
	 * - createData
	 * - fillData
	 * - setNulls
	 * - postIt
	 * - compareData
	 * - checkUpdates
	 * - restoreInline
	 * - updateNav
	 * - getCurrPos
	 */
	$.extend($.jgrid,{
		createData : function(rowid,obj,tb,maxcols){
			var $t=this, nm, hc,trdata, cnt=0,tmp, dc,elc, retpos=[], ind=false,
			tdtmpl = "<td class='CaptionTD'>&#160;</td><td class='DataTD'>&#160;</td>", tmpl="", i; //*2
			for (i =1; i<=maxcols;i++) {
				tmpl += tdtmpl;
			}
			if(rowid != '_empty') {
				ind = $(obj).jqGrid("getInd",rowid);
			}
			$(obj.p.colModel).each( function(i) {
				nm = this.name;
				// hidden fields are included in the form
				if(this.editrules && this.editrules.edithidden === true) {
					hc = false;
				} else {
					hc = this.hidden === true ? true : false;
				}
				dc = hc ? "style='display:none'" : "";
				if ( nm !== 'cb' && nm !== 'subgrid' && this.editable===true && nm !== 'rn') {
					if(ind === false) {
						tmp = "";
					} else {
						if(nm == obj.p.ExpandColumn && obj.p.treeGrid === true) {
							tmp = $("td:eq("+i+")",obj.rows[ind]).text();
						} else {
							try {
								tmp =  $.unformat.call(obj, $("td:eq("+i+")",obj.rows[ind]),{rowId:rowid, colModel:this},i);
							} catch (_) {
								tmp =  (this.edittype && this.edittype == "textarea") ? $("td:eq("+i+")",obj.rows[ind]).text() : $("td:eq("+i+")",obj.rows[ind]).html();
							}
							if(!tmp || tmp == "&nbsp;" || tmp == "&#160;" || (tmp.length==1 && tmp.charCodeAt(0)==160) ) {tmp='';}
						}
					}
					var opt = $.extend({}, this.editoptions || {} ,{id:nm,name:nm}),
					frmopt = $.extend({}, {elmprefix:'',elmsuffix:'',rowabove:false,rowcontent:''}, this.formoptions || {}),
					rp = parseInt(frmopt.rowpos,10) || cnt+1,
					cp = parseInt((parseInt(frmopt.colpos,10) || 1)*2,10);
					if(rowid == "_empty" && opt.defaultValue ) {
						tmp = $.isFunction(opt.defaultValue) ? opt.defaultValue.call($t) : opt.defaultValue;
					}
					if(!this.edittype) {this.edittype = "text";}
					if($t.p.autoencode) {tmp = $.jgrid.htmlDecode(tmp);}
					elc = $.jgrid.createEl.call($t,this.edittype,opt,tmp,false,$.extend({},$.jgrid.ajaxOptions,obj.p.ajaxSelectOptions || {}));
					if(tmp === "" && this.edittype == "checkbox") {tmp = $(elc).attr("offval");}
					if(tmp === "" && this.edittype == "select") {tmp = $("option:eq(0)",elc).text();}
					if(rp_ge[$t.p.id].checkOnSubmit || rp_ge[$t.p.id].checkOnUpdate) {rp_ge[$t.p.id]._savedData[nm] = tmp;}
					$(elc).addClass("FormElement");
					if(this.edittype == 'text' || this.edittype == 'textarea') {
						$(elc).addClass("ui-widget-content ui-corner-all");
					}
					trdata = $(tb).find("tr[rowpos="+rp+"]");
					if(frmopt.rowabove) {
						var newdata = $("<tr><td class='contentinfo' colspan='"+(maxcols*2)+"'>"+frmopt.rowcontent+"</td></tr>");
						$(tb).append(newdata);
						newdata[0].rp = rp;
					}
					if ( trdata.length===0 ) {
						trdata = $("<tr "+dc+" rowpos='"+rp+"'></tr>").addClass("FormData").attr("id","tr_"+nm);
						$(trdata).append(tmpl);
						$(tb).append(trdata);
						trdata[0].rp = rp;
					}
					$("td:eq("+(cp-2)+")",trdata[0]).html( typeof frmopt.label === 'undefined' ? obj.p.colNames[i]: frmopt.label);
					$("td:eq("+(cp-1)+")",trdata[0]).append(frmopt.elmprefix).append(elc).append(frmopt.elmsuffix);
					retpos[cnt] = i;
					cnt++;
				}
			});
			if( cnt > 0) {
				var idrow = $("<tr class='FormData' style='display:none'><td class='CaptionTD'></td><td colspan='"+ (maxcols*2-1)+"' class='DataTD'><input class='FormElement' id='id_g' type='text' name='"+obj.p.id+"_id' value='"+rowid+"'/></td></tr>");
				idrow[0].rp = cnt+999;
				$(tb).append(idrow);
				if(rp_ge[$t.p.id].checkOnSubmit || rp_ge[$t.p.id].checkOnUpdate) {rp_ge[$t.p.id]._savedData[obj.p.id+"_id"] = rowid;}
			}
			return retpos;
		},
		fillData : function(rowid,obj,fmid){
			var $t = this, gID = $t.p.id, frmgr = "FrmGrid_"+gID, frmtborg = "TblGrid_"+gID, frmtb = "#"+$.jgrid.jqID(frmtborg),
			nm,cnt=0,tmp, fld,opt,vl,vlc;
			if(rp_ge[$t.p.id].checkOnSubmit || rp_ge[$t.p.id].checkOnUpdate) {rp_ge[$t.p.id]._savedData = {};rp_ge[$t.p.id]._savedData[obj.p.id+"_id"]=rowid;}
			var cm = obj.p.colModel;
			if(rowid == '_empty') {
				$(cm).each(function(){
					nm = this.name;
					opt = $.extend({}, this.editoptions || {} );
					fld = $("#"+$.jgrid.jqID(nm),"#"+fmid);
					if(fld && fld.length && fld[0] !== null) {
						vl = "";
						if(opt.defaultValue ) {
							vl = $.isFunction(opt.defaultValue) ? opt.defaultValue.call($t) : opt.defaultValue;
							if(fld[0].type=='checkbox') {
								vlc = vl.toLowerCase();
								if(vlc.search(/(false|0|no|off|undefined)/i)<0 && vlc!=="") {
									fld[0].checked = true;
									fld[0].defaultChecked = true;
									fld[0].value = vl;
								} else {
									fld[0].checked = false;
									fld[0].defaultChecked = false;
								}
							} else {fld.val(vl);}
						} else {
							if( fld[0].type=='checkbox' ) {
								fld[0].checked = false;
								fld[0].defaultChecked = false;
								vl = $(fld).attr("offval");
							} else if (fld[0].type && fld[0].type.substr(0,6)=='select') {
								fld[0].selectedIndex = 0;
							} else {
								fld.val(vl);
							}
						}
						if(rp_ge[$t.p.id].checkOnSubmit===true || rp_ge[$t.p.id].checkOnUpdate) {rp_ge[$t.p.id]._savedData[nm] = vl;}
					}
				});
				$("#id_g","#"+fmid).val(rowid);
				return;
			}
			var tre = $(obj).jqGrid("getInd",rowid,true);
			if(!tre) {return;}
			$('td[role="gridcell"]',tre).each( function(i) {
				nm = cm[i].name;
				// hidden fields are included in the form
				if ( nm !== 'cb' && nm !== 'subgrid' && nm !== 'rn' && cm[i].editable===true) {
					if(nm == obj.p.ExpandColumn && obj.p.treeGrid === true) {
						tmp = $(this).text();
					} else {
						try {
							tmp =  $.unformat.call(obj, $(this),{rowId:rowid, colModel:cm[i]},i);
						} catch (_) {
							tmp = cm[i].edittype=="textarea" ? $(this).text() : $(this).html();
						}
					}
					if($t.p.autoencode) {tmp = $.jgrid.htmlDecode(tmp);}
					if(rp_ge[$t.p.id].checkOnSubmit===true || rp_ge[$t.p.id].checkOnUpdate) {rp_ge[$t.p.id]._savedData[nm] = tmp;}
					nm = $.jgrid.jqID(nm);
					switch (cm[i].edittype) {
						case "password":
						case "text":
						case "button" :
						case "image":
						case "textarea":
							if(tmp == "&nbsp;" || tmp == "&#160;" || (tmp.length==1 && tmp.charCodeAt(0)==160) ) {tmp='';}
							$("#"+nm,"#"+fmid).val(tmp);
							break;
						case "select":
							var opv = tmp.split(",");
							opv = $.map(opv,function(n){return $.trim(n);});
							$("#"+nm+" option","#"+fmid).each(function(){
								if (!cm[i].editoptions.multiple && ($.trim(tmp) == $.trim($(this).text()) || opv[0] == $.trim($(this).text()) || opv[0] == $.trim($(this).val())) ){
									this.selected= true;
								} else if (cm[i].editoptions.multiple){
									if(  $.inArray($.trim($(this).text()), opv ) > -1 || $.inArray($.trim($(this).val()), opv ) > -1  ){
										this.selected = true;
									}else{
										this.selected = false;
									}
								} else {
									this.selected = false;
								}
							});
							break;
						case "checkbox":
							tmp = tmp+"";
							if(cm[i].editoptions && cm[i].editoptions.value) {
								var cb = cm[i].editoptions.value.split(":");
								if(cb[0] == tmp) {
									$("#"+nm,"#"+fmid)[$t.p.useProp ? 'prop': 'attr']("checked",true);
									$("#"+nm,"#"+fmid)[$t.p.useProp ? 'prop': 'attr']("defaultChecked",true); //ie
								} else {
									$("#"+nm,"#"+fmid)[$t.p.useProp ? 'prop': 'attr']("checked", false);
									$("#"+nm,"#"+fmid)[$t.p.useProp ? 'prop': 'attr']("defaultChecked", false); //ie
								}
							} else {
								tmp = tmp.toLowerCase();
								if(tmp.search(/(false|0|no|off|undefined)/i)<0 && tmp!=="") {
									$("#"+nm,"#"+fmid)[$t.p.useProp ? 'prop': 'attr']("checked",true);
									$("#"+nm,"#"+fmid)[$t.p.useProp ? 'prop': 'attr']("defaultChecked",true); //ie
								} else {
									$("#"+nm,"#"+fmid)[$t.p.useProp ? 'prop': 'attr']("checked", false);
									$("#"+nm,"#"+fmid)[$t.p.useProp ? 'prop': 'attr']("defaultChecked", false); //ie
								}
							}
							break;
						case 'custom' :
							try {
								if(cm[i].editoptions && $.isFunction(cm[i].editoptions.custom_value)) {
									cm[i].editoptions.custom_value.call($t, $("#"+nm,"#"+fmid),'set',tmp);
								} else {throw "e1";}
							} catch (e) {
								if (e=="e1") {$.jgrid.info_dialog(jQuery.jgrid.errors.errcap,"function 'custom_value' "+$.jgrid.edit.msg.nodefined,jQuery.jgrid.edit.bClose);}
								else {$.jgrid.info_dialog(jQuery.jgrid.errors.errcap,e.message,jQuery.jgrid.edit.bClose);}
							}
							break;
					}
					cnt++;
				}
			});
			if(cnt>0) {$("#id_g",frmtb).val(rowid);}
		},
		getFormData : function(postdata, extpost){
			var $t = this, gID = $t.p.id, frmgr = "FrmGrid_"+gID, frmtborg = "TblGrid_"+gID, frmtb = "#"+$.jgrid.jqID(frmtborg);
			$(frmtb+" > tbody > tr > td > .FormElement").each(function() {
				var celm = $(".customelement", this);
				if (celm.length) {
					var  elem = celm[0], nm = $(elem).attr('name');
					$.each($t.p.colModel, function(){
						if(this.name === nm && this.editoptions && $.isFunction(this.editoptions.custom_value)) {
							try {
								postdata[nm] = this.editoptions.custom_value.call($t, $("#"+$.jgrid.jqID(nm),frmtb),'get');
								if (postdata[nm] === undefined) {throw "e1";}
							} catch (e) {
								if (e==="e1") {$.jgrid.info_dialog(jQuery.jgrid.errors.errcap,"function 'custom_value' "+$.jgrid.edit.msg.novalue,jQuery.jgrid.edit.bClose);}
								else {$.jgrid.info_dialog(jQuery.jgrid.errors.errcap,e.message,jQuery.jgrid.edit.bClose);}
							}
							return true;
						}
					});
				} else {
				switch ($(this).get(0).type) {
					case "checkbox":
						if($(this).is(":checked")) {
							postdata[this.name]= $(this).val();
						}else {
							var ofv = $(this).attr("offval");
							postdata[this.name]= ofv;
						}
					break;
					case "select-one":
						postdata[this.name]= $("option:selected",this).val();
						extpost[this.name]= $("option:selected",this).text();
					break;
					case "select-multiple":
						postdata[this.name]= $(this).val();
						if(postdata[this.name]) {postdata[this.name] = postdata[this.name].join(",");}
						else {postdata[this.name] ="";}
						var selectedText = [];
						$("option:selected",this).each(
							function(i,selected){
								selectedText[i] = $(selected).text();
							}
						);
						extpost[this.name]= selectedText.join(",");
					break;
					case "password":
					case "text":
					case "textarea":
					case "button":
						postdata[this.name] = $(this).val();

					break;
				}
				if($t.p.autoencode) {postdata[this.name] = $.jgrid.htmlEncode(postdata[this.name]);}
				}
			});
			return true;
		},postIt : function(postdata, extpost, frmoper) {
			var $t = this, gID = $t.p.id, frmgr = "FrmGrid_"+gID, frmtborg = "TblGrid_"+gID, frmtb = "#"+$.jgrid.jqID(frmtborg),
			copydata, ret=[true,"",""], onCS = {}, opers = $t.p.prmNames, idname, oper, key, selr, i;
			
			var retvals = $($t).triggerHandler("jqGridAddEditBeforeCheckValues", [$("#"+frmgr), frmoper]);
			if(retvals && typeof(retvals) === 'object') {postdata = retvals;}
			
			if($.isFunction(rp_ge[$t.p.id].beforeCheckValues)) {
				retvals = rp_ge[$t.p.id].beforeCheckValues.call($t, postdata,$("#"+frmgr),postdata[$t.p.id+"_id"] == "_empty" ? opers.addoper : opers.editoper);
				if(retvals && typeof(retvals) === 'object') {postdata = retvals;}
			}
			for( key in postdata ){
				if(postdata.hasOwnProperty(key)) {
					ret = $.jgrid.checkValues.call($t,postdata[key],key,$t);
					if(ret[0] === false) {break;}
				}
			}
			$.proxy($.jgrid.setNulls, $t)();
			if(ret[0]) {
				onCS = $($t).triggerHandler("jqGridAddEditClickSubmit", [rp_ge[$t.p.id], postdata, frmoper]);
				if( onCS === undefined && $.isFunction( rp_ge[$t.p.id].onclickSubmit)) { 
					onCS = rp_ge[$t.p.id].onclickSubmit.call($t, rp_ge[$t.p.id], postdata) || {}; 
				}
				ret = $($t).triggerHandler("jqGridAddEditBeforeSubmit", [postdata, $("#"+frmgr), frmoper]);
				if(ret === undefined) {
					ret = [true,"",""];
				}
				if( ret[0] && $.isFunction(rp_ge[$t.p.id].beforeSubmit))  {
					ret = rp_ge[$t.p.id].beforeSubmit.call($t,postdata,$("#"+frmgr));
				}
			}

			if(ret[0] && !rp_ge[$t.p.id].processing) {
				rp_ge[$t.p.id].processing = true;
				$("#sData", frmtb+"_2").addClass('ui-state-active');
				oper = opers.oper;
				idname = opers.id;
				// we add to pos data array the action - the name is oper
				postdata[oper] = ($.trim(postdata[$t.p.id+"_id"]) == "_empty") ? opers.addoper : opers.editoper;
				if(postdata[oper] != opers.addoper) {
					postdata[idname] = postdata[$t.p.id+"_id"];
				} else {
					// check to see if we have allredy this field in the form and if yes lieve it
					if( postdata[idname] === undefined ) {postdata[idname] = postdata[$t.p.id+"_id"];}
				}
				delete postdata[$t.p.id+"_id"];
				postdata = $.extend(postdata,rp_ge[$t.p.id].editData,onCS);
				if($t.p.treeGrid === true)  {
					if(postdata[oper] == opers.addoper) {
					selr = $($t).jqGrid("getGridParam", 'selrow');
						var tr_par_id = $t.p.treeGridModel == 'adjacency' ? $t.p.treeReader.parent_id_field : 'parent_id';
						postdata[tr_par_id] = selr;
					}
					for(i in $t.p.treeReader){
						if($t.p.treeReader.hasOwnProperty(i)) {
							var itm = $t.p.treeReader[i];
							if(postdata.hasOwnProperty(itm)) {
								if(postdata[oper] == opers.addoper && i === 'parent_id_field') {continue;}
								delete postdata[itm];
							}
						}
					}
				}
				
				postdata[idname] = $.jgrid.stripPref($t.p.idPrefix, postdata[idname]);
				var ajaxOptions = $.extend({
					url: rp_ge[$t.p.id].url ? rp_ge[$t.p.id].url : $($t).jqGrid('getGridParam','editurl'),
					type: rp_ge[$t.p.id].mtype,
					data: $.isFunction(rp_ge[$t.p.id].serializeEditData) ? rp_ge[$t.p.id].serializeEditData.call($t,postdata) :  postdata,
					complete:function(data,Status){
						postdata[idname] = $t.p.idPrefix + postdata[idname];
						if(Status != "success") {
							ret[0] = false;
							ret[1] = $($t).triggerHandler("jqGridAddEditErrorTextFormat", [data, frmoper]);
							if ($.isFunction(rp_ge[$t.p.id].errorTextFormat)) {
								ret[1] = rp_ge[$t.p.id].errorTextFormat.call($t, data);
							} else {
								ret[1] = Status + " Status: '" + data.statusText + "'. Error code: " + data.status;
							}
						} else {
							// data is posted successful
							// execute aftersubmit with the returned data from server
							ret = $($t).triggerHandler("jqGridAddEditAfterSubmit", [data, postdata, frmoper]);
							if(ret === undefined) {
								ret = [true,"",""];
							}
							if( ret[0] && $.isFunction(rp_ge[$t.p.id].afterSubmit) ) {
								ret = rp_ge[$t.p.id].afterSubmit.call($t, data,postdata);
							}
						}
						if(ret[0] === false) {
							$("#FormError>td",frmtb).html(ret[1]);
							$("#FormError",frmtb).show();
						} else {
							// remove some values if formattaer select or checkbox
							$.each($t.p.colModel, function(){
								if(extpost[this.name] && this.formatter && this.formatter=='select') {
									try {delete extpost[this.name];} catch (e) {}
								}
							});
							postdata = $.extend(postdata,extpost);
							if($t.p.autoencode) {
								$.each(postdata,function(n,v){
									postdata[n] = $.jgrid.htmlDecode(v);
								});
							}
							//rp_ge[$t.p.id].reloadAfterSubmit = rp_ge[$t.p.id].reloadAfterSubmit && $t.p.datatype != "local";
							// the action is add
							if(postdata[oper] == opers.addoper ) {
								//id processing
								// user not set the id ret[2]
								if(!ret[2]) {ret[2] = $.jgrid.randId();}
								postdata[idname] = ret[2];
								if(rp_ge[$t.p.id].closeAfterAdd) {
									if(rp_ge[$t.p.id].reloadAfterSubmit) {$($t).trigger("reloadGrid");}
									else {
										if($t.p.treeGrid === true){
											$($t).jqGrid("addChildNode",ret[2],selr,postdata );
										} else {
										$($t).jqGrid("addRowData",ret[2],postdata,p.addedrow);
										$($t).jqGrid("setSelection",ret[2]);
									}
									}
									$.jgrid.hideModal("#"+$.jgrid.jqID(IDs.themodal),{gb:"#gbox_"+$.jgrid.jqID(gID),jqm:p.jqModal,onClose: rp_ge[$t.p.id].onClose});
								} else if (rp_ge[$t.p.id].clearAfterAdd) {
									if(rp_ge[$t.p.id].reloadAfterSubmit) {$($t).trigger("reloadGrid");}
									else {
										if($t.p.treeGrid === true){
											$($t).jqGrid("addChildNode",ret[2],selr,postdata );
										} else {
											$($t).jqGrid("addRowData",ret[2],postdata,p.addedrow);
										}
									}
									$.proxy($.jgrid.fillData, $t)("_empty",$t,frmgr);
								} else {
									if(rp_ge[$t.p.id].reloadAfterSubmit) {$($t).trigger("reloadGrid");}
									else {
										if($t.p.treeGrid === true){
											$($t).jqGrid("addChildNode",ret[2],selr,postdata );
										} else {
											$($t).jqGrid("addRowData",ret[2],postdata,p.addedrow);
								}
									}
								}
							} else {
								// the action is update
								if(rp_ge[$t.p.id].reloadAfterSubmit) {
									$($t).trigger("reloadGrid");
									if( !rp_ge[$t.p.id].closeAfterEdit ) {setTimeout(function(){$($t).jqGrid("setSelection",postdata[idname]);},1000);}
								} else {
									if($t.p.treeGrid === true) {
										$($t).jqGrid("setTreeRow", postdata[idname],postdata);
									} else {
										$($t).jqGrid("setRowData", postdata[idname],postdata);
									}
								}
								if(rp_ge[$t.p.id].closeAfterEdit) {$.jgrid.hideModal("#"+$.jgrid.jqID(IDs.themodal),{gb:"#gbox_"+$.jgrid.jqID(gID),jqm:p.jqModal,onClose: rp_ge[$t.p.id].onClose});}
							}
							if($.isFunction(rp_ge[$t.p.id].afterComplete)) {
								copydata = data;
								setTimeout(function(){
									$($t).triggerHandler("jqGridAddEditAfterComplete", [copydata, postdata, $("#"+frmgr), frmoper]);
									rp_ge[$t.p.id].afterComplete.call($t, copydata, postdata, $("#"+frmgr));
									copydata=null;
								},500);
							}
						if(rp_ge[$t.p.id].checkOnSubmit || rp_ge[$t.p.id].checkOnUpdate) {
							$("#"+frmgr).data("disabled",false);
							if(rp_ge[$t.p.id]._savedData[$t.p.id+"_id"] !="_empty"){
								for(var key in rp_ge[$t.p.id]._savedData) {
									if(postdata[key]) {
										rp_ge[$t.p.id]._savedData[key] = postdata[key];
									}
								}
							}
						}
						}
						rp_ge[$t.p.id].processing=false;
						$("#sData", frmtb+"_2").removeClass('ui-state-active');
						try{$(':input:visible',"#"+frmgr)[0].focus();} catch (e){}
					}
				}, $.jgrid.ajaxOptions, rp_ge[$t.p.id].ajaxEditOptions );

				if (!ajaxOptions.url && !rp_ge[$t.p.id].useDataProxy) {
					if ($.isFunction($t.p.dataProxy)) {
						rp_ge[$t.p.id].useDataProxy = true;
					} else {
						ret[0]=false;ret[1] += " "+$.jgrid.errors.nourl;
					}
				}
				if (ret[0]) {
					if (rp_ge[$t.p.id].useDataProxy) {
						var dpret = $t.p.dataProxy.call($t, ajaxOptions, "set_"+$t.p.id); 
						if(typeof(dpret) == "undefined") {
							dpret = [true, ""];
						}
						if(dpret[0] === false ) {
							ret[0] = false;
							ret[1] = dpret[1] || "Error deleting the selected row!" ;
						} else {
							if(ajaxOptions.data.oper == opers.addoper && rp_ge[$t.p.id].closeAfterAdd ) {
								$.jgrid.hideModal("#"+$.jgrid.jqID(IDs.themodal),{gb:"#gbox_"+$.jgrid.jqID(gID),jqm:p.jqModal, onClose: rp_ge[$t.p.id].onClose});
							}
							if(ajaxOptions.data.oper == opers.editoper && rp_ge[$t.p.id].closeAfterEdit ) {
								$.jgrid.hideModal("#"+$.jgrid.jqID(IDs.themodal),{gb:"#gbox_"+$.jgrid.jqID(gID),jqm:p.jqModal, onClose: rp_ge[$t.p.id].onClose});
							}
						}
					} else {
						$.ajax(ajaxOptions); 
					}
				}
			}
			if(ret[0] === false) {
				$("#FormError>td",frmtb).html(ret[1]);
				$("#FormError",frmtb).show();
				// return;
			}
		},setNulls : function () {
			var $t = this;
			$.each($t.p.colModel, function(i,n){
				if(n.editoptions && n.editoptions.NullIfEmpty === true) {
					if(postdata.hasOwnProperty(n.name) && postdata[n.name] === "") {
						postdata[n.name] = 'null';
					}
				}
			});
			
		},compareData : function(nObj, oObj ) {
			var ret = false,key;
			for (key in nObj) {
				if(nObj[key] != oObj[key]) {
					ret = true;
					break;
				}
			}
			return ret;
		},checkUpdates : function(extpost) {
			var $t = this, gID = $t.p.id, frmgr = "FrmGrid_"+gID, frmtborg = "TblGrid_"+gID, frmtb = "#"+$.jgrid.jqID(frmtborg),
			stat = true;
			$("#FormError",frmtb).hide();
			if(rp_ge[$t.p.id].checkOnUpdate) {
				postdata = {};extpost={};
				$.proxy($.jgrid.getFormData, $t)(postdata, extpost);
				newData = $.extend({},postdata,extpost);
				diff = $.proxy($.jgrid.compareData, $t)(newData,rp_ge[$t.p.id]._savedData);
				if(diff) {
					$("#"+frmgr).data("disabled",true);
					$(".confirm","#"+IDs.themodal).show();
					stat = false;
				}
			}
			return stat;
		},restoreInline : function(rowid) {
			var $t = this;
			if (rowid !== "_empty" && typeof($t.p.savedRow) !== "undefined" && $t.p.savedRow.length > 0 && $.isFunction($.fn.jqGrid.restoreRow)) {
				for (var i=0;i<$t.p.savedRow.length;i++) {
					if ($t.p.savedRow[i].id == rowid) {
						$($t).jqGrid('restoreRow',rowid);
						break;
					}
				}
			}
		},updateNav : function(cr,totr){
			var $t = this, gID = $t.p.id, frmgr = "FrmGrid_"+gID, frmtborg = "TblGrid_"+gID, frmtb = "#"+$.jgrid.jqID(frmtborg);
			if (cr===0) {$($.fn.jqGrid.rup.edit.navigation.back.id,frmtb+"_2").addClass('ui-state-disabled');} else {$($.fn.jqGrid.rup.edit.navigation.back.id,frmtb+"_2").removeClass('ui-state-disabled');}
			if (cr==totr) {$($.fn.jqGrid.rup.edit.navigation.forward.id,frmtb+"_2").addClass('ui-state-disabled');} else {$($.fn.jqGrid.rup.edit.navigation.forward.id,frmtb+"_2").removeClass('ui-state-disabled');}
		},getCurrPos : function() {
			var $t = this, gID = $t.p.id, frmgr = "FrmGrid_"+gID, frmtborg = "TblGrid_"+gID, frmtb = "#"+$.jgrid.jqID(frmtborg), rowsInGrid = $($t).jqGrid("getDataIDs"),
			selrow = $("#id_g",frmtb).val(),
			pos = $.inArray(selrow,rowsInGrid);
			return [pos,rowsInGrid];
		}
	});
	
	/*
	 * MODIFICACIONES
	 * Funciones extendidas (MODIFICADAS) del componente jqGrid.
	 * 
	 * Los métodos aquí indicados han sido extendidos partiendo de la implementación original.
	 * Las modificaciones han sido realizadas debido a la incompatibilidad de su implementación con los requisitos exigidos.
	 * 
	 * Los métodos extendidos para su modificación son los siguientes:
	 * 
	 * - editGridRow
	 */ 
	$.jgrid.extend({
		editGridRow : function(rowid, p){
			p = $.extend({
				top : 0,
				left: 0,
				width: 300,
				height: 'auto',
				dataheight: 'auto',
				modal: false,
				overlay : 30,
				drag: true,
				resize: true,
				url: null,
				mtype : "POST",
				clearAfterAdd :true,
				closeAfterEdit : false,
				reloadAfterSubmit : true,
				onInitializeForm: null,
				beforeInitData: null,
				beforeShowForm: null,
				afterShowForm: null,
				beforeSubmit: null,
				afterSubmit: null,
				onclickSubmit: null,
				afterComplete: null,
				onclickPgButtons : null,
				afterclickPgButtons: null,
				editData : {},
				recreateForm : false,
				jqModal : true,
				closeOnEscape : false,
				addedrow : "first",
				topinfo : '',
				bottominfo: '',
				saveicon : [],
				closeicon : [],
				savekey: [false,13],
				navkeys: [false,38,40],
				checkOnSubmit : false,
				checkOnUpdate : false,
				_savedData : {},
				processing : false,
				onClose : null,
				ajaxEditOptions : {},
				serializeEditData : null,
				viewPagerButtons : true
			}, $.jgrid.edit, p || {});
			rp_ge[$(this)[0].p.id] = p;
			return this.each(function(){
				var $t = this;
				if (!$t.grid || !rowid) {return;}
				var gID = $t.p.id,
				frmgr = "FrmGrid_"+gID, frmtborg = "TblGrid_"+gID, frmtb = "#"+$.jgrid.jqID(frmtborg), 
				IDs = {themodal:'editmod'+gID,modalhead:'edithd'+gID,modalcontent:'editcnt'+gID, scrollelm : frmgr},
				onBeforeShow = $.isFunction(rp_ge[$t.p.id].beforeShowForm) ? rp_ge[$t.p.id].beforeShowForm : false,
				onAfterShow = $.isFunction(rp_ge[$t.p.id].afterShowForm) ? rp_ge[$t.p.id].afterShowForm : false,
				onBeforeInit = $.isFunction(rp_ge[$t.p.id].beforeInitData) ? rp_ge[$t.p.id].beforeInitData : false,
				onInitializeForm = $.isFunction(rp_ge[$t.p.id].onInitializeForm) ? rp_ge[$t.p.id].onInitializeForm : false,
				showFrm = true,
				maxCols = 1, maxRows=0,	postdata, extpost, newData, diff, frmoper;
				frmgr = $.jgrid.jqID(frmgr);
				if (rowid === "new") {
					rowid = "_empty";
					frmoper = "add";
					p.caption=rp_ge[$t.p.id].addCaption;
				} else {
					p.caption=rp_ge[$t.p.id].editCaption;
					frmoper = "edit";
				}
				if(p.recreateForm===true && $("#"+$.jgrid.jqID(IDs.themodal))[0] !== undefined) {
					$("#"+$.jgrid.jqID(IDs.themodal)).remove();
				}
				var closeovrl = true;
				if(p.checkOnUpdate && p.jqModal && !p.modal) {
					closeovrl = false;
				}
	
		
				if ( $("#"+$.jgrid.jqID(IDs.themodal))[0] !== undefined ) {
					showFrm = $($t).triggerHandler("jqGridAddEditBeforeInitData", [$("#"+$.jgrid.jqID(frmgr)), frmoper]);
					if(typeof(showFrm) == "undefined") {
						showFrm = true;
					}
					if(showFrm && onBeforeInit) {
						showFrm = onBeforeInit.call($t,$("#"+frmgr));
					}
					if(showFrm === false) {return;}
/* MOD */			$.proxy($.jgrid.restoreInline, $t)(rowid);
					$(".ui-jqdialog-title","#"+$.jgrid.jqID(IDs.modalhead)).html(p.caption);
					$("#FormError",frmtb).hide();
					if(rp_ge[$t.p.id].topinfo) {
						$(".topinfo",frmtb).html(rp_ge[$t.p.id].topinfo);
						$(".tinfo",frmtb).show();
					} else {
						$(".tinfo",frmtb).hide();
					}
					if(rp_ge[$t.p.id].bottominfo) {
						$(".bottominfo",frmtb+"_2").html(rp_ge[$t.p.id].bottominfo);
						$(".binfo",frmtb+"_2").show();
					} else {
						$(".binfo",frmtb+"_2").hide();
					}
/* MOD */			$.proxy($.jgrid.fillData, $t)(rowid,$t,frmgr);
					///
					if(rowid=="_empty" || !rp_ge[$t.p.id].viewPagerButtons) {
						$($.fn.jqGrid.rup.edit.navigation.back.id+","+$.fn.jqGrid.rup.edit.navigation.forward.id ,frmtb+"_2").hide();
					} else {
						$($.fn.jqGrid.rup.edit.navigation.back.id+","+$.fn.jqGrid.rup.edit.navigation.forward.id ,frmtb+"_2").show();
					}
					if(rp_ge[$t.p.id].processing===true) {
						rp_ge[$t.p.id].processing=false;
						$("#sData", frmtb+"_2").removeClass('ui-state-active');
					}
					if($("#"+frmgr).data("disabled")===true) {
						$(".confirm","#"+$.jgrid.jqID(IDs.themodal)).hide();
						$("#"+frmgr).data("disabled",false);
					}
					$($t).triggerHandler("jqGridAddEditBeforeShowForm", [$("#"+frmgr), frmoper]);
					if(onBeforeShow) { onBeforeShow.call($t, $("#"+frmgr)); }
					$("#"+$.jgrid.jqID(IDs.themodal)).data("onClose",rp_ge[$t.p.id].onClose);
					$.jgrid.viewModal("#"+$.jgrid.jqID(IDs.themodal),{gbox:"#gbox_"+$.jgrid.jqID(gID),jqm:p.jqModal, jqM: false, overlay: p.overlay, modal:p.modal});
					if(!closeovrl) {
						$(".jqmOverlay").click(function(){
/* MOD */					if(!$.proxy($.jgrid.checkUpdates, $t)(extpost)) {return false;}
							$.jgrid.hideModal("#"+$.jgrid.jqID(IDs.themodal),{gb:"#gbox_"+$.jgrid.jqID(gID),jqm:p.jqModal, onClose: rp_ge[$t.p.id].onClose});
							return false;
						});
					}
					$($t).triggerHandler("jqGridAddEditAfterShowForm", [$("#"+frmgr), frmoper]);
					if(onAfterShow) { onAfterShow.call($t, $("#"+frmgr)); }
				} else {
					var dh = isNaN(p.dataheight) ? p.dataheight : p.dataheight+"px",
					frm = $("<form name='FormPost' id='"+frmgr+"' class='FormGrid' onSubmit='return false;' style='width:100%;overflow:auto;position:relative;height:"+dh+";'></form>").data("disabled",false),
					tbl = $("<table id='"+frmtborg+"' class='EditTable' cellspacing='0' cellpadding='0' border='0'><tbody></tbody></table>"); 
					showFrm = $($t).triggerHandler("jqGridAddEditBeforeInitData", [$("#"+frmgr), frmoper]);
					if(typeof(showFrm) == "undefined") {
						showFrm = true;
					}
					if(showFrm && onBeforeInit) {
						showFrm = onBeforeInit.call($t,$("#"+frmgr));
					}
					if(showFrm === false) {return;}
/* MOD	*/			$.proxy($.jgrid.restoreInline, $t)(rowid);
					$($t.p.colModel).each( function() {
						var fmto = this.formoptions;
						maxCols = Math.max(maxCols, fmto ? fmto.colpos || 0 : 0 );
						maxRows = Math.max(maxRows, fmto ? fmto.rowpos || 0 : 0 );
					});
					$(frm).append(tbl);
					var flr = $("<tr id='FormError' style='display:none'><td class='ui-state-error' colspan='"+(maxCols*2)+"'></td></tr>");
					flr[0].rp = 0;
					$(tbl).append(flr);
					//topinfo
					flr = $("<tr style='display:none' class='tinfo'><td class='topinfo' colspan='"+(maxCols*2)+"'>"+rp_ge[$t.p.id].topinfo+"</td></tr>"); 
					flr[0].rp = 0;
					$(tbl).append(flr);
					// set the id.
					// use carefull only to change here colproperties.
					// create data
					var rtlb = $t.p.direction == "rtl" ? true :false,
					bp = rtlb ? $.fn.jqGrid.rup.edit.navigation.forward.id : $.fn.jqGrid.rup.edit.navigation.back.id,
					bn = rtlb ? $.fn.jqGrid.rup.edit.navigation.back.id : $.fn.jqGrid.rup.edit.navigation.forward.id;
/* MOD */			$.proxy($.jgrid.createData, $t)(rowid,$t,tbl,maxCols);
					// buttons at footer
					var bP = "<a href='javascript:void(0)' id='"+bp+"' class='fm-button ui-state-default ui-corner-left'><span class='ui-icon ui-icon-triangle-1-w'></span></a>",
					bN = "<a href='javascript:void(0)' id='"+bn+"' class='fm-button ui-state-default ui-corner-right'><span class='ui-icon ui-icon-triangle-1-e'></span></a>",
					bS  ="<a href='javascript:void(0)' id='sData' class='fm-button ui-state-default ui-corner-all'>"+p.bSubmit+"</a>",
					bC  ="<a href='javascript:void(0)' id='cData' class='fm-button ui-state-default ui-corner-all'>"+p.bCancel+"</a>";
					var bt = "<table border='0' cellspacing='0' cellpadding='0' class='EditTable' id='"+frmtborg+"_2'><tbody><tr><td colspan='2'><hr class='ui-widget-content' style='margin:1px'/></td></tr><tr id='Act_Buttons'><td class='navButton'>"+(rtlb ? bN+bP : bP+bN)+"</td><td class='EditButton'>"+bS+bC+"</td></tr>";
					bt += "<tr style='display:none' class='binfo'><td class='bottominfo' colspan='2'>"+rp_ge[$t.p.id].bottominfo+"</td></tr>";
					bt += "</tbody></table>";
					if(maxRows >  0) {
						var sd=[];
						$.each($(tbl)[0].rows,function(i,r){
							sd[i] = r;
						});
						sd.sort(function(a,b){
							if(a.rp > b.rp) {return 1;}
							if(a.rp < b.rp) {return -1;}
							return 0;
						});
						$.each(sd, function(index, row) {
							$('tbody',tbl).append(row);
						});
					}
					p.gbox = "#gbox_"+$.jgrid.jqID(gID);
					var cle = false;
					if(p.closeOnEscape===true){
						p.closeOnEscape = false;
						cle = true;
					}
					var tms = $("<span></span>").append(frm).append(bt);
					$.jgrid.createModal(IDs,tms,p,"#gview_"+$.jgrid.jqID($t.p.id),$("#gbox_"+$.jgrid.jqID($t.p.id))[0]);
					if(rtlb) {
						$($.fn.jqGrid.rup.edit.navigation.back.id+","+$.fn.jqGrid.rup.edit.navigation.forward.id,frmtb+"_2").css("float","right");
						$(".EditButton",frmtb+"_2").css("text-align","left");
					}
					if(rp_ge[$t.p.id].topinfo) {$(".tinfo",frmtb).show();}
					if(rp_ge[$t.p.id].bottominfo) {$(".binfo",frmtb+"_2").show();}
					tms = null;bt=null;
					$("#"+$.jgrid.jqID(IDs.themodal)).keydown( function( e ) {
						var wkey = e.target;
						if ($("#"+frmgr).data("disabled")===true ) {return false;}//??
						if(rp_ge[$t.p.id].savekey[0] === true && e.which == rp_ge[$t.p.id].savekey[1]) { // save
							if(wkey.tagName != "TEXTAREA") {
								$("#sData", frmtb+"_2").trigger("click");
								return false;
							}
						}
						if(e.which === 27) {
/* MOD */					if(!$.proxy($.jgrid.checkUpdates, $t)(extpost)) {return false;}
							if(cle)	{$.jgrid.hideModal(this,{gb:p.gbox,jqm:p.jqModal, onClose: rp_ge[$t.p.id].onClose});}
							return false;
						}
						if(rp_ge[$t.p.id].navkeys[0]===true) {
							if($("#id_g",frmtb).val() == "_empty") {return true;}
							if(e.which == rp_ge[$t.p.id].navkeys[1]){ //up
								$($.fn.jqGrid.rup.edit.navigation.back.id, frmtb+"_2").trigger("click");
								return false;
							}
							if(e.which == rp_ge[$t.p.id].navkeys[2]){ //down
								$($.fn.jqGrid.rup.edit.navigation.forward.id, frmtb+"_2").trigger("click");
								return false;
							}
						}
					});
					if(p.checkOnUpdate) {
						$("a.ui-jqdialog-titlebar-close span","#"+$.jgrid.jqID(IDs.themodal)).removeClass("jqmClose");
						$("a.ui-jqdialog-titlebar-close","#"+$.jgrid.jqID(IDs.themodal)).unbind("click")
						.click(function(){
/* MOD */					if(!$.proxy($.jgrid.checkUpdates, $t)(extpost)) {return false;}
							$.jgrid.hideModal("#"+$.jgrid.jqID(IDs.themodal),{gb:"#gbox_"+$.jgrid.jqID(gID),jqm:p.jqModal,onClose: rp_ge[$t.p.id].onClose});
							return false;
						});
					}
					p.saveicon = $.extend([true,"left","ui-icon-disk"],p.saveicon);
					p.closeicon = $.extend([true,"left","ui-icon-close"],p.closeicon);
					// beforeinitdata after creation of the form
					if(p.saveicon[0]===true) {
						$("#sData",frmtb+"_2").addClass(p.saveicon[1] == "right" ? 'fm-button-icon-right' : 'fm-button-icon-left')
						.append("<span class='ui-icon "+p.saveicon[2]+"'></span>");
					}
					if(p.closeicon[0]===true) {
						$("#cData",frmtb+"_2").addClass(p.closeicon[1] == "right" ? 'fm-button-icon-right' : 'fm-button-icon-left')
						.append("<span class='ui-icon "+p.closeicon[2]+"'></span>");
					}
					if(rp_ge[$t.p.id].checkOnSubmit || rp_ge[$t.p.id].checkOnUpdate) {
						bS  ="<a href='javascript:void(0)' id='sNew' class='fm-button ui-state-default ui-corner-all' style='z-index:1002'>"+p.bYes+"</a>";
						bN  ="<a href='javascript:void(0)' id='nNew' class='fm-button ui-state-default ui-corner-all' style='z-index:1002'>"+p.bNo+"</a>";
						bC  ="<a href='javascript:void(0)' id='cNew' class='fm-button ui-state-default ui-corner-all' style='z-index:1002'>"+p.bExit+"</a>";
						var ii, zI = p.zIndex  || 999;zI ++;
						if ($.browser.msie && $.browser.version ==6) {
							ii = '<iframe style="display:block;position:absolute;z-index:-1;filter:Alpha(Opacity=\'0\');" src="javascript:false;"></iframe>';
						} else {ii="";}
						$("<div class='ui-widget-overlay jqgrid-overlay confirm' style='z-index:"+zI+";display:none;'>&#160;"+ii+"</div><div class='confirm ui-widget-content ui-jqconfirm' style='z-index:"+(zI+1)+"'>"+p.saveData+"<br/><br/>"+bS+bN+bC+"</div>").insertAfter("#"+frmgr);
						$("#sNew","#"+$.jgrid.jqID(IDs.themodal)).click(function(){
/* MOD */					$.proxy($.jgrid.postIt, $t)(postdata, extpost, frmoper);
							$("#"+frmgr).data("disabled",false);
							$(".confirm","#"+$.jgrid.jqID(IDs.themodal)).hide();
							return false;
						});
						$("#nNew","#"+$.jgrid.jqID(IDs.themodal)).click(function(){
							$(".confirm","#"+$.jgrid.jqID(IDs.themodal)).hide();
							$("#"+frmgr).data("disabled",false);
							setTimeout(function(){$(":input","#"+frmgr)[0].focus();},0);
							return false;
						});
						$("#cNew","#"+$.jgrid.jqID(IDs.themodal)).click(function(){
							$(".confirm","#"+$.jgrid.jqID(IDs.themodal)).hide();
							$("#"+frmgr).data("disabled",false);
							$.jgrid.hideModal("#"+$.jgrid.jqID(IDs.themodal),{gb:"#gbox_"+$.jgrid.jqID(gID),jqm:p.jqModal,onClose: rp_ge[$t.p.id].onClose});
							return false;
						});
					}
					// here initform - only once
					$($t).triggerHandler("jqGridAddEditInitializeForm", [$("#"+frmgr), frmoper]);
					if(onInitializeForm) {onInitializeForm.call($t,$("#"+frmgr));}
					if(rowid=="_empty" || !rp_ge[$t.p.id].viewPagerButtons) {$($.fn.jqGrid.rup.edit.navigation.back.id+","+$.fn.jqGrid.rup.edit.navigation.forward.id,frmtb+"_2").hide();} else {$($.fn.jqGrid.rup.edit.navigation.back.id+","+$.fn.jqGrid.rup.edit.navigation.forward.id,frmtb+"_2").show();}
					$($t).triggerHandler("jqGridAddEditBeforeShowForm", [$("#"+frmgr), frmoper]);
					if(onBeforeShow) { onBeforeShow.call($t, $("#"+frmgr));}
					$("#"+$.jgrid.jqID(IDs.themodal)).data("onClose",rp_ge[$t.p.id].onClose);
					$.jgrid.viewModal("#"+$.jgrid.jqID(IDs.themodal),{gbox:"#gbox_"+$.jgrid.jqID(gID),jqm:p.jqModal, overlay: p.overlay,modal:p.modal});
					if(!closeovrl) {
						$(".jqmOverlay").click(function(){
/* MOD */					if(!$.proxy($.jgrid.checkUpdates, $t)(extpost)) {return false;}
							$.jgrid.hideModal("#"+$.jgrid.jqID(IDs.themodal),{gb:"#gbox_"+$.jgrid.jqID(gID),jqm:p.jqModal, onClose: rp_ge[$t.p.id].onClose});
							return false;
						});
					}
					$($t).triggerHandler("jqGridAddEditAfterShowForm", [$("#"+frmgr), frmoper]);
					if(onAfterShow) { onAfterShow.call($t, $("#"+frmgr)); }
					$(".fm-button","#"+$.jgrid.jqID(IDs.themodal)).hover(
						function(){$(this).addClass('ui-state-hover');},
						function(){$(this).removeClass('ui-state-hover');}
					);
					$("#sData", frmtb+"_2").click(function(){
						postdata = {};extpost={};
						$("#FormError",frmtb).hide();
						// all depend on ret array
						//ret[0] - succes
						//ret[1] - msg if not succes
						//ret[2] - the id  that will be set if reload after submit false
/* MOD */				$.proxy($.jgrid.getFormData, $t)(postdata, extpost);
/* MOD */				if(postdata[$t.p.id+"_id"] == "_empty")	{$.proxy($.jgrid.postIt, $t)(postdata, extpost, frmoper);}
						else if(p.checkOnSubmit===true ) {
							newData = $.extend({},postdata,extpost);
							diff = $.proxy($.jgrid.compareData, $t)(newData,rp_ge[$t.p.id]._savedData);
							if(diff) {
								$("#"+frmgr).data("disabled",true);
								$(".confirm","#"+$.jgrid.jqID(IDs.themodal)).show();
							} else {
/* MOD */ 						$.proxy($.jgrid.postIt, $t)(postdata, extpost, frmoper);
							}
						} else {
/* MOD */					$.proxy($.jgrid.postIt, $t)(postdata, extpost, frmoper);
						}
						return false;
					});
					$("#cData", frmtb+"_2").click(function(){
/* MOD */				if(!$.proxy($.jgrid.checkUpdates, $t)(extpost)) {return false;}
						$.jgrid.hideModal("#"+$.jgrid.jqID(IDs.themodal),{gb:"#gbox_"+$.jgrid.jqID(gID),jqm:p.jqModal,onClose: rp_ge[$t.p.id].onClose});
						return false;
					});
					$($.fn.jqGrid.rup.edit.navigation.forward.id, frmtb+"_2").click(function(){ 
/* MOD */				if(!$.proxy($.jgrid.checkUpdates, $t)(extpost)) {return false;}
						$("#FormError",frmtb).hide();
/* MOD */				var npos = $.proxy($.jgrid.getCurrPos, $t)();
						npos[0] = parseInt(npos[0],10);
						if(npos[0] != -1 && npos[1][npos[0]+1]) {
							$($t).triggerHandler("jqGridAddEditClickPgButtons", ['next',$("#"+frmgr),npos[1][npos[0]]]);
							var nposret = true;
							if($.isFunction(p.onclickPgButtons)) {
								nposret = p.onclickPgButtons.call($t, 'next',$("#"+frmgr),npos[1][npos[0]]);
								if( nposret !== undefined && nposret === false ) {return false;}
							}
							if( $("#"+$.jgrid.jqID(npos[1][npos[0]+1])).hasClass('ui-state-disabled')) {return false;}
/* MOD */					$.proxy($.jgrid.fillData, $t)(npos[1][npos[0]+1],$t,frmgr);
							$($t).jqGrid("setSelection",npos[1][npos[0]+1]);
							$($t).triggerHandler("jqGridAddEditAfterClickPgButtons", ['next',$("#"+frmgr),npos[1][npos[0]]]);
							if($.isFunction(p.afterclickPgButtons)) {
								p.afterclickPgButtons.call($t, 'next',$("#"+frmgr),npos[1][npos[0]+1]);
							}
/* MOD */					$.proxy($.jgrid.updateNav, $t)(npos[0]+1,npos[1].length-1);
						}
						return false;
					});
					$($.fn.jqGrid.rup.edit.navigation.back.id, frmtb+"_2").click(function(){ 
/* MOD */ 				if(!$.proxy($.jgrid.checkUpdates, $t)(extpost)) {return false;}
						$("#FormError",frmtb).hide();
/* MOD */				var ppos = $.proxy($.jgrid.getCurrPos, $t)();
						if(ppos[0] != -1 && ppos[1][ppos[0]-1]) {
							$($t).triggerHandler("jqGridAddEditClickPgButtons", ['prev',$("#"+frmgr),ppos[1][ppos[0]]]);
							var pposret = true;
							if($.isFunction(p.onclickPgButtons)) {
								pposret = p.onclickPgButtons.call($t, 'prev',$("#"+frmgr),ppos[1][ppos[0]]);
								if( pposret !== undefined && pposret === false ) {return false;}
							}
							if( $("#"+$.jgrid.jqID(ppos[1][ppos[0]-1])).hasClass('ui-state-disabled')) {return false;}
/* MOD */					$.proxy($.jgrid.fillData, $t)(ppos[1][ppos[0]-1],$t,frmgr);
							$($t).jqGrid("setSelection",ppos[1][ppos[0]-1]);
							$($t).triggerHandler("jqGridAddEditAfterClickPgButtons", ['prev',$("#"+frmgr),ppos[1][ppos[0]]]);
							if($.isFunction(p.afterclickPgButtons)) {
								p.afterclickPgButtons.call($t, 'prev',$("#"+frmgr),ppos[1][ppos[0]-1]);
							}
/* MOD */					$.proxy($.jgrid.updateNav, $t)(ppos[0]-1,ppos[1].length-1);
						}
						return false;
					});
				}
/* MOD */		var posInit =$.proxy($.jgrid.getCurrPos, $t)();
/* MOD */		$.proxy($.jgrid.updateNav, $t)(posInit[0],posInit[1].length-1);
			});
		}
	});
	
	
	$.fn.jqGrid.rup={};
	$.fn.jqGrid.rup.edit = {
			navigation:{
				forward:{
					id:"#nData"					
				},
				back:{
					id:"#pData"					
				}
			}
	};
	
	
})(jQuery);
/*!
 * Copyright 2013 E.J.I.E., S.A.
 *
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
 */
(function($) {
  jQuery.jgrid.fluid =
  {
    fluidWidth: function(options)
    {
      var grid = $(this);
      var settings = $.extend(
                        {
                          fluidBaseLayer: "#gbox_"+grid.attr("id"),
                          fluidOffset: 0,
                          minWidth: null,
                          maxWidth: null
                        }, options || {});
      
      var resizeLayer = function(layer, forceEvent){
		  var currentWidth = layer.width(), previousWidth = $(layer).data("previousWidth"), evntCurrentWidth = currentWidth;
		  if (forceEvent===true || (currentWidth != previousWidth)) {
			  $(layer).data("previousWidth",currentWidth);

			  evntCurrentWidth= (settings.minWidth !==null && currentWidth < settings.minWidth?settings.minWidth:evntCurrentWidth);
			  evntCurrentWidth= (settings.maxWidth !==null && currentWidth > settings.maxWidth?settings.maxWidth:evntCurrentWidth);
			  
			  grid.trigger("fluidWidth.resize",[previousWidth, evntCurrentWidth - settings.fluidOffset]);
		  }
	  };
      
      // Comprobamos si se esta monitorizando la anchura de la capa
      if ($(settings.fluidBaseLayer).data("fluidWidth")!==true){
    	  //Inidicamos que la capa esta siendo monitorizada
    	  $(settings.fluidBaseLayer).data("fluidWidth", true);
    	  
    	  setInterval(function(){
    		  resizeLayer($(settings.fluidBaseLayer), false);
    	  }, 100);
      }
      
      resizeLayer($(settings.fluidBaseLayer), true);
    }
  };
})(jQuery);

jQuery.fn.extend({ fluidWidth : jQuery.jgrid.fluid.fluidWidth });
/*!
 * Copyright 2013 E.J.I.E., S.A.
 *
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
 */

/**
 * Tiene como objetivo mostrar al usuario de manera gráfica el estado de avance de una tarea o proceso.
 *
 * @summary Componente RUP Table.
 * @module rup_jqtable
 * @see El componente está basado en el plugin {@link http://www.trirand.com/blog/|jQuery Grid Plugin – jqGrid}. Para mas información acerca de las funcionalidades y opciones de configuración pinche {@link http://www.trirand.com/jqgridwiki/doku.php|aquí}.
 * @example
 *
 * var properties = {
 *		url: "../tableUrl",
 *		colNames: [
 *			"id","nombre","..."]
 *		],
 *		colModel: [
 *			{name: "id", label: "id"},
 *			{name: "nombre", label: "nombre"},
 *			{name: "...", label: "..."}
 *		],
 *		model:"Usuario",
 *		usePlugins:[
 *			"formEdit",
 *			"feedback",
 *			"toolbar",
 *			"contextMenu",
 *			"fluid",
 *			"filter",
 *			"search"
 *		],
 *		primaryKey: "id"
 *	};
 *
 * $("#jqtable").rup_jqtable(properties);
 */

/*global jQuery */

(function ($) {


	//*****************************************************************************************************************
	// DEFINICIÓN BASE DEL PATRÓN (definición de la variable privada que contendrá los métodos y la función de jQuery)
	//*****************************************************************************************************************
	var rup_jqtable = {};
	rup_jqtable.plugins = [];

	jQuery.rup_jqtable = jQuery.rup_jqtable || {};
	jQuery.extend(jQuery.rup_jqtable, {
		registerPlugin: function (name, settings) {
			if (jQuery.inArray(name, rup_jqtable.plugins) === -1) {
				rup_jqtable.plugins.push(name);
				rup_jqtable.plugins[name] = settings;
			}
		}
	});

	//Se configura el arranque de UDA para que alberge el nuevo patrón
	jQuery.extend(jQuery.rup.iniRup, jQuery.rup.rupSelectorObjectConstructor('rup_jqtable', rup_jqtable));

	$.fn.fmatter.rup_combo = function (cellval, opts, rwd, act) {

		var labelProp, label, settings;


		var formatterData = $(this).data('rup.jqtable.formatter') !== undefined ? $(this).data('rup.jqtable.formatter') : {};

		// Se añade la info del formatter
		var formatterObj = {};
		formatterObj['rup_combo'] = {
			value: cellval
		};

		//		formatterObj["rup_combo"] = cellval;

		// Se añade la info de la columna
		var colFormatter = {};
		colFormatter[opts.colModel.name] = formatterObj;

		// Se añade el id de la fila
		var rowObj = {};
		rowObj[opts.rowId] = colFormatter;



		if (opts.colModel.formatoptions && opts.colModel.formatoptions.labelName) {
			labelProp = opts.colModel.formatoptions.labelName;
			label = $.rup_utils.getJson(rwd, labelProp);

		} else {
			if (typeof opts.colModel.editoptions.source === 'string') {
				// Combo remoto
				// Obtener la propiedad que corresponde al texto a visualizar
				if (opts.colModel.name.indexOf('.') !== -1) {
					labelProp = opts.colModel.name.substring(0, opts.colModel.name.lastIndexOf('.')) + '.' + opts.colModel.editoptions.sourceParam.label;
				} else {
					labelProp = opts.colModel.editoptions.sourceParam.label;
				}
				label = $.rup_utils.getJson(rwd, labelProp);

			} else {
				// Combo local

				var labelArr = $.grep(opts.colModel.editoptions.source, function (elem, index) {
					if (elem.value === cellval) {
						return true;
					}
				});

				if (labelArr.length === 1) {
					if (labelArr[0].i18nCaption) {
						label = $.rup.i18nParse($.rup.i18n.app[settings.i18nId], labelArr[0].i18nCaption);
					} else {
						label = labelArr[0].label;
					}
				}

			}
		}
		formatterObj['rup_combo']['label'] = label;

		$.extend(true, formatterData, rowObj);
		$(this).data('rup.jqtable.formatter', formatterData);

		return label || '';

	};

	$.fn.fmatter.rup_combo.unformat = function (cellvalue, options) {
		var val = $(this).data('rup.jqtable.formatter')[options.rowId][options.colModel.name]['rup_combo']['value'];

		return val || '';

	};


	$.fn.fmatter.rup_autocomplete = function (cellval, opts, rwd, act) {

		var labelProp, label, settings;


		var formatterData = $(this).data('rup.jqtable.formatter') !== undefined ? $(this).data('rup.jqtable.formatter') : {};

		// Se añade la info del formatter
		var formatterObj = {};
		formatterObj['rup_autocomplete'] = {
			value: cellval
		};


		//		formatterObj["rup_combo"] = cellval;

		// Se añade la info de la columna
		var colFormatter = {};
		colFormatter[opts.colModel.name] = formatterObj;

		// Se añade el id de la fila
		var rowObj = {};
		rowObj[opts.rowId] = colFormatter;



		if (opts.colModel.formatoptions && opts.colModel.formatoptions.labelName) {
			labelProp = opts.colModel.formatoptions.labelName;
			label = $.rup_utils.getJson(rwd, labelProp);

		} else {
			if (typeof opts.colModel.editoptions.source === 'string') {
				// Combo remoto
				// Obtener la propiedad que corresponde al texto a visualizar
				if (opts.colModel.name.indexOf('.') !== -1) {
					labelProp = opts.colModel.name.substring(0, opts.colModel.name.lastIndexOf('.')) + '.' + opts.colModel.editoptions.sourceParam.label;
				} else {
					labelProp = opts.colModel.editoptions.sourceParam.label;
				}
				label = $.rup_utils.getJson(rwd, labelProp);

			} else {
				// Combo local

				var labelArr = $.grep(opts.colModel.editoptions.source, function (elem, index) {
					if (elem.value === cellval) {
						return true;
					}
				});

				if (labelArr.length === 1) {
					if (labelArr[0].i18nCaption) {
						label = $.rup.i18nParse($.rup.i18n.app[settings.i18nId], labelArr[0].i18nCaption);
					} else {
						label = labelArr[0].label;
					}
				}

			}
		}
		formatterObj['rup_autocomplete']['label'] = label;

		$.extend(true, formatterData, rowObj);
		$(this).data('rup.jqtable.formatter', formatterData);

		return label || '';

	};

	$.fn.fmatter.rup_autocomplete.unformat = function (cellvalue, options) {
		var val = $(this).data('rup.jqtable.formatter')[options.rowId][options.colModel.name]['rup_autocomplete']['value'];

		return val || '';

	};

	/*
   * SOBREESCITURAS
   * Funciones extendidas (SOBREESCRITAS) del componente jqGrid
   *
   * Los métodos aquí indicados han sido extendidos y su implementación sustituida por completo.
   * La extensión ha sido realizada para ajustar el comportamiento del componente jqGrid a los requisitos exigidos.
   *
   * Los métodos extendidos para su modificación son los siguientes:
   *
   * - createModal
   * - hideModal
   * - viewModal
   */
	jQuery.extend(jQuery.jgrid, {
		createModal: function (aIDs, content, p, insertSelector, posSelector, appendsel, css) {
			// aIDs: Identificadores de la modal
			// -- aIDs.modalcontent :
			// -- aIDs.modalhead :
			// -- aIDs.scrollelm :
			// -- aIDs.themodal :
			// content: Contenido HTML del díalogo
			// p: parámetros de configuración del diálogo
			// insertSelector: selector que corresponde al elemento despues del que se va a insertar la modal
			// posSelector: elemento base sobre el que se calcula la posición
			var $divModal = jQuery('<div></div>').attr('id', aIDs.themodal).append($(content));
			var $scrollelm = $divModal.find('#' + aIDs.scrollelm);

			$divModal.insertBefore($(insertSelector));
			/* TODO : Añadir los parametros de configruación que puedan añadirse al rup_dialog. */
			$divModal.rup_dialog({
				type: $.rup.dialog.DIV,
				autoOpen: false,
				modal: true,
				resizable: p.resize,
				title: p.caption,
				width: p.width,
				buttons: p.buttons
			});

			// Eliminamos los eventos del boton de cerrar para mostrar el gestor de cambios

			if (jQuery.isFunction(p.onClose)) {
				jQuery('.ui-dialog-titlebar-close, a:has(#closeText_' + $divModal.first()[0].id + ')', $divModal.parent()).off('click').on('click', function (event) {
					p.onClose.call(event);
				});
				// Se elimina el evento de cerrar al texto de cierre del dialogo y se asigna el evento de la gestion de cambios.
				//				prop.detailDiv.parent().find("#closeText_" + prop.detailDiv.first()[0].id).parent().unbind('click').bind("click", function () {
				//					self._checkDetailFormModifications(function(){
				//						prop.detailDiv.rup_dialog("close");
				//					});
				//				});

				// Se elimina el evento de cerrar al icono de cierre del dialogo y se asigna el evento de la gestion de cambios.
				//				prop.detailDiv.parent().find(".ui-dialog-titlebar-close").unbind('click').bind("click", function () {
				//					self._checkDetailFormModifications(function(){
				//						prop.detailDiv.rup_dialog("close");
				//					});
				//				});
			}

			jQuery('#' + aIDs.scrollelm + '_2').addClass('botoneraModal');

			jQuery('.fm-button', '#' + aIDs.scrollelm + '_2').on({
				focusin: function () {
					jQuery(this).addClass('ui-state-focus');
				},
				focusout: function () {
					jQuery(this).removeClass('ui-state-focus');
				}
			});
		},
		hideModal: function (selector, o) {
			jQuery(selector).rup_dialog('close');
		},
		viewModal: function (selector, o) {
			jQuery(selector).rup_dialog('open');
		}

	});


	jQuery.extend(jQuery.rup_jqtable, {
		proxyAjax: function (ajaxOptions, identifier) {
			jQuery.rup_ajax(ajaxOptions);
		}
	});

	/* ******************************
   * FUNCIONES DE CONFIGURACION
   * ******************************/
	jQuery.fn.rup_jqtable('extend', {
		/**
     * Metodo que realiza la pre-configuración del core del componente RUP Table.
     * Este método se ejecuta antes de la pre-configuración de los plugins y de la invocación al componente jqGrid.
     *
     * @name preConfigureCore
     * @function
     * @param {object} settings - Parámetros de configuración del componente.
     * @fires module:rup_jqtable#rupTable_checkOutOfGrid
     * @fires module:rup_jqtable#rupTable_serializeGridData
     * @fires module:rup_jqtable#rupTable_beforeProcessing
     */
		preConfigureCore: function (settings) {
			var $self = this,
				colModel, colModelObj;

			// Configuración del parámetro url
			settings.baseUrl = settings.url;

			// Ajuste en caso de no utilizar el plugin de filter
			if (jQuery.inArray('filter', settings.usePlugins) === -1) {
				settings.url += '/filter';
			}

			// Se almacena el identificador del objeto en la propiedad settings.id
			settings.id = $self.attr('id');

			// Se da valor a la propiedad ruptype
			$self.attr('ruptype', 'jqtable');

			settings.core.tableDiv = settings.id + '_div';
			settings.core.$tableDiv = jQuery('#' + settings.core.tableDiv);

			jQuery(document).bind('click', function (event) {
				var $originalTarget = jQuery(event.target);
				if ($originalTarget.parents().index(settings.core.$tableDiv) === -1) {
					$self.triggerHandler('rupTable_checkOutOfGrid', [event, $originalTarget]);
				}
			});

			/*
       * Configuración de los identificadores por defecto de los componentes del rup_jqtable
       */
			if (settings.pager !== false) {
				settings.pager = $.rup_utils.getJQueryId(settings.pager !== null ? settings.pager : settings.id + '_pager');
				settings.$pager = jQuery(settings.pager);
				if (settings.$pager.length === 0) {
					alert('El identificador ' + settings.pager + ' especificado para el paginador no existe.');
				}
			}

			colModel = settings.colModel;

			if (settings.loadOnStartUp === false || settings.multifilter != undefined) {
				$self.data('tmp.loadOnStartUp.datatype', settings.datatype);
				settings.datatype = 'clientSide';
			}

			// Configuración del colModel para los campos sobre los que se debe de configurar un componente RUP
			for (var i = 0; i < colModel.length; i++) {
				colModelObj = colModel[i];

				// Se comprueba para cada uno de las entradas en el colModel si se debe de crear un componente RUP
				if (colModelObj.rupType !== undefined && colModelObj.rupType !== null) {
					// En caso de tratarse de un componente RUP
					// Se indica como edittype="custom" para que jqGrid lo trate como un componente personalizado
					colModelObj.edittype = 'custom';

					// Si no se ha especificado una funcion custom_element se asigna la función genérica correspondiente a un componente RUP
					if (!jQuery.isFunction(colModelObj.editoptions.custom_element)) {
						colModelObj.editoptions.custom_element = function (value, options) {
							return $('<input>').attr({
								'type': 'text',
								'id': options.id,
								'name': options.name,
								'class': 'FormElement formulario_linea_input customelement',
								'style': 'width:98%',
								'value': value
							})[0];
						};
					}
					// Si no se ha especificado una funcion custom_value se asigna la función genérica correspondiente a un componente RUP
					if (!jQuery.isFunction(colModelObj.editoptions.custom_value)) {
						colModelObj.editoptions.custom_value = function ($elem, operation, value) {
							var ruptype = $elem.attr('ruptype');
							if (ruptype !== undefined) {
								if (operation === 'set') {
									$elem['rup_' + ruptype]('setRupValue', value);
								} else if (operation === 'get') {
									if (ruptype === 'autocomplete'){
										return $('[id="'+$elem.attr('id').substring(0, $elem.attr('id').indexOf('_label'))+'"]')['rup_' + ruptype]('getRupValue');
									}else{
										return $elem['rup_' + ruptype]('getRupValue');
									}
								}
							}
						};
					}
				}
			}

			// Configuración de la columna extra utilizada para mostrar el estado de los registros
			if (settings.showGridInfoCol) {
				settings.colNames = $.merge([''], settings.colNames);
				settings.colModel = $.merge([settings.defaultGridInfoCol], settings.colModel);
			}

			// Configuración de las claves compuestas
			if (settings.primaryKey !== undefined && typeof settings.primaryKey === 'string') {
				settings.primaryKey = [settings.primaryKey];
			}

			if (settings.primaryKey !== undefined && typeof settings.primaryKey === 'object') {
				// Configuración de la columna extra para gestionar las claves compuestas
				if (settings.primaryKey.length === 1) {
					settings.primaryKeyCol = settings.primaryKey[0];

					// Se configura la propiedad key para la columna correspondiente a a clave primaria
					for (var i = 0; i < colModel.length; i++) {
						if (colModel[i].name === settings.primaryKeyCol) {
							colModel[i].key = true;
							break;
						}
					}

				} else if (settings.primaryKey.length > 1) {
					settings.colNames = $.merge([''], settings.colNames);
					var pkColModel = $.extend({}, settings.defaultGridMultiplePkCol, {
						key: true,
						formatter: function (cellvalue, options, rowObject) {
							var $self = $(this),
								settings = $self.data('settings'),
								retValue = '';
							for (var i = 0; i < settings.primaryKey.length; i++) {
								retValue += $.rup_utils.unnestjson(rowObject)[settings.primaryKey[i]] + settings.multiplePkToken;
							}
							retValue = retValue.substr(0, retValue.length - 1);
							return retValue;
						}
					});

					settings.primaryKeyCol = 'pkCol';
					settings.colModel = $.merge([pkColModel], settings.colModel);
				}
				// Se actualiza el nombre de la columna que va a ejercer como clave primaria
				$.extend(settings, {
					prmNames: {
						id: settings.primaryKeyCol
					}
				});
			}

			// Configuración del colModel para la gestión de la edición de las claves primarias en los modos add y edit
			for (var i = 0; i < colModel.length; i++) {
				colModelObj = colModel[i];
				if (colModelObj.editable === true) {
					if (colModelObj.editableOnAdd === undefined) {
						colModelObj.editableOnAdd = true;
					}
					if (colModelObj.editableOnEdit === undefined) {
						if (jQuery.inArray(colModel[i].name, settings.primaryKey) !== -1) {
							colModelObj.editableOnEdit = false;
						} else {
							colModelObj.editableOnEdit = true;
						}
					}
				}
			}

			// Sobreescritura del método serialize grid data
			settings.serializeGridData = function (postData) {
				var newPostData,
					pageNum = parseInt(postData.page),
					lastpage = parseInt($self.rup_jqtable('getGridParam', 'lastpage'));

				if (lastpage !== 0 && pageNum > lastpage) {
					postData.page = lastpage;
				}

				if (settings.core.startOnPage !== null) {
					postData.page = settings.core.startOnPage;
					$self.data('tmp.firstLoad', true);
				}

				jQuery.extend(true, postData, {
					core: {
						'pkToken': settings.multiplePkToken,
						'pkNames': settings.primaryKey
					}
				});



				newPostData = $.extend({}, {
					'filter': {}
				}, postData);

				$self.triggerHandler('rupTable_serializeGridData', [newPostData]);

				$self.removeData('tmp.firstLoad');
				settings.core.startOnPage = null;
				return jQuery.toJSON(newPostData);
			};

			settings.beforeProcessing = function (data, st, xhr) {
				if ($self.triggerHandler('rupTable_beforeProcessing', [data, st, xhr] === false)) {
					return false;
				}

				if (settings.primaryKey.length > 1) {
					$.each(data.rows, function (index, elem) {
						var retValue = '';
						for (var i = 0; i < settings.primaryKey.length; i++) {
							retValue += $.rup_utils.unnestjson(elem)[settings.primaryKey[i]] + settings.multiplePkToken;
						}
						retValue = retValue.substr(0, retValue.length - 1);
						elem['pkCol'] = retValue;
					});
				}

				return true;
			};

			// Gestión de errores por defecto
			//			if (!jQuery.isFunction(settings.loadError)){
			//				settings.userDefined
			//				settings.loadError = function(xhr,st,err){
			//					jQuery.rup_messages("msgError", {
			//						title: settings.core.defaultLoadErrorTitle,
			//						message: xhr.responseText
			//					});
			//				};
			//			}

			var userLoadError = settings.loadError;
			settings.loadError = function (xhr, st, err) {
				var $self = $(this),
					ret;

				ret = $self.triggerHandler('rupTable_loadError', xhr, st, err);

				if (ret !== false) {
					jQuery.proxy(userLoadError, $self)(xhr, st, err);
				}
			};

			settings.getActiveLineId = function () {
				var $self = this,
					rowsInGrid = $self.jqGrid('getDataIDs'),
					selrow = $self.jqGrid('getGridParam', 'selrow');

				return $.inArray(selrow, rowsInGrid);

			};

			settings.getActiveRowId = function () {
				var $self = this;

				return $self.rup_jqtable('getGridParam', 'selrow');
			};

			settings.getSelectedRows = function () {
				var $self = this,
					selrow = $self.rup_jqtable('getGridParam', 'selrow');
				return selrow === null ? [] : [selrow];
			};

			settings.getSelectedLines = function () {
				var $self = this,
					selrow = $self.rup_jqtable('getGridParam', 'selrow');
				return selrow === null ? [] : [$.inArray(selrow, $self.jqGrid('getDataIDs'))];
			};

			// Gestión de las operaciones que se pueden realizar sobre los registros

			// Se unifican las operaciones por defecto con las indicadas por el usaurio
			jQuery.each(settings.core.operations, function (index, operation) {
				settings.core.showOperations[index] = true;
			});

			jQuery.extend(true, settings.core.defaultOperations, settings.core.operations);

			$self.on({
				'jqGridBeforeRequest': function () {
					jQuery.set_uda_ajax_mode_on();
				},
				'jqGridLoadComplete.rup_jqtable.tooltip': function (event, data) {
					var $self = $(this);
					if (data !== undefined) {
						// Redimensionado del campo de número de página en base al número de página máximo
						jQuery('.pagControls input.ui-pg-input', settings.$pager).attr({
							size: data.total.length,
							maxlength: data.total.length
						});
					}
				},
				'jqGridResizeStart': function (event, index) {
					//rup_combo , close the menu of the rup_combo when a column is resized
					$('#' + $self[0].id + '_search_rowInputs select').each(function () {
						$(this).selectmenu('close');
					});

				},
				'jqGridResizeStop': function (event, index) {
					//rup_combo, adjust the width of the menu to the new width after a column has been resized
					$('#' + $self[0].id + '_search_rowInputs select').each(function () {
						$('[id=\'' + this.id + '-menu\']').width($('[id=\'' + this.id + '-button\']').width());
					});

				},

				'jqGridGridComplete.rup_jqtable.core': function (event) {
					var $self = $(this),
						$tbody;

					if ($self.rup_jqtable('getGridParam', 'records') === 0) {
						// No se han encontrado registros

						$self.prev().remove(); //Borrar div vacío
						$($self.jqGrid('getGridParam', 'pager')).hide();
						var content = '<tr class="ui-widget-content jqgrow ui-row-ltr" role="row" id="' + $self[0].id + '_noRecords" aria-selected="false">';
						content += '<td aria-describedby="' + $self[0].id + '_NO_REGISTROS" title="' + $.rup.i18nParse($.rup.i18n.base, 'rup_jqtable.noRecordsFound') + '" style="border:0;padding-left: 0.5em ! important;text-align: left;width:' + $('#gview_' + $self.attr('id')).width() + 'px;background:white;" role="gridcell">';
						//content += 	'<div id="RUP_GRID_' + self[0].id + '_noRecord_ext" class="cellLayout" style="padding-left: 0.5em ! important;">' + $.rup.i18nParse($.rup.i18n.base,"rup_jqtable.noRecordsFound");
						//content += '</div></td></tr>';
						content += $.rup.i18nParse($.rup.i18n.base, 'rup_jqtable.noRecordsFound');
						content += '</td></tr>';
						$self.before(content);
						$('[aria-describedby="' + $self[0].id + '_NO_REGISTROS"]').rup_tooltip({
							position: {
								my: 'center',
								at: 'center'
							}
						});

					} else {

						jQuery('#' + $self[0].id + '_noRecords').remove(); //si tenemos la capa de no hay registros la borramos
						jQuery($self.jqGrid('getGridParam', 'pager')).show();

					}
				},
				'jqGridGridComplete.rup_jqtable.tooltip': function (event) {
					var $self = $(this),
						$tbody;

					// Se han encontrado registros
					// Tooltips de la tabla
					//					jQuery("[title]", $self).rup_tooltip({show:{delay:settings.tooltipDelay}});
					//Se le aplica el tooltip de uda
					$('#' + $(this).attr('id') + ' [title]').each(function (i, elem) {
						var $elem = $(elem);
						$elem.attr('grid_tooltip', $elem.attr('title')).removeAttr('title');
					});
					$tbody = jQuery('tbody:first', $self);
					$tbody.on('mousestop', {
						delay: 500
					}, function (event, originalEvent) {
						var obj = $.rup_utils.elementFromPoint(originalEvent.clientX, originalEvent.clientY, true),
							$obj = $(obj),
							toolipTmpId, auxId, auxDescribedBy;

						if (!$obj.attr('rup_tooltip') && $obj.attr('grid_tooltip') && !$obj.data().qtip) {
							auxId = $obj.parent().attr('id') ? $obj.parent().attr('id') : $obj.parents('tr[role=\'row\']').attr('id');
							auxDescribedBy = $obj.attr('aria-describedby') ? $obj.attr('aria-describedby') : $obj.parents('td[role=\'gridcell\']').attr('aria-describedby');
							$obj.attr('title', $obj.attr('grid_tooltip'));
							toolipTmpId = auxId + '_' + auxDescribedBy;
							$obj.rup_tooltip({
								show: {
									delay: 0
								},
								id: toolipTmpId,
								position: {
									viewport: $(window),
									adjust: {
										method: 'flip'
									}
								}
							});
							$obj.triggerHandler('mouseenter.qtip-' + toolipTmpId + '-create');
							//							$obj.triggerHandler("mouseenter");
							$obj.rup_tooltip('option', 'show.delay', 500);
							$obj.rup_tooltip('open');
						}
					});
				}
			});
		},
		/**
     * Metodo que realiza la post-configuración del core del componente RUP Table.
     * Este método se ejecuta antes de la post-configuración de los plugins y después de la invocación al componente jqGrid.
     *
     * @name postConfigureCore
     * @function
     * @param {object} settings - Parámetros de configuración del componente.
     */
		postConfigureCore: function (settings) {
			var $self = this;

			// Se configura la funcionalidad de redimensionado de la tabla.
			if (settings.resizable !== false) {
				$self.rup_jqtable('gridResize', (jQuery.isPlainObject(settings.resizable) ? settings.resizable : {}));
			}

			// Configruación pager
			if (settings.pager !== false) {
				$self.rup_jqtable('configurePager', settings);
			}

			// Se añaden los tooltip a las cabeceras de la tabla
			$.each($('#gview_table th:visible'), function (index, elem) {
				var $elem = $(elem),
					text = $elem.find('div').text();

				if (text !== '') {
					$elem.attr('title', text).rup_tooltip({
						show: {
							delay: 500
						},
						position: {
							viewport: $(window),
							adjust: {
								method: 'flip'
							}
						}
					});
				}
			});



			// Implementación del ellipsis en las cabeceras de las columnas de la tabla
			jQuery($self.rup_jqtable('getGridParam', 'colModel')).each(function (index, element) {
				var $headerLabel;

				//Si la columna define ellipsis...
				if (element.classes === 'ui-ellipsis') {
					//Añadirle estilos para ellipsis al div que está dentro de la cabecera
					jQuery('[id=\'jqgh_' + settings.id + '_' + element.name + '\']')
						.css('display', 'block')
						.css('text-overflow', 'ellipsis');

				}

				//Sustituir DIV del literal de la cabecera por SPAN (para que funcione ellipsis)
				$headerLabel = jQuery('[id=\'jqgh_' + settings.id + '_' + element.name + '\']').children('div');
				$headerLabel.replaceWith(jQuery('<span>').text($headerLabel.text()).css('cursor', 'pointer'));
			});

			// Configuración de la columna extra utilizada para mostrar el estado de los registros
			if (settings.showGridInfoCol) {
				//				jQuery("#gview_"+settings.id+" table thead th#"+settings.id+"_rupInfoCol").css("padding-right","0px").css("padding-left","0px").css("border-right","0px none");
				jQuery('#gview_' + settings.id + ' table thead th#' + settings.id + '_rupInfoCol').css('border-right', '0px none');

			}

			if (settings.loadOnStartUp === false || settings.multifilter != undefined) {
				settings.datatype = $self.data('tmp.loadOnStartUp.datatype');
				$self.rup_jqtable('setGridParam', {
					datatype: $self.data('tmp.loadOnStartUp.datatype')
				});
				$self.removeData('tmp.loadOnStartUp.datatype');
			}
		}
	});




	//********************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	//********************************

	jQuery.fn.rup_jqtable('extend', {
		/**
     * Devuelve la propiedad colModel del jqGrid.
     *
     * @name getColModel
     * @function
     * @return {object} - Propiedad colModel del jqGrid.
     * @example
     * $("#idComponente").rup_jqtable("getColModel");
     */
		getColModel: function () {
			return $(this).jqGrid('getGridParam', 'colModel');
		},
		/**
     * Devuelve el valor del parámetro del grid especificado.
     *
     * @name getGridParam
     * @function
     * @param {string} pName - Nombre del parámetro que se desea obtener.
     * @return {object} - Valor del parámetro.
     * @example
     * $("#idComponente").rup_jqtable("getGridParam","nombreParametro");
     */
		getGridParam: function (pName) {
			return $(this).jqGrid('getGridParam', pName);
		},
		/**
     * Permite redimensionar la tabla de acuerdo a los parámetros indicados.
     *
     * @name getGridParam
     * @function
     * @param {object} options - Parámetros para configurar la altura y anchura del redimensionado.
     * @return {jQuery} - Referencia al propio componente.
     * @example
     * $("#idComponente").rup_jqtable("gridResize",{});
     */
		gridResize: function (options) {
			return $(this).jqGrid('gridResize', options);
		},
		/**
     * Devuelve un array con los identificadores de los registros seleccionados.
     *
     * @name getSelectedRows
     * @function
     * @return {string[]} - Array con los identificadores de los registros seleccionados.
     * @example
     * $("#idComponente").rup_jqtable("getSelectedRows");
     */
		getSelectedRows: function () {
			var $self = this,
				settings = $self.data('settings');

			return jQuery.proxy(settings.getSelectedRows, $self)();
		},
		/**
     * Devuelve un array con los índices de las líneas de los registros seleccionados.
     *
     * @name getSelectedLines
     * @function
     * @return {number[]} - Array con los índices de las líneas de los registros seleccionados.
     * @example
     * $("#idComponente").rup_jqtable("getSelectedLines");
     */
		getSelectedLines: function () {
			var $self = this,
				settings = $self.data('settings');

			return jQuery.proxy(settings.getSelectedLines, $self)();
		},
		/**
     * El objetivo de este método es construir una URL mediante la cual se pueda realizar una petición para obtener los datos de un registro concreto.
     * La URL se genera concatenando los valores de las propiedades que forman la primary key del resgistro a la url base especificada en los settings de inicialización.
     *
     * @name getPkUrl
     * @function
     * @param {string} rowId - Identificador del registro.
     * @return {string} - Url para obtener los valores del registro correspondiente.
     * @example
     * $("#idComponente").rup_jqtable("getPkUrl","0001");
     */
		getPkUrl: function (rowId) {
			var $self = this,
				settings = $self.data('settings'),
				tmpRowId;
			if (Array.isArray(rowId)) {
				tmpRowId = rowId[0] !== undefined ? rowId[0] : '';
			} else {
				tmpRowId = rowId;
			}

			return tmpRowId.split(settings.multiplePkToken).join('/');
		},
		/**
     * Lanza la recarga de la tabla.
     *
     * @name reloadGrid
     * @function
     * @param {boolean} async - Indica si la llamada debe ser asíncrona o síncrona.
     * @param {boolean} notSelect - Indica si debe seleccionar el primer elemento o no.
     * @example
     * $("#idComponente").rup_jqtable("reloadGrid", true);
     */
		reloadGrid: function (async, notSelect) {
			var $self = this,
				settings = $self.data('settings'),
				page = $self.rup_jqtable('getGridParam', 'page');
			var ajaxOptions = $self.jqGrid('getGridParam', 'ajaxGridOptions');
			var ajaxOptionsAsync = ajaxOptions.async;
			ajaxOptions.async = false;
			//			var ajaxOptions = $self.jqGrid("setGridParam", {ajaxGridOptions:ajaxOptions});
			$self.jqGrid('setGridParam', {
				ajaxGridOptions: ajaxOptions
			});

			$self.jqGrid('setGridParam', {
				page: 1
			});
			$self.trigger('reloadGrid');
			ajaxOptions.async = true;
			$self.jqGrid('setGridParam', {
				ajaxGridOptions: ajaxOptions
			});
			if(!notSelect){
				var nextPagePos = jQuery.proxy(jQuery.jgrid.getCurrPos, $self[0])();
				$self.jqGrid('setSelection', nextPagePos[1][0]);
			}
		},
		/**
     * Resetea el formulario indicado.
     *
     * @name resetForm
     * @function
     * @param {jQuery} $form - Objeto jQuery que referencia el formulario que se desea resetear.
     * @return {jQuery} - Referencia al propio objeto.
     * @example
     * $("#idComponente").rup_jqtable("resetForm", $("#idFormulario"));
     */
		resetForm: function ($form) {
			var $self = this,
				settings = $self.data('settings');
			// Se eliminan los estilos de errores de validacion
			if ($form.data('validator') != undefined) {
				var errorClass = $form.data('validator').settings.errorClass;
				$('.' + errorClass, $form).removeClass(errorClass);
			}
			// Se realiza el reset de los campos ordinarios
			//form.resetForm();
			jQuery('input[type!=\'button\'][type!=\'checkbox\'][type!=\'radio\'], textarea', $form).val('');
			jQuery('input[type=\'checkbox\']', $form).not('[name*=\'jqg_GRID_\']', $form).not('[disabled=\'disabled\']', $form).removeAttr('checked');
			// Se realiza el reset de los rup_combo
			jQuery.each($('select.rup_combo', $form), function (index, elem) {
				if (settings.filter && settings.filter.clearSearchFormMode === 'reset') {
					jQuery(elem).rup_combo('reset');
				} else {
					jQuery(elem).rup_combo('clear');
				}
			});
			//Vaciar los autocompletes
			$('[ruptype=\'autocomplete\']', $form).each(function (index, element) {
				$(element).val('');
			});

			//Vaciar los arboles
			$('[ruptype=\'tree\']', $form).each(function (index, element) {
				$(element).rup_tree('setRupValue', '');
			});

			// Se realiza el reset del fomulario
			if (settings.filter && settings.filter.clearSearchFormMode === 'reset') {
				$form.resetForm();
			} else {
				$('input[type=\'radio\']', $form).removeAttr('checked');
			}

			return $self;
		},
		/**
     * Asigna a uno o varios parámetros del grid los valores indicados.
     *
     * @name setGridParam
     * @function
     * @param {object} newParams - Objeto que contiene los parámetros y sus valores.
     * @return {jQuery} - Referencia al propio objeto.
     * @example
     * $("#idComponente").rup_jqtable("setGridParam", {param1:value1, param2:value2});
     */
		setGridParam: function (newParams) {
			$(this).jqGrid('setGridParam', newParams);
			return $(this);
		},
		/**
     * Selecciona o deselecciona los registros indicados.
     *
     * @name setSelection
     * @function
     * @param {string | string[]} selectedRows - Identificador o array de identificadores de los registros que se desea seleccionar o deseleccionar.
     * @param {boolean} status - En caso de ser true se seleccionarán los registros indicados. En caso de ser false se deseleccionarán.
     * @example
     * $("#idComponente").rup_jqtable("setSelection", ["3","7"], true);
     */
		setSelection: function (selection, status, e) {
			var $self = this,
				settings = $self.data('settings'),
				ret;

			ret = $self.triggerHandler('rupTable_setSelection', arguments);

			if (ret !== false) {
				$self.jqGrid('setSelection', selection, status, e);
			}
		},
		/**
     * Muestra en los campos del formulario los errores de validación indicados.
     *
     * @name showServerValidationFieldErrors
     * @function
     * @param {jQuery} $form - Objeto jQuery que referencia el formulario que se desea resetear.
     * @param {object} errors - Objeto json que contiene los errores de validación que se han dado para cada campo.
     * @example
     * $("#idComponente").rup_jqtable("showServerValidationFieldErrors ", $("#idFormulario"), {});
     */
		showServerValidationFieldErrors: function ($form, errors) {
			var $self = $(this);

			if (errors.rupErrorFields !== undefined || errors.rupFeedback !== undefined) {
				$form.validate().submitted = $.extend(true, $form.validate().submitted, errors.rupErrorFields);
				$form.validate().invalid = errors.rupErrorFields;
				$form.validate().showErrors(errors.rupErrorFields);
			} else if (errors.rupFeedback !== undefined) {
				$self.rup_jqtable('showFeedback', $form.validate().settings.feedback, $.rup_utils.printMsg(errors.rupFeedback.message), (errors.rupFeedback.imgClass !== undefined ? errors.rupFeedback.imgClass : null));
			}

		},
		/**
     * Elimina el resaltado de la línea especificada de la tabla.
     *
     * @name rupTableClearHighlightedRowAsSelected
     * @function
     * @param {jQuery} $row - Objeto jQuery que referencia a la línea de la tabla.
     * @fires module:rup_jqtable#rupTableClearHighlightedRowAsSelected
     * @example
     * $("#idComponente").rup_jqtable("clearHighlightedRowAsSelected", $("#idFila"));
     */
		clearHighlightedRowAsSelected: function ($row) {
			var $self = this,
				self = $self[0],
				internalProps = self.p,
				row = $row[0],
				froz = internalProps.frozenColumns === true ? internalProps.id + '_frozen' : '';

			if (!$row.hasClass('ui-subgrid') && !$row.hasClass('ui-state-disabled')) {
				$('#jqg_' + $.jgrid.jqID(internalProps.id) + '_' + $.jgrid.jqID(row.id))[internalProps.useProp ? 'prop' : 'attr']('checked', false);
				$row.removeClass('ui-state-highlight').attr('aria-selected', 'false');
				//				emp.push(row.id);
				if (froz) {
					$('#jqg_' + $.jgrid.jqID(internalProps.id) + '_' + $.jgrid.jqID(row.id), self.grid.fbDiv)[internalProps.useProp ? 'prop' : 'attr']('checked', false);
					$('#' + $.jgrid.jqID(row.id), self.grid.fbDiv).removeClass('ui-state-highlight');
				}
			}
			$self.trigger('rupTableClearHighlightedRowAsSelected', [$row]);
		},
		/**
     * Resalta la línea especificada de la tabla.
     *
     * @name highlightRowAsSelected
     * @function
     * @param {jQuery} $row - Objeto jQuery que referencia a la línea de la tabla.
     * @fires module:rup_jqtable#rupTableHighlightRowAsSelected
     * @example
     * $("#idComponente").rup_jqtable("highlightRowAsSelected", $("#idFila"));
     */
		highlightRowAsSelected: function ($row) {
			var $self = this,
				self = $self[0],
				internalProps = self.p,
				row = $row[0],
				froz = internalProps.frozenColumns === true ? internalProps.id + '_frozen' : '';

			if ($row.length > 0 && !$row.hasClass('ui-subgrid') && !$row.hasClass('jqgroup') && !$row.hasClass('ui-state-disabled')) {
				$('#jqg_' + $.jgrid.jqID(internalProps.id) + '_' + $.jgrid.jqID(row.id))[internalProps.useProp ? 'prop' : 'attr']('checked', true);
				$row.addClass('ui-state-highlight').attr('aria-selected', 'true');
				internalProps.selarrrow.push(row.id);
				internalProps.selrow = row.id;
				if (froz) {
					$('#jqg_' + $.jgrid.jqID(internalProps.id) + '_' + $.jgrid.jqID(row.id), self.grid.fbDiv)[internalProps.useProp ? 'prop' : 'attr']('checked', true);
					$('#' + $.jgrid.jqID(row.id), self.grid.fbDiv).addClass('ui-state-highlight');
				}
				$self.trigger('rupTableHighlightRowAsSelected', [$row]);
			}
		},
		/**
     * Actualiza el valor de los datos que se muestran en la barra de paginación.
     *
     * @name updateDetailPagination
     * @function
     * @param {string} currentRowNumArg - Número actual de los registros que se están mostrando.
     * @param {string} totalRowNumArg - Número total de los registros que se muestran en la tabla.
     * @example
     * $("#idComponente").rup_jqtable("updateDetailPagination", "1-10", "586" );
     */
		updateDetailPagination: function (currentRowNumArg, totalRowNumArg) {
			var $self = this,
				settings = $self.data('settings'),
				tableId = settings.id,
				currentRowNum, totalRowNum;
			currentRowNum = (currentRowNumArg !== undefined ? currentRowNumArg : $.proxy(settings.getDetailCurrentRowCount, $self)());
			totalRowNum = (totalRowNumArg !== undefined ? totalRowNumArg : $.proxy(settings.getDetailTotalRowCount, $self)());

			if (currentRowNum === 1) {
				$('#first_' + tableId + ', #back_' + tableId, settings.$detailFormDiv).addClass('ui-state-disabled');
			} else {
				$('#first_' + tableId + ', #back_' + tableId, settings.$detailFormDiv).removeClass('ui-state-disabled');
			}
			if (currentRowNum === totalRowNum) {
				$('#forward_' + tableId + ', #last_' + tableId, settings.$detailFormDiv).addClass('ui-state-disabled');
			} else {
				$('#forward_' + tableId + ', #last_' + tableId, settings.$detailFormDiv).removeClass('ui-state-disabled');
			}

			$('#rup_jqtable_selectedElements_' + $self.attr('id')).text(jQuery.jgrid.format(jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_jqtable.defaults.detailForm_pager'), currentRowNum, totalRowNum));
		},
		/**
     * Función de callback que se ejecutará desde el método updateSavedData.
     *
     * @callback jQuery.rup_validate~onSubmitHandler
     * @param {object} savedData - Objeto interno que almacena en formato json los datos con los que se han inicializado los campos del formulario.
     * @example <caption>Envia el formulario cuando este es válido.</caption>
     * $("#idComponente").rup_jqtable("updateSavedData", function(savedData){
     * });
     */
		/**
     * Permite modificar el objeto interno _savedData que se utiliza en el control de cambios en el modo de edición en formulario y edición en línea.
     *
     * @name updateSavedData
     * @function
     * @param {module:rup_jqtable~onUpdateSavedData} arg -Función de callback desde la que se puede modificar el objeto _savedData.
     * @example
     * $("#idComponente").rup_jqtable("updateSavedData", function(savedData){
     * });
     */
		updateSavedData: function (arg) {
			var $self = this,
				settings = $self.data('settings');

			if (jQuery.isFunction(arg)) {
				jQuery.proxy(arg, $self)(rp_ge[settings.id]._savedData);
			}
		},
		isPluginLoaded: function(name){
			var $self = this,
				settings = $self.data('settings');

			return settings.usePlugins.indexOf(name)===-1?false:true;

		}
	});


	jQuery.fn.rup_jqtable('extend', {
		/**
     * Realiza la configuración interna del paginador de acuerdo a los parámetros de configuración indicados en la inicialización del componente.
     *
     * @name configurePager
     * @function
     * @param {object} settings - Parámetros de configuración del componente.
     * @example
     * $("#idComponente").rup_jqtable("configurePager", settings);
     */
		configurePager: function (settings) {
			var $self = this;

			return $.proxy($self[0]._ADAPTER.configurePager, $self)(settings);
		}

	});

	//********************************
	// DEFINICIÓN DE MÉTODOS PRIVADOS
	//********************************

	jQuery.fn.rup_jqtable('extend', {
		/**
     * Método de inicialización del componente.
     *
     * @name _init
     * @function
     * @private
     * @param {object} args - Parámetros de configuración del componente.
     * @fires module:rup_jqtable#rupTable_coreConfigFinished
     */
		_init: function (args) {
			if (args.length > 1) {
				jQuery.rup.errorGestor(jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_global.initError') + $(this).attr('id'));
			} else {
				var $self = this,
					settings = {};




				/* *************************
         * CONFIGURACION
         * *************************/
				var defaultPugins = (Array.isArray(args[0].defaultPlugins) ? args[0].defaultPlugins : jQuery.fn.rup_jqtable.defaults.defaultPlugins),
					userPlugins = jQuery.merge([], args[0].usePlugins),
					configuredPlugins = jQuery.merge(jQuery.merge([], defaultPugins), userPlugins);


				jQuery.rup_utils.sortArray(configuredPlugins, function (obj1, obj2) {
					return rup_jqtable.plugins[obj2].loadOrder - rup_jqtable.plugins[obj1].loadOrder;
				});


		/* *********************************************************
         * SE PROCESA LAS CONFIGURACION POR DEFECTO DEL CORE y VALIDACIÓN DEL LOS DIALOGOS
         * *********************************************************
         */
				
				if($("[aria-describedby="+$self.attr('id')+"_detail_div]").length > 0){
					$("[aria-describedby="+$self.attr('id')+"_detail_div]").remove();
				}

				settings = $.extend(true, {}, settings, jQuery.fn.rup_jqtable.plugins.core.defaults);

				$self[0]._ADAPTER = $.rup.adapter[settings.adapter];

				/* *********************************************************
         * SE PROCESAN LAS CONFIGURACIONES POR DEFECTO DE LOS PLUGINS
         * *********************************************************
         */
				$.each(configuredPlugins, function (index, name) {
					if (rup_jqtable.plugins[name] !== undefined && jQuery.fn.rup_jqtable.plugins[name] !== undefined) {
						settings = $.extend(true, {}, settings, jQuery.fn.rup_jqtable.plugins[name].defaults);
					}
				});

				// Se sobreescribe la configuración por defecto con la especificada por el usaurio
				settings = jQuery.extend(true, {}, jQuery.fn.rup_jqtable.defaults, settings, args[0]);

				/* *********************************************************
         * EJECUCION DE LA PRECONFIGURACION DEL CORE
         * *********************************************************/

				$self.rup_jqtable('preConfigureCore', settings);


				/* *********************************************************
         * EJECUCION DE FUNCIONES DE PRECONFIGURACION DE LOS PLUGINS
         * *********************************************************
         */

				$.each(configuredPlugins, function (index, name) {
					if (jQuery.isFunction(rup_jqtable.plugins[name].preConfiguration)) {
						jQuery.proxy(rup_jqtable.plugins[name].preConfiguration, $self)(settings);
					}
				});

				/*
         * INVOCACIÓN al plugin subyacente jqGrid
         */
				$self.jqGrid(settings);

				/* *********************************************************
         * EJECUCION DE LA POSTCONFIGURACION DEL CORE
         * *********************************************************/

				$self.rup_jqtable('postConfigureCore', settings);

				/* *********************************************************
         * EJECUCION DE FUNCIONES DE POSTCONFIGURACION DE LOS PLUGINS
         * *********************************************************/
				$.each(configuredPlugins, function (index, name) {
					if (jQuery.isFunction(rup_jqtable.plugins[name].postConfiguration)) {
						jQuery.proxy(rup_jqtable.plugins[name].postConfiguration, $self)(settings);
					}
				});

				// Se almacenan los settings medainte el data para ser accesibles en las invocaciones a los métodos públicos.
				$self.data('settings', settings);

				$self.triggerHandler('rupTable_coreConfigFinished');
			}
		},
		/**
     * Devuelve el índice de la línea identificada mediante el valor indicado por parámetro.
     *
     * @name _getLineIndex
     * @function
     * @private
     * @param {string} rowId - Identificador del registro.
     * @return {number} - Índice de la línea.
     */
		_getLineIndex: function (rowId) {
			var $self = this,
				settings = $self.data('settings'),
				tableghead = settings.id + 'ghead_',
				count = 0,
				$row, id;
			if ($self.rup_jqtable('getGridParam', 'grouping') === true) {
				for (var i = 0; i < $self[0].rows.length; i++) {
					$row = jQuery($self[0].rows[i]);
					id = $row.attr('id');
					if (id !== undefined && id.indexOf(tableghead) === -1) {
						count++;
						if (id === rowId) {
							return count;
						}
					}
				}
			} else {
				return $self.jqGrid('getInd', rowId);
			}
		}
	});

	//*********************************************************************
	// MÉTODOS PARA MANTENER LA RETROCOMPATIBILIDAD CON LA API DEL RUP.GRID
	//*********************************************************************

	jQuery.fn.rup_jqtable('extend', {
		/**
     * Añade una nueva línea a la tabla. Esta operación no realiza una inserción del registro en el sistema de persistencia, sino que únicamente añade una nueva fila de modo visual.
     *
     * @name addRowData
     * @function
     * @param {string} rowid - Identificador del registro.
     * @param {object} data - Objeto json que contiene los valores de cada columna de la nueva línea.
     * @param {string} position - fisrt o last. Determina la posición donde se va a insertar el registro.
     * @param {string} srcrowid -En el caso de indicarse se insertará la nueva línea en la posición relativa al registro que identifica y el valor del parámetro position.
     * @return {jQuery} - Referencia al propio componente.
     * @example
     * $("#idComponente").rup_jqtable("addRowData", "10", {campo1:valor1,campo2:valor2});
     */
		addRowData: function (rowid, data, position, srcrowid) {
			var $self = $(this);
			//			//Se aade la capa de separacion para diferenciar los nuevos elementos incluidos
			//			if ($("#" + tableName + " #separadorAadidos").html() === null) {
			//				$("#" + tableName + " tr:first-child").after($("#" + tableName + " tr:first-child").clone(false).css("display", "none").css("height", "").attr("id", "separadorAadidos"));
			//
			//				$.each($("#" + tableName + " #separadorAadidos td") , function (index, object) {
			//					$(this).html("").attr("class", "tdAddSeparator");
			//				});
			//
			//				$("#" + tableName + " #separadorAadidos").addClass("trAddSeparator");
			//				$("#" + tableName + " #separadorAadidos").css("display", "");
			//			}
			return $self.jqGrid('addRowData', rowid, data, position, srcrowid);
			//Añadimos los estilos de elemento añadido
			//			$("#" + tableName + " #" + rowid).addClass("addElement");
			//$("#" + tableName + " #" + rowid + " td").addClass("addElementBorder");
		},
		/**
     * Elimina de la tabla un registro determinado. El registro no se elimina del sistema de persistencia. Solo se elimina de manera visual.
     *
     * @name delRowData
     * @function
     * @param {string} rowid - Identificador del registro.
     * @return {jQuery} - Referencia al propio componente.
     * @example
     * $("#idComponente").rup_jqtable("delRowData","10");
     */
		delRowData: function (rowid) {
			var $self = $(this);

			$self.jqGrid('delRowData', rowid);

			return $self;
		},
		/**
     * Devuelve el identificador de la línea activa.
     *
     * @name getActiveRowId
     * @function
     * @return {string} - Identificador de la línea activa.
     * @example
     * $("#idComponente").rup_jqtable("getActiveRowId");
     */
		getActiveRowId: function () {
			var $self = this,
				settings = $self.data('settings');

			return jQuery.proxy(settings.getActiveRowId, $self)();
		},
		/**
     * Devuelve el índice de la línea activa.
     *
     * @name getActiveLineId
     * @function
     * @return {string} - Índice de la línea activa.
     * @example
     * $("#idComponente").rup_jqtable("getActiveLineId");
     */
		getActiveLineId: function () {
			var $self = this,
				settings = $self.data('settings');

			return jQuery.proxy(settings.getActiveLineId, $self)();
		},
		/**
     * Actualiza los valores de las columnas de un registro determinado. La actualización de loa datos se realiza solo de manera visual. Los nuevos datos no se persisten.
     *
     * @name setRowData
     * @function
     * @param {string} rowid - Identificador del registro que se desea actualizar.
     * @param {object} data - Objeto json que contiene los valores de cada columna de la nueva línea.
     * @param {string} cssp - En caso de especificarse, se añadirán a la línea las class de estilos aquí indicadas.
     * @example
     * $("#idComponente").rup_jqtable("setRowData", "10", {campo1:valor1,campo2:valor2});
     */
		setRowData: function (rowid, data, cssp) {
			var $self = $(this);

			$self.jqGrid('setRowData', rowid, data, cssp);

			//Actualizar tooltip de las celdas de la fila
			jQuery('td[title]', $self).each(function (index, elem) {
				var $cell = jQuery(elem),
					title = $cell.prop('title');

				$cell.attr({
					'grid_tooltip': title,
					'oldtitle': title
				}).removeAttr('title');
			});
		},
		/**
     * Devuelve un objeto json con los valores de los campos del registro indicado.
     *
     * @name getRowData
     * @function
     * @param {string} rowid - Identificador del registro del que se quieren recuperar los datos.
     * @return {object} - Objecto json con los valores del registro.
     * @example
     * $("#idComponente").rup_jqtable("getRowData", "10");
     */
		getRowData: function (rowid) {
			var $self = $(this);
			return $self.jqGrid('getRowData', rowid);
		},
		/**
     * Devuelve un array con los identificadores de los registros que se muestran actualmente en la página de la tabla.
     *
     * @name getDataIDs
     * @function
     * @return {string[]} - Identificadores de lso registros mostrados en la página actual.
     * @example
     * $("#idComponente").rup_jqtable("getDataIDs");
     */
		getDataIDs: function () {
			var $self = $(this);
			return $self.jqGrid('getDataIDs');
		},
		/**
     * Limpia los registros mostrados en la tabla.
     *
     * @name clearGridData
     * @function
     * @param {boolean} clearfooter - En caso de indicarse como true se elimina la información del pié de la tabla.
     * @example
     * $("#idComponente").rup_jqtable("clearGridData", false);
     */
		clearGridData: function (clearfooter) {
			var $self = $(this);
			return $self.jqGrid('clearGridData', clearfooter);
		},
		/**
     * Devuelve el objeto colModel del componente jqGrid.
     *
     * @name getColModel
     * @function
     * @return {object} - Objeto colModel de la tabla.
     * @example
     * $("#idComponente").rup_jqtable("getColModel");
     */
		getColModel: function () { // Función que devuelve el colModel directamente.
			var $self = $(this);
			return $self.jqGrid('getGridParam', 'colModel');
		},
		/**
     * Devuelve el valor de la columna de la fila indicada.
     *
     * @name getCol
     * @function
     * @param {string} rowid - Identificador de la fila.
     * @param {string} colName - Nombre de la columna.
     * @example
     * $("#idComponente").rup_jqtable("getCol", "10", "nombre");
     */
		getCol: function (rowid, colName) { //Función que devuelve el valor de la celda de la fila que se le pasa como paramtero. El colName puede ser o el indice de la columna o el nombre de la misma
			var $self = $(this);
			return $self.jqGrid('getCell', rowid, colName);
		},
		/**
     * Devuelve un objeto json que contiene la serialización del formulario.
     *
     * @name getSerializedForm
     * @function
     * @param {jQuery} form - Formulario que se desea serializar.
     * @param {boolean} skipEmpty - En caso de indicarse true se omiten los campos que no contienen valor.
     * @example
     * $("#idComponente").rup_jqtable("getSerializedForm", $("#idFormulario"), false);
     */
		getSerializedForm: function (form, skipEmpty, delimeter) {
			return form2object(form instanceof jQuery ? form[0] : form, delimeter ? delimeter : null, skipEmpty ? skipEmpty : false);
		}
	});


	//*******************************************************
	// DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
	//*******************************************************
	jQuery.fn.rup_jqtable.plugins = {};
	jQuery.fn.rup_jqtable.plugins.core = {};
	jQuery.fn.rup_jqtable.plugins.core.defaults = {
		// adapter: "jqtable_jqueryui",
		adapter: 'jqtable_bootstrap',
		core: {
			operations: {},
			defaultOperations: {},
			showOperations: {},
			defaultLoadErrorTitle: $.rup.i18n.base.rup_ajax.errorTitle
		}
	};


	/**
   * Función de callback que será ejecutada cuando el usuario realice una acción sobre la operación.
   *
   * @callback module:rup_jqtable~onOperation
   * @param {string} key - Identificador de la operación
   * @param {object} options - Opciones de configuración de la operación.
   * @example
   * callback: function(key, options){
   *		alert("Operación 1");
   *	}
   */

	/**
   * Función de callback que determina si la operación debe estar habilitada o no.
   *
   * @callback module:rup_jqtable~isEnabled
   * @return {boolean} - Devuelve si la operación debe de estar habilitada o no.
   * @example
   * enabled: function(){
   *		return true;
   *	}
   */

	/**
   * Mediante esta propiedad se definen las posibles operaciones a realizar sobre los registros mostrados en la tabla. Debido al carácter global de estas operaciones se toman en cuenta por otros componentes (toolbar, menú contextual) a la hora de mostrar sus controles. Las operaciones se definen mediante un objeto json en el cual el nombre de la propiedad será el identificador de la propiedad.
   *
   * @typedef {Object} module:rup_jqtable~Operations
   * @property {string} [name] - Texto a mostrar al usuario a la hora de visualizar la operación.
   * @property {string} [icon] - Clase CSS correspondiente al icono que se quiere visualizar junto a la operación.
   * @property {module:rup_jqtable~isEnabled} [enabled] - Función que determina si el botón se debe mostrar habilitado o deshabilitado. Esto se determina devolviendo true/false desde la función de callback aquí indicada.
   * @property {module:rup_jqtable~onOperation} [callback] - Función de callback que será ejecutada cuando el usuario realice una acción sobre la operación.
   * @example
   * core:{
   * 	operations:{
   *			"operacion1": {
   *				name: "Operación 1",
   *				icon: "rup-icon rup-icon-new",
   *				enabled: function(){
   *					return true;
   *				},
   *				callback: function(key, options){
   *					alert("Operación 1");
   *				}
   *			},
   *			"operacion2": {
   *				name: "Operación 2",
   *				icon: "rup-icon rup-icon-new",
   *				enabled: function(){
   *					return true;
   *				},
   *				callback: function(key, options){
   *					alert("Operación 1");
   *				}
   *			}
   *		}
   * }
   */

	/**
   * Permite habilitar/deshabilitar las operaciones definidas por defecto por otros módulos.
   *
   * @typedef module:rup_jqtable~ShowOperations
   * @example
   * core:{
   *		showOperations:{
   *			add:false;
   *			clone:false;
   *		}
   *	}
   */

	/**
   * @description Propiedades de configuración del componente.
   * @see Para mas información consulte la documentación acerca de las opciones de configuración del componente {@link http://www.trirand.com/jqgridwiki/doku.php|jqGrid}.
   *
   * @name options
   *
   * @property {boolean} [altRows=true] - Determina si se aplica o no el pijama en las filas de la tabla.
   * @property {string} [altclass=rupgrid_oddRow] - Estilo que se aplica a las filas impares para mostrar el efecto.
   * @property {string} [datatype=json] - Formato de dato esperado para representar los registros de la tabla.
   * @property {string} [height=auto] - Determina la altura de la tabla.
   * @property {object} [jsonReader={repeatitems: false}] - Parámetros de configuración que determinan el modo en el que se va a procesar el json de retorno del servidor
   * @property {boolean} [resizable=false] - Determina si la tabla puede ser redimensionada mediante el ratón.
   * @property {number} [rowNum=10] - Número de registros por página que se van a mostrar en la tabla.
   * @property {number[]} [rowList=[10,20,30]] - Lista de posibles valores para el número de elementos por página que se van a mostrar en el combo de selección correspondiente.
   * @property {boolean} [sortable=true] - Determina si se permite variar el orden de las columnas arrastrándolas.
   * @property {boolean} [viewrecords=true] - Indica si se debe mostrar el rango de elementos que se están visualizando en la tabla.
   * @property {boolean} [loadOnStartUp=true] - Determina si se debe realizar automáticamente la búsqueda al cargar la página.
   * @property {string} [multiplePkToken=~] - Separador que se utiliza en los casos en los que la clave primaria sea múltiple. Se creará una columna que contenga un identificador único resultante de la concatenación de las claves primarias realizada mediante el separador aquí indicado.
   * @property {module:rup_jqtable~Operations} [operations] - Mediante esta propiedad se definen las posibles operaciones a realizar sobre los registros mostrados en la tabla. Debido al carácter global de estas operaciones se toman en cuenta por otros componentes (toolbar, menú contextual) a la hora de mostrar sus controles. Las operaciones se definen mediante un objeto json en el cual el nombre de la propiedad será el identificador de la propiedad.
   * @property {module:rup_jqtable~ShowOperations} [showOperations] - Permite habilitar/deshabilitar las operaciones definidas por defecto por otros módulos.
   * @property {number} [startOnPage=1] - Permite especificar el número de página inicial que se mostrará al cargar la página.
   */

	jQuery.fn.rup_jqtable.defaults = {

		altRows: true,
		altclass: 'rup-grid_oddRow',
		datatype: 'json', // Tipo de dato esperado para representar los registros de la tabla (jqGrid)
		editable: false, // Determina si la tabla permite la edición en línea (rup_jqtable)
		height: 'auto', // Ajusta la altura de la tabla al contenido (jqGrid)
		jsonReader: {
			repeatitems: false
		}, // Parámetros de configuración que describen la estructura del json esperado (jqGrid)
		pager: null,
		resizable: false, // Determina si la tabla puede ser redimensionada mediante el ratón (jqGrid)
		rowNum: 10, // Determina el número de registros que se van a mostrar por página
		rowList: [10, 20, 30], // Valores a mostrar en el combo de selección de número de registros por página
		sortable: true, // Determina si se puede realizar drag&drop con las columnas de la tabla (jqGrid)
		viewrecords: true, // Muestra el rango de elementos que se están mostrando en la tabla (jqGrid)
		mtype: 'POST',
		loadError: function (xhr, st, err) {
			var $self = $(this),
				settings = $self.data('settings');

			jQuery.rup_messages('msgError', {
				title: settings.core.defaultLoadErrorTitle,
				message: xhr.responseText
			});
		},
		loadOnStartUp: true,
		// Callback ejecutado en las peticiones AJAX de la tabla
		loadBeforeSend: function rup_jqtable_defaults_loadBeforeSend(xhr, settings) {
			// Se modifica la request para incluir las siguientes cabeceras:
			// Se añade la cabecera JQGridModel para indicar que la petición ha sido realizada por el componente rup_jqtable
			xhr.setRequestHeader('JQGridModel', 'true');
			// Se indica que el tipo de contenido enviado en la cabecera es application/jsons
			xhr.setRequestHeader('Content-Type', 'application/json');
		},
		loadui: 'block',
		validate: {},
		defaultPlugins: [],
		dataProxy: jQuery.rup_jqtable.proxyAjax,
		defaultGridInfoCol: {
			name: 'rupInfoCol',
			index: 'rupInfoCol',
			editable: false,
			fixed: true,
			sortable: false,
			width: 16,
			resizable: false,
			classes: 'rupInfoCol',
			search: false,
			formatter: function () {
				return '<span class=\'ui-icon ui-icon-rupInfoCol\'></span>';
			}
		},
		defaultGridMultiplePkCol: {
			name: 'pkCol',
			index: 'pkCol',
			hidden: true,
			editable: false,
			fixed: true,
			sortable: false,
			width: 25,
			resizable: false,
			search: false
		},
		multiplePkToken: '~',
		scrollOffset: 0,
		showGridInfoCol: false,
		tooltipDelay: 500
	};

	/* ********* */
	/* EVENTOS
  /* ********* */

	/**
   * Evento que se produce al detectarse que el usuario interactua con un elemento externo a la tabla.
   *
   * @event module:rup_jqtable#rupTable_checkOutOfGrid
   * @property {Event} e - Objeto Event correspondiente al evento disparado.
   * @property {jQuery} $originalTarget - Objeto jQuery que referencia el elemento del dom con el que ha interactuado el usuario.
   * @example
   * $("#idComponente").on("rupTable_checkOutOfGrid", function(event,
   * $originalTarget){ });
   */

	/**
   * Este evento se lanza durante el proceso de serialización de la información que va a ser enviada para obtener los registros que se van a mostrar en la tabla.
   *
   * @event module:rup_jqtable#rupTable_serializeGridData
   * @property {Event} e - Objeto Event correspondiente al evento disparado.
   * @property {object} data - Información serializada que va a ser enviada. Se puede modificar o agregar nuevos campos para completarla.
   * @example
   * $("#idComponente").on("rupTable_serializeGridData", function(event, data){
   * });
   */

	/**
   * Evento que se lanza antes de que se procese la información recibida del servidor.
   *
   * @event module:rup_jqtable#rupTable_beforeProcessing
   * @property {Event} e - Objeto Event correspondiente al evento disparado.
   * @property {object} data - Información recibida del servidor.
   * @property {string} st - Mensaje de status de la petición.
   * @property {object} xhr - Objeto xhr recibido.
   * @example
   * $("#idComponente").on("rupTable_beforeProcessing", function(event, data, st,
   * xhr){ });
   */

	/**
   * Se produce cuando se elimina el resaltado de un registro de la tabla.
   *
   * @event module:rup_jqtable#rupTableClearHighlightedRowAsSelected
   * @property {Event} e - Objeto Event correspondiente al evento disparado.
   * @property {jQuery} $row - Objeto jQuery que identifica la línea que se ha procesado.
   * @example
   * $("#idComponente").on("rupTableClearHighlightedRowAsSelected", function(event, $row){ });
   */

	/**
   * Se produce cuando se añade el resaltado a un registro de la tabla.
   *
   * @event module:rup_jqtable#rupTableHighlightRowAsSelected
   * @property {Event} e - Objeto Event correspondiente al evento disparado.
   * @property {jQuery} $row - Objeto jQuery que identifica la línea que se ha procesado.
   * @example
   * $("#idComponente").on("rupTableHighlightedRowAsSelected", function(event, $row){ });
   */

	/**
   * Evento que se lanza después de que el componente haya finalizado con el proceso de configuración e inicialización.
   *
   * @event module:rup_jqtable#rupTable_coreConfigFinished
   * @property {Event} e - Objeto Event correspondiente al evento disparado.
   * @example
   * $("#idComponente").on("rupTable_coreConfigFinished", function(event, $row){ });
   */

})(jQuery);

/*!
 * Copyright 2013 E.J.I.E., S.A.
 *
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
 */

/**
 * Tiene como objetivo proporcionar al componente RUP Table de las funcionalidades que ofrece el uso de un menú contextual.
 *
 * @summary Plugin de menú contextual del componente RUP Table.
 * @module rup_jqtable/contextMenu
 * @example
 * $("#idComponente").rup_jqtable({
 * 	url: "../jqGridUsuario",
 *	usePlugins:["contextMenu"],
 *	contextMenu:{
 * 		// Propiedades de configuración del plugin contextMenu
 * 	}
 * });
 */
(function ($) {

	/**
	 * Definición de los métodos principales que configuran la inicialización del plugin.
	 *
	 * postConfiguration: Método que se ejecuta después de la invocación del componente jqGrid.
	 *
	 */
/*global jQuery */

	jQuery.rup_jqtable.registerPlugin('contextMenu',{
		loadOrder:4,
		preConfiguration: function(settings){
			var $self = this;
			return $self.rup_jqtable('preConfigureContextMenu', settings);
		},
		postConfiguration: function(settings){
			var $self = this;
			return $self.rup_jqtable('postConfigureContextMenu', settings);
		}
	});

	//********************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	//********************************

	/**
	 * Extensión del componente rup_jqtable para permitir la gestión del diseño líquido del componente.
	 *
	 * Los métodos implementados son:
	 *
	 * postConfigureFilter(settings): Método que define la preconfiguración necesaria para el correcto funcionamiento del componente.
	 *
	 * Se almacena la referencia de los diferentes componentes:
	 *
	 * settings.$fluidBaseLayer : Referencia a la capa que se tomará como base para aplicar el diseño líquido.
	 *
	 */
	jQuery.fn.rup_jqtable('extend',{
		/**
		 * Metodo que realiza la pre-configuración del plugin contextMenu del componente RUP Table.
		 * Este método se ejecuta antes de la incialización del plugin.
		 *
		 * @name preConfigureContextMenu
		 * @function
		 * @param {object} settings - Parámetros de configuración del componente.
		 */
		preConfigureContextMenu: function(settings){
			var $self = this,  contextMenuSettings = settings.contextMenu;

			// Se unifican los parámetros de configuración de mostrar/ocultar los botones de la toolbar
			if (contextMenuSettings.createDefaultRowOperations===true) {
				contextMenuSettings.showOperations = jQuery.extend(true, {}, contextMenuSettings.defaultRowOperations, settings.core.showOperations, contextMenuSettings.showOperations);
			}

		},
		/**
		 * Metodo que realiza la post-configuración del plugin contextMenu del componente RUP Table.
		 * Este método se ejecuta después de la incialización del plugin.
		 *
		 * @name postConfigureContextMenu
		 * @function
		 * @param {object} settings - Parámetros de configuración del componente.
		 */
		postConfigureContextMenu: function(settings){
			var $self = this, contextMenuSettings = settings.contextMenu;

			function getTdIndex(thArray, name){

				for(var i=0;i<thArray.length;i++){
				    if (jQuery(thArray[i]).attr('id')===settings.id+'_'+name){
				        return i+1;
				    }
				}

				return -1;
			}


			$self.one({
				'jqGridLoadComplete.rupTable.contextMenu': function(data){
					var tbodyTr = '[id=\'' + $self.attr('id') + '\'] tbody:first tr[role=\'row\'].jqgrow',
						$tbodyTr = jQuery(tbodyTr),
						contextRowItems = {},
						cellLevelContextMenu=false, globalCellLevelContextMenu = Array.isArray(settings.contextMenu.colNames), itemsPerColumn={}, colItem,
						thArray, $contextMenuSelector;

					//					jQuery.each(settings.contextMenu.defaultRowOperations, function(buttonId, value){
					jQuery.each(settings.contextMenu.showOperations, function(buttonId, value){
						var operationCfg;
						if (value!==false){
							operationCfg = settings.core.operations[buttonId];
							if (operationCfg!==undefined){
								contextRowItems[buttonId]={
									name: operationCfg.name,
									id:settings.id+'_contextMenu_'+buttonId,
									cssSprite:operationCfg.icon,
									disabled: function(){
										return !jQuery.proxy(operationCfg.enabled,$self)();
									},
									callback: function(key, options){
										jQuery.proxy(operationCfg.callback,$self)(key, options);
									},
									className:operationCfg.className
								};
								if (Array.isArray(value)===true){
									cellLevelContextMenu=true;
									contextRowItems[buttonId].colNames=value;
								}
							}
						}
					});

					jQuery.each(settings.contextMenu.items,function(index, oper){
						if (Array.isArray(oper.colNames)){
							cellLevelContextMenu=true;
						}
					});
					jQuery.extend(true, contextRowItems, settings.contextMenu.items);

					// En caso de especificar solo para unas columnas
					thArray = jQuery('[id=\'gview_'+settings.id+'\'] '+settings.contextMenu.theadThSelector);

					// Eliminamos los contextMenu creados previamente
					$('ul.context-menu-list', $tbodyTr).remove();

					if (globalCellLevelContextMenu && !cellLevelContextMenu){
						for (var i=0;i< contextMenuSettings.colNames.length;i++){
							let contextMenuSelector = '[id=\'' + $self.attr('id') + '\'] ' + contextMenuSettings.tbodyTdSelector + ':nth-child(' + getTdIndex(thArray, contextMenuSettings.colNames[i]) + ')';
							$contextMenuSelector = jQuery(contextMenuSelector);
							if ($contextMenuSelector.length > 0) {
								$.contextMenu('destroy', $contextMenuSelector);
								$contextMenuSelector.rup_contextMenu({
									selector: contextMenuSelector,
									items: contextRowItems
								});
							}
						}
					}else if (cellLevelContextMenu){

						//						// En caso de no especificarse un valor de colnames para indicar sobre cuales se debe de mostrar el menú contextual, se toman todas las visibles.
						if (!Array.isArray(contextMenuSettings.colNames)){
							contextMenuSettings.colNames = jQuery.map(settings.colModel, function(elem, index){
							    if (elem.hidden!==true){
							        return elem.name;
							    }
							});
						}


						jQuery.each(contextRowItems, function(index, item){
							var colNamesAux;
							if (Array.isArray(item.colNames)){
								colNamesAux = item.colNames;
							}else{
								colNamesAux = contextMenuSettings.colNames;
							}

							for (var i=0;i<colNamesAux.length;i++){
								colItem={};
								colItem[colNamesAux[i]]={};
								jQuery.extend(true, itemsPerColumn, colItem);
								var itemAux = {};
								itemAux[index] = item;
								jQuery.extend(true, itemsPerColumn[colNamesAux[i]], itemAux);
							}
						});

						jQuery.each(itemsPerColumn, function(index, item){
							let contextMenuSelector = '[id=\'' + $self.attr('id') + '\'] ' + contextMenuSettings.tbodyTdSelector + ':nth-child(' + getTdIndex(thArray, contextMenuSettings.colNames[i]) + ')';
							$contextMenuSelector = jQuery(contextMenuSelector);
							$.contextMenu( 'destroy', $contextMenuSelector );
							if ($contextMenuSelector.length > 0) {
								$contextMenuSelector.rup_contextMenu({
									selector: contextMenuSelector,
									items: item
								});
							}
						});

					}else{
						$.contextMenu( 'destroy', $tbodyTr );
						if ($tbodyTr.length > 0) {
							$tbodyTr.rup_contextMenu({
								selector: tbodyTr,
								items: contextRowItems
							});
						}
					}

				}
			});
		}
	});


	//*******************************************************
	// DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
	//*******************************************************


	/**
   * @description Propiedades de configuración del plugin contextMenu del componente RUP Table.
   *
   * @name options
   *
   * @property {string[]} [colNames=null] - Mediante un array se puede configurar las columnas para las cuales se va a mostrar el menú contextual. En caso de especificar el valor null se mostrará en todas las columnas.
   * @property {boolean} [createDefaultRowOperations=true] - Propiedad que indica si el componente va a mostrar las operaciones por defecto como opciones dentro del menú contextual.
   * @property {string} [tbodySelector='tbody:first tr[role=\'row\'].jqgrow'] - Selector de jQuery que identifica el tbody de la tabla. Este selector se utiliza para mostrar el menú contextual a nivel de tabla.
	 * @property {string} [tbodyTdSelector='tbody:first tr.jqgrow td'] - Selector de jQuery que identifica las columnas de la tabla. Este selector se utiliza para mostrar el menú contextual a nivel de columna.
	 * @property {string} [theadThSelector='thead:first th'] - Selector de jQuery que identifica las cabeceras de las columnas de la tabla.
   * @property {object} [items={}}] - Se especifica la configuración de los diferentes items que se van a mostrar en el menú contextual para los registros.
	 * @property {rup_jqtable~Operations[]} [showOperations] - Permite indicar que operaciones definidas de manera global van a ser mostradas como opciones en el menú contextual.
   */

	jQuery.fn.rup_jqtable.plugins.contextMenu = {};
	jQuery.fn.rup_jqtable.plugins.contextMenu.defaults = {
		contextMenu:{
			colNames: null,
			createDefaultRowOperations:true,
			defaultRowOperations:{},
			rowOperations:{},
			tbodySelector:'tbody:first tr[role=\'row\'].jqgrow',
			tbodyTdSelector:'tbody:first tr.jqgrow td',
			theadThSelector:'thead:first th',
			items:{}
		}
	};


})(jQuery);

/*!
 * Copyright 2013 E.J.I.E., S.A.
 *
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
 */

/*global jQuery */

/**
 * Gestiona las operaciones de filtrado de datos sobre el origen de datos que utiliza el componente.
 *
 * @summary Plugin de filtrado del componente RUP Table.
 * @module rup_jqtable/filter
 * @example
 *
 * $("#idComponente").rup_jqtable({
 * 	url: "../jqGridUsuario",
 * 	usePlugins:["filter"],
 * 	filter:{
 * 		// Propiedades de configuración del plugin filter
 * 	}
 * });
 */
(function ($) {

	/**
	 * Definición de los métodos principales que configuran la inicialización del plugin.
	 *
	 * postConfiguration: Método que se ejecuta después de la invocación del componente jqGrid.
	 *
	 */
	jQuery.rup_jqtable.registerPlugin('filter',{
		loadOrder:1,
		preConfiguration: function(settings){
			var $self = this;
			return $self.rup_jqtable('preConfigureFilter', settings);
		},
		postConfiguration: function(settings){
			var $self = this;
			return $self.rup_jqtable('postConfigureFilter', settings);
		}
	});

	//********************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	//********************************

	/**
	 * Extensión del componente rup_jqtable para permitir la gestión del filtrado de registros de la tabla.
	 *
	 * Los métodos implementados son:
	 *
	 * postConfigureFilter(settings): Método que define la preconfiguración necesaria para el correcto funcionamiento del componente.
	 *
	 * Se almacena la referencia de los diferentes componentes:
	 *
	 * settings.filter.$filterContainer : Contenedor del formulario de filtrado
	 * settings.filter.$filterButton : Botón que realiza el filtrado
	 * settings.filter.$cleanButton : Botón para limpiar el formulario
	 * settings.filter.$collapsableLayer : Capa que puede ser ocultada/mostrada
	 * settings.filter.$toggleIcon1Id : Control que oculta muestra el fomulario
	 * settings.filter.$filterSummary : Contenedor donde se especifican los criterios de filtrado
	 *
	 */
	jQuery.fn.rup_jqtable('extend',{
		/**
			* Metodo que realiza la pre-configuración del plugin filter del componente RUP Table.
			* Este método se ejecuta antes de la incialización del plugin.
			*
			* @name preConfigureFilter
			* @function
			* @param {object} settings - Parámetros de configuración del componente.
			*/
		preConfigureFilter: function(settings){
			var $self = this, tableId = settings.id, filterSettings = settings.filter, filterFormId,
				toggleIcon1Tmpl,toggleLabelTmpl,filterSummaryTmpl,toggleIcon2Tmpl,$toggleIcon1,$toggleLabel,$filterSummary,$toggleIcon2;

			/*
			 * Inicialización de los identificadores y componentes por defecto de los componentes de filtrado
			 */
			filterSettings.id = (filterSettings.id!==undefined?filterSettings.id:tableId+'_filter_form');
			filterSettings.filterToolbarId = (filterSettings.filterToolbar!==undefined?filterSettings.filterToolbar:tableId+'_filter_toolbar');
			filterSettings.filterButtonId = (filterSettings.filterButtonId!==undefined?filterSettings.filterButtonId:tableId+'_filter_filterButton');
			filterSettings.cleanButtonId = (filterSettings.cleanButtonId!==undefined?filterSettings.cleanButtonId:tableId+'_filter_cleanButton');
			filterSettings.collapsableLayerId = (filterSettings.collapsableLayerId!==undefined?filterSettings.collapsableLayerId:tableId+'_filter_fieldset');

			filterSettings.toggleIcon1Id = (filterSettings.toggleIcon1!==undefined?filterSettings.toggleIcon1:tableId+'_filter_toggle_icon1');
			filterSettings.toggleLabelId = (filterSettings.toggleLabelId!==undefined?filterSettings.toggleLabelId:tableId+'_filter_toggle_label');
			filterSettings.filterSummaryId = (filterSettings.filterSummaryId!==undefined?filterSettings.filterSummaryId:tableId+'_filter_summary');
			filterSettings.toggleIcon2Id = (filterSettings.toggleIcon2!==undefined?filterSettings.toggleIcon2:tableId+'_filter_toggle_icon2');

			filterSettings.$filterContainer = jQuery('#'+filterSettings.id);
			filterSettings.$filterToolbar = jQuery('#'+filterSettings.filterToolbarId);




			if (filterSettings.$filterContainer.length===0){
				alert('El identificador especificado para el fomulario de búsqueda no existe.');
			}else if (filterSettings.$filterToolbar.length===0){
				alert('El identificador especificado para la barra de controles del formulario de filtrado no existe.');
			}else{
				/*
				 * Se almacena la referencia de los diferentes componentes
				 *
				 * $filterContainer : Contenedor del formulario de filtrado
				 * $filterButton : Botón que realiza el filtrado
				 * $cleanButton : Botón para limpiar el formulario
				 * $collapsableLayer : Capa que puede ser ocultada/mostrada
				 * $toggleIcon1Id : Control que oculta muestra el fomulario
				 * $filterSummary : Contenedor donde se especifican los criterios de filtrado
				 */
				toggleIcon1Tmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_jqtable.templates.filter.toggleIcon1');
				toggleLabelTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_jqtable.templates.filter.toggleLabel');
				filterSummaryTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_jqtable.templates.filter.filterSummary');
				toggleIcon2Tmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_jqtable.templates.filter.toggleIcon2');

				$toggleIcon1 = $(jQuery.jgrid.format(toggleIcon1Tmpl, filterSettings.toggleIcon1Id));
				$toggleLabel = $(jQuery.jgrid.format(toggleLabelTmpl, filterSettings.toggleLabelId, $.rup.i18n.base.rup_jqtable.plugins.filter.filterCriteria));
				$filterSummary = $(jQuery.jgrid.format(filterSummaryTmpl, filterSettings.filterSummaryId));
				$toggleIcon2 = $(jQuery.jgrid.format(toggleIcon2Tmpl, filterSettings.toggleIcon2Id));

				filterSettings.$filterToolbar.append($toggleIcon1).append($toggleLabel).append($filterSummary).append($toggleIcon2);

				filterSettings.$filterContainer = jQuery('#'+filterSettings.id);
				filterSettings.$filterButton = jQuery('#'+filterSettings.filterButtonId);

				//Creacion del boton de filtrado
				//filterSettings.$filterButton.addClass("dropdownButton");
				//filterSettings.$filterButton.append('<ul><li class="dropdownButton-list"><a  class="dropdownButton-trigger" href="#">Filtro</a><div class="dropdownButton-content"><form><fieldset class="dropdownButton-inputs"><div id="dropdownButton-combo"></div></fieldset>       <fieldset class="dropdownButton-actions"><input class="ui-button ui-widget ui-state-default ui-corner-all"  value="Guardar" type="submit"><input  class="ui-button ui-widget ui-state-default ui-corner-all"  value="Aplicar" type="submit"> <input class="ui-button ui-widget ui-state-default ui-corner-all"  value="Eliminar" type="submit"></fieldset>                 </form>               </div></li>             <li class="dropdownButton-menu"><a class="dropdownButton-lanzador" href="#"><span>▼</span></a></li> </ul>');

				filterSettings.$cleanButton = jQuery('#'+filterSettings.cleanButtonId);
				filterSettings.$collapsableLayer = jQuery('#'+filterSettings.collapsableLayerId);

				filterSettings.$toggleIcon1 = $toggleIcon1;
				filterSettings.$toggleLabel = $toggleLabel;
				filterSettings.$filterSummary = $filterSummary;
				filterSettings.$toggleIcon2 = $toggleIcon2;


				/*
				 * TODO: Comprobar que la configuración es correcta
				 */

				if (filterSettings.$filterContainer.prop('tagName')==='FORM'){
					filterSettings.$filterContainer.ajaxForm();
				}

				// Se utiliza el plugin ajaxForm de jQuery para configurar el formualario de busqueda como AJAX.
				// Se redimensiona el formulario de busqueda al tamanyo del grid.
				filterSettings.$filterContainer.parent().css('width',$self.rup_jqtable('getGridParam', 'width'));

				// Se configura la url de filtrado
				if (settings.filter.url === null){
					settings.filter.url = settings.baseUrl +'/filter';
				}
				settings.url = settings.filter.url;

				// Se almacena en las propiedades la url utilizada para la busqueda a partir de la especificada en el grid.
				settings.searchURL = $self.rup_jqtable('getGridParam', 'url');








				// Se asigna a la tecla ENTER la funcion de busqueda.
				filterSettings.$filterContainer.bind('keydown', function(evt) {
					if (evt.keyCode == 13) {
						// TODO : poner como evento
						//$self.rup_jqtable("showSearchCriteria");
						$self.rup_jqtable('filter');
					}
				});

				// Creacion del boton de busqueda.
				filterSettings.$filterButton.bind('click', function () {
					// TODO: Control cambios
					// TODO : poner como evento

					//Deshabilitar el nombre del filtro en el filterSummary una vez que ha terminado el filtro por defecto
					if (settings.$firstStartUp){

						settings.$firstStartUp=false;
					}
					//$self.rup_jqtable("showSearchCriteria");
					$self.rup_jqtable('filter');
				});


				// Creacion del botón de limpiar formulario.
				filterSettings.$cleanButton.bind('click', function () {
					// TODO : poner como evento
					if (settings.$firstStartUp){

						settings.$firstStartUp=false;
					}

					$self.rup_jqtable('cleanFilterForm').rup_jqtable('filter');
					if (filterSettings.validate!==undefined){
						jQuery('.rup-maint_validateIcon', filterSettings.$filterContainer).remove();
					}
					//$self.rup_jqtable("showSearchCriteria");
				});

				filterSettings.$toggleIcon1.add(filterSettings.$toggleLabel).add(filterSettings.$toggleIcon2)
					.attr('tabindex','0')
					.on({
						'keydown':function(evt) {
							if (evt.keyCode == 13) {
								$self.rup_jqtable('toggleFilterForm');
							}
						}
					});

				filterSettings.$filterToolbar.addClass('cursor_pointer').on({
					'click':function(){
						$self.rup_jqtable('toggleFilterForm');
					}
				});

				if (settings.filter.showHidden === true){
					filterSettings.$collapsableLayer.hide();
					//						filterSettings.$collapsableRowShow.show();
					filterSettings.$toggleIcon1.removeClass('ui-icon-triangle-1-n').addClass('ui-icon-triangle-1-s');
					filterSettings.$filterSummary.parent().addClass('rup-maint_searchCriteria');
				}

				// Configuración de validaciones
				if (filterSettings.validate!==undefined){
					filterSettings.$filterContainer.rup_validate(filterSettings.validate);

					$self.on({
						'rupTable_beforeFilter.filter.validate': function(){

							//filterSettings.$filterContainer.rup_validate("resetForm");
							if (multifilterSettings!==undefined){
								if(!settings.$firstStartUp){
									return filterSettings.$filterContainer.valid();
								}else{
									return null;
								}
							}else{
								return filterSettings.$filterContainer.valid();
							}
						}

					});
				}
			}

			$self.on({
				'rupTable_serializeGridData.filter': function(events, postData){
					var	filterParams = form2object(settings.filter.$filterContainer[0]),
						queryStrFilterParams = jQuery.param(filterParams),
						lastFilterParams = $self.data('tmp.lastFilterParams');

					var filtro;
					if (settings.$firstStartUp==true){
						var filtro= multifilterSettings.$filterDefaultValue;
					}
					if (filtro==undefined){
						jQuery.extend(postData, {'filter':filterParams});
					}else{
						jQuery.extend(postData, {'filter':filtro});
					}

					if (lastFilterParams === undefined || lastFilterParams !== queryStrFilterParams){
						jQuery.extend(postData, {page:($self.data('tmp.firstLoad')===true && settings.core.startOnPage!==null?settings.core.startOnPage:'1')});
						$self.data('tmp.lastFilterParams', queryStrFilterParams);
					}

				}
			});


			$self.on('jqGridGridComplete',function(event){
				if ($self.data('settings')!==undefined){
					$self.rup_jqtable('showSearchCriteria');
				}
			});

			// gestion de evento por defecto Multifiltro

			if (settings.multifilter != undefined
									&& settings.multifilter != null) {
				var $filterForm, $filterDefaultName,$firstStartUp;
				var multifilterSettings = settings.multifilter;
				settings.filter.$filterForm = $('#'
										+ settings.id + '_filter_form');

				var selector;

				settings.$firstStartUp=true;

				if (multifilterSettings.idFilter != null) {
					selector = multifilterSettings.idFilter;
				} else {
					selector = settings.id;
				}
				var usuario;
				if (multifilterSettings.userFilter != null) {
					usuario = multifilterSettings.userFilter;
				} else {
					usuario = LOGGED_USER;
				}
				var getDefault;
				if (multifilterSettings.getDefault!=null){
					getDefault = multifilterSettings.getDefault;
				}else{
					getDefault = true;
				}
				// getDefault
				if (getDefault){
					$.rup_ajax({
						url : settings.baseUrl
													+ '/multiFilter/getDefault?filterSelector='
													+ selector + '&user='
													+ usuario,
						type : 'GET',
						dataType : 'json',
						showLoading : false,
						contentType : 'application/json',
						//async : false,
						complete : function(jqXHR,
							textStatus) {
							if (settings.loadOnStartUp){
								$self.rup_jqtable('filter');
							}
							$self.triggerHandler('rupTable_multifilter_fillForm',$self.data.filterData);

							//												$self.triggerHandler("rupTable_multifilter_fillForm",form2object(settings.filter.$filterContainer[0]));
						},
						success : function(data, status,
							xhr) {
							if (data != null) {
								var valorFiltro = $
									.parseJSON(data.filterValue);


								$self._fillForm(valorFiltro);


								//settings.filter.$filterSummary.html("<i>"+data.filterName+"</i>");
								multifilterSettings.$filterDefaultName = data.filterName;
								multifilterSettings.$filterDefaultValue = valorFiltro;
								$self.data.filterData=valorFiltro;
							}

						},
						error : function(xhr, ajaxOptions,
							thrownError) {

						}
					});


				}

			}

		},
		/**
		 * Metodo que realiza la post-configuración del plugin filter del componente RUP Table.
		 * Este método se ejecuta después de la incialización del plugin.
		 *
		 * @name postConfigureFilter
		 * @function
		 * @param {object} settings - Parámetros de configuración del componente.
		 */
		postConfigureFilter: function(settings){
			var $self = this, filterFormId, filterSettings;

		}
	});

	//********************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	//********************************

	/**
	 * Métodos públicos del plugin filter.
	 *
	 * cleanFilterForm: Realiza una limpieza de los campos del formulario.
	 * filter: Lanza el filtrado de la tabla de acuerdo a los criterios indicados en el formulario.
	 * toggleFilterForm: Método encargado de ocultar y mostrar el formulario de filtrado.
	 *
	 */
	jQuery.fn.rup_jqtable('extend',{
		/**
     * Limpia los campos del formulario de filtrado.
     *
     * @function  cleanFilterForm
		 * @fires module:rup_jqtable#rupTable_filter_beforeCleanFilterForm
		 * @fires module:rup_jqtable#rupTable_filter_afterCleanFilterForm
     * @example
     * $("#idComponente").rup_jqtable("cleanFilterForm");
     */
		cleanFilterForm : function () {
			var $self = this,
				settings = $self.data('settings');
			$self.triggerHandler('rupTable_filter_beforeCleanFilterForm');
			$self.rup_jqtable('resetForm', settings.filter.$filterContainer);
			$self.triggerHandler('rupTable_filter_afterCleanFilterForm');

			return $self;
		},
		/**
     * Realiza el filtrado de acuerdo a los datos existentes en el formulario de filtrado.
     *
     * @function  filter
		 * @fires module:rup_jqtable#rupTable_beforeFilter
     * @example
     * $("#idComponente").rup_jqtable("filter");
     */
		filter : function(){
			var $self = this,
				settings = $self.data('settings');

			var bfr = $self.triggerHandler('rupTable_beforeFilter');
			if (bfr === false || bfr === 'stop') { return; }

			if ($.isFunction(settings.filter.beforeFilter)) {
				bfr = settings.filter.beforeFilter.call($self);
				if(bfr === undefined) { bfr = true; }
				if ( bfr === false ) { return; }
			}

			$self.rup_jqtable('setGridParam',{page:'1'});

			$self.trigger('reloadGrid');
		},
		/**
     * Devuelve los parámetros de filtrado empleados en el filtrado.
     *
     * @function  getFilterParams
     * @example
     * $("#idComponente").rup_jqtable("getFilterParams");
     */
		getFilterParams : function(){
			var $self = this,
				settings = $self.data('settings');

			return form2object(settings.filter.$filterContainer[0]);
		},
		/**
     *  Oculta el formulario de filtrado.
     *
     * @function  hideFilterForm
     * @example
     * $("#idComponente").rup_jqtable("hideFilterForm");
     */
		hideFilterForm: function(){
			var $self = $(this), settings = $self.data('settings'), filterSettings = settings.filter;

			filterSettings.$collapsableLayer.hide(settings.filter.transitionConfig);

			//			filterSettings.$collapsableRowShow.show(settings.filter.transitionConfig);

			filterSettings.$toggleIcon2.removeClass('ui-icon-circle-triangle-n').addClass('ui-icon-circle-triangle-s');
			filterSettings.$toggleIcon1.removeClass('ui-icon-triangle-1-s').addClass('ui-icon-triangle-1-e');
			filterSettings.$filterSummary.parent().addClass('rup-maint_searchCriteria');
		},
		/**
     * Muestra el formulario de filtrado.
     *
     * @function showFilterForm
     * @example
     * $("#idComponente").rup_jqtable("showFilterForm");
     */
		showFilterForm: function(){
			var $self = $(this), settings = $self.data('settings'), filterSettings = settings.filter;
			// Se muestra el formulario de búsqueda
			filterSettings.$collapsableLayer.show($.extend({},settings.filter.transitionConfig,{
				complete: function(){
					// Anadido el foco al primer campo del formulario
					jQuery('input:first', filterSettings.$filterContainer).focus();
				}
			}));

			filterSettings.$toggleIcon2.removeClass('ui-icon-circle-triangle-s').addClass('ui-icon-circle-triangle-n');
			filterSettings.$toggleIcon1.removeClass('ui-icon-triangle-1-e').addClass('ui-icon-triangle-1-s');
			filterSettings.$filterSummary.parent().removeClass('rup-maint_searchCriteria');
			//Eliminar tooltip
			//			$titleSearch.rup_tooltip("destroy");

			//			filterSettings.$collapsableRowShow.hide(settings.filter.transitionConfig);
		},
		/**
     * Alterna el estado del formulario de filtrado entre visible y oculto.
     *
     * @function toggleFilterForm
     * @example
     * $("#idComponente").rup_jqtable("toggleFilterForm");
     */
		toggleFilterForm: function(){
			var $self = $(this), settings = $self.data('settings'), filterSettings = settings.filter;

			if (filterSettings.$collapsableLayer.is(':hidden')) {
				//MOSTRAR
				$self.rup_jqtable('showFilterForm');

			}else{
				// OCULTAR
				$self.rup_jqtable('hideFilterForm');
			}

			return $self;
		},
		/**
     * Actualiza el resumen de los criterios de filtrado a partir de los valores existentes en el formulario.
     *
     * @function showSearchCriteria
     * @example
     * $("#idComponente").rup_jqtable("showSearchCriteria");
     */
		showSearchCriteria: function(){
			var $self = this, settings = $self.data('settings'),
				searchString = ' ', temp = '', label, numSelected,
				field, fieldId, fieldName, fieldValue,
				aux = settings.filter.$filterContainer.serializeArray(),
				searchForm = settings.filter.$filterContainer,
				filterMulticombo = new Array();
			var obj;

			//añadir arbol
			var nombreArbol=$('.jstree',settings.filter.$filterContainer);
			var arboles=	$('.jstree',settings.filter.$filterContainer);
			$.each(arboles,function( index,item ){
				obj= new Object();
				obj.name=$(item).attr('name');
				obj.value=$(item).rup_tree('getRupValue').length;
				obj.type='rup_tree';
				aux.push(obj);
			});

			for (var i = 0; i < aux.length; i++) {
				if (aux[i].value !== ''  && $.inArray(aux[i].name,settings.filter.excludeSummary)!=0) {

					//CAMPO a tratar
					field = $('[name=\'' + aux[i].name + '\']',searchForm);

					//Comprobar si se debe excluir el campo
					if ($.inArray(field.attr('id'), settings.filter.filterExclude) !== -1){
						continue;
					}

					//Seleccionar radio
					if (field.length > 1){
						field = $('[name=\'' + aux[i].name + '\']:checked',searchForm);
					}
					//Omitir campos hidden
					if ($(field).attr('type') === 'hidden'){
						continue;
					}

					//ID del campo
					fieldId = $(field).attr('id');
					//ID para elementos tipo rup.combo
					if ($(field).attr('ruptype') === 'combo'){
						if (field.next('.ui-multiselect').length==0){
							fieldId += '-button';
						}
					}
					//ID para elementos tipo rup.autocomplete
					if ($(field).attr('ruptype') === 'autocomplete'){
						fieldId = fieldId.substring(0, fieldId.indexOf('_label'));
					}

					//NAME
					label = $('label[for^=\'' + fieldId + '\']',searchForm);
					if (label.length>0){
						// <label for='xxx'></label>
						fieldName = label.html();
					} else {
						// <div></div>
						// <div></div>
						if ($(field).attr('ruptype') !== 'combo'){
							//fieldName= $("[name='" + aux[i].name + "']",searchForm).prev('div').html();
							fieldName= $('[name=\'' + aux[i].name + '\']',searchForm).prev('div').find('label').first().html();
						} else {
							//fieldName= $("[name='" + aux[i].name + "']",searchForm).parent().prev('div').html();

							// Buscamos el label asociado al combo
							// Primero por id
							var $auxField = $('[name=\'' + aux[i].name + '\']',searchForm), $labelField;

							$labelField = jQuery('[for=\''+$auxField.attr('id')+'\']');

							if ($labelField.length>0){
								fieldName = $labelField.first().text();
							}else{

								fieldName= $('[name=\'' + aux[i].name + '\']',searchForm).parent().prev('div').find('label').first().html();

							}
						}
					}
					if (fieldName === null || fieldName === undefined){
						fieldName = '';
					}

					//VALUE
					fieldValue = ' = ';
					switch($(field)[0].tagName){
					case 'INPUT':
						fieldValue = fieldValue + $(field).val();
						if ($(field)[0].type === 'checkbox' || $(field)[0].type === 'radio'){
							fieldValue = '';
						}
						break;
						//Rup-tree
					case 'DIV':
						$.each(aux,function( index,item ){
							if (item.name==field.attr('id')){
								if (item.value!=0){
									fieldValue +=' = '+ item.value;
								}
							} else {
								fieldValue = '';
							}


						});
						if (fieldValue==''){
							fieldName = '';
						}
						break;
					case 'SELECT':
						if (field.next('.ui-multiselect').length==0){
							fieldValue = fieldValue + $('option[value=\''+aux[i].value+'\']',field).html();
						} else {
							if ($.inArray($(field).attr('id'), filterMulticombo)===-1){
								numSelected = field.rup_combo('value').length;
								if (numSelected !== 0){
									fieldValue += numSelected;
								} else {
									fieldName = '';
									fieldValue = '';
								}
								filterMulticombo.push($(field).attr('id'));
							} else {
								fieldName = '';
								fieldValue = '';
							}
						}
						break;
					}

					//Parsear NAME
					var parseableChars = new Array(':','=');
					for (var j=0; j<parseableChars.length; j++){
						if (fieldName !== '' && fieldName.indexOf(parseableChars[j])!== -1){
							fieldName = fieldName.substring(0,fieldName.indexOf(parseableChars[j]));
							break;
						}
					}

					//Controlar rup.combo con valor vacío
					while (fieldValue.indexOf('&amp;nbsp;')!==-1){
						fieldValue = fieldValue.replace ('&amp;nbsp;','');
					}

					//Si no tiene NAME sacar solo el valor
					if (fieldName === '' && fieldValue.indexOf(' = ')!==-1){
						fieldValue = fieldValue.substring(2, fieldValue.length);
					}


					//Si no tiene NAME ni VALUE omitir
					if (fieldName === '' && $.trim(fieldValue) === ''){
						continue;
					}
					searchString = searchString + fieldName + fieldValue + ', ';
				}
			}

			if (jQuery.isFunction(settings.filter.fncSearchCriteria)){
				searchString = jQuery.proxy(settings.filter.fncSearchCriteria, $self, searchString)();
			}

			if ($.trim(searchString).length-1==$.trim(searchString).lastIndexOf(','))
			{
				searchString=searchString.substr(0,searchString.lastIndexOf(','))+' ';
			}

			if (settings.multifilter) {
				if (jQuery.isFunction(settings.multifilter.fncFilterName)){
					searchString = jQuery.proxy(settings.multifilter.fncFilterName, $self, searchString)();
				}
			}
			//Contiene criterios
			//			if (searchString.length>1){
			//searchString = searchString.substring(0, searchString.length-2);

			var initialHeight = $('#titleSearch_' + settings.id.name).css('height'),
				height,
				tmp = searchString,
				tooltip = false;

				//Añadir criterios
			while(true){
				settings.filter.$filterSummary.html(' <i>' + tmp + '</i>');
				height = $('#titleSearch_' + settings.id.name).css('height');
				if (height === initialHeight){
					break;
				}
				tmp = tmp.substring(0, tmp.lastIndexOf(',')) + ' <b>...</b>';
				tooltip = true;
			}

			//Tooltip con criterios
			if (tooltip){
				settings.filter.$filterSummary
					.rup_tooltip({
						content: {
							text: searchString.substring(1)
						},
						position: {
							my: 'bottom center',
							at: 'top center'
						}
					});
			}
		}
		//		}
	});

	//*******************************
	// DEFINICIÓN DE MÉTODOS PRIVADOS
	//*******************************

	jQuery.fn.rup_jqtable('extend',{
		/**
     * Obtiene el label correspondiente a un campo por el que se realiza el filtrado.
     *
     * @function _getSearchFormFieldLabel
		 * @private
		 * @param {object} $field Referencia jQuery a un campo del formulario de filtrado.
		 * @param {object} $form Referencia jQuery al formulario de filtrado.
		 * @return {string} - Label identificador al campo del formulario indicado por parámetro.
     * @example
     * $self._getSearchFormFieldLabel($field, $form);
     */
		_getSearchFormFieldLabel: function($field, $form){
			var fieldId = $field.attr('id'), $label, formFieldLabel='', rupType = $field.attr('ruptype');

			if (rupType !== 'combo'){
				$label = jQuery('label[for=\''+fieldId+'\']', $form);
			}else{
				$label = jQuery('label[for=\''+fieldId+'-button\']', $form);
			}

			if ($label.length>0){
				// <label for='xxx'></label>
				formFieldLabel = $label.html();
			} else {
				// <div></div>
				// <div></div>
				if ($field.attr('ruptype') !== 'combo'){
					//fieldName= $("[name='" + aux[i].name + "']",searchForm).prev('div').html();
					formFieldLabel= $('[name=\'' + name + '\']', $form).prev('div').find('label').first().html();
				} else {
					//fieldName= $("[name='" + aux[i].name + "']",searchForm).parent().prev('div').html();
					formFieldLabel= $('[name=\'' + name + '\']', $form).parent().prev('div').find('label').first().html();
				}
			}

			// Eliminamos los caracteres ':' y '=' que puedan existir en el label
			formFieldLabel = formFieldLabel.replace(/[:=]/g,'');

			return formFieldLabel;
		},
		/**
     * Obtiene el value del campo por el que se está filtrando.
     *
     * @function _getSearchFormFieldLabel
		 * @private
		 * @param {object} $field Referencia jQuery a un campo del formulario de filtrado.
		 * @param {object} $form Referencia jQuery al formulario de filtrado.
		 * @return {string} - Value correspondiente al campo del formulario indicado por parámetro.
     * @example
     * $self._getSearchFormFieldValue($field, $form);
     */
		_getSearchFormFieldValue: function($field, $form){
			var fieldValue = ' = ', filterMulticombo = [], numSelected, fieldName;

			//VALUE
			switch($field.prop('tagName')){
			case 'INPUT':
				fieldValue = fieldValue + $field.val();
				if ($field.attr('type') === 'checkbox' || $field.attr('type') === 'radio'){
					fieldValue = '';
				}
				break;
			case 'SELECT':
				if ($field.next('.ui-multiselect').length==0){
					fieldValue = fieldValue + $('option[value=\''+$field.rup_combo('getRupValue')+'\']', $field).html();
				} else {
					if ($.inArray($field.attr('id'), filterMulticombo)===-1){
						numSelected = $field.rup_combo('value').length;
						if (numSelected !== 0){
							fieldValue += numSelected;
						} else {
							fieldName = '';
							fieldValue = '';
						}
						filterMulticombo.push($field.attr('id'));
					} else {
						fieldName = '';
						fieldValue = '';
					}
				}
				break;
			}

			//Controlar rup.combo con valor vacío
			while (fieldValue.indexOf('&amp;nbsp;')!==-1){
				fieldValue = fieldValue.replace ('&amp;nbsp;','');
			}

			return fieldValue;
		}

	});

	//*******************************************************
	// DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
	//*******************************************************

	/**
	 * Parámetros de configuración por defecto para el plugin filter.
	 *
	 */
	/**
 	* @description Propiedades de configuración del plugin filter del componente RUP Table.
 	*
 	* @name options
 	*
 	* @property {boolean} [showHidden=false] -  Determina si el formulario de filtrado se debe de mostrar inicialmente oculto o no.
 	* @property {string} [url=null] - Url que se va a utilizar para realizar las peticiones de filtrado de la tabla. En caso de no especificarse una concreta, se utilizará por defecto una construida a partir de la url base. (urlBase + /filter).
 	* @property {object} [transitionConfig] - Configuración del efecto de la animación de mostrar/ocultar el formulario defiltrado.
 	* @property {function} [fncSearchCriteria] - Permite especificar una función de callback en la cual es posible modificar la cadena de texto con la que se muestra el resumen de los parámetros de filtrado.
 	*/
	jQuery.fn.rup_jqtable.plugins.filter = {};
	jQuery.fn.rup_jqtable.plugins.filter.defaults = {
		core:{
			startOnPage :null
		},
		filter:{
			url: null,
			showHidden:false,
			transitionConfig:{
				duration: 'slow',
				effect: 'blind'
			}
		}
	};

	/* ********* */
	/* EVENTOS
  /* ********* */

	/**
   *  Se lanza antes de producirse la petición de filtrado.
   *
   * @event module:rup_jqtable#rupTable_beforeFilter
   * @property {Event} e - Objeto Event correspondiente al evento disparado.
   * @example
   * $("#idComponente").on("rupTable_beforeFilter", function(event){ });
   */

	/**
    *   El botón de limpiar el formulario, limpia y filtra el formulario. Este evento se lanza antes de limpiar el formulario del filtro pero antes de filtrar con el formulario limpio.
    *
    * @event module:rup_jqtable#rupTable_filter_beforeCleanFilterForm
    * @property {Event} e - Objeto Event correspondiente al evento disparado.
    * @example
    * $("#idComponente").on("rupTable_filter_beforeCleanFilterForm", function(event){ });
    */

	/**
    *   El botón de limpiar el formulario, limpia y filtra el formulario. Este evento se lanza después de limpiar el formulario del filtro pero antes de filtrar con el formulario limpio.
    *
    * @event module:rup_jqtable#rupTable_filter_afterCleanFilterForm
    * @property {Event} e - Objeto Event correspondiente al evento disparado.
    * @example
    * $("#idComponente").on("rupTable_filter_afterCleanFilterForm", function(event,){ });
    */



})(jQuery);

/*!
 * Copyright 2013 E.J.I.E., S.A.
 *
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
 */

/*global jQuery */
/**
 * Permite al usuario realizar una búsqueda entre el conjunto de resultados que se le muestran. Mediante una serie de criterios de búsqueda permite al usuario posicionarse entre los diferentes registros que se ajustan a dichos criterios.
 *
 * @summary Plugin de search del componente RUP Table.
 * @module rup_jqtable/search
 * @example
 *
 * $("#idComponente").rup_jqtable({
 * 	url: "../jqGridUsuario",
 * 	usePlugins:["search"],
 * 	search:{
 * 		// Propiedades de configuración del plugin search
 * 	}
 * });
 */
(function ($) {

	/**
	 * Definición de los métodos principales que configuran la inicialización del plugin.
	 *
	 * preConfiguration: Método que se ejecuta antes de la invocación del componente jqGrid.
	 * postConfiguration: Método que se ejecuta después de la invocación del componente jqGrid.
	 *
	 */
	jQuery.rup_jqtable.registerPlugin('search',{
		loadOrder:9,
		preConfiguration: function(settings){
			var $self = this;
			return $self.rup_jqtable('preConfigureSearch', settings);
		},
		postConfiguration: function(settings){
			var $self = this;
			return $self.rup_jqtable('postConfigureSearch', settings);

		}
	});

	//********************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	//********************************

	/**
	 * Extensión del componente rup_jqtable para permitir la gestión de la búsqueda de registros.
	 *
	 * Los métodos implementados son:
	 *
	 * preConfigureSearch(settings): Método que define la preconfiguración necesaria para el correcto funcionamiento del componente.
	 * postConfigureSearch(settings): Método que define la postconfiguración necesaria para el correcto funcionamiento del componente.
	 *
	 */
	jQuery.fn.rup_jqtable('extend',{
		/**
		* Metodo que realiza la pre-configuración del plugin search del componente RUP Table.
		* Este método se ejecuta antes de la incialización del plugin.
		*
		* @name preConfigureSearch
		* @function
		* @param {object} settings - Parámetros de configuración del componente.
		*/
		preConfigureSearch: function(settings){
			// Añadimos la columna por defecto para mostrar la información de registros encontrados
			//			settings.colNames = $.merge([""], settings.colNames);
			//			settings.colModel = $.merge([settings.search.defaultSearchInfoCol], settings.colModel);

			// Se configura la url de filtrado
			if (settings.search.url === null){
				settings.search.url = settings.baseUrl +'/search';
			}

		},
		/**
		* Metodo que realiza la post-configuración del plugin search del componente RUP Table.
		* Este método se ejecuta antes de la incialización del plugin.
		*
		* @name postConfigureSearch
		* @function
		* @param {object} settings - Parámetros de configuración del componente.
		*/
		postConfigureSearch: function(settings){
			var $self = this;

			$self.rup_jqtable('createSearchRow', settings);
			$self._initializeSearchProps(settings);

			$self.on({
				'jqGridLoadComplete.rupTable.search': function(data){
					var page = parseInt($self.rup_jqtable('getGridParam', 'page'),10);


					if($self._hasPageMatchedElements(page)){
						$self.rup_jqtable('highlightMatchedRowsInPage', page);
						//						// TODO: Generalizar
						//						$self.find("td[aria-describedby='"+settings.id+"_infoSearch'] img.ui-icon.ui-icon-search").remove();
						//						for (var i=0;i<settings.search.matchedRowsPerPage[page].length;i++){
						//							newIndexPos = settings.search.matchedRowsPerPage[page][i];
						//							$($self.jqGrid("getInd",newIndexPos, true)).find("td[aria-describedby='"+settings.id+"_infoSearch']").html($("<img/>").addClass("ui-icon ui-icon-search")[0]);
						//						}
					}

					$self.rup_jqtable('updateSearchPagination');
				},
				'jqGridSelectRow.rupTable.search rupTable_setSelection.search': function(event, id, status, obj){
					$self.rup_jqtable('updateSearchPagination', id);
				},
				'jqGridGridComplete.rup_jqtable.search': function(event){
					var $self = $(this), settings = $self.data('settings');

					if ($self.rup_jqtable('getGridParam','records')===0){
						settings.search.$searchRow.hide();
					}else{
						settings.search.$searchRow.show();
					}
				},
				'rupTable_searchAfterCreateToolbar': function(event, $searchRow){
					var props = $self[0].p, colModel = props.colModel, cellColModel, $elem, editOptions, searchRupType, searchEditOptions;

					$('th[role=\'columnheader\']',$searchRow).each( function(i) {
						cellColModel = colModel[i];
						searchRupType = (cellColModel.searchoptions!==undefined && cellColModel.searchoptions.rupType!==undefined)?cellColModel.searchoptions.rupType:cellColModel.rupType;

						var colModelName = cellColModel.name;
						$elem = $('[name=\''+colModelName+'\']',$searchRow);
						// Se añade el title de los elementos de acuerdo al colname
						$elem.attr({
							'title': props.colNames[i],
							'class': 'editable customelement'
						}).removeAttr('readOnly');

						// En caso de tratarse de un componente rup, se inicializa de acuerdo a la configuracón especificada en el colModel
						if(searchRupType!==undefined) {
							searchEditOptions = cellColModel.searchoptions || cellColModel.editoptions;

							/*
							 * PRE Configuración de los componentes RUP
							 */
							switch(searchRupType){
							case 'combo':
								searchEditOptions = $.extend({},{menuWidth:$elem.width()}, searchEditOptions, {width:'97%'});
								break;
							}

							// Invocación al componente RUP
							$elem['rup_'+searchRupType](searchEditOptions);

							/*
							 * POST Configuración de los componentes RUP
							 */
							switch(searchRupType){
							case 'date':
								// TODO: Aplicarlo con estilos
								$elem.css('width','86%');
								break;
							}
						}
					});

				}
			});

		}
	});

	/**
	 * Métodos públicos del plugin search.
	 *
	 * Los métodos implementados son:
	 *
	 * toggleSearchForm(): Método que gestiona el mostrar/ocultar el formulario de búsqueda.
	 * createSearchRow(settings): Genera el formulario de búsqueda.
	 * navigateToMatchedRow(matchedRow): Se posiciona en el registro indicado que se corresponde con los criterios de búsqueda.
	 * doSearch(): Realiza la búsqueda de acuerdo a los criterios especificados.
	 * goToFirstMatched(paramPage): Navega hasta el primer resgistro que se corresponde con la búsqueda.
	 * fncGetSearchNavigationParams(buttonType): Devuelve los parámetros de navegación correspondientes al botón de navegación indicado.
	 * doSearchNavigation(arrParams, execute, changePage, index, npos, newPage, newPageIndex): Realiza la navegación entre los resultados de la búsqueda.
	 * clearSearch(): Realiza un borrado de los resultados de la búsqueda.
	 * clearHighlightedMatchedRows(): Elimina el resaltado de los registros
	 * highlightMatchedRowsInPage(page): Realiza el resaltado de los resultados de los registros para la página indicada.
	 * highlightMatchedRow($row): Resalta la línea indicada.
	 * updateSearchPagination(paramRowId): Actualiza los controles de paginación del formulario de búsqueda.
	 * getSearchCurrentRowCount(): Devuelve el resgistro actual en el que se encuentra el registro seleccionado respecto al conjunto de resultados.
	 *
	 */
	jQuery.fn.rup_jqtable('extend',{
		/**
     *  Muestra/Oculta el formulario de búsqueda.
     *
     * @function toggleSearchForm
     * @example
     * $("#idTable").rup_jqtable("toggleSearchForm");
     */
		toggleSearchForm: function(){
			var $self = this, settings = $self.data('settings'), prop = $self[0].p, trow, trow2;

			if (!settings.search.created){
				$self.rup_jqtable('createSearchToolbar');
				settings.search.$collapseIcon.removeClass('ui-icon-triangle-1-e');
				settings.search.$collapseIcon.addClass('ui-icon-triangle-1-s');
				jQuery('#searchNavLayer_'+settings.id).show();
				settings.search.created = true;
				jQuery('input','table thead tr.ui-search-toolbar').keypress(function(e){
					var key = e.charCode || e.keyCode || 0;
					if(key == 13){
						$self.rup_jqtable('search');
						return false;
					}
					return this;
				});
			}else{
				trow = jQuery('tr.ui-search-toolbar',$self[0].grid.hDiv);
				trow2 = prop.frozenColumns === true ?  jQuery('tr.ui-search-toolbar', $self[0].grid.fhDiv) : false;
				if(jQuery('tr.ui-search-toolbar','#gview_'+settings.id).is(':visible')){
					trow.hide(settings.search.transitionConfig);
					if(trow2) {
						trow2.hide(settings.search.transitionConfig);
					}
					jQuery('#searchNavLayer_'+settings.id).hide(settings.search.transitionConfig);
					settings.search.$collapseIcon.removeClass('ui-icon-triangle-1-s');
					settings.search.$collapseIcon.addClass('ui-icon-triangle-1-e');
				}else{
					trow.show(settings.search.transitionConfig);
					if(trow2) {
						trow2.show(settings.search.transitionConfig);
					}
					jQuery('#searchNavLayer_'+settings.id).show(settings.search.transitionConfig);
					settings.search.$collapseIcon.removeClass('ui-icon-triangle-1-e');
					settings.search.$collapseIcon.addClass('ui-icon-triangle-1-s');
				}

			}
		},
		/**
     * Genera la barra de controles para gestionar la búsqueda.
     *
     * @function createSearchToolbar
		 * @fires module:rup_jqtable#rupTable_searchAfterCreateToolbar
     * @example
     * $("#idTable").rup_jqtable("createSearchToolbar");
     */
		createSearchToolbar: function(){
			var $self = this, settings =  $self.data('settings'), prop = $self[0].p,
				$searchRow = jQuery('<tr>').attr({
					'class':'ui-search-toolbar',
					'role':'rowheader'
				});


			if (jQuery('table thead tr:first th[id=\''+settings.id+'_cb\']',$self[0].grid.hDiv).length!==0){
				$searchRow.append(jQuery('<th>').attr({
					'role':'columnheader',
					'class':'search_row_header ui-th-column ui-th-'+prop.direction
				}));
			}
			$searchRow.append(jQuery('<th>').attr({
				'role':'columnheader',
				'class':'search_row_header ui-th-column ui-th-'+prop.direction
			}));

			$.each(prop.colModel,function(index, colM){
				var $searchHeader = jQuery('<th>').attr({
						'role':'columnheader',
						'class':'search_row_header ui-th-column ui-th-'+prop.direction
					}), elc, $elc;

				if(colM.hidden===true) {
					$searchHeader.css('display','none');
				}
				colM.search = colM.search === false ? false : true;
				if(colM.stype === undefined) {
					colM.stype= colM.edittype!==undefined?colM.edittype:'text';
					if (colM.searchoptions !== undefined && colM.searchoptions.rupType==='combo'){
						colM.stype = 'text';
					}
				}
				var soptions = $.extend({},colM.searchoptions || colM.editoptions || {}, {id:colM.name,name:colM.name});
				if(colM.search){
					elc = $.jgrid.createEl.call($self[0],colM.stype!==undefined?colM.stype:colM.edittype,soptions,'',true,$.extend({},$.jgrid.ajaxOptions,soptions.ajaxSelectOptions || {}));
					$elc=jQuery(elc);
					$elc.css('width','97%');
					//					$searchCol.append($elc);
					$searchHeader.append($elc);
				}
				if (colM.name !==settings.defaultGridInfoCol.name && colM.name !== settings.defaultGridMultiplePkCol.name && colM.name !== 'cb'){
					$searchRow.append($searchHeader);
				}
			});
			$('table thead',$self[0].grid.hDiv).append($searchRow);

			settings.search.$searchRowInputs = jQuery('table thead tr.ui-search-toolbar','#gview_'+settings.id);
			settings.search.$searchRowInputs.attr({
				'id':settings.id+'_search_rowInputs',
				'form':settings.id+'_search_rowInputs'
			});


			// Configuración de validaciones
			if (settings.search.validate!==undefined){
				settings.search.$searchForm.rup_validate(settings.search.validate);

				$self.on({
					'rupTable_beforeSearch.search.validate': function(){
						return settings.search.$searchForm.valid();
					}
				});
			}

			$self.triggerHandler('rupTable_searchAfterCreateToolbar', [$searchRow]);

			$self[0].ftoolbar = true;


		},
		/**
     * Genera la barra de controles para gestionar la búsqueda.
     *
     * @function createSearchRow
		 * @param {object} settings - Genera la línea de busqueda de acuerdo a las propiedades de configuración especificadas.
     * @example
     * $("#idTable").rup_jqtable("createSearchRow", settings);
     */
		createSearchRow: function(settings){
			var $self = this,
				$gridHead = jQuery('table thead','#gview_'+settings.id),
				searchForm,
				// Templates
				searchRowHeaderTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_jqtable.templates.search.searchRowHeader'),
				collapseLayerTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_jqtable.templates.search.collapseLayer'),
				collapseIconTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_jqtable.templates.search.collapseIcon'),
				collapseLabelTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_jqtable.templates.search.collapseLabel'),
				matchedLayerTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_jqtable.templates.search.matchedLayer'),
				matchedLabelTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_jqtable.templates.search.matchedLabel'),
				navLayerTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_jqtable.templates.search.navLayer'),
				navButtonTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_jqtable.templates.search.navButton'),
				navSearchButtonTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_jqtable.templates.search.navSearchButton'),
				navClearButtonTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_jqtable.templates.search.navClearButton'),

				// Objetos
				$searchRow = $(jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_jqtable.templates.search.searchRow')),
				$searchRowHeader = $(jQuery.jgrid.format(searchRowHeaderTmpl, $gridHead.find('th').length-$gridHead.find('th:hidden').length)),
				// Capa que controla el colapso del formualario
				$collapseLayer = $(jQuery.jgrid.format(collapseLayerTmpl, 'searchCollapseLayer_'+settings.id)),
				$collapseIcon = $(jQuery.jgrid.format(collapseIconTmpl, 'searchCollapseIcon_'+settings.id)),
				$collapseLabel = $(jQuery.jgrid.format(collapseLabelTmpl, 'searchCollapsLabel_'+settings.id, jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_jqtable.plugins.search.searchCriteria'))),
				// Capa que muestra el número de ocurrencias
				$matchedLayer = $(jQuery.jgrid.format(matchedLayerTmpl, 'matchedLayer_'+settings.id)),
				$matchedLabel = $(jQuery.jgrid.format(matchedLabelTmpl, 'matchedLabel_'+settings.id, jQuery.jgrid.format(jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_jqtable.plugins.search.matchedRecords'),0))),

				// Capa que controla la navegación entre las diferentes ocurrencias
				$navLayer = $(jQuery.jgrid.format(navLayerTmpl, 'searchNavLayer_'+settings.id)),
				$firstNavButton = $(jQuery.jgrid.format(navButtonTmpl, 'search_nav_first_'+settings.id, jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_jqtable.first'))),
				$backNavButton = $(jQuery.jgrid.format(navButtonTmpl, 'search_nav_back_'+settings.id, jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_jqtable.previous'))),
				$forwardNavButton = $(jQuery.jgrid.format(navButtonTmpl, 'search_nav_forward_'+settings.id, jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_jqtable.next'))),
				$lastNavButton = $(jQuery.jgrid.format(navButtonTmpl, 'search_nav_last_'+settings.id, jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_jqtable.last'))),
				$navSearchButton = $(jQuery.jgrid.format(navSearchButtonTmpl, 'search_nav_button_'+settings.id, jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_jqtable.search.Find'))),
				$navClearButton = $(jQuery.jgrid.format(navClearButtonTmpl, 'search_nav_clear_button'+settings.id, jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_jqtable.search.Reset')));

			// Construcción del objeto final
			$collapseLayer.append($collapseIcon).append($collapseLabel);
			$matchedLayer.append($matchedLabel);
			$navLayer.append($firstNavButton).append($backNavButton).append($forwardNavButton).append($lastNavButton).append($navSearchButton).append($navClearButton);

			$searchRowHeader.append($collapseLayer);
			$searchRowHeader.append($matchedLayer);
			$searchRowHeader.append($navLayer);

			$searchRow.append($searchRowHeader);

			$gridHead.append($searchRow);

			settings.search = settings.search || {};

			settings.search.created = false;
			//			settings.search.url = settings.search.url || settings.url+"../search";

			settings.search.$collapseIcon = $collapseIcon;
			settings.search.$searchRow = $searchRow;
			settings.search.$matchedLabel = $matchedLabel;
			settings.search.$firstNavButton = $firstNavButton;
			settings.search.$backNavButton = $backNavButton;
			settings.search.$forwardNavButton = $forwardNavButton;
			settings.search.$lastNavButton = $lastNavButton;

			// Creacion del enlace de mostrar/ocultar el formulario
			$collapseIcon.add($collapseLabel).on('click', function(){
				$self.rup_jqtable('toggleSearchForm');
			});

			// Evento de búsqueda asociado al botón
			$navSearchButton.on('click', function(){
				$self.rup_jqtable('search');
			});

			// Evento asociado a limpiar el fomulario de búsqueda
			$navClearButton.on('click', function(){
				$self.rup_jqtable('clearSearch');
			});

			$navLayer.hide();

			function doSearchButtonNavigation($button, buttonId){
				if (!$button.hasClass('ui-state-disabled')){
					$self.rup_jqtable('navigateToMatchedRow', buttonId);
				}
			}

			// Elemento primero
			$firstNavButton.on('click', function(){
				doSearchButtonNavigation(jQuery(this), 'first');
			});

			// Elemento anterior
			$backNavButton.on('click', function(){
				doSearchButtonNavigation(jQuery(this), 'prev');
			});

			// Elemento siguiente
			$forwardNavButton.on('click', function(){
				doSearchButtonNavigation(jQuery(this), 'next');
			});

			// Elemento ultimo
			$lastNavButton.on('click', function(){
				doSearchButtonNavigation(jQuery(this), 'last');
			});

			// Se recubre con un form
			var $searchForm = jQuery('<form>').attr('id',settings.id+'_search_searchForm');
			settings.search.$searchRow.parent().parent().wrap($searchForm);
			settings.search.$searchForm = jQuery('#'+settings.id+'_search_searchForm');
			settings.search.$searchRow.hide();

		},
		/**
     *  Navega hasta el elemento indicado que se ajusta a los criterios de búsqueda indicados.
     *
     * @function navigateToMatchedRow
		 * @param {string} matchedRow - Identificador de la línea a la cual se quiere navegar.
     * @example
     * $("#idTable").rup_jqtable("navigateToMatchedRow", matchedRow);
     */
		navigateToMatchedRow: function(matchedRow){
			var $self = this, retNavParams  = $self.rup_jqtable('fncGetSearchNavigationParams', matchedRow);
			$self.rup_jqtable('doSearchNavigation', retNavParams);
		},
		/**
     * Lanza la operación de búsqueda además del evento previo.
     *
     * @function search
		 * @fires module:rup_jqtable#rupTable_beforeSearch
     * @example
     * $("#idTable").rup_jqtable("search");
     */
		search : function(){
			var $self = this,
				settings = $self.data('settings');

			var bfr = $self.triggerHandler('rupTable_beforeSearch');
			if (bfr === false || bfr === 'stop') { return; }

			if ($.isFunction(settings.search.beforeSearch)) {
				bfr = settings.search.beforeSearch.call($self);
				if(bfr === undefined) { bfr = true; }
				if ( bfr === false ) { return; }
			}

			$self.rup_jqtable('doSearch');
		},
		/**
     *  Lanza la operación de búsqueda.
     *
     * @function navigateToMatchedRow
		 * @fires module:rup_jqtable#rupTable_searchBeforeSubmit.rupTable.masterDetail
     * @example
     * $("#idTable").rup_jqtable("doSearch");
     */
		doSearch: function(){
			var $self = this, settings = $self.data('settings'),ret, jsonData={},
				page = parseInt($self.rup_jqtable('getGridParam', 'page'),10),
				postData =$self.rup_jqtable('getGridParam','postData');
			//			jsonData.filterParams =$self.rup_jqtable("getGridParam","postData"),
			jsonData.filter = $self.rup_jqtable('getFilterParams');
			jsonData.search = form2object(settings.search.$searchRowInputs[0]);
			$self._initializeSearchProps(settings);

			ret = $self.triggerHandler('rupTable_searchBeforeSubmit.rupTable.masterDetail',[postData, jsonData]);

			if (ret===false){return false;}

			jQuery.rup_ajax({
				url: settings.search.url,
				type:'POST',
				dataType:'json',
				data: jQuery.toJSON($.extend(true, {}, postData, jsonData)),
				contentType: 'application/json',
				success: function(xhr,b,c){
					var rowsPerPage = parseInt($self.rup_jqtable('getGridParam', 'rowNum'),10);

					if (xhr.length===0){
						$self._initializeSearchProps(settings);
						$self.rup_jqtable('updateSearchPagination');
						$self.rup_jqtable('clearHighlightedMatchedRows');
					}else{
						jQuery.each(xhr, function(index, elem){
							//							if (settings.primaryKey.length>1){
							var retValue='';
							for (var i=0;i<settings.primaryKey.length;i++){
								retValue+=elem.pk[settings.primaryKey[i]]+settings.multiplePkToken;
							}
							elem['id'] = retValue.substr(0, retValue.length-1);
							//							}

							elem.page = Math.ceil(elem.tableLine / rowsPerPage);
							elem.pageLine = elem.tableLine - ((elem.page-1)*rowsPerPage);
							$self._processMatchedRow(settings, elem);
						});
						$self.trigger('rupTableSearchSuccess');
						$self.rup_jqtable('goToFirstMatched', page);
					}
				}
			});
		},
		/**
     * Navega hasta el primer elemento que se ajusta a los criterios de búsqueda. En caso de no existir elementos adecuados en la página actual se navega hasta el primer elemento.
     *
     * @function goToFirstMatched
		 * @param {paramPage} paramPage - En caso de indicarse una página se utilizará en vez de la página actual.
     * @example
     * $("#idTable").rup_jqtable("goToFirstMatched", paramPage);
     */
		goToFirstMatched: function(paramPage){
			var $self = this, settings = $self.data('settings'),
				page = (typeof paramPage ==='string'?parseInt(paramPage,10):paramPage);

			if ($self._hasPageMatchedElements(page)){
				// TODO: Generalizar
				//				$self.find("td[aria-describedby='"+settings.id+"_infoSearch'] img.ui-icon.ui-icon-search").remove();
				//				for (var i=0;i<settings.search.matchedRowsPerPage[page].length;i++){
				//					newIndexPos = settings.search.matchedRowsPerPage[page][i];
				//					$($self.jqGrid("getInd",newIndexPos, true)).find("td[aria-describedby='"+settings.id+"_infoSearch']").html($("<img/>").addClass("ui-icon ui-icon-search")[0]);
				//				}

				$self.rup_jqtable('setSelection', settings.search.matchedRowsPerPage[page][0], true);
				$self.rup_jqtable('highlightMatchedRowsInPage', page);

			}else{
				$self.rup_jqtable('navigateToMatchedRow', 'first');
			}


		},
		/**
     * Devuelve los parámetros correspondientes al tipo de enlace de navegación indicado por parámetro.
     *
     * @function fncGetSearchNavigationParams
		 * @param {paramPage} buttonType - Tipo de parámetro first, prev, next o last.-
		 * @return {object} - Parametros de configuración asociados al tipo de enlace.
     * @example
     * $("#idTable").rup_jqtable("fncGetSearchNavigationParams", buttonType);
     */
		fncGetSearchNavigationParams : function(buttonType){
			var $self = this, settings = $self.data('settings'), execute = false, changePage = false, index=0, newPageIndex=0,
				npos = jQuery.proxy(jQuery.jgrid.getCurrPos, $self[0])(),
				page = parseInt($self.rup_jqtable('getGridParam', 'page'),10),
				newPage=page,
				activeLineId,
				//			lastPage = parseInt(Math.ceil($self.rup_jqtable("getGridParam", "records")/$self.rup_jqtable("getGridParam", "rowNum")),10),
				currentArrayIndex, selectedLines, pageArrayIndex;

			$self.trigger('rupTableAfterSearchNav',[buttonType]);

			npos[0] = parseInt(npos[0],10);

			activeLineId = $self.rup_jqtable('getActiveLineId');

			$('#'+settings.formEdit.feedbackId, settings.$detailForm).hide();
			switch (buttonType){
			case 'first':
				// Navegar al primer elemento
				execute = true;
				// Si no se han seleccionado todos los elementos
				// Se comprueba si la página en la que nos encontramos es la primera en la que se han seleccionado registros
				if (settings.search.matchedPages[0]!==page){
					// Marcamos el flag changePage para indicar que se debe de realizar una paginación
					changePage = true;
					// La nueva página será la primera página en la que se ha realizado una selección de registros
					newPage = settings.search.matchedPages[0];
				}
				// Recuperamos el primer registro seleccionado del la página
				index = settings.search.matchedLinesPerPage[newPage][0];
				newPageIndex = index;
				break;
			case 'prev':
				// Navegar al anterior elemento seleccionado
				execute = true;
				// Obtenemos un array con los index de los registros seleccionados en la página actual
				selectedLines = settings.search.matchedLinesPerPage[page] || [];
				// Obtenemos la posición que ocupa el elemento actual en el array de seleccionados
				currentArrayIndex = $.inArray(activeLineId+1,selectedLines);

				// La línea no se encuentra entre los registros que se corresponden a la búsqueda
				if (currentArrayIndex===-1){
					currentArrayIndex = $.rup_utils.insertSorted($.merge([],selectedLines), activeLineId+1);
					//						if(currentArrayIndex>1){
					//							currentArrayIndex--;
					//						}
				}

				// Se comprueba si ocupa el lugar del primer elemento seleccionado
				if (currentArrayIndex===0){
					// En caso de tratarse del primer elemento seleccionado de la página, se deberá de realizar una navegación a la página anterior que disponga de elementos seleccionados
					changePage = true;
					pageArrayIndex = $.inArray(page, settings.search.matchedPages);

					// En caso de no estar posicionados en una página en la que se encuentran ocurrencias de registros
					if (pageArrayIndex ===-1){
						// Se obtiene la posición en la que se encontraría la página
						pageArrayIndex = $.rup_utils.insertSorted($.merge([],settings.search.matchedPages), page);
					}

					// Recorremos las páginas anteriores
					newPage = settings.search.matchedPages[pageArrayIndex-1];
					// Obtenemos los identificadores de los registros seleccionados de la nueva página
					selectedLines = settings.search.matchedLinesPerPage[newPage];
					// Obtenemos el último registro seleccionado
					index = selectedLines[selectedLines.length-1];
				}else{
					// En caso de no tratarse del último elemento de la página, recuperamos el elemento anterior que haya sido seleccionado también
					index = selectedLines[currentArrayIndex-1];
				}

				newPageIndex = index;
				break;
			case 'next':
				// Navegar al siguiente elemento seleccionado
				execute = true;
				// Obtenemos un array con los index de los registros seleccionados en la página actual
				selectedLines = settings.search.matchedLinesPerPage[page]  || [];
				// Obtenemos la posición que ocupa el elemento actual en el array de seleccionados
				currentArrayIndex = $.inArray(activeLineId+1,selectedLines);

				// La línea no se encuentra entre los registros que se corresponden a la búsqueda
				if (currentArrayIndex===-1){
					currentArrayIndex = $.rup_utils.insertSorted($.merge([],selectedLines), activeLineId+1);
					currentArrayIndex--;
				}

				// Se comprueba si ocupa el lugar del último elemento seleccionado
				if (currentArrayIndex===selectedLines.length-1){
					// En caso de tratarse del primer elemento seleccionado de la página, se deberá de realizar una navegación a la página anterior que disponga de elementos seleccionados
					changePage = true;
					pageArrayIndex = $.inArray(page, settings.search.matchedPages);

					// En caso de no estar posicionados en una página en la que se encuentran ocurrencias de registros
					if (pageArrayIndex ===-1){
						// Se obtiene la posición en la que se encontraría la página
						pageArrayIndex = $.rup_utils.insertSorted($.merge([],settings.search.matchedPages), page)-1;
					}

					// Recorremos las páginas anteriores
					newPage = settings.search.matchedPages[pageArrayIndex+1];
					// Obtenemos los identificadores de los registros seleccionados de la nueva página
					selectedLines = settings.search.matchedLinesPerPage[newPage];
					// Obtenemos el primer registro de la página
					index = selectedLines[0];
				}else{
					// En caso de no tratarse del último elemento de la página, recuperamos el elemento anterior que haya sido seleccionado también
					index = selectedLines[currentArrayIndex+1];
				}

				newPageIndex = index;
				break;
			case 'last':
					// Navegar al primer elemento
				execute = true;
					// Si no se han seleccionado todos los elementos
					// Se comprueba si la página en la que nos encontramos es la primera en la que se han seleccionado registros
				if (settings.search.matchedPages[settings.search.matchedPages.length-1]!==page){
						// Marcamos el flag changePage para indicar que se debe de realizar una paginación
					changePage = true;
						// La nueva página será la primera página en la que se ha realizado una selección de registros
					newPage = settings.search.matchedPages[settings.search.matchedPages.length-1];
				}
					// Recuperamos el primer registro seleccionado del la página
				index = settings.search.matchedLinesPerPage[newPage][settings.search.matchedLinesPerPage[newPage].length-1];
				newPageIndex = index;
				break;
			}

			return [buttonType, execute, changePage, index-1, npos, newPage, newPageIndex-1];
		},
		/**
     * Realiza la navegación entre los elementos que se ajustan a los criterios de bús
     *
     * @function fncGetSearchNavigationParams
		 * @param {object[]} arrParams - Array de parámetros que determinan la navegación.
     * @example
     * $("#idTable").rup_jqtable("doSearchNavigation", arrParams);
     */
		doSearchNavigation: function(arrParams){
			var $self = this,
				settings = $self.data('settings'),
				buttonType, execute, changePage, index, npos, newPage, newPageIndex, indexAux, ret, actualRowId, rowId, pagePos, $row;

			if ($.isArray(arrParams)){
				buttonType = arrParams[0];
				execute = arrParams[1];
				changePage = arrParams[2];
				index = arrParams[3];
				npos = arrParams[4];
				newPage = arrParams[5];
				newPageIndex = arrParams[6];

				if (execute){
					$self.rup_jqtable('hideFormErrors', settings.formEdit.$detailForm);
					//					$self.triggerHandler("jqGridAddEditClickPgButtons", [buttonType, settings.$detailForm, npos[1][npos[index]]]);
					pagePos = jQuery.proxy(jQuery.jgrid.getCurrPos, $self[0])();

					//					actualRowId = npos[1][npos[0]];
					actualRowId = $self.rup_jqtable('getActiveRowId');

					//					ret = $self.triggerHandler("rupTable_searchNavigation_deselect", actualRowId);
					//					if (ret!==false){
					$row = jQuery($self.jqGrid('getInd', actualRowId, true));
					if ($row.data('tmp.search.notToDeselect')!=='true'){
						$self.rup_jqtable('setSelection', actualRowId, false);
						if ($row.data('tmp.search.notToDeselect')!==undefined){
							delete $row.data('tmp.search.notToDeselect');
						}
					}

					if (changePage){
						//						$self.jqGrid("setSelection", pagePos[1][pagePos[0]], false);
						$self.trigger('reloadGrid',[{page: newPage}]);
						$self.on('jqGridAfterLoadComplete.rupTable.serach.pagination',function(event,data){
							indexAux = jQuery.inArray(newPageIndex+1, settings.search.matchedLinesPerPage[newPage]);

							rowId = settings.search.matchedRowsPerPage[parseInt(data.page,10)][indexAux];

							$row = jQuery($self.jqGrid('getInd', rowId, true));
							if ($row.attr('aria-selected')==='true'){
								$row.data('tmp.search.notToDeselect','true');
							}

							$self.rup_jqtable('setSelection', rowId, true);

							$self.off('jqGridAfterLoadComplete.rupTable.serach.pagination');
						});
					}else{
						indexAux = jQuery.inArray(index+1, settings.search.matchedLinesPerPage[newPage]);

						rowId = settings.search.matchedRowsPerPage[newPage][indexAux];

						$row = jQuery($self.jqGrid('getInd', rowId, true));
						if ($row.attr('aria-selected')==='true'){
							$row.data('tmp.search.notToDeselect','true');
						}

						$self.rup_jqtable('setSelection', rowId, true);
					}
				}
			}
		},
		/**
     * Limpia los criterios de búsqueda introducidos por el usuario.
     *
     * @function clearSearch
     * @example
     * $("#idTable").rup_jqtable("clearSearch");
     */
		clearSearch: function(){
			var $self = this, settings = $self.data('settings');
			$self._initializeSearchProps(settings);
			$self.rup_jqtable('updateSearchPagination');
			$self.rup_jqtable('clearHighlightedMatchedRows');
			jQuery('input,textarea','#gview_'+settings.id+' table thead tr.ui-search-toolbar').val('');
			jQuery('table thead tr.ui-search-toolbar [ruptype=\'combo\']','#gview_'+settings.id).rup_combo('clear');
		},
		/**
     * Elimina el resaltado de los registros que se ajustan a los criterios de busqueda.
     *
     * @function clearHighlightedMatchedRows
     * @example
     * $("#idTable").rup_jqtable("clearHighlightedMatchedRows");
     */
		clearHighlightedMatchedRows: function(){
			var $self = this, settings = $self.data('settings');
			$self.find('td[aria-describedby=\''+settings.id+'_rupInfoCol\'] span.ui-icon.ui-icon-search').removeClass('ui-icon-search');
		},
		/**
     * Resalta los registros que se ajustan a los criterios de búsqueda.
     *
     * @function highlightMatchedRowsInPage
		 * @param {string} page - Identificador de la página en la que se desean resaltar los registos.
     * @example
     * $("#idTable").rup_jqtable("highlightMatchedRowsInPage", page);
     */
		highlightMatchedRowsInPage:function(page){
			var $self = this, settings = $self.data('settings'), internalProps = $self[0].p, $row;

			$self.rup_jqtable('clearHighlightedMatchedRows');


			for (var i=0;i<settings.search.matchedRowsPerPage[page].length;i++){
				var newIndexPos = settings.search.matchedRowsPerPage[page][i];
				$row = $($self.jqGrid('getInd',newIndexPos, true));
				$self.rup_jqtable('highlightMatchedRow', $row);
				//				if (i==0){
				//					internalProps.selarrrow.push($row[0].id);
				//					internalProps.selrow = $row[0].id;
				//				}
			}
		},
		/**
     * Resalta como ocurrencia de la búsqueda la línea especificada.
     *
     * @function highlightMatchedRow
		 * @param {string} $row - Objeto jQuery que referencia la línea de la tabla que se quiere resaltar.
     * @example
     * $("#idTable").rup_jqtable("highlightMatchedRow", $("#idRow"));
     */
		highlightMatchedRow: function($row){
			var $self = this, settings = $self.data('settings');
			$row.find('td[aria-describedby=\''+settings.id+'_rupInfoCol\'] span').addClass('ui-icon ui-icon-rupInfoCol ui-icon-search');
		},
		/**
     * Actualiza los valores de la navegación entre registros.
     *
     * @function updateSearchPagination
		 * @param {string} paramRowId - Identificador de la página.
     * @example
     * $("#idTable").rup_jqtable("updateSearchPagination", paramRowId);
     */
		updateSearchPagination:function(paramRowId){
			var $self = this, settings = $self.data('settings'),
				rowId, pagePos, currentArrayIndex,
				page = parseInt($self.rup_jqtable('getGridParam', 'page'),10),
				numMatched, formatter = $.jgrid.formatter.integer;

			if (paramRowId!==undefined){
				rowId = paramRowId;
			}else{
				pagePos = jQuery.proxy(jQuery.jgrid.getCurrPos, $self[0])();
				rowId = (pagePos[0]!==-1?pagePos[1][pagePos[0]-1]:-1);
			}

			if (settings.search.numMatched===0){
				settings.search.$firstNavButton.add(settings.search.$backNavButton).add(settings.search.$forwardNavButton).add(settings.search.$lastNavButton).addClass('ui-state-disabled');
				settings.search.$matchedLabel.html(jQuery.jgrid.format(jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_jqtable.plugins.search.matchedRecords'),'0'));
			}else if (rowId!==-1){
				// Comprobamos si el registro seleccionado es uno de los resultados de la busqueda
				if (jQuery.inArray(rowId, settings.search.matchedRowsPerPage[page])!==-1){
					// Calculamos el
					numMatched = $self.rup_jqtable('getSearchCurrentRowCount', rowId);

					if (settings.search && settings.search.numMatched){
						settings.search.$matchedLabel.html(jQuery.jgrid.format(jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_jqtable.plugins.search.matchedRecordsCount'),$.fmatter.util.NumberFormat(numMatched,formatter), $.fmatter.util.NumberFormat(settings.search.numMatched,formatter)));
					}

					if (numMatched===1){
						settings.search.$firstNavButton.addClass('ui-state-disabled');
						settings.search.$firstNavButton.attr('disabled', 'disabled');
						settings.search.$backNavButton.addClass('ui-state-disabled');
						settings.search.$backNavButton.attr('disabled', 'disabled');
					}else{
						settings.search.$firstNavButton.removeClass('ui-state-disabled');
						settings.search.$firstNavButton.removeAttr("disabled");
						settings.search.$backNavButton.removeClass('ui-state-disabled');
						settings.search.$backNavButton.removeAttr("disabled");
					}

					if (numMatched===settings.search.numMatched){
						settings.search.$lastNavButton.addClass('ui-state-disabled');
						settings.search.$lastNavButton.attr('disabled', 'disabled');
						settings.search.$forwardNavButton.addClass('ui-state-disabled');
						settings.search.$forwardNavButton.attr('disabled', 'disabled');
					}else{
						settings.search.$lastNavButton.removeClass('ui-state-disabled');
						settings.search.$lastNavButton.removeAttr("disabled");
						settings.search.$forwardNavButton.removeClass('ui-state-disabled');
						settings.search.$forwardNavButton.removeAttr("disabled");
					}

				}else{
					if (settings.search && settings.search.numMatched){
						settings.search.$matchedLabel.html(jQuery.jgrid.format(jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_jqtable.plugins.search.matchedRecords'),$.fmatter.util.NumberFormat(settings.search.numMatched,formatter)));
					}
					settings.search.$firstNavButton.removeClass('ui-state-disabled');
					settings.search.$backNavButton.removeAttr("disabled");
					settings.search.$forwardNavButton.removeClass('ui-state-disabled');
					settings.search.$lastNavButton.removeAttr("disabled");

					// Miramos a ver si desde la posición actual hay anterior
					if (jQuery.inArray(settings.search.matchedPages, page) > 0){
						settings.search.$backNavButton.removeClass('ui-state-disabled');
					}else if (jQuery.inArray(page, settings.search.matchedPages) === -1 && $.rup_utils.insertSorted($.merge([],settings.search.matchedPages), page)===0){
						// Anterior a las páginas en las que se han encontrado ocurrencias
						settings.search.$backNavButton.addClass('ui-state-disabled');
						settings.search.$firstNavButton.addClass('ui-state-disabled');
					}else if (jQuery.inArray(page, settings.search.matchedPages) === -1 && $.rup_utils.insertSorted($.merge([],settings.search.matchedPages), page)>=settings.search.matchedPages.length){
						// Posterior a las páginas en las que se han encontrado ocurrencias
						settings.search.$forwardNavButton.addClass('ui-state-disabled');
						settings.search.$lastNavButton.addClass('ui-state-disabled');
					}else{
						pagePos = $self.rup_jqtable('getActiveLineId');
						if(settings.search.matchedLinesPerPage[page] !== undefined){
							currentArrayIndex = $.rup_utils.insertSorted($.merge([],settings.search.matchedLinesPerPage[page]), pagePos+1);
						}
						if (currentArrayIndex===0){
							settings.search.$backNavButton.addClass('ui-state-disabled');
						}
						if (settings.search.matchedLinesPerPage[page] !== undefined && 
								currentArrayIndex === settings.search.matchedLinesPerPage[page].length){
							settings.search.$forwardNavButton.addClass('ui-state-disabled');
						}
					}
				}
			}
		},
		/**
     *  Devuelve, para una linea determinada, la posición en que se encuentra dentro del total de registros que se ajustan a los criterios de búsqueda
     *
     * @function getSearchCurrentRowCount
		 * @param {string} selectedRowId - Identificador del registro.
     * @example
     * $("#idTable").rup_jqtable("getSearchCurrentRowCount", "05");
     */
		getSearchCurrentRowCount : function(selectedRowId){
			var $self = this, settings = $self.data('settings'),
				page = parseInt($self.rup_jqtable('getGridParam', 'page'),10),
				currentPos = jQuery.proxy(jQuery.jgrid.getCurrPos, $self[0])(),
				selectedRows = $self.rup_jqtable('getSelectedRows'),
				//			rowsPerPage = parseInt($self.rup_jqtable("getGridParam", "rowNum"),10),
				selectedPagesArrayIndex,
				currentRow = jQuery.inArray(selectedRowId!==undefined?selectedRowId:selectedRows[0],currentPos[1]),
				cont=0;


			// En caso de que no se hayan seleccionado
			// Se obtiene el indice de la página actual dentro del array de páginas deseleccionadas para
			selectedPagesArrayIndex = jQuery.inArray(page, settings.search.matchedPages);

			for (var i=0;i<selectedPagesArrayIndex;i++){
				cont+=settings.search.matchedLinesPerPage[settings.search.matchedPages[i]].length;
			}

			cont+=$.inArray(currentRow+1, settings.search.matchedLinesPerPage[settings.search.matchedPages[selectedPagesArrayIndex]])+1;

			return cont;
		}
	});

	/**
	 * Métodos públicos del plugin search.
	 *
	 * Los métodos implementados son:
	 *
	 * _hasPageMatchedElements(paramPage): Devuelve true/false dependiendo si la página tiene registros que coinciden con los criterios de búsqueda o no.
	 * _initializeSearchProps(settings): Se realiza la inicialización de los componentes del plugin search.
	 * _processMatchedRow(settings, matchedElem): Se gestiona el registro indicado.
	 */
	jQuery.fn.rup_jqtable('extend',{
		/**
     * Devuelve true/false dependiendo si la página tiene registros que coinciden con los criterios de búsqueda o no.
     *
     * @function _hasPageMatchedElements
		 * @private
		 * @param {string} paramPage - Identificador del registro.
		 * @return {boolean} - true/false dependiendo si la página tiene registros que coinciden con los criterios de búsqueda o no.
     * @example
     * $self._hasPageMatchedElements("1");
     */
		_hasPageMatchedElements: function(paramPage){
			var $self = this, settings = $self.data('settings'),
				page = (typeof paramPage ==='string'?parseInt(paramPage,10):paramPage);
			// Se comprueba si se han seleccionado todos los registros de la tabla
				// Comprobamos si en la página indicada se ha encontrado un elemento
			return (jQuery.inArray(page, settings.search.matchedPages)!== -1);
		},
		/**
     * Se realiza la inicialización de los componentes del plugin search.
     *
     * @function _initializeSearchProps
		 * @private
		 * @param {object} settings - Parámetros de configuración de la página.
		 * @return {boolean} - true/false dependiendo si la página tiene registros que coinciden con los criterios de búsqueda o no.
     * @example
     * $self._initializeSearchProps(settings);
     */
		_initializeSearchProps: function(settings){
			// Se almacenan en los settings internos las estructuras de control de los registros seleccionados
			if (settings.search===undefined){
				settings.search={};
			}
			// Numero de registros encontrados
			settings.search.numMatched=0;
			// Propiedades
			settings.search.matchedRowsPerPage=[];
			settings.search.matchedLinesPerPage=[];
			settings.search.matchedRows=[];
			settings.search.matchedIds=[];
			settings.search.matchedPages=[];
		},
		/**
     * Se gestiona el registro indicado.
     *
     * @function _processMatchedRow
		 * @private
		 * @param {object} settings - Parámetros de configuración de la página.
		 * @param {object} - Referencia al elemento.
     * @example
     * $self._processMatchedRow(settings, matchedElem);
     */
		_processMatchedRow: function(settings, matchedElem){
			var lineIndex;

			if (settings.search.matchedRowsPerPage[matchedElem.page]===undefined){
				settings.search.matchedRowsPerPage[matchedElem.page]=[];
				settings.search.matchedLinesPerPage[matchedElem.page]=[];
			}
			// Se almacena el Id del registro seleccionado
			if (jQuery.inArray(matchedElem.id, settings.search.matchedIds)===-1){
				settings.search.matchedIds.push(matchedElem.id);
				settings.search.matchedRows.push({id:matchedElem.id, page:matchedElem.page});
				lineIndex = $.rup_utils.insertSorted(settings.search.matchedLinesPerPage[matchedElem.page], matchedElem.pageLine);
				settings.search.matchedRowsPerPage[matchedElem.page].splice(lineIndex,0,matchedElem.id);
				if (settings.search.matchedRowsPerPage[matchedElem.page].length>0
						&& jQuery.inArray(parseInt(matchedElem.page,10), settings.search.matchedPages)===-1){
					$.rup_utils.insertSorted(settings.search.matchedPages, parseInt(matchedElem.page,10));
				}
				settings.search.numMatched++;
			}
		}
	});

	//*******************************************************
	// DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
	//*******************************************************



	/**
 	* @description Propiedades de configuración del plugin search del componente RUP Table.
 	*
 	* @name options
 	*
 	* @property {string} [url=null] - Url que se va a utilizar para realizar las peticiones de filtrado de la tabla. En caso de no especificarse una concreta, se utilizará por defecto una construida a partir de la url base. (urlBase + /search).
	* @property {object} [validate] - Mediante esta propiedad es posible especificar reglas de validación que se especifican en la guía de uso del componente RUP validation.
 	*/
	jQuery.fn.rup_jqtable.plugins.search = {};
	jQuery.fn.rup_jqtable.plugins.search.defaults = {
		showGridInfoCol:true,
		search:{
			url: null,
			autosearch: false,
			beforeSearch:function(){
				return true;
			},
			defaultSearchInfoCol:{
				name: 'infoSearch', index: 'infoSearch', editable:false, width:'15em', search:false
			},
			searchOnEnter:false,
			transitionConfig:{
				duration: 0
			}
		}
	};


	/* ********* */
	/* EVENTOS
  /* ********* */

	/**
   *  Se lanza al finalizar la creación de la linea de búsqueda de la tabla.
   *
   * @event module:rup_jqtable#rupTable_searchAfterCreateToolbar
   * @property {Event} event - Objeto Event correspondiente al evento disparado.
	 * @property {Event} $searchRow - Linea de la tabla destinada a la búsqueda.
   * @example
   * $("#idComponente").on("rupTable_searchAfterCreateToolbar", function(event, $searchRow){ });
   */

	/**
    * Evento lanzado antes de realizarse la búsqueda.
    *
    * @event module:rup_jqtable#rupTable_beforeSearch
    * @property {Event} event - Objeto Event correspondiente al evento disparado.
    * @example
    * $("#idComponente").on("rupTable_beforeSearch", function(event){ });
    */

	/**
    * Evento lanzado antes de realizarse la petición de búsqueda al servidor
    *
    * @event module:rup_jqtable#rupTable_searchBeforeSubmit.rupTable.masterDetail
    * @property {Event} event - Objeto Event correspondiente al evento disparado.
		* @property {object} postData - Objeto data que va a ser enviado en la petición.
		* @property {object} jsonData - Objeto json con los parámetros de búsqueda.
    * @example
    * $("#idComponente").on("rupTable_searchBeforeSubmit.rupTable.masterDetail", function(event, postData, jsonData){ });
    */


})(jQuery);

/*!
 * Copyright 2013 E.J.I.E., S.A.
 *
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
 */

/*global jQuery */

/**
 * Genera una botonera asociada a la tabla con la finalidad de agrupar los controles que permiten realizar acciones sobre los registros de la misma.
 *
 * @summary Plugin de toolbar del componente RUP Table.
 * @module rup_jqtable/toolbar
 * @example
 *
 * $("#idComponente").rup_jqtable({
 * 	url: "../jqGridUsuario",
 * 	usePlugins:["toolbar"],
 * 	toolbar:{
 * 		// Propiedades de configuración del plugin toolbar
 * 	}
 * });
 */
(function ($) {

	/**
	 * Definición de los métodos principales que configuran la inicialización del plugin.
	 *
	 * preConfiguration: Método que se ejecuta antes de la invocación del componente jqGrid.
	 * postConfiguration: Método que se ejecuta después de la invocación del componente jqGrid.
	 *
	 */
	jQuery.rup_jqtable.registerPlugin('toolbar',{
		loadOrder:3,
		preConfiguration: function(settings){
			var $self = this;
			return $self.rup_jqtable('preConfigureToolbar', settings);

		},
		postConfiguration: function(settings){
			var $self = this;
			return $self.rup_jqtable('postConfigureToolbar', settings);

		}
	});

	//********************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	//********************************

	/**
	 * Extensión del componente rup_jqtable para permitir la gestión de la botonera asociada a la tabla.
	 *
	 * Los métodos implementados son:
	 *
	 * preConfigureToolbar(settings): Método que define la preconfiguración necesaria para el correcto funcionamiento del componente.
	 * postConfigureToolbar(settings): Método que define la postconfiguración necesaria para el correcto funcionamiento del componente.
	 *
	 */
	jQuery.fn.rup_jqtable('extend',{
		/**
		* Metodo que realiza la pre-configuración del plugin toolbar del componente RUP Table.
		* Este método se ejecuta antes de la incialización del plugin.
		*
		* @name preConfigureToolbar
		* @function
		* @param {object} settings - Parámetros de configuración del componente.
		*/
		preConfigureToolbar: function(settings){
			var $self = this, toolbarSettings = settings.toolbar;

			/*
			 * Inicialización de los identificadores por defecto de los componentes del toolbar
			 */
			toolbarSettings.id = toolbarSettings.id!==null?toolbarSettings.id:settings.id+'_toolbar';

			/*
			 * Inicialización del componente rup_toolbar
			 */
			if (jQuery('#'+toolbarSettings.id).length>0){
				settings.$toolbar=(toolbarSettings.id[0]==='#'?$(toolbarSettings.id):$('#'+toolbarSettings.id));
				if (!settings.$toolbar.hasClass('rup-toolbar')){
					settings.$toolbar.rup_toolbar({
						 width: toolbarSettings.width
					});
				}

				//				toolbarSettings.self=$(toolbarSettings);
			}else{
				// En caso de no indicarse un toolbar, se crea un toolbar por defecto.
				// FIXME: Contemplar la posibilidad de no generar una toolbar por defecto
				toolbarSettings = {};
				toolbarSettings.id = 'rup-maint_toolbar-' + settings.id;
				toolbarSettings.self = $('<div></div>').attr('id', toolbarSettings.id);
				$self.prepend(toolbarSettings.self);
				toolbarSettings.self.rup_toolbar({
					 width: toolbarSettings.width
				});
			}

			toolbarSettings.$toolbar = settings.$toolbar;

			// autoAjustToolbar: Realiza el autoajuste del toolbar al tamanyo del grid.
			if (toolbarSettings.autoAjustToolbar) {
				settings.$toolbar.css('width', $self.rup_jqtable('getGridParam', 'width') - 5);//-5 para ajustar el ancho
			}

			// createDefaultToolButtons: Determina la creacion de los botones basicos por defecto del toolbar.
			// Se unifican los parámetros de configuración de mostrar/ocultar los botones de la toolbar
			if (toolbarSettings.createDefaultToolButtons===true) {
				toolbarSettings.showOperations = jQuery.extend(true, {}, toolbarSettings.defaultButtons, settings.core.showOperations, toolbarSettings.showOperations);
			}

			// Retrocompatibilidad: se mantiene el antiguo parámetro newButtons
			toolbarSettings.buttons = jQuery.extend(true, {}, toolbarSettings.newButtons, toolbarSettings.buttons);

		},
		/**
		* Metodo que realiza la post-configuración del plugin toolbar del componente RUP Table.
		* Este método se ejecuta antes de la incialización del plugin.
		*
		* @name postConfigureToolbar
		* @function
		* @fires module:rup_jqtable#rupTable_feedbackClose
		* @param {object} settings - Parámetros de configuración del componente.
		*/
		postConfigureToolbar: function(settings){
			var $self = this, toolbarSettings = settings.toolbar, counter=1;

			// Se generan los botones de la toolbar en base a las operaciones
			jQuery.each(settings.toolbar.showOperations, function(buttonId, value){
				var operationCfg;
				if (value===true){
					operationCfg = settings.core.operations[buttonId];
					if (operationCfg!==undefined){
						toolbarSettings['btn'+buttonId.capitalize()] = settings.$toolbar.addButton({
							id:'btn'+buttonId.capitalize(),
							i18nCaption: operationCfg.name,
							css: operationCfg.icon,
							index: counter++,
							dropdown: operationCfg.dropdown,
							right: operationCfg.right
						}, jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_jqtable')).bind('click', function(event){
							jQuery.proxy(operationCfg.callback,$self)($self, event);
						});
					}
				}
			});

			//Se comprueba si hay nuevos botones definidos y se ejecuta la función addButton con la parametrizacion de los nuevos botones
			if (toolbarSettings.buttons !== undefined && toolbarSettings.buttons !== null){
				jQuery.each(toolbarSettings.buttons, function (index, object){
					if (object.json_i18n === undefined){
						object.json_i18n = {};
					}
					//					if (object.obj===undefined)


					if (object.obj !== undefined && object.click !== undefined){
						settings.$toolbar.addButton(object.obj, object.json_i18n).bind('click', object.click);
					} else if (object.buttons !== undefined){
					 	 var mButton = settings.$toolbar.addMButton(object, object.json_i18n).bind('click', settings.$toolbar.showMButton);
					 	 settings.$toolbar.addButtonsToMButton(object.buttons, mButton, object.json_i18n);
					}else{
						$.rup.errorGestor($.rup.i18nParse($.rup.i18n.base,'rup_jqtable.toolbarNewButtonError'));
					}
				});
			}

			/*
			 * EVENTOS
			 */
			$self.on({
				'jqGridSelectRow.rupTable.toolbar jqGridLoadComplete.rupTable.toolbar jqGridInlineEditRow.rupTable.toolbar jqGridInlineAfterRestoreRow.rupTable.toolbar rupTableHighlightRowAsSelected.rupTable.toolbar rupTableSelectedRowNumberUpdated jqGridInlineAfterSaveRow rupTable_toolbarButtonsStateRefresh rupTable_afterDeleteRow.rupTable.toolbar rupTable_coreConfigFinished.toolbar rupTable_deleteAfterComplete.rupTable.toolbar': function(event, id, status, obj){
					var $self = jQuery(this), settings = $self.data('settings');
					// Existe elementos seleccionados para ser editados

					function processButton($button, enable){
						if ($button!==undefined){
							if (enable){
								$button.button('enable');
							}else{
								$button.button('disable');
							}
						}
					}

					jQuery.each(settings.core.operations, function(buttonId, operationCfg){

						//						if (value===true){
						if (settings.toolbar.showOperations[buttonId]===true){
							//							operationCfg = settings.core.operations[buttonId];
							if (operationCfg!==undefined){
								processButton(settings.toolbar['btn'+buttonId.capitalize()], jQuery.proxy(operationCfg.enabled, $self)());
							}
						}
					});

				},
				'rupTable_internalFeedbackClose': function(){
					var $self = jQuery(this), settings = $self.data('settings');
					$self.trigger('rupTable_feedbackClose', settings.$internalFeedback);
					// if ($self.rup_jqtable('isPluginLoaded', 'feedback')){
					// 	settings.$internalFeedback.rup_feedback('close');
					// }
				}
			});

		}
	});


	//*******************************************************
	// DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
	//*******************************************************


	/**
	* @description Propiedades de configuración del plugin toolbar del componente RUP Table.
	*
	* @name options
	*
	* @property {string} [id] - En caso de que se vaya a utilizar un identificador diferente al esperado por defecto, se deberá de indicar mediante esta propiedad.
	* @property {boolean} [createDefaultToolButtons=true] - Determina (true/false) si se deben visualizar los botones correspondientes a las operaciones por defecto del componente.
	* @property {object} [showOperations] - Permite indicar que operaciones definidas de manera global van a ser mostradas como botones. Cada operación puede tomar uno de los siguientes valores:  true: Valor por defecto. Se mostrará la operación como opción en la botonera.  true: Valor por defecto. Se mostrará la operación como opción en la  false: La operación no se mostrará como opción en la botonera.
	* @property {object} [deleteOptions] - Propiedades de configuración de la acción de borrado de un registro.
	* @property {object} [buttons] - Permite definir nuevos botones que se mostrarán en la toolbar. Los nuevos botones se especificarán del mismo modo que se describe en el componente rup_toolbar.
	*/
	jQuery.fn.rup_jqtable.plugins.toolbar = {};
	jQuery.fn.rup_jqtable.plugins.toolbar.defaults = {
		toolbar:{
			id: null,
			autoAjustToolbar: true,
			createDefaultToolButtons: true,
			defaultAdd : true,
			defaultEdit : true,
			defaultSave : true,
			defaultClone : true,
			defaultCancel : true,
			defaultDelete : true,
			defaultFilter : false,
			defaultButtons:{},
			showOperations:{},
			width: 796
		}
	};


	/* ********* */
	/* EVENTOS
  /* ********* */

	/**
	*  Evento que se lanza cuando se cierra el feedback.
	*
	* @event module:rup_jqtable#rupTable_feedbackClose
	* @property {Event} event - Objeto Event correspondiente al evento disparado.
	* @property {object} $feedback - Referencia jQuery al feedback interno.
	* @example
	* $("#idComponente").on("rupTable_feedbackClose", function(event, $internalFeedback){ });
	*/



})(jQuery);

/*!
 * Copyright 2013 E.J.I.E., S.A.
 *
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
 */

/*global jQuery */

/**
 * Permite configurar un área para informar al usuario de cómo interactuar con el componente. Mediante el componente feedback se mostraran al usuario mensajes de confirmación, avisos y errores que faciliten y mejoren la interacción del usuario con la aplicación.
 *
 * @summary Plugin de feedback del componente RUP Table.
 * @module rup_jqtable/feedback
 * @example
 *
 * $("#idComponente").rup_jqtable({
 * 	url: "../jqGridUsuario",
 *	usePlugins:["feedback"],
 * 	feedback:{
 * 		// Propiedades de configuración del plugin feedback
 * 	}
 * });
 */
(function ($) {

	/**
	 * Definición de los métodos principales que configuran la inicialización del plugin.
	 *
	 * preConfiguration: Método que se ejecuta antes de la invocación del componente jqGrid.
	 * postConfiguration: Método que se ejecuta después de la invocación del componente jqGrid.
	 *
	 */
	jQuery.rup_jqtable.registerPlugin('feedback',{
		loadOrder:2,
		preConfiguration: function(settings){
			var $self = this;
			return $self.rup_jqtable('preConfigureFeedback', settings);
		},
		postConfiguration: function(settings){
			var $self = this;
			return $self.rup_jqtable('postConfigureFeedback', settings);
		}
	});

	//********************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	//********************************

	/**
	 * Extensión del componente rup_jqtable para permitir la gestión de la botonera asociada a la tabla.
	 *
	 * Los métodos implementados son:
	 *
	 * preConfigureFeedback(settings): Método que define la preconfiguración necesaria para el correcto funcionamiento del componente.
	 * postConfigureFeedback(settings): Método que define la postconfiguración necesaria para el correcto funcionamiento del componente.
	 *
	 * settings.$feedback : Referencia al componente feedback.
	 * settings.$$internalFeedback : Referencia al feedback interno.
	 *
	 */


	jQuery.fn.rup_jqtable('extend',{
		/*
		 * Método que define la preconfiguración necesaria para el correcto funcionamiento del componente.
		 *
		 * TODO: internacionalizar mensajes de error.
		 */
		/**
			* Metodo que realiza la pre-configuración del plugin feedback del componente RUP Table.
			* Este método se ejecuta antes de la incialización del plugin.
			*
			* @name preConfigureFeedback
			* @function
			* @param {object} settings - Parámetros de configuración del componente.
			*/
		preConfigureFeedback: function(settings){
			var $self = this, feedbackId, feedbackSettings = settings.feedback, $feedback;

			/*
			 * Inicialización de los identificadores por defecto de los componentes del toolbar
			 */
			feedbackSettings.id = feedbackSettings.id!==null?feedbackSettings.id:settings.id+'_feedback';

			feedbackId = (feedbackSettings.id[0]==='#'?feedbackSettings.id:'#'+feedbackSettings.id);
			$feedback = jQuery(feedbackId);
			if ($feedback.length === 0){
				alert('El identificador especificado para el feedback no existe.');
			}else{
				settings.$feedback = $feedback;
				settings.$feedback.rup_feedback(feedbackSettings.config).attr('ruptype','feedback');
			}

			if (!jQuery.isFunction(settings.loadError)){
				settings.loadError = function(xhr){
					$self.rup_jqtable('showFeedback', settings.$feedback, xhr.responseText, 'error');
				};
			}

			/*
       * Definición del método serializeGridData para que añada al postData la información relativa a la multiseleccion.
       */
			$self.on({
				'rupTable_feedbackClose': function (events, $feedback) {
					$($feedback).rup_feedback('close');
				},
				'rupTable_feedbackShow': function (events, $feedback, msg, type, options){
					$self.rup_jqtable('showFeedback', $($feedback), msg, type, options);
				}
			});

		},
		/**
		 * Metodo que realiza la post-configuración del plugin feedback del componente RUP Table.
		 * Este método se ejecuta después de la incialización del plugin.
		 *
		 * @name postConfigureFeedback
		 * @function
		 * @param {object} settings - Parámetros de configuración del componente.
		 */
		postConfigureFeedback: function(settings){
			// Definición del feedback interno
			settings.$internalFeedback = $('<div></div>').attr('id', 'rup_feedback_' + settings.id).insertBefore('#gbox_' + settings.id);
			settings.$internalFeedback.rup_feedback(settings.feedback.internalFeedbackConfig);
		}
	});


	jQuery.fn.rup_jqtable('extend',{

		/**
     * Muestra el feedback indicado con la configuración especificada.
     *
     * @function  showFeedback
     * @param {object} $feedback - Objeto jQuery que referencia al componente feedback.
     * @param {string} msg - : Mensaje a mostrar en el feedback.
		 * @param {string} type -  Clase de feedback a mostrar.
		 * @param {object} options - Propiedades de configuración del feedback
     * @example
     * $("#idTable").rup_jqtable("showFeedback", $("#idFeedback"), "Texto...", "ok"), {};
     */
		showFeedback: function($feedback, msg, type, options){
			var $self = this, settings = $self.data('settings'), options_backup, default_options;

			if (options === false){
				// Muestra el feedback con las opciones con las que se ha creado
				$feedback.rup_feedback('set', msg, type);
			}else if (jQuery.isPlainObject(options)){
				// Se aplicam las opciones de configuración indicadas sin modificar las del feedback

				$feedback.rup_feedback('option', options);
				$feedback.rup_feedback('set', msg, type);

			}else{
				// Se utilizan las opciones de configuración por defecto del componente jqtable
				default_options = (settings.feedback[type+'FeedbackConfig']!==undefined?settings.feedback[type+'FeedbackConfig']:settings.feedback.okFeedbackConfig);
				$feedback.rup_feedback('option', default_options);
				$feedback.rup_feedback('set', msg, type);
			}
		}
	});


	//*******************************************************
	// DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
	//*******************************************************


	/**
	 * Parámetros de configuración por defecto para el feedback.
	 *
	 * feedback.config: Configuración por defecto del feedback principal.
	 * feedback.internalFeedbackConfig: Configuración por defecto del feedback interno.
	 */
	/**
	* @description Propiedades de configuración del plugin feedback del componente RUP Table.
	*
	* @name options
	*
	* @property {string} [id=null] - Nombre del identificador a utilizar en el feedback. Se utiliza en caso de no querer utilizar el por defecto.
	* @property {object} [config] - Determina la configuración por defecto del feedback.
	* @property {object} [okFeedbackConfig] - Determina la configuración por defecto del feedback en los casos de mensajes tipo .
	* @property {object} [errorFeedbackConfig] - Determina la configuración por defecto del feedback en los casos de mensajes tipo ERROR.
	* @property {object} [alertFeedbackConfig] - Determina la configuración por defecto del feedback en los casos de mensajes tipo ALERT.
	* @property {object} [internalFeedbackConfig] - Determina la configuración por defecto del feedback interno de la tabla.
	*/
	jQuery.fn.rup_jqtable.plugins.feedback = {};
	jQuery.fn.rup_jqtable.plugins.feedback.defaults = {
		loadError : function(xhr,st,err){
			var $self = $(this), settings = $self.data('settings');
			$self.rup_jqtable('showFeedback', settings.$feedback, xhr.responseText, 'error');
		},
		feedback:{
			okFeedbackConfig:{
				closeLink: true,
				gotoTop: false,
				delay:1000
			},
			errorFeedbackConfig:{
				closeLink: true,
				gotoTop: false,
				delay:null
			},
			alertFeedbackConfig:{
				closeLink: true,
				gotoTop: false,
				delay:null
			},
			id: null,
			config:{
				type: 'ok',
				closeLink: true,
				gotoTop: false,
				block: true
			},
			internalFeedbackConfig:{
				type: 'ok',
				closeLink: true,
				gotoTop: false,
				block: false
			}
		}
	};

})(jQuery);

/*!
 * Copyright 2013 E.J.I.E., S.A.
 *
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
 */

/*global jQuery */

/**
 * Aplica al componente un diseño líquido de modo que se adapte al ancho de la capa en la que está contenido.
 *
 * @summary Plugin de filtrado múltiple del componente RUP Table.
 * @module rup_jqtable/fluid
 * @deprecated
 * @example
 *
 * $("#idComponente").rup_jqtable({
 * 	url: "../jqGridUsuario",
 * 	usePlugins:["fuild"],
 * 	fuild:{
 * 		// Propiedades de configuración del plugin fuild
 * 	}
 * });
 */
(function ($) {

	/**
	 * Definición de los métodos principales que configuran la inicialización del plugin.
	 *
	 * postConfiguration: Método que se ejecuta después de la invocación del componente jqGrid.
	 *
	 */
	jQuery.rup_jqtable.registerPlugin('fluid',{
		loadOrder:5,
		postConfiguration: function(settings){
			var $self = this;
			return $self.rup_jqtable('postConfigureFluid', settings);
		}
	});

	//********************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	//********************************

	/**
	 * Extensión del componente rup_jqtable para permitir la gestión del diseño líquido del componente.
	 *
	 * Los métodos implementados son:
	 *
	 * postConfigureFilter(settings): Método que define la preconfiguración necesaria para el correcto funcionamiento del componente.
	 *
	 * Se almacena la referencia de los diferentes componentes:
	 *
	 * settings.$fluidBaseLayer : Referencia a la capa que se tomará como base para aplicar el diseño líquido.
	 *
	 */
	jQuery.fn.rup_jqtable('extend',{
		/*
		 * Realiza la configuración interna necesaria para la gestión correcta de la edición mediante un formulario.
		 *
		 * TODO: internacionalizar mensajes de error.
		 */
		/**
		* Metodo que realiza la post-configuración del plugin fuild del componente RUP Table.
		* Este método se ejecuta antes de la incialización del plugin.
		*
		* @name postConfigureFluid
		* @function
		* @param {object} settings - Parámetros de configuración del componente.
		*/
		postConfigureFluid: function(settings){
			var $self = this, $fluidBaseLayer;

			settings.fluid.baseLayer = $.rup_utils.getJQueryId(settings.fluid.baseLayer!==null?settings.fluid.baseLayer:settings.id+'_div');
			settings.fluid.$baseLayer = jQuery(settings.fluid.baseLayer);
			if (settings.fluid.$baseLayer.length===0){
				alert('El identificador '+settings.baseLayer+' especificado para la capa sobre la que se va a aplicar el diseño líquido no existe.');
				return;
			}

			$fluidBaseLayer = settings.fluid.fluidBaseLayer = settings.fluid.$baseLayer;

			// Tratamiento del evento de redimiensionado del diseño líquido de la tabla
			$self.bind('fluidWidth.resize', function(event, previousWidth, currentWidth){
				if ($self.is(':visible')){
					var feedBackPaddingLeft, feedBackPaddingRight, toolbarPaddingLeft, toolbarPaddingRight;
					$self.setGridWidth(currentWidth);

					// Se redimensionan las capas contenidas en el mantenimiento
					$fluidBaseLayer.children().width(currentWidth);
					//						prop.searchForm.parent().width(currentWidth+3)
					// Se redimensiona el feedback
					if (settings.$feedback){
						feedBackPaddingLeft = parseInt(settings.$feedback.css('padding-left'));
						feedBackPaddingRight = parseInt(settings.$feedback.css('padding-right'));
						settings.$feedback.width(currentWidth - (feedBackPaddingLeft+feedBackPaddingRight));
					}

					// Se redimensiona la toolbar
					if (settings.$toolbar){
						toolbarPaddingLeft = parseInt(settings.$toolbar.css('padding-left'));
						toolbarPaddingRight = parseInt(settings.$toolbar.css('padding-right'));
						settings.$toolbar.width(currentWidth - (toolbarPaddingLeft+toolbarPaddingRight));
						settings.$toolbar.css('width', currentWidth - (toolbarPaddingLeft+toolbarPaddingRight));
					}
				}
			});

			//			$self.fluidWidth({
			//				fluidBaseLayer:settings.fluid.baseLayer,
			//				minWidth: 100,
			//				maxWidth: 2000,
			//				fluidOffset : 0
			//			});

			$self.fluidWidth(settings.fluid);

			$self.on('rupTable_fluidUpdate', function(event){
				$self.fluidWidth(settings.fluid);
			});

		}
	});


	//*******************************************************
	// DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
	//*******************************************************


	/**
	 * Parámetros de configuración por defecto para el plugin fluid.
	 *
	 */
	/**
 	* @description Propiedades de configuración del plugin multifilter del componente RUP Table.
 	*
 	* @name options
 	*
 	* @property {string} [baseLayer] - Identificador de la capa que contiene al componente. Se tomará como base para redimensionar las diferentes partes de la tabla. En caso de no indicarse se tomará por defecto una generada con el patrón identificadorTabla+”_div”.
 	* @property {integer} [minWidth=100] - Determina la anchura máxima a la que se va a redimensionar la capa.
 	* @property {integer} [maxWidth=2000] -  Determina la anchura mínima a la que se va a redimensionar la capa.
 	* @property {integer} [fluidOffset=0] - Desplazamiento que se aplica a la capa redimensionada.
 	*/
	jQuery.fn.rup_jqtable.plugins.fluid = {};
	jQuery.fn.rup_jqtable.plugins.fluid.defaults = {
		fluid:{
			baseLayer:null,
			minWidth: 100,
			maxWidth: 2000,
			fluidOffset : 0
		}
	};


})(jQuery);

/*!
 * Copyright 2013 E.J.I.E., S.A.
 *
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
 */

/*global jQuery */

/**
 * Permite la edición de los registros de la tabla utilizando un formulario de detalle. El formulario se muestra dentro de un diálogo y ofrece las siguientes funcionalidades:
 * - Añadir un nuevo registro o modificar uno ya existente.
 * - Cancelar la inserción o edición de un registro.
 * - Navegar entre los registros mostrados en la tabla para permitir operar de manera mas ágil sobre losdiferentes elementos.
 *
 * @summary Plugin de edición en formulario del componente RUP Table.
 * @module rup_jqtable/formEdit
 * @example
 *
 * $("#idComponente").rup_jqtable({
 * 	url: "../jqGridUsuario",
 * 	usePlugins:["formEdit"],
 * 	formEdit:{
 * 		// Propiedades de configuración del plugin formEdit
 * 	}
 * });
 */
(function ($) {

	/**
     * Definición de los métodos principales que configuran la inicialización del plugin.
     *
     * preConfiguration: Método que se ejecuta antes de la invocación del componente jqGrid.
     * postConfiguration: Método que se ejecuta después de la invocación del componente jqGrid.
     *
     */
	jQuery.rup_jqtable.registerPlugin('formEdit', {
		loadOrder: 6,
		preConfiguration: function (settings) {
			var $self = this;

			return $self.rup_jqtable('preConfigureFormEdit', settings);
		},
		postConfiguration: function (settings) {
			var $self = this;

			return $self.rup_jqtable('postConfigureFormEdit', settings);
		}
	});

	//********************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	//********************************

	/**
     * Extensión del componente rup_jqtable para permitir la edición de los registros mediante un formulario.
     *
     * Los métodos implementados son:
     *
     * preConfigureFormEdit(settings): Método que define la preconfiguración necesaria para el correcto funcionamiento del componente.
     * postConfigureFormEdit(settings): Método que define la postconfiguración necesaria para el correcto funcionamiento del componente.
     *
     * Las propiedades de esta extensión almacenadas en el settings son las siguientes:
     *
     * settings.formEdit.$detailForm : Referencia al formulario de detalle mediante el que se realizan las modificaciones e inserciones de registros.
     * settings.formEdit.$detailFormDiv : Referencia al div que arropa el formulario de detalle y sobre el que se inicializa el componente rup_dialog.
     *
     */
	jQuery.fn.rup_jqtable('extend', {
		/**
		* Metodo que realiza la pre-configuración del plugin formEdit del componente RUP Table.
		* Este método se ejecuta antes de la incialización del plugin.
		*
		* @name preConfigureFormEdit
		* @function
		* @param {object} settings - Parámetros de configuración del componente.
		*/
		preConfigureFormEdit: function (settings) {
			var $self = this,
				self = this[0],
				colModel = settings.colModel, colModelObj;


			settings.formEdit.navigationBarId = settings.formEdit.navigationBarId !== undefined ? settings.formEdit.navigationBarId : settings.id + '_detail_navigation';
			settings.formEdit.saveButtonId = settings.formEdit.saveButtonId !== undefined ? settings.formEdit.saveButtonId : settings.id + '_detail_button_save';
			settings.formEdit.saveRepeatButtonId = settings.formEdit.saveRepeatButtonId !== undefined ? settings.formEdit.saveRepeatButtonId : settings.id + '_detail_button_save_repeat';
			settings.formEdit.cancelButtonId = settings.formEdit.cancelButtonId !== undefined ? settings.formEdit.cancelButtonId : settings.id + '_detail_button_cancel';
			settings.formEdit.feedbackId = settings.formEdit.feedbackId !== undefined ? settings.formEdit.feedbackId : settings.id + '_detail_feedback';

			settings.formEdit.$navigationBar = jQuery('#' + settings.formEdit.navigationBarId);
			settings.formEdit.$saveButton = jQuery('#' + settings.formEdit.saveButtonId);
			settings.formEdit.$saveRepeatButton = jQuery('#' + settings.formEdit.saveRepeatButtonId);
			settings.formEdit.$cancelButton = jQuery('#' + settings.formEdit.cancelButtonId);
			settings.formEdit.$feedback = jQuery('#' + settings.formEdit.feedbackId);


			/*
             * Inicialización de propiedades del componente para simplificar su configuración
             */
			// En caso de no especificarse una url para la edición de un elemento, se utiliza por defecto la indicada en la propiedad url.
			if (settings.formEdit.editurl === undefined) {
				settings.formEdit.editurl = settings.baseUrl;
				settings.formEdit.editOptions.ajaxEditOptions.url = settings.baseUrl;
				settings.formEdit.addOptions.ajaxEditOptions.url = settings.baseUrl;
			}


			if (settings.formEdit.detailOptions.ajaxDetailOptions.url === undefined) {
				settings.formEdit.detailOptions.ajaxDetailOptions.url = settings.baseUrl;
			}


			settings.ondblClickRow = function (rowid, iRow, iCol, e) {
				$self.rup_jqtable('editElement', rowid);
				return false;
			};


			settings.formEdit.deleteOptions.ajaxDelOptions = jQuery.extend(true, settings.formEdit.deleteOptions.ajaxDelOptions, {
				success: function (data, st, xhr) {
					$self.triggerHandler('rupTableAfterDelete', [data, st, xhr]);
					$self.rup_jqtable('showFeedback', settings.$feedback, $.rup.i18nParse($.rup.i18n.base, 'rup_jqtable.deletedOK'), 'ok');
				}
			});

			// Se comprueba si se ha especificado un formulario propio por parte del usuario.
			if (settings.formEdit.detailForm === undefined) {
				for (var i = 0; i < colModel.length; i++) {
					colModelObj = colModel[i];
					colModelObj.id = 'detailForm_' + settings.id + '_' + colModelObj.name.replace(/[.]/g, '_');
				}
			}

			/* DEFINICION DE OPERACIONES BASICAS CON LOS REGISTROS */

			settings.core.defaultOperations = {
				'add': {
					name: $.rup.i18nParse($.rup.i18n.base, 'rup_jqtable.new'),
					icon: self._ADAPTER.CONST.core.operations.defaultOperations.add.icon,
					enabled: function () {
						return true;
					},
					callback: function (key, options) {
						$self.rup_jqtable('newElement');
					}
				},
				'edit': {
					name: $.rup.i18nParse($.rup.i18n.base, 'rup_jqtable.modify'),
					icon: self._ADAPTER.CONST.core.operations.defaultOperations.edit.icon,
					enabled: function () {
						var $self = this,
							settings = $self.data('settings');
						return jQuery.proxy(settings.fncHasSelectedElements, $self)();
					},
					callback: function (key, options) {
						$self.rup_jqtable('editElement');
					}
				},
				//				"save": {
				//					name: "Guardar",
				//					icon: "save",
				//					enabled: function(){
				//						return false;
				//					}},
				//					callback: function(key, options){
				//						$self.rup_jqtable("newElement");
				//					}},
				'clone': {
					name: $.rup.i18nParse($.rup.i18n.base, 'rup_jqtable.clone'),
					icon: self._ADAPTER.CONST.core.operations.defaultOperations.clone.icon,
					enabled: function () {
						return jQuery.proxy(settings.fncHasSelectedElements, $self)();
					},
					callback: function (key, options) {
						$self.rup_jqtable('cloneElement');
					}
				},
				//				"cancel": {
				//					name: "Cancel",
				//					icon: "cancel",
				//					enabled: function(){
				//						return false;
				//					}},
				'delete': {
					name: $.rup.i18nParse($.rup.i18n.base, 'rup_jqtable.delete'),
					icon: self._ADAPTER.CONST.core.operations.defaultOperations['delete'].icon,
					enabled: function () {
						var $self = this,
							settings = $self.data('settings');
						return jQuery.proxy(settings.fncHasSelectedElements, $self)();
					},
					callback: function (key, options) {
						$self.rup_jqtable('deleteElement');
					}
				}
			};

			$.extend(true, settings.core.operations, settings.core.defaultOperations);

			// Configuración de edit/add
			settings.formEdit.addOptions = $.extend(true, {}, settings.formEdit.addEditOptions, settings.formEdit.addOptions);
			settings.formEdit.editOptions = $.extend(true, {}, settings.formEdit.addEditOptions, settings.formEdit.editOptions);
		},
		
		/**
	 * Metodo que realiza la post-configuración del plugin formEdit del componente RUP Table.
	 * Este método se ejecuta antes de la incialización del plugin.
	 *
	 * @name postConfigureFormEdit
	 * @function
	 * @param {object} settings - Parámetros de configuración del componente.
	 */
		postConfigureFormEdit: function (settings) {
			var $self = this,
				$objDetailForm;

			// Se comprueba si se ha especificado un formulario propio por parte del usuario.
			if (settings.formEdit.detailForm) {
				// Se comprueba que el identificador especificado para el diálogo sea válido
				if (jQuery(settings.formEdit.detailForm).length === 0) {
					alert('El identificador especificado para el fomulario de detalle no existe.');
				} else {
					$objDetailForm = $(settings.formEdit.detailForm);
					if ($objDetailForm.is('form')) {
						if ($objDetailForm.parent().is('div')) {
							settings.formEdit.$detailFormDiv = $objDetailForm.parent();
							settings.formEdit.$detailForm = $objDetailForm;
						} else {
							alert('El formulario no está incluido dentro de un div');
						}
					} else if ($objDetailForm.is('div')) {
						var $objFormAux = $objDetailForm.find('form');
						if ($objFormAux.length === 1) {
							settings.formEdit.$detailFormDiv = $objDetailForm;
							settings.formEdit.$detailForm = $objFormAux;
						} else {
							alert('El div indicado no contiene un único formulario');
						}
					}

					// Inicialización del componente rup_form sobre del formulario de detalle
					settings.formEdit.$detailForm.rup_form(settings.formEdit.editOptions);
					settings.formEdit.ownFormEdit = true;
				}
			}
			//			else{
			// No se configura un formulario de detalle
			var beforeSendUserEvent = settings.beforeSend;
			var defaultBeforeSend = function (jqXHR, ajaxOptions) {
				ajaxOptions.beforeSend = beforeSendUserEvent;
				ajaxOptions.validate = settings.formEdit.validate;
				ajaxOptions.feedback = settings.$detailFeedback;
				// Se elimina el valor de la propiedad contentType para que la gestione automáticamente el componente rup.form
				delete ajaxOptions.contentType;
				if (jQuery.isPlainObject(ajaxOptions.data) && settings.masterDetail === undefined) {
					ajaxOptions.data = $.rup_utils.unnestjson(ajaxOptions.data);
				}
				ajaxOptions.beforeSubmit = function (a, $form, options) {
					var hasFileInputs = jQuery('input:file', $form).length > 0;
					if ((!$.rup.browser.xhrFileUploadSupport && hasFileInputs) || options.iframe === true) {
						options.extraData = {};
					}
					// TODO : Comprobar si se puede elimianr el delete
					a = undefined;
					//delete a;
				};
				ajaxOptions.propperFormSerialization = false;
				settings.formEdit.$detailForm.rup_form('ajaxSubmit', ajaxOptions);
				rp_ge[settings.id].processing = false;
				return false;
			};

			settings.formEdit.editOptions.ajaxEditOptions.beforeSend = defaultBeforeSend;
			settings.formEdit.addOptions.ajaxEditOptions.beforeSend = defaultBeforeSend;
			//			}

			settings.getDetailTotalRowCount = function () {
				var $self = this;
				return $self.rup_jqtable('getGridParam', 'records');
			};

			settings.getDetailCurrentRowCount = function () {
				var $self = this,
					page, rowNum, rowId, rowsPerPage, cont;

				// Obtenemos la pagina actual
				page = parseInt($self.rup_jqtable('getGridParam', 'page'), 10);
				// Obtenemos el identificador del registro seleccionado
				rowId = $self.rup_jqtable('getGridParam', 'selrow');
				// Obtenemos el numero de linea
				//				rowNum = $self.jqGrid("getInd", rowId);
				rowNum = jQuery.inArray(rowId, jQuery.proxy(jQuery.jgrid.getCurrPos, $self[0])()[1]) + 1;
				// Numero de registros por pagina que se visualizan
				rowsPerPage = parseInt($self.rup_jqtable('getGridParam', 'rowNum'), 10);
				// Flag de todos los registros seleccionados
				cont = (page * rowsPerPage) - rowsPerPage + rowNum;

				return cont;
			};



			settings.getRowForEditing = function () {
				var $self = this,
					selrow = $self.jqGrid('getGridParam', 'selrow');

				return (selrow === null ? false : selrow);
			};

			settings.fncHasSelectedElements = function () {
				var $self = this;
				return jQuery.proxy(settings.getRowForEditing, $self)() !== false;
			};

			settings.fncGetNavigationParams = function getNavigationParams(linkType) {
				var $self = this,
					execute = false,
					changePage = false,
					index = 0,
					newPage = 0,
					newPageIndex = 0,
					npos = jQuery.proxy(jQuery.jgrid.getCurrPos, $self[0])(),
					page = parseInt($self.rup_jqtable('getGridParam', 'page'), 10),
					rowsPerPage = parseInt($self.rup_jqtable('getGridParam', 'rowNum'), 10),
					lastPage = parseInt(Math.ceil($self.rup_jqtable('getGridParam', 'records') / $self.rup_jqtable('getGridParam', 'rowNum')), 10);

				npos[0] = parseInt(npos[0], 10);

				switch (linkType) {
				case 'first':
					if (!(page === 1 && npos[0] === 0)) {
						execute = true;
						index = 0;
						if (page > 1) {
							changePage = true;
							newPage = 1;
							newPageIndex = 0;
						}
					}
					break;
				case 'prev':
					if (!(page === 1 && npos[0] === 0)) {
						execute = true;
						index = npos[0] - 1;
						if (index < 0) {
							changePage = true;
							newPage = page - 1;
							newPageIndex = rowsPerPage;
						}
					}
					break;
				case 'next':
					if (!(page === lastPage && npos[0] === npos[1].length - 1)) {
						execute = true;
						index = npos[0] + 1;
						if (index > npos[1].length - 1) {
							changePage = true;
							newPage = page + 1;
							newPageIndex = 0;
						}
					}
					break;
				case 'last':
					if (!(page === lastPage && npos[0] === npos[1].length - 1)) {
						execute = true;
						index = npos[1].length - 1;
						if (page < lastPage) {
							changePage = true;
							newPage = lastPage;
							newPageIndex = rowsPerPage;
						}
					}
					break;
				}

				return [linkType, execute, changePage, index, npos, newPage, newPageIndex];
			};

			settings.doNavigation = function (arrParams, execute, changePage, index, npos, newPage, newPageIndex) {
				var $self = this,
					settings = $self.data('settings'),
					props = rp_ge[$self.attr('id')],
					linkType, execute, changePage, index, npos, newPage, newPageIndex;

				if ($.isArray(arrParams)) {
					linkType = arrParams[0];
					execute = arrParams[1];
					changePage = arrParams[2];
					index = arrParams[3];
					npos = arrParams[4];
					newPage = arrParams[5];
					newPageIndex = arrParams[6];

					if (execute) {
						$self.rup_jqtable('hideFormErrors', settings.formEdit.$detailForm);
						$self.triggerHandler('jqGridAddEditClickPgButtons', [linkType, settings.formEdit.$detailForm, npos[1][npos[index]]]);
						if (changePage) {
							$self.trigger('reloadGrid', [{
								page: newPage
							}]);
							$self.on('jqGridAfterLoadComplete.pagination', function (event, data) {
								var nextPagePos = jQuery.proxy(jQuery.jgrid.getCurrPos, $self[0])(),
									newIndexPos = (newPageIndex < nextPagePos[1].length ? newPageIndex : nextPagePos[1].length - 1);
								$self.jqGrid('setSelection', nextPagePos[1][newIndexPos]);
								jQuery.proxy(jQuery.jgrid.fillData, $self[0])(nextPagePos[1][newIndexPos], $self[0], settings.formEdit.$detailForm.attr('id'), settings.opermode);
								jQuery.proxy(jQuery.jgrid.updateNav, $self[0])(nextPagePos[1][newIndexPos], npos[1].length - 1);
								$self.off('jqGridAfterLoadComplete.pagination');
							});
						} else {
							jQuery.proxy(jQuery.jgrid.fillData, $self[0])(npos[1][index], $self[0], settings.formEdit.$detailForm.attr('id'), settings.opermode);
							$self.jqGrid('setSelection', npos[1][index]);
							jQuery.proxy(jQuery.jgrid.updateNav, $self[0])(npos[1][index], npos[1].length - 1);
						}
						$self.triggerHandler('jqGridAddEditAfterClickPgButtons', [linkType, settings.formEdit.$detailForm, npos[1][npos[index]]]);
						if (jQuery.isFunction(props.afterclickPgButtons)) {
							props.afterclickPgButtons.call($self, 'next', settings.formEdit.$detailForm, npos[1][npos[index]]);
						}
					}
				}
			};


			// Campturador del evento jqGridInlineAfterSaveRow.
			$self.on({
				'jqGridLoadComplete.rupTable.formEditing': function (data) {
					var $self = $(this),
						settings = $self.data('settings'),
						nPos;

					if (settings.formEdit.autoselectFirstRecord) {
						nPos = jQuery.proxy(jQuery.jgrid.getCurrPos, $self[0])();
						$self.jqGrid('setSelection', nPos[1][0], false);
					}

				},
				'jqGridAddEditInitializeForm.rupTable.formEditing': function (event, $form, modo) {

					/*
                     * Creación de los componentes rup
                     */
					var $self = $(this),
						settings = $self.data('settings'),
						colModel = settings.colModel;

					if (settings.formEdit.ownFormEdit === false) {
						jQuery.each(colModel, function (index, colObj) {
							if (colObj.rupType) {

								if (colObj.editoptions && colObj.editoptions.i18nId === undefined) {
									colObj.editoptions.i18nId = $self.attr('id') + '##' + this.name;
								}

								$('#' + (colObj.id !== null ? colObj.id : name), $form)['rup_' + colObj.rupType](colObj.editoptions);
							}
						});
					}

					//Se crea el toolbar de error mediante un componente rup_tooltip
					settings.$detailFeedback = settings.formEdit.$feedback.rup_feedback({
						closeLink: true,
						gotoTop: false,
						block: false,
						fadeSpeed: 500
						//						delay: 1000,
					}).attr('ruptype', 'feedback');
				},
				'jqGridAddEditAfterSubmit.rupTable.formEditing': function (event, res, postData, oper) {
					// Una vez se haya realizado el guardado del registro se muestra el mensaje correspondiente en el feedback dependiendo del modo en el que se encuentra.
					var settings = $self.data('settings'),
						formEditSaveType = $self.data('tmp.formEditSaveType'),
						id, compositeId = '',
						$fieldRupCombo, labelProperty = null, responseJson;
					$self.removeData('tmp.formEditSaveType');

					// Tratamiento concreto para los componentes RUP
					// Combo
					jQuery.each(settings.colModel, function (i, elem) {
						if (elem.rupType === 'combo') {
							$fieldRupCombo = jQuery('[name=\'' + elem.name + '\']', settings.$detailForm);

							if (elem.editoptions.labelProperty !== undefined) {
								labelProperty = elem.editoptions.labelProperty;
							} else if (elem.editoptions.sourceParam !== undefined) {
								labelProperty = elem.name.substring(0, elem.name.lastIndexOf('.') + 1) + elem.editoptions.sourceParam.label;
							}

							if (labelProperty !== null) {
								postData[labelProperty] = $fieldRupCombo.rup_combo('label');
							}
						}
					});




					// Dependiendo del boton de guardado seleccionado se realiza el comportamiento correspondiente
					if (formEditSaveType === 'SAVE') {
						if (oper === 'edit') {
							$self.rup_jqtable('showFeedback', settings.$feedback, $.rup.i18nParse($.rup.i18n.base, 'rup_jqtable.modifyOK'), 'ok');
						} else {
							$self.rup_jqtable('showFeedback', settings.$feedback, $.rup.i18nParse($.rup.i18n.base, 'rup_jqtable.insertOK'), 'ok');
						}
						settings.formEdit.$detailFormDiv.rup_dialog('close');
					} else if (formEditSaveType === 'SAVE_REPEAT') {
						if (oper === 'edit') {
							$self.rup_jqtable('showFeedback', settings.$detailFeedback, $.rup.i18nParse($.rup.i18n.base, 'rup_jqtable.modifyOK'), 'ok');
						} else {
							$self.rup_jqtable('showFeedback', settings.$detailFeedback, $.rup.i18nParse($.rup.i18n.base, 'rup_jqtable.insertOK'), 'ok');
						}
					}

					// Se obtiene el json de respuesta
					try {
						responseJson = $.parseJSON(res.responseText);
					} catch (e) {
						responseJson = postData;
					}

					// Tratamiento de la primary key compuesta
					if (settings.primaryKey && typeof settings.primaryKey === 'object' && settings.primaryKey.length > 1) {

						for (var i = 0; i < settings.primaryKey.length; i++) {
							compositeId += responseJson[settings.primaryKey[i]] + settings.multiplePkToken;
						}
						id = compositeId.substr(0, compositeId.length - 1);

					} else {
						id = responseJson[settings.primaryKey ? settings.primaryKey : $self[0].p.prmNames.id];
					}
					return [true, '', id];
				},
				'jqGridAddEditErrorTextFormat.rupTable.formEditing': function (event, data, oper) {
					var responseJSON;
					if (data.status === 406 && data.responseText !== '') {
						try {
							responseJSON = jQuery.parseJSON(data.responseText);
							if (responseJSON.rupErrorFields) {
								$self.rup_jqtable('showServerValidationFieldErrors', settings.formEdit.$detailForm, responseJSON);
							}
						} catch (e) {
							// El mensaje JSON
							$self.rup_jqtable('showFeedback', settings.$detailFeedback, data.responseText, 'error');
						}

					}
				},
				//				 "jqGridDblClickRow.rupTable.formEditing": function (event, rowid, iRow, iCol, e){
				//					$self.rup_jqtable('editElement', rowid);
				//				 },
				'jqGridAddEditBeforeShowForm.rupTable.formEditing': function (event, $detailForm, frmoper) {
					var $self = $(this),
						settings = $self.data('settings'),
						$title = jQuery('#ui-dialog-title-' + settings.formEdit.$detailFormDiv.attr('id'), settings.formEdit.$detailFormDiv.parent()),
						colModel = $self[0].p.colModel;

					// Se ocultan los errores de validación mostrados en el formulario de detalle
					$self.rup_jqtable('hideFormErrors', settings.formEdit.$detailForm);
					if (frmoper === 'add' || frmoper === 'clone' || frmoper === 'clone_clear') {
						$title.text(rp_ge[$self[0].p.id].addCaption);
						$('#pagination_' + settings.id + ',#pag_' + settings.id).hide();
					} else {
						$title.text(rp_ge[$self[0].p.id].editCaption);
						$('#pagination_' + settings.id + ',#pag_' + settings.id).show();
					}
				},
				'jqGridAddEditBeforeShowForm.rupTable.formEditing.readOnlyPks': function (event, $detailForm, frmoper) {
					var $self = $(this),
						settings = $self.data('settings'),
						colModel = $self[0].p.colModel;

					// Controlar los campos editables en modo edición
					for (var i = 0; i < colModel.length; i++) {

						if (settings.formEdit.ownFormEdit !== true || (settings.formEdit.ownFormEdit === true && (jQuery.inArray(colModel[i].name, settings.primaryKey) !== -1))) {
							if (frmoper === 'add' || frmoper === 'clone' || frmoper === 'clone_clear') {
								if (colModel[i].editableOnAdd === false) {
									jQuery('[name=\'' + colModel[i].name + '\']', settings.formEdit.$detailFormDiv).attr('readonly', 'readonly');
								} else {
									jQuery('[name=\'' + colModel[i].name + '\']', settings.formEdit.$detailFormDiv).removeAttr('readonly');
								}
							} else {
								if (colModel[i].editableOnEdit === false) {
									jQuery('[name=\'' + colModel[i].name + '\']', settings.formEdit.$detailFormDiv).attr('readonly', 'readonly');
								} else {
									jQuery('[name=\'' + colModel[i].name + '\']', settings.formEdit.$detailFormDiv).removeAttr('readonly');
								}
							}

						}
					}
				},
				'jqGridAddEditAfterShowForm.rupTable.formEditing': function (event, $detailForm, frmoper) {
					var $self = $(this),
						settings = $self.data('settings');
					// Ubicamos el foco en el primer elemento del formulario
					$self.rup_jqtable('hideFormErrors', settings.formEdit.$detailForm);
					jQuery(':focusable:enabled:not([readonly]):first', $detailForm).focus();
				}
			});
		}
	});


	/**
     * Métodos públicos del plugin formEdit.
     *
     * Los métodos implementados son:
     *
     * createDetailNavigation(settings): Crea la barra de navegación del formulario de detalle.
     * deleteElement(rowId, options): Realiza el borrado de un registro determinado.
     * editElement(rowId, options): Lanza la edición de un registro medainte un formulario de detalle.
     * newElement(): Inicia el proceso de inserción de un nuevo registro.
     *
     * s($form): Oculta los mensaje de error visualizado en el
     *
     */
	jQuery.fn.rup_jqtable('extend', {
		/**
     * Devuelve la template HTML correspondiente a la capa de navegación del fomulario de filtrado.
     *
     * @function  createDetailNavigation
		 * @return {object} - Template correspondiente a la capa de navegación.
     * @example
     * $("#idTable").rup_jqtable("createDetailNavigation");
     */
		createDetailNavigation: function () {
			var $self = $(this);

			return $.proxy($self[0]._ADAPTER.createDetailNavigation, $self)();

		},
		/**
		 * Elimina el registro correspondiente al identificador indicado y utilizando las opciones de borrado especificadas.
		 *
		 * @function  deleteElement
		 * @param {string} rowId - Identificador del registro que se desea eliminar.
		 * @param {object} options - Opciones de configuración de la operación de borrado.
		 * @return {object} - Referencia al propio objecto jQuery.
		 * @fires module:rup_jqtable#rupTable_deleteAfterSubmit
		 * @fires module:rup_jqtable#rupTable_afterDeleteRow
		 * @fires module:rup_jqtable#rupTable_beforeDeleteRow
		 * @example
		 * $("#idComponente").rup_jqtable("deleteElement", rowId, options);
		 */
		deleteElement: function (rowId, options) {
			var $self = this,
				settings = $self.data('settings'),
				deleteOptions = jQuery.extend(true, {}, settings.formEdit.deleteOptions, options),
				selectedRow = (rowId === undefined ? $self.rup_jqtable('getSelectedRows') : rowId);

			// En caso de especificarse el uso del método HTTP DELETE, se anyade el identificador como PathParameter
			if (selectedRow.length === 1) {
				if (deleteOptions.mtype === 'DELETE') {
					deleteOptions.url = settings.formEdit.editurl + '/' + $self.rup_jqtable('getPkUrl', selectedRow);
				}
			} else {
				deleteOptions.mtype = 'POST';
				deleteOptions.ajaxDelOptions.contentType = 'application/json';
				deleteOptions.ajaxDelOptions.type = 'POST';
				deleteOptions.ajaxDelOptions.dataType = 'json';
				deleteOptions.url = settings.formEdit.editurl + '/deleteAll';
				deleteOptions.serializeDelData = function (ts, postData) {
					return jQuery.toJSON({
						'core': {
							'pkToken': settings.multiplePkToken,
							'pkNames': settings.primaryKey
						},
						'multiselection': $self.rup_jqtable('getSelectedIds'),
						'filter': $self.rup_jqtable('getFilterParams')
					});
				};
			}

			deleteOptions.afterSubmit = function () {
				$self.triggerHandler('rupTable_deleteAfterSubmit');
				return true;
			};

			deleteOptions.afterComplete = function () {
				$self.triggerHandler('rupTable_afterDeleteRow');
			};

			if ($self.triggerHandler('rupTable_beforeDeleteRow', [deleteOptions, selectedRow]) !== false) {
				$self.jqGrid('delGridRow', selectedRow, deleteOptions);
			}

			return $self;
		},
		/**
		 * Edita el registro correspondiente al identificador indicado y utilizando las opciones de edición especificadas.
		 *
		 * @function  editElement
		 * @param {string} rowId - Identificador del registro que se desea editar.
		 * @param {object} options - Opciones de configuración de la operación de edición.
		 * @return {object} - Referencia al propio objecto jQuery.
		 * @fires module:rup_jqtable#rupTable_beforeEditRow
		 * @example
		 * $("#idComponente").rup_jqtable("editElement", rowId, options);
		 */
		editElement: function (rowId, options) {
			var $self = this,
				settings = $self.data('settings'),
				//				selectedRow = (rowId===undefined?$self.jqGrid('getGridParam','selrow'):rowId);
				selectedRow = (rowId === undefined ? $.proxy(settings.getRowForEditing, $self)() : rowId),
				colModel = $self[0].p.colModel;

			if (selectedRow !== false) {

				// Controlar los campos editables en modo edición
				for (var i = 0; i < colModel.length; i++) {
					if (colModel[i].editable === true && colModel[i].editableOnEdit === false) {
						if (colModel[i].editoptions === undefined) {
							colModel[i].editoptions = {};
						}
						colModel[i].editoptions.readonly = 'readonly';
					} else {
						if (colModel[i].editoptions !== undefined && colModel[i].editoptions.readonly !== undefined) {
							delete colModel[i].editoptions.readonly;
						}
					}
				}

				if ($self.triggerHandler('rupTable_beforeEditRow', [settings.formEdit.editOptions, selectedRow]) !== false) {
					$self.jqGrid('editGridRow', selectedRow, settings.formEdit.editOptions);
				}
			}

			return $self;
		},
		/**
		 * Muestra el formulario de detalle para permitir al usuario insertar un nuevo registro.
		 *
		 * @function  newElement
		 * @param {boolean} addEvent - Determina si se debe lanzar (true) o no (false) el evento rupTable_beforeAddRow.
		 * @return {object} - Referencia al propio objecto jQuery.
		 * @fires module:rup_jqtable#rupTable_beforeAddRow
		 * @example
		 * $("#idComponente").rup_jqtable("newElement", true);
		 */
		newElement: function (addEvent) {
			var $self = this,
				settings = $self.data('settings'),
				colModel = $self[0].p.colModel,
				eventRet;

			// Controlar los campos editables en modo edición
			for (var i = 0; i < colModel.length; i++) {
				if (colModel[i].editable === true && colModel[i].editableOnAdd !== false) {
					if (colModel[i].editable === true && colModel[i].editableOnAdd === false) {
						if (colModel[i].editoptions === undefined) {
							colModel[i].editoptions = {};
						}
						colModel[i].editoptions.readonly = 'readonly';
					} else {
						if (colModel[i].editoptions !== undefined && colModel[i].editoptions.readonly !== undefined) {
							delete colModel[i].editoptions.readonly;
						}
					}
				}
			}

			if (addEvent === false || (addEvent !== false && $self.triggerHandler('rupTable_beforeAddRow', [settings.formEdit.addOptions]) !== false)) {
				$self.jqGrid('editGridRow', 'new', settings.formEdit.addOptions);
			}

			return $self;
		},
		/**
		 * Clona el registro correspondiente al identificador indicado y utilizando las opciones de clonado especificadas.
		 *
		 * @function  cloneElement
		 * @param {string} rowId - Identificador del registro que se desea clonar.
		 * @param {object} options - Opciones de configuración de la operación de clonado.
		 * @param {boolean} cloneEvent - Determina si se debe lanzar (true) o no (false) el evento rupTable_beforeCloneRow.
		 * @return {object} - Referencia al propio objecto jQuery.
		 * @fires module:rup_jqtable#rupTable_beforeCloneRow
		 * @example
		 * $("#idComponente").rup_jqtable("cloneElement", rowId, options, cloneEvent);
		 */
		cloneElement: function (rowId, options, cloneEvent) {
			var $self = this,
				settings = $self.data('settings'),
				colModel = $self[0].p.colModel,
				selectedRow = (rowId === undefined ? $.proxy(settings.getRowForEditing, $self)() : rowId);

			// Controlar los campos editables en modo edición
			for (var i = 0; i < colModel.length; i++) {
				if (colModel[i].editable === true && colModel[i].editableOnAdd !== false) {
					if (colModel[i].editable === true && colModel[i].editableOnAdd === false) {
						if (colModel[i].editoptions === undefined) {
							colModel[i].editoptions = {};
						}
						colModel[i].editoptions.readonly = 'readonly';
					} else {
						if (colModel[i].editoptions !== undefined && colModel[i].editoptions.readonly !== undefined) {
							delete colModel[i].editoptions.readonly;
						}
					}
				}
			}

			if (cloneEvent === false || (cloneEvent !== false && $self.triggerHandler('rupTable_beforeCloneRow', [settings, selectedRow]) !== false)) {
				$self.jqGrid('editGridRow', 'cloned', settings.formEdit.addOptions);
				jQuery.proxy(jQuery.jgrid.fillData, $self[0])(selectedRow, $self[0], settings.formEdit.$detailForm, 'clone');
				jQuery('#id_g', settings.formEdit.$detailForm).val('_empty');
			}

			return $self;
		},
		/**
		 *  Oculta los mensajes de error del formulario indicado.
		 *
		 * @function  hideFormErrors
		 * @param {object} $form - Formulario del que se desea ocultar los mensajes de error.
		 * @example
		 * $("#idComponente").rup_jqtable("hideFormErrors", $form);
		 */
		hideFormErrors: function ($form) {
			var $self = this,
				settings = $self.data('settings');
			// Ocultamos el feedback de error
			if(settings.formEdit !== undefined && settings.formEdit.$feedback !== undefined){
				settings.formEdit.$feedback.hide();
			}
			if($form !== undefined){
				jQuery('.rup-maint_validateIcon', $form).remove();
				jQuery('input.error', $form).removeClass('error');
	
				if ($form.data('validator')){
					$form.rup_validate('resetElements');
				}
			}

		}
	});


	/**
     * Sobreescrituras del componente jqGrid
     */
	$.extend($.jgrid, {
		createData: function (rowid, obj, tb, maxcols) {
			/*ADD*/
			var $form = tb.parent();
			var $t = this,
				$self = $($t),
				settings = $self.data('settings'),
				nmId, nm, hc, trdata, cnt = 0,
				tmp, dc, elc, retpos = [],
				ind = false,
				// 			tdtmpl = "<td class='CaptionTD'>&#160;</td><td class='DataTD'>&#160;</td>", tmpl="", i;
				/*ADD*/
				tmpl = '<label class=\'CaptionTD\'></label>',
				i;

			for (i = 1; i <= maxcols; i++) {
				tb.append($('<div>')
					.attr('id', 'col_' + parseInt((parseInt(i, 10) || 1) * 2, 10))
					.addClass('floating_left_pad_right')
					.width((100 / maxcols) * 0.95 + '%')
				);
			}
			if (rowid != '_empty') {
				ind = $(obj).jqGrid('getInd', rowid);
			}

			$(obj.p.colModel).each(function (i) {
				nm = this.name;
				nmId = this.id;
				// hidden fields are included in the form
				if (this.editrules && this.editrules.edithidden === true) {
					hc = false;
				} else {
					hc = this.hidden === true ? true : false;
				}
				dc = hc ? 'style=\'display:none\'' : '';
				if (nm !== 'cb' && nm !== 'subgrid' && this.editable === true && nm !== 'rn') {
					if (ind === false) {
						tmp = '';
					} else {
						if (nm == obj.p.ExpandColumn && obj.p.treeGrid === true) {
							tmp = $('td[role=\'gridcell\']:eq(' + i + ')', obj.rows[ind]).text();
						} else {
							try {
								tmp = $.unformat.call(obj, $('td[role=\'gridcell\']:eq(' + i + ')', obj.rows[ind]), {
									rowId: rowid,
									colModel: this
								}, i);
							} catch (_) {
								tmp = (this.edittype && this.edittype == 'textarea') ? $('td[role=\'gridcell\']:eq(' + i + ')', obj.rows[ind]).text() : $('td[role=\'gridcell\']:eq(' + i + ')', obj.rows[ind]).html();
							}
							if (!tmp || tmp == '&nbsp;' || tmp == '&#160;' || (tmp.length == 1 && tmp.charCodeAt(0) == 160)) {
								tmp = '';
							}
						}
					}
					var opt = $.extend({}, this.editoptions || {}, {
							id: nmId,
							name: nm
						}),
						frmopt = $.extend({}, {
							elmprefix: '',
							elmsuffix: '',
							rowabove: false,
							rowcontent: ''
						}, this.formoptions || {}),
						rp = parseInt(frmopt.rowpos, 10) || cnt + 1,
						cp = parseInt((parseInt(frmopt.colpos, 10) || 1) * 2, 10);
					if (rowid == '_empty' && opt.defaultValue) {
						tmp = $.isFunction(opt.defaultValue) ? opt.defaultValue.call($t) : opt.defaultValue;
					}
					if (!this.edittype) {
						this.edittype = 'text';
					}
					if ($t.p.autoencode) {
						tmp = $.jgrid.htmlDecode(tmp);
					}
					elc = $.jgrid.createEl.call($t, this.edittype, opt, tmp, false, $.extend({}, $.jgrid.ajaxOptions, obj.p.ajaxSelectOptions || {}));
					if (tmp === '' && this.edittype == 'checkbox') {
						tmp = $(elc).attr('offval');
					}
					if (tmp === '' && this.edittype == 'select') {
						tmp = $('option:eq(0)', elc).text();
					}
					/* MODIFICADO */
					if (this.edittype === 'custom') {
						elc = $(elc).children()[0];
					}
					$(elc).addClass('FormElement');

					/* TODO : Permitir la personalización de los estilos de los campos de texto */
					//					if( $.inArray(this.edittype, ['text','textarea','password','select']) > -1) {
					//						$(elc).addClass("ui-widget-content ui-corner-all");
					//					}

					trdata = $(tb).find('tr[rowpos=' + rp + ']');
					if (frmopt.rowabove) {
						var newdata = $('<div><span class=\'contentinfo\'>' + frmopt.rowcontent + '</span></div>');
						$(tb).append(newdata);
						newdata[0].rp = rp;
					}
					if (trdata.length === 0) {
						/*MOD trdata = $("<tr "+dc+" rowpos='"+rp+"'></tr>").addClass("FormData").attr("id","tr_"+nm);*/
						trdata = $('<div ' + dc + ' rowpos=\'' + rp + '\'></div>').addClass('FormData floating_left_pad_right one-column').attr('id', 'tr_' + nm);
						/*MOD END */
						$(trdata).append(tmpl);
						$(tb).find('#col_' + cp).append(trdata);
						trdata[0].rp = rp;
					}
					var $formField = $('label', trdata[0]).attr('for', nmId).html(typeof frmopt.label === 'undefined' ? obj.p.colNames[i] : frmopt.label);
					$formField.parent().append(frmopt.elmprefix).append(elc).append(frmopt.elmsuffix);
					retpos[cnt] = i;
					cnt++;
				}
			});
			if (cnt > 0) {
				/*MOD trdata var idrow = $("<tr class='FormData' style='display:none'><td class='CaptionTD'></td><td colspan='"+ (maxcols*2-1)+"' class='DataTD '><input class='FormElement' id='id_g' type='text' name='"+obj.p.id+"_id' value='"+rowid+"'/></td></tr>");*/
				var idrow = $('<div class=\'FormData\' style=\'display:none\'><span class=\'CaptionTD\'></span><span class=\'DataTD \'><input class=\'FormElement\' id=\'id_g\' type=\'text\' name=\'' + obj.p.id + '_id\' value=\'' + rowid + '\'/></span></div>');
				idrow[0].rp = cnt + 999;
				$(tb).append(idrow);
				if (rp_ge[$t.p.id].checkOnSubmit || rp_ge[$t.p.id].checkOnUpdate) {
					rp_ge[$t.p.id]._savedData[obj.p.id + '_id'] = rowid;
				}
			}
			return retpos;
		},
		fillDataClientSide: function (rowid, obj, fmid, frmoper) {
			var $t = this,
				$self = $($t),
				settings = $self.data('settings'),
				gID = $t.p.id,
				frmgr = $.fn.jqGrid.rup.edit.detail.detailFormId + gID,
				frmtborg = $.fn.jqGrid.rup.edit.detail.detailBodyId + gID,
				frmtb = '#' + $.jgrid.jqID(frmtborg),
				nm, id, cnt = 0,
				tmp, fld, opt, vl, vlc;
			if (rp_ge[$t.p.id].checkOnSubmit || rp_ge[$t.p.id].checkOnUpdate) {
				rp_ge[$t.p.id]._savedData = {};
				rp_ge[$t.p.id]._savedData[obj.p.id + '_id'] = rowid;
			}
			var cm = obj.p.colModel;
			if (rowid == '_empty') {
				$self.rup_jqtable('resetForm', settings.formEdit.$detailForm);
				$(cm).each(function () {
					nm = this.name;
					id = this.id !== undefined ? this.id : nm;
					opt = $.extend({}, this.editoptions || {});
					fld = $('#' + $.jgrid.jqID(id), settings.formEdit.$detailForm);

					if (fld.length === 0) {
						fld = $('[name=\'' + id + '\']', settings.formEdit.$detailForm);
					}

					if (fld && fld.length && fld[0] !== null) {
						vl = '';
						if (opt.defaultValue) {
							vl = $.isFunction(opt.defaultValue) ? opt.defaultValue.call($t) : opt.defaultValue;
							if (fld[0].type == 'checkbox' || fld[0].type == 'radio') {
								vlc = vl.toLowerCase();
								if (vlc.search(/(false|0|no|off|undefined)/i) < 0 && vlc !== '') {
									fld[0].checked = true;
									fld[0].defaultChecked = true;
									fld[0].value = vl;
								} else {
									fld[0].checked = false;
									fld[0].defaultChecked = false;
								}
							} else {
								fld.val(vl);
							}
						} else {
							if (fld[0].type == 'checkbox' || fld[0].type == 'radio') {
								fld[0].checked = false;
								fld[0].defaultChecked = false;
								vl = $(fld).attr('offval');
							} else if (fld[0].type && fld[0].type.substr(0, 6) == 'select') {
								if (fld.attr('ruptype') === 'combo') {
									fld.rup_combo('reset');
								} else {
									fld[0].selectedIndex = 0;
								}
							} else {
								fld.val(vl);
							}
						}
						if (rp_ge[$t.p.id].checkOnSubmit === true || rp_ge[$t.p.id].checkOnUpdate) {
							rp_ge[$t.p.id]._savedData[nm] = vl;
						}
					}
				});
				$('#id_g', settings.formEdit.$detailForm).val(rowid);
				return;
			}
			var tre = $(obj).jqGrid('getInd', rowid, true);
			if (!tre) {
				return;
			}
			$('td[role="gridcell"]', tre).each(function (i) {
				nm = cm[i].name;
				id = this.id !== undefined ? this.id : nm;
				// hidden fields are included in the form
				if (nm !== 'cb' && nm !== 'subgrid' && nm !== 'rn' && cm[i].editable === true) {
					if (nm == obj.p.ExpandColumn && obj.p.treeGrid === true) {
						tmp = $(this).text();
					} else {
						try {
							tmp = $.unformat.call(obj, $(this), {
								rowId: rowid,
								colModel: cm[i]
							}, i);
						} catch (_) {
							tmp = cm[i].edittype == 'textarea' ? $(this).text() : $(this).html();
						}
					}
					if ($t.p.autoencode) {
						tmp = $.jgrid.htmlDecode(tmp);
					}
					if (rp_ge[$t.p.id].checkOnSubmit === true || rp_ge[$t.p.id].checkOnUpdate) {
						rp_ge[$t.p.id]._savedData[nm] = tmp;
					}
					nm = $.jgrid.jqID(nm);
					switch (cm[i].edittype) {
					case 'password':
					case 'text':
					case 'button':
					case 'image':
					case 'textarea':
						if (tmp == '&nbsp;' || tmp == '&#160;' || (tmp.length == 1 && tmp.charCodeAt(0) == 160)) {
							tmp = '';
						}
						$('#' + id, '#' + fmid).val(tmp);
						break;
					case 'select':
						var opv = tmp.split(',');
						opv = $.map(opv, function (n) {
							return $.trim(n);
						});
						$('#' + id + ' option', '#' + fmid).each(function () {
							if (!cm[i].editoptions.multiple && ($.trim(tmp) == $.trim($(this).text()) || opv[0] == $.trim($(this).text()) || opv[0] == $.trim($(this).val()))) {
								this.selected = true;
							} else if (cm[i].editoptions.multiple) {
								if ($.inArray($.trim($(this).text()), opv) > -1 || $.inArray($.trim($(this).val()), opv) > -1) {
									this.selected = true;
								} else {
									this.selected = false;
								}
							} else {
								this.selected = false;
							}
						});
						break;
					case 'checkbox':

						tmp = String(tmp);
						if (cm[i].editoptions && cm[i].editoptions.value) {
							var cb = cm[i].editoptions.value.split(':');
							if (cb[0] == tmp) {
								$('#' + id, '#' + fmid)[$t.p.useProp ? 'prop' : 'attr']('checked', true);
								$('#' + id, '#' + fmid)[$t.p.useProp ? 'prop' : 'attr']('defaultChecked', true); //ie
							} else {
								$('#' + id, '#' + fmid)[$t.p.useProp ? 'prop' : 'attr']('checked', false);
								$('#' + id, '#' + fmid)[$t.p.useProp ? 'prop' : 'attr']('defaultChecked', false); //ie
							}
						} else {
							tmp = tmp.toLowerCase();
							if (tmp.search(/(false|0|no|off|undefined)/i) < 0 && tmp !== '') {
								$('#' + id, '#' + fmid)[$t.p.useProp ? 'prop' : 'attr']('checked', true);
								$('#' + id, '#' + fmid)[$t.p.useProp ? 'prop' : 'attr']('defaultChecked', true); //ie
							} else {
								$('#' + id, '#' + fmid)[$t.p.useProp ? 'prop' : 'attr']('checked', false);
								$('#' + id, '#' + fmid)[$t.p.useProp ? 'prop' : 'attr']('defaultChecked', false); //ie
							}
						}
						break;
					case 'custom':
						try {
							if (cm[i].editoptions && $.isFunction(cm[i].editoptions.custom_value)) {
								cm[i].editoptions.custom_value.call($t, $('#' + id, '#' + fmid), 'set', tmp);
							} else {
								throw 'e1';
							}
						} catch (e) {
							if (e == 'e1') {
								$.jgrid.info_dialog($.jgrid.errors.errcap, 'function \'custom_value\' ' + $.jgrid.edit.msg.nodefined, $.jgrid.edit.bClose);
							} else {
								$.jgrid.info_dialog($.jgrid.errors.errcap, e.message, $.jgrid.edit.bClose);
							}
						}
						break;
					}
					cnt++;
				}
			});
			if (cnt > 0) {
				$('#id_g', frmtb).val(rowid);
			}
		},
		fillDataServerSide: function (rowid, $form, frmoper) {
			var $t = this,
				$self = $($t),
				settings = $self.data('settings'),
				postdata = {},
				$detailFormToPopulate = ($form !== undefined ? $form : settings.formEdit.$detailForm);

			if (rowid == '_empty') {
				$self.rup_jqtable('resetForm', settings.formEdit.$detailForm);

				$.proxy($.jgrid.getFormData, $t)(postdata, {});
				rp_ge[$t.p.id]._savedData = $.rup_utils.unnestjson(postdata);
				if (frmoper !== 'clone_clear') {
					$self.triggerHandler('jqGridAddEditAfterFillData', [$form, frmoper]);
				}
				$('#id_g', $form).val(rowid);
				return;
			}

			var ajaxOptions = $.extend({
				success: function (xhr, ajaxOptions) {
					var xhrArray;

					if (xhr.id && xhr.id instanceof Object) { //estamos en JPA
						if (xhr.id instanceof Object) { //es que estamos en jpa y traemos una clave compuesta
							xhr['JPA_ID'] = xhr.id;
							delete xhr.id;
						}
					}
					xhrArray = $.rup_utils.jsontoarray(xhr);

					$.rup_utils.populateForm(xhrArray, $detailFormToPopulate);

					rp_ge[$t.p.id]._savedData = $.rup_utils.unnestjson(xhr);
					rp_ge[$t.p.id]._savedData[settings.id + '_id'] = rowid;
					$('#id_g', $form).val(rowid);

					$self.triggerHandler('rupTable_afterFormFillDataServerSide', [xhr, $detailFormToPopulate, ajaxOptions]);

				},
				error: function (xhr, ajaxOptions, thrownError) {
					settings.$feedback.rup_feedback('option', 'delay', null);
					settings.$feedback.rup_feedback('set', xhr.responseText, 'error');
					settings.$feedback.rup_feedback('option', 'delay', 1000);
				}
			}, settings.formEdit.detailOptions.ajaxDetailOptions);

			ajaxOptions.url += '/' + $self.rup_jqtable('getPkUrl', rowid);
			$.when($.rup_ajax(ajaxOptions)).then(function (success, statusText, xhr) {
				$self.triggerHandler('jqGridAddEditAfterFillData', [$form, frmoper]);
			});
		},
		fillData: function (rowid, obj, fmid, frmoper) {
			var $t = this,
				$self = $($t),
				settings = $self.data('settings');

			//switch ((rowid == '_empty'?"clientSide":settings.formEdit.editOptions.fillDataMethod)){
			switch (settings.formEdit.editOptions.fillDataMethod) {
			case 'clientSide':
				$.proxy($.jgrid.fillDataClientSide, $t)(rowid, obj, fmid, frmoper);
				break;
			case 'serverSide':
			default:
				$.proxy($.jgrid.fillDataServerSide, $t)(rowid, settings.formEdit.$detailForm, frmoper);
				break;
			}
		},
		getFormData: function (postdata, extpost) {
			var $t = this,
				$self = $(this),
				settings = $self.data('settings'),
				formParams;

			formParams = form2object(settings.formEdit.$detailForm[0], null, false);

			jQuery.extend(true, postdata, formParams);

			return true;

		},
		postIt: function (postdata, extpost, frmoper) {
			var $t = this,
				self = $t,
				$self = jQuery(self),
				settings = $self.data('settings'),
				gID = $t.p.id,
				frmgr = $.fn.jqGrid.rup.edit.detail.detailFormId + gID,
				frmtborg = $.fn.jqGrid.rup.edit.detail.detailBodyId + gID,
				frmtb = '#' + $.jgrid.jqID(frmtborg),
				copydata, ret = [true, '', ''],
				onCS = {},
				opers = $t.p.prmNames,
				idname, oper, key, selr, i;

			var retvals = $($t).triggerHandler('jqGridAddEditBeforeCheckValues', [$('#' + frmgr), frmoper]);
			if (retvals && typeof retvals === 'object') {
				postdata = retvals;
			}

			if ($.isFunction(rp_ge[$t.p.id].beforeCheckValues)) {
				retvals = rp_ge[$t.p.id].beforeCheckValues.call($t, postdata, $('#' + frmgr), postdata[$t.p.id + '_id'] == '_empty' ? opers.addoper : opers.editoper);
				if (retvals && typeof retvals === 'object') {
					postdata = retvals;
				}
			}
			for (key in postdata) {
				if (postdata.hasOwnProperty(key)) {
					ret = $.jgrid.checkValues.call($t, postdata[key], key, $t);
					if (ret[0] === false) {
						break;
					}
				}
			}
			$.proxy($.jgrid.setNulls, $t)();
			if (ret[0]) {
				onCS = $($t).triggerHandler('jqGridAddEditClickSubmit', [rp_ge[$t.p.id], postdata, frmoper]);
				if (onCS === undefined && $.isFunction(rp_ge[$t.p.id].onclickSubmit)) {
					onCS = rp_ge[$t.p.id].onclickSubmit.call($t, rp_ge[$t.p.id], postdata) || {};
				}
				ret = $($t).triggerHandler('jqGridAddEditBeforeSubmit', [postdata, $('#' + frmgr), frmoper]);
				if (ret === undefined) {
					ret = [true, '', ''];
				}
				if (ret[0] && $.isFunction(rp_ge[$t.p.id].beforeSubmit)) {
					ret = rp_ge[$t.p.id].beforeSubmit.call($t, postdata, $('#' + frmgr));
				}
			}

			//			if(ret[0] && !rp_ge[$t.p.id].processing) {
			if (ret[0]) {
				rp_ge[$t.p.id].processing = true;
				$('#sData', frmtb + '_2').addClass('ui-state-active');
				oper = opers.oper;
				idname = opers.id;
				// we add to pos data array the action - the name is oper
				postdata[oper] = ($.trim(postdata[$t.p.id + '_id']) == '_empty') ? opers.addoper : opers.editoper;
				if (postdata[oper] != opers.addoper) {
					postdata[idname] = postdata[$t.p.id + '_id'];
				} else {
					// check to see if we have allredy this field in the form and if yes lieve it
					if (postdata[idname] === undefined) {
						postdata[idname] = postdata[$t.p.id + '_id'];
					}
				}
				delete postdata[$t.p.id + '_id'];
				postdata = $.extend(postdata, rp_ge[$t.p.id].editData, onCS);
				if ($t.p.treeGrid === true) {
					if (postdata[oper] == opers.addoper) {
						selr = $($t).jqGrid('getGridParam', 'selrow');
						var tr_par_id = $t.p.treeGridModel == 'adjacency' ? $t.p.treeReader.parent_id_field : 'parent_id';
						postdata[tr_par_id] = selr;
					}
					for (i in $t.p.treeReader) {
						if ($t.p.treeReader.hasOwnProperty(i)) {
							var itm = $t.p.treeReader[i];
							if (postdata.hasOwnProperty(itm)) {
								if (postdata[oper] == opers.addoper && i === 'parent_id_field') {
									continue;
								}
								delete postdata[itm];
							}
						}
					}
				}

				postdata[idname] = $.jgrid.stripPref($t.p.idPrefix, postdata[idname]);
				var ajaxOptions = $.extend({
					url: rp_ge[$t.p.id].url || $($t).jqGrid('getGridParam', 'editurl'),
					type: rp_ge[$t.p.id].mtype,
					data: $.isFunction(rp_ge[$t.p.id].serializeEditData) ? rp_ge[$t.p.id].serializeEditData.call($t, postdata) : postdata,
					complete: function (data, status) {
						var key, xhr;
						postdata[idname] = $t.p.idPrefix + postdata[idname];
						if (status != 'success') {
							ret[0] = false;
							ret[1] = $($t).triggerHandler('jqGridAddEditErrorTextFormat', [data, frmoper]);
							if ($.isFunction(rp_ge[$t.p.id].errorTextFormat)) {
								ret[1] = rp_ge[$t.p.id].errorTextFormat.call($t, data);
							} else {
								ret[1] = status + ' Status: \'' + data.statusText + '\'. Error code: ' + data.status;
							}
						} else {
							// data is posted successful
							// execute aftersubmit with the returned data from server
							ret = $($t).triggerHandler('jqGridAddEditAfterSubmit', [data, postdata, frmoper]);
							if (ret === undefined) {
								ret = [true, '', ''];
							}
							if (ret[0] && $.isFunction(rp_ge[$t.p.id].afterSubmit)) {
								ret = rp_ge[$t.p.id].afterSubmit.call($t, data, postdata);
							}
						}
						if (ret[0] === false) {
							$('#' + settings.formEdit.feedbackId + '>td', frmtb).html(ret[1]);
							$('#' + settings.formEdit.feedbackId, frmtb).show();
						} else {
							// remove some values if formattaer select or checkbox
							xhr = $.parseJSON(data.responseText);
							$.each($t.p.colModel, function () {
								if (extpost[this.name] && this.formatter && this.formatter == 'select') {
									try {
										delete extpost[this.name];
									} catch (e) {}
								}
								if (this.formatter == 'checkbox' && postdata[this.name] == undefined) {
									postdata[this.name] = null;
								}
								if (this.formatter && (this.formatter !== 'checkbox' && this.formatter !== 'select')) {
									if (postdata[this.name] === undefined) {
										postdata[this.name] = this.formatter.call($($t), ret[2], undefined, xhr, postdata[oper]);
									}
								}
								if (this.formatterOnUpdate) {
									postdata[this.name] = this.formatterOnUpdate.call($($t), $('#' + frmgr));
								}
								if (this.updateFromDetail) {
									postdata[this.name] = this.updateFromDetail.call($($t), $('#' + frmgr));
								}
							});
							postdata = $.extend(postdata, extpost);
							if ($t.p.autoencode) {
								$.each(postdata, function (n, v) {
									postdata[n] = $.jgrid.htmlDecode(v);
								});
							}
							//rp_ge[$t.p.id].reloadAfterSubmit = rp_ge[$t.p.id].reloadAfterSubmit && $t.p.datatype != "local";
							// the action is add
							if (postdata[oper] == opers.addoper) {
								//id processing
								// user not set the id ret[2]
								if (!ret[2]) {
									ret[2] = $.jgrid.randId();
								}
								postdata[idname] = ret[2];
								if (rp_ge[$t.p.id].closeAfterAdd) {
									if (rp_ge[$t.p.id].reloadAfterSubmit) {
										$($t).trigger('reloadGrid');
									} else {
										if ($t.p.treeGrid === true) {
											$($t).jqGrid('addChildNode', ret[2], selr, postdata);
										} else {
											$($t).jqGrid('addRowData', ret[2], postdata, rp_ge[$t.p.id].addedrow);
											$($t).jqGrid('setSelection', ret[2]);
										}
									}
									$.jgrid.hideModal('#' + $.jgrid.jqID(IDs.themodal), {
										gb: '#gbox_' + $.jgrid.jqID(gID),
										jqm: rp_ge[$t.p.id].jqModal,
										onClose: rp_ge[$t.p.id].onClose
									});
								} else if (rp_ge[$t.p.id].clearAfterAdd) {
									if (rp_ge[$t.p.id].reloadAfterSubmit) {
										$($t).trigger('reloadGrid');
									} else {
										if ($t.p.treeGrid === true) {
											$($t).jqGrid('addChildNode', ret[2], selr, postdata);
										} else {
											$($t).jqGrid('addRowData', ret[2], postdata, rp_ge[$t.p.id].addedrow);
											// TODO : Añadido para que seleccione el registro insertado. Tratar de hacerlo en el evento jqGridAfterInsertRow
											$($t).jqGrid('setSelection', ret[2]);
										}
									}
									$.proxy($.jgrid.fillData, $t)('_empty', $t, frmgr);
								} else {
									if (rp_ge[$t.p.id].reloadAfterSubmit) {
										$($t).trigger('reloadGrid');
									} else {
										if ($t.p.treeGrid === true) {
											$($t).jqGrid('addChildNode', ret[2], selr, postdata);
										} else {
											$($t).jqGrid('addRowData', ret[2], postdata, rp_ge[$t.p.id].addedrow);
										}
									}
								}
							} else {
								// the action is update
								if (rp_ge[$t.p.id].reloadAfterSubmit) {
									$($t).trigger('reloadGrid');
									if (!rp_ge[$t.p.id].closeAfterEdit) {
										setTimeout(function () {
											$($t).jqGrid('setSelection', postdata[idname]);
										}, 1000);
									}
								} else {
									if ($t.p.treeGrid === true) {
										$($t).jqGrid('setTreeRow', postdata[idname], postdata);
									} else {
										$($t).jqGrid('setRowData', postdata[idname], postdata);
									}
								}
								if (rp_ge[$t.p.id].closeAfterEdit) {
									$.jgrid.hideModal('#' + $.jgrid.jqID(IDs.themodal), {
										gb: '#gbox_' + $.jgrid.jqID(gID),
										jqm: rp_ge[$t.p.id].jqModal,
										onClose: rp_ge[$t.p.id].onClose
									});
								}
							}
							if ($.isFunction(rp_ge[$t.p.id].afterComplete)) {
								copydata = data;
								setTimeout(function () {
									$($t).triggerHandler('jqGridAddEditAfterComplete', [copydata, postdata, $('#' + frmgr), frmoper]);
									rp_ge[$t.p.id].afterComplete.call($t, copydata, postdata, $('#' + frmgr));
									copydata = null;
								}, 500);
							}
							if (rp_ge[$t.p.id].checkOnSubmit || rp_ge[$t.p.id].checkOnUpdate) {
								$('#' + frmgr).data('disabled', false);
								if (rp_ge[$t.p.id]._savedData[$t.p.id + '_id'] != '_empty') {
									for (key in rp_ge[$t.p.id]._savedData) {
										if (rp_ge[$t.p.id]._savedData.hasOwnProperty(key) && postdata[key]) {
											rp_ge[$t.p.id]._savedData[key] = postdata[key];
										}
									}
								}
							}
						}
						rp_ge[$t.p.id].processing = false;
						$('#sData', frmtb + '_2').removeClass('ui-state-active');
						try {
							$(':input:visible', '#' + frmgr)[0].focus();
						} catch (e) {}
					}
				}, $.jgrid.ajaxOptions, rp_ge[$t.p.id].ajaxEditOptions);

				if (!ajaxOptions.url && !rp_ge[$t.p.id].useDataProxy) {
					if ($.isFunction($t.p.dataProxy)) {
						rp_ge[$t.p.id].useDataProxy = true;
					} else {
						ret[0] = false;
						ret[1] += ' ' + $.jgrid.errors.nourl;
					}
				}
				if (ret[0]) {
					if (rp_ge[$t.p.id].useDataProxy) {
						var dpret = $t.p.dataProxy.call($t, ajaxOptions, 'set_' + $t.p.id);
						if (dpret === undefined) {
							dpret = [true, ''];
						}
						if (dpret[0] === false) {
							ret[0] = false;
							ret[1] = dpret[1] || 'Error deleting the selected row!';
						} else {
							if (ajaxOptions.data.oper == opers.addoper && rp_ge[$t.p.id].closeAfterAdd) {
								$.jgrid.hideModal('#' + $.jgrid.jqID(IDs.themodal), {
									gb: '#gbox_' + $.jgrid.jqID(gID),
									jqm: rp_ge[$t.p.id].jqModal,
									onClose: rp_ge[$t.p.id].onClose
								});
							}
							if (ajaxOptions.data.oper == opers.editoper && rp_ge[$t.p.id].closeAfterEdit) {
								$.jgrid.hideModal('#' + $.jgrid.jqID(IDs.themodal), {
									gb: '#gbox_' + $.jgrid.jqID(gID),
									jqm: rp_ge[$t.p.id].jqModal,
									onClose: rp_ge[$t.p.id].onClose
								});
							}
						}
					} else {
						$.ajax(ajaxOptions);
					}
				}
			}
			if (ret[0] === false) {
				$('#' + settings.formEdit.feedbackId + '>td', frmtb).html(ret[1]);
				$('#' + settings.formEdit.feedbackId, frmtb).show();
				// return;
			}
		},
		setNulls: function () {
			var $t = this, postdata;
			$.each($t.p.colModel, function (i, n) {
				if (n.editoptions && n.editoptions.NullIfEmpty === true) {
					if (postdata.hasOwnProperty(n.name) && postdata[n.name] === '') {
						postdata[n.name] = 'null';
					}
				}
			});

		},
		compareData: function (nObj, oObj) {
			var ret = false,
				key,
				unnestNObj = jQuery.rup_utils.unnestjson(nObj),
				unnestOObj = jQuery.rup_utils.unnestjson(oObj);

			for (key in unnestNObj) {
				if (unnestNObj.hasOwnProperty(key) && String(unnestNObj[key]) !== String(unnestOObj[key])) {
					ret = true;
					// Descomentar para debug
					//					console.log(" Compare data: "+ key+ " new: "+String(unnestNObj[key]) + " old: "+String(unnestOObj[key]));
					break;
				}
			}
			return ret;
		},
		checkUpdates: function (extpost, okCallback) {
			var $self = $(this),
				settings = $self.data('settings'),
				postdata, newData,
				$t = this,
				gID = $t.p.id,
				frmgr = $.fn.jqGrid.rup.edit.detail.detailFormId + gID,
				frmtborg = $.fn.jqGrid.rup.edit.detail.detailBodyId + gID,
				frmtb = '#' + $.jgrid.jqID(frmtborg),
				stat = true,
				diff = false;
			//			$("#"+settings.formEdit.feedbackId,frmtb).hide();
			if (rp_ge[$t.p.id].checkOnUpdate) {
				postdata = {};
				extpost = {};
				$.proxy($.jgrid.getFormData, $t)(postdata, extpost);
				newData = $.extend({}, postdata, extpost);

				if (settings.formEdit.addEditOptions.defaultCompareData === true) {
					diff = $.proxy($.jgrid.compareData, $t)(newData, rp_ge[$t.p.id]._savedData);
				}

				var compareDataEvent = jQuery.Event('rupTable_formEditCompareData');
				compareDataEvent.isDifferent = diff;

				$self.triggerHandler(compareDataEvent, [rp_ge[$t.p.id]._savedData, newData]);

				if (compareDataEvent.isDifferent) {
					$.rup_messages('msgConfirm', {
						message: $.rup.i18nParse($.rup.i18n.base, 'rup_jqtable.saveAndContinue'),
						title: $.rup.i18nParse($.rup.i18n.base, 'rup_jqtable.changes'),
						OKFunction: function () {

							if (jQuery.isFunction(okCallback)) {
								jQuery.proxy(okCallback, $self)();
							}
						}
					});
					//					$("#"+frmgr).data("disabled",true);
					//					$(".confirm","#"+IDs.themodal).show();
					stat = false;
				}
			}
			return stat;
		},
		restoreInline: function (rowid) {
			var $t = this,
				i;
			if (rowid !== '_empty' && typeof ($t.p.savedRow) !== 'undefined' && $t.p.savedRow.length > 0 && $.isFunction($.fn.jqGrid.restoreRow)) {
				for (i = 0; i < $t.p.savedRow.length; i++) {
					if ($t.p.savedRow[i].id == rowid) {
						$($t).jqGrid('restoreRow', rowid);
						break;
					}
				}
			}
		},
		getCurrPos: function () {
			var $t = this,
				$self = $(this),
				settings = $self.data('settings'),
				gID = $t.p.id,
				frmgr = $.fn.jqGrid.rup.edit.detail.detailFormId + gID,
				frmtborg = $.fn.jqGrid.rup.edit.detail.detailBodyId + gID,
				frmtb = '#' + $.jgrid.jqID(frmtborg),
				rowsInGrid = $($t).jqGrid('getDataIDs'),
				idGval = $('#id_g', settings.formEdit.$detailForm).val(),
				selrow = idGval !== undefined && idGval !== '_empty' ? idGval : $self.jqGrid('getGridParam', 'selrow'),
				pos = $.inArray(selrow, rowsInGrid);

			return [pos, rowsInGrid];
		},
		updateNav: function (cr, posarr) {
			var $self = $(this),
				totr;
			if (posarr !== undefined && posarr[1] !== undefined) {
				totr = posarr[1].length - 1;
				if (cr === 0) {
					$('#pData', frmtb + '_2').addClass('ui-state-disabled');
				} else if (posarr[1][cr - 1] !== undefined && $('#' + $.jgrid.jqID(posarr[1][cr - 1])).hasClass('ui-state-disabled')) {
					$('#pData', frmtb + '_2').addClass('ui-state-disabled');
				} else {
					$('#pData', frmtb + '_2').removeClass('ui-state-disabled');
				}

				if (cr == totr) {
					$('#nData', frmtb + '_2').addClass('ui-state-disabled');
				} else if (posarr[1][cr + 1] !== undefined && $('#' + $.jgrid.jqID(posarr[1][cr + 1])).hasClass('ui-state-disabled')) {
					$('#nData', frmtb + '_2').addClass('ui-state-disabled');
				} else {
					$('#nData', frmtb + '_2').removeClass('ui-state-disabled');
				}
			}
			$self.rup_jqtable('updateDetailPagination');
		}
	});


	/*
     * MODIFICACIONES
     * Funciones extendidas (MODIFICADAS) del componente jqGrid.
     *
     * Los métodos aquí indicados han sido extendidos partiendo de la implementación original.
     * Las modificaciones han sido realizadas debido a la incompatibilidad de su implementación con los requisitos exigidos.
     *
     * Los métodos extendidos para su modificación son los siguientes:
     *
     * - editGridRow
     */
	$.jgrid.extend({
		editGridRow: function (rowid, p) {
			p = $.extend({
				top: 0,
				left: 0,
				width: 300,
				height: 'auto',
				dataheight: 'auto',
				modal: false,
				overlay: 30,
				drag: true,
				resize: true,
				url: null,
				mtype: 'POST',
				clearAfterAdd: true,
				closeAfterEdit: false,
				reloadAfterSubmit: true,
				onInitializeForm: null,
				beforeInitData: null,
				beforeShowForm: null,
				afterShowForm: null,
				beforeSubmit: null,
				afterSubmit: null,
				onclickSubmit: null,
				afterComplete: null,
				onclickPgButtons: null,
				afterclickPgButtons: null,
				editData: {},
				recreateForm: false,
				jqModal: true,
				closeOnEscape: false,
				addedrow: 'first',
				topinfo: '',
				bottominfo: '',
				saveicon: [],
				closeicon: [],
				savekey: [false, 13],
				navkeys: [false, 38, 40],
				checkOnSubmit: false,
				checkOnUpdate: false,
				_savedData: {},
				processing: false,
				onClose: null,
				ajaxEditOptions: {},
				serializeEditData: null,
				viewPagerButtons: true
			}, $.jgrid.edit, p || {});
			rp_ge[$(this)[0].p.id] = p;
			return this.each(function () {
				var $t = this,
					$self = $($t),
					settings = $self.data('settings');
				if (!$t.grid || !rowid) {
					return;
				}
				var gID = $t.p.id,
					frmgr = $.fn.jqGrid.rup.edit.detail.detailFormId + gID,
					frmtborg = $.fn.jqGrid.rup.edit.detail.detailBodyId + gID,
					frmtb = '#' + $.jgrid.jqID(frmtborg),
					IDs = {
						themodal: $.fn.jqGrid.rup.edit.detail.detailDivId + gID,
						modalhead: 'edithd' + gID,
						modalcontent: 'editcnt' + gID,
						scrollelm: frmgr
					},
					onBeforeShow = $.isFunction(rp_ge[$t.p.id].beforeShowForm) ? rp_ge[$t.p.id].beforeShowForm : false,
					onAfterShow = $.isFunction(rp_ge[$t.p.id].afterShowForm) ? rp_ge[$t.p.id].afterShowForm : false,
					onBeforeInit = $.isFunction(rp_ge[$t.p.id].beforeInitData) ? rp_ge[$t.p.id].beforeInitData : false,
					onInitializeForm = $.isFunction(rp_ge[$t.p.id].onInitializeForm) ? rp_ge[$t.p.id].onInitializeForm : false,
					showFrm = true,
					maxCols = 1,
					maxRows = 0,
					postdata, extpost, newData, diff, frmoper;
				frmgr = $.jgrid.jqID(frmgr);
				if (rowid === 'new') {
					rowid = '_empty';
					frmoper = 'add';
					p.caption = rp_ge[$t.p.id].addCaption;
				} else if (rowid === 'cloned') {
					p.caption = rp_ge[$t.p.id].addCaption;
					rowid = '_empty';
					frmoper = 'clone_clear';
				} else {
					p.caption = rp_ge[$t.p.id].editCaption;
					frmoper = 'edit';
				}
				settings.opermode = frmoper;
				//				if(p.recreateForm===true && $("#"+$.jgrid.jqID(IDs.themodal))[0] !== undefined) {
				//					$("#"+$.jgrid.jqID(IDs.themodal)).remove();
				//				}
				if (p.recreateForm === true && settings.formEdit.detailFormCreated === true) {
					settings.formEdit.$detailFormDiv.remove();
				}

				var closeovrl = true;
				if (p.checkOnUpdate && p.jqModal && !p.modal) {
					closeovrl = false;
				}

				if (settings.formEdit.detailFormCreated === true) {
					IDs.themodal = settings.formEdit.$detailFormDiv.attr('id');
					showFrm = $($t).triggerHandler('jqGridAddEditBeforeInitData', [(settings.formEdit.$detailForm ? settings.formEdit.$detailForm : $('#' + frmgr)), frmoper]);
					if (showFrm === undefined) {
						showFrm = true;
					}
					if (showFrm && onBeforeInit) {
						showFrm = onBeforeInit.call($t, (settings.formEdit.$detailForm ? settings.formEdit.$detailForm : $('#' + frmgr)));
					}
					if (showFrm === false) {
						return;
					}
					$.proxy($.jgrid.restoreInline, $t)(rowid);
					$('.ui-jqdialog-title', '#' + $.jgrid.jqID(IDs.modalhead)).html(p.caption);
					$('#' + settings.formEdit.feedbackId, frmtb).hide();
					if (rp_ge[$t.p.id].topinfo) {
						$('.topinfo', frmtb).html(rp_ge[$t.p.id].topinfo);
						$('.tinfo', frmtb).show();
					} else {
						$('.tinfo', frmtb).hide();
					}
					if (rp_ge[$t.p.id].bottominfo) {
						$('.bottominfo', frmtb + '_2').html(rp_ge[$t.p.id].bottominfo);
						$('.binfo', frmtb + '_2').show();
					} else {
						$('.binfo', frmtb + '_2').hide();
					}
					$.proxy($.jgrid.fillData, $t)(rowid, $t, frmgr, frmoper);
					///
					if (rowid == '_empty' || !rp_ge[$t.p.id].viewPagerButtons) {
						$('#pData, #nData', frmtb + '_2').hide();
					} else {
						$('#pData, #nData', frmtb + '_2').show();
					}
					if (rp_ge[$t.p.id].processing === true) {
						rp_ge[$t.p.id].processing = false;
						$('#sData', frmtb + '_2').removeClass('ui-state-active');
					}
					if ((settings.formEdit.$detailForm ? settings.formEdit.$detailForm : $('#' + frmgr)).data('disabled') === true) {
						$('.confirm', '#' + $.jgrid.jqID(IDs.themodal)).hide();
						(settings.formEdit.$detailForm ? settings.formEdit.$detailForm : $('#' + frmgr)).data('disabled', false);
					}
					$($t).triggerHandler('jqGridAddEditBeforeShowForm', [(settings.formEdit.$detailForm ? settings.formEdit.$detailForm : $('#' + frmgr)), frmoper]);
					if (onBeforeShow) {
						onBeforeShow.call($t, (settings.formEdit.$detailForm ? settings.formEdit.$detailForm : $('#' + frmgr)));
					}
					$('#' + $.jgrid.jqID(IDs.themodal)).data('onClose', rp_ge[$t.p.id].onClose);
					$.jgrid.viewModal('#' + $.jgrid.jqID(IDs.themodal), {
						gbox: '#gbox_' + $.jgrid.jqID(gID),
						jqm: p.jqModal,
						jqM: false,
						overlay: p.overlay,
						modal: p.modal
					});
					if (!closeovrl) {
						$('.jqmOverlay').click(function () {
							if (!$.proxy($.jgrid.checkUpdates, $t)(extpost)) {
								return false;
							}
							$.jgrid.hideModal('#' + $.jgrid.jqID(IDs.themodal), {
								gb: '#gbox_' + $.jgrid.jqID(gID),
								jqm: p.jqModal,
								onClose: rp_ge[$t.p.id].onClose
							});
							return false;
						});
					}
					$($t).triggerHandler('jqGridAddEditAfterShowForm', [(settings.formEdit.$detailForm ? settings.formEdit.$detailForm : $('#' + frmgr)), frmoper]);
					if (onAfterShow) {
						onAfterShow.call($t, (settings.formEdit.$detailForm ? settings.formEdit.$detailForm : $('#' + frmgr)));
					}
				} else {
					var dh = isNaN(p.dataheight) ? p.dataheight : p.dataheight + 'px',
						dw = isNaN(p.datawidth) ? p.datawidth : p.datawidth + 'px',
						frm = $(jQuery.rup.i18nTemplate(jQuery.rup.i18n.base, 'rup_jqtable.templates.detailForm.form', frmgr, dh)).data('disabled', false),
						tbl = $(jQuery.rup.i18nTemplate(jQuery.rup.i18n.base, 'rup_jqtable.templates.detailForm.body', frmtborg)),
						showFrm = $($t).triggerHandler('jqGridAddEditBeforeInitData', [$('#' + frmgr), frmoper]), flr;
					if (typeof (showFrm) == 'undefined') {
						showFrm = true;
					}
					if (showFrm && onBeforeInit) {
						showFrm = onBeforeInit.call($t, $('#' + frmgr));
					}
					if (showFrm === false) {
						return;
					}
					$.proxy($.jgrid.restoreInline, $t)(rowid);
					$($t.p.colModel).each(function () {
						var fmto = this.formoptions;
						maxCols = Math.max(maxCols, fmto ? fmto.colpos || 0 : 0);
						maxRows = Math.max(maxRows, fmto ? fmto.rowpos || 0 : 0);
					});
					$(frm).append(tbl);
					flr = $(jQuery.rup.i18nTemplate(jQuery.rup.i18n.base, 'rup_jqtable.templates.detailForm.errorFeedback', settings.formEdit.feedbackId));
					flr[0].rp = 0;
					$(tbl).append(flr);
					/* ADD	*/
					flr = $('<div class=\'tinfo\' style=\'display:none\'><span class=\'topinfo\'>' + rp_ge[$t.p.id].topinfo + '</span></div>');
					/*MOD END*/
					flr[0].rp = 0;
					$(tbl).append(flr);
					// set the id.
					// use carefull only to change here colproperties.
					// create data
					var rtlb = $t.p.direction == 'rtl' ? true : false,
						bp = rtlb ? 'nData' : 'pData',
						bn = rtlb ? 'pData' : 'nData';
					/* DEL				createData(rowid,$t,tbl,maxCols); */
					if (settings.formEdit.$detailForm === undefined) {
						settings.formEdit.$detailForm = tbl.parent();
						$.proxy($.jgrid.createData, $t)(rowid, $t, tbl, maxCols);
					} else {
						settings.formEdit.$detailForm.append($('<div class=\'FormData\' style=\'display:none\'><span class=\'CaptionTD\'></span><span class=\'DataTD \'><input class=\'FormElement\' id=\'id_g\' type=\'text\' name=\'' + $t.p.id + '_id\' value=\'' + rowid + '\'/></span></div>'));
					}


					frm = settings.formEdit.$detailForm[0];

					$.proxy($.jgrid.fillData, $t)(rowid, $t, frmgr, frmoper);


					// buttons at footer
					var bP = '<a href=\'javascript:void(0)\' id=\'' + bp + '\' class=\'fm-button ui-state-default ui-corner-left\'><span class=\'ui-icon ui-icon-triangle-1-w\'></span></a>',
						bN = '<a href=\'javascript:void(0)\' id=\'' + bn + '\' class=\'fm-button ui-state-default ui-corner-right\'><span class=\'ui-icon ui-icon-triangle-1-e\'></span></a>',
						bS = '<a href=\'javascript:void(0)\' id=\'sData\' class=\'fm-button ui-state-default ui-corner-all\'>' + p.bSubmit + '</a>',
						bC = '<a href=\'javascript:void(0)\' id=\'cData\' class=\'fm-button ui-state-default ui-corner-all\'>' + p.bCancel + '</a>';
					var bt = '<table border=\'0\' cellspacing=\'0\' cellpadding=\'0\' class=\'EditTable\' id=\'' + frmtborg + '_2\'><tbody><tr><td colspan=\'2\'><hr class=\'ui-widget-content\' style=\'margin:1px\'/></td></tr><tr id=\'Act_Buttons\'><td class=\'navButton\'>' + (rtlb ? bN + bP : bP + bN) + '</td><td class=\'EditButton\'>' + bS + bC + '</td></tr>';
					bt += '<tr style=\'display:none\' class=\'binfo\'><td class=\'bottominfo\' colspan=\'2\'>' + rp_ge[$t.p.id].bottominfo + '</td></tr>';
					bt += '</tbody></table>';

					/*
                     * MODIFICADO POR UDA.
                     * Adaptar la ordenación a la nueva disposición mediante divs en vez de table.
                     */
					if (settings.formEdit.ownFormEdit === false) {

						if (maxRows > 0) {
							for (var i = 1; i <= maxCols; i++) {
								// Por cada columna
								var $colLayer = tbl.find('#col_' + parseInt((parseInt(i, 10) || 1) * 2, 10));
								var sd = [];
								$.each($colLayer.find('div'), function (i, r) {
									sd[i] = r;
								});
								sd.sort(function (a, b) {
									if (a.rp > b.rp) {
										return 1;
									}
									if (a.rp < b.rp) {
										return -1;
									}
									return 0;
								});
								$.each(sd, function (index, row) {
									$colLayer.append(row);
								});
							}
						}
					}
					/*
                     * FIN MODIFICACION
                     */

					p.gbox = '#gbox_' + $.jgrid.jqID(gID);
					var cle = false;
					if (p.closeOnEscape === true) {
						p.closeOnEscape = false;
						cle = true;
					}

					/*
                     * MODIFICADO POR UDA
                     * Añadida barra de navegación entre elementos
                     */

					var barraNavegacion = $self.rup_jqtable('createDetailNavigation'),
						tms;




					function saveData() {
						postdata = {};
						extpost = {};
						$('#' + settings.formEdit.feedbackId, frmtb).hide();

						// all depend on ret array
						//ret[0] - succes
						//ret[1] - msg if not succes
						//ret[2] - the id  that will be set if reload after submit false
						$.proxy($.jgrid.getFormData, $t)(postdata);
						if (postdata[$t.p.id + '_id'] == '_empty') {
							$.proxy($.jgrid.postIt, $t)(postdata, extpost, settings.opermode);
						} else if (p.checkOnSubmit === true) {
							newData = $.extend({}, postdata, extpost);
							diff = compareData(newData, rp_ge[$t.p.id]._savedData);
							if (diff) {
								$('#' + frmgr).data('disabled', true);
								$('.confirm', '#' + $.jgrid.jqID(IDs.themodal)).show();
							} else {
								$.proxy($.jgrid.postIt, $t)(postdata, extpost, settings.opermode);
							}
						} else {
							$.proxy($.jgrid.postIt, $t)(postdata, extpost, settings.opermode);
						}
						return false;
					}

					function fncSaveButton() {
						$self.data('tmp.formEditSaveType', 'SAVE');
						if (!saveData()) {
							return false;
						}
					}

					function fncSaveAndRepeatButton() {
						$self.data('tmp.formEditSaveType', 'SAVE_REPEAT');
						if (!saveData()) {
							return false;
						}
					}

					function fncCancelLink() {
						if (!$.proxy($.jgrid.checkUpdates, $t)(extpost, function () {
							$.jgrid.hideModal('#' + $.jgrid.jqID(IDs.themodal), {
								gb: '#gbox_' + $.jgrid.jqID(gID),
								jqm: p.jqModal,
								onClose: rp_ge[$t.p.id].onClose
							});
						})) {
							return false;
						}
						$.jgrid.hideModal('#' + $.jgrid.jqID(IDs.themodal), {
							gb: '#gbox_' + $.jgrid.jqID(gID),
							jqm: p.jqModal,
							onClose: rp_ge[$t.p.id].onClose
						});
						return false;
					}

					if (settings.formEdit.ownFormEdit === true) {
						if (!settings.formEdit.$detailFormDiv.is(':visible')) {
							settings.formEdit.$detailFormDiv.show();
						}


						/* TODO : Añadir los parametros de configruación que puedan añadirse al rup_dialog. */
						settings.formEdit.$detailFormDiv.rup_dialog($.extend({}, {
							type: $.rup.dialog.DIV,
							autoOpen: false,
							modal: true,
							resizable: p.resize,
							title: p.caption,
							width: p.width
						}, settings.formEdit.dialogOptions));

						settings.formEdit.detailFormCreated = true;
						settings.formEdit.$navigationBar.append(barraNavegacion);

						if (settings.formEdit.$saveButton.length > 0) {
							settings.formEdit.$saveButton.button().click(function () {
								jQuery.proxy(fncSaveButton, $self)();
							});
						}
						if (settings.formEdit.$saveRepeatButton.length > 0) {
							settings.formEdit.$saveRepeatButton.button().click(function () {
								jQuery.proxy(fncSaveAndRepeatButton, $self)();
							});
						}
						if (settings.formEdit.$cancelButton.length > 0) {
							settings.formEdit.$cancelButton.on('click', function () {
								jQuery.proxy(fncCancelLink, $self)();
							});
						}

						if (!jQuery.isFunction(p.onClose)) {
							p.onClose = fncCancelLink;
						}

						jQuery('.ui-dialog-titlebar-close, a:has(#closeText_' + settings.formEdit.$detailFormDiv.first()[0].id + ')', settings.formEdit.$detailFormDiv.parent()).off('click').on('click', function (event) {
							p.onClose.call(event);
						});

						IDs.themodal = settings.formEdit.$detailFormDiv.attr('id');
					} else {
						var tms = barraNavegacion.after(frm);
						var saveButton = {
							text: $.rup.i18nParse($.rup.i18n.base, 'rup_global.save'),
							click: fncSaveButton
						};

						var saveAndRepeatButton = {
							text: $.rup.i18nParse($.rup.i18n.base, 'rup_global.save_repeat'),
							click: fncSaveAndRepeatButton
						};

						var cancelLink = {
							text: $.rup.i18nParse($.rup.i18n.base, 'rup_global.cancel'),
							btnType: $.rup.dialog.LINK,
							click: fncCancelLink
						};

						p.buttons = [saveButton, saveAndRepeatButton, cancelLink];
						p.onClose = fncCancelLink;

						$.jgrid.createModal(IDs, tms, p, '#gview_' + $.jgrid.jqID($t.p.id), $('#gbox_' + $.jgrid.jqID($t.p.id))[0]);
						settings.formEdit.detailFormCreated = true;
					}

					if (settings.formEdit.$detailFormDiv === undefined) {
						settings.formEdit.$detailFormDiv = $('#' + $.jgrid.jqID(IDs.themodal));
					}

					/*
                     * Creacion rup_form
                     */

					if (rtlb) {
						$('#pData, #nData', frmtb + '_2').css('float', 'right');
						$('.EditButton', frmtb + '_2').css('text-align', 'left');
					}
					if (rp_ge[$t.p.id].topinfo) {
						$('.tinfo', frmtb).show();
					}
					if (rp_ge[$t.p.id].bottominfo) {
						$('.binfo', frmtb + '_2').show();
					}
					tms = null;
					bt = null;
					$('#' + $.jgrid.jqID(IDs.themodal)).keydown(function (e) {
						var wkey = e.target;
						if ($('#' + frmgr).data('disabled') === true) {
							return false;
						} //??
						if (rp_ge[$t.p.id].savekey[0] === true && e.which == rp_ge[$t.p.id].savekey[1]) { // save
							if (wkey.tagName != 'TEXTAREA') {
								$('#sData', frmtb + '_2').trigger('click');
								return false;
							}
						}
						if (e.which === 27) {
							/* DEL 						if(!checkUpdates()) {return false;} */
							/* ADD */
							if (!$.proxy($.jgrid.checkUpdates, $t)(extpost)) {
								return false;
							}
							if (cle) {
								$.jgrid.hideModal('#' + $.jgrid.jqID(IDs.themodal), {
									gb: p.gbox,
									jqm: p.jqModal,
									onClose: rp_ge[$t.p.id].onClose
								});
							}
							return false;
						}
						if (rp_ge[$t.p.id].navkeys[0] === true) {
							if ($('#id_g', frmtb).val() == '_empty') {
								return true;
							}
							if (e.which == rp_ge[$t.p.id].navkeys[1]) { //up
								$('#pData', frmtb + '_2').trigger('click');
								return false;
							}
							if (e.which == rp_ge[$t.p.id].navkeys[2]) { //down
								$('#nData', frmtb + '_2').trigger('click');
								return false;
							}
						}
					});
					if (p.checkOnUpdate) {
						$('a.ui-jqdialog-titlebar-close span', '#' + $.jgrid.jqID(IDs.themodal)).removeClass('jqmClose');
						$('a.ui-jqdialog-titlebar-close', '#' + $.jgrid.jqID(IDs.themodal)).unbind('click')
							.click(function () {
								/* DEL 						if(!checkUpdates()) {return false;} */
								/* ADD */
								if (!$.proxy($.jgrid.checkUpdates, $t)(extpost)) {
									return false;
								}
								$.jgrid.hideModal('#' + $.jgrid.jqID(IDs.themodal), {
									gb: '#gbox_' + $.jgrid.jqID(gID),
									jqm: p.jqModal,
									onClose: rp_ge[$t.p.id].onClose
								});
								return false;
							});
					}
					p.saveicon = $.extend([true, 'left', 'ui-icon-disk'], p.saveicon);
					p.closeicon = $.extend([true, 'left', 'ui-icon-close'], p.closeicon);
					// beforeinitdata after creation of the form
					if (p.saveicon[0] === true) {
						$('#sData', frmtb + '_2').addClass(p.saveicon[1] == 'right' ? 'fm-button-icon-right' : 'fm-button-icon-left')
							.append('<span class=\'ui-icon ' + p.saveicon[2] + '\'></span>');
					}
					if (p.closeicon[0] === true) {
						$('#cData', frmtb + '_2').addClass(p.closeicon[1] == 'right' ? 'fm-button-icon-right' : 'fm-button-icon-left')
							.append('<span class=\'ui-icon ' + p.closeicon[2] + '\'></span>');
					}
					// here initform - only once
					$($t).triggerHandler('jqGridAddEditInitializeForm', [settings.formEdit.$detailForm, frmoper]);
					if (onInitializeForm) {
						onInitializeForm.call($t, settings.formEdit.$detailForm);
					}
					if (rowid == '_empty' || !rp_ge[$t.p.id].viewPagerButtons) {
						$('#pData,#nData', frmtb + '_2').hide();
					} else {
						$('#pData,#nData', frmtb + '_2').show();
					}
					$($t).triggerHandler('jqGridAddEditBeforeShowForm', [settings.formEdit.$detailForm, frmoper]);
					if (onBeforeShow) {
						onBeforeShow.call($t, settings.formEdit.$detailForm);
					}
					$('#' + $.jgrid.jqID(IDs.themodal)).data('onClose', rp_ge[$t.p.id].onClose);
					$.jgrid.viewModal('#' + $.jgrid.jqID(IDs.themodal), {
						gbox: '#gbox_' + $.jgrid.jqID(gID),
						jqm: p.jqModal,
						overlay: p.overlay,
						modal: p.modal
					});
					if (!closeovrl) {
						$('.jqmOverlay').click(function () {
							/* DEL 						if(!checkUpdates()) {return false;} */
							/* ADD */
							if (!$.proxy($.jgrid.checkUpdates, $t)(extpost)) {
								return false;
							}
							$.jgrid.hideModal('#' + $.jgrid.jqID(IDs.themodal), {
								gb: '#gbox_' + $.jgrid.jqID(gID),
								jqm: p.jqModal,
								onClose: rp_ge[$t.p.id].onClose
							});
							return false;
						});
					}
					$($t).triggerHandler('jqGridAddEditAfterShowForm', [settings.formEdit.$detailForm, frmoper]);
					if (onAfterShow) {
						onAfterShow.call($t, settings.formEdit.$detailForm);
					}
					$('.fm-button', '#' + $.jgrid.jqID(IDs.themodal)).hover(
						function () {
							$(this).addClass('ui-state-hover');
						},
						function () {
							$(this).removeClass('ui-state-hover');
						}
					);

				}
				var posInit = $.proxy($.jgrid.getCurrPos, $t)();
				$self.rup_jqtable('updateDetailPagination');
				$.proxy($.jgrid.updateNav, $t)(posInit[0], posInit[1].length - 1);
			});
		}
	});

	$.fn.jqGrid.rup = {};
	$.fn.jqGrid.rup.edit = {
		detail: {
			detailDivId: 'detailDiv_',
			detailBodyId: 'detailBody_',
			detailFormId: 'detailForm_'
		},
		navigation: {
			forward: {
				id: '#nData'
			},
			back: {
				id: '#pData'
			}
		}
	};


	//*******************************************************
	// DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
	//*******************************************************

	/**
	* @description Propiedades de configuración del plugin formEdit del componente RUP Table.
	* @see Las posibles propiedades que se pueden indicar en cada una de las siguientes propiedades, se especifican con más detalle en la documentación del plugin subyacente jqGrid.
	* @name options
	*
	* @property {object} [addEditOptions] - Propiedades de configuración comunes a las acciones de edición e inserciónde un registro.
	* @property {object} [addOptions] - Propiedades de configuración exclusivas de la acción de inserción de un registro. Sobrescriben las indicadas en la propiedad addEditOptions.
	* @property {object} [editOptions] - Propiedades de configuración exclusivas de la acción de edición de un registro. Sobrescriben las indicadas en la propiedad addEditOptions.
	* @property {object} [deleteOptions] - Propiedades de configuración de la acción de borrado de un registro.
	* @property {object} [detailOptions] - Propiedades de configuración de la acción de mostrar un registro mediante el formulario de detalle.
	* @property {boolean} [defaultCompareData] - Determina si se debe de realizar la comparación por defecto en el control de cambios del formulario de edición. Por defecto a true.
	* @property {object} [dialogOptions] - Permite especificar opciones de configuración para el diálogo que contiene el formulario de detalle. Las opciones de configuración se pueden consultar en la guía de desarrollo del componente RUP Diálogo.
	*/
	jQuery.fn.rup_jqtable.plugins.formEdit = {};
	jQuery.fn.rup_jqtable.plugins.formEdit.defaults = {
		toolbar: {
			defaultButtons: {
				add: true,
				edit: true,
				cancel: false,
				save: false,
				clone: true,
				'delete': true,
				filter: false
			}
		},
		contextMenu: {
			defaultRowOperations: {
				add: true,
				edit: true,
				cancel: false,
				save: false,
				clone: true,
				'delete': true,
				filter: false
			}
		},
		formEdit: {
			autoselectFirstRecord: true,
			ownFormEdit: false,
			detailFormCreated: false,
			dialogOptions: {}
		}
	};


	// Parámetros de configuración por defecto para la acción de eliminar un registro.
	jQuery.fn.rup_jqtable.plugins.formEdit.defaults.formEdit.deleteOptions = {
		bSubmit: jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_message.aceptar'),
		cancelicon: [false, 'left', 'icono_cancelar'],
		delicon: [false],
		linkStyleButtons: ['#eData'],
		msg: '<div id="rup_msgDIV_msg_icon" class="rup-message_icon-confirm"></div><div id="rup_msgDIV_msg" class="rup-message_msg-confirm white-space-normal">' + jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_jqtable.deleteAll') + '</div>',
		mtype: 'DELETE',
		width: 320,
		reloadAfterSubmit: false,
		resize: false,
		useDataProxy: true

	};

	// Parámetros de configuración por defecto para la acción de añadir y editar un registro.
	jQuery.fn.rup_jqtable.plugins.formEdit.defaults.formEdit.addEditOptions = {
		bSubmit: jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_message.aceptar'),
		closeicon: [false],
		checkOnUpdate: true,
		defaultCompareData: true,
		fillDataMethod: 'serverSide', // clientSide || serverSide
		saveicon: [false],
		linkStyleButtons: ['#cData'],
		msg: '<div id="rup_msgDIV_msg_icon" class="rup-message_icon-confirm"></div><div id="rup_msgDIV_msg" class="rup-message_msg-confirm white-space-normal">' + jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_jqtable.deleteAll') + '</div>',
		mtype: 'PUT',
		reloadAfterSubmit: false,
		resize: false,
		viewPagerButtons: false, // TODO: no permitir el habilitarlo
		width: 569,
		ajaxEditOptions: {
			type: 'PUT',
			dataType: 'json',
			processData: false
		}
	};

	// Parámetros de configruación específicos para la acción de añadir un registro
	jQuery.fn.rup_jqtable.plugins.formEdit.defaults.formEdit.addOptions = {
		mtype: 'POST',
		ajaxEditOptions: {
			type: 'POST'
		}
	};

	// Parámetros de configruación específicos para la acción de editar un registro
	jQuery.fn.rup_jqtable.plugins.formEdit.defaults.formEdit.editOptions = {
		mtype: 'PUT',
		ajaxEditOptions: {
			type: 'PUT'
		}
	};

	// Parámetros de configuración por defecto para la obtención del detalle de un registro
	jQuery.fn.rup_jqtable.plugins.formEdit.defaults.formEdit.detailOptions = {
		ajaxDetailOptions: {
			dataType: 'json',
			type: 'GET',
			contentType: 'application/json'
		}
	};


	/* ********* */
	/* EVENTOS
  /* ********* */

	/**
	*  Evento que se lanza justo antes de procesarse la petición de borrado de un registro. En caso de devolver false se detiene la ejecución del borrado.
	*
	* @event module:rup_jqtable#rupTable_beforeDeleteRow
	* @property {Event} event - Objeto Event correspondiente al evento disparado.
	* @property {object} deleteOptions - Opciones de configuración de la operación de borrado.
	* @property {string} selectedRow - Identificador de la fila que se desea eliminar.
	* @example
	* $("#idComponente").on("rupTable_beforeDeleteRow", function(event, deleteOptions, selectedRow){ });
	*/

	/**
	*  Evento que se lanza justo antes de procesarse la petición de edición de un registro. En caso de devolver false se detiene la ejecución del borrado.
	*
	* @event module:rup_jqtable#rupTable_beforeEditRow
	* @property {Event} event - Objeto Event correspondiente al evento disparado.
	* @property {object} editOptions - Opciones de configuración de la operación de edición.
	* @property {string} selectedRow - Identificador de la fila que se desea editar.
	* @example
	* $("#idComponente").on("rupTable_beforeEditRow", function(event, editOptions, selectedRow){ });
	*/

	/**
	*  Evento que se lanza justo después de realizarse la petición de borrado de un registro.
	*
	* @event module:rup_jqtable#rupTable_deleteAfterSubmit
	* @property {Event} event - Objeto Event correspondiente al evento disparado.
	* @example
	* $("#idComponente").on("rupTable_deleteAfterSubmit", function(event){ });
	*/

	/**
	*  Evento lanzado antes de ejecutarse el método de inserción de un registro. En caso de retornar false se cancelará la inserción.
	*
	* @event module:rup_jqtable#rupTable_beforeAddRow
	* @property {Event} event - Objeto Event correspondiente al evento disparado.
	* @property {object} addOptions -  Opciones de configuración de la acción de insertar un elemento.
	* @example
	* $("#idComponente").on("rupTable_beforeAddRow", function(event, addOptions){ });
	*/

	/**
	*  Evento lanzado antes de ejecutarse el método de clonado de un registro. En caso de retornar false se cancelará el clonado.
	*
	* @event module:rup_jqtable#rupTable_beforeCloneRow
	* @property {Event} event - Objeto Event correspondiente al evento disparado.
	* @property {object} cloneOptions - Opciones de configuración de la operación de clonado.
	* @property {string} selectedRow - Identificador de la fila que se desea clonar.
	* @example
	* $("#idComponente").on("rupTable_beforeCloneRow", function(event, cloneOptions, selectedRow){ });
	*/
	/**
	*  Evento lanzado antes de ejecutarse el método de clonado de un registro. En caso de retornar false se cancelará el clonado.
	*
	* @event module:rup_jqtable#rupTable_beforeCloneRow
	* @property {Event} event - Objeto Event correspondiente al evento disparado.
	* @property {object} cloneOptions - Opciones de configuración de la operación de clonado.
	* @property {string} selectedRow - Identificador de la fila que se desea clonar.
	* @example
	* $("#idComponente").on("rupTable_beforeCloneRow", function(event, cloneOptions, selectedRow){ });
	*/


	/**
	*  Evento lanzado después de que ha finalizado correctamente el proceso de eliminar un registro..
	*
	* @event module:rup_jqtable#rupTable_afterDeleteRow
	* @property {Event} event - Objeto Event correspondiente al evento disparado.
	* @example
	* $("#idComponente").on("rupTable_afterDeleteRow", function(event){ });
	*/

	/**
	*  Evento lanzado después de que ha finalizado correctamente el proceso de carga de datos en el formulario de edición a partir de una petición al servidor de aplicaciones.
	*
	* @event module:rup_jqtable#rupTable_afterFormFillDataServerSide
	* @property {Event} event - Objeto Event correspondiente al evento disparado.
	* @property {object} xhr - Objeto enviado como respuesta desde el servidor.
	* @property {object} $detailFormToPopulate - Referencia al formulario de detalle.
	* @property {object} ajaxOptions - Opciones de configuración de la petición AJAX.
	* @example
	* $("#idComponente").on("rupTable_afterFormFillDataServerSide", function(event, xhr, $detailFormToPopulate, ajaxOptions){ });
	*/
	/**
	*  : Permite asociar manejadores de eventos para ejecutar
	código que indique al proceso de control de cambios si se han producido modificaciones o no.

	*
	* @event module:rup_jqtable#rupTable_formEditCompareData
	* @property {Event} event - Objeto Event correspondiente al evento disparado.
	* @property {object} savedData - Objeto que contiene los valores iniciales del formulario a partir de la serialización del mismo.
	* @property {object} newData - Objeto que contiene los valores actuales del formulario a partir de la serialización del mismo.
	* @example
	* $("#idComponente").on("rupTable_formEditCompareData ", function(event,	savedData, newData){
	*		// Se realizan las comprobaciones necesarias para determinar si se han producido cambios en el formulario de detalle
	*		event.isDifferent = true; // En caso de que se hayan producido cambios.
	*  	event.isDifferent = false; // En caso de que no hayan producido cambios.
	* });
	*/

})(jQuery);

/*!
 * Copyright 2013 E.J.I.E., S.A.
 *
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
 */

/*global jQuery */

(function ($) {

	/**
	 * Definición de los métodos principales que configuran la inicialización del plugin.
	 *
	 * preConfiguration: Método que se ejecuta antes de la invocación del componente jqGrid.
	 * postConfiguration: Método que se ejecuta después de la invocación del componente jqGrid.
	 *
	 */

	/**
	 * Permite la edición de los registros de la tabla mostrando los campos de edición sobre la propia línea del registro.
	 *
	 * @summary Plugin de edición en línea del componente RUP Table.
	 * @module rup_jqtable/inlineEdit
	 * @example
	 *
	 * $("#idComponente").rup_jqtable({
	 * 	url: "../jqGridUsuario",
	 * 	usePlugins:["inlineEdit"],
	 * 	inlineEdit:{
	 * 		// Propiedades de configuración del plugin inlineEdit
	 * 	}
	 * });
	 */
	jQuery.rup_jqtable.registerPlugin('inlineEdit',{
		loadOrder:7,
		preConfiguration: function(settings){
			var $self = this;

			$self.rup_jqtable('preConfigureInlineEdit',settings);
		},
		postConfiguration: function(settings){
			var $self = this;

			$self.rup_jqtable('postConfigureInlineEdit',settings);
		}
	});

	/**
	 * Extensión del componente rup_jqtable para permitir la edición en línea de los registros visualizados.
	 *
	 * Los métodos implementados son:
	 *
	 * configureInlineEdit(settings): Realiza la configuración interna necesaria para la gestión correcta de la edición en línea.
	 * editRow(rowId, options): Activa el modo edicón en línea para un registro determinado.
	 * saveRow(rowId, options): Realiza el guardado de un registo modificado mediante la edición en línea.
	 *
	 * Las propiedades de esta extensión almacenadas en el settings son las siguientes:
	 *
	 * settings.$inlineForm : Referencia al formulario utilizado para enviar los datos del registro que está siendo editado.
	 *
	 */
	jQuery.fn.rup_jqtable('extend',{
		/**
		* Metodo que realiza la pre-configuración del plugin inlineEdit del componente RUP Table.
		* Este método se ejecuta antes de la incialización del plugin.
		*
		* @name preConfigureInlineEdit
		* @function
		* @param {object} settings - Parámetros de configuración del componente.
		*/
		preConfigureInlineEdit: function(settings){
			var $self = $(this), self = $self[0],
				//				formId = "inlineForm_" + settings.id,
				userBeforeSend;
			//				$inlineForm =$("<form>").attr({"id":"inlineForm_" + settings.id});

			settings.editable = true;
			//			// Arropamos la estructura de la tabla en un formulario para poder realizar el envío de los campos
			//			$self.wrap($inlineForm);
			//			// Almacenamos la referencia al formulario.
			//			settings.inlineEdit.$inlineForm = $("#"+formId);

			if (settings.inlineEdit.addEditOptions.url===undefined){
				settings.inlineEdit.addEditOptions.url=settings.baseUrl;
			}

			settings.inlineEdit.deleteOptions.ajaxDelOptions = $.extend(true, settings.inlineEdit.deleteOptions.ajaxDelOptions, {
				success: function(data,st, xhr){
					$self.triggerHandler('rupTableAfterDelete', [data,st, xhr]);
					$self.rup_jqtable('showFeedback', settings.$feedback, $.rup.i18nParse($.rup.i18n.base,'rup_jqtable.deletedOK'), 'ok');
				}
			});

			/*
			 * Configuración del evetno beforeSend. Se sustituye el existente (en caso de haber)
			 * por el implementado a continuación. El objetivo es realizar la operación AJAX mediante
			 * el componente rup_formulario en vez del sistema por defecto del jqGrid.
			 *
			 * El método beforeSend indicado por el usuario se seguirá ejecutanto de manera normal.
			 */
			// Se almacena en una variable temporal el método beforeSend especificado por el usuario
			userBeforeSend = settings.inlineEdit.beforeSend;
			settings.inlineEdit.addEditOptions.restoreAfterError = false;
			settings.inlineEdit.addEditOptions.errorfunc = function(rowid, data, stat, err, o){
				 var responseJSON;
				 if (data.status === 406 && data.responseText!== ''){
					 try{
						 responseJSON = jQuery.parseJSON(data.responseText);
						 if (responseJSON.rupErrorFields){
							 $self.rup_jqtable('showServerValidationFieldErrors',settings.inlineEdit.$inlineForm, responseJSON);
						 }
					 }catch(e){
						 // El mensaje JSON
						 $self.rup_jqtable('showFeedback', settings.$feedback, data.responseText, 'error');
					 }
				 }
			};

			settings.inlineEdit.addEditOptions.ajaxRowOptions.beforeSend = function(jqXHR, ajaxOptions){
				// Se añade la configuración de validaciones, la función userBeforeSend indicada por el usuario y el feedback utilizado por el componente.
				jQuery.extend(true, ajaxOptions, {
					validate: settings.validate,
					beforeSend:(jQuery.isFunction(userBeforeSend)?userBeforeSend:null),
					feedback: settings.$feedback

				});

				// Handler del evento rupValidate_formValidationError. Se lanza cuando se produce un error de validación en el formulario.
				settings.inlineEdit.$inlineForm.on('rupValidate_formValidationError.inlineEditing', function(event, obj){
					$self.off('rupValidate_formValidationError.inlineEditing');
					// Se elimina la capa de bloqueo de la tabla.
					$('#lui_'+$.jgrid.jqID(settings.id)).hide();
				});

				// Se realiza el envío del fomulario
				settings.inlineEdit.$inlineForm.rup_form('ajaxSubmit', ajaxOptions);

				// Se retorna false para evitar que se realice la petición AJAX del plugin subyacente.
				return false;
			};

			// Fuerza la configuración para que solo se pueda seleccionar mediante el checkbox
			settings.multiboxonly = true;

			settings.getRowForEditing = function(){
				var $self = this,
					selrow=$self.jqGrid('getGridParam','selrow');

				return (selrow===null?false:selrow);
			};

			/* DEFINICION DE OPERACIONES BASICAS CON LOS REGISTROS */

			settings.core.defaultOperations = {
				'add': {
					name: $.rup.i18nParse($.rup.i18n.base,'rup_jqtable.new'),
					icon: self._ADAPTER.CONST.core.operations.defaultOperations.add.icon,
					enabled: function(){
						var $self = this;
						return jQuery('tr[editable=\'1\']', $self).length===0;
					},
					callback: function(key, options){
						var $self = this;
						$self.rup_jqtable('addRow');
					}
				},
				'edit': {
					name: $.rup.i18nParse($.rup.i18n.base,'rup_jqtable.modify'),
					icon: self._ADAPTER.CONST.core.operations.defaultOperations.edit.icon,
					enabled: function(){
						var $self = this,
							selrow=$self.jqGrid('getGridParam','selrow'),
							newRow;

						// Existe una fila seleccionada?
						selrow = (selrow===null?false:selrow);
						selrow = selrow && (selrow.indexOf('jqg')===-1);

						// Existe una fila en modo nuevo?
						newRow = jQuery('tr[editable=\'1\'].jqgrid-new-row', $self).length===0;

						return selrow && newRow;
					},
					callback: function(key, options){
						$self.rup_jqtable('editRow', jQuery.proxy(settings.getRowForEditing,$self)());
					}
				},
				'save': {
					name: $.rup.i18nParse($.rup.i18n.base,'rup_jqtable.save'),
					icon: self._ADAPTER.CONST.core.operations.defaultOperations.save.icon,
					enabled: function(){
						var $self = this;
						return jQuery('tr[editable=\'1\']', $self).length>0;
					},
					callback: function(object,event){
						if(event.type === 'click'){
							$self.rup_jqtable('saveRow');
						}
					}
				},
				'clone': {
					name: $.rup.i18nParse($.rup.i18n.base,'rup_jqtable.clone'),
					icon: self._ADAPTER.CONST.core.operations.defaultOperations.clone.icon,
					enabled: function(){
						var $self = this,
							selrow=$self.jqGrid('getGridParam','selrow'),
							newRow;

						// Existe una fila seleccionada?
						selrow = (selrow===null?false:selrow);
						selrow = selrow && (selrow.indexOf('jqg')===-1);

						// Existe una fila en modo nuevo?
						newRow = jQuery('tr[editable=\'1\'].jqgrid-new-row', $self).length===0;

						return selrow && newRow;

						//						if (settings.inlineEdit.autoEditRow===true){
						//							return $self.rup_jqtable("getSelectedRows").length === 1;
						//						}else{
						//							return $self.rup_jqtable("getSelectedRows").length === 1 && jQuery("tr[editable='1']", $self).length===0;
						//						}

					},
					callback: function(key, options){
						if (jQuery('tr[editable=\'1\']', $self).length>0){
							$self.rup_jqtable('restoreRow');
						}
						$self.rup_jqtable('cloneRow');
					}
				},
				'cancel': {
					name: $.rup.i18nParse($.rup.i18n.base,'rup_jqtable.cancel'),
					icon: self._ADAPTER.CONST.core.operations.defaultOperations.cancel.icon,
					enabled: function(){
						var $self = this;
						return jQuery('tr[editable=\'1\']', $self).length>0;
					},
					callback: function(key, options){
						$self.rup_jqtable('restoreRow');
					}
				},
				'delete': {
					name: $.rup.i18nParse($.rup.i18n.base,'rup_jqtable.delete'),
					icon: self._ADAPTER.CONST.core.operations.defaultOperations['delete'].icon,
					enabled: function(){
						var $self = this,
							selrow=$self.jqGrid('getGridParam','selrow');

						selrow = (selrow===null || selrow.indexOf('jqg')!==-1?false:selrow);

						return jQuery('tr[editable=\'1\']:not(.jqgrid-new-row)', $self).length>0 || selrow;
					},
					callback: function(key, options){
						$self.rup_jqtable('deleteRow');
					}
				}
			};
			
			$.extend(true, settings.core.operations, settings.core.defaultOperations);
			
			// Configuración de edit/add
			// Se procede a añadir sobre los settings de configuración los correspondientes a la edición en línea.
			settings.inlineEdit.addOptions = $.extend(true,{}, settings.inlineEdit.addEditOptions, settings.inlineEdit.addOptions);
			settings.inlineEdit.editOptions = $.extend(true,{}, settings.inlineEdit.addEditOptions, settings.inlineEdit.editOptions);


			/* =======
			 * EVENTOS
			 * =======
			 */
			// Campturador del evento jqGridInlineAfterSaveRow.
			$self.on({
				//				"jqGridAfterInsertRow.rupTable.inlineEditing": function(event, rowid, data, data){
				//					jQuery($self.getInd(rowid, true)).attr("editmode","add");
				//
				//				},
				'jqGridInlineErrorSaveRow.rupTable.inlineEditing': function(event, rowid, data){
					jQuery($self.getInd(rowid,true)).attr('id',settings.inlineEditingRow);
					$self.rup_jqtable('setSelection',settings.inlineEditingRow);
				},
				'jqGridInlineAfterSaveRow.rupTable.inlineEditing': function(event, rowid, res, tmp, options){

					// Una vez introducida la fila se elimina el estilo jqgrid-new-row para evitar que se elimine al utilizar el cancelar sobre esa fila.
					jQuery('#'+jQuery.jgrid.jqID(rowid)+'.jqgrid-new-row', $self).removeClass('jqgrid-new-row');

					// Una vez se haya realizado el guardado del registro se muestra el mensaje correspondiente en el feedback dependiendo del modo en el que se encuentra.
					if (options.oper === 'edit') {
						$self.rup_jqtable('showFeedback', settings.$feedback, $.rup.i18nParse($.rup.i18n.base,'rup_jqtable.modifyOK'), 'ok');
					} else {
						$self.rup_jqtable('showFeedback', settings.$feedback, $.rup.i18nParse($.rup.i18n.base,'rup_jqtable.insertOK'), 'ok');
					}
				},
				'jqGridInlineEditRow.rupTable.inlineEditing': function oneditfunc_default(event, rowId){
					var self = this, $self = $(self),
						settings = $self.data('settings'),
						colModel = self.p.colModel,
						ind = $self.jqGrid('getInd', rowId, true),
						cellColModel, colModelName, editOptions, $elem;

					// Se procesan las celdas editables
					$('td[role=\'gridcell\']',ind).each( function(i) {
						cellColModel = colModel[i];

						if(cellColModel.editable===true){
							colModelName = cellColModel.name;
							$elem = $('[name=\''+colModelName+'\']',ind);



							// Se añade el title de los elementos de acuerdo al colname
							$elem.attr({
								'oldtitle': self.p.colNames[i],
								'class': 'editable customelement'
							});

							// En caso de tratarse de un componente rup, se inicializa de acuerdo a la configuracón especificada en el colModel
							if(cellColModel.rupType!==undefined) {
								editOptions = cellColModel.editoptions;

								/*
								 * PRE Configuración de los componentes RUP
								 */
								switch(cellColModel.rupType){
								case 'combo':
									editOptions = $.extend({menuWidth:$elem.width()}, editOptions, {width:'100%'});
									break;
								}

								// Invocación al componente RUP
								$elem['rup_'+cellColModel.rupType](editOptions);

								/*
								 * POST Configuración de los componentes RUP
								 */
								switch(cellColModel.rupType){
								case 'date':
									// TODO: Aplicarlo con estilos
									$elem.css('width','88%');
									break;
								}
							}
						}
					});

					settings.inlineEditingRow = rowId;

					function addNextRow (rowId, iCol){
						$self.on('jqGridInlineAfterSaveRow.inlineEditing.addNextRow', function(event){
							$self.rup_jqtable('addRow');
							jQuery($self.getInd($self[0].p.selrow, true)).find(':not([readonly]):focusable:first').focus();
							$self.off('jqGridInlineAfterSaveRow.inlineEditing.addNextRow');
						});

						$self.rup_jqtable('saveRow', rowId);
						return true;
					}

					function editNextRow (rowId, iCol){
						var idsArray, rowIndex, rowsPerPage, page, lastPage, $focusableElem;
						idsArray = $self.getDataIDs();
						rowIndex = $self.getInd(rowId)-1;
						rowsPerPage = parseInt($self.rup_jqtable('getGridParam', 'rowNum'),10);


						if (rowIndex===rowsPerPage-1){
							// Cambio de página
							page = parseInt($self.rup_jqtable('getGridParam', 'page'),10);
							lastPage = parseInt(Math.ceil($self.rup_jqtable('getGridParam', 'records')/$self.rup_jqtable('getGridParam', 'rowNum')),10);
							if (page<lastPage){
								$self.trigger('reloadGrid',[{page: page+1}]);
								$self.on('jqGridAfterLoadComplete.rupTable.inlineEdit',function(event,data){
									idsArray = $self.getDataIDs();
									$self.on('jqGridInlineEditRow.rupTable.inlineEditing.tabKeyNav.cellSelected', function (event, rId){
										if (iCol === undefined || iCol === -1){
											$focusableElem = jQuery($self.jqGrid('getInd',rId, true)).find('td :not([readonly]):focusable:first');
										}else{
											$focusableElem = jQuery($self.jqGrid('getInd',rId, true)).find('td:eq('+iCol+') :not([readonly]):focusable:first');
										}
										$focusableElem.trigger('focus');
										$self.off('jqGridInlineEditRow.rupTable.inlineEditing.tabKeyNav.cellSelected');
									});
									jQuery($self.getInd(idsArray[0],true)).trigger('click');
									$self.off('jqGridAfterLoadComplete.rupTable.inlineEdit');
								});
								return false;
							}

						}else{
							$self.on('jqGridInlineEditRow.rupTable.inlineEditing.tabKeyNav.cellSelected', function (event, rId){
								if (iCol === undefined || iCol === -1){
									$focusableElem = jQuery($self.jqGrid('getInd',rId, true)).find('td :not([readonly]):focusable:first');
								}else{
									$focusableElem = jQuery($self.jqGrid('getInd',rId, true)).find('td:eq('+iCol+') :not([readonly]):focusable:first');
								}
								$focusableElem.trigger('focus');
								$self.off('jqGridInlineEditRow.rupTable.inlineEditing.tabKeyNav.cellSelected');
							});
							jQuery($self.getInd(idsArray[rowIndex+1],true)).trigger('click');
							return false;
						}
						return true;
					}

					function editPreviousRow (rowId, iCol){
						var idsArray, rowIndex, page, $focusableElem;
						idsArray = $self.getDataIDs();
						rowIndex = $self.getInd(rowId)-1;

						if (rowIndex===0){
							// Cambio de página
							page = parseInt($self.rup_jqtable('getGridParam', 'page'),10);

							if (page>1){
								$self.trigger('reloadGrid',[{page: page-1}]);
								$self.on('jqGridAfterLoadComplete.rupTable.inlineEdit',function(event,data){
									idsArray = $self.getDataIDs();
									$self.on('jqGridInlineEditRow.rupTable.inlineEditing.tabKeyNav.cellSelected', function (event, rId){
										if (iCol === undefined || iCol === -1){
											$focusableElem = jQuery($self.jqGrid('getInd',rId, true)).find('td :not([readonly]):focusable:last');
										}else{
											$focusableElem = jQuery($self.jqGrid('getInd',rId, true)).find('td:eq('+iCol+') :not([readonly]):focusable:last');
										}
										$focusableElem.trigger('focus');
										$self.off('jqGridInlineEditRow.rupTable.inlineEditing.tabKeyNav.cellSelected');
									});
									jQuery($self.getInd(idsArray[idsArray.length-1],true)).trigger('click');

									$self.off('jqGridAfterLoadComplete.rupTable.inlineEdit');
								});
								return false;
							}

						}else{
							$self.on('jqGridInlineEditRow.rupTable.inlineEditing.tabKeyNav.cellSelected', function (event, rId){
								if (iCol === undefined || iCol === -1){
									$focusableElem = jQuery($self.jqGrid('getInd',rId, true)).find('td :not([readonly]):focusable:last');
								}else{
									$focusableElem = jQuery($self.jqGrid('getInd',rId, true)).find('td:eq('+iCol+') :not([readonly]):focusable:last');
								}
								$focusableElem.trigger('focus');
								$self.off('jqGridInlineEditRow.rupTable.inlineEditing.tabKeyNav.cellSelected');
							});
							jQuery($self.getInd(idsArray[rowIndex-1],true)).trigger('click');

							return false;
						}
					}


					// Se almacena el contenido del los campos de la línea editable
					// TODO: Externalizar la obtención de los datos para comprobar los cambios
					$self.data('initialFormData',settings.inlineEdit.$inlineForm.rup_form('formSerialize'));
					// Se añaden los eventos de teclado
					jQuery(ind).on({
						'keydown': function(event) {
							if (event.keyCode === 27) {
								$self.rup_jqtable('restoreRow',$(this).attr('id'), settings.afterrestorefunc);
								return false;
							}
							if (event.keyCode === 13) {
								var ta = event.target;
								if(ta.tagName == 'TEXTAREA') {
									return true;
								}
								$self.rup_jqtable('saveRow');
								return false;
							}
						}
					});

					jQuery('td', jQuery(ind)).on({
						'keydown': function(event) {
							var iCol, nameArray;

							if (event.keyCode === 38) {
								nameArray = $.map($self.rup_jqtable('getColModel'),function(elem, index){
									   return elem.name;
								});
								iCol = jQuery.inArray($(this).attr('aria-describedby').split(settings.id+'_')[1], nameArray);
								editPreviousRow($(ind).attr('id'), iCol);
								return false;
							}
							if (event.keyCode === 40) {
								nameArray = $.map($self.rup_jqtable('getColModel'),function(elem, index){
								   return elem.name;
								});
								iCol = jQuery.inArray($(this).attr('aria-describedby').split(settings.id+'_')[1], nameArray);
								editNextRow($(ind).attr('id'), iCol);
								return false;
							}
						}
					});

					jQuery('input,select', jQuery(ind)).on({
						'focus': function(event){
							//							var $row = $(this).parent().parent();
							//
							//							settings.inlineEditingRow  = $row.attr("id");
							//							$self.rup_jqtable("setSelection",$row.attr("id"));
						}
					});

					jQuery('input, textarea, select,a.rup_combo', jQuery(ind)).filter('.editable:visible:last').on({
						'keydown': function(event){
							if (event.keyCode == 9 && !event.shiftKey) {
								if (jQuery(ind).attr('id').indexOf('jqg')!==-1){
									if(addNextRow(jQuery(ind).attr('id'))===false){
										return false;
									}
								}else{
									if(editNextRow(jQuery(ind).attr('id'))===false){
										return false;
									}
								}
							}
						}
					});

					jQuery('input, textarea, select,a.rup_combo', jQuery(ind)).filter('.editable:visible:first').on({
						'keydown': function(event){
							var idsArray, rowIndex, page;
							if (event.keyCode == 9) {
								if (event.shiftKey) {

									idsArray = $self.getDataIDs();
									rowIndex = $self.getInd(rowId)-1;

									if (rowIndex===0){
										// Cambio de página
										page = parseInt($self.rup_jqtable('getGridParam', 'page'),10);

										if (page>1){
											$self.trigger('reloadGrid',[{page: page-1}]);
											$self.on('jqGridAfterLoadComplete.rupTable.inlineEdit',function(event,data){
												idsArray = $self.getDataIDs();
												$self.on('jqGridInlineEditRow.rupTable.inlineEditing.tabKeyNav.cellSelected', function (event, rowId){
													jQuery($self.jqGrid('getInd',rowId, true)).find('td :focusable:last').trigger('focus');
													$self.off('jqGridInlineEditRow.rupTable.inlineEditing.tabKeyNav.cellSelected');
												});
												jQuery($self.getInd(idsArray[idsArray.length-1],true)).trigger('click');

												$self.off('jqGridAfterLoadComplete.rupTable.inlineEdit');
											});
											return false;
										}

									}else{
										$self.on('jqGridInlineEditRow.rupTable.inlineEditing.tabKeyNav.cellSelected', function (event, rowId){
											jQuery($self.jqGrid('getInd',rowId, true)).find('td :focusable:last').trigger('focus');
											$self.off('jqGridInlineEditRow.rupTable.inlineEditing.tabKeyNav.cellSelected');
										});
										jQuery($self.getInd(idsArray[rowIndex-1],true)).trigger('click');

										return false;
									}

								}
							}
						}
					});

				},
				'jqGridDblClickRow.rupTable.inlineEdit': function (rowid, iRow, iCol, e){
					if (!settings.inlineEdit.autoEditRow){
						$self.rup_jqtable('editRow', iRow);
					}else{
						return false;
					}
				},
				'jqGridInlineAfterRestoreRow.inlineEditing.processRupObjects': function(event, rowid){
					var self = this, $self = $(this),
						json = self.p.savedRow[0];

					$self.rup_jqtable('restoreInlineRupFields', rowid, json);
				},
				'rupTable_beforeSaveRow.inlineEditing.processRupObjects': function(event, rowid, options){
					var self = this, $self = $(this), $row, $cell, ruptypeObj;

					$(self.p.colModel).each(function(i){

						$row= $(self.rows.namedItem(rowid));
						$cell = $row.find('td:eq('+i+')');
						ruptypeObj =  $cell.find('[ruptype]:not([autocomplete])');

						if (ruptypeObj.attr('ruptype')==='combo'){

							if ($self.data('rup.jqtable.formatter')!==undefined){
								$self.data('rup.jqtable.formatter')[rowid][this.name]['rup_'+ruptypeObj.attr('rupType')]= {
									'label':ruptypeObj.rup_combo('label'),
									'value':ruptypeObj.rup_combo('getRupValue')
								};
							}
						} else if (ruptypeObj.attr('ruptype')==='autocomplete' && ruptypeObj.attr('rup_autocomplete_label')){
							if ($self.data('rup.jqtable.formatter')!==undefined){
								$self.data('rup.jqtable.formatter')[rowid][this.name]['rup_'+ruptypeObj.attr('rupType')]= {
									'label':$('[id="'+ruptypeObj.attr('id')+'_label"]').val(),
									'value':ruptypeObj.rup_autocomplete('getRupValue')
								};
							}
						}
					});
				},
				'jqGridInlineSuccessSaveRow.rupTable.inlineEditing.processRupObjects': function(event, res, rowid, o){

					var json = jQuery.parseJSON(res.responseText),
						self = this, $self = $(self);

					$self.rup_jqtable('restoreInlineRupFields', rowid, json);

					return [true, json, rowid];
				},
				'jqGridBeforeSelectRow.rupTable.inlineEditing': function(event, rowid, obj){
					var $self = $(this),
						settings = $self.data('settings'),
						editableRows = $('tr[editable=1]', $self);
					/*
					 * Se comprueba si existen registros que estén siendo editados en línea.
					 * Del mismo modo se comprueba si el registro seleccionado es diferente del que se está editando en ese momento.
					 */
					if (editableRows.length > 0 && (settings.inlineEditingRow!== undefined && settings.inlineEditingRow !== rowid)){
						// Se comprueba si se han realizado cambios en el registro en edición
						// TODO: Utilizar un método para comprobar los cambios en el formulario
						if ($self.data('initialFormData') !== settings.inlineEdit.$inlineForm.rup_form('formSerialize')){
							// En caso de que se hayan realizado cambios se debera de realizar el guardado de los mismos.

							// Se confiura un handler para el evento jqGridInlineSuccessSaveRow que indica que se ha completado con exito el guardado del registro modificado.
							$self.on('jqGridInlineSuccessSaveRow.inlineEditing_beforeSelectRow', function(event){
								// Una vez se haya realizado correctamente el guardado del registo se procede a seleccionar el registro solicitado por el usuario.
								$self.rup_jqtable('setSelection',rowid);
								// Se elimina el handler del evento para evitar duplicidades
								$self.off('jqGridInlineSuccessSaveRow.inlineEditing_beforeSelectRow');
							});

							// Se procede a realizar el guardado de los registros editados
							for (var i=0; i<editableRows.length;i++){
								$self.rup_jqtable('saveRow', editableRows[0].id);
							}

							// Se retorna un false para deterner la selección del registro y permitir que se realice antes la gestión del guardado.
							return false;
						}
					}

					// En caso de no necesitarse guardar el registro en edición se continúa con la gestión de la selección de manera normal.
					return true;
				},
				'jqGridSelectRow.rupTable.inlineEditing': function (event, rowid, status, obj){
					var $self = $(this), editableRows;
					editableRows = $('tr[editable=1]', $self);

					// En caso de que existan registros en modo edición se restauran
					if (editableRows.length > 0){
						jQuery.each($('tr[editable=1]', $self), function(index, elem){
							if ($(elem).attr('id')!==rowid){
								$self.jqGrid('restoreRow', $(elem).attr('id'));
							}
						});
					}

					if (settings.inlineEdit.autoEditRow){
						// Se procede a entrar en modo edición en la línea seleccionada.
						$self.rup_jqtable('editRow', rowid);
					}
				},
				'rupTable_checkOutOfGrid.rupTable.inlineEditing': function(event, $target){
					var $self = $(this), settings = $self.data('settings'),
						operationCfg = settings.core.defaultOperations['save'];
					if (jQuery.proxy(operationCfg.enabled, $self)()){
						jQuery.proxy(operationCfg.callback,$self)($self, event);
					}
				}
			});
			if (settings.inlineEdit.autoEditRow){
				$self.on({
					'jqGridCellSelect.rupTable.inlineEditing': function (event, rowid, iCol, cellcontent, obj){
						var $self = $(this);
						if (iCol!==-1){
							$self.on(
								'jqGridInlineEditRow.rupTable.inlineEditing.cellSelected', function (event, rowId){
									jQuery($self.jqGrid('getInd',rowid, true)).find('td:eq('+iCol+') :focusable:first').trigger('focus');
									$self.off('jqGridInlineEditRow.rupTable.inlineEditing.cellSelected');
								}
							);
						}
					}
				});
			}

		},
		/**
	 * Metodo que realiza la post-configuración del plugin inlineEdit del componente RUP Table.
	 * Este método se ejecuta antes de la incialización del plugin.
	 *
	 * @name postConfigureInlineEdit
	 * @function
	 * @param {object} settings - Parámetros de configuración del componente.
	 */
		postConfigureInlineEdit:function(settings){
			var $self = this,
				formId = 'inlineForm_' + settings.id,
				$inlineForm =$('<form>').attr({'id':'inlineForm_' + settings.id});

			// Arropamos la estructura de la tabla en un formulario para poder realizar el envío de los campos
			$self.wrap($inlineForm);
			// Almacenamos la referencia al formulario.
			settings.inlineEdit.$inlineForm = $('#'+formId);

			settings.inlineEdit.$inlineForm.on('rupValidate_formValidationError.inlineEditing', function(event, obj){
				var rowid = $self.jqGrid('getGridParam','selrow');

				jQuery($self.getInd(rowid,true)).attr('id',settings.inlineEditingRow);
				$self.rup_jqtable('setSelection',settings.inlineEditingRow);
			});

			$self.on({
				'jqGridLoadComplete.rupTable.formEditing': function(data){
					var $self = $(this), settings = $self.data('settings'), nPos;

					if (settings.inlineEdit.autoselectFirstRecord){
						nPos = jQuery.proxy(jQuery.jgrid.getCurrPos, $self[0])();
						$self.rup_jqtable('highlightRowAsSelected', jQuery($self.jqGrid('getInd', nPos[1][0],true)));
					}
				}
			});
		}
	});


	/**
	 * Métodos públicos del plugin inlineEdit.
	 *
	 * Los métodos implementados son:
	 *
	 * addRow(options): Muestra una nueva línea para inserción.
	 * editRow(rowId, options): Activa el modo edicón en línea para un registro determinado.
	 * deleteRow(rowId, options): Realiza el borrado de un registro.
	 * saveRow(rowId, options): Realiza el guardado de un registo modificado mediante la edición en línea.
	 * restoreRow(rowId): Restaura la línea indicada
	 *
	 * Las propiedades de esta extensión almacenadas en el settings son las siguientes:
	 *
	 * settings.$inlineForm : Referencia al formulario utilizado para enviar los datos del registro que está siendo editado.
	 *
	 */
	jQuery.fn.rup_jqtable('extend',{
		/**
     * Añade una nueva línea en blanco al mantenimiento para permitir introducir los datos del nuevo registro.
     *
     * @function addRow
		 * @param {object} options - Opciones de configuración de la acción de inserción.
		 * @return {object} - Referencia jQuery a la propia tabla.
		 * @fires module:rup_jqtable#rupTable_beforeAddRow
     * @example
     * $("#idTable").rup_jqtable("addRow", options);
     */
		addRow: function(options){
			var $self = this,
				settings = $self.data('settings'),
				colModel = $self[0].p.colModel;

			/*
			 * TODO: Ajustar el paso de parámetros
			 */
			var auxOptions = {addRowParams:$.extend({},settings.inlineEdit.addOptions,options)};

			// Controlar los campos editables en modo nuevo
			for (var i=0;i<colModel.length;i++){
				if (colModel[i].editable === true && colModel[i].editableOnAdd!==false){
					if (colModel[i].editable === true && colModel[i].editableOnAdd===false){
						if (colModel[i].editoptions=== undefined){
							colModel[i].editoptions={};
						}
						colModel[i].editoptions.readonly='readonly';
					}else {
						if (colModel[i].editoptions !== undefined && colModel[i].editoptions.readonly !== undefined){
							delete colModel[i].editoptions.readonly;
						}
					}
				}
			}

			if ($self.triggerHandler('rupTable_beforeAddRow', [auxOptions])!==false){
				$self.jqGrid('addRow', $.extend({},auxOptions));
			}

			return $self;
		},
		/**
		 * Clona un registro determinado. Añade una nueva línea con el contenido del registro a partir del cual se desea clonar.
     *
     * @function cloneRow
		 * @param {string} rowId -  Identificador del registro a partir del cual se desea realizar el clonado.
		 * @param {object} options - Opciones de configuración de la acción de clonado.
		 * @return {object} - Referencia jQuery a la propia tabla.
		 * @fires module:rup_jqtable#rupTable_beforeCloneRow
     * @example
     * $("#idTable").rup_jqtable("cloneRow", rowId, options);
     */
		cloneRow: function(rowId, options){
			var $self = this,
				settings = $self.data('settings'),
				selectedRow = (rowId===undefined?$self.jqGrid('getGridParam','selrow'):rowId),
				colModel = $self[0].p.colModel,
				rowdata, clonedRowId;

			if ($self.triggerHandler('rupTable_beforeCloneRow',[settings, rowId])!==false){
				rowdata = $self.jqGrid('getRowData',selectedRow);
				$self.rup_jqtable('addRow');
				clonedRowId = jQuery('tbody:first tr[id*=\'jqg\']',$self).attr('id');
				$self.jqGrid('setRowData',clonedRowId, rowdata);
				jQuery($self.jqGrid('getInd',clonedRowId,true)).attr('editable','0');

				// Controlar los campos editables en modo nuevo
				for (var i=0;i<colModel.length;i++){
					if (colModel[i].editable === true && colModel[i].editableOnAdd!==false){
						if (colModel[i].editable === true && colModel[i].editableOnAdd===false){
							if (colModel[i].editoptions=== undefined){
								colModel[i].editoptions={};
							}
							colModel[i].editoptions.readonly='readonly';
						}else {
							if (colModel[i].editoptions !== undefined && colModel[i].editoptions.readonly !== undefined){
								delete colModel[i].editoptions.readonly;
							}
						}
					}
				}

				$self.rup_jqtable('editRow', clonedRowId, {}, true);
			}
		},
		/**
     * Pone el registro indicado en modo edición para permitir la edición de sus datos.
     *
     * @function editRow
		 * @param {string} rowId - Identificador del registro que se desea editar.
		 * @param {object} options - Opciones de configuración de la acción de modificación.
		 * @return {object} - Referencia jQuery a la propia tabla.
		 * @fires module:rup_jqtable#rupTable_beforeEditRow
     * @example
     * $("#idTable").rup_jqtable("editRow", rowId, options, true);
     */
		editRow: function (rowId, options, skipFieldCheck){
			var $self = this,
				settings = $self.data('settings'),
				selectedRow = (rowId===undefined?$self.jqGrid('getGridParam','selrow'):rowId),
				colModel = $self[0].p.colModel;

			if (skipFieldCheck!==true){
				// Controlar los campos editables en modo edición
				for (var i=0;i<colModel.length;i++){
					if (colModel[i].editable === true && colModel[i].editableOnEdit===false){
						if (colModel[i].editoptions=== undefined){
							colModel[i].editoptions={};
						}
						colModel[i].editoptions.readonly='readonly';
					}else {
						if (colModel[i].editoptions !== undefined && colModel[i].editoptions.readonly !== undefined){
							delete colModel[i].editoptions.readonly;
						}
					}
				}
			}

			if ($self.triggerHandler('rupTable_beforeEditRow',[settings.inlineEdit.editOptions, selectedRow])!==false){
				$self.jqGrid('editRow', selectedRow, $.extend({},settings.inlineEdit.editOptions,options));
			}

			return $self;
		},
		/**
     * Elimina el registro indicado.
     *
     * @function deleteRow
		 * @param {string} rowId - Identificador del registro que se desea eliminar.
		 * @param {object} options - Opciones de configuración de la acción de borrado..
		 * @return {object} - Referencia jQuery a la propia tabla.
		 * @fires module:rup_jqtable#rupTable_deleteAfterSubmit
		 * @fires module:rup_jqtable#rupTable_deleteAfterComplete
		 * @fires module:rup_jqtable#rupTable_beforeDeleteRow
     * @example
     * $("#idTable").rup_jqtable("deleteRow", rowId, options);
     */
		deleteRow: function (rowId, options){


			var $self = this,
				settings = $self.data('settings'),
				//			deleteOptions = jQuery.extend(true, {}, jQuery.fn.rup_jqtable.defaults.deleteOptions, options),
				deleteOptions = jQuery.extend(true, {}, settings.inlineEdit.deleteOptions, options),
				selectedRow = (rowId===undefined?$self.rup_jqtable('getSelectedRows'):rowId);

			// En caso de especificarse el uso del método HTTP DELETE, se anyade el identificador como PathParameter
			if (selectedRow.length===1){
				if (deleteOptions.mtype==='DELETE'){
					deleteOptions.url = settings.baseUrl+'/'+$self.rup_jqtable('getPkUrl',selectedRow);
				}
			}else{
				deleteOptions.mtype = 'POST';
				deleteOptions.ajaxDelOptions.contentType = 'application/json';
				deleteOptions.ajaxDelOptions.type = 'POST';
				deleteOptions.ajaxDelOptions.dataType = 'json';
				deleteOptions.url = settings.baseUrl+'/deleteAll';
				deleteOptions.serializeDelData = function(ts,postData){
					//					$self.rup_jqtable("getFilterParams")
					return jQuery.toJSON({
						'core':{
							'pkToken':settings.multiplePkToken,
							'pkNames':settings.primaryKey
						},
						'multiselection':$self.rup_jqtable('getSelectedIds')
					});
				};
			}

			deleteOptions.afterSubmit = function(data, postd){
				$self.triggerHandler('rupTable_deleteAfterSubmit', [data, postd]);
				return [true];
			};

			deleteOptions.afterComplete = function(data, postd){
				$self.triggerHandler('rupTable_deleteAfterComplete', [data, postd]);
			};

			if ($self.triggerHandler('rupTable_beforeDeleteRow',[deleteOptions, selectedRow])!==false){
				$self.jqGrid('delGridRow',selectedRow, deleteOptions);
			}

			return $self;
		},
		/**
     *  Guarda el registro modificado. Se almacenan los datos introducidos en la línea en modo edición.
     *
     * @function saveRow
		 * @param {string} rowId - Identificador del registro que se desea guardar.
		 * @param {object} options - Opciones de configuración de la acción de guardado..
		 * @return {object} - Referencia jQuery a la propia tabla.
		 * @fires module:rup_jqtable#rupTable_beforeSaveRow
     * @example
     * $("#idTable").rup_jqtable("saveRow", rowId, options);
     */
		saveRow : function(rowId, options){
			var $self = this, settings = $self.data('settings'),
				selectedRow = (rowId===undefined?$self.jqGrid('getGridParam','selrow'):rowId);

			$self.triggerHandler('rupTable_beforeSaveRow', [selectedRow, options]);
			if(selectedRow.indexOf('jqg')!==-1){
				$self[0].p.ajaxRowOptions = settings.inlineEdit.addOptions.ajaxRowOptions;
				$self.jqGrid('saveRow', selectedRow, settings.inlineEdit.addOptions);
			}else{
				$self[0].p.ajaxRowOptions = settings.inlineEdit.editOptions.ajaxRowOptions;
				$self.jqGrid('saveRow', selectedRow, settings.inlineEdit.editOptions);
			}

			return $self;
		},
		/**
     * Restaura la fila indicada al estado anterior a habilitarse el modo edición.
     *
     * @function restoreRow
		 * @param {string} rowId - Identificador de la línea que se desea guardar.
		 * @param {function} afterrestorefunc - Función de callback que se ejecuta después de restaurar la fila.
		 * @return {object} - Referencia jQuery a la propia tabla.
		 * @fires module:rup_jqtable#rupTable_beforeRestoreRow
     * @example
     * $("#idTable").rup_jqtable("restoreRow", rowId, function(){});
     */
		restoreRow: function(rowId, afterrestorefunc){
			var $self = this,
				rowToRestore = (rowId===undefined?$self.jqGrid('getGridParam','selrow'):rowId);

			$self.triggerHandler('rupTable_beforeRestoreRow', [rowId]);
			$self.jqGrid('restoreRow', rowToRestore, afterrestorefunc);

			return $self;
		},
		/**
     * Restaura los campos RUP existentes en una fila de edición en línea.
     *
     * @function restoreRow
		 * @param {string} rowId - Identificador de la línea que se desea guardar.
		 * @return {object} - Referencia jQuery a la propia tabla.
     * @example
     * $("#idTable").rup_jqtable("restoreRow", rowId, options);
     */
		restoreInlineRupFields: function (rowid){
			var $self = this, self = this[0], $row, $cell, val;


			$(self.p.colModel).each(function(i){

				$row= $(self.rows.namedItem(rowid));
				let $tempRowId = $self.data('settings').inlineEditingRow;
				$cell = $row.find('td:eq('+i+')');
				//ruptypeObj = $cell.find("[ruptype]");
				//				ruptypeObj = this.editoptions.ruptype;
				if ( this.rupType){
					if (this.rupType==='combo'){
						if ($self.data('rup.jqtable.formatter')!==undefined){
							val =  $self.data('rup.jqtable.formatter')[$tempRowId][this.name]['rup_'+this.rupType]['label'];
							$cell.html(val);
						}
					} else if (this.rupType==='autocomplete'){
						if ($self.data('rup.jqtable.formatter')!==undefined){
							val =  $self.data('rup.jqtable.formatter')[$tempRowId][this.name]['rup_'+this.rupType]['label'];
							$cell.html(val);
						}
					}
				}
			});

			return $self;
		}
	});





	//*******************************************************
	// DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
	//*******************************************************

	/**
	 * Parametros de configuración de los settings para el caso particular de configuración del componente en el caso de funcionar en modo edición en linea.
	 *
	 * Los métodos para los que se proporciona una implementación son los siguientes.
	 *
	 * beforeSelectRow:
	 * onCellSelect:
	 * onSelectRow:
	 */

	/**
	* @description Propiedades de configuración del plugin inlineEdit del componente RUP Table.
	* @see Las posibles propiedades que se pueden indicar en cada una de las siguientes propiedades, se especifican con más detalle en la documentación del plugin subyacente jqGrid.
	* @name options
	*
	* @property {object} [addEditOptions] - Propiedades de configuración comunes a las acciones de edición e inserciónde un registro.
	* @property {object} [addOptions] - Propiedades de configuración exclusivas de la acción de inserción de un registro. Sobrescriben las indicadas en la propiedad addEditOptions.
	* @property {object} [editOptions] - Propiedades de configuración exclusivas de la acción de edición de un registro. Sobrescriben las indicadas en la propiedad addEditOptions.
	* @property {object} [deleteOptions] - Propiedades de configuración de la acción de borrado de un registro.
	*/

	jQuery.fn.rup_jqtable.plugins.inlineEdit = {};
	jQuery.fn.rup_jqtable.plugins.inlineEdit.defaults = {
		toolbar:{
			defaultButtons:{
				add : true,
				edit : true,
				cancel : true,
				save : true,
				clone : true,
				'delete' : true,
				filter : false
			}
		},
		contextMenu:{
			defaultRowOperations:{
				add : true,
				edit : true,
				cancel : true,
				save : true,
				clone : true,
				'delete' : true,
				filter : false
			}
		},
		inlineEdit:{
			autoselectFirstRecord: true,
			autoEditRow:false
		},
		formEdit:{
		}
	};

	// Parámetros de configruación comunes para las acciónes de añadir y editar un registro
	jQuery.fn.rup_jqtable.plugins.inlineEdit.defaults.inlineEdit.addEditOptions = {
		contentType: 'application/json',
		type:'PUT',
		dataType: 'json',
		ajaxRowOptions:{
			contentType: 'application/json',
			dataType: 'json',
			processData:false
		}
	};

	// Parámetros de configruación específicos para la acción de añadir un registro
	jQuery.fn.rup_jqtable.plugins.inlineEdit.defaults.inlineEdit.addOptions = {
		mtype: 'POST',
		ajaxRowOptions:{
			type:'POST'
		}
	};

	// Parámetros de configruación específicos para la acción de editar un registro
	jQuery.fn.rup_jqtable.plugins.inlineEdit.defaults.inlineEdit.editOptions = {
		mtype: 'PUT',
		ajaxRowOptions:{
			type:'PUT'
		}
	};

	// Parámetros de configruación específicos para la acción de eliminar un registro
	jQuery.fn.rup_jqtable.plugins.inlineEdit.defaults.inlineEdit.deleteOptions = {
		bSubmit: jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_message.aceptar'),
		cancelicon:[false, 'left', 'icono_cancelar'],
		delicon:[false],
		linkStyleButtons: ['#eData'],
		msg: '<div id="rup_msgDIV_msg_icon" class="rup-message_icon-confirm"></div><div id="rup_msgDIV_msg" class="rup-message_msg-confirm white-space-normal">'+jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_jqtable.deleteAll')+'</div>',
		mtype:'DELETE',
		width: 320,
		reloadAfterSubmit:false,
		resize:false
	};

	/**
	 * Extensión de las propiedades por defecto del jqGrid para el modo de edición en línea
	 */
	jQuery.jgrid.inlineEdit = {
		keys:false
	};


	/* ********* */
	/* EVENTOS
  /* ********* */

	/**
	*  Evento que se lanza justo antes de procesarse la petición de borrado de un registro. En caso de devolver false se detiene la ejecución del borrado.
	*
	* @event module:rup_jqtable#rupTable_beforeDeleteRow
	* @property {Event} event - Objeto Event correspondiente al evento disparado.
	* @property {object} deleteOptions - Opciones de configuración de la operación de borrado.
	* @property {string} selectedRow - Identificador de la fila que se desea eliminar.
	* @example
	* $("#idComponente").on("rupTable_beforeDeleteRow", function(event, deleteOptions, selectedRow){ });
	*/

	/**
	*  Evento que se lanza justo antes de procesarse la petición de edición de un registro. En caso de devolver false se detiene la ejecución del borrado.
	*
	* @event module:rup_jqtable#rupTable_beforeEditRow
	* @property {Event} event - Objeto Event correspondiente al evento disparado.
	* @property {object} editOptions - Opciones de configuración de la operación de edición.
	* @property {string} selectedRow - Identificador de la fila que se desea editar.
	* @example
	* $("#idComponente").on("rupTable_beforeEditRow", function(event, editOptions, selectedRow){ });
	*/

	/**
	*  Evento que se lanza justo después de realizarse la petición de borrado de un registro.
	*
	* @event module:rup_jqtable#rupTable_deleteAfterSubmit
	* @property {Event} event - Objeto Event correspondiente al evento disparado.
	* @example
	* $("#idComponente").on("rupTable_deleteAfterSubmit", function(event){ });
	*/

	/**
	*  Evento lanzado antes de ejecutarse el método de inserción de un registro. En caso de retornar false se cancelará la inserción.
	*
	* @event module:rup_jqtable#rupTable_beforeAddRow
	* @property {Event} event - Objeto Event correspondiente al evento disparado.
	* @property {object} addOptions -  Opciones de configuración de la acción de insertar un elemento.
	* @example
	* $("#idComponente").on("rupTable_beforeAddRow", function(event, addOptions){ });
	*/

	/**
	*  Evento lanzado antes de ejecutarse el método de clonado de un registro. En caso de retornar false se cancelará el clonado.
	*
	* @event module:rup_jqtable#rupTable_beforeCloneRow
	* @property {Event} event - Objeto Event correspondiente al evento disparado.
	* @property {object} cloneOptions - Opciones de configuración de la operación de clonado.
	* @property {string} selectedRow - Identificador de la fila que se desea clonar.
	* @example
	* $("#idComponente").on("rupTable_beforeCloneRow", function(event, cloneOptions, selectedRow){ });
	*/
	

})(jQuery);

/*!
 * Copyright 2013 E.J.I.E., S.A.
 *
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
 */

/*global jQuery */

/**
 * Permite realizar una selección múltiple de los registros que se muestran en la tabla.
 *
 * @summary Plugin de multiselection del componente RUP Table.
 * @module rup_jqtable/multiselection
 * @example
 *
 * $("#idComponente").rup_jqtable({
 * 	url: "../jqGridUsuario",
 * 	usePlugins:["multiselection"],
 * 	multiselection:{
 * 		// Propiedades de configuración del plugin multiselection
 * 	}
 * });
 */
(function ($) {

	/**
   * Definición de los métodos principales que configuran la inicialización del plugin.
   *
   * preConfiguration: Método que se ejecuta antes de la invocación del componente jqGrid.
   * postConfiguration: Método que se ejecuta después de la invocación del componente jqGrid.
   *
   */
	jQuery.rup_jqtable.registerPlugin('multiselection', {
		loadOrder: 8,
		preConfiguration: function (settings) {
			var $self = this;
			$self.rup_jqtable('preConfigureMultiselection', settings);
		},
		postConfiguration: function (settings) {
			var $self = this;

			if (settings.multiselect === true) {
				$self.rup_jqtable('postConfigureMultiselection', settings);
			}
		}
	});

	//********************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	//********************************
	/**
   * Extensión del componente rup_jqtable para permitir la gestión de la multiselección.
   *
   * Los métodos implementados son:
   *
   * preConfigureMultiselection(settings): Método que define la preconfiguración necesaria para el correcto funcionamiento del componente.
   * postConfigureMultiselection(settings): Método que define la postconfiguración necesaria para el correcto funcionamiento del componente.
   *
   */
	jQuery.fn.rup_jqtable('extend', {
		/**
		* Metodo que realiza la pre-configuración del plugin multiselection del componente RUP Table.
		* Este método se ejecuta antes de la incialización del plugin.
		*
		* @name preConfigureMultiselection
		* @function
		* @param {object} settings - Parámetros de configuración del componente.
		*/
		preConfigureMultiselection: function (settings) {
			var $self = this;
			// Añadimos la columna por defecto para mostrar la información del registro en edición
			//			settings.colNames = jQuery.merge([""], settings.colNames);
			//			settings.colModel = jQuery.merge([settings.multiselection.defaultEditableInfoCol], settings.colModel);

			// Se configura la propiedad multiselecta true para que el plugin subyacente se configure en modo multiseleccion
			settings.multiselect = true;
			settings.multiselectWidth = 40;
			//
			//			settings.ondblClickRow=function(){
			//				return false;
			//			};

			$.extend(true, settings.core.operations, {
				clone:{
					enabled : function () {
						return settings.multiselection.numSelected === 1;
					}
				}
			});

			settings.getActiveLineId = function () {
				var $self = this,
					settings = $self.data('settings'),
					npos = jQuery.proxy(jQuery.jgrid.getCurrPos, $self[0])();

				return jQuery.inArray(settings.multiselection.rowForEditing, npos[1]);
			};

			settings.getActiveRowId = function () {
				var $self = this,
					settings = $self.data('settings');

				return settings.multiselection.rowForEditing;
			};

			settings.getSelectedRows = function () {
				var $self = this,
					settings = $self.data('settings');

				if (settings.multiselection.selectedAll !== true) {
					return settings.multiselection.selectedIds;
				} else {
					return settings.multiselection.deselectedIds;
				}
			};

			settings.getSelectedLines = function () {
				var $self = this,
					settings = $self.data('settings'),
					page = parseInt($self.rup_jqtable('getGridParam', 'page'), 10);

				if (settings.multiselection.selectedAll !== true) {
					return settings.multiselection.selectedLinesPerPage[page];
				} else {
					return settings.multiselection.deselectedLinesPerPage[page];
				}
			};


			/*
       * Definición del método serializeGridData para que añada al postData la información relativa a la multiseleccion.
       */
			$self.on({
				'rupTable_serializeGridData.multiselection': function (events, postData) {
					var multiselectionObj = {},
						tmpLastSearch;

					function getLastSearchStr(postData) {
						return postData.rows + postData.sidx + postData.sord + postData.filter !== undefined ? jQuery.param(jQuery.extend({}, postData.filter, {
							rows: postData.rows,
							sidx: postData.sidx,
							sord: postData.sord
						})) : '';
					}

					tmpLastSearch = $self.data('tmp.lastSearch');
					if (tmpLastSearch !== undefined && tmpLastSearch !== getLastSearchStr(postData)) {
						if (settings && settings.multiselection && settings.multiselection.numSelected > 0) {
							multiselectionObj = $self.rup_jqtable('getSelectedIds');
							jQuery.extend(true, postData, {
								'multiselection': multiselectionObj
							});
						}
					}

					$self.data('tmp.lastSearch', getLastSearchStr(postData));
				},
				'rupTable_setSelection.multiselection': function (events, selectedRows, status, reorderSelection) {
					var page = parseInt($self.rup_jqtable('getGridParam', 'page'), 10);

					if (Array.isArray(selectedRows)) {
						for (var i = 0; i < selectedRows.length; i++) {
							$self._processSelectedRow(settings, selectedRows[i], status);
						}
					} else {
						$self._processSelectedRow(settings, selectedRows, status);
					}

					// En caso de que se solicite la reordenación de los identificadores seleccionados
					if (reorderSelection === true) {
						$self.on('rupTable_serializeGridData.multiselection.reorderSelection', function (events, postData) {
							$self.off('rupTable_serializeGridData.multiselection.reorderSelection');

							jQuery.extend(true, postData, {
								'multiselection': $self.rup_jqtable('getSelectedIds')
							});
						});
					}

					$self.triggerHandler('rupTable_multiselectionUpdated');

					$self.triggerHandler('jqGridSelectRow.rupTable.multiselection', [selectedRows, status]);

					return false;
				}
			});

		},
		/**
		* Metodo que realiza la post-configuración del plugin multiselection del componente RUP Table.
		* Este método se ejecuta antes de la incialización del plugin.
		*
		* @name postConfigureMultiselection
		* @function
		* @param {object} settings - Parámetros de configuración del componente.
		*/
		postConfigureMultiselection: function (settings) {
			var $self = this;

			// Inicialización de las propiedades asociadas a la gestión de los registros seleccionados
			$self._initializeMultiselectionProps(settings);
			// Se almacena la referencia del check de (de)seleccionar todos los registros
			settings.$selectAllCheck = jQuery('#cb_' + settings.id);

			settings.fncHasSelectedElements = function () {
				return settings.multiselection.numSelected > 0;
			};

			settings.getRowForEditing = function () {
				var $self = this,
					settings = $self.data('settings'),
					page = parseInt($self.rup_jqtable('getGridParam', 'page'), 10),
					nPos = jQuery.proxy(jQuery.jgrid.getCurrPos, $self[0])(),
					index, retNavParams;

				if ($self._hasPageSelectedElements(page)) {
					if (settings.multiselection.rowForEditing !== undefined) {
						return settings.multiselection.rowForEditing;
					}
					index = $self._getSelectedLinesOfPage(page)[0];
					return nPos[1][index - 1];
				} else {
					retNavParams = jQuery.proxy(settings.fncGetNavigationParams, $self)('first');

					execute = retNavParams[1];
					newPage = retNavParams[5];
					newPageIndex = retNavParams[6];

					if (execute) {
						$self.trigger('reloadGrid', [{
							page: newPage
						}]);
						$self.on('jqGridAfterLoadComplete.multiselection.editRow', function (event, data) {
							var nextPagePos = jQuery.proxy(jQuery.jgrid.getCurrPos, $self[0])(),
								//newIndexPos = nextPagePos[1][$self._getSelectedLinesOfPage(newPage)[0]-1];
								newIndexPos = $self.getActiveRowId();
							$self.jqGrid('editGridRow', newIndexPos, settings.editOptions);
							$self.off('jqGridAfterLoadComplete.multiselection.editRow');
						});
					}

					return false;
				}
			};

			settings.getDetailTotalRowCount = function () {
				var $self = this,
					settings = $self.data('settings');
				return settings.multiselection.numSelected;
			};

			settings.getDetailCurrentRowCount = function () {
				var $self = this,
					settings = $self.data('settings'),
					page = parseInt($self.rup_jqtable('getGridParam', 'page'), 10),
					currentRow = jQuery.proxy(jQuery.jgrid.getCurrPos, $self[0])(),
					rowsPerPage = parseInt($self.rup_jqtable('getGridParam', 'rowNum'), 10),
					selectedPagesArrayIndex, tmpSelectedPage,
					cont = 0;

				// Comprobamos si se han seleccionado todos los registros de la tabla
				if (!settings.multiselection.selectedAll) {
					// En caso de que no se hayan seleccionado
					// Se obtiene el indice de la página actual dentro del array de páginas deseleccionadas para
					selectedPagesArrayIndex = jQuery.inArray(page, settings.multiselection.selectedPages);
					tmpSelectedPage = settings.multiselection.selectedPages[selectedPagesArrayIndex];
					for (var i = 1; i < tmpSelectedPage; i++) {
						if (settings.multiselection.selectedLinesPerPage[i] !== undefined) {
							cont += settings.multiselection.selectedLinesPerPage[i].length;
						}
					}

					cont += jQuery.inArray(currentRow[0] + 1, settings.multiselection.selectedLinesPerPage[tmpSelectedPage]) + 1;
				} else {
					cont = (page > 1 ? ((page - 1) - settings.multiselection.deselectedPages.length) * rowsPerPage : 0);
					for (var i = 0; i < settings.multiselection.deselectedPages.length && settings.multiselection.deselectedPages[i] !== page; i++) {
						cont += rowsPerPage - settings.multiselection.deselectedLinesPerPage[settings.multiselection.deselectedPages[i]].length;
					}
					cont += jQuery.inArray(currentRow[0] + 1, $self._getSelectedLinesOfPage(page)) + 1;
				}

				return cont;
			};

			settings.fncGetNavigationParams = function getNavigationParams_multiselection(linkType) {
				var $self = this,
					settings = $self.data('settings'),
					execute = false,
					changePage = false,
					index = 0,
					newPageIndex = 0,
					npos = jQuery.proxy(jQuery.jgrid.getCurrPos, $self[0])(),
					page = parseInt($self.rup_jqtable('getGridParam', 'page'), 10),
					newPage = page,
					lastPage = parseInt(Math.ceil($self.rup_jqtable('getGridParam', 'records') / $self.rup_jqtable('getGridParam', 'rowNum')), 10),
					currentArrayIndex, selectedLines;

				npos[0] = parseInt(npos[0], 10);
				$('#' + settings.formEdit.feedbackId, settings.formEdit.$detailForm).hide();
				switch (linkType) {
				case 'first':
					// Navegar al primer elemento seleccionado
					execute = true;
					// Si no se han seleccionado todos los elementos
					if (!settings.multiselection.selectedAll) {
						// Se comprueba si la página en la que nos encontramos es la primera en la que se han seleccionado registros
						if (settings.multiselection.selectedPages[0] !== page) {
							// Marcamos el flag changePage para indicar que se debe de realizar una paginación
							changePage = true;
							// La nueva página será la primera página en la que se ha realizado una selección de registros
							newPage = settings.multiselection.selectedPages[0];
						}
					} else {
						// En el caso de que se hayan seleccionado todos los elementos de la tabla
						// Recorremos las páginas buscando la primera en la que existan elementos seleccionados
						for (var pageAux = 1; pageAux <= lastPage; pageAux++) {
							if ($self._hasPageSelectedElements(pageAux)) {
								if (pageAux !== page) {
									newPage = pageAux;
									changePage = true;
								}
								break;
							}
						}
					}
					// Recuperamos el primer registro seleccionado del la página
					index = $self._getFirstSelectedElementOfPage(newPage);
					newPageIndex = index;
					break;
				case 'prev':
					// Navegar al anterior elemento seleccionado
					execute = true;
					// Obtenemos un array con los index de los registros seleccionados en la página actual
					selectedLines = $self._getSelectedLinesOfPage(page);
					// Obtenemos la posición que ocupa el elemento actual en el array de seleccionados
					currentArrayIndex = jQuery.inArray(npos[0] + 1, selectedLines);
					// Se comprueba si ocupa el lugar del primer elemento seleccionado
					if (currentArrayIndex === 0) {
						// En caso de tratarse del primer elemento seleccionado de la página, se deberá de realizar una navegación a la página anterior que disponga de elementos seleccionados
						changePage = true;
						// Recorremos las páginas anteriores
						for (var pageAux = page - 1; pageAux >= 0; pageAux--) {
							// En caso de que la página disponga de elementos selecciondados.
							if ($self._hasPageSelectedElements(pageAux)) {
								newPage = pageAux;
								// Obtenemos los identificadores de los registros seleccionados de la nueva página
								selectedLines = $self._getSelectedLinesOfPage(pageAux);
								// Obtenemos el último registro seleccionado
								index = selectedLines[selectedLines.length - 1];
								break;
							}
						}
					} else {
						// En caso de no tratarse del último elemento de la página, recuperamos el elemento anterior que haya sido seleccionado también
						index = selectedLines[currentArrayIndex - 1];
					}

					newPageIndex = index;
					break;
				case 'next':
					// Navegar al siguiente elemento seleccionado
					execute = true;
					// Obtenemos un array con los index de los registros seleccionados en la página actual
					selectedLines = $self._getSelectedLinesOfPage(page);
					// Obtenemos la posición que ocupa el elemento actual en el array de seleccionados
					currentArrayIndex = jQuery.inArray(npos[0] + 1, selectedLines);
					// Se comprueba si ocupa el lugar del último elemento seleccionado
					if (currentArrayIndex === selectedLines.length - 1) {
						// En caso de tratarse del último elemento seleccionado de la página, se deberá de realizar una navegación a la página siguiente que disponga de elementos seleccionados
						changePage = true;
						// Recorremos las páginas siguientes
						for (var pageAux = page + 1; pageAux <= lastPage; pageAux++) {
							// En caso de que la página disponga de elementos selecciondados.
							if ($self._hasPageSelectedElements(pageAux)) {
								newPage = pageAux;
								// Obtenemos los identificadores de los registros seleccionados de la nueva página
								selectedLines = $self._getSelectedLinesOfPage(pageAux);
								// Obtenemos el primer registro seleccionado
								index = selectedLines[0];
								break;
							}
						}
					} else {
						// En caso de no tratarse del último elemento de la página, recuperamos el elemento anterior que haya sido seleccionado también
						index = selectedLines[currentArrayIndex + 1];
					}

					newPageIndex = index;
					break;
				case 'last':
										// Navegar al ultimo elemento seleccionado
					execute = true;
										// Si no se han seleccionado todos los elementos
					if (!settings.multiselection.selectedAll) {
												// Se comprueba si la página en la que nos encontramos es la primera en la que se han seleccionado registros
						if (settings.multiselection.selectedPages[settings.multiselection.selectedPages.length - 1] !== page) {
														// Marcamos el flag changePage para indicar que se debe de realizar una paginación
							changePage = true;
														// La nueva página será la primera página en la que se ha realizado una selección de registros
							newPage = settings.multiselection.selectedPages[settings.multiselection.selectedPages.length - 1];
						}
					} else {
												// En el caso de que se hayan seleccionado todos los elementos de la tabla
												// Recorremos las páginas buscando la primera en la que existan elementos seleccionados
						for (var pageAux = lastPage; pageAux > 0; pageAux--) {
							if ($self._hasPageSelectedElements(pageAux)) {
								if (pageAux !== page) {
									newPage = pageAux;
									changePage = true;
								}
								break;
							}
						}
					}
					selectedLines = $self._getSelectedLinesOfPage(newPage);
										// Recuperamos el último registro seleccionado del la página
					index = selectedLines[selectedLines.length - 1];
					newPageIndex = index;
				}

				return [linkType, execute, changePage, index - 1, npos, newPage, newPageIndex - 1];
			};

			settings.doNavigation = function (arrParams, execute, changePage, index, npos, newPage, newPageIndex) {
				var $self = this,
					settings = $self.data('settings'),
					props = rp_ge[$self.attr('id')],
					linkType, execute, changePage, index, npos, newPage, newPageIndex, fncAfterclickPgButtons;

				if (Array.isArray(arrParams)) {
					linkType = arrParams[0];
					execute = arrParams[1];
					changePage = arrParams[2];
					index = arrParams[3];
					npos = arrParams[4];
					newPage = arrParams[5];
					newPageIndex = arrParams[6];

					if (execute) {
						$self.rup_jqtable('hideFormErrors', settings.formEdit.$detailForm);
						$self.triggerHandler('jqGridAddEditClickPgButtons', [linkType, settings.formEdit.$detailForm, npos[1][npos[index]]]);
						if (changePage) {
							$self.trigger('reloadGrid', [{
								page: newPage
							}]);
							$self.on('jqGridAfterLoadComplete.pagination', function (event, data) {
								var nextPagePos = jQuery.proxy(jQuery.jgrid.getCurrPos, $self[0])(),
									newIndexPos = nextPagePos[1][newPageIndex];
								//								$self.jqGrid("setSelection", nextPagePos[1][newIndexPos]);
								jQuery.proxy(jQuery.jgrid.fillData, $self[0])(newIndexPos, $self[0], settings.formEdit.$detailForm.attr('id'), settings.opermode);
								jQuery.proxy(jQuery.jgrid.updateNav, $self[0])();

								//								$self.find("td[aria-describedby='"+settings.id+"_infoEditable'] img.ui-icon.ui-icon-pencil").remove();
								settings.multiselection.rowForEditing = newIndexPos;

								$self.rup_jqtable('clearHighlightedEditableRows');
								$self.rup_jqtable('highlightEditableRow', $self.jqGrid('getInd', newIndexPos, true));
								//								$($self.jqGrid("getInd",newIndexPos, true)).find("td[aria-describedby='"+settings.id+"_infoEditable']").html($("<img/>").addClass("ui-icon ui-icon-pencil")[0]);

								$self.off('jqGridAfterLoadComplete.pagination');
							});
						} else {
							jQuery.proxy(jQuery.jgrid.fillData, $self[0])(npos[1][index], $self[0], settings.formEdit.$detailForm.attr('id'), settings.opermode);
							//							$self.jqGrid("setSelection", npos[1][index]);
							jQuery.proxy(jQuery.jgrid.updateNav, $self[0])();
							//							$self.find("td[aria-describedby='"+settings.id+"_infoEditable'] img.ui-icon.ui-icon-pencil").remove();
							settings.multiselection.rowForEditing = npos[1][index];

							$self.rup_jqtable('clearHighlightedEditableRows');
							$self.rup_jqtable('highlightEditableRow', $self.jqGrid('getInd', npos[1][index], true));
							//							$($self.jqGrid("getInd",npos[1][index], true)).find("td[aria-describedby='"+settings.id+"_infoEditable']").html($("<img/>").addClass("ui-icon ui-icon-pencil")[0]);

						}
						$self.triggerHandler('jqGridAddEditAfterClickPgButtons', [linkType, settings.formEdit.$detailForm, npos[1][npos[index]]]);
						fncAfterclickPgButtons = (props !== undefined ? props.afterclickPgButtons : settings.afterclickPgButtons);
						if (jQuery.isFunction(fncAfterclickPgButtons)) {
							props.fncAfterclickPgButtons.call($self, linkType, settings.formEdit.$detailForm, npos[1][npos[index]]);
						}
					}
				}
			};

			// Configuracion de los handler de los eventos
			$self.on({
				/*
         * Capturador del evento jqGridSelectRow.
         * Se ejecuta cuando se selecciona una fila.
         * Realiza la gestión interna sobre la acción de (de)selección del usuario.
         *
         * 	event: Objeto event.
         * 	id: Identificador de la línea.
         *  status: true en caso de selección, false en caso de deselección.
         *  obj: Objeto interno del jqGrid.
         */
				'jqGridSelectRow.rupTable.multiselection': function (event, id, status, obj) {
					var page, firstSelectedId, firstSelectedLine, activeLineId, selectedLineId, toLine, fromLine, idsArr;
					if (obj !== false) {
						if (obj !== undefined && jQuery(obj.target).hasClass('treeclick')) {
							return false;
						}

						if (jQuery.rup.isCtrlPressed() === true || jQuery.rup.isShiftPressed() === true) {
							window.getSelection().removeAllRanges();
						}

						if (!(jQuery.rup.isCtrlPressed() || jQuery.rup.isShiftPressed()) && (settings.multiboxonly === true && obj !== undefined && !(obj.originalEvent !== undefined && jQuery(obj.originalEvent.target).is(':checkbox') && jQuery(obj.originalEvent.target).attr('id').indexOf('jqg_') !== -1))) {
							$self.rup_jqtable('deselectRemainingRows');
						}

						// Shift presed

						if (jQuery.rup.isShiftPressed() === true) {
							selectedLineId = $self.jqGrid('getInd', id, false);
							activeLineId = $self.rup_jqtable('getActiveLineId');
							if (activeLineId < selectedLineId) {
								toLine = selectedLineId - 1;
								fromLine = activeLineId + 1;
							} else {
								toLine = activeLineId;
								fromLine = selectedLineId;
							}

							idsArr = $self.jqGrid('getDataIDs');

							for (var i = fromLine; i < toLine; i++) {
								$self._processSelectedRow(settings, idsArr[i], status);
								$self.rup_jqtable('highlightRowAsSelected', jQuery($self.jqGrid('getInd', idsArr[i], true)));
							}

						}

						// Se gestiona la selección o deselección del registro indicado
						$self._processSelectedRow(settings, id, status);
						// Actualización del número de registros seleccionados
						$self.rup_jqtable('updateSelectedRowNumber');
						// Se cierra el feedback para (de)seleccionar el resto de registros
						$self.trigger('rupTable_feedbackClose', settings.$internalFeedback);

						// Se gestiona el icono de linea editable
						$self.rup_jqtable('clearHighlightedEditableRows');
						//						$self.find("td[aria-describedby='"+settings.id+"_infoEditable'] img.ui-icon.ui-icon-pencil").remove();
						if (status) {
							settings.multiselection.rowForEditing = id;
							$self.rup_jqtable('highlightEditableRow', $self.jqGrid('getInd', id, true));
							//							$($self.jqGrid("getInd",id, true)).find("td[aria-describedby='"+settings.id+"_infoEditable']").html($("<img/>").addClass("ui-icon ui-icon-pencil")[0]);
						} else {
							page = parseInt($self.rup_jqtable('getGridParam', 'page'), 10);
							if ($self._hasPageSelectedElements(page)) {
								$self.rup_jqtable('highlightFirstEditableRow');
								//								firstSelectedLine = $self._getFirstSelectedElementOfPage(page);
								//								firstSelectedId = $self.jqGrid("getDataIDs")[firstSelectedLine-1];
								//								settings.multiselection.rowForEditing=firstSelectedId;
								//								$self.rup_jqtable("highlightEditableRow", $self.jqGrid("getInd",firstSelectedId, true));
							}
						}
					}
				},
				'jqGridDblClickRow.rupTable.multiselection': function (event, rowid, iRow, iCol, e) {
					$self.rup_jqtable('setSelection', rowid, true);
					$self.rup_jqtable('clearHighlightedEditableRows');
					$self.rup_jqtable('highlightEditableRow', $self.jqGrid('getInd', rowid, true));
				},
				'jqGridGridComplete.rup_jqtable.multiselection': function (event) {
					var $self = $(this),
						settings = $self.data('settings');

					if ($self.rup_jqtable('getGridParam', 'records') === 0) {
						jQuery(jQuery('#cb_' + $self.attr('id'), settings.core.$tableDiv)[0]).attr('disabled', 'disabled');
					} else {
						jQuery(jQuery('#cb_' + $self.attr('id'), settings.core.$tableDiv)[0]).removeAttr('disabled');
					}
				},
				/*
         * Capturador del evento jqGridLoadComplete.
         * Se ejecuta una vez se haya completado la carga de la tabla.
         *
         * 	data: Objeto que contiene la carga de la tabla.
         *
         */
				'jqGridLoadComplete.rupTable.multiselection': function (data, xhr) {
					var self = $self[0],
						internalProps = self.p,
						page = $self.rup_jqtable('getGridParam', 'page'),
						rowNum = $self.rup_jqtable('getGridParam', 'rowNum'),
						rows,
						selectedRows = settings.multiselection.selectedRowsPerPage[page],
						deselectedRows = settings.multiselection.deselectedRowsPerPage[page] || [],
						reorderedRow, reorderedRowPage, reorderedRowLine, reorderedRowId,
						arrayAuxRowsPerPage, arrayAuxLinesPerPage, arrayAuxIds, arrayAuxRows, arrayAuxPages, firstSelectedLine, firstSelectedId, indexAux, idAux;

					/*
           * REORDENAR LA SELECCION
           */
					if (xhr.reorderedSelection !== undefined && xhr.reorderedSelection !== null) {
						$self._initializeMultiselectionProps(settings);

						settings.multiselection.selectedAll = xhr.selectedAll;

						if (settings.multiselection.selectedAll === true) {
							arrayAuxRowsPerPage = settings.multiselection.deselectedRowsPerPage;
							arrayAuxLinesPerPage = settings.multiselection.deselectedLinesPerPage;
							arrayAuxIds = settings.multiselection.deselectedIds;
							arrayAuxRows = settings.multiselection.deselectedRows;
							arrayAuxPages = settings.multiselection.deselectedPages;
							settings.multiselection.numSelected = xhr.records - xhr.reorderedSelection.length;
						} else {
							arrayAuxRowsPerPage = settings.multiselection.selectedRowsPerPage;
							arrayAuxLinesPerPage = settings.multiselection.selectedLinesPerPage;
							arrayAuxIds = settings.multiselection.selectedIds;
							arrayAuxRows = settings.multiselection.selectedRows;
							arrayAuxPages = settings.multiselection.selectedPages;
							settings.multiselection.numSelected = xhr.reorderedSelection.length;
						}

						for (var i = 0; i < xhr.reorderedSelection.length; i++) {

							reorderedRow = xhr.reorderedSelection[i];
							reorderedRowPage = reorderedRow.page;
							reorderedRowLine = reorderedRow.pageLine;

							var retValue = '';
							for (var j = 0; j < settings.primaryKey.length; j++) {
								retValue += reorderedRow.pk[settings.primaryKey[j]] + settings.multiplePkToken;
							}
							reorderedRowId = retValue.substr(0, retValue.length - 1);

							if (arrayAuxRowsPerPage[reorderedRowPage] === undefined) {
								arrayAuxRowsPerPage[reorderedRowPage] = [];
								arrayAuxLinesPerPage[reorderedRowPage] = [];
							}
							// Se almacena el Id del registro seleccionado
							if (jQuery.inArray(reorderedRowId, arrayAuxIds) === -1) {
								arrayAuxIds.push(reorderedRowId);
								arrayAuxRows.push({
									id: reorderedRowId,
									page: reorderedRowPage
								});
								//								arrayAuxRowsPerPage[reorderedRowPage].splice(reorderedRowLine,0,reorderedRowId);
								arrayAuxRowsPerPage[reorderedRowPage].push(reorderedRowId);
								arrayAuxLinesPerPage[reorderedRowPage].push(reorderedRowLine);
								if (arrayAuxRowsPerPage[reorderedRowPage].length > 0 &&
																		jQuery.inArray(reorderedRowPage, arrayAuxPages) === -1) {
									jQuery.rup_utils.insertSorted(arrayAuxPages, reorderedRowPage);
								}
							}
						}
						//						$self.rup_jqtable("updateSelectedRowNumber");
					}

					// Se genera el evento que indica la modificación de los elementos seleccionados.
					$self.triggerHandler('rupTable_multiselectionUpdated');

					// Se cierra el feedback para seleccionar/deseleccionar el resto de registros
					$self.trigger('rupTable_feedbackClose', settings.$internalFeedback);

					// Se gestiona el icono de linea editable
					if ($self._hasPageSelectedElements(page)) {

						if (settings.multiselection.rowForEditing !== undefined && jQuery.inArray(settings.multiselection.rowForEditing, $self.jqGrid('getDataIDs')) !== -1) {
							$self.rup_jqtable('highlightEditableRow', jQuery($self.jqGrid('getInd', settings.multiselection.rowForEditing, true)), true);
						} else {
							$self.rup_jqtable('highlightFirstEditableRow');
						}

						//						firstSelectedLine = $self._getFirstSelectedElementOfPage(page);
						//						firstSelectedId = $self.jqGrid("getDataIDs")[firstSelectedLine-1];
						//						settings.multiselection.rowForEditing=firstSelectedId;
						//						$self.rup_jqtable("highlightEditableRow", $self.jqGrid("getInd",firstSelectedId, true));
					}


					/**
           * ARROW
           */
					//Cabecera
					var $checkAllTH = jQuery('[id=\'' + settings.id + '_cb\']');
					if (settings.multiselection.headerContextMenu_enabled && $checkAllTH.find('a').length === 0) {
						//Añadir solo una vez
						$checkAllTH.find('input').css('margin-right', '1em');
						$self._addArrow($checkAllTH.find('input'));
					}

					//Fila
					$self.find('.cbox').css('margin-right', '1em');
					if (settings.multiselection.rowContextMenu_enabled) {
						var isJerarquia = settings.jerarquia !== undefined ? true : false,
							defaultOptions = jQuery.isEmptyObject(settings.multiselection.rowContextMenu.items);
						//Recorrer todas las filas
						$.each($self.find('.cbox'), function (index, value) {
							//Añadir flecha
							$self._addArrow(jQuery(value));
							//Deshabilitar flecha: Jerarquía + solo opciones por defecto + no tiene hijos
							if (isJerarquia && defaultOptions && $(value).parents('tr').find('.treeclick').hasClass('tree-leaf')) {
								jQuery(this).next('a').addClass('ui-state-disabled').off('click');
							}
						});
					}
				},
				/*
         * Capturador del evento jqGridSelectAll.
         * Se ejecuta cuando se realice una selección de todos los elementos de la página.
         *
         * 	event: Objeto event de jQuery
         *  selectedRows: Array con los identificadores de los registros seleccionados en la página
         *  status: true en caso de selección, false en caso de deselección.
         */
				'jqGridSelectAll.rupTable.multiselection': function (event, selectedRows, status) {
					var page = $self.rup_jqtable('getGridParam', 'page'),
						selectMsg, deselectMsg, elementosRestantes, selectRestMsg, remainingSelectButton, remainingDeselectButton, cont;

					// Se oculta el posible mensaje de feedback que se muestre
					$self.triggerHandler('rupTable_internalFeedbackClose');

					// Se gestiona la selección de todos los registros de la página
					cont = 0;
					for (var i = 0; i < selectedRows.length; i++) {
						if (selectedRows[i].indexOf(settings.id + 'ghead_') === -1) {
							$self._processSelectedRow(settings, selectedRows[i], status);
							cont++;
						}
					}


					selectMsg = jQuery.rup.i18nTemplate(jQuery.rup.i18n.base, 'rup_jqtable.selectMsg', '<b>' + cont + '</b>', '<b>' + page + '</b>');
					deselectMsg = jQuery.rup.i18nTemplate(jQuery.rup.i18n.base, 'rup_jqtable.deselectMsg', '<b>' + cont + '</b>', '<b>' + page + '</b>');

					// Se comprueba el valor de status para determinar si se está seleccionando (true) o deseleccionando (false) todos los registos de la página
					if (status) {
						// Se obtienen el número de registros restantes que quedan por seleccionar
						elementosRestantes = $self._getRemainingRecordNum(settings, selectedRows);
						if (elementosRestantes !== 0) {
							// En caso de existir registros sin seleccionar se muestra el mensaje junto con un botón para permitir la selecón de dichos elementos
							selectRestMsg = jQuery.rup.i18nTemplate(jQuery.rup.i18n.base, 'rup_jqtable.selectRestMsg', elementosRestantes);
							remainingSelectButton = jQuery.rup.i18nTemplate(jQuery.rup.i18n.base, 'rup_jqtable.templates.multiselection.selectRemainingRecords', $self[0].id, selectRestMsg, jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_jqtable.selectAll'));
							$self.trigger('rupTable_feedbackShow', [settings.$internalFeedback, selectMsg + remainingSelectButton, 'alert']);
						} else {
							// Si no hay elementos restantes por seleccionar se muestra solo un mensaje informativo
							$self.trigger('rupTable_feedbackShow', [settings.$internalFeedback, selectMsg, 'alert']);
						}

						// Se asocia el handler al evento click del botón de seleccionar el resto de registros
						$('#rup_jqtable_' + $self[0].id + '_selectAll').on('click', function (event) {
							$self.rup_jqtable('selectRemainingRows');
						});
						$self.rup_jqtable('highlightFirstEditableRow');
					} else {
						$self.rup_jqtable('clearHighlightedEditableRows');
						// En caso de existir elementos seleccionados se muestra un mensaje que incluye un botón para permitir la deselección del todos los elementos seleccionados
						if (settings.multiselection.numSelected > 0) {
							selectRestMsg = jQuery.rup.i18nTemplate(jQuery.rup.i18n.base, 'rup_jqtable.deselectRestMsg', settings.multiselection.numSelected);
							remainingDeselectButton = jQuery.rup.i18nTemplate(jQuery.rup.i18n.base, 'rup_jqtable.templates.multiselection.deselectRemainingRecords', $self[0].id, selectRestMsg, jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_jqtable.deSelectAll'));
							$self.trigger('rupTable_feedbackShow', [settings.$internalFeedback, deselectMsg + remainingDeselectButton, 'alert']);
						} else {
							// Si no hay elementos restantes por deseleccionar se muestra solo un mensaje informativo
							$self.trigger('rupTable_feedbackShow', [settings.$internalFeedback, deselectMsg, 'alert']);
						}

						// Se asocia el handler al evento click del botón de deseleccionar el resto de registros
						$('#rup_jqtable_' + $self[0].id + '_deselectAll').on('click', function (event) {
							$self.rup_jqtable('deselectRemainingRows');
						});
					}

					// Se actualiza el contador de elementos seleccionados
					$self.rup_jqtable('updateSelectedRowNumber');
				},
				'rupTableAfterSearchNav.rupTable.multiselection rupTableSearchSuccess.rupTable.multiselection rupTableAfterDelete.rupTable.multiselection': function () {
					var $self = $(this);
					$self.rup_jqtable('resetSelection');
				},
				'rupTable_multiselectionUpdated.multiselection': function () {
					var $self = $(this),
						self = $self[0],
						page = $self.rup_jqtable('getGridParam', 'page'),
						settings = $self.data('settings'),
						internalProps = self.p,
						rowNum = $self.rup_jqtable('getGridParam', 'rowNum'),
						rows,
						selectedRows = settings.multiselection.selectedRowsPerPage[page],
						deselectedRows = settings.multiselection.deselectedRowsPerPage[page] || [];

					// Se oculta el posible mensaje de feedback que se muestre
					$self.triggerHandler('rupTable_internalFeedbackClose');

					/*
           * Gestión de la persistencia de la multiselección entre páginas.
           *
           * El siguiente algoritmo permite mantener la selección de registros mientras se pagina.
           * Los registros seleccionados se mantienen almacenando sus identificadores.
           * En caso de seleccionar todos los elementos de la tabla se trabaja mediante lógica inversa, de modo que se almacenan los registros deseleccionados.
           */
					// Se comprueba si se han seleccionado todos los registros de la tabla.
					if (settings.multiselection.selectedAll) {
						internalProps.selarrrow = [];
						rows = self.rows;
						// Para cada línea que muestra la tabla:
						for (var i = 0; i < rows.length; i++) {

							// Se comprueba si el registro se encuentra en el array de deseleccionados.
							if (jQuery.inArray(rows[i].id, deselectedRows) === -1) {
								// En caso de no ser un elemento deseleccionado se marca como seleccionado.
								$self.rup_jqtable('highlightRowAsSelected', $(rows[i]));
							} else {
								// En caso de ser un elemento deseleccionado se desmarca.
								$self.rup_jqtable('clearHighlightedRowAsSelected', $(rows[i]));
							}
						}

						// En caso de estar todos los elementos de la página seleccionados marcamos el check general

						if (deselectedRows.length === 0) {
							settings.$selectAllCheck[internalProps.useProp ? 'prop' : 'attr']('checked', true);
						}

					} else {
						// No se han seleccionado todos los resgistros de la página.
						if (selectedRows) {
							rows = self.rows;
							internalProps.selarrrow = [];
							// Para cada línea que muestra la tabla:
							for (var i = 0; i < rows.length; i++) {
								// Se comprueba si el registro se encuentra en el array de seleccionados
								if (jQuery.inArray(rows[i].id, selectedRows) !== -1) {
									// En caso de ser un elemento seleccionado, se marca como tal.
									$self.rup_jqtable('highlightRowAsSelected', $(rows[i]));
								} else {
									// En caso de no ser un elemento seleccionado se desmarca.
									$self.rup_jqtable('clearHighlightedRowAsSelected', $(rows[i]));
								}
							}

							// En caso de estar todos los elementos de la página seleccionados marcamos el check general
							if (selectedRows.length === rowNum) {
								settings.$selectAllCheck[internalProps.useProp ? 'prop' : 'attr']('checked', true);
							}
						}
					}
					$self.rup_jqtable('updateSelectedRowNumber');
				},
				'rupTable_beforeAddRow.multiselection': function (event, addCloneOptions) {
					// Si la edición en línea no está activada, no comprobamos los elementos seleccionados y devolvemos true
					if ($self[0].p.inlineEdit) {
						return true;
					}
					$self._checkSelectedElements(function () {
						$self.jqGrid('editGridRow', 'new', addCloneOptions);
						$self.rup_jqtable('resetSelection');
						$self.rup_jqtable('clearHighlightedEditableRows');
					});

					return false;
				},
				'jqGridAddEditAfterSubmit.rupTable.formEditing': function (event, res, postData, oper) {
					if (oper !== 'edit') {
						$self.rup_jqtable('resetSelection');
						$self.rup_jqtable('clearHighlightedEditableRows');
					}
				}
			});

			if (settings.multiboxonly === true) {
				settings.multiselection.multiboxonly = true;
			}

			// Control del uso de Ctrl y Shift
			jQuery('body').on({
				'rup_ctrlKeyDown rup_shiftKeyDown': function () {
					if (settings.multiselection.multiboxonly === true) {
						$self[0].p.multiboxonly = false;
					}
					return false;
				},
				'rup_ctrlKeyUp rup_shiftKeyUp': function () {
					if (settings.multiselection.multiboxonly === true) {
						$self[0].p.multiboxonly = true;
					}
					return false;
				}
			});

			/**
       * MENUS CONTEXTUALES
       */
			jQuery.contextMenu('destroy', '[id=\'' + settings.id + '_cb\']');
			let selector = '[id=\'' + settings.id + '_cb\']';
			if (jQuery(selector).length>0){
				jQuery(selector).rup_contextMenu({
					selector: selector,
					trigger: 'none',
					callback: settings.multiselection.headerContextMenu.callback,
					items: $self._headerContextMenuItems(settings.multiselection.headerContextMenu, settings),
					position: function (contextMenu, x, y) {
						var offset = this.offset();
						contextMenu.$menu.css({
							top: offset.top + this.height(),
							left: offset.left
						});
					}
				});
			}
			if (settings.multiselection.rowContextMenu_enabled) {
				let selector = 'td[aria-describedby=\'' + settings.id + '_cb\']';
				jQuery.contextMenu('destroy', selector);
				if (jQuery(selector).length > 0) {
					jQuery(selector).rup_contextMenu({
						selector: selector,
						trigger: 'none',
						callback: settings.multiselection.rowContextMenu.callback,
						items: $self._rowContextMenuItems(settings.multiselection.rowContextMenu, settings),
						position: function (contextMenu, x, y) {
							var offset = this.offset();
							contextMenu.$menu.css({
								top: offset.top + this.height(),
								left: offset.left
							});
						}
					});
				}
			}
		}
	});

	/**
   * Métodos públicos del plugin multiselection.
   *
   * Los métodos implementados son:
   *
   * resetSelection(): Limpia a selección realizada por el usuario.
   * updateSelectedRowNumber(): Refresca el identificador de resgistros seleccionados
   */
	jQuery.fn.rup_jqtable('extend', {
		getSelectedIds: function () {
			var $self = this,
				settings = $self.data('settings'),
				multiselectionObj = {};

			if (!settings.multiselection.selectedAll) {
				if (settings.multiselection.selectedIds != undefined) {
					if (settings.multiselection.selectedIds.length > 0) {
						jQuery.extend(true, multiselectionObj, {
							'selectedIds': settings.multiselection.selectedIds
						});
					}
				}
				jQuery.extend(true, multiselectionObj, {
					'selectedAll': false
				});
			} else {
				if (settings.multiselection.deselectedIds.length > 0) {
					jQuery.extend(true, multiselectionObj, {
						'selectedIds': settings.multiselection.deselectedIds
					});
				}
				jQuery.extend(true, multiselectionObj, {
					'selectedAll': true
				});
			}

			return multiselectionObj;
		},
		clearHighlightedEditableRows: function () {
			var $self = this,
				settings = $self.data('settings');
			$self.find('td[aria-describedby=\'' + settings.id + '_rupInfoCol\'] span.ui-icon.ui-icon-pencil').removeClass('ui-icon-pencil');
		},
		highlightFirstEditableRow: function () {
			var $self = this,
				settings = $self.data('settings'),
				page = parseInt($self.rup_jqtable('getGridParam', 'page'), 10),
				firstSelectedLine, firstSelectedId;

			$self.rup_jqtable('clearHighlightedEditableRows');

			if ($self._hasPageSelectedElements(page)) {
				firstSelectedLine = $self._getFirstSelectedElementOfPage(page);
				firstSelectedId = $self.jqGrid('getDataIDs')[firstSelectedLine - 1];
				settings.multiselection.rowForEditing = firstSelectedId;
				$self.rup_jqtable('highlightEditableRow', $self.jqGrid('getInd', firstSelectedId, true));
			}
		},
		highlightEditableRow: function ($row) {
			var $self = this,
				settings = $self.data('settings');
			$row = jQuery($row);
			$row.find('td[aria-describedby=\'' + settings.id + '_rupInfoCol\'] span').addClass('ui-icon ui-icon-rupInfoCol ui-icon-pencil');
		},
		refreshSelection: function () {
			var $self = this;
			$self.triggerHandler('rupTable_multiselectionUpdated');
		},
		resetSelection: function () {
			var $self = this,
				settings = $self.data('settings');

			$self.jqGrid('resetSelection');
			$self._initializeMultiselectionProps(settings);
			$self.triggerHandler('rupTable_multiselectionUpdated');
		},
		selectAllRows: function (event) {
			var $self = this,
				settings = $self.data('settings'),
				arr, $row;

			$self.rup_jqtable('selectRemainingRows');

			jQuery('#cb_' + settings.id).attr('checked', 'checked');

			// Se marcan los registros de la tabla como marcados
			arr = $self.jqGrid('getDataIDs');

			for (var i = 0; i < arr.length; i++) {
				$row = jQuery($self.jqGrid('getInd', arr[i], true));
				$self.rup_jqtable('highlightRowAsSelected', $row);
			}

			$self.rup_jqtable('highlightFirstEditableRow');
		},
		selectRemainingRows: function (event) {
			var $self = this,
				settings = $self.data('settings');

			$self._initializeMultiselectionProps(settings);
			// Se marca el flag de todos seleccionados a true
			settings.multiselection.selectedAll = true;
			// Numero de registros seleccionados
			settings.multiselection.numSelected = $self.rup_jqtable('getGridParam', 'records');
			// Se cierra el feedback para seleccionar/deseleccionar el resto de registros
			$self.rup_jqtable('updateSelectedRowNumber');

			$self.trigger('rupTable_feedbackClose', settings.$internalFeedback);

		},
		deselectAllRows: function (event) {
			var $self = this,
				settings = $self.data('settings'),
				arr, $row,
				internalProps = $self[0].p;

			$self.rup_jqtable('deselectRemainingRows');
			$self.rup_jqtable('clearHighlightedEditableRows');

			jQuery('#cb_' + settings.id).removeAttr('checked');

			// Se marcan los registros de la tabla como marcados
			arr = $self.jqGrid('getDataIDs');
			internalProps.selarrrow = [];

			for (var i = 0; i < arr.length; i++) {
				$row = jQuery($self.jqGrid('getInd', arr[i], true));
				$self.rup_jqtable('clearHighlightedRowAsSelected', $row);
			}
		},
		deselectRemainingRows: function (event) {
			var $self = this,
				settings = $self.data('settings');

			$self._initializeMultiselectionProps(settings);
			// Se cierra el feedback para seleccionar/deseleccionar el resto de registros
			$self.rup_jqtable('updateSelectedRowNumber');
			$self.trigger('rupTable_feedbackClose', settings.$internalFeedback);
		},
		/*
     * Actualiza el contador de la tabla que indica los registros seleccionados.
     */
		updateSelectedRowNumber: function () {
			var $self = $(this),
				settings = $self.data('settings');
			$('div .ui-paging-selected', settings.$pager).html(settings.multiselection.numSelected + ' ' + jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_jqtable.pager.selected'));
			$self.triggerHandler('rupTableSelectedRowNumberUpdated');
		}

	});

	//*******************************************************
	// DEFINICIÓN DE MÉTODOS PRIVADOS
	//*******************************************************

	/**
   * Métodos privados del plugin multiselection.
   *
   * Los métodos implementados son:
   *
   * _addArrow (object): Añade flecha para desplegar menú contextual.
   * _headerContextMenuItems(options, settings): Configura el menú contextual del check de la cabecera.
   * _rowContextMenuItems(options, settings): Configura el menú contextual del check de cada línea (contiene configuración para Jerarquía).
   * _hasPageSelectedElements(paramPage): Determina (true/false) si la página indicada contiene registros seleccionados.
   * _initializeMultiselectionProps(settings): Inicializa los parámetros internos de control para la multiselección.
   * _getFirstSelectedElementOfPage(paramPage): Devuelve el primer registro seleccionado de la página indicada.
   * _getRemainingRecordNum(settings, selectedRows): Devuelve el número de elementos restantes que pueden ser seleccionados.
   * _getSelectedLinesOfPage(page): Devuelve el número de registros seleccionados de que dispone la página indicada por parámetro.
   * _processSelectedRow(settings, rowId, status): Gestióna la acción de seleción/deselección del registro indicado.
   */
	jQuery.fn.rup_jqtable('extend', {
		//Añade flecha contextMenu
		_addArrow: function (object) {
			jQuery(object).after(
				jQuery('<a></a>')
					.attr('href', 'javascript:void(0)')
					.addClass('ui-icon rup-jerarquia_checkmenu_arrow')
					.on('click', function (e) {
						$(this).parents('th, td').contextMenu();
					})
			);
		},
		_checkSelectedElements: function (okCallback) {
			var $self = $(this),
				self = $self[0],
				page = $self.rup_jqtable('getGridParam', 'page'),
				settings = $self.data('settings');

			//if(prop.showMultiselectAlerts && selectedRows && selectedRows.length>0){
			if (settings.multiselection.numSelected > 0) {
				$.rup_messages('msgConfirm', {
					message: $.rup.i18nParse($.rup.i18n.base, 'rup_jqtable.checkSelectedElems'),
					title: $.rup.i18nParse($.rup.i18n.base, 'rup_jqtable.changes'),
					OKFunction: function () {
						okCallback.call();
					}
				});
			} else {
				okCallback.call();
			}
		},
		//Crear contextMenu cabecera
		_headerContextMenuItems: function (options, settings) {
			var $self = this,
				items = {};
			if (options.selectAllPage) {
				jQuery.extend(items, {
					'selectAllPage': {
						name: $.rup.i18nParse($.rup.i18n.base, 'rup_jqtable.plugins.multiselection.selectAllPage'),
						icon: 'check',
						disabled: function (key, opt) {
							return $self._getSelectedLinesOfPage(parseInt($self.rup_jqtable('getGridParam', 'page'))).length === $self.jqGrid('getGridParam', 'reccount');
						},
						callback: function (key, options) {
							$('[id=\'cb_' + settings.id + '\']').attr('checked', 'checked').click().attr('checked', 'checked');
						}
					}
				});
			}
			if (options.deselectAllPage) {
				jQuery.extend(items, {
					'deselectAllPage': {
						name: $.rup.i18nParse($.rup.i18n.base, 'rup_jqtable.plugins.multiselection.deselectAllPage'),
						icon: 'uncheck',
						disabled: function (key, opt) {
							return $self._getSelectedLinesOfPage(parseInt($self.rup_jqtable('getGridParam', 'page'))).length === 0;
						},
						callback: function (key, options) {
							$('[id=\'cb_' + settings.id + '\']').removeAttr('checked').click().removeAttr('checked');
						}
					}
				});
			}
			if (options.separator) {
				jQuery.extend(items, {
					'separator': ''
				});
			}
			if (options.selectAll) {
				jQuery.extend(items, {
					'selectAll': {
						name: $.rup.i18nParse($.rup.i18n.base, 'rup_jqtable.plugins.multiselection.selectAll'),
						icon: 'check_all',
						disabled: function (key, opt) {
							return settings.multiselection.numSelected === $self.rup_jqtable('getGridParam', 'records');
						},
						callback: function (key, options) {
							$self.rup_jqtable('selectAllRows');
						}
					}
				});
			}
			if (options.deselectAll) {
				jQuery.extend(items, {
					'deselectAll': {
						name: $.rup.i18nParse($.rup.i18n.base, 'rup_jqtable.plugins.multiselection.deselectAll'),
						icon: 'uncheck_all',
						disabled: function (key, opt) {
							return settings.multiselection.numSelected === 0;
						},
						callback: function (key, options) {
							$self.rup_jqtable('deselectAllRows');
						}
					}
				});
			}

			if (!jQuery.isEmptyObject(options.items)) {
				jQuery.extend(items, options.items);
			}
			return items;
		},
		_rowContextMenuItems: function (options, settings) {
			var $self = this,
				items = {};
			if (settings.jerarquia !== undefined && settings.jerarquia.contextMenu) {
				if (options.selectChild) {
					jQuery.extend(items, {
						'selectChild': {
							name: $.rup.i18nParse($.rup.i18n.base, 'rup_jqtable.plugins.jerarquia.selectChild'),
							icon: 'child',
							callback: function (key, options) {
								$self._getJerarquiaChildren(this, key, options);
							}
						}
					});
				}
				if (options.selectDescendent) {
					jQuery.extend(items, {
						'selectDescendent': {
							name: $.rup.i18nParse($.rup.i18n.base, 'rup_jqtable.plugins.jerarquia.selectDescendent'),
							icon: 'descendent',
							callback: function (key, options) {
								$self._getJerarquiaChildren(this, key, options);
							}
						}
					});
				}
				if (options.separator) {
					jQuery.extend(items, {
						'separator': ''
					});
				}
				if (options.deselectChild) {
					jQuery.extend(items, {
						'deselectChild': {
							name: $.rup.i18nParse($.rup.i18n.base, 'rup_jqtable.plugins.jerarquia.deselectChild'),
							icon: 'uncheck',
							callback: function (key, options) {
								$self._getJerarquiaChildren(this, key, options);
							}
						}
					});
				}
				if (options.deselectDescendent) {
					jQuery.extend(items, {
						'deselectDescendent': {
							name: $.rup.i18nParse($.rup.i18n.base, 'rup_jqtable.plugins.jerarquia.deselectDescendent'),
							icon: 'uncheck',
							callback: function (key, options) {
								$self._getJerarquiaChildren(this, key, options);
							}
						}
					});
				}
			}
			if (!jQuery.isEmptyObject(options.items)) {
				jQuery.extend(items, options.items);
			}
			return items;
		},
		_refreshSelectedElements: function (settings, status, rowPK, tableRow) {
			//Variables para referenciar selección normal o inversa
			var rowsPerPage, linesPerPage, ids, rows, pages;
			if (settings.multiselection.selectedAll !== true) {
				rowsPerPage = settings.multiselection.selectedRowsPerPage;
				linesPerPage = settings.multiselection.selectedLinesPerPage;
				ids = settings.multiselection.selectedIds;
				rows = settings.multiselection.selectedRows;
				pages = settings.multiselection.selectedPages;
			} else {
				rowsPerPage = settings.multiselection.deselectedRowsPerPage;
				linesPerPage = settings.multiselection.deselectedLinesPerPage;
				ids = settings.multiselection.deselectedIds;
				rows = settings.multiselection.deselectedRows;
				pages = settings.multiselection.deselectedPages;
				status = !status;
			}

			//Si no estaba seleccionado
			if (status) {
				if (jQuery.inArray(rowPK, ids) === -1) {
					//Añadir el elemento a los seleccionados
					if (settings.multiselection.selectedAll !== true) {
						settings.multiselection.numSelected++;
					} else { //Quitar el elemento de los no seleccionados (inversa)
						settings.multiselection.numSelected--;
					}
					//Controlar si no existe array para la página
					if (rowsPerPage[tableRow.page] === undefined) {
						rowsPerPage[tableRow.page] = [];
						linesPerPage[tableRow.page] = [];
					}
					//id
					ids.push(rowPK);
					//PAGINA [líneas]
					jQuery.rup_utils.insertSorted(linesPerPage[tableRow.page], tableRow.pageLine);
					//{ id : PK, page : PAGINA }
					rows.push({
						id: rowPK,
						page: tableRow.page
					});
					//PAGINA [ids]
					rowsPerPage[tableRow.page].splice(tableRow.pageLine, 0, rowPK);
					//PAGINA
					if (rowsPerPage[tableRow.page].length > 0 &&
												jQuery.inArray(tableRow.page, pages) === -1) {
						jQuery.rup_utils.insertSorted(pages, tableRow.page);
					}
				}
			} else {
				if (jQuery.inArray(rowPK, ids) !== -1) {
					//Quitar el elemento a los seleccionados
					if (settings.multiselection.selectedAll !== true) {
						settings.multiselection.numSelected--;
					} else { //añadir el elemento de los no seleccionados (inversa)
						settings.multiselection.numSelected++;
					}
					//id
					ids.splice(jQuery.inArray(rowPK, ids), 1);
					//PAGINA [líneas]
					linesPerPage[tableRow.page].splice(jQuery.inArray(tableRow.pageLine, linesPerPage[tableRow.page]), 1);
					//{ id : PK, page : PAGINA }
					var selectedRowObjStr = JSON.stringify({
							id: rowPK,
							page: tableRow.page
						}),
						indexInArray = null;
					jQuery.grep(rows, function (element, index) {
						if (JSON.stringify(element) === selectedRowObjStr) {
							indexInArray = index;
						}
					});
					rows.splice(indexInArray, 1);
					//PAGINA [ids]
					rowsPerPage[tableRow.page].splice(jQuery.inArray(rowPK, rowsPerPage[tableRow.page]), 1);
					//PAGINA
					if (rowsPerPage[tableRow.page].length == 0 &&
												jQuery.inArray(tableRow.page, pages) !== -1) {
						pages.splice(jQuery.inArray(tableRow.page, pages), 1);
					}
				}
			}
		},

		_hasPageSelectedElements: function (paramPage) {
			var $self = this,
				settings = $self.data('settings'),
				rowsPerPage,
				page = (typeof paramPage === 'string' ? parseInt(paramPage, 10) : paramPage);
			// Se comprueba si se han seleccionado todos los registros de la tabla
			if (!settings.multiselection.selectedAll) {
				// En caso de no haberse seleccionado todos los registros de la tabla
				// Comprobamos si en la página indicada se ha seleccionado un elemento
				return (jQuery.inArray(page, settings.multiselection.selectedPages) !== -1);

			} else {
				// En caso de haberse seleccionado todos los registros de la tabla
				// Generamos un array inicializado con los index de las lineas de las tablas
				rowsPerPage = parseInt($self.rup_jqtable('getGridParam', 'rowNum'), 10);

				// Obtenemos el número de registro por página que se visualizan
				// Se comprueba si el número de registros deseleccionados es igual al número de registros por página, en cuyo caso significará que no hay elementos seleccionados
				if (jQuery.inArray(page, settings.multiselection.deselectedPages) !== -1 && settings.multiselection.deselectedLinesPerPage[page].length === rowsPerPage) {
					return false;
				}

				return true;
			}
		},
		_initializeMultiselectionProps: function (settings) {
			// Se almacenan en los settings internos las estructuras de control de los registros seleccionados
			if (settings.multiselection === undefined) {
				settings.multiselection = {};
			}
			// Flag indicador de selección de todos los registros
			settings.multiselection.selectedAll = false;
			// Numero de registros seleccionados
			settings.multiselection.numSelected = 0;
			// Propiedades de selección de registros
			settings.multiselection.selectedRowsPerPage = [];
			settings.multiselection.selectedLinesPerPage = [];
			settings.multiselection.selectedRows = [];
			settings.multiselection.selectedIds = [];
			settings.multiselection.selectedPages = [];
			// Propiedades de deselección de registros
			settings.multiselection.deselectedRowsPerPage = [];
			settings.multiselection.deselectedLinesPerPage = [];
			settings.multiselection.deselectedRows = [];
			settings.multiselection.deselectedIds = [];
			settings.multiselection.deselectedPages = [];

		},
		_getFirstSelectedElementOfPage: function (paramPage) {
			var $self = this,
				settings = $self.data('settings'),
				rowsPerPage,
				page = (typeof paramPage === 'string' ? parseInt(paramPage, 10) : paramPage);

			// Se comprueba si se han seleccionado todos los registros de la tabla
			if (!settings.multiselection.selectedAll) {
				// En caso de no haberse seleccionado todos los registros de la tabla
				// Comprobamos si en la página indicada se ha seleccionado un elemento
				if (jQuery.inArray(page, settings.multiselection.selectedPages) === -1) {
					return false;
				}
				// En caso de que se haya seleccionado un elemento en la página indicada se devuelve el primero
				return settings.multiselection.selectedLinesPerPage[page][0];

			} else {
				// En caso de haberse seleccionado todos los registros de la tabla
				// Si no se han deseleccionado registros en la página se devuelve el primer indice
				if (jQuery.inArray(page, settings.multiselection.deselectedPages) === -1) {
					return 1;
				}
				// Obtenemos el número de registro por página que se visualizan
				rowsPerPage = parseInt($self.rup_jqtable('getGridParam', 'rowNum'), 10);
				// Se comprueba si el número de registros deseleccionados es igual al número de registros por página, en cuyo caso significará que no hay eleme
				if (settings.multiselection.deselectedLinesPerPage[page].length === rowsPerPage) {
					return false;
				}

				// Obtenemos el primer elemento de la página que no ha sido deseleccionado
				for (var i = 1; i <= rowsPerPage; i++) {
					if (jQuery.inArray(i, settings.multiselection.deselectedLinesPerPage[page]) === -1) {
						return i;
					}
				}
			}
		},
		_getRemainingRecordNum: function (settings, selectedRows) {
			var $self = this,
				totalRegistros = $self.rup_jqtable('getGridParam', 'records'),
				registrosPagina = $self.rup_jqtable('getGridParam', 'reccount'),
				registrosSelPagina = selectedRows.length,
				registrosSelTotal = settings.multiselection.numSelected,
				elementosRestantes = ((totalRegistros - registrosPagina) !== 0) ?
					totalRegistros - registrosPagina - (registrosSelTotal - registrosSelPagina) : 0;

			return elementosRestantes;
		},
		_getSelectedLinesOfPage: function (page) {
			var $self = this,
				settings = $self.data('settings'),
				rowsPerPage, records, lastPage, inverseArray = [];

			// Se comprueba si se han seleccionado todos los registros de la tabla
			if (!settings.multiselection.selectedAll) {
				// En caso de no haberse seleccionado todos los registros de la tabla
				// Comprobamos si en la página indicada se ha seleccionado un elemento
				if (jQuery.inArray(page, settings.multiselection.selectedPages) === -1) {
					return [];
				}
				// En caso de que se haya seleccionado un elemento en la página indicada se devuelve el array de seleccionados
				return settings.multiselection.selectedLinesPerPage[page];

			} else {
				// En caso de haberse seleccionado todos los registros de la tabla
				// Generamos un array inicializado con los index de las lineas de las tablas
				rowsPerPage = parseInt($self.rup_jqtable('getGridParam', 'rowNum'), 10);
				records = $self.rup_jqtable('getGridParam', 'records');
				lastPage = parseInt(Math.ceil(records / rowsPerPage, 10));

				// En caso de ser la última página se recalcula el número de elementos que se muestran en ella
				if (page === lastPage) {
					rowsPerPage = records - ((lastPage - 1) * rowsPerPage);
				}

				for (var i = 1; i <= rowsPerPage; i++) {
					inverseArray[i - 1] = i;
				}
				// Si no se han deseleccionado registros en la página se devuelve el array al completo
				if (jQuery.inArray(page, settings.multiselection.deselectedPages) === -1) {
					return inverseArray;
				}
				// Obtenemos el número de registro por página que se visualizan
				// Se comprueba si el número de registros deseleccionados es igual al número de registros por página, en cuyo caso significará que no hay elementos seleccionados
				if (settings.multiselection.deselectedLinesPerPage[page].length === rowsPerPage) {
					return [];
				}
				// Se eliminan del array inicializado con todos los identificadores de las lineas, las que han sido deseleccionadas
				return jQuery.grep(inverseArray, function (elem) {
					return (jQuery.inArray(elem, settings.multiselection.deselectedLinesPerPage[page]) === -1);
				});
			}
		},
		_processSelectedRow: function (settings, rowId, status) {
			var $self = this,
				page = $self.rup_jqtable('getGridParam', 'page'),
				pageInt = parseInt(page),
				lineIndex, indexInArray, indexAtPage, indexPage;
			// Se selecciona o deselecciona el elemento en los arrays que almacenan los registros seleccionados.
			if (status) {
				if (settings.multiselection.selectedAll) {
					// Se ha deseleccionado un elemento
					// Se almacena el Id del registro seleccionado
					indexInArray = jQuery.inArray(rowId, settings.multiselection.deselectedIds);
					if (indexInArray != -1) {
						settings.multiselection.deselectedIds.splice(indexInArray, 1);
						settings.multiselection.deselectedRows.splice(indexInArray, 1);
						indexAtPage = jQuery.inArray(rowId, settings.multiselection.deselectedRowsPerPage[page]);
						settings.multiselection.deselectedRowsPerPage[page].splice(indexAtPage, 1);
						settings.multiselection.deselectedLinesPerPage[page].splice(indexAtPage, 1);
						if (settings.multiselection.deselectedRowsPerPage[page].length === 0) {
							indexPage = jQuery.inArray(pageInt, settings.multiselection.deselectedPages);
							if (indexPage !== -1) {
								settings.multiselection.deselectedPages.splice(indexPage, 1);
							}
						}
						settings.multiselection.numSelected++;
					}
				} else {
					// Se ha seleccionado un elemento
					// Se comprueba si está creado el array correspondiente para la página actual
					if (settings.multiselection.selectedRowsPerPage[page] === undefined) {
						settings.multiselection.selectedRowsPerPage[page] = [];
						settings.multiselection.selectedLinesPerPage[page] = [];
					}
					// Se almacena el Id del registro seleccionado
					if (jQuery.inArray(rowId, settings.multiselection.selectedIds) === -1) {
						settings.multiselection.selectedIds.push(rowId);
						settings.multiselection.selectedRows.push({
							id: rowId,
							page: page
						});
						//						lineIndex = jQuery.rup_utils.insertSorted(settings.multiselection.selectedLinesPerPage[page], $self.jqGrid("getInd",rowId));
						lineIndex = jQuery.rup_utils.insertSorted(settings.multiselection.selectedLinesPerPage[page], $self._getLineIndex(rowId));
						settings.multiselection.selectedRowsPerPage[page].splice(lineIndex, 0, rowId);
						if (settings.multiselection.selectedRowsPerPage[page].length > 0 &&
														jQuery.inArray(pageInt, settings.multiselection.selectedPages) === -1) {
							jQuery.rup_utils.insertSorted(settings.multiselection.selectedPages, pageInt);
						}
						settings.multiselection.numSelected++;
					}
				}
			} else {
				if (settings.multiselection.selectedAll) {
					// Se ha seleccionado un elemento
					// Se comprueba si está creado el array correspondiente para la página actual
					if (settings.multiselection.deselectedRowsPerPage[page] === undefined) {
						settings.multiselection.deselectedRowsPerPage[page] = [];
						settings.multiselection.deselectedLinesPerPage[page] = [];
					}
					// Se almacena el Id del registro seleccionado
					if (jQuery.inArray(rowId, settings.multiselection.deselectedIds) === -1) {
						settings.multiselection.deselectedIds.push(rowId);
						settings.multiselection.deselectedRows.push({
							id: rowId,
							page: page
						});
						//						lineIndex = jQuery.rup_utils.insertSorted(settings.multiselection.deselectedLinesPerPage[page], $self.jqGrid("getInd",rowId));
						lineIndex = jQuery.rup_utils.insertSorted(settings.multiselection.deselectedLinesPerPage[page], $self._getLineIndex(rowId));
						settings.multiselection.deselectedRowsPerPage[page].splice(lineIndex, 0, rowId);
						if (settings.multiselection.deselectedRowsPerPage[page].length > 0 &&
														jQuery.inArray(pageInt, settings.multiselection.deselectedPages) === -1) {
							jQuery.rup_utils.insertSorted(settings.multiselection.deselectedPages, pageInt);
						}
						settings.multiselection.numSelected--;
					}
				} else {
					// Se ha deseleccionado un elemento
					// Se almacena el Id del registro seleccionado
					index = jQuery.inArray(rowId, settings.multiselection.selectedIds);
					if (index != -1) {
						settings.multiselection.selectedIds.splice(index, 1);
						settings.multiselection.selectedRows.splice(index, 1);
						indexAtPage = jQuery.inArray(rowId, settings.multiselection.selectedRowsPerPage[page]);
						settings.multiselection.selectedRowsPerPage[page].splice(indexAtPage, 1);
						settings.multiselection.selectedLinesPerPage[page].splice(indexAtPage, 1);
						if (settings.multiselection.selectedRowsPerPage[page].length === 0) {
							indexPage = jQuery.inArray(pageInt, settings.multiselection.selectedPages);
							if (indexPage !== -1) {
								settings.multiselection.selectedPages.splice(indexPage, 1);
							}
						}
						settings.multiselection.numSelected--;
					}
				}
			}
			$self.rup_jqtable('updateSelectedRowNumber');
		}
	});


	//*******************************************************
	// DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
	//*******************************************************
	jQuery.fn.rup_jqtable.plugins.multiselection = jQuery.fn.rup_jqtable.plugins.multiselection || {};
	jQuery.fn.rup_jqtable.plugins.multiselection.defaults = {
		showGridInfoCol: true,
		formEdit: {
			autoselectFirstRecord: false
		},
		inlineEdit: {
			autoselectFirstRecord: false
		},
		multiselection: {
			defaultEditableInfoCol: {
				name: 'infoEditable',
				index: 'infoEditable',
				editable: false,
				width: '15em',
				search: false
			},
			headerContextMenu_enabled: true,
			headerContextMenu: {
				selectAllPage: true,
				deselectAllPage: true,
				separator: true,
				selectAll: true,
				deselectAll: true,
				items: {}
			},
			rowContextMenu_enabled: false,
			rowContextMenu: {
				selectChild: true,
				selectDescendent: true,
				separator: true,
				deselectChild: true,
				deselectDescendent: true,
				items: {}
			}
		}
	};

	jQuery.fn.rup_jqtable.defaults.multiselection = {
		loadBeforeSend: function rup_jqtable_defaults_loadBeforeSend(xhr, settings) {
			// Se modifica la request para incluir las siguientes cabeceras:
			// Se añade la cabecera JQGridModel para indicar que la petición ha sido realizada por el componente rup_jqtable
			xhr.setRequestHeader('JQGridModel', 'true');
			// Se indica que el tipo de contenido enviado en la cabecera es application/jsons
			xhr.setRequestHeader('Content-Type', 'application/json');
		}
	};


})(jQuery);

/*!
 * Copyright 2013 E.J.I.E., S.A.
 *
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
 */

/*global jQuery */

/**
 * El objetivo principal del módulo Jerarquía es la presentación de un conjunto de datos (tabla) ordenados jerárquicamente en base a una relación existente entre ellos.
 *
 * @summary Plugin de edición en línea del componente RUP Table.
 * @module rup_jqtable/jerarquia
 * @example
 *
 * $("#idComponente").rup_jqtable({
 * 	url: "../jqGridUsuario",
 * 	usePlugins:["jerarquia"],
 * 	jerarquia:{
 * 		// Propiedades de configuración del plugin jerarquia
 * 	}
 * });
 */

(function (jQuery) {

	jQuery.rup_jqtable.registerPlugin('jerarquia', {
		loadOrder: 11,
		preConfiguration: function (settings) {
			var $self = this;
			return $self.rup_jqtable('preConfigurejerarquia', settings);

		},
		postConfiguration: function (settings) {
			var $self = this;
			return $self.rup_jqtable('postConfigurejerarquia', settings);
		}
	});

	//********************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	//********************************
	jQuery.fn.rup_jqtable('extend', {
		/**
		* Metodo que realiza la pre-configuración del plugin jerarquia del componente RUP Table.
		* Este método se ejecuta antes de la incialización del plugin.
		*
		* @name preConfigurejerarquia
		* @function
		* @param {object} settings - Parámetros de configuración del componente.
		*/
		preConfigurejerarquia: function (settings) {

			var $self = this,
				jerarquiaSettings = settings.jerarquia;

			//Contenedor de parámetros de la jerarquia
			$self.jqGrid('setGridParam', {
				postData: {
					jerarquia: {}
				}
			});

			//Sobreescribir valores y funciones TREEGRID
			settings.treeGrid = true;
			settings.rowTotal = 0; //(avoid default feature)
			settings.treeGridModel = 'adjacency'; //default: nested
			settings.treeIcons = jerarquiaSettings['icons'];
			//(avoid default function)
			var setTreeGrid_default = $self.jqGrid.setTreeGrid;
			jQuery.jgrid.extend({
				setTreeGrid: function () {
					setTreeGrid_default.call($self);
					$self[0].p.altRows = true; //pijama
					$self[0].p.pgbuttons = true; //enlaces paginación
					$self[0].p.pginput = true; //selector de página
					$self[0].p.rowList = settings.rowList; //núm. elementos/página
					if (settings.multiselect) {
						$self[0].p.multiselect = true; //multiselección
					}
				}
			});

			// Se configura la url de filtrado
			if (settings.filter.childrenUrl === null) {
				settings.filter.childrenUrl = settings.baseUrl + 'Children';
			}

			//Columna de jerarquía
			settings.ExpandColumn = jerarquiaSettings['column'];

			//Si es multiselección se debe de desplazar el puntero de la columna a la siguiente (da igual que sea oculta)
			if (settings.multiselect) {
				for (key in settings.colModel) {
					if (settings.colModel[key].name === settings.ExpandColumn) {
						key = parseInt(key) + 1;
						//Si no hay columna siguiente se crea una oculta para esto
						if (settings.colModel[key] === undefined) {
							settings.colNames[key] = 'jerarquia_multiselect';
							settings.colModel[key] = {
								name: 'jerarquia_multiselect',
								hidden: true
							};
						}
						settings.ExpandColumn = settings.colModel[key].name;
						break;
					}
				}
			}

			//Añadir columnas de la jerarquía
			settings.colNames = jQuery.merge(['level'], settings.colNames);
			settings.colModel = jQuery.merge([{
				name: 'level',
				hidden: true
			}], settings.colModel);
			settings.colNames = jQuery.merge(['isLeaf'], settings.colNames);
			settings.colModel = jQuery.merge([{
				name: 'isLeaf',
				hidden: true
			}], settings.colModel);
			settings.colNames = jQuery.merge(['parentNodes'], settings.colNames);
			settings.colModel = jQuery.merge([{
				name: 'parentNodes',
				hidden: true
			}], settings.colModel);
			settings.colNames = jQuery.merge(['filter'], settings.colNames);
			settings.colModel = jQuery.merge([{
				name: 'filter',
				hidden: true
			}], settings.colModel);

			//Inicializar los elementos contraidos
			jQuery($self).data('tree', []);

			//Sobreescribir evento expandir/contraer
			$self.on({
				'rupTable_serializeGridData.multiselection': function (events, postData) {
					//Token para separar los nodos (para tooltip)
					jQuery.extend(true, postData, {
						'jerarquia': {
							'token': jerarquiaSettings['token']
						}
					});

					if (Array.isArray(postData.jerarquia.tree) && postData.jerarquia.tree.length === 0) {
						postData.jerarquia.tree = '';
					}
				},
				'jqGridAddEditAfterComplete.rupTable.jerarquia': function () {
					//Desactivar TREEGRID
					$self[0].p.treeGrid = false; //(avoid default feature)
				},
				//				"jqGridAddEditBeforeSubmit.rupTable.jerarquia": function(event, postData, $form, frmoper){
				//					var parentProp = jQuery.proxy(settings.getRowForEditing, $self)();
				//					if (parentProp!==undefined){
				//						postData[settings.jerarquia.parentProp] = parentProp;
				//					}
				//				},
				'jqGridAddEditBeforeSubmit.rupTable.jerarquia jqGridBeforeRequest.rupTable.jerarquia': function () {
					//Activar TREEGRID
					$self[0].p.treeGrid = true; //(avoid default feature)
				},
				'jqGridLoadComplete.rupTable.jerarquia': function (event, data) {
					//Array de elementos contraidos
					var collapsedNodes = jQuery($self).data('tree'),
						collapsedNodes_length = collapsedNodes.length;

					//ICONOS: contraidos (tree)
					for (var i = 0; i < collapsedNodes_length; i++) {
						jQuery('[id=\'' + collapsedNodes[i] + '\'] .tree-wrap > div')
							.removeClass('tree-leaf ' + settings.treeIcons.leaf)
							.addClass('tree-minus ' + settings.treeIcons.minus);
					}

					//ICONOS: filtrado (filter) y tooltip (parentNodes)
					var rows = $self.rup_jqtable('getGridParam', 'data'),
						rows_length = rows.length,
						$filterIcon = jQuery('<div></div>')
							.addClass('rup-jerarquia_filter ui-icon')
							.addClass(jerarquiaSettings['icons']['filter'])
							.text(jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_jqtable.plugins.jerarquia.filtered'));
					for (var i = 0; i < rows_length; i++) {
						var rowId = jQuery.jgrid.getAccessor(rows[i], $self.rup_jqtable('getGridParam', 'localReader').id),
							$rowColumn = jQuery('tr[id=\'' + rowId + '\'] > td .tree-wrap');
						//Filtro
						if (rows[i].filter) {
							$rowColumn.prepend($filterIcon.clone());
						}
						//Tooltip
						if (jerarquiaSettings['parentNodesTooltip']) {
							$rowColumn.parent().rup_tooltip({
								content: {
									text: $self._parseParentNodes(rows[i].parentNodes)
								}
							});
						}
					}

					//EVENTOS: Expandir (plus) - Contraer (minus)
					jQuery('.tree-plus, .tree-minus').off('click');
					jQuery('.tree-plus, .tree-minus').on('click', function (event) {
						var $iconDiv = jQuery(this),
							rowId = $self.rup_jqtable('getGridParam', '_index')[$iconDiv.closest('tr.jqgrow')[0].id],
							rowData = $self.rup_jqtable('getGridParam', 'data')[rowId],
							nodeId = jQuery.jgrid.getAccessor(rowData, $self.rup_jqtable('getGridParam', 'localReader').id);

						//Añadir o eliminar elemento para query (y almacenarlo en la tabla)
						if ($iconDiv.hasClass(settings.treeIcons.plus)) {
							collapsedNodes.push(nodeId);
						} else {
							collapsedNodes.splice(jQuery.inArray(nodeId, collapsedNodes), 1);
						}
						jQuery($self).data('tree', collapsedNodes);

						//Buscar (añadiendo colapsados)
						$self.jqGrid('setGridParam', {
							postData: {
								'jerarquia': {
									'tree': collapsedNodes.toString()
								}
							}
						});
						$self.trigger('reloadGrid');
					});

					//Desactivar TREEGRID
					$self[0].p.treeGrid = false; //(avoid default feature)
				}
			});

			//Eventos que producen reset de los elementos expandidos
			jQuery.each(jerarquiaSettings['resetEvents'], function (index, object) {
				var callback = jQuery.isFunction(object[0]) ? object.shift() : null,
					ids = '[id=\'' + object.join('\'], [id=\'') + '\']';
				//Asociar el evento
				jQuery(ids).on(index, function (event) {
					if (callback === null || callback.call($self, event) === false) {
						$self.reset();
					}
				});
				//El evento se ejecuta el primero en secuencia
				for (var i = 0; i < object.length; i++) {
					jQuery._data(jQuery('#' + object[i])[0], 'events')[index] = jQuery._data(jQuery('#' + object[i])[0], 'events')[index].reverse();
				}
			});

			//Activar contextMenu
			settings.multiselection.rowContextMenu_enabled = settings.jerarquia.contextMenu;
		},
		/**
		* Metodo que realiza la post-configuración del plugin jerarquia del componente RUP Table.
		* Este método se ejecuta antes de la incialización del plugin.
		*
		* @name postConfigurejerarquia
		* @function
		* @param {object} settings - Parámetros de configuración del componente.
		*/
		postConfigurejerarquia: function (settings) {
			var $self = this,
				jerarquiaSettings = settings.jerarquia;
		}
	});

	/**
   * Métodos públicos del plugin jerarquia.
   *
   * Los métodos implementados son:
   *
   * reset: Reiniciar los elementos expandidos
   */
	jQuery.fn.rup_jqtable('extend', {
		//Reiniciar los elementos expandidos
		/**
     * Colapsa los nodos que han sido expandidos.
     *
     * @function reset
     * @example
     * $("#idTable").rup_jqtable("reset");
     */
		reset: function () {
			jQuery(this).data('tree', []);
			jQuery(this).jqGrid('setGridParam', {
				postData: {
					'jerarquia': {
						'tree': []
					}
				}
			});
		}
	});


	/**
   * Métodos privados del plugin jerarquia.
   *
   * Los métodos implementados son:
   *
   * _parseParentNodes(parentNodes): Procesar valores del tooltip
   * _getJerarquiaChildren($trigger, key, options : Obtener los hijos/descendientes para seleccionar/deseleccionar
   */
	jQuery.fn.rup_jqtable('extend', {
		/**
     * Colapsa los nodos que han sido expandidos.
     *
     * @function _parseParentNodes
		 * @param {object} parentNodes - Referencia a los nodos padre.
		 * @private
     * @example
     * $self._parseParentNodes(parentNodes);
     */
		_parseParentNodes: function (parentNodes) {
			var parentNodesTooltipFnc = this.data('settings')['jerarquia']['parentNodesTooltipFnc'],
				nodes = parentNodes.split(this.data('settings')['jerarquia']['token']).slice(1); //filtrar primer separador
			if (parentNodesTooltipFnc === null) {
				//Función por defecto
				var str = '',
					tab = '&nbsp;&nbsp;';
				for (var i = 0; i < nodes.length; i++) {
					if (i !== (nodes.length - 1)) {
						str += nodes[i] + '<br/>' + tab + '└&nbsp;';
						tab += '&nbsp;&nbsp;&nbsp;';
					} else {
						str += '<b>' + nodes[i] + '</b>';
					}
				}
				return str;
			} else {
				return parentNodesTooltipFnc.call(this, nodes);
			}
		},
		//f(x) del contextMenu de multiselect con jerarquia

		_getJerarquiaChildren: function ($trigger, key, options) {
			var $self = this,
				settings = $self.data('settings'),
				//        		rowData = $self.rup_jqtable("getGridParam","data")[$trigger.parent().index()-1],
				rowData = $self.rup_jqtable('getRowData', $trigger.parent().attr('id')),
				ajaxData = {
					jerarquia: {
						//tree : {}, //Obviar elementos contraidos
						parentId: jQuery.jgrid.getAccessor(rowData, settings.primaryKeyCol),
						child: key.toLowerCase().indexOf('child') != -1
						//FIXME: Quitar esto
					},
					filter: $self.rup_jqtable('getFilterParams')
				};
			jQuery.extend(true, ajaxData, $self.rup_jqtable('getGridParam', 'postData'));
			var primaryKey = Array.isArray(settings.primaryKey) ? settings.primaryKey[0] : settings.primaryKey;
			jQuery.rup_ajax({
				url: settings.filter.childrenUrl,
				dataType: 'json',
				data: jQuery.toJSON(ajaxData),
				type: 'POST',
				async: false,
				contentType: 'application/json',
				beforeSend: function (xhr) {
					xhr.setRequestHeader('JQGridModel', true);
					xhr.setRequestHeader('RUP', jQuery.toJSON({
						primaryKey: primaryKey
					}));
				},
				success: function (xhr, ajaxOptions) {
					var children = xhr['children'],
						children_length = children.length,
						status = key.indexOf('deselect') != -1 ? false : true;

					for (var i = 0; i < children_length; i++) {
						var record = children[i];
						rowPK = record.pk[primaryKey];

						//FIXME: Generalizar esto
						$self._refreshSelectedElements(settings, status, rowPK, record);
					}
					//Actualizar datos
					$self.triggerHandler('rupTable_multiselectionUpdated');
				},
				error: function (xhr, ajaxOptions, thrownError) {},
				complete: function (xhr, textStatus) {}
			});
		}
	});

	//*******************************************************
	// DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
	//*******************************************************
	// Parámetros de configuración por defecto para la jerarquía

	/**
	* @description Propiedades de configuración del plugin jerarquia del componente RUP Table.
	* @name options
	*
	* @property {string} [treedatatype=json] - Determina el tipo de dato empleado para obtener la representación jerárquica.
	* @property {string} [token] - Carácter separador utilizado para concatenar diferentes identificadores de los registros mostrados en la jerarquía. (por defecto “/”).
	* @property {object} [icons] - Estilos utilizados para cada uno de los elementos visuales de la jerarquía.
	* @property {object} icons.plus - Icono para expandir el nodo.
	* @property {object} icons.minus - Icono para contraer el nodo.
	* @property {object} icons.leaf - Icono correspondiente a un nodo hoja.
	* @property {object} icons.filter - Icono para indicar que el nodo satisface los parámetros de filtrado.
	* @property {boolean} [parentNodesTooltip=true] - Determina si se debe de mostrar un tooltip para cada nodo, en el cual se representa la jerarquía que ocupa respecto a los padres.
	* @property {function} [parentNodesTooltipFnc=null] - Función de callback que permite personalizar el tooltip a mostrar.
	* @property {boolean} [contextMenu=true] - Determina si se muestra el menú contextual para cada nodo.
	*/

	jQuery.fn.rup_jqtable.plugins.jerarquia = {};
	jQuery.fn.rup_jqtable.plugins.jerarquia.defaults = {
		treedatatype: 'json',
		formEdit: {
			addEditOptions: {
				reloadAfterSubmit: true
			}
		},
		jerarquia: {
			token: '/',
			icons: {
				plus: 'ui-icon-triangle-1-se',
				minus: 'ui-icon-triangle-1-e',
				leaf: 'ui-icon-none',
				filter: 'ui-icon-star'
			},
			parentNodesTooltip: true,
			parentNodesTooltipFnc: null,
			contextMenu: true
		}
	};
})(jQuery);

/*!
 * Copyright 2013 E.J.I.E., S.A.
 *
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
 */

/*global jQuery */

/**
 * Permite relacionar dos tablas de modo que tengan una relación maestro-detalle. De este modo, los resultados de la tabla detalle se muestran a partir del seleccionado en la tabla maestro.
 *
 * @summary Plugin de edición en línea del componente RUP Table.
 * @module rup_jqtable/masterDetail
 * @example
 *
 * $("#idComponenteMaestro").rup_jqtable({
 *	url: "../jqGridUsuarioMaestro",
 * });
 *
 * $("#idComponente").rup_jqtable({
 * 	url: "../jqGridUsuarioDetalle",
 * 	usePlugins:["masterDetail"],
 * 	inlineEdit:{
 * 		master: "#idComponenteMaestro"
 * 		// Propiedades de configuración del plugin inlineEdit
 * 	}
 * });
 */
(function ($) {


	jQuery.rup_jqtable.registerPlugin('masterDetail',{
		loadOrder:10,
		preConfiguration: function(settings){
			var $self = this;
			return $self.rup_jqtable('preConfigureMasterDetail', settings);

		}
	});

	//********************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	//********************************

	/**
	 * Extensión del componente rup_jqtable para permitir la edición de los registros mediante un formulario.
	 *
	 * Los métodos implementados son:
	 *
	 * configureDetailForm(settings): Realiza la configuración interna necesaria para la gestión correcta de la edición mediante un formulario.
	 * deleteElement(rowId, options): Realiza el borrado de un registro determinado.
	 * editElement(rowId, options): Lanza la edición de un registro medainte un formulario de detalle.
	 * newElement(): Inicia el proceso de inserción de un nuevo registro.
	 * showServerValidationFieldErrors(errors): Función encargada de mostrar los errores producidos en la gestión de los datos del mantenimiento.
	 *
	 * Las propiedades de esta extensión almacenadas en el settings son las siguientes:
	 *
	 * settings.$detailForm : Referencia al formulario de detalle mediante el que se realizan las modificaciones e inserciones de registros.
	 * settings.$detailFormDiv : Referencia al div que arropa el formulario de detalle y sobre el que se inicializa el componente rup_dialog.
	 *
	 */
	jQuery.fn.rup_jqtable('extend',{

	 /**
 		* Metodo que realiza la pre-configuración del plugin masterDetail del componente RUP Table.
 		* Este método se ejecuta antes de la incialización del plugin.
 		*
 		* @name preConfigureMasterDetail
 		* @function
 		* @param {object} settings - Parámetros de configuración del componente.
 		*/
		preConfigureMasterDetail: function(settings){
			var $self = this, $master;

			// Obtenemos la referencia del maestro
			$master = jQuery(settings.masterDetail.master);
			settings.masterDetail.$master = $master;

			$self.on({
				'rupTable_serializeGridData.rupTable.masterDetail': function(events, postData){
					var masterPkObject = $self.rup_jqtable('getMasterTablePkObject');

					if (masterPkObject!==null){
						let jsonParam={'filter':masterPkObject};
						jQuery.extend(true, postData, jsonParam);
					}
				},
				'jqGridAddEditBeforeSubmit.rupTable.masterDetail': function(event, postData, frmoper){
					var masterPkObject = $self.rup_jqtable('getMasterTablePkObject');

					if (masterPkObject!==null){
						jQuery.extend(postData, masterPkObject);
					}
				},
				'rupTable_searchBeforeSubmit.rupTable.masterDetail':function(event, postData, jsonData){

					var masterPkObject = $self.rup_jqtable('getMasterTablePkObject');

					if (masterPkObject!==null){
						let jsonParam={'filter':masterPkObject};
						jQuery.extend(true, jsonData, jsonParam);
					}
				}
			});

			$master.on({
				'jqGridSelectRow.rupTable.masterDetail': function(event, rowid, status){
					var lastRowid = $self.data('tmp.masterDetail.lastRowid');
					if (lastRowid === undefined || lastRowid!==rowid){
						if (jQuery.inArray('filter', settings.usePlugins) !== -1){
		                    $self.data('tmp.masterDetail.lastRowid', rowid);
		                    $self.rup_jqtable('showSearchCriteria');
		                    $self.rup_jqtable('filter');
		                } else {
		                    $self.rup_jqtable('reloadGrid');
		                }
					}
				},
				'jqGridAfterLoadComplete.multiselection.editRow': function(event,data){
					if (data.rows.length===0){
						$self.removeData('tmp.masterDetail.lastRowid');
						$self.jqGrid('clearGridData');
					}
				}
			});
		}
	});

	jQuery.fn.rup_jqtable('extend',{
		/**
     * Devuelve un objeto json con la clave primaria del registro correspondiente de la tabla maestra.
     *
     * @function getMasterTablePkObject
		 * @param {object} options - Opciones de configuración de la acción de inserción.
		 * @return {object} - Objeto json con la clave primaria del registro correspondiente de la tabla maestra
     * @example
     * $("#idTable").rup_jqtable("getMasterTablePkObject");
     */
		getMasterTablePkObject: function(){
			var $self = this, settings = $self.data('settings'), $master = settings.masterDetail.$master,
				masterPkValue = $master.rup_jqtable('getSelectedRows'),
				masterPkName = settings.masterDetail.masterPrimaryKey;

			function nestJSON(key, value){
			    var retObj = {};
			    var splitedKey = key.split('.');
			    if (splitedKey.length===1){
			        retObj[key]=value;
			        return retObj;
			    }else{
			        retObj[splitedKey[0]]=nestJSON(key.substr(key.indexOf('.')+1), value);
			        return retObj;
			    }
			}
			//Inicio compatibilidad con masterPrimaryKey compuestas
			if($.isArray(masterPkName) && masterPkName.length>0 && (masterPkValue.length===1)){
				var multiplePkToken = $master.rup_jqtable('getGridParam','multiplePkToken');
				var splitedMasterPkValue = masterPkValue[0].split(multiplePkToken);
				var retPkObj = {};
				if(splitedMasterPkValue.length===masterPkName.length){
					$.each( masterPkName, function( index, value ) {
						jQuery.extend(true, retPkObj, nestJSON(value, splitedMasterPkValue[index]));
					});
				}
				return retPkObj;
			//Fin compatibilidad con masterPrimaryKey compuestas
			}else{
				if (masterPkValue.length===1){
					return nestJSON(masterPkName, masterPkValue[0]);
				}else if(masterPkValue.length===0){
					return null;
				}

			}
		}
	});


	//*******************************************************
	// DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
	//*******************************************************

	/**
	* @description Propiedades de configuración del plugin masterDetail del componente RUP Table.
	*
	* @name options
	*
	* @property {string} master - Selector jQuery que referencia al componente maestro.
	* @property {string} masterPrimaryKey -  Clave primaria del componente maestro.
	*/

	// Parámetros de configuración por defecto para la acción de eliminar un registro.
	jQuery.fn.rup_jqtable.plugins.masterDetail = {};
	jQuery.fn.rup_jqtable.plugins.masterDetail.defaults = {
	};



})(jQuery);

/*!
 * Copyright 2013 E.J.I.E., S.A.
 *
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
 */

/*global jQuery */

/**
 * Genera los controles necesarios para permitir al usuario la exportación de los datos mostrados en la tabla.
 *
 * @summary Plugin de reporting del componente RUP Table.
 * @module rup_jqtable/report
 * @example
 *
 * $("#idComponente").rup_jqtable({
 * 	url: "../jqGridUsuario",
 * 	usePlugins:["report"],
 * 	report:{
 * 		// Propiedades de configuración del report inlineEdit
 * 	}
 * });
 */
(function ($) {

	/**
	 * Definición de los métodos principales que configuran la inicialización del plugin.
	 *
	 * postConfiguration: Método que se ejecuta después de la invocación del componente jqGrid.
	 *
	 */
	jQuery.rup_jqtable.registerPlugin('report',{
		loadOrder:11,
		preConfiguration: function(settings){
			var $self = this;
			return $self.rup_jqtable('preConfigureReport', settings);
		},
		postConfiguration: function(settings){
			var $self = this;
			return $self.rup_jqtable('postConfigureReport', settings);
		}
	});

	//********************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	//********************************

	/**
	 * Extensión del componente rup_jqtable para permitir la gestión de la generaciónd de informes.
	 *
	 * Los métodos implementados son:
	 *
	 * preConfigureReport(settings): Método que define la preconfiguración necesaria para el correcto funcionamiento del componente.
	 *
	 * postConfigureReport(settings): Método que define la preconfiguración necesaria para el correcto funcionamiento del componente.
	 */
	jQuery.fn.rup_jqtable('extend',{
		/**
		* Metodo que realiza la pre-configuración del plugin report del componente RUP Table.
		* Este método se ejecuta antes de la incialización del plugin.
		*
		* @name preConfigureReport
		* @function
		* @param {object} settings - Parámetros de configuración del componente.
		*/
		preConfigureReport: function(settings){
			var $self = this;


		},
		/**
		* Metodo que realiza la post-configuración del plugin report del componente RUP Table.
		* Este método se ejecuta antes de la incialización del plugin.
		*
		* @name postConfigureReport
		* @function
		* @param {object} settings - Parámetros de configuración del componente.
		* @fires module:rup_jqtable#rupTable_serializeReportData
		*/
		postConfigureReport: function(settings){
			var $self = this,
				colModel = $self.rup_jqtable('getColModel'),
				reportsColums,
				reportSettings = settings.report;

			reportsColums = $self._getReportColumns(colModel, settings);


			/*
			 * INICIALIZACION DE VALORES POR DEFECTO
			 */

			// Inicialización de la toolbar del componente jqtable en caso de que no se especifique
			if (reportSettings.appendTo===undefined){
				reportSettings.appendTo = settings.toolbar.id;
			}

			// Se toman los parámetros columns globales como base para los específicos
			jQuery.each(reportSettings.buttons[0].buttons, function(index, element){

				element.columns = $.extend(true, {}, reportSettings.columns, element.columns);
				if (element.columns.grid===undefined){
					element.columns.grid = settings.id;
				}

				if (element.columns.customNames===undefined){
					element.columns.customNames = reportsColums;
				}

				if (element.columns.click===undefined){
					element.columns.click = function(){};
				}
			});


			reportSettings.fncGetGridParam = function(){
				var $self = this, settings = $self.data('settings'),
					data={}, filterData = {};

				jQuery.each($self.jqGrid('getGridParam', 'postData'), function(index, elem){
					if  (jQuery.inArray(index, settings.report.sendPostDataParams)!==-1){
						data[index] = elem;
					}
				});

				if (settings.filter !== undefined && settings.filter.$filterContainer!== undefined){
					filterData = $self.rup_jqtable('getFilterParams');
				}

				jQuery.extend(true, data, filterData);

				$self.triggerHandler('rupTable_serializeReportData', [data]);

				return $.rup_utils.unnestjson(data);
			};

			/*
			 * FIN DE INICIALIZACION DE VALORES POR DEFECTO
			 */


			jQuery.rup_report(reportSettings);
		}
	});


	jQuery.fn.rup_jqtable('extend',{
		/**
     * Devuelve las columnas de la tabla para las que se va a generar el informe.
     *
     * @function _processMatchedRow
		 * @private
		 * @param {object} colModel - colModel correspondiente a la tabla.
		 * @param {object} settings - Parámetros de configuración de la página.
		 * @return {string[]} - Array con el nombre de las columnas.
     * @example
     * $self._getReportColumns(colModel, settings);
     */
		_getReportColumns: function(colModel, settings){
			return jQuery.map(colModel, function(elem, index){
				if (jQuery.inArray(elem.name, settings.report.excludeColumns) === -1){
					return elem.name;
				}else{
					return null;
				}
			});
		}
	});

	//*******************************************************
	// DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
	//*******************************************************



	/**
	* @description Propiedades de configuración del plugin report del componente RUP Table.
	*
	* @name options
	*
	* @property {object} [columns] - Permite especificar mediante un array, los identificadores de las columnas que van a ser mostradas en el informe.
	* @property {string[]} [excludeColumns] - Determina las columnas que van a ser excluidas de la generación del informe.
	* @property {string[]} [sendPostDataParams] - Parámetros del jqGrid que van a ser enviados en la petición de generación del informe.
	*/
	jQuery.fn.rup_jqtable.plugins.report = {};
	jQuery.fn.rup_jqtable.plugins.report.defaults = {
		report:{
			columns:{},
			excludeColumns:['rupInfoCol','cb'],
			sendPostDataParams: ['_search','core','nd','page','rows','sidx','sord']
		}
	};


	/* ********* */
	/* EVENTOS
  /* ********* */

	/**
   * Permite asociar un manejador al evento que se produce en el momento en el que se construye el objeto que se envía al servidor para solicitar la generación del informe. Permite la modificación del objeto postData para añadir, modificar o eliminar los parámetros que van a ser enviados.
   *
   * @event module:rup_jqtable#rupTable_serializeReportData
   * @property {Event} event - Objeto Event correspondiente al evento disparado.
	 * @property {Event} dta - Linea de la tabla destinada a la búsqueda.
   * @example
   * $("#idComponente").on("rupTable_serializeReportData", function(event, data){ });
   */


})(jQuery);

/*!
 * Copyright 2013 E.J.I.E., S.A.
 *
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
 */

/*global jQuery */

/**
 * Gestiona las operaciones de filtrado múltiple de datos sobre el origen de datos que utiliza el componente.
 *
 * @summary Plugin de filtrado múltiple del componente RUP Table.
 * @module rup_jqtable/multifilter
 * @example
 *
 * $("#idComponente").rup_jqtable({
 * 	url: "../jqGridUsuario",
 * 	usePlugins:["multifilter"],
 * 	filter:{
 * 		// Propiedades de configuración del plugin multifilter
 * 	}
 * });
 */
(function($) {

	/**
	 * Definición de los métodos principales que configuran la inicialización
	 * del plugin.
	 *
	 * postConfiguration: Método que se ejecuta después de la invocación del
	 * componente jqGrid.
	 *
	 */
	jQuery.rup_jqtable.registerPlugin('multifilter', {
		loadOrder : 15,
		preConfiguration : function(settings) {
			var $self = this;
			return $self.rup_jqtable('preConfigureMultifilter', settings);
		},
		postConfiguration : function(settings) {
			var $self = this;
			return $self.rup_jqtable('postConfigureMultifilter', settings);
		}

	});

	// ********************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	// ********************************

	/**
	 * Extensión del componente rup_jqtable para permitir la gestión del filtrado
	 * de registros de la tabla.
	 *
	 * Los métodos implementados son:
	 *
	 * postConfigureFilter(settings): Método que define la preconfiguración
	 * necesaria para el correcto funcionamiento del componente.
	 *
	 * Se almacena la referencia de los diferentes componentes:
	 *
	 * settings.filter.$filterContainer : Contenedor del formulario de filtrado
	 * settings.filter.$filterButton : Botón que realiza el filtrado
	 * settings.filter.$cleanButton : Enlace para limpiar el formulario
	 * settings.filter.$collapsableLayer : Capa que puede ser ocultada/mostrada
	 * settings.filter.$toggleIcon1Id : Control que oculta muestra el fomulario
	 * settings.filter.$filterSummary : Contenedor donde se especifican los
	 * criterios de filtrado
	 *
	 */
	jQuery.fn.rup_jqtable('extend',{
		/**
			* Metodo que realiza la pre-configuración del plugin de filtrado múltiple del componente RUP Table.
			* Este método se ejecuta antes de la incialización del plugin.
			*
			* @name preConfigureMultifilter
			* @function
			* @param {object} settings - Parámetros de configuración del componente.
			*/
		preConfigureMultifilter : function(settings) {
			var $self = this, tableId = settings.id, multifilterSettings = settings.multifilter, dropdownDialogId, $dropdownDialog, $dropdownDiaglogTemplate;

			//definicion de variables con los selectores
			multifilterSettings.$dropdownDialog=$('#'+settings.id+'_multifilter_dropdownDialog');

			//definicion de variables con ids
			multifilterSettings.dropdownDialogId = settings.id+'_multifilter_dropdownDialog';



			$dropdownDiaglogTemplate = $self.rup_jqtable('getMultifilterDialogTemplate', settings);

			settings.filter.$filterContainer
				.after($dropdownDiaglogTemplate);

			$self.rup_jqtable('configureMultifilter', settings);

			// configuracion del resumen del filtro para que
			// apareza el nombre del filtro
			settings.multifilter.fncFilterName = function(searchString) {



				if (multifilterSettings.$comboLabel==undefined){ //&& settings.$firstStartUp  && multifilterSettings.$filterDefaultName!=undefined){
					if (multifilterSettings.$filterDefaultName!==undefined)
						searchString = multifilterSettings.$filterDefaultName+ '  {' + searchString + '}   ';

				}
				else if (multifilterSettings.$comboLabel!=undefined && settings.$firstStartUp){
					if(multifilterSettings.$comboLabel.val()==''  && multifilterSettings.$filterDefaultName!=undefined){
						if (multifilterSettings.$filterDefaultName!==undefined)
							searchString = multifilterSettings.$filterDefaultName+ '  {' + searchString + '}   ';
					}
				}else if (multifilterSettings.$comboLabel.val()!='' &&  multifilterSettings.$filterWithName){
									 multifilterSettings.$filterWithName=false;
					searchString = multifilterSettings.$comboLabel.val()+ '  {' + searchString + '}   ';

				}
				return searchString;
			};




		},



		/**
			* Metodo que realiza la post-configuración del plugin de filtrado múltiple del componente RUP Table.
			* Este método se ejecuta antes de la incialización del plugin.
			*
			* @name postConfigureMultifilter
			* @function
			* @fires module:rup_jqtable#rupTable_multifilter_fillForm
			* @param {object} settings - Parámetros de configuración del componente.
			*/
		postConfigureMultifilter : function(settings) {
			var $self = this, multifilterSettings = settings.multifilter, filterSettings,$dropdownButton, $combo,$comboLabel
				,$defaultCheck,$feedback,$comboButton,$closeDialog, dropdownButtonConfig, xhrArray=[];


			/*
							 * $("#"+settings.id+"_multifilter_combo_label").on("change",
							 * function(){
							 *
							 * if
							 * ($("#"+settings.id+"_multifilter_combo_label").val()==""){
							 * $self._toggleButtons(settings.id,false); }else{
							 * $self._toggleButtons(settings.id,true); } });
							 */

							 dropdownButtonConfig =  $self[0]._ADAPTER.multifilter.dropdown;

			settings.filter.$filterButton
				.rup_button({
					dropdown : {
						dropdownIcon : dropdownButtonConfig.dropdownIcon,
						dropdownDialog : multifilterSettings.dropdownDialogId,
						dropdownDialogConfig : {
							title : dropdownButtonConfig.dropdownDialogConfig.title + $.rup.i18n.base.rup_jqtable.plugins.multifilter.tittle,
							width : '450px',
							buttons : [
								{
									id : settings.id+ '_multifilter_BtnSave',
									"class" : 'btn-outline-primary',
									text : $.rup.i18n.base.rup_jqtable.plugins.multifilter.save,
									click : function() {

										if ($self._checkLabel(settings)) {

											// creo objeto Filter con los datos del formulario del filtro
											var filter = $self._createFilterFromForm(settings);

											var bfr = $self.triggerHandler('rupTable_beforeAdd');
											if (bfr === false || bfr === 'stop') {
												multifilterSettings.$feedback.rup_feedback('set',$.rup.i18n.base.rup_jqtable.plugins.multifilter.errorValidate,'error');
												return; }


											// añado el filtro
											$self.rup_jqtable('addFilter',filter);


										}

									}

								},
								{
									id : settings.id+ '_multifilter_BtnApply',
									"class" : 'btn-outline-primary',
									text : $.rup.i18n.base.rup_jqtable.plugins.multifilter.apply,
									click : function() {

										//Deshabilitar el nombre del filtro en el filterSummary una vez que ha terminado el filtro por defecto
										if (settings.$firstStartUp){

											settings.$firstStartUp=false;
										}

										if ($self._checkLabel(settings)) {
											multifilterSettings.$filterWithName=true;





											var valorFiltro= $self._searchFilterInCombo(settings);
											if (valorFiltro!=undefined){
												//limpiamos el filtro
												$self.rup_jqtable('cleanFilterForm');

												//Cargamos de nuevo el filtro en el formulario del filtro
												// rellenar el formulario del filtro
												$self.triggerHandler('rupTable_multifilter_fillForm',valorFiltro);
												$self._fillForm(valorFiltro);
												$self.rup_jqtable('filter');
												multifilterSettings.$closeDialog.click();
											}



											else{
												multifilterSettings.$feedback.rup_feedback('set',$.rup.i18n.base.rup_jqtable.plugins.multifilter.errorNoexiste,'error');

											}


											//






											//$self.rup_jqtable("filter");
											// crea el tooptip del resumen del filtro
											//var filterCriteria = $self._createTooltip();



										}

									}
								},
								{
									id : settings.id+ '_multifilter_BtnRemove',
									"class" : 'btn-outline-primary',
									text : $.rup.i18n.base.rup_jqtable.plugins.multifilter.remove,
									click : function() {


										if ($self._checkLabel(settings)) {

											// creo objeto Filter con los datos del formulario del filtro
											var filter = $self._createFilterFromForm(settings);

											// borro el filtro
											$self.rup_jqtable('deleteFilter',filter);
										}
									}
								},
								{
									text : $.rup.i18n.base.rup_jqtable.plugins.multifilter.cancel,
									click : function() {

										var filtroAnterior= $self.data('filtroAnterior');
										if (filtroAnterior!=null){
											//var xhrArray=$.rup_utils.jsontoarray(filtroAnterior);
											$self.rup_jqtable('cleanFilterForm');
											//$.rup_utils.populateForm(filtroAnterior,settings.filter.$filterForm);
											$self.triggerHandler('rupTable_multifilter_fillForm',filtroAnterior);
											$self._fillForm(filtroAnterior);

										}
										//limpio el filtro del dropdownDIalog
										multifilterSettings.$comboLabel.val('');
										multifilterSettings.$closeDialog.click();
									},
									btnType : $.rup.dialog.LINK
								} ]
						}
					}

				});


			//Deshabilitar el nombre del filtro en el filterSummary una vez que ha terminado el filtro por defecto
			$self.on('rupTable_beforeFilter', function(event){
				/*if (settings.$firstStartUp){

									settings.$firstStartUp=false;
								}*/

			});



			//definincion de variables con los selectores
			multifilterSettings.$dropdownButton=$('#'+settings.id+'_filter_filterButton_dropdown');
			multifilterSettings.$combo=$('#' + settings.id	+ '_multifilter_combo');
			multifilterSettings.$comboLabel=$('#' + settings.id	+ '_multifilter_combo_label');
			multifilterSettings.$comboButton=$('#' + settings.id+'_multifilter_dropdownDialog .rup-combobox-toggle');
			multifilterSettings.$defaultCheck=$('#' + settings.id	+  '_multifilter_defaultFilter');
			multifilterSettings.$feedback=$('#' + settings.id	+ '_multifilter_dropdownDialog_feedback');
			multifilterSettings.$closeDialog=$('#closeText_'+settings.id+'_multifilter_dropdownDialog');




			// dialog modal para no cambiar el filtro mientras
			// se gestionan los mismos
			$('#' + multifilterSettings.dropdownDialogId).rup_dialog('setOption', 'modal', true);
			$('#' + multifilterSettings.dropdownDialogId).rup_dialog('setOption', 'draggable', false);
			$('#' + multifilterSettings.dropdownDialogId).rup_dialog('setOption', 'resizable', false);


			// $('#'+multifilterSettings.dropdownDialogId).parent().addClass("rup_multifilter_container");
			$('#' + multifilterSettings.dropdownDialogId).parent().css('width', '500px');

			multifilterSettings.$dropdownButton.on('click', function(){
				//guardo el filtroAnterior
				var valorFiltro= form2object(settings.filter.$filterContainer[0]);
				xhrArray=$.rup_utils.jsontoarray(valorFiltro);
				$self.data('filtroAnterior',valorFiltro);


				//Foco al label al entrar al dialog
				multifilterSettings.$comboLabel.focus();


			});

			$self._configCombo(settings);

			multifilterSettings.$feedback.rup_feedback({
				block : false
			});

			//gesión por filtroPorDefecto

			//$self.rup_jqtable("showSearchCriteria");

			//if(filtroDefault!=null)
			//$("#"+settings.id+"_filter_summary").prepend(filtroDefault.filterName +" "+ $("#"+settings.id+"_filter_summary").val() );

			//bug IE que al cerrar el dialog con el combo desplegado , la lista del combo sigue abierta
			$('.rup-dropdown-dialog').on('dialogclose',function (){
				multifilterSettings.$comboLabel.autocomplete('widget').hide();
			});

			//la primera vez que cancelas el filtroAnterior es el filtroPorDefecto
			var valorFiltro=form2object(settings.filter.$filterContainer[0]);
			xhrArray=$.rup_utils.jsontoarray(valorFiltro);

			$self.data('filtroAnterior',valorFiltro);

			//$self.rup_jqtable("filter");

			//settings.filter.$filterButton.trigger("click");
			//$self.triggerHandler("rupTable_multifilter_fillForm",form2object(settings.filter.$filterContainer[0]));

			$self.on({
				'rupTable_beforeAdd.multifilter.validate': function(){

					//filterSettings.$filterContainer.rup_validate("resetForm");
					if (multifilterSettings!==undefined){
						if(!settings.$firstStartUp){
							return settings.filter.$filterContainer.valid();
						}else{
							return null;
						}
					}else{
						return settings.filter.$filterContainer.valid();
					}
				}

			});

		}
	});

	// ********************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	// ********************************

	/**
	 * Métodos públicos del plugin filter.
	 *
	 * cleanFilterForm: Realiza una limpieza de los campos del formulario.
	 * filter: Lanza el filtrado de la tabla de acuerdo a los criterios
	 * indicados en el formulario. toggleFilterForm: Método encargado de ocultar
	 * y mostrar el formulario de filtrado.
	 *
	 */
	jQuery.fn.rup_jqtable('extend',{
		/**
     * Devuelve la template html empleada para renderizar los controles del formulario de filtrado múltiple.
     *
     * @function  getMultifilterDialogTemplate
		 * @param {object} settings - Propiedades de configuración del componente.
		 * @return {object} - Objeto jQuery con el contenido html de la template.
     * @example
     * $("#idComponente").rup_jqtable("getMultifilterDialogTemplate", settings);
     */
		getMultifilterDialogTemplate : function(settings) {
			var $self = this, multifilterSettings = settings.multifilter;

			var $dropdownDiaglogTemplate = jQuery('<div id="'
				+ multifilterSettings.dropdownDialogId
				+ '" style="display:none" class="rup_multifilter_dropdown">'
				+ '<div id="'
				+ multifilterSettings.dropdownDialogId
				+ '_feedback"></div>'
				+ '<form>'
				+ '<fieldset class="dropdownButton-inputs">'
				+ '<div id="'
				+ multifilterSettings.dropdownDialogId
				+ '_columna_cnt">'
				+ '<div class="form-row">'
				+ '<div id="'
				+ multifilterSettings.dropdownDialogId
				+ '_lineaCombo"  class="form-group fix-align col-sm">'
				+ '<label for="'
				+ settings.id
				+ '_multifilter_combo" class="formulario_linea_label">'
				+ $.rup.i18n.base.rup_jqtable.plugins.multifilter.filters
				+ '</label>'
				+ '<input id="'
				+ settings.id
				+ '_multifilter_combo" class="rup_multifilter_selector" />'
				+ '</div>'
				+ '</div>'
				+ '<div class="form-row">'
				+ '<div id="'
				+ multifilterSettings.dropdownDialogId
				+ '_lineaDefault" class="form-group col-sm">'
				+ '<label for="'
				+ settings.id
				+ '_multifilter_defaultFilter" class="formulario_linea_label">'
				+ $.rup.i18n.base.rup_jqtable.plugins.multifilter.defaultFilter
				+ '</label>'
				+ '<input type="checkbox" id="'
				+ settings.id
				+ '_multifilter_defaultFilter" class="formulario_linea_input form-control"/>'
				+ '</div>' 
				+ '</div>'	
				+ '</div>'
				+ '</fieldset>' + '</form>' + '</div>');

			return $dropdownDiaglogTemplate;
		},
		/**
     * Realiza la configuración interna del plugin multifilter a partir de las propiedades de configuración indicadas.
     *
     * @function  configureMultifilter
		 * @param {object} settings - Propiedades de configuración del componente.
     * @example
     * $("#idComponente").rup_jqtable("configureMultifilter", settings);
     */
		configureMultifilter : function(settings) {
			var $self = this, multifilterSettings = settings.multifilter,$filterForm ;
			$self.data('settings', settings);



			settings.filter.$filterForm = $('#' + settings.id + '_filter_form');

			var options_ejie_combo = {
				source : [ {
					label : 'Si',
					value : '0'
				}, {
					label : 'No',
					value : '1'
				} ],
				width : 120,
				blank : ''
			};

			// jQuery("#"+settings.id+"_multifilter_combo").rup_combo(options_ejie_combo);

			var selector;
			if (multifilterSettings.idFilter != null) {
				selector = multifilterSettings.idFilter;
			} else {
				selector = settings.id;
			}

			var usuario;
			if (multifilterSettings.userFilter!=null){
				usuario=multifilterSettings.userFilter;
			}else{
				usuario=LOGGED_USER;
			}

			var getDefault;
			if (multifilterSettings.getDefault!=null){
				getDefault = multifilterSettings.getDefault;
			}else{
				getDefault = true;
			}



			jQuery('#' + settings.id + '_multifilter_combo').rup_autocomplete(
				{
					source : settings.baseUrl
														+ '/multiFilter/getAll?filterSelector='
														+ selector + '&user='
														+ usuario,
					sourceParam : {
						label : 'filterName',
						value : 'filterDefault',
						data : 'filterValue',
						category: 'filter'
					},
					method : 'GET',
					contains : false,
					combobox : true,
					menuAppendTo : $('#' + multifilterSettings.dropdownDialogId).parent(),
					appendTo : $('#' + multifilterSettings.dropdownDialogId).parent(),

					select : function() {



						var valorFiltro=$self._searchFilterInCombo(settings);

						//limpiar Filtro
						//$self.rup_jqtable("resetForm",settings.filter.$filterForm);
						$self.rup_jqtable('cleanFilterForm');


						// rellenar el formulario del filtro
						//$.rup_utils.populateForm(xhrArray,settings.filter.$filterForm);
						$self.triggerHandler('rupTable_multifilter_fillForm',valorFiltro);
						$self._fillForm(valorFiltro);

						//



					}
				});

			jQuery('#' + settings.id + '_multifilter_combo_label').on('autocompleteopen', function(){
				$(this).data('uiAutocomplete').menu.element.css('zIndex',Number($('#' + multifilterSettings.dropdownDialogId).parent().css('zIndex'))+1);
				if($(this).data('tmp.data') !== undefined){
					var data = $(this).data('tmp.data');
					var count = -1;
					var objeto = $.grep(data, function(obj,i) {
						if (obj.filterDefault){
							count = i;
							return obj;
						}
					});
					if(objeto !== undefined){
						
						var link = $('#'+settings.id+'_multifilter_combo_menu a:eq('+count+')');
						link.css('font-weight', 'bold');
					}
				}
			});

			$('.jstree').on('rup_filter_treeLoaded',function(event,data){
				$(this).rup_tree('setRupValue',data);
				//$self.rup_jqtable("showSearchCriteria");
			});


			settings.filter.$cleanButton.on('click',function() {
				multifilterSettings.$combo.rup_autocomplete('set', '', '');
				settings.filter.$filterSummary.html('<i></i>');

			});
		},
		/**
     * Función que añade un filtro al multifiltro
     *
     * @function  addFilter
		 * @param {object} filter - Objeto json con la información del filtro a añadir.
		 * @fires module:rup_jqtable#rupTable_multifilter_beforeAdd
     * @example
     * $("#idComponente").rup_jqtable("addFilter", filter);
     */
		addFilter : function(filter) {
			var $self=this;
			var settings = $self.data('settings');

			var multifilterSettings= settings.multifilter;


			// self.data("settings");
			if (multifilterSettings.idFilter != null) {
				filter.filtro.filterSelector = multifilterSettings.idFilter;
			}

			// add Filter
			$.rup_ajax({
				url : settings.baseUrl+ '/multiFilter/add',
				type : 'POST',
				data : $.toJSON(filter),
				dataType : 'json',
				showLoading : false,
				contentType : 'application/json',
				async : false,
				beforeSend : function(xhr, options) {
					return $self.triggerHandler('rupTable_multifilter_beforeAdd',[xhr, options]);
				},
				success : function(data, status, xhr) {

					multifilterSettings.$savedFilterName=data.filterName;
					multifilterSettings.$savedFilterValue=data.filterValue;

					multifilterSettings.$feedback.rup_feedback('set',$.rup.i18n.base.rup_jqtable.plugins.multifilter.ok,'ok');

					//multifilterSettings.$combo.rup_autocomplete("set","", "");
					multifilterSettings.$comboLabel.data('tmp.loadObjects.term',null);
					multifilterSettings.$comboLabel.data('loadObjects', {});
					// $("#"+settings.id+"_multifilter_combo_label").data("tmp.loadObjects.term",term);

					multifilterSettings.$comboLabel.data('tmp.data', {});

					if (multifilterSettings.$comboLabel.autocomplete('widget').is(':visible')) {
						multifilterSettings.$comboLabel.autocomplete('widget').hide();
					}

				},
				error : function(xhr, ajaxOptions,thrownError) {
					multifilterSettings.$feedback.rup_feedback('set',$.rup.i18n.base.rup_jqtable.plugins.multifilter.error,'error');

				}
			});

		},

		/**
		 * Función que elimina un filtro del multifiltro.
		 *
		 * @function  deleteFilter
		 * @param {object} filter - Objeto json con la información del filtro a eliminar.
		 * @example
		 * $("#idComponente").rup_jqtable("deleteFilter", filter);
		 */
		deleteFilter : function(filter) {

			var $self=this;
			var settings = $self.data('settings');




			var multifilterSettings = settings.multifilter;

			//reiniciar filter salvado
			multifilterSettings.$savedFilterName =undefined;
			multifilterSettings.$savedFilterValue =undefined;

			if (multifilterSettings.idFilter != null) {
				filter.filtro.filterSelector = multifilterSettings.idFilter;
			}

			// delete
			$.rup_ajax({
				url : settings.baseUrl+ '/multiFilter/delete',
				type : 'POST',
				data : $.toJSON(filter),
				dataType : 'json',
				showLoading : false,
				contentType : 'application/json',
				async : false,
				success : function(data, status, xhr) {
					multifilterSettings.$feedback.rup_feedback('set',$.rup.i18n.base.rup_jqtable.plugins.multifilter.ok,'ok');
					multifilterSettings.$combo.rup_autocomplete('set','', '');
					multifilterSettings.$comboLabel.data('tmp.loadObjects.term',null);
					multifilterSettings.$comboLabel.data('loadObjects', {});
					// $("#"+settings.id+"_multifilter_combo_label").data("tmp.loadObjects.term",term);
					multifilterSettings.$comboLabel.data('tmp.data', {});

					if (multifilterSettings.$comboLabel.autocomplete('widget').is(':visible')) {
						multifilterSettings.$comboLabel.autocomplete('widget').hide();
					}

					if (data.filterFeedback == 'no_records') {
						multifilterSettings.$feedback.rup_feedback('set',	$.rup.i18n.base.rup_jqtable.plugins.multifilter.noRecords,'error');

					}

				},
				error : function(xhr, ajaxOptions,	thrownError) {
					multifilterSettings.$feedback.rup_feedback(	'set',$.rup.i18n.base.rup_jqtable.plugins.multifilter.error,'error');

				}
			});
		}
	});

	// *******************************
	// DEFINICIÓN DE MÉTODOS PRIVADOS
	// *******************************

	jQuery.fn.rup_jqtable('extend',{

		/**
     * Genera el objeto json de datos de filtrado correspondiente al formulario empleado.
     *
     * @function _createFilterFromForm
		 * @private
		 * @param {object} settings - Propiedades de configuración del componente.
		 * @return {object} - Objeto json con la información de filtrado del formulario.
     * @example
     * $self._createFilterFromForm(settings);
     */
		_createFilterFromForm : function(settings) {
			var multifilterSettings= settings.multifilter;
			var dataForm = form2object(settings.filter.$filterContainer[0]);




			//cambiar la fecha a milisegundos para guardar en bd
			var fecha ;
			$.each($('[ruptype=\'date\']', settings.filter.$filterContainer), function(index,item){
				fecha = $(item).datepicker('getDate');
				if (fecha!=null)
					dataForm[item.name]=fecha.getTime().toString();
			});



			var dataFormJson = $.toJSON(dataForm);

			var usuario;
			if (multifilterSettings.userFilter!=null){
				usuario=multifilterSettings.userFilter;
			}else{
				usuario=LOGGED_USER;
			}



			var filter = {

				filtro : {
					filterSelector : settings.id,
					filterName :multifilterSettings.$comboLabel.val(),
					filterValue : dataFormJson,
					filterDefault : multifilterSettings.$defaultCheck.is(':checked'),
					filterUser : usuario
				}
			};

			return filter;
		},

		/**
     * Inicializa el combo de selección de filtrado a aplicar en el fomulario.
     *
     * @function _configCombo
		 * @private
		 * @param {object} settings - Propiedades de configuración del componente.
     * @example
     * $self._configCombo(settings);
     */
		_configCombo: function (settings){
			var multifilterSettings= settings.multifilter;

			multifilterSettings.$comboLabel.on('change',function() {
				settings.filter.$filterSummary.html('<i></i>');

			});



			// si el filtro es el predefinido que aparezca en negrita
			multifilterSettings.$comboLabel.data('uiAutocomplete')._renderItem = function(ul,	item) {

					return $('<li></li>').data(
						'item.autocomplete', item).append(
						'<a>' + item.label + '</a>')
						.appendTo(ul);

			};
			
			jQuery('#' + settings.id + '_multifilter_combo_label').on('rupAutocomplete_loadComplete', function(event, data){
				var count = -1;
				var objeto = $.grep(data, function(obj,i) {
					if (obj.filterDefault){
						count = i;
						return obj;
					}
				});
				if(objeto !== undefined){
					var link = $('#'+settings.id+'_multifilter_combo_menu a:eq('+count+')');
					link.css('font-weight', 'bold');
				}
				
			});



			multifilterSettings.$comboLabel.off('blur click');

			multifilterSettings.$comboLabel.attr('placeholder',$.rup.i18n.base.rup_jqtable.plugins.multifilter.input);

			multifilterSettings.$comboLabel.on('blur',function(event) {

				// Obtener datos de si viene de
				// seleccionar elemento o si el
				// menú de selección está
				// desplegado
				var selected =
													multifilterSettings.$combo.data('selected'), isShowingMenu = $('.ui-autocomplete:visible').length > 0 ? true
						: false;
				// Borrar índicador de que viene
				// de seleccionar elemento
				multifilterSettings.$combo.data('selected', false);
				// Si es un evento de teclado
				// pero no es ENTER, omitir esta
				// función
				if (event.type === 'keydown'
														&& event.keyCode !== 13) {
					return true;
				}

				if (isShowingMenu === true
														&& event.type === 'keydown') {
					multifilterSettings.$combo
						.focus();
					event.stopPropagation();
					return true;
				}

				var autoCompObject = $(event.currentTarget), loadObjects =
														multifilterSettings.$comboLabel.data('loadObjects');

				if (settings.getText == true) {
					if (loadObjects[autoCompObject.val()] !== undefined) {
						multifilterSettings.$combo.val(autoCompObject.val());
						multifilterSettings.$combo.attr('rup_autocomplete_label',autoCompObject.val());
					} else {
						multifilterSettings.$combo.val(autoCompObject.val());
						multifilterSettings.$combo.attr('rup_autocomplete_label',autoCompObject.val());
					}
				} else {
					if (loadObjects[autoCompObject.val()] !== undefined) {
						multifilterSettings.$combo.val(loadObjects[autoCompObject.val()]);
						multifilterSettings.$combo.attr('rup_autocomplete_label',loadObjects[autoCompObject.val()]);

					} else {

						autoCompObject.autocomplete('close');
					}
				}
				// Si el evento es ENTER y viene
				// de seleccionar un elemento o
				// el menú se estaba mostrando,
				// omitir resto de funciones
				// (ej. buscar)
				if (event.type === 'keydown'
														&& event.keyCode === 13
														&& (selected || isShowingMenu)) {
					return false;
				}

			});

			multifilterSettings.$comboButton.off('click mousedown');

			multifilterSettings.$comboButton.on('blur',function() {
				if (multifilterSettings.$comboLabel.autocomplete('widget').is(':visible')) {
					multifilterSettings.$comboLabel.autocomplete('widget').hide();
				}
			});

			multifilterSettings.$comboButton.on('click',function() {
				if (multifilterSettings.$comboLabel.autocomplete('widget').is(':visible')) {
					multifilterSettings.$comboLabel.autocomplete('widget').hide();
				} else {
					multifilterSettings.$comboLabel.autocomplete('search','');
					multifilterSettings.$comboLabel.autocomplete('widget').show();
					multifilterSettings.$comboLabel.autocomplete('widget').trigger('focus');
				}
			});

		},
		//						_toggleButtons : function(id, visibles) {
		//
		//							if (visibles == false) {
		//								$("#" + id + "_multifilter_BtnSave").button(
		//										"disable");
		//								$("#" + id + "_multifilter_BtnApply").button(
		//										"disable");
		//								$("#" + id + "_multifilter_BtnRemove").button(
		//										"disable");
		//
		//							} else {
		//								$("#" + id + "_multifilter_BtnSave").button(
		//										"enable");
		//								$("#" + id + "_multifilter_BtnApply").button(
		//										"enable");
		//								$("#" + id + "_multifilter_BtnRemove").button(
		//										"enable");
		//							}
		//						},

		/**
     * Valida el label que se introduce asociado al filtrado que se va a añadir.
     *
     * @function _checkLabel
		 * @private
		 * @param {object} settings - Propiedades de configuración del componente.
		 * @return {boolean} - Devuelve si es válido o no el nombre introducido para el filtro.
     * @example
     * $self._configCombo(settings);
     */
		_checkLabel : function(settings) {

			var multifilterSettings= settings.multifilter;

			if ($.trim(multifilterSettings.$comboLabel.val()) == '') {

				multifilterSettings.$feedback.rup_feedback('set',$.rup.i18n.base.rup_jqtable.plugins.multifilter.emptyName,'error');
				return false;
			} else if (multifilterSettings.$comboLabel.val().length > settings.multifilter.labelSize) {
				multifilterSettings.$feedback.rup_feedback('set',$.rup.i18n.base.rup_jqtable.plugins.multifilter.tooLong,	'error');

				return false;
			}
			return true;

		},
		/**
     * Devuelve el json de filtrado asociado al filtro seleccionado en el combo.
     *
     * @function _searchFilterInCombo
		 * @private
		 * @param {object} settings - Propiedades de configuración del componente.
		 * @return {object} - Json de filtrado asociado al filtro seleccionado en el combo.
     * @example
     * $self._searchFilterInCombo(settings);
     */
		_searchFilterInCombo : function(settings) {
			var multifilterSettings = settings.multifilter, xhrArray=[];

			var name = $('#' + settings.id	+ '_multifilter_combo_label').val();
			// var listaFiltros = $("#" + this.id+
			// "_label").data("tmp.data");
			var listaFiltros = $('#' + settings.id+ '_multifilter_combo_label').data('tmp.data');
			// Busco el valor del filtro
			var objFiltro = $.grep(listaFiltros, function(obj,i) {
				if (obj.label == name)
					return obj;
			});

			// si es filtro por defecto,
			// checkeo el check "Filtro
			// por defecto"
			if (objFiltro.length != 0) {
				multifilterSettings.$defaultCheck.attr('checked', objFiltro[0].filterDefault);

				var valorFiltro = $.parseJSON(objFiltro[0].value);

				// $.map(valorFiltro,function(item) {
				// xhrArray[item.name] = item.value;
				// });
				xhrArray = $.rup_utils.jsontoarray(valorFiltro);
			}

			if (valorFiltro==undefined &&  multifilterSettings.$savedFilterName!=undefined){
				if (multifilterSettings.$savedFilterName===name)
					var valorFiltro = $.parseJSON(multifilterSettings.$savedFilterValue);

			}
			return valorFiltro;


		},
		/**
		 * Inicializa los campos del formulario con los valores correspondientes al filtro seleccionado.
		 *
		 * @function _fillForm
		 * @private
		 * @param {object} filtroNuevo - Objeto json con los valores de filtrado.
		 * @example
		 * $self._fillForm(data);
		 */
		_fillForm : function(filtroNuevo) {

			var $self = this;
			var settings= $self.data('settings');

			//cambiar milisengudos a fecha (el formato de bd del  fecha es milisegundos)
			$('[ruptype=\'date\']', settings.filter.$filterContainer).each(function(index, elem){

								  var $campo = jQuery(elem);

				var fechaString;

				var jsonFecha = filtroNuevo[elem.name];
				if (jsonFecha!=undefined){
					if( jsonFecha.search('/')==-1){
						var dateFromJson = new Date(parseInt(jsonFecha));

						var dateFormat = $campo.data('datepicker').settings.dateFormat;

						if ($campo.data('datepicker').settings.datetimepicker){
									                // Cuando es fecha-hora
									                var dateObj={hour:dateFromJson.getHours(),minute:dateFromJson.getMinutes(),second:dateFromJson.getSeconds()};
									                fechaString = $.datepicker.formatDate(dateFormat, dateFromJson)+' '+$.timepicker._formatTime(dateObj, 'hh:mm:ss');
						}else{
									                // Solo fecha

									                fechaString = $.datepicker.formatDate(dateFormat, dateFromJson);
						}

						filtroNuevo[elem.name]=fechaString;
					}
				}
			});

			// Formatear datos
			// var valorFiltro = $.parseJSON(filtroNuevo);
			var xhrArray = $.rup_utils.jsontoarray(filtroNuevo);

			// evento antes de rellenar el form
			// $self.triggerHandler("rupTable_multifilter_fillForm",filtroNuevo);

			// rellenar el formulario
			$.rup_utils.populateForm(xhrArray, $(this.selector+ '_filter_form'));
			// $self._fillForm(filtroNuevo);
			// $self.rup_jqtable("filter");

		}




	});

	// *******************************************************
	// DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
	// *******************************************************

	/**
	 * Parámetros de configuración por defecto para el plugin filter.
	 *
	 */
	/**
	* @description Propiedades de configuración del plugin multifilter del componente RUP Table.
	*
	* @name options
	*
	* @property {string} [idFilter] - Permite asignar un identificador al filtro. Debe ser único para toda la aplicación. En caso de no asignar un id, se asigna el selector del rup_jqtable.
	* @property {string} labelSize - Permite especificar el tamaño máximo permitido para el nombre del filtro. Es una propiedad obligatoria.
	* @property {string} [userFilter] - En caso de que la aplicación donde se tiene que implementar el multifiltro no implemente la variable LOGGED_USER, para conservar el usuario identificado, con este parámetro permite asignar un identificador de usuario alternativo.
	* @property {boolean} [getDefault=true] - Determina si el multifiltro debe de cargar el filtro por defecto al cargar la página.
	*/
	jQuery.fn.rup_jqtable.plugins.multifilter = {};
	jQuery.fn.rup_jqtable.plugins.multifilter.defaults = {
		multifilter : {}
	};


	/* ********* */
	/* EVENTOS
  /* ********* */

	/**
   *  Evento lanzado justo antes de añadir un filtro.
   *
   * @event module:rup_jqtable#rupTable_multifilter_beforeAdd
   * @property {Event} event - Objeto Event correspondiente al evento disparado.
	 * @property {Event} xhr - Objecto XHR empleado en la petición AJAX de nuevo filtro.
	 * @property {Event} options - Opciones de comfiguración de la petición AJAX de nuevo filtro.
   * @example
   * $("#idComponente").on("rupTable_multifilter_beforeAdd", function(event, xhr, options){ });
   */

	/**
		* Evento ejecutado cuando se rellenar el formulario del filtro. Cada vez que se cancela, limpia o se selecciona un filtro se lanza este evento.
		*
		* @event module:rup_jqtable#rupTable_multifilter_fillForm:
		* @property {Event} event - Objeto Event correspondiente al evento disparado.
		* @property {Event} filterData - Valor del filtro.
		* @example
		* $("#idComponente").on("rupTable_multifilter_fillForm:", function(event, filterData){ });
		*/

})(jQuery);

/*!
 * Copyright 2013 E.J.I.E., S.A.
 *
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
 */

/*global jQuery */

/**
 * Proporciona al componente RUP Table ciertas funcionalidades responsive.
 *
 * @summary Plugin de toolbar del componente RUP Table.
 * @module rup_jqtable/responsive
 * @example
 *
 * $("#idComponente").rup_jqtable({
 * 	url: "../jqGridUsuario",
 * 	usePlugins:["responsive"],
 * 	responsive:{
 * 		// Propiedades de configuración del plugin responsive
 * 	}
 * });
 */
(function ($) {

	/**
   * Definición de los métodos principales que configuran la inicialización del plugin.
   *
   * preConfiguration: Método que se ejecuta antes de la invocación del componente jqGrid.
   * postConfiguration: Método que se ejecuta después de la invocación del componente jqGrid.
   *
   */
	jQuery.rup_jqtable.registerPlugin('responsive', {
		loadOrder: 20,
		preConfiguration: function (settings) {
			var $self = this;
			return $self.rup_jqtable('preConfigureResponsive', settings);
		},
		postConfiguration: function (settings) {
			var $self = this;
			return $self.rup_jqtable('postConfigureResponsive', settings);
		}
	});

	$.extend($.rup, {
		jqtable: {
			responsive: {
				'SCREEN_SM': 768,
				'SCREEN_MD': 992,
				'SCREEN_LG': 1200
			}
		}
	});

	//********************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	//********************************

	/**
   * Extensión del componente rup_jqtable para permitir la gestión de la botonera asociada a la tabla.
   *
   * Los métodos implementados son:
   *
   * preConfigureFeedback(settings): Método que define la preconfiguración necesaria para el correcto funcionamiento del componente.
   * postConfigureFeedback(settings): Método que define la postconfiguración necesaria para el correcto funcionamiento del componente.
   *
   * settings.$feedback : Referencia al componente feedback.
   * settings.$$internalFeedback : Referencia al feedback interno.
   *
   *
   */

	$.extend($.jgrid, {
		// 	setGridWidth: function(nwidth, shrink){
		// 	debugger;
		// 	}

	});

	jQuery.fn.rup_jqtable('extend', {
		/**
		* Metodo que realiza la pre-configuración del plugin responsive del componente RUP Table.
		* Este método se ejecuta antes de la incialización del plugin.
		*
		* @name preConfigureResponsive
		* @function
		* @param {object} settings - Parámetros de configuración del componente.
		*/
		preConfigureResponsive: function (settings) {
			var $self = this;



		},
		/**
		* Metodo que realiza la post-configuración del plugin responsive del componente RUP Table.
		* Este método se ejecuta antes de la incialización del plugin.
		*
		* @name postConfigureResponsive
		* @function
		* @param {object} settings - Parámetros de configuración del componente.
		*/
		postConfigureResponsive: function (settings) {

			var $self = this,
				$fluidBaseLayer, currentDisplay, currentDisplayIndex;

			settings.fluid.baseLayer = $.rup_utils.getJQueryId(settings.fluid.baseLayer !== null ? settings.fluid.baseLayer : settings.id + '_div');
			settings.fluid.$baseLayer = jQuery(settings.fluid.baseLayer);
			if (settings.fluid.$baseLayer.length === 0) {
				alert('El identificador ' + settings.baseLayer + ' especificado para la capa sobre la que se va a aplicar el diseño líquido no existe.');
				return;
			}

			$fluidBaseLayer = settings.fluid.fluidBaseLayer = settings.fluid.$baseLayer;

			// Tratamiento del evento de redimiensionado del diseño líquido de la tabla
			$(window).on('resize', function (event, previousWidth, currentWidth) {
				if ($self.is(':visible')) {
					var feedBackPaddingLeft, feedBackPaddingRight, toolbarPaddingLeft, toolbarPaddingRight, windowWidth, rwdConfigArray;

					windowWidth = $(window).width();

					if (windowWidth > $.rup.jqtable.responsive.SCREEN_LG) {
						currentDisplay = 'lg';
					} else if (windowWidth > $.rup.jqtable.responsive.SCREEN_MD) {
						currentDisplay = 'md';
					} else if (windowWidth > $.rup.jqtable.responsive.SCREEN_SM) {
						currentDisplay = 'sm';
					} else {
						currentDisplay = 'xs';
					}

					rwdConfigArray = $self.rup_jqtable('getRwdColConfig');


					$.each(rwdConfigArray, function (i, obj) {

						if (obj[currentDisplay] === true) {
							$self.rup_jqtable('showCol', obj.name);
						} else {
							$self.rup_jqtable('hideCol', obj.name);
						}
					});

					//$self.trigger("rupTable_fluidUpdate");

					//$self.setGridWidth(currentWidth);


					// Se redimensionan las capas contenidas en el mantenimiento
					//$fluidBaseLayer.children().width(currentWidth);
					//						prop.searchForm.parent().width(currentWidth+3)
					// Se redimensiona el feedback
					// if (settings.$feedback){
					// 	feedBackPaddingLeft = parseInt(settings.$feedback.css("padding-left"));
					// 	feedBackPaddingRight = parseInt(settings.$feedback.css("padding-right"));
					// 	settings.$feedback.width(currentWidth - (feedBackPaddingLeft+feedBackPaddingRight));
					// }

					// Se redimensiona la toolbar
					// if (settings.$toolbar){
					// 	toolbarPaddingLeft = parseInt(settings.$toolbar.css("padding-left"));
					// 	toolbarPaddingRight = parseInt(settings.$toolbar.css("padding-right"));
					// 	settings.$toolbar.width(currentWidth - (toolbarPaddingLeft+toolbarPaddingRight));
					// 	settings.$toolbar.css("width", currentWidth - (toolbarPaddingLeft+toolbarPaddingRight));
					// }
				}
			});

			function intNum(val, defval) {
				val = parseInt(val, 10);
				if (isNaN(val)) {
					return defval || 0;
				}
				return val;
			}

			function reDefineColWidth() {
				var $self = this;
				var widthsArr = $self[0].p.colModel.map(function (i, elem) {
					return i.width;
				});

				for (var j = 0; j < widthsArr.length; j++) {
					$('.ui-jqgrid-labels > th:eq(' + j + ')').css('width', widthsArr[j]);
					$self.find('tr').find('td:eq(' + j + ')').each(function () {
						$(this).css('width', widthsArr[j]);
					});
				}
			}

			function setColWidth() {
				//console.log("entra");
				var initwidth = 0,
					ts = this[0],
					grid = this[0],
					brd = $.jgrid.cell_width ? 0 : intNum(ts.p.cellLayout, 0),
					vc = 0,
					lvc, scw = intNum(ts.p.scrollOffset, 0),
					cw, hs = false,
					aw, gw = 0,
					cl = 0,
					cr;
				$.each(ts.p.colModel, function () {
					if (this.hidden === undefined) {
						this.hidden = false;
					}
					if (ts.p.grouping && ts.p.autowidth) {
						var ind = $.inArray(this.name, ts.p.groupingView.groupField);
						if (ind !== -1) {
							this.hidden = !ts.p.groupingView.groupColumnShow[ind];
						}
					}
					this.widthOrg = cw = intNum(this.width, 0);
					if (this.hidden === false) {
						initwidth += cw + brd;
						if (this.fixed) {
							gw += cw + brd;
						} else {
							vc++;
						}
						cl++;
					}
				});
				if (isNaN(ts.p.width)) {
					ts.p.width = initwidth + ((ts.p.shrinkToFit === false && !isNaN(ts.p.height)) ? scw : 0);
				}
				grid.width = ts.p.width;
				ts.p.tblwidth = initwidth;
				if (ts.p.shrinkToFit === false && ts.p.forceFit === true) {
					ts.p.forceFit = false;
				}
				if (ts.p.shrinkToFit === true && vc > 0) {
					aw = grid.width - brd * vc - gw;
					if (!isNaN(ts.p.height)) {
						aw -= scw;
						hs = true;
					}
					initwidth = 0;
					$.each(ts.p.colModel, function (i) {

						if (this.hidden === false && this.fixed !== true) {
							//console.log("->" + this.name + " - hidden:" + this.hidden + " - fixed: " + this.fixed + " -  tblwidth: " + ts.p.tblwidth + " - width: " + this.width);
							cw = Math.round(aw * this.width / (ts.p.tblwidth - brd * vc - gw));
							this.width = cw;
							initwidth += cw;
							lvc = i;
						}
					});
					cr = 0;
					if (hs) {
						if (grid.width - gw - (initwidth + brd * vc) !== scw) {
							cr = grid.width - gw - (initwidth + brd * vc) - scw;
						}
					} else if (!hs && Math.abs(grid.width - gw - (initwidth + brd * vc)) !== 1) {
						cr = grid.width - gw - (initwidth + brd * vc);
					}
					ts.p.colModel[lvc].width += cr;
					ts.p.tblwidth = initwidth + cr + brd * vc + gw;
					if (ts.p.tblwidth > ts.p.width) {
						ts.p.colModel[lvc].width -= (ts.p.tblwidth - parseInt(ts.p.width, 10));
						ts.p.tblwidth = ts.p.width;
					}
				}
			}

			function resize() {
				$self.css('width', '100%');

				$self.parents('.ui-jqgrid-bdiv').css('width', '100%');
				$self.parents('.ui-jqgrid-view').css('width', '100%');
				$self.parents('.ui-jqgrid').css('width', '100%');

				$self.parents('.ui-jqgrid').find('.ui-jqgrid-htable').css('width', '100%');
				$self.parents('.ui-jqgrid').find('.ui-jqgrid-htable').parents('.ui-jqgrid-hbox').css('width', '100%');
				$self.parents('.ui-jqgrid').find('.ui-jqgrid-hdiv').css('width', '100%');
				$self.parents('.ui-jqgrid').find('.ui-jqgrid-pager').css('width', '100%');
				if ($self.data('settings').$toolbar){
					$self.data('settings').$toolbar.css('width', '100%');
				}
				$.proxy(setColWidth, $self)();
				$.proxy(reDefineColWidth, $self)();

			}

			$self.on('jqGridAfterLoadComplete', function () {
				$.proxy(resize, $self)();
			});

			$(window).on('resize', function () {
				$.proxy(resize, $self)();
			});



			// $self.fluidWidth({
			// 	fluidBaseLayer:settings.fluid.baseLayer,
			// 	minWidth: 100,
			// 	maxWidth: 2000,
			// 	fluidOffset : 0
			// });
			//
			// // $self.fluidWidth(settings.fluid);
			// //
			// $self.on("rupTable_fluidUpdate", function(event){
			// 	$.proxy(resize,$self)();
			// });


		}
	});


	jQuery.fn.rup_jqtable('extend', {
		/**
		* Obtiene a partir de la configuración del colModel, la información correspondiente al comportamiento responsive de las columnas.
		*
		* @name getRwdColConfig
		* @function
		* @return {object[]} - Configuración responsive para las columnas de la tabla.
		*/
		getRwdColConfig: function () {
			var $self = this,
				rwdCols, retJson = {},
				retArray = [],
				jsonAux = {},
				colRwdClasses, splitAux, splitAux2;

			rwdCols = $.grep($self.rup_jqtable('getColModel'), function (obj, i) {
				return obj['rwdClasses'];
			});

			$.each(rwdCols, function (i, obj) {
				colRwdClasses = obj.rwdClasses;
				jsonAux = {
					name: obj.name,
					xs: true,
					sm: true,
					md: true,
					lg: true
				};
				splitAux = colRwdClasses.split(' ');
				//console.log("name:" + obj.name);
				for (var i = 0; i < splitAux.length; i++) {
					splitAux2 = splitAux[i].split('-');
					//  console.log("splitAux2:" + splitAux2[0]);
					//console.log("splitAux2:" + splitAux2[1]);
					if (splitAux2[0] === 'hidden') {
						jsonAux[splitAux2[1]] = false;
					}
				}

				retArray.push(jsonAux);
			});

			//console.log(retArray);
			return retArray;

		}
	});





	//*******************************************************
	// DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
	//*******************************************************


	/**
 	* @description Propiedades de configuración del plugin responsive del componente RUP Table.
 	*
 	* @name options
 	*
 	* @property {object} [fluid] - Parametros de configuración
 	* @property {string[]} [excludeColumns] - Determina las columnas que van a ser excluidas de la generación del informe.
 	* @property {string[]} [sendPostDataParams] - Parámetros del jqGrid que van a ser enviados en la petición de generación del informe.
 	*/


	jQuery.fn.rup_jqtable.plugins.responsive = {};
	jQuery.fn.rup_jqtable.plugins.responsive.defaults = {
		// autowidth:true,
		fluid: {
			baseLayer: null,
			minWidth: 100,
			maxWidth: 2000,
			fluidOffset: 0
		},
		toolbar: {
			autoAjustToolbar: false,
			width: '87.6%'
		}

	};

	// jQuery.fn.rup_jqtable.plugins.toolbar.defaults = {
	// 	toolbar:{
	// 		autoAjustToolbar:false
	// 	}
	// };

})(jQuery);

               });
            })
        );
        