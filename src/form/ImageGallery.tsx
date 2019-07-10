import React, {Component} from "react";
import Image from "./Image";

interface ImageGalleryProps {
	images: any[],
	onDelete: (id: number) => void
}

export default class ImageGallery extends Component<ImageGalleryProps>
{

	constructor(props: ImageGalleryProps)
	{
		super(props);
	}

	render()
	{
		return (
			<div className="cg_gallery_container">
				{this.props.images.length > 0 ? this.props.images.map(image => (		
					<Image id={image.id} url={image.url} onDelete={this.props.onDelete} />
				)) : (
					<span className="cg_gallery_container_info">No files selected</span>
				)}
			</div>
		);
	}

}