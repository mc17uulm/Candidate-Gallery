import React, {Component} from "react";

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
	}

	render()
	{
		return (
			<div>
				<h3 className="cg_title">{this.props.name}</h3>
				<small style={{color: "white"}}>{this.props.pictures.length} Pictures</small>
			</div>
		);
	}

}