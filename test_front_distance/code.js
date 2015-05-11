var fullwidth = 400,
    fullheight = 300;

var FRONT_LENGTH = 100;

var svg = d3.select("body").append("svg")
    .attr("width", fullwidth)
    .attr("height", fullheight);
var g = svg.append("g");

var drag_core = d3.behavior.drag()
    .origin(function() { return front.datum(); })
    .on("drag", move_core)

var drag_alpha = d3.behavior.drag()
    .origin(function() { return { 'x': front_rotate_handle.attr("cx"),
                                  'y': front_rotate_handle.attr("cy") }})
    .on("drag", rotate_front)

var station_data = [{ 'x': 120, 'y': 20 },
                    { 'x': 120, 'y': 200 },
                    { 'x': 300, 'y': 100 },
                   ]
var stations = g.selectAll('.station').data(station_data)
  .enter().append("circle")
    .attr("class", "station")
    .attr("r", 10);

var distances = g.selectAll('.distance').data(station_data)
  .enter().append("line")
    .attr("class", "distance");

var front = g.append("line")
    .datum({ 'x': 50, 'y': 50, 'alpha': Math.PI / 8 });
var core = g.append("circle")
    .attr("r", 5)
    .call(drag_core);
var front_rotate_handle = g.append("circle")
    .attr("r", 5)
    .call(drag_alpha);

function front_line_x(fd, dist) { return fd.x + dist * Math.cos(fd.alpha) }
function front_line_y(fd, dist) { return fd.y + dist * Math.sin(fd.alpha) }

function update_shower_front() {
  var fd = front.datum();

  front
      .attr("x1", front_line_x(fd, -FRONT_LENGTH))
      .attr("y1", front_line_y(fd, -FRONT_LENGTH))
      .attr("x2", front_line_x(fd, FRONT_LENGTH))
      .attr("y2", front_line_y(fd, FRONT_LENGTH));

  core.attr("cx", fd.x)
      .attr("cy", fd.y);

  front_rotate_handle
      .attr("cx", front.attr("x2"))
      .attr("cy", front.attr("y2"));

  stations
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; });

  distances
    .attr("x1", function(d) { return d.x; })
    .attr("y1", function(d) { return d.y; })
    .attr("x2", function(d) { return d.xp; })
    .attr("y2", function(d) { return d.yp; });
}

function move_core() {
  var fd = front.datum();
  fd.x = d3.event.x;
  fd.y = d3.event.y;
  distances.each(calculate_distances);
  update_shower_front();
}

function calculate_distances(d) {
  var fd = front.datum();
  d.r = (d.x - fd.x) * Math.cos(fd.alpha) + (d.y - fd.y) * Math.sin(fd.alpha);
  d.xp = front_line_x(fd, d.r);
  d.yp = front_line_y(fd, d.r);
  d.dist = Math.sqrt((d.x - fd.x)^2 + (d.y - fd.y)^2);
}

function rotate_front() {
  var d = front.datum();
  d.alpha = Math.atan2(d3.event.y - d.y, d3.event.x - d.x);
  distances.each(calculate_distances);
  update_shower_front();
}

distances.each(calculate_distances);
update_shower_front();
