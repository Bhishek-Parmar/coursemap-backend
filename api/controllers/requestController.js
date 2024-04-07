const Request = require('../models/requestModel');

exports.createRequest = async (req, res) => {
  try {
    const { title, body } = req.body;
    const newRequest = new Request({
      title,
      body
    });
    const savedRequest = await newRequest.save();
    res.status(201).json(savedRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find();
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRequestById = async (req, res) => {
  try {
    const requestId = req.params.id;
    const request = await Request.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateRequestById = async (req, res) => {
  try {
    const requestId = req.params.id;
    const { title, body } = req.body;
    const updatedRequest = await Request.findByIdAndUpdate(
      requestId,
      { title, body },
      { new: true }
    );
    if (!updatedRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }
    res.status(200).json(updatedRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteRequestById = async (req, res) => {
  try {
    const requestId = req.params.id;
    const deletedRequest = await Request.findByIdAndDelete(requestId);
    if (!deletedRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }
    res.status(200).json({ message: 'Request deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.getPendingRequests = async (req, res) => {
    try {
      const pendingRequests = await Request.find({ status: 'pending' });
      res.status(200).json(pendingRequests);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  
  exports.getAcceptedRequests = async (req, res) => {
    try {
      const acceptedRequests = await Request.find({ status: 'accepted' });
      res.status(200).json(acceptedRequests);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  
  exports.getRejectedRequests = async (req, res) => {
    try {
      const rejectedRequests = await Request.find({ status: 'rejected' });
      res.status(200).json(rejectedRequests);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  
  exports.acceptRequest = async (req, res) => {
    try {
      const requestId = req.params.id;
      const updatedRequest = await Request.findByIdAndUpdate(
        requestId,
        { status: 'accepted' },
        { new: true }
      );
      if (!updatedRequest) {
        return res.status(404).json({ message: 'Request not found' });
      }
      res.status(200).json(updatedRequest);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };