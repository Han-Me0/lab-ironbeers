const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/beers', async (req, res) => {
  const beersFromApi = await punkAPI.getBeers();
  const first25 = beersFromApi.slice(0,25);
  console.log(beersFromApi.slice(0,25));
  res.render('beers', {first25});
});
app.get('/random-beers', async (req, res) => {
  const randomBeer = await punkAPI.getRandom();
  console.log('here random', randomBeer);
  res.render('random-beers', {randomBeer});
});

app.listen(3001, () => console.log('🏃‍ on port 3001'));

