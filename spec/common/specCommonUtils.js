import 'jquery';

export const WEBROOT = "http://localhost:8081";

export function testTrace(title, toTrace) {
    console.info("\n\n*****************************************************\n\n" +
        title +
        "\n--------------------------------\n\n" +
        toTrace +
        "\n\n*****************************************************\n\n");
}

export function loadCss(callback) {
    $('head > style').remove();
    $('head').append('<style></style>');
    return $.when($.ajax('http://localhost:8081/dist/css/externals/bt4.min.css'))
        .then((data, textStatus, jqXHR) => {
            $('head > style').append(data);
            $.when($.ajax('http://localhost:8081/dist/css/font-awesome.min.css'))
                .then((data, textStatus, jqXHR) => {
                    $('head > style').append(data);
                    $.when($.ajax('http://localhost:8081/dist/css/rup-base.css'))
                        .then((data, textStatus, jqXHR) => {
                            $('head > style').append(data);
                            $.when($.ajax('http://localhost:8081/dist/css/rup-theme.css'))
                                .then((data, textStatus, jqXHR) => {
                                    $('head > style').append(data);
                                    $.when($.ajax('http://localhost:8081/dist/css/rup-jqueryui-theme.css'))
                                        .then((data, textStatus, jqXHR) => {
                                            $('head > style').append(data);
                                            if ($('#content').length === 0) {
                                                $('body').append('<div id="content"></div>');
                                            }
                                            callback();
                                        });
                                });
                        });
                });
        });
}