from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
import random
import string

from .models import Partida, PartidaJugador, Perfil
from .serializers import PartidaSerializer, PartidaJugadorSerializer, PerfilSerializer

#AUTENTICACION

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    if not username or not email or not password:
        return Response({'error': 'Faltan campos'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Usuario ya existe'}, status=status.HTTP_409_CONFLICT)

    user = User.objects.create_user(username=username, email=email, password=password)
    Perfil.objects.create(usuario=user)

    return Response({'message': 'Usuario creado correctamente'}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)
    if user is None:
        return Response({'error': 'Credenciales incorrectas'}, status=status.HTTP_401_UNAUTHORIZED)

    refresh = RefreshToken.for_user(user)
    return Response({
        'token': str(refresh.access_token),
        'username': user.username,
    })


#PARTIDAS

@api_view(['GET'])
@permission_classes([AllowAny])
def lista_partidas(request):
    # Parámetro en query: ?estado=ESPERANDO
    estado = request.query_params.get('estado', None)

    partidas = Partida.objects.filter(es_publica=True)
    if estado:
        partidas = partidas.filter(estado=estado)

    serializer = PartidaSerializer(partidas, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def crear_partida(request):
    max_jugadores = request.data.get('max_jugadores', 6)
    num_impostores = request.data.get('num_impostores', 1)
    es_publica = request.data.get('es_publica', True)

    codigo = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))

    partida = Partida.objects.create(
        codigo=codigo,
        max_jugadores=max_jugadores,
        num_impostores=num_impostores,
        es_publica=es_publica,
        creador=request.user
    )

    PartidaJugador.objects.create(partida=partida, usuario=request.user)

    serializer = PartidaSerializer(partida)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([AllowAny])
def detalle_partida(request, codigo):
    # Parámetro en path: /api/games/ABC123/
    try:
        partida = Partida.objects.get(codigo=codigo)
    except Partida.DoesNotExist:
        return Response({'error': 'Partida no encontrada'}, status=status.HTTP_404_NOT_FOUND)

    serializer = PartidaSerializer(partida)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def actualizar_partida(request, codigo):
    # Parámetro en path + body
    try:
        partida = Partida.objects.get(codigo=codigo)
    except Partida.DoesNotExist:
        return Response({'error': 'Partida no encontrada'}, status=status.HTTP_404_NOT_FOUND)

    if partida.creador != request.user:
        return Response({'error': 'No tienes permiso'}, status=status.HTTP_403_FORBIDDEN)

    partida.estado = request.data.get('estado', partida.estado)
    partida.save()

    serializer = PartidaSerializer(partida)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def eliminar_partida(request, codigo):
    # Parámetro en path
    try:
        partida = Partida.objects.get(codigo=codigo)
    except Partida.DoesNotExist:
        return Response({'error': 'Partida no encontrada'}, status=status.HTTP_404_NOT_FOUND)

    if partida.creador != request.user:
        return Response({'error': 'No tienes permiso'}, status=status.HTTP_403_FORBIDDEN)

    partida.delete()
    return Response({'message': 'Partida eliminada'}, status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def unirse_partida(request, codigo):
    # Parámetro en path
    try:
        partida = Partida.objects.get(codigo=codigo)
    except Partida.DoesNotExist:
        return Response({'error': 'Partida no encontrada'}, status=status.HTTP_404_NOT_FOUND)

    if partida.estado != 'ESPERANDO':
        return Response({'error': 'La partida ya ha empezado'}, status=status.HTTP_400_BAD_REQUEST)

    if partida.jugadores.count() >= partida.max_jugadores:
        return Response({'error': 'Partida llena'}, status=status.HTTP_400_BAD_REQUEST)

    PartidaJugador.objects.get_or_create(partida=partida, usuario=request.user)

    serializer = PartidaSerializer(partida)
    return Response(serializer.data)


#RANKING

@api_view(['GET'])
@permission_classes([AllowAny])
def ranking(request):
    # Parámetro en query: ?limit=10
    limit = int(request.query_params.get('limit', 10))
    perfiles = Perfil.objects.order_by('-puntos_totales')[:limit]
    serializer = PerfilSerializer(perfiles, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def iniciar_partida(request, codigo):
    try:
        partida = Partida.objects.get(codigo=codigo)
    except Partida.DoesNotExist:
        return Response({'error': 'Partida no encontrada'}, status=status.HTTP_404_NOT_FOUND)

    if partida.creador != request.user:
        return Response({'error': 'No tienes permiso'}, status=status.HTTP_403_FORBIDDEN)

    jugadores = list(partida.jugadores.all())
    if len(jugadores) < 3:
        return Response({'error': 'Mínimo 3 jugadores'}, status=status.HTTP_400_BAD_REQUEST)

    # Asignar roles aleatoriamente
    import random
    random.shuffle(jugadores)
    num_impostores = partida.num_impostores

    for i, jugador in enumerate(jugadores):
        jugador.rol = 'IMPOSTOR' if i < num_impostores else 'NORMAL'
        jugador.save()

    # Asignar palabra secreta
    palabras = [
        ('Animales', 'LEÓN'), ('Animales', 'TIGRE'), ('Animales', 'ELEFANTE'),
        ('Deportes', 'FÚTBOL'), ('Deportes', 'TENIS'), ('Deportes', 'NATACIÓN'),
        ('Comida', 'PIZZA'), ('Comida', 'SUSHI'), ('Comida', 'PAELLA'),
    ]
    categoria, palabra = random.choice(palabras)
    partida.palabra_secreta = palabra
    partida.categoria = categoria
    partida.estado = 'JUGANDO'
    partida.ronda_actual = 1
    partida.save()

    serializer = PartidaSerializer(partida)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def enviar_palabra(request, codigo):
    try:
        partida = Partida.objects.get(codigo=codigo)
        jugador = PartidaJugador.objects.get(partida=partida, usuario=request.user)
    except (Partida.DoesNotExist, PartidaJugador.DoesNotExist):
        return Response({'error': 'No encontrado'}, status=status.HTTP_404_NOT_FOUND)

    palabra = request.data.get('palabra', '')
    if len(palabra) > 10:
        return Response({'error': 'Máximo 10 caracteres'}, status=status.HTTP_400_BAD_REQUEST)

    jugador.palabra_escrita = palabra
    jugador.save()

    serializer = PartidaSerializer(partida)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def votar(request, codigo):
    try:
        partida = Partida.objects.get(codigo=codigo)
    except Partida.DoesNotExist:
        return Response({'error': 'No encontrado'}, status=status.HTTP_404_NOT_FOUND)

    votado_username = request.data.get('votado')
    try:
        votado_user = User.objects.get(username=votado_username)
        votado = PartidaJugador.objects.get(partida=partida, usuario=votado_user)
    except (User.DoesNotExist, PartidaJugador.DoesNotExist):
        return Response({'error': 'Jugador no encontrado'}, status=status.HTTP_404_NOT_FOUND)

    # Contar votos
    votado.puntos_obtenidos += 1
    votado.save()

    jugadores_vivos = partida.jugadores.filter(eliminado=False)
    total_votos = sum(j.puntos_obtenidos for j in jugadores_vivos)

    if total_votos >= jugadores_vivos.count():
        # Todos votaron, eliminar al más votado
        mas_votado = jugadores_vivos.order_by('-puntos_obtenidos').first()
        mas_votado.eliminado = True
        mas_votado.save()

        # Resetear votos y palabras para siguiente ronda
        for j in partida.jugadores.all():
            j.puntos_obtenidos = 0
            j.palabra_escrita = ''
            j.save()

        # Verificar condición de victoria
        impostores_vivos = partida.jugadores.filter(eliminado=False, rol='IMPOSTOR').count()
        normales_vivos = partida.jugadores.filter(eliminado=False, rol='NORMAL').count()

        if impostores_vivos == 0:
            partida.estado = 'FINALIZADA'
            partida.save()
            return Response({'fin': True, 'ganador': 'NORMALES'})

        if impostores_vivos >= normales_vivos:
            partida.estado = 'FINALIZADA'
            partida.save()
            return Response({'fin': True, 'ganador': 'IMPOSTORES'})

        # Siguiente ronda
        if partida.ronda_actual >= 5:
            partida.estado = 'FINALIZADA'
            partida.save()
            return Response({'fin': True, 'ganador': 'IMPOSTORES'})

        partida.ronda_actual += 1
        partida.save()
        return Response({'fin': False, 'siguiente_ronda': partida.ronda_actual})

    return Response({'fin': False, 'votos_recibidos': total_votos})