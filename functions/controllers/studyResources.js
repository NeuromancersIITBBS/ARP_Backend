const studyResRouter = require('express').Router();
const resSchema = require('../models/firebasedb.js');
const studyResources = require('../models/firebasedb.js').studyResources;
const firestore = require('../models/firebasedb.js').firestore;
const schema = require('../models/firebasedb.js').schema;
const admin = require('../utils/config.js').admin;
const storage = require('../models/firebasedb.js').storage;
const firebase  = require('firebase/app');

//delete resource by unique id


//upload a resource of a subject code
studyResRouter.post('/:branch/subjects/:subjectCode', async (req,res,next)=>{
   try {

       let resourceObj = {
           emailId: req.body.emailId,
           subjectName: req.body.subjectName,
           type: req.body.type,
           semester: req.body.semester,
           flags: 0,
           subjectCode: req.body.subjectCode,
           year: req.body.year,
           review: false,
           downloadLink: req.body.downloadLink,
           storageReference : req.body.storageReference,
           description : req.body.description,
           flagReason: []
       };
        console.log(resourceObj);
        console.log(req.body.description);
       let resource = await studyResources
           .doc(req.params.branch)
           .collection(req.params.subjectCode)
           .doc();
       resourceObj.resourceId = resource.id;
       resource.set(resourceObj)
           .then(()=>{
               studyResources
                   .doc(req.params.branch).set({lastUpdated : Date.now()});
           })
           .then(() => res.status(201).end());
   }catch(err){
       next(err);
   }
});

//get resources by subjectcode
studyResRouter.get('/:branch/subjects/:subjectCode',async (req,res,next)=>{
    try{
        let resources = await studyResources
            .doc(req.params.branch)
            .collection(req.params.subjectCode)
            .where("review","==",true)
            .get();
        let resourceList = [];
        await resources.forEach(resource => {
            resourceList.push(resource.data());
        });
        res.status(200).send(resourceList)
    }catch(error) {
        next(error);
    }
});

//update flag
studyResRouter.put('/:branch/subjects/:subjectCode/resources/:uniqueId',async (req,res,next)=>{
    try{
        let resource;
        await studyResources
            .doc(req.params.branch)
            .collection(req.params.subjectCode)
            .where("resourceId","==",req.params.uniqueId).get().then(resources => {
                resources.forEach(r => {
                    resource = r.data();
                })});
        let newFlags = resource.flags+1;
        let flagArray = resource.flagReason;
        flagArray.push(req.body.flagReason);
        let reviewVar = resource.review;
        if(newFlags >= NUMBER)
            reviewVar = false;
        await studyResources
            .doc(req.params.branch)
            .collection(req.params.subjectCode)
            .doc(req.params.uniqueId)
            .update({flags : newFlags, flagReason: flagArray, review : reviewVar})
            .then(()=>res.sendStatus(204).end());
    }catch(error){
        next(error);
    }
});

//get all subjects of a branch
studyResRouter.get('/:branch', async (req,res,next)=>{
    try {
        let globalList = [];
        let subjects = await studyResources.doc(req.params.branch).listCollections();
        for(const subject of subjects){
            let resources = await subject.get();
            for(const resource of resources.docs){
                if(resource.data().review){
                    let subName = resource.data().subjectName;
                    let subCode = resource.data().subjectCode;
                    globalList.push({subjectName: subName, subjectCode: subCode});
                    break;
                }
            }
        }
     res.status(200).send(globalList);
    }catch(error)
    {
        next(error);
    }
});

module.exports = studyResRouter;
