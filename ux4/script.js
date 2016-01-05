jQuery(document).ready(function(){

    var HOFMaxymiser = HOFMaxymiser || {};

    HOFMaxymiser = (function () {

        'use strict';

        /* Model */
        var Model = function () {return this;};

        /* View */
        var View = function () {

            //caching elements
            this.webSellingGroup = document.querySelectorAll('#set-products') ? document.querySelectorAll('#set-products').length : 0;
            this.webSellingOut = document.querySelectorAll('.WSOSetProductContainer') ? document.querySelectorAll('.WSOSetProductContainer').length : 0;
            this.webSellingRange = document.querySelectorAll('.setProductRow') ? document.querySelectorAll('.setProductRow').length : 0;
            this.specialBrandsLogo = document.querySelectorAll('.specialbrandslogocontainer') ? document.querySelectorAll('.specialbrandslogocontainer').length : 0;
            this.setProductsNoImages = document.querySelectorAll('#setProductsNoImages') ? document.querySelectorAll('#setProductsNoImages').length : 0;
            this.PDPIconLIArray = document.querySelectorAll('#deliveryChannelsUL li') || [];
            this.PDPClassNames = ['iscDelivery', 'collectPlusDelivery', 'ukDelivery', 'internationalDelivery'];

            //templates
            this.iscDeliveryDescription = 'Order before 10pm for collection in-store from 12 noon the next day or on a day of your choice';
            this.collectPlusDeliveryDescription = 'Choose from over 4,500 Collect+ locations to collect your order from. Order before 7pm for collection the next day (Mon-Sat)';
            this.ukDeliveryDescription = 'Delivered in 3 - 5 working days, 8am - 8pm';
            this.internationalDeliveryDescription = 'Standard delivery (8-10 days) or Express delivery (3-8 days)';

            this.iconTemplate = "<div class='deliveryIcon <%=iconName%>'></div><div class='shippingTitle'><%=title%></div><a href='#' class='more-info'>More Info</a><a href='#' class='less-info'>Less Info</a><div class='shipping-description'><%=description%></div>";
        };

        View.prototype.render = function () {

            if(this.webSellingGroup || this.webSellingOut || this.webSellingRange || this.specialBrandsLogo || this.setProductsNoImages) {
                console.log('Excluded from UX4 Test');
            } else {
                this.addIconstoPDPLinks();
            }
        };

        View.prototype.addIconstoPDPLinks = function () {
            var i = 0,
                iscDeliveryTemplate = this.iconTemplate,
                collectPlusDeliveryTemplate = this.iconTemplate,
                ukDeliveryTemplate = this.iconTemplate,
                internationalDeliveryTemplate = this.iconTemplate;
            $('#deliveryChannelsUL').addClass('ux4');
            for(i; i < this.PDPIconLIArray.length; i++){
                var shippingTitleOriginal = $(this.PDPIconLIArray[i]).find('.shippingTitle').text().trim();
                var shippingTitle = $(this.PDPIconLIArray[i]).find('.shippingTitle').text().trim().replace(/ /g,'');
                if (shippingTitle === 'FREECollectinstore' || shippingTitle === 'Collectinstore') {
                    iscDeliveryTemplate = iscDeliveryTemplate.replace('<%=iconName%>',this.PDPClassNames[0]);
                    iscDeliveryTemplate = iscDeliveryTemplate.replace('<%=title%>',shippingTitleOriginal);
                    iscDeliveryTemplate = iscDeliveryTemplate.replace('<%=description%>',this.iscDeliveryDescription);
                    $(this.PDPIconLIArray[i]).html(iscDeliveryTemplate);
                }
                if (shippingTitle === 'Collect+delivery') {
                    collectPlusDeliveryTemplate = collectPlusDeliveryTemplate.replace('<%=iconName%>',this.PDPClassNames[1]);
                    collectPlusDeliveryTemplate = collectPlusDeliveryTemplate.replace('<%=title%>',shippingTitleOriginal);
                    collectPlusDeliveryTemplate = collectPlusDeliveryTemplate.replace('<%=description%>',this.collectPlusDeliveryDescription);
                    $(this.PDPIconLIArray[i]).html(collectPlusDeliveryTemplate);
                }
                if (shippingTitle === 'FREEUK&Irelanddelivery' || shippingTitle === 'UK&Irelanddelivery') {
                    ukDeliveryTemplate = ukDeliveryTemplate.replace('<%=iconName%>',this.PDPClassNames[2]);
                    ukDeliveryTemplate = ukDeliveryTemplate.replace('<%=title%>',shippingTitleOriginal);
                    ukDeliveryTemplate = ukDeliveryTemplate.replace('<%=description%>',this.ukDeliveryDescription);
                    $(this.PDPIconLIArray[i]).html(ukDeliveryTemplate);
                }
                if (shippingTitle === 'Internationaldelivery') {
                    internationalDeliveryTemplate = internationalDeliveryTemplate.replace('<%=iconName%>',this.PDPClassNames[3]);
                    internationalDeliveryTemplate = internationalDeliveryTemplate.replace('<%=title%>',shippingTitleOriginal);
                    internationalDeliveryTemplate = internationalDeliveryTemplate.replace('<%=description%>',this.internationalDeliveryDescription);
                    $(this.PDPIconLIArray[i]).html(internationalDeliveryTemplate);
                }
            }
            this.moreInfoEventHandlers();
            $('#productPriceContainer .price, #productPriceContainer .priceNow').css('font-size','21px');
        };

        View.prototype.moreInfoEventHandlers = function () {
            document.querySelector('#deliveryChannelsUL').addEventListener('click', function(e) {
                e.preventDefault();
                if(e.target.className === 'more-info') {
                    $(e.currentTarget).find('.shipping-description').hide();
                    $(e.currentTarget).find('.less-info').hide();
                    $(e.currentTarget).find('.more-info').show();
                    $(e.target).toggle();
                    $(e.target).next().toggle();
                    $(e.target).next().next().toggle();
                }
                if(e.target.className === 'less-info') {
                    $(e.target).toggle();
                    $(e.target).prev().toggle();
                    $(e.target).next().toggle();
                }
            });
        };

        /* Controller */
        var Controller = function () {return this;};

        Controller.prototype.loadView = function () {
            var testModel = new Model({});
            var testView = new View();
            testView.render();
        };

        return {
            Model : Model,
            View : View,
            Controller : Controller
        };

    })();

    var bootStrapper = function () {
        'use strict';
        var testController = new HOFMaxymiser.Controller();
        testController.loadView();
    };

    bootStrapper();

});