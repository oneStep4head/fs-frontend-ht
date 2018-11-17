window.onload = function() {
	// var apps; 
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
		let xhr = new XMLHttpRequest();
		let apps;
		xhr.open('GET', '/api/app_packeges.json', true);
		xhr.send();
		
		xhr.onload = function(e) {
			if(xhr.status != 200) {
				console.log('Upss.. Something went wrong while loading data from server :<');
				console.log('Status Txt: ' + xhr.statusText);
				return xhr.status;
			}
			apps = JSON.parse(xhr.responseText);
			console.log('getted apps:\n');
			console.log(apps);
			
		}
		return apps;
	}
	
	function rndInt(min, max) {
		var rand = min + Math.random() * (max + 1 - min);
    	rand = Math.floor(rand);
    	return rand;
	}

	function renderApps() {
		let apps = getApps();
		
		var appsWrapper = document.querySelector('.apps-slider__row');
		var appTemplate = document.querySelector('.app-template');

		appsWrapper.appendChild(appTemplate.content.cloneNode(true));
		
		let appLink = document.querySelectorAll('.app:last-child > .app__link');
		for (let j=0; j<appLink.length; j++) {
			let tmpHref = 'app.html?' + apps[0]["guid"];
			appLink[j].setAttribute('href', tmpHref);
		}
		

		// for(let i = 0; i < apps.length; i++) {
		// 	let rndApp = rndInt(0, apps.length-1);
			
		// 	let appWrapper = document.createElement('DIV');
		// 	appWrapper.className = 'o-main__pocket l-grid-4';

		// 	let appImg = document.createElement('A');
		// 	appImg.className = 'o-main__pocket-img';
		// 	appImg.style.backgroundImage = `url(${apps[rndApp]['imgURL']})`;

		// 	let appTitle = document.createElement('H4');
		// 	appTitle.className = 'o-main__pocket-title';
		// 	appTitle.innerHTML = apps[rndApp]['title'];

		// 	let appDate = document.createElement('TIME');
		// 	appDate.className = 'o-main__pocket-date';
		// 	appDate.innerHTML = apps[rndApp]['timestamp'];

		// 	appWrapper.appendChild(appImg);
		// 	appWrapper.appendChild(appTitle);
		// 	appWrapper.appendChild(appDate);

		// 	appsWrapper.appendChild(appWrapper);
	}
	renderApps();
}
