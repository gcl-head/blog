# Generated by Django 2.2.3 on 2019-09-14 06:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0002_auto_20190914_0443'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='blogitem',
            name='kind',
        ),
        migrations.AddField(
            model_name='blogcontent',
            name='href',
            field=models.CharField(max_length=10, null=True),
        ),
    ]
