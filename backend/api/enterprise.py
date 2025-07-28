import os
import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from django.conf import settings
import openai
from django.utils import timezone

# 配置 OpenAI
openai.api_key = os.environ.get('OPENAI_API_KEY', '')

class AIConsultationView(APIView):
    """AI 技术咨询"""
    permission_classes = [AllowAny]
    
    def post(self, request):
        try:
            company_name = request.data.get('company_name', '')
            industry = request.data.get('industry', '')
            business_goals = request.data.get('business_goals', '')
            current_tech = request.data.get('current_tech', '')
            budget_range = request.data.get('budget_range', '')
            timeline = request.data.get('timeline', '')
            
            if not company_name or not business_goals:
                return Response({'error': '请填写公司名称和业务目标'}, status=status.HTTP_400_BAD_REQUEST)
            
            # 构建咨询提示
            system_prompt = """你是一个专业的AI技术咨询专家，专门为企业提供AI解决方案建议。
            请根据企业信息提供专业的AI技术咨询建议，包括：
            1. 技术选型建议
            2. 实施路径规划
            3. 成本效益分析
            4. 风险评估
            5. 成功案例参考
            
            要求：
            - 建议要具体可行
            - 考虑企业实际情况
            - 提供分阶段实施计划
            - 包含ROI分析"""
            
            user_message = f"""
            企业信息：
            - 公司名称：{company_name}
            - 行业：{industry}
            - 业务目标：{business_goals}
            - 当前技术栈：{current_tech}
            - 预算范围：{budget_range}
            - 时间要求：{timeline}
            
            请提供专业的AI技术咨询建议。
            """
            
            # 调用 OpenAI API
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_message}
                ],
                max_tokens=1200,
                temperature=0.7
            )
            
            consultation = response.choices[0].message.content
            
            return Response({
                'success': True,
                'consultation': consultation,
                'company_name': company_name,
                'timestamp': timezone.now().isoformat(),
                'usage': {
                    'tokens': response.usage.total_tokens,
                    'cost': response.usage.total_tokens * 0.000002
                }
            })
            
        except Exception as e:
            return Response({'error': f'咨询失败: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class CustomDevelopmentView(APIView):
    """定制开发服务"""
    permission_classes = [AllowAny]
    
    def post(self, request):
        try:
            project_name = request.data.get('project_name', '')
            project_type = request.data.get('project_type', '')  # web, mobile, ai, data
            requirements = request.data.get('requirements', '')
            features = request.data.get('features', [])
            timeline = request.data.get('timeline', '')
            budget = request.data.get('budget', '')
            
            if not project_name or not requirements:
                return Response({'error': '请填写项目名称和需求描述'}, status=status.HTTP_400_BAD_REQUEST)
            
            # 构建开发方案
            system_prompt = """你是一个专业的软件开发专家，专门为企业提供定制开发服务。
            请根据项目需求提供详细的开发方案，包括：
            1. 技术架构设计
            2. 开发计划和时间安排
            3. 团队配置建议
            4. 成本估算
            5. 风险评估和应对措施
            
            要求：
            - 方案要具体可执行
            - 考虑技术可行性和成本效益
            - 提供详细的时间节点
            - 包含质量保证措施"""
            
            user_message = f"""
            项目信息：
            - 项目名称：{project_name}
            - 项目类型：{project_type}
            - 需求描述：{requirements}
            - 功能特性：{', '.join(features) if features else '未指定'}
            - 时间要求：{timeline}
            - 预算范围：{budget}
            
            请提供详细的定制开发方案。
            """
            
            # 调用 OpenAI API
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_message}
                ],
                max_tokens=1200,
                temperature=0.7
            )
            
            development_plan = response.choices[0].message.content
            
            return Response({
                'success': True,
                'development_plan': development_plan,
                'project_name': project_name,
                'project_type': project_type,
                'timestamp': timezone.now().isoformat(),
                'usage': {
                    'tokens': response.usage.total_tokens,
                    'cost': response.usage.total_tokens * 0.000002
                }
            })
            
        except Exception as e:
            return Response({'error': f'方案生成失败: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class TrainingProgramView(APIView):
    """技术培训方案"""
    permission_classes = [AllowAny]
    
    def post(self, request):
        try:
            company_name = request.data.get('company_name', '')
            team_size = request.data.get('team_size', '')
            skill_level = request.data.get('skill_level', '')  # beginner, intermediate, advanced
            focus_areas = request.data.get('focus_areas', [])
            training_format = request.data.get('training_format', '')  # online, offline, hybrid
            duration = request.data.get('duration', '')
            
            if not company_name or not focus_areas:
                return Response({'error': '请填写公司名称和培训重点'}, status=status.HTTP_400_BAD_REQUEST)
            
            # 构建培训方案
            system_prompt = """你是一个专业的技术培训专家，专门为企业提供AI技术培训服务。
            请根据企业需求制定详细的培训方案，包括：
            1. 培训课程设计
            2. 学习路径规划
            3. 实践项目安排
            4. 考核评估方式
            5. 培训效果保障
            
            要求：
            - 课程要实用有效
            - 考虑团队技能水平
            - 包含实践环节
            - 提供学习资源推荐"""
            
            user_message = f"""
            培训需求：
            - 公司名称：{company_name}
            - 团队规模：{team_size}
            - 技能水平：{skill_level}
            - 培训重点：{', '.join(focus_areas)}
            - 培训形式：{training_format}
            - 培训时长：{duration}
            
            请制定详细的培训方案。
            """
            
            # 调用 OpenAI API
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_message}
                ],
                max_tokens=1000,
                temperature=0.7
            )
            
            training_plan = response.choices[0].message.content
            
            return Response({
                'success': True,
                'training_plan': training_plan,
                'company_name': company_name,
                'focus_areas': focus_areas,
                'timestamp': timezone.now().isoformat(),
                'usage': {
                    'tokens': response.usage.total_tokens,
                    'cost': response.usage.total_tokens * 0.000002
                }
            })
            
        except Exception as e:
            return Response({'error': f'培训方案生成失败: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class SolutionQuoteView(APIView):
    """解决方案报价"""
    permission_classes = [AllowAny]
    
    def post(self, request):
        try:
            solution_type = request.data.get('solution_type', '')  # consultation, development, training
            company_size = request.data.get('company_size', '')
            project_scope = request.data.get('project_scope', '')
            timeline = request.data.get('timeline', '')
            requirements = request.data.get('requirements', '')
            
            if not solution_type or not project_scope:
                return Response({'error': '请选择解决方案类型和项目范围'}, status=status.HTTP_400_BAD_REQUEST)
            
            # 构建报价方案
            system_prompt = """你是一个专业的解决方案报价专家。
            请根据项目需求提供详细的报价方案，包括：
            1. 服务内容明细
            2. 费用构成分析
            3. 付款方式建议
            4. 增值服务推荐
            5. 性价比分析
            
            要求：
            - 报价要合理透明
            - 详细说明服务内容
            - 提供多种方案选择
            - 突出价值优势"""
            
            user_message = f"""
            项目信息：
            - 解决方案类型：{solution_type}
            - 公司规模：{company_size}
            - 项目范围：{project_scope}
            - 时间要求：{timeline}
            - 具体需求：{requirements}
            
            请提供详细的报价方案。
            """
            
            # 调用 OpenAI API
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_message}
                ],
                max_tokens=800,
                temperature=0.7
            )
            
            quote = response.choices[0].message.content
            
            return Response({
                'success': True,
                'quote': quote,
                'solution_type': solution_type,
                'project_scope': project_scope,
                'timestamp': timezone.now().isoformat(),
                'usage': {
                    'tokens': response.usage.total_tokens,
                    'cost': response.usage.total_tokens * 0.000002
                }
            })
            
        except Exception as e:
            return Response({'error': f'报价生成失败: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 