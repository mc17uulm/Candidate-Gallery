import React, {Component, ChangeEvent} from "react";
import { GalleryType } from "../add_form/NameForm";

interface SelectProps {
	id: string,
	update: (id: string, value: GalleryType) => void
}

export default class Select extends Component<SelectProps>
{

	constructor(props: SelectProps)
	{
		super(props);

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e: ChangeEvent<HTMLSelectElement>)
	{
		let type : GalleryType;
		switch(e.target.value)
		{
			case "delegates": type = GalleryType.Delegates;
				break;
			case "candidates": type = GalleryType.Candidates;
				break;
			case "mandates": type = GalleryType.Mandates;
				break;	
			case "board": 
			default:
				type = GalleryType.Board;
				break;	
		}
		this.props.update(this.props.id, type);
	}

	render()
	{
		return (
			<select className="form-control cg_input" onChange={this.handleChange}>
				<option value={GalleryType.Board}>Vorstand</option>
				<option value={GalleryType.Delegates}>Delegierte</option>
				<option value={GalleryType.Candidates}>Kandidat*innen</option>
				<option value={GalleryType.Mandates}>Mandatsträger*innen</option>
			</select>
		);
	}

}