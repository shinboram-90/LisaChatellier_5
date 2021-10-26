// const url = "http://localhost:3000/api/products";
cart = JSON.parse(localStorage.getItem("cart"));
console.log(cart);

cart.forEach((key, value) => {
  const bigParent = document.querySelector("#cart__items");
  const article = document.createElement("article");
  article.setAttribute("data-id", key._id);
  console.log(key._id);
  bigParent.appendChild(article);

  const imgParent = document.createElement("div");
  imgParent.className = "cart__item__img";
  article.appendChild(imgParent);

  const image = document.createElement("img");
  image.setAttribute("src", "../../back/images/kanap01.jpeg");
  image.setAttribute("alt", "Photographie d'un canapé");
  imgParent.appendChild(image);

  const contentParent = document.createElement("div");
  contentParent.className = "cart__item__content";
  article.appendChild(contentParent);

  const priceParent = document.createElement("div");
  priceParent.className = "cart__item__content__titlePrice";
  contentParent.appendChild(priceParent);

  const h2 = document.createElement("h2");
  h2.innerText = key.name;
  priceParent.appendChild(h2);

  const paraf = document.createElement("p");
  paraf.innerText = key.price;
  priceParent.appendChild(paraf);
});
