function ApplicationWindow(/*Boolean*/ _captured) {
	var self = Ti.UI.createWindow({
		title: (_captured) ? L('captures') : L('fugitifs'),
		
		backgroundColor:'transparent',
		
		backgroundImage:'images/grain.png',
		
		barColor: '#6d0a0c'
	});
	
/* Retiré pour les besoins du LAB 2

	var button = Ti.UI.createButton({
		height:44,
		width:200,
		title:L('openWindow'),
		top:20
	});
	self.add(button);
	
	button.addEventListener('click', function() {
		//containingTab attribute must be set by parent tab group on
		//the window for this work
		self.containingTab.open(Ti.UI.createWindow({
			title: L('newWindow'),
			backgroundColor: 'white'
		}));
	});
*/
	
	return self;
};

module.exports = ApplicationWindow;
