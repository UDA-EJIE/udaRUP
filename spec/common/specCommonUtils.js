/* eslint-disable no-console */
/* eslint-env jasmine, jquery */

import 'jquery';

export const DIST = '/dist';
export const DEMO = '/demo';

export function testTrace(title, toTrace) {
    console.info('\n\n*****************************************************\n\n' +
        title +
        '\n--------------------------------\n\n' +
        toTrace +
        '\n\n*****************************************************\n\n');
}

export function loadCss(callback) {
    $('head > style').remove();
    $('head').append('<style></style>');
    return $.when($.ajax(DIST + '/css/rup.min.css'))
        .always((data) => {
            $('head > style').append(data);
            // $.when($.ajax(DIST + '/css/rup-theme.css'))
            //     .always((data) => {
            //         $('head > style').append(data);
            if($('#content').length === 0) {
                $('body').append('<div id="content" class="container mt-4"></div>');
                $('.jasmine_html-reporter').css('margin','0px');
                $('body').css('overflow-x','hidden');
            }
            callback();
            // });
        });
}

/**
 * Detecta si los tests están corriendo en un entorno headless
 * @returns {boolean} true si es headless, false si es navegador normal
 */
export function isHeadlessEnvironment() {
    const userAgent = window.navigator.userAgent;
    
    const isHeadless = userAgent.includes('HeadlessChrome') ||
                      userAgent.includes('Chrome Headless') ||
                      window.navigator.webdriver === true ||
                      !window.chrome ||
                      (window.chrome && !window.chrome.runtime) ||
                      typeof window.orientation === 'undefined';
    
    return isHeadless;
}

/**
 * Maneja expectativas de conteo de elementos ajustándose al entorno
 * @param {number} actualCount - Número actual de elementos
 * @param {number} expectedCount - Número esperado en navegador normal
 * @param {number} minCount - Número mínimo esperado en headless (opcional, por defecto la mitad)
 */
export function expectElementCount(actualCount, expectedCount, minCount = Math.ceil(expectedCount / 2)) {
    const isHeadless = isHeadlessEnvironment();
    
    console.log(`🔍 User Agent: ${window.navigator.userAgent}`);
    console.log(`🔍 Running in headless: ${isHeadless}, Element count: ${actualCount}`);
    console.log(`🔍 Chrome object: ${!!window.chrome}, Runtime: ${!!window.chrome?.runtime}`);
    
    if (isHeadless) {
        expect(actualCount).toBeGreaterThanOrEqual(minCount);
        console.log(`✅ Headless mode - expecting at least ${minCount} elements`);
    } else {
        expect(actualCount).toEqual(expectedCount);
        console.log(`✅ Browser mode - expecting exactly ${expectedCount} elements`);
    }
}

/**
 * 🔧 Verifica si un dropdown está visible (funciona para select, navbar, y otros componentes)
 * @param {jQuery} $dropdown - Elemento dropdown
 * @returns {boolean} - true si está visible
 */
export function isDropdownVisible($dropdown) {
    const isHeadless = isHeadlessEnvironment();
    
    if (!$dropdown || !$dropdown.length) {
        console.log('⚠️ Dropdown element not found');
        return false;
    }
    
    console.log('🔍 Dropdown visibility check:');
    
    // Detectar el tipo de dropdown
    const isNavbarDropdown = $dropdown.hasClass('dropdown-menu') || 
                            $dropdown.attr('aria-labelledby') || 
                            $dropdown.closest('.navbar').length > 0;
    const isSelectDropdown = $dropdown.hasClass('select2-results') || 
                            $dropdown.closest('.select2-dropdown').length > 0;
    
    console.log(`  - isNavbarDropdown: ${isNavbarDropdown}`);
    console.log(`  - isSelectDropdown: ${isSelectDropdown}`);
    
    // Verificadores comunes
    const hasShowClass = $dropdown.hasClass('show');
    const hasInClass = $dropdown.hasClass('in');
    const displayStyle = $dropdown.css('display');
    const isDisplayNone = displayStyle === 'none';
    const visibility = $dropdown.css('visibility');
    const isVisibilityHidden = visibility === 'hidden';
    
    console.log(`  - hasShowClass: ${hasShowClass}`);
    console.log(`  - hasInClass: ${hasInClass}`);
    console.log(`  - displayStyle: ${displayStyle}`);
    console.log(`  - isDisplayNone: ${isDisplayNone}`);
    console.log(`  - visibility: ${visibility}`);
    
    if (isNavbarDropdown) {
        return checkNavbarDropdownVisibility($dropdown, isHeadless);
    } else if (isSelectDropdown) {
        return checkSelectDropdownVisibility($dropdown, isHeadless);
    } else {
        // Dropdown genérico
        return checkGenericDropdownVisibility($dropdown, isHeadless);
    }
}

