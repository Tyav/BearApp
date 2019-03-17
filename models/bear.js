const mongoose = require('mongoose');

const BearSchema = new mongoose.Schema({
  name: {type: String, required: true},
  colour: {type: String, default: ['White', 'Brown']},
  location: { type:[ String ], required: true },
  documenter: String,
  date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Bear', BearSchema)
