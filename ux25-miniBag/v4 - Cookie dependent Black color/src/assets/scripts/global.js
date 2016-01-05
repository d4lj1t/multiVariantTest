'use strict';

var HOFMaxymiser = HOFMaxymiser || {};

HOFMaxymiser.UX25_fullscreen = function() {

    var Settings = {
        actionName: 'ux25',
        isProduction: false // Mark it as true after the variant is tested
    };

    ////// Test Starts here
    var Model = {};
    var View = {};
    var Controller = {};


    Model.cookieExpireTime = 0;

    Model.date = new Date();
    Model.minutes = 1;
    /*Model.date.setTime(Model.date.getTime() + (Model.minutes * 60 * 1000));*/

    Model.day = Model.date.getDay();
    Model.hour = Model.date.getHours();

    Model.basket = {};

    <!-- calculate which  delivery message to show according to current time -->

    Model.insertMessageRules = [{
        text: "Order by midnight & collect instore from Noon Next Day* <span class='font-sm clearfix'>subject to availabilty</span>",
        time: 18
    }];

    Model.message = function() {
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

    Model.isCookieSet = function() {
        if (!Settings.isProduction)
            return true;
        else
            return $('.quantity-block').text() > 0 && $.cookie('miniBag_viewed') === null && $.cookie('last_seen') === null;
    };

    Controller.isWeekday = (Model.day != 5) && (Model.day != 6) && (Model.day != 0);

    Controller.getMessage = function() {
        return Model.message();
    };

    <!-- / calculate which  delivery message to show according to current time -->


    View.removeMiniBagViewedCookie = function() {
        if ($('.quantity-block').text() === 0) {
            $.cookie('miniBag_viewed', null, {
                path: '/'
            });
        }
    };

    View.emptyFunctions = function() {
        showMiniBag = function() {};
        hideMiniBag = function() {};
    };

    View.resetFunctions = function() {
        showMiniBag = Model.showMiniBagBackup;
        hideMiniBag = Model.hideMiniBagBackup;
    };

    View.injectMessage = function() {
        var strVar = "";
        strVar += "<div class=\"minicart-top-content\">  " +
            "<span class=\"font-lg-large\">Welcome Back! <\/span>  " +
            "<span class=\"font-lg\"> Your basket was saved from your last visit.<\/span>  " +
            '<span class="icon-cross pull-right close-mini-bag-cross">&nbsp</span>' +

            "<\/div>";


        $('.minicart-container').before(strVar);

        var strVar2 = "";
        strVar2 += "<div class=\"minicart-bottom-content  letter-spacing-sm \">  " +
            "<span class=\"icon-time\">&nbsp<\/span>  " +
            "<span class=\"js-delivery-text font-lg\">&nbsp<\/span>  " +
            "<\/div>";


        $('.minicart-container').after(strVar2);

    };

    View.removeMessage = function() {
        $('.minicart-left-content').remove();
        $('#hof-header .hof-btn-wrap .minicart-menu.hover-state').removeClass('active');
    };

    View.injectFadeBkgrnd = function() {
        $('.black-bg').length ? '' : $('.hof-navs').after('<div class="black-bg"></div>').fadeIn(100);
        $('#hof-header .hof-btn-wrap .minicart-menu.hover-state').addClass('active');
        $('#hof-header .black-bg').fadeIn(100);
        $('.hof-navs').css('background', 'transparent');
        $('nav.hof-buttons-set:first, nav.hof-buttons-set #login-menu, #searchSite').fadeTo(100, 0.3);
    };

    View.slideDownMiniBag = function() {
        var strVar3 = "";
        strVar3 += "<div class=\"blur-bg\"><\/div>";

        $('.minicart-container').find('hr').not('hr:last').remove();
        $('.minicart-container').find('h3:first').remove();
        $('#minicart-menu').addClass('open');
        Model.basket.prepend(strVar3);
        Model.basket.hide().insertBefore('#deliveryBar');


    };

    View.slideUpMiniBag = function() {
        Model.basket.slideUp('slow', function() {
            $(this).css('display', '');
            $('#minicart-menu').removeClass('open');

            $('#basketLinkDropdown').append(Model.basket);
            document.body.classList.remove(Settings.actionName + '-' + Settings.varient);

        });
        $('#hof-header .black-bg').fadeOut(100);
        $('.hof-navs').css('background', 'initial');
        $('nav.hof-buttons-set:first, nav.hof-buttons-set #login-menu, #searchSite').fadeTo(100, 1);
    };

    View.miniBagViewedCookie = function() {
        $.cookie('miniBag_viewed', 'true', {
            expires: Model.cookieExpireTime,
            path: '/'
        });
    };

    View.lastSeenCookie = function() {
        $.cookie('last_seen', 'true', {
            expires: Model.cookieExpireTime,
            path: '/'
        });
    };

    View.showOverlay = function() {
        $('.image-overlay').fadeIn();
    };



    Controller.bindEvents = function() {
        View.removeMiniBagViewedCookie();


        if (Model.isCookieSet()) {
            View.emptyFunctions();
            Model.showMiniBagBackup(true);
            View.injectMessage();
            $('.js-delivery-text').append(Controller.getMessage());
            View.injectFadeBkgrnd();

            View.slideDownMiniBag();

            $('body').on('click', '.js-icon-cross', function() {
                $(this).parent('.minicart-product').addClass('remove-clicked');
            });

            $('body').on('click', '.js-no-btn, .blur-bg, .minicart-top-content, .minicart-bottom-content, .minicart-container-buttons', function() {
                $('.minicart-product').removeClass('remove-clicked');
            });

            $('body').on('click', '.black-bg, .close-mini-bag-cross', function() {

                View.slideUpMiniBag();
                View.resetFunctions();
                hideMiniBag(true);
                View.removeMessage();
                View.miniBagViewedCookie();

            });
            minibagReformat();
        }
        View.lastSeenCookie();
    };

    Controller.loadView = function(setCookieDate) {
        log('js-loaded-' + Settings.actionName + '-' + Settings.varient);
        document.body.classList.add(Settings.actionName + '-' + Settings.varient);
        Model.cookieExpireTime = setCookieDate;

        Model.showMiniBagBackup = showMiniBag;
        Model.hideMiniBagBackup = hideMiniBag;

        Model.basket = $('#basket-content');

        Controller.bindEvents();
    };

    var log = function(textToLog) {
        if (Settings.isProduction == false) {
            console.log(textToLog);
        }
    };
    return {
        Settings: Settings,
        View: {
            injectMessage: View.injectMessage,
            resetFunctions: View.resetFunctions
        },
        Model: {
            insertMessageRules: Model.insertMessageRules
        },
        init: Controller.loadView
    }
};
