#!/bin/sh

yarn knex migrate:latest
yarn dev
