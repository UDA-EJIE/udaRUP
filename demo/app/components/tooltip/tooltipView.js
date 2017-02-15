define(['marionette',
        'templates',
        'rup/rup.tooltip',
        'rup/accordion'], function(Marionette, App){

  var TooltipView = Marionette.LayoutView.extend({
      template: App.Templates.demo.app.components.tooltip.tooltipTemplate,
      onRender: fncOnRender,
      ui:{
        pageTitles: '[title]',
        btnCodeTooltip: '#codeTooltip',
        btnIdTooltip: '#idTooltip',
        btnHtmlTooltip: '#htmlTooltip',
        btnStyle: '#button',
        inputCode: '#code',
        inputId: '#identificador',
        inputHtml: '#htmlTooltip',
        htmlContentAccordionLayer: '#accordionExample1',
        htmlContentAccordion: '.rup_accordion',
        pageQtips: '.qtip'
      },
      events:{
        "click @ui.btnStyle": fncSetStyle
      }

  });

  function fncOnRender(){
    this.ui.pageTitles.rup_tooltip({"applyToPortal": true});

    this.ui.btnCodeTooltip.rup_tooltip({
  		content: {
  			text: "Esto es un ejemplo de tooltip sobre imagen"
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

    this.ui.btnIdTooltip.rup_tooltip({
  		content: {
  			text: 'Esto es un ejemplo de tooltip modal sobre imagen',
  			title: {
  				text: 'Tooltip modal'
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

    this.ui.btnHtmlTooltip.rup_tooltip({
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
      $view.ui.pageQtips.rup_tooltip('option', 'style.widget', true);
    });
  }

  return TooltipView;

});
