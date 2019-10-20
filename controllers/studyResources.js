const studyResRouter = require('express').Router();
const resSchema = require('../models/firebasedb.js');
const studyResources = require('../models/firebasedb.js').studyResources;
const schema = require('../models/firebasedb.js').schema;

//get all flagged resources for admin
studyResRouter.get('/', async (req,res)=>{
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
    let branches = await studyResources.get();
    for (const branch of branches) {
        let subjects = await branch.getCollections();
        for (const subject of subjects) {
           let resource = await subject.where('flag','>',"0").get();
           list.push(resource);
        }
    }
    res.status(200).send(list);
});

//get all subjects of a branch
studyResRouter.get('/:branch/subjects',(req,res)=>{

});

//get resource by subjectcode
studyResRouter.get('/:branch/subjects/:subjectCode',(req,res)=>{

});

studyResRouter.put('/:branch/subjects/:subjectCode/resources/:uniqueId',(req,res)=>{
    studyResources.doc("")
});

//upload resources of a subject code
studyResRouter.post('/:branch/subjects/:subjectCode',(req,res)=>{

});


module.exports = studyResRouter;