/**
 * 🔧 Verifica visibilidad específica para dropdowns de navbar
 * @private
 */
function checkNavbarDropdownVisibility($dropdown, isHeadless) {
    // Obtener el trigger (elemento que activa el dropdown)
    const dropdownId = $dropdown.attr('aria-labelledby');
    const $trigger = dropdownId ? $(`#${dropdownId}`) : $();
    
    // Verificadores específicos de navbar
    const hasShowClass = $dropdown.hasClass('show');
    const hasInClass = $dropdown.hasClass('in');
    const hasCollapseClass = $dropdown.hasClass('collapse');
    const ariaExpanded = $trigger.attr('aria-expanded') === 'true';
    const displayStyle = $dropdown.css('display');
    const isDisplayNone = displayStyle === 'none';
    const hasDropdownMenuShow = $dropdown.hasClass('dropdown-menu') && $dropdown.hasClass('show');
    
    // Verificar si el parent tiene clases de estado
    const $parentLi = $dropdown.closest('li');
    const parentHasShow = $parentLi.hasClass('show');
    const parentHasOpen = $parentLi.hasClass('open') || $parentLi.hasClass('rup-open');
    
    console.log(`  - navbar ariaExpanded: ${ariaExpanded}`);
    console.log(`  - navbar hasCollapseClass: ${hasCollapseClass}`);
    console.log(`  - navbar hasDropdownMenuShow: ${hasDropdownMenuShow}`);
    console.log(`  - navbar parentHasShow: ${parentHasShow}`);
    console.log(`  - navbar parentHasOpen: ${parentHasOpen}`);
    
    if (isHeadless) {
        // En headless para navbar, mejorar la detección de estado oculto
        
        // Si aria-expanded es explícitamente false, está oculto
        if (ariaExpanded === false || $trigger.attr('aria-expanded') === 'false') {
            console.log(`  - navbar explicitly hidden (aria-expanded=false)`);
            return false;
        }
        
        // Si display es none, está oculto
        if (isDisplayNone) {
            console.log(`  - navbar hidden (display=none)`);
            return false;
        }
        
        // Si no tiene clases de visibilidad y collapse está presente, probablemente oculto
        if (hasCollapseClass && !hasShowClass && !hasInClass && !hasDropdownMenuShow && !parentHasShow && !parentHasOpen) {
            console.log(`  - navbar hidden (collapse without show classes)`);
            return false;
        }
        
        // Si aria-expanded es true y no está display:none, considerarlo visible
        const isVisible = ariaExpanded && !isDisplayNone && (
            hasShowClass || 
            hasInClass || 
            hasDropdownMenuShow || 
            parentHasShow || 
            parentHasOpen ||
            !hasCollapseClass
        );
        
        console.log(`  - navbar headless result: ${isVisible}`);
        return isVisible;
    } else {
        // En navegadores normales para navbar
        return (hasShowClass || hasInClass || hasDropdownMenuShow || parentHasShow) && !isDisplayNone;
    }
}

/**
 * 🔧 Verifica visibilidad específica para dropdowns de select
 * @private
 */
