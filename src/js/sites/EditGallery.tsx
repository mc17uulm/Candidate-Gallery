import React, {Component} from "react";
import NameForm from "../add_form/NameForm";

interface EditGalleryProps {
	id: number
}

export default class EditGallery extends Component<EditGalleryProps>
{

	constructor(props: EditGalleryProps)
	{
		super(props);

	}

	render()
	{
		return (
			<div className="cg_box">
                <h1 className="cg_title">Edit Gallery</h1>
				<NameForm type="edit" gallery_id={this.props.id} />
            </div>
		);
	}

}