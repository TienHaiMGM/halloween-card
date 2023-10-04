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
  //Play music
  const musicControl = document.querySelector(".music-control");
  musicControl.play();
  //animation flycard
  halloweenCardItems.style.animation = "flyCard 1.5s ease forwards";
  //Hidden and how message
  halloweenCardButton.classList.add("hidden");
  halloweenCardMessage.classList.add("show-message");
  //Hidden and show image
  if (window.innerWidth < 766) {
    halloweenCardItems.classList.add("hidden");
  } else {
    halloweenCardItems.classList.remove("hidden");
  }
}
//Handle when resize screen
window.addEventListener("resize", () => {
  const checkHiddenButton =
    halloweenCardButton.classList.value.indexOf("hidden");
  if (window.innerWidth < 766 && checkHiddenButton != -1) {
    halloweenCardItems.classList.add("hidden");
  } else {
    halloweenCardItems.classList.remove("hidden");
  }
});

//Get value message through query params
const paramsSearch = window.location.search;
const urlParams = new URLSearchParams(paramsSearch);
const oj = {
  image: urlParams.get("image"),
  title: urlParams.get("title"),
  message: urlParams.get("message"),
  from: urlParams.get("from"),
};
const halloweenCardMessageTitle = document.querySelector(
  ".halloween-card__message-title"
);
const halloweenCardMessageContent = document.querySelector(
  ".halloween-card__message-content"
);
const halloweenCardMessageFrom = document.querySelector(
  ".halloween-card__message-from"
);

halloweenCardMessageTitle.innerHTML = oj["title"];
halloweenCardMessageContent.innerHTML = oj["message"];
halloweenCardMessageFrom.innerHTML = `From: ${oj["from"]}`;

//Create image
function createImageElement(img) {
  const imgEl = document.createElement("img");
  imgEl.setAttribute("src", img);
  imgEl.setAttribute("alt", "halloween card");
  imgEl.classList.add("halloween-card__image");
  return imgEl;
}
halloweenCardItems.appendChild(createImageElement(`.${oj["image"]}`));

// Handle volume

const wrapIcon = document.querySelector(".wrap__icon");
wrapIcon.addEventListener("click", handleToggleVolume);
function handleToggleVolume() {
  const musicControl = document.querySelector(".music-control");
  const wrapIconMuteMusic = document.querySelector(".wrap__icon-mute-music");
  if (wrapIconMuteMusic.className.includes("active-mute-music")) {
    wrapIconMuteMusic.classList.remove("active-mute-music");
    musicControl.muted = false;
  } else {
    wrapIconMuteMusic.classList.add("active-mute-music");
    musicControl.muted = true;
  }
}

//Share Link Social
const linkURL = "http://127.0.0.1:5173";
const messageText = encodeURIComponent(
  "Happy Halloween Day, Ready For Trick Or Treat"
);
const titleShareLink = encodeURIComponent("Create Halloween Card");

const facebookLink = document.querySelector(".icon-facebook");
facebookLink.href = `https://www.facebook.com/share.php?u=${linkURL}&title=${titleShareLink}`;
const twitterLink = document.querySelector(".icon-twitter");
twitterLink.href = `https://twitter.com/intent/tweet?&url=${linkURL}&text=${messageText}&via=HalloweenCard
`;
const linkedinLink = document.querySelector(".icon-linkedin");
linkedinLink.href = `https://www.linkedin.com/sharing/share-offsite/?url=${linkURL}`;
