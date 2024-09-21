#!/bin/bash
set -e

echo "Stopping & removing old Docker container [$SERVER] and starting a fresh instance of [$SERVER]"

SERVER="my_database_server";
PW="mysecretpassword";
USER="postgres"
DB="my_database";

# Stop and remove the old container if it exists
(docker kill $SERVER || :) && \
(docker rm $SERVER || :) && \

# Start a new PostgreSQL container with the necessary environment variables
docker run --name postgres -p 5433:5432 -h 127.0.0.1 -e POSTGRES_USER=$USER -e POSTGRES_PASSWORD=$PW -v postgres_data:/var/lib/postgresql/data -d postgres
