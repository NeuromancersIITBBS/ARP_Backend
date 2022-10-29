const searchRouter = require("express").Router();
const check = require("../models/firebasedb.js").check;

//get all subject-subjectCode pairs for search implementation
searchRouter.get("/", async (req, res, next) => {
  let mainlist = [];
  try {
    let branches = await check.doc("list").get();
    let branchesData = branches.data();
    for (const branch of branchesData.branches) {
      let list = [];
      for (const subjectData of branchesData[branch]) {
        let subCode = subjectData.substring(0, 7);
        let subName = subjectData.substring(7);
        list.push({ subjectName: subName, subjectCode: subCode });
      }
      mainlist.push({ branchName: branch, data: list });
    }
    res.status(200).send(mainlist);
  } catch (error) {
    next(error);
  }
});
module.exports = searchRouter;
