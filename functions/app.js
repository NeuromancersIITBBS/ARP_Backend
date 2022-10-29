const express = require("express");
const app = express();
const cors = require("cors");
const middleware = require("./utils/middleware.js");
const studyResRouter = require("./controllers/studyResources.js");
const adminRouter = require("./controllers/adminController.js");
const searchRouter = require("./controllers/searchController.js");

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/studyResources/branches", studyResRouter);
app.use("/admin", adminRouter);
app.use("/search", searchRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
module.exports = app;
