class Select {
  /**
   * Creates an instance of Select and sets up interactivity via click and keyboard handlers.
   *
   * @constructor
   * @param {Element} selectEl - The DOM element that contains the elements with role=combobox and role=listbox.
   */
  constructor(selectEl) {
    this.selectEl = selectEl;
    this.combobox = selectEl.querySelector("[role=combobox]");
    this.listbox = selectEl.querySelector("[role=listbox]");
    this.options = selectEl.querySelectorAll("[role=option]");
    this.selectedIndex = 0;

    this.onClick = this.onClick.bind(this);
    this.onBlur = this.onBlur.bind(this);

    this.combobox.addEventListener("click", this.onClick);
    this.combobox.addEventListener("blur", this.onBlur);

    this.options.forEach((option) => {
      option.addEventListener("click", this.onClick);
      option.addEventListener("mousedown", this.onOptionMouseDown);
    });
    this.combobox.addEventListener("keydown", this.onKeyDown.bind(this));
  }

  get open() {
    return this.combobox.getAttribute("aria-expanded") === "true";
  }

  selectOption(selectedOption) {
    this.options.forEach((option, i) => {
      const selected = option === selectedOption;
      option.setAttribute("aria-selected", selected);
      if (selected) {
        this.selectedIndex = i;
        this.combobox.setAttribute("aria-activedescendant", selectedOption.id);
      }
    });
    this.updateDisplay();
    this.combobox.focus();
  }

  openListbox() {
    this.combobox.setAttribute("aria-expanded", true);
  }

  closeListbox() {
    this.combobox.setAttribute("aria-expanded", false);
  }

  toggleListbox() {
    this.combobox.setAttribute("aria-expanded", !this.open);
  }

  onOptionMouseDown(e) {
    e.preventDefault(); // prevent the blur event that happens when clicking on an option.
  }

  onClick(e) {
    console.log("click");
    if (e.currentTarget.matches('[role="option"]')) {
      this.selectOption(e.currentTarget);
    }
    this.toggleListbox();
  }

  onKeyDown(e) {
    const key = e.key;
    if (!["ArrowDown", "ArrowUp", "Tab", "Escape"].includes(key)) return;
    switch (key) {
      case "ArrowDown":
        this.selectedIndex = Math.min(
          this.selectedIndex + 1,
          this.options.length - 1
        );
        this.selectOption(this.options[this.selectedIndex]);
        e.preventDefault();
        break;
      case "ArrowUp":
        this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
        this.selectOption(this.options[this.selectedIndex]);
        e.preventDefault();
        break;
      case "Tab":
        if (this.open) {
          this.closeListbox();
          this.combobox.focus();
          e.preventDefault();
        }
        break;
      case "Escape":
        this.closeListbox();
        this.combobox.focus();
    }
  }

  onBlur(e) {
    this.closeListbox();
  }

  updateDisplay() {
    this.combobox.textContent = this.options[this.selectedIndex].textContent;
  }
}

export default Select;
