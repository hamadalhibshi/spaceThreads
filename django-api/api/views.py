from api.story.models import Story, Reply, Review, Chapter, Comment
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from api.story.serializers import StorySerializer, ReplySerializer, ReviewSerializer, ChapterSerializer, CommentSerializer

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