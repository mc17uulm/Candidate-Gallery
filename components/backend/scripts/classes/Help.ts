export default class Help
{

    private color: "red" | "green";
    private text: string;
    private fade: boolean;

    public constructor(text: string, color: "red" | "green" = "green", fade: boolean = false)
    {
        this.color = color;
        this.text = text;
        this.fade = fade;
    }

    public get_color()
    {
        return this.color;
    }

    public get_text()
    {
        return this.text;
    }

    public has_to_fade()
    {
        return this.fade;
    }

}