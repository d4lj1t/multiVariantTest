'use strict';
$(window).load(function () {
	var UX25_v3 = HOFMaxymiser.UX25_fullscreen();
	UX25_v3.Settings.varient = 'v3';

    var date = new Date();
    var howManyDaysToExpireCookie = 7;

    date.setDate(date.getDate() + howManyDaysToExpireCookie);

    UX25_v3.init(date);
});
