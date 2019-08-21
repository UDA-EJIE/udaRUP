/* jslint multistr: true */
/* eslint-env jasmine, jquery */

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
    // FIXME : Jstree no parsea XML en phantomJS.
    if(type === 'xml') {
        d.resolve();
        return;
    }
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