var fullwidth = 400,
    fullheight = 300;
var margin = {top: 20, right: 20, bottom: 30, left: 50};
var width = fullwidth - margin.left - margin.right,
    height = fullheight - margin.top - margin.bottom;

var i = 0;

var x = d3.scale.linear()
    .range([0, width]);
var y = d3.scale.linear()
    .range([0, height]);


function random_data() {
  var t = [];
  for (el in d3.range(Math.random() * 10 + 3)) {
    t.push(Math.random() * 100);
  }
  key = i;
  i = (i + 1) % 2;
  return { 'key': key, 'value': t };
}


var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)


setInterval(function() {
  var data = svg.selectAll("path")
      .data([random_data()], function(d) { return d.key; })

  data.enter()
    .append("path")
      .each(function(d) {
        x.domain([0, d.value.length]);
        y.domain([0, d3.max(d.value)]);
      })
      .attr("d", function(d) { return d3.svg.line()
          .x(function(d, i) { return x(i); })
          .y(y(0))
        (d.value)})
    .transition()
      .duration(900)
      .attr("d", function(d) { return d3.svg.line()
          .x(function(d, i) { return x(i); })
          .y(function(d) { return y(d); })
        (d.value)})

  data.exit()
    .transition()
      .duration(500)
      .style("opacity", 0)
      .remove();
}, 1000);
