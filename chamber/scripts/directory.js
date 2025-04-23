const membersContainer = document.getElementById('members-container');
const gridViewBtn = document.getElementById('grid-view-btn');
const listViewBtn = document.getElementById('list-view-btn');

// Fetch member data
async function fetchMembers() {
    try {
        const response = await fetch('./data/members.json');
        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error('Error fetching members:', error);
        membersContainer.innerHTML = '<p>Failed to load member data. Please try again later.</p>';
    }
}

// Display members as cards
function displayMembers(members) {
    membersContainer.innerHTML = ''; // Clear existing content
    members.forEach(member => {
        const memberCard = document.createElement('section');
        memberCard.classList.add('member-card');
        memberCard.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}">
            <h2>${member.name}</h2>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">${member.website}</a>
            `;
        membersContainer.appendChild(memberCard);
    });
}

// Toggle between grid and list view
gridViewBtn.addEventListener('click', () => {
    membersContainer.classList.remove('list-view');
    membersContainer.classList.add('grid-view');
});

listViewBtn.addEventListener('click', showList);

function showList() {
    membersContainer.classList.remove('grid-view');
    membersContainer.classList.add('list-view');
};

// Initialize the member data fetch
fetchMembers();
showList(); // Default to list view on load
