#!/usr/bin/env python3
import requests
import os
import tempfile

def test_file_upload():
    """测试文件上传功能"""
    print("🚀 开始测试文件上传功能...")
    
    # 创建测试文件
    with tempfile.NamedTemporaryFile(mode='w', suffix='.txt', delete=False) as f:
        f.write("这是一个测试文件，用于验证上传功能。\n")
        f.write("Hello World! 文件上传测试成功！")
        test_file_path = f.name
    
    try:
        # 准备上传数据
        with open(test_file_path, 'rb') as f:
            files = {'file': ('test.txt', f, 'text/plain')}
            data = {
                'description': '测试文件上传功能',
                'is_public': 'true'
            }
            
            print("📤 正在上传文件...")
            response = requests.post(
                'http://localhost:8000/api/upload/',
                files=files,
                data=data
            )
        
        if response.status_code == 201:
            result = response.json()
            print("✅ 文件上传成功！")
            print(f"   文件ID: {result['file']['id']}")
            print(f"   文件名: {result['file']['original_filename']}")
            print(f"   文件大小: {result['file']['file_size_display']}")
            print(f"   下载链接: {result['file']['download_url']}")
            
            # 测试下载
            print("\n📥 测试文件下载...")
            download_response = requests.get(result['file']['download_url'])
            if download_response.status_code == 200:
                print("✅ 文件下载成功！")
                print(f"   下载内容: {download_response.text[:50]}...")
            else:
                print("❌ 文件下载失败")
                
        else:
            print(f"❌ 文件上传失败: {response.status_code}")
            print(f"   错误信息: {response.text}")
            
    except requests.exceptions.ConnectionError:
        print("❌ 无法连接到服务器，请确保后端服务器正在运行")
    except Exception as e:
        print(f"❌ 测试过程中出现错误: {e}")
    finally:
        # 清理测试文件
        if os.path.exists(test_file_path):
            os.unlink(test_file_path)

def test_public_files():
    """测试公开文件列表"""
    print("\n📋 测试公开文件列表...")
    try:
        response = requests.get('http://localhost:8000/api/public-files/')
        if response.status_code == 200:
            result = response.json()
            print(f"✅ 获取公开文件列表成功！")
            print(f"   文件总数: {result['total_count']}")
            for file in result['files']:
                print(f"   - {file['original_filename']} ({file['file_size_display']})")
        else:
            print(f"❌ 获取公开文件列表失败: {response.status_code}")
    except Exception as e:
        print(f"❌ 测试公开文件列表时出现错误: {e}")

def test_news_api():
    """测试新闻API"""
    print("\n📰 测试新闻API...")
    try:
        response = requests.get('http://localhost:8000/api/news/')
        if response.status_code == 200:
            result = response.json()
            print(f"✅ 获取新闻列表成功！")
            print(f"   新闻总数: {result['total_count']}")
            for i, news in enumerate(result['news'][:3]):
                print(f"   {i+1}. {news['title']}")
        else:
            print(f"❌ 获取新闻列表失败: {response.status_code}")
    except Exception as e:
        print(f"❌ 测试新闻API时出现错误: {e}")

if __name__ == "__main__":
    print("=" * 50)
    print("🧪 Airoam 文件上传功能测试")
    print("=" * 50)
    
    test_news_api()
    test_public_files()
    test_file_upload()
    
    print("\n" + "=" * 50)
    print("🎉 测试完成！")
    print("=" * 50) 