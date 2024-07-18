import Tabs from "./tabs";

const occasionsTablist = document.querySelector(".occasions [role=tablist]");

new Tabs(
  occasionsTablist,
  showRelatedImage.bind(null, document.querySelectorAll(".occasions__picture"))
);

updateTabsOrientation();
window.addEventListener("resize", updateTabsOrientation);

function showRelatedImage(imageList, tab) {
  imageList.forEach((image) => (image.hidden = true));
  document.getElementById(tab.dataset.img).hidden = false;
}

function updateTabsOrientation() {
  const screenWidth = window.innerWidth;

  const tabletMin = remToPx(getCSSCustomProperty("--small"));
  const tabletMax = remToPx(getCSSCustomProperty("--medium"));

  if (screenWidth >= tabletMin && screenWidth < tabletMax) {
    occasionsTablist.setAttribute("aria-orientation", "vertical");
  } else {
    occasionsTablist.setAttribute("aria-orientation", "horizontal");
  }

  function getCSSCustomProperty(propertyName) {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(propertyName)
      .trim();
  }

  function remToPx(rem) {
    const remValue = parseFloat(rem);
    const fontSize = parseFloat(
      getComputedStyle(document.documentElement).fontSize
    );
    return remValue * fontSize;
  }
}
