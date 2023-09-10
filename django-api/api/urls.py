from django.urls import include, path
from . import views

urlpatterns = [
    path('storyDetails/<int:story_id>/', views.storyDetails, name='story_details'),
]