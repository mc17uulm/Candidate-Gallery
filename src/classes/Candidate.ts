import { Error } from "../form/Input";

export default class Candidate
{

    id: number;
    url: string;
    name: string;
    email: string;
    func: string;
    statement: string;
    job?: string;
    age?: number;
    children?: number;
    grandchildren?: number;
    error?: Error;

    public constructor(
        id: number,
        url: string,
        name: string = "",
        email: string = "",
        func: string = "",
        statement: string = "",
        job: string = "",
        age: number = null,
        children: number = null,
        grandchildren: number = null
    ) {
        this.id = id;
        this.url = url;
        this.name = name;
        this.email = email;
        this.func = func;
        this.statement = statement;
        this.job = job;
        this.age = age;
        this.children = children;
        this.grandchildren = grandchildren;
        this.error.active = false;
    }

}