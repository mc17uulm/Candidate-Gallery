export default class Response
{

    private type: "success" | "error";
    private msg: string | object;

    constructor(response: any)
    {
        try{
            response = JSON.parse(response);
            if(typeof response.type === "undefined" || typeof response.msg === "undefined")
            {
                this.type = "error";
                this.msg = "Invalid response";
            }
            else 
            {
                this.type = response.type;
                this.msg = response.msg;
            }
        } catch(err)
        {
            this.type = "error";
            this.msg = "Invalid response";
        }
    }

    public hasSuccess() : boolean
    {
        return this.type === "success";
    }

    public getData()
    {
        return this.msg;
    }

}