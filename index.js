
const express = require('express');
const home = require('./routes/home');


const app = express()//get express object

//
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use('', home)




let port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`BearApp has been launched on port ${port}...`)
})