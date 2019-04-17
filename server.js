const express = require('express');
const app = express();
const port = 3000;
const pokemon = require("./pokemon");
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static('css'));

//Once I declare a static file, I only need to link to the file itself in the html style link. In my html, I have <link rel="stylesheet" href="style.css">. No need to include a file path as the file path has been declared above. Usually, a public file is created in which the static files are stored. So it should be read _css + '/public' in the parameter above. But since I only have a css folder, I haven't included this additional information.

//This requires a function that takes in an export path. In the pokemon.js file, I've added at the bottom a module.exports equals and the varaible name.

app.get('/pokemon', (req, res) => {
  res.render('index.ejs', {
    'pokemon': pokemon
  })
})

app.get('/pokemon/:id', (req, res) => {
  res.render('show.ejs', {
    'pokemon': pokemon[req.params.id]
  })
})

app.listen(port, () => {
  console.log('app listening on port' + port);
})
