import React, {Component, FormEvent, ReactNode} from "react";
import validator from "email-validator";
import FormGroup from "../form/FormGroup";
import Input, { InputObject } from "../form/Input";
import ImageForm from "../form/ImageForm";
import Select from "../form/Select";
import Candidate from "../classes/Candidate";
import APIHandler from "../classes/APIHandler";
import Response from "../classes/Response";
import Icon from "../form/Icon";

interface NameFormProps {}

interface NameFormState {
	gallery: InputObject<string>,
	type: string,
	images: Candidate[],
	button: ReactNode
}

export default class NameForm extends Component<NameFormProps, NameFormState>
{

	constructor(props: NameFormProps)
	{
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);

		this.state = {
			gallery: {value: "", error: {active: false}},
			type: "board",
			images: [
				new Candidate(
					1, "http://localhost:8000/wp-content/uploads/2019/07/64928238_2185936344788204_8829693217084538880_o.jpg", "", "", "", ""
				), new Candidate(
					2, "http://localhost:8000/wp-content/uploads/2019/07/action-astronomy-constellation-1274260.jpg", "", "", "", ""
				)
			],
			button: "Speichern"
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
		if(typeof this.state[id] === "object" && typeof this.state[id].value !== "undefined")
		{
			value = {value: value, error: {active: false, msg: ""}};
		}

		this.setState({
			[id]: value
		} as Pick<NameFormState, keyof NameFormState>);
	}

	updateImage(id: string, value: any, index: number)
	{
		let images = this.state.images.map((image: Candidate, i: number) => {
			if(i === index) {
				image[id] = {value: value, error: {active: false, msg: ""}};
			}
			return image;
		});
		this.setState({
			images: images
		});
	}

	async save() {

		await this.setState({button: (<span><Icon type="image-rotate" spin /> Speichern...</span>)})

		let correct : boolean = true;

		if(this.state.gallery.value === "") { correct = false; this.setState({gallery: {value: "", error: {active: true, msg: "Bitte gib der Gallery einen Namen!"}}})};

		let images = this.state.images.map((image: Candidate) => {
			if(image.name.value === "") {correct = false; image.name = {value: "", error: {active: true, msg: "Bitte gib den Namen der Person an!"}}};
			if(image.email.value !== "" && !validator.validate(image.email.value)) {correct = false; image.email = {value: image.email.value, error: {active: true, msg: "Bitte gib die gültige E-Mail-Adresse der Person an!"}}};

			return image;
		});

		this.setState({images: images});

		if(!correct) {
			await this.setState({button: "Speichern"});
			return;
		}

		let data : object = {
			name: this.state.gallery.value,
			type: this.state.type,
			images: this.state.images.map((image: Candidate, index: number) => {
				return image.parse(index);
			})
		};

		let response : Response = await APIHandler.post("add_gallery", data);

		await this.setState({button: "Speichern"})

		console.log(response);
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
					<Select id="type" update={this.update} options={[{key: "board", value: "Vorstand"}, {key: "delegates", value: "Delegierte"}, {key: "candidates", value: "Kandidat*innen"}, {key: "mandates", value: "Mandatsträger*innen"}]}></Select>
				</FormGroup>
				<FormGroup>
					<ImageForm type={this.state.type} id="images" images={this.state.images} update={this.update} updateImage={this.updateImage} />
				</FormGroup>
				<button className="cg_button" onClick={this.save}>{this.state.button}</button>
			</form>
		);
	}

}