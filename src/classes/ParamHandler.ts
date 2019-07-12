export default class ParamHandler
{

    public static get_queries()
    {
        let token : string = window.location.search;

        token = token.substring(1);

        let queries : any = {};
        token.split("&").map(el => {
            let parts = el.split("=");
            queries[parts[0]] = parts[1];
        });

        return queries;
    }

}