import React, {Component, MouseEvent} from "react";
import {SortableElement, SortableHandle} from "react-sortable-hoc";
import FormGroup from "./FormGroup";
import { GalleryType } from "../add_form/NameForm";

const DragHandle = SortableHandle(() => (
	<span className="cg_drag_handle">
		<div className="dashicons dashicons-menu" style={{fontSize: "25px"}}></div>
	</span>
	)
);

interface ImageProps {
	url: string,
	id: number,
	index: number,
	type: GalleryType,
	onDelete: (id: number) => void
}

export interface GalleryImage {
	url: string,
	id: number
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

		this.props.onDelete(this.props.id);
	}

	render()
	{
		console.log(this.props.type);
		return (
			<div className="cg_image_container">
				<img className="cg_image" src={this.props.url}/>
				<FormGroup>
					<input type="text" className="form-control cg_input cg_sm" placeholder="Name..." />
					<input type="email" className="form-control cg_input cg_sm" placeholder="E-Mail-Adresse..." />
					<input type="text" className="form-control cg_input cg_sm" placeholder="Funktion..." />
					<textarea className="form-control cg_textarea cg_sm" placeholder="Statement">
					</textarea>
					{this.props.type === GalleryType.Candidates ? (
						<div>
							<input type="text" className="form-control cg_input cg_sm" placeholder="Beruf..." />
							<input type="number" className="form-control cg_input cg_sm" placeholder="Alter..." />
							<input type="number" className="form-control cg_input cg_sm" placeholder="Kinder..." />
							<input type="number" className="form-control cg_input cg_sm" placeholder="Enkelkinder..." />
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