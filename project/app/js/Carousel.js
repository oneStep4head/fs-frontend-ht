export { Carousel };

// TODO class from Carousel
function Carousel(setting) {
	let privates = {};

	/* Privates properties */
	privates.setting = setting;

	privates.sel = {
		"main": document.querySelector(privates.setting.main),
		"wrap": document.querySelector(privates.setting.wrap),
		"children": document.querySelector(privates.setting.wrap).children,
		"prev": document.querySelector(privates.setting.prev),
		"next": document.querySelector(privates.setting.next),
		"slide": document.querySelector(privates.setting.slide),
		"pointersWrap": document.querySelector(privates.setting.pointersWrap),
		"pointers": document.querySelector(privates.setting.pointersWrap).children
	};

	privates.opt = {
		"position": 0,
		"minPosition": 0,
		// (-2) is becous of 2 fake app slide in end of the slides row.
		"maxPosition": document.querySelector(privates.setting.wrap).children.length - 1 - 2,
		"slideWidth": getSlideWidth(document.querySelector(privates.setting.slide))
	};

	// We will use it for calculating how far we need to shift our Carousel
	function getSlideWidth(slide) {
		let slideWidth = parseInt(
			getComputedStyle(document.querySelector(privates.setting.slide)).width.slice(0, -2),
			10);
		let slideMargin = parseInt(
			getComputedStyle(document.querySelector(privates.setting.slide)).margin.slice(0, -2),
			10);
		return slideWidth + slideMargin * 2;
	}
	//Private Methods
	// HighLight/unHighLight Pointers on active Carousel Item
	function hlPoint(position) {
		privates.sel.pointers[position].classList.add('carousel-point_active');
	}
	function unHlPoint(position) {
		privates.sel.pointers[position].classList.remove('carousel-point_active');
	}
	// Prev slide
	function prevSlide() {
		unHlPoint(privates.opt.position);
		--privates.opt.position;

		if (privates.opt.position < 0) {
			privates.sel.wrap.classList.add('apps-carousel__row_no-animation');
			privates.opt.position = privates.opt.maxPosition + 1;
			privates.sel.wrap.style["transform"] = `translateX(-${privates.opt.position * privates.opt.slideWidth}px)`;
			
			privates.opt.position = privates.opt.maxPosition;
		}
		setTimeout(privates.sel.wrap.classList.remove('apps-carousel__row_no-animation'), 1000);
		hlPoint(privates.opt.position);
		privates.sel.wrap.style["transform"] = `translateX(-${privates.opt.position * privates.opt.slideWidth}px)`;
	};
	// Next slide
	function nextSlide() {
		unHlPoint(privates.opt.position);
		++privates.opt.position;

		if (privates.opt.position > privates.opt.maxPosition) {
			privates.opt.position = 0;
		}

		hlPoint(privates.opt.position);
		privates.sel.wrap.style["transform"] = `translateX(-${privates.opt.position * privates.opt.slideWidth}px)`;
	};
	// Go To Slide 
	function goToSlide(e) {
		unHlPoint(privates.opt.position);
		// In case of Fire place me in Start Position :>
		// Yep, it's just comfortoble for me :>
		let position;
		if (!e) {
			position = privates.opt.minPosition;
		} else {
			position = e.target.dataset.carouselPosition;
		}
		privates.opt.position = position;

		hlPoint(privates.opt.position);
		privates.sel.wrap.style["transform"] = `translateX(-${position * privates.opt.slideWidth}px)`;
	}
	/* Public methods */
	//Initialize handlers on buttons < > && start position
	this.init = function () {
		if (privates.sel.prev !== null) {
			privates.sel.prev.addEventListener('click', function () {
				prevSlide();
			});
		}

		if (privates.sel.next !== null) {
			privates.sel.next.addEventListener('click', function () {
				nextSlide();
			});
		}

		if (privates.sel.pointers !== null) {
			for (let i = 0; i < privates.sel.pointers.length; i++) {
				privates.sel.pointers[i].addEventListener('click', function (e) {
					goToSlide(e);
				});
			}
		}

		goToSlide();
	}
}


