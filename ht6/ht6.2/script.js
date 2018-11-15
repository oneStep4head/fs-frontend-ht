window.onload = function () {
	cells = document.querySelectorAll('.cell');
	console.log(cells);
	
	function randomInt(min, max) {
		var rnd = min + Math.random() * (max - min + 1)
		rnd = Math.floor(rnd);
		return rnd;
	}
	
	function getRndColor() {
		let letters = '0123456789ABCDF'
		let rndColor = '#';
		for (let i = 0; i < 6; i++) {
			rndColor += letters[randomInt(0, 14)];
		}
		// console.log(rndColor);
		return rndColor;
	}
	
	function getRndElem() {
		rndElem = cells[randomInt(0, cells.length - 1)];
		// console.log(rndElem);
		return rndElem;
	}
	
	function highLightRndCell() {
		let elemToHiLight = getRndElem();
		console.log(`elem to HL: \n`);
		console.log(elemToHiLight);
		elemToHiLight.style.backgroundColor = getRndColor();
	}

	function unHighLightRndCell() {
		let elemToUnHighLight = getRndElem();
		console.log(`elem to unHL: \n`);
		console.log(elemToUnHighLight);
		if (elemToUnHighLight.style.backgroundColor === "#ccc") {
			return
		} else {
			elemToUnHighLight.style.backgroundColor = "#ccc";
		}
	}

	function itsPartyTime () {
		let colorTimer = setInterval (highLightRndCell, 2000);
		let timerID = setTimeout (() => console.log('timer'), 1000);
		let unColorTimer = setInterval (unHighLightRndCell, 2000);
	}
	
	let hlTimerID = setInterval(highLightRndCell, 2000);
	let unHlTimerID = setTimeout (function() {
		setInterval(unHighLightRndCell, 2000);
	},2000);
	// itsPartyTime();
}
