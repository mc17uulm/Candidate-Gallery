import React, {useEffect, Fragment} from "react";
import APIHandler from "./classes/APIHandler";
import AddGallery from "./sites/AddGallery";
import EditGallery from "./sites/EditGallery";
import ParamHandler from "./classes/ParamHandler";
import ShowGallery from "./sites/ShowGallery";
import ReactDOM from "react-dom";

export interface Vars {
    base: string,
    plugin_dir_base: string,
    site: string,
    ajax: string
}

declare var cg_vars : Vars;

const Backend = () => {

    useEffect(() => {
        APIHandler.init();
    }, []);

    switch(cg_vars.site) {
        case 'cg_add_gallery':
            return <AddGallery />;
        case 'cg_edit_gallery':
            const id : number = parseInt(ParamHandler.get_queries().id);
            if(isNaN(id)) {
                return <ShowGallery />
            } else {
                return <EditGallery id={id} />;
            }
        case "candidate-gallery":
            return <ShowGallery />
        default:
            return <Fragment></Fragment>;
    }

}

export const run = () => {
    const elem = document.getElementById("cg_application");
    elem ? ReactDOM.render(<Backend />, elem) : false;
}
