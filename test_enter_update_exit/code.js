var i = 0;

var body = d3.select("body")

setInterval(function() {
  var data = body.selectAll("p")
      .data([function() {
        var t = [];
        for (el in d3.range(Math.random() * 10)) {
          t.push(el);
        }
        key = i;
        i = (i + 1) % 2;
        return { 'key': key, 'value': t };
      }()], function(d) { return d.key; })

  console.log(i);

  data.text("There is no update.")
  data.enter().append("p")
      .text(i)
      .style("opacity", 0)
    .transition()
      .duration(900)
      .style("opacity", 1)
  data.exit()
    .transition()
      .duration(900)
      .style("opacity", 0)
      .remove()
}, 1000)
