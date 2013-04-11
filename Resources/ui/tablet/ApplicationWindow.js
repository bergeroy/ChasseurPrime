function ApplicationWindow(/*Boolean*/ _captured) {
	
	var self = Ti.UI.createWindow({
		title: (_captured) ? L('captures') : L('fugitifs'),
		
		backgroundColor:'transparent',
		
		backgroundImage:'images/grain.png',
		
		barColor: '#6d0a0c'
	});
	
	/*
     * La liste des fugitifs (capturés ou en fuite)
     * est ajouté dans la fenêtre de l'onglet.
     * 
	 * Le clic sur un des éléments de la liste
	 * provoquera l'affichage de la fenêtre de détail
	 */
	var PrimeTable = require('ui/common/PrimeTable');
	var primeTable = new PrimeTable(_captured);

	primeTable.addEventListener('click', function(_e) {
		var DetailWindow = require('ui/common/DetailWindow');
		self.containingTab.open(new DetailWindow(_e.rowData, self.containingTab));
	});
	
	self.add(primeTable);

	/*
	 * On doit ajouter un élément de menu pour
	 * l'affichage de la fenêtre d'ajout d'un nouveau fugitif.
	 * Selon la plateforme (iOS ou Android), le positionnement
	 * de ce menu sera différent.
	 */
	var AddWindow = require('ui/common/AddWindow');

	if (Ti.Platform.osname === 'iphone') {
		var b = Titanium.UI.createButton({
			title:L('ajouter'),
			style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
		});
		b.addEventListener('click',function() {
			//open modal on iOS - looks more appropriate
			self.containingTab.open(new AddWindow);
		});
		self.setRightNavButton(b);
		
	} else {
	    self.activity.onCreateOptionsMenu = function(e) {
	        var menuItem = e.menu.add({
	            title : L('ajouter'),
	            showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
	            icon : "add_icon.png"
	        });
	        menuItem.addEventListener('click', function(e) {
				//open in tab group to get free title bar (android)
				self.containingTab.open(new AddWindow);
	        });
	    }
	}

	return self;
};

module.exports = ApplicationWindow;
