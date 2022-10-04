/*global jQuery */
/*global define */

( function(root, factory ) {
    if ( typeof define === 'function' && define.amd ) {

        // AMD. Register as an anonymous module.
        define( ['jquery','../templates', '../rup.base'], factory );
    } else {

        // Browser globals
        root.ToolbarMaterialAdapter = factory( jQuery );
    }
} (this,  function( $, Rup ) {

    function ToolbarMaterialAdapter(){

    }

    ToolbarMaterialAdapter.prototype.NAME = 'toolbar_material';

    ToolbarMaterialAdapter.prototype.addButton = function (obj, json_i18n) {
        var buttonId, rightObjects;

        // Se obtiene el identificador del boton. En caso de no haberse indicado un valor en la propiedad id, se toma el valor de la propiedad i18nCaption.
        if (obj.id){
            buttonId = obj.id;
        }else{
            buttonId = obj.i18nCaption;
        }

        // Se comprueba si el id del boton contiene el identificador de la botonera. En caso de no existir se añade al principio.
        if (buttonId.indexOf($(this).attr('id'))!==0){
            buttonId = $(this).attr('id')+'##'+buttonId;
        }

        // var boton = $("<button type='button'></button>").text($.rup.i18nParse(json_i18n,obj.i18nCaption)).addClass("rup-toolbar_button").attr({
        //   "id":buttonId
        // });
        var boton = $(Rup.Templates.rup.toolbar.button.material({
            id: buttonId,
            css: obj.css,
            label: obj.text?obj.text:$.rup.i18nParse(json_i18n,obj.i18nCaption)
        }));
        boton.rup_button(obj);
        // boton.button("option", "icons", {primary:obj.css, secondary:null} );

        // if(obj.right !== undefined && obj.right === true){
        //   boton.addClass("rup-button-right");
        // }
        

        // Si fuera necesario, se añade el estilo para la ubicación derecha y se gestiona su indexado
        if(obj.right !== undefined && obj.right === true){
            //Añadir botón a la derecha
            var $div_rightObjects = this.children('div:not(.rup-dropdown-btn-group):not(.rup-mbutton )');
            if ($div_rightObjects.length===0){
                $div_rightObjects = $('<div></div>').attr('id',this.attr('id')+'-rightButtons').css('float', 'right');
                this.append($div_rightObjects);
            }
            //				if (boton.parent().is(".rup-dropdown-btn-group")){
            //					boton.parent().prependTo($div_rightObjects);
            //				}else{
            boton.prependTo($div_rightObjects);
            //				}
        } else {
            if (boton.parent().is('.rup-dropdown-btn-group')){
                $(this).append(boton.parent());
            }else{
                $(this).append(boton);
            }
        }

        //Añadir evento keydown
        this._setKeyDown(boton);

        // Al perder el foco se elimina el estilo de disponer del foco
        boton.on('focusout',function(){
            $(this).removeClass('ui-state-focus');
        });
        return boton;
    };


    ToolbarMaterialAdapter.prototype.addMButton = function (obj, json_i18n){ //añade a la toolbar un 'mbutton' (sin botones)
        var botonGrp, boton = '', buttonId;
        if (obj.id === undefined) {
        	$.rup.errorGestor($.rup.i18nParse($.rup.i18n.base, 'rup_toolbar.mbuttonsIdError'));
            boton = null;
        } else {
            buttonId = obj.id;
            // Se comprueba si el id del boton contiene el identificador de la botonera. En caso de no existir se añade al principio.
            if (buttonId.indexOf($(this).attr('id'))!==0){
                buttonId = $(this).attr('id')+'##'+obj.id;
            }
            botonGrp = $(Rup.Templates.rup.toolbar.mbutton.material({
                idParent: obj.idParent,
                id: buttonId,
                css: obj.css,
                groupClasses: obj.groupClasses,
                label: obj.text?obj.text:$.rup.i18nParse(json_i18n,obj.i18nCaption)
            }));

            boton = botonGrp.find('[id=\''+buttonId+'\']');
            //Si no se define un estilo especial se aplica por defecto
            if (obj.css === undefined){
                obj.css = 'rup-toolbar_menuButtonIcon';
            }
            boton.rup_button();
        }

        if(obj.right !== undefined && obj.right === true){
            botonGrp.addClass('rup-button-right');
        }

        // Si fuera necesario, se añade el estilo para la ubicación derecha y se gestiona su indexado
        if(obj.right !== undefined && obj.right === true){
            //Añadir botón a la derecha
            var $div_rightObjects = this.children('div:not(.rup-dropdown-btn-group):not(.rup-mbutton )');
            if ($div_rightObjects.length===0){
                $div_rightObjects = $('<div></div>').attr('id',this.attr('id')+'-rightButtons').css('float', 'right');
                this.append($div_rightObjects);
            }
            botonGrp.prependTo($div_rightObjects);
        } else {
            $(this).append(botonGrp);
        }

        //Añadir evento keydown
        this._setKeyDown(boton);

        if (obj.click) { //Añadir eventos
            boton.click({i18nCaption: obj.i18nCaption}, obj.click);
        }
        
        return botonGrp;
    };


    ToolbarMaterialAdapter.prototype.addButtonsToMButton = function (buttons, menuButton, json_i18n) { //añade botones al 'mbutton'
        var  ul,length, boton, buttonId;
        //numero de botones a añadir
        length = buttons.length;

        menuButton.find('button').attr('href','#');
        //Se añaden cada uno de los botones del menuButton
        ul = menuButton.find('ul[id="'+menuButton.find('button').attr('id')+'-mbutton-container"]');
        for (var i = length - 1 ; i >= 0; i-- ) {
            boton = buttons[i];
            if (boton.id){
                buttonId = menuButton.find('button').attr('id')+'##'+boton.id;
            }else{
                buttonId = menuButton.find('button').attr('id')+'##'+boton.i18nCaption;
            }
            buttons[i].id=buttonId;
            ul.append($('<li>').append(this.addButton(buttons[i],json_i18n)));

        }
        if($('[id ="'+menuButton.attr('id')+'-mbutton-container'+'"]').children().length != length) {
            $('[id ="'+menuButton.attr('id')+'-mbutton-container'+'"]').append(ul.children());
        }
    };

    $.rup = $.rup || {};
    $.rup.adapter = $.rup.adapter || {};

    $.rup.adapter[ToolbarMaterialAdapter.prototype.NAME ] = new ToolbarMaterialAdapter();

    return $;
}));
