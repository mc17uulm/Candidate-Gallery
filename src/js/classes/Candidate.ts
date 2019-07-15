import shortid from "shortid";
import { InputObject } from "../form/Input";

export interface CandidateObject {
    key: string,
    change: boolean,
    id: number;
    position: number;
    url: string,
    name: string,
    gallery_id?: number,
    email?: string,
    func?: string,
    statement?: string,
    job?: string,
    family?: string,
    age?: number,
    children?: number,
    grandchildren?: number
}

export default class Candidate
{

    private key: string;
    private change: boolean;
    private id: number;
    private position?: number;
    private url: string;
    private name: InputObject<string>;
    private gallery_id: number;
    private email: InputObject<string>;
    private func: InputObject<string>;
    private statement: InputObject<string>;
    private job?: InputObject<string>;
    private family?: string;
    private age?: InputObject<number>;
    private children?: InputObject<number>;
    private grandchildren?: InputObject<number>;

    public constructor(
        url: string = "",
        id: number = -1,
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
        this.key = shortid.generate();
        this.change = false;
        this.id = id;
        this.url = url;
        this.name = {value: name, error: {active: false}};
        this.gallery_id = -1;
        this.email =  {value: email, error: {active: false}};
        this.func =  {value: func, error: {active: false}};
        this.statement =  {value: statement, error: {active: false}};
        this.job =  {value: job, error: {active: false}};
        this.family = family;
        this.age = {value: age, error: {active: false}};
        this.children = {value: children, error: {active: false}};
        this.grandchildren = {value: grandchildren, error: {active: false}};
    }

    public get_key() : string { return this.key; }
    public has_changed() : boolean { return this.change; }
    public get_id() : number { return this.id; }
    public get_position() : number { return this.position; }
    public set_position(position : number) { this.update_key(); this.position = position }
    public get_url() : string { return this.url; }
    public set_url(url : string) { this.update_key(); this.url = url}
    public get_name() : InputObject<string> { return this.name; }
    public set_name(name : InputObject<string>) { this.update_key(); this.name = name}
    public get_gallery_id() : number { return this.gallery_id; }
    public set_gallery_id(gallery_id: number) { this.gallery_id = gallery_id; }
    public get_email() : InputObject<string> { return this.email; }
    public set_email(email : InputObject<string>) { this.update_key(); this.email = email}
    public get_func() : InputObject<string> { return this.func; }
    public set_func(func : InputObject<string>) { this.update_key(); this.func = func}
    public get_statement() : InputObject<string> { return this.statement; }
    public set_statement(statement : InputObject<string>) { this.update_key(); this.statement = statement}
    public get_job() : InputObject<string> { return this.job; }
    public set_job(job : InputObject<string>) { this.update_key(); this.job = job}
    public get_family() : string { return this.family; }
    public set_family(family : string) { this.update_key(); this.family = family}
    public get_age() : InputObject<number> { return this.age; }
    public set_age(age : InputObject<number>) { this.update_key(); this.age = age}
    public get_children() : InputObject<number> { return this.children; }
    public set_children(children : InputObject<number>) { this.update_key(); this.children = children}
    public get_grandchildren() : InputObject<number> { return this.grandchildren; }
    public set_grandchildren(grandchildren : InputObject<number>) { this.update_key(); this.grandchildren = grandchildren}

    public update_key() 
    {
        this.change = true; 
    }

    public reset() {
        this.change = false;
    }

    public reduce() : CandidateObject {
        return {
            key: this.key,
            change: this.change,
            id: this.id,  
            position: this.position,
            url: this.url,
            name: this.name.value,
            gallery_id: this.gallery_id,
            email: this.email.value,
            func: this.func.value,
            statement: this.statement.value,
            job: this.job.value,
            age: this.age.value,
            children: this.children.value,
            grandchildren: this.grandchildren.value
        };
    }

    parse(position: number) : CandidateObject
    {
        return {
            key: this.key,
            change: this.change,
            id: this.id,
            position: position,
            url: this.url,
            name: this.name.value,
            email: this.email.value,
            func: this.func.value,
            statement: this.statement.value,
            job: this.job.value,
            family: this.family,
            age: this.age.value,
            children: this.children.value,
            grandchildren: this.grandchildren.value
        }
    }

}