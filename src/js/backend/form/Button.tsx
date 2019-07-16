import React, {Component, MouseEvent, ReactNode} from "react";

interface ButtonProps {
	children?: ReactNode[] | ReactNode,
	color?: "red" | "green" | "blue",
	callback: (e: MouseEvent) => void
}

export default class Button extends Component<ButtonProps>
{

	constructor(props: ButtonProps)
	{
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e: MouseEvent)
	{
		e.preventDefault();
		this.props.callback(e);
	}

	render()
	{
		return (
			<button className={"cg_button" + (this.props.color ? " cg_button_" + this.props.color : "")} onClick={this.handleClick}>
				{this.props.children}
			</button>
		);
	}

}