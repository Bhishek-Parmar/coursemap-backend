const express = require("express");
const connectToDb = require("./connectToDb");
const nodeController = require("./controllers/nodeController");
const app = express();
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

app.listen(5000, () => console.log("Server ready on port 5000."));

module.exports = app;
