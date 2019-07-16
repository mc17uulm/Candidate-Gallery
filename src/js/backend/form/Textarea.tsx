import React, {Component, ChangeEvent} from "react";
import { InputObject } from "./Input";

interface TextareaProps {
	small?: boolean,
	id: string,
	placeholder: string,
	value: InputObject<any>,
	update: (id: string, value: string) => void
}

export default class Textarea extends Component<TextareaProps>
{

	static defaultProps = {
		small: false
	}

	constructor(props: TextareaProps)
	{
		super(props);

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e: ChangeEvent<HTMLTextAreaElement>)
	{
		e.preventDefault();
		this.props.update(this.props.id, e.target.value);
	}

	render()
	{
		return (
			<div>
				<textarea className={"form-control cg_textarea" + (this.props.small ? " cg_sm" : "") + (this.props.value.error.active ? " cg_error" : "")} placeholder={this.props.placeholder} onChange={this.handleChange} value={this.props.value.value}>
				</textarea>	
				{this.props.value.error.active ? (<span className="cg_error_info">{this.props.value.error.msg}</span>) : ""}
			</div>
		);
	}

}