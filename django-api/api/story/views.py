from api.story.models import Story, Reply, Review, Chapter, Comment
from api.user.models import User
from api.story.serializers import StorySerializer, ReplySerializer, ReviewSerializer, ChapterSerializer, CommentSerializer, CommentDataSerializer, ApprovedChaptersSerializer
from api.user.serializers import UserSerializer
from django.core import serializers
from django.http import JsonResponse, HttpResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from rest_framework.exceptions import ValidationError
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
import cloudinary
import cloudinary.uploader
from django.contrib.auth import get_user_model  # Import the User model


cloudinary.config( 
  cloud_name = "dt4gzg8z1", 
  api_key = "989749326782435", 
  api_secret = "YEiarfPPvSPQCxsjWbGfmQ5YOAc" 
)


# TESTED AND WORKS
@api_view(['GET'])
def listStories(request):
    try:
        if request.method == 'GET':
            # Query the database to get all Story objects
            queryset = Story.objects.all()

            # Serialize the queryset of Story objects using StorySerializer
            serializer = StorySerializer(queryset, many=True)

            # Extract the serialized data
            data = serializer.data

            # Return the serialized data as a JSON response
            return JsonResponse(data, safe=False)
        else:
            # Raise a validation error if the request method is not allowed (not GET)
            raise ValidationError("Method not allowed")
    except Exception as e:
        # Handle any exceptions and return an error response as JSON
        error_message = str(e)
        return JsonResponse({'error': error_message}, status=400)


# TESTED AND WORKS
@api_view(['GET'])
def storyDetails(request, story_id):
    try:
        # Retrieve the story instance based on the provided story_id
        story = Story.objects.get(id=story_id)

        # Get all the chapters where the storyId = story_id and where the status == "pending"
        chapters = Chapter.objects.filter(storyId=story_id)

        # Get all the reviews related to the story
        reviews = Review.objects.filter(storyId=story_id)

        # Get all the comments related to the story
        comments = Comment.objects.filter(storyId=story_id)

        # Initialize an empty list to store all the comments and their replies
        all_comments = []

        # Iterate over each comment and retrieve its associated replies
        for comment in comments:
            replies = Reply.objects.filter(commentId=comment.id)
            reply_serializer = ReplySerializer(replies, many=True)

            # Create a dictionary with comment and replies data
            comment_data = {
                'comment': CommentSerializer(comment).data,
                'replies': reply_serializer.data
            }

            # Append the comment and replies to the list
            all_comments.append(comment_data)

        # Serialize the story instance
        serializer = StorySerializer(story)

        # Serialize the chapters
        chapter_serializer = ChapterSerializer(chapters, many=True)

        # Serialize the reviews
        review_serializer = ReviewSerializer(reviews, many=True)

        # Serialize the comments and replies
        comment_data_serializer = CommentDataSerializer(all_comments, many=True)

        # Create a dictionary with story, chapters, reviews, comments, and replies data
        response_data = {
            'story': serializer.data,
            'chapters': chapter_serializer.data,
            'reviews': review_serializer.data,
            'comments': comment_data_serializer.data,
        }

        # Return the serialized data as a JSON response
        return JsonResponse(response_data)

    except Story.DoesNotExist:
        # Handle the case where the story with the provided ID does not exist
        return JsonResponse({'error': 'Story not found'}, status=404)


# TESTED AND WORKS
@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def createStory(request):
    # print(f'request user ==> {request.user}')
    data = request.data
    # Access the logged-in user's ID using request.user
    # TODO Put back in?
    
    # get the user id from the hidden input
    user_id = data['authorId']

    # Load the User instance based on the logged-in user's ID
    User = get_user_model()
    user_instance = User.objects.get(pk=user_id)

    # Assign the User instance to the authorId field in data so that we can push it to the DB
    data['authorId'] = user_instance 

    # Add the user ID to the data as authorId
    # data['authorId'] = user_id
    # data['authorId'] = user_id
    # print("authorID ======>")
    # print(data['authorId'])

    # Get the image path from the request data
    image_path = data.get('image')

    # Upload the image to Cloudinary
    try:
        # print("78")
        uploaded_response = cloudinary.uploader.upload(image_path)
        # print("80")
        # Extract the URL of the uploaded image
        image_url = uploaded_response.get('secure_url', '')
        # print("83")
        # Add the image URL to the data
        data['image'] = image_url
        # print("86")
        # Create a new Story object with the updated data
        story = Story.objects.create(**data)

        # print("Before serializer ")
        # Serialize
        serializer = StorySerializer(story)
        # print("After serializer ")
        # Return a res
        return JsonResponse({'message': 'Story created successfully', 'story': serializer.data}, status=201)
    
    except Exception as e:
        # Handle any exceptions (e.g., validation errors or image upload errors)
        print(e)
        return JsonResponse({'error': str(e)}, status=400)


