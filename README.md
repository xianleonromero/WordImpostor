# 🎭 Word Impostor

Juego multijugador de deducción social desarrollado como proyecto intermodular del ciclo DAW.

## 📋 Descripción

Word Impostor es un juego en el que todos los jugadores reciben una palabra secreta excepto el impostor. Cada jugador escribe una palabra relacionada y el grupo vota para descubrir quién es el impostor.

## 🛠️ Stack Tecnológico

| Parte | Tecnología |
|-------|-----------|
| Frontend | React 18, Create React App, React Router DOM, Axios |
| Backend | Django 6, Django REST Framework, JWT |
| Base de datos | SQLite |
| Autenticación | djangorestframework-simplejwt |

## ✅ Requisitos previos

Antes de empezar asegúrate de tener instalado:

- [Node.js v18+](https://nodejs.org)
- [Python 3.10+](https://python.org)
- [Git](https://git-scm.com)

Puedes verificar las versiones con:
```bash
node --version
python --version
git --version
```

## 🚀 Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/xianleonromero/WordImpostor.git
cd WordImpostor
```

### 2. Configurar el Backend

```bash
# Crear entorno virtual
python -m venv venv

# Activar entorno virtual
venv\Scripts\activate        # Windows
source venv/bin/activate     # Linux / Mac

# Instalar dependencias
pip install django djangorestframework djangorestframework-simplejwt django-cors-headers

# Entrar en la carpeta del backend
cd backend

# Ejecutar migraciones (crea la base de datos SQLite automáticamente)
python manage.py migrate

# Crear superusuario para acceder al panel de administración (opcional)
python manage.py createsuperuser

# Arrancar el servidor
python manage.py runserver
```

El backend estará disponible en `http://localhost:8000`
El panel de administración estará en `http://localhost:8000/admin`

### 3. Configurar el Frontend

Abre una **nueva terminal** y desde la raíz del proyecto:

```bash
cd frontend
npm install
npm start
```

El frontend estará disponible en `http://localhost:3000`

> ⚠️ Es necesario tener el backend corriendo antes de usar el frontend.

## 📁 Estructura del proyecto
WordImpostor/
├── frontend/                # React (Create React App)
│   ├── public/
│   └── src/
│       └── screens/         # Páginas y componentes
│           ├── container/   # Navbar y layout
│           ├── landing/     # Página de inicio
│           ├── login/       # Login y registro
│           ├── lobby/       # Lobby con partidas
│           ├── waiting_room/# Sala de espera
│           ├── role_assignment/ # Asignación de rol
│           ├── game/        # Pantalla de juego
│           └── game_end/    # Fin de partida
├── backend/                 # Django
│   ├── backend/             # Configuración del proyecto
│   └── game/                # App principal
│       ├── models.py        # Modelos: Partida, PartidaJugador, Perfil
│       ├── views.py         # Endpoints de la API
│       ├── serializers.py   # Serialización de datos
│       └── urls.py          # Rutas de la API
└── venv/                    # Entorno virtual Python (no incluido en el repo)

## 🗄️ Base de datos

El proyecto usa **SQLite** como base de datos. Se crea automáticamente al ejecutar `python manage.py migrate`. No es necesario configurar nada adicional.

Los modelos principales son:
- **Partida** — configuración y estado de cada partida
- **PartidaJugador** — relación N:N entre usuarios y partidas (rol, palabra, votos)
- **Perfil** — estadísticas acumuladas de cada usuario

## 🎮 Cómo jugar

1. Regístrate o inicia sesión en `http://localhost:3000`
2. Crea una partida o únete con un código en el Lobby
3. Espera a que se unan al menos 3 jugadores
4. El creador inicia la partida
5. Cada jugador recibe su rol — normal o impostor
6. Escribe una palabra relacionada con la palabra secreta
7. Vota al jugador que crees que es el impostor
8. ¡Gana puntos y escala en el ranking!

## 🔗 API Endpoints

Todos los endpoints protegidos requieren el header:
`Authorization: Bearer {token}`

| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| POST | /api/auth/register/ | No | Registro de usuario |
| POST | /api/auth/login/ | No | Login, devuelve JWT |
| GET | /api/games/ | No | Listar partidas |
| POST | /api/games/crear/ | Sí | Crear partida |
| GET | /api/games/:codigo/ | No | Detalle de partida |
| PUT | /api/games/:codigo/update/ | Sí | Actualizar partida |
| PATCH | /api/games/:codigo/patch/ | Sí | Actualizar campo |
| DELETE | /api/games/:codigo/delete/ | Sí | Eliminar partida |
| POST | /api/games/:codigo/unirse/ | Sí | Unirse a partida |
| POST | /api/games/:codigo/iniciar/ | Sí | Iniciar partida |
| POST | /api/games/:codigo/palabra/ | Sí | Enviar palabra |
| POST | /api/games/:codigo/votar/ | Sí | Votar jugador |
| GET | /api/users/ranking/ | No | Ranking global |

## 👤 Autor

Xián León Romero — DAW 2025/2026