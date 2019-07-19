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

    public static function handle_shortcode($atts) : string
    {
        $atts = shortcode_atts(array('id' => ''), $atts, 'candidate_gallery');

        if(empty($atts["id"]) || intval($atts["id"]) === 0) {
            return "<strong>Error:</strong> [candidate_gallery] shortcode arguments are invalid";
        }

        return "<div id='cg_gallery_frontend' defaultvalue='" . $atts["id"] . "'></div>";
    }

}