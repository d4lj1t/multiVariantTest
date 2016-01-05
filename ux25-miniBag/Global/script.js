'use strict';

var HOFMaxymiser = HOFMaxymiser || {};

HOFMaxymiser.UX25 = function () {

    var Settings = {};

    ////// Test Starts here
    var Model = {};
    var View = {};
    var Controller = {};

    Model.date = new Date();
    Model.minutes = 1;
    Model.date.setTime(Model.date.getTime() + (Model.minutes * 60 * 1000));

    Model.day = Model.date.getDay();
    Model.hour = Model.date.getHours();

    Model.showMiniBagBackup = showMiniBag;
    Model.hideMiniBagBackup = hideMiniBag;

    <!-- calculate which  delivery message to show according to current time -->

    Model.insertMessageRules = [{
        text: "Buy by noon, to get same day delivery (6pm - 9pm).",
        time: 0
    }, {
        text: "Buy by 7pm to receive next day delivery.",
        time: 12
    }, {
        text: "Buy by midnight & collect instore from noon next day.",
        time: 19
    }];

    Model.message = function () {
        var message = "";
        for (var current = 0; current < Model.insertMessageRules.length; current++) {
            if (Model.insertMessageRules[current + 1] != null) {
                if ((Model.hour > Model.insertMessageRules[current].time) && (Model.hour < Model.insertMessageRules[current + 1].time)) {
                    message = Model.insertMessageRules[current].text;
                    break;
                }
            } else {
                message = Model.insertMessageRules[Model.insertMessageRules.length - 1].text;
            }
        }
        if (message == "") {
            message = Model.insertMessageRules[0].text;
        }
        return message;
    };

    Controller.isWeekday = (Model.day != 5) && (Model.day != 6) && (Model.day != 0);

    Controller.getMessage = function () {
        if (Controller.isWeekday) {
            return Model.message();
        }
    };

    <!-- / calculate which  delivery message to show according to current time -->


    View.removeMiniBagViewedCookie = function () {
        if ($('.quantity-block').text() === 0) {
            $.cookie('miniBag_viewed', null, {path: '/'});
        }
    };

    View.emptyFunctions = function () {
        showMiniBag = function () {
        };
        hideMiniBag = function () {
        };
    };

    View.resetFunctions = function () {
        showMiniBag = Model.showMiniBagBackup;
        hideMiniBag = Model.hideMiniBagBackup;
    };

    View.injectMessage = function () {
        var strVar = "";
        strVar += "<div class=\"minicart-left-content\" style=\"";
        strVar += "    float: left;";
        strVar += "    width: 50%;";
        strVar += "    text-align:  center;";
        strVar += "    padding-top: 15px;";
        strVar += "    color: black;";
        strVar += "\">";
        strVar += "  <h3>Welcome Back!<\/h3>";
        strVar += "  <p>Your basket was saved from your last visit.<\/p>";
        strVar += "  <p class='js-delivery-text'>";
        strVar += "<\/p><\/div>";

        $('#basket-content').append(strVar);
    };

    View.removeMessage = function () {
        $('.minicart-left-content').remove();
        $('#hof-header .hof-btn-wrap .minicart-menu.hover-state').removeClass('active');
    };

    View.injectFadeBkgrnd = function () {
        $('.black-bg').length ? '' : $('.hof-navs').after('<div class="black-bg"></div>').fadeIn(100);
        $('#hof-header .hof-btn-wrap .minicart-menu.hover-state').addClass('active');
        $('#hof-header .black-bg').fadeIn(100);
        $('.hof-navs').css('background', 'transparent');
        $('nav.hof-buttons-set:first, nav.hof-buttons-set #login-menu, #searchSite').fadeTo(100, 0.3);
    };

    View.slideDownMiniBag = function () {
        $('#minicart-menu').addClass('open').find('#basket-content').hide();
        $('#basket-content').slideDown();
    };

    View.slideUpMiniBag = function () {
        $('#basket-content').css('display', '');
        $('#minicart-menu').removeClass('open');
        $('#hof-header .black-bg').fadeOut(100);
        $('.hof-navs').css('background', 'initial');
        $('nav.hof-buttons-set:first, nav.hof-buttons-set #login-menu, #searchSite').fadeTo(100, 1);
    };

    View.miniBagViewedCookie = function () {
        $.cookie('miniBag_viewed', 'true', {expires: Model.date, path: '/'});
    };

    View.lastSeenCookie = function () {
        $.cookie('last_seen', 'true', {expires: Model.date, path: '/'});
    };


    Controller.bindEvents = function () {
        View.removeMiniBagViewedCookie();
        if ($('.quantity-block').text() > 0 && $.cookie('miniBag_viewed') === null && $.cookie('last_seen') === null) {
            View.emptyFunctions();
            Model.showMiniBagBackup(true);
            View.injectMessage();
            $('.js-delivery-text').append(Controller.getMessage());
            View.injectFadeBkgrnd();
            View.slideDownMiniBag();

            $('body').click(function () {
                View.slideUpMiniBag();
                View.resetFunctions();
                hideMiniBag(true);
                View.removeMessage();
                View.miniBagViewedCookie();
            });
        }
        View.lastSeenCookie();
    };

    Controller.loadView = function () {
        log('js-loaded-' + Settings.testName);
        document.body.classList.add(Settings.testName);
        Controller.bindEvents();
    };

    var log = function (textToLog) {
        if (Settings.isProduction == false) {
            console.log(textToLog);
        }

    };
    return {
        Settings: Settings,
        View: {
            injectMessage: View.injectMessage
        },
        Model: {
            insertMessageRules: Model.insertMessageRules
        },
        init: Controller.loadView
    }
};



