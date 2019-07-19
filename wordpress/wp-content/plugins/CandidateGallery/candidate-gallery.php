<?php
/**
 * Plugin Name: Candidate Gallery
 * Description: Parses json data to candidate gallery - Kommunalwahl 2019 - Grüne Heidenheim
 * Author: mc17uulm
 * Author URI: https://github.com/mc17uulm/Candidate-Gallery
 * Version: 1.0
 * Text Domain : cg_language
 * Domain Path: /lang
 * License: GPLv3
 * License URI: http://www.gnu.org/licenses/gpl-3.0.txt
 * Tags: gallery
 *
 * === Plugin Information ===
 *
 * Version: 1.0
 * Date: 19.07.2019
 *
 */

require_once 'vendor/autoload.php';

use CandidateGallery\App;
use CandidateGallery\helper\Database;
use CandidateGallery\API;
use CandidateGallery\View;

// Initialize Database on plugin activation
register_activation_hook(__FILE__, function() {
    Database::initialize();
});

// Remove Database tables on plugin deactivation
register_deactivation_hook(__FILE__, function() {
    Database::remove();
});

// Load frontend scripts
add_action('wp_enqueue_scripts', function () {

    wp_enqueue_style('cg_gutenberg', plugin_dir_url(__FILE__) . 'lib/cg_frontend.css', array(), false, 'all');
    wp_enqueue_script('cg_frontend', plugins_url('dist/cg_frontend.js', __FILE__), array(), false, true);
    wp_localize_script('cg_backend_render', 'cg_vars', array(
        'site' => $_GET["page"],
        'ajax' => admin_url('admin-ajax.php')
    ));

});

// Load backend scripts
add_action('admin_enqueue_scripts', function () {

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

});

// Load Gutenberg Block scripts
add_action('init', function ()
{
    if(!function_exists('register_block_type'))
    {
        return;
    }

    wp_register_style('Arvo-Gruen', plugin_dir_url(__FILE__) . 'fonts/arvo_gruen.ttf', false, 'all');
    wp_register_style('Arvo', plugin_dir_url(__FILE__) . 'fonts/arvo_regular.ttf', false, 'all');
    wp_enqueue_style('Arvo-Gruen');
    wp_enqueue_style('Arvo');
    wp_enqueue_style('cg_gutenberg', plugin_dir_url(__FILE__) . 'lib/cg_frontend.css', array(), false, 'all');

    wp_enqueue_script(
        'cg_gutenberg_plugin',
        plugins_url('dist/cg_gutenberg.js', __FILE__),
        array('wp-blocks', 'wp-i18n', 'wp-element'),
        filemtime(plugin_dir_path(__FILE__) . 'dist/cg_gutenberg.js')
    );
    wp_localize_script('cg_gutenberg_plugin', 'cg_vars', array(
        'base' => plugin_dir_url(__FILE__),
        'ajax' => admin_url('admin-ajax.php')
    ));

});

add_action('admin_menu', function() {
    $page = add_menu_page('Candidate Gallery', 'Candidate Gallery', 'manage_options', "candidate-gallery", function() { View::render(); }, "dashicons-admin-network");
    add_submenu_page('candidate-gallery', 'Add Gallery', 'Add Gallery', 'manage_options', 'cg_add_gallery', function() { View::render(); });
    add_submenu_page('candidate-gallery', 'Edit Gallery', 'Edit Gallery', 'manage_options', 'cg_edit_gallery', function() { View::render(); });
});

// Enable ajax request routing - nopriv
add_action('wp_ajax_nopriv_cg_ajax', function() {
    API::handle(true);
});

// Enable ajax request routing - adminpriv
add_action('wp_ajax_cg_ajax', function() {
    API::handle();
});

// Render shortcode
add_shortcode('candidate_gallery', function ($atts) {
    App::handle_shortcode($atts);
});

add_action('plugins_loaded', function ()
{
    load_plugin_textdomain('cg_lang', FALSE, basename(dirname(__FILE__)) . '/lang/');
});

/**function cg_sort(array &$data, string $committee) : void
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
}*/