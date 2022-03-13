"use strict";

const cardsContainer = document.getElementById("cards-section");

const url = "https://restcountries.com/v2/name/Germany";

let data = {};

//async fetch function

async function fetchCountry() {
  const response = await fetch(url);
  const country = await response.json();

  console.log(country);

  country.forEach((element) => {
    console.log(img);
    cardsContainer.insertAdjacentHTML("beforeend", createCard(element, title));
  });

  country.forEach((element) => {
    data[element.title];
  });
}

fetchCountry();

function createCard(element) {
  const title = element.name;
  const img = element.flag;
  console.log(img);
  return `
    <div class="card">
                <div class="card-image"></div>
                <div class="card-body">
                  <h5 class="card-title">Germany</h5>
                  <p class="card-text"><span>Population:</span> 81.770.900</p>
                  <p class="card-text"><span>Region:</span> Europe</p>
                  <p class="card-text"><span>Capital:</span> Berlin</p>
                </div>
              </div>
    `;
}
