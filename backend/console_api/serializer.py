from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Button,SesionTime


class TimeSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ['timeSession']

class ButtonSerializer(serializers.ModelSerializer):
    class Mete:
        model = Button
        fieldd = ['click1', 'click2']

class UserSerializer(serializers.ModelSerializer):
    timeSession = serializers.SerializerMethodField()
    click1 = serializers.SerializerMethodField()
    click2 = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ['username', 'email', 'password','last_login','timeSession', 'click1', 'click2','is_superuser']

    def get_timeSession(self, obj):
        session_time = SesionTime.objects.filter(user=obj).first()
        return session_time.timeSession if session_time else None

    def get_click1(self, obj):
        button1 = Button.objects.filter(user=obj).first()
        return button1.click1 if button1 else 0
    
    def get_click2(self, obj):
        button2 = Button.objects.filter(user=obj).first()
        return button2.click2 if button2 else 0



