from django.urls import include, path
from api.story import views

urlpatterns = [
    # api/ WHATEVEER
    path('listStories/', views.listStories, name='list_stories'),
    path('storyDetails/<int:story_id>/', views.storyDetails, name='story_details'),
    path('createStory/', views.createStory, name='create_story'),
    path('createChapter/', views.createChapter, name='create_chapter'),
    # path('listReviews/<int:story_id>/', views.listReviews, name='list_reviews'), # probably not needed
    path('createReview/', views.createReview, name='create_review'),
    path('listComments/<int:story_id>/', views.listComments, name='list_comments_by_story'),
    path('listComments/<int:chapter_id>/', views.listComments, name='list_comments_by_chapter'),
    path('createComment/', views.createComment, name='create_comment_for_story'),
    path('createComment/<int:chapter_id>/', views.createComment, name='create_comment_for_chapter'),
    path('listReplies/<int:comment_id>/', views.listReplies, name='list_replies'),
    path('createReply/<int:comment_id>/', views.createReply, name='create_reply'),
]
