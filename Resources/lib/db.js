// Création de la base de données au besoin
var db = Ti.Database.open('ChasseurPrime');
db.execute('CREATE TABLE IF NOT EXISTS fugitifs(id INTEGER PRIMARY KEY, nom TEXT, capture INTEGER);');
db.close();

// Utilisée pour l'alimentation de la liste affichée dans les onglets
exports.lister = function(_capture) {
	var fugitiveList = [];
	var db = Ti.Database.open('ChasseurPrime');
	var result = db.execute('SELECT * FROM fugitifs WHERE capture = ? ORDER BY nom ASC', (_capture) ? 1 : 0);
	while (result.isValidRow()) {
		fugitiveList.push({
			//Ajout de ces attributs pour le bénéfice de la liste
			title: result.fieldByName('nom'),
			id: result.fieldByName('id'),
			hasChild:true,
			color: '#fff',
			nom: result.fieldByName('nom'),
			capture: (Number(result.fieldByName('capture')) === 1)
		});
		result.next();
	}
	result.close(); //on s'assure de fermer l'ensemble de résultats
	db.close();

	return fugitiveList;
};

// Pour l'ajout d'un nouveau fugitif (en fuite)
exports.ajouter = function(_nom) {
	var db = Ti.Database.open('ChasseurPrime');
	db.execute("INSERT INTO fugitifs(nom,capture) VALUES(?,?)",_nom,0);
	db.close();

	//Dispatch a message to let others know the database has been updated
	Ti.App.fireEvent("databaseUpdated");
};

// Pour la suppression d'un fugitif
exports.supprimer = function(_id) {
	var db = Ti.Database.open('ChasseurPrime');
	db.execute("DELETE FROM fugitifs WHERE id = ?",_id);
	db.close();

	//Dispatch a message to let others know the database has been updated
	Ti.App.fireEvent("databaseUpdated");
};

// Pour la capture d'un fugitif
exports.capturer = function(_id) {
	var db = Ti.Database.open('ChasseurPrime');
	db.execute("UPDATE fugitifs SET capture = 1 WHERE id = ?",_id);
	db.close();

	//Dispatch a message to let others know the database has been updated
	Ti.App.fireEvent("databaseUpdated");
};

