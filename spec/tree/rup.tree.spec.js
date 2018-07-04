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

function createHtml() {
    var html = '<div id="exampleTree">\
                        <ul>\
                            <li id="node1">\
                                <a href = "#">Padre</a>\
                                <ul>\
                                    <li id="node11">\
                                        <a href="#">Hijo 1</a>\
                                    </li>\
                                    <li id="node12">\
                                        <a href="#">Hijo 2</a>\
                                    </li>\
                                </ul>\
                            </li>\
                        </ul>\
                    </div>';
    $('#content').append(html);
    $('#exampleTree').rup_tree({
        core: {
            getValue: ($item, itemData) => {
                return itemData.id;
            }
        }
    });
    $tree = $('#exampleTree');
}

function createJson() {
    let html = '<div id="exampleTree"></div>';
    $('#content').append(html);
    $('#exampleTree').rup_tree({
        core: {
            getValue: ($item, itemData) => {
                return itemData.id;
            }
        },
        json_data:{
            ajax:{
                url:'http://localhost:8081/demo/tree/remote'
            }
        }
    });
    $tree = $('#exampleTree');
}

function createXml() {
    let html = '<div id="exampleTree"></div>';
    $('#content').append(html);
    $('#exampleTree').rup_tree({
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
                                <content><name><![CDATA[Hijo 1]]></name></content>\
                            </item>\
                            <item id="node12" parent_id="node1">\
                                <content><name><![CDATA[Hijo 2]]></name></content>\
                            </item>\
                        </item>\
                    </root>'
        }
    });
    $tree = $('#exampleTree');
}

$.when(loadCss())
    .then(testTree('html'))
    .then(testTree('json'))
    .then(testTree('xml'));

function testTree(type) {
    describe('Test Tree '+ type +' :', () => {
        beforeEach((done) => {
            switch(type) {
                case 'html':
                    $.when(createHtml())
                        .then(done());
                    break;
                case 'json':
                    $.when(createJson())
                        .then(done());
                    break;
                case 'xml':
                    $.when(createXml())
                        .then(done());
                    break;
            }
        });
        afterEach(() => {
            $('#content').html('');
            $('#content').nextAll().remove();
        });
        describe('Creación', () => {
            it('Debe tener el attr ruptype = tree', () => {
                expect($tree.attr('ruptype')).toBe('tree');
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