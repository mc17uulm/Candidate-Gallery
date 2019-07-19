import React, {Component, MouseEvent} from "react";
import GalleryPreview from "./GalleryPreview";
import { Vars } from "../Backend";

declare var cg_vars : Vars;

export interface GalleryProps {
	id: number,
	name: string,
	pictures: string[]
}

export default class Gallery extends Component<GalleryProps>
{

	constructor(props: GalleryProps)
	{
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e: MouseEvent)
	{
		window.location.href = `${cg_vars.base}?page=cg_edit_gallery&id=${this.props.id}`;
	}

	calculate_margin() : string
	{
		let title = this.props.name;
		let times = Math.ceil(title.length/15);
		if(times > 4) {
			title = title.substr(0, 60);
		}
		let margin = 120 - (times * 15);
		return `${margin}px`;
	}

	render()
	{
		return (
			<div className="cg_gallery_box" onClick={this.handleClick}>
				<h2 className="cg_label cg_gallery_label" style={{fontSize: 20, marginTop: this.calculate_margin()}}>{this.props.name}</h2>
				<GalleryPreview images={this.props.pictures} />
			</div>
		);
	}

}