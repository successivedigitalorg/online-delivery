#!/bin/bash
echo "Enter your GitHub Personal Access Token:"
read -s TOKEN
curl -X POST \
  -H "Authorization: token $TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/orgs/successivedigitalorg/repos \
  -d '{
    "name": "online-delivery",
    "description": "Online Pizza Delivery Application",
    "private": false
  }'
