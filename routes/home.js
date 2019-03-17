const express = require('express')
const router = express.Router()

router.get('/', function(req, res) {
  res.send('use the above url /api/bear to find out about various bears')
})