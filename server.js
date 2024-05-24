// Import des modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

// Initialisation de l'application Express
const app = express();

// Middleware pour parser le corps des requêtes POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Définition des routes
app.get('/', (req, res) => {
  res.send('Bienvenue sur mon site !');
});

// Route pour l'inscription d'un utilisateur
app.post('/register', (req, res) => {
  // Code pour gérer l'inscription de l'utilisateur
});

// Route pour la connexion d'un utilisateur
app.post('/login', (req, res) => {
  // Code pour gérer la connexion de l'utilisateur
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});
// Route pour l'inscription d'un utilisateur
app.post('/register', (req, res) => {
  // Récupérer les données envoyées depuis le formulaire d'inscription
  const { username, email, password } = req.body;

  // Charger les données des utilisateurs depuis le fichier JSON
  let users = [];
  try {
    const usersData = fs.readFileSync('./users.json', 'utf8');
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
    fs.writeFileSync('./users.json', JSON.stringify(users));
    res.send('Inscription réussie !');
  } catch (error) {
    console.error('Erreur lors de l\'écriture dans le fichier users.json :', error);
    res.status(500).send('Erreur du serveur');
  }
});
// Route pour la connexion d'un utilisateur
app.post('/login', (req, res) => {
  // Récupérer les données envoyées depuis le formulaire de connexion
  const { email, password } = req.body;

  // Charger les données des utilisateurs depuis le fichier JSON
  let users = [];
  try {
    const usersData = fs.readFileSync('./users.json', 'utf8');
    users = JSON.parse(usersData);
  } catch (error) {
    console.error('Erreur lors de la lecture du fichier users.json :', error);
    res.status(500).send('Erreur du serveur');
    return;
  }

  // Vérifier si l'utilisateur existe et si le mot de passe est correct
  const user = users.find(user => user.email === email && user.password === password);
  if (!user) {
    res.status(400).send('Identifiants incorrects');
    return;
  }

  // Gérer la connexion de l'utilisateur ici
  res.send('Connexion réussie !');
});
