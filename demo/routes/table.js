/* eslint no-console:0 */

const ANA = {
    id: '1',
    nombre: 'Ana',
    apellidos: 'García Vázquez',
    edad: '7'
};
const PEDRO = {
    id: '2',
    nombre: 'Pedro',
    apellidos: 'Allende Zabala',
    edad: '9'
};
const IRENE = {
    id: '3',
    nombre: 'Irene',
    apellidos: 'San Jose',
    edad: '8'
};
const ERLANTZ = {
    id: '4',
    nombre: 'Erlantz',
    apellidos: 'Carrasson Pando',
    edad: '23'
};
const EIDER = {
    id: '5',
    nombre: 'Eider',
    apellidos: 'Ahedo Dominguez',
    edad: '70'
};
const ANDONI = {
    id: '6',
    nombre: 'Andoni',
    apellidos: 'García Vázquez',
    edad: '32'
};
const PACO = {
    id: '7',
    nombre: 'Paco',
    apellidos: 'Allende Chicharro',
    edad: '20'
};
const MARIA = {
    id: '8',
    nombre: 'Maria',
    apellidos: 'Gumuzio Ayo',
    edad: '22'
};
const EKAITZ = {
    id: '9',
    nombre: 'Ekaitz',
    apellidos: 'Zabala Pando',
    edad: '23'
};
const JUAQUIN = {
    id: '10',
    nombre: 'Juaquin',
    apellidos: 'Camison Dominguez',
    edad: '15'
};
const KEVIN = {
    id: '11',
    nombre: 'Kevin',
    apellidos: 'Agüero Vázquez',
    edad: '32'
};
const ROBERTO = {
    id: '12',
    nombre: 'Roberto',
    apellidos: 'Arana Chicharro',
    edad: '20'
};
const LUIS = {
    id: '13',
    nombre: 'Luis',
    apellidos: 'Tejedor Ayo',
    edad: '22'
};
const JAVI = {
    id: '14',
    nombre: 'Javi',
    apellidos: 'Pérez Pando',
    edad: '23'
};
const HUGO = {
    id: '15',
    nombre: 'Hugo',
    apellidos: 'Boss Dominguez',
    edad: '17'
};

const C_JSON = {
    page: '1',
    rows: [ANA, PEDRO, IRENE, ERLANTZ, EIDER],
    total: '3',
    records: 15
};

const C_JSONORDEREDASC = {
    page: '1',
    rows: [ANA, EIDER, ERLANTZ, IRENE, PEDRO],
    total: '3',
    records: 15
};
const C_JSONORDEREDDESC = {
    page: '1',
    rows: [PEDRO, IRENE, ERLANTZ, EIDER, ANA],
    total: '3',
    records: 15
};

const C_JSON2 = {
    page: '2',
    rows: [ANDONI, PACO, MARIA, EKAITZ, JUAQUIN],
    total: '3',
    records: 15
};

const C_JSON3 = {
    page: '3',
    rows: [KEVIN, ROBERTO, LUIS, JAVI, HUGO],
    total: '3',
    records: 15
};

const C_JSON4 = {
    page: '1',
    rows: [ANA, PEDRO, IRENE, ERLANTZ, EIDER, ANDONI, PACO, MARIA, EKAITZ, JUAQUIN],
    total: '2',
    records: 15
};

const C_JSON4_2 = {
    page: '2',
    rows: [KEVIN, ROBERTO, LUIS, JAVI, HUGO],
    total: '2',
    records: 15
};

const C_JSON4ORDERED = {
    page: '1',
    rows: [ANA, ANDONI, EIDER, EKAITZ, ERLANTZ, IRENE, JUAQUIN, MARIA, PACO, PEDRO],
    total: '2',
    records: 15
};
const C_JSON4ORDEREDINV = {
    page: '1',
    rows: [PEDRO, PACO, MARIA, JUAQUIN, IRENE, ERLANTZ, EKAITZ, EIDER, ANDONI, ANA],
    total: '2',
    records: 15
};
const C_JSON4BACKUP = {
    page: '1',
    rows: [ANA, PEDRO, IRENE, ERLANTZ, EIDER, ANDONI, PACO, MARIA, EKAITZ, JUAQUIN],
    total: '2',
    records: 15
};

