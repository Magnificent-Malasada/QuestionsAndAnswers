#!/bin/bash

if [ "$EUID" -ne 0 ]; then
  echo "Please run as root by prefixing the command with sudo"
  exit
fi

apt-get update
apt-get install -y docker.io docker-compose make

actual_user="$(who am i | awk '{print $1}')"
usermod -aG docker $actual_user 
#su - $actual_user -c "newgrp docker"
