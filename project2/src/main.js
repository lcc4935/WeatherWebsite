import * as map from "./map.js";

let countrySelect = localStorage['countrySelect'] || "nA";

function init() {

    map.initMap();
    //map.loadMarkers();
    map.addMarkersToMap();

    setupUI();

}

function setupUI() {
    // it's easy to get [longitude,latitude] coordinates with this tool: http://geojson.io/

    const nA= [-102.3046875, 47.517200697839414];
    const sA= [-60.8203125, -15.28418511407642];
    const europe= [14.0625, 49.83798245308484];
    const asia= [93.515625, 51.39920565355378];
    const africa= [17.2265625, 7.710991655433217];
    const antartica= [5.2734375, -74.59010800882324];
    const australia= [135, -25.16517336866393];

    document.getElementById("country").onclick = function () {
        let val = document.getElementById("country").value;
        localStorage['countrySelect'] = val;
        countrySelect = val;
    }
    document.getElementById("zoom").onclick = function () {
        map.setZoomLevel(3);
        if (countrySelect == "nA") {
            map.flyTo(nA);
        } else if (countrySelect == "sA") {
            map.flyTo(sA);
        } else if (countrySelect == "africa") {
            map.flyTo(africa);
        } else if (countrySelect == "europe") {
            map.flyTo(europe);
        } else if (countrySelect == "asia") {
            map.flyTo(asia);
        } else if (countrySelect == "australia") {
            map.flyTo(australia);
        } else if (countrySelect == "antartica") {
            map.flyTo(antartica);
        }
    }

    Array.from(document.querySelector("#country").options).forEach(function (option_element) {
        if (option_element.value == countrySelect) {
            option_element.selected = true;
        }
    });

    document.getElementById("reset").onclick = function () {
        map.flyTo([0, 0]);
        map.setZoomLevel(1);
        Array.from(document.querySelector("#country").options)[0].selected = true;
    }

}

export { init };