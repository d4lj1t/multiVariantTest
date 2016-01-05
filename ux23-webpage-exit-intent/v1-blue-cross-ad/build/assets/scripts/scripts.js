function ouibounce(el, config) {
    var config     = config || {},
        aggressive   = config.aggressive || false,
        sensitivity  = setDefault(config.sensitivity, 20),
        timer        = setDefault(config.timer, 1000),
        delay        = setDefault(config.delay, 0),
        callback     = config.callback || function() {},
        cookieExpire = setDefaultCookieExpire(config.cookieExpire) || '',
        cookieDomain = config.cookieDomain ? ';domain=' + config.cookieDomain : '',
        cookieName   = config.cookieName ? config.cookieName : 'viewedOuibounceModal',
        sitewide     = config.sitewide === true ? ';path=/' : '',
        _delayTimer  = null,
        _html        = document.documentElement;

    function setDefault(_property, _default) {
        return typeof _property === 'undefined' ? _default : _property;
    }

    function setDefaultCookieExpire(days) {
        // transform days to milliseconds
        var ms = days*24*60*60*1000;

        var date = new Date();
        date.setTime(date.getTime() + ms);

        return "; expires=" + date.toUTCString();
    }

    setTimeout(attachOuiBounce, timer);
    function attachOuiBounce() {
        _html.addEventListener('mouseleave', handleMouseleave);
        _html.addEventListener('mouseenter', handleMouseenter);
        _html.addEventListener('keydown', handleKeydown);
    }

    function handleMouseleave(e) {
        if (e.clientY > sensitivity || (checkCookieValue(cookieName, 'true') && !aggressive)) return;

        _delayTimer = setTimeout(_fireAndCallback, delay);
    }

    function handleMouseenter(e) {
        if (_delayTimer) {
            clearTimeout(_delayTimer);
            _delayTimer = null;
        }
    }

    var disableKeydown = false;
    function handleKeydown(e) {
        if (disableKeydown || checkCookieValue(cookieName, 'true') && !aggressive) return;
        else if(!e.metaKey || e.keyCode !== 76) return;

        disableKeydown = true;
        _delayTimer = setTimeout(_fireAndCallback, delay);
    }

    function checkCookieValue(cookieName, value) {
        return parseCookies()[cookieName] === value;
    }

    function parseCookies() {
        // cookies are separated by '; '
        var cookies = document.cookie.split('; ');

        var ret = {};
        for (var i = cookies.length - 1; i >= 0; i--) {
            var el = cookies[i].split('=');
            ret[el[0]] = el[1];
        }
        return ret;
    }

    function _fireAndCallback() {
        fire();
        callback();
    }

    function fire() {
        // You can use ouibounce without passing an element
        // https://github.com/carlsednaoui/ouibounce/issues/30
        if (el) el.style.display = 'block';
        disable();
    }

    function disable(options) {
        var options = options || {};

        // you can pass a specific cookie expiration when using the OuiBounce API
        // ex: _ouiBounce.disable({ cookieExpire: 5 });
        if (typeof options.cookieExpire !== 'undefined') {
            cookieExpire = setDefaultCookieExpire(options.cookieExpire);
        }

        // you can pass use sitewide cookies too
        // ex: _ouiBounce.disable({ cookieExpire: 5, sitewide: true });
        if (options.sitewide === true) {
            sitewide = ';path=/';
        }

        // you can pass a domain string when the cookie should be read subdomain-wise
        // ex: _ouiBounce.disable({ cookieDomain: '.example.com' });
        if (typeof options.cookieDomain !== 'undefined') {
            cookieDomain = ';domain=' + options.cookieDomain;
        }

        if (typeof options.cookieName !== 'undefined') {
            cookieName = options.cookieName;
        }

        document.cookie = cookieName + '=true' + cookieExpire + cookieDomain + sitewide;

        // remove listeners
        _html.removeEventListener('mouseleave', handleMouseleave);
        _html.removeEventListener('mouseenter', handleMouseenter);
        _html.removeEventListener('keydown', handleKeydown);
    }

    return {
        fire: fire,
        disable: disable
    };
}


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

