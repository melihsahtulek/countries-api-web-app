/*

  By melihsahtulek

*/

const detailTitle = document.getElementsByClassName("detailTitle")[0];
const detailContainer = document.getElementById("detailContainer");
const tablesContainer = document.getElementById("tablesContainer");

const getCountry = new Promise(async (resolve, reject) => {
  const response = await fetch(`https://restcountries.com/v2/alpha/${new URL(window.location.href).searchParams.get("q")}`);
  const json = await response.json();
  if (json.message) {
    reject(json.message);
  } else {
    resolve(json);
  }
});

getCountry
  .then((data) => {
    detailTitle.textContent = data.name;

    const cleanNumber = (n) => {
      return n;
    };

    detailContainer.insertAdjacentHTML(
      "beforeend",
      `
      <div class="detail">
        <div class="left">
          <div class="flag">
            <img src=https://flagcdn.com/${data.alpha2Code.toLowerCase()}.svg alt="" />
          </div>
        </div>
        <div class="right">
          <ul class="info">
            <li>
              <span>native name</span>
              <span>${data.nativeName}</span>
            </li>
            <li>
              <span>domain</span>
              <span>${data.topLevelDomain}</span>
            </li>
            <li>
              <span>capital</span>
              <span>${data.capital}</span>
            </li>
            <li>
              <span>calling Codes</span>
              <span>${data.callingCodes[0]}</span>
            </li>
            <li>
              <span>region</span>
              <span>${data.region}</span>
            </li>
            <li>
              <span>subregion</span>
              <span>${data.subregion}</span>
            </li>
            <li>
              <span>area</span>
              <span>${cleanNumber(data.area)}</span>
            </li>
            <li>
              <span>population</span>
              <span>${cleanNumber(data.population)}</span>
            </li>
            <li>
              <span>demonym</span>
              <span>${data.demonym}</span>
            </li>
          </ul>
        </div>
    </div>
  `
    );

    tablesContainer.insertAdjacentHTML(
      "beforeend",
      `
    <div class="tableContainer">
      <table>
        <thead>
          <tr>
            <th>code</th>
            <th>name</th>
            <th>symbol</th>
          </tr>
        </thead>
        <tbody>
          ${(function () {
            let rows = ``;

            data?.currencies?.forEach((currency) => {
              rows += `
                <tr>
                  <td>${currency.code}</td>
                  <td>${currency.name}</td>
                  <td>${currency.symbol}</td>
                </tr>
              `;
            });

            return rows;
          })()}
        </tbody>
      </table>
    </div>

    <div class="tableContainer">
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>symbol</th>
          </tr>
        </thead>
        <tbody>
          ${(function () {
            let rows = ``;

            data.languages.forEach((language) => {
              rows += `
                <tr>
                  <td>${language.name}</td>
                  <td>${language.iso639_1}</td>
                </tr>
              `;
            });

            return rows;
          })()}
        </tbody>
      </table>
    </div>

    <div class="tableContainer">
      <table>
        <thead>
          <tr>
            <th>code</th>
            <th>name</th>
          </tr>
        </thead>
        <tbody>
          ${(function () {
            let rows = ``;

            for (const key in data.translations) {
              rows += `
                <tr>
                  <td>${key}</td>
                  <td>${data.translations[key]}</td>
                </tr>
            `;
            }

            return rows;
          })()}
        </tbody>
      </table>
    </div>

    <div class="tableContainer">
    <table>
      <thead>
        <tr>
          <th>timezone</th>
        </tr>
      </thead>
      <tbody>
        ${(function () {
          let rows = ``;

          data.timezones.forEach((timezone) => {
            rows += `
                <tr>
                  <td>${timezone}</td>
                </tr>
              `;
          });

          return rows;
        })()}
      </tbody>
    </table>
  </div>

  `
    );
  })
  .catch((err) => (document.location.href = "/"));