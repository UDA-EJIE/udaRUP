
/*global jQuery */
/*global define */

( function(root, factory ) {
    if ( typeof define === 'function' && define.amd ) {

        // AMD. Register as an anonymous module.
        define( ['jquery', '../templates'], factory );
    } else {

        // Browser globals
        root.ButtonMaterialAdapter = factory( jQuery );
    }
} (this,  function( $, Rup ) {

    function ButtonMaterialAdapter(){

    }

    ButtonMaterialAdapter.prototype.NAME = 'button_material';

    ButtonMaterialAdapter.prototype.createDropdownButton = function (settings) {
        var $self = this, dropdownSettings = settings.dropdown;
		
        // Limpieza de las clases de jQuery UI
        $self.removeClass('ui-button ui-corner-all ui-widget');
		
        var classes = 'rup-dropdown-button-material';
		
        $.each($self[0].classList, function(key, value){
            if(value.indexOf('btn-material') >= 0) {
                classes = classes + ' ' + value;
            }
        });

        return $(Rup.Templates.rup.button.dropdownButton({
            id: $self.prop('id')+'_dropdown',
            // Usamos las clases del boton principal para que el enfasis sea siempre el mismo
            classes: classes
        }));
    };

    ButtonMaterialAdapter.prototype.createMButton = function (settings, label) {
        var $self = this, dropdownSettings = settings.dropdown;

        return $(Rup.Templates.rup.button.mbutton({
            id: $self.prop('id'),
            classes: 'btn-material btn-material-primary-high-emphasis rup-toolbar_menuButton rup-toolbar_menuButtonSlided',
            label: label,
            iconClasses: 'rup-toolbar_menuButtonIcon'
        }));
    };

    ButtonMaterialAdapter.prototype.createMButtonContainer = function (settings, label) {
        var $self = this, dropdownSettings = settings.dropdown;

        return $(Rup.Templates.rup.button['mbutton-container']({
            id: $self.prop('id')+'-container',
            classes: 'rup-toolbar_menuButtonContainer',
            label: label,
            iconClasses: 'rup-toolbar_menuButtonIcon'
        }));
    };

    $.rup = $.rup || {};
    $.rup.adapter = $.rup.adapter || {};

    $.rup.adapter[ButtonMaterialAdapter.prototype.NAME ] = new ButtonMaterialAdapter;

    return $;
}));
