const cardContainer = document.querySelector(".cards-container");

const url = "https://restcountries.com/v2/alpha?codes=ALA";
//   "https://restcountries.com/v2/alpha?codes=DEU,USA,BRA,ISL,AFG,ALA,ALB,DZA";

let borderCountries = [];

async function fetchCountry() {
  try {
    const response = await fetch(url);
    const country = await response.json();

    country.forEach((element) => {
      cardContainer.insertAdjacentHTML("beforeend", createDetailCard(element));
    });

    // create detail card

    function createDetailCard(element) {
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
            <div class="col-12 first-col">
              <h5 class="card-title mt-5">${name}</h5>
              <p class="native mt-4">
                <span class="bold">Native Name:</span> ${nativeName}
              </p>
              <p class="population">
                <span class="bold">Population:</span> ${population}
              </p>
              <p class="region">
                <span class="bold">Region:</span> ${region}
              </p>
              <p class="sub-region">
                <span class="bold">Sub Region:</span> ${subregion}
              </p>
              <p class="capital">
                <span class="bold">Capital:</span> ${capital}
              </p>
            </div>
            <div class="col second-col">
              <p class="domain ">
                <span class="bold">Top Level Domain:</span>
                ${topLevelDomain}
              </p>
              <p class="currencies">
                <span class="bold">Currencies:</span> ${code}
              </p>
              <p class="languages">
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

    const detailContainer = document.querySelector(".borders-container");

    borderCountries.forEach((border) => {
      detailContainer.insertAdjacentHTML("beforeend", borderCountry(border));
    });

    function borderCountry(border) {
      return `
      <div class="border-country shadow-sm bg-white rounded"> ${border}</div>`;
    }
  } catch (error) {
    console.log(error);
  }
}

fetchCountry();
