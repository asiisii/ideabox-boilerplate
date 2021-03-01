var idea = new Idea();
var saveIdeaCards = [];

var titleInput = document.getElementById('titleInput');
var bodyInput = document.getElementById('bodyInput');
var searchInput = document.getElementById('searchInput')
var btmSection = document.getElementById('bottomSection');

var saveBtn = document.getElementById('topFormBtn');
var enableBtn = document.getElementById('saveBtn');
var showStarredCardsBtn = document.getElementById('showStarredBtn');
var searchBtn = document.getElementById('glassBox');

enableBtn.addEventListener('mouseenter', enableSaveBtn);
saveBtn.addEventListener('click', storeIdeaCard);
btmSection.addEventListener('click',deleteOrFavorite);
showStarredCardsBtn.addEventListener('click', showFavIdeaCards);
searchBtn.addEventListener('click', searchCards);
searchInput.addEventListener('keyup', checkEmpty);
window.addEventListener('load', retreiveFromLocalStorage);

function enableSaveBtn() {
  if (titleInput.value && bodyInput.value) {
    saveBtn.disabled = false;
		saveBtn.classList.remove('disable-save-btn');
  }
}

function clearOut() {
	if (titleInput.value && bodyInput.value) {
		titleInput.value = null;
		bodyInput.value = null;
    saveBtn.disabled = true;
    saveBtn.classList.add('disable-save-btn');
	}
}

function storeIdeaCard(event) {
	event.preventDefault();
	idea = new Idea(titleInput.value, bodyInput.value);
	if (!saveIdeaCards.includes(idea)) {
		saveIdeaCards.push(idea);
		idea.saveToStorage();
		makeIdeaCard(saveIdeaCards);
		clearOut();
	}
}

function makeIdeaCard(ideaCards) {
	btmSection.innerHTML = "";
	for (var i = 0; i < ideaCards.length; i++) {
		var starImg = ideaCards[i].star ? starImg = "./assets/star-active.svg" : starImg = "./assets/star.svg";
		btmSection.innerHTML +=
		`
		<article class="idea-card">
			<div class="card-nav">
				<input type="image" src="${starImg}" id=${ideaCards[i].id} alt="star icon" class="star imgs" >
				<input type="image" src="./assets/delete.svg" alt="delete icon" class="delete imgs" id=${ideaCards[i].id}>
			</div>
			<p class="card-title">${ideaCards[i].title}</p>
			<p class="card-body">${ideaCards[i].body}</p>
			<div class="card-footer">
				<input type="image" src="./assets/comment.svg" alt="insert comment icon" class="comment imgs">
				<p>Comment</p>
			</div>
		</article>
		`
	}
}

function deleteOrFavorite(event) {
	if (event.target.classList.contains('star')) {
		changeStar(event);
	} else {
		deleteIdeaCard(event);
	}
}

function deleteIdeaCard(event) {
	event.preventDefault();
	var getId = event.target.closest('.delete').id;
	var newGetId = parseInt(getId);
	for (var i = 0; i < saveIdeaCards.length; i++) {
		if (newGetId === saveIdeaCards[i].id) {
			saveIdeaCards.splice(i, 1);
			idea.deleteFromStorage();
		}
	}

	makeIdeaCard(saveIdeaCards);
}

function changeStar(event) {
	var getId = event.target.closest('.star');
	var newGetId = parseInt(getId.id);
	for (var i = 0; i < saveIdeaCards.length; i++) {
		if (newGetId === saveIdeaCards[i].id) {
			idea.updateIdea();
			idea.saveToStorage();
		}
	}
}

function showFavIdeaCards() {
	btmSection.innerHTML = "";
	var favIdeaCards = [];
	if (showStarredBtn.innerText === "Show All Ideas") {
		showStarredBtn.innerText = "Show Starred Ideas";
		makeIdeaCard(saveIdeaCards);
		return;
	}

	for (var i = 0; i < saveIdeaCards.length; i++) {
		if(saveIdeaCards[i].star){
		  showStarredBtn.innerText = "Show All Ideas";
		  favIdeaCards.push(saveIdeaCards[i]);
		}
	}

	makeIdeaCard(favIdeaCards);
}

function retreiveFromLocalStorage() {
	btmSection.innerHTML = "";
	var items = JSON.parse(localStorage.getItem("savedIdeas"));
	for (var i = 0; i < items.length; i++) {
			saveIdeaCards.push(items[i]);
	}

	makeIdeaCard(saveIdeaCards);
}

function searchCards() {
	btmSection.innerHTML = "";
	var searchResults = [];
	var searchValue = searchInput.value.toUpperCase();
	for (var i = 0; i < saveIdeaCards.length; i++) {
		if (saveIdeaCards[i].title.toUpperCase().includes(searchValue)||
		saveIdeaCards[i].body.toUpperCase().includes(searchValue)) {
			searchResults.push(saveIdeaCards[i]);
		}
	}
	makeIdeaCard(searchResults);
}

function checkEmpty() {
	if (searchInput.value === "") {
		searchCards();
	}
}