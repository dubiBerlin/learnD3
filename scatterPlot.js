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
let padding = 50

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
	.range([padding, chart_width - padding * 2])

let y_scale = d3
	.scaleLinear()
	.domain([
		0,
		d3.max(data, function(d) {
			return d[1]
		})
	])
	.range([chart_height - padding, padding])

let a_scale = d3
	.scaleSqrt()
	.domain([
		0,
		d3.max(data, function(d) {
			return d[1]
		})
	])
	.range([0, 25])

// Create x-Axis
//<-- Kurzfrom von ->axisBottom().scale(x_scale) // scale sagt d3 wie groß die x-Achse sein soll
let x_axis = d3.axisBottom(x_scale)
// .tickValues([10, 100, 230, 300, 550])
// group in das svg einfügen und in die group die x-Achse einfügen
svg
	.append("g")
	.call(x_axis)
	.attr("class", "x-axis")
	.attr("transform", "translate(0," + (chart_height - padding) + ")")

// Create y-axis
let y_axis = d3
	.axisLeft(y_scale)
	.ticks(5)
	.tickFormat(function(d) {
		return `${d}€`
  })

svg
	.append("g")
	.call(y_axis)
	.attr("class", "y-axis")
	.attr("transform", "translate(" + padding + ",0)")

// Bind data and create circles
svg
	.selectAll("circle")
	.data(data)
	.enter()
	.append("circle")
	.attr("cx", function(d, i) {
		return x_scale(d[0])
	})
	.attr("cy", function(d) {
		return y_scale(d[1])
	})
	.attr("r", function(d, i) {
		return a_scale(d[1])
	})
	.attr("fill", "#7ed26d")

// create labels
svg
	.append("g")
	.selectAll("text")
	.data(data)
	.enter()
	.append("text")
	.text(function(d) {
		return d.join(" | ")
	})
	.attr("x", function(d, i) {
		return x_scale(d[0])
	})
	.attr("y", function(d) {
		return y_scale(d[1])
	})
	.style("font-size", 11)
	.attr("fill", "#222")
	.attr("text-anchor", "middle")
