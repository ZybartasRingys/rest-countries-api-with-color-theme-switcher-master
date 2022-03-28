const cardContainer = document.querySelector(".cards-container");

const url = "https://restcountries.com/v2/alpha?codes=DZA";
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

        <div class="card mt-3">
                  <img
                    src="${flag}"
                    class="card-img-top"
                    alt="..."
                  />
                  <div class="card-body mt-4">
                    <h5 class="card-title">${name}</h5>
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
                  <div class="card-bottom">
                    <p class="domain">
                      <span class="bold">Top Level Domain:</span>  ${topLevelDomain}
                    </p>
                    <p class="currencies">
                      <span class="bold">Currencies:</span> ${code}
                    </p>
                    <p class="languages">
                      <span class="bold">Languages:</span> ${languages.name}
                    </p>
                  </div>

                  <div
                    class="col-11 borders mb-5 "
                  >
                  <div><h5 class="border-heading mb-3">Border Countries: </h5>

                  <div class=" borders-container"></h5>
                  
                    
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
