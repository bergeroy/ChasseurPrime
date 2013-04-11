/*
	Selon la même façon utilisée dans ui/comman/ApplicationTabGroup,
	création d'un constructeur pour la vue tabulée des primes de recherche.
	Ce module doit retourner une fonction pouvant être instanciée (avec "new").
    La fonction reçoit un paramètre déterminant si la vue présente une liste
    des fugitifs capturés ou non.
*/

var PrimeTableView = function(/*Boolean*/ _capture) {
	var tv = Ti.UI.createTableView({
		backgroundColor: 'transparent'
	});
		
	function populateData() {
		//Données fictives pour le moment...
        /*
		var results = [
			{title:'Jeff Haynie', color:'#fff', hasChild:true, captured:_captured},
			{title:'Nolan Wright', color:'#fff', hasChild:true, captured:_captured},
			{title:'Marshall Culpepper', color:'#fff', hasChild:true, captured:_captured},
			{title:'Don Thorp', color:'#fff', hasChild:true, captured:_captured},
			{title:'Blain Hamon', color:'#fff', hasChild:true, captured:_captured}
		];
        */

		var db = require('lib/db');
		var results = db.lister(_capture);
		
		tv.setData(results);
	}

	Ti.App.addEventListener('databaseUpdated', populateData);
	
	//Exécution de la requête initiale
	populateData();
	
	return tv;
};

module.exports = PrimeTableView;
