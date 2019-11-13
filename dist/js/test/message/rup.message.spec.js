/* jshint -W030 */
/* jslint multistr: true */
/* eslint-env jasmine, jquery */


$.when(messageTester('Ok'))
    .then(messageTester('Alert'))
    .then(messageTester('Error'))
    .then(messageTester('Confirm'));

function messageTester(msgType) {
    var def = $.Deferred();
    describe('Test Message ' + msgType, () => {
        beforeAll((done) => {
            testutils.loadCss(done);
        });
        afterAll(() => {
            def.resolve();
        });
        beforeEach((done) => {
            let clsCallback = () => {
                $('#content').addClass('msg-cls');
            };
            switch (msgType) {
            case 'Ok':
                $.rup_messages('msgOK', {
                    title: 'Correcto',
                    message: 'Todo ha ido Ok',
                    beforeClose: clsCallback,
                    open: done
                });
                break;
            case 'Alert':
                $.rup_messages('msgAlert', {
                    title: 'Aviso',
                    message: 'Advertencia',
                    beforeClose: clsCallback,
                    open: done
                });
                break;
            case 'Error':
                $.rup_messages('msgError', {
                    title: 'Error',
                    message: 'Fallo',
                    beforeClose: clsCallback,
                    open: done
                });
                break;
            case 'Confirm':
                $.rup_messages('msgConfirm', {
                    title: 'Confirmacion',
                    message: 'Confirma?',
                    beforeClose: clsCallback,
                    open: done
                });
                break;
            }
        });
        afterEach((done) => {
            let $ctn = $('#content');
            $ctn.is('.msg-cls') ? $ctn.removeClass('msg-cls') : undefined;
            $ctn.nextAll().remove();
            done();
        });
        describe('Creación > ', () => {
            it('Posee las clases adecuadas:', (done) => {
                switch (msgType) {
                case 'Ok':
                    expect($('div.ui-dialog').is('.rup-message.rup-message-ok')).toBeTruthy();
                    break;
                case 'Alert':
                    expect($('div.ui-dialog').is('.rup-message.rup-message-alert')).toBeTruthy();
                    break;
                case 'Error':
                    expect($('div.ui-dialog').is('.rup-message.rup-message-error')).toBeTruthy();
                    break;
                case 'Confirm':
                    expect($('div.ui-dialog').is('.rup-message.rup-message-confirm')).toBeTruthy();
                    break;
                }
                done();
            });
            it('Posee el título correspondiente:', (done) => {
                switch (msgType) {
                case 'Ok':
                    expect($('.ui-dialog-titlebar > span.ui-dialog-title').text()).toBe('Correcto');
                    break;
                case 'Alert':
                    expect($('.ui-dialog-titlebar > span.ui-dialog-title').text()).toBe('Aviso');
                    break;
                case 'Error':
                    expect($('.ui-dialog-titlebar > span.ui-dialog-title').text()).toBe('Error');
                    break;
                case 'Confirm':
                    expect($('.ui-dialog-titlebar > span.ui-dialog-title').text()).toBe('Confirmacion');
                    break;
                }
                done();
            });
            it('Posee el mensaje especificado:', (done) => {
                switch (msgType) {
                case 'Ok':
                    expect($('.ui-dialog-content [id$="_msg"]').text()).toBe('Todo ha ido Ok');
                    break;
                case 'Alert':
                    expect($('.ui-dialog-content [id$="_msg"]').text()).toBe('Advertencia');
                    break;
                case 'Error':
                    expect($('.ui-dialog-content [id$="_msg"]').text()).toBe('Fallo');
                    break;
                case 'Confirm':
                    expect($('.ui-dialog-content [id$="_msg"]').text()).toBe('Confirma?');
                    break;
                }
                done();
            });
            it('Posee los botones apropiados:', (done) => {
                switch (msgType) {
                case 'Ok':
                    expect($('button', $('.ui-dialog-buttonset')).text()).toBe('Aceptar');
                    break;
                case 'Alert':
                    expect($('button', $('.ui-dialog-buttonset')).text()).toBe('Aceptar');
                    break;
                case 'Error':
                    expect($('button', $('.ui-dialog-buttonset')).text()).toBe('Aceptar');
                    break;
                case 'Confirm':
                    expect($('button', $('.ui-dialog-buttonset')).length).toBe(2);
                    expect($('button:first', $('.ui-dialog-buttonset')).text()).toBe('Cancelar');
                    expect($('button:last', $('.ui-dialog-buttonset')).text()).toBe('Aceptar');
                    break;
                }
                done();
            });
        });
        describe('Funcionamiento > ', () => {
            describe('Cerrado del message > ', () => {
                beforeEach((done) => {
                    window.done = done;
                    $('.ui-dialog').on('dialogclose', done);
                    $('i.mdi.mdi-close.float-right.pointer').click();
                });
                it('Se cierra el message:', (done) => {
                    expect($('.ui-dialog:visible').length).toBe(0);
                    done();
                });
                it('Se ejecuta el callback de cierre:', (done) => {
                    expect($('#content').is('.msg-cls')).toBeTruthy();
                    done();
                });
            });
        });
    });
}