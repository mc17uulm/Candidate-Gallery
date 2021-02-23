<?php

namespace CandidateGallery\helper;

class Response
{

    private $success;
    private $data;

    public function __construct(bool $success = false, $data = "")
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

    public function setError(string $msg) : void
    {
        $this->success = false;
        $this->data = $msg;
    }

    public function send() : void
    {
        die(json_encode(array("type" => $this->success ? "success" : "error", "msg" => $this->data)));
    }

}