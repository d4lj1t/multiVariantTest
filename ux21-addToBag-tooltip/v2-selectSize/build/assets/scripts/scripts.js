'use strict';
var HOFMaxymiser = HOFMaxymiser || {};
HOFMaxymiser.ux21_v2 = function() {

    var Settings = {
        testName: 'ux21-v2',
        isProduction: true
    };

    var Model = {};

    var View = {};

    View.addToolTip = function() {
        $('#addToBagMainContainer').before("<span class='js-overlay'>&nbsp;</span>");
    }

    View.showTooltip = function() {
        var sizeListPosition = $('.size-swatches-list').offset().top - 10;
        if ($(document).scrollTop() > sizeListPosition) {
            $('html, body').animate({
                scrollTop: sizeListPosition
            }, 'fast');
        }

        $('body').append($("<div class='js-tooltip-container'><div class='js-tooltip'>Please select size before adding to bag</div><div class='js-arrow-right'></div></div>").show());

        var topPos = $('.size-swatches-list').offset().top - 25;
        var leftPos = $('.size-swatches-list').offset().left - 260;

        $('.js-tooltip-container').css('top', topPos);
        $('.js-tooltip-container').css('left', leftPos);
    }

    View.hideTooltip = function() {
        $('.js-tooltip-container').show(function() {
            $(this).remove();
        });
    };

    View.removeTooltip = function() {
        if ($('.size-swatches-list li').hasClass('selected')) {
            $('#buttonAddToBag').val('Add to Bag');
            $('.js-overlay').remove();
        }
    };


    var Controller = {};

    Controller.bindTooltip = function() {
        $(".js-overlay").mouseenter(function() {
            View.showTooltip();
        });

        $(".js-overlay").mouseleave(function() {
            View.hideTooltip();
        });

        $("body").on('click', '.js-close-icon', function() {
            View.hideTooltip();
        });

        $(".size-swatches-list li").click(function() {
            View.removeTooltip();
        });
    };


    Controller.loadView = function() {
        log('js-loaded ' + Settings.testName);
        document.body.classList.add(Settings.testName);

        if ($('#buttonAddToBag').is(":disabled") === true) {
            View.addToolTip();
            Controller.bindTooltip();
        }
    };

    var log = function(textToLog) {
        if (Settings.isProduction == false) {
            console.log(textToLog);
        }
    };
    $(window).load(function() {
        Controller.loadView();
    });
}();