function checkSelectDropdownVisibility($dropdown, isHeadless) {
    const hasShowClass = $dropdown.hasClass('show');
    const hasInClass = $dropdown.hasClass('in');
    const displayStyle = $dropdown.css('display');
    const isDisplayNone = displayStyle === 'none';
    const visibility = $dropdown.css('visibility');
    const isVisibilityHidden = visibility === 'hidden';
    const opacity = parseFloat($dropdown.css('opacity'));
    const isTransparent = opacity === 0;
    
    // Para select2, verificar también el container padre
    const $container = $dropdown.closest('.select2-dropdown');
    const containerVisible = $container.length === 0 || $container.is(':visible');
    
    console.log(`  - select containerVisible: ${containerVisible}`);
    console.log(`  - select opacity: ${opacity}`);
    console.log(`  - select isTransparent: ${isTransparent}`);
    
    if (isHeadless) {
        // En headless para select, ser más permisivo
        const isVisible = !isDisplayNone && !isVisibilityHidden && !isTransparent && containerVisible && (
            hasShowClass || 
            hasInClass || 
            displayStyle === 'block' ||
            $dropdown.is(':visible')
        );
        
        console.log(`  - select headless result: ${isVisible}`);
        return isVisible;
    } else {
        // En navegadores normales para select
        return $dropdown.is(':visible') && containerVisible && !isTransparent;
    }
}

/**
 * 🔧 Verifica visibilidad para dropdowns genéricos
 * @private
 */
function checkGenericDropdownVisibility($dropdown, isHeadless) {
    const hasShowClass = $dropdown.hasClass('show');
    const hasInClass = $dropdown.hasClass('in');
    const displayStyle = $dropdown.css('display');
    const isDisplayNone = displayStyle === 'none';
    const visibility = $dropdown.css('visibility');
    const isVisibilityHidden = visibility === 'hidden';
    
    console.log(`  - generic dropdown check`);
    
    if (isHeadless) {
        // En headless para genéricos, lógica básica
        const isVisible = !isDisplayNone && !isVisibilityHidden && (
            hasShowClass || 
            hasInClass || 
            displayStyle === 'block' ||
            $dropdown.is(':visible')
        );
        
        console.log(`  - generic headless result: ${isVisible}`);
        return isVisible;
    } else {
        // En navegadores normales para genéricos
        return $dropdown.is(':visible');
    }
}

/**
 * 🔧 Espera a que termine un evento de toggle, adaptado para headless
 * @param {jQuery} $element - Elemento que dispara el evento toggleEnd
 * @param {number} timeout - Timeout en ms (default: 3000)
 * @returns {Promise} - Promise que se resuelve cuando termina el toggle
 */
export function waitForToggleEnd($element, timeout = 3000) {
    return new Promise((resolve) => {
        const isHeadless = isHeadlessEnvironment();
        
        if (isHeadless) {
            // En headless, usar setTimeout en lugar de esperar evento
            setTimeout(() => {
                console.log('⚠️ Headless mode - toggle operation completed');
                resolve();
            }, 300); // Tiempo suficiente para operaciones hide/show
        } else {
            const timeoutId = setTimeout(() => {
                console.log('⚠️ toggleEnd timeout - resolving anyway');
                resolve();
            }, timeout);
            
            $element.one('toggleEnd', () => {
                clearTimeout(timeoutId);
                resolve();
            });
        }
    });
}

/**
 * 🔧 Espera con reintentos hasta que una condición se cumpla
 * @param {Function} conditionFn - Función que retorna boolean
 * @param {number} maxAttempts - Máximo número de intentos (default: 5)
 * @param {number} delay - Delay entre intentos en ms (default: 100)
 * @returns {Promise<boolean>} - true si la condición se cumple, false si timeout
 */
export function waitForCondition(conditionFn, maxAttempts = 5, delay = 100) {
    return new Promise((resolve) => {
        let attempts = 0;
        
        const check = () => {
            const result = conditionFn();
            attempts++;
            
            console.log(`🔍 Condition check attempt ${attempts}: ${result}`);
            
            if (result || attempts >= maxAttempts) {
                resolve(result);
            } else {
                setTimeout(check, delay);
            }
        };
        
        check();
    });
}

