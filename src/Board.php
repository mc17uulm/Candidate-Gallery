<?php

namespace CandidateGallery;

class Board extends Picture
{

    private $email;
    private $function;

    public function __construct(string $name, string $picture, string $email, string $function)
    {
        parent::__construct($name, $picture);
        $this->email = $email;
        $this->function = $function;
    }

    public function get_email(): string
    {
        return $this->email;
    }

    public function get_function(): string
    {
        return $this->function;
    }

}