from django.urls import path
from .views import ListaHabitaciones, DetalleHabitacion, ListaReservas, DetalleReserva, MyTokenObtainPairView, RegisterView



from rest_framework_simplejwt.views import (


    TokenRefreshView,

)

# Endpoints de mi app
urlpatterns = [
    path('habitaciones/', ListaHabitaciones.as_view(), name='habitaciones-list'),
    path('habitaciones/<int:pk>/', DetalleHabitacion.as_view(), name='habitaciones-detail'),
    path('reservas/', ListaReservas.as_view(), name='reservacion_list'),
    path('reservas/<int:pk>/', DetalleReserva.as_view(), name='reservacion_list'),

    path('register/', RegisterView.as_view(), name='auth_register'),

    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

]