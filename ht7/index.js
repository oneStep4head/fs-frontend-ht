window.onload = function() {
	var apps; 
	// = [
	// 				{
	// 					'imgURL':'assets/images/shot-1.jpg',
	// 					'title':'СТАНДАРТНЫЙ ПАКЕТ',
	// 					'timestamp':'08 апреля 2012'
	// 				},
	// 				{
	// 					'imgURL':'assets/images/shot-2.jpg',
	// 					'title':'НОВЫЙ ЦФТ-БАНК',
	// 					'timestamp':'09 сентября 2016'
	// 				},
	// 				{
	// 					'imgURL':'assets/images/shot-3.jpg',
	// 					'title':'КАТАЛОГ РАЗРАБОТОК',
	// 					'timestamp':'03 марта 2015'
	// 				}
	// 			];
	
	function getApps() {
		return apps;
	}
	
	function rndInt(min, max) {
		var rand = min + Math.random() * (max + 1 - min);
    	rand = Math.floor(rand);
    	return rand;
	}

	function renderApps() {
		var apps = getApps();
		var appsWrapper = document.querySelector('.o-main__pockets');

		for(let i = 0; i < apps.length; i++) {
			let rndApp = rndInt(0, apps.length-1);
			
			let appWrapper = document.createElement('DIV');
			appWrapper.className = 'o-main__pocket l-grid-4';

			let appImg = document.createElement('A');
			appImg.className = 'o-main__pocket-img';
			appImg.style.backgroundImage = `url(${apps[rndApp]['imgURL']})`;

			let appTitle = document.createElement('H4');
			appTitle.className = 'o-main__pocket-title';
			appTitle.innerHTML = apps[rndApp]['title'];

			let appDate = document.createElement('TIME');
			appDate.className = 'o-main__pocket-date';
			appDate.innerHTML = apps[rndApp]['timestamp'];

			appWrapper.appendChild(appImg);
			appWrapper.appendChild(appTitle);
			appWrapper.appendChild(appDate);

			appsWrapper.appendChild(appWrapper);
		}
	}

	renderApps();
}