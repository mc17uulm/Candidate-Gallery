import React, {Component} from "react";

interface ImageProps {
	url: string,
	type: "image" | "gallery"
}

interface ImageState {
	loaded: boolean
}

export default class Image extends Component<ImageProps, ImageState>
{

	static defaultProps = {
		type: "image"
	}

	constructor(props: ImageProps)
	{
		super(props);

		this.state = {
			loaded: false
		}

		this.onLoad = this.onLoad.bind(this);
	}

	onLoad()
	{
		this.setState({
			loaded: true
		});
	}

	render()
	{
		return (
			<img style={this.state.loaded ? {} : {visibility: 'hidden'}} className={this.props.type === "image" ? "cg_image" : "cg_gallery_image"} src={this.props.url} onLoad={this.onLoad} />
		);
	}

}