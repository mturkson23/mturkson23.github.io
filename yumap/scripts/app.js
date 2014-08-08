$(document).ready(function() {
// css loading animation !!
	$('.green').addClass('sd0');
	$('.red').addClass('sd05');
	$('.blue').addClass('sd1');
	$('.yellow').addClass('sd15');

var map; 
function geoLocate() {
	var output = document.getElementById("latlng");
	// check if the device has access to the gps functionality. Alert if not
	if(!navigator.geolocation)
	{
		output.innerHTML = "<p>Sorry. Geolocation does not work in your browser :(</p>";
		return;
	}
	// if everything works out well. this would be called
	function success(position)
	{
		// get the location information from the device
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;
		
		// store it in a var so we can use it later
		var locs = new google.maps.LatLng(latitude, longitude);
		var mapOptions = {
			zoom: 16,
			center: locs
		};
		map = new google.maps.Map(document.getElementById('map'), mapOptions);
		
		var marker = new google.maps.Marker({
			position: locs,
			map: map,
			title: "I'm Here!"
		});
	}
	//in case there is an error
	function error()
	{
		output.innerHTML = "Unable to retrieve your location";
	}
	navigator.geolocation.getCurrentPosition(success, error);
}
google.maps.event.addDomListener(window, 'load', geoLocate);

});
