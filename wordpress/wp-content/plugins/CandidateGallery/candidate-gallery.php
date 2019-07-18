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
use CandidateGallery\API;
use CandidateGallery\View;

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

function cg_load_admin_scripts()
{

    if(!wp_style_is('fontawesome', 'enqueued')) {
        wp_register_style('fontawesome', '//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css', false, '4.7.0');
        wp_enqueue_style('fontawesome');
    }

    if(in_array($_GET["page"], array('cg_add_gallery', 'cg_edit_gallery', 'candidate-gallery')))
    {
        wp_enqueue_style('cg_admin', plugin_dir_url(__FILE__) . 'lib/cg_admin.css', array(), false, 'all');

        if (is_admin())
        {
            wp_enqueue_script('cg_backend_render', plugins_url('dist/cg_backend.js', __FILE__), array('wp-i18n'), false, true);
            wp_localize_script('cg_backend_render', 'cg_vars', array(
                'base' => admin_url('admin.php'),
                'plugin_dir_base' => plugin_dir_url(__FILE__),
                'site' => $_GET["page"],
                'ajax' => admin_url('admin-ajax.php')
            ));
            wp_enqueue_media();
        }
    }

}

function cg_load_plugin_textdomain()
{
    load_plugin_textdomain('cg_lang', FALSE, basename(dirname(__FILE__)) . '/lang/');
}

function cg_render_page()
{
    View::render();
}

function cg_menu()
{
    $page = add_menu_page('Candidate Gallery', 'Candidate Gallery', 'manage_options', "candidate-gallery", "cg_render_page", "dashicons-admin-network");
    add_submenu_page('candidate-gallery', 'Add Gallery', 'Add Gallery', 'manage_options', 'cg_add_gallery', 'cg_render_page');
    add_submenu_page('candidate-gallery', 'Edit Gallery', 'Edit Gallery', 'manage_options', 'cg_edit_gallery', 'cg_render_page');
}

function cg_ajax()
{
    API::handle();
}

function cg_ajax_frontend()
{
    API::handle(true);
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

function cg_load_gutenberg_block()
{
    if(!function_exists('register_block_type'))
    {
        return;
    }

    wp_enqueue_script(
        'cg_gutenberg_plugin',
        plugins_url('dist/cg_frontend.js', __FILE__),
        array('wp-blocks', 'wp-i18n', 'wp-element'),
        filemtime(plugin_dir_path(__FILE__) . 'dist/cg_frontend.js')
    );
    wp_localize_script('cg_gutenberg_plugin', 'cg_vars', array(
        'base' => plugin_dir_url(__FILE__),
        'ajax' => admin_url('admin-ajax.php')
    ));

}

register_activation_hook(__FILE__, 'cg_initialize');
register_deactivation_hook(__FILE__, 'cg_remove');

add_action('wp_enqueue_scripts', 'cg_activate');
add_action('admin_enqueue_scripts', 'cg_load_admin_scripts');

add_shortcode('candidate_gallery', 'cg_shortcode');
add_action('admin_menu', 'cg_menu');

add_action('wp_ajax_nopriv_cg_ajax', "cg_ajax_frontend");
add_action('wp_ajax_cg_ajax', 'cg_ajax');

add_action('plugins_loaded', 'cg_load_plugin_textdomain');
add_action('init', 'cg_load_gutenberg_block');