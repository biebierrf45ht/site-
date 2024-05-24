const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Middleware pour parser le corps des requêtes POST
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Bienvenue sur mon site !');
});

app.listen(3000, () => {
  console.log('Serveur en écoute sur le port 3000');
});
