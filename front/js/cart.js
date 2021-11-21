// Affiche le panier vide ou plein grace au localstorage
function load() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cartIsEmpty(cart)) {
  } else {
    displayLocalStorage(cart);
  }
}

/**
 * Check if the cart is empty
 * @param { Object[] } cart
 */
function cartIsEmpty(cart) {
  if (cart.length === 0) {
    const h1 = document.getElementsByTagName("h1");
    h1[0].innerText = "Votre panier est vide";
    const totalQuantity = document.getElementById("totalQuantity");
    const noArticle = totalQuantity.closest("p");
    noArticle.innerText = "Total (0 article) : 0 €";
  } else {
    return false;
  }
}

/**
 * Working with 2 arrays of ojects, one coming frome the API and the other one from the localStorage
 * The idea is to replace the color and quantity values chosen by the user
 * @param { Object[] } cart
 */
function displayLocalStorage(cart) {
  let mergedOptions = [];
  let counter = 0;
  cart.forEach((item) => {
    const productUrl = "http://localhost:3000/api/products" + "/" + item._id;

    // send request using fetch API to replace values of color and quantity
    fetch(productUrl).then((response) => {
      response
        .json()
        .then((backProductInfos) => {
          backProductInfos.colors = item.color;
          backProductInfos.quantity = item.quantity;
          mergedOptions.push(backProductInfos);
          counter++;

          // will call displayProduct when all products are read once
          if (counter === cart.length) {
            displayProduct(mergedOptions);
          }
        })

        .catch((error) => {
          console.error(error);
        });
    });
  });
}

/**
 * Display all the products added to the cart earlier
 * @param { Object[] } mergedOptions
 */
function displayProduct(mergedOptions) {
  cart = mergedOptions;
  if (cartIsEmpty(cart)) {
  } else {
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
      pPrice.innerText = `${parseInt(item.price)} €`;

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
      input.addEventListener("change", (e) => {
        updatedCart(item, e, cart);
      });

      const deleteParent = document.createElement("div");
      deleteParent.className = "cart__item__content__settings__delete";

      const deleteItem = document.createElement("p");
      deleteItem.className = "deleteItem";
      deleteItem.innerText = "Supprimer";
      deleteParent.appendChild(deleteItem);

      deleteItem.addEventListener("click", (e) => {
        const elt = e.target;
        const ancestor = elt.closest("article");
        deleteKanap(item, cart, ancestor);
      });

      //calling function when multiple children;
      appendChildren(article, [imgParent, contentParent]);
      appendChildren(contentParent, [priceParent, settingsParent]);
      appendChildren(priceParent, [h2, pClr, pPrice]);
      appendChildren(settingsParent, [quantityParent, deleteParent]);
      appendChildren(quantityParent, [pQty, input]);
    });
    bindIt();
  }
  total(cart);
}

/**
 * Append multiple elements to a parent element
 * @param { HTMLElement } parent
 * @param { HTMLElement[] } children
 */
function appendChildren(parent, children) {
  children.forEach((child) => {
    parent.appendChild(child);
  });
}

/**
 * Append display the total quantity and price
 * @param { Object[] } cart
 */
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
  cartIsEmpty(cart);
}

/**
 * Delete a product with same id and color
 * @param { Object } item
 * @param { Object[] } cart
 * @param { HTMLElement } ancestor
 */
const deleteKanap = (item, cart, ancestor) => {
  if (
    confirm(
      `Vous êtes sur le point de supprimer ${item.quantity} ${item.name} de couleur ${item.colors} de votre panier.`
    )
  ) {
    cart.forEach((key, value) => {
      if (key._id === item._id && key.colors === item.colors) {
        value = cart.indexOf(item);
        cart.splice(value, 1);
        total(cart);
        ancestor.remove();
      } else {
        console.log("Not the right item");
      }
      localStorage.setItem("cart", JSON.stringify(cart));
    });

    alert("Article(s) supprimé(s) avec succès");
  } else {
    alert("Aucune modification n'a été apportée");
  }
};

