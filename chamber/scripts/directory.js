document.addEventListener('DOMContentLoaded', () => {
	const membersContainer = document.getElementById('members-container');
	const gridViewBtn = document.getElementById('grid-view-btn');
	const listViewBtn = document.getElementById('list-view-btn');
  
	// Fetch member data
	async function fetchMembers() {
		try {
		  const response = await fetch('data/members.json');
		  if (!response.ok) {
			throw new Error('Network response was not ok');
		  }
		  const members = await response.json();
		  displayMembers(members);
		} catch (error) {
		  console.error('Error fetching members:', error);
		  displayError();
		}
	  }
	
	// Display members as cards
	function displayMembers(members) {
	membersContainer.innerHTML = ''; // Clear existing content
	if (Array.isArray(members)) {
		members.forEach(member => {
		const memberCard = document.createElement('div');
		memberCard.classList.add('member-card');
		memberCard.innerHTML = `
			<img src="images/${member.icon}" alt="${member.name}">
			<h2>${member.name}</h2>
			<p>${member.address}</p>
			<p>${member.phone}</p>
			<a href="${member.website}" target="_blank">${member.website}</a>
			<p>Membership Level: ${member.membershipLevel}</p>
			<p>${member.founded}</p>
		`;
		membersContainer.appendChild(memberCard);
		});
	} else {
		displayError();
	}
	}

	// Display error message
	function displayError() {
	const errorCard = document.createElement('div');
	errorCard.classList.add('error-card');
	errorCard.textContent = 'Error fetching member data';
	membersContainer.appendChild(errorCard);
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

	// Fetch members on page load
	fetchMembers();
});