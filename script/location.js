function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  } else {
    alert("Geolocation is not supported by this browser.");
  }

  function successCallback(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    // You can store raw coordinates like this:
    // document.getElementById("location").value = lat + ", " + lon;

    // Optional: Reverse geocode to get city, country using a public API
    fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
    )
      .then((response) => response.json())
      .then((data) => {
        const address = data.address;
        const displayLocation = `${
          address.city || address.town || address.village || ""
        }, ${address.country}`;
        document.getElementById("location").value = displayLocation;
      })
      .catch(() => {
        document.getElementById("location").value = lat + ", " + lon;
      });
  }

  function errorCallback(error) {
    alert("Unable to retrieve your location. Error: " + error.message);
  }
}
