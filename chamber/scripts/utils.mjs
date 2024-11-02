const parseBool = (i) => (i == 'true' || i == 1) ? true : false;
function toggle(clickTarg, clsTarg, cls, ls = null) {
    let storage = parseBool(localStorage.getItem(ls)) || false;
    if (typeof (clickTarg) == 'object') { clickTarg.forEach(i => { ge(i).addEventListener('click', () => { callback() }) }); }
    else { ge(clickTarg).addEventListener('click', () => { callback() }) }
    function callback(pageLoad = false) {
        if (typeof (clsTarg) == 'object') { clsTarg.forEach(i => { ge(i).classList.toggle(cls); }); }
        else { ge(clsTarg).classList.toggle(cls); }
        if (ls) {
            if (!pageLoad) storage = !storage;
            localStorage.setItem(ls, storage);
        }
    }
    if (ls && storage) callback(true);
}
function ge(id, all = false) {
    let el = null
    try {
        el = document.getElementById(id);
        if (el == null) el = (all) ? document.querySelectorAll(`.${id}`) : document.querySelector(`.${id}`);
    }
    catch { el = (all) ? document.querySelectorAll(`${id}`) : document.querySelector(`${id}`) }
    finally { return el }
}
async function get(url) { return await (await fetch(url)).json(); }
export { ge, get, parseBool, toggle }