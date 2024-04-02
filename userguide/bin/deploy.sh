#!/bin/bash
if (( $EUID == 0 )); then
    echo "Don't run as root"
    exit
fi

echo "Building for production"
rm env.js
cp env.prod.js env.js
echo "Truncating build folder"
rm -rf ./build/*
npm run build
echo "Deploy to web server"
#rm -rf $1 && cp -vR ./build/* $1
echo "Done"
cp env.sample.js env.js
