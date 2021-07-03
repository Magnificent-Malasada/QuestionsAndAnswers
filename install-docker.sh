#!/bin/bash

if [ "$EUID" -ne 0 ]; then
  echo "Please run as root by prefixing the command with sudo"
  exit
fi

apt-get update
apt-get install docker.io

usermod -aG docker $USER
newgrp docker
