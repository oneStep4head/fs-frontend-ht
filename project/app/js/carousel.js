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
		"next": document.querySelector(privates.setting.next)
	};

	privates.opt = {
		"position": 0,
		"max_position": document.querySelector(privates.setting.wrap).children.length
	};

	// Control
	if (privates.sel.prev !== null) {
		privates.sel.prev.addEventListener('click', function () {
			this.prevSlide();
		});
	}

	if (privates.sel.next !== null) {
		privates.sel.next.addEventListener('click', function () {
			this.nextSlide();
		});
	}
	/* Public methods */
	// Prev slide
	this.prevSlide = function () {
		--privates.opt.position;

		if (privates.opt.position < 0) {
			privates.sel.wrap.classList.add('s-notransition');
			privates.opt.position = privates.opt.max_position - 1;
		}

		privates.sel.wrap.style["transform"] = `translateX(-${privates.opt.position}00%)`;
	};


	// Next slide
	this.nextSlide = function () {
		++privates.opt.position;

		if (privates.opt.position >= privates.opt.max_position) {
			privates.opt.position = 0;
		}

		privates.sel.wrap.style["transform"] = `translateX(-${privates.opt.position}00%)`;
	};
}


