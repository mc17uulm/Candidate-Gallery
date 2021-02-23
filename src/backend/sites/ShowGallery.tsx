import React, {Component} from "react";
import shortid from "shortid";
import Response from "../classes/Response";
import APIHandler from "../classes/APIHandler";
import Gallery, { GalleryProps } from "../gallery/Gallery";
import Menu from "./main/Menu";

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
				<h1 className="cg_title">Candidate Gallery <small>Version 1.0</small></h1>
				<Menu />
				<h3 className="cg_title">Deine Galerien</h3>
				{this.state.galleries.map((el: GalleryProps) => (
					<Gallery key={shortid.generate()} {...el} />
				))}
			</div>
		);
	}

}