import { getApps, renderApps } from "/js/renderApps.js";
import { Carousel } from "/js/carousel.js";

window.onload = function () {


	getApps()
		.then(renderApps)
		.then(function () {
			var carousel = new Carousel({
				"main": ".app-slider",
				"wrap": ".apps-slider__row",
				"prev": ".slider-btn_prev",
				"next": ".slider-btn_next"
			});
		})
		.catch(err => console.error(err));
}