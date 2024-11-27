#!/bin/bash

set -x

function graceful_handle {
  echo "Caught exit signal"
  while [[ $(ps aux | grep "php artisan" | egrep -v "schedule:run|grep" | wc -l) > 0 ]]; do
    echo "Some jobs still running, waiting for them to stop..."
    sleep 5
  done
  echo "I'm out!"
  echo "Bye..."
  exit $?
}
  trap graceful_handle HUP
  trap graceful_handle INT
  trap graceful_handle QUIT

  while true
  do
    php artisan schedule:run --verbose --no-interaction &
    echo "All tasks completed. Taking a nap..."
    sleep 60
  done

fi
