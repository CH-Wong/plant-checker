from django.db import models
from django.db.models.fields import DurationField, CharField, DateTimeField

from datetime import timedelta

# Create your models here.
class Plant(models.Model):
    name = CharField(
        primary_key=True,
        max_length = 24, 
    )

    plant_type = CharField(max_length = 24)

    FULL_SUN = "FS"
    HALF_SUN = "HS"
    NO_SUN = "NS"
    UNKNOWN = "??"

    SUN_REQUIREMENT_CHOICES = [
        (FULL_SUN, "Lots of sunlight."),
        (HALF_SUN, "Half sun, half shade."),
        (NO_SUN, "Minimal sunlight."),
        (UNKNOWN, "Unkown."),
    ]

    sun_requirements = CharField(
        max_length = 2,
        choices=SUN_REQUIREMENT_CHOICES,
        default=UNKNOWN,
    )

    ONCE_PER_MONTH = timedelta(days=30)
    TWICE_PER_MONTH = timedelta(days=15)
    ONCE_PER_WEEK = timedelta(days=7)
    TWICE_PER_WEEK = timedelta(days=4)
    ONCE_PER_DAY = timedelta(days=1)

    INTERVAL_CHOICES = [
        (ONCE_PER_MONTH, "1x/month"),
        (TWICE_PER_MONTH, "2x/month"),
        (ONCE_PER_WEEK, "1x/week"),
        (TWICE_PER_WEEK, "2x/week"),
        (ONCE_PER_DAY, "1x/day")
    ]

    watering_interval = DurationField(choices = INTERVAL_CHOICES)
    last_watered = DateTimeField()

    pokon_interval = DurationField(choices = INTERVAL_CHOICES)
    last_pokon = DateTimeField()
