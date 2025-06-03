/* jshint -W107 */
/* eslint-env jasmine, jquery */

import 'jquery';
import * as testutils from '../common/specCommonUtils';
import 'rup.calendar';

var EVENTS = [{
    'id': '48605',
    'title': '<span><strong>AUTORIZACIÓN DE VERTIDO DE AGUAS RESIDUALES PROCEDENTES DE ESTACIÓN DE SERVICIO Nº 7338 EN ARKAUTE, T.M .DE VITORIA-GASTEIZ</strong><ul class=\'pl-3\'><li>Nºexp.:&nbsp;VDP-A-2012-0382</li><li>P.vertido:&nbsp;PV1</li><li>Id.flujo:&nbsp;F1</li><li>Requiere muestra&nbsp;</li><li><i class=\'mdi mdi-check pr-1\' aria-hidden=\'true\'></i>COMPLETADA</li></ul></span>',
    'start': '1541890800000',
    'class': ' vertido muestreo completada',
    'end': '1541890800001',
    'url': 'javascript:actions(48605)'
}, {
    'id': '47278',
    'title': '<span><strong>REVISION DE LA AUTORIZACION DE VERTIDO DE AGUAS RESIDUALES DE LA LOCALIDAD DE ILARRATZA (2 P. VERTIDO), T.M. DE VITORIA-GASTEIZ. (REV. 2009-S-0372)</strong><ul class=\'pl-3\'><li>Nºexp.:&nbsp;RAV-A-2014-0058</li><li>P.vertido:&nbsp;PV1</li><li>Id.flujo:&nbsp;F1</li></ul></span>',
    'start': '1543186800000',
    'class': ' vertido vigilancia',
    'end': '1543186800001',
    'url': 'javascript:actions(47278)'
}, {
    'id': '49203',
    'title': '<span><strong>AUTORIZACION DE VERTIDO DE AGUAS RESIDUALES EN ESTACION DE SERVICIO (FECALES, HIDROCARBUROS Y LAVADO DE VEHICULOS EN OTXANDIO</strong><ul class=\'pl-3\'><li>Nºexp.:&nbsp;VDP-A-2012-0164</li><li>P.vertido:&nbsp;PV1</li><li>Id.flujo:&nbsp;F1</li></ul></span>',
    'start': '1541890800000',
    'class': ' vertido vigilancia',
    'end': '1541890800001',
    'url': 'javascript:actions(49203)'
}, {
    'id': '47275',
    'title': '<span><strong>REVISION DE LA AUTORIZACION DE VERTIDO DE AGUAS RESIDUALES DE LA LOCALIDAD DE ILARRATZA (2 P. VERTIDO), T.M. DE VITORIA-GASTEIZ. (REV. 2009-S-0372)</strong><ul class=\'pl-3\'><li>Nºexp.:&nbsp;RAV-A-2014-0058</li><li>P.vertido:&nbsp;PV2</li><li>Id.flujo:&nbsp;F2</li></ul></span>',
    'start': '1543186800000',
    'class': ' vertido vigilancia',
    'end': '1543186800001',
    'url': 'javascript:actions(47275)'
}, {
    'id': '47445',
    'title': '<span><strong>AUTORIZACION AMBIENTAL INTEGRADA PARA LA ACTIVIDAD DE FABRICACION DE TUBOS DE ACERO SOLDADOS LONGITUDINALMENTE, PROMOVIDA POR CONDESA FABRIL, S.A., EN EL T.M. DE LEGUTIANO (ARABA).</strong><ul class=\'pl-3\'><li>Nºexp.:&nbsp;AAI-A-2013-0017-INTER</li><li>P.vertido:&nbsp;PV1</li><li>Id.flujo:&nbsp;F1</li><li>Requiere muestra&nbsp;</li></ul></span>',
    'start': '1541804400000',
    'class': ' vertido muestreo',
    'end': '1541804400001',
    'url': 'javascript:actions(47445)'
}, {
    'id': '45977',
    'title': '<span><strong>REVISION DE LA AUTORIZACION DE VERTIDOS DE AGUAS RESIDUALES PROCEDENTES DE LA EDAR MUNICIPAL DE OTXANDIO (RV: 1992-S-0149)</strong><ul class=\'pl-3\'><li>Nºexp.:&nbsp;RAV-A-2012-0362</li><li>P.vertido:&nbsp;PV1</li><li>Id.flujo:&nbsp;F1</li><li>Requiere muestra&nbsp;</li></ul></span>',
    'start': '1543618800000',
    'class': ' vertido muestreo',
    'end': '1543618800001',
    'url': 'javascript:actions(45977)'
}, {
    'id': '47308',
    'title': '<span><strong>AUTORIZACION DE VERTIDO DE AGUAS RESIDUALES DE LA LOCALIDAD DE BERROSTEGIETA EN EL TERMINO MUNICIPAL DE VITORIA-GASTEIZ (4 FOSAS SÉPTICAS CON TRES PUNTOS DE VERTIDO)</strong><ul class=\'pl-3\'><li>Nºexp.:&nbsp;VDP-A-2012-0835</li><li>P.vertido:&nbsp;PV-1</li><li>Id.flujo:&nbsp;F1</li></ul></span>',
    'start': '1542150000000',
    'class': ' vertido vigilancia',
    'end': '1542150000001',
    'url': 'javascript:actions(47308)'
}, {
    'id': '49172',
    'title': '<span><strong>AUTORIZACION DE VERTIDO DE AGUAS RESIDUALES DE LA EMPRESA LEGUTILAN DEDICADA A FABRICACION DE ESTRUCTURAS METALICAS Y SUS COMPONENTES, EN LA LOCALIDAD DE LEGUTIANO.</strong><ul class=\'pl-3\'><li>Nºexp.:&nbsp;VDP-A-2013-0010</li><li>P.vertido:&nbsp;PV1</li><li>Id.flujo:&nbsp;F1</li></ul></span>',
    'start': '1542668400000',
    'class': ' vertido vigilancia',
    'end': '1542668400001',
    'url': 'javascript:actions(49172)'
}, {
    'id': '49170',
    'title': '<span><strong>REVISION DE AUTORIZACION DE VERTIDO DE AGUAS RESIDUALES DEL POLIGONO INDUSTRIAL LLADIE EN LEGUTIO, TITULARIDAD DE EUSEBIO ARECHAGA IBARRRONDO</strong><ul class=\'pl-3\'><li>Nºexp.:&nbsp;RAV-A-2013-0037</li><li>P.vertido:&nbsp;PV1</li><li>Id.flujo:&nbsp;F1</li></ul></span>',
    'start': '1542495600000',
    'class': ' vertido vigilancia',
    'end': '1542495600001',
    'url': 'javascript:actions(49170)'
}, {
    'id': '47411',
    'title': '<span><strong>AUTORIZACION VERTIDO AGUAS RESIDUALES PROCEDENTE DE BETOLAZA</strong><ul class=\'pl-3\'><li>Nºexp.:&nbsp;VDP-A-2012-0035</li><li>P.vertido:&nbsp;PV1</li><li>Id.flujo:&nbsp;F1</li></ul></span>',
    'start': '1541718000000',
    'class': ' vertido vigilancia',
    'end': '1541718000001',
    'url': 'javascript:actions(47411)'
}, {
    'id': '49162',
    'title': '<span><strong>REVISION DE LA AUTORIZACION DE VERTIDO DE AGUAS RESIDUALES PROCEDENTES DE LA LOCALIDAD DE ANTEZANA FORONDA, EN EL T.M. VITORIA-GASTEIZ (ALAVA).</strong><ul class=\'pl-3\'><li>Nºexp.:&nbsp;RAV-A-2012-0418</li><li>P.vertido:&nbsp;PV1</li><li>Id.flujo:&nbsp;F1</li></ul></span>',
    'start': '1542150000000',
    'class': ' vertido vigilancia',
    'end': '1542150000001',
    'url': 'javascript:actions(49162)'
}, {
    'id': '47457',
    'title': '<span><strong>AUTORIZACION AMBIENTAL INTEGRADA PARA LA ACTIVIDAD DE FABRICACION DE TUBOS DE ACERO SOLDADOS LONGITUDINALMENTE, PROMOVIDA POR CONDESA FABRIL, S.A., EN EL T.M. DE LEGUTIANO (ARABA).</strong><ul class=\'pl-3\'><li>Nºexp.:&nbsp;AAI-A-2013-0017-INTER</li><li>P.vertido:&nbsp;PV2</li><li>Id.flujo:&nbsp;F2</li><li>Requiere muestra&nbsp;</li></ul></span>',
    'start': '1541804400000',
    'class': ' vertido muestreo',
    'end': '1541804400001',
    'url': 'javascript:actions(47457)'
}, {
    'id': '49166',
    'title': '<span><strong>REVISION DE LA AUTORIZACION DE VERTIDO DE AGUAS RESIDUALES PROCEDENTES DE LA ENTIDAD URBANISTICA DE CONSERVACION, S.A.U DEPORTIVO LARRABEA UBICADA EN LEGUTIANO, T.M. DE LEGUTIANO (ARABA).</strong><ul class=\'pl-3\'><li>Nºexp.:&nbsp;RAV-A-2012-0332</li><li>P.vertido:&nbsp;PV1</li><li>Id.flujo:&nbsp;F1</li></ul></span>',
    'start': '1541545200000',
    'class': ' vertido vigilancia',
    'end': '1541545200001',
    'url': 'javascript:actions(49166)'
}, {
    'id': '48640',
    'title': '<span><strong>REVISION DE AUTORIZACION DE VERTIDO DE AGUAS RESIDUALES PROCEDENTES DEL LABORATORIO PECUARIO DE ESKALMENDI T.M. ARRATZUA-UBARRUNDIA(ALAVA)</strong><ul class=\'pl-3\'><li>Nºexp.:&nbsp;RAV-A-2012-0274</li><li>P.vertido:&nbsp;PV1</li><li>Id.flujo:&nbsp;F1</li></ul></span>',
    'start': '1543359600000',
    'class': ' vertido vigilancia',
    'end': '1543359600001',
    'url': 'javascript:actions(48640)'
}, {
    'id': '49111',
    'title': '<span><strong>REVISION DE LA AUTORIZACION DE VERTIDO DE AGUAS RESIDUALES DE LA LOCALIDAD DE ULLIBARRI DE LOS OLLEROS, T.M. DE VITORIA-GASTEIZ. (REV. 2009-S-0396)</strong><ul class=\'pl-3\'><li>Nºexp.:&nbsp;RAV-A-2014-0056</li><li>P.vertido:&nbsp;PV1</li><li>Id.flujo:&nbsp;F1</li></ul></span>',
    'start': '1543186800000',
    'class': ' vertido vigilancia',
    'end': '1543186800001',
    'url': 'javascript:actions(49111)'
}, {
    'id': '56120',
    'title': '<span><strong>AUTORIZACIÓN DE VERTIDO DE AGUAS RESIDUALES PROCEDENTES DE LA VIVIENDA CTRA. DE BERGARA, Nº 15 DE DURANA, T. M. DE ARRATZUA-UBARRUNDIA</strong><ul class=\'pl-3\'><li>Nºexp.:&nbsp;VDP-A-2014-0005</li><li>P.vertido:&nbsp;PV1</li><li>Id.flujo:&nbsp;F1</li><li>Requiere muestra&nbsp;</li></ul></span>',
    'start': '1543186800000',
    'class': ' vertido muestreo',
    'end': '1543186800001',
    'url': 'javascript:actions(56120)'
}, {
    'id': '58023',
    'title': '<span><strong>EXPEDIENTE DE AUTORIZACIÓN DE OBRAS DE ADECUACIÓN DEL TRAMO INICIAL DE LA CARRETERA GI-3112 AL BARRIO DE UZARRAGA, EN EL TÉRMINO MUNICIPAL DE ANTZUOLA (GIPUZKOA)</strong><ul class=\'pl-3\'><li>Nºexp.:&nbsp;SAO-A-2018-0131</li><li>Id. zona:&nbsp;ZO1</li></ul></span>',
    'start': '1543100400000',
    'class': ' obra',
    'end': '1543100400001',
    'url': 'javascript:actions(58023)'
}, {
    'id': '56110',
    'title': '<span><strong>AUTORIZACIÓN DE VERTIDO DE AGUAS RESIDUALES PROCEDENTES DE LA VIVIENDA CTRA. DE BERGARA, Nº 19 DE DURANA, T. M. DE ARRATZUA-UBARRUNDIA</strong><ul class=\'pl-3\'><li>Nºexp.:&nbsp;VDP-A-2014-0017</li><li>P.vertido:&nbsp;PV1</li><li>Id.flujo:&nbsp;F1</li><li>Requiere muestra&nbsp;</li></ul></span>',
    'start': '1543186800000',
    'class': ' vertido muestreo',
    'end': '1543186800001',
    'url': 'javascript:actions(56110)'
}, {
    'id': '45976',
    'title': '<span><strong>REVISION DE LA AUTORIZACION DE VERTIDOS DE AGUAS RESIDUALES PROCEDENTES DE LA EDAR MUNICIPAL DE OTXANDIO (RV: 1992-S-0149)</strong><ul class=\'pl-3\'><li>Nºexp.:&nbsp;RAV-A-2012-0362</li><li>P.vertido:&nbsp;PV1</li><li>Id.flujo:&nbsp;F1</li><li>Requiere muestra&nbsp;</li></ul></span>',
    'start': '1541026800000',
    'class': ' vertido muestreo',
    'end': '1541026800001',
    'url': 'javascript:actions(45976)'
}, {
    'id': '47216',
    'title': '<span><strong>AUTORIZACION VERTIDO AGUAS RESIDUALES DE ESTACION DE SERVICIO IBAIA ENERGY, S. L. CTRA. N-102 KM.347 (LADO DCHA. DIRECC. IRUN) (LEGAL. V-01-03023)</strong><ul class=\'pl-3\'><li>Nºexp.:&nbsp;VDP-A-2012-0830</li><li>P.vertido:&nbsp;PV-1</li><li>Id.flujo:&nbsp;F1</li></ul></span>',
    'start': '1542495600000',
    'class': ' vertido vigilancia',
    'end': '1542495600001',
    'url': 'javascript:actions(47216)'
}, {
    'id': '47475',
    'title': '<span><strong>REVISION DE LA AUTORIZACION DE VERTIDO DE AGUAS RESIDUALES DEL POLIGONO INDUSTRIAL DE GOIAIN Y DE LA POBLACION DE LEGUTIO, T.M. DE LEGUTIO. (Rev. 2008-S-0043)</strong><ul class=\'pl-3\'><li>Nºexp.:&nbsp;RAV-A-2014-0030</li><li>P.vertido:&nbsp;PV1</li><li>Id.flujo:&nbsp;F1</li><li>Requiere muestra&nbsp;</li></ul></span>',
    'start': '1543359600000',
    'class': ' vertido muestreo',
    'end': '1543359600001',
    'url': 'javascript:actions(47475)'
}, {
    'id': '49207',
    'title': '<span><strong>REVISION DE AUTORIZACIÓN DE VERTIDO DE AGUA RESIDUALES PROCEDENTES DE CAMPO DE TIRO LAS COLINAS EN ZUAZO DE VITORIA, T.M. VITORIA-GASTEIZ (ALAVA) (REV. 2005-S-0107)</strong><ul class=\'pl-3\'><li>Nºexp.:&nbsp;RAV-A-2013-0029</li><li>P.vertido:&nbsp;PV1</li><li>Id.flujo:&nbsp;F1</li></ul></span>',
    'start': '1543359600000',
    'class': ' vertido vigilancia',
    'end': '1543359600001',
    'url': 'javascript:actions(49207)'
}, {
    'id': '49200',
    'title': '<span><strong>REVISIÓN DE LA AUTORIZACIÓN DE VERTIDO DE AGUAS RESIDUALES PROCEDENTES DE LA ACTIVIDAD DE LA EMPRESA FRIGORÍFICOS INDUSTRIALES ALAVESES, UBICADA EN DURANA, T.M. DE ARRAZUA-UBARRUNDIA (Rev.2005-S-34)</strong><ul class=\'pl-3\'><li>Nºexp.:&nbsp;RAV-A-2012-0297</li><li>P.vertido:&nbsp;PV1</li><li>Id.flujo:&nbsp;F1</li></ul></span>',
    'start': '1542150000000',
    'class': ' vertido vigilancia',
    'end': '1542150000001',
    'url': 'javascript:actions(49200)'
}, {
    'id': '47464',
    'title': '<span><strong>AUTORIZACION DE VERTIDO DE AGUAS RESIDUALES PROCEDENTES DE LA LOCALIDAD DE URBINA (2 FOSAS)</strong><ul class=\'pl-3\'><li>Nºexp.:&nbsp;VDP-A-2012-0781</li><li>P.vertido:&nbsp;PV1</li><li>Id.flujo:&nbsp;F1</li></ul></span>',
    'start': '1542841200000',
    'class': ' vertido vigilancia',
    'end': '1542841200001',
    'url': 'javascript:actions(47464)'
}, {
    'id': '48795',
    'title': '<span><strong>AUTORIZACIÓN (LEGALIZACIÓN) DE VERTIDO DE AGUAS RESIDUALES PROCEDENTE DEL CLUB NÁUTICO DE VITORIA (LEGAL.EXP. V-01-05021)</strong><ul class=\'pl-3\'><li>Nºexp.:&nbsp;VDP-A-2012-0343</li><li>P.vertido:&nbsp;PV1</li><li>Id.flujo:&nbsp;F1</li></ul></span>',
    'start': '1543446000000',
    'class': ' vertido vigilancia',
    'end': '1543446000001',
    'url': 'javascript:actions(48795)'
}, {
    'id': '51469',
    'title': '<span><strong>REVISION DE AUTORIZACION DE VERTIDO DE AGUAS RESIDUALES PROCEDENTES DEL BARRIO DE NAFARRATE, EN LA LOCALIDAD DE URRUNAGA, T.M. DE LEGUTIANO (ARABA) (Rev. 2010-S-0285)</strong><ul class=\'pl-3\'><li>Nºexp.:&nbsp;RAV-A-2016-0054</li><li>P.vertido:&nbsp;PV1</li><li>Id.flujo:&nbsp;F1</li><li>Requiere muestra&nbsp;</li></ul></span>',
    'start': '1543273200000',
    'class': ' vertido muestreo',
    'end': '1543273200001',
    'url': 'javascript:actions(51469)'
}, {
    'id': '49164',
    'title': '<span><strong>AUTORIZACIÓN DE VERTIDO DE AGUAS RESIDUALES PROCEDENTES DE LA POBLACION DE AMARITA, T.M. DE VITORIA-GASTEIZ (ALAVA).</strong><ul class=\'pl-3\'><li>Nºexp.:&nbsp;VDP-A-2012-0268</li><li>P.vertido:&nbsp;PV1</li><li>Id.flujo:&nbsp;F1</li></ul></span>',
    'start': '1541372400000',
    'class': ' vertido vigilancia',
    'end': '1541372400001',
    'url': 'javascript:actions(49164)'
}, {
    'id': '47488',
    'title': '<span><strong>REVISION DE AUTORIZACION DE VERTIDO DE AGUAS RESIDUALES PROCEDENTES DE LA POBLACION DE GAMARRA MENOR, T.M. DE VITORIA-GASTEIZ (ARABA) (Rev. 2013-S-0095)</strong><ul class=\'pl-3\'><li>Nºexp.:&nbsp;RAV-A-2016-0055</li><li>P.vertido:&nbsp;PV1</li><li>Id.flujo:&nbsp;F1</li></ul></span>',
    'start': '1543446000000',
    'class': ' vertido vigilancia',
    'end': '1543446000001',
    'url': 'javascript:actions(47488)'
}, {
    'id': '49143',
    'title': '<span><strong>AUTORIZACION DE VERTIDO DE AGUAS RESIDUALES PROCEDENTES DE UNA GRANJA EXPERIMENTAL DE AVES EN LA LOCALIDAD DE CASTILLO, EN EL T.M. DE VITORIA-GASTEIZ (ALAVA).</strong><ul class=\'pl-3\'><li>Nºexp.:&nbsp;VDP-A-2012-0379</li><li>P.vertido:&nbsp;PV1</li><li>Id.flujo:&nbsp;F1</li></ul></span>',
    'start': '1542495600000',
    'class': ' vertido vigilancia',
    'end': '1542495600001',
    'url': 'javascript:actions(49143)'
}];

