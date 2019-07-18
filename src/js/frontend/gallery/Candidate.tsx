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
			<div>
				<img src={this.props.picture} alt={this.props.name} style={{width: "400px"}} />
				<h3>{this.props.name}</h3>
				<i>{this.props.function}</i><br />
				<strong><a href={this.props.encrypted_email}>{this.props.encrypted_email}</a></strong>
			</div>
		);
	}

}