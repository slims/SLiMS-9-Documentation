<?php

use Doctum\Doctum;
use Symfony\Component\Finder\Finder;
use Symfony\Component\Filesystem\Filesystem;

try {
    $env = function(string $prop) {
        if (!file_exists($path = __DIR__ . '/env.php')) throw new Exception("env.php is not exists!");
        
        $env = require $path;
        return $env[$prop]??throw new Exception("$prop is not exists in env!");
    };
    
    $filesystem = new Filesystem();
    $filesystem->remove($env('remove_on_build'));

    $iterator = Finder::create()
        ->files()
        ->name('*.php');
    
    foreach ($env('excludes') as $exclude) {
        $iterator->exclude($exclude);
    }

    $iterator->in($env('path'));
    
} catch (Exception $e) {
    exit($e->getMessage() . PHP_EOL);
}

return new Doctum($iterator);