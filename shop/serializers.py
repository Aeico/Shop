from rest_framework import serializers
from shop.models import Order, User, Item

class UserSerializer(serializers.ModelSerializer):
    class Meta: 
        model = User
        fields = ['user_id','name']

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['item_id','fk_author','name','description','price']

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['order_id','order_number','fk_user_id']