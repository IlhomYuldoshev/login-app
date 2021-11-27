const baseUrl = "https://login-app-dce29-default-rtdb.firebaseio.com/";

export class Question {
  static create(question) {
    return fetch(`${baseUrl}questions.json`, {
      method: "POST",
      body: JSON.stringify(question),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        question.id = data.name;
        return question;
      })
      .then(addToLocalStorage)
      .then(Question.renderList);
  }

  static renderList() {
    const questions = getQuestionsFromLocalStorage();

    const html = questions.length
      ? questions.map(toCard).join("")
      : `<div class="mui--text-headline">You don't ask any question yet</div>`;

    const list = document.getElementById("list");
    list.innerHTML = html;
  }

  static fetch(token) {
    if (!token) {
      return Promise.resolve(`<p class="error">No token!</p>`);
    }
    return fetch(`${baseUrl}questions.json?auth=${token}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.error) {
          return `<p class="error">${data.error}</p>`;
        }
        return data
          ? Object.keys(data).map((key) => ({ ...data[key], id: key }))
          : [];
      });
  }

  static listToHTML(questions) {
    return questions.length > 0
      ? `<ol>${questions.map((q) => `<li>${q.text}</li>`).join("<br>")}</ol>`
      : "No questions yet";
  }
}

function addToLocalStorage(question) {
  const all = getQuestionsFromLocalStorage();
  all.push(question);
  localStorage.setItem("questions", JSON.stringify(all));
}

function getQuestionsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("questions") || "[]");
}

function toCard(itemQuestion) {
  return `
      <div class="mui--text-black-54">
        ${new Date(itemQuestion.date).toLocaleDateString()}
        ${new Date(itemQuestion.date).toLocaleTimeString()}
      </div>
      <div>
        ${itemQuestion.text}
      </div>
      <br />`;
}
