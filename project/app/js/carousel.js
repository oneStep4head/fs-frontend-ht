
	window.onload = function() {/* Scope privates methods and properties */
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
				appDate.innerHTML = new Date(apps[i]["lastUpdate"]).toLocaleString('ru',
					{
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					});
	
				let appImg = appTemplate.content.querySelector('.app__img');
				// appImg.setAttribute('src', apps[i]["imgURL"]);
				appImg.style.backgroundImage = `url(${apps[i]["imgURL"]})`;
	
				let appName = appTemplate.content.querySelector('.app__name');
				appName.innerHTML = apps[i]["title"];
	
				appsWrapper.appendChild(appTemplate.content.cloneNode(true));
			}
		}
		getApps()
			.then(renderApps)
			.then(new Carousel({
				"main": ".app-slider",
				"wrap": ".apps-slider__row",
				"prev": ".slider-btn_prev",
				"next": ".slider-btn_next"
			}))
			.catch(err => console.error(err));
		
		function Carousel(setting) {
			let privates = {};

			/* Privates properties */
			privates.setting = setting;

			privates.sel = {
				"main": document.querySelector(privates.setting.main),
				"wrap": document.querySelector(privates.setting.wrap),
				"children": document.querySelector(privates.setting.wrap).children,
				"prev": document.querySelector(privates.setting.prev),
				"next": document.querySelector(privates.setting.next)
			};

			privates.opt = {
				"position": 0,
				"max_position": document.querySelector(privates.setting.wrap).children.length
			};

			// Control
			if(privates.sel.prev !== null) {
				privates.sel.prev.addEventListener('click', () => {
					this.prev_slide();
				});
			}

			if(privates.sel.next !== null) {
				privates.sel.next.addEventListener('click', () => {
					this.next_slide();
				});
			}
			/* Public methods */
			// Prev slide
			this.prev_slide = () => {
				--privates.opt.position;

				if(privates.opt.position < 0) {
					privates.sel.wrap.classList.add('s-notransition');
					privates.opt.position = privates.opt.max_position - 1;
				}

				privates.sel.wrap.style["transform"] = `translateX(-${privates.opt.position}00%)`;
			};


			// Next slide
			this.next_slide = () => {
				++privates.opt.position;

				if(privates.opt.position >= privates.opt.max_position) {
					privates.opt.position = 0;
				}

				privates.sel.wrap.style["transform"] = `translateX(-${privates.opt.position}00%)`;
			};
		}
}
