from django.contrib import admin
from .models import QuizHistory

@admin.register(QuizHistory)
class QuizHistoryAdmin(admin.ModelAdmin):
    list_display = ('user', 'created_at', 'content_preview')
    list_filter = ('user', 'created_at')
    search_fields = ('user__username', 'content')
    readonly_fields = ('created_at',)
    
    def content_preview(self, obj):
        return obj.content[:50] + '...' if len(obj.content) > 50 else obj.content
    content_preview.short_description = 'Content Preview'

    fieldsets = (
        (None, {
            'fields': ('user', 'content', 'quiz')
        }),
        ('Metadata', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )

    def get_readonly_fields(self, request, obj=None):
        if obj:  # editing an existing object
            return self.readonly_fields + ('user', 'content', 'quiz')
        return self.readonly_fields