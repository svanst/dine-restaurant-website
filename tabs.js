class Tabs {
  /**
   * Creates an instance of Tabs and sets up interactivity via click and keyboard handlers.
   *
   * @constructor
   * @param {Element} tabListEl - The DOM element representing the list of tabs (with role=tablist).
   * @param {function} [cb] - Optional callback function to perform extra work upon tab selection (other than activating the tab and corresponding tab panels).
   */
  constructor(tabListEl, cb) {
    this.tabListEl = tabListEl;
    this.tabs = tabListEl.querySelectorAll("[role=tab]");
    this.activeTabIndex = 0;
    this.panels = [];
    this.cb = cb;

    this.tabs.forEach((tab) => {
      const panel = document.getElementById(tab.getAttribute("aria-controls"));
      this.panels.push(panel);

      tab.addEventListener("keydown", this.#onKeydown.bind(this));
      tab.addEventListener("click", this.#onClick.bind(this));
    });
  }

  #onKeydown(e) {
    const key = e.key;
    const isHorizontal =
      this.tabListEl.getAttribute("aria-orientation") === "horizontal";
    const horizontalKeys = ["ArrowLeft", "ArrowRight"];
    const verticalKeys = ["ArrowUp", "ArrowDown"];

    if (
      (isHorizontal && !horizontalKeys.includes(key)) ||
      (!isHorizontal && !verticalKeys.includes(key))
    )
      return;

    if (key === "ArrowLeft" || key === "ArrowUp") {
      this.#previous();
    } else {
      this.#next();
    }
    e.preventDefault();
  }

  #onClick({ currentTarget }) {
    this.#select(currentTarget);
  }

  #select(newTab) {
    this.tabs.forEach((tab, i) => {
      if (tab === newTab) {
        tab.setAttribute("aria-selected", true);
        tab.setAttribute("tabindex", 0);
        tab.focus();
        this.panels[i].hidden = false;
      } else {
        tab.setAttribute("aria-selected", false);
        tab.setAttribute("tabindex", -1);
        this.panels[i].hidden = true;
      }
    });
    this.cb?.(newTab);
  }

  #previous() {
    this.activeTabIndex = Math.max(this.activeTabIndex - 1, 0);
    this.#select(this.tabs[this.activeTabIndex]);
  }

  #next() {
    this.activeTabIndex = Math.min(
      this.activeTabIndex + 1,
      this.tabs.length - 1
    );
    this.#select(this.tabs[this.activeTabIndex]);
  }
}

export default Tabs;
