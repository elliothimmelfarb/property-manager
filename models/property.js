'use strict';

const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [ true, `You didn't name your property?` ]
  },
  photo: {
    type: String,
    match: /^http:\/\/www\..+\.\w+/i,
    trim: true,
    message: `That is not a picture!`
  },
  units: {
    type: Number,
    required: [true, `What is the maxium occupancy?`],
    default: 4
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  tenants: [ {type: mongoose.Schema.Types.ObjectId, ref: 'Tenant'} ]
});

let Property = mongoose.model('Property', propertySchema);

module.exports = Property;
