import { Error, InputObject } from "../form/Input";

export default class Candidate
{

    id: number;
    url: string;
    name: InputObject<string>;
    email: InputObject<string>;
    func: InputObject<string>;
    statement: InputObject<string>;
    job?: InputObject<string>;
    family?: string;
    age?: InputObject<number>;
    children?: InputObject<number>;
    grandchildren?: InputObject<number>;

    public constructor(
        id: number,
        url: string,
        name: string = "",
        email: string = "",
        func: string = "",
        statement: string = "",
        job: string = "",
        family: string = "",
        age: number = undefined,
        children: number = undefined,
        grandchildren: number = undefined
    ) {
        this.id = id;
        this.url = url;
        this.name = {value: name, error: {active: false}};
        this.email =  {value: email, error: {active: false}};
        this.func =  {value: func, error: {active: false}};
        this.statement =  {value: statement, error: {active: false}};
        this.job =  {value: job, error: {active: false}};
        this.family = family;
        this.age = {value: age, error: {active: false}};
        this.children = {value: children, error: {active: false}};
        this.grandchildren = {value: grandchildren, error: {active: false}};
    }

}