<?php

namespace CandidateGallery\helper;

class Committee
{

    private $id;
    private $picture_id;
    private $type;
    private $active;
    private $position;
    private $district;

    public function __construct(string $type, bool $active, int $position, string $district, int $picture_id = -1, int $id = -1)
    {
        $this->id = $id;
        $this->picture_id = $picture_id;
        $this->type = $type;
        $this->active = $active;
        $this->position = $position;
        $this->district = $district;
    }

    public function get_id() : int
    {
        return $this->id;
    }

    public function set_id(int $id) : void
    {
        $this->id = $id;
    }

    public function get_picture_id() : int
    {
        return $this->picture_id;
    }

    public function get_type(): string
    {
        return $this->type;
    }

    public function is_active(): bool
    {
        return $this->active;
    }

    public function get_position(): int
    {
        return $this->position;
    }

    public function get_district(): string
    {
        return $this->district;
    }

}