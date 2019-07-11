import React, {Component} from "react";
import ImageButton from "./ImageButton";
import ImageGallery from "./ImageGallery";
import { GalleryImage } from "./Image";
import arrayMove from "array-move";
import { GalleryType } from "../add_form/NameForm";

interface ImageFormProps {
	id: string,
	images: GalleryImage[],
	type: GalleryType,
	update: (id: string, value: GalleryImage[]) => void
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

	addImage(image: GalleryImage)
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
				<ImageGallery type={this.props.type} useDragHandle={true} axis="xy" images={this.props.images} onDelete={this.deleteImage} onSortEnd={this.onSortEnd}/>
			</div>
		);
	}

}