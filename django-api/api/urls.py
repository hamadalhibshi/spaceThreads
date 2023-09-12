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
    path('deleteReview/<int:review_id>/', views.deleteReview, name='delete_review'),
    # path('listComments/<int:story_id>/', views.listComments, name='list_comments_by_story'),
    # path('listComments/<int:chapter_id>/', views.listComments, name='list_comments_by_chapter'),
    path('createComment/', views.createComment, name='create_comment_for_story'),
    # path('createComment/<int:chapter_id>/', views.createComment, name='create_comment_for_chapter'),
    path('deleteComment/<int:comment_id>/', views.deleteComment, name='delete_comment'),
    # path('listReplies/<int:comment_id>/', views.listReplies, name='list_replies'),
    path('createReply/', views.createReply, name='create_reply'),
    path('deleteReply/<int:reply_id>/', views.deleteReply, name='delete_reply'),
    path('updateStoryStatus/<int:story_id>/', views.updateStoryStatus, name='update_story_status'),
    path('updateChapterStatus/<int:chapter_id>/', views.updateChapterStatus, name='update_story_status'),
    path('getApprovedChapters', views.getApprovedChapters, name='get_approved_chapters'),
]
