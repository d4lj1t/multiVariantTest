var HOFMaxymiser = HOFMaxymiser || {};
HOFMaxymiser.ux22 = function () {

    var Settings = {
        testName: 'ux22',
        isProduction: false
    };

    var Modal = {};
    var Controller = {};
    var View = {
        logos: $('.allLogos').html(),
        currentLogo: {}
    };


    View.isLogoSelected = function () {
        var hasAnyIconChanged = false;

        $('.allLogos img').each(function (index, element) {
            if ($(element).hasClass('desaturated')) {
                hasAnyIconChanged = true;
                return false;
            }
        });

        return hasAnyIconChanged;
    };

    View.getSelectedLogo = function () {
        var selected = {};
        $('.allLogos img').each(function (index, element) {
            if (!$(element).hasClass('desaturated')) {
                selected = element;
                return false;
            }
        });
        return selected;
    };

    View.bindLogoToInput = function () {
        $('#cardNumber').after(this.currentLogo);
        this.currentLogo.hide().addClass(Settings.testName + '-card-icon').fadeIn();
    };


    View.checkLogos = function () {
        var view = this;
        setTimeout(function () {
            var currentLogos = $('.allLogos').html();
            if (currentLogos != view.logos) {
                view.logos = currentLogos;

                if (view.isLogoSelected()) {
                    view.currentLogo = $(view.getSelectedLogo()).clone();
                    view.bindLogoToInput();
                } else {
                    view.currentLogo.remove();
                }

            }
        }, 200);
    };


    Controller.bindEvents = function () {
        $('#cardNumber').on('input paste', function () {
            View.checkLogos();
        });
    };


    Controller.loadView = function () {
        log('js-loaded' + Settings.testName);
        if ($('#cardNumber').length) {
            document.body.classList.add(Settings.testName);
            this.bindEvents(View);
        }
    };

    var log = function (textToLog) {
        if (Settings.isProduction == false) {
            console.log(textToLog);
        }
    };


    Controller.loadView();
}();