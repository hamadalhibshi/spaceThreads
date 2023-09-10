from api.story.models import Story, Reply, Review, Chapter, Comment
from api.story.serializers import StorySerializer
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from rest_framework import mixins
# from django.contrib.auth.decorators import login_required
class ListStoriesViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Story.objects.all()
    serializer_class = StorySerializer

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        # print(serializer.data)
        return Response(serializer.data)
