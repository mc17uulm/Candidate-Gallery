import React, {Component, MouseEvent} from "react";
import Candidate from "../classes/Candidate";

declare var wp: any;

interface ImageButtonProps {
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
				this.props.add(new Candidate(attachment.url));
			};
		}

		wp.media.editor.open(document.getElementById('cg_set_images'));
		return false;
		
	}

	render()
	{
		return (
			<button className="cg_button" onClick={this.handleClick}>Add Images</button>
		);
	}

}