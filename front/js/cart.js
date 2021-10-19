const cart = JSON.parse(localStorage.getItem("cart"));
console.log(cart);

// code a moi
const url = "http://localhost:3000/api/products";
const DEBUG = true;
// REGEX
const checkNumber = /[0-9]/;
const checkMail = /^\W+([\.-]?W+)*@\W+([\.-]?\W+)*(\.\W2,3})+$/;
const checkSpecialCharacter = /[§!@#$%^&*(),.?":{}|<>]/;

function initPage() {
  const params = new URLSearchParams(window.location.search);
  if (null != params.get("orderId")) {
    const elem = getById("orderId");
    elem.textContent = params.get("orderId");
    return false;
  }

  bindIt();
  const cart = getCart();
  if (!cart || cart.length == 0) {
    alert("Cart is empty!");
  } else {
    const detail = loadDetailProd(cart);
  }
}

async function loadDetailProd(cart) {
  let detailProd = [];
  for (let i in cart) {
    const detail = await retrieveContent(cart[i]._id);
    detail.quantities = cart[i].quantities;
    detail.options = cart[i].options;

    detailProd.push(detail);
  }

  logDebug(detailProd);

  let totPrice = 0;
  let totQuant = 0;

  const cartItems = getCartItems();
  if (null === cartItems) {
    alert("An error occured while displaying the cart!");
    return false;
  }
}

function change(e) {
  const newQuant = parseInt(e.target.value); //getByClass('itemQuantity')[0].value;
  if (newQuant < 1) {
    alert("You must choose a positive quantity");
    e.target.value = 1;
  } else {
    cart = JSON.parse(localStorage.getItem("userCart"));
    let error = false;
    cart.forEach((elem, index) => {
      if (
        elem._id === e.target.myParamId &&
        elem.options === e.target.myParamOpt
      ) {
        let oldQuant = elem.quantities;
        let oldGlobal = getTotalQty();
        letNewGlobal = parseInt(oldGlobal) - parseInt(oldQuant) + newQuant;

        if (!updateTotalQty(newGlobal)) {
          error &= true;
        } else {
          elem.quantities = newQuant;
        }

        if (!error) {
          let oldPrice = getTotalCart();
          let NewOldPrice =
            parseInt(oldPrice) -
            parseInt(e.target.myParamPrice) * parseInt(oldQuant);

          let newTotalCart =
            NewOldPrice +
            parseInt(elem.quantities) * parseInt(e.target.myParamPrice);

          if (!updateTotalCart(newTotalCart)) {
            error &= true;
          }
        }
      }
    });
    if (!error) {
      localStorage.setItem("userCart".JSON.stringify(cart));
    } else {
      alert("An error occured while updating the cart!");
    }
  }
}

function getCartItems() {
  return getById("cart__items");
}

function getTotalCart() {
  return getById("totalPrice").textContent;
}

function updateTotalCart(newTotal) {
  if (0 > newTotal) {
    alert("An error occured while loading the cart, the total is not valid!");
    return false;
  } else {
    getById("totalPrice").textContent = newTotal;

    return true;
  }
}

function getTotalQty() {
  return getById("totalQuantity").textContent;
}

function updateTotalQty(newTotalQty) {
  if (0 > newTotalQty) {
    alert("An error occured while loading the cart, the total is not valid!");
    return false;
  } else {
    getById("totalQuantity").textContent = newTotalQty;
    return true;
  }
}

//retrieve form
function getElem(e) {
  e.preventDefault();
  let contact = {};
  const selectForm = document.forms[0];

  const firstName = selectForm.elements.firstName.value;
  if (checkData("firstName", firstName)) {
    return false;
  }
  contact.firstName = firstName;

  const lastName = selectForm.elements.lastName.value;
  if (checkData("lastName", lastName)) {
    return false;
  }
  contact.lastName = lastName;

  const address = selectForm.elements.address.value;
  if (checkData("address", address)) {
    return false;
  }
  contact.address = address;

  const city = selectForm.elements.city.value;
  if (checkData("city", city)) {
    return false;
  }
  contact.city = city;

  const email = selectForm.elements.email.value;
  if (checkData("email", email)) {
    return false;
  }
  contact.email = email;
}

//end

// }else{
//   box.style.display="none";
// }
// }

function insertAfter(el, referenceNode) {
  referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
}

function createElem(type) {
  return document.createElement(type);
}

function logDebug(cont) {
  if (DEBUG) {
    if ("undefined" === typeof cont) {
      const cont = "UNDEFINED";
    }
    console.log(cont);
  }
}

function getById(id) {
  return document.getElementById(id);
}

function getByClass(classe) {
  return document.getElementsByClassName(classe);
}

initPage();
