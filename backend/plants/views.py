from django.shortcuts import render
from rest_framework import viewsets, permissions, status, serializers, views
from rest_framework.response import Response


from .models import Plant

class PlantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plant
        fields = '__all__'

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['sun_requirements'] = instance.get_sun_requirements_display()
        ret['watering_interval_text'] = instance.get_watering_interval_display()
        ret['pokon_interval_text'] = instance.get_pokon_interval_display()
        return ret


# Create your views here.
class PlantViewSet(viewsets.ModelViewSet):
    queryset = Plant.objects.all()
    serializer_class = PlantSerializer



