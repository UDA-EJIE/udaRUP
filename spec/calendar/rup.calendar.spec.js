import 'jquery';
import 'jasmine-jquery';
import * as testutils from '../common/specCommonUtils';
import 'rup.tooltip';
import 'rup.calendar';

const EVENTS = [{
    "id": "48605",
    "title": "<span><strong>AUTORIZACIÓN DE VERTIDO DE AGUAS RESIDUALES PROCEDENTES DE ESTACIÓN DE SERVICIO Nº 7338 EN ARKAUTE, T.M .DE VITORIA-GASTEIZ</strong><ul class='pl-3'><li>Nºexp.:&nbsp;VDP-A-2012-0382</li><li>P.vertido:&nbsp;PV1</li><li>Id.flujo:&nbsp;F1</li><li>Requiere muestra&nbsp;</li><li><i class='fa fa-check pr-1' aria-hidden='true'></i>COMPLETADA</li></ul></span>",
    "start": "1541890800000",
    "class": " vertido muestreo completada",
    "end": "1541890800000",
    "url": "javascript:actions(48605)"
}, {
    "id": "47278",
    "title": "<span><strong>REVISION DE LA AUTORIZACION DE VERTIDO DE AGUAS RESIDUALES DE LA LOCALIDAD DE ILARRATZA (2 P. VERTIDO), T.M. DE VITORIA-GASTEIZ. (REV. 2009-S-0372)</strong><ul class='pl-3'><li>Nºexp.:&nbsp;RAV-A-2014-0058</li><li>P.vertido:&nbsp;PV1</li><li>Id.flujo:&nbsp;F1</li></ul></span>",
    "start": "1543186800000",
    "class": " vertido vigilancia",
    "end": "1543186800000",
    "url": "javascript:actions(47278)"
}, {
    "id": "49203",
    "title": "<span><strong>AUTORIZACION DE VERTIDO DE AGUAS RESIDUALES EN ESTACION DE SERVICIO (FECALES, HIDROCARBUROS Y LAVADO DE VEHICULOS EN OTXANDIO</strong><ul class='pl-3'><li>Nºexp.:&nbsp;VDP-A-2012-0164</li><li>P.vertido:&nbsp;PV1</li><li>Id.flujo:&nbsp;F1</li></ul></span>",
    "start": "1541890800000",
    "class": " vertido vigilancia",
    "end": "1541890800000",
    "url": "javascript:actions(49203)"
}, {
    "id": "47275",
    "title": "<span><strong>REVISION DE LA AUTORIZACION DE VERTIDO DE AGUAS RESIDUALES DE LA LOCALIDAD DE ILARRATZA (2 P. VERTIDO), T.M. DE VITORIA-GASTEIZ. (REV. 2009-S-0372)</strong><ul class='pl-3'><li>Nºexp.:&nbsp;RAV-A-2014-0058</li><li>P.vertido:&nbsp;PV2</li><li>Id.flujo:&nbsp;F2</li></ul></span>",
    "start": "1543186800000",
    "class": " vertido vigilancia",
    "end": "1543186800000",
    "url": "javascript:actions(47275)"
}, {
    "id": "47445",
    "title": "<span><strong>AUTORIZACION AMBIENTAL INTEGRADA PARA LA ACTIVIDAD DE FABRICACION DE TUBOS DE ACERO SOLDADOS LONGITUDINALMENTE, PROMOVIDA POR CONDESA FABRIL, S.A., EN EL T.M. DE LEGUTIANO (ARABA).</strong><ul class='pl-3'><li>Nºexp.:&nbsp;AAI-A-2013-0017-INTER</li><li>P.vertido:&nbsp;PV1</li><li>Id.flujo:&nbsp;F1</li><li>Requiere muestra&nbsp;</li></ul></span>",
    "start": "1541804400000",
    "class": " vertido muestreo",
    "end": "1541804400000",
    "url": "javascript:actions(47445)"
}, {
    "id": "45977",
    "title": "<span><strong>REVISION DE LA AUTORIZACION DE VERTIDOS DE AGUAS RESIDUALES PROCEDENTES DE LA EDAR MUNICIPAL DE OTXANDIO (RV: 1992-S-0149)</strong><ul class='pl-3'><li>Nºexp.:&nbsp;RAV-A-2012-0362</li><li>P.vertido:&nbsp;PV1</li><li>Id.flujo:&nbsp;F1</li><li>Requiere muestra&nbsp;</li></ul></span>",
    "start": "1543618800000",
    "class": " vertido muestreo",
    "end": "1543618800000",
    "url": "javascript:actions(45977)"
}, {
    "id": "47308",
    "title": "<span><strong>AUTORIZACION DE VERTIDO DE AGUAS RESIDUALES DE LA LOCALIDAD DE BERROSTEGIETA EN EL TERMINO MUNICIPAL DE VITORIA-GASTEIZ (4 FOSAS SÉPTICAS CON TRES PUNTOS DE VERTIDO)</strong><ul class='pl-3'><li>Nºexp.:&nbsp;VDP-A-2012-0835</li><li>P.vertido:&nbsp;PV-1</li><li>Id.flujo:&nbsp;F1</li></ul></span>",
    "start": "1542150000000",
    "class": " vertido vigilancia",
    "end": "1542150000000",
    "url": "javascript:actions(47308)"
}, {
    "id": "49172",
    "title": "<span><strong>AUTORIZACION DE VERTIDO DE AGUAS RESIDUALES DE LA EMPRESA LEGUTILAN DEDICADA A FABRICACION DE ESTRUCTURAS METALICAS Y SUS COMPONENTES, EN LA LOCALIDAD DE LEGUTIANO.</strong><ul class='pl-3'><li>Nºexp.:&nbsp;VDP-A-2013-0010</li><li>P.vertido:&nbsp;PV1</li><li>Id.flujo:&nbsp;F1</li></ul></span>",
    "start": "1542668400000",
    "class": " vertido vigilancia",
    "end": "1542668400000",
    "url": "javascript:actions(49172)"
}, {
    "id": "49170",
    "title": "<span><strong>REVISION DE AUTORIZACION DE VERTIDO DE AGUAS RESIDUALES DEL POLIGONO INDUSTRIAL LLADIE EN LEGUTIO, TITULARIDAD DE EUSEBIO ARECHAGA IBARRRONDO</strong><ul class='pl-3'><li>Nºexp.:&nbsp;RAV-A-2013-0037</li><li>P.vertido:&nbsp;PV1</li><li>Id.flujo:&nbsp;F1</li></ul></span>",
    "start": "1542495600000",
    "class": " vertido vigilancia",
    "end": "1542495600000",
    "url": "javascript:actions(49170)"
}, {
    "id": "47411",
    "title": "<span><strong>AUTORIZACION VERTIDO AGUAS RESIDUALES PROCEDENTE DE BETOLAZA</strong><ul class='pl-3'><li>Nºexp.:&nbsp;VDP-A-2012-0035</li><li>P.vertido:&nbsp;PV1</li><li>Id.flujo:&nbsp;F1</li></ul></span>",
    "start": "1541718000000",
    "class": " vertido vigilancia",
    "end": "1541718000000",
    "url": "javascript:actions(47411)"
}, {
    "id": "49162",
    "title": "<span><strong>REVISION DE LA AUTORIZACION DE VERTIDO DE AGUAS RESIDUALES PROCEDENTES DE LA LOCALIDAD DE ANTEZANA FORONDA, EN EL T.M. VITORIA-GASTEIZ (ALAVA).</strong><ul class='pl-3'><li>Nºexp.:&nbsp;RAV-A-2012-0418</li><li>P.vertido:&nbsp;PV1</li><li>Id.flujo:&nbsp;F1</li></ul></span>",
    "start": "1542150000000",
    "class": " vertido vigilancia",
    "end": "1542150000000",
    "url": "javascript:actions(49162)"
}, {
    "id": "47457",
    "title": "<span><strong>AUTORIZACION AMBIENTAL INTEGRADA PARA LA ACTIVIDAD DE FABRICACION DE TUBOS DE ACERO SOLDADOS LONGITUDINALMENTE, PROMOVIDA POR CONDESA FABRIL, S.A., EN EL T.M. DE LEGUTIANO (ARABA).</strong><ul class='pl-3'><li>Nºexp.:&nbsp;AAI-A-2013-0017-INTER</li><li>P.vertido:&nbsp;PV2</li><li>Id.flujo:&nbsp;F2</li><li>Requiere muestra&nbsp;</li></ul></span>",
    "start": "1541804400000",
    "class": " vertido muestreo",
    "end": "1541804400000",
    "url": "javascript:actions(47457)"
}, {
    "id": "49166",
    "title": "<span><strong>REVISION DE LA AUTORIZACION DE VERTIDO DE AGUAS RESIDUALES PROCEDENTES DE LA ENTIDAD URBANISTICA DE CONSERVACION, S.A.U DEPORTIVO LARRABEA UBICADA EN LEGUTIANO, T.M. DE LEGUTIANO (ARABA).</strong><ul class='pl-3'><li>Nºexp.:&nbsp;RAV-A-2012-0332</li><li>P.vertido:&nbsp;PV1</li><li>Id.flujo:&nbsp;F1</li></ul></span>",
    "start": "1541545200000",
    "class": " vertido vigilancia",
    "end": "1541545200000",
    "url": "javascript:actions(49166)"
}, {
    "id": "48640",
    "title": "<span><strong>REVISION DE AUTORIZACION DE VERTIDO DE AGUAS RESIDUALES PROCEDENTES DEL LABORATORIO PECUARIO DE ESKALMENDI T.M. ARRATZUA-UBARRUNDIA(ALAVA)</strong><ul class='pl-3'><li>Nºexp.:&nbsp;RAV-A-2012-0274</li><li>P.vertido:&nbsp;PV1</li><li>Id.flujo:&nbsp;F1</li></ul></span>",
    "start": "1543359600000",
    "class": " vertido vigilancia",
    "end": "1543359600000",
    "url": "javascript:actions(48640)"
}, {
    "id": "49111",
    "title": "<span><strong>REVISION DE LA AUTORIZACION DE VERTIDO DE AGUAS RESIDUALES DE LA LOCALIDAD DE ULLIBARRI DE LOS OLLEROS, T.M. DE VITORIA-GASTEIZ. (REV. 2009-S-0396)</strong><ul class='pl-3'><li>Nºexp.:&nbsp;RAV-A-2014-0056</li><li>P.vertido:&nbsp;PV1</li><li>Id.flujo:&nbsp;F1</li></ul></span>",
    "start": "1543186800000",
    "class": " vertido vigilancia",
    "end": "1543186800000",
    "url": "javascript:actions(49111)"
}, {
    "id": "56120",
    "title": "<span><strong>AUTORIZACIÓN DE VERTIDO DE AGUAS RESIDUALES PROCEDENTES DE LA VIVIENDA CTRA. DE BERGARA, Nº 15 DE DURANA, T. M. DE ARRATZUA-UBARRUNDIA</strong><ul class='pl-3'><li>Nºexp.:&nbsp;VDP-A-2014-0005</li><li>P.vertido:&nbsp;PV1</li><li>Id.flujo:&nbsp;F1</li><li>Requiere muestra&nbsp;</li></ul></span>",
    "start": "1543186800000",
    "class": " vertido muestreo",
    "end": "1543186800000",
    "url": "javascript:actions(56120)"
}, {
    "id": "58023",
    "title": "<span><strong>EXPEDIENTE DE AUTORIZACIÓN DE OBRAS DE ADECUACIÓN DEL TRAMO INICIAL DE LA CARRETERA GI-3112 AL BARRIO DE UZARRAGA, EN EL TÉRMINO MUNICIPAL DE ANTZUOLA (GIPUZKOA)</strong><ul class='pl-3'><li>Nºexp.:&nbsp;SAO-A-2018-0131</li><li>Id. zona:&nbsp;ZO1</li></ul></span>",
    "start": "1543100400000",
    "class": " obra",
    "end": "1543100400000",
    "url": "javascript:actions(58023)"
}, {
    "id": "56110",
    "title": "<span><strong>AUTORIZACIÓN DE VERTIDO DE AGUAS RESIDUALES PROCEDENTES DE LA VIVIENDA CTRA. DE BERGARA, Nº 19 DE DURANA, T. M. DE ARRATZUA-UBARRUNDIA</strong><ul class='pl-3'><li>Nºexp.:&nbsp;VDP-A-2014-0017</li><li>P.vertido:&nbsp;PV1</li><li>Id.flujo:&nbsp;F1</li><li>Requiere muestra&nbsp;</li></ul></span>",
    "start": "1543186800000",
    "class": " vertido muestreo",
    "end": "1543186800000",
    "url": "javascript:actions(56110)"
}, {
    "id": "45976",
    "title": "<span><strong>REVISION DE LA AUTORIZACION DE VERTIDOS DE AGUAS RESIDUALES PROCEDENTES DE LA EDAR MUNICIPAL DE OTXANDIO (RV: 1992-S-0149)</strong><ul class='pl-3'><li>Nºexp.:&nbsp;RAV-A-2012-0362</li><li>P.vertido:&nbsp;PV1</li><li>Id.flujo:&nbsp;F1</li><li>Requiere muestra&nbsp;</li></ul></span>",
    "start": "1541026800000",
    "class": " vertido muestreo",
    "end": "1541026800000",
    "url": "javascript:actions(45976)"
}, {
    "id": "47216",
    "title": "<span><strong>AUTORIZACION VERTIDO AGUAS RESIDUALES DE ESTACION DE SERVICIO IBAIA ENERGY, S. L. CTRA. N-102 KM.347 (LADO DCHA. DIRECC. IRUN) (LEGAL. V-01-03023)</strong><ul class='pl-3'><li>Nºexp.:&nbsp;VDP-A-2012-0830</li><li>P.vertido:&nbsp;PV-1</li><li>Id.flujo:&nbsp;F1</li></ul></span>",
    "start": "1542495600000",
    "class": " vertido vigilancia",
    "end": "1542495600000",
    "url": "javascript:actions(47216)"
}, {
    "id": "47475",
    "title": "<span><strong>REVISION DE LA AUTORIZACION DE VERTIDO DE AGUAS RESIDUALES DEL POLIGONO INDUSTRIAL DE GOIAIN Y DE LA POBLACION DE LEGUTIO, T.M. DE LEGUTIO. (Rev. 2008-S-0043)</strong><ul class='pl-3'><li>Nºexp.:&nbsp;RAV-A-2014-0030</li><li>P.vertido:&nbsp;PV1</li><li>Id.flujo:&nbsp;F1</li><li>Requiere muestra&nbsp;</li></ul></span>",
    "start": "1543359600000",
    "class": " vertido muestreo",
    "end": "1543359600000",
    "url": "javascript:actions(47475)"
}, {
    "id": "49207",
    "title": "<span><strong>REVISION DE AUTORIZACIÓN DE VERTIDO DE AGUA RESIDUALES PROCEDENTES DE CAMPO DE TIRO LAS COLINAS EN ZUAZO DE VITORIA, T.M. VITORIA-GASTEIZ (ALAVA) (REV. 2005-S-0107)</strong><ul class='pl-3'><li>Nºexp.:&nbsp;RAV-A-2013-0029</li><li>P.vertido:&nbsp;PV1</li><li>Id.flujo:&nbsp;F1</li></ul></span>",
    "start": "1543359600000",
    "class": " vertido vigilancia",
    "end": "1543359600000",
    "url": "javascript:actions(49207)"
}, {
    "id": "49200",
    "title": "<span><strong>REVISIÓN DE LA AUTORIZACIÓN DE VERTIDO DE AGUAS RESIDUALES PROCEDENTES DE LA ACTIVIDAD DE LA EMPRESA FRIGORÍFICOS INDUSTRIALES ALAVESES, UBICADA EN DURANA, T.M. DE ARRAZUA-UBARRUNDIA (Rev.2005-S-34)</strong><ul class='pl-3'><li>Nºexp.:&nbsp;RAV-A-2012-0297</li><li>P.vertido:&nbsp;PV1</li><li>Id.flujo:&nbsp;F1</li></ul></span>",
    "start": "1542150000000",
    "class": " vertido vigilancia",
    "end": "1542150000000",
    "url": "javascript:actions(49200)"
}, {
    "id": "47464",
    "title": "<span><strong>AUTORIZACION DE VERTIDO DE AGUAS RESIDUALES PROCEDENTES DE LA LOCALIDAD DE URBINA (2 FOSAS)</strong><ul class='pl-3'><li>Nºexp.:&nbsp;VDP-A-2012-0781</li><li>P.vertido:&nbsp;PV1</li><li>Id.flujo:&nbsp;F1</li></ul></span>",
    "start": "1542841200000",
    "class": " vertido vigilancia",
    "end": "1542841200000",
    "url": "javascript:actions(47464)"
}, {
    "id": "48795",
    "title": "<span><strong>AUTORIZACIÓN (LEGALIZACIÓN) DE VERTIDO DE AGUAS RESIDUALES PROCEDENTE DEL CLUB NÁUTICO DE VITORIA (LEGAL.EXP. V-01-05021)</strong><ul class='pl-3'><li>Nºexp.:&nbsp;VDP-A-2012-0343</li><li>P.vertido:&nbsp;PV1</li><li>Id.flujo:&nbsp;F1</li></ul></span>",
    "start": "1543446000000",
    "class": " vertido vigilancia",
    "end": "1543446000000",
    "url": "javascript:actions(48795)"
}, {
    "id": "51469",
    "title": "<span><strong>REVISION DE AUTORIZACION DE VERTIDO DE AGUAS RESIDUALES PROCEDENTES DEL BARRIO DE NAFARRATE, EN LA LOCALIDAD DE URRUNAGA, T.M. DE LEGUTIANO (ARABA) (Rev. 2010-S-0285)</strong><ul class='pl-3'><li>Nºexp.:&nbsp;RAV-A-2016-0054</li><li>P.vertido:&nbsp;PV1</li><li>Id.flujo:&nbsp;F1</li><li>Requiere muestra&nbsp;</li></ul></span>",
    "start": "1543273200000",
    "class": " vertido muestreo",
    "end": "1543273200000",
    "url": "javascript:actions(51469)"
}, {
    "id": "49164",
    "title": "<span><strong>AUTORIZACIÓN DE VERTIDO DE AGUAS RESIDUALES PROCEDENTES DE LA POBLACION DE AMARITA, T.M. DE VITORIA-GASTEIZ (ALAVA).</strong><ul class='pl-3'><li>Nºexp.:&nbsp;VDP-A-2012-0268</li><li>P.vertido:&nbsp;PV1</li><li>Id.flujo:&nbsp;F1</li></ul></span>",
    "start": "1541372400000",
    "class": " vertido vigilancia",
    "end": "1541372400000",
    "url": "javascript:actions(49164)"
}, {
    "id": "47488",
    "title": "<span><strong>REVISION DE AUTORIZACION DE VERTIDO DE AGUAS RESIDUALES PROCEDENTES DE LA POBLACION DE GAMARRA MENOR, T.M. DE VITORIA-GASTEIZ (ARABA) (Rev. 2013-S-0095)</strong><ul class='pl-3'><li>Nºexp.:&nbsp;RAV-A-2016-0055</li><li>P.vertido:&nbsp;PV1</li><li>Id.flujo:&nbsp;F1</li></ul></span>",
    "start": "1543446000000",
    "class": " vertido vigilancia",
    "end": "1543446000000",
    "url": "javascript:actions(47488)"
}, {
    "id": "49143",
    "title": "<span><strong>AUTORIZACION DE VERTIDO DE AGUAS RESIDUALES PROCEDENTES DE UNA GRANJA EXPERIMENTAL DE AVES EN LA LOCALIDAD DE CASTILLO, EN EL T.M. DE VITORIA-GASTEIZ (ALAVA).</strong><ul class='pl-3'><li>Nºexp.:&nbsp;VDP-A-2012-0379</li><li>P.vertido:&nbsp;PV1</li><li>Id.flujo:&nbsp;F1</li></ul></span>",
    "start": "1542495600000",
    "class": " vertido vigilancia",
    "end": "1542495600000",
    "url": "javascript:actions(49143)"
}];

