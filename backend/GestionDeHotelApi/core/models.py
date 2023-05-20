from django.db import models
from model_utils import Choices
from django.utils import timezone

from django.contrib.auth.models import User



class Habitacion(models.Model):
    #Tipo de habitacion Sencilla, Suite, Doble, Matrimonial
    TIPOS = Choices(
       ('Individual', 'Individual'),
       ('Doble', 'Doble'),
       ('Suite', 'Suite'),
       ('Suite doble', 'Suite doble'),
       ('Semi suite', 'Semi suite'),
    )

    numero = models.IntegerField(unique=True, null=True, blank=False)
    imagen = models.URLField(max_length = 200, null=True, blank=True)
    tipo = models.CharField(max_length=11, choices=TIPOS, default=TIPOS.Individual)
    precio = models.DecimalField(max_digits=6, decimal_places=3)
    disponible = models.BooleanField(default=True)
    descripcion = models.TextField(max_length=250, null=True, blank=True)

    def __str__(self):
        return f"Habitacion {self.numero}, Tipo: {self.tipo}"


class Reserva(models.Model):
    habitacion = models.ForeignKey(Habitacion,on_delete=models.CASCADE)
    cliente = models.ForeignKey(User, on_delete=models.CASCADE)
    fecha_inicio = models.DateTimeField(default=timezone.now)
    fecha_fin = models.DateTimeField()
    precio = models.DecimalField(max_digits=6, decimal_places=3)
    
    def __str__(self):
        return f"Reserva de: {self.cliente} para la habitacion: {self.habitacion.numero}, Tipo: {self.habitacion.tipo}"