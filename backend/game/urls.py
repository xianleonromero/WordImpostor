from django.urls import path
from . import views

urlpatterns = [
    # Autenticacion
    path('auth/register/', views.register),
    path('auth/login/', views.login),

    # Partidas
    path('games/', views.lista_partidas),
    path('games/crear/', views.crear_partida),
    path('games/<str:codigo>/', views.detalle_partida),
    path('games/<str:codigo>/update/', views.actualizar_partida),
    path('games/<str:codigo>/delete/', views.eliminar_partida),
    path('games/<str:codigo>/unirse/', views.unirse_partida),

    # Ranking
    path('users/ranking/', views.ranking),
]