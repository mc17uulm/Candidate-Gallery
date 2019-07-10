import React, {Component} from "react";

interface SelectProps {

}

export default class Select extends Component<SelectProps>
{

	constructor(props: SelectProps)
	{
		super(props);
	}

	render()
	{
		return (
			<select className="form-control cg_input">
				<option>Vorstad</option>
				<option>Kandidaten</option>
			</select>
		);
	}

}