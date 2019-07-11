import React, {Component, MouseEvent} from "react";
import {SortableElement, SortableHandle} from "react-sortable-hoc";
import FormGroup from "./FormGroup";
import Input from "./Input";
import Textarea from "./Textarea";
import Candidate from "../classes/Candidate";
import Select from "./Select";

const DragHandle = SortableHandle(() => (
	<span className="cg_drag_handle">
		<div className="dashicons dashicons-menu" style={{fontSize: "25px"}}></div>
	</span>
	)
);

interface ImageProps {
	index: number,
	type: string,
	image: Candidate,
	onDelete: (id: number) => void,
	update: (id: string, value: any) => void
}

export interface GalleryImage {
	url: string,
	id: number,
	data: IImage
}

export interface IImage {
	name: string,
	email: string,
	func: string,
	statement: string,
	job?: string,
	age?: number,
	children?: number,
	grandchildren?: number
}

class Image extends Component<ImageProps>
{

	constructor(props: ImageProps)
	{
		super(props);

		this.delete = this.delete.bind(this);
	}

	delete(e: MouseEvent<HTMLButtonElement>)
	{
		e.preventDefault();

		this.props.onDelete(this.props.image.id);
	}

	render()
	{
		return (
			<div className="cg_image_container">
				<img className="cg_image" src={this.props.image.url}/>
				<FormGroup>
					<Input id="name" type="text" small placeholder="Name..." value={this.props.image.name} update={this.props.update} />
					<Input id="email" type="email" small placeholder="E-Mail-Adresse..." value={this.props.image.email} update={this.props.update} />
					<Input id="func" type="text" small placeholder="Function..." value={this.props.image.func} update={this.props.update} />
					<Textarea id="statement" small placeholder="Statement" value={this.props.image.statement} update={this.props.update} />
					{this.props.type === "candidates" ? (
						<div>
							<Input id="job" type="text" small placeholder="Beruf..." value={this.props.image.name} update={this.props.update} />
							<Input id="age" type="number" small placeholder="Alter..." value={this.props.image.age} update={this.props.update} />
							<Input id="children" type="number" small placeholder="Kinder..." value={this.props.image.children} update={this.props.update} />
							<Input id="grandchildren" type="number" small placeholder="Enkelkinder..." value={this.props.image.grandchildren} update={this.props.update} />
							<Select id="family" small options={[{key: "ledig", value: "Ledig"}, {key: "verheiratet", value: "verheiratet"}, {key: "geschieden", value: "geschieden"}, {key: "verwitwet", value: "verwitwet"}]} update={this.props.update} />
						</div>
					) : ""}
					<button className="cg_button pull-left" onClick={this.delete}>Delete</button>
					<DragHandle />
				</FormGroup>
			</div>
		);
	}

}

export default SortableElement(Image);