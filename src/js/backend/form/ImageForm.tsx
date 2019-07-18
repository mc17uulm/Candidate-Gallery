import React, {Component, MouseEvent} from "react";
import FontAwesome from "react-fontawesome";
import ImageButton from "./ImageButton";
import ImageGallery from "./ImageGallery";
import arrayMove from "array-move";
import Candidate from "../classes/Candidate";
import Button from "./Button";
import ButtonGroup from "./ButtonGroup";
import FileButton from "./FileButton";

interface ImageFormProps {
	id: string,
	images: Candidate[],
	type: string,
	handleFiles: (files: FileList) => void,
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

	deleteImage(key: string)
	{
		let images = this.props.images.filter(el => el.get_key() !== key);
		this.props.update(this.props.id, images);
	}

	onSortEnd({oldIndex, newIndex})
	{
		let images = arrayMove(this.props.images, oldIndex, newIndex);
		this.props.update(this.props.id, images.map((img: Candidate, index: number) => {
			img.set_position(index);
			return img;
		}));
	}

	render()
	{
		return (
			<div>
				<ButtonGroup>
					<ImageButton size={this.props.images.length} add={this.addImage} />
					<FileButton types={["application/json"]} handleFiles={this.props.handleFiles}><FontAwesome name="cloud-upload" /> Datensatz hochladen</FileButton>
				</ButtonGroup>
				<ImageGallery type={this.props.type} useDragHandle={true} axis="xy" images={this.props.images} onDelete={this.deleteImage} onSortEnd={this.onSortEnd} update={this.props.updateImage} addImage={this.addImage}/>
			</div>
		);
	}

}