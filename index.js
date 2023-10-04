"use strict";
//oj save value
const oj = {
  image: "",
  title: "",
  message: "",
  from: "",
};
function setOj(name, value) {
  oj[name] = value;
}

//Detect loading page and load after 2s
const loading = document.querySelector(".loading");
window.addEventListener("load", () => {
  setTimeout(() => {
    if (document.readyState == "complete") {
      loading.classList.add("loading--complete");
    }
  }, 2000);
});

const headerLinkTitle = document.querySelector(".header__link-title");
headerLinkTitle.addEventListener("click", () => {
  window.location.reload();
});

// Handle audio
const audioControl = document.querySelector(".audio-control");
const homeLink = document.querySelector(".home__link");
homeLink.addEventListener("mouseover", handleMouseoverHomeLink);
homeLink.addEventListener("mouseout", handleMouseoutHomeLink);
function handleMouseoverHomeLink() {
  audioControl.play();
  audioControl.currentTime = 1;
}
function handleMouseoutHomeLink() {
  audioControl.pause();
  homeLink.currentTime = 0;
}
//Handle Music
const musicControl = document.querySelector(".music-control");
homeLink.addEventListener("click", handleClickHomeLink);
function handleClickHomeLink() {
  musicControl.play();
}

// Handle volume
const wrapIcon = document.querySelector(".wrap__icon");
const wrapIconMuteMusic = document.querySelector(".wrap__icon-mute-music");
wrapIcon.addEventListener("click", handleToggleVolume);
function handleToggleVolume() {
  if (wrapIconMuteMusic.className.includes("active-mute-music")) {
    wrapIconMuteMusic.classList.remove("active-mute-music");
    audioControl.muted = false;
    musicControl.muted = false;
  } else {
    wrapIconMuteMusic.classList.add("active-mute-music");
    audioControl.muted = true;
    musicControl.muted = true;
  }
}

// Handle Drag Card
const handleDragCard = () => {
  let startY;
  let startX;
  let scrollLeft;
  let scrollTop;
  let isDown;
  const container = document.querySelector("#items-container");
  container.addEventListener("mousedown", (e) => mouseIsDown(e));
  container.addEventListener("mouseup", (e) => mouseUp(e));
  container.addEventListener("mouseleave", (e) => mouseLeave(e));
  container.addEventListener("mousemove", (e) => mouseMove(e));
  function mouseIsDown(e) {
    isDown = true;
    startY = e.pageY - container.offsetTop;
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
    scrollTop = container.scrollTop;
    container.classList.add("grabbing");
  }
  function mouseUp(e) {
    isDown = false;
    container.classList.remove("grabbing");
  }
  function mouseLeave(e) {
    isDown = false;
  }
  function mouseMove(e) {
    if (isDown) {
      e.preventDefault();
      //Move vertically
      const y = e.pageY - container.offsetTop;
      const walkY = y - startY;
      container.scrollTop = scrollTop - walkY;
      //Move Horizontally
      const x = e.pageX - container.offsetLeft;
      const walkX = x - startX;
      container.scrollLeft = scrollLeft - walkX;
    }
  }
};
handleDragCard();

// Infinite Scrolling Effect
const images = [
  "./image/halloween-card-1.png",
  "./image/halloween-card-2.png",
  "./image/halloween-card-3.png",
  "./image/halloween-card-4.png",
  "./image/halloween-card-5.png",
  "./image/halloween-card-6.png",
  "./image/halloween-card-7.png",
  "./image/halloween-card-8.png",
  "./image/halloween-card-9.png",
  "./image/halloween-card-10.png",
  "./image/halloween-card-11.png",
  "./image/halloween-card-12.png",
  "./image/halloween-card-13.png",
  "./image/halloween-card-14.png",
  "./image/halloween-card-15.png",
  "./image/halloween-card-16.png",
  "./image/halloween-card-17.png",
  "./image/halloween-card-18.png",
  "./image/halloween-card-19.png",
  "./image/halloween-card-20.png",
];
function createImageElement(img) {
  const imgEl = document.createElement("img");
  imgEl.setAttribute("src", img);
  imgEl.setAttribute("alt", "halloween card");
  imgEl.classList.add("image-card");
  return imgEl;
}
function createLinkElement(link) {
  const linkEl = document.createElement("a");
  linkEl.setAttribute("href", link);
  linkEl.classList.add("item-card");
  return linkEl;
}

const chooseCard = document.querySelector(".choose-card");
chooseCard.addEventListener("scroll", handleScrollCard);

