var json = {
    page: '1',
    rows: [{
            id: '1',
            nombre: 'Ana',
            apellidos: 'García Vázquez',
            edad: '32'
        },
        {
            id: '2',
            nombre: 'Pedro',
            apellidos: 'Allende Zabala',
            edad: '20'
        },
        {
            id: '3',
            nombre: 'Irene',
            apellidos: 'San Jose',
            edad: '22'
        },
        {
            id: '4',
            nombre: 'Erlantz',
            apellidos: 'Carrasson Pando',
            edad: '23'
        },
        {
            id: '5',
            nombre: 'Eider',
            apellidos: 'Ahedo Dominguez',
            edad: '12'
        }
    ],
    total: '2',
    records: 10
};

var json2 = {
    page: '2',
    rows: [{
            id: '6',
            nombre: 'Andoni',
            apellidos: 'García Vázquez',
            edad: '32'
        },
        {
            id: '7',
            nombre: 'paco',
            apellidos: 'Allende Chicharro',
            edad: '20'
        },
        {
            id: '8',
            nombre: 'Maria',
            apellidos: 'Gumuzio Ayo',
            edad: '22'
        },
        {
            id: '9',
            nombre: 'Ekaitz',
            apellidos: 'Zabala Pando',
            edad: '23'
        },
        {
            id: '10',
            nombre: 'Juaquin',
            apellidos: 'Camison Dominguez',
            edad: '12'
        }
    ],
    total: '2',
    records: 10
}

exports.filter = (req, res) => {
    console.info(req.body.filter);
    let respuesta = {};
    if (req.body.filter.id == '4') {
        respuesta = {
            page: '1',
            rows: [{
                id: '4',
                nombre: 'Erlantz',
                apellidos: 'Carrasson Pando',
                edad: '23'
            }],
            total: '1',
            records: 1
        };
    } else {
        if (req.body.page == 2) {
            respuesta = json2;
        } else {
            respuesta = json;
        }
    }

    res.status(200).json(respuesta);
};

exports.search = (req, res) => {
    let search = req.body.search;
    console.info(search);
    if (search.nombre === 'E') {
        let ret = [{
            "page": 1,
            "pageLine": 4,
            "tableLine": 4,
            "pk": {
                "id": "4"
            }
        }, {
            "page": 1,
            "pageLine": 5,
            "tableLine": 5,
            "pk": {
                "id": "5"
            }
        }];
        res.status(200).json(ret);
        return;
    }
    if (search === {}) {
        console.info('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
        console.info('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
        console.info('Search vacío');
    }
    res.status(200).json([]);
};