const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
