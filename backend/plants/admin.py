from django.contrib import admin
from .models import Plant


# Register your models here.
class PlantAdmin(admin.ModelAdmin):
    model = Plant
    extra = 1

admin.site.register(Plant, PlantAdmin)