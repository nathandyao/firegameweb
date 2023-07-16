#!/bin/sh
#git clone https://github.com/joyzoursky/docker-python-chromedriver.git
# cd /home/nathan/dev/git/docker-python-chromedriver
# docker run -it -w /home/nathan/dev/git -v /home/nathan/dev/git:/home/nathan/dev/git joyzoursky/python-chromedriver:3.7 bash
#!/bin/sh
# The problem is that the node docker and mongodb docker need to be in same network.
export HOST_DEV_HOME=$HOME/dev/git-nathan
export CONTAINER_DEV_HOME=/home/node/dev/git
export HOST_DATA_HOME=$HOME/dev/data-dev
export CONTAINER_DATA_HOME=/home/node/dev/data
export CURRENT_UID=$(id -u):$(id -g) 

CURRENT_UID=$(id -u):$(id -g)  docker compose -f docker-compose.yml --env-file .env.dev.xps8950  up   -d --no-build firegameweb-dev
docker exec -it firegameweb-dev-cntr /bin/bash