# TESTED AND WORKS
@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def createChapter(request):
    try:
        story_id = request.data['storyId']
        # Retrieve the associated Story instance based on the provided story_id
        story = Story.objects.get(id=story_id)

        # Get the user ID from the request (assuming it's provided in hidden input fields)
        user_id = request.data['userId']

        title = request.data['title']

        # User = get_user_model()
        user_instance = User.objects.get(pk=user_id)
        # Get the content from the request data (assuming it's in the request data)
        content = request.data.get('content', '')

        # Create a new Chapter instance with the specified values
        chapter = Chapter.objects.create(
            storyId=story,
            userId_id=user_id,  # Assuming you have a User instance
            status="Pending",  # Set the status to "Pending"
            order=None,  # Set the order to null (None)
            rating=0.0,  # Set an initial rating (you can adjust this as needed)
            content=content,  # Set the content from the request
            title=title,  # Set the title from the request
        )

        # Serialize the created Chapter instance using the ChapterSerializer
        chapter_serializer = ChapterSerializer(chapter)

        # Return a success response with the serialized chapter data as JSON
        return JsonResponse({'message': 'Chapter created successfully', 'chapter': chapter_serializer.data}, status=201)
    
    except Story.DoesNotExist:
        # Handle the case where the specified Story does not exist
        return JsonResponse({'error': 'Story not found'}, status=404)
    except User.DoesNotExist:
        # Handle the case where the user does not exist
        return JsonResponse({'error': 'User not found'}, status=404)
    except Exception as e:
        # Handle any other exceptions (e.g., validation errors)
        return JsonResponse({'error': str(e)}, status=404)


# UNNEEDED FUNCTION
# @api_view(['GET'])
# def listReviews(request, story_id):
#     if request.method == 'GET':
#         try:
#             story = Story.objects.get(pk=story_id)
#             reviews = Review.objects.filter(storyId=story)
#             serializer = ReviewSerializer(reviews, many=True)
#             data = serializer.data
#             return JsonResponse(data, safe=False)
#         except Story.DoesNotExist:
#             return JsonResponse({'error': 'Story not found'}, status=404)
#     else:
#         raise ValidationError("Method not allowed")


# TESTED AND WORKS
@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def createReview(request):
    story_id = request.data['storyId']
    try:
        story = Story.objects.get(pk=story_id)
    except Story.DoesNotExist:
        return JsonResponse({'error': 'Story not found'}, status=404)
    user_id = request.data['userId']

    rating = request.data['rating']
    # user_id = request.user.id
    data = request.data
    data['userId'] = user_id
    data['storyId'] = story_id
    data['rating'] = rating
    try:
        review = Review.objects.create(
            storyId=story,
            userId_id=user_id,
            content=data['content'],
            rating = rating
        )
        serializer = ReviewSerializer(review)
        return JsonResponse({'message': 'Review created successfully', 'review': serializer.data}, status=201)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)


# TESTED AND WORKS
@api_view(['DELETE'])
# @permission_classes([IsAuthenticated])
def deleteReview(request, review_id):
    try:
        data = request.data
        user_id = data["userId"]
        # Retrieve the review instance based on the provided review_id
        review = Review.objects.get(id=review_id)

        print(f"request.user ====> {request.user}")
        # Check if the request user is the author of the review or has appropriate permissions
        # You can add your authorization logic here
        
        # Assuming you want to restrict deletion to the author, you can check if the user is the author
        
        # Delete the review
        review.delete()
        return JsonResponse({'message': 'Review deleted successfully'}, status=204)
        

    except Review.DoesNotExist:
        # Handle the case where the review with the provided ID does not exist
        return JsonResponse({'error': 'Review not found'}, status=404)


