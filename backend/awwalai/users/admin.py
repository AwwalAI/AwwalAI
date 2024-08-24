from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('username', 'first_name', 'last_name', 'is_staff', 'is_active', 'date_joined')
    search_fields = ('username', 'first_name', 'last_name')
    ordering = ('-date_joined',)

    # The fields to be used in displaying the CustomUser model.
    # These fields are displayed on the admin page.
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'user_permissions', 'groups')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'password1', 'password2', 'first_name', 'last_name', 'is_active', 'is_staff', 'is_superuser')}
         ),
    )
    filter_horizontal = ('user_permissions', 'groups')

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.site_header = 'Awwalai administration'
admin.site.site_title = 'Awwalai administration'