from django.db import models

#User model linked with cart and order history
class User(models.Model):
    user_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100)

class Item(models.Model):
    item_id = models.IntegerField(primary_key=True)
    fk_author = models.ForeignKey(User,null=False,on_delete=models.DO_NOTHING)
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=255)
    price = models.IntegerField(null=False)

class Order(models.Model):
    order_id = models.IntegerField(primary_key=True)
    fk_user_id = models.ForeignKey(User,null=False,on_delete=models.DO_NOTHING)
    order_number = models.IntegerField(null=False)

