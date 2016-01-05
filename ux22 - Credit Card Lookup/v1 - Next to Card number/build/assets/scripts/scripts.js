'use strict';

var HOFMaxymiser = HOFMaxymiser || {};

HOFMaxymiser = (function($) {

    var Settings = {
        testName: 'ux22',
        isProduction: true
    };

    var Model = function() {
        return this;
    };

    var View = function() {
        this.onload = true;
        this.logos = $('.allLogos').html();
        this.currentLogo = {};
    };

    View.prototype.isLogoSelected = function() {
        var hasAnyIconChanged = false;

        $('.allLogos img').each(function(index, element) {
            if ($(element).hasClass('desaturated')) {
                hasAnyIconChanged = true;
                return false;
            }
        });

        return hasAnyIconChanged;
    };

    View.prototype.getSelectedLogo = function() {
        var selected = {};
        $('.allLogos img').each(function(index, element) {
            if (!$(element).hasClass('desaturated')) {
                selected = element;
                return false;
            }
        });
        return selected;
    };

    View.prototype.bindLogoToInput = function() {
        $('#cardNumber').after(this.currentLogo);
        this.currentLogo.hide().addClass(Settings.testName + '-card-icon').fadeIn();
    };


    View.prototype.checkLogos = function() {
        var view = this;
        setTimeout(function() {
            var currentLogos = $('.allLogos').html();
            if (currentLogos != view.logos) {
                view.logos = currentLogos;

                if (view.isLogoSelected()) {
                    view.currentLogo = $(view.getSelectedLogo()).clone();
                    view.bindLogoToInput();
                } else {
                    view.currentLogo.remove();
                }

            }
        }, 200);
    };


    var Controller = function() {
        return this;
    };

    Controller.prototype.bindEvents = function(view) {
        $('#cardNumber').on('input paste', function() {
            view.checkLogos();
        });

    }


    Controller.prototype.loadView = function() {
        log('js-loaded' + Settings.testName);
        if ($('#cardNumber').length) {
            document.body.classList.add(Settings.testName);

            var testModel = new Model({});
            var testView = new View();

            this.bindEvents(testView);
        }
    };

    var log = function(textToLog) {
        if (Settings.isProduction == false) {
            console.log(textToLog);
        }
    };

    return {
        Model: Model,
        View: View,
        Controller: Controller
    };
})(mmcore.$);


var bootStrapper = function() {
    var testController = new HOFMaxymiser.Controller();
    testController.loadView();
};
$(document).ready(function() {

    bootStrapper();
});
