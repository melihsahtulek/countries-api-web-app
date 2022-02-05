/*

  By melihsahtulek

*/

const countriesContainer = document.getElementById("countriesContainer");
const loadCountry = document.getElementsByClassName("loadCountry")[0];
const loadCountryBtn = document.getElementById("loadCountryBtn");
let maxSize = 10;
const search = document.getElementsByName("search")[0];

const getAllCountries = new Promise(async (resolve, reject) => {
  loadCountry.style.display = "none";

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
    write(data);
  })
  .catch((err) => (countriesContainer.innerHTML = `<center>we have a error : ${err}</center>`));

loadCountryBtn.addEventListener("click", () => {
  if (search.value.length > 0) {
    maxSize += 10;
    toFilter(search.value);
  } else {
    maxSize += 10;
    getAllCountries
      .then((data) => {
        write(data);
      })
      .catch((err) => (countriesContainer.innerHTML = `<center>we have a error : ${err}</center>`));
  }
});

/*** SEARCH ***/

search.addEventListener("input", (e) => {
  toFilter(e.target.value);
});

const toFilter = (q) => {
  getAllCountries
    .then((data) => {
      const filter = data.filter((country) => {
        if (country.name.toLowerCase().includes(q.toLowerCase())) {
          return country;
        }
      });

      write(filter);
    })
    .catch((err) => (countriesContainer.innerHTML = `<center>we have a error : ${err}</center>`));
};

const write = (data) => {
  countriesContainer.innerHTML = null;
  if (maxSize <= data.length - 10) {
    loadCountry.style.display = "flex";
  } else {
    loadCountry.style.display = "none";
  }

  let control = 1;
  for (const country of data) {
    if (control <= maxSize) {
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
      control++;
    }
  }

  Array.from(document.getElementsByClassName("country")).forEach((link) => {
    link.addEventListener("click", () => (search.value = ""));
  });
};

colType.addEventListener("click", () => {
  Array.from(document.getElementsByClassName("country")).forEach((country) => {
    country.style.width = "50%";
  });
});

rowType.addEventListener("click", () => {
  Array.from(document.getElementsByClassName("country")).forEach((country) => {
    country.style.width = "100%";
  });
});
