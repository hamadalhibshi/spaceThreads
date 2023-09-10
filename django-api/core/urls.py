from django.urls import path, include

urlpatterns = [
    path("api/users/", include(("api.routers", "api"), namespace="api")),
    path("api/stories/", include(("api.routers", "api"), namespace="api-story")),
]
