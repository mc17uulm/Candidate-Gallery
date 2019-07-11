<?php

namespace CandidateGallery;

use CandidateGallery\helper\Committee;

class Candidate extends Board
{

    private $age;
    private $job;
    private $family;
    private $children;
    private $grandchildren;
    private $committees;

    public function __construct(string $name, string $picture, int $position, string $email, string $function, int $age, string $job, string $family, int $children, int $grandchildren, string $statement, array $committees)
    {
        parent::__construct($name, $picture, $position, $email, $function, $statement);
        $this->age = $age;
        $this->job = $job;
        $this->family = $family;
        $this->children = $children;
        $this->grandchildren = $grandchildren;
        $this->committees = $committees;
    }

    public function get_age(): int
    {
        return $this->age;
    }

    public function get_job(): string
    {
        return $this->job;
    }

    public function get_family(): string
    {
        return $this->family;
    }

    public function get_children(): int
    {
        return $this->children;
    }

    public function get_grandchildren(): int
    {
        return $this->grandchildren;
    }

    public function get_committees() : array
    {
        return $this->committees;
    }

}