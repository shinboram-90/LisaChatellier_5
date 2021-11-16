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
        console.log(error);
      });
  });
}
// requete a l'api qui renvoit un JSON, exploite le json

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

// creer function bind
function bindIt(productId) {
  const btnAddToCart = document.querySelector("#addToCart");
  btnAddToCart.addEventListener("click", () => {
    addProduct(productId);
  });
}

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

  // First of all check if selected quantity and color are correct!
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

    // Return true, then have to retrieve existing kanap and increment the quantity qnd price
    if (parseInt(itemsExist) >= 0) {
      //return index instead cart[itemsExist].quantity += parseInt(kanapProduct.quantity);
      // pas besoin du prix uniquement id, couleur et qty
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

function checkQuantity(qty) {
  if (parseInt(qty) < 1 || parseInt(qty) > 100) {
    alert("Veuillez choisir un nombre entre 1 et 100 !");
    return false;
  } else {
    return qty;
  }
}

function checkColor(clr) {
  if (clr == "") {
    alert("Veuillez choisir une couleur !");
    return false;
  } else {
    return clr;
  }
}

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
