/* jslint multistr: true */

import 'jquery';
import * as testutils from '../common/specCommonUtils.js';
import 'jasmine-jquery';
import 'rup.tree';

/**
 * NOTA:
 *  > Ejecutar este test con el comando 'npm run test:dev' para evitar errores de timeout
 */
jasmine.DEFAULT_TIMEOUT_INTERVAL = 12000;

var $tree;
var treePlugins = [
    'checkbox',
    'sort',
    'unique'
];
var uniqueOpts = {
    error_callback: (n, p, f) => {
        $('#exampleTree').addClass('duplicate-warn');
    }
};

function createHtml(done) {
    var html = '<div id="exampleTree">\
                        <ul>\
                            <li id="node1">\
                                <a href = "#">Padre</a>\
                                <ul>\
                                    <li id="node11">\
                                        <a href="#">Hijo 2</a>\
                                    </li>\
                                    <li id="node12">\
                                        <a href="#">Hijo 1</a>\
                                    </li>\
                                </ul>\
                            </li>\
                        </ul>\
                    </div>';
    $('#content').append(html);
    $tree = $('#exampleTree');
    $tree.rup_tree({
        core: {
            getValue: ($item, itemData) => {
                return itemData.id;
            }
        },
        plugins: treePlugins,
        unique: uniqueOpts,
        checkbox: {
            override_ui: true
        }
    });
    $tree.on('loaded.jstree', () => {
        // testTrace('loaded.jstree', 'HTML CARGADO!!!!');
        done();
    });
}

function createJson(done) {
    let html = '<div id="exampleTree"></div>';
    $('#content').append(html);
    $tree = $('#exampleTree');
    $tree.rup_tree({
        core: {
            getValue: ($item, itemData) => {
                return itemData.id;
            }
        },
        json_data: {
            ajax: {
                url: testutils.WEBROOT + '/demo/tree/remote/json'
            }
        },
        plugins: treePlugins,
        unique: uniqueOpts,
        checkbox: {
            override_ui: true
        }
    });
    $tree.on('loaded.jstree', () => {
        // testTrace('loaded.jstree', 'JSON CARGADO!!!!');
        done();
    });
}

function createXml(done) {
    let html = '<div id="exampleTree"></div>';
    $('#content').append(html);
    $tree = $('#exampleTree');
    $tree.rup_tree({
        core: {
            getValue: ($item, itemData) => {
                return itemData.id;
            }
        },
        xml_data: {
            data: '<root>\
                    <item id="node1">\
                        <content><name><![CDATA[Padre]]></name></content>\
                        <item id="node11" parent_id="node1">\
                            <content><name><![CDATA[Hijo 2]]></name></content>\
                        </item>\
                        <item id="node12" parent_id="node1">\
                            <content><name><![CDATA[Hijo 1]]></name></content>\
                        </item>\
                    </item>\
                </root>'
        },
        plugins: [
            'checkbox',
            'sort',
            'unique',
            'xml_data'
        ],
        unique: uniqueOpts,
        checkbox: {
            override_ui: true
        }
    });
    $tree.on('loaded.jstree', () => {
        // testTrace('loaded.jstree', 'XML CARGADO!!!!');
        done();
    });
}

function create(type, done) {
    if (type === 'html') {
        createHtml(done);
    }
    if (type === 'json') {
        createJson(done);
    }
    if (type === 'xml') {
        createXml(done);
    }
}

$.when(testTree('html'))
    .then(testTree('xml'))
    .then(testTree('json'));

function testTree(type) {
    defer = new $.Deferred();
    describe('Test Tree ' + type + ' :', () => {
        beforeAll((done) => {
            testutils.loadCss(done);
        });
        afterAll(() => {
            defer.resolve();
        });

        beforeEach((done) => {
            create(type, done);
        });

        afterEach(() => {
            $('#content').html('');
            $('#content').nextAll().remove();
        });

        describe('[' + type + '] Creación', () => {
            describe('Debe crear el rup_tree > ', () => {
                it('Debe tener el attr ruptype = tree', () => {
                    expect($tree.attr('ruptype')).toBe('tree');
                });
            });
            describe('Checkbox > ', () => {
                it('Debe contener los checkboxes:', () => {
                    expect($('.jstree-checkbox').length).toBe(3);
                });
            });
            describe('Sort > ', () => {
                //Los hijos estan desordenados así que comprobamos que el plugin sort los ordena
                it('Comprobamos que están ordenados:', () => {
                    let selector = $('#exampleTree > ul > li > ul');
                    expect($($('li', selector)[0]).text().trim()).toBe('Hijo 1');
                    expect($($('li', selector)[1]).text().trim()).toBe('Hijo 2');
                });
            });
            describe('Unico > ', () => {
                beforeEach(() => {
                    let elem = '<li id="node11" class="jstree-leaf jstree-unchecked"><ins class="jstree-icon">&nbsp;</ins><a href="#" class=""><ins class="jstree-checkbox">&nbsp;</ins><ins class="jstree-icon">&nbsp;</ins>Hijo 1</a></li>';
                    $('#exampleTree > ul > li > ul').append(elem);
                });
                it('Debe tener el warn de elementos unicos:', () => {
                    expect($('#exampleTree').hasClass('duplicate-warn')).toBe('true');
                });
            });
        });
        describe('[' + type + '] Métodos públicos:', () => {
            describe('Método getRupValue y setRupValue', () => {
                beforeEach(() => {
                    $tree.rup_tree('setRupValue', 'node1');
                });
                it('Debe actualizar el valor:', () => {
                    expect($tree.rup_tree('getRupValue')).toBe('node1');
                });
            });
        });
    });
}