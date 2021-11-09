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
        alert("Sth went wrong");
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
  btnAddToCart.addEventListener("click", (e) => {
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
  const kanapPrice = document.getElementById("price").innerText;
  const KanapImg = document.getElementById("imageUrl").getAttribute("src");
  const kanapAlt = document.getElementById("imageUrl").getAttribute("alt");

  // First of all check if selected quantity and color are correct!
  if (checkColor(kanapColor) && checkQuantity(kanapQuantity)) {
    // Building the object product
    const kanapProduct = {
      _id: productId,
      name: kanapName,
      color: kanapColor,
      quantity: kanapQuantity,
      imageUrl: KanapImg,
      price: kanapPrice,
      altTxt: kanapAlt,
    };

    console.log(kanapAlt);

    // Need to check if we have this product in our cart or not
    let itemsExist = alreadyInCart(cart, kanapProduct);
    console.log(itemsExist);

    // Return true, then have to retrieve existing kanap and increment the quantity qnd price
    if (parseInt(itemsExist) >= 0) {
      //return index instead cart[itemsExist].quantity += parseInt(kanapProduct.quantity);
      // pas besoin du prix uniquement id, couleur et qty
      const exisitingKanap = cart[itemsExist];
      console.log(`avant: ${exisitingKanap.quantity}`);
      exisitingKanap.quantity =
        parseInt(exisitingKanap.quantity) + parseInt(kanapProduct.quantity);

      console.log(`apres: ${exisitingKanap.quantity}`);

      // No such items in cart, push the new kanap in the cart
    } else {
      cart.push(kanapProduct);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(
      `You've just added ${kanapProduct.quantity} ${kanapProduct.name} in ${kanapProduct.color} to your shopping cart!`
    );
    console.log(cart);
  } else {
    alert("wrong qty and color");
  }
}

function checkQuantity(qty) {
  if (parseInt(qty) < 1 || parseInt(qty) > 100) {
    // alert("Please select a number between 1 and 100");
    return false;
  } else {
    return qty;
  }
}

function checkColor(clr) {
  if (clr == "") {
    // alert("Please choose a color!");
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

// const btnAddToCart = document.querySelector("#addToCart");
// btnAddToCart.addEventListener("click", (e) => {
//   e.preventDefault();
//   addProduct();
// });

load();
