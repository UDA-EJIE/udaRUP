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

$.when(loadCss())
    .then(testTree());

function testTree() {
    describe('Test Tree:', () => {
        var $tree;
        beforeEach(() => {
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