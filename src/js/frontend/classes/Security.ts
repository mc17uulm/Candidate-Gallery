export default class Security
{

    public static encrypt(text: string, mail : boolean = false)
    {
        return Array.from(mail ? "mailto:" + text : text).map(el => {
            return "&" + el.charCodeAt(0) + ";";
        }).join('');
    }

    public static chunk(arr: any[], size: number)
    {
        let out = [];

        while(arr.length)
        {
            out.push(arr.splice(0, size));
        }

        return out;
    }

}