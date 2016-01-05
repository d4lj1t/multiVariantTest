var minibagReformat = function () {
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


        html = html.replace('$price$', product.price.toFixed(2));
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
