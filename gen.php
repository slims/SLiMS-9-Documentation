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
    'Zend'
];

foreach ($excludes as $exclude) {
    $iterator->exclude($exclude);
}
$iterator->in('../../../../app/lib/');

return new Doctum($iterator);
