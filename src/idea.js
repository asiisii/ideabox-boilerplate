class Idea {
  constructor(obj) {
    this.id = Date.now();
    this.title = obj.title;
    this.body = obj.body;
    this.star = false;
  }
  saveToStorage() {
    localStorage.setItem("savedIdeas", JSON.stringify(saveIdeaCards));
  }
  deleteFromStorage() {}
  updateIdea() {}
}
