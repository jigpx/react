#!/bin/bash

# Define the repository
REPO="jigpx/react"

# Read the .env.local file and add each variable to GitHub
while IFS= read -r line; do
  if [[ $line == *"="* ]]; then
    IFS='=' read -r key value <<< "$line"
    gh secret set "$key" -b"$value" -R "$REPO"
  fi
done < .env.local