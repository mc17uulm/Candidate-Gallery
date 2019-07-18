import React, {Component, MouseEvent, ReactNode} from "react";
import Button from "./Button";

export interface AcceptButton {
	color: "green" | "red" | "blue" | "white",
	title: string,
	callback: (e: MouseEvent) => void
}

export interface ModalProps {
	hidden: boolean,
	close?: (e: MouseEvent) => void,
	button?: AcceptButton,
	content?: ReactNode[] | ReactNode
}

export default class Modal extends Component<ModalProps>
{

	constructor(props: ModalProps)
	{
		super(props);
	}

	render()
	{
		return this.props.hidden ? "" : (
			<div className="cg_modal">
				<div className="cg_modal_body">
					<span className="cg_modal_close" onClick={this.props.close}>&times;</span>
					<div className="cg_modal_content">		
						{this.props.content}
					</div>
					{this.props.close ? (
						<Button color="white" callback={this.props.close} >Close</Button>
					): ""}
					{this.props.button ? (
						<Button right color={this.props.button.color} callback={this.props.button.callback}>{this.props.button.title}</Button>
					) : ""}
				</div>
			</div>
		);
	}

}