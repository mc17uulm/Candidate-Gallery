import React, {Component} from "react";

interface CandidateProps {
	id: number,
	name: string,
	picture: string,
	position: number,
	email: string,
	encrypted_email: string,
	function: string,
	statement: string
}

export default class Candidate extends Component<CandidateProps>
{

	constructor(props: CandidateProps)
	{
		super(props);
	}

	render()
	{
		return (
			<div className="cg_image_container">
				<img className="cg_image" src={this.props.picture} alt={this.props.name} />
				<h4>{this.props.name}</h4>
				<span className="cg_image_container_func">{this.props.function}</span><br />
				<strong><a href={"mailto:" + this.props.email}>{this.props.email}</a></strong>
			</div>
		);
	}

}