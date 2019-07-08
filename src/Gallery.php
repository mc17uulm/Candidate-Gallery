<?php

namespace CandidateGallery;

class Gallery
{

    private $id;
    private $name;
    private $pictures;

    public function __construct(int $id, string $name, array $pictures = array())
    {
        $this->id = $id;
        $this->name = $name;
        $this->pictures = $pictures;
    }

    public function get_id() : int
    {
        return $this->id;
    }

    public function get_name() : string
    {
        return $this->name;
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

}