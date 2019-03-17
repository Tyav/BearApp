
const express = require('express');
const debug = require('debug')('app:startup')



const app = express()//get express object





let port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`BearApp has been launched on port ${port}...`)
})