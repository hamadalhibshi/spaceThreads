# Generated by Django 3.2.13 on 2023-09-12 19:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api_story', '0009_auto_20230912_1638'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='reply',
            name='reviewId',
        ),
    ]
