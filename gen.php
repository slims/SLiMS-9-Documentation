<?php

use Doctum\Doctum;
use Symfony\Component\Finder\Finder;

$iterator = Finder::create()
    ->files()
    ->name('*.php');

$excludes = [
    'parsedown',
    'phpplot',
    'collection',
    'oaipmh',
    'ezyang',
    'phpoffice',
    'sphinx',
    'symfony',
    'mysqldump-php',
    'csrf',
    'lang',
    'guzzlehttp',
    'uuid',
    'nesbot',
    'marc',
    'zend',
    'recaptcha',
    'phpbarcode',
    'PHPMailer',
    'markbaker',
    'maennchen',
    'math',
    'flex',
    'psr',
    'myclabs',
    'Zend',
    'spomky-labs',
    'paragonie',
    'phpseclib',
    'league',
    'bacon',
    'dasprid'
];

foreach ($excludes as $exclude) {
    $iterator->exclude($exclude);
}
$iterator->in('../../docker4slims/app/lib/');

return new Doctum($iterator);
