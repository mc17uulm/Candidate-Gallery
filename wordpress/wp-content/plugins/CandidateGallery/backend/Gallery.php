<?php

namespace CandidateGallery;

use CandidateGallery\helper\Committee;
use CandidateGallery\helper\Database;
use CandidateGallery\helper\Response;

class Gallery
{

    private $id;
    private $name;
    private $type;
    private $pictures;

    public function __construct(string $name, int $id = -1, string $type = "board", array $pictures = array())
    {
        $this->id = $id;
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

    public static function handle_action(string $action, int $id, array $data) : Response
    {
        switch($action)
        {
            case "add":
                return self::add_gallery($data);
            case "edit":
                self::edit_gallery($id, $data);
                break;
            case "delete":
                self::remove_gallery($id);
                break;
            default:
                break;
        }
        return new Response(false, "Internal Server Error");
    }

    public static function add_gallery(array $data) : Response
    {
        return new Response(true, $data);
        die();
        $gallery = new Gallery($data["name"], $data["type"]);
        foreach($data["pictures"] as $picture)
        {
            $committees = array_map(function (array $committee) {
                return new Committee(
                    $committee["type"],
                    $committee["active"],
                    $committee["position"],
                    $committee["district"],
                );
            }, $picture["committees"]);
            $gallery->set_picture($data["type"] === "candidates" ? new Candidate(
                $picture["name"],
                $picture["picture"],
                $picture["position"],
                $picture["email"],
                $picture["function"],
                $picture["age"],
                $picture["job"],
                $picture["family"],
                $picture["children"],
                $picture["grandchildren"],
                $picture["statement"],
                $committees
            ) : new Board(
                $picture["name"],
                $picture["picture"],
                $picture["position"],
                $picture["email"],
                $picture["function"],
                $picture["statement"]
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