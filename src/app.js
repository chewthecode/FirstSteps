var map = L.map('map').setView([51, -114], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var originMarker;
var destinationMarker;
var control;

var originIcon = L.icon({
    iconUrl: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

var destinationIcon = L.icon({
    iconUrl: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

map.on('click', function(e) {
    if (!originMarker) {
        originMarker = L.marker(e.latlng, { draggable: true, icon: originIcon }).addTo(map).bindPopup("Origin").openPopup();
    } else if (!destinationMarker) {
        destinationMarker = L.marker(e.latlng, { draggable: true, icon: destinationIcon }).addTo(map).bindPopup("Destination").openPopup();
    }
});

document.getElementById('routeButton').addEventListener('click', function() {
    if (originMarker && destinationMarker) {
        if (control) {
            map.removeControl(control);
        }

        control = L.Routing.control({
            waypoints: [
                originMarker.getLatLng(),
                destinationMarker.getLatLng()
            ],
            createMarker: function(i, waypoint, n) {
                var icon = i === 0 ? originIcon : destinationIcon;
                return L.marker(waypoint.latLng, { icon: icon, draggable: true });
            },
            routeWhileDragging: true
        }).addTo(map);
    } else {
        alert('Please place both origin and destination points.');
    }
});

document.getElementById('restartButton').addEventListener('click', function() {
    if (originMarker) {
        map.removeLayer(originMarker);
        originMarker = null;
    }
    if (destinationMarker) {
        map.removeLayer(destinationMarker);
        destinationMarker = null;
    }
    if (control) {
        map.removeControl(control);
        control = null;
    }
});
