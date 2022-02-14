from ast import For
import datetime
from shop.models import Cart, Item, User
from shop.serializers import UserSerializer, ItemSerializer, CartSerializer
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

#to allow creation of cart
class cartObject:
    def __init__(self, user_fk_id, cart_id):
        self.user_fk_id = user_fk_id
        self.cart_id = cart_id

class PurchaseCart(APIView):
    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except:
            raise Http404

    def get(self,request,pk,format=None):
        cart = Cart.objects.all()
        serializer = CartSerializer(cart, many=True)
        return Response(serializer.data)

    def set_currency(self, amount, pk):
        user = self.get_object(pk)
        serializer = UserSerializer(user, data=user)
        if serializer.is_valid():
            serializer.save()

    def post(self,request,pk,format=None):
        self.set_currency(request.data[0]['price'], pk)
        #cart = cartObject(pk, 1)
        cart = {'user_fk_id' : pk, 'cart_id' : 1}
        serializer = CartSerializer(data=cart)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PostOrderItems(APIView):
    def post(self,request,pk,format=None):
        
        return Response()