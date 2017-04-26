define(['marionette',
        'templates',
        'rup/rup.chart', 'rup/rup.button'], function (Marionette, App) {

    var ChartTestView = Marionette.LayoutView.extend({
        template: App.Templates.demo.app.components.chart.chartTestTemplate,
        ui: {

            graficoLine: "#graficoLine",
            graficoBar: "#graficoBar",
            graficoRadar: "#graficoRadar",
            graficoPolar: "#graficoPolar",
            graficoPie: "#graficoPie",
            graficoDoughnut: "#graficoDoughnut",
            graficoBubble: "#graficoBubble"

        },
        initialize: fncInitialize,
        onAttach: fncOnAttach,
        mesesData: [],
        colorsData: [],
        radarData: [],
        bubbleData: []

    });

    function fncInitialize() {
        /*data*/

        this.mesesData = {
            labels: $.rup.i18n.app.charts.mesesLabels,
            datasets: [{
                label: $.rup.i18n.app.charts.datasetRadar.dataset1,
                data: [65, 59, 80, 81, 56, 55, 40]
          }]
        };
        this.colorsData = {

            labels: $.rup.i18n.app.charts.colorLabels,
            datasets: [{
                data: [300, 50, 100],
                backgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56"
              ],
                hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56"
              ]
          }]
        };
        this.radarData = {
            labels: $.rup.i18n.app.charts.radarLabels,
            datasets: [{
                label: $.rup.i18n.app.charts.datasetRadar.dataset1,
                data: [65, 59, 90, 81, 56, 55, 40]
          }, {
                label: $.rup.i18n.app.charts.datasetRadar.dataset2,
                data: [28, 48, 40, 19, 96, 27, 100]
          }]
        };

        this.bubbleData = {
            datasets: [{
                label: $.rup.i18n.app.charts.datasetRadar.dataset1,
                data: [{
                    x: 20,
                    y: 30,
                    r: 15
              }, {
                    x: 40,
                    y: 10,
                    r: 10
              }],
                backgroundColor: "#FF6384",
                hoverBackgroundColor: "#FF6384",
          }]
        };
    }

    function fncOnAttach() {
        var $view = this;
        var options = {
            responsive: true,
            legend: {
                display: true
            }

        };
        //line chart
        $view.ui.graficoLine.rup_chart({
            type: "line",
            data: $view.mesesData,
            options: options
        });

        //bar chart
        $view.ui.graficoBar.rup_chart({
            type: "bar",
            data: $view.mesesData,
            options: options
        });

        //radar chart
        $view.ui.graficoRadar.rup_chart({
            type: "radar",
            data: $view.radarData
        });

        //polar chart
        $view.ui.graficoPolar.rup_chart({
            type: "polarArea",
            data: $view.colorsData

        });

        //pie chart
        $view.ui.graficoPie.rup_chart({
            type: "pie",
            data: $view.colorsData

        });

        // doughnut chart
        $view.ui.graficoDoughnut.rup_chart({
            type: "doughnut",
            data: $view.colorsData

        });

        //bubble chart
        $view.ui.graficoBubble.rup_chart({
            type: 'bubble',
            data: $view.bubbleData

        });
    }



    return ChartTestView;
});
