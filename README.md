# ARP Backend

- This repository consists of the codes for backend of Academic Resource Portal


## Schema
All API access is over `HTTPS`, and accessed from the `<https://arpb.herokuapp.com>`. All data is sent as JSON.

```bash


{
  'author' : 'Neuromancers, IIT Bhubaneswar',
  'endpoint' : '',
  'project_name' : 'ARP_Backend',
  'project_url' : 'https://github.com/NeuromancersIITBBS/ARP_Backend'
}
```

## Endpoints

### `GET: /admin`
Result:
```json

```

### `GET: /studyResources/branches/{branch}`
Result:
```json

```

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

### `GET: /studyResources/branches/search`
Result:
```json
[
    {
        "subjectName":"PDS",
        "subjectCode":"CS1L001"
    },
    {
        "subjectName":"Advanced PDS",
        "subjectCode":"CS1L004"
    },
  {
    "subjectName":"Data Structures",
    "subjectCode":"CS2L003"
  },
  {
    "subjectName":"Signal & System",
    "subjectCode":"EC1L001"
  }
]
```

### `GET: /studyResources/branches/{branch}/subjects/{subjectCode}`
Result :
```json
[
  {
    "subjectName":"PDS",
    "subjectCode":"CS1L001"
  },
  {
    "subjectName":"Advanced PDS",
    "subjectCode":"CS1L004"
  },
  {
    "subjectName":"Data Structures","subjectCode":"CS2L003"
  }
]    
```

### `PUT: /studyResources/branches/{branch}/subjects/{subjectCode}/resources/{uniqueId}`
Result:
```json

```

### `DELETE: /studyResources/branches/{branch}/subjects/{subjectCode}/resources/{uniqueId}`
Result:
```json

```

### `POST: /studyResources/branches/{branch}/subjects/{subjectCode}`
Result:
```json

```

## Deployment
 Currently deployed on heroku `<https://arpb.herokuapp.com>`.


## Built With

* [Nodejs](https://nodejs.org/en/) - The web framework used
* [Firebase](https://firebase.google.com/) - Database and Storage
* [Heroku](https://www.heroku.com/) - For Deployment

## Contributors

- Rishabh Gupta (Project Leads)
- Chirag Nighut (Project Leads)
- Aashay Palliwar
- Pradyuman Agrawal
- Sreekanth Vadigi
- Anuj Gupta


### Contact us at secyprogsoc.sg@iitbbs.ac.in

## License

Built with ♥ by Neuromancers, IIT Bhubaneswar.
