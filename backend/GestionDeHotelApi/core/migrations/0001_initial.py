# Generated by Django 4.0.6 on 2023-05-18 06:14

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Cliente',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=150)),
                ('apellido', models.CharField(max_length=150)),
                ('email', models.EmailField(max_length=254, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Habitacion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('numero', models.IntegerField(null=True, unique=True)),
                ('imagen', models.URLField(blank=True, null=True)),
                ('tipo', models.CharField(choices=[('Individual', 'Individual'), ('Doble', 'Doble'), ('Suite', 'Suite'), ('Suite doble', 'Suite doble'), ('Semi suite', 'Semi suite')], default='Individual', max_length=11)),
                ('precio', models.DecimalField(decimal_places=3, max_digits=6)),
                ('disponible', models.BooleanField(default=True)),
                ('descripcion', models.TextField(blank=True, max_length=250, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Reserva',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha_inicio', models.DateTimeField(default=django.utils.timezone.now)),
                ('fecha_fin', models.DateTimeField()),
                ('precio', models.DecimalField(decimal_places=3, max_digits=6)),
                ('cliente', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.cliente')),
                ('habitacion', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.habitacion')),
            ],
        ),
    ]
