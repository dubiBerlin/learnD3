// Data
var data = [
	{ month: "Januar", pigeons: 6, doves: 8, eagles: 15 },
	{ month: "Februar", pigeons: 9, doves: 15, eagles: 5 },
	{ month: "März", pigeons: 11, doves: 13, eagles: 14 },
	{ month: "April", pigeons: 15, doves: 4, eagles: 20 },
	{ month: "Mai", pigeons: 22, doves: 25, eagles: 23 },
	{ month: "Juni", pigeons: 22, doves: 25, eagles: 23 }
]

var chart_width = 800
var chart_height = 400
var color = d3.scaleOrdinal(d3.schemeCategory10)
let padding = 50

var parse = d3.timeFormat("%Y")

let stack = d3.stack().keys(["pigeons", "doves", "eagles"])

let stack_data = stack(data)

let x_scale = d3
	.scaleBand()
	.domain(d3.range(data.length))
	// .domain(data.map(d => d.month))
	.range([padding, chart_width - padding])
	.paddingInner(0.05)

let y_scale = d3
	.scaleLinear()
	.domain([
		0,
		d3.max(data, function(d) {
			return d.pigeons + d.doves + d.eagles
		})
	])
	.range([chart_height - padding, 0])

// Create SVG Element
var svg = d3
	.select("#chart")
	.append("svg")
	.attr("width", chart_width)
	.attr("height", chart_height)

let x_axis = d3.axisBottom(x_scale)
// .tickValues([10, 100, 230, 300, 550])
// group in das svg einfügen und in die group die x-Achse einfügen

// Groups
var groups = svg
	.selectAll("g")
	.data(stack_data)
	.enter()
	.append("g")
	.style("fill", function(d, i) {
		return color(i)
	})

groups
	.selectAll("rect")
	.data(function(d) {
		console.log("_D ", d)
		return d
	})
	.enter()
	.append("rect")
	.attr("x", function(d, i) {
		console.log(i, " ", d)
		return x_scale(i)
	})
	.attr("width", x_scale.bandwidth())
	.attr("height", 0)
	.attr("y", function(d) {
		let pos = chart_height - padding
		console.log(pos)
		return pos
	})
	.transition()
	.duration(2000)
	.attr("y", function(d) {
		return y_scale(d[1])
	})
	.attr("height", function(d) {
		return y_scale(d[0]) - y_scale(d[1])
	})

svg
	.append("g")
	.call(x_axis)
	.attr("class", "x-axis")
	.attr("transform", "translate(0," + (chart_height - padding) + ")")
