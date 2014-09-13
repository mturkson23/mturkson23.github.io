$(document).ready(function () {
	// css loading animation !!
	$('.green').addClass('sd0');
	$('.red').addClass('sd05');
	$('.blue').addClass('sd1');
	$('.yellow').addClass('sd15');

	function geoLocate() {
		
		// define variables
		var map;
		var markers = [];
		
		var output = document.getElementById("latlng");
		// check for gps functionality 
		// alert if not
		if (!navigator.geolocation) {
			output.innerHTML = "<p>Sorry. Geolocation does not work in your browser :(</p>";
			return;
		}
		// if everything works out well. this would be called
		function success(position) {
			// get the location information from the device
			var latitude = position.coords.latitude;
			var longitude = position.coords.longitude;

			// store it in a var so we can use it later
			
			var locs = new google.maps.LatLngBounds(
      			new google.maps.LatLng(5.106629, -3.120117),
      			new google.maps.LatLng(11.096838,-0.010986));
  			map.fitBounds(locs);

			
			//set options to go with map
			var mapOptions = {
				zoom: 16,
				center: locs,
				zoomControl: true,
				zoomControlOptions: {
					style: google.maps.ZoomControlStyle.SMALL
				},
				mapTypeControl: true,
				mapTypeControlOptions: {
					style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
				}
			};

			map = new google.maps.Map(document.getElementById('map'), mapOptions);
			google.maps.event.addListenerOnce(map, 'tilesloaded', function () {
				$('#loader').hide();
			});
			

			// Create the search box and link it to the UI element.
			var input = /** @type {HTMLInputElement} */ (
				document.getElementById('pac-input'));
			map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);



			var searchBox = new google.maps.places.SearchBox(
				/** @type {HTMLInputElement} */
				(input));

			// [START region_getplaces]
			// Listen for the event fired when the user selects an item from the
			// pick list. Retrieve the matching places for that item.
			google.maps.event.addListener(searchBox, 'places_changed', function () {
				var places = searchBox.getPlaces();

				if (places.length == 0) {
					return;
				}
				for (var i = 0, marker; marker = markers[i]; i++) {
					marker.setMap(null);
				}

				// For each place, get the icon, place name, and location.
				markers = [];
				var bounds = new google.maps.LatLngBounds();
				for (var i = 0, place; place = places[i]; i++) {
					var image = {
						url: place.icon,
						size: new google.maps.Size(71, 71),
						origin: new google.maps.Point(0, 0),
						anchor: new google.maps.Point(17, 34),
						scaledSize: new google.maps.Size(25, 25)
					};

					// Create a marker for each place.
					var marker = new google.maps.Marker({
						map: map,
						icon: image,
						title: place.name,
						position: place.geometry.location
					});

					markers.push(marker);

					bounds.extend(place.geometry.location);
				}

				map.fitBounds(bounds);
			});
			output.innerHTML = "<p>Longitude: " + longitude + ". Latitude is " + latitude + "</p>";
		}
		//in case there is an error
		function error() {
			output.innerHTML = "Unable to retrieve your location";
		}
		navigator.geolocation.getCurrentPosition(success, error);
	}
	google.maps.event.addDomListener(window, 'load', geoLocate);
});