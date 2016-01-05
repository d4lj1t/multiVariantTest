/*
(function(w,d,s,t){
    var siteKey='houseoffrasercouk';
    var e=d.createElement(s),a=d.getElementsByTagName(s)[0],p=d.location.protocol,
    m=['on','set','get'],i=m.length,n=w.taggstar={_c:{},ts:t},api=function(m,p){
    n[m]=function(l,o){p=(n._c[m]||(n._c[m]={}));(p[l]||(p[l]=[])).push(o)}};
    while(i--)api(m[i]);e.async=true;e.src=(p=='https:'?p:'http:')+
    '//realtime.taggstar.com/dynamic/site/'+siteKey+'/taggstar.js?'+
    (t/6e5|0);e.className='taggJS';a.parentNode.insertBefore(e,a);
})(window,document,'script',+new Date);*/


var HOFMaxymiser = HOFMaxymiser || {};
HOFMaxymiser.UX20 = function () {
    var Settings = {
        testName: 'UX20', // Change this
        isProduction: false          // Mark it as true after the variant is tested
    };


    ////// Test Starts here
    var Modal = {};
    var Controller = {};
    var View = {
        webSellingGroup :document.querySelectorAll('#set-products') ? document.querySelectorAll('#set-products').length : 0,
        webSellingOut : document.querySelectorAll('.WSOSetProductContainer') ? document.querySelectorAll('.WSOSetProductContainer').length : 0,
        webSellingRange : document.querySelectorAll('.setProductRow') ? document.querySelectorAll('.setProductRow').length : 0,
        specialBrandsLogo : document.querySelectorAll('.specialbrandslogocontainer') ? document.querySelectorAll('.specialbrandslogocontainer').length : 0,
        setProductsNoImages : document.querySelectorAll('#setProductsNoImages') ? document.querySelectorAll('#setProductsNoImages').length : 0
    };


    View.isPageIncluded = function () {
        //pages to exclude
        if(webSellingGroup || webSellingOut || webSellingRange || specialBrandsLogo || setProductsNoImages) {
            console.log('Excluded from "Test Name" Test');
            return false;
        } else {
            return true;
        }
    };


    Controller.bindEvents = function () {
        if(View.isPageIncluded) {
            log('hello');
        }
    };


    Controller.loadView = function () {
        log('js-loaded' + Settings.testName);
        document.body.classList.add(Settings.testName);
        this.bindEvents();


    };


    var log = function (textToLog) {
        if (Settings.isProduction == false) {
            console.log(textToLog);
        }
    };


    Controller.loadView();
}();



