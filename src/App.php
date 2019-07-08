<?php

namespace CandidateGallery;

use CandidateGallery\helper\Database;

class App
{

    public static function activate()
    {
        Database::initialize();
        wp_enqueue_style('cg_style', plugin_dir_url(__FILE__) . 'lib/cg_style.css', array(), false, 'all');
    }

    public static function handle_shortcode($atts)
    {
        $atts = shortcode_atts(array('data' => '', 'type' => '', 'committee' => ''), $atts, 'candidate_gallery');
        /**
        if(empty($atts["data"]) || empty($atts["type"]))
        {
            return "<strong>Error:</strong> [candidate_gallery] shortcode arguments are invalid";
        }

        if(!in_array($atts["type"], array("election", "board", "delegates", "mandates")))
        {
            return "<strong>Error:</strong> [candidate_gallery] type attribute is invalid. Possible types: [election, board, delegates, mandates]";
        }

        $committee = empty($atts["committee"]) || !in_array($atts["committee"], array("kt", "gr", "or")) ? "gr" : $atts["committee"];

        return cg_build($atts["data"], $atts["type"], $committee);*/
        return "";
    }

}