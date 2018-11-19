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
		return new Promise(function(resolve, reject){
			let xhr = new XMLHttpRequest();
			xhr.open('GET', '/api/app_packeges.json', true);
			xhr.responseType = 'json';
			xhr.send();
			
			xhr.onload = function(e) {
				if(xhr.status != 200) {
					reject(() => {
						console.log(new Error('Upss.. Something went wrong. Error text:\n' + xhr.statusText));
					});
				} else {
					resolve(xhr.response);
				}
			}
		});
	}
	
	function rndInt(min, max) {
		var rand = min + Math.random() * (max + 1 - min);
    	rand = Math.floor(rand);
    	return rand;
	}

	function renderApps(apps) {
		console.log('Starts to render apps...');
		console.log(apps);
		
		var appsWrapper = document.querySelector('.apps-slider__row');
		var appTemplate = document.querySelector('.app-template');

		for(let i=0; i<apps.length; i++){
			appsWrapper.appendChild(appTemplate.content.cloneNode(true));
			let appLinks, appDate, appImg, appName;
			console.log('переменные объявлены, итерация №' + i);
			
			
			appLinks = document.querySelectorAll('.app:last-child > .app__link');
			for (let j=0; j<appLinks.length; j++) {
				appLinks[j].setAttribute('href', 'app.html?' + apps[i]["guid"]);
			}
			appDate = document.querySelector('.app:last-child > .app__date');
			appDate.innerHTML = new Date(apps[i]["lastUpdate"]).toLocaleString('ru',
				{
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				});

			appImg = document.querySelector('.app:last-child > .app__link > .app__img');
			appImg.setAttribute('src', apps[i]["imgURL"]);

			appName = document.querySelector('.app:last-child > .app__link > .app__name');
			appName.innerHTML = apps[i]["title"];
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
	getApps()
		.then(renderApps);
}
