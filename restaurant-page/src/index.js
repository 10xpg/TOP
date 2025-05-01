import { home } from "./home";
import { menu } from "./menu";
import { about } from "./about";
import "./header.css";

const NavController = (function () {
  const pageContent = document.querySelector("#content");
  pageContent.appendChild(home);

  const homeNavBtn = document.querySelector(".home");
  const menuNavBtn = document.querySelector(".menu");
  const aboutNavBtn = document.querySelector(".about");

  homeNavBtn.style.backgroundColor = "black";

  let homeClicked = false;
  let menuClicked = false;
  let aboutClicked = false;

  //   homepage switch
  homeNavBtn.addEventListener("click", () => {
    homeClicked = true;
    if (homeClicked) {
      homeNavBtn.style.backgroundColor = "black";
      menuNavBtn.style.backgroundColor = "#9a2f2f";
      aboutNavBtn.style.backgroundColor = "#9a2f2f";
    }
    pageContent.textContent = "";
    return pageContent.appendChild(home);
  });

  //   menu page switch
  menuNavBtn.addEventListener("click", () => {
    menuClicked = true;
    homeClicked = false;
    aboutClicked = false;
    if (menuClicked) {
      homeNavBtn.style.backgroundColor = "#9a2f2f";
      menuNavBtn.style.backgroundColor = "black";
      aboutNavBtn.style.backgroundColor = "#9a2f2f";
    }
    pageContent.textContent = "";
    return pageContent.appendChild(menu);
  });

  //   about page switch
  aboutNavBtn.addEventListener("click", () => {
    menuClicked = false;
    homeClicked = false;
    aboutClicked = true;
    if (aboutClicked) {
      homeNavBtn.style.backgroundColor = "#9a2f2f";
      menuNavBtn.style.backgroundColor = "#9a2f2f";
      aboutNavBtn.style.backgroundColor = "black";
    }
    pageContent.textContent = "";
    return pageContent.appendChild(about);
  });
})();
