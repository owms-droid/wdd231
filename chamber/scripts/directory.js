import { ge, get, toggle } from "./utils.mjs";
toggle('toggle-view', ['list-items', 'toggle-view'], 'is-grid', 'listView');
function buildList(members) {
    const listItems = ge('list-items');
    listItems.innerHTML = '';
    members.forEach(member => {
        const cardHolder = document.createElement('li');
        cardHolder.classList.add('card-holder', `level-${member.level}`, (member.image) ? 'has-img' : 'no-img','style');
        function img(member) {
            const img = document.createElement('img');
            img.setAttribute('src', member.image);
            img.setAttribute('alt', `image for ${member.name}`);
            img.setAttribute('width', '250');
            img.setAttribute('height', '48');
            return img.outerHTML;
        }
        cardHolder.innerHTML = `
            <div class='card'>
                ${(member.image)
                ? `<div class='header card-img'>${img(member)}</div><hr><p class='card-name'>${member.name}</p>`
                : `<p class='header card-header'><b>${member.name}</b></p><hr>`}
                <p class='card-addr'>${member.address}</p>
                <p class='card-phone'>${member.phone}</p>
                <p class='card-url'><a href='https://www.${member.website}' target='_blank'>${member.website}</a></p>
            </div>`;
        listItems.appendChild(cardHolder);
    });
}
(async () => buildList((await get('/data/members.json')).members, ge('list-items')))();