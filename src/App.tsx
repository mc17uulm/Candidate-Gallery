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
            <div>
                <h1>Add new Gallery</h1>
                <NameForm />
            </div>
        )
    }

}