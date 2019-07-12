import React, {Component} from "react";
import NameForm from "../add_form/NameForm";

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
                <NameForm />
            </div>
		);
	}

}