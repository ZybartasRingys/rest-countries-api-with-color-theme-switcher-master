console.log("connected");

const cardContainer = document.querySelector(".cards-container");

const url = "https://restcountries.com/v2/alpha?codes=DEU";
//   "https://restcountries.com/v2/alpha?codes=DEU,USA,BRA,ISL,AFG,ALA,ALB,DZA";

async function fetchCountry() {
  try {
    const response = await fetch(url);
    const country = await response.json();

    country.forEach((element) => {
      console.log(element);
      cardContainer.insertAdjacentHTML("beforeend", createDetailCard(element));
    });

    // create detail card

    function createDetailCard(element) {
      let {
        name,
        nativeName,
        population,
        region,
        subregion,
        capital,
        topLevelDomain,
        currencies: [{ code }],
        languages: [{ name }],
      } = element;

      console.log(code);

      return `

        <div class="card">
                  <img
                    src="https://flagcdn.com/de.svg"
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
                      <span class="bold">Languages:</span> 
                    </p>
                  </div>

                  <div
                    class="borders mb-5 d-flex flex-row justify-content-between"
                  >
                    <div class="border-country shadow-sm bg-white rounded">
                      
                    </div>
                    <div class="border-country shadow-sm bg-white rounded">
                      Denmark
                    </div>
                    <div class="border-country shadow-sm bg-white rounded">
                      Denmark
                    </div>
                  </div>
                </div>
        `;
    }

    createDetailCard();
  } catch (error) {
    console.log(error);
  }
}

fetchCountry();
