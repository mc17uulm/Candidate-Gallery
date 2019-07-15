import Event, { EventType, EventCategory } from "./Event";
import {CandidateObject} from "./Candidate";

export interface Container
{
    id?: number,
    name: string,
    type: string,
    images: CandidateObject[]
}

export default class EventHandler
{

    public static create_event_loop(previous: Container, now: Container) : Event[]
    {

        console.log(previous);
        console.log(now);

        let events : Event[] = [];

        if(typeof previous === "undefined")
        {
            events.push(new Event(EventType.Add, EventCategory.Gallery, {name: now.name, type: now.type}));
            now.images.map((image : CandidateObject) => {
                events.push(new Event(EventType.Add, EventCategory.Picture, image));
            });

        }
        else 
        {
            if((previous.name !== now.name) || (previous.type !== now.type))
            {
                events.push(new Event(EventType.Edit, EventCategory.Gallery, {id: previous.id, name: now.name, type: now.type}));
            }

            let keys = now.images.map((image: CandidateObject) => {
                let inOld = false;
                previous.images.map((prevImg: CandidateObject) => {
                    if(image.id === prevImg.id)
                    {
                        inOld = true;
                        if(image.change)
                        {
                            events.push(new Event(EventType.Edit, EventCategory.Picture, image));
                        }
                    }
                });

                if(!inOld)
                {
                    image.gallery_id = previous.id;
                    events.push(new Event(EventType.Add, EventCategory.Picture, image));
                }

                return image.id;
            });

            previous.images.map((prev: CandidateObject) => {
                if(keys.indexOf(prev.id) === -1)
                {
                    events.push(new Event(EventType.Delete, EventCategory.Picture, {id: prev.id}));
                }
            });

        }

        return events;
    }
}