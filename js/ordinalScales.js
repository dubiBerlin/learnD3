var fruit = ["Apples", "Oranges", "Grapes", "Strawberry", "Kiwi"]

var scale = d3
	.scaleBand()
	.domain(d3.range(fruit.length))
	.range([0, 500])
