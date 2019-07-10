import React, {Component, MouseEvent} from "react";

declare var wp: any;

interface ImageButtonProps {
	add: (image: any) => void
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
				this.props.add(attachment);
			}
			wp.media.editor.open(document.getElementById('cg_set_images'));
			return false;
		}
	}

	render()
	{
		return (
			<div>
				<button className="cg_button" onClick={this.handleClick}>Add Images</button>
			</div>
		);
	}

}