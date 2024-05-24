const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs'); // Module pour la manipulation des fichiers

// Middleware pour parser le corps des requêtes POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Bienvenue sur mon site !');
});

// Route pour l'inscription d'un utilisateur
app.post('/register', (req, res) => {
  // Récupérer les données envoyées depuis le formulaire d'inscription
  const { username, email, password } = req.body;

  // Charger les données des utilisateurs depuis le fichier JSON
  let users = [];
  try {
    const usersData = fs.readFileSync('./users.json', 'utf8'); // Utilisation du chemin relatif
    users = JSON.parse(usersData);
  } catch (error) {
    console.error('Erreur lors de la lecture du fichier users.json :', error);
    res.status(500).send('Erreur du serveur');
    return;
  }

  // Vérifier si l'email est déjà utilisé
  if (users.some(user => user.email === email)) {
    res.status(400).send('Cet email est déjà utilisé');
    return;
  }

  // Ajouter le nouvel utilisateur aux données
  users.push({ username, email, password });

  // Sauvegarder les données mises à jour dans le fichier JSON
  try {
    fs.writeFileSync('./users.json', JSON.stringify(users)); // Utilisation du chemin relatif
    res.send('Inscription réussie !');
  } catch (error) {
    console.error('Erreur lors de l\'écriture dans le fichier users.json :', error);
    res.status(500).send('Erreur du serveur');
  }
});

app.listen(3000, () => {
  console.log('Serveur en écoute sur le port 3000');
});
