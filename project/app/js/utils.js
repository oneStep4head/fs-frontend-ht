export {getUrlParams};

function getUrlParams(search) {
	// let search = location.search;
	let paramStrings = search.slice(search.indexOf('?') + 1).split('&');

	let params = {};
	paramStrings.map(function(param){
		let [key, value] = param.split('=');
		params[key] = decodeURIComponent(value);
	});
	return params;
}

