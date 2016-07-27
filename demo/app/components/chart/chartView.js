define(['marionette',
        'templates',
        'rup/chart'], function(Marionette, App){


  var ChartView = Marionette.LayoutView.extend({
    template: App.Templates.demo.app.components.chart.chartTemplate,
    ui:{
      autocompleteLocal: "#autocomplete",
      autocompleteRemote: "#patron",
      comboboxLocal: "#comboboxLocal",
      comboboxRemote: "#comboboxRemoto",
    },
    onDomRefresh: fncOnDomRefresh
  });

  function fncOnDomRefresh(){
    var $view = this;

    renderChartLine($view);
    renderChartBar($view);
    renderChartRadar($view);
    renderChartPolar($view);
    renderChartPie($view);
    renderCHartDoughnut($view);

  }

function renderChartView() {



    renderChartLine();
    renderChartBar();
    renderChartRadar();
    renderChartPolar();
    renderChartPie();
    renderCHartDoughnut();
}

function renderChartLine() {
    var data = {
        labels: $.rup.i18n.app.charts.mesesLabels,
        datasets: [{
            label: $.rup.i18n.app.charts.datasetRadar.dataset1,
            data: [65, 59, 80, 81, 56, 55, 40]
        }, {
            label: "My Second dataset",
            data: [28, 48, 40, 19, 86, 27, 90]
        }]
    };



    jQuery("#graficoLine").rup_chart({
        type: "line",
        data: data
    });

}

function renderChartBar() {

    var data = {
        labels: $.rup.i18n.app.charts.mesesLabels,
        datasets: [{
            label: "My First ",
            data: [65, 59, 80, 81, 56, 55, 40]
        }, {
            label: "My Second",
            data: [28, 48, 40, 19, 86, 27, 90]
        }]
    };



    jQuery("#graficoBar").rup_chart({
        type: "bar",
        data: data
    });


}

function renderChartRadar() {
    var data = {
        labels: $.rup.i18n.app.charts.radarLabels,
        datasets: [{
            label: $.rup.i18n.app.charts.datasetRadar.dataset1,
            data: [65, 59, 90, 81, 56, 55, 40]
        }, {
            label: "My Second dataset",
            data: [28, 48, 40, 19, 96, 27, 100]
        }]
    };




    jQuery("#graficoRadar").rup_chart({
        type: "radar",
        data: data


    });
}


function renderChartPolar() {

    var data = [{
            value: 300,
            label: "Red"
        }, {
            value: 50,
            label: "Green"
        }, {
            value: 100,
            label: "Yellow"
        }, {
            value: 40,
            label: "Grey"
        }, {
            value: 120,
            label: "Dark Grey"
        }

    ];


    jQuery("#graficoPolar").rup_chart({
        type: "polarArea",
        data: data

    });
}

function renderChartPie() {

    var data = [{
        value: 300,
        label: "Red"
    }, {
        value: 50,
        label: "Green"
    }, {
        value: 100,
        label: "Yellow"
    }];



    jQuery("#graficoPie").rup_chart({
        type: "pie",
        data: data

    });
}

function renderCHartDoughnut() {

    var data = [{
        value: 300,
        label: "Red"
    }, {
        value: 50,
        label: "Green"
    }, {
        value: 100,
        label: "Yellow"
    }];



    jQuery("#graficoDoughnut").rup_chart({
        type: "doughnut",
        data: data

    });
  }
    return ChartView;
});
