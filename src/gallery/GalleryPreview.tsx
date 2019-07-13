import React, {Component} from "react";

interface GalleryPreviewProps {
	images: string[]
}

export default class GalleryPreview extends Component<GalleryPreviewProps>
{

	constructor(props: GalleryPreviewProps)
	{
		super(props);
	}

	render()
	{
		return (
			<div className="cg_gallery_preview">
					<img className="cg_gallery_image" src={this.props.images[0] || ""} />
					<img className="cg_gallery_image" src={this.props.images[1] || ""} />
					<img className="cg_gallery_image" src={this.props.images[2] || ""} />
					<img className="cg_gallery_image" src={this.props.images[3] || ""} />
			</div>
		);
	}

}