define(['marionette',
    'templates',
    'rup/chart'
], function(Marionette, App) {



    var ChartView = Marionette.LayoutView.extend({
        template: App.Templates.demo.app.components.chart.chartTemplate,
        ui: {

            graficoLine: "#graficoLine",
            graficoBar: "#graficoBar",
            graficoRadar: "#graficoRadar",
            graficoPolar: "#graficoPolar",
            graficoPie: "#graficoPie",
            graficoDoughnut: "#graficoDoughnut"

        },
        mesesLabels:[],
        radarLabels:[],
        datasetRadar:[],
        initialize: fncInitialize,
        onDomRefresh: fncOnDomRefresh

    });

    function fncInitialize(){
      this.mesesLabels={
					"January": "Enero",
					"February": "Febrero",
					"March" : "Marzo",
					"April" : "Abril",
					"May":"Mayo",
					"June": "Junio",
					"July":"Julio"
				};
      this.radarLabels={
          "Eating": "Comida",
	    		"Drinking" :"Bebida",
	    		"Sleeping": "Dormir",
	    		"Designing": "Diseño",
	    		"Coding": "Programacion",
	    		"Cycling" : "Bicicleta",
	    		"Running" :"Correr"
				};
      this.datasetRadar={
    		"dataset1":"dataset 1"
    	};
    }

    function fncOnDomRefresh() {


        renderChartLine(this);
        renderChartBar(this);
        renderChartRadar(this);
        renderChartPolar(this);
        renderChartPie(this);
        renderCHartDoughnut(this);

    }



    function renderChartLine($view) {
        var data = {
            labels: $view.mesesLabels,
            datasets: [{
                label: $view.dataset1,
                data: [65, 59, 80, 81, 56, 55, 40]
            }, {
                label: "My Second dataset",
                data: [28, 48, 40, 19, 86, 27, 90]
            }]
        };



        $view.ui.graficoLine.rup_chart({
            type: "line",
            data: data
        });

    }

    function renderChartBar($view) {

        var data = {
            labels: $view.mesesLabels,
            datasets: [{
                label: "My First ",
                data: [65, 59, 80, 81, 56, 55, 40]
            }, {
                label: "My Second",
                data: [28, 48, 40, 19, 86, 27, 90]
            }]
        };



        $view.ui.graficoBar.rup_chart({
            type: "bar",
            data: data
        });


    }

    function renderChartRadar($view) {
        var data = {
            labels: $view.radarLabels,
            datasets: [{
                label: $view.dataset1,
                data: [65, 59, 90, 81, 56, 55, 40]
            }, {
                label: "My Second dataset",
                data: [28, 48, 40, 19, 96, 27, 100]
            }]
        };




        $view.ui.graficoRadar.rup_chart({
            type: "radar",
            data: data


        });
    }


    function renderChartPolar($view) {

        /*var data = [{
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

        ];*/
        var data = [
    {
        value: 300,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "Red"
    },
    {
        value: 50,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Green"
    },
    {
        value: 100,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Yellow"
    },
    {
        value: 40,
        color: "#949FB1",
        highlight: "#A8B3C5",
        label: "Grey"
    },
    {
        value: 120,
        color: "#4D5360",
        highlight: "#616774",
        label: "Dark Grey"
    }

];


        $view.ui.graficoPolar.rup_chart({
            type: "polarArea",
            data: data

        });
    }

    function renderChartPie($view) {

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



        $view.ui.graficoPie.rup_chart({
            type: "pie",
            data: data

        });
    }

    function renderCHartDoughnut($view) {

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



        $view.ui.graficoDoughnut.rup_chart({
            type: "doughnut",
            data: data

        });
    }
    return ChartView;
});
