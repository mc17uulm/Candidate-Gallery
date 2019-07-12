import React, {Component, ReactNode} from "react";

interface HelpTextProps {
	children?: ReactNode[] | ReactNode
}

export default class HelpText extends Component<HelpTextProps>
{

	constructor(props: HelpTextProps)
	{
		super(props);
	}

	render()
	{
		return (
			<div className="cg_help_text">
				{this.props.children}
			</div>
		);
	}

}