#!/bin/bash

# 检查 Python 版本
PYTHON_VERSION=$(python3 --version 2>&1)
echo "当前 Python 版本: $PYTHON_VERSION"
if [[ "$PYTHON_VERSION" != *"3.10"* && "$PYTHON_VERSION" != *"3.11"* ]]; then
  echo "警告：推荐使用 Python 3.10 或 3.11，当前为 $PYTHON_VERSION"
fi

# 检查 pip 是否可用
if ! command -v pip &> /dev/null; then
  echo "错误：pip 未安装或不可用"
  exit 1
fi

# 检查 requirements.txt 是否锁定具体版本
if grep -E '^[a-zA-Z0-9_-]+[=<>!~]*$' backend/requirements.txt | grep -v '==' | grep -v '^#' | grep -v '^$'; then
  echo "警告：requirements.txt 存在未锁定版本的依赖，请全部指定为==具体版本"
fi

# 检查关键环境变量
if [ -z "$API_TOKEN" ]; then
  echo "警告：API_TOKEN 未设置"
fi
if [ -z "$SERVICE_ID" ]; then
  echo "警告：SERVICE_ID 未设置"
fi

echo "自动化检测完成。如有警告请及时修正。" 