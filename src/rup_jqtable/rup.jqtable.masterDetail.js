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
