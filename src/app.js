import "./css/style.css";
import { Question } from "./question";
import { isValid, createModal } from "./utils";
import { getAuthForm, authWithEmailAndPassword } from "./auth";

const form = document.getElementById("form");
const input = form.querySelector("#question-input");
const submitBtn = form.querySelector("#submit");
const modalBtn = document.getElementById("modal-btn");

window.addEventListener("load", Question.renderList);
form.addEventListener("submit", submitFormHandler);
input.addEventListener("input", () => {
  submitBtn.disabled = !isValid(input.value);
});
modalBtn.addEventListener("click", openModal);

function submitFormHandler(e) {
  e.preventDefault();

  if (isValid(input.value)) {
    const question = {
      text: input.value.trim(),
      date: new Date().toJSON(),
    };
    submitBtn.disabled = true;

    // Async req to ser to save question
    Question.create(question);

    input.value = "";
    input.className = "";
    submitBtn.disabled = false;
  }
}

function openModal() {
  createModal("Login", getAuthForm());
  document
    .getElementById("auth-form")
    .addEventListener("submit", authFormHandler, { once: true });
}

function authFormHandler(e) {
  e.preventDefault();

  const email = e.target.querySelector("#email").value;
  const password = e.target.querySelector("#password").value;
  const btn = e.target.querySelector("button");

  btn.disabled = true;
  authWithEmailAndPassword(email, password)
    .then(Question.fetch)
    .then(renderModalAfterAuth)
    .then(() => (btn.disabled = false));
}

function renderModalAfterAuth(content) {
  if (typeof content === "string") {
    createModal("Error!", content);
  } else {
    createModal("Questions list", Question.listToHTML(content));
  }
}
