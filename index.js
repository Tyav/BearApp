
const express = require('express');
const home = require('./routes/home');
const bears = require('./routes/bears')


const app = express()//get express object

//
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use('', home);
app.use('/', bears)




let port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`BearApp has been launched on port ${port}...`)
})