function handleScrollCard() {
  // scroll top to end
  const viewportHeight = chooseCard.clientHeight;
  const scrolledTop = chooseCard.scrollTop;
  const pageHeight = chooseCard.scrollHeight;
  const scrolledTopToEnd = scrolledTop + viewportHeight >= pageHeight - 50;
  // console.log(scrolledTopToEnd, viewportHeight, scrolledTop, pageHeight);
  if (scrolledTopToEnd) {
    for (let i = 0; i < images.length; i++) {
      chooseCard
        .appendChild(createLinkElement("#card-selected"))
        .appendChild(createImageElement(images[i]));
    }
  }
  // scroll left to end
  const viewportWidth = chooseCard.clientWidth;
  const scrolledLeft = chooseCard.scrollLeft;
  const pageWidth = chooseCard.scrollWidth;
  const scrolledLeftToEnd = scrolledLeft + viewportWidth >= pageWidth;

  if (scrolledLeftToEnd) {
    for (let i = 0; i < images.length; i++) {
      chooseCard
        .appendChild(createLinkElement("#card-selected"))
        .appendChild(createImageElement(images[i]));
    }
  }

  //preventDefault event link when scrolling
  let linkChooseCard = document.querySelectorAll(".item-card");
  for (let item of linkChooseCard) {
    item.addEventListener("click", handleClickLinkChooseCard);
    setTimeout(() => {
      item.removeEventListener("click", handleClickLinkChooseCard);
    }, 100);
  }
  function handleClickLinkChooseCard(event) {
    event.preventDefault();
  }

  //transmit data to card-selected in scroll
  let itemsCard = document.querySelectorAll(".item-card");
  for (let item of itemsCard) {
    item.addEventListener("click", (item) => handleClickItemsCard(item));
  }
}

//transmit data to card-selected
let itemsCard = document.querySelectorAll(".item-card");
for (let item of itemsCard) {
  item.addEventListener("click", (item) => handleClickItemsCard(item));
}

const exitToBack = document.querySelector(".exit-to-back");
exitToBack.addEventListener("click", () => {
  exitToBack.classList.remove("showButton");
});
function handleClickItemsCard(item) {
  const srcImage = item.target.getAttribute("src");
  cardSelectedImage.setAttribute("src", srcImage);
  document.querySelector(".number-card__first").innerText =
    images.indexOf(srcImage) + 1;
  setOj("image", srcImage);

  // show exitToBack

  exitToBack.classList.add("showButton");
}

//Selected Card
const cardSelectedItems = document.querySelector(".card-selected__items");
const cardSelectedImage = document.querySelector(".card-selected__image");
const nextButton = document.querySelector(".wrap__next-button");
const backButton = document.querySelector(".wrap__back-button");

nextButton.addEventListener("click", handleClickNextButton);
backButton.addEventListener("click", handleClickBackButton);
function handleClickNextButton() {
  let numberCardFirst = parseInt(
    document.querySelector(".number-card__first").innerText
  );
  if (numberCardFirst < 20) {
    ++numberCardFirst;
  } else {
    numberCardFirst = 1;
  }
  document.querySelector(".number-card__first").innerText = numberCardFirst;
  cardSelectedImage.setAttribute(
    "src",
    `./image/halloween-card-${numberCardFirst}.png`
  );
}
function handleClickBackButton() {
  let numberCardFirst = parseInt(
    document.querySelector(".number-card__first").innerText
  );
  if (numberCardFirst > 1) {
    --numberCardFirst;
  } else {
    numberCardFirst = 20;
  }
  document.querySelector(".number-card__first").innerText = numberCardFirst;
  cardSelectedImage.setAttribute(
    "src",
    `./image/halloween-card-${numberCardFirst}.png`
  );
}

//Handle Input Message Card
const messageCardInput = document.querySelectorAll(".message-card__input");
for (let item of messageCardInput) {
  item.addEventListener("input", (event) => handleOnInputMessage(event));
}
function handleOnInputMessage(event) {
  event.target.setAttribute("value", event.target.value); // assign value for Attribute value of input

  //Update length of text which you typing
  const parentElementLabel = event.target.parentElement;
  const spanLimitedText = parentElementLabel.children[0];
  const currentLengthText = event.target.value.length;
  const maxLength = event.target.getAttribute("maxlength");
  spanLimitedText.innerText = `${currentLengthText} / ${maxLength}`;

  const nameInput = event.target.getAttribute("name");
  setOj(nameInput, event.target.value);
}

