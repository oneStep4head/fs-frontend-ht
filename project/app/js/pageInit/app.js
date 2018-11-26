import {renderAppsList, renderAppDetails} from "/js/renderApps.js";

window.onload = function() {
	renderAppsList('app_packages.json');
	renderAppDetails();
}