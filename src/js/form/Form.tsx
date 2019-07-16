import React, {Component, FormEvent, ReactNode, MouseEvent} from "react";
import validator from "email-validator";
import FontAwesome from "react-fontawesome";
import FormGroup from "./FormGroup";
import Input, { InputObject } from "./Input";
import ImageForm from "./ImageForm";
import Select from "./Select";
import Candidate from "../classes/Candidate";
import APIHandler from "../classes/APIHandler";
import Response from "../classes/Response";
import Button from "./Button";
import HelpText from "./HelpText";
import EventHandler, { Container } from "../classes/EventHandler";

interface FormProps {
	gallery_id?: number,
	type: "add" | "edit"
}

interface FormState {
	gallery: InputObject<string>,
	type: string,
	images: Candidate[],
	button: ReactNode,
	help: {
		text: string,
		color?: "green" | "red",
		fade?: boolean 
	},
	previous?: Container
}

export default class Form extends Component<FormProps, FormState>
{

	constructor(props: FormProps)
	{
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);

		this.state = {
			gallery: {value: "", error: {active: false}},
			type: "board",
			images: [],
			button: (<React.Fragment><FontAwesome name="cloud-upload" /> Speichern</React.Fragment>),
			help: {text: ""}
		}

		this.update = this.update.bind(this);
		this.updateImage = this.updateImage.bind(this);
		this.save = this.save.bind(this);
		this.get_data = this.get_data.bind(this);
	}

	async componentWillMount()
	{
		await this.get_data();
	}

	async get_data(gallery_id : number = -1) {

		if(this.props.gallery_id || gallery_id !== -1)
		{
			let id = this.props.gallery_id || gallery_id;
			let resp : Response = await APIHandler.post("get_gallery", {id: id});
			
			if(resp.hasSuccess())
			{
				let data = resp.getData();
				let images : Candidate[] = data["pictures"].map(image => {
					let c = new Candidate(image.picture, image.id, image.name, image.email, image.function, image.statement);
					c.set_position(image.position);
					c.reset();
					return c;
				});

				// Sort images for right position
				images.sort((a: Candidate, b: Candidate) => {
					return a.get_position() - b.get_position();
				});
				await this.setState({
					gallery: {value: data["name"], error: {active: false, msg: ""}},
					type: data["type"],
					images: images,
					previous: {
						id: id,
						name: data["name"],
						type: data["type"],
						images: images.map((img: Candidate) => img.reduce())
					}
				});
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
		} as Pick<FormState, keyof FormState>);
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

		await this.setState({button: (<React.Fragment><FontAwesome spin name="cog" /> Speichern ...</React.Fragment>)})

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

		let events = EventHandler.create_event_loop(this.state.previous, {
			name: this.state.gallery.value,
			type: this.state.type,
			images: this.state.images.map((img: Candidate) => img.reduce())
		});

		if(events.length === 0) {
			await this.setState({button: "Speichern"});
			return;
		}

		let gallery_hash = "";
		if(events[0].category === "gallery" && events[0].type === "add")
		{
			gallery_hash = events[0].hash;
		}

		let response : Response = await APIHandler.post("handle_gallery", events);

		let help;
		if(response.hasSuccess())
		{
			if(gallery_hash !== "")
			{
				let d : any[] = response.getData();
				let id = d.filter(el => el.event === gallery_hash)[0].id;
				await this.get_data(id);
			} else {
				await this.get_data();
			}
			help = {text: "Galerie erfolgreich gespeichert", color: "green", fade: true};
		} else {
			help = {text: "Fehler beim Speichern", color: "red"};
		}
		await this.setState({button: <React.Fragment><FontAwesome name="cloud-upload" /> Speichern</React.Fragment>, help: help});

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
					<HelpText fade={this.state.help.fade} color={this.state.help.color}>{this.state.help.text}</HelpText>
				</div>

			</form>
		);
	}

}