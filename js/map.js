$(function() {
  // Вызывает карту.
	// Инструкция как заргузить гугл карты на сайт:
	// https://developers.google.com/maps/documentation/javascript/tutorial?hl=ru#HelloWorld
	

	function initialize() {
        var mapOptions = {
          center: new google.maps.LatLng(59.943699,30.325599),
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map_canvas"),
            mapOptions);
      }

    initialize();

});