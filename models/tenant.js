'use strict';

const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
  name: {
    last: {
      type: String,
      required: [true, `Your tenant needs a last name, at least!`]
    },
    first: {
      type: String,
      default: 'NA'
    }
  },
  familySize: {
    type: Number,
    default: 1,
    min: 1,
    max: [7, `That family is too big to live in this apartment!`]
  },
  phoneNumber: {
    type: String,
    default: 'NA'
  },
  email: {
    type: String,
    match: /^\w+@\w+\.\w+$/,
    message: `That is not a valid email address!`
  },
  property: {type: mongoose.Schema.Types.ObjectId, ref: 'Property', default: null}
})

const Tenant = mongoose.model('Tenant' ,tenantSchema)

module.exports = Tenant;
