import Response from "./Response";
import { Vars } from "../App";

declare var cg_vars : Vars;

export default class APIHandler
{

    private static base : string;

    public static init()
    {
        this.base = cg_vars.ajax;
    }

    public static async post(res : string, data: any)
    {
        const resp = await this.request("POST", this.base + "?action=cg_ajax", {}, JSON.stringify({type: res, data: data}));
        return new Response(resp);
    }

    private static async request(type: "GET" | "POST", url: string, headers: object = {}, body: any = "")
    {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();

            xhr.open(type, url);
            xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = () => {
                if(xhr.status >= 200 && xhr.status < 300)
                {
                    resolve(xhr.response);
                } else {
                    reject({status: xhr.status, statusText: xhr.statusText});
                }
            };

            xhr.onerror = () => {
                reject({status: xhr.status, statusText: xhr.statusText});
            }

            xhr.send(body);
        });
    }

}