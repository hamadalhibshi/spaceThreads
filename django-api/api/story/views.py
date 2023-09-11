from api.story.models import Story, Reply, Review, Chapter, Comment
from api.story.serializers import StorySerializer, ReplySerializer, ReviewSerializer, ChapterSerializer, CommentSerializer
from django.core import serializers
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from rest_framework.exceptions import ValidationError
from rest_framework.decorators import api_view

@api_view(['GET'])
def listStories(request):
    if request.method == 'GET':
        queryset = Story.objects.all()
        serializer = StorySerializer(queryset, many=True)
        data = serializer.data
        return JsonResponse(data, safe=False)
    else:
        raise ValidationError("Method not allowed")
