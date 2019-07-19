import React, {Component} from "react";
import Form from "../form/Form";

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
                <h1 className="cg_title">Galerie bearbeiten</h1>
				<Form type="edit" gallery_id={this.props.id} />
            </div>
		);
	}

}