/* eslint-env jasmine, jquery */


describe('RUP Utils Tests', function(){

    /*
      * Tests del método capitalizedLang
      */
    describe('Tests del método capitalizedLang', function(){
        it('debería devolver el idioma capitalizado', function(){
            $.rup  = $.rup || {};
            $.rup.lang ='es';
            var capitalizedLang = $.rup_utils.capitalizedLang();
            expect(capitalizedLang).toEqual('Es');
        });
    });


    /*
      * Tests del método jsontoarray
      */
    describe('Tests del método jsontoarray', function(){
        it('debería transformar un json obj={\'prop\':\'value\'} en un array arr[\'prop\'] -> \'value\'', function(){
            var jsonObj, arrObj, expectedObj;

            jsonObj = {'prop':'value'};
            expectedObj = [];
            expectedObj.prop = 'value';

            arrObj = $.rup_utils.jsontoarray(jsonObj);
            expect(arrObj).toEqual(expectedObj);
        });

        it('debería transformar un json obj={\'propA\':{\'propAA\':\'value\'}} en un array arr[\'propA.propAA\'] -> \'value\'', function(){
            var jsonObj, arrObj, expectedObj;

            jsonObj = {'propA':{'propAA':'value'}};
            expectedObj = [];
            expectedObj['propA.propAA'] = 'value';

            arrObj = $.rup_utils.jsontoarray(jsonObj);
            expect(arrObj).toEqual(expectedObj);
        });

        it('debería transformar un json obj={\'propA:\'valueA\', \'propB\':{\'propBA\':\'valueBA\'}} en un array arr[\'propA\'] -> \'valueA\', arr[\'propB.propBA\'] -> \'valueBA\', ', function(){
            var jsonObj, arrObj, expectedObj;

            jsonObj = {'propA':'valueA', 'propB':{'propBA':'valueBA'}};
            expectedObj = [];
            expectedObj.propA = 'valueA';
            expectedObj['propB.propBA'] = 'valueBA';

            arrObj = $.rup_utils.jsontoarray(jsonObj);
            expect(arrObj).toEqual(expectedObj);
        });

        it('debería transformar un json obj={\'propA\':{\'propAA\':[\'a\',\'b\',\'c\',\'d\']}} en un array arr[\'propA.propAA[0]\'] -> \'a\' ', function(){
            var jsonObj, arrObj, expectedObj;

            jsonObj = {'propA':{'propAA':['a','b','c','d']}};
            expectedObj = [];
            expectedObj['propA.propAA[0]'] = 'a';
            expectedObj['propA.propAA[1]'] = 'b';
            expectedObj['propA.propAA[2]'] = 'c';
            expectedObj['propA.propAA[3]'] = 'd';

            arrObj = $.rup_utils.jsontoarray(jsonObj);
            expect(arrObj).toEqual(expectedObj);
        });

        it('debería transformar un json obj={\'propA\':{\'propAA\':[{\'propAAA\': \'a\'},{\'propAAB\':\'b\'},{\'propAAC\':\'c\'}]}, \'propB\':\'d\'', function(){
            var jsonObj, arrObj, expectedObj;

            jsonObj = {
                'propA':{
                    'propAA':[
                        {'propAAA': 'a'},
                        {'propAAB':'b'},
                        {'propAAC':'c'}
                    ]
                },
                'propB':'d'
            };
            expectedObj = [];
            expectedObj['propA.propAA[0].propAAA'] = 'a';
            expectedObj['propA.propAA[1].propAAB'] = 'b';
            expectedObj['propA.propAA[2].propAAC'] = 'c';
            expectedObj.propB = 'd';

            arrObj = $.rup_utils.jsontoarray(jsonObj);
            expect(arrObj).toEqual(expectedObj);
        });
    });

    /*
      * Tests del método firstCharToLowerCase
      */
    describe('Tests del método firstCharToLowerCase', function(){
        it('debería trnasformar a minúsculas el primer caracter de un string un json', function(){

            var cadena = 'AbcDeF',
                cadenaFinal;

            cadenaFinal = $.rup_utils.firstCharToLowerCase(cadena);
            expect(cadenaFinal).toEqual('abcDeF');
        });
    });

    /*
      * Tests del método firstCharToLowerCase
      */
    describe('Tests del método firstCharToLowerCase', function(){
        it('debería transformar a minúsculas el primer caracter de un string un json', function(){

            var cadena = 'AbcDeF',
                cadenaFinal;

            cadenaFinal = $.rup_utils.firstCharToLowerCase(cadena);
            expect(cadenaFinal).toEqual('abcDeF');
        });
    });

    /*
      * Tests del método queryStringToJson
      */
    describe('Tests del método queryStringToJson', function(){
        it('debería de crear un objeto JSON a partir de un query string', function(){

            var queryString = 'keyA=valueA&keyB=valueB&keyC=valueC',
                expectedJson = {keyA:'valueA', keyB:'valueB', keyC:'valueC'},
                createdJson;

            createdJson = $.rup_utils.queryStringToJson(queryString);
            expect(expectedJson).toEqual(createdJson);
        });
    });
});
