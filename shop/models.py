from django.db import models

#User model linked with cart and order history
class User(models.Model):
    user_id = models.IntegerField(primary_key=True, max_length=20)
    name = models.CharField(max_length=100)

#class OrderHistory(models.Model):
#    id = models.ForeignKey()
