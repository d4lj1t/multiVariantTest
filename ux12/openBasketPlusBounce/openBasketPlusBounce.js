(function() {

    addProductToMiniCart = function(form, callback) {
        var serializedForm = jQuery(form).serialize();
        jQuery.post(
            '/on/demandware.store/Sites-hof-Site/default/Cart-MiniAddProduct',
            serializedForm,
            function(html) {
                var htmlCache = html.replace(/<script.*?>[\s\S.]*?<\/script>/igm, " ");

                HOFSite.variables.miniBagUI.updateCache(htmlCache);
                jQuery('#basket-content').html(html);

                var minicartSubtotal = jQuery.trim(jQuery('#minicart-pricesubtotal').text());
                jQuery('#basket-total-sum').html(minicartSubtotal);

                // The following call will update the mini bag button items whithout opening the mini bag
                // Updated: This now opens the minibag
                showMiniBag(true);
                $('html, body').animate({
                    scrollTop: $('.hof-navs').offset().top
                }, 600);

                showMsgWhenDone('product');

                //UX12 fireEvent
                $.publish('product/added/to/cart');

                if (callback)
                    callback();
            }
        );
    }

    var animateBag = function(element, times, distance, speed) {
        for (i = 0; i < times; i++) {
            element.animate({
                marginTop: '-=' + distance
            }, speed).animate({
                marginTop: '+=' + distance
            }, speed);
            $('.quantity-block').animate({
                marginTop: '-=' + distance
            }, speed).animate({
                marginTop: '+=' + distance
            }, speed);
        }
        $.publish('bag/animation/done');
    }

    $.subscribe('product/added/to/cart', function() {
        animateBag($('.hof-icon.hof-icon-bag-pink'), 3, '10px', 150);
    });

    var slideUpCalled = false;
    var MiniBagSlideUp = function() {
        $('#basket-content').slideUp(function() {
            slideUpCalled = true;
            $('#basket-content').css('display', '');
            $('#minicart-menu').removeClass('open');
        });
    };

    $.subscribe('bag/animation/done', function() {
        setTimeout(function() {
            $('#minicart-menu').addClass('open').find('#basket-content').hide();
            $('#basket-content').slideDown();
            slideUpCalled = false;

            $('.menu-close-button').click(function() {
                MiniBagSlideUp();
            });
            
            setTimeout(function() {
                if(!slideUpCalled)
                    MiniBagSlideUp();
            }, 4000);
        }, 1200);
    });
})();
