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
  return { "key": key, "value": t };
}


var svg = d3.select("body").append("svg")
    .attr("width", fullwidth)
    .attr("height", fullheight)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("rect")
    .attr("class", "data_rectangle")
    .attr("width", width)
    .attr("height", height);

var xAxis = d3.svg.axis()
    .scale(x)
    .ticks(5)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .ticks(5)
    .orient("left");

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")");

svg.append("g")
    .attr("class", "y axis");


setInterval(function() {
  var data = svg.selectAll(".trace")
      .data([random_data()], function(d) { return d.key; })

  data.enter()
    .append("path")
      .each(function(d) {
        x.domain([0, d.value.length - 1]);
        y.domain([0, d3.max(d.value)]);
      })
      .attr("class", "trace")
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

  d3.select(".x.axis")
    .transition()
      .duration(900)
      .call(xAxis);

  d3.select(".y.axis")
    .transition()
      .duration(900)
      .call(yAxis);

}, 1000);
