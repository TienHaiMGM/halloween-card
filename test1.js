let chooseCard = document.querySelector(".choose-card");
let imageCard = document.querySelectorAll(".image-card");
let clones = [];
let disableScroll = false;
let scrollHeight = 0;
let scrollPos = 0;
let cloneHeight = 0;

function getScrollPos() {
  return chooseCard.scrollTop;
}
function setScrollPos(pos) {
  chooseCard.scrollTop = pos;
}
function getCloneHeight() {
  cloneHeight = 0;
  clones.forEach((clone) => {
    cloneHeight += clone.offsetHeight;
  });
  console.log(clones);
}

function reCalc() {
  scrollPos = getScrollPos();
  scrollHeight = chooseCard.scrollHeight;
  cloneHeight = getCloneHeight();

  if (scrollPos <= 0) {
    setScrollPos(1);
  }
}
function scrollUpdate() {
  if (!disableScroll) {
    scrollPos = getScrollPos();
    if (cloneHeight + scrollPos >= scrollHeight) {
      setScrollPos(1);
      disableScroll = true;
    } else if (scrollPos <= 0) {
      setScrollPos(scrollHeight - cloneHeight);
      disableScroll = true;
    }
  }
  if (disableScroll) {
    window.setTimeout(() => {
      disableScroll = false;
    }, 40);
  }
}

function onLoad() {
  imageCard.forEach((item) => {
    const clone = item.cloneNode(true);
    chooseCard.appendChild(clone);
    clone.classList.add("image-card");
  });

  clones = chooseCard.querySelectorAll(".image-card");

  reCalc();
  chooseCard.addEventListener(
    "scroll",
    () => {
      window.requestAnimationFrame(scrollUpdate);
    },
    false
  );
  window.addEventListener(
    "resize",
    () => {
      window.requestAnimationFrame(reCalc);
    },
    false
  );
}

window.onLoad = onLoad();
