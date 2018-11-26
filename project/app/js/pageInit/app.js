import {renderAppsList, renderAppDetails} from "/js/renderApps.js";

window.onload = function() {
	renderAppDetails();
	renderAppsList('app_packages.json');
}