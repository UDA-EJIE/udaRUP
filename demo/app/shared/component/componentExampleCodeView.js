define(['marionette',
    './componentExampleCodeTemplate.hbs',
    'highlight.js','rup.tabs'], function(Marionette, ComponentExampleCodeTemplate, hljs){


    var ComponentCodeView = Marionette.View.extend({
    });

    var ComponentExampleCodeView = Marionette.View.extend({
        'template': ComponentExampleCodeTemplate,
        'ui': {
            codeTabs: '#exampleTabs',
            codeSnippets: 'pre code'
        },
        'regions': {
            HtmlCode: '#componentHtmlExample',
            JsCode: '#componentJsExample'
        },
        onRender: fncOnShow,
        onAttach: fncOnAttach

    });

    function fncOnShow(){
        var $view = this;
        
        $view.showChildView('HtmlCode', new ComponentCodeView({
            template: $view.options.templateHtml
        }));
        
        if ($view.options.templateJs){
            $view.showChildView('JsCode', new ComponentCodeView({
                template: $view.options.templateJs
            }));
        }

        $view.ui.codeSnippets.each(function(i, block) {

            if ($(block).hasClass('html') || $(block).hasClass('javascript')){
                block.innerHTML = block.innerHTML.replace(/</g, '&lt');
            }

            hljs.highlightBlock(block);

        });

        $view.ui.codeTabs.rup_tabs({
            tabs : [
                {i18nCaption:'HTML', layer:'pre:has(code.html)'},
                {i18nCaption:'JavaScript', layer:'pre:has(code.javascript)'}
            ]
        });
    }


    function fncOnAttach(){
        this.ui.codeTabs.rup_tabs({
            tabs : [
                {i18nCaption:'HTML', layer:'pre:has(code.html)'},
                {i18nCaption:'JavaScript', layer:'pre:has(code.javascript)'}
            ]
        });
    }

    return ComponentExampleCodeView;
});
