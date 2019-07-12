<?php

namespace CandidateGallery;

use CandidateGallery\helper\Response;

class API
{

    public static function handle() : void
    {
        $response = new Response();
        $input= file_get_contents('php://input');
        try
        {
            $json = json_decode($input, true, 512, JSON_THROW_ON_ERROR);
            if(!empty($json["type"]) && !empty($json["data"]))
            {
                switch($json["type"])
                {
                    case "add_gallery":
                        $response = Gallery::add_gallery($json["data"]);
                        break;
                    default:
                        $response->setError("Invalid request format");
                        break;
                }
            } else {
                $response->setError("Invalid request format");
            }
        }
        catch(\JsonException $e)
        {
                $response->setError($e->getMessage());
        }

        $response->send();

    }

}