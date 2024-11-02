( () => {
    const time = (i) => ( (j) => `${j.toLocaleDateString('en-US', {
        weekday: 'long'
    })}, ${j.toLocaleDateString('en-US', {
        month: 'long'
    })} ${( (k) => `${k}${(k < 3 && k != 0) ? (k >= 2) ? (k == 3) ? 'rd' : 'nd' : 'st' : 'th'}`)(j.getDate())}, ${j.getFullYear()}`)(new Date(parseInt(i)));

    const text = (t) => t.replace(/\+/g, ' ').replace(/\%60/g, '`').replace(/\%7E/g, '~').replace(/\%21/g, '!').replace(/\%40/g, '@').replace(/\%23/g, '#').replace(/\%24/g, '$').replace(/\%25/g, '%').replace(/\%5E/g, '^').replace(/\%26/g, '&').replace(/\%28/g, '(').replace(/\%29/g, ')').replace(/\%3D/g, '=').replace(/\%2B/g, '+').replace(/\%5B/g, '[').replace(/\%7B/g, '{').replace(/\%5D/g, ']').replace(/\%7D/g, '}').replace(/\%5C/g, '\\').replace(/\%7C/g, '|').replace(/\%3B/g, ';').replace(/\%3A/g, ':').replace(/\%22/g, '"').replace(/\%27/g, '\'').replace(/\%2C/g, ',').replace(/\%3C/g, '<').replace(/\%3E/g, '>').replace(/\%2F/g, '/').replace(/\%3F/g, '?').replace(/\%0D\%0A/g, '<br>');

    window.location.href.split('?')[1].split('&').forEach(i => {
        i = i.split('=');
        (i[0] == 'orgTitle' || i[0] == 'orgDesc' || i[0] == 'level') ? 0 : document.getElementById(i[0]).innerHTML = (i[0] == 'time') ? time(i[1]) : text(i[1]);
    }
    );
}
)()


