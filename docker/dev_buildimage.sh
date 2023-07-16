#!/bin/sh
export PUID=`id -u $USER`
export PGID=`getent group docker | cut -d: -f3`


docker image build --no-cache \
                --build-arg PUID=$PUID \
                --build-arg PGID=$PGID \
                --build-arg USER=$USER \
                 --tag firegameweb-dev \
                 -f Dockerfile.dev .