const searchRouter = require("express").Router();
const check = require("../models/firebasedb.js").check;

//get all subject-subjectCode pairs for search implementation
searchRouter.get("/", async (req, res, next) => {
  let mainlist = [];
  try {
    let branches = await check.doc("list").get();
    for (let j = 0; j < branches.data().branches.length; j++) {
      let branchData = {};
      let list = [];
      let temp = branches.data().branches[j];
      for (let i = 0; i < branches.data()[temp].length; ++i) {
        let data = await branches.data()[temp][i];
        let subCode = data.substring(0, 7);
        let subName = data.substring(7);
        list.push({ subjectName: subName, subjectCode: subCode });
      }
      branchData.branchName = temp;
      branchData.data = list;
      mainlist.push(branchData);
    }
    res.status(200).send(mainlist).end();
  } catch (error) {
    next(error);
  }
});
module.exports = searchRouter;
