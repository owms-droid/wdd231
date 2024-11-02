import { dialog, ge } from "./utils.mjs";
// welcome message
(() => {
    // press the '`~' key to open date testing menu
    addEventListener('keypress', (e) => { if (e.code === 'Backquote') { dialog(ge('debug'), null, ge('.close-button')); ge('debug').show(); }; });
    ge('dbTestDates').addEventListener('click', () => { displayLastVisitMessage((new Date(ge('dbThisVisit').value)).getTime(), (new Date(ge('dbLastVisit').value)).getTime()) });
    function prepLastVisitMessage() {
        const lastVisit = (new Date(parseInt(localStorage.getItem('lastVisit')))).getTime();
        const thisVisit = Date.now();
        localStorage.setItem('lastVisit', thisVisit);
        displayLastVisitMessage(thisVisit, lastVisit);
    }
    function displayLastVisitMessage(thisVisit, lastVisit) {
        const daysSinceVisit = () => { const x = Math.floor((thisVisit - lastVisit) / 86400000); return `${x} day${(x == 1) ? '' : 's'}`; }
        ge('last-visited').innerHTML = (!lastVisit) ? 'Welcome! Let us know if you have any questions.' : (thisVisit - lastVisit < 86400000) ? 'Back so soon! Awesome!' : `You last visited ${daysSinceVisit()} ago.`;
    }
    prepLastVisitMessage();
})();
// calendar
(() => {
    let debugDate;
    debugDate = '';
    const currentDate = (debugDate) ? new Date(debugDate) : new Date;
    const days = document.querySelectorAll('.day');
    const today = document.getElementById('today');
    let monthOffset = 0;
    function buildCalendar(offset = 0) {
        const gd = (d) => d.toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
        const offsetDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + offset)
        const firstDayOfMonth = offsetDate.toLocaleDateString('en-US', { 'weekday': 'long' });
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const numberOfDaysInMonth = [31, (offsetDate.getFullYear() % 4 == 0 && !(offsetDate.getFullYear() % 400 != 0 && offsetDate.getFullYear() % 100 == 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        const daysInMonth = numberOfDaysInMonth[offsetDate.getMonth()];
        const daysInLastMonth = numberOfDaysInMonth[offsetDate.getMonth() - 1] || 31;
        today.innerHTML = `${gd(offsetDate)}`
        for (let index = 0, foundFirstOfMonth = false, dateToPrint = 1, inMonth = 0; index < days.length; index++) {
            days[index].weekday = daysOfWeek[index % 7];
            if (foundFirstOfMonth) {
                inMonth++;
                if (inMonth > daysInMonth) { days[index].classList.add('other-month') };
                days[index].textContent = dateToPrint;
                (dateToPrint >= daysInMonth) ? dateToPrint = 1 : dateToPrint++;
            }
            else if (days[index].classList.contains(firstDayOfMonth)) {
                foundFirstOfMonth = true;
                index--;
                for (let beforeMonth = index, dayBeforeMonthToShow = daysInLastMonth; beforeMonth >= 0; beforeMonth--, dayBeforeMonthToShow--) { days[beforeMonth].textContent = dayBeforeMonthToShow; days[beforeMonth].classList.add('other-month'); }
            }
        }
    }
    function changeMonth(i) { document.querySelectorAll('.day').forEach(i => { i.classList.remove('other-month', 'today') }); monthOffset += i; buildCalendar(monthOffset); }
    document.getElementById('cal-back').addEventListener('click', () => { changeMonth(-1) });
    document.getElementById('cal-next').addEventListener('click', () => { changeMonth(1) });
    buildCalendar();
})()