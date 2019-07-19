import React, {Component} from "react";
import Response from "../backend/classes/Response";
import APIHandler from "../backend/classes/APIHandler";
import { CandidateObject } from "../backend/classes/Candidate";
import shortid from "shortid";
import Candidate from "../gutenberg/gallery/Candidate";
import { IGallery } from "../gutenberg/gallery/Gallery";

declare var cg_vars : Vars;

interface Vars {
    site: string,
    ajax: string
}

interface FrontendProps {
    id: number
}

interface FrontendState {
    gallery?: IGallery
}

export default class Frontend extends Component<FrontendProps, FrontendState>
{

	constructor(props: FrontendProps)
	{
        super(props);

        this.state = {}

        APIHandler.init();
    }
    
    async componentWillMount()
    {
        let response : Response = await APIHandler.post("get_gallery", {id: this.props.id});
        if(response.hasSuccess())
        {
            let data = response.getData();
            let pictures = data.pictures.sort((a, b) => {
                return a.position - b.position;
            })
            data.pictures = pictures;
            await this.setState({
                gallery: data
            });
        }
    }

	render()
	{
        if(typeof this.state.gallery === "undefined")
        {
            return <div>Loading...</div>
        }
        else
        {
            return (
                <div className="cg_gallery_container">
                    <h3>{this.state.gallery.name}</h3>
                    {this.state.gallery.pictures.map(el => (
                        <Candidate key={shortid.generate()} {...el} />
                    ))}
                </div>
            )
        }
	}

}