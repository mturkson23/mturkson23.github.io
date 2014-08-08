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
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;
		var mapOptions = {
			zoom: 16,
			center: new google.maps.LatLng(latitude, longitude)
		};
		map = new google.maps.Map(document.getElementById('map'), mapOptions);
	}
	//in case there is an error
	function error()
	{
		output.innerHTML = "Unable to retrieve your location";
	}
	navigator.geolocation.getCurrentPosition(success, error);
}
google.maps.event.addDomListener(window, 'load', geoLocate);
