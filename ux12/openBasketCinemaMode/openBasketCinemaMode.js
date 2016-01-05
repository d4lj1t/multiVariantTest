(function() {

    $('body').addClass('ux12');

    $('.black-bg').length ? '' : $('.hof-navs').after('<div class="black-bg"></div>').fadeIn(100);

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
                showMiniBag(true);
                $('html, body').animate({
                    scrollTop: $('.hof-navs').offset().top
                }, 600);

                showMsgWhenDone('product');

                //UX12 This event trigger rest of the functionality of the app and 
                //     acts as a entry point
                $.publish('product/added/to/cart');

                if (callback)
                    callback();
            }
        );
    }

    $.subscribe('product/added/to/cart', function() {
        $('#hof-header .black-bg').fadeIn(100);
        $('.hof-navs').css('background', 'transparent');
        $('nav.hof-buttons-set:first, nav.hof-buttons-set #login-menu, #searchSite').fadeTo(100, 0.3);
        animateBag($('.hof-icon.hof-icon-bag-pink'), 3, '10px', 150);
    });

    var slideUpCalled = false;
    var MiniBagSlideUp = function() {
        $('#basket-content').slideToggle(function() {
            $('#basket-content').css('display', '');
            $('#minicart-menu').removeClass('open');
            $('#hof-header .black-bg').fadeOut(100);
            $('.hof-navs').css('background', 'initial');
            $('nav.hof-buttons-set:first, nav.hof-buttons-set #login-menu, #searchSite').fadeTo(100, 1);
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
                if (!slideUpCalled)
                    MiniBagSlideUp();
            }, 4000);

        }, 1200);
    });


})();
