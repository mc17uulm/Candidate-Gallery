import React , {Component} from "react";
import NameForm from "./add_form/NameForm";
import APIHandler from "./classes/APIHandler";

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
        return (
            <div className="cg_box">
                <h1 className="cg_title">Add new Gallery</h1>
                <NameForm />
            </div>
        )
    }

}