var monthMap = {
    'Enero': 1,
    'Febrero': 2,
    'Marzo': 3,
    'Abril': 4,
    'Mayo': 5,
    'Junio': 6,
    'Julio': 7,
    'Agosto': 8,
    'Septiembre': 9,
    'Octubre': 10,
    'Noviembre': 11,
    'Diciembre': 12
};
var calendarUtils = {
    leapYear: (year) => {
        if ((year % 4 == 0) && ((year % 100 != 0) || (year % 400 == 0))) {
            return true;
        }
        return false;
    },
    countWeeks: (calendar, year) => {
        var isLeapYear = calendarUtils.leapYear(year);
        var startsAtSunday = () => {
            let tmpDate = new Date(calendar.rup_calendar('getYear') - 1, 0, 1, 0, 0, 0);
            return tmpDate.getDay() === 7 ? true : false;
        };

        if (isLeapYear && startsAtSunday()) {
            //El año anterior tenía 53 semanas
            return 53;
        } else {
            return 52;
        }
    }
};

describe('Test rup_calendar (default)', () => {
    var cal;
    beforeAll((done) => {
        testutils.loadCss(done);
    });
    beforeEach((done) => {
        createCalendar(opts1, () => {
            cal = $('#calendar');
            done();
        });
    });
    afterEach(() => {
        if (cal.data('cal') !== undefined) {
            cal.rup_calendar('destroy');
        }
        $('#content').html('');
        $('#content').nextAll().remove();
    });
    describe(' > Métodos públicos', () => {
        describe(' > Método navigate', () => {
            describe(' > navigate por defecto', () => {
                beforeEach((done) => {
                    cal.on('afterRender', () => {
                        cal.off('afterRender');
                        cal.rup_calendar('navigate');
                    });
                    cal.rup_calendar('navigate', 'prev');
                    done();
                });
                it(' > el view debe estar establecido a una vista actual', () => {
                    expect(cal.rup_calendar('isToday')).toBeTruthy();
                });
            });
            describe(' > navigate erróneo', () => {
                it(' > El método debe dar error', () => {
                    expect(() => {
                        cal.rup_calendar('navigate', 'randomData');
                    }).toThrowError('Parámetro inválido');
                });
            });
            describe(' > navigate prev/today/next', () => {
                describe(' > navigate prev', () => {
                    describe(' > año', () => {
                        var initialYear;
                        beforeEach((done) => {
                            cal.on('afterRender', () => {
                                cal.off('afterRender');
                                initialYear = cal.rup_calendar('getYear');
                                cal.rup_calendar('navigate', 'prev');
                                done();
                            });
                            cal.rup_calendar('setView', 'year');
                        });
                        it(' > Debe haber retrocedido un año', () => {
                            expect(cal.rup_calendar('getYear') + 1).toBe(initialYear);
                        });
                    });
                    describe(' > mes', () => {
                        var initialMonth;
                        beforeEach((done) => {
                            cal.on('afterRender', () => {
                                cal.off('afterRender');
                                initialMonth = cal.rup_calendar('getMonth');
                                cal.rup_calendar('navigate', 'prev');
                                done();
                            });
                            cal.rup_calendar('setView', 'month');
                        });
                        it(' > Debe haber retrocedido un mes', () => {
                            if (initialMonth === 1) {
                                // Antes del 1 (enero) va el 12 (diciembre)
                                expect(monthMap[cal.rup_calendar('getMonth')]).toBe(12);
                            } else {
                                let mnth = monthMap[cal.rup_calendar('getMonth')] + 1;
                                //Si es mayor que 12 es un año nuevo
                                if (mnth > 12) {
                                    mnth = mnth - 12;
                                }
                                expect(mnth)
                                    .toBe(monthMap[initialMonth]);
                            }
                        });
                    });
                    describe(' > semana', () => {
                        var initialWeek;
                        beforeEach((done) => {
                            cal.on('afterRender', () => {
                                cal.off('afterRender');
                                initialWeek = cal.rup_calendar('getWeek');
                                cal.rup_calendar('navigate', 'prev');    
                                done();
                            });
                            cal.rup_calendar('setView', 'week');
                        });
                        it(' > Debe haber retrocedido una semana', () => {
                            // Un año tiene 52 semanas salvo si es bisiesto y
                            // empieza en domingo entonces serían 53
                            if (initialWeek === 1) {
                                expect(cal.rup_calendar('getWeek'))
                                    .toBe(calendarUtils.countWeeks(cal, cal.rup_calendar('getYear') - 1));
                            } else {
                                //Si es mayor a 52 es un año posterior.
                                let wkk = cal.rup_calendar('getWeek') + 1;
                                if (wkk > 52) {
                                    wkk = wkk - 52;
                                }
                                expect(wkk).toBe(initialWeek);
                            }
                        });
                    });
                    describe(' > día', () => {
                        var initialDay;
                        beforeEach((done) => {
                            cal.on('afterRender', () => {
                                cal.off('afterRender');
                                initialDay = cal.rup_calendar('getStartDate').getDate();
                                cal.rup_calendar('navigate', 'prev');
                                done();
                            });
                            cal.rup_calendar('setView', 'day');
                        });
                        it(' > Debe haber retrocedido un día', () => {
                            var maxmonth;
                            if (initialDay === 1) {
                                let month = monthMap[cal.rup_calendar('getMonth')];
                                // Si hay cambio de mes ANTERIOR
                                if (month % 2 === 0) {
                                    // El mes es par
                                    if (month === 2) {
                                        // Si era 1 de Marzo
                                        if (calendarUtils.leapYear(cal.rup_calendar('getYear') - 1)) {
                                            maxmonth = 29;
                                            expect(cal.rup_calendar('getStartDate').getDate()).toBe(29);
                                        } else {
                                            maxmonth = 28;
                                            expect(cal.rup_calendar('getStartDate').getDate()).toBe(28);
                                        }
                                    } else {
                                        // Si no es febrero el mes anterior tiene 30 días
                                        maxmonth = 30;
                                        expect(cal.rup_calendar('getStartDate').getDate()).toBe(30);
                                    }
                                } else {
                                    // Los meses impares tienen 31 días
                                    maxmonth = 31;
                                    expect(cal.rup_calendar('getStartDate').getDate()).toBe(31);
                                }
                            } else {
                                if (initialDay === 1) {
                                    expect(cal.rup_calendar('getStartDate').getDate()).toBe(maxmonth);
                                } else {
                                    expect(cal.rup_calendar('getStartDate').getDate() + 1).toBe(initialDay);
                                }
                            }
                        });
                    });
                });
                describe(' > navigate today', () => {
                    describe(' > año', () => {
                        beforeEach((done) => {
                            cal.on('afterRender', () => {
                                cal.off('afterRender');
                                cal.on('afterRender', () => {
                                    cal.off('afterRender');
                                    cal.rup_calendar('navigate', 'today');
                                    done();
                                });
                                cal.rup_calendar('navigate', 'prev');
                            });
                            cal.rup_calendar('setView', 'year');
                        });
                        it(' > La vista debe contener el día actual', () => {
                            expect(cal.rup_calendar('isToday')).toBeTruthy();
                        });
                    });
                    describe(' > mes', () => {
                        beforeEach((done) => {
                            cal.on('afterRender', () => {
                                cal.off('afterRender');
                                cal.on('afterRender', () => {
                                    cal.off('afterRender');
                                    cal.rup_calendar('navigate', 'today');
                                    done();
                                });
                                cal.rup_calendar('navigate', 'prev');
                            });
                            cal.rup_calendar('setView', 'month');
                        });
                        it(' > La vista debe contener el día actual', () => {
                            expect(cal.rup_calendar('isToday')).toBeTruthy();
                        });
                    });
                    describe(' > semana', () => {
                        beforeEach((done) => {
                            cal.on('afterRender', () => {
                                cal.off('afterRender');
                                cal.on('afterRender', () => {
                                    cal.off('afterRender');
                                    cal.rup_calendar('navigate', 'today');
                                    done();
                                });
                                cal.rup_calendar('navigate', 'prev');
                            });
                            cal.rup_calendar('setView', 'week');
                        });
                        it(' > La vista debe contener el día actual', () => {
                            expect(cal.rup_calendar('isToday')).toBeTruthy();
                        });
                    });
                    describe(' > día', () => {
                        beforeEach((done) => {
                            cal.on('afterRender', () => {
                                cal.off('afterRender');
                                cal.on('afterRender', () => {
                                    cal.off('afterRender');
                                    cal.rup_calendar('navigate', 'today');
                                    done();
                                });
                                cal.rup_calendar('navigate', 'prev');
                            });
                            cal.rup_calendar('setView', 'day');
                        });
                        it(' > La vista debe contener el día actual', () => {
                            expect(cal.rup_calendar('isToday')).toBeTruthy();
                        });
                    });
                });
                describe(' > navigate next', () => {
                    describe(' > año', () => {
                        var initialYear;
                        beforeEach((done) => {
                            initialYear = cal.rup_calendar('getYear');
                            cal.on('afterRender', () => {
                                cal.off('afterRender');
                                cal.rup_calendar('navigate', 'next');
                                done();
                            });
                            cal.rup_calendar('setView', 'year');
                        });
                        it(' > La vista debe mostrar el año siguiente', () => {
                            expect(cal.rup_calendar('getYear') - 1).toBe(initialYear);
                        });
                    });
                    describe(' > mes', () => {
                        var initialMonth;
                        beforeEach((done) => {
                            initialMonth = cal.rup_calendar('getMonth');
                            cal.on('afterRender', () => {
                                cal.off('afterRender');
                                cal.rup_calendar('navigate', 'next');
                                done();
                            });
                            cal.rup_calendar('setView', 'month');
                        });
                        it(' > La vista debe mostrar el año siguiente', () => {
                            if (monthMap[initialMonth] === 12) {
                                //Tras el 12(diciembre) viene el 1 (enero)
                                expect(monthMap[cal.rup_calendar('getMonth')]).toBe(1);
                            } else {
                                expect(monthMap[cal.rup_calendar('getMonth')] - 1)
                                    .toBe(monthMap[initialMonth]);
                            }
                        });
                    });
                    describe(' > semana', () => {
                        var initialWeek;
                        beforeEach((done) => {
                            cal.on('afterRender', () => {
                                cal.off('afterRender');
                                initialWeek = cal.rup_calendar('getWeek');
                                cal.rup_calendar('navigate', 'next');
                                done();
                            });
                            cal.rup_calendar('setView', 'week');
                        });
                        it(' > Debe mostrarse la semana siguiente', () => {
                            //Obtenemos el número de semanas del año actual
                            let weekNum = calendarUtils.countWeeks(cal, cal.rup_calendar('getYear'));
                            // Si era la última semana del año el next sacara la vista de la semana
                            // 1 del siguiente año
                            if (initialWeek === weekNum) {
                                expect(cal.rup_calendar('getWeek')).toBe(1);
                            } else {
                                expect(cal.rup_calendar('getWeek') - 1).toBe(initialWeek);
                            }
                        });
                    });
                    describe(' > día', () => {
                        var initialDay, initialMonth, initialYear;
                        beforeEach((done) => {
                            cal.on('afterRender', () => {
                                cal.off('afterRender');
                                initialYear = cal.rup_calendar('getYear');
                                initialMonth = cal.rup_calendar('getMonth');
                                initialDay = cal.rup_calendar('getStartDate').getDate();
                                cal.rup_calendar('navigate', 'next');
                                done();
                            });
                            cal.rup_calendar('setView', 'day');
                        });
                        it(' > Debe mostrar la vista del siguiente día', () => {
                            // Calculamos el número de días del mes inicial
                            var maxDay = 0;
                            initialMonth = monthMap[initialMonth];
                            if (initialMonth % 2 === 0) {
                                if (initialMonth === 2) {
                                    if (calendarUtils.leapYear(initialYear)) {
                                        maxDay = 29;
                                    } else {
                                        maxDay = 28;
                                    }
                                } else {
                                    maxDay = 30;
                                }
                            } else {
                                maxDay = 31;
                            }

                            if (initialDay === maxDay) {
                                expect(cal.rup_calendar('getStartDate').getDate()).toBe(1);
                            } else {
                                expect(cal.rup_calendar('getStartDate').getDate() - 1).toBe(initialDay);
                            }
                        });
                    });
                });
            });
        });
        describe(' > Métodos setView y getView', () => {
            describe(' > setView y getView por defecto', () => {
                beforeEach((done) => {
                    cal.on('afterRender', () => {
                        cal.off('afterRender');
                        cal.rup_calendar('setView');
                        done();
                    });
                    cal.rup_calendar('setView', 'week');
                });
                it(' > Debe establecer la vista por defecto (month)', () => {
                    expect(cal.rup_calendar('getView')).toBe('month');
                });
            });
            describe(' > setView y getView erróneo', () => {
                it(' > Debe lanzar un error si recibe parámetros incorrectos', () => {
                    expect(() => {
                        cal.rup_calendar('setView', 'randomData');
                    }).toThrowError('Parámetro inválido');
                });
            });
            describe(' > setView y getView año', () => {
                beforeEach((done) => {
                    cal.on('afterRender', () => {
                        cal.off('afterRender');
                        cal.rup_calendar('setView', 'year');
                        done();
                    });
                    cal.rup_calendar('setView', 'week');
                });
                it(' > Debe establecer la vista anual', () => {
                    expect(cal.rup_calendar('getView')).toBe('year');
                });
            });
            describe(' > setView y getView mes', () => {
                beforeEach((done) => {
                    cal.on('afterRender', () => {
                        cal.off('afterRender');
                        cal.rup_calendar('setView', 'month');
                        done();
                    });
                    cal.rup_calendar('setView', 'week');
                });
                it(' > Debe establecer la vista mensual', () => {
                    expect(cal.rup_calendar('getView')).toBe('month');
                });
            });
            describe(' > setView y getView semana', () => {
                beforeEach((done) => {
                    cal.on('afterRender', () => {
                        cal.off('afterRender');
                        cal.rup_calendar('setView', 'week');
                        done();
                    });
                    cal.rup_calendar('setView', 'year');
                });
                it(' > Debe establecer la vista semanal', () => {
                    expect(cal.rup_calendar('getView')).toBe('week');
                });
            });
            describe(' > setView y getView día', () => {
                beforeEach((done) => {
                    cal.on('afterRender', () => {
                        cal.off('afterRender');
                        cal.rup_calendar('setView', 'day');
                        done();
                    });
                    cal.rup_calendar('setView', 'week');
                });
                it(' > Debe establecer la vista diaria', () => {
                    expect(cal.rup_calendar('getView')).toBe('day');
                });
            });
        });
        describe(' > Método isToday', () => {
            describe(' > Funciona cuando es true', () => {
                it(' > Segun se genera debería ser visible el today', () => {
                    expect(cal.rup_calendar('isToday')).toBeTruthy();
                });
            });
            describe(' > Funciona cuando es false', () => {
                beforeEach((done) => {
                    cal.rup_calendar('navigate', 'next');
                    done();
                });
                it(' > Si nos movemos fuera del rango debe dar false', () => {
                    expect(cal.rup_calendar('isToday')).toBeFalsy();
                });
            });
        });
        describe(' > Método getTitle', () => {
            beforeEach((done) => {
                cal.on('afterViewLoad', () => {
                    done();
                });
                cal.rup_calendar('navigate', new Date(2018, 5, 2, 0, 0, 0));
            });
            it(' > El titulo devuelto debe ser igual al del DOM', () => {
                expect(cal.rup_calendar('getTitle')).toBe($('.page-header > h3').text());
            });
        });
        describe(' > Método getYear', () => {
            beforeEach((done) => {
                cal.rup_calendar('navigate', new Date(2000, 1, 20, 0, 0, 0));
                done();
            });
            it(' > Debe devolver el año correctamente', () => {
                expect(cal.rup_calendar('getYear')).toBe(2000);
            });
        });
        describe(' > Método getMonth', () => {
            beforeEach((done) => {
                cal.rup_calendar('navigate', new Date(2000, 1, 20, 0, 0, 0));
                done();
            });
            it(' > Debe devolver el mes correctamente', () => {
                expect(cal.rup_calendar('getMonth')).toBe('Febrero');
            });
        });
        describe(' > Método getDay', () => {
            beforeEach((done) => {
                cal.on('afterRender', () => {
                    cal.off('afterRender');
                    cal.on('afterRender');
                    cal.rup_calendar('navigate', new Date(2000, 1, 20, 0, 0, 0));
                    done();
                });
                cal.rup_calendar('setView', 'day');
            });
            it(' > Debe devolver el día correctamente', () => {
                expect(cal.rup_calendar('getDay')).toBe('Domingo');
            });
        });
        describe(' > Método getStartDate', () => {
            beforeEach((done) => {
                cal.on('afterRender', () => {
                    cal.off('afterRender');
                    cal.rup_calendar('navigate', new Date(2018, 0, 20, 0, 0, 0));
                    done();
                });
                cal.rup_calendar('setView', 'year');
            });
            it(' > Debe devolver la startDate apropiada', () => {
                expect(cal.rup_calendar('getStartDate').toLocaleDateString())
                    .toBe(new Date(2018, 0, 1, 0, 0, 0).toLocaleDateString());
            });
        });
        describe(' > Método getEndDate', () => {
            beforeEach((done) => {
                cal.on('afterRender', () => {
                    cal.off('afterRender');
                    cal.rup_calendar('navigate', new Date(2018, 0, 20, 0, 0, 0));
                    done();
                });
                cal.rup_calendar('setView', 'year');
            });
            it(' > Debe devolver la endDate apropiada', () => {
                expect(cal.rup_calendar('getEndDate').toLocaleDateString())
                    .toBe(new Date(2019, 0, 1, 0, 0, 0).toLocaleDateString());
            });
        });
        describe(' > Método getEventsBetween', () => {
            it(' > Debe devolver los eventos entre las fechas especificadas', () => {
                expect(cal.rup_calendar('getEventsBetween',
                    new Date(1541890799999),
                    new Date(1541890800001)))
                    .toEqual([{
                        'id': '48605',
                        'title': '<span><strong>AUTORIZACIÓN DE VERTIDO DE AGUAS RESIDUALES PROCEDENTES DE ESTACIÓN DE SERVICIO Nº 7338 EN ARKAUTE, T.M .DE VITORIA-GASTEIZ</strong><ul class=\'pl-3\'><li>Nºexp.:&nbsp;VDP-A-2012-0382</li><li>P.vertido:&nbsp;PV1</li><li>Id.flujo:&nbsp;F1</li><li>Requiere muestra&nbsp;</li><li><i class=\'mdi mdi-check pr-1\' aria-hidden=\'true\'></i>COMPLETADA</li></ul></span>',
                        'start': '1541890800000',
                        'class': ' vertido muestreo completada',
                        'end': '1541890800001',
                        'url': 'javascript:actions(48605)'
                    },
                    {
                        'id': '49203',
                        'title': '<span><strong>AUTORIZACION DE VERTIDO DE AGUAS RESIDUALES EN ESTACION DE SERVICIO (FECALES, HIDROCARBUROS Y LAVADO DE VEHICULOS EN OTXANDIO</strong><ul class=\'pl-3\'><li>Nºexp.:&nbsp;VDP-A-2012-0164</li><li>P.vertido:&nbsp;PV1</li><li>Id.flujo:&nbsp;F1</li></ul></span>',
                        'start': '1541890800000',
                        'class': ' vertido vigilancia',
                        'end': '1541890800001',
                        'url': 'javascript:actions(49203)'
                    }
                    ]);
            });
        });
        describe(' > Método option', () => {
            //Con _render / mouseover
            beforeEach((done) => {
                cal.on('afterRender');
                cal.rup_calendar('option', 'weekbox', true);
                done();
            });
            it(' > El cambio en la option debe afectar a la funcionalidad del componente', () => {
                $('.cal-row-fluid').mouseover();
                expect($('#cal-week-box').is(':visible')).toBeTruthy();
            });
            it(' > Se debe poder recuperar el valor', () => {
                expect(cal.rup_calendar('option', 'weekbox')).toBeTruthy();
            });
        });
        describe(' > Método refresh', () => {
            beforeEach((done) => {
                EVENTS.push({
                    'id': '48506',
                    'title': '<span><strong>AUTORIZACIÓN DE VERTIDO DE AGUAS RESIDUALES PROCEDENTES DE ESTACIÓN DE SERVICIO Nº 7338 EN ARKAUTE, T.M .DE VITORIA-GASTEIZ</strong><ul class=\'pl-3\'><li>Nºexp.:&nbsp;VDP-A-2012-0382</li><li>P.vertido:&nbsp;PV1</li><li>Id.flujo:&nbsp;F1</li><li>Requiere muestra&nbsp;</li><li><i class=\'mdi mdi-check pr-1\' aria-hidden=\'true\'></i>COMPLETADA</li></ul></span>',
                    'start': '1541890800000',
                    'class': ' vertido muestreo completada',
                    'end': '1541890800000',
                    'url': 'javascript:actions(48506)'
                });
                cal.on('afterRefresh');
                cal.rup_calendar('refresh');
                done();
            });
            afterEach(() => {
                EVENTS = EVENTS.filter(e => e.id != '48506');
            });
            it(' > Debe haber actualizado los events', () => {
                var evts = cal.rup_calendar('getEventsBetween',
                    new Date(1541890799999),
                    new Date(1541890800001));
                expect(evts.length).toBe(3);
            });
        });
        describe(' > Método destroy', () => {
            beforeEach((done) => {
                cal.on('afterDestroy');
                cal.rup_calendar('destroy');
                done();
            });
            it(' > Debe eliminar la estructura del calendario.', () => {
                expect(cal.children().length).toBe(0);
            });
            it(' > Debe dar error al intentar ejecutar los métodos', () => {
                expect(() => {
                    cal.rup_calendar('getTitle');
                }).toThrowError();
            });
        });
        describe(' > Método showCell', () => {
            beforeEach((done) => {
                cal.on('afterViewLoad', () => {
                    cal.on('afterShowCell', () => {
                        done();
                    });
                    cal.rup_calendar('showCell', new Date(1543618800000));
                });
                cal.rup_calendar('navigate', new Date(1543618800000));
            });
            it(' > Deben mostrarse los eventos de la celda seleccionada', () => {
                expect($('#cal-slide-box').css('display')).toBe('block');
            });
        });
        describe(' > Método hideCell', () => {
            beforeEach((done) => {
                cal.on('afterViewLoad', () => {
                    cal.on('afterShowCell', () => {
                        cal.on('afterHideCell');
                        cal.rup_calendar('hideCells');
                        done();
                    });
                    cal.rup_calendar('showCell', new Date(1543618800000));
                });
                cal.rup_calendar('navigate', new Date(1543618800000));
            });
            it(' > Deben ocultarse los eventos desplegados', () => {
                expect($('#cal-slide-box').css('display')).toBe('none');
            });
        });
    });
});

