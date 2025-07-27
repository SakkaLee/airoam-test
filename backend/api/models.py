from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
import os
import uuid

def user_directory_path(instance, filename):
    """文件将被上传到 MEDIA_ROOT/user_<id>/<filename>"""
    ext = filename.split('.')[-1]
    filename = f"{uuid.uuid4()}.{ext}"
    return f'uploads/user_{instance.user.id}/{filename}'

class UploadedFile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='uploaded_files')
    file = models.FileField(upload_to=user_directory_path)
    original_filename = models.CharField(max_length=255)
    file_size = models.BigIntegerField()
    file_type = models.CharField(max_length=100)
    upload_date = models.DateTimeField(default=timezone.now)
    description = models.TextField(blank=True, null=True)
    is_public = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-upload_date']
    
    def __str__(self):
        return f"{self.original_filename} - {self.user.username}"
    
    def get_file_size_display(self):
        """返回人类可读的文件大小"""
        for unit in ['B', 'KB', 'MB', 'GB']:
            if self.file_size < 1024.0:
                return f"{self.file_size:.1f} {unit}"
            self.file_size /= 1024.0
        return f"{self.file_size:.1f} TB"

class FileShare(models.Model):
    file = models.ForeignKey(UploadedFile, on_delete=models.CASCADE, related_name='shares')
    share_token = models.CharField(max_length=100, unique=True)
    created_date = models.DateTimeField(default=timezone.now)
    expires_date = models.DateTimeField(null=True, blank=True)
    download_count = models.IntegerField(default=0)
    max_downloads = models.IntegerField(null=True, blank=True)
    
    def __str__(self):
        return f"Share for {self.file.original_filename}"
    
    def is_expired(self):
        if self.expires_date and timezone.now() > self.expires_date:
            return True
        if self.max_downloads and self.download_count >= self.max_downloads:
            return True
        return False 