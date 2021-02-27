<?php

namespace WPPersons;

use WPPersons\db\Database;

final class Loader {

    public static function run(string $base) : void {

        register_activation_hook($base, fn() => Database::create_db());
        register_deactivation_hook($base, fn() => Database::drop_db());

        add_action('wp_enqueue_scripts', fn() => self::load_scripts());


    }

    private static function load_scripts($base) : void {

        wp_enqueue_style(
            'persons_gutenberg.css',
            plugin_dir_url($base) . 'dist/css/persons_gutenberg.css',
            [],
            false,
            'all'
        );

    }

}