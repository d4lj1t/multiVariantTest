'use strict';

var HOFMaxymiser = HOFMaxymiser || {};
HOFMaxymiser.ux21_v3 = function() {
    var Settings = {
        testName: 'ux21-v3',
        isProduction: true
    };

    var Model = {};

    var View = {};

    View.addToolTip = function() {
        $('#addToBagMainContainer').before("<span class='js-overlay'>&nbsp;</span>");
    }

    View.showTooltip = function() {
        $('#buttonAddToBag').val('Select Option');
    }

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


        $(".size-swatches-list li").click(function() {
            View.removeTooltip();
        });
    };

    Controller.loadView = function() {
        log('js-loaded ' + Settings.testName);

        if ($('#buttonAddToBag').is(":disabled") === true) {
            document.body.classList.add(Settings.testName);
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
