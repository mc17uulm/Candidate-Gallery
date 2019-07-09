<?php

namespace CandidateGallery;

use CandidateGallery\helper\Response;

class API
{

    public static function handle() : void
    {
        $data = $_REQUEST;
        $response = new Response(false, "");
        if(!empty($data["type"]))
        {
            switch($data["type"])
            {
                case "gallery_action":
                    $response = self::handle_gallery_action($data);
                    die();
                    break;
                default:
                    break;
            }
        }

        $response->add(array(
            "type" => $response->hasSuccess() ? "success" : "error",
            "msg" => $response->getData()
        ));

    }

    private static function handle_gallery_action(array $data) : Response
    {
        if(!empty($data["data"]) && !empty($data["action"]) && is_array($data["data"])) {
            switch($data["action"]) {
                case "add_gallery":
                    return Gallery::add_gallery($data["data"]);
                case "remove_gallery":
                    return Gallery::remove_gallery($data["data"]);
                case "multiple":
                default:
                    break;
                    /**
                    $results = array_map(function(array $el) {
                        if(!empty($el["action"]) && !empty($el["data"] && is_array($el["data"])))
                        {
                            switch($el["action"])
                            {
                                case "add_picture":
                                    break;
                                case "remove_picture":
                                    break;
                                case "edit_picture":
                                    break;
                                case "";
                                    break;
                            }
                        }
                    }, $data["data"]);*/
            }
        }
        return new Response(false, "");
    }

}