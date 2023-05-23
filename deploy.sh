#!/bin/bash
rm -rf $2/*
cp -R ./api/* $2/
echo "Done"