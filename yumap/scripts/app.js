function geolocate() {
  var output = document.getElementById("latlng");
  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }
  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;

    output.innerHTML = latitude + ', ' + longitude;
    var img = new Image();
    img.src = "http://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=18&size=300x300&markers=color:blue%7Clabel:S%7C"+ latitude +", "+ longitude +"&sensor=true";
    output.appendChild(img);
  };
  function error() {
    output.innerHTML = "Unable to retrieve your location";
  };
  output.innerHTML = "<p>Locating...</p>";
  navigator.geolocation.getCurrentPosition(success, error);
}
