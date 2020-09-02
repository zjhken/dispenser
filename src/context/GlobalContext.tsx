import React, {SetStateAction, useEffect, useState} from "react";

export type GlobalContextType = {
	tempList: TempData[]
	setTempList: SetStateFunc<TempData[]>
	teaQty: number
	setTeaQty: SetStateFunc<number>
	coffeeQty: number
	setCoffeeQty : SetStateFunc<number>
	sugarQty: number
	setSugarQty: SetStateFunc<number>
	milkQty: number
	setMilkQty: SetStateFunc<number>
}

const GlobalContext = React.createContext<Partial<GlobalContextType>>({})

function GlobalProvider(props: {children: JSX.Element}){

	const [tempList, setTempList] = useState([{timestamp: new Date().getTime(), temperature: 100}])
	const [coffeeQty, setCoffeeQty] = useState(100)
	const [teaQty, setTeaQty] = useState(100)
	const [sugarQty, setSugarQty] = useState(100)
	const [milkQty, setMilkQty] = useState(100)

	useEffect(()=>{
		const timer = setInterval(()=> {
			const currTemp = tempList[tempList.length -1]?.temperature
			const latestTemp = currTemp && currTemp < 99.5 ? currTemp + 0.5 : 100
			setTempList(prev => [...prev, {timestamp: new Date().getTime(), temperature: latestTemp}])
		}, 1000)

		return () => clearInterval(timer)

	}, [tempList])


	return <GlobalContext.Provider value={
		{
			tempList, setTempList,
			teaQty, setTeaQty,
			coffeeQty, setCoffeeQty,
			sugarQty, setSugarQty,
			milkQty, setMilkQty,
		}
	}>
		{props.children}
	</GlobalContext.Provider>
}

export {GlobalProvider, GlobalContext}

export interface TempData {
	timestamp: number
	temperature: number
}

export type SetStateFunc<T> = React.Dispatch<React.SetStateAction<T>>
