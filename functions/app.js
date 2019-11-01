const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const middleware = require('./utils/middleware.js');
const studyResRouter = require('./controllers/studyResources.js');
const studyResources = require('./models/firebasedb.js').studyResources;

app.use(cors());
app.use(bodyParser.json());
app.use(middleware.requestLogger);

app.use('/studyResources/branches',studyResRouter);

//get all flagged resources
app.get('/admin/flagged', async (req,res,next)=>{
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
app.get('/admin/unreviewed', async (req,res,next)=>{
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

//get all subject-subjectCode pairs for search implementation
app.get('/search', async (req,res,next)=>{
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

//admin review implementation
app.put('/admin/studyResources/branches/:branch/subjects/:subjectCode/resources/:uniqueId',async (req,res,next)=>{
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
        studyResources
            .doc(req.params.branch)
            .collection(req.params.subjectCode)
            .doc(req.params.uniqueId)
            .update(updateObj)
            .then(()=>res.sendStatus(204).end());
    }catch(error){
        next(error);
    }
});



app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
module.exports = app;
