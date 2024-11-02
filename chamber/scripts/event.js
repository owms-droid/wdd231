import { ge } from './utils.mjs'
const eventList = {
    "events": [
        { "event": "Tokosh Fest", "date": "Oct 18th", "place": "Main Square", "info": "To discover new food!" },
        { "event": "Halloween Party", "date": "Oct 31st", "place": "Chamber's Hall", "info": "Spooky times!" },
        { "event": "Folk Fest", "date": "Nov 19th", "place": "Main Square", "info": "All saints' day" },
        { "event": "Christmas Contest", "date": "Dec 23rd", "place": "City's Stadium", "info": "Help the Poor" }
    ]
}
function buildEventCard(i) {
    const j = document.createElement('li');
    j.innerHTML = `
    <p><b>What: </b>${i.event}</p>
    <p><b>Where: </b>${i.place}</p>
    <p><b>When: </b>${i.date}</p>
    <p><b>Why: </b>${i.info}</p>`;
    return j;
}
(function () {
    const listings = ge('event-list');
    listings.innerHTML = ``;
    eventList.events.forEach(i => { listings.append(buildEventCard(i)); });
})()