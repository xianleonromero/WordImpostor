from django.db import models
from django.contrib.auth.models import User

class Partida(models.Model):
    ESTADOS = [
        ('ESPERANDO', 'Esperando'),
        ('JUGANDO', 'Jugando'),
        ('FINALIZADA', 'Finalizada'),
    ]

    codigo = models.CharField(max_length=8, unique=True)
    estado = models.CharField(max_length=20, choices=ESTADOS, default='ESPERANDO')
    palabra_secreta = models.CharField(max_length=100, blank=True)
    categoria = models.CharField(max_length=100, blank=True)
    max_jugadores = models.IntegerField(default=6)
    num_impostores = models.IntegerField(default=1)
    es_publica = models.BooleanField(default=True)
    ronda_actual = models.IntegerField(default=0)
    creador = models.ForeignKey(User, on_delete=models.CASCADE, related_name='partidas_creadas')
    creada_en = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Partida {self.codigo} - {self.estado}"


class PartidaJugador(models.Model):
    ROLES = [
        ('NORMAL', 'Normal'),
        ('IMPOSTOR', 'Impostor'),
    ]

    partida = models.ForeignKey(Partida, on_delete=models.CASCADE, related_name='jugadores')
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='partidas_jugadas')
    rol = models.CharField(max_length=10, choices=ROLES, blank=True)
    palabra_escrita = models.CharField(max_length=10, blank=True)
    eliminado = models.BooleanField(default=False)
    puntos_obtenidos = models.IntegerField(default=0)
    unido_en = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('partida', 'usuario')

    def __str__(self):
        return f"{self.usuario.username} en {self.partida.codigo} - {self.rol}"


class Perfil(models.Model):
    usuario = models.OneToOneField(User, on_delete=models.CASCADE, related_name='perfil')
    puntos_totales = models.IntegerField(default=0)
    partidas_jugadas = models.IntegerField(default=0)
    victorias = models.IntegerField(default=0)
    derrotas = models.IntegerField(default=0)

    def __str__(self):
        return f"Perfil de {self.usuario.username}"