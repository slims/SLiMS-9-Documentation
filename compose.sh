#!/bin/bash
rm -rf api/*
php doctum.phar update builder.php
cp -vR build/* api/
echo "Done"
