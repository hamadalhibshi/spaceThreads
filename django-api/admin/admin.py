from django.contrib import admin
from api.user.models import User
from api.contact.models import Contact
from api.story.models import Story, Chapter, Review, Comment, Reply

admin.site.register(User)
admin.site.register(Contact)
admin.site.register(Story)
admin.site.register(Chapter)
admin.site.register(Review)
admin.site.register(Comment)
admin.site.register(Reply)
