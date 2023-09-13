from django.db import models
from api.user.models import User
from cloudinary.models import CloudinaryField


class Story(models.Model):
    id = models.AutoField(primary_key=True)
    image = CloudinaryField('image', null=True)
    title = models.CharField(max_length=255)
    authorId = models.ForeignKey(User, on_delete=models.CASCADE) 
    genre = models.CharField(max_length=100)
    age_group = models.CharField(max_length=50)
    prologue = models.TextField()
    epilogue = models.TextField()
    status = models.CharField(max_length=50, default='Pending')
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0)
    reviews = models.ForeignKey('Review', on_delete=models.SET_NULL, null=True) 
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Chapter(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=50)
    content = models.TextField()
    storyId = models.ForeignKey('Story', on_delete=models.CASCADE)
    userId = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.CharField(max_length=50)
    order = models.PositiveIntegerField(null=True)
    rating = models.DecimalField(max_digits=3, decimal_places=2)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Chapter {self.order} of Story ID {self.storyId.id}"


class Review(models.Model):
    id = models.AutoField(primary_key=True)
    storyId = models.ForeignKey('Story', on_delete=models.CASCADE)
    userId = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    rating = models.DecimalField(max_digits=3, decimal_places=2)

    def __str__(self):
        return f"Review for Story ID {self.storyId.id}"


class Comment(models.Model):
    id = models.AutoField(primary_key=True)
    storyId = models.ForeignKey('Story', on_delete=models.CASCADE, null=True)
    userId = models.ForeignKey(User, on_delete=models.CASCADE)
    chapterId = models.ForeignKey('Chapter', on_delete=models.CASCADE, null=True)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    # def __str__(self):
    #     return f"Comment by User ID {self.userId.id} on Chapter ID {self.storyId.id}"


class Reply(models.Model):
    id = models.AutoField(primary_key=True)
    commentId = models.ForeignKey('Comment', on_delete=models.CASCADE)
    userId = models.ForeignKey(User, on_delete=models.CASCADE)
    # reviewId = models.ForeignKey('Review', on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Reply to Comment ID {self.commentId.id}"

