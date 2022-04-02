const cardContainer = document.querySelector(".cards-container");
const body = document.getElementById("body");
const darkMode = document.querySelector(".dark");
const navCol = document.querySelector(".navigation-col");
const whereText = document.querySelector(".where");
const darkText = document.querySelector(".dark");
const backBtn = document.querySelector(".back-btn");
const arrow = document.querySelector(".fa-solid");
const navRow = document.querySelector(".nav-row");
const backBtnText = document.querySelector(".back");

const url = "https://restcountries.com/v2/alpha?codes=ALB";
//   "https://restcountries.com/v2/alpha?codes=DEU,USA,BRA,ISL,AFG,ALA,ALB,DZA";

let borderCountries = [];

// dark light theme

darkMode.addEventListener("click", function () {
  body.classList.toggle("active");
  navCol.classList.toggle("active");
  whereText.classList.toggle("active");
  darkText.classList.toggle("active");
  backBtn.classList.toggle("active");
  arrow.classList.toggle("active");
  navRow.classList.toggle("active");
  backBtnText.classList.toggle("active");
});

async function fetchCountry() {
  try {
    const response = await fetch(url);
    const country = await response.json();

    country.forEach((element) => {
      cardContainer.insertAdjacentHTML("beforeend", createDetailCard(element));
    });

    //dark light theme

    const cardText = document.querySelectorAll(".card-text");
    const bold = document.querySelectorAll(".bold");
    const borderHeading = document.querySelector(".border-heading");

    darkMode.addEventListener("click", function () {
      borderHeading.classList.toggle("active");
      cardText.forEach((element) => {
        element.classList.toggle("active");
      });

      bold.forEach((element) => {
        element.classList.toggle("active");
      });
    });

    // create detail card

    function createDetailCard(element) {
      // destructing country object
      let {
        flag,
        name,
        nativeName,
        population,
        region,
        subregion,
        capital,
        topLevelDomain,
        currencies: [{ code }],
        languages: [{ ...languages }],
        borders,
      } = element;

      borders.forEach((border) => {
        borderCountries.push(border);
      });

      // returining detial page html

      return `
      <div class="row">
      <div class="col-12 mb-5 main-col d-flex flex-column flex-xxl-row justify-content-between">
        <div class="col col-xxl-5 flag-container">
          <img class="card-img-top" src="${flag}" alt="Flag" />
        </div>

        <div class="col col-xxl-6 detail-text d-flex flex-column ">
          <div
            class="col text d-flex flex-column flex-xxl-row "
          >
            <div class="col-12 first-col mb-5">
              <h5 class="card-title card-text mt-5">${name}</h5>
              <p class="native card-text mt-4">
                <span class="bold">Native Name:</span> ${nativeName}
              </p>
              <p class="population card-text">
                <span class="bold">Population:</span> ${population}
              </p>
              <p class="region card-text">
                <span class="bold">Region:</span> ${region}
              </p>
              <p class="sub-region card-text">
                <span class="bold">Sub Region:</span> ${subregion}
              </p>
              <p class="capital card-text">
                <span class="bold">Capital:</span> ${capital}
              </p>
            </div>
            <div class="col second-col">
              <p class="domain card-text ">
                <span class="bold">Top Level Domain:</span>
                ${topLevelDomain}
              </p>
              <p class="currencies card-text">
                <span class="bold">Currencies:</span> ${code}
              </p>
              <p class="languages card-text">
                <span class="bold">Languages:</span>
                ${languages.name}
              </p>
            </div>
          </div>

          <div class="col borders mt-3 d-flex flex-column flex-xxl-row">
            <div>
              <h5 class="border-heading mb-3 ">Border Countries:</h5>
            </div>

            <div class="borders-container"></div>
          </div>
        </div>
      </div>
    </div>
        
        `;
    }

    // adding border countries to borders container

    const detailContainer = document.querySelector(".borders-container");

    borderCountries.forEach((border) => {
      detailContainer.insertAdjacentHTML("beforeend", borderCountry(border));
    });

    function borderCountry(border) {
      return `
      <div class="border-country shadow-sm bg-white rounded"> ${border}</div>`;
    }

    // dark light theme for border countries

    darkMode.addEventListener("click", function () {
      const neighbour = document.querySelectorAll(".border-country");
      neighbour.forEach((element) => {
        element.classList.toggle("active");
      });
    });
  } catch (error) {
    console.log(error);
  }
}

fetchCountry();
