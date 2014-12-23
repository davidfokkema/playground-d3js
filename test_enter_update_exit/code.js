var body = d3.select("body")

setInterval(function() {
  var data = body.selectAll("p")
      .data(function() {
        var t = [];
        for (i in d3.range(Math.random() * 10)) {
          t.push(i);
        }
        return t;
      })

  data.text('U')
  data.enter().append("p")
      .text("E")
      .style("opacity", 0)
    .transition()
      .style("opacity", 1)
  data.exit()
    .transition()
      .style("opacity", 0)
      .remove()
}, 1000)
