import React, {Component, ReactNode} from "react";

interface HelpTextProps {
	children?: ReactNode[] | ReactNode,
	color?: "green" | "red"
}

export default class HelpText extends Component<HelpTextProps>
{

	static defaultProps = {
		color: "green"
	}

	constructor(props: HelpTextProps)
	{
		super(props);
	}

	render()
	{
		return (
			<div className={"cg_help_text" + (this.props.color === "green" ? " cg_green" : "cg_red")}>
				{this.props.children}
			</div>
		);
	}

}