import React, {useContext, useEffect} from "react";
import {MaintenanceStyle} from "./MaintenanceStyle";
import * as d3 from "d3"
import {GlobalContext} from "../context/GlobalContext";

export function Maintenance() {

	const {coffeeQty, teaQty, sugarQty, milkQty} = useContext(GlobalContext)

	useEffect(() => {
		const dataSrc: { name: string, count: number }[] = [
			{name: "coffee", count: coffeeQty!},
			{name: "tea", count: teaQty!},
			{name: "sugar", count: sugarQty!},
			{name: "milk", count: milkQty!},
		]
		const width = 600
		const height = 400
		const svg = d3.select("#d3")
				.append("svg")
				.attr("width", width)
				.attr("height", height)

		const padding = {top: 30, right: 30, bottom: 30, left: 30}

		const xScale = d3.scaleBand()
				.domain(dataSrc.map(it => it.name))
				.range([0, width - padding.left - padding.right])
				.padding(0.1)
		const xAxis = d3.axisBottom(xScale)

		const yScale = d3.scaleLinear()
				.domain([0, d3.max(dataSrc, it => it.count) as number + 10])
				.range([height - padding.top - padding.bottom, 0])
		const yAxis = d3.axisLeft(yScale)

		const rectMargin = 4
		svg.selectAll(".theRect")
				.data(dataSrc)
				.enter()
				.append("rect")
				.attr("class", "theRect")
				.attr("transform", `translate("${padding.left}", "${padding.top}")`)
				.attr("x", function (it, idx) {
					return idx * xScale.bandwidth() + rectMargin / 2
				})
				.attr("y", function (it) {
					return yScale(it.count)
				})
				.attr("width", xScale.bandwidth() - rectMargin)
				.attr("height", function (it) {
					// return height - padding.top - padding.bottom - yScale(it.count)
					return 30
				})
				.attr("fill", function (it) {
					// return `rgb(106, 139, ${it.count / (d3.max(dataSrc.map(it => it.count)) as number) * 200}`
					return `rgb(106, 139, 100`
				})

		svg.append("g")
				.attr("class", "axis axis--x")
				.attr("transform", `translate(${padding.left}, ${height - padding.bottom})`)
				.call(xAxis)

		svg.append("g")
				.attr("class", "axis axis--y")
				.attr("transform", `translate(${padding.left}, ${padding.top})`)
				.call(yAxis)



	}, [coffeeQty, teaQty, sugarQty, milkQty])

	return <MaintenanceStyle className="w-1/2">
		<div
				className="backdropFilter-blur p-5 flex flex-wrap rounded-md hover:shadow-2xl flex-col w-full my-4 transition-shadow duration-500">
			<div className="w-1/4 flex-col w-30">
				<div className="text-right">☕coffee</div>
				<div className="text-right">🍵tea</div>
				<div className="text-right">🍬sugar</div>
				<div className="text-right">🍼milk</div>
			</div>
			<div id="d3" className="w-3/4 flex-col w-64" style={{textAlignLast: "end"}}>
				{/*<div id="coffee"></div>*/}
				{/*<div id="tea"></div>*/}
				{/*<div id="sugar"></div>*/}
				{/*<div id="milk"></div>*/}
			</div>
			<div className="w-full">

			</div>

		</div>
	</MaintenanceStyle>

}
