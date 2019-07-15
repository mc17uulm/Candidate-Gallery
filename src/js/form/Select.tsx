import React, {Component, ChangeEvent} from "react";
import shortid from "shortid";

export type SelectValue = {
	key: string,
	value: string
}

interface SelectProps {
	id: string,
	options: SelectValue[],
	small?: boolean,
	update: (id: string, value: string) => void
}

interface SelectState {
	value: string
}

export default class Select extends Component<SelectProps, SelectState>
{

	static defaultProps = {
		small: false
	}

	constructor(props: SelectProps)
	{
		super(props);

		this.state = {
			value: this.props.options[0].value || ""
		}

		this.handleChange = this.handleChange.bind(this);
	}

	async handleChange(e: ChangeEvent<HTMLSelectElement>)
	{
		this.setState({
			value: e.target.value
		});
		this.props.update(this.props.id, e.target.value);
	}

	render()
	{
		return (
			<select className={"form-control cg_input" + (this.props.small ? " cg_sm" : "")} onChange={this.handleChange} value={this.state.value}>
				{this.props.options.map((option: SelectValue) => (
					<option key={shortid.generate()} value={option.key}>{option.value}</option>
				))}
			</select>
		);
	}

}