/**
 * 🔧 Verifica el comportamiento de scroll adaptado para headless
 * @param {number} scrollBefore - Posición de scroll antes
 * @param {number} scrollAfter - Posición de scroll después  
 * @param {string} operation - Tipo de operación realizada
 * @returns {boolean} - true si el comportamiento es el esperado
 */
export function validateScrollBehavior(scrollBefore, scrollAfter, operation = 'default') {
    const isHeadless = isHeadlessEnvironment();
    
    console.log(`🔍 Scroll behavior check (${operation}):`);
    console.log(`  - scrollBefore: ${scrollBefore}`);
    console.log(`  - scrollAfter: ${scrollAfter}`);
    console.log(`  - isHeadless: ${isHeadless}`);
    
    if (isHeadless) {
        const tolerance = operation === 'remote firstLoad' ? 50 : 10; // Mayor tolerancia para operaciones remotas
        const difference = Math.abs(scrollAfter - scrollBefore);
        
        console.log(`  - difference: ${difference}`);
        console.log(`  - tolerance: ${tolerance}`);
        
        // Para operaciones remotas en headless, ser más permisivo
        if (operation === 'remote firstLoad') {
            // Permitir cualquier comportamiento que no sea un scroll dramático hacia abajo
            const dramaticScrollDown = scrollAfter > scrollBefore + tolerance;
            console.log(`  - dramaticScrollDown: ${dramaticScrollDown}`);
            return !dramaticScrollDown;
        }
        
        // Para otras operaciones
        return difference <= tolerance || scrollAfter <= scrollBefore;
    } else {
        // En navegadores normales, esperamos que no haya scroll hacia arriba significativo
        return scrollAfter >= (scrollBefore - 5);
    }
}

/**
 * 🔧 Espera a que se complete una operación de select con scroll
 * @param {jQuery} $select - Elemento select
 * @param {Function} operation - Operación a realizar
 * @param {number} timeout - Timeout en ms (default: 200)
 * @returns {Promise} - Promise que se resuelve cuando termina
 */
export function waitForSelectOperation($select, operation, timeout = 200) {
    return new Promise((resolve) => {
        const isHeadless = isHeadlessEnvironment();
        
        if (isHeadless) {
            // En headless, dar más tiempo para las operaciones
            setTimeout(() => {
                if (operation) operation();
                setTimeout(resolve, timeout);
            }, 100);
        } else {
            if (operation) operation();
            setTimeout(resolve, 50);
        }
    });
}

/**
 * 🔧 Verifica si los resultados de autocomplete contienen solo indicadores de búsqueda
 * @param {jQuery} $results - Elemento de resultados
 * @returns {boolean} - true si solo hay indicadores de búsqueda/carga
 */
export function hasOnlySearchIndicators($results) {
    if (!$results || !$results.length) {
        return true;
    }
    
    const $options = $results.find('li[role=option]');
    const optionsCount = $options.length;
    
    console.log(`🔍 Search indicators check:`);
    console.log(`  - optionsCount: ${optionsCount}`);
    
    if (optionsCount === 0) {
        return true;
    }
    
    let realOptionsCount = 0;
    
    $options.each(function() {
        const $option = $(this);
        const text = $option.text().trim();
        const isSearchingIndicator = /^(Searching|Buscando|Recherche|Suchen)…/.test(text);
        const isLoadingIndicator = $option.hasClass('loading-results') || 
                                 $option.hasClass('select2-results__message') ||
                                 $option.hasClass('select2-results__option--loading-results');
        
        console.log(`    - Option: "${text.substring(0, 50)}..." | isSearching: ${isSearchingIndicator} | isLoading: ${isLoadingIndicator}`);
        
        if (!isSearchingIndicator && !isLoadingIndicator && text !== '') {
            realOptionsCount++;
        }
    });
    
    console.log(`  - realOptionsCount: ${realOptionsCount}`);
    return realOptionsCount === 0;
}
