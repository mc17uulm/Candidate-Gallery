<?php

namespace CandidateGallery;

class Picture implements Person
{

    private $id;
    private $name;
    private $picture;
    private $position;

    public function __construct(string $name, string $picture, int $position)
    {
        $this->id = -1;
        $this->name = $name;
        $this->picture = $picture;
        $this->position = $position;
    }

    public function get_id() : int
    {
        return $this->id;
    }

    public function set_id(int $id) : void
    {
        $this->id = $id;
    }

    public function get_name() : string
    {
        return $this->name;
    }

    public function get_picture() : string
    {
        return $this->picture;
    }

    public function get_position() : int
    {
        return $this->position;
    }

    public function parse() : array
    {
        return array(
            "id" => $this->id,
            "name" => $this->name,
            "picture" => $this->picture,
            "position" => $this->position
        );
    }

}