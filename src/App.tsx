import React , {Component} from "react";
import APIHandler from "./classes/APIHandler";
import AddGallery from "./sites/AddGallery";
import EditGallery from "./sites/EditGallery";
import ParamHandler from "./classes/ParamHandler";
import ShowGallery from "./sites/ShowGallery";

export interface Vars {
    site: string,
    ajax: string
};

declare var cg_vars : Vars;

interface AppProps {}

export default class App extends Component<AppProps>
{

    constructor(props: AppProps)
    {
        super(props);

        APIHandler.init();

    }

    render()
    {
        console.log(cg_vars);
        switch(cg_vars.site)
        {
            case 'cg_add_gallery':
                return <AddGallery />;
            case 'cg_edit_gallery':
                let id : number = parseInt(ParamHandler.get_queries().id);
                if(isNaN(id)) {
                    return <ShowGallery />
                } else {
                    return <EditGallery id={id} />;
                }
            case "candidate-gallery":
                return <ShowGallery />    
            default:
                return "";    
        }
    }

}