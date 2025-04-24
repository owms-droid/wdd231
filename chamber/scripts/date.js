// Script to get the current year and last modified date
// for the footer of the page
const getDate = document.getElementById('currentyear');
const getLastModified = document.getElementById('lastModified');

getDate.innerHTML = `${new Date().getFullYear()}`;
getLastModified.innerHTML = `Last Modification: ${document.lastModified}`;