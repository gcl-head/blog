from django.contrib import admin

# Register your models here.
from backend import models
admin.site.register(models.BlogGroup)
admin.site.register(models.BlogItem)
admin.site.register(models.BlogContent)
