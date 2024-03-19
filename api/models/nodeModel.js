const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define Node schema
const nodeSchema = new Schema({
  title: { type: String, required: true },
  resources: [{ type: String }], // Array of strings representing resources
  prerequisites: [{ type: Schema.Types.ObjectId, ref: "Node" }], // Array of references to other nodes
});

// Compile the schema into a model
const Node = mongoose.model("Node", nodeSchema);

module.exports = Node;
