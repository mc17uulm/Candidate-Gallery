<?php

namespace WPPersons\helper;

use CandidateGallery\Gallery;
use CandidateGallery\Board;

class Database
{

    public static function get_gallery(int $id) : Response
    {
        global $wpdb;
        $res = $wpdb->get_results("SELECT * FROM " . $wpdb->prefix . "gc_gallery WHERE id = " . $id);
        if(count($res) === 1) {
            $gallery = new Gallery($res[0]->name, $res[0]->type);
            $gallery->set_id($id);
            $gallery->set_pictures(self::get_pictures($id));
            return new Response(true, $gallery->parse());
        }
        return new Response(false, "Database Error");
    }

    public static function get_galleries() : Response
    {
        global $wpdb;
        $res = $wpdb->get_results("SELECT * FROM " . $wpdb->prefix . "gc_gallery");
        if(count($res) > 0)
        {
            foreach($res as &$gallery)
            {
                $gallery->pictures = $wpdb->get_results("SELECT picture FROM " . $wpdb->prefix . "gc_picture WHERE gallery_id = " . $gallery->id);
            }

            return new Response(true, $res);
        }
        return new Response(false, "");
    }

    public static function get_pictures(int $gallery_id) : array
    {
        global $wpdb;
        $out = array();
        $res = $wpdb->get_results("SELECT * FROM " . $wpdb->prefix . "gc_picture WHERE gallery_id = " . $gallery_id);
        if(count($res) > 0)
        {
            foreach($res as $picture)
            {
                $image = new Board(
                    $picture->name,
                    $picture->picture,
                    $picture->position,
                    $picture->email,
                    $picture->function,
                    $picture->statement
                );
                $image->set_id($picture->id);
                array_push($out, $image);
            }
        }
        return $out;
    }

    public static function add_gallery(string $name, string $type) : int
    {
        global $wpdb;
        $wpdb->insert($wpdb->prefix . "gc_gallery", array('name' => $name, 'type' => $type));
        return $wpdb->insert_id;
    }

    public static function edit_gallery(int $id, string $name, string $type) : bool
    {
        global $wpdb;

        return $wpdb->update($wpdb->prefix . "gc_gallery", array('name' => $name, 'type' => $type), array("id" => $id)) != 0;
    }

    public static function delete_gallery(array $data) : Response
    {

        if(!empty($data["id"]) && is_int($data["id"]))
        {
            $id = intval($data["id"]);

            global $wpdb;

            $wpdb->delete($wpdb->prefix . "gc_picture", array('gallery_id' => $id));
            $wpdb->delete($wpdb->prefix . "gc_gallery", array('id' => $id));

            return new Response(true);
        }

        return new Response(false, "Invalid request format");
    }

    public static function add_picture(int $gallery_id, string $name, string $picture, string $statement, string $email, string $function, int $position) : int
    {
        global $wpdb;
        $wpdb->insert($wpdb->prefix . "gc_picture", array(
            'gallery_id' => $gallery_id,
            'name' => $name,
            'picture' => $picture,
            'statement' => $statement,
            'email' => $email,
            'function' => $function,
            'position' => $position
        ));

        return $wpdb->insert_id;
    }

    public static function edit_picture(int $id, string $name, string $picture, string $statement, string $email, string $function, int $position) : bool
    {
        global $wpdb;

        return $wpdb->update($wpdb->prefix . 'gc_picture', array(
            'name' => $name,
            'picture' => $picture,
            'statement' => $statement,
            'email' => $email,
            'function' => $function,
            'position' => $position
        ), array('id' => $id));
    }

    public static function delete_picture(int $id) : void
    {
        global $wpdb;

        $wpdb->delete($wpdb->prefix . "gc_picture", array('id' => $id));
    }

    public static function initialize() : void
    {
        global $wpdb;
        $charset_collate = $wpdb->get_charset_collate();

        $sql = "CREATE TABLE `{$wpdb->base_prefix}gc_gallery` (
            id int NOT NULL AUTO_INCREMENT,
            name varchar (255) NOT NULL,
            type varchar (155) NOT NULL,
            PRIMARY KEY (id)   
        ) $charset_collate;";
        $sql .= "CREATE TABLE `{$wpdb->base_prefix}gc_committee` (
            id int NOT NULL AUTO_INCREMENT,
            type varchar (155) NOT NULL,
            active tinyint (4) NOT NULL,
            position int NOT NULL,
            district varchar (255),
            PRIMARY KEY (id)      
        ) $charset_collate;";
        $sql .= "CREATE TABLE `{$wpdb->base_prefix}gc_picture` (
            id int NOT NULL AUTO_INCREMENT,
            gallery_id int NOT NULL,
            name varchar (255) NOT NULL,
            picture varchar (255) NOT NULL,
            statement text NOT NULL,
            email varchar (255) NOT NULL,
            function varchar (255) NOT NULL,
            position int NOT NULL,
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
            "gc_picture"
        ]);
    }

}