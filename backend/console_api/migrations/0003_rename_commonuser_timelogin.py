# Generated by Django 5.1.5 on 2025-01-28 19:35

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('console_api', '0002_rename_timelogin_commonuser'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RenameModel(
            old_name='CommonUser',
            new_name='TimeLogin',
        ),
    ]
