from api.story.models import Story

story_data = {} # User example: {"username": "admin", "password": "12345678", "email": "admin@example.com"}

Story.objects.create_story(**story_data)
