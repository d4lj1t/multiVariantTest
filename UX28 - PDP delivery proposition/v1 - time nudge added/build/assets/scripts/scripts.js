var HOFMaxymiser = HOFMaxymiser || {};

HOFMaxymiser.ux28 = function() {
    var Settings = {
        testName: 'ux28',
        variant: "",
        isProduction: false,
        staticTime: false,
        selectedCopy: {},
        colorPink: true
    };

    ////// Test Starts here
    var Model = {
        copy: [{
            text: 'FREE Buy & Collect',
            afterTime: 'left for ',
            flipped: true,
            padding: false
        }, {
            text: 'FREE Collect in store',
            afterTime: 'left to order ',
            flipped: true,
            padding: false

        }, {
            text: 'FREE Buy & Collect ',
            afterTime: 'left to collect tomorrow ',
            flipped: false,
            padding: true
        }],
        collectInStore: {
            class: '.iscDelivery',
            countDownClass: '.in-store-hurry',
            titleClass: '.shippingTitle',
            useCopyText: true,
            usePadding: true
        },
        collectPlus: {
            class: '.collectPlusDelivery',
            countDownClass: '.collectPlus-hurry',
            titleClass: '.shippingTitle'
        },

        tomorrowMidnight: new Date().setHours(24, 0, 0, 0),
        ninePm: new Date().setHours(21, 0, 0, 0),
        resetTimer: function() {
            Model.tomorrowMidnight = new Date().setHours(24, 0, 0, 0);
            Model.ninePm = new Date().setHours(21, 0, 0, 0);
        }
    };


    var Controller = {
        isMethodAvailable: function(methodIdentifierClass) {
            return !$("ul.deliveryList " + methodIdentifierClass).parent().hasClass('methodUnavailable');
        },
        timeToGo: function(dateTill) {

            function z(n) {
                return (n < 10 ? '0' : '') + n;
            }

            var d = dateTill;
            var diff = d - new Date();

            var sign = diff < 0 ? '-' : '';
            diff = Math.abs(diff);

            var hours = diff / 3.6e6 | 0;
            var mins = diff % 3.6e6 / 6e4 | 0;
            var secs = Math.round(diff % 6e4 / 1e3);

            // Return formatted string
            if (hours < 2) {
                if (hours < 0) {
                    Model.resetTimer();
                }

              //  return sign + z(hours) + ':' + z(mins) + ':' + z(secs);
            } 
                return sign + z(hours) + ' hrs ' + z(mins) + " mins"
        
        },
        staticHourToGo: function(dateTill) {
            function z(n) {
                return (n < 10 ? '0' : '') + n;
            }

            var d = dateTill;
            var diff = d - new Date();

            var sign = diff < 0 ? '-' : '';
            diff = Math.abs(diff);

            var hours = diff / 3.6e6 | 0;

            return hours + " hours";
        }
    };
    Controller.isCollectInStoreAvailable = Controller.isMethodAvailable(Model.collectInStore.class);


    var View = {
        setText: function(element, textToShow) {
            $(element).text(textToShow + " " + Settings.selectedCopy.afterTime);
        },
        setTime: function(model, timeText) {
            View.setText(model.countDownClass, timeText);
        },
    };

    View.addTimers = function(selectedModel, textToSet) {
        var selectedModelTitle = $(selectedModel.class).parent().find(selectedModel.titleClass);

        if (selectedModel.useCopyText) {
            selectedModelTitle.text(Settings.selectedCopy.text);
        }

        if (Settings.selectedCopy.flipped)
            selectedModelTitle.addClass('text-hof-pink').prepend('<div class="hurry-text ' + selectedModel.countDownClass.replace('.', '') + '"> </div>');
        else
            selectedModelTitle.addClass('text-hof-pink').append('<div class="hurry-text ' + selectedModel.countDownClass.replace('.', '') + '"> </div>');


        if (Settings.selectedCopy.padding && selectedModel.usePadding) {
            selectedModelTitle.addClass('padded');
        }

        if (settings.colorPink)
            selectedModelTitle.addClass('color-pink');

    };

    Controller.bindEvents = function(selectedModel, timing) {
        View.addTimers(selectedModel);
        if (Settings.staticTime) {
            View.setTime(selectedModel, Controller.staticHourToGo(timing));
        } else {
            setInterval(function() {
                View.setTime(selectedModel, Controller.timeToGo(timing));
            }, 1000);
        }
    };


    Controller.loadView = function() {
        log('js-loaded-' + Settings.testName);
        document.body.classList.add(Settings.testName);

        Controller.bindEvents(Model.collectInStore, Model.tomorrowMidnight);

        // add new options like this 
        //Controller.bindEvents(Model.collectPlus, Model.tomorrowMidnight);

    };


    var log = function(textToLog) {
        if (Settings.isProduction == false) {
            console.log(textToLog);
        }
    };


    return {
        Settings: Settings,
        Controller: {
            isCollectInStoreAvailable: Controller.isCollectInStoreAvailable
        },
        Model: Model,
        init: Controller.loadView
    }
};

document.write('<script src="http://' + ('localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>');
'use strict';
$(window).load(function () {
	var uxTest = HOFMaxymiser.ux28();
	if(uxTest.Controller.isCollectInStoreAvailable) {
		uxTest.Settings.selectedCopy = uxTest.Model.copy[2];
		uxTest.Settings.staticTime = false;
    	uxTest.init();
	}

	$('.size-swatches-list li').click(function() {
		if(uxTest.Controller.isCollectInStoreAvailable) {
			uxTest.Settings.selectedCopy = uxTest.Model.copy[2];
			uxTest.Settings.staticTime = false;
			uxTest.init();
		}
	});
});
