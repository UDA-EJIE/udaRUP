import 'jquery';
import 'handlebars';
import 'jasmine-jquery';
import 'rup.chart';

describe('Test Chart', () => {
    describe('Creacion de la chart', () => {
        var options, $chart;
        beforeAll(() => {
            options = {
                labels: ['data1', 'data2', 'data3'],
                datasets: [
                    {
                        label: 'data1',
                        data: [2,6,3,4],
                    },
                    {
                        label: 'data2',
                        data: [5,3,6,2],
                    }
                ]
            };
            var html = '<canvas id="exampleChart"></canvas>';
            $('body').append(html);
            $chart = $('#exampleChart');
        });
        
        it('Debe estar definido', () => {
            expect($chart instanceof Chart).toBeTruthy();
        });
    });
    describe('Métodos públicos', () => {
        describe('Método updateData', () => {
            //No entiendo que hace 
        });
    });
});