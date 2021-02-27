import React, {Component, ReactNode} from "react";

interface IconProps {
	type: string,
	spin?: boolean,
	size?: number
}

export default class Icon extends Component<IconProps>
{

	static defaultProps = {
		spin: false,
		size: 10
	}

	constructor(props: IconProps)
	{
		super(props);
	}

	render()
	{
		return (
			<span className={"dashicons dashicons-" + this.props.type + (this.props.spin ? " spin" : "")} style={{fontSize: this.props.size + "px"}}>
			</span>
		);
	}

}