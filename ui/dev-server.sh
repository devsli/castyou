#!/bin/sh

apk -U add git

# TODO: use yarn
npm install
npm install --only=dev
npm start
