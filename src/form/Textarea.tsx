import React, {Component, ChangeEvent} from "react";

interface TextareaProps {
	small?: boolean,
	id: string,
	placeholder: string,
	value: string,
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
			<textarea className={"form-control cg_textarea" + (this.props.small ? " cg_sm" : "")} placeholder={this.props.placeholder} onChange={this.handleChange} value={this.props.value}>
			</textarea>	
		);
	}

}