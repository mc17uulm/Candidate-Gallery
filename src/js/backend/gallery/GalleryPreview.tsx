import React, {Component} from "react";
import shortid from "shortid";
import { Vars } from "../Backend";
import Image from "../form/Image";

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
						<Image key={shortid.generate()} type="gallery" url={cg_vars.plugin_dir_base + "lib/img_background.png"} />
					) : (
						<Image key={shortid.generate()} type="gallery" url={img} />
					)
				})}
			</div>
		);
	}

}