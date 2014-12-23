var timestamps = ["1350432000908520373", "1350432001292592952"];
var ts_idx = 0;
var url = 'http://data.hisparc.nl/api/station/501/trace/';

var fullwidth = 400,
    fullheight = 300;
var margin = {top: 20, right: 20, bottom: 30, left: 50};
var width = fullwidth - margin.left - margin.right,
    height = fullheight - margin.top - margin.bottom;

var key_idx = 0;

var x = d3.scale.linear()
    .range([0, width]);
var y = d3.scale.linear()
    .range([0, height]);


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
  d3.json(url + timestamps[ts_idx] + '/', function(error, data) {
    trace = {'key': key_idx, 'value': data}
    key_idx = (key_idx + 1) % 2;
    ts_idx = (ts_idx + 1) % timestamps.length;

    var data = svg.selectAll(".trace")
        .data([trace], function(d) { return d.key; })

    data.enter()
      .append("g")
        .attr("class", "trace")
        .each(function(d) {
          x.domain([0, (d.value[0].length - 1) * 2.5]);
          y.domain([0, d3.max(d.value, function(d) { return d3.max(d); })])
        })
        .selectAll("path")
          .data(function(d) { return d.value; }).enter()
          .append("path")
            .attr("class", function(d, i) { return 't' + (i + 1); })
            .attr("d", d3.svg.line()
                .x(function(d, i) { return x(i * 2.5); })
                .y(y(0)))
          .transition()
            .duration(900)
            .attr("d", d3.svg.line()
                .x(function(d, i) { return x(i * 2.5); })
                .y(function(d) { return y(d); }))

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
  });
}, 1000);
