#!/bin/bash

# 请将 <API_TOKEN> 和 <SERVICE_ID> 替换为你自己的 Railway 信息，或通过环境变量传入

# 检查 API_TOKEN 是否设置
if [ -z "$API_TOKEN" ]; then
  echo "请设置 API_TOKEN 环境变量或在脚本中填写 API_TOKEN="
  exit 1
fi
# 检查 SERVICE_ID 是否设置
if [ -z "$SERVICE_ID" ]; then
  echo "请设置 SERVICE_ID 环境变量或在脚本中填写 SERVICE_ID="
  exit 1
fi

curl --request POST \
  --url https://backboard.railway.com/graphql/v2 \
  --header "Authorization: Bearer $API_TOKEN" \
  --header "Content-Type: application/json" \
  --data "{\"query\":\"mutation { redeployService(id: \\\"$SERVICE_ID\\\") { id } }\"}" 