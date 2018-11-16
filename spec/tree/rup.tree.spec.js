/* jslint multistr: true */

import 'jquery';
import * as testutils from '../common/specCommonUtils.js';
import * as creator   from './treeCreator';
import 'jasmine-jquery';
import 'rup.tree';

// Declaración de variables

var treeCreator = {
    html: (callback) => { creator.treeHtml(callback); },
    json: (callback) => { creator.treeJson(callback); },
    xml:  (callback) => { creator.treeXML(callback);  }
};

$.when(testTree('html'))
    .then(testTree('json'))
    .then(testTree('xml'));

function testTree (type) {
    var d = new $.Deferred();
    describe('Test Tree ['+type+'] >', () => {
        var $tree;
        beforeAll((done) => {
            testutils.loadCss(done);
        });
        afterAll(() => {
            d.resolve();
        });
        beforeEach((done) => {
            treeCreator[type](() => {
                $tree = $('#exampleTree');
                done();
            });
        });
        afterEach(() => {
            $('#content').html('');
        });
        describe('Creación > ', () => {
            it('Se le añade el rupType:', () => {
                expect($tree.is('[rupType="tree"]')).toBeTruthy();
            });
            it('Posee la clase del subyacente:', () => {
                expect($tree.is('.jstree')).toBeTruthy();
            });
            it('Contiene los checkbox:', () => {
                expect($('ins.jstree-checkbox').length).toBe(3);
            });
        });
        describe('Métodos públicos > ', () => {
            describe('Metodos getRupValue y setRupValue > ', () => {
                beforeEach(() => {
                    $tree.rup_tree('setRupValue',['node11']);
                });
                it('La selección se refleja en el DOM:', () => {
                    expect($('#node11').is('.jstree-checked')).toBeTruthy();
                });
                it('El método getRupValue devuelve el valor esperado:', () => {
                    expect($tree.rup_tree('getRupValue')).toEqual(['node11']);
                });
            });
        });
    });
}



/// TEST - OLD
// jasmine.DEFAULT_TIMEOUT_INTERVAL = 12000;

// var $tree;
// var treePlugins = [
//     'checkbox',
//     'sort'
// ];

// function createHtml(done) {
//     var html = '<div id="exampleTree" name="exampleTree">\
//                         <ul>\
//                             <li id="node1">\
//                                 <a href = "#">Padre</a>\
//                                 <ul>\
//                                     <li id="node11">\
//                                         <a href="#">Hijo 2</a>\
//                                     </li>\
//                                     <li id="node12">\
//                                         <a href="#">Hijo 1</a>\
//                                     </li>\
//                                 </ul>\
//                             </li>\
//                         </ul>\
//                     </div>';
//     $('#content').append(html);
//     $tree = $('#exampleTree');
//     $tree.rup_tree({
//         plugins: treePlugins,
//         checkbox: {
//             override_ui: true
//         }
//     });
//     $tree.on('loaded.jstree', () => {
//         done();
//     });
// }

// function createJson(done) {
//     let html = '<div id="exampleTree" name="exampleTree"></div>';
//     $('#content').append(html);
//     $tree = $('#exampleTree');
//     $tree.rup_tree({
//         json_data: {
//             ajax: {
//                 url: testutils.DEMO + '/tree/remote/json'
//             }
//         },
//         plugins: treePlugins,
//         checkbox: {
//             override_ui: true
//         }
//     });
//     $tree.on('loaded.jstree', () => {
//         done();
//     });
// }

// function createXml(done) {
//     let html = '<div id="exampleTree" name="exampleTree"></div>';
//     $('#content').append(html);
//     $tree = $('#exampleTree');
//     $tree.rup_tree({
//         xml_data: {
//             data: '<root>\
//                     <item id="node1">\
//                         <content><name><![CDATA[Padre]]></name></content>\
//                         <item id="node11" parent_id="node1">\
//                             <content><name><![CDATA[Hijo 2]]></name></content>\
//                         </item>\
//                         <item id="node12" parent_id="node1">\
//                             <content><name><![CDATA[Hijo 1]]></name></content>\
//                         </item>\
//                     </item>\
//                 </root>'
//         },
//         plugins: [
//             'checkbox',
//             'sort',
//             'unique'
//         ],
//         checkbox: {
//             override_ui: true
//         }
//     });
//     $tree.on('loaded.jstree', (e,d) => {
//         debugger;
//         done();
//     });
// }

// function create(type, done) {
//     if (type === 'html') {
//         createHtml(done);
//     }
//     if (type === 'json') {
//         createJson(done);
//     }
//     if (type === 'xml') {
//         createXml(done);
//     }
// }

// $.when(testTree('html'))
//     .then(testTree('xml'))
//     .then(testTree('json'));

// function testTree(type) {
//     defer = new $.Deferred();
//     describe('Test Tree ' + type + ' :', () => {
//         beforeAll((done) => {
//             testutils.loadCss(done);
//         });
//         afterAll(() => {
//             defer.resolve();
//         });

//         beforeEach((done) => {
//             create(type, done);
//         });

//         afterEach(() => {
//             $('#content').html('');
//             $('#content').nextAll().remove();
//         });

//         describe('[' + type + '] Creación', () => {
//             describe('Debe crear el rup_tree > ', () => {
//                 it('Debe tener el attr ruptype = tree', () => {
//                     expect($tree.attr('ruptype')).toBe('tree');
//                 });
//             });
//             describe('Checkbox > ', () => {
//                 it('Debe contener los checkboxes:', () => {
//                     expect($('.jstree-checkbox').length).toBe(3);
//                 });
//             });
//         });
//         describe('[' + type + '] Métodos públicos:', () => {
//             describe('Método getRupValue y setRupValue', () => {
//                 beforeEach(() => {
//                     $tree.rup_tree('setRupValue', 'node1');
//                 });
//                 it('Debe actualizar el valor:', () => {
//                     expect($tree.rup_tree('getRupValue')).toBe('node1');
//                 });
//             });
//         });
//     });
// }