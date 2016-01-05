var HOFMaxymiser = HOFMaxymiser || {};
HOFMaxymiser._TestName_VariantName = function() {
    var Settings = {
        testName: '_TestName_VariantName', // Change this
        variant: "",
        isProduction: false // Mark it as true after the variant is tested
    };


    ////// Test Starts here
    var Model = {};
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
        if (webSellingGroup || webSellingOut || webSellingRange || specialBrandsLogo || setProductsNoImages) {
            log('Excluded from "Test Name" Test');
            return false;
        } else {
            return true;
        }
    };


    Controller.bindEvents = function() {
        if (View.isPageIncluded) {
            // do something
        }
    };


    Controller.loadView = function() {
        log('js-loaded-' + Settings.testName);
        document.body.classList.add(Settings.testName);


    };


    var log = function(textToLog) {
        if (Settings.isProduction == false) {
            console.log(textToLog);
        }
    };


    return {
        Settings: Settings,
        View: {
            isPageIncluded: View.isPageIncluded,
        },
        Model: {
        },
        init: Controller.loadView
    }
};