# TESTED AND WORKS
@api_view(['GET'])
def listComments(request):
    try:
        if request.method == 'GET':
            # Get the values of storyId and chapterId from the request data
            storyId = request.data.get("storyId")
            chapterId = request.data.get("chapterId")

            if storyId:
                # If storyId is provided, query the database to get the associated story's comments
                story = Story.objects.get(pk=storyId)
                comments = Comment.objects.filter(storyId=story)
            elif chapterId:
                # If chapterId is provided, query the database to get the associated chapter's comments
                chapter = Chapter.objects.get(pk=chapterId)
                comments = Comment.objects.filter(chapterId=chapter)
            else:
                # If neither storyId nor chapterId is provided, return a bad request response
                return JsonResponse({'error': 'Invalid request. Provide either story_id or chapter_id.'}, status=400)

            # Serialize the comments using CommentSerializer
            serializer = CommentSerializer(comments, many=True)
            data = serializer.data

            # Return the serialized data as a JSON response
            return JsonResponse(data, safe=False)
        else:
            # Return a method not allowed response if the request method is not GET
            return JsonResponse({'error': 'Method not allowed'}, status=405)
    except Story.DoesNotExist:
        # Handle the case where the specified Story does not exist
        return JsonResponse({'error': 'Story not found'}, status=404)
    except Chapter.DoesNotExist:
        # Handle the case where the specified Chapter does not exist
        return JsonResponse({'error': 'Chapter not found'}, status=404)
    except Exception as e:
        # Handle any other exceptions and return an error response as JSON
        error_message = str(e)
        return JsonResponse({'error': error_message}, status=400)


# TESTED AND WORKS
@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def createComment(request):
    try:
        data = request.data
        # Extract user_id from the request data
        user_id = data['userId']
        # user_id = request.user.id  # Optionally, user_id could be obtained from the authenticated user
        
        # Retrieve the User instance based on user_id
        user = User.objects.get(id=user_id)

        # Check if either storyId or chapterId is provided in the data
        if 'storyId' in data:
            conditional = data['storyId']
            # Retrieve the Story instance based on storyId
            story = Story.objects.get(id=conditional)
            try:
                # Create a Comment instance for the story
                comment = Comment.objects.create(
                    storyId=story,
                    userId=user,
                    content=data['content'],  # Assuming 'content' is in the request data
                )
                serializer = CommentSerializer(comment)

                # Return a success response with the serialized comment data for a story
                return JsonResponse({'message': 'Comment created successfully for a story', 'comment': serializer.data}, status=201)
            except Exception as e:
                # Handle any exceptions during comment creation and return an error response as JSON
                return JsonResponse({'error': str(e)}, status=400)
        elif 'chapterId' in data:
            conditional = data['chapterId']
            # Retrieve the Chapter instance based on chapterId
            chapter = Chapter.objects.get(id=conditional)
            try:
                # Create a Comment instance for the chapter
                comment = Comment.objects.create(
                    chapterId=chapter,
                    userId=user,
                    content=data['content'],  # Assuming 'content' is in the request data
                )
                serializer = CommentSerializer(comment)

                # Return a success response with the serialized comment data for a chapter
                return JsonResponse({'message': 'Comment created successfully for a chapter', 'comment': serializer.data}, status=201)
            except Exception as e:
                # Handle any exceptions during comment creation and return an error response as JSON
                return JsonResponse({'error': str(e)}, status=400)
        else:
            # Return a bad request response if neither storyId nor chapterId is provided
            return JsonResponse({'error': 'Invalid request. Provide either storyId or chapterId.'}, status=400)

    except Story.DoesNotExist:
        # Handle the case where the specified Story does not exist and return an error response as JSON
        return JsonResponse({'error': 'Story not found'}, status=404)
    except Chapter.DoesNotExist:
        # Handle the case where the specified Chapter does not exist and return an error response as JSON
        return JsonResponse({'error': 'Chapter not found'}, status=404)
    except Exception as e:
        # Handle any other exceptions and return an error response as JSON
        return JsonResponse({'error': str(e)}, status=400)


#TESTED AND WORKS
@api_view(['DELETE'])
# @permission_classes([IsAuthenticated])
def deleteComment(request, comment_id):
    try:
        # Retrieve the comment instance based on the provided comment_id
        comment = Comment.objects.get(id=comment_id)

        # Check if the request user is the author of the comment or has appropriate permissions
        # You can add your authorization logic here
        
        # Assuming you want to restrict deletion to the author, you can check if the user is the author
        
        # Delete the comment
        comment.delete()
        return JsonResponse({'message': 'Comment deleted successfully'}, status=204)
        
        

    except Comment.DoesNotExist:
        # Handle the case where the comment with the provided ID does not exist
        return JsonResponse({'error': 'Comment not found'}, status=404)


