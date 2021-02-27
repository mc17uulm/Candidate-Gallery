import React, {Component} from "react";
import shortid from "shortid";
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
				<div className="cg_gallery_container">
					<h3>{this.props.gallery.name}</h3>
					{this.props.gallery.pictures.map(el => (
						<Candidate key={shortid.generate()} {...el} />
					))}
				</div>
			)
		}
	}

}