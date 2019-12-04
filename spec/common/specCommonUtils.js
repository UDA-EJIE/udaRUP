/* eslint-disable no-console */
/* eslint-env jasmine, jquery */

import 'jquery';

export const DIST = '/dist';
export const DEMO = '/demo';

export function testTrace(title, toTrace) {
    console.info('\n\n*****************************************************\n\n' +
        title +
        '\n--------------------------------\n\n' +
        toTrace +
        '\n\n*****************************************************\n\n');
}

export function loadCss(callback) {
    $('head > style').remove();
    $('head').append('<style></style>');
    return $.when($.ajax(DIST + '/css/rup.min.css'))
        .always((data) => {
            $('head > style').append(data);
            // $.when($.ajax(DIST + '/css/rup-theme.css'))
            //     .always((data) => {
            //         $('head > style').append(data);
            if($('#content').length === 0) {
                $('body').append('<div id="content" class="container mt-4"></div>');
                $('.jasmine_html-reporter').css('margin','0px');
                $('body').css('overflow-x','hidden');
            }
            callback();
            // });
        });
}