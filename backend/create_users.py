import os
import django

# Configurar el entorno de Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'django_console_api.settings')
django.setup()

from django.contrib.auth.models import User


def create_users():
    #create 35 normal users
    for i in range(1, 36):
        username = f'user{i}'
        email = f'user{i}@example.com'
        password = '1234'
        if not User.objects.filter(username=username).exists():
            User.objects.create_user(username=username, email=email, password=password)
            print(f'Created user: {username}')
        else:
            print(f'User {username} already exists')

    # Creeate a superuser 
    superuser_username = 'admin'
    superuser_email = 'admin@example.com'
    superuser_password = '1234'
    if not User.objects.filter(username=superuser_username).exists():
        User.objects.create_superuser(username=superuser_username, email=superuser_email, password=superuser_password)
        print(f'Created superuser: {superuser_username}')
    else:
        print(f'Superuser {superuser_username} already exists')    

if __name__ == '__main__':
    create_users()
