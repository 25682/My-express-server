// Import mongoose to define a schema
const mongoose = require('mongoose');

// Define the item schema
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
});

// Export the item model
module.exports = mongoose.model('Item', itemSchema);
