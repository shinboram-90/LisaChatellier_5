// const url = "http://localhost:3000/api/products";
cart = JSON.parse(localStorage.getItem("cart"));
console.log(cart);

cart.forEach((item) => {
  const article = document.createElement("article");
  document.querySelector("#cart__items").appendChild(article);
  article.className = "cart__item";
  article.setAttribute("data-id", item._id);

  const imgParent = document.createElement("div");
  imgParent.className = "cart__item__img";

  const image = document.createElement("img");
  image.setAttribute("src", item.imageUrl);
  image.setAttribute("alt", item.altTxt);
  imgParent.appendChild(image);

  const contentParent = document.createElement("div");
  contentParent.className = "cart__item__content";

  const priceParent = document.createElement("div");
  priceParent.className = "cart__item__content__titlePrice";

  const h2 = document.createElement("h2");
  h2.innerText = item.name;

  const pPrice = document.createElement("p");
  pPrice.innerText = `${item.price} €`;

  const pClr = document.createElement("p");
  pClr.innerText = item.color;

  const settingsParent = document.createElement("div");
  settingsParent.className = "cart__item__content__settings";

  const quantityParent = document.createElement("div");
  quantityParent.className = "cart__item__content__settings__quantity";

  const pQty = document.createElement("p");
  pQty.innerText = `Qté : ${item.quantity}`;
  console.log(pQty);

  const input = document.createElement("input");
  input.className = "itemQuantity";
  input.setAttribute("type", "number");
  input.setAttribute("name", "itemQuantity");
  input.setAttribute("min", "1");
  input.setAttribute("max", "100");
  input.setAttribute("value", item.quantity);

  const deleteParent = document.createElement("div");
  deleteParent.className = "cart__item__content__settings__delete";

  const deleteItem = document.createElement("p");
  deleteItem.className = "deleteItem";
  deleteItem.innerText = "Supprimer";
  deleteParent.appendChild(deleteItem);

  deleteItem.addEventListener("click", (e) => {
    const elt = e.target;
    const parent = elt.parentNode;
    const gdParent = parent.parentNode;
    const gdGdParent = gdParent.parentNode;
    const ancestor = gdGdParent.parentNode;
    console.log(ancestor);

    alert("You're about to delete this item completely");
  });

  //calling function when multiple children;
  appendChildren(article, [imgParent, contentParent]);
  appendChildren(contentParent, [priceParent, settingsParent]);
  appendChildren(priceParent, [h2, pClr, pPrice]);
  appendChildren(settingsParent, [quantityParent, deleteParent]);
  appendChildren(quantityParent, [pQty, input]);
});

function appendChildren(parent, children) {
  children.forEach((child) => {
    parent.appendChild(child);
  });
}

function total() {
  cart.forEach(() => {
    const quantityCalc = cart.reduce((a, b) => {
      return a + parseInt(b.quantity);
    }, 0);

    const totalQuantity = (document.getElementById("totalQuantity").innerText =
      quantityCalc);

    const priceCalc = cart.reduce((a, b) => {
      return a + parseInt(b.price);
    }, 0);
    const totalPrice = (document.getElementById("totalPrice").innerText =
      priceCalc);
    console.log(totalQuantity);
    console.log(totalPrice);
  });
}

total();
