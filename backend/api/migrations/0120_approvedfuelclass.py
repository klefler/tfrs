# -*- coding: utf-8 -*-
# Generated by Django 1.11.20 on 2019-04-12 22:59
from __future__ import unicode_literals

import db_comments.model_mixins
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0119_add_approved_fuel_descriptions'),
    ]

    operations = [
        migrations.CreateModel(
            name='ApprovedFuelClass',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('create_timestamp', models.DateTimeField(auto_now_add=True, null=True)),
                ('update_timestamp', models.DateTimeField(auto_now=True, null=True)),
                ('create_user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='api_approvedfuelclass_CREATE_USER', to=settings.AUTH_USER_MODEL)),
                ('fuel', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='approved_fuel_class', to='api.ApprovedFuel')),
                ('fuel_class', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='approved_fuel_class', to='api.FuelClass')),
                ('update_user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='api_approvedfuelclass_UPDATE_USER', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'approved_fuel_class',
            },
            bases=(models.Model, db_comments.model_mixins.DBComments),
        ),
    ]