/**
 * Update the quantity and price when quantity is changed by the user
 * @param { Object } item
 * @param { Object } e
 * @param { Object[] } cart
 */
const updatedCart = (item, e, cart) => {
  const newValue = e.currentTarget.value;
  if (newValue >= 1 && newValue < 101) {
    item.quantity = newValue;
    localStorage.setItem("cart", JSON.stringify(cart));

    total(cart);

    alert(
      `Vous avez désormais ${item.quantity} ${item.name}, de couleur ${
        item.colors
      }\nPrix total: ${
        item.quantity * item.price
      }€ (pour les articles modifiés)`
    );
  } else {
    alert("Veuillez choisir un nombre entre 1 et 100 !");
  }
};

//-------------------------------------------- REGEX --------------------------------------------

const regexNames = /^(?=.{2,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i;
const regexAddress = /^[#.0-9a-zA-ZÀ-ÿ\s,-]{2,60}$/;
const regexCity =
  /^[a-zA-Z\u0080-\u024F]+(?:([\ \-\']|(\.\ ))[a-zA-Z\u0080-\u024F]+)*$/;
const regexEmail = /^[^@\s]{2,30}@[^@\s]{2,30}\.[^@\s]{2,5}$/;

/**
 * On click, will  call function isValid and create an object contact if true
 * Calling function sendform which contains user's info
 */
function bindIt() {
  const submitForm = document.getElementById("order");
  submitForm.addEventListener("click", (e) => {
    e.preventDefault();

    const firstName = document.getElementById("firstName").value.toUpperCase();
    const lastName = document.getElementById("lastName").value.toUpperCase();
    const address = document.getElementById("address").value.toUpperCase();
    const city = document.getElementById("city").value.toUpperCase();
    const email = document.getElementById("email").value.toUpperCase();

    const firstNameError = document.getElementById("firstNameErrorMsg");
    const lastNameError = document.getElementById("lastNameErrorMsg");
    const addressError = document.getElementById("addressErrorMsg");
    const cityError = document.getElementById("cityErrorMsg");
    const emailError = document.getElementById("emailErrorMsg");

    if (
      isValid(regexNames, firstName, firstNameError) &&
      isValid(regexNames, lastName, lastNameError) &&
      isValid(regexAddress, address, addressError) &&
      isValid(regexCity, city, cityError) &&
      isValid(regexEmail, email, emailError)
    ) {
      const contact = {
        firstName: firstName,
        lastName: lastName,
        address: address,
        city: city,
        email: email,
      };
      sendForm(contact);
    } else {
      alert(
        "Certains champs sont manquants ou invalides, merci de compléter et vérifier tout le formulaire."
      );
    }
  });
}

/**
 * Checking if user input matches the regex
 * @param { Object } regex
 * @param { string } userInput
 * @param { HTMLElement } error
 * @return { (true | function errorMsg) }
 */
function isValid(regex, userInput, error) {
  if (!regex.test(userInput.trim())) {
    return errorMsg(userInput, error);
  } else {
    error.innerText = "";
    return true;
  }
}

/**
 * Showing error msg to the user
 * @param { string } userInput
 * @param { HTMLElement } error
 * @return { (true | false) }
 */
function errorMsg(userInput, error) {
  const neededInput = error.closest("div").firstElementChild.innerText;
  if (userInput !== true) {
    error.innerText = `Ceci est un message d'erreur. ${neededInput} n'est pas valide !`;
    return false;
  } else {
    return true;
  }
}

/**
 * Sends a request to the specified url from a form containing the user's contact info
 * @param { Object } contact
 */
function sendForm(contact) {
  let products = [];

  cart = JSON.parse(localStorage.getItem("cart"));

  cart.forEach((kanap) => {
    const productId = kanap._id;
    products.push(productId);
  });

  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ contact, products }),
  })
    .then((res) => res.json())
    .then((data) => {
      window.location = `confirmation.html?orderId=${data.orderId}`;
    })
    .catch((error) => {
      console.error(error);
    });
}

load();
