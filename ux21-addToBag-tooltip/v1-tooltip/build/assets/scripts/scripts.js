var HOFMaxymiser = HOFMaxymiser || {};
HOFMaxymiser.ux21_v1 = function() {

    var Settings = {
        testName: 'ux21-v1',
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

        $('#addToBagMainContainer').before($("<div class='js-tooltip-container'><div class='js-tooltip'>Please select size before adding to bag<span class='js-close-icon hof-icon hof-icon-x'>&nbsp;</span></div><div class='js-arrow-bottom'></div></div>").fadeIn('slow'));

        View.hideTooltip();
    }

    View.hideTooltip = function() {
        $('.js-tooltip-container').delay(3000).fadeOut(600, function() {
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
        $(".js-overlay").click(function() {
            mmcore.$Action('AddToBagButton_Disabled', 1, 'clicked');
            View.showTooltip();
        });

        $("body").on('click', '.js-close-icon', function() {
            $('.js-tooltip-container').stop();
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
