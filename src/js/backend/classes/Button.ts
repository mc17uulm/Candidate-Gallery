import { ReactNode, MouseEvent } from "react";

export default class Button
{

    private color: "red" | "green" | "default";
    private title: ReactNode;
    callback: (e: MouseEvent) => void;

    public constructor(title: string, callback: (e: MouseEvent) => void, color: "red" | "green" | "default" = "default")
    {
        this.title = title;
        this.callback = callback;
        this.color = color;
    }

    public get_color()
    {
        return this.color;
    }

    public get_title()
    {
        return this.title;
    }

}