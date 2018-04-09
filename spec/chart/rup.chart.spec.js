import 'jquery';
import 'handlebars';
import 'jasmine-jquery';
import 'rup.chart';

describe('Test Chart', () => {
    var $chart;
    describe('Creacion de la chart', () => {
        beforeAll(() => {
            var options = {
                type: 'line',
                data:{
                    labels:['label1', 'label2', 'label3'],
                    datasets:[
                        {
                            label:'dataset1',
                            data:[10, 20, 40]
                        }
                    ]
                },
                options:{
                    legend:{
                        display:true
                    }
                }
            };
            var html = '<div class="col-xl-6  col-xs-12  col-sm-5">' +
			                '<div class="butstyle">' +
				                '<canvas id="exampleChart" ></canvas>' +
			                '</div>' +
		                '</div>';
            $('body').append(html);
            $chart = $('#exampleChart');
        });
        
        it('Debe estar definido', () => {
            expect($chart instanceof Chart).toBeTruthy();
        });
    });
    describe('Métodos públicos', () => {
        describe('Métodos updateData y getData', () => {
            var dataUpdate;
            beforeAll(() => {
                dataUpdate = {
                    datasets:[{
                        label: 'dataset1',
                        data:[3, 8, 4]
                    }],
                    labels:['label1.1','label2.1','label3.1']
                };
            });
            it('No debe lanzar errores al actualizarse', () => {
                expect($chart.rup_chart('updateData', dataUpdate)).not.toThrowError();
            });
            it('Los valores recogidos deben ser correctos', () => {
                expect($chart.rup_chart('getData')).toBe(dataUpdate);
            });
        });
        describe('Métodos updateLabels y getLabels', () => {
            var dataUpdate;
            beforeAll(() => {
                dataUpdate = ['label1.1','label2.1','label3.1'];
            });
            it('No debe lanzar errores al actualizarse', () => {
                expect($chart.rup_chart('updateLabels', dataUpdate)).not.toThrowError();
            });
            it('Los valores recogidos deben ser correctos', () => {
                expect($chart.rup_chart('getLabels')).toBe(dataUpdate);
            });
        });
        describe('Métodos updateDatasets y getDatasets', () => {
            var dataUpdate;
            beforeAll(() => {
                dataUpdate = [{
                    label: 'dataset1',
                    data:[3, 8, 4]
                }];
            });
            it('No debe lanzar errores al actualizarse', () => {
                expect($chart.rup_chart('updateDatasets', dataUpdate)).not.toThrowError();
            });
            it('Los valores recogidos deben ser correctos', () => {
                expect($chart.rup_chart('getDatasets')).toBe(dataUpdate);
            });
        });
        describe('Método getChart', () => {
            var expresion = $chart.rup_chart('getChart');
            expect(expresion instanceof ChartController).toBeTruthy();
        });
        describe('Método toBase64Image', () => {
            let resp;
            beforeAll(() => {
                resp = $chart.rup_chart('toBase64Image');
            });
            it('Debe ser un string', () => {
                expect(typeof(resp) == "string").toBeTruthy();
            });
        });
    });
});