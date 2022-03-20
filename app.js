"use strict";

const cardsContainer = document.getElementById("cards-section");

// Themes
const dark = document.getElementById("Dark-mode");
const body = document.getElementById("body");
const navCol = document.querySelector(".navigation-col");
const whereText = document.querySelector(".where");
const darkText = document.querySelector(".dark");
const searchInput = document.querySelector(".search-input");
const filterBtn = document.getElementById("dropdownMenuButton1");
const inputGroup = document.querySelector(".input-group");
const glass = document.querySelector(".fa-magnifying-glass");
const moon = document.querySelector(".fa-moon");

const url = "https://restcountries.com/v2/all";

let data = {};

// Dark and light theme

dark.addEventListener("click", switchDark);

searchInput.addEventListener("input", function (e) {
  let value = e.target.value;

  // currentCards.forEach((element) => {
  //   console.log(element);
  // });
});

// Switch to dark theme function

function switchDark() {
  body.classList.toggle("active");
  navCol.classList.toggle("active");
  whereText.classList.toggle("active");
  darkText.classList.toggle("active");
  searchInput.classList.toggle("active");
  filterBtn.classList.toggle("active");
  inputGroup.classList.toggle("active");
  glass.classList.toggle("active");

  switchThemeIcon();
}

// switch theme icon function

function switchThemeIcon() {
  moon.style.color = "white";
}

// API for cards functionality

//async fetch function

async function fetchCountry() {
  try {
    const response = await fetch(url);
    const country = await response.json();

    country.forEach((element) => {
      cardsContainer.insertAdjacentHTML("beforeend", createCard(element));
    });

    // cards

    const countryCards = document.querySelectorAll(".card");
    const cardsBody = document.querySelectorAll(".card-body");
    const title = document.querySelectorAll(".card-title");

    //cards search functionality

    let cards = [];

    console.log(cards);

    countryCards.forEach((element) => {
      const elementTitle = element.lastElementChild.children[0];

      cards.push(elementTitle);
    });

    searchInput.addEventListener("input", function (e) {
      let value = e.target.value;

      cards.forEach((card) => {
        const isVisible = card.innerText.includes(value);

        card.parentElement.parentElement.classList.toggle("hide", !isVisible);
      });
    });

    // cards title
    title.forEach((element) => {
      dark.addEventListener("click", function () {
        element.classList.toggle("active");
      });
    });
    // cards body
    cardsBody.forEach((element) => {
      dark.addEventListener("click", function () {
        element.classList.toggle("active");
      });
    });

    // search input filter
  } catch (error) {
    console.log(error);
  }
}

fetchCountry();

// create cards function

function createCard(element) {
  let title = element["name"];
  let flag = element["flag"];
  let population = element["population"];
  let region = element["region"];
  let capital = element["capital"];

  return `
    <div class="card shadow  mb-5 bg-white rounded">
                <div class="card-image">
                <img class="flag" src="${flag}" alt="Flag">
                </div>
                <div class="card-body">
                  <h5 class="card-title">${title}</h5>
                  <p class="card-text"><span>Population:</span> ${population}</p>
                  <p class="card-text"><span>Region:</span> ${region}</p>
                  <p class="card-text"><span>Capital:</span> ${capital}</p>
                </div>
              </div>
    `;
}
