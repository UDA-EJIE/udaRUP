
const card1 = {
    usuario:'user1'
    , email:'user1@mail.com'
    , edad: 20
    , codCliente: 234
    , codigoPK: 1
    , condition: 'vip'
    , credito: 100
};
const card2 = {
    usuario:'user2'
    , email:'user2@mail.com'
    , edad: 17
    , codCliente: 235
    , codigoPK: 2
    , condition: 'vip'
    , credito: 100
};
const card3 = {
    usuario:'user3'
    , email:'user3@mail.com'
    , edad: 34
    , codCliente: 236
    , codigoPK: 3
    , condition: 'vip'
    , credito: 100
};
const card4 = {
    usuario:'user4'
    , email:'user4@mail.com'
    , edad: 40
    , codCliente: 237
    , codigoPK: 4
    , condition: 'novip'
    , credito: 100
};
const card5 = {
    usuario:'user5'
    , email:'user5@mail.com'
    , edad: 25
    , codCliente: 238
    , codigoPK: 5
    , condition: 'novip'
    , credito: 100
};
const card6 = {
    usuario:'user6'
    , email:'user6@mail.com'
    , edad: 22
    , codCliente: 239
    , codigoPK: 6
    , condition: 'vip'
    , credito: 100
};

const allregs = JSON.parse(JSON.stringify([card1, card2, card3, card4, card5, card6]));

function getResult(req) {
    var filtered;
    if(req.body.filter) {
        filtered = allregs.filter((e) => {
            var matches = true;
            Object.keys(req.body.filter).forEach((val) => {
                if(req.body.filter[val] != e[val]){
                    matches = false;
                }
            });
            return matches;
        });
    } else {
        filtered = JSON.parse(JSON.stringify(allregs));
    }

    var ordered = filtered; //TODO: Implementar ordenación
    var paginasTotales;
    var paginated = (() => {
        let paginatedArray = [];
        let paginasCompletas = Math.floor(ordered.length/req.body.rows);
        if(ordered.length%req.body.rows != 0){
            paginasTotales = paginasCompletas + 1;
        } else {
            paginasTotales = paginasCompletas;
        }
        //Separamos los registros por páginas
        for(let i = 0; i < paginasTotales; i++) {
            let tmpArr = ordered.slice(i*req.body.rows, (i+1)*req.body.rows);
            paginatedArray.push(tmpArr);
        }
        return paginatedArray;
    })();

    var estructura = {
        page: req.body.page
        , rows: paginated[req.body.page - 1]
        , total: paginasTotales
        , records: ordered.length
        , selectedAll: null
        , reorderedSelection: null
    };

    //Devolvemos los datos a la lista
    return estructura;

}
exports.filter = (req, res) => {
    var resultado = getResult(req);
    res.status(200).json(resultado);
};
