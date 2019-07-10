import React, {Component, ChangeEvent} from "react";

interface InputProps {
	id: string,
	value: string,
	type: "email" | "text" | "number",
	placeholder: string,
	update: (id: string, value: string) => void
}

export default class Input extends Component<InputProps>
{

	constructor(props: InputProps)
	{
		super(props);

		this.update = this.update.bind(this);
	}

	update(e: ChangeEvent<HTMLInputElement>)
	{
		e.preventDefault();
		this.props.update(this.props.id, e.target.value);
	}

	render()
	{
		console.log("PropsValue:");
		console.log(this.props.value);
		return (
			<input id={this.props.id} type={this.props.type} className="form-control cg_input" required placeholder={this.props.placeholder} onChange={this.update} value={this.props.value} />
		);
	}

}