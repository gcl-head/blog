from django.db import models


class BlogGroup(models.Model):
    kind = models.CharField(max_length=5, null=True)  # 博客类别
    href = models.CharField(max_length=10, null=True)  # 类别对应href


class BlogItem(models.Model):
    # kind = models.CharField(max_length=5, null=True)
    href = models.CharField(max_length=10, null=True)
    title = models.CharField(max_length=25, null=True)  # 博客大标题
    name = models.CharField(max_length=25, null=True)  # 博客小标题
    item_order = models.IntegerField(default=0)  # 菜单顺序
    content_order = models.IntegerField(default=0)  # 子菜单顺序


class BlogContent(models.Model):
    href = models.CharField(max_length=10, null=True)
    name = models.CharField(max_length=25, null=True)
    text = models.TextField(null=True)  # 博客内容markdown
    create_timestamp = models.DateTimeField(auto_now_add=True, null=True)  # 首次创建时间
    last_edit_timestamp = models.DateTimeField(auto_now=True, null=True)  # 最后修改时间


