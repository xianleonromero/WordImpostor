# 🎭 Word Impostor

Juego multijugador de deducción social desarrollado como proyecto intermodular del ciclo DAW.

## 📋 Descripción

Word Impostor es un juego en el que todos los jugadores reciben una palabra secreta excepto el impostor. Cada jugador escribe una palabra relacionada y el grupo vota para descubrir quién es el impostor.

## 🛠️ Stack Tecnológico

| Parte | Tecnología |
|-------|-----------|
| Frontend | React 18, React Router DOM, Axios |
| Backend | Django 6, Django REST Framework, JWT |
| Base de datos | SQLite |
| Autenticación | djangorestframework-simplejwt |

## 🚀 Instalación y ejecución

### Requisitos previos
- Node.js v18+
- Python 3.10+
- Git

### Backend

```bash
# Crear entorno virtual
python -m venv venv
venv\Scripts\activate  # Windows

# Instalar dependencias
pip install django djangorestframework djangorestframework-simplejwt django-cors-headers

# Ejecutar migraciones
cd backend
python manage.py migrate

# Crear superusuario (opcional)
python manage.py createsuperuser

# Arrancar servidor
python manage.py runserver
```

El backend estará disponible en `http://localhost:8000`

### Frontend

```bash
cd frontend
npm install
npm start
```

El frontend estará disponible en `http://localhost:3000`

## 🎮 Cómo jugar

1. Regístrate o inicia sesión
2. Crea una partida o únete con un código
3. Espera a que se unan al menos 3 jugadores
4. El creador inicia la partida
5. Cada jugador recibe su rol — normal o impostor
6. Escribe una palabra relacionada con la palabra secreta
7. Vota al jugador que crees que es el impostor
8. ¡Gana puntos y escala en el ranking!

## 📁 Estructura del proyecto
word-impostor/
├── frontend/          # React
│   └── src/
│       └── screens/   # Páginas y componentes
├── backend/           # Django
│   └── game/          # App principal
└── venv/              # Entorno virtual Python

## 🔗 API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | /api/auth/register/ | Registro de usuario |
| POST | /api/auth/login/ | Login con JWT |
| GET | /api/games/ | Listar partidas |
| POST | /api/games/crear/ | Crear partida |
| GET | /api/games/:codigo/ | Detalle de partida |
| PUT | /api/games/:codigo/update/ | Actualizar partida |
| PATCH | /api/games/:codigo/patch/ | Actualizar campo |
| DELETE | /api/games/:codigo/delete/ | Eliminar partida |
| POST | /api/games/:codigo/unirse/ | Unirse a partida |
| POST | /api/games/:codigo/iniciar/ | Iniciar partida |
| POST | /api/games/:codigo/palabra/ | Enviar palabra |
| POST | /api/games/:codigo/votar/ | Votar jugador |
| GET | /api/users/ranking/ | Ranking global |

## 👤 Autor

Xián León Romero — DAW 2025/2026