$(function () { 
	// событие клика
	$(".menu_button").click(function(event){
	//отмена перехода по ссылке при нажатии
	event.preventDefault();
	// поменять состояние
	$(this).toggleClass('active')
	});
});