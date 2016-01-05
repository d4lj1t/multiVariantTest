var HOFMaxymiser = HOFMaxymiser || {};
HOFMaxymiser.UX27_v1 = function() {
    var Settings = {
        testName: 'UX27-v1',
        isProduction: false
    };


    var Model = {};
    var Controller = {};
    var View = {
        secure: $('#secure'),
        primaryButton: $('.promotionalCode')
    };


    Controller.moveTrustMarks = function() {
        setTimeout(function() {
            View.secure.removeClass('ux14');
        }, 1000);
        View.primaryButton.before(View.secure);
    };


    Controller.loadView = function() {
        log('js-loaded-' + Settings.testName);
        document.body.classList.add(Settings.testName);
        Controller.moveTrustMarks();
    };


    var log = function(textToLog) {
        if (Settings.isProduction == false) {
            console.log(textToLog);
        }
    };

    Controller.loadView();
};


$(function() {
    HOFMaxymiser.UX27_v1();
});
