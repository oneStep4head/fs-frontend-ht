window.onload = function () {
	cells = document.querySelectorAll('.cell');
	console.log(cells);
	
	function randomInt(min, max) {
		var rand = min - 0.5 + Math.random() * (max - min + 1)
		rand = Math.round(rand);
		return rand;
	}
	
	function getRndColor() {
		let letters = '0123456789ABCDF'
		let rndColor = '#';
		for (let i = 0; i < 6; i++) {
			rndColor += letters[randomInt(0, 15)];
		}
		console.log(rndColor);
		return rndColor;
	}
	
	function getRndElem() {
		rndElem = cells[randomInt(0, cells.length)];
		console.log(rndElem);
		return rndElem;
	}
	
	function highLightRndCell() {
		let elemToHiLight = getRndElem;
		elemToHiLight.style.backgroundColor = getRndColor();
	}
	
	highLightRndCell();
}