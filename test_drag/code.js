var fullwidth = 400,
    fullheight = 300;

var svg = d3.select("body").append("svg")
    .attr("width", fullwidth)
    .attr("height", fullheight);
var g = svg.append("g");

var drag = d3.behavior.drag()
    .origin(function(d) { return d; })
    .on("drag", moveline)

var line = g.append("line")
    .datum({ 'x': 50, 'y': 50 })
    .call(drag);
update_line();

function update_line() {
  line.attr("x1", function(d) { return d.x; })
      .attr("y1", function(d) { return d.y; })
      .attr("x2", function(d) { return d.x + 150; })
      .attr("y2", function(d) { return d.y + 150; });
}

function moveline(d) {
  d.x = d3.event.x;
  d.y = d3.event.y;
  update_line();
}
