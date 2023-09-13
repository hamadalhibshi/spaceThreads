from django.urls import path, include
from django.contrib import admin
from api import urls as api_urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/users/", include(("api.routers", "api"), namespace="api")),
    path('api/', include(api_urls)),
]
