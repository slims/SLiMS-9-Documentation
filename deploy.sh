#!/bin/bash
echo Deploy APi to $2
rm -rf $2/*
cp -R ./api/* $2/
echo "Done"
