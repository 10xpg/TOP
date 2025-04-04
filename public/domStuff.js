const categories = document.querySelectorAll(".category");
for (let i = 0; i < categories.length; i++) {
  categories[i].addEventListener("click", async (event) => {
    let category = event.target.textContent;
    console.log(category);
    window.location.href = `http://localhost:3000/${category}`;
  });
}

const allCategories = document.querySelector(".all");
allCategories.addEventListener("click", (event) => {
  let category = event.target.textContent;
  console.log(category);
  window.location.href = `http://localhost:3000/`;
});
