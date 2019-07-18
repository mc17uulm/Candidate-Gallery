<?php

namespace CandidateGallery\helper;

class EventHandler
{

    private static $gallery_id = -1;

    public static function handle(array $events) : Response
    {


        $out = [];
        foreach($events as $event)
        {
            try{

                $event = new Event($event);

                switch($event->get_type())
                {
                    case "add":
                        array_push($out, self::handle_add($event));
                        break;
                    case "edit":
                        array_push($out, self::handle_edit($event));
                        break;
                    case "delete":
                        array_push($out, self::handle_delete($event));
                        break;
                    default:
                        break;
                }

            }
            catch(EventException $e)
            {
                return new Response(false, $e->getMessage());
            }
        }
        return new Response(true, $out);
    }

    private static function check_array(array $keys, array $data) : bool
    {
        foreach($keys as $key)
        {
            if(!array_key_exists($key, $data)) { return false; }
        }

        return true;
    }

    public static function handle_delete(Event $event) : array
    {
        $data = $event->get_data();
        if(!self::check_array(array("id"), $data)) {
            throw new EventException("Invalid data packages 1");
        }

        if($event->get_category() === "gallery"){
            Database::delete_gallery(intval($data["id"]));
        } else {
            Database::delete_picture(intval($data["id"]));
        }

        return array("event" => $event->get_hash(), "success" => true);
    }

    public static function handle_edit(Event $event) : array
    {
        $data = $event->get_data();
        if($event->get_category() === "gallery")
        {
            if(!self::check_array(array("name", "type", "id"), $data))
            {
                throw new EventException("Invalid data packages 2");
            }

            return array("event" => $event->get_hash(), "id" => $data["id"], "success" => Database::edit_gallery(
                intval($data["id"]),
                $data["name"],
                $data["type"]
            ));
        }
        else
        {
            if(!self::check_array(array('id', 'name', 'url', 'statement', 'email', 'func', 'position'), $data)) {
                throw new EventException("Invalid data packages 2");
            }
            return array("event" => $event->get_hash(), "name" => $data["name"], "success" => Database::edit_picture(
                $data["id"],
                $data["name"],
                $data["url"],
                $data["statement"],
                $data["email"],
                $data["func"],
                $data["position"]
            ));

        }
    }

    public static function handle_add(Event $event) : array
    {
        $data = $event->get_data();
        if($event->get_category() === "gallery")
        {
            if(!self::check_array(array("name", "type"), $data))
            {
                throw new EventException("Invalid data packages 3");
            }

            self::$gallery_id = Database::add_gallery($data["name"], $data["type"]);
            return array("event" => $event->get_hash(),"id" => self::$gallery_id, "name" => $data["name"]);
        }
        else
        {
            if(!self::check_array(array('name', 'url', 'statement', 'email', 'func', 'position'), $data)) {
                throw new EventException("Invalid data package 4");
            }

            if(!empty($data["gallery_id"]) && self::$gallery_id === -1)
            {
                $id = Database::add_picture(
                    $data["gallery_id"],
                    $data["name"],
                    $data["url"],
                    $data["statement"],
                    $data["email"],
                    $data["func"],
                    intval($data["position"])
                );
                return array("event" => $event->get_hash(), "id" => $id, "name" => $data["name"]);
            } else if (!empty($data["gallery_id"]) && $data["gallery_id"] === -1 && self::$gallery_id !== -1)
            {
                $id = Database::add_picture(
                    self::$gallery_id,
                    $data["name"],
                    $data["url"],
                    $data["statement"],
                    $data["email"],
                    $data["func"],
                    intval($data["position"])
                );
                return array("event" => $event->get_hash(), "id" => $id, "name" => $data["name"]);
            }
            else {
                throw new EventException("Database error");
            }
        }
    }

}