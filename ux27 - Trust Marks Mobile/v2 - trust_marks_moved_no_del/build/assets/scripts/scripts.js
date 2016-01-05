var HOFMaxymiser = HOFMaxymiser || {};
HOFMaxymiser.UX27_v2 = function() {
    var Settings = {
        testName: 'UX27-v2',
        isProduction: false
    };


    var Model = {};
    var Controller = {};
    var View = {
        secure: $('#secure'),
        primaryButton: $('.promotionalCode'),
        deliveryBox: $("b:contains('DELIVERY OPTIONS SUMMARY')").parent().parent()
    };


    Controller.moveTrustMarks = function() {
        setTimeout(function() {
            View.secure.removeClass('ux14');
        }, 1000);
        View.primaryButton.before(View.secure);
    };

    Controller.hideBox = function(elementToHide) {
        elementToHide.css('display', 'none');
    }

    Controller.loadView = function() {
        log('js-loaded-' + Settings.testName);
        document.body.classList.add(Settings.testName);
        Controller.moveTrustMarks();
        Controller.hideBox(View.deliveryBox);
    };


    var log = function(textToLog) {
        if (Settings.isProduction == false) {
            console.log(textToLog);
        }
    };

    Controller.loadView();
};


$(function() {
    HOFMaxymiser.UX27_v2();
});
