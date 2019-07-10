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
			images: [{
				url: "http://localhost:8000/wp-content/uploads/2019/07/64928238_2185936344788204_8829693217084538880_o.jpg",
				id: 1
			}, {
				url: "http://localhost:8000/wp-content/uploads/2019/07/action-astronomy-constellation-1274260.jpg",
				id: 2
			}]
		}

		this.addImage = this.addImage.bind(this);
		this.deleteImage = this.deleteImage.bind(this);
	}

	addImage(image: any)
	{
		let images = this.state.images;
		images.push(image);
		this.setState({images: images});
	}

	deleteImage(id: number)
	{
		console.log(this.state.images);
		let images = this.state.images.filter(el => el.id !== id);
		console.log(images);
		this.setState({images: images});
	}

	render()
	{
		return (
			<div>
				<ImageButton add={this.addImage} />
				<ImageGallery images={this.state.images} onDelete={this.deleteImage} />
			</div>
		);
	}

}