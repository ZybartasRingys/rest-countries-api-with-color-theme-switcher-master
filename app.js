"use strict";

const cardsContainer = document.getElementById("cards-section");
const dark = document.getElementById("Dark-mode");
const body = document.getElementById("body");
const navCol = document.querySelector(".navigation-col");
const whereText = document.querySelector(".where");
const darkText = document.querySelector(".dark");
const searchInput = document.querySelector(".search-input");
const filterBtn = document.getElementById("dropdownMenuButton1");
const dropDownMenu = document.querySelector(".dropdown-menu");
const menuItem = document.querySelectorAll(".dropdown-item");
const navigation = document.querySelector("navigation");
const inputGroup = document.querySelector(".input-group");
const glass = document.querySelector(".fa-magnifying-glass");
const moon = document.querySelector(".fa-moon");
const navRow = document.querySelector(".nav-row");
const all = document.querySelector(".all");
const searchIcon = document.querySelector(".fa-magnifying-glass");

const url =
  "https://restcountries.com/v2/alpha?codes=DEU,USA,BRA,ISL,AFG,ALA,ALB,DZA";

// Dark and light theme

dark.addEventListener("click", switchDark);

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
  dropDownMenu.classList.toggle("active");
  navRow.classList.toggle("active");
  all.classList.toggle("active");
  moon.classList.toggle("active");

  // dark mode text

  if (dark.innerText === "Dark Mode") {
    dark.innerText = "Light Mode";
  } else if (dark.innerText === "Light Mode") {
    dark.innerText = "Dark Mode";
  } else {
    dark.innerText = "Light Mode";
  }

  menuItem.forEach((item) => {
    item.classList.toggle("active");
  });
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
    const cardText = document.querySelectorAll(".card-text");
    const cardIMG = document.querySelectorAll(".card-image");

    // cards title dark light theme
    title.forEach((element) => {
      dark.addEventListener("click", function () {
        element.classList.toggle("active");
      });
    });
    // cards body dark light theme
    cardText.forEach((element) => {
      dark.addEventListener("click", function () {
        element.classList.toggle("active");
      });
    });

    cardIMG.forEach((element) => {
      dark.addEventListener("click", function () {
        element.classList.toggle("active");
      });
    });

    cardsBody.forEach((element) => {
      dark.addEventListener("click", function () {
        element.classList.toggle("active");
      });
    });

    //cards search functionality

    let cardsTitle = [];

    countryCards.forEach((element) => {
      const elementTitle = element.lastElementChild.children[0];

      cardsTitle.push(elementTitle);
    });

    searchInput.addEventListener("input", function (e) {
      let value = e.target.value;

      cardsTitle.forEach((card) => {
        const isVisible = card.innerText.includes(value);
        card.parentElement.parentElement.classList.toggle("hide", !isVisible);
      });
    });

    // filter by region fuction

    menuItem.forEach((item) => {
      item.addEventListener("click", function () {
        let region = item.innerText;

        cardsBody.forEach((card) => {
          const regionValue = card.childNodes[5].innerText;

          const isIncludes = regionValue.includes(region);

          card.parentElement.classList.toggle("hide", !isIncludes);
        });
      });
    });

    // back to all countries functionality
    all.addEventListener("click", function () {
      countryCards.forEach((element) => {
        if (element.classList.contains("hide")) {
          element.classList.remove("hide");
        }
      });
    });

    //
    countryCards.forEach((countryCard) => {
      countryCard.addEventListener("click", function (e) {
        let cardTitle =
          e.currentTarget.childNodes[3].children[0].innerText.replace(
            /\s/g,
            ""
          );

        window.location = `/pages/${cardTitle}.html`;
      });
    });
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
                  <h5 class="card-title mb-4">${title}</h5>
                  <p class="card-text"><span>Population:</span> ${population}</p>
                  <p class="card-text"><span>Region:</span> ${region}</p>
                  <p class="card-text"><span>Capital:</span> ${capital}</p>
                </div>
              </div>
    `;
}
