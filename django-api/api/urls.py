from django.urls import include, path
from . import views
from api.story import views as storyViews

urlpatterns = [
    path('listStories/', storyViews.listStories, name='list_stories'),
    path('storyDetails/<int:story_id>/', views.storyDetails, name='story_details'),
    path('createStory/', views.createStory, name='create_story'),

]