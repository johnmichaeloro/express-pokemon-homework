const express = require('express');
const app = express();
const port = 3000;
const pokemon = require("./pokemon");
const bodyParser = require('body-parser');
const methodOverride = require('method-override')

app.use(methodOverride('_method'));

app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static('css'));

//Once I declare a static file, I only need to link to the file itself in the html style link. In my html, I have <link rel="stylesheet" href="style.css">. No need to include a file path as the file path has been declared above. Usually, a public file is created in which the static files are stored. So it should be read _css + '/public' in the parameter above. But since I only have a css folder, I haven't included this additional information.

//This requires a function that takes in an export path. In the pokemon.js file, I've added at the bottom a module.exports equals and the varaible name.

app.get('/pokemon', (req, res) => {
  res.render('index.ejs', {
    'pokemon': pokemon
  })
})

app.get('/pokemon/new', (req, res) => {
  res.render('new.ejs')
})

app.post('/pokemon', (req, res) => {
  pokemon.push(req.body);
  res.redirect('/pokemon')
})

app.get('/pokemon/:id', (req, res) => {
  res.render('show.ejs', {
    'pokemon': pokemon[req.params.id],
    'id': req.params.id
  })
})

//I need to build an edit route and a render route

app.get('/pokemon/:id/edit', (req, res) => {
  res.render('edit.ejs', {
    'pokemon': pokemon[req.params.id],
    'id': req.params.id
  })
})

app.delete('/pokemon/:id', (req, res) => {
  res.redirect('/pokemon');
  pokemon.splice(req.params.id, 1)
})

app.put('/pokemon/:id', (req, res) => {
  pokemon[req.params.id] = req.body;
  res.redirect('/pokemon')
})

//End of suspect routes

app.listen(port, () => {
  console.log('app listening on port' + port);
})

//Users should be able to insert a new pokemon into the array using a form on a `new.ejs` page. Creation should be handled via a POST route to the `/pokemon` route.
//Users should be able to edit an individual pokemon on an `edit.ejs` page accessed from the  `/pokemon/:id/edit` route. The updating should be handled via a POST request to the `/pokemon/:id` route.
//Users should be able to delete a pokemon using a button provided on the show and index pages.
//The final app should have what are known as the 7 RESTful routes.
