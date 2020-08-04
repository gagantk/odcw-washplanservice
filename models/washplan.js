const mongoose = require('mongoose');

const washPlanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
});

const WashPlan = mongoose.model('WashPlan', washPlanSchema);

module.exports = WashPlan;
