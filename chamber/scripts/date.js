import { ge } from "./utils.mjs";
ge('currentyear').innerHTML = `${new Date().getFullYear()}`;
ge('lastModified').innerHTML = `Last Modification: ${document.lastModified}`;