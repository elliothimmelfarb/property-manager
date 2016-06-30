'use strict';

const express = require('express');
const router = express.Router();

const Property = require('../models/property');
const Tenant = require('../models/tenant')

router.route('/')
  .get((req, res) => {
    Property.find({}, (err, properties) => {
      res.status(err ? 400 : 200).send(err || properties);
    }).populate('tenants')
  })
  .post((req, res) => {
    Property.create(req.body, (err, property) => {
      res.status(err ? 400:200).send(err || property);
    })
  })
  .delete((req,res) => {
    Property.remove({}, (err, confirmation) => {
      res.status(err ? 400:200).send(err || confirmation);
    })
  });

router.route('/:id')
  .get((req, res) => {
    Property.findById(req.params.id, (err, property) => {
      if(err) res.status(400).send(err);
      if(!property) res.status(404).send({error: 'Property not found!'});
      res.status(200).send(property);
    })
  })
  .put((req, res) => {
    Property.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, savedDoc) => {
      if(err) res.status(400).send(err);
      res.status(200).send(savedDoc);
    })
  })
  .delete((req, res) => {
    Property.findByIdAndRemove(req.params.id, (err, rmvdProperty) => {
      res.status(err ? 400 : 200).send(err || `${rmvdProperty.name} was removed from your properties list.`);
    })
  })

router.put('/:propertyId/moveIn/:tenantId', (req, res) => {
  Property.findById(req.params.propertyId, (err, property) => {
    if (err) return res.status(400).send(err);
    if (!property) return res.status(404).send(`No propery with that ID found!`);
    if (property.tenants.length >= property.units) return res.status(412).send(`Move-in failed due to no more units in property!`);

    Tenant.findById(req.params.tenantId, (err, tenant) => {
      if (err) return res.status(400).send(err);
      if (!tenant) return res.status(404).send(`No tenant with that ID found!`);
      if (tenant.property) return res.status(412).send(`That tenant already lives in a property`);
      tenant.property = req.params.propertyId;
      property.tenants.push(req.params.tenantId);
      property.save(err => {
        if (err) return res.status(400).send(`Move-In failed!`);
        tenant.save(err => {
          if (err) return res.status(400).send(`Move-In failed!`);
          res.status(200).send(`The ${tenant.name.last} family successfully moved into ${property.name}!`)
        });
      });
    });
  });
});

router.put('/:propertyId/moveOut/:tenantId', (req, res) => {
  Property.findById(req.params.propertyId, (err, property) => {
    if (err) return res.status(400).send(err);
    if (!property) return res.status(404).send(`No propery with that ID found!`);
    if(property.tenants.indexOf(req.params.id) < 0) return res.status(412).send(`${propery.name} has no tenant by that ID`);

    Tenant.findById(req.params.tenantId, (err, tenant) => {
      if (err) return res.status(400).send(err);
      if (!tenant) return res.status(404).send(`No tenant with that ID found!`);
      // if (tenant.property) return res.status(412).send(`That tenant already lives in a property`);
      tenant.property = '';
      property.tenants.filter;
      property.save(err => {
        if (err) return res.status(400).send(`Move-In failed!`);
        tenant.save(err => {
          if (err) return res.status(400).send(`Move-In failed!`);
          res.status(200).send(`The ${tenant.name.last} family successfully moved into ${property.name}!`)
        })
      })
    });
  });
});

router.put('/vacate/:id', (req, res) => {
  Property.findById(req.params.id, (err, property) => {
    if (err) return res.status(400).send(err);
    if (!property) return res.status(404).send(`No propery with that ID found!`);

    Tenant.update({property: req.params.id}, {property: ''}, {multi: true}, err => {
      if (err) return res.status(400).send(err);
      property.tenants = [];
      property.save(err => {
        if (err) return res.status(400).send(err);
        res.status(200).send(`${property.name} has been fully vacated!`)
      })
    });
  });
});


module.exports = router;
