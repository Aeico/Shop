# Generated by Django 4.0.1 on 2022-02-07 20:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0006_user_changed_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='changed_date',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
