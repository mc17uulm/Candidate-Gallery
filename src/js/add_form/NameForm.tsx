import React, {Component, FormEvent, ReactNode, MouseEvent} from "react";
import validator from "email-validator";
import FormGroup from "../form/FormGroup";
import Input, { InputObject } from "../form/Input";
import ImageForm from "../form/ImageForm";
import Select from "../form/Select";
import Candidate from "../classes/Candidate";
import APIHandler from "../classes/APIHandler";
import Response from "../classes/Response";
import Icon from "../form/Icon";
import Button from "../form/Button";
import HelpText from "../form/HelpText";
import EventHandler, { Container } from "../classes/EventHandler";

interface NameFormProps {
	gallery_id?: number,
	type: "add" | "edit"
}

interface NameFormState {
	gallery: InputObject<string>,
	type: string,
	images: Candidate[],
	button: ReactNode,
	help: {
		text: string,
		color?: "green" | "red" 
	}
}

let previous : Container;

export default class NameForm extends Component<NameFormProps, NameFormState>
{

	constructor(props: NameFormProps)
	{
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);

		this.state = {
			gallery: {value: "", error: {active: false}},
			type: "board",
			images: [],
			button: "Speichern",
			help: {text: ""}
		}

		this.update = this.update.bind(this);
		this.updateImage = this.updateImage.bind(this);
		this.save = this.save.bind(this);
	}

	async componentWillMount()
	{
		if(this.props.gallery_id)
		{
			let resp : Response = await APIHandler.post("get_gallery", {id: this.props.gallery_id});
			
			if(resp.hasSuccess())
			{
				let data = resp.getData();
				let images : Candidate[] = data["pictures"].map(image => {
					let c = new Candidate(image.picture, image.id, image.name);
					c.set_position(image.position);
					c.reset();
					return c;
				});
				this.setState({
					gallery: {value: data["name"], error: {active: false, msg: ""}},
					type: data["type"],
					images: images
				});
				previous = {
					id: this.props.gallery_id,
					name: data["name"],
					type: data["type"],
					images: images.map((img: Candidate) => img.reduce())
				};
			}
		}
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
				if(id === "url") {
					image.set_url(value);
				} else {
					image[id] = {value: value, error: {active: false, msg: ""}};
					image.update_key();
				}
			}
			return image;
		});
		this.setState({
			images: images
		});
	}

	async save(e: MouseEvent) {

		await this.setState({button: (<span><Icon type="image-rotate" spin /> Speichern...</span>)})

		let correct : boolean = true;

		if(this.state.gallery.value === "") { correct = false; this.setState({gallery: {value: "", error: {active: true, msg: "Bitte gib der Gallery einen Namen!"}}})};

		let images = this.state.images.map((image: Candidate) => {
			if(image.get_name().value === "") {correct = false; image.set_name({value: "", error: {active: true, msg: "Bitte gib den Namen der Person an!"}})};
			if(image.get_email().value !== "" && !validator.validate(image.get_email().value)) {correct = false; image.set_email({value: image.get_email().value, error: {active: true, msg: "Bitte gib die gültige E-Mail-Adresse der Person an!"}})};

			return image;
		});

		this.setState({images: images});

		if(!correct) {
			await this.setState({button: "Speichern"});
			return;
		}

		let events = EventHandler.create_event_loop(previous, {
			name: this.state.gallery.value,
			type: this.state.type,
			images: this.state.images.map((img: Candidate) => img.reduce())
		});

		console.log(events.length);

		if(events.length === 0) {
			await this.setState({button: "Speichern"});
			return;
		}

		let response : Response = await APIHandler.post("handle_gallery", events);

		if(response.hasSuccess())
		{
			previous = {
				id: this.props.gallery_id,
				name: this.state.gallery.value,
				type: this.state.type,
				images: this.state.images.map((img: Candidate) => img.reduce())
			};
			let i : Candidate[] = this.state.images.map((img: Candidate) => {img.reset(); return img;});
			await this.setState({images: i, button: "Speichern", help: {text: "Galerie erfolgreich gespeichert", color: "green"}});
		} else {
			await this.setState({button: "Speichern", help: {text: "Fehler beim Speichern", color: "red"}});
		}

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
					<Select id="type" update={this.update} options={[{key: "board", value: "Vorstand"}, {key: "delegates", value: "Delegierte"}, {key: "mandates", value: "Mandatsträger*innen"}]}></Select>
				</FormGroup>
				<FormGroup>
					<ImageForm type={this.state.type} id="images" images={this.state.images} update={this.update} updateImage={this.updateImage} />
				</FormGroup>
				<div className="cg_button_group">
					<Button color="green" callback={this.save} >{this.state.button}</Button> 
					<HelpText color={this.state.help.color}>{this.state.help.text}</HelpText>
				</div>

			</form>
		);
	}

}