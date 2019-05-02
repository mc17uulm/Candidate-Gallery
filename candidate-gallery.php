<?php
/**
 * Plugin Name: Candidate Gallery
 * Description: Parses json data to candidate gallery - Kommunalwahl 2019 - Grüne Heidenheim
 * Author: mc17uulm
 * Author URI: https://github.com/mc17uulm/Candidate-Gallery
 * Version: 0.1
 * Text Domain : cg_language
 * Domain Path: /lang
 * License: GPLv3
 * License URI: http://www.gnu.org/licenses/gpl-3.0.txt
 * Tags: gallery
 *
 * === Plugin Information ===
 *
 * Version: 0.1
 * Date: 14.04.2019
 *
 */

function cg_activate()
{
    wp_enqueue_style('cg_style', plugin_dir_url(__FILE__) . 'lib/cg_style.css', array(), false, 'all');
}

function cg_build_candidate(array $candidate, string $committee) : string
{
    ob_start();
    include __DIR__ . "/cg_template.php";
    $html = ob_get_clean();

    return $html;
}

function cg_sort(array &$data, string $committee) : void
{
    $data = array_filter($data, function($el) use ($committee) {
        return $el["committee"][$committee]["active"];
    });
    usort($data, function ($a, $b) use ($committee) {
        if($a["committee"][$committee]["active"] && $b["committee"][$committee]["active"]) {
            return $a["committee"][$committee]["position"] - $b["committee"][$committee]["position"];
        } else if($a["committee"][$committee]["active"]) {
            return -1;
        } else {
            return 1;
        }
    });
}

function cg_build(string $data, string $committee) : string
{
    $file = __DIR__ . "/data/$data.json";
    if(file_exists($file) && is_readable($file))
    {
        $json = json_decode(file_get_contents($file), true);
        if(!empty($json["candidates"]))
        {
            $i = 0;
            $htmlTag = "";
            $candidates = $json["candidates"];
            cg_sort($candidates, $committee);
            if(!empty($json["candidates"])) {
                foreach ($candidates as $candidate) {
                    if (($i % 2) === 0) {
                        $htmlTag .= "<div class=\"cg_row\">";
                    }
                    $htmlTag .= "<div class=\"cg_column\">";
                    $htmlTag .= cg_build_candidate($candidate, $committee);
                    $htmlTag .= "</div>";
                    if (($i % 2) !== 0) {
                        $htmlTag .= "</div><br />";
                    }
                    $i++;
                }
                if (($i % 2) !== 0) {
                    $htmlTag .= "<div class=\"cg_column\"></div></div><br />";
                }
                return $htmlTag;
            }
        }
    }

    return "<strong>Error:</strong> [candidate_gallery] data is invalid";

}

function cg_shortcode($atts)
{


    $atts = shortcode_atts(array('data' => '', 'committee' => ''), $atts, 'candidate_gallery');

    if(empty($atts["data"]))
    {
        return "<strong>Error:</strong> [candidate_gallery] shortcode arguments are invalid";
    }

    $committee = empty($atts["committee"]) || !in_array($atts["committee"], array("kt", "gr", "or")) ? "gr" : $atts["committee"];

    return cg_build($atts["data"], $committee);

}

add_action('wp_enqueue_scripts', 'cg_activate');
add_shortcode('candidate_gallery', 'cg_shortcode');