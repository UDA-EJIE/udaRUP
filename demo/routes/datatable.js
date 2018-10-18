var json = {
    page: '1',
    rows: [
        { id: '1', nombre: 'Ana', apellidos: 'García Vázquez', edad: '7' },
        { id: '2', nombre: 'Pedro', apellidos: 'Allende Zabala', edad: '9' },
        { id: '3', nombre: 'Irene', apellidos: 'San Jose', edad: '8' },
        { id: '4', nombre: 'Erlantz', apellidos: 'Carrasson Pando', edad: '68' },
        { id: '5', nombre: 'Eider', apellidos: 'Ahedo Dominguez', edad: '70' }
    ],
    total: '3',
    records: 15
};

var jsonOrderedAsc ={
    page: '1',
    rows: [
        { id: '1', nombre: 'Ana', apellidos: 'García Vázquez', edad: '7' },
        { id: '5', nombre: 'Eider', apellidos: 'Ahedo Dominguez', edad: '70' },
        { id: '4', nombre: 'Erlantz', apellidos: 'Carrasson Pando', edad: '68' },
        { id: '3', nombre: 'Irene', apellidos: 'San Jose', edad: '8' },
        { id: '2', nombre: 'Pedro', apellidos: 'Allende Zabala', edad: '9' }
    ],
    total: '3',
    records: 15
};
var jsonOrderedDesc ={
    page: '1',
    rows: [
        { id: '2', nombre: 'Pedro', apellidos: 'Allende Zabala', edad: '9' },
        { id: '3', nombre: 'Irene', apellidos: 'San Jose', edad: '8' },
        { id: '4', nombre: 'Erlantz', apellidos: 'Carrasson Pando', edad: '68' },
        { id: '5', nombre: 'Eider', apellidos: 'Ahedo Dominguez', edad: '70' },
        { id: '1', nombre: 'Ana', apellidos: 'García Vázquez', edad: '7' }
    ],
    total: '3',
    records: 15
};

var json2 = {
    page: '2',
    rows: [
        { id: '6', nombre: 'Andoni', apellidos: 'García Vázquez', edad: '32' },
        { id: '7', nombre: 'paco', apellidos: 'Allende Chicharro', edad: '20' },
        { id: '8', nombre: 'Maria', apellidos: 'Gumuzio Ayo', edad: '22' },
        { id: '9', nombre: 'Ekaitz', apellidos: 'Zabala Pando', edad: '23' },
        { id: '10', nombre: 'Juaquin', apellidos: 'Camison Dominguez', edad: '15' }
    ],
    total: '3',
    records: 15
};

var json3 = {
    page: '3',
    rows: [
        { id: '11', nombre: 'Kevin', apellidos: 'Agüero Vázquez', edad: '32' },
        { id: '12', nombre: 'Roberto', apellidos: 'Arana Chicharro', edad: '20' },
        { id: '13', nombre: 'Luis', apellidos: 'Tejedor Ayo', edad: '22' },
        { id: '14', nombre: 'Javi', apellidos: 'Pérez Pando', edad: '23' },
        { id: '15', nombre: 'Hugo', apellidos: 'Boss Dominguez', edad: '17' }
    ],
    total: '3',
    records: 15
};

var json4 = {
    page: '1',
    rows: [
        { id: '1', nombre: 'Ana', apellidos: 'García Vázquez', edad: '7' },
        { id: '2', nombre: 'Pedro', apellidos: 'Allende Zabala', edad: '9' },
        { id: '3', nombre: 'Irene', apellidos: 'San Jose', edad: '8' },
        { id: '4', nombre: 'Erlantz', apellidos: 'Carrasson Pando', edad: '68' },
        { id: '5', nombre: 'Eider', apellidos: 'Ahedo Dominguez', edad: '70' },
        { id: '6', nombre: 'Andoni', apellidos: 'García Vázquez', edad: '32' },
        { id: '7', nombre: 'paco', apellidos: 'Allende Chicharro', edad: '20' },
        { id: '8', nombre: 'Maria', apellidos: 'Gumuzio Ayo', edad: '22' },
        { id: '9', nombre: 'Ekaitz', apellidos: 'Zabala Pando', edad: '23' },
        { id: '10', nombre: 'Juaquin', apellidos: 'Camison Dominguez', edad: '15' }
    ],
    total: '2',
    records: 15
};

var jsonMDInterFilter1 =  {
    page: '1',
    rows: [
        { id: '1', nombre: 'Ana', apellidos: 'García Vázquez', edad: '7' },
    ],
    total: '3',
    records: 15
};

