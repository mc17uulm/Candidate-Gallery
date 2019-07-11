import React, {Component, ReactNode} from "react";

interface FormGroupProps {
	children: ReactNode[] | ReactNode
}

export default class FormGroup extends Component<FormGroupProps>
{

	constructor(props: FormGroupProps)
	{
		super(props);
	}

	render()
	{
		return (
			<div className="form-group">
				{this.props.children}
			</div>
		);
	}

}