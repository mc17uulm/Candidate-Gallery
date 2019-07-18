import React, {Component} from "react";
import Response from "../backend/classes/Response";
import APIHandler from "../backend/classes/APIHandler";

declare var cg_vars : Vars;

interface Vars {
    site: string,
    ajax: string
}

interface FrontendProps {
    id: number
}

export default class Frontend extends Component<FrontendProps>
{

	constructor(props: FrontendProps)
	{
        super(props);

        APIHandler.init();
    }
    
    async componentWillMount()
    {
        let response : Response = await APIHandler.post("get_gallery", {id: this.props.id});
        if(response.hasSuccess())
        {
            console.log(response.getData());
        }
    }

	render()
	{
		return (
			<div>
				Running
			</div>
		);
	}

}