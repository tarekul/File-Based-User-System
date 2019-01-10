# File-Based-User-System
## Server that stores data for a school
The server has the following data models:
  - Classes
  - Students
### Add Student to a class or create a new class with a student
localhost:3000/class/add/?class=physics&name=John&age=30&city=NYC&grade=75 
  * The GET request must pass all four data points for the user to store into the file
  
### List All Students in a Class
localhost:3000/class/list/?class=physics
  * Checks if the class file exists, if not gives an error response
  * If class file exists shows the list of students
  
### List Failing Students
localhost:3000/class/listfailing/?class=physics
  * Checks if the class file exists, if not gives an error response
  * If class file exists shows the list of students who are scoring less than 50
  
### List Students from a Specific City
localhost:3000/class/listfromcity/?class=physics&city=NYC
  * Checks if the class file exists, if not gives an error response
  * If class file exists shows the list of students who are from the entered city
  * If a city is passed that doesn't match any students, shows empty array of students
