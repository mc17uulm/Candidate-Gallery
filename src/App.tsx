import React , {Component} from "react";
import NameForm from "./add_form/NameForm";

interface AppProps {}

export default class App extends Component<AppProps>
{

    constructor(props: AppProps)
    {
        super(props);
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