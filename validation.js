const bookingForm = document.forms["booking"];
let setValidationMessages = false;

const isEmpty = (input) => input.validity.valueMissing;
const isTypeMismatch = (input) => input.validity.typeMismatch;
const isBadInput = (input) => input.validity.badInput;
const isRangeUnderflow = (input) => input.validity.rangeUnderflow;
const isRangeOverflow = (input) => input.validity.rangeOverflow;
const isValid = (input) => input.validity.valid && input.matches(":valid"); // extra check needed to be able to check if fieldsets are valid

export function validateName() {
  const { name } = bookingForm;

  if (isValid(name)) {
    clearErrorForInput(name);
  } else if (isEmpty(name)) {
    setErrorForInput(name, "This field is required");
  }
}

export function validateEmail() {
  const { email } = bookingForm;

  if (isValid(email)) {
    clearErrorForInput(email);
  } else if (isEmpty(email)) {
    setErrorForInput(email, "This field is required");
  } else if (isTypeMismatch(email)) {
    setErrorForInput(email, "It looks like that's not an email");
  }
}

export function validateDate() {
  const { date: fieldset, month, day, year } = bookingForm;
  const inputs = [month, day, year];

  if (isInPast(+year.value, +month.value, +day.value)) {
    setErrorForFieldset(fieldset, "Date can not be in the past");
    return;
  }

  if (isValid(fieldset)) {
    clearErrorForFieldset(fieldset);
  } else if (inputs.some(isEmpty)) {
    setErrorForFieldset(fieldset, "This field is incomplete");
  } else if (
    inputs.some(
      (input) =>
        isBadInput(input) || isRangeUnderflow(input) || isRangeOverflow(input)
    )
  ) {
    setErrorForFieldset(fieldset, "Invalid date");
  }

  function isInPast(year, month, day) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(year, month - 1, day);

    return selectedDate < today;
  }
}

export function validateTime() {
  const { time: fieldset, hour, minute } = bookingForm;
  const inputs = [hour, minute];

  if (isValid(fieldset)) {
    clearErrorForFieldset(fieldset);
  } else if (inputs.some(isEmpty)) {
    setErrorForFieldset(fieldset, "This field is incomplete");
  } else if (
    inputs.some(
      (input) =>
        isBadInput(input) || isRangeUnderflow(input) || isRangeOverflow(input)
    )
  ) {
    setErrorForFieldset(fieldset, "Invalid time");
  }
}

export function validateAll() {
  setValidationMessages = true;
  validateName();
  validateEmail();
  validateDate();
  validateTime();
}

const clearErrorForInput = (input) => setErrorForInput(input, "");
const clearErrorForFieldset = (fieldset) => setErrorForFieldset(fieldset, "");

function setErrorForInput(input, message) {
  if (!setValidationMessages) return;
  const { nextElementSibling: errorTarget } = input;
  if (!errorTarget.classList.contains("error")) return;

  errorTarget.textContent = message;
}

function setErrorForFieldset(fieldset, message) {
  if (!setValidationMessages) return;
  const errorTarget = fieldset.querySelector(".error");
  errorTarget.textContent = message;
}
