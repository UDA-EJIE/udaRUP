
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
const card7 = {
    usuario:'user7'
    , email:'user7@mail.com'
    , edad: 23
    , codCliente: 240
    , codigoPK: 7
    , condition: 'novip'
    , credito: 100
};
const card8 = {
    usuario:'user8'
    , email:'user8@mail.com'
    , edad: 18
    , codCliente: 241
    , codigoPK: 8
    , condition: 'vip'
    , credito: 100
};
const card9 = {
    usuario:'user9'
    , email:'user9@mail.com'
    , edad: 39
    , codCliente: 242
    , codigoPK: 9
    , condition: 'vip'
    , credito: 100
};
const card10 = {
    usuario:'user10'
    , email:'user10@mail.com'
    , edad: 40
    , codCliente: 243
    , codigoPK: 10
    , condition: 'novip'
    , credito: 100
};
const card11 = {
    usuario:'user11'
    , email:'user11@mail.com'
    , edad: 21
    , codCliente: 244
    , codigoPK: 11
    , condition: 'novip'
    , credito: 100
};
const card12 = {
    usuario:'user12'
    , email:'user12@mail.com'
    , edad: 12
    , codCliente: 245
    , codigoPK: 12
    , condition: 'vip'
    , credito: 100
};

const allregs = JSON.parse(JSON.stringify(
    [card1, card2, card3, card4, card5, card6, card7, card8, card9, card10, card11, card12]));

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
    ordered =(() => {
        let filterRes = filtered.slice(0);
        let idx = req.body.sidx.toLowerCase();
        let ord = req.body.sord.toLowerCase();
 
        switch(idx) {
        case 'usuario':
            filterRes.sort((a,b) => {
                if(a.usuario < b.usuario) {
                    return -1;
                }
                if(a.usuario > b.usuario) {
                    return 1;
                }
                return 0;
            });
            break;
        case 'edad':
            filterRes.sort((a,b) => {
                if(a.edad < b.edad) {
                    return -1;
                }
                if(a.edad > b.edad) {
                    return 1;
                }
                return 0;
            });
            break;
        case 'codcliente':
            filterRes.sort((a,b) => {
                if(a.codCliente < b.codCliente) {
                    return -1;
                }
                if(a.codCliente > b.codCliente) {
                    return 1;
                }
                return 0;
            });
            break;
        }
        if(ord == 'desc') {
            return filterRes.reverse();
        }
        return filterRes;
    })();
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
