// Fonction pour ajouter un produit au panier
function ajouterAuPanier(idProduit, nomProduit, prixProduit) {
    let panier = JSON.parse(localStorage.getItem('panier')) || [];
    let produitExistant = panier.find(produit => produit.id === idProduit);

    if (produitExistant) {
        produitExistant.quantite += 1;
    } else {
        panier.push({
            id: idProduit,
            nom: nomProduit,
            prix: prixProduit,
            quantite: 1
        });
    }

    localStorage.setItem('panier', JSON.stringify(panier));
    alert("Produit ajouté au panier !");
    afficherPanier(); // Actualise l'affichage du panier
}

// Fonction pour afficher les détails du panier
function afficherPanier() {
    let panier = JSON.parse(localStorage.getItem('panier')) || [];
    let panierDetails = document.getElementById('panier-details');
    let totalCommande = 0;

    panierDetails.innerHTML = ''; // Vide le contenu précédent du panier

    panier.forEach(produit => {
        panierDetails.innerHTML += `
            <div class="product">
                <div class="product-details">
                    <div class="product-name">${produit.nom}</div>
                    <div class="product-price">Prix: ${produit.prix}€</div>
                    <div class="product-quantity">Quantité: ${produit.quantite}</div>
                </div>
                <button onclick="supprimerDuPanier('${produit.id}')">Supprimer</button>
            </div>
        `;
        totalCommande += produit.prix * produit.quantite;
    });

    document.getElementById('total-commande').innerHTML = `Total de la commande: ${totalCommande}€`;
}

// Fonction pour supprimer un produit du panier
function supprimerDuPanier(idProduit) {
    let panier = JSON.parse(localStorage.getItem('panier')) || [];
    let nouveauPanier = panier.filter(produit => produit.id !== idProduit);
    localStorage.setItem('panier', JSON.stringify(nouveauPanier));
    afficherPanier(); // Actualise l'affichage du panier après la suppression
}

// Fonction pour finaliser la commande
function finaliserCommande() {
    let panier = JSON.parse(localStorage.getItem('panier')) || [];
    let detailsCommande = JSON.stringify(panier);
    alert(`La commande a été envoyée avec succès !`);
    localStorage.removeItem('panier');
    afficherPanier(); // Actualise l'affichage du panier
}
