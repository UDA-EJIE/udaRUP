var evts = [{
    "id": "48605",
    "title": "<span><strong>AUTORIZACIÓN DE VERTIDO DE AGUAS RESIDUALES PROCEDENTES DE ESTACIÓN DE SERVICIO Nº 7338 EN ARKAUTE, T.M .DE VITORIA-GASTEIZ</strong><ul class='pl-3'><li>Nºexp.:&nbsp;VDP-A-2012-0382</li><li>P.vertido:&nbsp;PV1</li><li>Id.flujo:&nbsp;F1</li><li>Requiere muestra&nbsp;</li><li><i class='fa fa-check pr-1' aria-hidden='true'></i>COMPLETADA</li></ul></span>",
    "start": '' + new Date('2019-06-02').getTime(),
    "class": " vertido muestreo completada",
    "end": '' + new Date('2019-06-03').getTime(),
    "url": "javascript:actions(48605)"
}, {
    "id": "47278",
    "title": "<span><strong>REVISION DE LA AUTORIZACION DE VERTIDO DE AGUAS RESIDUALES DE LA LOCALIDAD DE ILARRATZA (2 P. VERTIDO), T.M. DE VITORIA-GASTEIZ. (REV. 2009-S-0372)</strong><ul class='pl-3'><li>Nºexp.:&nbsp;RAV-A-2014-0058</li><li>P.vertido:&nbsp;PV1</li><li>Id.flujo:&nbsp;F1</li></ul></span>",
    "start": '' + new Date('2019-06-05').getTime(),
    "class": " vertido vigilancia",
    "end": '' + new Date('2019-06-06').getTime(),
    "url": "javascript:actions(47278)"
}];

exports.getEvents = function (req, res) {
    var ret = {
        success: true,
        result: evts
    };
    res.status(200).json(ret);
};

exports.addEvent = function (req, res) {
    evts.push({
        "id": "48506",
        "title": "<span><strong>AUTORIZACIÓN DE VERTIDO DE AGUAS RESIDUALES PROCEDENTES DE ESTACIÓN DE SERVICIO Nº 7338 EN ARKAUTE, T.M .DE VITORIA-GASTEIZ</strong><ul class='pl-3'><li>Nºexp.:&nbsp;VDP-A-2012-0382</li><li>P.vertido:&nbsp;PV1</li><li>Id.flujo:&nbsp;F1</li><li>Requiere muestra&nbsp;</li><li><i class='fa fa-check pr-1' aria-hidden='true'></i>COMPLETADA</li></ul></span>",
        "start": '' + new Date('2019-06-08').getTime(),
        "class": " vertido muestreo completada",
        "end": '' + new Date('2019-06-09').getTime(),
        "url": "javascript:actions(48506)"
    });
    res.status(200).json({
        'success': true
    });
};

exports.restore = function (req, res) {
    evts = evts.filter(e => e.id != '48506');
    res.status(200).json({
        'success': true
    });
};