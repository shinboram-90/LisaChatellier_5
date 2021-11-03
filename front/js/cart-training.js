function load() {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  // console.log(cart);

  if (cart.length !== 0) {
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
      pPrice.id = "price";
      const priceSameItems = parseInt(item.price) * parseInt(item.quantity);
      pPrice.innerText = `${priceSameItems} €`;

      const pClr = document.createElement("p");
      pClr.innerText = item.color;

      const settingsParent = document.createElement("div");
      settingsParent.className = "cart__item__content__settings";

      const quantityParent = document.createElement("div");
      quantityParent.className = "cart__item__content__settings__quantity";

      const pQty = document.createElement("p");
      pQty.innerText = `Qté : ${item.quantity}`;
      pQty.id = "quant";

      const input = document.createElement("input");
      input.className = "itemQuantity";
      input.setAttribute("type", "number");
      input.setAttribute("name", "itemQuantity");
      input.setAttribute("min", "1");
      input.setAttribute("max", "100");
      input.setAttribute("value", item.quantity);
      input.addEventListener("change", (e) => {
        e.preventDefault();

        // Call the function updatedCart to modify the values
        updateCart(item, e, cart);
      });

      const deleteParent = document.createElement("div");
      deleteParent.className = "cart__item__content__settings__delete";

      const deleteItem = document.createElement("p");
      deleteItem.className = "deleteItem";
      deleteItem.innerText = "Supprimer";
      deleteParent.appendChild(deleteItem);

      deleteItem.addEventListener("click", (e) => {
        e.preventDefault();
        const elt = e.target;
        const ancestor = elt.closest("article");

        // Call the function areYouSure to delete the clicked article
        areYouSure(item, cart, ancestor);
      });

      //calling function when multiple children;
      appendChildren(article, [imgParent, contentParent]);
      appendChildren(contentParent, [priceParent, settingsParent]);
      appendChildren(priceParent, [h2, pClr, pPrice]);
      appendChildren(settingsParent, [quantityParent, deleteParent]);
      appendChildren(quantityParent, [pQty, input]);
    });
  } else {
    console.log("Your cart is empty");
  }
  total(cart);
}

function appendChildren(parent, children) {
  children.forEach((child) => {
    parent.appendChild(child);
  });
}

function total(cart) {
  cart.forEach(() => {
    const quantityCalc = cart.reduce((a, b) => {
      return a + parseInt(b.quantity);
    }, 0);
    document.getElementById("totalQuantity").innerText = quantityCalc;

    const priceCalc = cart.reduce((a, b) => {
      return a + parseInt(b.price) * b.quantity;
    }, 0);
    document.getElementById("totalPrice").innerText = priceCalc;
  });
  localStorage.setItem("cart", JSON.stringify(cart));
  console.log(cart);
}

// localStorage.clear();

const areYouSure = (item, cart, ancestor) => {
  if (
    window.confirm(
      `Vous êtes sur le point de supprimer ${item.quantity} ${item.name} de couleur ${item.color} de votre panier.`
    )
  ) {
    cart.forEach((key, value) => {
      if (key._id === item._id && key.color === item.color) {
        value = cart.indexOf(item);
        cart.splice(value, 1);
      } else {
        console.log("Not the right item");
      }
    });
    ancestor.remove();
    total(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Article(s) supprimé(s) avec succès");
  } else {
    alert("Aucune modification n'a été apportée");
  }
};

const updateCart = (item, e, cart) => {
  const newValue = parseInt(e.currentTarget.value);
  const quant = document.getElementById("quant");
  const price = document.getElementById("price");
  // console.log(e.target);

  console.log(typeof newValue);

  if (newValue > 0 && newValue < 101) {
    cart.forEach((key) => {
      if (key._id === item._id && key.color === item.color) {
        console.log("same");
        item.quantity = newValue;
        // // quant.innerText = `Qté : ${item.quantity}`;
        // const newTotal = item.quantity * item.price;
        // price.innerText = `${newTotal} €`;
        displayProduct();
        console.log(`new quantity: ${key.quantity}`);
        console.log(`new price: ${key.price * key.quantity}`);
        total(cart);
        localStorage.setItem("cart", JSON.stringify(cart));
      } else {
        console.log("not the same");
        console.log(`quantity: ${key.quantity}`);
        console.log(`price: ${key.price}`);
      }
    });

    alert(
      `You now have ${item.quantity} ${item.name} in ${item.color} colour\nTotal price: ${item.price}€ (for the selected item)`
    );
  } else {
    alert("Please select a number between 1 and 100");
  }
};

load();

const displayProduct = () => {
  // cart.forEach((item) => {
  //   const quant = document.getElementById("quant");
  //   quant.innerText = `Qté : ${item.quantity}`;
  //   const price = document.getElementById("price");
  //   price.innerText = `${item.price * item.quantity} €`;
  // });
  location.reload();
};
// const displayQty = (key) => {
//   const quant = document.querySelectorAll("#quant");
//   quant.forEach((q) => {
//     q.innerText = `Qté : ${key.quantity}`;
//   });
//   console.log(key.quantity);
// };

// const displayPrice = (key) => {
//   const price = document.querySelectorAll("#price");
//   price.forEach((pr) => {
//     pr.innerText = `${key.price} €`;
//   });
//   console.log(key.price);
// };

// <---------------- FORM ---------------->
const formCheck = () => {
  // const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const address = document.getElementById("address").value;
  const city = document.getElementById("city").value;
  const email = document.getElementById("email").value;
  const order = document.getElementById("order");

  order.addEventListener("click", () => {
    localStorage.setItem(
      "firstName",
      document.getElementById("firstName").value
    );
    // console.log(`first name = ${firstName}`);
    console.log(localStorage);
  });
};
formCheck();
