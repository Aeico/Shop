from pyexpat import model
from django.db import models

#User model linked with cart and order history
class User(models.Model):
    user_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100)
    currency = models.IntegerField(default=0)
    is_temp = models.BooleanField(default=False)
    changed_date = models.DateTimeField(auto_now=True)

class Item(models.Model):
    item_id = models.IntegerField(primary_key=True)
    author_fk = models.ForeignKey(User,null=False,on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=255)
    price = models.IntegerField(null=False)

class Order(models.Model):
    order_id = models.IntegerField(primary_key=True)
    user_fk_id = models.ForeignKey(User,null=False,on_delete=models.CASCADE)
    order_number = models.IntegerField(null=False)

class OrderItem(models.Model):
    order_fk_id = models.ForeignKey(Order,null=False,on_delete=models.CASCADE)
    item_fk_id = models.ForeignKey(Item,null=False,on_delete=models.DO_NOTHING)
    quantity = models.IntegerField(default=1)

class Cart(models.Model):
    user_fk_id = models.ForeignKey(User,null=False,on_delete=models.CASCADE)
    cart_id = models.IntegerField(primary_key=True)

class CartItem(models.Model):
    cart_fk_id = models.ForeignKey(Cart,null=False,on_delete=models.CASCADE)
    item_fk_id = models.ForeignKey(Item,null=False,on_delete=models.DO_NOTHING)
    quantity = models.IntegerField(null=False)
