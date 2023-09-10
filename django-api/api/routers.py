from api.authentication.viewsets import (
    RegisterViewSet,
    LoginViewSet,
    ActiveSessionViewSet,
    LogoutViewSet,
)
from rest_framework import routers
from api.user.viewsets import UserViewSet
from api.story.viewsets import ListStoriesViewSet


router = routers.SimpleRouter(trailing_slash=False)

# User routes:
router.register(r"edit", UserViewSet, basename="user-edit")
router.register(r"register", RegisterViewSet, basename="register")
router.register(r"login", LoginViewSet, basename="login")
router.register(r"checkSession", ActiveSessionViewSet, basename="check-session")
router.register(r"logout", LogoutViewSet, basename="logout")

# Story routes:
router.register(r"listStories", ListStoriesViewSet, basename="list-stories")

urlpatterns = [
    *router.urls,
]
