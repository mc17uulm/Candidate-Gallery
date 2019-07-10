import React, {Component, FormEvent} from "react";
import FormGroup from "../form/FormGroup";
import Input from "../form/Input";
import ImageButton from "../form/ImageButton";
import ImageForm from "../form/ImageForm";

interface NameFormProps {

}

interface NameFormState {
	gallery_name: string
}

export default class NameForm extends Component<NameFormProps, NameFormState>
{

	constructor(props: NameFormProps)
	{
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);

		this.state = {
			gallery_name: ""
		}

		this.update = this.update.bind(this);
	}

	handleSubmit(e: FormEvent)
	{
		e.preventDefault();
	}

	update(id: string, value: string)
	{
		this.setState({
			[id]: value
		} as Pick<NameFormState, keyof NameFormState>);
	}

	render()
	{
		return (
			<form onSubmit={this.handleSubmit}>
				<FormGroup>
					<label className="cg_label">Gallery Name:</label>
					<Input id="gallery_name" type="text" value={this.state.gallery_name} placeholder="Gallery Name" update={this.update}/>
				</FormGroup>
				<FormGroup>
					<label className="cg_label">Type:</label>
					<Input id="gallery_type" type="text" value="" placeholder="Select Gallery Type" update={this.update} />
				</FormGroup>
				<FormGroup>
					<ImageForm />
				</FormGroup>
			</form>
		);
	}

}