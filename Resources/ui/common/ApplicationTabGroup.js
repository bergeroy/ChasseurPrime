function ApplicationTabGroup(Window) {
	//create module instance
	var self = Ti.UI.createTabGroup();
	
	//create app tabs
	var win1 = new Window(false),
		win2 = new Window(true);
	
	var tab1 = Ti.UI.createTab({
		title: L('fugitifs'),
		icon: '/images/fugitives.png',
		window: win1
	});
	win1.containingTab = tab1;
	
	var tab2 = Ti.UI.createTab({
		title: L('captures'),
		icon: '/images/captured.png',
		window: win2
	});
	win2.containingTab = tab2;
	
	self.addTab(tab1);
	self.addTab(tab2);
	
	return self;
};

module.exports = ApplicationTabGroup;
