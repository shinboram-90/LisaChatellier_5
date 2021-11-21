// send request using fetch API
// this time the url contains an ID
function load() {
  const url = "http://localhost:3000/api/products";
  const productId = new URLSearchParams(window.location.search).get("id");
  const productUrl = url + "/" + productId;
  fetch(productUrl).then((response) => {
    response
      .json()
      .then((data) => {
        displayProduct(data);
      })

      .catch((error) => {
        console.error(error);
      });
  });
}

/**
 * Display all details of one product called data
 * @param { Object } data
 * @param { String } data.imageUrl
 * @param { String } data.altTxt
 * @param { String } data.name
 * @param { Integer } data.price
 * @param { String } data.description
 * @param { Array.<String> } data.colors
 */
function displayProduct(data) {
  // display image
  const img = document.createElement("img");
  img.setAttribute("src", data.imageUrl);
  img.setAttribute("alt", data.altTxt);
  img.id = "imageUrl";
  document.querySelector(".item__img").appendChild(img);

  // display name
  document.querySelector("#title").textContent = data.name;

  // display price
  document.querySelector("#price").textContent = data.price;

  // display description
  document.querySelector("#description").textContent = data.description;

  // display colors
  const colors = data.colors;
  for (let i = 0; i < colors.length; i++) {
    // Create more options to display the colors
    let opt = document.createElement("option");
    opt.setAttribute("value", colors[i]);
    opt.textContent = colors[i];
    document.querySelector("#colors").appendChild(opt);
  }
  bindIt(data._id);
}

/**
 * On click, calling the function addProduct
 * @param { string } productId
 */
function bindIt(productId) {
  const btnAddToCart = document.querySelector("#addToCart");
  btnAddToCart.addEventListener("click", () => {
    addProduct(productId);
  });
}

/**
 * Adding the product to the cart
 * @param { string } productId
 */
function addProduct(productId) {
  // Initialise the cart, if we added products to the cart before then we use the existed one, otherwise we create an empty array
  let cart;

  // parsing into JSON format to be readable
  if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
  } else {
    cart = [];
  }

  // Retrieving infos to the selected kanap
  const kanapName = document.getElementById("title").innerText;
  const kanapColor = document.getElementById("colors").value;
  const kanapQuantity = document.getElementById("quantity").value;

  // First of all check if selected quantity and color are correct
  if (checkColor(kanapColor) && checkQuantity(kanapQuantity)) {
    // Building the object product
    const kanapProduct = {
      _id: productId,
      name: kanapName,
      color: kanapColor,
      quantity: kanapQuantity,
    };

    // Need to check if we have this product in our cart or not
    let itemsExist = alreadyInCart(cart, kanapProduct);
    console.log({ itemsExist });

    // Return index, then have to retrieve existing kanap and increment the quantity and price
    // Carefull index could be 0 so need to sepcify it otherwise will be read as false
    if (parseInt(itemsExist) >= 0) {
      const exisitingKanap = cart[itemsExist];
      console.log(`before: ${exisitingKanap.quantity} quant`);

      exisitingKanap.quantity =
        parseInt(exisitingKanap.quantity) + parseInt(kanapProduct.quantity);
      console.log(`after: ${exisitingKanap.quantity} quant`);

      // No such items in cart, push the new kanap in the cart
    } else {
      cart.push(kanapProduct);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(
      `Vous venez d'ajouter ${kanapProduct.quantity} ${kanapProduct.name} de couleur ${kanapProduct.color} dans votre panier !`
    );
    console.log({ cart });
  }
}

/**
 * Check if the quantity is correct
 * @param { String } qty
 * @return { (false | qty) }
 */
function checkQuantity(qty) {
  if (parseInt(qty) < 1 || parseInt(qty) > 100) {
    alert("Veuillez choisir un nombre entre 1 et 100 !");
    return false;
  } else {
    return qty;
  }
}

/**
 * Check if a color is selected
 * @param { String } clr
 * @return { (false | clr) }
 */
function checkColor(clr) {
  if (clr == "") {
    alert("Veuillez choisir une couleur !");
    return false;
  } else {
    return clr;
  }
}

/**
 * Check if the product has already been added to the cart
 * @param { Object[] } cart
 * @param { Object } product
 * @return { (false | Integer) }
 */
function alreadyInCart(cart, product) {
  let found = false;

  cart.forEach((key, value) => {
    if (key._id == product._id && key.color == product.color) {
      found = value;
    }
  });
  return found;
}

load();
