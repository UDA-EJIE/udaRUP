define(['marionette',
	'./calendarTestTemplate.hbs',
	'rup.calendar', 'rup.button'
], function (Marionette, CalendarTestTemplate) {

	var CalendarTestView = Marionette.LayoutView.extend({
		template: CalendarTestTemplate,
		ui: {
			calendar: '#calendar'
		},
		onAttach: fncOnAttach
	});

	function fncOnAttach() {
		//Necesario para que Webpack cargue las templates
		let tmpls = {
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

		//CALENDARIO
		var options = {
			events_source: function () {
				return [{
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
			},
			extraParams: {
				calFilter: $('#calendario_filter_form').rup_form().formToJson()
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

		var calendar = $(this.ui.calendar).rup_calendar(options);

		$('.btn-group span[data-calendar-nav]').each((i, e) => {
			let $elem = $(e);
			$elem.click(function () {
				calendar.navigate($elem.data('calendar-nav'));
			});
		});

		$('.btn-group span[data-calendar-view]').each((i, e) => {
			let $elem = $(e);
			$elem.click(function () {
				calendar.view($elem.data('calendar-view'));
				$('.btn-group span[data-calendar-view].active').removeClass('active');
				$elem.addClass('active');
			});
		});
	}

	return CalendarTestView;
});