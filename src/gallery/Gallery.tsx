import React, {Component, MouseEvent} from "react";
import GalleryPreview from "./GalleryPreview";
import { Vars } from "../App";

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
		window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname + "?page=cg_edit_gallery&id=" + this.props.id;
	}

	render()
	{
		return (
			<div className="cg_gallery_box" onClick={this.handleClick}>
				<h3 className="cg_title cg_gallery_label">{this.props.name}</h3>
				<GalleryPreview images={this.props.pictures} />
			</div>
		);
	}

}