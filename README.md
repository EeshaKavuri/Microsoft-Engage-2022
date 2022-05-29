# Microsoft-Engage-2022
Face Recognition : Smile Attendance Tracking System

**To run the server:**
1. Go you your command prompt
2. Change directory to django_project
3. manage.py is the main file
4. In your command prompt enter: _python manage.py runserver_
5. Please make sure to include "runserver" in the end otherwise the localhost link will not be generated.

![cmd runserver](https://user-images.githubusercontent.com/88975253/170864104-85770d38-a232-484f-9e4d-e5ca278b956e.jpg)

6. Copy and paste the above HTTP link into your browser to view the page.
7. You can exit the server in your command prompt by entering (break): CTRL+C 
8. Please note that the localhost cannot be activated unless you properly host it in the command prompt.

**How the application works:**
1. As with any other online website you can register and login into the server.
2. Go to the Attendance section in the navigation bar, click on the activate webcam button and allow the application to access your webcam.
3. Smile to capture your attendance.
4. If you are a new student or your face could not be found in the database, don't worry we've got you.
5. The page shows that you might be new and provides you a button that will redirect you to the New student registration page (or directly use the new student option in the navigation bar), you can enter your name and select a picture of you and press upload.
6. If you are an already existing student, a custom message will be displayed on your screen stating that your attendance is taken.
7. There is a chatbot feature that, of course, is not fully deployed. As of now, you can send in your request.

**About the folders and files in the repository:**
1. _.vscode:_ This contains settings files for the JSON
2. _blog:_ This is the main folder where all our code is present
  _- The static folders are parsed automatically and have CSS and style codes. 
  - The templates folder has the HTML files needed to host each page for our website. 
  - The models files are used to train the machine to recognize faces, the latency of the application is dependent on this. 
  - All the other files are Django default files)_
3. _django_project:_ This is the Django default folder that has pre-setup files.
4. _manage.py:_ Our main source code file that is to be implemented.


**Requirements:**
(To use the Attendance-Project.py outside)
Please note that Attendance-Project.py is not used anywhere in the project. It is a file I created to use face recognition in python.
The following Python modules/packages have to be installed in your System:
1. cmake
2. dlib
3. wheel
4. face_recognition
5. opencv-python
