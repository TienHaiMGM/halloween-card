"use strict";

const audioControl = document.querySelector(".audio-control");
const homeLink = document.querySelector(".home__link");
homeLink.addEventListener("mouseover", handleMouseover);
homeLink.addEventListener("mouseout", handleMouseout);
function handleMouseover() {
  audioControl.play();
  audioControl.currentTime = 1;
}
function handleMouseout() {
  audioControl.pause();
  homeLink.currentTime = 0;
}

const wrapIcon = document.querySelector(".wrap__icon");
const wrapIconMuteMusic = document.querySelector(".wrap__icon-mute-music");
wrapIcon.addEventListener("click", handleToggleVolume);
function handleToggleVolume() {
  if (wrapIconMuteMusic.className.includes("active-mute-music")) {
    wrapIconMuteMusic.classList.remove("active-mute-music");
    audioControl.muted = false;
  } else {
    wrapIconMuteMusic.classList.add("active-mute-music");
    audioControl.muted = true;
  }
  console.log(audioControl.muted);
}

// Card
const container = document.querySelector("#items-container");

let startY;
let startX;
let scrollLeft;
let scrollTop;
let isDown;

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
    //Move vertcally
    const y = e.pageY - container.offsetTop;
    const walkY = y - startY;
    container.scrollTop = scrollTop - walkY;
    //Move Horizontally
    const x = e.pageX - container.offsetLeft;
    const walkX = x - startX;
    container.scrollLeft = scrollLeft - walkX;
  }
}
