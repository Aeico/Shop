from rest_framework import serializers
from shop.models import Cart, CartItem, Order, OrderItem, User, Item

class UserSerializer(serializers.ModelSerializer):
    class Meta: 
        model = User
        fields = ['user_id','name','currency','is_temp','changed_date']

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['item_id','author_fk','name','description','price']

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['order_id','user_fk_id']

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['order_fk_id','item_fk_id','quantity']


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ['user_fk_id','cart_id']

class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ['cart_fk_id','item_fk_id','quantity']