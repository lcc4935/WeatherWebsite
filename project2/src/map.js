import * as weather from "./weather.js";

let map;

let activePin;

let geojson = {
    type: 'FeatureCollection',
    features: []
};


function initMap() {
    mapboxgl.accessToken = 'pk.eyJ1IjoibGNjNDkzNSIsImEiOiJja25nNXIwNzIwOGd4MnZzMzJiYXlrcDVnIn0.yaY-h_4MJDnlohhD6CIEoQ';

    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v10',
        center: [0, 0],
        zoom: 1
    });
    map.setRenderWorldCopies(status === 'true');

    map.on('click', function (e) {
        let el = document.createElement('div');
        if (activePin != null) {
            activePin.remove();
        }

        let coordinates = e.lngLat;
        let point = [coordinates.lng, coordinates.lat];

        let main = weather.loadWeather(coordinates.lat, coordinates.lng);

        el.className = main;

        activePin =
            new mapboxgl.Marker(el)
                .setLngLat(point)
                .addTo(map);
    });
}

function addMarker(coordinates, title, description, className) {
    let el = document.createElement('div');
    el.className = className;

    new mapboxgl.Marker(el)
        .setLngLat(coordinates)
        .setPopup(new mapboxgl.Popup({ offset: 25 })
            .setHTML('<h3>' + title + '</h3><p>' + description + '</p>'))
        .addTo(map);
}

function addMarkersToMap() {
    // add markers to map
    for (let feature of geojson.features) {
        addMarker(feature.geometry.coordinates, feature.properties.title, feature.properties.description, 'marker')
    };
}

function flyTo(center = [0, 0]) {
    //https://docs.mapbox.com/mapbox-gl-js/api/#map#flyto/
    map.flyTo({ center: center });
}
function setZoomLevel(value = 0) {
    //https://docs.mapbox.com/help/glossary/zoom-level/
    map.setZoom(value);
}

export { initMap, addMarkersToMap, addMarker, flyTo, setZoomLevel };