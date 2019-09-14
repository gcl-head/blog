from django.db import models


class BlogGroup(models.Model):
    kind = models.CharField(max_length=5, null=True)  # 博客类别
    href = models.CharField(max_length=10, null=True)  # 类别对应href


class BlogItem(models.Model):
    # kind = models.CharField(max_length=5, null=True)
    href = models.CharField(max_length=10, null=True)
    title = models.CharField(max_length=25, null=True)  # 博客大标题
    name = models.CharField(max_length=25, null=True)  # 博客小标题


class BlogContent(models.Model):
    href = models.CharField(max_length=10, null=True)
    name = models.CharField(max_length=25, null=True)
    text = models.TextField(null=True)  # 博客内容markdown


