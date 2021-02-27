import { ReactNode, MouseEvent } from "react";
import Button from "./Button";

export default class Modal {

    private content : ReactNode[] | ReactNode;
    private button : Button;
    private hidden: boolean;
    close: (e: MouseEvent) => void;

    public constructor(close: (e: MouseEvent) => void, content: ReactNode[] | ReactNode = "", button: Button = null, hidden: boolean = true)
    {
        this.content = content;
        this.button = button;
        this.hidden = hidden;
        this.close = close;
    }

    public get_content()
    {
        return this.content;
    }

    public set_content(content: ReactNode[] | ReactNode)
    {
        this.content = content;
    }

    public get_button()
    {
        return this.button;
    }

    public set_button(button : Button)
    {
        this.button = button;
    }

    public is_hidden()
    {
        return this.hidden;
    }

    public set_hidden(hidden: boolean)
    {
        this.hidden = hidden;
    }

}