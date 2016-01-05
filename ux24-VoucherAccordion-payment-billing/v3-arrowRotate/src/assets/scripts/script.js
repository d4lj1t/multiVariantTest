var accordionClick = false;
var inputFocus = false;

'use strict';

var HOFMaxymiser = HOFMaxymiser || {};

HOFMaxymiser.UX24_v3 = function () {

    var Settings = {
        actionName: 'ux24',
        isProduction: true          // Mark it as true after the variant is tested
    };

    Settings.varient= 'v3';


    ////// Test Starts here
    var Model = {};

    var View = {};

    View.pages = {
        MY_BAG: 0,
        DELIVERY: 1,
        PAYMENT: 2,
        SUMMARY: 3,
        COMPLETE: 4
    }

    View.getPage = function (value) {
        for (var k in View.pages) {
            if (View.pages.hasOwnProperty(k)) {
                if (View.pages[k] == value) {
                    return k;
                }
            }
        }
        return undefined;
    }

    View.findPage = function () {
        var nav = $('#progress');
        var current = nav.find('.current');
        var positionOfSelected = current.index();
        return View.getPage(positionOfSelected);
    }

    View.injectSVG = function () {
        var strVar="";
        strVar += "<svg version=\"1.1\" xmlns=\"http:\/\/www.w3.org\/2000\/svg\" xmlns:xlink=\"http:\/\/www.w3.org\/1999\/xlink\" x=\"0px\" y=\"0px\" width=\"20px\"";
        strVar += "	 height=\"20px\" viewBox=\"0 0 20 20\" enable-background=\"new 0 0 20 20\" xml:space=\"preserve\">";
        strVar += "<g id=\"Layer_1\">";
        strVar += "<\/g>";
        strVar += "<g id=\"Layer_3\">";
        strVar += "	<path fill=\"#FFFFFF\" stroke=\"#000000\" stroke-miterlimit=\"10\" d=\"M0.2,7.4\"\/>";
        strVar += "	<path fill=\"#FFFFFF\" stroke=\"#000000\" stroke-miterlimit=\"10\" d=\"M19.2,7.4\"\/>";
        strVar += "	<polyline fill=\"none\" stroke=\"#000000\" stroke-miterlimit=\"10\" points=\"19.8,7.2 10,13 0.2,7.2 	\"\/>";
        strVar += "<\/g>";
        strVar += "<g id=\"above_fold\" display=\"none\">";
        strVar += "<\/g>";
        strVar += "<\/svg>";


        $('.section.paymentSection legend span').append(strVar);
        $('.pptGiftFieldset').fadeIn(600);
    };

    var Controller = {};

    Controller.bindEvents = function () {
        $('#redeemCardsAndVouchers').contents().unwrap().wrap('<p id="redeemCardsAndVouchers" title="Click to Expand" />');

        $('.section.paymentSection legend').click(function () {
            if (!$(this).hasClass('active')) {
                accordionClick = true;
                mmcore.$Action(Settings.actionName, 1, 'accordionclicked');
                mmcore.request();

                $(this).addClass('active');
                $(this).find('span').addClass('active');
                $('.container-wrapper').animate({'min-height': "272px"}, 'fast');
                $('#redeemCardsAndVouchersContainer').delay(200).fadeIn({duration: 800});
            } else {
                $(this).removeClass('active');
                $(this).find('span').removeClass('active');
                $('.container-wrapper').animate({'min-height': "0"}, 'fast');
                $('#redeemCardsAndVouchersContainer').hide();
            }
        })
    };

    Controller.maxymiserTrackingEvents = function () {
        $('#dwfrm_giftchecker_giftcode, #couponCodeInput').focus(function () {
            mmcore.$Action(Settings.actionName, 1, 'inputFocus');
            mmcore.request();
            inputFocus = true;
        });

        $('#orderConfirmButton[name="dwfrm_checkout_billing_newcreditcard_confirm"]').click(function () {
            if (accordionClick === false) {
                mmcore.$Action(Settings.actionName, 1, 'submitNoAccordionClick');
                mmcore.request();
            }
        });
    };

    Controller.loadView = function () {
        if (View.findPage() === 'PAYMENT') {
            log('js-loaded-' + Settings.actionName + '-' + Settings.varient);
            document.body.classList.add(Settings.actionName + '-' + Settings.varient);
            View.injectSVG();
            $("#redeemCardsAndVouchersContainer").wrap("<div class='container-wrapper' />");
            Controller.bindEvents();
            Controller.maxymiserTrackingEvents();
        }
    };

    var log = function (textToLog) {
        if (Settings.isProduction == false) {
            console.log(textToLog);
        }
    };

    $(function () {
        Controller.loadView();
    });


    $(window).load(function () {
        if (View.findPage() === 'PAYMENT') {
            $('#redeemCardsAndVouchers, .pptGiftFieldset span').off();
        }
    });

}();



