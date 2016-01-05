$(function() {
  	$("#eightColumns ol li:first-child legend:first-child").hide();
    
    $("#eightColumns").prepend('<div id="accordion">Redeem Gift Cards, Vouchers, Promotional Codes or Reward Vouchers</div>');
    
    $("#eightColumns ol li.section:first-child hr").hide();
    
    $("#accordion").click(function() {
      	$(this).toggleClass("open");
    	$("#eightColumns ol li.section:first-child").slideToggle('fast');
    });
  });