document.write('<script src="http://' + ('localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>');
document.write('<script src="http://'+"localhost".split(":")[0]+':35729/livereload.js?snipver=1"></script>');
'use strict';
$(window).load(function () {
	var UX_Name = HOFMaxymiser.UX25_Name();
    UX_Name.init();
});

"use strict";$(window).load(function(){var a=HOFMaxymiser.UX25_Name();a.init()});
var HOFMaxymiser = HOFMaxymiser || {}; 
HOFMaxymiser._TestName_VariantName = function () {
    var Settings = {
        testName: '_TestName_VariantName', // Change this
        variant: "",
        isProduction: false          // Mark it as true after the variant is tested
    };


    ////// Test Starts here
    var Model = {};
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
            log('Excluded from "Test Name" Test');
            return false;
        } else {
            return true;      
        }
    };


    Controller.bindEvents = function () {
       if(View.isPageIncluded) {
        // do something
       }
    };


    Controller.loadView = function () {
        log('js-loaded-' + Settings.testName);
        document.body.classList.add(Settings.testName);


    };


    var log = function (textToLog) {
        if (Settings.isProduction == false) {
            console.log(textToLog);
        }
    };


    Controller.loadView();
}();

var HOFMaxymiser=HOFMaxymiser||{};HOFMaxymiser._TestName_VariantName=function(){var a={testName:"_TestName_VariantName",variant:"",isProduction:!1},b={},c={webSellingGroup:document.querySelectorAll("#set-products")?document.querySelectorAll("#set-products").length:0,webSellingOut:document.querySelectorAll(".WSOSetProductContainer")?document.querySelectorAll(".WSOSetProductContainer").length:0,webSellingRange:document.querySelectorAll(".setProductRow")?document.querySelectorAll(".setProductRow").length:0,specialBrandsLogo:document.querySelectorAll(".specialbrandslogocontainer")?document.querySelectorAll(".specialbrandslogocontainer").length:0,setProductsNoImages:document.querySelectorAll("#setProductsNoImages")?document.querySelectorAll("#setProductsNoImages").length:0};c.isPageIncluded=function(){return webSellingGroup||webSellingOut||webSellingRange||specialBrandsLogo||setProductsNoImages?(d('Excluded from "Test Name" Test'),!1):!0},b.bindEvents=function(){c.isPageIncluded},b.loadView=function(){d("js-loaded-"+a.testName),document.body.classList.add(a.testName)};var d=function(b){0==a.isProduction&&console.log(b)};b.loadView()}();