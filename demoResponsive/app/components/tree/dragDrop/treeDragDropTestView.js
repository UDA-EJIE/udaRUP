define(['marionette',
        'templates',
        'rup/rup.tree','rup/rup.button'], function(Marionette, App){

  var TreeDragDropTestView = Marionette.LayoutView.extend({
      template: App.Templates.demoResponsive.app.components.tree.dragDrop.treeDragDropTestTemplate,
      ui:{
        pageTitles: '[title]',
        btnCodeTreeDragDrop: '#codeTreeDragDrop',
        btnIdTreeDragDrop: '#idTreeDragDrop',
        btnHtmlTreeDragDrop: '#htmlTreeDragDrop',
        btnStyle: '#button',
        inputCode: '#code',
        inputId: '#identificador',
        inputHtml: '#htmlTreeDragDrop',
        htmlContentAccordionLayer: '#accordionExample1',
        htmlContentAccordion: '.rup_accordion',
        pageQtips: '.qtip'
      },
      events:{
        "click @ui.btnStyle": fncSetStyle
      },
      onAttach: fncOnAttach

  });

  function fncOnAttach(){
    this.ui.pageTitles.rup_tree({"applyToPortal": true});

    this.ui.btnCodeTreeDragDrop.rup_tree({
  		content: {
  			text: "Esto es un ejemplo de tree sobre imagen"
  		},
  		position: {
  			my: 'top center',
  			at: 'bottom center',
  			target: this.ui.inputCode
  		},
  		show: {
  			event: 'click'
  		}
  	});

    this.ui.btnIdTreeDragDrop.rup_tree({
  		content: {
  			text: 'Esto es un ejemplo de tree modal sobre imagen',
  			title: {
  				text: 'TreeDragDrop modal'
  			}
  		},
  		position: {
  			my: 'bottom center',
  			at: 'top center',
  			target: this.ui.inputId
  		},
  		show: {
  			event: 'click',
  			modal: true
  		},
  		hide: {
  			event: 'click'
  		}
  	});

    this.ui.btnHtmlTreeDragDrop.rup_tree({
  		content: {
  			text: this.ui.htmlContentAccordionLayer
  		},
  		style:{
  			width:900
  		},
  		position: {
  			my: 'bottom center',
  			at: 'top center',
  			target: this.ui.inputHtml
  		},
  		show: {
  			event: 'click',
  		},
  		hide: {
  			event: 'click'
  		}
  	});

    this.ui.htmlContentAccordion.rup_accordion({
  		animated: "bounceslide",
  		active: false,
  		autoHeight: false,
  		collapsible: true
  	});
  }

  function fncSetStyle(){
    var $view = this;

    $view.ui.btnStyle.click(function() {
      $view.ui.pageQtips.rup_tree('option', 'style.widget', true);
    });
  }




  return TreeDragDropTestView;
});
