var map_origin = new L.LatLng(52.2, 4.7);

var data = [[52.2, 4.7]];

var map = L.map('map');

var circles;

// var svg = d3.select(map.getPanes().overlayPane).append("svg").attr("class", "leaflet-zoom-hide");
//     // g = svg.append("g").attr("class", "leaflet-zoom-hide");

map.setView(map_origin, 10);
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors', maxZoom: 18}).addTo(map);

//
// function reset_layer() {
//     console.log("called!")
//     var pos = map.latLngToLayerPoint(map_origin);
//     L.DomUtil.setPosition(svg, pos);
// }
//
// map.on('viewreset', reset_layer);


var MyCustomLayer = L.Class.extend({

    initialize: function (latlng) {
        // save position of the layer or any options from the constructor
        this._latlng = latlng;
    },

    onAdd: function (map) {
        this._map = map;

        // create a DOM element and put it into one of the map panes
        this._el = L.DomUtil.create('div', 'my-custom-layer leaflet-zoom-hide');
        map.getPanes().overlayPane.appendChild(this._el);
        circles = d3.select(this._el).append("svg").selectAll("circle").data(data)

        circles.enter()
            .append("circle")
                .attr("r", 10)
                .attr("cx", map.latLngToLayerPoint(map_origin).x)
                .attr("cy", map.latLngToLayerPoint(map_origin).y);

        // add a viewreset event listener for updating layer's position, do the latter
        map.on('viewreset', this._reset, this);
        this._reset();
    },

    onRemove: function (map) {
        // remove layer's DOM elements and listeners
        map.getPanes().overlayPane.removeChild(this._el);
        map.off('viewreset', this._reset, this);
    },

    _reset: function () {
        // update layer's position
        var pos = this._map.latLngToLayerPoint(this._latlng);
        // var pos = this._map.containerPointToLayerPoint([0, 0]);
        L.DomUtil.setPosition(this._el, pos);
        circles
            .attr("cx", map.latLngToLayerPoint(map_origin).x)
            .attr("cy", map.latLngToLayerPoint(map_origin).y);
    }
});

map.addLayer(new MyCustomLayer(map_origin));
