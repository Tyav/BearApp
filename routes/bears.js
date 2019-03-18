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

//Getting bears by Bearname
router.get('/api/bears/name/:bear_name', async (req, res) => {
  const bear = await Bear
    .find({name: req.params.bear_name})
  if(!bear.length) return res.status(404).send(`There is no Bear with the name: ${req.params.bear_name}`)
  res.json(bear)
})

//Getting bears by colour
router.get('/api/bears/colour/:bear_colour', async (req, res) => {
  const colours = req.params.bear_colour.split('&')
  const bear = await Bear
    .find({colour: {$in : colours}})
  if(!bear.length) return res.status(404).send(`There is no Bear with the name: ${req.params.bear_colour}`)
  res.json(bear)
})





module.exports = router