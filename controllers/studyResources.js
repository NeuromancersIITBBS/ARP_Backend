const studyResRouter = require('express').Router();
const resSchema = require('../models/firebasedb.js');
const studyResources = require('../models/firebasedb.js').studyResources;
const firestore = require('../models/firebasedb.js').firestore;
const schema = require('../models/firebasedb.js').schema;
const admin = require('../utils/config.js').admin;
const storage = require('../models/firebasedb.js').storage;
const firebase  = require('firebase/app');

//all flagged
studyResRouter.get('/', async (req,res,next)=>{

/*
try{
        let globalList = [];
        let branches = await studyResources.get();

                for (const branch of branches.docs) {

                    let docRef = await studyResources.doc(branch.id);
                    docRef
                        .listCollections()
                        .then(async (subjects) => {
                            for (subject of subjects) {
                                let resources = await subject.get();
                                for (resource of resources.docs) {
                                    if (resource.data().flags > 0)
                                        globalList.push(resource.data());
                                    //console.log(globalList);
                                }
                            }
                        })
                        .catch(err => {
                        next(err);
                    });
                }
            console.log(globalList);
            //return globalList;
            res.status(200).send(globalList);
    }catch(err){
    next(err);
}
*/

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
                    //console.log(globalList);
                }
            }
        }
        console.log(globalList);
        //return globalList;
        res.status(200).send(globalList);
    }catch(err){
        next(err);
    }





    //         .doc(req.params.branch)
    //         .listCollections()
    //         .then(async (subjects) => {
    //             //console.log(subjects);
    //             for(subject of subjects){
    //                 let resources = await subject.get();
    //                 for(resource of resources.docs){
    //                     if(resource.data().review){
    //                         let subName = resource.data().subjectName;
    //                         let subCode = resource.data().subjectCode;
    //                         globalList.push({subjectName: subName, subjectCode: subCode});
    //                         break;
    //                     }
    //                 }
    //             }
    //             return globalList;
    //         }).then(()=>{res.status(200).send(globalList)}).catch(err => {next(err)});
    //
    // }catch(error)
    // {
    //     next(error);
    // }
    //
    //
    // let globalList = [];
    // studyResources.get().then((branches)=>{
    //    branches.forEach((branch)=>{
    //         branch.listCollections().then((subjects)=> {
    //             subjects.forEach((subject) => {
    //                 subject.where('flag','>',"0").get().then((resource)=>{
    //                     list.push(resource.data());
    //                 }).catch((err)=>next(err));
    //             })
    //         }).catch((err)=>next(err));
    //    })
    // }).then(()=>{res.sendStatus(200).send(list)}).catch((err)=>next(err));
    // // try{
    // //     let branches = await studyResources.get();
    // //     console.log(branches);
    // //     console.log(typeof branches);
    // //     for (const branch of branches) {
    // //         let subjects = await branch.getCollections();
    // //         for (const subject of subjects) {
    // //             let resource = await subject.get();
    // //             list.push(resource);
    // //         }
    // //     }
    // //     res.status(200).json(list);
    // // }catch(error){
    // //     next(error)
    // // }
});

//delete resource by unique id ()
studyResRouter.delete('/:branch/subjects/:subjectCode/resources/:uniqueId',async (req,res,next)=>{
    try{
        let resource;
        let resourceRef2= await studyResources
            .doc(req.params.branch)
            .collection(req.params.subjectCode)
            .where("resourceId","==",req.params.uniqueId)
            .get()
            .then(resources => {
              resources.forEach(r => {
                resource = r.data();
              });
            });
        let downloadLink = resource.downloadLink;
        console.log(downloadLink);
        let resourceRef = await admin.firestore().refFromURL(downloadLink);
        console.log(resourceRef);
        // resourceRef.delete().then(()=>{
        //       res.send(204).end();
        // }).catch((err)=>{
        //       next(err)
        // });
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
    try{
        let list = [];
        let subjects = await studyResources.doc(req.params.branch).listCollections();
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

// studyResRouter.delete('/:branch/subjects/:subjectCode/resources/:uniqueId',async (req,res,next)=>{
//     try{
//         let resource = await studyResources
//             .doc(req.params.branch)
//             .collection(req.params.subjectCode)
//             .where("resourceId","==",req.params.uniqueId).get();
//         let downloadLink = resource.downloadLink;
//         let resourceRef = await storage.refFromURL(downloadLink);
//         resourceRef.delete().then(()=>{
//               res.send(204).end();
//         }).catch((err)=>{
//               next(err)
//         });
//     }catch(error){
//         next(error);
//     }
// });

//get all resourcescopy (incomplete)
studyResRouter.get('/searchcopy',(req,res,next)=>{
    //let list = [];
    try{
      console.log("In here 0");
        studyResources.get().then(branches=>{
          console.log("In here 1");
          branches.forEach(branch=>{

              branch.getCollections().then(subjects=>{
                subjects.forEach(subject=>{
                    subject.get().then(resources=>{
                      resources.forEach(resource=> {
                          //if (resource.review)
                          console.log("In here")
                           {
                              let subName = resource.data().subjectName;
                              let subCode = resource.data().subjectCode;
                              list.push({subjectName: subName, subjectCode: subCode});
                              //break;
                              console.log(subName+"  "+subCode)
                          }
                      })
                    });
                })
              });
          })
          res.status(200).send(list);
        });
    }catch(error){
        next(error)
    }
});

//upload resources of a subject code (Complete)
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
           .then(() => res.status(201).end());
   }catch(err){
       next(err);
   }
});

//get resources by subjectcode (Complete)
studyResRouter.get('/:branch/subjects/:subjectCode',async (req,res,next)=>{
    try{
        let resource = await studyResources
            .doc(req.params.branch)
            .collection(req.params.subjectCode)
            .where("review","==",true)
            .get();
        let resources = [];
        await resource.forEach(r => {
            resources.push(r.data());
        });
        res.status(200).send(resources)
    }catch(error) {
        next(error);
    }
});

//update flag (Complete)
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

//get all subjects of a branch (complete)
studyResRouter.get('/:branch',  (req,res,next)=>{
    try {
        let globalList = [];
        studyResources
            .doc(req.params.branch)
            .listCollections()
            .then(async (subjects) => {
                //console.log(subjects);
                for(subject of subjects){
                    let resources = await subject.get();
                    for(resource of resources.docs){
                        if(resource.data().review){
                            let subName = resource.data().subjectName;
                            let subCode = resource.data().subjectCode;
                            globalList.push({subjectName: subName, subjectCode: subCode});
                            break;
                        }
                    }
                }
                return globalList;
            }).then((globalList)=>{res.status(200).send(globalList)}).catch(err => {next(err)});

    }catch(error)
    {
        next(error);
    }
});

//admin review implementation (complete)
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
