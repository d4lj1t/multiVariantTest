'use strict';

var HOFMaxymiser = HOFMaxymiser || {};

HOFMaxymiser.UX23_v1 = function () {
    var Settings = {
        testName: 'ux23-v1', // Change this
        isProduction: true          // Mark it as true after the variant is tested
    };


    ////// Test Starts here
    var Model = {};

    var View = {};

    View.injectHTML = function () {
        var strVar = "";
        strVar += "<link rel=\"stylesheet\" type=\"text\/css\" href=\"\/webpage-exit-intent\/build\/assets\/styles\/styles.css\">";
        strVar += "<!-- Ouibounce Modal -->";
        strVar += "<div id=\"ouibounce-modal\">";
        strVar += "    <div class=\"underlay\"><\/div>";
        strVar += "    <div class=\"modal\">";
        strVar += "";
        strVar += "";
        strVar += "";
        strVar += "        <div class=\"modal-footer\">";
        strVar += "            <div class=\"shop-mens\">";
        strVar += "                <a href=\"#\">Shop All Men's Sale<\/a>";
        strVar += "            <\/div>";
        strVar += "            <p>no thanks<\/p>";
        strVar += "        <\/div>";
        strVar += "    <\/div>";
        strVar += "<\/div>";
        strVar += "";
        strVar += "";
        strVar += "";


        $('body').append(strVar);
    };

    var Controller = {};

    Controller.bindEvents = function () {
        $('body').on('click', function () {
            $('#ouibounce-modal').hide();
        });
    };


    Controller.loadView = function () {
        log('js-loaded' + Settings.testName);
        document.body.classList.add(Settings.testName);

        View.injectHTML();

        var _ouibounce = ouibounce(document.getElementById('ouibounce-modal'), {
            aggressive: false,
            cookieExpire: 14,
            sitewide: true
        });

    };


    var log = function (textToLog) {
        if (Settings.isProduction == false) {
            console.log(textToLog);
        }
    };

    $(function() {
        Controller.loadView();
        Controller.bindEvents();
    });
}();

