import React, {Component} from "react";
import shortid from "shortid";
import { Vars } from "../../App";

declare var cg_vars : Vars;

interface MenuProps {

}

export default class Menu extends Component<MenuProps>
{

	constructor(props: MenuProps)
	{
		super(props);

		console.log(cg_vars);
	}

	render()
	{
		return (
			<div className="cg_menu">
				<ul className="cg_menu_list">
					<li key={shortid.generate()} className="cg_menu_item"><a href="http://localhost:8000/wp-admin/admin.php?page=cg_add_gallery">Neue Galerie</a></li>
					<li key={shortid.generate()} className="cg_menu_item"><a href="http://localhost:8000/wp-admin/admin.php?page=cg_data">Datensätze</a></li>
				</ul>
			</div>
		);
	}

}