const C_JSONMDINTERFILTER1 = {
    page: '1',
    rows: [ANA],
    total: '3',
    records: 15
};

const C_JSONMDINTERFILTER2 = {
    page: '1',
    rows: [PEDRO],
    total: '3',
    records: 15
};
const C_JSONIDFILTER1 = {
    page: '1',
    rows: [IRENE, ERLANTZ, EIDER],
    total: '2',
    records: 6
};
const C_JSONIDFILTER2 = {
    page: '2',
    rows: [EIDER, ANDONI, PACO],
    total: '2',
    records: 6
};
const C_JSONIDFILTERORDERED1 = {
    page: '1',
    rows: [EIDER, ERLANTZ, IRENE],
    total: '2',
    records: 6
};

var json = JSON.parse(JSON.stringify(C_JSON));
var jsonOrderedAsc = JSON.parse(JSON.stringify(C_JSONORDEREDASC));
var jsonOrderedDesc = JSON.parse(JSON.stringify(C_JSONORDEREDDESC));
var json2 = JSON.parse(JSON.stringify(C_JSON2));
var json3 = JSON.parse(JSON.stringify(C_JSON3));
var json4 = JSON.parse(JSON.stringify(C_JSON4));
var json4_2 = JSON.parse(JSON.stringify(C_JSON4_2));
var json4Ordered = JSON.parse(JSON.stringify(C_JSON4ORDERED));
var json4OrderedInv = JSON.parse(JSON.stringify(C_JSON4ORDEREDINV));
var json4Backup = JSON.parse(JSON.stringify(C_JSON4BACKUP));
var jsonMDInterFilter1 = JSON.parse(JSON.stringify(C_JSONMDINTERFILTER1));
var jsonMDInterFilter2 = JSON.parse(JSON.stringify(C_JSONMDINTERFILTER2));
var jsonIDFilter1 = JSON.parse(JSON.stringify(C_JSONIDFILTER1));
var jsonIDFilter2 = JSON.parse(JSON.stringify(C_JSONIDFILTER2));
var jsonIDFilterOrdered1 = JSON.parse(JSON.stringify(C_JSONIDFILTERORDERED1));

function getFilterResp(req) {
    let respuesta = {};
    if (req.body.filter.id == '6') {
        return 'KABOOM!';
    }
    if (json4.rows[0].nombre == 'Ane') {
        return json4;
    }
    if (req.body.page == 2) {
        return json4_2;
    }
    if (req.body.filter.id == '4') {
        respuesta = {
            page: '1',
            rows: [
                ERLANTZ
            ],
            total: '1',
            records: 1
        };
    } else {
        if (req.body.filter.id == '5') {
            respuesta = {
                page: '1',
                rows: [
                    EIDER
                ],
                total: '1',
                records: 1
            };
        } else {
            if (req.body.length == 10 ) {
                respuesta = json4;
                if (req.body.sidx == 'nombre' && req.body.sord == 'asc') {
                    respuesta = json4Ordered;
                }
                if (req.body.sidx == 'nombre' && req.body.sord == 'desc') {
                    respuesta = json4OrderedInv;
                }
            } else {
                if (req.body.filter.id == 1 ||
                    req.body.filter.id == 2 ||
                    req.body.filter.id == 3) {
                    if (req.body.filter.id == 1) {
                        respuesta = jsonMDInterFilter1;
                    }
                    if (req.body.filter.id == 2) {
                        respuesta = jsonMDInterFilter2;
                    }
                    if (req.body.filter.id == 3) {
                        if (req.body.sidx == 'nombre' && req.body.sord == 'asc') {
                            respuesta = jsonIDFilterOrdered1;
                        } else {
                            if (req.body.page == 2) {
                                respuesta = jsonIDFilter2;
                            } else {
                                respuesta = jsonIDFilter1;
                            }
                        }
                    }
                    if (req.body.filter.id == 5) {
                        respuesta = jsonIDFilter2;
                    }
                } else {
                    if (req.body.filter.id == '2' || req.body.filter.id == '1') {
                        if (req.body.filter.id == '1') {
                            respuesta = jsonMDInterFilter1;
                        }
                        if (req.body.filter.id == '2') {
                            respuesta = jsonMDInterFilter2;
                        }
                    } else {
                        if (req.body.page == 1) {
                            respuesta = json;
                        }
                        if (req.body.page == 2) {
                            respuesta = json2;
                        }
                        if (req.body.page == 3) {
                            respuesta = json3;
                        }
                        if (req.body.sidx == 'nombre') {
                            if (req.body.sord == 'asc') {
                                respuesta = jsonOrderedAsc;
                            }
                            if (req.body.sord == 'desc') {
                                respuesta = jsonOrderedDesc;
                            }
                        }
                    }
                }
            }
        }
    }

    return respuesta;
}

