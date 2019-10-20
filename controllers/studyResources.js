const studyResRouter = require('express').Router();
const resSchema = require('../models/firebasedb.js');
const studyResources = require('../models/firebasedb.js').studyResources;
const schema = require('../models/firebasedb.js').schema;

//get all flagged resources for admin
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
                let resource = await subject.where('flag','>',"0").get();
                list.push(resource);
            }
        }
    }catch(error){
        next(error)
    }

    res.status(200).send(list);
});

//get all subjects of a branch
studyResRouter.get('/:branch/subjects', async (req,res,next)=>{
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

studyResRouter.put('/:branch/subjects/:subjectCode/resources/:uniqueId',(req,res,next)=>{
    try{
        let resource = studyResources
            .doc(req.params.branch)
            .collection(req.params.subjectCode)
            .where("resourceId","==",req.params.uniqueId).get();
        let newflags = resource['flag']+1;

        studyResources
            .doc(req.params.branch)
            .collection(req.params.subjectCode)
            .where("resourceId","==",req.params.uniqueId).update({flags : newflags});
        res.send(204).end();
    }catch(error){
        next(error);
    }

});

//upload resources of a subject code
studyResRouter.post('/:branch/subjects/:subjectCode',(req,res)=>{

});


module.exports = studyResRouter;