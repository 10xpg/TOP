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

const updateProducts = document.querySelectorAll(".edit-product");
updateProducts.forEach((product) =>
  product.addEventListener("click", (e) => {
    const aprroved = confirm("Are you sure you want to edit this product?");
    if (!aprroved) {
      e.preventDefault();
    }
  })
);

const deleteProducts = document.querySelectorAll(".delete-product");
deleteProducts.forEach((product) =>
  product.addEventListener("click", (e) => {
    const aprroved = confirm("Are you sure you want to delete this product?");
    if (!aprroved) {
      e.preventDefault();
    }
  })
);

const updateCategories = document.querySelectorAll(".update-category");
updateCategories.forEach((category) => {
  category.addEventListener("click", (e) => {
    const approved = confirm("Are you sure you want to edit this category?");
    if (!approved) {
      e.preventDefault();
    }
  });
});

const deleteCategories = document.querySelectorAll(".delete-category");
deleteCategories.forEach((category) => {
  category.addEventListener("click", (e) => {
    const approved = confirm("Are you sure you want to delete this category?");
    if (!approved) {
      e.preventDefault();
    }
  });
});
