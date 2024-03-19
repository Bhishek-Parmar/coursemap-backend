const Node = require("../models/nodeModel");

// exports.createNode = async (req, res) => {
//   try {
//     const newNode = await Node.create(req.body);
//     res.status(201).json(newNode);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

exports.createNode = async (req, res) => {
  try {
    // title to lowercase
    req.body.title = req.body.title.toLowerCase();

    const newNode = await Node.create(req.body);
    res.status(201).json(newNode);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllNodes = async (req, res) => {
  try {
    const nodes = await Node.find();
    res.json(nodes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getNodeById = async (req, res) => {
  try {
    const node = await Node.findById(req.params.id);
    if (node) {
      res.json(node);
    } else {
      res.status(404).json({ message: "Node not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateNode = async (req, res) => {
  try {
    const updatedNode = await Node.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (updatedNode) {
      res.json(updatedNode);
    } else {
      res.status(404).json({ message: "Node not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteNode = async (req, res) => {
  try {
    const deletedNode = await Node.findByIdAndDelete(req.params.id);
    if (deletedNode) {
      res.json({ message: "Node deleted successfully" });
    } else {
      res.status(404).json({ message: "Node not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// exports.addPrerequisitesById = async (req, res) => {
//   try {
//     const nodeId = req.params.id;
//     const preNodeId = req.params.preNodeId;

//     // Fetch the existing node
//     const node = await Node.findById(nodeId);
//     if (!node) {
//       return res.status(404).json({ message: "Node not found" });
//     }
//     const preNode = await Node.findById(preNodeId);

//     // Add prerequisites to the node
//     node.prerequisites.push(preNode);

//     // Save the updated node
//     await node.save();

//     res.status(200).json({ message: "Prerequisites added successfully", node });
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

exports.addPrerequisitesById = async (req, res) => {
  try {
    const currentNodeId = req.params.id;
    const prerequisiteTitle = req.params.prerequisiteString.toLowerCase();
    req.body.title = req.body.title.toLowerCase();

    // Fetch existing
    const currentNode = await Node.findById(currentNodeId);
    if (!currentNode) {
      return res.status(404).json({ message: "Current node not found" });
    }

    // Check if the prerequisite node already exists in the database
    let prerequisiteNode = await Node.findOne({ title: prerequisiteTitle });
    if (!prerequisiteNode) {
      // If the prerequisite node doesn't exist, create a new one
      prerequisiteNode = await Node.create({ title: prerequisiteTitle });
    }

    // Add the prerequisite node to the current node's prerequisites
    currentNode.prerequisites.push(prerequisiteNode._id);

    // Save the updated current node
    await currentNode.save();

    res
      .status(200)
      .json({ message: "Prerequisite added successfully", currentNode });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
