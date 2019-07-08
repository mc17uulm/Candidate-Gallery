<?php

namespace CandidateGallery\helper;

use CandidateGallery\Gallery;

class Database
{

    public static function get_gallery(int $id) : Response
    {
        global $wpdb;
        $res = $wpdb->get_results("SELECT * FROM " . $wpdb->prefix . "gc_gallery WHERE id = " . $id);
        if(count($res) === 1) {
            return new Response(true, new Gallery(intval($res[0]["id"]), $res[0]["name"]));
        }
        return new Response(false, "Database Error");
    }

    public static function add_gallery(Gallery $gallery) : Response
    {
        global $wpdb;
        $wpdb->insert($wpdb->prefix . "gc_gallery", array('name' => $gallery->get_name()));
        $pictures = $gallery->get_pictures();
        foreach($pictures as $picture)
        {

        }
        return new Response(true, $wpdb->insert_id);
    }

    public static function initialize() : void
    {
        global $wpdb;
        $charset_collate = $wpdb->get_charset_collate();

        $sql = "CREATE TABLE `{$wpdb->base_prefix}gc_gallery` (
            id int NOT NULL,
            name varchar (255) NOT NULL,
            PRIMARY KEY (id)   
        ) $charset_collate;";
        $sql .= "CREATE TABLE `{$wpdb->base_prefix}gc_committee` (
            id int NOT NULL,
            type varchar (155) NOT NULL,
            active tinyint (4) NOT NULL,
            position int NOT NULL,
            district varchar (255),
            PRIMARY KEY (id)      
        ) $charset_collate;";
        $sql .= "CREATE TABLE `{$wpdb->base_prefix}gc_picture` (
            id int NOT NULL,
            gallery_id int NOT NULL,
            name varchar (255) NOT NULL,
            picture varchar (255) NOT NULL,
            statement text NOT NULL,
            email varchar (255) NOT NULL,
            function varchar (255) NOT NULL,
            PRIMARY KEY (id)      
        ) $charset_collate;";
        $sql .= "CREATE TABLE `{$wpdb->base_prefix}gc_candidate_picture` (
            id int NOT NULL,
            gallery_id int NOT NULL,
            committee_id int NOT NULL,
            name varchar (255) NOT NULL,
            picture varchar (255) NOT NULL,
            statement text NOT NULL,
            email varchar (255) NOT NULL,
            function varchar (255) NOT NULL,
            age int NOT NULL,
            job varchar (255) NOT NULL,
            family varchar (255) NOT NULL,
            children int NOT NULL,
            grandchildren int NOT NULL,
            PRIMARY KEY (id)      
        ) $charset_collate;";

        require_once (ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);

    }

    public static function remove() : void
    {
        global $wpdb;
        array_map(function ($el) use ($wpdb) {
           $wpdb->query("DROP TABLE IF EXISTS " . $wpdb->base_prefix . $el);
        }, [
            "gc_gallery",
            "gc_committee",
            "gc_picture",
            "gc_candidate_picture"
        ]);
    }

}