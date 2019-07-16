import React, {Component} from "react";
import Form from "../form/Form";

interface AddGalleryProps {}

export default class AddGallery extends Component<AddGalleryProps>
{

	constructor(props: AddGalleryProps)
	{
		super(props);
	}

	render()
	{
		return (
			<div className="cg_box">
                <h1 className="cg_title">Add new Gallery</h1>
                <Form type="add" />
            </div>
		);
	}

}