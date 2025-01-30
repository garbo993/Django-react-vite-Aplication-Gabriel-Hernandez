import os
import django

# Configurar el entorno de Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'django_console_api.settings')
django.setup()

from django.contrib.auth.models import User

def create_users():
    for i in range(1, 35):
        username = f'user{i}'
        email = f'user{i}@example.com'
        password = '1234'
        if not User.objects.filter(username=username).exists():
            User.objects.create_user(username=username, email=email, password=password)
            print(f'Created user: {username}')
        else:
            print(f'User {username} already exists')

if __name__ == '__main__':
    create_users()