//Query URL
function getUrlParams() {
  const url = "http://127.0.0.1:5173/shareCard/shareCard.html?";
  const params = new URLSearchParams(oj);
  const queryString = params.toString();
  return url + queryString;
}
const messageCardLink = document.querySelector(".message-card__link");
messageCardLink.addEventListener("click", () => {
  //Navigate link with param
  messageCardLink.setAttribute("href", getUrlParams());
  window.open(getUrlParams());

  //Mute music
});

//Copy URL
const messageCardButtonCopyLink = document.querySelector(
  ".message-card__button--copy-link"
);
const messageCardButtonLinkCopied = document.querySelector(
  ".message-card__button--link-copied"
);
messageCardButtonCopyLink.addEventListener("click", () => {
  navigator.clipboard.writeText(getUrlParams());
  messageCardButtonCopyLink.classList.add("hiddenButton");
  messageCardButtonLinkCopied.classList.add("showButton");
  setTimeout(() => {
    messageCardButtonCopyLink.classList.remove("hiddenButton");
    messageCardButtonLinkCopied.classList.remove("showButton");
  }, 2000);
});

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

//Hidden Choose Card Instruct when click

function hiddenChooseCardInstruct() {
  const chooseCardInstructWrap = document.querySelector(
    ".choose-card__instruct-wrap"
  );
  chooseCardInstructWrap.addEventListener("mousedown", () => {
    if (chooseCardInstructWrap.classList.value.indexOf("hiddenButton") == -1) {
      chooseCardInstructWrap.classList.add("hiddenButton");
    }
  });
}
hiddenChooseCardInstruct();

//Momentum Horizontal Drag
/*
const slider = document.querySelector(".choose-card");
let isDown = false;
let startXSlider;
let startYSlider;
let scrollLeftSlider;
let scrollTopSlider;
let velX = 0;
let velY = 0;
let momentumID;

slider.addEventListener("mousedown", (e) => {
  isDown = true;
  startXSlider = e.pageX - slider.offsetLeft;
  startYSlider = e.pageY - slider.offsetTop;
  scrollLeftSlider = slider.scrollLeft;
  scrollTopSlider = slider.scrollTop;
  cancelMomentumTracking();
  console.log(
    "test",
    startXSlider,
    startYSlider,
    scrollLeftSlider,
    scrollTopSlider
  );
});

slider.addEventListener("mouseleave", () => {
  isDown = false;
});

slider.addEventListener("mouseup", () => {
  isDown = false;
  beginMomentumTracking();
});

slider.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const y = e.pageY - slider.offsetTop;
  const walkX = (x - startXSlider) * 1.2; //scroll-fast
  const walkY = (y - startYSlider) * 1.2;
  const prevScrollLeft = slider.scrollLeft;
  const preScrollTop = slider.scrollTop;
  slider.scrollLeft = scrollLeftSlider - walkX;
  slider.scrollTop = scrollTopSlider - walkY;
  velX = slider.scrollLeft - prevScrollLeft;
  velY = slider.scrollTop - preScrollTop;

  console.log(
    prevScrollLeft,
    preScrollTop,
    slider.scrollLeft,
    slider.scrollTop,
    velX,
    velY
  );
});

// Momentum

slider.addEventListener("wheel", (e) => {
  console.log("ssdfsfsf");
  cancelMomentumTracking();
});

function beginMomentumTracking() {
  cancelMomentumTracking();
  momentumID = requestAnimationFrame(momentumLoop);
}
function cancelMomentumTracking() {
  cancelAnimationFrame(momentumID);
}
function momentumLoop() {
  slider.scrollLeft += velX;
  slider.scrollTop += velY;
  velX *= 0.9;
  velY *= 0.9;
  console.log("s", velX, velY);
  if (Math.abs(velX) > 0.5) {
    momentumID = requestAnimationFrame(momentumLoop);
  }
}
*/

//Prevent Default Key Tab
// const bodyTag = document.getElementsByTagName("body");
// const inputTypeText = document.querySelectorAll("input[type='text']");
// const linkTag = document.querySelectorAll("a");
// const buttonTag = document.querySelectorAll("button");

// for (let item of buttonTag) {
//   item.setAttribute("tabindex", "-1");
// }
// for (let item of linkTag) {
//   item.setAttribute("tabindex", "-1");
// }

//Detect when user leaves page
// window.addEventListener("visibilitychange", (event) =>
//   handleVisibilitychange(event)
// );
// function handleVisibilitychange(event) {
//   if (document.visibilityState === "visible") {
//     musicControl.play();
//   } else {
//     musicControl.pause();
//   }
// }
