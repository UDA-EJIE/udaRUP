/**
 * funcion que ejecuta los test de los métodos más
 * comunes de los componentes.
 * @author Erlantz Carrasson Pando
 * @param {rup_element} $element 
 * @param {String} rupComponent 
 * @param {Array} methods 
 */
function generalFunc($element, rupComponent, methods) {
	var rupObj = (args) =>{
		eval('$element.' + rupComponent + '.apply(this, ' + args + ')');
	};
    if('getRupValue' in methods) {
	describe('Método getRupValue:', () => {
	    it('Devuelve un valor:', () => {
		expect(rupObj('getRupValue')).toBeDefined();
	    });
	});
    }
    if('setRupValue' in methods) {
	describe('Método setRupValue', () => {
	    beforeAll(() => {
		rupObj('setRupValue', 50);
	    });
	    it('Debe actualizar el valor:', () => {
		expect(rupObj('getRupValue')).toBe(50);
	    });
	});
    }
    if('disable' in methods){
	describe('Método disable', () => {
	    beforeAll(() => {
		if($element.is(':disabled') && 'enable' in methods){
		    rupObj('enable');
		} else if ($element.is(':disabled')){
		    $element.enable();
		}
	    });
	    it('Debe poder deshabilitarse', () => {
		rupObj('disable');
		expect($element).toBeDisabled();
	    });
	});
    }
    if('enable' in methods) {
	describe('Método enable', () => {
	    beforeAll(() => {
		if($element.is(':enabled') && 'disable' in methods){
		    rupObj('disable');
		} else if ($element.is(':enabled')){
		    $element.disable();
		}
	    });
	    it('Debe poder habilitarse', () => {
		rupObj('enable');
		expect($element).not.toBeDisabled();
	    });
	});
    }
    if('destroy' in methods) {
	describe('Método destroy', () => {
	    beforeAll(() => {
		rupObj('destroy');
	    });
	    it('No debe existir', () => {
		expect(rupObj('destroy')).toThrowError();
	    });
	});
    }
}
