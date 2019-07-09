import React, {Component, FormEvent} from "react";

interface NameFormProps {

}

export default class NameForm extends Component<NameFormProps>
{

	constructor(props: NameFormProps)
	{
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e: FormEvent)
	{
		e.preventDefault();
	}

	render()
	{
		return (
			<form onSubmit={this.handleSubmit}>

			</form>
		);
	}

}