function getFilterStatus(req) {
    if (req.body.filter.id == '6') {
        return 406;
    } else {
        return 200;
    }
}
exports.filter = (req, res) => {
    let respuesta = getFilterResp(req);
    res.status(getFilterStatus(req));
    if (respuesta) {
        res.json(respuesta);
    } else {
        res.send('KABOOM');
    }
};

exports.search = (req, res) => {
    let search = req.body.search;
    if (search.edad === 'asd') {
        res.status(406);
        res.send('KABOOM');
        return;
    }
    if (search.nombre === 'E') {
        let ret = [{
            'page': 1,
            'pageLine': 4,
            'tableLine': 4,
            'pk': {
                'id': '4'
            }
        },
        {
            'page': 1,
            'pageLine': 5,
            'tableLine': 5,
            'pk': {
                'id': '5'
            }
        }
        ];
        res.status(200).json(ret);
    } else {
        res.status(200).json([]);
    }
};
exports.simple = (req, res) => {
    let respuesta = req.body;
    res.status(200).json(respuesta);
};
exports.formEdit = (req, res) => {
    if (req.body.edad === 'asd') {
        res.status(406);
        res.send('KABOOM!');
        return;
    }

    if (req.body.nombre == 'Ane') {
        json4.rows[0].nombre = 'Ane';
    } else {
        json4.rows[0].edad = req.body.edad;
    }
    if (req.body.nombre == 'Adriana' && json4.rows[0].id != 345) {
        let newReg = {
            id: req.body.id,
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            edad: req.body.edad
        };
        json4.rows.pop();
        json4.rows.splice(0, 0, newReg);
    }
    res.status(200).json(json4);

};
exports.delete = (req, res) => {
    json4.rows = json4.rows.filter((e) => {
        return e.id != req.params.id;
    });
    json4.records = 5 + json.rows.length;
    res.status(200).json(json4);
};
exports.deleteEnd = (req, res) => {
    json4 = json4Backup;
    res.status(200).json(json4);
};
exports.getReg = (req, res) => {
    if (req.params.id == 3) {
        res.status(200).json(IRENE);
    }
    if (req.params.id == 1) {
        res.status(200).json(ANA);
    }
};
exports.reset = (req, res) => {
    json = JSON.parse(JSON.stringify(C_JSON));
    jsonOrderedAsc = JSON.parse(JSON.stringify(C_JSONORDEREDASC));
    jsonOrderedDesc = JSON.parse(JSON.stringify(C_JSONORDEREDDESC));
    json2 = JSON.parse(JSON.stringify(C_JSON2));
    json3 = JSON.parse(JSON.stringify(C_JSON3));
    json4 = JSON.parse(JSON.stringify(C_JSON4));
    json4_2 = JSON.parse(JSON.stringify(C_JSON4_2));
    json4Ordered = JSON.parse(JSON.stringify(C_JSON4ORDERED));
    json4OrderedInv = JSON.parse(JSON.stringify(C_JSON4ORDEREDINV));
    json4Backup = JSON.parse(JSON.stringify(C_JSON4BACKUP));
    jsonMDInterFilter1 = JSON.parse(JSON.stringify(C_JSONMDINTERFILTER1));
    jsonMDInterFilter2 = JSON.parse(JSON.stringify(C_JSONMDINTERFILTER2));
    jsonIDFilter1 = JSON.parse(JSON.stringify(C_JSONIDFILTER1));
    jsonIDFilter2 = JSON.parse(JSON.stringify(C_JSONIDFILTER2));
    jsonIDFilterOrdered1 = JSON.parse(JSON.stringify(C_JSONIDFILTERORDERED1));
    res.status(200).json({});
};