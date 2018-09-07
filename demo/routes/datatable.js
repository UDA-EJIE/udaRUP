var json = {
    page:'1',
    rows:[
        { id: '1', nombre:'Ana', apellidos: 'García Vázquez', edad: '32'},
        { id: '2', nombre:'Pedro', apellidos: 'Allende Zabala', edad: '20'},
        { id: '3', nombre:'Irene', apellidos: 'San Jose', edad: '22'},
        { id: '4', nombre:'Erlantz', apellidos: 'Carrasson Pando', edad: '23'},
        { id: '5', nombre:'Eider', apellidos: 'Ahedo Dominguez', edad: '12'}
    ],
    total:'1',
    records:5
};

exports.filter = (req, res) => {
    console.info(req.body.filter);
    let respuesta = {};
    if(req.body.filter.id == '4') {
        respuesta = {
            page:'1',
            rows:[
                { id: '4', nombre:'Erlantz', apellidos: 'Carrasson Pando', edad: '23'}
            ],
            total:'1',
            records:1
        };
    }

    res.status(200).json(respuesta);
};