import React, {Component} from "react";
import ImageButton from "./ImageButton";
import ImageGallery from "./ImageGallery";
import arrayMove from "array-move";
import Candidate from "../classes/Candidate";

interface ImageFormProps {
	id: string,
	images: Candidate[],
	type: string,
	update: (id: string, value: Candidate[]) => void,
	updateImage: (id: string, value: any, index: number) => void
}

export default class ImageForm extends Component<ImageFormProps>
{

	constructor(props: ImageFormProps)
	{
		super(props);

		this.addImage = this.addImage.bind(this);
		this.deleteImage = this.deleteImage.bind(this);
		this.onSortEnd = this.onSortEnd.bind(this);
	}

	addImage(image: Candidate)
	{
		let images = this.props.images;
		images.push(image);
		this.props.update(this.props.id, images);
	}

	deleteImage(id: number)
	{
		let images = this.props.images.filter(el => el.id !== id);
		this.props.update(this.props.id, images);
	}

	onSortEnd({oldIndex, newIndex})
	{
		let images = arrayMove(this.props.images, oldIndex, newIndex);
		this.props.update(this.props.id, images);
	}

	render()
	{
		return (
			<div>
				<ImageButton add={this.addImage} />
				<ImageGallery type={this.props.type} useDragHandle={true} axis="xy" images={this.props.images} onDelete={this.deleteImage} onSortEnd={this.onSortEnd} update={this.props.updateImage}/>
			</div>
		);
	}

}