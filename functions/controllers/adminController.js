const adminRouter = require('express').Router();
const studyResources = require('../models/firebasedb.js').studyResources;
const admin = require('../utils/config.js').admin;


//get all flagged resources
adminRouter.get('/flagged', async (req,res,next)=>{
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
adminRouter.get('/unreviewed', async (req,res,next)=>{
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
module.exports = adminRouter;