describe('Test rup_calendar (alternative)', () => {
    var cal2;
    beforeAll((done) => {
        testutils.loadCss(done);
    });
    beforeEach((done) => {
        createCalendar(opts2, () => {
            cal2 = $('#calendar');
            done();
        });
    });
    afterEach(() => {
        if (cal2.data('cal') !== undefined) {
            cal2.rup_calendar('destroy');
        }
        $('#content').html('');
        $('#content').nextAll().remove();
    });
    describe(' > Métodos públicos', () => {
        describe(' > Método navigate', () => {
            describe(' > navigate por defecto', () => {
                beforeEach((done) => {
                    cal2.on('afterRender', () => {
                        cal2.off('afterRender');
                        cal2.on('afterRender');
                        cal2.rup_calendar('navigate');
                        done();
                    });
                    cal2.rup_calendar('navigate', 'prev');
                });
                it(' > el view debe estar establecido a una vista actual', () => {
                    expect(cal2.rup_calendar('isToday')).toBeTruthy();
                });
            });
            describe(' > navigate erróneo', () => {
                it(' > El método debe dar error', () => {
                    expect(() => {
                        cal2.rup_calendar('navigate', 'randomData');
                    }).toThrowError('Parámetro inválido');
                });
            });
            describe(' > navigate prev/today/next', () => {
                describe(' > navigate prev', () => {
                    describe(' > año', () => {
                        var initialYear;
                        beforeEach((done) => {
                            cal2.on('afterRender', () => {
                                cal2.off('afterRender');
                                cal2.on('afterRender', () => {
                                    cal2.off('afterRender');
                                    cal2.on('afterRender');
                                    initialYear = cal2.rup_calendar('getYear');
                                    cal2.rup_calendar('navigate', 'prev');
                                    done();
                                });
                                cal2.rup_calendar('navigate', new Date(2020, 0, 1, 0, 0, 0));
                            });
                            cal2.rup_calendar('setView', 'year');
                        });
                        it(' > Debe haber retrocedido un año', () => {
                            expect(cal2.rup_calendar('getYear') + 1).toBe(initialYear);
                        });
                    });
                    describe(' > mes', () => {
                        var initialMonth;
                        beforeEach((done) => {
                            cal2.on('afterRender', () => {
                                cal2.off('afterRender');
                                cal2.on('afterRender');
                                initialMonth = cal2.rup_calendar('getMonth');
                                cal2.rup_calendar('navigate', 'prev');
                                done();
                            });
                            cal2.rup_calendar('setView', 'month');
                        });
                        it(' > Debe haber retrocedido un mes', () => {
                            if (initialMonth === 1) {
                                // Antes del 1 (enero) va el 12 (diciembre)
                                expect(monthMap[cal2.rup_calendar('getMonth')]).toBe(12);
                            } else {
                                let mnth = monthMap[cal2.rup_calendar('getMonth')] + 1;
                                //Si es mayor que 12 es un año nuevo
                                if (mnth > 12) {
                                    mnth = mnth - 12;
                                }
                                expect(mnth)
                                    .toBe(monthMap[initialMonth]);
                            }
                        });
                    });
                    describe(' > semana', () => {
                        var initialWeek;
                        beforeEach((done) => {
                            cal2.on('afterRender', () => {
                                cal2.off('afterRender');
                                cal2.on('afterRender');
                                initialWeek = cal2.rup_calendar('getWeek');
                                cal2.rup_calendar('navigate', 'prev');
                                done();
                            });
                            cal2.rup_calendar('setView', 'week');
                        });
                        it(' > Debe haber retrocedido una semana', () => {
                            // Un año tiene 52 semanas salvo si es bisiesto y
                            // empieza en domingo entonces serían 53
                            if (initialWeek === 1) {
                                expect(cal2.rup_calendar('getWeek'))
                                    .toBe(calendarUtils.countWeeks(cal2, cal2.rup_calendar('getYear') - 1));
                            } else {
                                //Si es mayor a 52 es un año posterior.
                                let wkk = cal2.rup_calendar('getWeek') + 1;
                                if (wkk > 52) {
                                    wkk = wkk - 52;
                                }
                                expect(wkk).toBe(initialWeek);
                            }
                        });
                    });
                    describe(' > día', () => {
                        var initialDay;
                        beforeEach((done) => {
                            cal2.on('afterRender', () => {
                                cal2.off('afterRender');
                                cal2.on('afterRender');
                                initialDay = cal2.rup_calendar('getStartDate').getDate();
                                cal2.rup_calendar('navigate', 'prev');
                                done();
                            });
                            cal2.rup_calendar('setView', 'day');
                        });
                        it(' > Debe haber retrocedido un día', () => {
                            if (initialDay === 1) {
                                let month = monthMap[cal2.rup_calendar('getMonth')];
                                // Si hay cambio de mes
                                
                                if (month % 2 === 0) {
                                    // El mes es par
                                    if (month === 2) {
                                        // Si era 1 de Marzo
                                        if (calendarUtils.leapYear(cal2.rup_calendar('getYear') - 1)) {
                                            expect(cal2.rup_calendar('getStartDate').getDate()).toBe(29);
                                        } else {
                                            expect(cal2.rup_calendar('getStartDate').getDate()).toBe(28);
                                        }
                                    } else {
                                        // Si no es febrero el mes anterior tiene 30 días
                                        expect(cal2.rup_calendar('getStartDate').getDate()).toBe(30);
                                    }
                                } else {
                                    // Los meses impares tienen 31 días
                                    expect(cal2.rup_calendar('getStartDate').getDate()).toBe(31);
                                }
                            } else {
                                expect(cal2.rup_calendar('getStartDate').getDate() + 1).toBe(initialDay);
                            }
                        });
                    });
                });
                describe(' > navigate today', () => {
                    describe(' > año', () => {
                        beforeEach((done) => {
                            cal2.on('afterRender', () => {
                                cal2.off('afterRender');
                                cal2.on('afterRender', () => {
                                    cal2.off('afterRender');
                                    cal2.on('afterRender');
                                    cal2.rup_calendar('navigate', 'today');
                                    done();
                                });
                                cal2.rup_calendar('navigate', 'prev');
                            });
                            cal2.rup_calendar('setView', 'year');
                        });
                        it(' > La vista debe contener el día actual', () => {
                            expect(cal2.rup_calendar('isToday')).toBeTruthy();
                        });
                    });
                    describe(' > mes', () => {
                        beforeEach((done) => {
                            cal2.on('afterRender', () => {
                                cal2.off('afterRender');
                                cal2.on('afterRender', () => {
                                    cal2.off('afterRender');
                                    cal2.on('afterRender');
                                    cal2.rup_calendar('navigate', 'today');
                                    done();
                                });
                                cal2.rup_calendar('navigate', 'prev');
                            });
                            cal2.rup_calendar('setView', 'month');
                        });
                        it(' > La vista debe contener el día actual', () => {
                            expect(cal2.rup_calendar('isToday')).toBeTruthy();
                        });
                    });
                    describe(' > semana', () => {
                        beforeEach((done) => {
                            cal2.on('afterRender', () => {
                                cal2.off('afterRender');
                                cal2.on('afterRender', () => {
                                    cal2.off('afterRender');
                                    cal2.on('afterRender');
                                    cal2.rup_calendar('navigate', 'today');
                                    done();
                                });
                                cal2.rup_calendar('navigate', 'prev');
                            });
                            cal2.rup_calendar('setView', 'week');
                        });
                        it(' > La vista debe contener el día actual', () => {
                            expect(cal2.rup_calendar('isToday')).toBeTruthy();
                        });
                    });
                    describe(' > día', () => {
                        beforeEach((done) => {
                            cal2.on('afterRender', () => {
                                cal2.off('afterRender');
                                cal2.on('afterRender', () => {
                                    cal2.off('afterRender');
                                    cal2.on('afterRender');
                                    cal2.rup_calendar('navigate', 'today');
                                    done();
                                });
                                cal2.rup_calendar('navigate', 'prev');
                            });
                            cal2.rup_calendar('setView', 'day');
                        });
                        it(' > La vista debe contener el día actual', () => {
                            expect(cal2.rup_calendar('isToday')).toBeTruthy();
                        });
                    });
                });
                describe(' > navigate next', () => {
                    describe(' > año', () => {
                        var initialYear;
                        beforeEach((done) => {
                            cal2.on('afterRender', () => {
                                cal2.off('afterRender');
                                cal2.on('afterRender', () => {
                                    cal2.off('afterRender');
                                    cal2.on('afterRender');
                                    initialYear = cal2.rup_calendar('getYear');
                                    cal2.rup_calendar('navigate', 'next');
                                    done();
                                });
                                cal2.rup_calendar('navigate', new Date(2019, 0, 2, 0, 0, 0));
                            });
                            cal2.rup_calendar('setView', 'year');
                        });
                        it(' > La vista debe mostrar el año siguiente', () => {
                            expect(cal2.rup_calendar('getYear') - 1).toBe(initialYear);
                        });
                    });
                    describe(' > mes', () => {
                        var initialMonth;
                        beforeEach((done) => {
                            initialMonth = cal2.rup_calendar('getMonth');
                            cal2.on('afterRender', () => {
                                cal2.off('afterRender');
                                cal2.on('afterRender');
                                cal2.rup_calendar('navigate', 'next');
                                done();
                            });
                            cal2.rup_calendar('setView', 'month');
                        });
                        it(' > La vista debe mostrar el año siguiente', () => {
                            if (monthMap[initialMonth] === 12) {
                                //Tras el 12(diciembre) viene el 1 (enero)
                                expect(monthMap[cal2.rup_calendar('getMonth')]).toBe(1);
                            } else {
                                expect(monthMap[cal2.rup_calendar('getMonth')] - 1)
                                    .toBe(monthMap[initialMonth]);
                            }
                        });
                    });
                    describe(' > semana', () => {
                        var initialWeek;
                        beforeEach((done) => {
                            cal2.on('afterRender', () => {
                                cal2.off('afterRender');
                                cal2.on('afterRender');
                                initialWeek = cal2.rup_calendar('getWeek');
                                cal2.rup_calendar('navigate', 'next');
                                done();
                            });
                            cal2.rup_calendar('setView', 'week');
                        });
                        it(' > Debe mostrarse la semana siguiente', () => {
                            //Obtenemos el número de semanas del año actual
                            let weekNum = calendarUtils.countWeeks(cal2, cal2.rup_calendar('getYear'));
                            // Si era la última semana del año el next sacara la vista de la semana
                            // 1 del siguiente año
                            if (initialWeek === weekNum) {
                                expect(cal2.rup_calendar('getWeek')).toBe(1);
                            } else {
                                expect(cal2.rup_calendar('getWeek') - 1).toBe(initialWeek);
                            }
                        });
                    });
                    describe(' > día', () => {
                        var initialDay, initialMonth, initialYear;
                        beforeEach((done) => {
                            cal2.on('afterRender', () => {
                                cal2.off('afterRender');
                                cal2.on('afterRender');
                                initialYear = cal2.rup_calendar('getYear');
                                initialMonth = cal2.rup_calendar('getMonth');
                                initialDay = cal2.rup_calendar('getStartDate').getDate();
                                cal2.rup_calendar('navigate', 'next');
                                done();
                            });
                            cal2.rup_calendar('setView', 'day');
                        });
                        it(' > Debe mostrar la vista del siguiente día', () => {
                            // Calculamos el número de días del mes inicial
                            var maxDay = 0;
                            initialMonth = monthMap[initialMonth];
                            if (initialMonth % 2 === 0) {
                                if (initialMonth === 2) {
                                    if (calendarUtils.leapYear(initialYear)) {
                                        maxDay = 29;
                                    } else {
                                        maxDay = 28;
                                    }
                                } else {
                                    maxDay = 30;
                                }
                            } else {
                                maxDay = 31;
                            }

                            if (initialDay === maxDay) {
                                expect(cal2.rup_calendar('getStartDate').getDate()).toBe(1);
                            } else {
                                expect(cal2.rup_calendar('getStartDate').getDate() - 1).toBe(initialDay);
                            }
                        });
                    });
                });
            });
        });
        describe(' > Métodos setView y getView', () => {
            describe(' > setView y getView por defecto', () => {
                beforeEach((done) => {
                    cal2.on('afterRender', () => {
                        cal2.off('afterRender');
                        cal2.on('afterRender');
                        cal2.rup_calendar('setView');
                        done();
                    });
                    cal2.rup_calendar('setView', 'week');
                });
                it(' > Debe establecer la vista por defecto (month)', () => {
                    expect(cal2.rup_calendar('getView')).toBe('month');
                });
            });
            describe(' > setView y getView erróneo', () => {
                it(' > Debe lanzar un error si recibe parámetros incorrectos', () => {
                    expect(() => {
                        cal2.rup_calendar('setView', 'randomData');
                    }).toThrowError('Parámetro inválido');
                });
            });
            describe(' > setView y getView año', () => {
                beforeEach((done) => {
                    cal2.on('afterRender', () => {
                        cal2.off('afterRender');
                        cal2.on('afterRender');
                        cal2.rup_calendar('setView', 'year');
                        done();
                    });
                    cal2.rup_calendar('setView', 'week');
                });
                it(' > Debe establecer la vista anual', () => {
                    expect(cal2.rup_calendar('getView')).toBe('year');
                });
            });
            describe(' > setView y getView mes', () => {
                beforeEach((done) => {
                    cal2.on('afterRender', () => {
                        cal2.off('afterRender');
                        cal2.on('afterRender');
                        cal2.rup_calendar('setView', 'month');
                        done();
                    });
                    cal2.rup_calendar('setView', 'week');
                });
                it(' > Debe establecer la vista mensual', () => {
                    expect(cal2.rup_calendar('getView')).toBe('month');
                });
            });
            describe(' > setView y getView semana', () => {
                beforeEach((done) => {
                    cal2.on('afterRender', () => {
                        cal2.off('afterRender');
                        cal2.on('afterRender');
                        cal2.rup_calendar('setView', 'week');
                        done();
                    });
                    cal2.rup_calendar('setView', 'year');
                });
                it(' > Debe establecer la vista semanal', () => {
                    expect(cal2.rup_calendar('getView')).toBe('week');
                });
            });
            describe(' > setView y getView día', () => {
                beforeEach((done) => {
                    cal2.on('afterRender', () => {
                        cal2.off('afterRender');
                        cal2.on('afterRender');
                        cal2.rup_calendar('setView', 'day');
                        done();
                    });
                    cal2.rup_calendar('setView', 'week');
                });
                it(' > Debe establecer la vista diaria', () => {
                    expect(cal2.rup_calendar('getView')).toBe('day');
                });
            });
        });
        describe(' > Método isToday', () => {
            describe(' > Funciona cuando es true', () => {
                beforeEach((done) => {
                    cal2.on('afterRender');
                    cal2.rup_calendar('navigate', new Date(2019, 0, 3, 0, 0, 0));
                    done();
                });
                it(' > Según se genera no debería ser visible el today', () => {
                    expect(cal2.rup_calendar('isToday')).toBeFalsy();
                });
            });
            describe(' > Funciona cuando es false', () => {
                beforeEach((done) => {
                    cal2.on('afterChangeView');
                    cal2.rup_calendar('navigate', 'next');
                    done();
                });
                it(' > Si nos movemos fuera del rango debe dar false', () => {
                    expect(cal2.rup_calendar('isToday')).toBeFalsy();
                });
            });
        });
        describe(' > Método getTitle', () => {
            beforeEach((done) => {
                cal2.on('afterViewLoad', () => {
                    done();
                });
                cal2.rup_calendar('navigate', 'next');
            });
            it(' > El titulo devuelto debe ser igual al del DOM', () => {
                expect(cal2.rup_calendar('getTitle')).toBe($('.page-header > h3').text());
            });
        });
        describe(' > Método getYear', () => {
            beforeEach((done) => {
                cal2.on('afterRender');
                cal2.rup_calendar('navigate', new Date(2019, 1, 20, 0, 0, 0));
                done();
            });
            it(' > Debe devolver el año correctamente', () => {
                expect(cal2.rup_calendar('getYear')).toBe(2019);
            });
        });
        describe(' > Método getMonth', () => {
            beforeEach((done) => {
                cal2.on('afterRender');
                cal2.rup_calendar('navigate', new Date(2019, 1, 20, 0, 0, 0));
                done();
            });
            it(' > Debe devolver el mes correctamente', () => {
                expect(cal2.rup_calendar('getMonth')).toBe('Febrero');
            });
        });
        describe(' > Método getDay', () => {
            beforeEach((done) => {
                cal2.on('afterRender', () => {
                    cal2.off('afterRender');
                    cal2.on('afterRender');
                    cal2.rup_calendar('navigate', new Date(2019, 1, 19, 0, 0, 0));
                    done();
                });
                cal2.rup_calendar('setView', 'day');
            });
            it(' > Debe devolver el día correctamente', () => {
                expect(cal2.rup_calendar('getDay')).toBe('Martes');
            });
        });
        describe(' > Método getStartDate', () => {
            beforeEach((done) => {
                cal2.on('afterRender', () => {
                    cal2.off('afterRender');
                    cal2.on('afterRender');
                    cal2.rup_calendar('navigate', new Date(2019, 0, 19, 0, 0, 0));
                    done();
                });
                cal2.rup_calendar('setView', 'year');
            });
            it(' > Debe devolver la startDate apropiada', () => {
                expect(cal2.rup_calendar('getStartDate').toLocaleDateString())
                    .toBe(new Date(2019, 0, 1, 0, 0, 0).toLocaleDateString());
            });
        });
        describe(' > Método getEndDate', () => {
            beforeEach((done) => {
                cal2.on('afterRender', () => {
                    cal2.off('afterRender');
                    cal2.on('afterRender');
                    cal2.rup_calendar('navigate', new Date(2019, 0, 20, 0, 0, 0));
                    done();
                });
                cal2.rup_calendar('setView', 'year');
            });
            it(' > Debe devolver la endDate apropiada', () => {
                expect(cal2.rup_calendar('getEndDate').toLocaleDateString())
                    .toBe(new Date(2020, 0, 1, 0, 0, 0).toLocaleDateString());
            });
        });
        describe(' > Método getEventsBetween', () => {
            it(' > Debe devolver los eventos entre las fechas especificadas', () => {
                expect(cal2.rup_calendar('getEventsBetween',
                    new Date(2019, 5, 1, 0, 0, 0),
                    new Date(2019, 5, 7, 0, 0, 0)))
                    .toEqual([{
                        'id': '48605',
                        'title': '<span><strong>AUTORIZACIÓN DE VERTIDO DE AGUAS RESIDUALES PROCEDENTES DE ESTACIÓN DE SERVICIO Nº 7338 EN ARKAUTE, T.M .DE VITORIA-GASTEIZ</strong><ul class=\'pl-3\'><li>Nºexp.:&nbsp;VDP-A-2012-0382</li><li>P.vertido:&nbsp;PV1</li><li>Id.flujo:&nbsp;F1</li><li>Requiere muestra&nbsp;</li><li><i class=\'mdi mdi-check pr-1\' aria-hidden=\'true\'></i>COMPLETADA</li></ul></span>',
                        'start': '1559433600000',
                        'class': ' vertido muestreo completada',
                        'end': '1559520000000',
                        'url': 'javascript:actions(48605)'
                    }, {
                        'id': '47278',
                        'title': '<span><strong>REVISION DE LA AUTORIZACION DE VERTIDO DE AGUAS RESIDUALES DE LA LOCALIDAD DE ILARRATZA (2 P. VERTIDO), T.M. DE VITORIA-GASTEIZ. (REV. 2009-S-0372)</strong><ul class=\'pl-3\'><li>Nºexp.:&nbsp;RAV-A-2014-0058</li><li>P.vertido:&nbsp;PV1</li><li>Id.flujo:&nbsp;F1</li></ul></span>',
                        'start': '1559692800000',
                        'class': ' vertido vigilancia',
                        'end': '1559779200000',
                        'url': 'javascript:actions(47278)'
                    }]);
            });
        });
        describe(' > Método option', () => {
            //Con _render / mouseover
            beforeEach((done) => {
                cal2.on('afterRender');
                cal2.rup_calendar('option', 'weekbox', true);
                done();
            });
            it(' > El cambio en la option debe afectar a la funcionalidad del componente', () => {
                $('.cal-row-fluid').mouseover();
                expect($('#cal-week-box').is(':visible')).toBeTruthy();
            });
            it(' > Se debe poder recuperar el valor', () => {
                expect(cal2.rup_calendar('option', 'weekbox')).toBeTruthy();
            });
        });
        describe(' > Método refresh', () => {
            beforeEach((done) => {
                $.post('/demo/calendar/events/add')
                    .done(() => {
                        cal2.on('afterRefresh');
                        cal2.rup_calendar('refresh');
                        done();
                    });
                cal2.rup_calendar('navigate', new Date(2019, 5, 2, 0, 0, 0));
            });
            afterEach((done) => {
                $.post('/demo/calendar/events/restore')
	                .done(() => {
	                    done();
	                });
            });
            it(' > Debe haber actualizado los events', () => {
                var evts = cal2.rup_calendar('getEventsBetween',
                    new Date(2019, 5, 1, 0, 0, 0),
                    new Date(2019, 5, 10, 0, 0, 0));
                expect(evts.length).toBe(3);
            });
        });
        describe(' > Método destroy', () => {
            beforeEach((done) => {
                cal2.on('afterDestroy');
                cal2.rup_calendar('destroy');
                done();
            });
            it(' > Debe eliminar la estructura del calendario.', () => {
                expect(cal2.children().length).toBe(0);
            });
            it(' > Debe dar error al intentar ejecutar los métodos', () => {
                expect(() => {
                    cal2.rup_calendar('getTitle');
                }).toThrowError();
            });
        });
        describe(' > Método showCell', () => {
            beforeEach((done) => {
                cal2.on('afterViewLoad', () => {
                    cal2.on('afterShowCell', () => {
                        done();
                    });
                    cal2.rup_calendar('showCell', new Date(2019, 5, 2, 0, 0, 0));
                });
                cal2.rup_calendar('navigate', new Date(2019, 5, 2, 0, 0, 0));
            });
            it(' > Deben mostrarse los eventos de la celda seleccionada', () => {
                expect($('#cal-slide-box').css('display')).toBe('block');
            });
        });
        describe(' > Método hideCell', () => {
            beforeEach((done) => {
                cal2.on('afterViewLoad', () => {
                    cal2.on('afterShowCell', () => {
                        cal2.on('afterHideCell');
                        cal2.rup_calendar('hideCells');
                        done();
                    });
                    cal2.rup_calendar('showCell', new Date(2019, 5, 2, 0, 0, 0));
                });
                cal2.rup_calendar('navigate', new Date(2019, 5, 2, 0, 0, 0));
            });
            it(' > Deben ocultarse los eventos desplegados', () => {
                expect($('#cal-slide-box').css('display')).toBe('none');
            });
        });
    });
    describe(' > Funcionalidad de las opciones', () => {
        describe(' > Weekbox', () => {
            beforeEach((done) => {
                let elem = $($('.cal-before-eventlist')[0]);
                cal2.on('afterShowWeekBox');
                elem.mouseover();
                done();
            });
            it(' > Debe mostrar un div con la semana correcta', () => {
                let week = cal2.rup_calendar('getWeek');
                expect($('#cal-week-box').text()).toBe('Semana ' + week.toString());
            });
        });
        describe(' > Cell navigation', () => {
            describe(' > Haciendo click en el span con el número del día', () => {
                beforeEach((done) => {
                    let elem = $($('.cal-day-inmonth span')[0]);
                    elem.click();
                    setTimeout(() => {
                        done();
                    }, 400);
                });
                it(' > Debe mantenerse en la misma vista', () => {
                    expect(cal2.rup_calendar('getView')).toBe('month');
                });
            });
            describe(' > Haciendo doble click en la celda de día', () => {
                beforeEach((done) => {
                    let elem = $($('.cal-day-inmonth')[0]);
                    elem.dblclick();
                    setTimeout(() => {
                        done();
                    }, 400);
                });
                it(' > Debe mantenerse en la misma vista', () => {
                    expect(cal2.rup_calendar('getView')).toBe('month');
                });
            });
        });
        describe(' > Classes', () => {
            beforeEach(() => {
                cal2.rup_calendar('setView', 'week');
                cal2.rup_calendar('navigate', new Date(2019, 5, 1, 0, 0, 0));
            });
            it(' > Debe tener la clase especificada', () => {
                expect($('span[data-cal-date="2019-06-01"]').parent().parent().is('.randomClass')).toBeTruthy();
            });
        });
    });
});

