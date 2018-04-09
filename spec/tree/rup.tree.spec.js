import 'jquery';
import 'jasmine-jquery';
import 'rup.tree';
import 'rup.generalFunc';

describe('Test Tree:', () => {
    var $tree;
    describe('Creación', () => {
        var html = '<div id="exampleTree">'
                +       '<ul>'
                +           '<li id="node1">'
                +               '<a href = "#">Padre</a>'
                +               '<ul>'
                +                   '<li id="node11">'
                +                       '<a href="#">Hijo 1</a>'
                +                   '</li>'
                +                   '<li id="node12">'
                +                       '<a href="#">Hijo 2</a>'
                +                   '</li>'
                +               '</ul>'
                +           '</li>'
                +       '</ul>'
                +  '</div>'
        $('body').append(html);
        $('exampleTree').rup_tree({});
        $tree = $('exampleTree');

        it('Debe tener el attr ruptype = tree', () => {
            expect($tree.attr('ruptype')).toBe('tree');
        });
    });
    describe('Métodos públicos:', () => {
        generalFunc($tree, 'rup_tree', ['getRupValue','setRupValue']);
    });
});