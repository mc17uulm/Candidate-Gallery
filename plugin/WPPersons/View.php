<?php

namespace CandidateGallery;

class View
{

    public static function render(string $site = "") : void
    {
        echo "<div class='wrap' id='cg_application'></div>";
    }

}