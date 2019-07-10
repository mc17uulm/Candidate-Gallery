import React, {Component} from "react";

interface ImageGalleryProps {
	images: any[]
}

export default class ImageGallery extends Component<ImageGalleryProps>
{

	constructor(props: ImageGalleryProps)
	{
		super(props);
	}

	render()
	{
		return (
			<div className="cg_gallery_container">
				{this.props.images.map(image => (
					<div className="cg_image_container">		
						<img className="cg_image" src={image.url}/>
					</div>
				))}
			</div>
		);
	}

}