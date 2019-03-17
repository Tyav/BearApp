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
  //   .sort({name: 1})
  
  res.send(bears)
})









module.exports = router