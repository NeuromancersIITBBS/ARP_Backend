const studyResRouter = require('express').Router();
const resSchema = require('../models/firebasedb.js');
const studyResources = require('../models/firebasedb.js').studyResources;
const firestore = require('../models/firebasedb.js').firestore;
const schema = require('../models/firebasedb.js').schema;
const admin = require('../utils/config.js').admin;
const storage = require('../models/firebasedb.js').storage;
const firebase  = require('firebase/app');

//get all flagged resources
studyResRouter.get('/flagged', async (req,res,next)=>{
    try{
        let globalList = [];
        let branches = await studyResources.get();
        for (const branch of branches.docs) {
            let subjects = await studyResources.doc(branch.id).listCollections();
            for (const subject of subjects) {
                let resources = await subject.get();
                for (const resource of resources.docs) {
                    if (resource.data().flags > 0)
                        globalList.push(resource.data());
                }
            }
        }
        res.status(200).send(globalList);
    }catch(err){
        next(err);
    }
});

//get all unreviewed resources
studyResRouter.get('/unreviewed', async (req,res,next)=>{
    try{
        let globalList = [];
        let branches = await studyResources.get();
        for (const branch of branches.docs) {
            let subjects = await studyResources.doc(branch.id).listCollections();
            for (const subject of subjects) {
                let resources = await subject.get();
                for (const resource of resources.docs) {
                    if (resource.data().review === false)
                        globalList.push(resource.data());
                }
            }
        }
        res.status(200).send(globalList);
    }catch(err){
        next(err);
    }
});

//delete resource by unique id
studyResRouter.delete('/:branch/subjects/:subjectCode/resources/:uniqueId',async (req,res,next)=>{
    try{
        let resource = await studyResources
            .doc(req.params.branch)
            .collection(req.params.subjectCode)
            .doc(req.params.uniqueId).get();

        let storageReference=resource.data().storageReference;
        let resourceRef = await storage.bucket(process.env.storageBucket);
        let str = storageReference;
        let pos = str.lastIndexOf("/");
        let name = str.substring(pos+1);
        let file=resourceRef.file(name);

        file.delete().then(()=>{
            studyResources
            .doc(req.params.branch)
            .collection(req.params.subjectCode)
            .doc(req.params.uniqueId).delete().then(()=>{
             console.log("successfully deleted file");
             res.sendStatus(204).end();
        }).catch((err)=>{
              next(err)})
        }).catch((err)=>{
              next(err)
        });
    }catch(error){
        next(error);
    }
});

//get all subject-subjectCode pairs for search implementation
studyResRouter.get('/search', async (req,res,next)=>{
    let list = [];
    try{
        let branches = await studyResources.get();
        for (const branch of branches.docs) {
            let subjects = await studyResources.doc(branch.id).listCollections();
            for(const subject of subjects){
                let resources = await subject.get();
                for(const resource of resources.docs) {
                    if (resource.data().review) {
                        let subName = resource.data().subjectName;
                        let subCode = resource.data().subjectCode;
                        list.push({subjectName: subName, subjectCode: subCode});
                        break;
                    }
                }
            }
        }
        res.status(200).send(list);
    }catch(error){
        next(error)
    }
});

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
           flagReason: []
       };

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
        if(newFlags >= 30)
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

//admin review implementation
studyResRouter.put('/admin/:branch/subjects/:subjectCode/resources/:uniqueId',async (req,res,next)=>{
    try{
        let updateObj = {
            subjectName : req.body.subjectName,
            subjectCode : req.body.subjectCode,
            semester : req.body.semester,
            type : req.body.type,
            year : req.body.year,
            flags : 0,
            flagReason : [],
            review : true
        };
        await studyResources
            .doc(req.params.branch)
            .collection(req.params.subjectCode)
            .doc(req.params.uniqueId)
            .update(updateObj)
            .then(()=>res.sendStatus(204).end());
    }catch(error){
        next(error);
    }
});

module.exports = studyResRouter;
