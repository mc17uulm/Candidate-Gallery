<?php

namespace CandidateGallery;

class View
{

    public static function render(string $site = "") : void
    {
        echo "<div class='wrap' id='cg_application'></div>";
    }

    public static function render_gallery(array $data) : string
    {
        $title = $data["name"];
        $i = 0;
        $htmlTag = "<h2>$title</h2>";
        foreach($data["pictures"] as $candidate)
        {
            if(($i%2)===0)
            {
                $htmlTag .= "<div class='cg_row'>";
            }
            $htmlTag .= "<div class='cg_column'><div class='cg_image'>";
            $htmlTag .= "<a href='" . $candidate["picture"] . "'>";
            $htmlTag .= "<img class='alignright wp-image-3400' src='" . $candidate["picture"] ."' alt='" . $candidate["name"] . "' />";
            $htmlTag .= "</div></div>";
            if(($i%2)===0) {
                $htmlTag .= "</div></br>";
            }
            $i++;
        }
        if (($i % 2) !== 0) {
            $htmlTag .= "<div class=\"cg_column\"></div></div><br />";
        }

        return $htmlTag;
    }

}