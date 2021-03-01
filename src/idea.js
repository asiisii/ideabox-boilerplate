class Idea {
  constructor(title, body) {
    this.id = Date.now();
    this.title = title;
    this.body = body;
    this.star = false;
  }
  saveToStorage() {
    localStorage.setItem("savedIdeas", JSON.stringify(saveIdeaCards));
  }
  deleteFromStorage() {
    localStorage.removeItem('savedIdeas');
    this.saveToStorage();
  }
  updateIdea() {
    var getId = event.target.closest('.star');
    var newGetId = parseInt(getId.id);
    for (var i = 0; i < saveIdeaCards.length; i++) {
      if (newGetId === saveIdeaCards[i].id) {
        if (!saveIdeaCards[i].star) {
          saveIdeaCards[i].star = true;
          getId.src = "./assets/star-active.svg";
        } else if (saveIdeaCards[i].star) {
          saveIdeaCards[i].star = false;
          getId.src = "./assets/star.svg";
        }
      }
    }
  }
}
