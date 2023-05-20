# Importamos los modelos y serializadores
from .serializers import ReservaSerializer, HabitacionSerializer, RegisterSerializer
from .models import Habitacion, Reserva

#Importamos herramientas de la libreria DRF
from rest_framework.response import Response
from rest_framework import status,generics

from django.contrib.auth.models import User

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from rest_framework.permissions import AllowAny


#Importamos la libreria datetime
import datetime 

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username
        token['is_superuser'] = user.is_superuser
        token['user_id'] = user.id
        
        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer



class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer
    
class ListaHabitaciones(generics.ListCreateAPIView):
    queryset = Habitacion.objects.all()
    serializer_class = HabitacionSerializer
    

class DetalleHabitacion(generics.RetrieveAPIView):
    queryset = Habitacion.objects.all()
    serializer_class = HabitacionSerializer


class ListaReservas(generics.ListCreateAPIView):
    queryset = Reserva.objects.all()
    serializer_class = ReservaSerializer

    #Logica de Boolean Disponible Habitacion
    def perform_create(self, serializer):
        habitacion_id = self.request.data.get('habitacion') # Trae la info de la habitacion que se va a reservar
        habitacion = Habitacion.objects.get(id=habitacion_id) # Obtiene la habitacion
        habitacion.disponible = False # Una vez que se reserva, la disponibilidad pasa a False
        habitacion.save() # Se Guarda esa habitacion
        serializer.save() # Se guardan los cambios

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    #Logica para determinar la fecha final de la reserva.
    def get_queryset(self):
        reservas_finalizadas = Reserva.objects.filter(fecha_fin__lt=datetime.datetime.now()) #OBTENGO RESERVAS CON FECHA FIN, MENORES A LA FECHA ACTUAL QUIERE DECIR QUE YA FINALIZARON
        for reserva in reservas_finalizadas: #RECORRO ESAS RESERVAS
            habitacion = reserva.habitacion #ASIGNAMOS LA HABITACION QUE FUE RESERVADA EN UNA VARIABLE
            habitacion.disponible = True #UNA VEZ QUE FINALIZA LA RESERVA, DISPONIBLE PASA A TRUE
            habitacion.save() #GUARDAMOS LOS CAMBIOS
            reserva.delete() #BORRAMOS LA RESERVA
        queryset = super().get_queryset() #APLICAMOS CAMBIOS
        return queryset
    


class DetalleReserva(generics.RetrieveUpdateDestroyAPIView):
    queryset = Reserva.objects.all()
    serializer_class = ReservaSerializer

    def perform_destroy(self, instance):
        habitacion = instance.habitacion
        habitacion.disponible = True
        habitacion.save()
        super().perform_destroy(instance)

