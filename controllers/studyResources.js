const studyResRouter = require('express').Router();
const resSchema = require('../models/firebasedb.js');
const studyResources = require('../models/firebasedb.js').studyResources;
const schema = require('../models/firebasedb.js').schema;
const storage = require('../models/firebasedb.js').storage;


//get all resources
studyResRouter.get('/admin',(req,res)=>{
    console.log("I am here");
   res.json({hi :"Hello"}).end();
});
studyResRouter.get('/', async (req,res,next)=>{
    let list = [];
    // studyResources.get().then((branches)=>{
    //    branches.forEach((branch)=>{
    //         branch.getCollections().then((subjects)=> {
    //             subjects.forEach((subject) => {
    //                 subject.where('flag','>',"0").get().then((resource)=>{
    //                     list.push(resource);
    //                 })
    //             })
    //         })
    //    })
    // });
    try{
        let branches = await studyResources.get();
        for (const branch of branches) {
            let subjects = await branch.getCollections();
            for (const subject of subjects) {
                let resource = await subject.get();
                list.push(resource);
            }
        }
        res.status(200).json(list);
    }catch(error){
        next(error)
    }
});

//get all subjects of a branch
studyResRouter.get('/:branch/', async (req,res,next)=>{
    try{
        let list = [];
        let subjects = await studyResources.doc(req.params.branch).getCollections();
        for(const subject of subjects){
            let resources = await subject.get();
            for(const resource of resources) {
                if (resource.review) {
                    let subName = resource.subjectName;
                    let subCode = resource.subjectCode;
                    list.push({subjectName: subName, subjectCode: subCode});
                    break;
                }
            }
        }
        res.status(200).send(list);
    }catch(error)
    {
        next(error);
    }
});

//get resource by subjectcode
studyResRouter.get('/:branch/subjects/:subjectCode',(req,res,next)=>{
    try{
        let resource = studyResources
            .doc(req.params.branch)
            .collection(req.params.subjectCode)
            .get();
        res.status(200).send(resource)
    }catch(error) {
        next(error);
    }
});

studyResRouter.put('/:branch/subjects/:subjectCode/resources/:uniqueId',async (req,res,next)=>{
    try{
        let resource = await studyResources
            .doc(req.params.branch)
            .collection(req.params.subjectCode)
            .where("resourceId","==",req.params.uniqueId).get();
        let newflags = resource['flag']+1;
        let flagArray = resource['flagReason'];
        flagArray.push(req.body.flagReason);
        studyResources
            .doc(req.params.branch)
            .collection(req.params.subjectCode)
            .where("resourceId","==",req.params.uniqueId)
            .update({flags : newflags, flagReason: flagArray})
            .then(()=>res.send(204).end());
    }catch(error){
        next(error);
    }

});

studyResRouter.delete('/:branch/subjects/:subjectCode/resources/:uniqueId',async (req,res,next)=>{
    try{
        let resource = await studyResources
            .doc(req.params.branch)
            .collection(req.params.subjectCode)
            .where("resourceId","==",req.params.uniqueId).get();
        let downloadLink = resource.downloadLink;
        let resourceRef = await storage.refFromURL(downloadLink);
        resourceRef.delete().then(()=>{
              res.send(204).end();
        }).catch((err)=>{
              next(err)
        });
    }catch(error){
        next(error);
    }
});

//get all resources
studyResRouter.get('/search', async (req,res,next)=>{
    let list = [];
    try{
        let branches = await studyResources.get();
        for (const branch of branches) {
            let subjects = await branch.getCollections();
            for(const subject of subjects){
                let resources = await subject.get();
                for(const resource of resources) {
                    if (resource.review) {
                        let subName = resource.subjectName;
                        let subCode = resource.subjectCode;
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

//upload resources of a subject code
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
           downloadLink: req.body.downloadId,
           flagReason: []
       };

       let resource = await studyResources
           .doc(req.params.branch)
           .collection(req.params.subjectCode)
           .doc();
       resourceObj['resourceId'] = resource.id;
       resource.set(resourceObj)
           .then(() => res.status(201).end());
   }catch(err){
       next(err);
   }
});

module.exports = studyResRouter;
