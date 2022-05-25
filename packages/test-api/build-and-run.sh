#!/bin/bash
set -a . ".env.$ENVIRONMENT_NAME" set +a
echo "ENVIRONMENT_NAME: $ENVIRONMENT_NAME"
sleep 10
yarn build:development
yarn start