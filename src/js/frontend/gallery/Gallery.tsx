import React, {Component} from "react";
import Candidate from "./Candidate";

export interface IGallery {
	name?: string,
	type: string,
	pictures: any[]
}

interface GalleryProps {
	gallery: IGallery,
	loaded: boolean
}

export default class Gallery extends Component<GalleryProps>
{

	constructor(props: GalleryProps)
	{
		super(props);
	
	}

	render()
	{
		if(!this.props.loaded)
		{
			return (
				<div>
					Keine Galerie ausgewählt!
				</div>
			)
		}
		else
		{
			return (
				<div>
					<h2>{this.props.gallery.name}</h2>
					<small>Design: {this.props.gallery.type} | Kandidat*innen: {this.props.gallery.pictures.length}</small>
					{this.props.gallery.pictures.map(el => (
						<Candidate {...el} />
					))}
				</div>
			)
		}
	}

}