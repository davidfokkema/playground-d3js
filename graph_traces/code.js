var margin = {top: 20, right: 20, bottom: 30, left: 50};

var padding = 5;

var fullwidth = 480,
fullheight = 250;

var width = fullwidth - margin.left - margin.right,
height = fullheight - margin.top - margin.bottom;

var x = d3.scale.linear()
.range([0, width]);

var y = d3.scale.linear()
.range([0, height]);

var line = d3.svg.line()
.x(function(d, i) { return x(i); })
.y(y);

var zero = d3.svg.line()
.x(function(d, i) { return x(i); })
.y(function(d) { return y(0); });

var svg = d3.select('body')
.append('svg')
.attr('width', fullwidth)
.attr('height', fullheight)
.append('g')
.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

svg.append('rect')
.attr('class', 'axis box')
.attr('width', width)
.attr('height', height);

d3.json('http://data.hisparc.nl/api/station/202/trace/1419033600935253665/', function(error, data) {

  var data2 = data[0];

  var xmin = 0,
  xmax = data[0].length;
  var xmargin = .02 * (xmax - xmin);
  x.domain([xmin - xmargin, xmax + xmargin]);

  var ymin = 0,
  ymax = d3.max(data, function(a) { return d3.max(a)});
  var ymargin = .05 * (ymax - ymin);
  y.domain([ymin - ymargin, ymax + ymargin]);

  var xAxis = d3.svg.axis()
  .scale(x)
  .ticks(5)
  .outerTickSize(0)
  .orient("bottom");

  var yAxis = d3.svg.axis()
  .scale(y)
  .ticks(5)
  .outerTickSize(0)
  .orient("left");

  svg.append('g')
  .attr('class', "x axis")
  .attr('transform', 'translate(0,' + height + ')')
  .call(xAxis);

  svg.append('g')
  .attr('class', 'y axis')
  .call(yAxis);

  data.forEach(function(trace, i) {
    svg.append('path')
    .attr('id', 'trace' + i)
    .attr('d', zero(trace))
    .transition()
    .attr('d', line(trace));
  })
});
