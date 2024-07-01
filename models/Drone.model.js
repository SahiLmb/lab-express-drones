// Iteration #1
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
// Define the Drone schema
const DroneSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    propellers: {
      type: Number,
      required: true
    },
    maxSpeed: {
      type: Number,
      required: true
    }
  });


module.exports = mongoose.model('Drone', DroneSchema);