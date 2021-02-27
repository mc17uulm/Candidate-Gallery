import React, {Component, ReactNode, MouseEvent, ChangeEvent} from "react";
import shortid from "shortid";

interface FileButtonProps {
	children?: ReactNode[] | ReactNode,
	types?: string[],
	handleFiles: (files: FileList) => void
}

interface FileButtonState {
	id: string
}

export default class FileButton extends Component<FileButtonProps, FileButtonState>
{

	static defaultProps = {
		types: []
	}

	constructor(props: FileButtonProps)
	{
		super(props);

		this.state = {
			id: shortid.generate()
		}

		this.handleClick = this.handleClick.bind(this);
		this.submit = this.submit.bind(this);
	}

	handleClick(e: MouseEvent)
	{
		e.preventDefault();

		document.getElementById(this.state.id).click();
	}

	submit(e: ChangeEvent<HTMLInputElement>)
	{
		e.preventDefault();
		this.props.handleFiles(e.target.files);
	}

	render()
	{
		return (
			<React.Fragment>
				<button className="cg_button" onClick={this.handleClick}>{this.props.children}</button>
				<input id={this.state.id} type="file" onChange={this.submit} accept={this.props.types.length > 0 ? this.props.types.join() : ""} />
			</React.Fragment>
		);
	}

}