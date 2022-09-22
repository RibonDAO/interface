#!/bin/bash
cp docker-compose.yml.sample docker-compose.yml && docker-compose up -d
cd ..
cd core-api && cp docker-compose.yml.sample docker-compose.yml && docker-compose up -d

