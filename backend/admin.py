from django.contrib import admin

# Register your models here.
from backend import models


class AuthorAdmin(admin.ModelAdmin):
    list_display = ('href', 'title', 'name')   # 指定要显示的字段
    search_fields = ('name',)               # 指定要搜索的字段，将会出现一个搜索框让管理员搜索关键词
    # fields = ('href', 'title', 'name')    # 自定义编辑表单，在编辑表单的时候 显示哪些字段，显示的属性


admin.site.register(models.BlogItem, AuthorAdmin)
admin.site.register(models.BlogGroup)
# admin.site.register(models.BlogItem)
admin.site.register(models.BlogContent)
