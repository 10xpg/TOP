import "./home.css";

const home = document.createElement("div");
home.classList.add("container");

const title = document.createElement("div");
title.textContent = "HOME";
title.classList.add("title");
home.appendChild(title);

const main = document.createElement("div");
main.classList.add("main");
home.appendChild(main);

const welcome = document.createElement("div");
welcome.style.gridRow = "1/3";
welcome.style.gridColumn = "1/2";
welcome.style.margin = "15px";
welcome.style.padding = "25px";
welcome.style.border = " solid white ";
welcome.style.borderRadius = "15px";
welcome.innerHTML = `<h1>Welcome to DEE's</h1><p>Experience unforgettable dining with a perfect blend of fresh ingredients, expert preparation, and a welcoming atmosphere. At DEE's, we are dedicated to delivering an exceptional culinary experience, whether you're here for a casual meal with family or a special celebration.</p><h2>Our Story

</h2><p>Nestled in the heart of Accra, DEE's was founded with a passion for great food and unforgettable moments. Our chefs use only the finest local ingredients, crafting each dish with care and creativity to bring you flavors that delight the senses.

</p><h2>What We Offer

</h2><ul><li>Fresh, Local Ingredients: We believe in supporting local farms and bringing the freshest seasonal produce to your plate.
</li><li>Innovative Menus: From classic favorites to innovative new creations, our diverse menu has something for every palate.
</li><li>Cozy Ambiance: Whether you're enjoying a quiet dinner or celebrating with friends, our cozy atmosphere is the perfect setting.
</li></ul>`;
main.appendChild(welcome);

const locate = document.createElement("div");
locate.style.gridRow = "1/2";
locate.style.gridColumn = "2/3";
locate.style.margin = "15px";
locate.style.padding = "20px";

locate.style.border = " solid white ";
locate.style.borderRadius = "15px";
locate.innerHTML =
  "<h1>Where you can find us </h1><p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>";
main.appendChild(locate);

const joinUs = document.createElement("div");
joinUs.style.gridRow = "2/3";
joinUs.style.gridColumn = "2/3";
joinUs.style.margin = "15px";
joinUs.style.padding = "20px";

joinUs.style.border = " solid white ";
joinUs.style.borderRadius = "15px";
joinUs.innerHTML = `<h2>Join Us for an Unforgettable Experience</h2><ul><li>Dine-In: Relax and enjoy a delicious meal in our comfortable dining space.</li><li>Takeout & Delivery: Craving our dishes at home? Order your favorites for takeout or delivery.</li><li>Special Events: Hosting a special occasion? Let us help you plan the perfect event with tailored catering options.
</li></ul><h2>Reserve Your Table Today!</h2><p>Booking a table is easy. Use our convenient online reservation system or call us directly to reserve your spot.
</p><h2>Follow Us

</h2><p>Stay connected on social media for the latest updates, specials, and events!

</p>`;
main.appendChild(joinUs);

export { home };
