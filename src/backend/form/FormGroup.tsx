import React, {Component, ReactNode} from "react";

interface FormGroupProps {
	children: ReactNode[] | ReactNode,
	right?: boolean
	left?: boolean
}

export default class FormGroup extends Component<FormGroupProps>
{

	static defaultProps = {
		right: false,
		left: false
	}

	constructor(props: FormGroupProps)
	{
		super(props);
	}

	render()
	{
		return (
			<div className="form-group" style={this.props.right ? {float: "right"} : this.props.left ? {float: "left"} : {}}>
				{this.props.children}
			</div>
		);
	}

}