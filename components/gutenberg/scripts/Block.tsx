import React, {Component, ChangeEvent} from "react";
import shortid from "shortid";
import Response from "./classes/Response";
import APIHandler from "./classes/APIHandler";
import Gallery, { IGallery } from "./gallery/Gallery";

export interface Vars {
    base: string,
    ajax: string
};

interface BlockProps {
	type: "edit" | "save",
	attributes: {
		gallery: any
	},
	setAttributes: (attributes: any) => void
}

interface BlockState {
	galleries: any[],
	value: string,
	id: number,
	loaded: boolean,
	gallery?: IGallery
}

export default class App extends Component<BlockProps, BlockState>
{

	constructor(props: BlockProps)
	{
		super(props);

		this.state = {
			id: -1,
			value: "",
			galleries: [],
			loaded: false
		}

		APIHandler.init();

		this.handleChange = this.handleChange.bind(this);
		this.update = this.update.bind(this);
	}

	async componentWillMount()
	{
		let response : Response = await APIHandler.post("get_galleries", {});
		if(response.hasSuccess())
		{
			if(typeof this.props.attributes.gallery === "undefined")
			{
				await this.setState({galleries: response.getData(), value: response.getData()[0].name, id: response.getData()[0].id});
			}
			else
			{
				let gallery : any[] = response.getData().filter(el => {
					return el.id === this.props.attributes.gallery.id;
				});
				if(gallery.length > 0) {
					await this.setState({galleries: response.getData(), value: gallery[0].name, id: gallery[0].id});
				}
			}
			await this.update();
		}
	}

	async handleChange(e: ChangeEvent<HTMLSelectElement>)
	{
		await this.setState({
			value: e.target.value,
			id: parseInt(e.target.options[e.target.selectedIndex].value)
		});
		await this.update();
	}

	async update()
	{
		if(this.state.id !== -1)
		{
			let response : Response = await APIHandler.post("get_gallery", {id: this.state.id});
			if(response.hasSuccess())
			{
				let data = response.getData();
				let pictures = data["pictures"].sort((a, b) => {
					return a.position - b.position;
				})
				let gallery = {
					name: data["name"],
					type: data["type"],
					pictures: pictures
				};
				await this.setState({
					loaded: true,
					gallery: gallery
				});
				await this.props.setAttributes({gallery: {id: this.state.id}});
			}
		}
	}

	render()
	{
		switch(this.props.type)
		{
			case "edit":
				return (
					<div>
						<label>Galerie auswählen: </label>
						<select value={this.state.value} onChange={this.handleChange}>
							{this.state.galleries.map(el => (
								<option key={shortid.generate()} value={el.id}>{el.name}</option>
							))}
						</select>
						<Gallery loaded={this.state.loaded} gallery={this.state.gallery} />
					</div>
				);
			case "save": 
				if(typeof this.props.attributes.gallery  === "undefined")
				{
					return (
						<div>
							No Content found
						</div>	
					)
				}
				else
				{
					return (
						<div id="cg_gallery_frontend" defaultValue={this.props.attributes.gallery.id}></div>
					)
				}
			default:
				return "";	
		}
	}

}