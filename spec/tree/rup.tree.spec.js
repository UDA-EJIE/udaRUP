/* jslint esnext: true, multistr: true */

import '../../dist/css/rup-base.css';
import '../../dist/css/rup-theme.css';
import 'jquery';
import 'jasmine-jquery';
import 'rup.tree';

function loadCss() {
    let css = '';
    $('head').append('<style></style>');
    var thenable = $.when($.ajax('http://localhost:8081/dist/css/rup-base.css'))
        .then((data, textStatus, jqXHR) => {
            css += data;
        })
        .then($.ajax('http://localhost:8081/dist/css/rup-base.css'))
        .then((data, textStatus, jqXHR) => {
            css += data;
        })
        .then(() => {
            $('head > style').append(css);
        });
    return thenable;
}

var $tree;
var treePlugins = [
    'checkbox',
    'sort',
    'unique'
];
var uniqueOpts = {
    error_callback: (n,p,f) => {
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
    $('#exampleTree').on('loaded.jstree', done).rup_tree({
        core: {
            getValue: ($item, itemData) => {
                return itemData.id;
            }
        },
        plugins: treePlugins,
        unique: uniqueOpts,
        checkbox:{
            override_ui: true
        }
    });
    $tree = $('#exampleTree');
}

function createJson(done) {
    let html = '<div id="exampleTree"></div>';
    $('#content').append(html);
    $('#exampleTree').on('loaded.jstree', done).rup_tree({
        core: {
            getValue: ($item, itemData) => {
                return itemData.id;
            }
        },
        json_data:{
            ajax:{
                url:'http://localhost:8081/demo/tree/remote'
            }
        },
        plugins: treePlugins,
        unique: uniqueOpts,
        checkbox:{
            override_ui: true
        }
    });
    $tree = $('#exampleTree');
}

function createXml(done) {
    let html = '<div id="exampleTree"></div>';
    $('#content').append(html);
    $('#exampleTree').on('loaded.jstree', done).rup_tree({
        core: {
            getValue: ($item, itemData) => {
                return itemData.id;
            }
        },
        xml_data: {
            data: ' <root>\
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
        checkbox:{
            override_ui: true
        }
    });
    $tree = $('#exampleTree');
}

function create(type, done) {
    if(type === 'html') {
        createHtml(done);
    }
    if(type === 'json') {
        createJson(done);
    }
    if(type === 'xml') {
        createXml(done);
    }
}
$.when(loadCss())
    .then(testTree('html'))
    .then(testTree('json'))
    .then(testTree('xml'));

function testTree(type) {
    describe('Test Tree '+ type +' :', () => {
        beforeEach((done) => {
            create(type, done);
        });
        afterEach(() => {
            $('#content').html('');
            $('#content').nextAll().remove();
        });
        describe('Creación', () => {
            describe('Debe crear el rup_tree > ', () => {
                it('Debe tener el attr ruptype = tree', () => {
                    expect($tree.attr('ruptype')).toBe('tree');
                });
            });
            describe('Checkbox > ', () => {
                it('Debe contener los checkboxes:', () => {
                    console.info('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' + type);
                    console.info($('#content').html());
                    expect($('.jstree-checkbox').length).toBe(3);
                });
            });
            describe('Sort > ',() => {
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
        describe('Métodos públicos:', () => {
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