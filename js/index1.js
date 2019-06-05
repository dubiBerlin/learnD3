var dataset = ["44", "12", "23", "13", "56", "29"]

var el = d3
	.select("body")
	.selectAll("p")
	.data(dataset)
	.enter()
	.append("p")
	.text(function(d) {
		return "#" + d
	})
	.style(
		"color",
		function(d) {
			if (d > 20) {
				return "red"
			} else {
				return "green"
			}
		},
		"background-color",
		"blue"
	)
