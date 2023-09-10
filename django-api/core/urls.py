from django.urls import path, include
from api import urls as api_urls

urlpatterns = [
    path("api/users/", include(("api.routers", "api"), namespace="api")),
    path("api/stories/", include(("api.routers", "api"), namespace="api-story")),
    path('api/', include(api_urls)),
]
