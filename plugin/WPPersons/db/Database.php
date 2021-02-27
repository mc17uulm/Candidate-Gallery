<?php

namespace WPPersons\db;

final class Database {

    private const TABLES = [

    ];

    /**
     * @return string
     */
    public static function get_prefix() : string {
        global $wpdb;

        return $wpdb->base_prefix;
    }

    /**
     * @param string $query
     * @param mixed ...$fields
     * @return array
     */
    public static function select(string $query, ...$fields) : array {
        global $wpdb;

        return $wpdb->get_results(
            count($fields) === 0 ? $query : $wpdb->prepare($query, $fields),
            ARRAY_A
        );
    }

    /**
     * @param string $query
     * @param mixed ...$fields
     * @return int
     * @throws DatabaseException
     */
    public static function insert(string $query, ...$fields) : int {
        global $wpdb;

        $res = $wpdb->query($wpdb->prepare($query, $fields));
        if(!$res) throw new DatabaseException("Internal Server Error", "Error inserting db entry: '{$wpdb->last_error}'");
        return $wpdb->insert_id;
    }

    /**
     * @param string $query
     * @param mixed ...$fields
     * @return bool
     */
    public static function update(string $query, ...$fields) : bool {
        global $wpdb;

        return $wpdb->query($wpdb->prepare($query, $fields)) > 0;
    }

    /**
     * @param string $query
     * @param mixed ...$fields
     * @return bool
     */
    public static function delete(string $query, ...$fields) : bool {
        return self::update($query, $fields);
    }

    public static function create_db() : void {
        global $wpdb;

        $charset = $wpdb->get_charset_collate();

        $sql = "";

        require_once (ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }

    public static function drop_db() : void {
        global $wpdb;

        array_map(function (string $table) use ($wpdb) {
            $wpdb->query("DROP TABLE IF EXISTS " . $wpdb->base_prefix . $table);
        }, self::TABLES);
    }

}