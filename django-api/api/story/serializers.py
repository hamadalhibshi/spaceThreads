from api.story.models import Story, Reply, Review, Chapter, Comment
from rest_framework import serializers


class StorySerializer(serializers.ModelSerializer):
    date = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Story
        fields = '__all__'
        read_only_field = ["id"]

class ReplySerializer(serializers.ModelSerializer):
    date = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Reply
        fields = '__all__'
        read_only_field = ["id"]

class ReviewSerializer(serializers.ModelSerializer):
    date = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Review
        fields = '__all__'
        read_only_field = ["id"]

class ChapterSerializer(serializers.ModelSerializer):
    date = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Chapter
        fields = '__all__'
        read_only_field = ["id"]

class CommentSerializer(serializers.ModelSerializer):
    date = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Comment
        fields = '__all__'
        read_only_field = ["id"]

class CommentDataSerializer(serializers.ModelSerializer):
    replies = ReplySerializer(many=True)  # Serialize the replies using the ReplySerializer

    class Meta:
        model = Comment
        fields = '__all__'