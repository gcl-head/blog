# Generated by Django 2.2.3 on 2019-09-14 01:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='BlogGroup',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('kind', models.CharField(max_length=5)),
            ],
        ),
        migrations.CreateModel(
            name='BlogItem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=25)),
                ('kind', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.BlogGroup')),
            ],
        ),
        migrations.CreateModel(
            name='BlogContent',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=25)),
                ('title', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.BlogItem')),
            ],
        ),
    ]
