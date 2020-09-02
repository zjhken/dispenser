import React, {useContext, useEffect, useState} from "react";
import {DispenserStyle} from "./DispenserStyle";
import {GlobalContext} from "../context/GlobalContext";
import {useHttp} from "../utils/HttpKit";
import {Button} from "../components/Button";
import { toast } from 'react-toastify';

export function Dispenser() {

	const [isCoffee, setIsCoffee] = useState(true)
	const [needSugar, setNeedSugar] = useState(false)
	const [needMilk, setNeedMilk] = useState(false)

	const [isLoading, setIsLoading] = useState(false)

	const {tempList, setTempList,} = useContext(GlobalContext)

	const [currTemp, setCurrTemp] = useState(100)

	function handleSubmit() {
		setIsLoading(true)
		setCurrTemp(prev => {
			let t2 = prev - 1
			if (t2 < 37) {
				t2 = 37
			}
			return t2
		})
		setTimeout(function () {
			toast("Done! Please take it")
			setIsLoading(false)
		}, 1000)

	}

	const {post} = useHttp()

	useEffect(() => {
		const timer = setInterval(function () {
			async function uploadTemp() {
				const rtn = await post("temperature", {
					machine_id: "hahahahaha",
					timestamp: new Date().getTime(),
					temperature: currTemp
				})
			}

			uploadTemp()
		}, 1000)
		return function () {
			clearInterval(timer)
		}
	}, [currTemp])


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
									icon="☕"/>
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
									icon={"🍵"}/>
				</div>
			</div>
			<div className="flex-1 w-full my-1">with</div>
			<div className="flex-1 flex-row space-x-4">
				<button
						className={"text-3xl flex-1 hover:shadow-xl hover:bg-purple-300 rounded-md" + (needSugar ? " bg-blue-300" : "")}
						onClick={() => {
							setNeedSugar(prev => !prev)
						}}
				>🍬sugar
				</button>
				<span>and/or</span>
				<button
						className={"text-3xl flex-1 hover:shadow-xl hover:bg-purple-300 rounded-md" + (needMilk ? " bg-blue-300" : "")}
						onClick={() => {
							setNeedMilk(prev => !prev)
						}}
				>🍼milk
				</button>
			</div>
			<Button onClick={handleSubmit} text="Make it!" isLoading={isLoading} isSelected={false} size={"small"} icon={""}/>
			{/*<button*/}
			{/*		className="w-64 bg-blue-500 hover:bg-gray-100 font-semibold py-2 px-4 border border-gray-400 rounded shadow"*/}
			{/*		onClick={handleSubmit}*/}
			{/*>*/}
			{/*	Make it!*/}
			{/*</button>*/}

		</div>
	</DispenserStyle>

}
