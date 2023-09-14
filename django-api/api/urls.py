from django.urls import include, path
from api.story import views
from api.contact import views as contactViews

urlpatterns = [
    # api/ WHATEVEER
    path('sendContactForm/', contactViews.sendContactForm, name='send_contact_form'),
    path('listStories/', views.listStories, name='list_stories'),
    path('storyDetails/<int:story_id>/', views.storyDetails, name='story_details'),
    path('createStory/', views.createStory, name='create_story'),
    path('createChapter/', views.createChapter, name='create_chapter'),
    # path('listReviews/<int:story_id>/', views.listReviews, name='list_reviews'), # probably not needed
    path('createReview/', views.createReview, name='create_review'),
    path('deleteReview/<int:review_id>/', views.deleteReview, name='delete_review'),
    path('listComments/', views.listComments, name='list_comments'),
    path('createComment/', views.createComment, name='create_comment'),
    path('deleteComment/<int:comment_id>/', views.deleteComment, name='delete_comment'),
    # path('listReplies/<int:comment_id>/', views.listReplies, name='list_replies'),
    path('createReply/', views.createReply, name='create_reply'),
    path('deleteReply/<int:reply_id>/', views.deleteReply, name='delete_reply'),
    path('updateStoryStatus/<int:story_id>/', views.updateStoryStatus, name='update_story_status'),
    path('updateChapterStatus/', views.updateChapterStatus, name='update_chapter_status'),
    path('getApprovedChapters/', views.getApprovedChapters, name='get_approved_chapters'),
    path('listAuthorUsers/', views.listAuthorUsers, name='list_author_users'),
    path('authorUserDetails/', views.authorUserDetails, name='author_user_details'),
    path('changeToAuthor/', views.changeToAuthor, name='change_to_author'),
    path('getStats/', views.getStats, name='get_stats'),
    path('getUserData/', views.getUserData, name='get_user_data'),

]
