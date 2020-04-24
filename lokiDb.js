var lokijs = require('lokijs'),
    lokiNativescriptAdapter = require('lokijs/src/loki-nativescript-adapter'),
    dummyjson = require('dummy-json'),
    _ = require('lodash');

var LokiDb = (function () {
    // private variable
    var texto = 'default';
    var _db;
    var _users;

    var _dashboard;

    // private function
    function log() {
        console.log('doo!');
    }

    function setText(text) {
        texto = text;
    }

    function getText() {
        return texto;
    }

    function getUsers() {
        return _users;
    }

    function getDashboard() {
        return _dashboard;
    }


    function upsert(collection, idField, record) {
        var query = {};
        query[idField] = record[idField];
        var existingRecord = collection.findOne(query);

        if (existingRecord) {
            // The record exists. Do an update.
            var updatedRecord = existingRecord;
            // Only update the fields contained in `record`. All fields not contained
            // in `record` remain unchanged.
            _.forEach(record, function (value, key) {
                updatedRecord[key] = value;
            });
            collection.update(updatedRecord);
        } else {
            // The record doesn't exist. Do an insert.
            collection.insert(record);
        }
    }


    function _init() {
        _db = new lokijs('uda.json', {
            adapter: new lokiNativescriptAdapter()
        });

        _users = _db.addCollection('users', {
            indices: ['id']
        });
        _dashboard = _db.addCollection('dashboard', {
            indices: ['id']
        });



        var myHelpers = {
            rol: function () {
                // Use randomArrayItem to ensure the seeded random number generator is used
                return dummyjson.utils.randomArrayItem(['administrador', 'desarrollador', 'espectador', 'informador', 'manager']);
            }
        };
        var template = '[ \
          {{#repeat 1000}} \
            {\
            "id":"{{@index}}",\
            "nombre":"{{firstName}}",\
            "apellido1":"{{lastName}}",\
            "apellido2":"{{lastName}}",\
            "ejie":"{{int 0 1}} ",\
            "fechaAlta":"{{date \'2010\' \'2014\' \'DD/MM/YYYY\'}}",\
            "fechaBaja":"{{date \'2015\' \'2016\' \'DD/MM/YYYY\'}}",\
            "rol":"{{rol}}"\
            } \
          {{/repeat}} \
        ]';

        // for (var i=0;i<10;i++){
        var result = dummyjson.parse(template, {
            helpers: myHelpers
        }); // Returns a string
        var obj = JSON.parse(result);
        for (var i = 0; i < obj.length; i++) {

            _users.insert(obj[i]);
        }


        // Dashboard
        _dashboard.insert({
            'id': '1',
            'nombre': 'Escritorio 1',
            'serializedArray': '[]'
        });
        _dashboard.insert({
            'id': '2',
            'nombre': 'Escritorio 2',
            'serializedArray': '[]'
        });
        _dashboard.insert({
            'id': '3',
            'nombre': 'Escritorio 3',
            'serializedArray': '[]'
        });
        _dashboard.insert({
            'id': '4',
            'nombre': 'Escritorio 4',
            'serializedArray': '[]'
        });
        _dashboard.insert({
            'id': '5',
            'nombre': 'Escritorio 5',
            'serializedArray': '[]'
        });


    }

    // return public interface
    return {
        log: function () {
            // we have access to the private function here
            // as well as the private variable (btw)
            log();
        },
        setText: function (text) {
            setText(text);
        },
        initialize: function () {
            _init();
        },
        getText: function () {
            return getText();
        },
        getUsers: function () {
            return getUsers();
        },
        upsert: function (collection, idField, record) {
            return upsert(collection, idField, record);
        },
        // Dashboard
        dashboard: {
            getAll: function (userId) {
                return getDashboard();
            }
        }

    };
}()); // we import jQuery as a global symbol

module.exports = LokiDb;