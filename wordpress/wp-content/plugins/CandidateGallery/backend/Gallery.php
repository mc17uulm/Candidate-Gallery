<?php

namespace CandidateGallery;

use CandidateGallery\helper\Database;
use CandidateGallery\helper\Response;

class Gallery implements \JsonSerializable
{

    private $id;
    private $name;
    private $type;
    private $pictures;

    public function __construct(string $name, string $type = "board", array $pictures = array())
    {
        $this->id = -1;
        $this->name = $name;
        $this->type = $type;
        $this->pictures = $pictures;
    }

    public function set_id(int $id) : void
    {
        $this->id = $id;
    }

    public function get_id() : int
    {
        return $this->id;
    }

    public function get_name() : string
    {
        return $this->name;
    }

    public function get_type() : string
    {
        return $this->type;
    }

    public function get_pictures() : array
    {
        return $this->pictures;
    }

    public function set_picture(Picture $picture) : void
    {
        array_push($this->pictures, $picture);
    }

    public function set_pictures(array $pictures) : void
    {
        $this->pictures = $pictures;
    }

    public function jsonSerialize()
    {
        return get_object_vars($this);
    }

    public static function get_gallery(array $data) : Response
    {
        if(!empty($data["id"]) && is_int(intval($data["id"])))
        {
            return Database::get_gallery(intval($data["id"]));
        }

        return new Response(false, "Invalid parameters");
    }

    public static function add_gallery(array $data) : Response
    {

        $gallery = new Gallery($data["name"], $data["type"]);
        foreach($data["images"] as $image)
        {
            $gallery->set_picture(new Board(
                $image["name"],
                $image["url"],
                $image["position"],
                $image["email"],
                $image["func"],
                $image["statement"]
            ));
        }

        return Database::add_gallery($gallery);
    }

    public static function edit_gallery(int $id, array $data) : void
    {

    }

    public static function remove_gallery(int $id) : Response
    {

    }

}