from rest_framework import serializers
from shop.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','name','cart','order_history']