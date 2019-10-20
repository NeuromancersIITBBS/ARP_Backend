const studyResRouter = require('express').Router();
const resSchema = require('../models/firebasedb.js');
const studyResources = require('../models/firebasedb.js')

//get all resources for admin
studyResRouter.get('/',(req,res)=>{
studyResources
});
//get resource by subjectcode
studyResRouter.get('/:branch/subjects/:subjectCode',(req,res)=>{

});

//upload resources of a subject code
studyResRouter.post('/:branch/subjects/:subjectCode',(req,res)=>{

});


//get all subjects of a branch
studyResRouter.get('/:branch/subjects',(req,res)=>{

});

//get resource by subjectcode
studyResRouter.get('/:branch/subjects/:subjectCode/resources/:uniqueId',(req,res)=>{

});


studyResRouter.post('/:branch/subjects/:subjectCode/resources/:uniqueId',(req,res)=>{

});
studyResRouter.post('/:branch/subjects/:subjectCode/resources/:uniqueId',(req,res)=>{

});

module.exports = studyResRouter;