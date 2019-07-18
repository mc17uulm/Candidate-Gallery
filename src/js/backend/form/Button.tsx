import React, {Component, MouseEvent, ReactNode} from "react";

interface ButtonProps {
	children?: ReactNode[] | ReactNode,
	color?: "red" | "green" | "blue" | "white",
	right?: boolean,
	disabled?: boolean,
	callback: (e: MouseEvent, ...args: any[]) => void
}

export default class Button extends Component<ButtonProps>
{

	static defaultProps = {
		right: false,
		disabled: false
	}

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
			<button className={"cg_button" + (this.props.color ? " cg_button_" + this.props.color : "")} onClick={this.handleClick} style={this.props.right ? {float: "right"} : {}} disabled={this.props.disabled}>
				{this.props.children}
			</button>
		);
	}

}