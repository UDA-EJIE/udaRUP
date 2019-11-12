/* jslint multistr: true */
/* eslint-env jasmine, jquery */


describe('Test Chart', () => {
    var $chart;

    beforeAll((done) => {
        testutils.loadCss(done);
    });

    beforeEach(() => {
        var options = {
            type: 'line',
            data: {
                labels: ['label1', 'label2', 'label3'],
                datasets: [{
                    label: 'dataset1',
                    data: [10, 20, 40]
                }]
            },
            options: {
                legend: {
                    display: true
                }
            }
        };
        var html = '<div class="butstyle">\
                        <canvas id="exampleChart" ></canvas>\
                    </div>';
        $('#content').append(html);
        $('#exampleChart').rup_chart(options);
        $chart = $('#exampleChart');
    });
    afterEach(() => {
        $('#content').html('');
        $('#content').nextAll().remove();
    });
    describe('Creacion >', () => {
        it('Debe estar definido', () => {
            expect($chart).toHaveClass('rup-chart');
        });
    });
    describe('Métodos públicos >', () => {
        describe('Métodos updateData y getData', () => {
            var dataUpdate;
            beforeEach(() => {
                dataUpdate = {
                    datasets: [{
                        label: 'dataset1',
                        data: [3, 8, 4]
                    }],
                    labels: ['label1.1', 'label2.1', 'label3.1']
                };
                $chart.rup_chart('updateData', dataUpdate);
            });
            it('Los valores recogidos deben ser correctos', () => {
                expect($chart.rup_chart('getData')).toBe(dataUpdate);
            });
        });
        describe('Métodos updateLabels y getLabels', () => {
            var dataUpdate;
            beforeEach(() => {
                dataUpdate = ['label1.1', 'label2.1', 'label3.1'];
                $chart.rup_chart('updateLabels', dataUpdate);
            });
            it('Los valores recogidos deben ser correctos', () => {
                expect($chart.rup_chart('getLabels')).toBe(dataUpdate);
            });
        });
        describe('Métodos updateDatasets y getDatasets', () => {
            var dataUpdate;
            beforeEach(() => {
                dataUpdate = [{
                    label: 'dataset1',
                    data: [3, 8, 4]
                }];
                $chart.rup_chart('updateDatasets', dataUpdate);
            });
            it('Los valores recogidos deben ser correctos', () => {
                expect($chart.rup_chart('getDatasets')).toBe(dataUpdate);
            });
        });
        describe('Método getChart', () => {
            it('Debe devolver una instancia de Chart.Controller', () => {
                expect($chart.rup_chart('getChart') instanceof Chart.Controller).toBeTruthy();
            });
        });
        describe('Método toBase64Image', () => {
            let resp;
            beforeEach(() => {
                resp = $chart.rup_chart('toBase64Image');
            });
            it('Debe ser un string', () => {
                expect(typeof (resp) == 'string').toBeTruthy();
            });
            it('Debe comenzar con una secuencia de caracteres concreta', () => {
                expect(resp.indexOf('data:image/png') >= 0 && resp.indexOf('base64') >= 0).toBe(true);
            });
        });
    });
});