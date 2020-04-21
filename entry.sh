#!/bin/bash

# Docker entrypoint script.

mix deps.get

cd assets
npm install
cd ../
mix phx.server
