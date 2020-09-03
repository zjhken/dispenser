import React, {useContext, useEffect, useRef, useState} from "react";
import {MaintenanceStyle} from "./MaintenanceStyle";
import {GlobalContext} from "../context/GlobalContext";
import echarts from "echarts"
import {useHttp} from "../utils/HttpKit";
import {TempObj} from "../utils/Types";

export function Maintenance() {

	const {coffeeQty, teaQty, sugarQty, milkQty} = useContext(GlobalContext)

	const {post} = useHttp()

	const tempList = useRef<number[][]>([])
	const tempChart = useRef<echarts.ECharts>()
	useEffect(() => {
		tempChart.current = echarts.init(document.getElementById("c2") as HTMLDivElement)

		async function fetchTemp() {
			const rtn: { temps: TempObj[] } = await post("get-temperature", {machine_id: "hahahahaha"})
			const list = rtn.temps

			if(tempList.current.length === 0){
				tempList.current = list.map(it => [it.timestamp,it.temp])
			}
			else{
				tempList.current.shift()
				tempList.current.push([list[29].timestamp,list[29].temp])
			}

			tempChart.current!.setOption({
				tooltip: {
					trigger: "axis"
				},
				xAxis: {
					type: "time",
				},
				yAxis: {
					type: "value"
				},
				series: [
					{
						data: tempList.current,
						type: "line"
					}
				]
			})
		}

		const timer = setInterval(function () {
			fetchTemp()
		}, 1000)

		return () => clearInterval(timer)

	}, [post])


	const qtyChart = useRef<echarts.ECharts>()
	useEffect(()=>{
		qtyChart.current = echarts.init(document.getElementById("c1") as HTMLDivElement)
		qtyChart.current.setOption({
			title: {text: "Stock"},
			legend: {data: ["qty"]},
			xAxis: {data: []},
			yAxis: {},
			series: [{
				name: "qty", type: "bar", data: [],
				itemStyle: {
					normal: {
						color: function (param: { name: string, data: number }) {
							if (param.data <= 25) {
								return "#ff4a76"
							}
							else {
								return "#50ebff"
							}
						},
						label: {
							show: true,
							position: "top"
						}
					},

				}
			}],
		})
	},[])
	useEffect(() => {
		const dataSrc: { name: string, count: number }[] = [
			{name: "☕coffee", count: coffeeQty!},
			{name: "tea", count: teaQty!},
			{name: "sugar", count: sugarQty!},
			{name: "milk", count: milkQty!},
		]
		qtyChart.current!.setOption({
			xAxis: {data: dataSrc.map(it => it.name)},
			series: [{
				name: "qty", type: "bar", data: dataSrc.map(it => it.count),
			}],
		})
	}, [coffeeQty, teaQty, sugarQty, milkQty])

	return <MaintenanceStyle className="w-1/2">
		<div
				className="backdropFilter-blur p-5 flex flex-wrap rounded-md hover:shadow-2xl flex-col w-full my-4 transition-shadow duration-500">
			<div id="c1" className="chart"/>
			<div className="w-full">

			</div>
			<div id="c2" className="chart"/>

		</div>
	</MaintenanceStyle>

}
