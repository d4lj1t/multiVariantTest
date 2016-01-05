'use strict';



$(window).load(function () {
    var UX25_v1 =  HOFMaxymiser.UX25();

    var date = new Date();
    var howManyDaysToExpireCookie = 7;

    date.setDate(date.getDate() + howManyDaysToExpireCookie);


    UX25_v1.Settings.varient = 'v1';
    UX25_v1.init(date);
});
