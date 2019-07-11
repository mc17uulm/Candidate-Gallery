import React, {Component, ChangeEvent} from "react";

export class InputObject<T> {
	value: T;
	error: Error;
}

export type Error = {
	active: boolean,
	msg?: string
}

interface InputProps {
	id: string,
	value: InputObject<any>,
	type: "email" | "text" | "number",
	placeholder: string,
	small?: boolean,
	required?: boolean,
	update: (id: string, value: string) => void
}

export default class Input extends Component<InputProps>
{

	static defaultProps = {
		small: false,
		required: false,
		error: {
			active: false,
			msg: ""
		}
	}

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
		return (
			<div className="cg_input_wrapper">
				{this.props.value.error.active ? (<span className="cg_error_indicator"></span>) : ""}
				<input id={this.props.id} type={this.props.type} className={"form-control cg_input" + (this.props.small ? " cg_sm" : "") + (this.props.value.error.active ? " cg_error" : "")} required={this.props.required} placeholder={this.props.placeholder} onChange={this.update} value={this.props.value.value} />
				{this.props.value.error.active ? (<span className="cg_error_info">{this.props.value.error.msg}</span>) : ""}
			</div>
		);
	}

}