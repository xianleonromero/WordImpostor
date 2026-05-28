from django.contrib import admin
from .models import Partida, PartidaJugador, Perfil
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin

admin.site.unregister(User)

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ['username', 'email', 'is_staff', 'date_joined']
    search_fields = ['username', 'email']
    ordering = ['-date_joined']


class PartidaJugadorInline(admin.TabularInline):
    model = PartidaJugador
    extra = 0
    readonly_fields = ['usuario', 'rol', 'palabra_escrita', 'eliminado', 'puntos_obtenidos']


@admin.register(Partida)
class PartidaAdmin(admin.ModelAdmin):
    list_display = ['codigo', 'estado', 'palabra_secreta', 'categoria', 'ronda_actual', 'max_jugadores', 'creador', 'creada_en']
    list_filter = ['estado', 'categoria']
    search_fields = ['codigo', 'palabra_secreta']
    readonly_fields = ['creada_en']
    inlines = [PartidaJugadorInline]
    actions = ['eliminar_finalizadas']

    def eliminar_finalizadas(self, request, queryset):
        Partida.objects.filter(estado='FINALIZADA').delete()
        self.message_user(request, 'Partidas finalizadas eliminadas')
    eliminar_finalizadas.short_description = 'Eliminar partidas finalizadas'


@admin.register(PartidaJugador)
class PartidaJugadorAdmin(admin.ModelAdmin):
    list_display = ['usuario', 'partida', 'rol', 'palabra_escrita', 'eliminado', 'puntos_obtenidos']
    list_filter = ['rol', 'eliminado']
    search_fields = ['usuario__username', 'partida__codigo']


@admin.register(Perfil)
class PerfilAdmin(admin.ModelAdmin):
    list_display = ['usuario', 'puntos_totales', 'partidas_jugadas', 'victorias', 'derrotas']
    search_fields = ['usuario__username']
    ordering = ['-puntos_totales']