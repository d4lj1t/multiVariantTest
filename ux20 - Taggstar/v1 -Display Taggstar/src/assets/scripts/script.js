var HOFMaxymiser = HOFMaxymiser || {};
HOFMaxymiser.UX20_v1 = $(function() {
    var Settings = {
        testName: 'UX20-v1', // Change this
        isProduction: false // Mark it as true after the variant is tested
    };


    ////// Test Starts here
    var Modal = {};
    Modal.taggstar = function() {
        var w = window,
            d = document,
            s = 'script',
            t = +new Date;

        var siteKey = 'houseoffrasercouk';
        var e = d.createElement(s),
            a = d.getElementsByTagName(s)[0],
            p = d.location.protocol,
            m = ['on', 'set', 'get'],
            i = m.length,
            n = w.taggstar = {
                _c: {},
                ts: t
            },
            api = function(m, p) {
                n[m] = function(l, o) {
                    p = (n._c[m] || (n._c[m] = {}));
                    (p[l] || (p[l] = [])).push(o)
                }
            };
        while (i--) api(m[i]);
        e.async = true;
        e.src = (p == 'https:' ? p : 'http:') +
            '//realtime.taggstar.com/dynamic/site/' + siteKey + '/taggstar.js?' +
            (t / 6e5 | 0);
        e.className = 'taggJS';
        a.parentNode.insertBefore(e, a);
    };

    var Controller = {};
    var View = {
        webSellingGroup: document.querySelectorAll('#set-products') ? document.querySelectorAll('#set-products').length : 0,
        webSellingOut: document.querySelectorAll('.WSOSetProductContainer') ? document.querySelectorAll('.WSOSetProductContainer').length : 0,
        webSellingRange: document.querySelectorAll('.setProductRow') ? document.querySelectorAll('.setProductRow').length : 0,
        specialBrandsLogo: document.querySelectorAll('.specialbrandslogocontainer') ? document.querySelectorAll('.specialbrandslogocontainer').length : 0,
        setProductsNoImages: document.querySelectorAll('#setProductsNoImages') ? document.querySelectorAll('#setProductsNoImages').length : 0
    };


    View.isPageIncluded = function() {
        //pages to exclude
        if (this.webSellingGroup || this.webSellingOut || this.webSellingRange || this.specialBrandsLogo || this.setProductsNoImages) {
            return false;
        } else {
            return true;
        }
    };


    Controller.bindEvents = function() {
        Modal.taggstar();
    };


    Controller.loadView = function() {
        log('js-loaded ' + Settings.testName);
        $('body').addClass(Settings.testName);
        if (View.isPageIncluded()) {
            this.bindEvents();
            HOFSite.functions.displayHurryOverlay = {};
            log('taggstar loaded'); 
        } else {
            log('test not included');
        }
    };


    var log = function(textToLog) {
        if (Settings.isProduction == false) {
            console.log(textToLog);
        }
    };


    Controller.loadView();
});
