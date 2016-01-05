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

    Model.date = new Date();
    Model.minutes = 1;
    /*Model.date.setTime(Model.date.getTime() + (Model.minutes * 60 * 1000));*/

    Model.day = Model.date.getDay();
    Model.hour = Model.date.getHours();

    Model.basket = {};

    <!-- calculate which  delivery message to show according to current time -->

    Model.insertMessageRules = [
        {
            text: "Order by 7pm to receive Next Day Delivery* <span class='font-sm clearfix'>subject to availabilty</span>",
            time: 11
        }, {
            text: "Order by midnight & collect instore from Noon Next Day* <span class='font-sm clearfix'>subject to availabilty</span>",
            time: 18
        }, {
            text: "Order by noon, to get Same Day Delivery (6pm - 9pm)* <span class='font-sm clearfix'>subject to availabilty</span>",
            time: 23
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
        var strVar3 = "";
        strVar3 += "<div class=\"blur-bg\"><\/div>";

        $('.minicart-container').find('hr').not('hr:last').remove();
        $('.minicart-container').find('h3:first').remove();
        $('#minicart-menu').addClass('open');
        Model.basket.prepend(strVar3);
        Model.basket.hide().insertBefore('#deliveryBar');


    };

    View.slideUpMiniBag = function () {
        Model.basket.slideUp('slow', function () {
            $(this).css('display', '');
            $('#minicart-menu').removeClass('open');

            $('#basketLinkDropdown').append(Model.basket);
            document.body.classList.remove(Settings.actionName + '-' + Settings.varient);

        });
        $('#hof-header .black-bg').fadeOut(100);
        $('.hof-navs').css('background', 'initial');
        $('nav.hof-buttons-set:first, nav.hof-buttons-set #login-menu, #searchSite').fadeTo(100, 1);
    };

    View.miniBagViewedCookie = function () {
        $.cookie('miniBag_viewed', 'true', {expires: 7, path: '/'});
    };

    View.lastSeenCookie = function () {
        $.cookie('last_seen', 'true', {expires: 7, path: '/'});
    };

    View.showOverlay = function () {
        $('.image-overlay').fadeIn();
    };


    Controller.bindEvents = function () {
        View.removeMiniBagViewedCookie();


        if ($('.quantity-block').text() > 0 /*&& $.cookie('miniBag_viewed') === null && $.cookie('last_seen') === null*/) {
            View.emptyFunctions();
            Model.showMiniBagBackup(true);
            View.injectMessage();
            $('.js-delivery-text').append(Controller.getMessage());
            View.injectFadeBkgrnd();

            View.slideDownMiniBag();

            $('body').on('click', '.js-icon-cross', function () {
                $(this).parent('.minicart-product').addClass('remove-clicked');
            });

            $('body').on('click', '.js-no-btn, .blur-bg, .minicart-top-content, .minicart-bottom-content, .minicart-container-buttons', function () {
                $('.minicart-product').removeClass('remove-clicked');
            });

            $('body').on('click', '.black-bg, .close-mini-bag-cross', function () {

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
        log('js-loaded-' + Settings.actionName + '-' + Settings.varient);
        document.body.classList.add(Settings.actionName + '-' + Settings.varient);

        Model.showMiniBagBackup = showMiniBag;
        Model.hideMiniBagBackup = hideMiniBag;

        Model.basket = $('#basket-content');

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
            injectMessage: View.injectMessage,
            resetFunctions: View.resetFunctions
        },
        Model: {
            insertMessageRules: Model.insertMessageRules
        },
        init: Controller.loadView
    }
};




var krishCode = function () {
    var url = "";
    if (window.location.host.includes('houseoffraser')) url = window.location.host;
    else url = "www.houseoffraser.co.uk"

    var shopUrl = "/dw/shop/v15_4/$action$?client_id=03697f74-b2ec-47b6-a9bc-43a6e41d0847";
    var productsContainer = $('.minicart-container');
    var bakRemoveProductFromMiniCart = {};
    var bakshowMiniBag = {};


    var getBasket = function () {
        var basketUrl = shopUrl.replace('$action$', 'basket/this');
        return $.get(basketUrl);
    };

    var getProduct = function (productId) {
        var productUrl = shopUrl.replace('$action$', 'products/' + productId + '/images');
        return $.get(productUrl);
    };

    var createListingHtml = function (product, productImages) {
        var imageSource = '//houseoffraser.scene7.com/is/image/HOF/$imageId$?size=140,180&';
        var productUrl = "/" + product.product_name.replace(' ', '+') + '/' + product.product_id + ',default,pd.html';


        var html =
            '<li class="minicart-product">' +

            '<span class="icon-cross js-icon-cross img-overlay-cross">&nbsp</span>' +
            '<div class="img-overlay">' +
            '<div class="overlay-content-wrapper vertical-middle font-lg">Remove <br> this item?' +
            '<div class="overlay-btn-wrapper minicart-remove">' +
            '<span class="circle-btn yes-btn js-yes-btn remove-button font-lg" id="item_id_$itemId$">Yes</span>' +
            '<span class="circle-btn no-btn js-no-btn font-lg">No</span>' +
            '</div>' +
            '</div>' +
            '</div> ' +
            '<div class="img-wrapper">' +
            '<a href="$productUrl$">' +
            '<img src="$image$" alt="" class="deviceImage"/>' +
            '</a>' +
            '</div>' +
            '<span class="font-lg  letter-spacing-sm productPrice"> £$price$ </span> ' +
            '</li>';


        html = html.replace('$price$', product.price);
        html = html.replace('$productUrl$', productUrl);
        html = html.replace('$itemId$', productImages.id);
        html = html.replace('$image$', imageSource.replace('$imageId$', productImages.c_PrimaryImage));

        return html;
    };

    var changeDefualtFunct = function () {
        bakRemoveProductFromMiniCart = removeProductFromMiniCart;
        removeProductFromMiniCart = uxRemoveProductFromMiniCart;

        bakshowMiniBag = showMiniBag;
        showMiniBag = function () {
        };
    };

    var returnDefaultFunct = function () {
        removeProductFromMiniCart = bakRemoveProductFromMiniCart;
        showMiniBag = bakshowMiniBag;
    };

    var addMoreProductOverlay = function () {
        var strVar4 =
            '<div class="img-overlay see-all-items">' +
            '<a href="https://www.houseoffraser.co.uk/on/demandware.store/Sites-hof-Site/default/Cart-Show">' +
            '<div class="overlay-content-wrapper vertical-middle view-more">' +
            '<span class="font-lg">' +
            '+' + parseInt($('.quantity-block').html() - 7) + ' more' +
            '</span>' +
            '<div class="font-sm line-height-1">View Now</div>' +
            '</div>' +
            '</a>' +
            '</div> ';


        $('.minicart-product').eq(6).append(strVar4);
        $('.minicart-product').eq(6).find('.productPrice,  .img-overlay-cross').addClass('vis-none');
    };

    var removeOverlay = function () {
        $('.see-all-items').remove();
        $('.minicart-product').eq(5).find('.productPrice,  .img-overlay-cross').removeClass('vis-none');
    }

    var moreProductsOverlay = function () {
        if (parseInt($('.quantity-block').html()) > 7 && $('.see-all-items').length == 0) {
            addMoreProductOverlay();
        }
    };

    var updateQuantity = function () {
        var quant = parseInt($('.quantity-block').html());
        quant--;
        quant = quant--;
        $('.quantity-block').html(quant);
    };

    var showProduct = function (product, itemNumber) {
        var productList = productsContainer.find('.products');
        var productId = product.product_id;

        getProduct(productId).done(function (productImages) {
            productList.append(createListingHtml(product, productImages));
            $('#item_id_' + productId).click(function () {
                changeDefualtFunct();
                var id = this.id.slice(8, this.id.length);
                removeProductFromMiniCart(id);
                $(this).closest('.minicart-product').fadeOut(function () {
                    $(this).remove();
                    updateQuantity();
                    removeOverlay();
                    moreProductsOverlay();
                });
                returnDefaultFunct();
            });

            moreProductsOverlay();
        });

    };

    var getMinibag = function () {


        showMiniBag();


        var checkoutButton = $('.minicart-checkout');
        var minicartAll = $('.minicart-all');

        productsContainer = $('.minicart-container');
        productsContainer.html("");
        productsContainer.append('<ul class="products"> </ul>');

        getBasket().done(function (items) {

            var basketItems = items['product_items'];
            for (var i = 0; i < basketItems.length; i++) {
                var item = basketItems[i];

                showProduct(item, i + 1);

            }
            productsContainer.after('<div class="minicart-container-buttons"> </div>');
            var containerButtons = $('.minicart-container-buttons');
            containerButtons.append(minicartAll);
            containerButtons.append(checkoutButton);
            $('.minicart-product').hide();
        });


        $('#basket-content').slideDown();

    };


    function uxRemoveProductFromMiniCart(id) {
        jQuery.post(
            '/on/demandware.store/Sites-hof-Site/default/Cart-MiniRemoveProduct', {
                pid: id
            },

            function (html) {
                HOFSite.variables.miniBagUI.updateCache(html);
                jQuery.publish('minibag_content_updated');
            });
    }

    hideMiniBag = function () {
    };


    getMinibag();

};

'use strict';


var UX25_v2 = HOFMaxymiser.UX25();

UX25_v2.Settings.varient = 'v2';

$(window).load(function () {
    UX25_v2.init();

    krishCode();
});
