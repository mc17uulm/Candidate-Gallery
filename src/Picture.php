<?php

namespace CandidateGallery;

class Picture
{

    private $name;
    private $picture;

    public function __construct(string $name, string $picture)
    {
        $this->name = $name;
        $this->picture = $picture;
    }

    public function get_name() : string
    {
        return $this->name;
    }

    public function get_picture() : string
    {
        return $this->picture;
    }


}