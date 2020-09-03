import React from "react";


export const Button = React.memo(function Button1(props: {
	onClick: () => void,
	text: string
	isLoading: boolean,
	isSelected: boolean,
	size: "large" | "small"
	icon: string
	disabled: boolean
}) {
	let sizeCss = "text-6xl w-64 h-30"
	if (props.size !== "large") {
		sizeCss = "text-2xl w-50 h-20"
	}

	return <button
			className={`${sizeCss} hover:shadow-xl hover:bg-purple-300 rounded-md p-3 ${props.isSelected ? " bg-blue-300" : ""} ${props.disabled ? "cursor-not-allowed": ""}`}
			onClick={props.disabled ? ()=> {} : props.onClick}
	>
		<span>{props.icon}</span>
		{props.size === "large" ?? <br/>}
		{props.isLoading ? "Loading..." : props.text}
	</button>
})
