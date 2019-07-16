import React, {Component, ChangeEvent} from "react";
import shortid from "shortid";
import Response from "./classes/Response";
import APIHandler from "./classes/APIHandler";
import Gallery, { IGallery } from "./gallery/Gallery";

export interface Vars {
    base: string,
    ajax: string
};

interface AppProps {
	type: "edit" | "save"
}

interface AppState {
	galleries: any[],
	value: string,
	id: number,
	loaded: boolean,
	gallery?: IGallery
}

export default class App extends Component<AppProps, AppState>
{

	constructor(props: AppProps)
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
			await this.setState({galleries: response.getData(), value: response.getData()[0].name, id: response.getData()[0].id});
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
		console.log("running");
		if(this.state.id !== -1)
		{
			let response : Response = await APIHandler.post("get_gallery", {id: this.state.id});
			if(response.hasSuccess())
			{
				let data = response.getData();
				await this.setState({
					loaded: true,
					gallery: {
						name: data["name"],
						type: data["type"],
						pictures: data["pictures"]
					}
				});
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
						<label>Galerie auswählen</label>
						<select value={this.state.value} onChange={this.handleChange}>
							{this.state.galleries.map(el => (
								<option key={shortid.generate()} value={el.id}>{el.name}</option>
							))}
						</select>
						<Gallery loaded={this.state.loaded} gallery={this.state.gallery} />
					</div>
				);
			case "save": 
				return (
					<div>
						No Content found
					</div>	
				)
			default:
				return "";	
		}
	}

}