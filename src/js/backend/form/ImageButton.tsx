import React, {Component, MouseEvent} from "react";
import FontAwesome from "react-fontawesome";
import Candidate from "../classes/Candidate";

declare var wp: any;

interface ImageButtonProps {
	size: number,
	add: (image: Candidate) => void
}

export default class ImageButton extends Component<ImageButtonProps>
{

	constructor(props: ImageButtonProps)
	{
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e: MouseEvent)
	{
		e.preventDefault();
		if(typeof wp !== 'undefined' && wp.media && wp.media.editor)
		{
			wp.media.editor.send.attachment = (props: any, attachment: any) => {
				let candidate = new Candidate(attachment.sizes.medium.url || attachment.url);
				candidate.set_position(this.props.size);
				this.props.add(candidate);
			};
		}

		wp.media.editor.open(document.getElementById('cg_set_images'));
		return false;
		
	}

	render()
	{
		return (
			<button className="cg_button" onClick={this.handleClick}><FontAwesome name="plus" /> Bilder hinzufügen</button>
		);
	}

}