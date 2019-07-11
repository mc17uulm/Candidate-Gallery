import React, {Component, FormEvent} from "react";
import FormGroup from "../form/FormGroup";
import Input from "../form/Input";
import ImageForm from "../form/ImageForm";
import Select from "../form/Select";
import { GalleryImage } from "../form/Image";

export enum GalleryType {
	Board = "board",
	Mandates = "mandates",
	Delegates = "delegates",
	Candidates = "candidates"
}

interface NameFormProps {

}

interface NameFormState {
	gallery: string,
	type: GalleryType,
	images: GalleryImage[]
}

export default class NameForm extends Component<NameFormProps, NameFormState>
{

	constructor(props: NameFormProps)
	{
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);

		this.state = {
			gallery: "",
			type: GalleryType.Board,
			images: [{
				url: "http://localhost:8000/wp-content/uploads/2019/07/64928238_2185936344788204_8829693217084538880_o.jpg",
				id: 1
			}, {
				url: "http://localhost:8000/wp-content/uploads/2019/07/action-astronomy-constellation-1274260.jpg",
				id: 2
			}]
		}

		this.update = this.update.bind(this);
	}

	handleSubmit(e: FormEvent)
	{
		e.preventDefault();
	}

	update(id: string, value: any)
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
					<Input id="gallery" type="text" value={this.state.gallery} placeholder="Gallery Name" update={this.update}/>
				</FormGroup>
				<FormGroup>
					<label className="cg_label">Type:</label>
					<Select id="type" update={this.update}></Select>
				</FormGroup>
				<FormGroup>
					<ImageForm type={this.state.type} id="images" images={this.state.images} update={this.update} />
				</FormGroup>
			</form>
		);
	}

}