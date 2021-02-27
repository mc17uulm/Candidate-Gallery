import React, {Component} from "react";

interface ShortcodeProps {
	id: number
}

export default class Shortcode extends Component<ShortcodeProps>
{

	constructor(props: ShortcodeProps)
	{
		super(props);
	}

	render()
	{
		return (
			<div className="cg_input_wrapper">
				<div className="cg_shortcode">
					{this.props.id !== -1 ? `[candidate_gallery id=${this.props.id}]` : "Galerie noch nicht gespeichert"}
				</div>
			</div>
		);
	}

}