from api.story.models import Story, Reply, Review, Chapter, Comment
from api.story.serializers import StorySerializer, ReplySerializer, ReviewSerializer, ChapterSerializer, CommentSerializer
from django.core import serializers
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from rest_framework.exceptions import ValidationError
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

@api_view(['GET'])
def listStories(request):
    if request.method == 'GET':
        queryset = Story.objects.all()
        serializer = StorySerializer(queryset, many=True)
        data = serializer.data
        return JsonResponse(data, safe=False)
    else:
        raise ValidationError("Method not allowed")


@api_view(['GET'])
def storyDetails(request, story_id):
    try:
        # Retrieve the story instance based on the provided story_id
        story = Story.objects.get(id=story_id)

        # Serialize the story instance
        serializer = StorySerializer(story)

        # Return the serialized data as a JSON response
        return JsonResponse(serializer.data)
    
    except Story.DoesNotExist:
        # Handle the case where the story with the provided ID does not exist
        return JsonResponse({'error': 'Story not found'}, status=404)


@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def createStory(request):
    # Access the logged-in user's ID using request.user
    user_id = request.user.id

    # Get the data from the request
    data = request.data

    # Add the user ID to the data as authorId
    data['authorId'] = user_id
    print(data)

    # Create a new Story object and save it to the database
    try:
        print('hello')
        story = Story.objects.create(**data)
        print(story)
        # Serialize the created story
        serializer = StorySerializer(story)

        # Return a success response
        return JsonResponse({'message': 'Story created successfully', 'story': serializer.data}, status=201)
    
    except Exception as e:
        # Handle any exceptions (e.g., validation errors)
        return JsonResponse({'error': str(e)}, status=400)
