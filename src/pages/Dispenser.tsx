import React, {useContext, useEffect, useState} from "react";
import {DispenserStyle} from "./DispenserStyle";
import {GlobalContext, GlobalContextType} from "../context/GlobalContext";
import {useHttp} from "../utils/HttpKit";
import {Button} from "../components/Button";
import {toast} from 'react-toastify';

const tempDecreasePerServe = 10
const tempIncreasePerSecond = 3
const lowStockThreshold = 25
const machineId = "hahahahaha"

export function Dispenser() {

	const [isCoffee, setIsCoffee] = useState(true)
	const [needSugar, setNeedSugar] = useState(false)
	const [needMilk, setNeedMilk] = useState(false)

	const [isLoading, setIsLoading] = useState(false)

	const {
		milkQty, setMilkQty,
		coffeeQty, setCoffeeQty,
		teaQty, setTeaQty,
		sugarQty, setSugarQty,
	} = useContext(GlobalContext) as GlobalContextType

	const [currTemp, setCurrTemp] = useState(100)

	async function reportLowStock(item: string){
		await post("lowstockalert", {
			machine_id: machineId,
			timestamp: new Date().getTime(),
			item
		})
	}

	function handleSubmit() {
		setIsLoading(true)
		setCurrTemp(prev => {
			let t2 = prev - tempDecreasePerServe
			if (t2 < 37) {
				t2 = 37
			}
			return t2
		})
		let toastMsg = "Done! Please take it"
		if (needMilk) {
			if (milkQty >= 1) {
				if(milkQty - 1 <= lowStockThreshold){
					reportLowStock("milk")
				}
				setMilkQty(prev => prev -1)
			}
			else{
				toastMsg = "Sorry, not enough milk"
			}
		}
		if (needSugar) {
			if (sugarQty >= 1) {
				if(sugarQty - 1 <= lowStockThreshold){
					reportLowStock("sugar")
				}
				setSugarQty(prev => prev -1)
			}
			else{
				toastMsg = "Sorry, not enough sugar"
			}
		}
		if (isCoffee) {
			if (coffeeQty >= 1) {
				if(coffeeQty - 1 <= lowStockThreshold){
					reportLowStock("coffee")
				}
				setCoffeeQty(prev => prev -1)
			}
			else{
				toastMsg = "Sorry, not enough coffee"
			}
		}
		if (!isCoffee) {
			if (teaQty >= 1) {
				if(teaQty - 1 <= lowStockThreshold){
					reportLowStock("tea")
				}
				setTeaQty(prev => prev -1)
			}
			else{
				toastMsg = "Sorry, not enough tea"
			}
		}

		setTimeout(function () {
			toast(toastMsg)
			setIsLoading(false)
		}, 1000)

	}

	const {post} = useHttp()

	useEffect(() => {
		const timer = setInterval(function () {
			async function uploadTemp() {
				setCurrTemp(prev => {
					if(prev + tempIncreasePerSecond < 100){
						return prev + tempIncreasePerSecond
					}
					else{
						return 100
					}
				})
				await post("temperature", {
					machine_id: machineId,
					timestamp: new Date().getTime(),
					temperature: currTemp
				})
			}

			uploadTemp()
		}, 1000)
		return function () {
			clearInterval(timer)
		}
	}, [currTemp, post])


	return <DispenserStyle className="w-1/2">
		<div className="backdropFilter-blur p-5 flex flex-wrap w-full rounded-md hover:shadow-2xl flex-col items-center">
			<div className="flex flex-row h-40 w-4/5 items-center">
				<div className="w-2/5 flex-1">
					<Button onClick={() => {
						setIsCoffee(true)
					}}
									text={"coffee"}
									isLoading={false}
									isSelected={isCoffee}
									size={"large"}
									icon="☕"
									disabled={coffeeQty <= 0}
					/>
				</div>
				<div className="w-1/6">or</div>
				<div className="w-2/5 flex-1">
					<Button onClick={() => {
						setIsCoffee(false)
					}}
									text={"tea"}
									isLoading={false}
									isSelected={!isCoffee}
									size={"large"}
									icon={"🍵"}
									disabled={teaQty <= 0}
					/>
				</div>
			</div>
			<div className="flex-1 w-full my-1">with</div>
			<div className="flex-1 flex-row space-x-4">
				<Button
						text={"🍬sugar"}
						isLoading={false}
						isSelected={needSugar}
						size={"small"}
						icon={""}
						disabled={sugarQty <= 0}
						onClick={() => {
							setNeedSugar(prev => !prev)
						}}
				/>
				<span>and/or</span>
				<Button
						text={"🍼milk"}
						isLoading={false}
						isSelected={needMilk}
						size={"small"}
						icon={""}
						disabled={milkQty <= 0}
						onClick={() => {
							setNeedMilk(prev => !prev)
						}}
				/>
			</div>
			<Button onClick={handleSubmit} text="Make it!" isLoading={isLoading} isSelected={false} size={"small"} icon={""} disabled={isLoading}/>

		</div>
	</DispenserStyle>

}
