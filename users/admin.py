from django.contrib import admin
from users.models import Member, MemberInfo, Following

admin.site.register(Member)
admin.site.register(MemberInfo)
admin.site.register(Following)
