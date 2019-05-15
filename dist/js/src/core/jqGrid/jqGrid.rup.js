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