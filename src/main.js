var btmSection = document.getElementById('bottomSection');
var titleInput = document.getElementById('titleInput');
var bodyInput = document.getElementById('bodyInput');
var saveBtn = document.getElementById('topFormBtn');

saveBtn.addEventListener('click', addIdeas);
window.addEventListener('load',	disableSaveBtn);
titleInput.addEventListener('input', enableSaveBtn);
bodyInput.addEventListener('input', enableSaveBtn);

function addIdeas(){
	event.preventDefault(event);
	btmSection.innerHTML +=
	`
	<article class="idea-card">
          <div class="card-nav">
            <img src="./assets/star-active.svg" alt="star icon" class="card-img">
            <img src="./assets/delete.svg" alt="delete icon" class="card-img">
          </div>
          <p class="card-title">${titleInput.value}</p>
          <p class="card-body">${bodyInput.value}</p>
          <div class="card-footer">
            <img src="./assets/comment.svg" alt="insert comment icon" class="card-img">
            <p>Comment</p>
          </div>
        </article>
	`
	clearOut();
  //   disableSaveBtn();
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
  if( titleInput.value && bodyInput.value){
    // console.log("check");
    saveBtn.style.backgroundColor = '#5356A4';
    saveBtn.disabled =false;
		saveBtn.style.cursor = 'pointer';
  }
}
