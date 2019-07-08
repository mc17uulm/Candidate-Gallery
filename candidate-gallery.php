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

require_once 'vendor/autoload.php';

use CandidateGallery\App;
use CandidateGallery\helper\Database;

function cg_initialize()
{
    Database::initialize();
}

function cg_remove()
{
    Database::remove();
}

function cg_activate()
{
    wp_enqueue_style('cg_style', plugin_dir_url(__FILE__) . 'lib/cg_style.css', array(), false, 'all');
}

function cg_page()
{
    ?>
    <div>
        <p>
            <?php
                $gallery = new \CandidateGallery\Gallery(0, "Test", []);
                Database::add_gallery($gallery);
                Database::get_gallery(0);
            ?>
        </p>
    </div>
    <?php
}

function cg_menu()
{
    $page = add_menu_page('Candidate Gallery', 'Candidate Gallery', 'manage_options', "candidate-gallery", "cg_page", "dashicons-admin-network");
    //add_action('load-' . $page, )
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

function cg_build(string $data, string $type, string $committee = "") : string
{
    switch($type)
    {
        case "election": return cg_build_election($data, $committee);
        case "board": return cg_build_board($data);
        case "delegates": return cg_build_delegates($data);
        case "mandates": return cg_build_mandates($data);
        default: return "<strong>Error:</strong> [candidate_gallery] type attribute is invalid. Possible types: [election, board, delegates, mandates]";
    }
}

function cg_build_board(string $data)
{
    $json = cg_load_file($data);
    
}

function cg_build_election(string $data, string $committee)
{
    $json = cg_load_file($data);
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
    return "<strong>Error:</strong> [candidate_gallery] data is invalid";
}

function cg_load_file(string $file) : array
{
    $file = __DIR__ . "/data/$file.json";
    if(file_exists($file) && is_readable($file))
    {
        try{
            return json_decode(file_get_contents($file), true, 512, JSON_THROW_ON_ERROR);
        } catch(JsonException $e){}
    }
    return [];
}

function cg_shortcode($atts)
{
    App::handle_shortcode($atts);
}

register_activation_hook(__FILE__, 'cg_initialize');
register_deactivation_hook(__FILE__, 'cg_remove');
add_action('wp_enqueue_scripts', 'cg_activate');
add_shortcode('candidate_gallery', 'cg_shortcode');
add_action('admin_menu', 'cg_menu');