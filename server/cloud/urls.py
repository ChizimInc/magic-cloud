from django.urls import path
from cloud.views import CreateUserMainDirectory, CreateFolder, GetFolder, RenameFile, DeleteFile, FileUploadView


urlpatterns = [
    path('main-directory/create', CreateUserMainDirectory.as_view()),
    path('directory/create', CreateFolder.as_view()),
    path('directory/get/<int:parent_id>', GetFolder.as_view()),
    path('directory/rename', RenameFile.as_view()),
    path('directory/delete', DeleteFile.as_view()),
    path('file/upload', FileUploadView.as_view())
]