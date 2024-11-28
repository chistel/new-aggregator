#!/usr/bin/env bash

echo "Running create-testing-database.sh..."

mysql --user=root --password="$MYSQL_ROOT_PASSWORD" <<-EOSQL
    CREATE DATABASE IF NOT EXISTS testing;
    GRANT ALL PRIVILEGES ON \`testing%\`.* TO '$MYSQL_USER'@'%';
EOSQL

echo "Finished running create-testing-database.sh."
