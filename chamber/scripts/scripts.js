document.addEventListener('DOMContentLoaded', () => {
	const membersContainer = document.getElementById('members-container');
	const gridViewBtn = document.getElementById('grid-view-btn');
	const listViewBtn = document.getElementById('list-view-btn');
  
	// Fetch member data
	async function fetchMembers() {
	  try {
		const response = await fetch('data/members.json');
		const members = await response.json();
		displayMembers(members);
	  } catch (error) {
		console.error('Error fetching members:', error);
	  }
	}
  
	// Display members as cards
	function displayMembers(members) {
	  membersContainer.innerHTML = ''; // Clear existing content
	  members.forEach(member => {
		const memberCard = document.createElement('div');
		memberCard.classList.add('member-card');
		memberCard.innerHTML = `
		  <img src="images/${member.icon}" alt="${member.name}">
		  <h2>${member.name}</h2>
		  <p>${member.address}</p>
		  <p>${member.phone}</p>
		  <a href="${member.website}" target="_blank">${member.website}</a>
		  <p>Membership Level: ${member.membership_level}</p>
		  <p>${member.description}</p>
		`;
		membersContainer.appendChild(memberCard);
	  });
	}

	// Toggle between grid and list view
	gridViewBtn.addEventListener('click', () => {
	  membersContainer.classList.remove('list-view');
	  membersContainer.classList.add('grid-view');
	});
  
	listViewBtn.addEventListener('click', () => {
	  membersContainer.classList.remove('grid-view');
	  membersContainer.classList.add('list-view');
	});
  
	// Initialize the member data fetch
	fetchMembers();
  });