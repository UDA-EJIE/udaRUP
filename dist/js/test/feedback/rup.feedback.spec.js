/* eslint-env jasmine, jquery */


describe('RUP Feedback Tests', () => {


    describe('Invocación de un RUP Feedback por defecto', () => {

        var $feedback;

        beforeAll(() => {
            jQuery('body').append('<div id=\'feedback\'></div>');

            $feedback = jQuery('#feedback');

            $feedback.rup_feedback({
                delay: 0,
                fadeSpeed: 0
            });

        });

        afterAll(() => {
            jQuery('#feedback').remove();
        });

        it('debería disponer de los estilos de RUP', () => {
            expect($feedback).toHaveClass('rup-feedback');
        });

        it('debería reservar el área de visualización', () => {
            expect($feedback.css('display')).toBe('block');
        });

        describe('Asignación de un mensaje al feedback', () => {

            beforeAll(() => {
                $feedback.rup_feedback('set', 'Feedback de ejemplo');
            });

            it('debería de tener controles para cerrar el feedback', () => {
                var $closeLink = $feedback.find('div#feedback_closeDiv');

                expect($closeLink).toExist();
                expect($closeLink).toHaveClass('rup-feedback_closeLink');
                //expect($closeLink).toContainText('cerrar');
            });

            it('debería de tener correctamente asigando el texto', () => {
                var $contentDiv = $feedback.find('div#feedback_content');

                expect($contentDiv).toExist();
                expect($contentDiv).toContainText('Feedback de ejemplo');
            });

            it('debería de cerrarse al pulsar el enlace de cerrar', function (done) {
                var $closeLink = $feedback.find('div#feedback_closeDiv');

                $closeLink.trigger('click');
                setTimeout(() => {
                    //expect($feedback).not.toBeVisible();
                    expect($feedback).toHaveCss({
                        visibility: 'hidden'
                    });
                    done();
                }, 100);
            });
        });

        describe('Ocultar el feedback mediante la función hide', () => {

            beforeEach(() => {
                $feedback.rup_feedback('show');
            });

            afterEach(() => {});

            it('debería de ocultarse el feedback', function (done) {

                expect($feedback).toBeVisible();
                expect($feedback).not.toHaveCss({
                    visibility: 'hidden'
                });
                $feedback.rup_feedback('hide');

                setTimeout(() => {
                    //expect($feedback).not.toBeVisible();
                    expect($feedback).toHaveCss({
                        visibility: 'hidden'
                    });
                    done();
                }, 500);

            });
        });



    });

    // Tests de la función set
    describe('Creación de diferentes tipos de feedback mediante el método set', () => {

        var $feedback, $textDivId, textDivId, message;

        beforeAll(() => {
            jQuery('body').append('<div id=\'feedback\'></div>');

            $feedback = jQuery('#feedback');
            $feedback.rup_feedback({
                delay: 0,
                fadeSpeed: 0
            });

            textDivId = $feedback.attr('id') + '_content';
            $textDivId = $feedback.find('[id=\'' + textDivId + '\']');
        });

        afterAll(() => {
            jQuery('#feedback').remove();
        });

        describe('Mostrar feedback de tipo \'ok\' con el texto \'Todo ha ido bien\'', () => {
            beforeAll(() => {
                message = 'Todo ha ido bien';
                $feedback.rup_feedback('set', message, 'ok');
                $textDivId = $feedback.find('[id=\'' + textDivId + '\']');
            });
            it('debería de mostrar el texto \'Todo ha ido bien\'', () => {
                expect($textDivId).toContainText(message);
            });

            it('debería de tener asigando el class correspondiente al tipo \'ok\'', () => {
                expect($feedback).toHaveClass('rup-feedback_image_ok');
            });
        });

        describe('Mostrar feedback de tipo \'alert\' con el texto \'Se ha producido un mensaje de aviso\'', () => {
            beforeAll(() => {
                message = 'Se ha producido un mensaje de aviso';
                $feedback.rup_feedback('set', message, 'alert');
                $textDivId = $feedback.find('[id=\'' + textDivId + '\']');
            });
            it('debería de mostrar el texto \'Todo ha ido bien\'', () => {
                expect($textDivId).toContainText(message);
            });

            it('debería de tener asigando el class correspondiente al tipo \'alert\'', () => {
                expect($feedback).toHaveClass('rup-feedback_image_alert');
            });
        });

        describe('Mostrar feedback de tipo \'error\' con el texto \'Se ha producido un error\'', () => {
            beforeAll(() => {
                message = 'Se ha producido un error';
                $feedback.rup_feedback('set', message, 'error');
                $textDivId = $feedback.find('[id=\'' + textDivId + '\']');
            });
            it('debería de mostrar el texto \'Se ha producido un error\'', () => {
                expect($textDivId).toContainText(message);
            });

            it('debería de tener asigando el class correspondiente al tipo \'error\'', () => {
                expect($feedback).toHaveClass('rup-feedback_image_error');
            });
        });

    });
});
// }));