var opts1 = {
    tmpl_path: testutils.DIST + '/html/templates/rup_calendar/',
    events_source: function () {
        return EVENTS;
    },
    rupAfterEventsLoad: function (events) {
        if (!events) {
            return;
        }
        var list = $('#eventlist');
        list.html('');

        $.each(events, function (key, val) {
            $(document.createElement('li'))
                .html('<div href="' + val.url + '">' + val.title + '</div>')
                .appendTo(list);
        });
    },
    rupAfterViewLoad: function (view) {
        $('.page-header h3').text(this.getTitle());
        $('.btn-group button').removeClass('active');
        $('button[data-calendar-view="' + view + '"]').addClass('active');
    }
};
var opts2 = {
    tmpl_path: testutils.DIST + '/html/templates/rup_calendar/',
    events_source: '/demo/calendar/events',
    weekbox: true,
    cell_navigation: false,
    day: (() => { 
        var date = new Date();
        var formatter = (val) => {
            if (val < 10) {
                return '0' + val;
            }
            return val;
        };
        return '' + date.getFullYear() + '-' + formatter(date.getMonth() + 1 ) + '-' + formatter(date.getDate());
    })(),
    position: {
        start: new Date(new Date().getFullYear(), 0, 1, 0, 0, 0),
        end: new Date(new Date().getFullYear() + 1, 0, 1, 0, 0, 0)
    },
    classes: {
        week: {
            saturday: 'randomClass'
        }
    },
    date_range_start: new Date(2019, 0, 1, 0, 0, 0),
    date_range_end: new Date(2030, 1, 1, 0, 0, 0),
    rupAfterEventsLoad: function (events) {
        if (!events) {
            return;
        }
        var list = $('#eventlist');
        list.html('');

        $.each(events, function (key, val) {
            $(document.createElement('li'))
                .html('<div href="' + val.url + '">' + val.title + '</div>')
                .appendTo(list);
        });
    },
    rupAfterViewLoad: function (view) {
        $('.page-header h3').text(this.getTitle());
        $('.btn-group button').removeClass('active');
        $('button[data-calendar-view="' + view + '"]').addClass('active');
    }
};

