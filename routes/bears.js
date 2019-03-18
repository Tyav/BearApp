const express = require('express');
const router = express.Router();
const Bear = require('../models/bear');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/bear', {useNewUrlParser: true})
  .then(()=>console.log('Conneting to mongoDB'))
  .catch((err)=> console.log(err.message))
//get verb for Bear
router.get('/api/bears', async (req, res) => {

  const bears = await Bear
  .find()
  .select('name colour location')
  
  res.send(bears)
})

//GetByID verb for bears
router.get('/api/bears/:id', async(req, res) => {
  const bears = await Bear
    .find({id: req.params.id})
  if(!bears.length) return res.status(404).send(`There is no Bear with the ID: ${req.params.id}`)
  res.send(bears[0])
})









module.exports = router