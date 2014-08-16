$(function () { 
	$(".menu_button").click(function(event){
	event.preventDefault();
	$(this).toggleClass('active')
	});
});