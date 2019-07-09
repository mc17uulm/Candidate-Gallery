<?php

namespace CandidateGallery\helper;

class Response
{

    private $success;
    private $data;

    public function __construct(bool $success, $data)
    {
        $this->success = $success;
        $this->data = $data;
    }

    public function hasSuccess() : bool
    {
        return $this->success;
    }

    public function getData()
    {
        return $this->data;
    }

}