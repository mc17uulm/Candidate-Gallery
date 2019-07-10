import React, {Component, ChangeEvent, MouseEvent} from "react";
import FormGroup from "./FormGroup";

interface ImageProps {
	url: string,
	id: number,
	onDelete: (id: number) => void
}

export default class Image extends Component<ImageProps>
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
		return (
			<div className="cg_image_container">
				<img className="cg_image" src={this.props.url}/>
				<FormGroup>
					<input type="text" className="form-control cg_input cg_sm" placeholder="Name..." />
					<input type="email" className="form-control cg_input cg_sm" placeholder="E-Mail-Adresse..." />
					<input type="text" className="form-control cg_input cg_sm" placeholder="Funktion..." />
					<textarea className="form-control cg_textarea cg_sm" placeholder="Statement">
					</textarea>
					<button className="cg_button pull-left" onClick={this.delete}>Delete</button>
				</FormGroup>
			</div>
		);
	}

}