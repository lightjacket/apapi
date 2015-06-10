#!/bin/sh
mv * ..
mv .[!.]* ..
cd ..
rm -r jb-base-project
rm -r -f .git
npm install;
