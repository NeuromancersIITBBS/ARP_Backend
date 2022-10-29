const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const middleware = require("./utils/middleware.js");
const studyResRouter = require("./controllers/studyResources.js");
const adminRouter = require("./controllers/adminController.js");
const searchRouter = require("./controllers/searchController.js");

// var corsOptions = {
//     origin: 'https://arpiitbbs.firebaseapp.com',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/studyResources/branches", studyResRouter);
app.use("/admin", adminRouter);
app.use("/search", searchRouter);

//admin review implementation

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
module.exports = app;
