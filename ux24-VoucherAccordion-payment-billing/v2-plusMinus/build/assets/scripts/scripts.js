var accordionClick = false;
var inputFocus = false;

'use strict';

var HOFMaxymiser = HOFMaxymiser || {};

HOFMaxymiser.UX24_v2 = function () {

    var Settings = {
        actionName: 'ux24',
        isProduction: true          // Mark it as true after the variant is tested
    };

    Settings.varient= 'v2';


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
                $('#redeemCardsAndVouchersContainer').delay(100).fadeIn({duration: 600});
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
            $('.pptGiftFieldset').fadeIn(600);
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



