import React, {Component} from "react";
import ImageButton from "./ImageButton";
import ImageGallery from "./ImageGallery";

interface ImageFormProps {

}

interface ImageFormState {
	images: any[]
}

export default class ImageForm extends Component<ImageFormProps, ImageFormState>
{

	constructor(props: ImageFormProps)
	{
		super(props);

		this.state = {
			images: []
		}

		this.addImage = this.addImage.bind(this);
	}

	addImage(image: any)
	{
		let images = this.state.images;
		images.push(image);
		this.setState({images: images});
	}

	render()
	{
		return (
			<div>
				<ImageButton add={this.addImage} />
				<ImageGallery images={this.state.images} />
			</div>
		);
	}

}