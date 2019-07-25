import React, {Component, MouseEvent} from "react";
import {SortableElement, SortableHandle} from "react-sortable-hoc";
import FontAwesome from "react-fontawesome";
import FormGroup from "./FormGroup";
import Input from "./Input";
import Textarea from "./Textarea";
import CandidateObj from "../classes/Candidate";
import Select from "./Select";
import Icon from "./Icon";
import Button from "./Button";
import Image from "./Image";

declare var wp: any;

const DragHandle = SortableHandle(() => (
	<span className="cg_drag_handle">
		<Icon type="menu" size={25} />
	</span>
	)
);

interface CandidateProps {
	index: number,
	type: string,
	image: CandidateObj,
	onDelete: (key: string) => void,
	update: (id: string, value: any) => void,
	addImage: (image: CandidateObj) => void
}

export interface GalleryImage {
	url: string,
	id: number,
	data: ICandidate
}

export interface ICandidate {
	name: string,
	email: string,
	func: string,
	statement: string,
	job?: string,
	age?: number,
	children?: number,
	grandchildren?: number
}

class Candidate extends Component<CandidateProps>
{

	constructor(props: CandidateProps)
	{
		super(props);

		this.delete = this.delete.bind(this);
		this.addImage = this.addImage.bind(this);
	}

	delete(e: MouseEvent<HTMLButtonElement>)
	{
		e.preventDefault();

		this.props.onDelete(this.props.image.get_key());
	}

	addImage(e: MouseEvent)
	{
		if(typeof wp !== "undefined" && wp.media && wp.media.editor)
		{
			wp.media.editor.send.attachment = (props: any, attachment: any) => {
				this.props.update("url", attachment.url);
			};
		}

		wp.media.editor.open(document.getElementById('cg_set_images'));
		return false;
	}

	render()
	{
		return (
			<div className="cg_image_container">
				{this.props.image.get_url() ? (
					<React.Fragment>
						<Image url={this.props.image.get_url()} />
						<button className="cg_image_button" onClick={this.addImage}><FontAwesome name="refresh" /> Bild ändern</button>
					</React.Fragment>
				) : (<div className="cg_image">
						<Button callback={this.addImage}>Bild hinzufügen</Button>
					</div>)	}
				<FormGroup>
					<Input id="name" type="text" small placeholder="Name..." value={this.props.image.get_name()} update={this.props.update} />
					<Input id="email" type="email" small placeholder="E-Mail-Adresse..." value={this.props.image.get_email()} update={this.props.update} />
					<Input id="func" type="text" small placeholder="Amt/Funktion..." value={this.props.image.get_func()} update={this.props.update} />
					<Textarea id="statement" small placeholder="Statement" value={this.props.image.get_statement()} update={this.props.update} />
					{this.props.type === "candidates" ? (
						<div>
							<Input id="job" type="text" small placeholder="Beruf..." value={this.props.image.get_job()} update={this.props.update} />
							<Input id="age" type="number" small placeholder="Alter..." value={this.props.image.get_age()} update={this.props.update} />
							<Input id="children" type="number" small placeholder="Kinder..." value={this.props.image.get_children()} update={this.props.update} />
							<Input id="grandchildren" type="number" small placeholder="Enkelkinder..." value={this.props.image.get_grandchildren()} update={this.props.update} />
							<Select id="family" small options={[{key: "ledig", value: "Ledig"}, {key: "verheiratet", value: "verheiratet"}, {key: "geschieden", value: "geschieden"}, {key: "verwitwet", value: "verwitwet"}]} update={this.props.update} />
						</div>
					) : ""}
					<button className="cg_button cg_button_red" onClick={this.delete}><FontAwesome name="trash" /> Löschen</button>
					<DragHandle />
				</FormGroup>
			</div>
		);
	}

}

export default SortableElement(Candidate);