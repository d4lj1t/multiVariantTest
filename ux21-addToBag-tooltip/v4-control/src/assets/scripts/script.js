'use strict';

var HOFMaxymiser = HOFMaxymiser || {};
HOFMaxymiser.ux21_v4 = function() {
    var Settings = {
        testName: 'ux21-v4',
        isProduction: true
    };

    var Model = {};

    var View = {};

    View.addToolTip = function() {
        $('#addToBagMainContainer').before("<span class='js-overlay'>&nbsp;</span>");
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
