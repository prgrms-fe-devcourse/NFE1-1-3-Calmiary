#!/bin/bash

# Update package list and install Redis
apt-get update
apt-get install -y redis-server

# Install Python dependencies
pip install -r requirements.txt