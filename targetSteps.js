var pages = {
    MY_BAG: 0,
    DELIVERY: 1,
    PAYMENT: 2,
    SUMMARY: 3,
    COMPLETE: 4
}

function getPage(value) {
    for (var k in pages) {
        if (pages.hasOwnProperty(k)) {
            if (pages[k] == value) {
                return k;
            }
        }
    }
    return undefined;
}

var findPage = function() {
    var nav = $('#progress');
    var current = nav.find('.current');
    var positionOfSelected = current.index();
    return getPage(positionOfSelected);
}

var isLoggedIn = function() {
    var header = $('#hof-header');
    if (header.find('.avatar-red').length > 0)
        return true;
    else
        return false;
}

findPage();

isLoggedIn();
