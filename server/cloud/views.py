import os
from pathlib import Path

from rest_framework import views
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import FileUploadParser, MultiPartParser, FormParser

from cloud.models import File, UserAccount
from cloud.serializers import FileCreateSerializer, GetFolderSerializer, RenameFileSerializer, FileSerializer


class CreateUserMainDirectory(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):
        base_dir = Path(__file__).resolve().parent
        files_folder = os.path.join(base_dir, 'files')
        user_id = str(request.user.id)
        user_folder = os.path.join(files_folder, user_id)
        

        if os.path.isdir(user_folder):
            return Response("exists")

        try: 
            os.mkdir(user_folder) 
            current_user = UserAccount.objects.get(id=request.user.id)
            current_user.main_folder = True
            current_user.save()
        except OSError as error: 
            return Response("Dirrectory not created") 
        

        return Response("Directory is successful created" ,status=status.HTTP_201_CREATED)


class CreateFolder(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data
        data['user_id'] = request.user.id
        serializer = FileCreateSerializer(data=data)

        if serializer.is_valid():
            file = serializer.save()
            new_file = File.objects.get(id=file.id)

            base_dir = Path(__file__).resolve().parent
            files_folder = os.path.join(base_dir, 'files')

            try:
                parentFile = File.objects.get(id=request.data['parent_id'])
                new_file.path = parentFile.path + '\\' + request.data['name']
                new_file.user_id = request.user.id
                new_file.parent_id = request.data['parent_id']
                parentFile.childs = file.id
                parentFile.save()
                new_file.save()
                
                user_folder_path = os.path.join(files_folder, str(request.user.id))
                parent_folder_path = os.path.join(user_folder_path, parentFile.path)
                new_folder_path = os.path.join(parent_folder_path, request.data['name'])
                try:
                    os.mkdir(new_folder_path)
                except OSError as error:
                    return Response('Directory exist, parent exist')
            except File.DoesNotExist:
                
                user_folder = os.path.join(files_folder, str(request.user.id))
                new_folder = os.path.join(user_folder, request.data['name'])
                try:
                    os.mkdir(new_folder)
                except OSError as error: 
                    return Response('Directory exist, parent 0')
                
                new_file.path = request.data['name']
                new_file.user_id = request.user.id
                new_file.save()


            return Response(FileCreateSerializer(file).data , status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetFolder(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, parent_id):
        files = reversed(File.objects.filter(user_id=request.user.id, parent_id=parent_id))

        serializer = GetFolderSerializer(files, many=True)
        return Response(serializer.data)


class RenameFile(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data
        file = File.objects.get(id=request.data['id'], user_id=request.user.id)
        old_name = file.name

        base_dir = Path(__file__).resolve().parent
        files_folder = os.path.join(base_dir, 'files')
        user_folder_path = os.path.join(files_folder, str(request.user.id))

        if file.parent_id == 0:
            file.path = request.data['title']
            os_file_path = os.path.join(user_folder_path, old_name)
            new_os_file_path = os.path.join(user_folder_path, request.data['title'])
            try:
                os.rename(os_file_path, new_os_file_path)
            except OSError as error:
                return Response(status=status.HTTP_404_NOT_FOUND)

        else:
            if not file.childs:
                os_file_path = os.path.join(user_folder_path, file.path)
                path_elem = file.path.split("\\")
                path_elem[-1] = request.data['title']
                file.path = '\\'.join(map(str, path_elem))

                new_os_file_path = os.path.join(user_folder_path, file.path)
                try:
                    os.rename(os_file_path, new_os_file_path)
                except OSError as error:
                    return Response(status=status.HTTP_404_NOT_FOUND)
                

        file.name = request.data['title']
        file.save()
        serializer = RenameFileSerializer(file)



        return Response(serializer.data, status=status.HTTP_200_OK)


class DeleteFile(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        file = File.objects.get(id=request.data['id'], user_id=request.user.id)

        base_dir = Path(__file__).resolve().parent
        files_folder = os.path.join(base_dir, 'files')
        user_folder_path = os.path.join(files_folder, str(request.user.id))
        if file.path == '':
            os_file_path = os.path.join(user_folder_path, file.name)
        else:
            os_file_path = os.path.join(user_folder_path, file.path)
            
        if file.parent_id != 0 :
            posible_file = File.objects.filter(parent_id=file.parent_id, user_id=request.user.id)
            if posible_file.count() == 1:
                parent = File.objects.get(id=file.parent_id, user_id=request.user.id)
                parent.childs = ''
                parent.save()
 
        file.delete()
        if os.path.exists(os_file_path):
            os.rmdir(os_file_path)

        return Response(status=status.HTTP_200_OK)



class FileUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [IsAuthenticated]
    def post(self, request, *args, **kwargs):
        file_serializer = FileSerializer(data=request.data)
        if file_serializer.is_valid():
            file = file_serializer.save()

            file_from_db = File.objects.get(id=file.id)
            parent_folder_db = File.objects.get(id=file.parent_id)

            file_from_db.size = request.data['file'].size
            file_from_db.path = parent_folder_db.path + '\\' + file.name
            file_from_db.user_id = request.user.id
            file_from_db.save()

            parent_folder_db.childs = file.id
            parent_folder_db.save()

            return Response(file_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
