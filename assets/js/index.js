/*

  By melihsahtulek

*/

const countriesContainer = document.getElementById("countriesContainer");

const getAllCountries = new Promise(async (resolve, reject) => {
  countriesContainer.insertAdjacentHTML(
    "afterbegin",
    `
    <div class="loading">
      <div class="load">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  `
  );

  const response = await fetch("https://restcountries.com/v2/all");
  const json = await response.json();
  if (json.message) {
    reject(json.message);
  } else {
    resolve(json);
  }
});

getAllCountries
  .then((data) => {
    countriesContainer.innerHTML = null;
    data.forEach((country) => {
      countriesContainer.insertAdjacentHTML(
        "beforeend",
        `
        <div class="country">
          <a href=country.html?q=${country.alpha3Code} class="content">
            <div class="flag">
              <img src=https://flagcdn.com/${country.alpha2Code.toLowerCase()}.svg alt="" />
            </div>
            <div class="info">
              <h2>${country.name}</h2>
              <h3>${country.capital ? country.capital : ""}</h3>
            </div>
          </a>
        </div>
      `
      );
    });
  })
  .catch((err) => (countriesContainer.innerHTML = `<center>we have a error : ${err}</center>`));
