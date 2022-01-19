from django.db import models

#User model linked with cart and order history
class User(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100)
    cart = models.IntegerField()
    order_history = models.IntegerField()
