import { getApps, renderCarouselApps } from "/js/renderApps.js";
import { Carousel } from "/js/Carousel.js";

window.onload = function () {
	getApps('app_packages.json')
		.then(renderCarouselApps)
		.then(function () {
			let carousel = new Carousel({
				"main": ".apps-carousel",
				"wrap": ".apps-carousel__row",
				"prev": ".carousel-btn_prev",
				"next": ".carousel-btn_next",
				"slide" : ".apps__item",
				"pointersWrap" : ".apps-carousel__pointers-row"
			});
			carousel.init();
		})
		.catch(err => console.error(err));
}