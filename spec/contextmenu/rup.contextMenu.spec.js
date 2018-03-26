import 'jquery';
import 'jasmine-jquery';
import 'rup.contextMenu';

describe('TEST contextMenu', () => {
    var $context;
    describe('Creación', () => {
        beforeAll(() => {
            var html = '<ul id="exampleContext"></ul>';
            $('body').append(html);
            var props = {
                callback: function(key, options) {
                    return [key,options];
                },
                items:{
                    'item1':{name:'Item1'},
                    'item2':{name:'Item2'}
                }
            }
            $('#exampleContext').rup_contextMenu();
        });
    });
});
/**
 * Ni copiando el script en produccion se genera el context menu correctamente:
 * Script Usado:
 * $('#cntx').rup_contextMenu({
		callback: function(key, options) {
			alert("clicked: " + key); 
	    },
		items: {
	        "edit": {name: "Clickable", icon: "edit", disabled: false},
	        "cut": {name: "Disabled", icon: "cut", disabled: true}
		}
	});
 */