# rgpd-guide-gastronomique
Projet réalisé avec les contraintes de la loi RGPD

Importer les données restaurant avec la commande suivante (à la racine du projet) :
<pre>
mongoimport --db rgpd-guide-gastronomique --collection restaurants --drop --file ./primer-dataset.json
</pre>
