#!/bin/bash
if (( $EUID == 0 )); then
    echo "Don't run as root"
    exit
fi
rm -rf ./api/*
php doctum.phar update builder.php
cp -vR ./build/* ./api/
echo "Done"
