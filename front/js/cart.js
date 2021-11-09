function load() {
  const param = new URLSearchParams(window.location.search);
  if (param.get("orderId") !== null) {
    const orderId = document.getElementById("orderId");
    orderId.textContent = param.textContent("orderId");
    // division car renvoit sur le meme fichier
    // si l'url contient, id de la commande
    //getElementById orderId => text.content orderId
    // on est dans la page confirmation
  } else {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
      console.log("Cart is empty");
    } else {
      displayLocalStorage(cart);
    }
  }
}

function displayLocalStorage(cart) {
  let mergedOptions = [];
  cart.forEach((item) => {
    const productUrl = "http://localhost:3000/api/products" + "/" + item._id;

    fetch(productUrl).then((response) => {
      response
        .json()
        .then((backProductInfos) => {
          backProductInfos.colors = item.color;
          backProductInfos.quantity = item.quantity;
          mergedOptions.push(backProductInfos);

          displayProduct(mergedOptions);
        })

        .catch((error) => {
          alert("Sth went wrong");
          console.log(error);
        });
    });
  });
}

function displayProduct(mergedOptions) {
  mergedOptions.forEach((item) => {
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
    let priceSameItems = parseInt(item.price) * parseInt(item.quantity);
    pPrice.innerText = `${priceSameItems} €`;

    const pClr = document.createElement("p");
    pClr.innerText = item.colors;

    const settingsParent = document.createElement("div");
    settingsParent.className = "cart__item__content__settings";

    const quantityParent = document.createElement("div");
    quantityParent.className = "cart__item__content__settings__quantity";

    const pQty = document.createElement("p");
    pQty.innerText = "Qté : ";

    const input = document.createElement("input");
    input.className = "itemQuantity";
    input.setAttribute("type", "number");
    input.setAttribute("name", "itemQuantity");
    input.setAttribute("min", "1");
    input.setAttribute("max", "100");
    input.setAttribute("value", item.quantity);
    // input.addEventListener("change", (e) => {
    //   updatedCart(item, e, mergedOptions);
    // });

    const deleteParent = document.createElement("div");
    deleteParent.className = "cart__item__content__settings__delete";

    const deleteItem = document.createElement("p");
    deleteItem.className = "deleteItem";
    deleteItem.innerText = "Supprimer";
    deleteParent.appendChild(deleteItem);

    // deleteItem.addEventListener("click", (e) => {
    //   const elt = e.target;
    //   const ancestor = elt.closest("article");
    //   areYouSure(item, mergedOptions, ancestor);
    // });

    //calling function when multiple children;
    appendChildren(article, [imgParent, contentParent]);
    appendChildren(contentParent, [priceParent, settingsParent]);
    appendChildren(priceParent, [h2, pClr, pPrice]);
    appendChildren(settingsParent, [quantityParent, deleteParent]);
    appendChildren(quantityParent, [pQty, input]);
  });
  // total(mergedOptions);
}
// }

function appendChildren(parent, children) {
  children.forEach((child) => {
    parent.appendChild(child);
  });
}

// function total(mergedOptions) {
//   const cart = mergedOptions;
//   console.log({ cart });
//   cart.forEach(() => {
//     const quantityCalc = cart.reduce((a, b) => {
//       return a + parseInt(b.quantity);
//     }, 0);
//     document.getElementById("totalQuantity").innerText = quantityCalc;

//     const priceCalc = cart.reduce((a, b) => {
//       return a + parseInt(b.price) * b.quantity;
//     }, 0);
//     document.getElementById("totalPrice").innerText = priceCalc;
//   });
// }

// localStorage.clear();

// const areYouSure = (item, mergedOptions, ancestor) => {
//   if (
//     confirm(
//       `Vous êtes sur le point de supprimer ${item.quantity} ${item.name} de couleur ${item.colors} de votre panier.`
//     )
//   ) {
//     mergedOptions.forEach((key, value) => {
//       if (key._id === item._id && key.colors === item.colors) {
//         console.log(key.colors);
//         value = mergedOptions.indexOf(item);
//         mergedOptions.splice(value, 1);
//       } else {
//         console.log("Not the right item");
//       }
//       ancestor.remove();
//       localStorage.setItem("cart", JSON.stringify(mergedOptions));
//     });

//     alert("Article(s) supprimé(s) avec succès");
//   } else {
//     alert("Aucune modification n'a été apportée");
//   }
// };

// const updatedCart = (item, e, mergedOptions) => {
//   const newValue = e.currentTarget.value;
//   if (newValue > 1 && newValue < 101) {
//     item.quantity = newValue;
//     // console.log(item.quantity);
//     // console.log(cart);
//     localStorage.setItem("cart", JSON.stringify(mergedOptions));
//     total(mergedOptions);

//     const newTotal = item.quantity * item.price;
//     alert(
//       `You now have ${item.quantity} ${item.name}, total price: ${newTotal}€ (for the selected item)`
//     );
//   } else {
//     alert("Please select a number between 1 and 100");
//   }
// };

load();
