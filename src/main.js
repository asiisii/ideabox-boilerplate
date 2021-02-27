var btmSection = document.getElementById('bottomSection');
var titleInput = document.getElementById('titleInput');
var bodyInput = document.getElementById('bodyInput');
var saveBtn = document.getElementById('topFormBtn');
var saveIdeaCards= [];
var favIdeaCards = [];
window.addEventListener('load',	disableSaveBtn);
saveBtn.addEventListener('click', storeIdeaCard);
titleInput.addEventListener('input', enableSaveBtn);
bodyInput.addEventListener('input', enableSaveBtn);
btmSection.addEventListener('click',function(){
	event.preventDefault();
	if(event.target.classList.contains('star')){
		addToFavorite(event);
	}else{
		deleteIdeaCard(event);
	}
});
function storeIdeaCard(event){
		event.preventDefault();
		var idea = new Idea({title:titleInput.value, body:bodyInput.value});
		saveIdeaCards.push(idea);
		// idea.saveToStorage();
		makeIdeaCard();
}
function addToFavorite(event){
		event.preventDefault();
	// console.log("addEvent",event);
	var getId = event.target.closest('.star');
	// console.log(getId);
	var newGetId = parseInt(getId.id);
	console.log(newGetId);
	if(!this.star){
		this.star = true;
		getId.src = "./assets/star-active.svg";
		for (var i = 0; i < saveIdeaCards.length; i++) {
			if(newGetId === saveIdeaCards[i].id){
				// console.log(saveIdeaCards[i].id);

				favIdeaCards.push(saveIdeaCards[i]);
			}
		}

	}else{
		this.star = false;
		getId.src = "./assets/star.svg";
	}
}
function makeIdeaCard(){
	btmSection.innerHTML ="";
	for (var i = 0; i < saveIdeaCards.length; i++) {
		btmSection.innerHTML +=
		`
		<article class="idea-card">
			<div class="card-nav">
				<input type="image" src="./assets/star.svg" alt="star icon" class="star imgs"id=${saveIdeaCards[i].id} >
				<input type="image" src="./assets/delete.svg" alt="delete icon" class="delete imgs" id=${saveIdeaCards[i].id}>
			</div>
			<p class="card-title">${saveIdeaCards[i].title}</p>
			<p class="card-body">${saveIdeaCards[i].body}</p>
			<div class="card-footer">
				<input type="image" src="./assets/comment.svg" alt="insert comment icon" class="comment imgs">
				<p>Comment</p>
			</div>
		</article>
		`
		clearOut();
	}
}
function deleteIdeaCard(event){
	// console.log("deleteEvent", event);
	event.preventDefault();
	var getId = event.target.closest('.delete').id;
	// console.log("test1",getId);
	var newGetId = parseInt(getId);
	// console.log("newGetId", newGetId);
	// console.log("test",newGetId);
	// console.log("test1", saveIdeaCards[0].id);
	for (var i = 0; i < saveIdeaCards.length; i++) {
		if(newGetId === saveIdeaCards[i].id){
			saveIdeaCards.splice(i,1);
		}
	}makeIdeaCard();
}
function clearOut(){
	if(titleInput.value && bodyInput.value){
		titleInput.value= "";
		bodyInput.value= "";
    saveBtn.disabled = true;
    saveBtn.style.backgroundColor = '#A9AAD2';
	}
}
function disableSaveBtn(){
	if(!titleInput.value || !bodyInput.value){
		saveBtn.disabled = true;
		saveBtn.style.backgroundColor = '#A9AAD2';
		saveBtn.style.cursor = 'not-allowed';
	}
}
function enableSaveBtn(){
  if(titleInput.value && bodyInput.value){
    saveBtn.style.backgroundColor = '#5356A4';
    saveBtn.disabled =false;
		saveBtn.style.cursor = 'pointer';
  }
}
