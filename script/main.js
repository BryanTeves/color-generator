const containerCor = document.querySelector(".main__btn");
const main = document.querySelector(".color");
const copy = document.querySelector(".copy");
const colorTab = document.querySelector(".user-color");
const overlay = document.querySelector(".overlay");
const body = document.querySelector("body");
const userColor = document.querySelector(".user-color__input");
const userColorContainer = document.querySelector(".create-color");

const hide = function () {
  colorTab.classList.add("hidden");
  overlay.classList.add("display");
};

const show = function () {
  colorTab.classList.remove("hidden");
  overlay.classList.remove("display");
};

const time = function () {
  setTimeout(() => {
    copy.classList.add("hidden");
  }, "500");
};

containerCor.addEventListener("click", function (e) {
  const clicked = e.target.closest(".btn");

  if (!clicked) return;

  if (clicked.dataset.btn == 1) {
    for (let i = 0; i < 5; i++) {
      main.insertAdjacentHTML(
        "beforeend",
        `<div class="color__content data-color--${i}" style="background-color: rgb(${Math.trunc(
          Math.random() * 256
        )}, ${Math.trunc(Math.random() * 256)}, ${Math.trunc(
          Math.random() * 256
        )}) ;" ></div>`
      );
    }
  }
  const colorContent = document.querySelectorAll(".color__content");

  if (clicked.dataset.btn == 2) {
    show();
  }

  if (clicked.dataset.btn == 3) {
    colorContent.forEach((color) => color.remove());
  }
});

main.addEventListener("click", function (e) {
  const colorNumber = e.target.closest(".color__content");

  if (!colorNumber) return;

  navigator.clipboard.writeText(colorNumber.style["backgroundColor"]);
  copy.classList.remove("hidden");

  time();
});

colorTab.addEventListener("click", function (e) {
  e.preventDefault();
  const clickedColor = e.target.closest(".btn");

  if (!clickedColor) return;

  if (
    !CSS.supports("color", userColor.value) &&
    clickedColor.dataset.btn == 4
  ) {
    alert("Insira uma cor válida");
  } else if (clickedColor.dataset.btn == 4) {
    console.log(userColor.value);
    userColorContainer.insertAdjacentHTML(
      "beforeend",
      `<div class="color__content color__content--user" style="background-color:${userColor.value} ;" ></div>`
    );

    hide();
  }

  if (clickedColor.dataset.btn == 5) {
    hide();
  }
});

body.addEventListener("keydown", function (e) {
  if (!colorTab.classList.contains("hidden") && e.keyCode == 27) {
    hide();
  }
});

overlay.addEventListener("click", hide);

userColorContainer.addEventListener("click", function (e) {
  const getColor = e.target.closest(".color__content--user");

  if (!getColor) return;

  navigator.clipboard.writeText(getColor.style["backgroundColor"]);
  copy.classList.remove("hidden");

  time();
});
