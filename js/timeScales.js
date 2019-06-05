var data = [
	{ date: "07/01/2019", num: 20 },
	{ date: "07/02/2019", num: 37 },
	{ date: "07/03/2019", num: 25 },
	{ date: "07/04/2019", num: 45 },
	{ date: "07/05/2019", num: 23 },
	{ date: "07/06/2019", num: 33 },
	{ date: "07/07/2019", num: 49 },
	{ date: "07/08/2019", num: 40 },
	{ date: "07/09/2019", num: 36 },
	{ date: "07/10/2019", num: 27 }
]

let time_parse = d3.timeParse("%m/%d/%Y")
let time_format = d3.timeFormat("%b %e")
let newData = []
// Loop through each date
data.forEach(obj => {
	obj.date = time_parse(obj.date)
})

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
	.scaleTime()
	.domain([
		d3.min(data, function(d) {
			return d.date
		}),
		d3.max(data, function(d) {
			return d.date
		})
	])
	.range([padding, chart_width - padding * 2])

let y_scale = d3
	.scaleLinear()
	.domain([
		0,
		d3.max(data, function(d) {
			return d.num
		})
	])
	.range([chart_height - padding, padding])

let a_scale = d3
	.scaleSqrt()
	.domain([
		0,
		d3.max(data, function(d) {
			return d.num
		})
	])
	.range([0, 25])

// Bind data and create circles
svg
	.selectAll("circle")
	.data(data)
	.enter()
	.append("circle")
	.attr("cx", function(d, i) {
		return x_scale(d.date)
	})
	.attr("cy", function(d) {
		return y_scale(d.num)
	})
	.attr("r", function(d, i) {
		return a_scale(d.num)
	})
	.attr("fill", "#7ed26d")

// create labels
svg
	.selectAll("text")
	.data(data)
	.enter()
	.append("text")
	.text(function(d) {
		return time_format(d.date)
	})
	.attr("x", function(d, i) {
		return x_scale(d.date)
	})
	.attr("y", function(d) {
		return y_scale(d.num)
	})
	.style("font-size", 11)
	.attr("fill", "#222")
	.attr("text-anchor", "middle")
