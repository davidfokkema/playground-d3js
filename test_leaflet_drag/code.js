// coordinates
var map_origin = new L.LatLng(52.2, 4.7);
var data = [[52.2, 4.7], [52.3, 4.6]];


// coordinate transformation functions
// based on a lat/lon coordinate, return the pixel position on the layer
function x(coord) { return map.latLngToLayerPoint(coord).x; }
function y(coord) { return map.latLngToLayerPoint(coord).y; }


// the map object, with tileLayer
var map = L.map('map');
L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">' +
                 'OpenStreetMap</a> contributors, ' +
                 '&copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    maxZoom: 18
}).addTo(map);


// the svg layer on top of the map
var svg = d3.select(map.getPanes().overlayPane).append("svg"),
    g = svg.append("g").attr("class", "leaflet-zoom-hide");


// update the layer to fill the window into the map
function update_layer_position() {
    // update layer's position to top-left of map container
    var pos = map.containerPointToLayerPoint([0, 0]);
    L.DomUtil.setPosition(svg.node(), pos);

    // if you reposition the overlay, translate it with the negative offset to
    // be able to use the conversion functions.
    g.attr("transform", "translate(" + -pos.x + "," + -pos.y + ")");

    // reposition all circles
    g.selectAll("circle")
        .attr("cx", function(d) { return x(d); })
        .attr("cy", function(d) { return y(d); });
}
// update the svg layer after the map has been moved or zoomed
map.on('moveend', update_layer_position);


// drag behavior for circles
var drag = d3.behavior.drag()
    .origin(function(d) { return {'x': d[0], 'y': d[1]}; })
    .on("drag", movecircle);

// event handler for moving the circles
function movecircle(d) {
  d[0] = d3.event.x;
  d[1] = d3.event.y;
  update_circles();
}

// add circles for each data point
g.selectAll("circle").data(data)
  .enter()
    .append("circle")
      .attr("r", 10)
      .call(drag);


function update_circles() {
    g.selectAll("circle")
        .attr("cx", function(d) { return d[0]; })
        .attr("cy", function(d) { return d[1]; });
}
update_circles();

// set a map view and trigger 'moveend' which will update the svg layer
map.setView(map_origin, 10);
