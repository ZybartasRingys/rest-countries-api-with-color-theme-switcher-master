"use strict";

const cardsContainer = document.getElementById("cards-section");

const url = "https://restcountries.com/v2/all";

let data = {};

console.log(data);

//async fetch function

async function fetchCountry() {
  try {
    const response = await fetch(url);
    const country = await response.json();

    country.forEach((element) => {
      cardsContainer.insertAdjacentHTML("beforeend", createCard(element));
    });

    country.forEach((element) => {
      data[element.name] = element;
    });
  } catch (error) {
    console.log(error);
  }
}

fetchCountry();

function createCard(element) {
  let title = element["name"];
  let flag = element["flag"];
  let population = element["population"];
  let region = element["region"];
  let capital = element["capital"];

  return `
    <div class="card shadow p-3 mb-5 bg-white rounded">
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

createCard();
