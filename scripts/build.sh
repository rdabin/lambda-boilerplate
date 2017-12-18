#!/usr/bin/env bash

rm -rf lambda_dist && mkdir lambda_dist

cp dist/index.js lambda_dist/index.js
cp config.production.json lambda_dist/config.json
cp -r dist/src lambda_dist

rm -rf node_modules && npm install --production --quiet
cp -r node_modules lambda_dist/node_modules

zip -r lambda_dist/release.zip lambda_dist/