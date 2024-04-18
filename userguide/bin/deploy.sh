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
echo "Building Documentation"
npm run build
if [ ! -d ../userdoc-git/ ]; then
  git clone git@github.com:slims/slims.github.io/ ../userdoc-git/
fi
echo "Deploy to github and prepare to push"
rm -rf ../userdoc-git/docs/*
mv ./build/* ../userdoc-git/docs/
cd ../userdoc-git/
now="$(date +'%d/%m/%Y %r')"
git add .
git commit -m "Update doc $now"
git push origin main
echo "Done"
cp env.sample.js env.js
