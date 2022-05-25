#!/bin/bash
set -a . ".env.$ENVIRONMENT_NAME" set +a
echo "ENVIRONMENT_NAME: $ENVIRONMENT_NAME"
sleep 10
yarn build:development
sleep 10
echo $(ls)
echo $(pwd)
echo "yarn start"
yarn start