import Select from "./select.js";

import {
  validateName,
  validateEmail,
  validateDate,
  validateTime,
  validateAll,
} from "./validation.js";

const form = document.forms["booking"];
const numPeople = {
  decrease: document.querySelector("#decrease"),
  increase: document.querySelector("#increase"),
  input: form.numPeople,
  display: document.querySelector("#numPeopleDisplay"),
};

updateNumPeopleDisplay();

numPeople.decrease.addEventListener("click", decreaseNumPeople);
numPeople.increase.addEventListener("click", increaseNumPeople);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (e.target.checkValidity()) {
    alert(
      "Thank you for your reservation. We look forward to serving you and making your experience enjoyable."
    );
    return;
  }

  validateAll();
  e.target.classList.add("was-validated");
});

const { name, email, month, day, year, hour, minute, meridien } = form;

month.addEventListener("change", prependZero);
day.addEventListener("change", prependZero);
hour.addEventListener("change", prependZero);
minute.addEventListener("change", prependZero);

meridien.addEventListener("change", validateTime);
name.addEventListener("input", validateName);
email.addEventListener("input", validateEmail);

[month, day, year].forEach((input) =>
  input.addEventListener("input", validateDate)
);

[hour, minute].forEach((input) =>
  input.addEventListener("input", validateTime)
);

const select = new Select(
  document.querySelector(".custom-select"),
  (option) => {
    meridien.value = option.dataset.value;
    meridien.dispatchEvent(new Event("change"));
  }
);

function increaseNumPeople() {
  form.numPeople.value = Math.min(+form.numPeople.value + 1, 20);
  updateNumPeopleDisplay();
}

function decreaseNumPeople() {
  form.numPeople.value = Math.max(+form.numPeople.value - 1, 1);
  updateNumPeopleDisplay();
}

function updateNumPeopleDisplay() {
  numPeople.display.textContent = `${numPeople.input.value} people`;
}

function prependZero(e) {
  if (e.target.value.length === 1) {
    e.target.value = "0" + e.target.value;
  }
}
