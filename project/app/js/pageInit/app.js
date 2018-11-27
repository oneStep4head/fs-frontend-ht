import {renderAppsList, renderAppDetails} from "/js/renderApps.js";
import { getApps } from "../renderApps.js";

window.onload = function() {
	getApps('app_packages.json')
		.then(renderAppsList)
		.then(renderAppDetails)
		.catch(function(error) {
			console.warn(error);
		})
}