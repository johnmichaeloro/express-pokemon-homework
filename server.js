const express = require('express');
const app = express();
const port = 3000;
const pokemon = require("./pokemon");
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));

//This requires a function that takes in an export path. In the pokemon.js file, I've added at the bottom a module.exports equals and the varaible name.

app.get('/pokemon', (req, res) => {
  res.send(pokemon)
})

app.listen(port, () => {
  console.log('app listening on port' + port);
})
