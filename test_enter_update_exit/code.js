var width = 400,
    height = 300;

var i = 0;

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

  data.enter().append("path")
      .attr("d", function(d) { return d3.svg.line()
          .x(function(d, i) { return i * 10; })
          .y(0)
        (d.value)})
    .transition()
      .duration(900)
      .attr("d", function(d) { return d3.svg.line()
          .x(function(d, i) { return i * 10; })
          .y(function(d) { return d; })
        (d.value)})

  data.exit()
    .transition()
      .duration(500)
      .style("opacity", 0)
      .remove();
}, 1000);
