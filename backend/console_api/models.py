from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now

# Create your models here.
class SesionTime(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    timeSession = models.FloatField(null=True, blank=True)


class Button(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    click1 = models.IntegerField(default=0)
    click2 = models.IntegerField(default=0)        