# Generated by Django 5.1.5 on 2025-01-29 21:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('console_api', '0008_alter_sesiontime_timesession'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sesiontime',
            name='timeSession',
            field=models.FloatField(blank=True, null=True),
        ),
    ]
