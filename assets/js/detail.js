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

const getBorders = new Promise(async (resolve, reject) => {
  const response = await fetch(`../../countries.json`);
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

    if (data.borders) {
      getBorders.then((items) => {
        let filter = items.filter((item) => {
          if (data.borders.includes(item.code)) {
            return item.name;
          }
        });
        tablesContainer.insertAdjacentHTML(
          "afterbegin",
          `
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

                  filter?.forEach((border) => {
                    rows += `
                      <tr>
                        <td>${border.code}</td>
                        <td>${border.name}</td>
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
      });
    }

    const cleanNumber = (n) => {
      return n; // [ ] will be replace to comma number
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

    const changeTableGridView = () => {
      setTimeout(() => {
        const rowLen = Math.round(document.getElementsByClassName("tableContainer").length / 2);
        const tables = document.getElementsByClassName("tableContainer");
        let topValueLeft = 0;
        let topValueRight = 0;
        for (let i = 0; i < rowLen; i++) {
          for (let j = i; j < i + 2; j++) {
            if (tables[j + i]) {
              if ((i + j) % 2 === 0) {
                tables[j + i].style.position = "absolute";
                tables[j + i].style.top = `${topValueLeft}px`;
                topValueLeft += tables[j + i].clientHeight;
              } else {
                tables[j + i].style.position = "absolute";
                tables[j + i].style.left = "50%";
                tables[j + i].style.top = `${topValueRight}px`;
                topValueRight += tables[j + i].clientHeight;
              }
            }
          }
        }
        tablesContainer.style.height = `${topValueLeft + topValueRight}px`;
      }, 0);
    };

    window.addEventListener("resize", () => {
      if (window.innerWidth <= 720) {
        const tables = document.getElementsByClassName("tableContainer");
        Array.from(tables).forEach((element) => {
          element.removeAttribute("style");
        });
      } else {
        changeTableGridView();
      }
    });

    changeTableGridView();
  })
  .catch((err) => (document.location.href = "/"));
