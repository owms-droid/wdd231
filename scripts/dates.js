const year = document.querySelector("#currentyear");
const full = document.querySelector("#lastModified");

const today = new Date();

year.innerHTML = today.getFullYear();
year.innerHTML = `&copy; ${today.getFullYear()} Oliver Modesto | Peru`;

full.innerHTML = `Last Update: <span>${new Intl.DateTimeFormat(
	"en-US",
	{
		dateStyle: "full"
	}
).format(today)}</span>`;