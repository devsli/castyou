#!/bin/sh

apk -U add git

npm install
npm install --only=dev
npm start
