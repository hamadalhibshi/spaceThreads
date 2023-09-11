from api.story.models import Story, Reply, Review, Chapter, Comment
from api.user.models import User
from api.story.serializers import StorySerializer, ReplySerializer, ReviewSerializer, ChapterSerializer, CommentSerializer
from django.core import serializers
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from rest_framework.exceptions import ValidationError
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
import cloudinary
import cloudinary.uploader


cloudinary.config( 
  cloud_name = "dt4gzg8z1", 
  api_key = "989749326782435", 
  api_secret = "YEiarfPPvSPQCxsjWbGfmQ5YOAc" 
)


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

        # Get all the chapters where the storyId = story_id and where the status == "pending"
        chapters = Chapter.objects.filter(storyId=story_id, status="pending")

        # Serialize the story instance
        serializer = StorySerializer(story)

        # Serialize the chapters
        chapter_serializer = ChapterSerializer(chapters, many=True)

        # Create a dictionary with story and chapters data
        response_data = {
            'story': serializer.data,
            'chapters': chapter_serializer.data
        }
        # print(response_data)
        # Return the serialized data as a JSON response
        return JsonResponse(response_data)
    
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

    # Get the image path from the request data
    image_path = data.get('image')

    # Upload the image to Cloudinary
    try:
        uploaded_response = cloudinary.uploader.upload(image_path)

        # Extract the URL of the uploaded image
        image_url = uploaded_response.get('secure_url', '')

        # Add the image URL to the data
        data['image'] = image_url

        # Create a new Story object with the updated data
        story = Story.objects.create(**data)

        # Serialize
        serializer = StorySerializer(story)

        # Return a res
        return JsonResponse({'message': 'Story created successfully', 'story': serializer.data}, status=201)
    
    except Exception as e:
        # Handle any exceptions (e.g., validation errors or image upload errors)
        return JsonResponse({'error': str(e)}, status=400)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createChapter(request, story_id):
    try:
        # Retrieve the associated Story instance based on the provided story_id
        story = Story.objects.get(id=story_id)

        # Get the user ID from the request
        user_id = request.user.id

        # Get the content from the request data
        content = request.data.get('content', '')  # Assuming the content is in the request data

        # Create a new Chapter instance with the specified values
        chapter = Chapter.objects.create(
            storyId=story,
            userId=User.objects.get(id=user_id),  # Assuming you have a User instance
            status="Pending",  # Set the status to "Pending"
            order=None,  # Set the order to null (None)
            rating=0.0,  # Set an initial rating (you can adjust this as needed)
            content=content,  # Set the content from the request
        )

        # Serialize the created Chapter instance using the ChapterSerializer
        chapter_serializer = ChapterSerializer(chapter)

        # Return a success response with the serialized chapter data
        return JsonResponse({'message': 'Chapter created successfully', 'chapter': chapter_serializer.data}, status=201)
    
    except Story.DoesNotExist:
        # Handle the case where the specified Story does not exist
        return JsonResponse({'error': 'Story not found'}, status=404)
    except User.DoesNotExist:
        # Handle the case where the user does not exist
        return JsonResponse({'error': 'User not found'}, status=404)
    except Exception as e:
        # Handle any other exceptions (e.g., validation errors)
        return JsonResponse({'error': str(e)}, status=400)


@api_view(['GET'])
def listReviews(request, story_id):
    if request.method == 'GET':
        try:
            story = Story.objects.get(pk=story_id)
            reviews = Review.objects.filter(storyId=story)
            serializer = ReviewSerializer(reviews, many=True)
            data = serializer.data
            return JsonResponse(data, safe=False)
        except Story.DoesNotExist:
            return JsonResponse({'error': 'Story not found'}, status=404)
    else:
        raise ValidationError("Method not allowed")


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createReview(request, story_id):
    if request.method == 'POST':
        try:
            story = Story.objects.get(pk=story_id)
        except Story.DoesNotExist:
            return JsonResponse({'error': 'Story not found'}, status=404)

        user_id = request.user.id
        data = request.data
        data['userId'] = user_id
        data['storyId'] = story_id

        try:
            review = Review.objects.create(**data)
            serializer = ReviewSerializer(review)
            return JsonResponse({'message': 'Review created successfully', 'review': serializer.data}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        raise ValidationError("Method not allowed")


@api_view(['GET'])
def listComments(request, story_id=None, chapter_id=None):
    if request.method == 'GET':
        try:
            if story_id is not None:
                story = Story.objects.get(pk=story_id)
                comments = Comment.objects.filter(storyId=story)
            elif chapter_id is not None:
                chapter = Chapter.objects.get(pk=chapter_id)
                comments = Comment.objects.filter(chapterId=chapter)
            else:
                return JsonResponse({'error': 'Invalid request. Provide either story_id or chapter_id.'}, status=400)

            serializer = CommentSerializer(comments, many=True)
            data = serializer.data
            return JsonResponse(data, safe=False)
        except Story.DoesNotExist:
            return JsonResponse({'error': 'Story not found'}, status=404)
        except Chapter.DoesNotExist:
            return JsonResponse({'error': 'Chapter not found'}, status=404)
    else:
        raise ValidationError("Method not allowed")


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createComment(request, story_id=None, chapter_id=None):
    if request.method == 'POST':
        try:
            if story_id is not None:
                story = Story.objects.get(pk=story_id)
            elif chapter_id is not None:
                chapter = Chapter.objects.get(pk=chapter_id)
                story = chapter.storyId
            else:
                return JsonResponse({'error': 'Invalid request. Provide either story_id or chapter_id.'}, status=400)

            user_id = request.user.id
            data = request.data
            data['userId'] = user_id

            if story_id is not None:
                data['storyId'] = story_id
            elif chapter_id is not None:
                data['chapterId'] = chapter_id

            comment = Comment.objects.create(**data)
            serializer = CommentSerializer(comment)
            return JsonResponse({'message': 'Comment created successfully', 'comment': serializer.data}, status=201)
        except Story.DoesNotExist:
            return JsonResponse({'error': 'Story not found'}, status=404)
        except Chapter.DoesNotExist:
            return JsonResponse({'error': 'Chapter not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        raise ValidationError("Method not allowed")


@api_view(['GET'])
def listReplies(request, comment_id):
    if request.method == 'GET':
        try:
            comment = Comment.objects.get(pk=comment_id)
            replies = Reply.objects.filter(commentId=comment)
            serializer = ReplySerializer(replies, many=True)
            data = serializer.data
            return JsonResponse(data, safe=False)
        except Comment.DoesNotExist:
            return JsonResponse({'error': 'Comment not found'}, status=404)
    else:
        raise ValidationError("Method not allowed")


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createReply(request, comment_id):
    if request.method == 'POST':
        try:
            comment = Comment.objects.get(pk=comment_id)
        except Comment.DoesNotExist:
            return JsonResponse({'error': 'Comment not found'}, status=404)

        user_id = request.user.id
        data = request.data
        data['userId'] = user_id
        data['commentId'] = comment_id

        try:
            reply = Reply.objects.create(**data)
            serializer = ReplySerializer(reply)
            return JsonResponse({'message': 'Reply created successfully', 'reply': serializer.data}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        raise ValidationError("Method not allowed")
