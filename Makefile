SHELL := /usr/bin/env bash

run: ; 
	docker-compose up -d
	npm start

start: ; 
	docker-compose up -d
	npm start

stop: ; docker-compose down

remove: ; docker-compose down --volumes