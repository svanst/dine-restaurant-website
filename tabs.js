class Tabs {
  constructor(el) {
    this.el = el;
    this.tabs = el.querySelectorAll("[role=tab]");
    this.panels = [...el.querySelectorAll("[role=tabpanel]")];
    this.activeTabIndex = 0;
    // this.#addClickHandler();
    this.#addKeyHandlers();
  }

  #addKeyHandlers() {
    this.tabs.forEach((tab, i) => {
      tab.addEventListener("keydown", (e) => {
        if (!(e.key === "ArrowLeft" || e.key === "ArrowRight")) return;

        const currentTab = this.tabs[this.activeTabIndex];
        currentTab.setAttribute("aria-selected", "false");
        currentTab.setAttribute("tabindex", "-1");

        this.activeTabIndex =
          e.key === "ArrowLeft"
            ? Math.max(0, this.activeTabIndex - 1)
            : Math.min(this.tabs.length - 1, this.activeTabIndex + 1);

        const newTab = this.tabs[this.activeTabIndex];
        newTab.setAttribute("aria-selected", "true");
        newTab.setAttribute("tabindex", 0);
        newTab.focus();

        const newPanel = this.panels.find(
          (panel) => panel.id === newTab.getAttribute("aria-controls")
        );

        this.panels.forEach((panel) => {
          panel.hidden = true;
          panel.tabindex = -1;
        });

        newPanel.hidden = false;
      });
    });
  }
}

export default Tabs;
