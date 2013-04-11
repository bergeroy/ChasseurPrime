Ti.Geolocation.purpose = 'Localisation d\'un criminel';

var DetailWindow = function(/*Object*/ _prime, /*Référence vers un onglet*/ containingTab) {
	
	var win = Ti.UI.createWindow({
		title:_prime.title,
		barColor: '#6d0a0c',
		backgroundColor: 'transparent',
		backgroundImage: 'images/grain.png',
		layout:'vertical'
	});

	win.add(Ti.UI.createLabel({
		text:(_prime.capture) ? L('attrape') : L('en_fuite'),
		top:10,
		textAlign:'center',
		font: {
			fontWeight:'bold',
			fontSize:18
		},
		color: '#fff',
		height:Ti.UI.SIZE
	}));
	
	if (!_prime.capture) {
		var captureButton = Ti.UI.createButton({
			title:L('capturer'),
			top:10,
			height:Ti.UI.SIZE,
			width:240
		});

		captureButton.addEventListener('click', function() {
			var db = require('lib/db');
			db.capturer(_prime.id);
			win.close();
		});

		win.add(captureButton);
	}
	
	var deleteButton = Ti.UI.createButton({
		title:L('supprimer'),
		top:10,
		height:Ti.UI.SIZE,
		width:240
	});
	
	deleteButton.addEventListener('click', function() {
		var db = require('lib/db');
		db.supprimer(_prime.id);
		win.close();
	});

	win.add(deleteButton);
	
	return win;
};

module.exports = DetailWindow;
