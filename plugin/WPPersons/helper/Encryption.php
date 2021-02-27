<?php

namespace CandidateGallery\helper;

class Encryption
{

    public static function hash(string $in) : string
    {
        $out = "";
        foreach(str_split($in) as $char)
        {
            $out .= "&" . ord($char) . ";";
        }
        return $out;
    }

}