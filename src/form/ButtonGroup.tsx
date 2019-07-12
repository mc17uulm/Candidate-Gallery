import React, {Component, ReactNode} from "react";

interface ButtonGroupProps {
	children?: ReactNode[] | ReactNode
}

export default class ButtonGroup extends Component<ButtonGroupProps>
{

	constructor(props: ButtonGroupProps)
	{
		super(props);
	}

	render()
	{
		return (
			<div className="cg_button_group">
				{this.props.children}
			</div>
		);
	}

}