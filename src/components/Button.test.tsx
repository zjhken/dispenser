import React from "react"
import { render } from "@testing-library/react"
import {Button} from "./Button";
import { shallow } from 'enzyme';

test("render button should show loading", ()=> {
	const {getByText} = render(<Button disabled={false}
																		 onClick={()=> {}} icon="" size="large"
																		 isLoading={true} isSelected={false} text="button"/>)
	const btnElem = getByText(/Loading/)
	expect(btnElem).toBeInTheDocument()
})

test("render button should show text", ()=> {
	const {getByText} = render(<Button disabled={false}
																		 onClick={()=> {}} icon="" size="large"
																		 isLoading={false} isSelected={false} text="text"/>)
	const btnElem = getByText(/text/)
	expect(btnElem).toBeInTheDocument()
})

// need more time to config these testing stuff
// typescript with so these testing suit took me lots of time to config.

// test("if loading then cannot onClick not work", () => {
//
// 	const mockCallBack = jest.fn()
// 	const btn = shallow(<Button disabled={false}
// 																		 onClick={mockCallBack} icon="" size="large"
// 																		 isLoading={true} isSelected={false} text="text"/>)
//
// 	btn.find("button").simulate("click")
// 	expect(mockCallBack.mock.calls.length).toEqual(0)
// })
