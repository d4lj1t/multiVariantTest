'use strict';

var HOFMaxymiser = HOFMaxymiser || {};

HOFMaxymiser.UX25 = function () {

    var Settings = {
        actionName: 'ux25',
        isProduction: false          // Mark it as true after the variant is tested
    };

    ////// Test Starts here
    var Model = {};
    var View = {};
    var Controller = {};

    Model.cookieExpireTime = 0;


    Model.date = new Date();
    Model.minutes = 1;
    Model.date.setTime(Model.date.getTime() + (Model.minutes * 60 * 1000));

    Model.day = Model.date.getDay();
    Model.hour = Model.date.getHours();

    <!-- calculate which  delivery message to show according to current time -->

    Model.insertMessageRules = [{
        text: "Order by midnight & collect instore from Noon Next Day* <span class='font-xs clearfix'>subject to availability</span>",
        time: 18
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
        } else {

            if ($('#basket-total-sum').text() > '£49') {
                return "Order now for Free Standard Delivery* <span class='font-sm clearfix'>subject to availabilty</span>";
            }
        }
    };

    <!-- / calculate which  delivery message to show according to current time -->

    Model.isCookieSet = function () {
        if (!Settings.isProduction)
            return true;
        else
            return $('.quantity-block').text() > 0 && $.cookie('miniBag_viewed') === null && $.cookie('last_seen') === null;
    };


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
        strVar += "<div class=\"minicart-left-content\">";
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
        $.cookie('miniBag_viewed', 'true', {
            expires: Model.cookieExpireTime,
            path: '/'
        });
    };

    View.lastSeenCookie = function () {
        $.cookie('last_seen', 'true', {
            expires: Model.cookieExpireTime,
            path: '/'
        });
    };

    Controller.bindEvents = function () {
        View.removeMiniBagViewedCookie();
        if ($('.quantity-block').text() > 0) {
            View.emptyFunctions();
            Model.showMiniBagBackup(true);
            View.injectMessage();
            $('.js-delivery-text').append(Controller.getMessage());
            View.injectFadeBkgrnd();
            View.slideDownMiniBag();

            $('.hof-icon-x, .black-bg').click(function () {
                View.slideUpMiniBag();
                View.resetFunctions();
                hideMiniBag(true);
                View.removeMessage();
                View.miniBagViewedCookie();
            });
        }
        View.lastSeenCookie();
    };

    Controller.loadView = function (setCookieDate) {
        log('js-loaded-' + Settings.actionName + '-' + Settings.varient);
        document.body.classList.add(Settings.actionName + '-' + Settings.varient);
        Model.cookieExpireTime = setCookieDate;


        Model.showMiniBagBackup = showMiniBag;
        Model.hideMiniBagBackup = hideMiniBag;

        if (Model.isCookieSet())
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



'use strict';



$(window).load(function () {
    var UX25_v1 =  HOFMaxymiser.UX25();

    var date = new Date();
    var howManyDaysToExpireCookie = 7;

    date.setDate(date.getDate() + howManyDaysToExpireCookie);


    UX25_v1.Settings.varient = 'v1';
    UX25_v1.init(date);
});
