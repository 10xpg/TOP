import "./menu.css";
import img from "./images/odin.jpeg";
import jollof from "./images/jollof.jpeg";

const image = document.createElement("img");
image.src = img;

const menu = document.createElement("div");
menu.classList.add("container");

const title = document.createElement("div");
title.textContent = "MENU";
title.classList.add("title");
menu.appendChild(title);

const menuList = [];

function MenuFactory(name = "", description = "", image = "", price = "") {
  const foodName = name;
  const foodDescription = description;
  const foodImage = image;
  const foodPrice = price;

  return { foodName, foodDescription, foodImage, foodPrice };
}

const food1 = new MenuFactory(
  "Jollof Rice",
  "A savory and flavorful West African rice dish.",
  img,
  "100 cedis"
);

const food2 = new MenuFactory(
  "Fried Rice",
  "A tasty rice dish with mixed vegetables and spices.",
  img,
  "100 cedis"
);

const food3 = new MenuFactory(
  "Banku with Tilapia",
  "A traditional Ghanaian dish served with spicy pepper sauce.",
  img,
  "200 cedis"
);

const food4 = new MenuFactory(
  "Fufu with Light Soup",
  "Soft and doughy fufu paired with rich light soup.",
  img,
  "150 cedis"
);
const food5 = new MenuFactory(
  "Banku with Tilapia",
  "A traditional Ghanaian dish served with spicy pepper sauce.",
  img,
  "20 cedis"
);

const food6 = new MenuFactory(
  "Fufu with Light Soup",
  "Soft and doughy fufu paired with rich light soup.",
  img,
  "25 cedis"
);

menuList.push(food1, food2, food3, food4);
const cardContainer = document.createElement("div");
cardContainer.classList.add("card-container");

menuList.forEach((item, index) => {
  const foodCard = document.createElement("div");
  foodCard.classList.add("food-card");

  const itemName = document.createElement("div");
  const itemDescription = document.createElement("div");
  const itemImage = document.createElement("img");

  const itemPrice = document.createElement("div");

  itemName.classList.add("item-name");
  itemDescription.classList.add("item-description");
  itemImage.classList.add("item-image");
  itemPrice.classList.add("item-price");

  itemName.textContent = `${menuList[index].foodName}`;
  itemDescription.textContent = `Description: ${menuList[index].foodDescription}`;
  itemImage.src = `${menuList[index].foodImage}`;
  itemPrice.textContent = `Price: ${menuList[index].foodPrice}`;

  foodCard.appendChild(itemName);
  foodCard.appendChild(itemDescription);
  foodCard.appendChild(itemImage);
  foodCard.appendChild(itemPrice);

  cardContainer.appendChild(foodCard);
});

menu.appendChild(cardContainer);

export { menu };
