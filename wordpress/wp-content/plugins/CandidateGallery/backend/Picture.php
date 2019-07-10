<?php

namespace CandidateGallery;

class Picture
{

    private $id;
    private $name;
    private $picture;
    private $position;

    public function __construct(string $name, string $picture, int $position, int $id = -1)
    {
        $this->id = $id;
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

}