# UNNEEDED FUNCTION
# @api_view(['GET'])
# def listReplies(request, comment_id):
#     if request.method == 'GET':
#         try:
#             comment = Comment.objects.get(pk=comment_id)
#             replies = Reply.objects.filter(commentId=comment)
#             serializer = ReplySerializer(replies, many=True)
#             data = serializer.data
#             return JsonResponse(data, safe=False)
#         except Comment.DoesNotExist:
#             return JsonResponse({'error': 'Comment not found'}, status=404)
#     else:
#         raise ValidationError("Method not allowed")


# TESTED AND WORKS
@api_view(['POST'])
def createReply(request):
    try:
        data = request.data

        # Extract data from the request
        comment_id = data.get('commentId')
        user_id = data.get('userId')
        content = data.get('content')

        # Check if commentId and userId exist in the data
        if comment_id is None or user_id is None:
            return JsonResponse(
                {"success": False, "msg": "Missing commentId or userId in request data"},
                status=400
            )

        # Check if the Story with the provided commentId exists
        try:
            comment = Comment.objects.get(pk=comment_id)
        except Comment.DoesNotExist:
            return JsonResponse(
                {"success": False, "msg": f"Story with commentId {comment_id} does not exist"},
                status=404
            )

        try:
            user = User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return JsonResponse(
                {"success": False, "msg": f"User {user_id} does not exist"},
                status=404
            )
        
        # Create a Reply instance
        reply = Reply.objects.create(
            commentId=comment,
            userId=user,
            content=content,
        )
        serializer = ReplySerializer(reply)
        # Return a success response
        return JsonResponse(
            {"success": True, "msg": "Reply created successfully", 'reply': serializer.data},
            status=201
        )

    except Exception as e:
        # Handle any exceptions (e.g., validation errors)
        return JsonResponse({'error': str(e)}, status=400)


# TESTED AND WORKS
@api_view(['DELETE'])
# @permission_classes([IsAuthenticated])
def deleteReply(request, reply_id):
    try:
        # Retrieve the reply instance based on the provided reply_id
        reply = Reply.objects.get(id=reply_id)

        # Check if the request user is the author of the reply or has appropriate permissions
        # You can add your authorization logic here
        
        # Assuming you want to restrict deletion to the author, you can check if the user is the author
        # if request.user == reply.userId:
        # Delete the reply
        reply.delete()
        return JsonResponse({'message': 'Reply deleted successfully'}, status=204)
        
        # return JsonResponse({'error': 'You are not authorized to delete this reply'}, status=403)

    except Reply.DoesNotExist:
        # Handle the case where the reply with the provided ID does not exist
        return JsonResponse({'error': 'Reply not found'}, status=404)


# TESTED AND WORKS
@api_view(['PATCH'])
# @permission_classes([IsAuthenticated])
def updateStoryStatus(request, story_id):
    try:
        # Retrieve the story instance based on the provided story_id
        story = Story.objects.get(id=story_id)

        # Check if the request user is the author of the story
        if request.user == story.authorId:
            new_status = request.data.get('status')

            # Validate and update the status
            if new_status in ['Completed']:
                story.status = new_status
                story.save()

                # Serialize the updated story and return it in the response
                serializer = StorySerializer(story)
                return JsonResponse({'message': 'Story status updated successfully', 'story': serializer.data})

            return JsonResponse({'error': 'Invalid status value'}, status=400)
        
        return JsonResponse({'error': 'You are not authorized to update this story'}, status=403)

    except Story.DoesNotExist:
        # Handle the case where the story with the provided ID does not exist
        return JsonResponse({'error': 'Story not found'}, status=404)


# TESTED AND WORKS
@api_view(['PATCH'])
# @permission_classes([IsAuthenticated])
def updateChapterStatus(request):
    try:
        data = request.data
        # print(data)

        # Validate and update the status for each chapter individually
        updated_chapters = []
        for item in data:
            chapter_id = item.get('chapterId')
            new_status = item.get('status')
            if new_status in ['Approved', 'Pending', 'Rejected']:
                # Update the chapter status
                chapter = Chapter.objects.get(id=chapter_id)
                chapter.status = new_status
                chapter.save()

                # Append the updated chapter to the list
                updated_chapters.append(chapter)

        # Serialize the updated chapters
        serializer = ChapterSerializer(updated_chapters, many=True)

        # Return a JsonResponse with the serialized data
        return JsonResponse({'message': 'Chapter statuses updated successfully', 'chapters': serializer.data})

    except Chapter.DoesNotExist:
        # Handle the case where a chapter with the provided ChapterId does not exist
        return JsonResponse({'error': 'Chapter not found'}, status=404)


