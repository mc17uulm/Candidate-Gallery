import React, {Component, FormEvent} from "react";
import FormGroup from "../form/FormGroup";
import Input, { Error } from "../form/Input";
import ImageForm from "../form/ImageForm";
import Select from "../form/Select";
import Candidate from "../classes/Candidate";

interface NameFormProps {}

interface NameFormState {
	gallery: string,
	gallery_error: Error,
	type: string,
	images: Candidate[]
}

export default class NameForm extends Component<NameFormProps, NameFormState>
{

	constructor(props: NameFormProps)
	{
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);

		this.state = {
			gallery: "",
			gallery_error: {active: false},
			type: "board",
			images: [{
				url: "http://localhost:8000/wp-content/uploads/2019/07/64928238_2185936344788204_8829693217084538880_o.jpg",
				id: 1,
				name: "",
				email: "",
				func: "",
				statement: "",
				job: "",
				age: null,
				children: null,
				grandchildren: null
			}, {
				url: "http://localhost:8000/wp-content/uploads/2019/07/action-astronomy-constellation-1274260.jpg",
				id: 2,
				name: "",
				email: "",
				func: "",
				statement: "",
				job: "",
				age: null,
				children: null,
				grandchildren: null
			}]
		}

		this.update = this.update.bind(this);
		this.updateImage = this.updateImage.bind(this);
		this.save = this.save.bind(this);
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

	updateImage(id: string, value: any, index: number)
	{
		let images = this.state.images.map((image: Candidate, i: number) => {
			if(i === index) {
				image[id] = value;
			}
			return image;
		});
		this.setState({
			images: images
		});
	}

	save() {

		let correct : boolean = true;

		if(this.state.gallery === "") { correct = false; this.setState({gallery_error: {active: true, msg: "Bitte gib der Gallery einen Namen!"}})};

		let images = this.state.images.map((image: Candidate) => {
			
		});

		if(!correct) {
			return;
		}

		console.log("Success");
	}

	render()
	{
		return (
			<form onSubmit={this.handleSubmit}>
				<FormGroup>
					<label className="cg_label">Gallery Name:</label>
					<Input id="gallery" type="text" value={this.state.gallery} error={this.state.gallery_error} placeholder="Gallery Name" update={this.update}/>
				</FormGroup>
				<FormGroup>
					<label className="cg_label">Type:</label>
					<Select id="type" update={this.update} options={[{key: "board", value: "Vorstand"}, {key: "delegates", value: "Delegierte"}, {key: "candidates", value: "Kandidat*innen"}, {key: "mandates", value: "Mandatsträger*innen"}]}></Select>
				</FormGroup>
				<FormGroup>
					<ImageForm type={this.state.type} id="images" images={this.state.images} update={this.update} updateImage={this.updateImage} />
				</FormGroup>
				<button className="cg_button" onClick={this.save}>Save</button>
			</form>
		);
	}

}