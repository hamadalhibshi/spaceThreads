from api.contact.models import Contact
from rest_framework import serializers


class ContactSerializer(serializers.ModelSerializer):
    date = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Contact
        fields = '__all__'
        read_only_field = ["id"]
