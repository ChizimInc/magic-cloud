# Generated by Django 4.0 on 2022-02-25 16:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cloud', '0008_file_filedata'),
    ]

    operations = [
        migrations.CreateModel(
            name='FileUpload',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.FileField(upload_to='')),
            ],
        ),
    ]
