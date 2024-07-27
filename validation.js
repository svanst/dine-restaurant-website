const bookingForm = document.forms["booking"];
let showValidationFeedback = false;

const isEmpty = (input) => input.validity.valueMissing;
const isTypeMismatch = (input) => input.validity.typeMismatch;
const isBadInput = (input) => input.validity.badInput;
const isRangeUnderflow = (input) => input.validity.rangeUnderflow;
const isRangeOverflow = (input) => input.validity.rangeOverflow;
const isInvalidNumber = (input) =>
  isBadInput(input) || isRangeUnderflow(input) || isRangeOverflow(input);
const isFieldSet = (element) => element instanceof HTMLFieldSetElement;

export function validateName() {
  const { name } = bookingForm;

  if (isEmpty(name)) {
    name.setCustomValidity("This field is required");
  } else {
    name.setCustomValidity("");
  }

  setErrorMessage(name);
}

export function validateEmail() {
  const { email } = bookingForm;

  if (isEmpty(email)) {
    email.setCustomValidity("This field is required");
  } else if (isTypeMismatch(email)) {
    email.setCustomValidity("It looks like that's not an email");
  } else {
    email.setCustomValidity("");
  }

  setErrorMessage(email);
}

export function validateDate() {
  const { date: fieldset, month, day, year } = bookingForm;
  const inputs = [month, day, year];

  if (inputs.some(isEmpty)) {
    setFieldsetCustomValidity(fieldset, "This field is incomplete");
  } else if (inputs.some(isInvalidNumber)) {
    setFieldsetCustomValidity(fieldset, "Invalid date");
  } else if (isDateInPast()) {
    setFieldsetCustomValidity(fieldset, "Date cannot be in the past");
  } else {
    setFieldsetCustomValidity(fieldset, "");
  }

  setErrorMessage(fieldset);

  function isDateInPast() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(+year.value, +month.value - 1, +day.value);

    return selectedDate < today;
  }
}

export function validateTime() {
  const {
    time: fieldset,
    hour: hourInput,
    minute: minuteInput,
    meridien: meridienInput,
  } = bookingForm;
  const inputs = [hour, minute];

  if (inputs.some(isEmpty)) {
    setFieldsetCustomValidity(fieldset, "This field is incomplete");
  } else if (inputs.some(isInvalidNumber)) {
    setFieldsetCustomValidity(fieldset, "Invalid time");
  } else if (isTimeInPast()) {
    setFieldsetCustomValidity(fieldset, "Time cannot be in the past");
  } else {
    setFieldsetCustomValidity(fieldset, "");
  }

  setErrorMessage(fieldset);

  function isTimeInPast() {
    const meridien = meridienInput.value;
    const hours = +hourInput.value;
    const minutes = +minuteInput.value;

    const now = new Date();
    now.setSeconds(0, 0, 0);

    const selectedTime = new Date();

    if (meridien === "PM" && hours !== 12) {
      selectedTime.setHours(hours + 12, minutes, 0, 0);
    } else if (meridien === "AM" && hours === 12) {
      selectedTime.setHours(0, minutes, 0, 0);
    } else {
      selectedTime.setHours(hours, minutes, 0, 0);
    }

    return selectedTime < now;
  }
}

export function validateAll() {
  showValidationFeedback = true; // this makes sure validation feedback is only shown after the first time all fields are validated (usually on form submission), and not when the user interacts with the form for the first time
  validateName();
  validateEmail();
  validateDate();
  validateTime();
}

// when validation feedback applies to all elements in a fieldset, set the customValidity on all inputs inside the fieldset. This way, the :invalid / :valid pseudo-class is automatically updated for these inputs
function setFieldsetCustomValidity(fieldset, message) {
  const inputs = fieldset.querySelectorAll("input");
  inputs.forEach((input) => input.setCustomValidity(message));
}

function setErrorMessage(element) {
  if (!showValidationFeedback) return;
  getErrorTarget(element).textContent = getErrorMessage(element);

  function getErrorTarget(element) {
    const anchor = isFieldSet(element) ? element : element.parentNode;
    return anchor.querySelector(".error");
  }

  function getErrorMessage(element) {
    if (isFieldSet(element)) {
      const inputs = [...element.querySelectorAll("input")];
      const firstCustomValidationInput = inputs.find(
        (input) => input.validationMessage
      );

      return firstCustomValidationInput
        ? firstCustomValidationInput.validationMessage
        : "";
    } else {
      return element.validationMessage;
    }
  }
}
