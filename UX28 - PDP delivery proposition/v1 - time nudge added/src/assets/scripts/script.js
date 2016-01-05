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
