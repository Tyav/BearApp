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
  .select('name colour location documenter')
  
  res.json(bears)
})

//GetByID verb for bears
router.get('/api/bear/:id', async (req, res) => {
  const bear = await Bear
    .find({id: req.params.id})
  if(!bear.length) return res.status(404).send(`There is no Bear with the ID: ${req.params.id}`)
  res.json(bear)
})

router.get('/api/bears/name/:name', async (req, res) => {
  const bear = await Bear
    .find({name: req.params.name})
  if(!bear.length) return res.status(404).send(`There is no Bear with the name: ${req.params.name}`)
  res.json(bear)
})







module.exports = router