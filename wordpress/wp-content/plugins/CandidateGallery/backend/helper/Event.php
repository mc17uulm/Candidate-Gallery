<?php

namespace CandidateGallery\helper;

class Event
{

    private $hash;
    private $type;
    private $category;
    private $data;

    public function __construct(array $data)
    {
        if(empty($data["hash"]))
        {
            throw new EventException("No hash set");
        }
        if(empty($data["type"]) || !in_array($data["type"], array("add", "edit", "delete"))) {
            throw new EventException("Invalid type " . $data["type"]);
        }
        if(empty($data["category"]) || !in_array($data["category"], array("gallery", "picture"))) {
            throw new EventException("Invalid category " . $data["category"]);
        }
        if(empty($data["data"])) {
            throw new EventException("No data object found");
        }

        $this->hash = $data["hash"];
        $this->type = $data["type"];
        $this->category = $data["category"];
        $this->data = $data["data"];
    }

    public function get_hash() : string
    {
        return $this->hash;
    }

    public function get_type(): string
    {
        return $this->type;
    }

    public function get_category(): string
    {
        return $this->category;
    }

    public function is_gallery() : bool
    {
        return $this->category === "gallery";
    }

    public function is_picture() : bool
    {
        return $this->category === "picture";
    }

    public function get_data(): array
    {
        return $this->data;
    }



}