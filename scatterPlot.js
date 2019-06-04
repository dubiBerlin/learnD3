var data = [
	[400, 200],
	[210, 140],
	[722, 300],
	[70, 160],
	[250, 50],
	[110, 280],
	[699, 225],
	[90, 220]
]
var chart_width = 800
var chart_height = 400

let radius = 10

let svg = d3
	.select("#chart")
	.append("svg")
	.attr("width", chart_width)
	.attr("height", chart_height)

// create scales
let x_scale = d3
	.scaleLinear()
	.domain([
		0,
		d3.max(data, function(d) {
			return d[0]
		})
	])
	.range([0, chart_width])

let y_scale = d3
	.scaleLinear()
	.domain([
		0,
		d3.max(data, function(d) {
			return d[1]
		})
	])
	.range([0, chart_width])
// Bind data and create bars
svg
	.selectAll("circle")
	.data(data)
	.enter()
	.append("circle")
	.attr("cx", function(d, i) {
		return d[0]
	})
	.attr("cy", function(d) {
		return d[1]
	})
	.attr("r", function(d, i) {
		return d[1] / radius
	})
	.attr("fill", "#7ed26d")

// create labels
svg
	.selectAll("text")
	.data(data)
	.enter()
	.append("text")
	.text(function(d) {
		return d.join(" | ")
	})
	.attr("x", function(d, i) {
		return d[0]
	})
	.attr("y", function(d) {
		return d[1]
	})
	.style("font-size", 11)
	.attr("fill", "#222")
	.attr("text-anchor", "middle")
