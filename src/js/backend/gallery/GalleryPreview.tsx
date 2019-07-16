import React, {Component} from "react";
import { Vars } from "../App";

declare var cg_vars : Vars;

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
		let arr = this.props.images.slice(0, 4);
		while (arr.length < 4) {
			arr.push("");
		}
		
		return (
			<div className="cg_gallery_preview">
				{arr.map(img => {
					return img === "" ? (
						<img className="cg_gallery_image" src={cg_vars.base + "lib/img_background.png"} />
					) : (
						<img className="cg_gallery_image" src={img} />
					)
				})}
			</div>
		);
	}

}