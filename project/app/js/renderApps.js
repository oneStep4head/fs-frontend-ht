export { getApps, renderApps };

function getApps() {
	return new Promise(function (resolve, reject) {
		let xhr = new XMLHttpRequest();
		xhr.open('GET', '/api/app_packeges.json', true);
		xhr.responseType = 'json';
		xhr.send();

		xhr.onload = function (e) {
			if (xhr.status != 200) {
				// TODO в reject передал функцию, в которой логировал создание новой ошибки. Зачем?)
				reject(Error('Upss.. Something went wrong. Error text:\n' + xhr.statusText));
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

	for (let i = 0; i < apps.length; i++) {
		// TODO apps[i]
		let app = apps[i];
		console.log('переменные объявлены, итерация №' + i);
		console.log(app.imgURL);
		console.log(app.title);
		console.log(app.lastUpdate);
		console.log(app.guid);

		let appLinks = appTemplate.content.querySelectorAll('.app__link');
		for (let j = 0; j < appLinks.length; j++) {
			console.log(appLinks[j]);

			appLinks[j].setAttribute('href', 'app.html?' + app.guid);
		}
		let appDate = appTemplate.content.querySelector('.app__date');
		appDate.innerHTML = new Date(app.lastUpdate).toLocaleString('ru',
			{
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			});

		let appImg = appTemplate.content.querySelector('.app__img');
		appImg.style.backgroundImage = `url(${app.imgURL})`;

		let appName = appTemplate.content.querySelector('.app__name');
		appName.innerHTML = app.title;

		appsWrapper.appendChild(appTemplate.content.cloneNode(true));
	}
}
