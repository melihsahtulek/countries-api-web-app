/*

  Light/Dark Switch By melihsahtulek
  

*/

window.addEventListener("load", () => {
  const check = document.querySelector("#check");

  const setBodyClass = () => document.body.classList.replace(!check.checked ? "dark" : "light", check.checked ? "dark" : "light");

  if (localStorage.getItem("mode")) {
    if (localStorage.getItem("mode") === "dark") {
      document.body.classList.add("dark");
      check.checked = true;
    } else {
      document.body.classList.add("light");
      check.checked = false;
    }
    setBodyClass();
  } else {
    localStorage.setItem("mode", "light");
    document.body.classList.add("light");
    setBodyClass();
  }

  check.addEventListener("change", (e) => {
    localStorage.setItem("mode", e.target.checked ? "dark" : "light");
    setBodyClass();
  });
});
