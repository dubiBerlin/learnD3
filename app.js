var data = []
var chart_width = 800
var bar_padding = 1
var chart_height = 400

let length = d3.randomUniform(1, 50)()

for (let i = 0; i < length; i++) {
	data.push(d3.randomUniform(1, 50)())
}

let svg = d3
	.select("#chart")
	.append("svg")
	.attr("width", chart_width)
	.attr("height", chart_height)
// .style("background-color", "#DFA214")

// Bind data and create bars
svg
	.selectAll("rect")
	.data(data)
	.enter()
	.append("rect")
	.attr("x", function(d, i) {
		return i * (chart_width / data.length)
	})
	.attr("y", function(d) {
		return chart_height - d * 5
	})
	.attr("height", function(d, i) {
		return d * 5
	})
	.attr("width", chart_width / data.length - bar_padding)
	.attr("fill", "#7ed26d")

// create labels
svg
	.selectAll("text")
	.data(data)
	.enter()
	.append("text")
	.text(function(d) {
		return parseFloat(d).toFixed(2)
	})
	.attr("x", function(d, i) {
		// return i * (chart_width / data.length) + 1
		return i * (chart_width / data.length) + (chart_width / data.length - bar_padding) / 2
	})
	.attr("y", function(d) {
		return chart_height - d * 5 + 12
	})
	.style("font-size", "10px")
	.attr("fill", "#fff")
	.attr("text-anchor", "middle")
