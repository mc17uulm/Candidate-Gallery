<?php
namespace CandidateGallery;

interface Person
{
    public function get_id() : int;
    public function get_name() : string;
    public function get_picture() : string;
    public function get_position() : int;
    public function parse() : array;
}