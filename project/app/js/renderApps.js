export { getApps, renderCarouselApps, renderAppsList };
import {getUrlParams} from "/js/utils.js";

function getApps(file) {
	return new Promise(function (resolve, reject) {
		let xhr = new XMLHttpRequest();
		let url = '/api/' + file;
		xhr.open('GET', url, true);
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

function renderCarouselApps(apps) {
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
			appLinks[j].setAttribute('href', 'app.html?' + 'app=' + app.guid);
		}
		let appDate = appTemplate.content.querySelector('.app__date');
		appDate.innerHTML = new Date(app.lastUpdate).toLocaleString('ru',
			{
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			});

		let appImg = appTemplate.content.querySelector('.app__img');
		appImg.setAttribute('src', `${app.imgURL}`);

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

function renderAppsList() {
	getApps()
		.then(function (apps) {
			let appNavItemTmplt = document.querySelector('.app-nav__app-item-template');
			let appNavItemWrap = document.querySelector('.app-nav__app-list');
			
			//Filthy way to aquilize the aside height and the main height 
			document.querySelector('.app-nav.content').style.minHeight = 
			getComputedStyle(document.querySelector('.app-desc.content')).height;

			for (let i = 0; i < apps.length; i++) {
				let app = apps[i];

				let appNavLink = appNavItemTmplt.content.querySelector('.app-nav__link');
				appNavLink.setAttribute('href', 'app.html?' + 'app=' + app.guid);
				appNavLink.innerHTML = app.title;

				appNavItemWrap.appendChild(appNavItemTmplt.content.cloneNode(true));
			}
		})
		.catch(function (error) { console.warn('Something goes wrong', error) });
}

function renderAppDetails() {
	let appGUID = getUrlParams(window.location.search).app;
	appGUID += '.json';

	getApps(appGUID)
		.then(function(app){
			let appDescTmplt = document.querySelector('.app-desc-template');
			let appDescWrap = document.querySelector('.app-desc.content');


		})
		.catch(function(error) {console.warn('Somethind goes wrong' + error)});
}