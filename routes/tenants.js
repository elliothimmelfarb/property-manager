'use strict';

const express = require('express');
const router = express.Router();

const Tenant = require('../models/tenant')

router.route('/')
  .get((req, res) => {
    Tenant.find({}, (err, tenants) => {
      res.status(err ? 400 : 200).send(err || tenants);
    })
  })
  .post((req, res) => {
    Tenant.create(req.body, (err, tenants) => {
      res.status(err ? 400:200).send(err || tenants);
    })
  })
  .delete((req,res) => {
    Tenant.remove({}, (err, confirmation) => {
      res.status(err ? 400:200).send(err || confirmation);
    })
  });

router.route('/:id')
  .get((req, res) => {
    Tenant.findById(req.params.id, (err, tenant) => {
      if(err) res.status(400).send(err);
      if(!tenant) res.status(404).send({error: 'Tenant not found!'});
      res.status(200).send(tenant);
    })
  })
  .put((req, res) => {
    Tenant.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, savedDoc) => {
      if(err) res.status(400).send(err);
      res.status(200).send(savedDoc);
    })
  })
  .delete((req, res) => {
    Tenant.findByIdAndRemove(req.params.id, (err, rmvdTenant) => {
      res.status(err ? 400 : 200).send(err || `The ${rmvdTenant.name.last} family was removed from your tenants list.`);
    })
  });


module.exports = router;