function createCalendar(opts, callback) {

    let html = `
    <div class="row"></br>
        <div class="col-xl-12 mb-3">
            <h3>Ejemplo</h3>
            <hr>
        </div>
    </div>
    <div class="row">
        <div class="col-xl-12">
            <div class="page-header w-100 mb-3">
                <div class="pull-right d-flex flex-row align-items-center flex-wrap">
                    <div class="btn-group mb-3">
                        <span class="btn btn-primary" data-calendar-nav="prev">
                            <i class="mdi mdi-chevron-left-circle" aria-hidden="true"></i>&nbsp;Prev.
                        </span>
                        <span class="btn light" data-calendar-nav="today">Hoy</span>
                        <span class="btn btn-primary" data-calendar-nav="next">
                            Sig.&nbsp;<i class="mdi mdi-chevron-right-circle" aria-hidden="true"></i>
                        </span>
                    </div>
                    <div class="pl-3 d-xs-none"></div>
                    <div class="btn-group mb-3">
                        <span class="btn btn-light" data-calendar-view="year">Año</span>
                        <span class="btn btn-light active" data-calendar-view="month">Mes</span>
                        <span class="btn btn-light" data-calendar-view="week">Semana</span>
                        <span class="btn btn-light" data-calendar-view="day">Día</span>
                    </div>
                </div>
                <h3></h3>
            </div>
        </div>
    </div>
    <div class="row mb-3">
        <div class="col-xl-12">
            <div id="calendar" class="calendar"></div>
        </div>
    </div>
    <div id="divLeyenda" class="row">
        <div class="col-xl-5 noPadding">
            <div id="divLegend" class="">
                <span class="separator" style="color: #666;"> Leyenda:
                </span>
                <div class="row row-noPadding">
                    <div class="col-md-1">
                        <div class="legend bgNegro"></div>
                    </div>
                    <div class="col-md-11">
                        Vigilancia de vertido
                    </div>
                </div>
                <div class="row row-noPadding">
                    <div class="col-md-1">
                        <div class="legend bgNegroyRojo"></div>
                    </div>
                    <div class="col-md-11">
                        Muestreo
                    </div>
                </div>
                <div class=" row row-noPadding">
                    <div class="col-md-1">
                        <div class="legend bgAmarillo"></div>
                    </div>
                    <div class="col-md-11">
                        Inspección de vertido
                    </div>
                </div>
                <div class="row row-noPadding">
                    <div class="col-md-1">
                        <div class="legend bgNaranja"></div>
                    </div>
                    <div class="col-md-11">
                        Inspección de obra
                    </div>
                </div>
                <div class="row row-noPadding">
                    <div class="col-md-1">
                        <div class="legend bgAzul"></div>
                    </div>
                    <div class="col-md-11">
                        Inspección de concesión
                    </div>
                </div>
                <div class="row row-noPadding">
                    <div class="col-md-1">
                        <div class="legend bgCheck">
                            <i class="mdi mdi-check pr-1" style="color: black" aria-hidden="true"></i>
                        </div>
                    </div>
                    <div class="col-md-11">
                        Completada
                    </div>
                </div>
                <div class="row row-noPadding">
                    <div class="col-md-1">
                        <div class="legend bgExclamation">
                            <i class="mdi mdi-exclamation pr-1" style="color: black; padding: 6px 7px;" aria-hidden="true"></i>
                        </div>
                    </div>
                    <div class="col-md-11">
                        La fecha fin de trámite está próxima/vencida
                    </div>
                </div>
            </div>
        </div>
    </div>
    <br>`;
    $('#content').append(html);

    var calendar = $('#calendar');
    $('.btn-group span[data-calendar-nav]').each((i, e) => {
        let $elem = $(e);
        $elem.click(function () {
            calendar.rup_calendar('navigate', $elem.data('calendar-nav'));
        });
    });

    $('.btn-group span[data-calendar-view]').each((i, e) => {
        let $elem = $(e);
        $elem.click(function () {
            calendar.rup_calendar('setView', $elem.data('calendar-view'));
            $('.btn-group span[data-calendar-view].active').removeClass('active');
            $elem.addClass('active');
        });
    });

    $('#calendar').on('afterInitCalendar', () => {
        callback();
    });
    $('#calendar').rup_calendar(opts);
}