import React, {Component, FormEvent, ReactNode, MouseEvent} from "react";
import validator from "email-validator";
import FontAwesome from "react-fontawesome";
import { ToastContainer, toast } from "react-toastify";
import FormGroup from "./FormGroup";
import Input, { InputObject } from "./Input";
import ImageForm from "./ImageForm";
import Select from "./Select";
import Candidate from "../classes/Candidate";
import APIHandler from "../classes/APIHandler";
import Response from "../classes/Response";
import Button from "./Button";
import ButtonClass from "./../classes/Button";
import EventHandler, { Container } from "../classes/EventHandler";
import Modal from "./Modal";
import ModalClass from "./../classes/Modal";
import FileHandler, { JSONSchema } from "../classes/FileHandler";
import { Vars } from "../Backend";
import Shortcode from "./Shortcode";
import Icon from "./Icon";

declare var cg_vars : Vars;

interface FormProps {
	gallery_id?: number,
	type: "add" | "edit"
}

interface FormState {
	id: number,
	gallery: InputObject<string>,
	type: string,
	images: Candidate[],
	button: ReactNode,
	modal: ModalClass,
	previous?: Container
}

const save_btn = <React.Fragment><FontAwesome name="cloud-upload" /> Speichern</React.Fragment>;

export default class Form extends Component<FormProps, FormState>
{

	constructor(props: FormProps)
	{
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);

		this.state = {
			id: this.props.gallery_id || -1,
			gallery: {value: "", error: {active: false}},
			type: "board",
			images: [],
			button: save_btn,
			modal: new ModalClass(this.closeModal)
		}

		this.update = this.update.bind(this);
		this.updateImage = this.updateImage.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.deleteGallery = this.deleteGallery.bind(this);
		this.save = this.save.bind(this);
		this.delete = this.delete.bind(this);
		this.get_data = this.get_data.bind(this);
		this.handle_files = this.handle_files.bind(this);
	}

	async componentWillMount()
	{
		await this.get_data();
	}

	async get_data(gallery_id : number = -1) {

		if(this.props.gallery_id || gallery_id !== -1)
		{
			let id = this.props.gallery_id || gallery_id;
			await this.setState({id: id});
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

	async handleSubmit(e: FormEvent)
	{
		e.preventDefault();
		await this.save(null);
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

	async show_modal(content: ReactNode[] | ReactNode, button: ButtonClass, hidden: boolean)
	{
		let modal : ModalClass = this.state.modal;
		modal.set_content(content);
		modal.set_button(button);
		modal.set_hidden(hidden);
		await this.setState({
			modal: modal
		});
	}

	async closeModal ()
	{
		let modal = this.state.modal;
		modal.set_hidden(true);
		await this.setState({
			modal: modal
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
			await this.setState({button: save_btn});
			toast.error(<React.Fragment><FontAwesome name="exclamation-circle" /> Bitte die benötigten Felder ausfüllen!</React.Fragment>, {
				position: toast.POSITION.TOP_RIGHT
			});
			return;
		}

		let events = EventHandler.create_event_loop(this.state.previous, {
			name: this.state.gallery.value,
			type: this.state.type,
			images: this.state.images.map((img: Candidate) => img.reduce())
		});

		if(events.length === 0) {
			await this.setState({button: save_btn});
			toast.error(<React.Fragment><FontAwesome name="exclamation-circle" /> Bitte die benötigten Felder ausfüllen!</React.Fragment>, {
				position: toast.POSITION.TOP_RIGHT
			});
			return;
		}

		let gallery_hash = "";
		if(events[0].category === "gallery" && events[0].type === "add")
		{
			gallery_hash = events[0].hash;
		}

		let response : Response = await APIHandler.post("handle_gallery", events);

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
			toast.success(<React.Fragment><FontAwesome name="check" /> Galerie erfolgreich gespeichert!</React.Fragment>, {
				position: toast.POSITION.TOP_RIGHT
			});
		} else {
			toast.error(<React.Fragment><FontAwesome name="exclamation-circle" /> Fehler beim Speichern!</React.Fragment>, {
				position: toast.POSITION.TOP_RIGHT
			});
		}
		await this.setState({button: save_btn});

	}

	async deleteGallery(e: MouseEvent)
	{
		e.preventDefault();

		let response : Response = await APIHandler.post("delete_gallery", {id: this.state.previous.id});
		if(response.hasSuccess())
		{
			window.location.href = `${cg_vars.base}?page=candidate-gallery`;
		}
		else
		{
			await this.closeModal();
			toast.error(<React.Fragment><FontAwesome name="exclamation-circle" /> Fehler beim Löschen der Galerie!</React.Fragment>, {
				position: toast.POSITION.TOP_RIGHT
			});
		}
	}

	async delete(e: MouseEvent)
	{
		this.show_modal(
			<h3>Möchten Sie wirklich diese Galerie löschen?</h3>, 
			new ButtonClass(
				"Löschen!", this.deleteGallery, "red"
			), 
			false
		);
	}

	async handle_files(files: FileList)
	{
		if(files.length === 0 || files.length > 1) { 
			toast.error("Dateifehler!", {
				position: toast.POSITION.TOP_RIGHT
			});
			return;
		} 

		let json : any = await FileHandler.read(files.item(0));
		try{
			let content = JSON.parse(json);
			if(FileHandler.validate(content, JSONSchema.MANDATE))
			{
				let images = this.state.images;
				content.map(el => {
					let candidate = new Candidate(
						el.url || "",
						-1,
						el.name || "",
						el.email || "",
						el.function || "",
						el.statement || ""
					);
					candidate.set_position(images.length);
					images.push(candidate);
				});
				await this.setState({images: images});
				toast.success("Datensatz hinzugefügt!", {
					position: toast.POSITION.TOP_RIGHT
				});
			} else {
				toast.error("Dateifehler!", {
					position: toast.POSITION.TOP_RIGHT
				});
			}
		} catch(err) { 
			toast.error("Dateifehler!", {
				position: toast.POSITION.TOP_RIGHT
			});
			return; 
		}
	}
	
	render()
	{
		return (
			<form onSubmit={this.handleSubmit}>
				<div className="cg_form_container">
					<FormGroup left>
						<label className="cg_label">Name der Galerie:</label>
						<Input id="gallery" type="text" value={this.state.gallery} placeholder="Name der Galerie" update={this.update}/>
					</FormGroup>
					<FormGroup right>
						<label className="cg_label">Shortcode:</label>
						<Shortcode id={this.state.id} />
					</FormGroup>
				</div>	
				<div className="cg_form_container">
					<FormGroup>
						<label className="cg_label">Art:</label>
						<Select id="type" update={this.update} options={[{key: "board", value: "Vorstand"}, {key: "delegates", value: "Delegierte"}, {key: "mandates", value: "Mandatsträger*innen"}]}></Select>
					</FormGroup>
				</div>
				<FormGroup>
					<ImageForm type={this.state.type} id="images" images={this.state.images} update={this.update} updateImage={this.updateImage} handleFiles={this.handle_files} />
				</FormGroup>
				<div className="cg_button_group">
					<Button color="green" callback={this.save} >{this.state.button}</Button> 
					<Button right color="red" callback={this.delete}><FontAwesome name="trash" /> Galerie löschen</Button>
				</div>
				<Modal modal={this.state.modal} />
				<ToastContainer />
			</form>
		);
	}

}