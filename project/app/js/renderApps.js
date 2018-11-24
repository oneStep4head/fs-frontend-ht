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
	let rand = min + Math.random() * (max + 1 - min);
	rand = Math.floor(rand);
	return rand;
}

function renderApps(apps) {
	console.log('Starts to render apps...');
	let firstAppItem, lastAppItem;

	let appsWrapper = document.querySelector('.apps-carousel__row');
	let appTemplate = document.querySelector('.app-template');

	let appsPointersWrapper = document.querySelector('.apps-carousel__pointers-row');
	let appPointerTemplate = document.querySelector('.carousel-point-template');

	for (let i = 0; i < apps.length; i++) {
		// TODO apps[i]=app
		let app = apps[i];
		console.log('в цикле заполняем шаблон и аппендим в DOM, итерация №' + i);

		let appLinks = appTemplate.content.querySelectorAll('.app__link');
		for (let j = 0; j < appLinks.length; j++) {
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
		appImg.setAttribute('src',`${app.imgURL}`);

		let appName = appTemplate.content.querySelector('.app__name');
		appName.innerHTML = app.title;


		if (i == 0) { firstAppItem = appTemplate.content.cloneNode(true); }
		if (i == apps.length - 1) { lastAppItem = appTemplate.content.cloneNode(true); }

		appPointerTemplate.content.querySelector('.carousel-point').setAttribute('data-carousel-position', i);

		appsWrapper.appendChild(appTemplate.content.cloneNode(true));
		appsPointersWrapper.appendChild(appPointerTemplate.content.cloneNode(true));
	}
	// this 2 elements added in row for more beauty slider look
	//Yep, I'm not so smart. But if u'r - feel free to tell me your thoughts.
	appsWrapper.appendChild(firstAppItem);
	appsWrapper.insertBefore(lastAppItem, appsWrapper.firstChild);

}
