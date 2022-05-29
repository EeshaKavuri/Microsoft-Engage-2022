# Microsoft-Engage-2022
Face Recognition : Smile Attendance Tracking System

**To run the server:**
1. Go you your command prompt
2. Change directory to django_project
3. manage.py is out main file
4. In your command prompt enter: _python manage.py runserver_
5. Please make sure to include "runserver" in the end otherwise the local host link will not be generated.

![cmd runserver](https://user-images.githubusercontent.com/88975253/170864104-85770d38-a232-484f-9e4d-e5ca278b956e.jpg)

6. Copy paste the above http link in your browser to view the page.

**How the application works:**
1. As any other online webpage you can register and login to the server.
2. Go to Attendence section in the cavigation bar, her click on the activate webcam button and allow the application to access your webcam.
3. Smile to capture your attendence.
4. If you are a new student or your face could not be found in the database, don't worry we got you.
5. The page shows that you might be new and provides you a button that will redirect you to New student regstration page (or directly use the new student option in the navigation bar), you can enter your name and select a picture of you and press upload.


**Requirements:**
(To use the Attendence-Project.py outside)
Please not that Attendence-Project.py is not used anywhere in the project. It is a file I created to use face recognition in python.
The following Python modules/packages has to be installed in your System:
1. cmake
2. dlib
3. wheel
4. face_recognition
5. opencv-python
