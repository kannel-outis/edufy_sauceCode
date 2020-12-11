
# Coursera api Team Delivr Sauce Code
 Backend api with nodeJs

this is the base url [https://gentle-crag-93709.herokuapp.com](https://gentle-crag-93709.herokuapp.com)
 
# Auth

to register a user, you can make a post request to 
```
https://gentle-crag-93709.herokuapp.com/auth/register

```
with a body that contains these fields(important fields are marked *): 
- first_name: String *
- last_name: String *
- email: String * (Valid email)
- password: String *
other not important fields ATM:
###### These fields are expected to be updated after registration
- preferences: Array
- courses_enrolled: Array (of course ids)

Response Upon request
```
{
    "id": "5fc0f3e3168f040004d04504",
    "email": "test@test.com",
    "first_name": "firstNameTest",
    "last_Name": "lastNameTest",
    "tokens": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI1ZmMwZjNlMzE2OGYwNDAwMDRkMDQ1MDQiLCJpYXQiOjE2MDY0ODA4ODQsImV4cCI6MTYwNjQ4MjA4NH0.HEqi-dZkkn6mQK9vXQ8mvv9pXKm3njTzx_mZ-Ox_0WY",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiI1ZmMwZjNlMzE2OGYwNDAwMDRkMDQ1MDQiLCJpYXQiOjE2MDY0ODA4ODQsImV4cCI6MTYzODAzODQ4NH0.tMHPYfLFsXpG4UL5jqX3aKiIdHQ16PNXXML9zzPw_10"
    }
}

```
##
To login, simply make a post request to
```
 https://gentle-crag-93709.herokuapp.com/auth/login

```
with a body that contains just the email and the password of a registered user.

Response upon request

```
{
    "id": "5fc0f3e3168f040004d04504",
    "email": "test@test.com",
    "first_name": "firstNameTest",
    "last_Name": "lastNameTest",
    "courses_enrolled": [],
    "tokens": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI1ZmMwZjNlMzE2OGYwNDAwMDRkMDQ1MDQiLCJpYXQiOjE2MDY0ODA4ODQsImV4cCI6MTYwNjQ4MjA4NH0.HEqi-dZkkn6mQK9vXQ8mvv9pXKm3njTzx_mZ-Ox_0WY",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiI1ZmMwZjNlMzE2OGYwNDAwMDRkMDQ1MDQiLCJpYXQiOjE2MDY0ODA4ODQsImV4cCI6MTYzODAzODQ4NH0.tMHPYfLFsXpG4UL5jqX3aKiIdHQ16PNXXML9zzPw_10"
    }
}

```


# User

To get a user's information, you simply make a get request to this url

```
 https://gentle-crag-93709.herokuapp.com/user/userID
```
- Note: To make any request to this url, you need to have added the accessToken to the headers Authorization bearer token

where userID is a user's autogenerated id from their registration or login response. This id is unique and does not change.
you get a Response that contains all information about the particular user.

To update a user's profile, make a PATCH request to the above url with the fields you want to update. The body however must not contain a "courses_enrolled" field as it will assign a new array to it which overrides the previously stored array in the database.


To delete a user, make a delete request to the above url.

- To enroll a user to a particular course, make a patch request to the url below with a body that contains only the "courses_enrolled" field of which holds an array of courseIDs. make a get request to get the courses.
```
 https://gentle-crag-93709.herokuapp.com/user/userID/my-courses
```

# Course
To get all courses, you simply make a get request to
```
 https://gentle-crag-93709.herokuapp.com/courses
```

To add a course, you make a post request too the above url.
- Note: To make any request to this url, you need to have added the accessToken to the headers Authorization bearer token
 The body needs to contain the following fields(important fields are marked *):
- category: String - the category the course stands in..maybe technology or education,
- title: String,
- description: String,
- duration: String,
- instructors: Array (of user ids),
- resources: Array (of objects that contains the filename and link to file or video)
    for example = [
        {
            "fileName": "String",
            "link_to_resources": "String"
        }
    ],

Response upon request: 
```
{
    "instructors": [
        "5fbc3168bed1970e94694bc5",
        "5fc04aed0a8e193e889635b4"
    ],
    "_id": "5fc166f875962a032c6010a0",
    "category": "Technology",
    "title": "python course",
    "description": "this is a python course",
    "duration": "2 months",
    "date_added": "2001-11-27T08:00:00.000Z",
    "resources": [
        {
            "_id": "5fc166f875962a032c6010a1",
            "fileName": "String",
            "link_to_resources": "String"
        }
    ],
    "added_by": "emirtaiyeturaya2@gmail.com",
    "__v": 0
}
```
To get a specific Course, you make a get request to
```
 https://gentle-crag-93709.herokuapp.com/courses/courseID
```
- Note: To make any request to this url, you need to have added the accessToken to the headers Authorization bearer token

where courseID is a course's autogenerated id. This id is unique and does not change.
you get a Response that contains all information about the Course.

To delete a course you simply make a delete a request to the above url

# Others
To get a new accessToken with a refreshToken, you simply make a post request to
```
 https://gentle-crag-93709.herokuapp.com/auth/refresh-token
```
with a body that contains the user's valid refresh token.
then Respose body includes a new refreshToken as well as a new access Token









# TODO
 - delete course instructors
 - delete resources from existing courses
 - provide number of students that have enrolled for a course
 - Blacklisting refresh Tokens