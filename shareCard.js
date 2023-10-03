//Detect loading page
const loading = document.querySelector(".loading");
window.addEventListener("load", () => {
  setTimeout(() => {
    if (document.readyState == "complete") {
      loading.classList.add("loading--complete");
    }
  }, 1000);
});

const headerLinkTitle = document.querySelector(".header__link-title");
headerLinkTitle.addEventListener("click", () => {
  window.location.reload();
});

//ShareCard
const halloweenCardItems = document.querySelector(".halloween-card__items");
const halloweenCardButton = document.querySelector(".halloween-card__button");
const halloweenCardMessage = document.querySelector(".halloween-card__message");

halloweenCardButton.addEventListener("click", handleCLickHalloweenCardButton);
function handleCLickHalloweenCardButton() {
  halloweenCardItems.style.animation = "flyCard 1.5s ease forwards";
  halloweenCardButton.classList.add("hidden");
  halloweenCardMessage.classList.add("show-message");
  if (window.innerWidth < 766) {
    halloweenCardItems.classList.add("hidden");
  } else {
    halloweenCardItems.classList.remove("hidden");
  }
  console.log();
}
window.addEventListener("resize", () => {
  const checkHiddenButton =
    halloweenCardButton.classList.value.indexOf("hidden");
  if (window.innerWidth < 766 && checkHiddenButton != -1) {
    halloweenCardItems.classList.add("hidden");
  } else {
    halloweenCardItems.classList.remove("hidden");
    console.log("s");
  }
});
// animation: flyCard 1.5s ease forwards;
// .hidden-button
