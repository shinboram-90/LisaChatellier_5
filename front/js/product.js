const url = "http://localhost:3000/api/products";
const productId = new URLSearchParams(window.location.search).get("id");
const productUrl = url + "/" + productId;

function load() {
  fetch(productUrl).then((response) => {
    response
      .json()
      .then((data) => {
        displayProduct(data);
      })

      .catch((e) => {
        alert("Sth went wrong");
      });
  });
}

function displayProduct(data) {
  // display image
  const img = document.createElement("img");
  img.setAttribute("src", data.imageUrl);
  img.setAttribute("alt", data.altTxt);
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
}

function addProduct() {
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

  // First of all check if selected quanrtity and color are correct!
  if (checkColor(kanapColor) && checkQuantity(kanapQuantity)) {
    // Building the object product
    let product = {
      _id: productId,
      name: kanapName,
      color: kanapColor,
      quantity: kanapQuantity,
      price: kanapPrice,
    };

    // Need to check if we have this product in our cart or not
    let itemsExist = alreadyInCart(cart, product);
    console.log(itemsExist);

    if (itemsExist) {
      product.quantity = parseInt(product.quantity) + parseInt(kanapQuantity);
      product.price = parseInt(product.price) + parseInt(kanapPrice);
      console.log(product.quantity);
      console.log(product.price);
    } else {
      cart.push(product);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(
      `You've just added ${product.quantity} ${product.name} in ${product.color} to your shopping cart!`
    );
  }
}

function checkQuantity(qty) {
  if (parseInt(qty) < 1 || parseInt(qty) > 100) {
    alert("Please select a number between 1 and 100");
    return false;
  } else {
    return qty;
  }
}

function checkColor(clr) {
  if (clr == "") {
    alert("Please choose a color!");
  } else {
    return clr;
  }
}

function alreadyInCart(cart, product) {
  let found = false;

  cart.forEach((key, value) => {
    if (key._id == product._id && key.color == product.color) {
      found = true;
    }
  });
  return found;
}

const btnAddToCart = document.querySelector("#addToCart");
btnAddToCart.addEventListener("click", (e) => {
  e.preventDefault;
  addProduct();
});

load();