var jsonMDInterFilter2 =  {
    page: '1',
    rows: [
        { id: '2', nombre: 'Pedro', apellidos: 'Allende Zabala', edad: '9' },
    ],
    total: '3',
    records: 15
};
var jsonIDFilter1 = {
    page: '1',
    rows: [
        { id: '3', nombre: 'Irene', apellidos: 'San Jose', edad: '8' },
        { id: '4', nombre: 'Erlantz', apellidos: 'Carrasson Pando', edad: '68' },
        { id: '5', nombre: 'Eider', apellidos: 'Ahedo Dominguez', edad: '70' }
    ],
    total: '2',
    records: 6
};
var jsonIDFilter2 = {
    page: '2',
    rows: [
        { id: '5', nombre: 'Eider', apellidos: 'Ahedo Dominguez', edad: '70' },
        { id: '6', nombre: 'Andoni', apellidos: 'García Vázquez', edad: '32' },
        { id: '7', nombre: 'paco', apellidos: 'Allende Chicharro', edad: '20' }
    ],
    total: '2',
    records: 6
};
var jsonIDFilterOrdered1 = {
    page: '1',
    rows: [
        { id: '5', nombre: 'Eider', apellidos: 'Ahedo Dominguez', edad: '70' },
        { id: '4', nombre: 'Erlantz', apellidos: 'Carrasson Pando', edad: '68' },
        { id: '3', nombre: 'Irene', apellidos: 'San Jose', edad: '8' }
    ],
    total: '2',
    records: 6
};

exports.filter = (req, res) => {
    //console.info(req.body);
    if(req.body.filter.id == '6') {
        throw 'KABOOM!';
    }
    let respuesta = {};
    if (req.body.filter.id == '4') {
        respuesta = {
            page: '1',
            rows: [
                { id: '4', nombre: 'Erlantz', apellidos: 'Carrasson Pando', edad: '23' }
            ],
            total: '1',
            records: 1
        };
    } else {
        if(req.body.filter.id == '5') {
            if(req.body.filter.id == '5') {
                respuesta = {
                    page: '1',
                    rows: [
                        { id: '5', nombre: 'Eider', apellidos: 'Ahedo Dominguez', edad: '70' }
                    ],
                    total: '1',
                    records: 1
                };
            }
        }
        else {
            if(req.body.length == 10) {
                respuesta = json4;
            }
            else{
                let mdFilter1 = '{"id": "1", "nombre": "Ana", "apellidos": "García Vázquez", "edad": "7"}';
                let mdFilter2 = '{"id": "2", "nombre": "Pedro", "apellidos": "Allende Zabala", "edad": "9"}';
                let idFilter1 = '{"id":"3","nombre":"Irene","apellidos":"San Jose","edad":"8"}'
                let idFilter2 = '{"id":"5","nombre":"Eider","apellidos":"Ahedo Dominguez","edad":"70"}'
                
                if(JSON.stringify(req.body.filter) == mdFilter1 ||
                    JSON.stringify(req.body.filter) == mdFilter2 ||
                    JSON.stringify(req.body.filter) == idFilter1) {
                    if(JSON.stringify(req.body.filter) == mdFilter1) {
                        respuesta = jsonMDInterFilter1;
                    }
                    if(JSON.stringify(req.body.filter) == mdFilter2) {
                        respuesta = jsonMDInterFilter2;
                    }
                    if(JSON.stringify(req.body.filter) == idFilter1) {
                        if(req.body.sidx == 'nombre' && req.body.sord == 'asc') {
                            respuesta = jsonIDFilterOrdered1;
                        }
                        else {
                            if(req.body.page == 2) {
                                respuesta = jsonIDFilter2;
                            }
                            else {
                                respuesta = jsonIDFilter1;
                            }
                        }
                    }
                    if(JSON.stringify(req.body.filter) == idFilter2) {
                        respuesta = jsonIDFilter2;
                    }
                }
                else {
                    if(req.body.filter.id == '2' || req.body.filter.id == '1') {
                        if(req.body.filter.id == '1') {
                            respuesta = jsonMDInterFilter1;
                        }
                        if(req.body.filter.id == '2') {
                            respuesta = jsonMDInterFilter2;
                        }
                    }
                    else {
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
                            if(req.body.sord == 'asc') {
                                respuesta = jsonOrderedAsc;
                            }
                            if(req.body.sord == 'desc') {
                                respuesta = jsonOrderedDesc;
                            }
                        }
                    }
                    
                }
            }
        }
        
    }

    res.status(200).json(respuesta);
};

exports.search = (req, res) => {
    let search = req.body.search;
    if(search.edad === 'asd') {
        throw 'KABOOM!';
    }
    //console.info(search);
    if (search.nombre === 'E') {
        let ret = [
            {
                "page": 1,
                "pageLine": 4,
                "tableLine": 4,
                "pk": {
                    "id": "4"
                }
            },
            {
                "page": 1,
                "pageLine": 5,
                "tableLine": 5,
                "pk": {
                    "id": "5"
                }
            }
        ];
        res.status(200).json(ret);
        return;
    }
    res.status(200).json([]);
};
exports.simple = (req, res) => {
    let respuesta = req.body;
    res.status(200).json(respuesta);
};
exports.formEdit = (req, res) => {
    if(req.body.edad === 'asd') {
        throw 'KABOOM!';
    }
    let respuesta = req.body;
    res.status(200).json(respuesta);
};