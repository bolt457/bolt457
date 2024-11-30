from django import forms
from .models import Image, Music, Video

class ImageUploadForm(forms.ModelForm):
    class Meta:
        model = Image
        fields = ['title', 'image']

class MusicUploadForm(forms.ModelForm):
    class Meta:
        model = Music
        fields = ['title', 'music']

class VideoUploadForm(forms.ModelForm):
    class Meta:
        model = Video
        fields = ['title', 'video']
