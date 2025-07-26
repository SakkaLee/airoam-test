#!/bin/bash

# 请将 <API_TOKEN> 和 <SERVICE_ID> 9ncysfs0.up.railway.app
API_TOKEN="<da624b8f-9eab-4bbc-a590-9ff87fe7814eN>"
image.pngSERVICE_ID="<SERVICE_ID>"

curl --request POST \
  --url https://backboard.railway.com/graphql/v2 \
  --header "Authorization: Bearer $API_TOKEN" \
  --header "Content-Type: application/json" \
  --data "{\"query\":\"mutation { redeployService(id: \\\"$SERVICE_ID\\\") { id } }\"}" 