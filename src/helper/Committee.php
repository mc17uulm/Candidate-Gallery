<?php

namespace CandidateGallery\helper;

class Committee
{

    private $type;
    private $active;
    private $position;
    private $district;

    public function __construct(string $type, bool $active, int $position, string $district)
    {
        $this->type = $type;
        $this->active = $active;
        $this->position = $position;
        $this->district = $district;
    }

    /**
     * @return string
     */
    public function get_type(): string
    {
        return $this->type;
    }

    /**
     * @return bool
     */
    public function is_active(): bool
    {
        return $this->active;
    }

    /**
     * @return int
     */
    public function get_position(): int
    {
        return $this->position;
    }

    /**
     * @return string
     */
    public function get_district(): string
    {
        return $this->district;
    }

}