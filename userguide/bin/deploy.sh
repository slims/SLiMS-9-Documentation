#!/bin/bash
echo "Building for production"
cp env.prod.js env.js
echo "Truncating build folder"
rm -rf ./build/*
npm run build
echo "Deploy to web server"
rm -rf /var/www/html/docs/* && cp -vR build/* /var/www/html/docs/
echo "Done"