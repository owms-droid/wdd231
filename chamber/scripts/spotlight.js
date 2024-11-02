import { get, ge } from "./utils.mjs";
function buildList(members, list) {
    const f = members.filter((m) => m.level > 1);
    const c = [];
    let it = 0;
    x: while (c.length <= 2) {
        const r = Math.floor(Math.random() * f.length);
        if (!c.includes(f[r])) c[c.length] = f[r];
        it++;
        if (it > 4) {
            c[0] = f[r];
            c[1] = f[(r + 1) % f.length];
            c[2] = f[(r + 2) % f.length];
            break x;
        }
    }
    list.innerHTML = '';
    for (let i = 0; i < c.length; i++) {
        list.innerHTML += `
        <li class='spotlight-card level-${c[i].level}'>
            <p class='card-header${(c[i].name.length > 22) ? ' long-name' : ''}'>${c[i].name}</p>
            ${(c[i].image) ? `<div class='card-img-holder'><img src='${c[i].image}' alt='image for ${c[i].name}' class='card-img' width='329.6' height='188.2'></div>` : '<div class="spacer"></div>'}
            <p class='card-phone'>PHONE: <span>${c[i].phone}</span></p>
            <p class='card-addr'>ADDRESS: <span>${c[i].address}</span></p>
            <p class='card-url'>URL: <a href='https://www.${c[i].website}' target='_blank'>${c[i].website}</a></p>
        </li>`;
    }
}
(async () => buildList((await get('/data/members.json')).members, ge('spotlight-list')))();