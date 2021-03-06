'use strict';

const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [ true, `You didn't name your property?` ]
  },
  description: {
    type: String,
    default: 'No description added.'
  },
  rent: {
    type: Number,
    min: 400,
    max: 100000,
    required: true
  },
  photo: {
    type: String,
    match: /^http:\/\/.+\.\w+/i,
    trim: true,
    message: `That is not a picture!`,
    default: 'http://www.kalahandi.info/wp-content/uploads/2016/05/sorry-image-not-available.png'
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
