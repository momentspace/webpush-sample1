const express = require('express')
const app = express()

app.use(express.static('docs'))

app.get('/', (req, res) => {
})

var server = app.listen(4000, function(){
  console.log("frontend:" + server.address().port);
});



