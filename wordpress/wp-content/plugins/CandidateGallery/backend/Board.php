<?php

namespace CandidateGallery;

use CandidateGallery\helper\Encryption;

class Board extends Picture implements Person
{

    private $email;
    private $function;
    private $statement;

    public function __construct(string $name, string $picture, int $position, string $email, string $function, string $statement)
    {
        parent::__construct($name, $picture, $position);
        $this->email = $email;
        $this->function = $function;
        $this->statement = $statement;
    }

    public function get_email(): string
    {
        return $this->email;
    }

    public function get_encrypted_email() : string
    {
        return $this->email === "" ? $this->email : Encryption::hash($this->email);
    }

    public function get_function(): string
    {
        return $this->function;
    }

    public function get_statement() : string
    {
        return $this->statement;
    }

    public function parse() : array
    {
        return array_merge(parent::parse(), array(
            "email" => $this->email,
            "encrypted_email" => $this->get_encrypted_email(),
            "function" => $this->function,
            "statement" => $this->statement
        ));
    }

}