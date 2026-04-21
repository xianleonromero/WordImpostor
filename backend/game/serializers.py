from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Partida, PartidaJugador, Perfil

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class PerfilSerializer(serializers.ModelSerializer):
    usuario = UsuarioSerializer()
    class Meta:
        model = Perfil
        fields = ['usuario', 'puntos_totales', 'partidas_jugadas', 'victorias', 'derrotas']

class PartidaJugadorSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='usuario.username', read_only=True)
    class Meta:
        model = PartidaJugador
        fields = ['id', 'username', 'rol', 'palabra_escrita', 'eliminado', 'puntos_obtenidos']

class PartidaSerializer(serializers.ModelSerializer):
    jugadores = PartidaJugadorSerializer(many=True, read_only=True)
    creador_username = serializers.CharField(source='creador.username', read_only=True)
    class Meta:
        model = Partida
        fields = ['id', 'codigo', 'estado', 'categoria', 'max_jugadores', 'num_impostores', 'es_publica', 'ronda_actual', 'creador_username', 'jugadores', 'creada_en']