# TESTED AND WORKS
@api_view(['GET'])
def getApprovedChapters(request):
    data = request.data
    storyId = data["storyId"]
    # Query the database to get approved chapters ordered by timestamp
    chapters = Chapter.objects.filter(storyId=storyId, status='Approved').order_by('timestamp')

    # Serialize the queryset
    serializer = ChapterSerializer(chapters, many=True)

    # Wrap the serialized data in a dictionary
    data = {'chapters': serializer.data}

    # Return the serialized data as a JSON response
    return JsonResponse(data)


# TESTED AND WORKS
@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def listAuthorUsers(request):
    try:
        # Retrieve all users with userType == "Author"
        author_users = User.objects.filter(userType="author")
        serializer = UserSerializer(author_users, many=True) 
        data = serializer.data
        return JsonResponse(data, safe=False)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


# TESTED AND WORKS
@api_view(['GET'])
def authorUserDetails(request, user_id):
    try:
        # Retrieve the user instance based on the provided user_id
        user = User.objects.get(id=user_id)

        # Retrieve the total number of stories authored by the user
        total_stories = Story.objects.filter(authorId=user_id).count()

        # Retrieve the total number of approved chapters where the user is the author
        total_approved_chapters = Chapter.objects.filter(userId=user_id, status='Approved').count()

        # Retrieve all approved chapters where the user is the author
        approved_chapters = Chapter.objects.filter(userId=user_id, status='Approved')
        
        # Serialize the approved chapters
        serialized_approved_chapters = ApprovedChaptersSerializer(approved_chapters, many=True)

        # Retrieve all the stories authored by the user
        user_stories = Story.objects.filter(authorId=user_id)

        # Create a list to store serialized data for stories and their associated reviews
        user_story_data = []

        for story in user_stories:
            # Retrieve the reviews related to each story
            reviews = Review.objects.filter(storyId=story.id)

            # Serialize the story and its reviews
            story_data = {
                'story': StorySerializer(story).data,
                'reviews': ReviewSerializer(reviews, many=True).data
            }

            user_story_data.append(story_data)
        # print(user_story_data)
        # Serialize the user details
        user_data = UserSerializer(user).data

        # Create a dictionary with user details, total stories, and total approved chapters
        response_data = {
            'user': user_data,
            'total_stories': total_stories,
            'total_approved_chapters': total_approved_chapters,
            'stories_with_reviews': user_story_data,
            'approved_chapters': serialized_approved_chapters.data
        }

        return JsonResponse(response_data)

    except User.DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


# TESTED AND WORKS
@api_view(['PATCH'])
def changeToAuthor(request):
    try:
        data = request.data
        user_id = data["userId"]

        user = User.objects.get(id=user_id)

        # Update the userType to "author"
        user.userType = "author"
        user.save()

        # Assuming you want to return a response indicating success
        return JsonResponse({'message': 'User type changed to author successfully'})

    except User.DoesNotExist:
        # Handle the case where the user with the provided ID does not exist
        return JsonResponse({'error': 'User not found'}, status=404)

# TO BE TESTED
@api_view(['GET'])
def getStats(request):
    # Total number of users
    total_users = User.objects.count()

    # Number of users who are authors (assuming 'userType' is the field representing user type)
    author_users = User.objects.filter(userType='author').count()

    # Number of stories
    total_stories = Story.objects.count()

    # Return the statistics as a JSON response
    response_data = {
        'total_users': total_users,
        'author_users': author_users,
        'total_stories': total_stories,
    }

    return JsonResponse(response_data)


# TO BE TESTED
@api_view(['GET'])
def getUserData(request):
    try:
        # Extract the user_id from the request data
        user_id = request.data["id"]

        # Retrieve the user instance based on the provided user_id
        user = User.objects.get(id=user_id)

        # Serialize the user instance
        # Assuming you have a UserSerializer defined
        serializer = UserSerializer(user)

        # Return the serialized user data as a JSON response
        return JsonResponse(serializer.data)
    except User.DoesNotExist:
        # Handle the case where the user with the provided ID does not exist
        return JsonResponse({'error': 'User not found'}, status=404)
    except Exception as e:
        # Handle other exceptions if needed
        return JsonResponse({'error': str(e)}, status=500)
