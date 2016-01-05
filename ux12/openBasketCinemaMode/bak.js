  $.subscribe('bag/animation/done', function() {
        setTimeout(function() {
            $('#minicart-menu').addClass('open').find('#basket-content').hide();
            $('#basket-content').slideToggle();
            setTimeout(function() {
                $('#basket-content').slideToggle(function() {
                    $('#basket-content').css('display', '');
                    $('#minicart-menu').removeClass('open');
                    $('#hof-header .black-bg').fadeOut(100);
                    $('.hof-navs').css('background', 'initial');
                    $('nav.hof-buttons-set:first, nav.hof-buttons-set #login-menu, #searchSite').fadeTo(100, 1);
                });
            }, 4000);

        }, 1200);
    });