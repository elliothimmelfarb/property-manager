'use strict';

const express = require('express');
const router = express.Router();

const Tenant = require('../models/tenant');
const Property = require('../models/property');
const mongoose = require('mongoose');

router.route('/')
  .get((req, res) => {
    Tenant.find({}, (err, tenants) => {
      res.status(err ? 400 : 200).send(err || tenants);
    }).populate('property');
  })
  .post((req, res) => {
    Tenant.create(req.body, (err, tenants) => {
      res.status(err ? 400:200).send(err || tenants);
    });
  })
  .delete((req,res) => {
    Tenant.remove({}, (err, confirmation) => {
      res.status(err ? 400:200).send(err || confirmation);
    });
  });

router.route('/:id')
  .get((req, res) => {
    Tenant.findById(req.params.id, (err, tenant) => {
      if(err) res.status(400).send(err);
      if(!tenant) res.status(404).send({error: 'Tenant not found!'});
      res.status(200).send(tenant);
    }).populate('property');
  })
  .put((req, res) => {
    Tenant.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, savedDoc) => {
      if(err) res.status(400).send(err);
      res.status(200).send(savedDoc);
    });
  })
  .delete((req, res) => { // also must move out
    Tenant.findByIdAndRemove(req.params.id, (err, rmvdTenant) => {
      res.status(err ? 400 : 200).send(err || `The ${rmvdTenant.name.last} family was removed from your tenants list.`);
    });
  });

router.put('/:id/moveOut', (req, res) => {
  Tenant.findById(req.params.id, (err, tenant) => {
    if (err) return res.status(400).send(err);
    if (!tenant) return res.status(404).send(`No tenant with that ID found!`);
    if (!tenant.property) return res.status(412).send(`That tenant is homeless and cannot move out!`);
    Property.findById(tenant.property, (err, property) => {
      property.update({$pull: {tenants: req.params.id}}, err => {
        if (err) return res.status(400).send(err);
        tenant.property = null;
        tenant.save(err => {
          if (err) return res.status(400).send(err);
          res.status(200).send(`The ${tenant.name.last} family successfully moved out of ${property.name}!`)
        });
      });
    });
  });
});


module.exports = router;
