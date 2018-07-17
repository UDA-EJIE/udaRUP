exports.remote = (req, res) => {
    let json = [
        { id: '1', nombre:'Ana', apellidos: 'García Vázquez', edad: 32},
        { id: '2', nombre:'Pedro', apellidos: 'Allende Zabala', edad: 20},
        { id: '1', nombre:'Irene', apellidos: 'San Jose', edad: 22},
        { id: '1', nombre:'Erlantz', apellidos: 'Carrasson Pando', edad: 23},
        { id: '1', nombre:'Eider', apellidos: 'Ahedo Dominguez', edad: 12},
    ]
    res.status(200).json(json);
}