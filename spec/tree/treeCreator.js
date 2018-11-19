import 'jquery';
import * as testutils from '../common/specCommonUtils.js';

var treePlugins = [
    'checkbox',
    'sort'
];

export function treeHtml(callback) {
    var html = '<div id="exampleTree" name="exampleTree">\
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
    var $tree = $('#exampleTree');
    $tree.rup_tree({
        plugins: treePlugins,
        checkbox: {
            override_ui: true
        }
    });
    $tree.on('loaded.jstree', function () {
        callback();
    });
};
export function treeJson(callback) {
    var html = '<div id="exampleTree" name="exampleTree"></div>';
    $('#content').append(html);
    var $tree = $('#exampleTree');
    $tree.rup_tree({
        json_data: {
            ajax: {
                url: testutils.DEMO + '/tree/remote/json'
            }
        },
        plugins: treePlugins,
        checkbox: {
            override_ui: true
        }
    });
    $tree.on('loaded.jstree', function () {
        callback();
    });
};
export function treeXML (callback) {
    var html = '<div id="exampleTree" name="exampleTree"></div>';
    $('#content').append(html);
    var $tree = $('#exampleTree');
    $tree.rup_tree({
        xml_data: {
            "data": ""+
            "<?xml version='1.0' encoding='UTF-8'?>"+
			"<root>"+
				"<item id='node1'>"+
					"<content><name><![CDATA[Padre 1]]></name></content>"+
					"<item id='node11' parent_id='node1'>"+
						"<content><name><![CDATA[Hijo 1]]></name></content>"+
					"</item>"+
					"<item id='node12' parent_id='node1'>"+
						"<content><name><![CDATA[Hijo 2]]></name></content>"+
					"</item>"+
				"</item>"+
			"</root>"
        },
        plugins: [
            'checkbox',
            'sort'
        ],
        checkbox: {
            override_ui: true
        }
    });
    $tree.on('loaded.jstree', function () {
        testutils.testTrace('html',$('#content').html());
        callback();
    });
};