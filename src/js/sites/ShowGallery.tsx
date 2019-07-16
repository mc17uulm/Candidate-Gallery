import React, {Component} from "react";
import shortid from "shortid";
import Response from "../classes/Response";
import APIHandler from "../classes/APIHandler";
import Gallery, { GalleryProps } from "../gallery/Gallery";

interface ShowGalleryProps {}

interface ShowGalleryState {
	galleries: GalleryProps[]
}

export default class ShowGallery extends Component<ShowGalleryProps, ShowGalleryState>
{

	constructor(props: ShowGalleryProps)
	{
		super(props);

		this.state = {
			galleries: []
		}
	}

	async componentWillMount()
	{
		let resp : Response = await APIHandler.post("get_galleries", "");
		
		if(resp.hasSuccess())
		{
			let data : any = resp.getData();
			if(typeof data === "object")
			{
				let galleries : GalleryProps[] = data.map(el => {
					return {id: el.id, name: el.name, pictures: el.pictures.map(pic => {
						return pic.picture;
					})};
				});

				this.setState({galleries: galleries});
			}
		}
	}

	render()
	{
		return (
			<div className="cg_box">
				<h1 className="cg_title">Your Galleries</h1>
				{this.state.galleries.map((el: GalleryProps) => (
					<Gallery key={shortid.generate()} {...el} />
				))}
			</div>
		);
	}

}