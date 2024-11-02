document.getElementById('time').value = (new Date()).getTime();

document.getElementById('submit').addEventListener('click', () => { document.getElementById('form').classList.add('submit') });

document.querySelectorAll('.info-button').forEach((i) => {
    const levelDetails = {
        'bronze': {
            'name': 'Bronze',
            'level': 'level-1',
            'list': [
                'Complimentary listing in public directory',
                'Free access to member-only events',
                'Membership fee: $400/month'
            ]
        },
        'silver': {
            'name': 'Silver',
            'level': 'level-2',
            'list': [
                'Chance to appear on home page',
                'Free access to monthly leadership training workshop',
                'All Bronze tier benefits',
                'Membership fee: $900/month'
            ]
        },
        'gold': {
            'name': 'Gold',
            'level': 'level-3',
            'list': [
                'Opportunity to MC public events',
                'Discounts on tickets for ticketed events',
                'All Silver and Bronze tier benefits',
                'Membership fee: $2500/month'
            ]
        },
        'np': {
            'name': 'Non-Profit',
            'level': 'level-np',
            'list': [
                'All Silver and Bronze tier benefits',
                'No membership fees',
                'Must provide valid proof of federal non-profit status'
            ]
        }
    };
    const tier = `${i.dataset.level}`
    const data = levelDetails[tier];

    i.addEventListener('click', () => {
        document.getElementById('modal-level').textContent = data.name;
        document.getElementById('modal-list').innerHTML = '';

        data.list.forEach(j => {
            const k = document.createElement('li');
            k.textContent = j;
            document.getElementById('modal-list').appendChild(k);
        });

        function closeModal() {
            document.getElementById('modal').close();
            document.getElementById('modal-border').classList.remove(data.level, 'open');
        }

        document.getElementById('modal-close').addEventListener('click', closeModal);
        modal.addEventListener('close', closeModal);
        modal.addEventListener('click', (e) => { (e.target != modal) ? 0 : closeModal() });

        document.getElementById('modal').showModal();
        document.getElementById('modal-border').classList.add(data.level, 'open');
    })
})
