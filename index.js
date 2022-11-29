const express = require('express')
const path=require('path');
require("./database/connect")
const {routeInit}=require('./routers/routeInit');

const app = express()
const port = 3000

app.use(express.json());
routeInit(app);
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
app.use(express.static(path.join(__dirname,'public',)));