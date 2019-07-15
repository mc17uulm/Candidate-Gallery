<?php

namespace CandidateGallery;

use CandidateGallery\helper\Database;
use CandidateGallery\helper\EventHandler;
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
            if(!empty($json["type"]))
            {
                switch($json["type"])
                {
                    case "handle_gallery":
                        $response = EventHandler::handle($json["data"]);
                        break;
                    case "get_gallery":
                        $response = Gallery::get_gallery($json["data"]);
                        break;
                    case "get_galleries":
                        $response = Database::get_galleries();
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