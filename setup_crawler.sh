#!/bin/bash

echo "🕷️ Airoam爬虫配置脚本"
echo "========================"

# 检查爬虫环境
echo "📋 检查爬虫环境..."
cd crawler

if [ ! -d "venv" ]; then
    echo "🔧 创建爬虫虚拟环境..."
    python3 -m venv venv
fi

echo "📦 安装爬虫依赖..."
source venv/bin/activate
pip install -r requirements.txt

# 测试爬虫
echo "🧪 测试爬虫..."
scrapy crawl ainews -s LOG_LEVEL=INFO

if [ $? -eq 0 ]; then
    echo "✅ 爬虫测试成功"
else
    echo "❌ 爬虫测试失败"
    exit 1
fi

# 创建定时任务
echo "⏰ 配置定时任务..."
CRON_JOB="0 */6 * * * cd $(pwd) && source venv/bin/activate && scrapy crawl ainews -s LOG_LEVEL=INFO >> /var/log/airoam/crawler.log 2>&1"

# 检查是否已存在定时任务
if crontab -l 2>/dev/null | grep -q "scrapy crawl ainews"; then
    echo "⚠️ 爬虫定时任务已存在"
else
    # 添加定时任务
    (crontab -l 2>/dev/null; echo "$CRON_JOB") | crontab -
    echo "✅ 爬虫定时任务已添加（每6小时运行一次）"
fi

# 创建日志目录
sudo mkdir -p /var/log/airoam
sudo chown $USER:$USER /var/log/airoam

echo ""
echo "🎉 爬虫配置完成！"
echo "📊 爬虫状态："
echo "- 运行频率：每6小时"
echo "- 日志文件：/var/log/airoam/crawler.log"
echo "- 数据源：arXiv、AI新闻网站"
echo ""
echo "📋 管理命令："
echo "手动运行爬虫: cd crawler && source venv/bin/activate && scrapy crawl ainews"
echo "查看爬虫日志: tail -f /var/log/airoam/crawler.log"
echo "查看定时任务: crontab -l" 