var monthMap = {
    'Enero':      1,
    'Febrero':    2,
    'Marzo':      3,
    'Abril':      4,
    'Mayo':       5,
    'Junio':      6,
    'Julio':      7,
    'Agosto':     8,
    'Septiembre': 9,
    'Octubre':    10,
    'Noviembre':  11,
    'Diciembre':  12
};
var dayMap = {
    'Lunes': 1,
    'Martes': 2,
    'Miércoles': 3,
    'Jueves': 4,
    'Viernes': 5,
    'Sábado': 6,
    'Domingo': 7,
};
var calendarUtils = {
    leapYear: (year) => {
        if((year % 4 == 0) && ((year % 100 != 0) || (year % 400 == 0))){
            return true;
        }
        return false;
    },
    countWeeks: (year) => {
        var isLeapYear = calendarUtils.leapYear(year);
        var startsAtSunday = () => {
            let tmpDate = new Date((cal.rup_calendar('getYear') - 1) + '-01-01');
            return tmpDate.getDay() === 7 ? true : false;
        };

        if(isLeapYear && startsAtSunday()){
            //El año anterior tenía 53 semanas
            return 53;
        }
        else {
            return 52;
        }
    }
}
describe('Test rup_calendar', () => {
    var cal;
    beforeAll((done) => {
        var tmpls = {
            'day': require('calendar/tmpls/day.html'),
            'week': require('calendar/tmpls/week.html'),
            'week-days': require('calendar/tmpls/week-days.html'),
            'month': require('calendar/tmpls/month.html'),
            'month-day': require('calendar/tmpls/month-day.html'),
            'year': require('calendar/tmpls/year.html'),
            'year-month': require('calendar/tmpls/year-month.html'),
            'events-list': require('calendar/tmpls/events-list.html'),
            'modal': require('calendar/tmpls/modal.html')
        };
        testutils.loadCss(done);
    });
    beforeEach((done) => {
        createCalendar(() => {
            cal = $('#calendar');
            done();
        });
    });
    afterEach(() => {
        // cal.rup_calendar('destroy');
        $('#content').html('');
        $('#content').nextAll().remove();
    });
    describe(' > Métodos públicos', () => {
        describe(' > Método navigate', () => {
            describe(' > navigate por defecto', () => {
                beforeEach((done) => {
                    cal.on('afterRender', () => {
                        cal.off('afterRender');
                        cal.on('afterRender', done);
                        cal.rup_calendar('navigate');
                    });
                    cal.rup_calendar('navigate', 'prev');
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
                                cal.on('afterRender',done);
                                initialYear = cal.rup_calendar('getYear');
                                cal.rup_calendar('navigate', 'prev');
                            });
                            cal.rup_calendar('setView','year');
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
                                cal.on('afterRender', done);
                                initialMonth = cal.rup_calendar('getMonth');
                                cal.rup_calendar('navigate', 'prev');
                            });
                            cal.rup_calendar('setView','month');
                        });
                        it(' > Debe haber retrocedido un mes', () => {
                            if( initialMonth === 1 ) {
                                // Antes del 1 (enero) va el 12 (diciembre)
                                expect(cal.rup_calendar('getMonth')).toBe(12);
                            }
                            else {
                                expect(monthMap[cal.rup_calendar('getMonth')] + 1)
                                    .toBe(monthMap[initialMonth]);
                            }
                        });
                    });
                    describe(' > semana', () => {
                        var initialWeek;
                        beforeEach((done) => {
                            cal.on('afterRender', () => {
                                cal.off('afterRender');
                                cal.on('afterRender',done);
                                initialWeek = cal.rup_calendar('getWeek');
                                cal.rup_calendar('navigate', 'prev');
                            });
                            cal.rup_calendar('setView','week');
                        });
                        it(' > Debe haber retrocedido una semana', () => {
                            // Un año tiene 52 semanas salvo si es bisiesto y
                            // empieza en domingo entonces serían 53
                            if(initialWeek === 1) {
                                expect(cal.rup_calendar('getWeek'))
                                    .toBe(calendarUtils.countWeeks(cal.rup_calendar('getYear') - 1));
                            }
                            else {
                                expect(cal.rup_calendar('getWeek') + 1).toBe(initialWeek);
                            }
                        });
                    });
                    describe(' > día', () => {
                        var initialDay;
                        beforeEach((done) => {
                            cal.on('afterRender', () => {
                                cal.off('afterRender');
                                cal.on('afterRender',done);
                                initialDay = cal.rup_calendar('getDay');
                                cal.rup_calendar('navigate', 'prev');
                            });
                            cal.rup_calendar('setView','day');
                        });
                        it(' > Debe haber retrocedido un día', () => {
                            if(initialDay === 1){
                                let month = cal.rup_calendar('getMonth');
                                // Si hay cambio de mes
                                if(month % 2 === 0) {
                                    // El mes es par
                                    if(month === 2) {
                                        // Si era 1 de Marzo
                                        if (calendarUtils.leapYear(cal.rup_calendar('getYear') - 1)) {
                                            expect(cal.rup_calendar('getDay')).toBe(29);
                                        }
                                        else {
                                            expect(cal.rup_calendar('getDay')).toBe(28);
                                        }
                                    }
                                    else {
                                        // Si no es febrero el mes anterior tiene 30 días
                                        expect(cal.rup_calendar('getDay')).toBe(30);
                                    }
                                }
                                else {
                                    // Los meses impares tienen 31 días
                                    expect(cal.rup_calendar('getDay')).toBe(31);
                                }
                            }
                            else {
                                expect(dayMap[cal.rup_calendar('getDay')] + 1).toBe(dayMap[initialDay]);
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
                                    cal.on('afterRender', done);
                                    cal.rup_calendar('navigate', 'today');
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
                                    cal.on('afterRender', done);
                                    cal.rup_calendar('navigate', 'today');
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
                                    cal.on('afterRender', done);
                                    cal.rup_calendar('navigate', 'today');
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
                                    cal.on('afterRender', done);
                                    cal.rup_calendar('navigate', 'today');
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
                                cal.on('afterRender', done);
                                cal.rup_calendar('navigate', 'next');
                            });
                            cal.rup_calendar('setView', 'year');
                        });
                        it(' > La vista debe mostrar el año siguiente',() => {
                            expect(cal.rup_calendar('getYear') - 1).toBe(initialYear)
                        });
                    });
                    describe(' > mes', () => {
                        var initialMonth;
                        beforeEach((done) => {
                            initialMonth = cal.rup_calendar('getMonth');
                            cal.on('afterRender', () => {
                                cal.off('afterRender');
                                cal.on('afterRender', done);
                                cal.rup_calendar('navigate', 'next');
                            });
                            cal.rup_calendar('setView', 'month');
                        });
                        it(' > La vista debe mostrar el año siguiente',() => {
                            if(monthMap[initialMonth] === 12) {
                                //Tras el 12(diciembre) viene el 1 (enero)
                                expect(cal.rup_calendar('getMonth')).toBe(1);
                            }
                            else {
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
                                cal.on('afterRender', done);
                                initialWeek = cal.rup_calendar('getWeek');
                                cal.rup_calendar('navigate', 'next');
                            });
                            cal.rup_calendar('setView', 'week');
                        });
                        it(' > Debe mostrarse la semana siguiente', () => {
                            //Obtenemos el número de semanas del año actual
                            let weekNum = calendarUtils.countWeeks(cal.rup_calendar('getYear'));
                            // Si era la última semana del año el next sacara la vista de la semana
                            // 1 del siguiente año
                            if(initialWeek === weekNum) {
                                expect(cal.rup_calendar('getWeek')).toBe(1);
                            }
                            else {
                                expect(cal.rup_calendar('getWeek') -1).toBe(initialWeek);
                            }
                        });
                    });
                    describe(' > día', () => {
                        var initialDay, initialMonth, initialYear;
                        beforeEach((done) => {
                            cal.on('afterRender', () => {
                                cal.off('afterRender');
                                cal.on('afterRender', done);
                                initialYear = cal.rup_calendar('getYear');
                                initialMonth = cal.rup_calendar('getMonth');
                                initialDay = cal.rup_calendar('getDay');
                                cal.rup_calendar('navigate', 'next');
                            });
                            cal.rup_calendar('setView', 'day');
                        });
                        it(' > Debe mostrar la vista del siguiente día', () => {
                            // Calculamos el número de días del mes inicial
                            var maxDay = 0;
                            if (initialMonth % 2 === 0){
                                if(initialMonth === 2) {
                                    if(calendarUtils.leapYear(initialYear)){
                                        maxDay = 29;
                                    }
                                    else {
                                        maxDay = 28;
                                    }
                                }
                                else {
                                    maxDay = 30;
                                }
                            }
                            else {
                                maxDay = 31
                            }

                            if(initialDay === maxDay) {
                                expect(cal.rup_calendar('getDay')).toBe(1);
                            }
                            else{
                                expect(dayMap[cal.rup_calendar('getDay')] - 1).toBe(dayMap[initialDay]);
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
                        cal.on('afterRender', done);
                        cal.rup_calendar('setView');
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
                        cal.on('afterRender', done);
                        cal.rup_calendar('setView', 'year');
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
                        cal.on('afterRender', done);
                        cal.rup_calendar('setView', 'month');
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
                        cal.on('afterRender', done);
                        cal.rup_calendar('setView', 'week');
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
                        cal.on('afterRender', done);
                        cal.rup_calendar('setView', 'day');
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
                    cal.on('afterRender', done);
                    cal.rup_calendar('navigate', 'next');
                });
                it(' > Si nos movemos fuera del rango debe dar false', () => {
                    expect(cal.rup_calendar('isToday')).toBeFalsy();
                });
            });
        });
        describe(' > Método getTitle', () => {});
        describe(' > Método getYear', () => {});
        describe(' > Método getMonth', () => {});
        describe(' > Método getDay', () => {});
        describe(' > Método getStartDate', () => {});
        describe(' > Método getEndDate', () => {});
        describe(' > Método getEventsBetween', () => {});
        describe(' > Método option', () => {});
        describe(' > Método refresh', () => {});
        describe(' > Método destroy', () => {});
    });
});

