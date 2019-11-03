# ARP Backend

- This repository consists of the codes for backend of Academic Resource Portal


## Schema
All API access is over `HTTPS`, and accessed from the `<https://arpbackend-df561.firebaseapp.com>`. All data is sent as JSON.

```bash


{
  'author' : 'Neuromancers, IIT Bhubaneswar',
  'endpoint' : '',
  'project_name' : 'ARP_Backend',
  'project_url' : 'https://github.com/NeuromancersIITBBS/ARP_Backend'
}
```

## Endpoints

### `GET: /admin/flagged`
Result:
Returns json data of all flagged files.
```json
[
    {
        "flags": 2,
        "subjectName": "PDS",
        "review": true,
        "subjectCode": "CS1L001"
    },
    {
        "semester": "autumn",
        "year": 2018,
        "flags": "2",
        "subjectName": "Data Structures",
        "review": true,
        "downloadLink": "https://google.com",
        "flagReason": [
            "duplicate",
            "irrelevant"
        ],
        "type": "endsem",
        "resourceId": "PQvrbm2KP9MjuyKQktn7",
        "emailId": "asdf123@gmail.com",
        "subjectCode": "CS2L003"
    },
    {
        "review": false,
        "subjectCode": "code",
        "downloadLink": "cgfvhbjn",
        "flags": 3
    },
    {
        "subjectName": "Signal & System",
        "review": true,
        "subjectCode": "EC1L001",
        "flags": 1
    }
]
```
### `GET: /admin/unreviewed`
Result:
Returns json data of all unreviewed files.
```json
[
    {
        "subjectName": "Advanced PDS",
        "review": false,
        "downloadLink": "https://fibasestorage.googleapis.com/v0/b/arpbackend-7b652.appspot.com/o/3.%20Gene%20Mutation.pdf?alt=media&token=78e20a31-3daa-4924-9ea7-3293513cad97",
        "flagReason": [],
        "type": "endsem",
        "resourceId": "VHnJ6T2joP50mNX3Hqwf",
        "emailId": "r22@gmail.com",
        "subjectCode": "CE645",
        "semester": "autumn",
        "year": "2018",
        "flags": 0
    },
    {
        "downloadLink": "cgfvhbjn",
        "flags": 3,
        "review": false,
        "subjectCode": "code"
    }
]
```

### `DELETE: /studyResources/branches/{branch}/subjects/{subjectCode}/resources/{uniqueId}`
Result:
Delete the resource of uniqueId.

### `GET: /search`
Result:
Returns json data containing subjectName and subjectCode for all reviewed files.
```json
[
    {
        "subjectName": "PDS",
        "subjectCode": "CS1L001"
    },
    {
        "subjectName": "Advanced PDS",
        "subjectCode": "CS1L004"
    },
    {
        "subjectName": "Data Structures",
        "subjectCode": "CS2L003"
    },
    {
        "subjectName": "Signal & System",
        "subjectCode": "EC1L001"
    },
    {
        "subjectName": "ET-2",
        "subjectCode": "EE3L004"
    }
]
```

### `POST: /studyResources/branches/{branch}/subjects/{subjectCode}`
Result:
Upload a resource of a subject code.

### `GET: /studyResources/branches/{branch}/subjects/{subjectCode}`
Result for subjectCode : CS2L003 :
```json
[
    {
        "downloadLink": "https://firebasestorage.googleapis.com/v0/b/arpbackend-7b652.appspot.com/o/3.%20Gene%20Mutation.pdf?alt=media&token=78e20a31-3daa-4924-9ea7-3293513cad97",
        "flagReason": [],
        "type": "tutorial",
        "resourceId": "MrZpAehPuOZQKNnJUqxQ",
        "emailId": "random@gmail.com",
        "subjectCode": "CS2L003",
        "semester": "spring",
        "year": "2019",
        "flags": 0,
        "subjectName": "Data Structures",
        "review": true
    },
    {
        "subjectName": "Data Structures",
        "review": true,
        "downloadLink": "https://google.com",
        "flagReason": [
            "duplicate",
            "irrelevant"
        ],
        "type": "endsem",
        "resourceId": "PQvrbm2KP9MjuyKQktn7",
        "emailId": "asdf123@gmail.com",
        "subjectCode": "CS2L003",
        "semester": "autumn",
        "year": 2018,
        "flags": "2"
    }
]

```

### `PUT: /studyResources/branches/{branch}/subjects/{subjectCode}/resources/{uniqueId}`
Result:
Updates flag.

### `GET: /studyResources/branches/{branch}`
Result:
Returns json data containing subjectName and subjectCode of all reviewed files for a specific branch.

```json
[
    {
        "subjectName": "PDS",
        "subjectCode": "CS1L001"
    },
    {
        "subjectName": "Advanced PDS",
        "subjectCode": "CS1L004"
    },
    {
        "subjectName": "Data Structures",
        "subjectCode": "CS2L003"
    }
]
```

### `PUT: /admin/studyResources/branches/{branch}/subjects/{subjectCode}/resources/{uniqueId}`
Result :
Admin review the file and update the review value.

## Deployment
 Currently deployed on firebase `<https://arpbackend-df561.firebaseapp.com>`.


## Built With

* [Nodejs](https://nodejs.org/en/) - The web framework used
* [Firebase](https://firebase.google.com/) - Database, Storage and Deployment.

## Contributing
- Fork the repository https://github.com/NeuromancersIITBBS/ARP_Backend.git and download the code to your local system using git clone.
- Install the npm modules
```
 npm install
 ```
- Start the server using command
```
 nodemon index.js
 ```
- A new function can be written in controllers/studyResources.js using appropriate endpoints.
- After verifying the working of the function using postman app https://www.getpostman.com/, push the changes to the forked repository.
- Create a pull request, explaining the details of the changes made.

## Contributors

- Rishabh Gupta (Project Leads)
- Aashay Palliwar
- Pradyuman Agrawal
- Sreekanth Vadigi
- Anuj Gupta


### Contact us at secyprogsoc.sg@iitbbs.ac.in

## License

Built with ♥ by Neuromancers, IIT Bhubaneswar.
