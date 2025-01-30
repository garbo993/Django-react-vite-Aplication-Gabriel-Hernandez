from rest_framework.decorators import api_view , authentication_classes, permission_classes
from console_api.serializer import UserSerializer
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status
from django.shortcuts import get_object_or_404
from datetime import datetime,timezone

from django.contrib.auth.models import User
from console_api.models import SesionTime,  Button
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication



@api_view(['POST'])

def login(request):
    #function with get if exist or return 404 code 
    user = get_object_or_404(User, username = request.data['username'])
    # pasword check conditional 
    if not user.check_password(request.data['password']):
        raise Response({"error":"invalid password"},status= status.HTTP_400_BAD_REQUEST)
    # create token for user
    token, created = Token.objects.get_or_create(user= user)
    # create last login for user
    user.last_login = datetime.now(timezone.utc)
    user.save()
    # create serializer for user
    serializer = UserSerializer (instance = user)
    

    return Response({"token":token.key, "user": serializer.data,},status=status.HTTP_202_ACCEPTED)

@api_view(['POST'])
def register(request):
    serializer  = UserSerializer(data = request.data)
    # if the data is valid save the data and create the user
    if serializer.is_valid():
        serializer.save()
        
        user = User.objects.get(username = serializer.data['username'])
        user.set_password(serializer.data['password'])
        user.save()
        token =Token.objects.create(user=user)
        return Response({'token' : token.key, "user": serializer.data},status= status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)

'''
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def profile(request):
    
    #print(request.user)
    #serializer = UserSerializer(instance = request.user)
    #return Response(serializer.data, status= status.HTTP_200_OK)
    return Response("YOPU ARE LOGIN WITH {}".format(request.user.username), status = status.HTTP_200_OK)
'''

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_main(request):
    # if the user is not superuser return the main page
    if not request.user.is_superuser:
        return Response({
            "title": "Hello",
            "description": "This is a simple web, please click one or both buttons to fun ",
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTdmrjoiXGVFEcd1cX9Arb1itXTr2u8EKNpw&s"
        })
    # if the user is superuser return the  all users data
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    # delete the password from the response
    for i in serializer.data:
        i.pop('password')
        

    
    return Response(serializer.data, status=status.HTTP_200_OK)
    #return Response("YOPU ARE LOGIN WITH {}".format(request.user.username), status = status.HTTP_200_OK)




@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def logout(request):
    user = request.user
    last_login = user.last_login

    # Register the sesion time 
    datetimer = datetime.now(timezone.utc)
    session_time = (datetimer -  last_login)
    session_time = session_time.total_seconds() /60
    print(session_time)

     # Save the session time in the SesionTime table
    SesionTime.objects.update_or_create(
        user=user,
        defaults={'timeSession': session_time}
    )

    # register clicks for buttons 
    if 'click1' not in request.query_params or 'click2' not in request.query_params:
         # Delete autentication token  
        Token.objects.filter(user=user).delete()
        return  Response({"message": "Logout successful"}, status=status.HTTP_200_OK)
    
    
    button1 =  request.query_params['click1']
    print(button1)
    Button.objects.update_or_create(
         user=user,
            defaults={'click1': button1}
        )
    button2 = request.query_params['click2']
    print(button2)
    Button.objects.update_or_create(
            user=user,
            defaults={'click2': button2}
        )
    
    # Delete autentication token
    Token.objects.filter(user=user).delete()

    return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)