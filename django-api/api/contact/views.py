from api.user.models import User
from api.contact.models import Contact
from api.contact.serializers import ContactSerializer
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model


@api_view(['POST'])
# @permission_classes([IsAuthenticated])  # Uncomment and add permission classes if needed
def sendContactForm(request):
    try:
        if request.method == 'POST':
            data = request.data
            # Access the logged-in user's ID using request.user
            # TODO: Put back in?
            # user_id = request.user.id

            # You can access the user ID from the data if it's provided in the request
            user_id = data.get('userId')
            
            # Load the User instance based on the user_id
            User = get_user_model()
            user_instance = User.objects.get(pk=user_id)

            # Assign the User instance to the userId field in data
            data['userId'] = user_instance

            serializer = ContactSerializer(data=data)

            if serializer.is_valid():
                # Save the contact form data to the database
                serializer.save()
                return Response({'message': 'Contact form submitted successfully'}, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
