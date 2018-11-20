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
			console.log('переменные объявлены, итерация №' + i);
			console.log(apps[i]["imgURL"]);
			console.log(apps[i]["title"]);
			console.log(apps[i]["lastUpdate"]);
			console.log(apps[i]["guid"]);
			
			let appLinks = appTemplate.content.querySelectorAll('.app__link');
			for (let j=0; j<appLinks.length; j++) {
				console.log(appLinks[j]);
				
				appLinks[j].setAttribute('href', 'app.html?' + apps[i]["guid"]);
			}
			let appDate = appTemplate.content.querySelector('.app__date');
			console.log(appDate);
			
			// appDate.innerHTML = new Date(apps[i]["lastUpdate"]).toLocaleString('ru',
			// 	{
			// 		year: 'numeric',
			// 		month: 'long',
			// 		day: 'numeric'
			// 	});

			let appImg = appTemplate.content.querySelector('.app__img');
			appImg.setAttribute('src', apps[i]["imgURL"]);

			let appName = appTemplate.content.querySelector('.app__name');
			appName.innerHTML = apps[i]["title"];

			appsWrapper.appendChild(appTemplate.content.cloneNode(true));
		}
	}
	getApps()
		.then(renderApps)
		.catch(err => console.error(err));
}
