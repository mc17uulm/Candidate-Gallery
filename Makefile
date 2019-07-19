SHELL := /usr/bin/env bash

run: ; 
	docker-compose up -d

start: ; 
	docker-compose up -d

stop: ; docker-compose down

remove: ; docker-compose down --volumes

execute: ; ./build.sh