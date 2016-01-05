var HOFMaxymiser = HOFMaxymiser || {};
HOFMaxymiser.UX26_v1 = function () {
    var Settings = {
        testName: 'UX26_v1',
        isProduction: false
    };

    var Model = {};
    var Controller = {};
    var View = {
        brandsButton: $('#hof-btn-brands')
    };

    Controller.ShowSecondPage = function () {
        $('#hof-btn-departments').click();
    };

    View.MoveBrandNav = function () {
        setTimeout(function(){
            var level2 = $('.hof-megamenu-side').find('[data-level="2"] .primary');
            var level2Button = $('.hof-megamenu-side').find('[data-level-back="0"]');
            level2Button.click(function (){return false;});
            level2Button.find('.hof-icon-arrow-left').hide();
            level2.append('<li class="primany-list">');
            var lastItem = level2.find('li:last');
            lastItem.append(View.brandsButton);
        }, 1000);
    };


    Controller.loadView = function () {
        log('js-loaded ' + Settings.testName);
        document.body.classList.add(Settings.testName);

        Controller.ShowSecondPage();
        View.MoveBrandNav();
    };


    var log = function (textToLog) {
        if (Settings.isProduction == false) {
            console.log(textToLog);
        }
    };



    $(function () {
        var level2Button = $('.hof-megamenu-side').find('[data-level-back="0"]');
        level2Button.click(function (){return false;});
        Controller.loadView();
    });
}();
