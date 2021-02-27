import React, {Component} from "react";
import ModalClass from "./../classes/Modal";
import Button from "./Button";

interface ModalProps {
	modal: ModalClass
}

export default class Modal extends Component<ModalProps>
{

	constructor(props: ModalProps)
	{
		super(props);
	}

	render()
	{
		return this.props.modal.is_hidden() ? "" : (
			<div className="cg_modal">
				<div className="cg_modal_body">
					<span className="cg_modal_close" onClick={this.props.modal.close}>&times;</span>
					<div className="cg_modal_content">		
						{this.props.modal.get_content()}
					</div>
					{this.props.modal.close ? (
						<Button callback={this.props.modal.close} >Close</Button>
					): ""}
					{this.props.modal.get_button() ? (
						<Button right color={this.props.modal.get_button().get_color()} callback={this.props.modal.get_button().callback}>{this.props.modal.get_button().get_title()}</Button>
					) : ""}
				</div>
			</div>
		);
	}

}