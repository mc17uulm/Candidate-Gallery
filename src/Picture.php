<?php

namespace CandidateGallery;

class Picture
{

    private $name;
    private $picture;
    private $position;

    public function __construct(string $name, string $picture, int $position)
    {
        $this->name = $name;
        $this->picture = $picture;
        $this->position = $position;
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