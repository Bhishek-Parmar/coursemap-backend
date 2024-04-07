const express = require("express");
const connectToDb = require("./connectToDb");
const nodeController = require("./controllers/nodeController");
const requestController = require('./controllers/requestController');
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());


connectToDb();

app.get("/", (req, res) => res.send("Express on Vercel"));

app.post("/nodes", nodeController.createNode);
app.get("/nodes", nodeController.getAllNodes);
app.get("/nodes/:id", nodeController.getNodeById);
app.put("/nodes/:id", nodeController.updateNode);
app.delete("/nodes/:id", nodeController.deleteNode);
app.put("/nodes/:id/:prerequisiteString", nodeController.addPrerequisitesById);

//added later ash-------------


app.post(
  "/nodes/addPrerequisite/:nodeId/:prerequisiteId",
  nodeController.addPrerequisite
);
app.get(
  "/nodes/get-node-with-prerequisite/:nodeId",
  nodeController.getNodeWithPrerequisites
);

app.get("/nodes/resourses/:nodeId", nodeController.getResourseByID);
app.post("/nodes/addResourses/:nodeId", nodeController.addResourses);

//request routessss
app.post('/requests', requestController.createRequest);
app.get('/requests', requestController.getAllRequests);
app.get('/requests/:id', requestController.getRequestById);
app.put('/requests/:id', requestController.updateRequestById);
app.delete('/requests/:id', requestController.deleteRequestById);

app.get('/requests-pending', requestController.getPendingRequests);
app.get('/requests-accepted', requestController.getAcceptedRequests);
app.get('/requests-rejected', requestController.getRejectedRequests);
app.put('/requests-accept/:id', requestController.acceptRequest);
app.put('/requests-reject/:id', requestController.rejectRequest);


app.listen(5000, () => console.log("Server ready on port 5000."));

module.exports = app;
