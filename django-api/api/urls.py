from django.urls import include, path
from api.story import views

urlpatterns = [
    path('listStories/', views.listStories, name='list_stories'),
    path('storyDetails/<int:story_id>/', views.storyDetails, name='story_details'),
    path('createStory/', views.createStory, name='create_story'),
    path('createChapter/<int:story_id>/', views.createChapter, name='create_chapter'),

]
