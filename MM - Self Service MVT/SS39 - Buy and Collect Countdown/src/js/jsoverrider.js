mmcore.$(function() {

    if($("#productSlidesWrapper").length > 0) {

    }

    else {
        var newDiv = "<div id='collectCountdown'><div class='deliveryIcon iscDelivery'></div><div class='shippingTitle'>FREE Buy &amp; Collect</div><div id='clock'></div></div><div style='clear: both;'></div>";

        $(newDiv).insertBefore("#deliveryChannelsUL");

        //ARRAY OF SCRIPTS THAT ARE NEEDED, THIS METHOD USED SO THAT SCRIPTS LOAD IN ORDER
        var scripts = ['//houseoffraser.co.uk/on/demandware.static/Sites-Site/Sites-hof-Library/default/2015/CustomPages/jquery.countdown.min.js','//houseoffraser.co.uk/on/demandware.static/Sites-Site/Sites-hof-Library/default/2015/CustomPages/midnightCountdown.js'],
            index   = 0;


        function load_script() {


            if (index < scripts.length) {

                // GET SCRIPTS CALLBACK
                $.getScript(scripts[index], function () {

                    // LOAD THE SCRIPTS ONE AT A TIME
                    index++;
                    load_script();
                });
            }
        }

        load_script();


    }

});