function createCalendar(callback) {

    let html = '\
    <div class="row"></br>\
        <div class="col-xs-12 mb-3">\
            <h3>Ejemplo</h3>\
            <hr>\
        </div>\
    </div>\
    <div class="row">\
        <div class="col-xs-12">\
            <div class="page-header w-100 mb-3">\
                <div class="pull-right form-inline">\
                    <div class="btn-group mb-3">\
                        <span class="btn btn-primary" data-calendar-nav="prev">\
                            <i class="fa fa-chevron-circle-left" aria-hidden="true"></i>&nbsp;Prev.\
                        </span>\
                        <span class="btn light" data-calendar-nav="today">Hoy</span>\
                        <span class="btn btn-primary" data-calendar-nav="next">\
                            Sig.&nbsp;<i class="fa fa-chevron-circle-right" aria-hidden="true"></i>\
                        </span>\
                    </div>\
                    <div class="pl-3 d-xs-none"></div>\
                    <div class="btn-group mb-3">\
                        <span class="btn btn-light" data-calendar-view="year">Año</span>\
                        <span class="btn btn-light active" data-calendar-view="month">Mes</span>\
                        <span class="btn btn-light" data-calendar-view="week">Semana</span>\
                        <span class="btn btn-light" data-calendar-view="day">Día</span>\
                    </div>\
                </div>\
                <h3></h3>\
            </div>\
        </div>\
    </div>\
    <div class="row mb-3">\
        <div class="col-xs-12">\
            <div id="calendar" class="calendar"></div>\
        </div>\
    </div>\
    <div id="divLeyenda" class="row">\
        <div class="col-xs-5 noPadding">\
            <div id="divLegend" class="">\
                <span class="separator" style="color: #666;"> Leyenda:\
                </span>\
                <div class="row row-noPadding">\
                    <div class="col-md-1">\
                        <div class="legend bgNegro"></div>\
                    </div>\
                    <div class="col-md-11">\
                        Vigilancia de vertido\
                    </div>\
                </div>\
                <div class="row row-noPadding">\
                    <div class="col-md-1">\
                        <div class="legend bgNegroyRojo"></div>\
                    </div>\
                    <div class="col-md-11">\
                        Muestreo\
                    </div>\
                </div>\
                <div class=" row row-noPadding">\
                    <div class="col-md-1">\
                        <div class="legend bgAmarillo"></div>\
                    </div>\
                    <div class="col-md-11">\
                        Inspección de vertido\
                    </div>\
                </div>\
                <div class="row row-noPadding">\
                    <div class="col-md-1">\
                        <div class="legend bgNaranja"></div>\
                    </div>\
                    <div class="col-md-11">\
                        Inspección de obra\
                    </div>\
                </div>\
                <div class="row row-noPadding">\
                    <div class="col-md-1">\
                        <div class="legend bgAzul"></div>\
                    </div>\
                    <div class="col-md-11">\
                        Inspección de concesión\
                    </div>\
                </div>\
                <div class="row row-noPadding">\
                    <div class="col-md-1">\
                        <div class="legend bgCheck">\
                            <i class="fa fa-check pr-1" style="color: black" aria-hidden="true"></i>\
                        </div>\
                    </div>\
                    <div class="col-md-11">\
                        Completada\
                    </div>\
                </div>\
                <div class="row row-noPadding">\
                    <div class="col-md-1">\
                        <div class="legend bgExclamation">\
                            <i class="fa fa-exclamation pr-1" style="color: black; padding: 6px 7px;" aria-hidden="true"></i>\
                        </div>\
                    </div>\
                    <div class="col-md-11">\
                        La fecha fin de trámite está próxima/vencida\
                    </div>\
                </div>\
            </div>\
        </div>\
    </div>\
    <br>';
    $('#content').append(html);
    
    var opts = {
        tmpl_path: testutils.DIST +'/html/templates/rup_calendar/',
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
        },
    };
    $('#calendar').rup_calendar(opts);

    $('.btn-group span[data-calendar-nav]').each((i, e) => {
        let $elem = $(e);
        $elem.click(function () {
            calendar.navigate($elem.data('calendar-nav'));
        });
    });

    $('.btn-group span[data-calendar-view]').each((i, e) => {
        let $elem = $(e);
        $elem.click(function () {
            calendar.setView($elem.data('calendar-view'));
            $('.btn-group span[data-calendar-view].active').removeClass('active');
            $elem.addClass('active');
        });
    });
    callback();
}
