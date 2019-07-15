import hash from "object-hash";

export enum EventCategory {
    Gallery = "gallery",
    Picture = "picture"
}

export enum EventType {
    Add = "add",
    Edit = "edit",
    Delete = "delete"
}

export default class Event
{

    hash: string;
    type : EventType;
    category : EventCategory;
    data: any;

    public constructor(type: EventType, category: EventCategory, data: any)
    {
        this.type = type;
        this.category = category;
        this.data = data;
        this.hash = hash({type: type, category: category, data: data});
    }

}