<?php

namespace WPPersons;

use Exception;

/**
 * Class PluginException
 * @package WPPersons
 */
class PluginException extends Exception
{

    /**
     * @var string
     */
    private string $debug_msg = "";

    /**
     * PluginException constructor.
     * @param string $message
     * @param string $debug_msg
     */
    public function __construct(string $message = "", string $debug_msg = "")
    {
        parent::__construct($message);
        $this->debug_msg = $debug_msg;
    }

    /**
     * @return string
     */
    public function get_debug_msg() : string {
        return $this->debug_msg;
    }

}