# Generated by Django 5.1 on 2024-08-26 09:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quiz', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='quiz',
            name='title',
            field=models.CharField(default='QUIZ TITLE DEFAULT', max_length=255),
        ),
    ]
