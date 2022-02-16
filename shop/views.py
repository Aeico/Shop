from ast import For
import datetime

from pymysql import NULL
from shop import serializers
from shop.models import Cart, Item, OrderItem, User, Order
from shop.serializers import UserSerializer, ItemSerializer, OrderSerializer, OrderItemSerializer
from django.http import Http404
from django.db.models import Max
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

#General user get and post

class UserList(APIView):
    #Gets all users
    def get(self, request, format=None):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    
    #Recieves post to create user
    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#Allows to get, put and delete specifc users information
class UserDetail(APIView):
    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except:
            raise Http404
    
        #gets user with primary key
    def get(self, request, pk, format=None):
        user = self.get_object(pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)
    
        #puts information in user with primary key
    def put(self, request, pk, format=None):
        user = self.get_object(pk)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        #deletes user with primary key
    def delete(self, request, pk, format=None):
        user = self.get_object(pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

#retrieve information about items and post item
class ItemDetail(APIView):
    #delete temp users that are too old
    def delete_temp(self):
        temp_users = User.objects.filter(is_temp=True)
        now = datetime.datetime.now(datetime.timezone.utc)
        for user in temp_users:
            elapsed_since_changed = (now - user.changed_date)
            if (elapsed_since_changed > datetime.timedelta(minutes=20)):
                user.delete()

    #create item with post request creates with new id
    def post(self, request, format=None):
        request.data['item_id'] = Item.objects.aggregate(Max('item_id'))['item_id__max']+1 #highest id +1 to create next
        serializer = ItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    #gets all items
    def get(self, request, format=None):
        self.delete_temp()
        items = Item.objects.all()
        serializer = ItemSerializer(items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


#allows to collect items of primary key user
class ItemsOfUser(APIView):
    def get(self, request, pk, format=None,):
        items = Item.objects.filter(author_fk=pk)
        serializer = ItemSerializer(items, many=True)
        return Response(serializer.data)

    #deletes items of the user
    def delete(self, request, pk, format=None):
        items = Item.objects.filter(author_fk=pk)
        items.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class OrderCart(APIView):
    def get_user(self, pk):
        try:
            return User.objects.get(pk=pk)
        except:
            raise Http404

    def get(self,request,pk,format=None):
        order = Order.objects.all()
        serializer = OrderSerializer(order, many=True)
        return Response(serializer.data)

    def buy_item(self,item_id,order_id,quantity):
        order_item = {'item_fk_id' : item_id, 'order_fk_id' : order_id, 'quantity' : quantity}
        serializer = OrderItemSerializer(data=order_item)
        if serializer.is_valid():
            serializer.save()

    def lower_currency(self, amount, pk):
        user = self.get_user(pk)
        user.currency -= amount
        serializer = UserSerializer(data=user)
        if serializer.is_valid():
            serializer.save()

    def post(self,request,pk,format=None):
        new_order_id = Order.objects.aggregate(Max('order_id'))['order_id__max']+1 #highest id +1 to create next

        cost = 0
        for item in request.data:
            cost += item['price'] * item['quantity']

        buying_user = self.get_user(pk)
        if cost > buying_user.currency:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        for item in request.data:
            self.buy_item(item['item_id'], new_order_id, item['quantity'])
        
        self.lower_currency(cost, pk)
        order = {'order_id' : new_order_id, 'user_fk_id' : pk}
        serializer = OrderSerializer(data=order)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#gets all items of all orders user has ordered
class OrderItems(APIView):
    def get(self,request,pk,format=None):
        order = Order.objects.filter(user_fk_id=pk)
        items = OrderItem.objects.none()
        for x in order:
            items |= OrderItem.objects.filter(order_fk_id=x.order_id)
        serializer = OrderItemSerializer(items, many=True)
        return Response(serializer.data)