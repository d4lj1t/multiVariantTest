WebFontConfig = {
    google: { families: [ 'Open+Sans:300,600:latin' ] }
};
(function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
        '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
})();

$(function () {

    $('body').append('<div id="timer"><div class="inner"><span class="section1">Flash Sale Ends in: <span id="mobclock"></span></span><div class="timerClose"></div></div><div style="clear: both;"></div></div>');

    //ARRAY OF SCRIPTS THAT ARE NEEDED, THIS METHOD USED SO THAT SCRIPTS LOAD IN ORDER
    var scripts = ['//houseoffraser.co.uk/on/demandware.static/Sites-Site/Sites-hof-Library/default/2015/CustomPages/jquery.countdown.min.js','//houseoffraser.co.uk/on/demandware.static/Sites-Site/Sites-hof-Library/default/2015/CustomPages/mobileCountdown.js'],
        index   = 0;


    function load_script() {


        if (index < scripts.length) {

            // GET SCRIPTS CALLBACK
            $.getScript(scripts[index], function () {

                // LOAD THE SCRIPTS ONE AT A TIME
                console.log('Loaded: ' + scripts[index]);
                index++;
                load_script();
            });
        }
    }

    load_script();


    $(".timerClose").click(function() {
        $("#timer").hide();
    });

    $(window).scroll(function() {
        if($("#sticky-product-summary").hasClass("summary-shown")){
            $("#timer").css({"bottom": "106px"});
        }
        else {
            $("#timer").css({"bottom": "0"});
        }
    });

});