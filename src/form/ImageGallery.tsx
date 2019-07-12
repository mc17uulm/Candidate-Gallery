import React, {Component} from "react";
import {SortableContainer} from "react-sortable-hoc";
import Image from "./Image";
import Candidate from "../classes/Candidate";

interface ImageGalleryProps {
	images: Candidate[],
	type: string,
	onDelete: (id: number) => void,
	update: (id: string, value: any, index: number) => void,
	addImage: (image: Candidate) => void
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
						<Image image={image} type={this.props.type} index={index} key={`image-${index}`} onDelete={this.props.onDelete} update={(id: string, value: any) => {this.props.update(id, value, index)}} addImage={this.props.addImage} />
						
				)) : (
					<span className="cg_gallery_container_info">No files selected</span>
				)}
			</div>
		);
	}

}

export default SortableContainer(ImageGallery);