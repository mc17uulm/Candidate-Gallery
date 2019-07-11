import React, {Component} from "react";
import {SortableContainer} from "react-sortable-hoc";
import Image, { GalleryImage } from "./Image";
import { GalleryType } from "../add_form/NameForm";

interface ImageGalleryProps {
	images: GalleryImage[],
	type: GalleryType,
	onDelete: (id: number) => void
}

class ImageGallery extends Component<ImageGalleryProps>
{

	constructor(props: ImageGalleryProps)
	{
		super(props);
	}

	render()
	{
		return (
			<div className="cg_gallery_container">
				{this.props.images.length > 0 ? this.props.images.map((image, index) => (		
						<Image type={this.props.type} index={index} key={`image-${index}`} id={image.id} url={image.url} onDelete={this.props.onDelete} />
						
				)) : (
					<span className="cg_gallery_container_info">No files selected</span>
				)}
			</div>
		);
	}

}

export default SortableContainer(ImageGallery);