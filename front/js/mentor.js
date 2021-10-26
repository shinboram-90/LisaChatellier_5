// const DEBUG = true;

// function initPage() {
//   const idProduct = new URLSearchParams(window.location.search).get("id");
//   logDebug(idProduct);
//   getProduct(idProduct);
// }

// async function getProduct(idProduct) {
//   try {
//     let res = await retrieveContent(idProduct);
//     if ("undefined" === typeof res.error) {
//       logDebug(res);
//       displayProduct(res);
//     } else {
//       alert("not good");
//     }
//   } catch (error) {
//     logDebug(error);
//     alert("troubles");
//   }
// }

// async function retrieve(idProduct) {
//   if ("undefined" !== typeof idProduct) {
//     try {
//       const response = await fetch(url + "/" + idProduct);

//       logDebug(response);

//       if (response.ok) {
//         return response.json();
//       }
//     } catch (e) {
//       return { error: true, msg: e };
//     }
//   }
//   return { error: true, msg: "Product undefined" };
// }

// function displayProduct(res) {
//   res.colors.forEach((color) => {
//     let opt = new Option(color, color);
//     getById("colors").append(opt);
//   });

//   let img = createElem("img");
//   img.setAttribute("src", res.imageUrl);
//   img.setAttribute("alt", res.altTxt);
//   img.setAttribute("class", "img-fluid");

//   getByClass("item_img")[0].appendChild(img);

//   getById("title").textContent = res.name;

//   getById("description").textContent = res.description;

//   getById("price").textContent = res.price;

//   let hid = createElem("input");
//   hid.setAttribute("type", "hidden");
//   hid.setAttribute("id", "hid");
//   hid.value = res._id;

//   getById("price").appendChild(hid);

//   bindIt();
// }

// function bindIt() {
//   const button = getById("addToCart");
//   button.addEventListener("click", () => {
//     add();
//   });
// }

// function add() {
//   const quantity = getById("quantity").value;

//   let selectOPt = getById("colors");
//   const opt = selectOpt.options[selectOpt.selectedIndex].value;

//   if (checkQuant(quantity) && checkSelected(opt)) {
//     const but = getById("addToCart");
//     but.disabled = true;

//     let cart = getValue();
//     if (cart.length !== 0) {
//       alert("The product has successfully been added to your cart");
//     } else {
//       alert("An error occured while adding the product to cart");
//     }
//   }
//   return false;
// }

// function checkSelected() {
//   if (!selected) {
//     alert("you must choose an option");
//     return false;
//   }
//   return selected;
// }

// function checkQuant(quant) {
//   if (
//     "undefined" === typedof(quant) ||
//     0 >= parseInt(quant) ||
//     100 < parseInte(quant)
//   ) {
//     alert("You must enter a valide number between 1 and 100");
//     return false;
//   }
//   return quant;
// }

// function getValue() {
//   const _ID = getById("hid").value;
//   const selectOpt = getById("colors");
//   const selected = selectOpt.options[selectOpt.selectedIndex].value;
//   const quantities = getById("quantity").value;

//   let prod = {
//     _id: _ID,
//     quantities: quantities,
//     options: selected,
//   };

//   return stockCart(prod);
// }

// function stockCart(prod) {
//   // logDebug(prod);

//   let cart;
//   if (!localStorage.getItem("userCart")) {
//     cart = [];
//     cart.push(prod);
//   } else {
//     cart = JSON.parse(localStorage.getItem("userCart"));
//     let exists = alreadyInCart(cart, prod);

//     if (false !== exists) {
//       cart[exists].quantities += parseInt(prod.quantities);
//     } else {
//       cart.push(prod);
//     }
//   }

//   localStorage.setItem("userCart", JSON.stringify(cart));
// }
// // logDebug(cart);

// return cart;

// function alreadyInCart(cart, prod) {
//   let control = false;

//   cart.forEach((elem, item) => {
//     if (elem._id == prod._id && elem.options == prod.options) {
//       control = item;
//     }
//   });
//   return control;
// }

// // <-----------TOOLS ----------->

// // function displayAlarm(content, type) {
// //   let box = createElem("p");
// //   box.setAttribute("id", "alarm");
// //   box.style.backgroundColor = type;
// //   box.style.opactiy = 1;
// //   box.style.textAlign = "center";
// //   box.textContent = content;
// //   const but = getByClass("item__content__addButton")[0];
// //   insertAfter(box, but);
// //   const bat = getById("addToCart");
// //   bat.disabled = false;
// //   fade();
// // }

// // function fade() {
// //   let box = getById("alarm");
// //   if (box.style.opacity > 0) {
// //     setTimeout(function () {
// //       box.style.opacity -= 0.1;
// //       fade();
// //     }, 200);
// //   } else {
// //     box.style.display = "none";
// //   }
// // }

// // function logDebug(cont) {
// //   if (DEBUG) {
// //     if ("undefined" === typeof cont) {
// //       let cont = "UNDEFINED";
// //     }
// //     console.log(cont);
// //   }
// // }

// initPage();

// <-------------------- NEXT ----------------->
// const url = "http://localhost:3000/api/products";
// const DEBUG = true;
// // REGEX
// const checkNumber = /[0-9]/;
// const checkMail = /^\W+([\.-]?W+)*@\W+([\.-]?\W+)*(\.\W2,3})+$/;
// const checkSpecialCharacter = /[§!@#$%^&*(),.?":{}|<>]/;

// function initPage() {
//   const params = new URLSearchParams(window.location.search);
//   if (null != params.get("orderId")) {
//     const elem = getById("orderId");
//     elem.textContent = params.get("orderId");
//     return false;
//   }

//   bindIt();
//   const cart = getCart();
//   if (!cart || cart.length == 0) {
//     alert("Cart is empty!");
//   } else {
//     const detail = loadDetailProd(cart);
//   }
// }

// async function loadDetailProd(cart) {
//   let detailProd = [];
//   for (let i in cart) {
//     const detail = await retrieveContent(cart[i]._id);
//     detail.quantities = cart[i].quantities;
//     detail.options = cart[i].options;

//     detailProd.push(detail);
//   }

//   logDebug(detailProd);

//   let totPrice = 0;
//   let totQuant = 0;

//   const cartItems = getCartItems();
//   if (null === cartItems) {
//     alert("An error occured while displaying the cart!");
//     return false;
//   }
// }

// function change(e) {
//   const newQuant = parseInt(e.target.value); //getByClass('itemQuantity')[0].value;
//   if (newQuant < 1) {
//     alert("You must choose a positive quantity");
//     e.target.value = 1;
//   } else {
//     cart = JSON.parse(localStorage.getItem("userCart"));
//     let error = false;
//     cart.forEach((elem, index) => {
//       if (
//         elem._id === e.target.myParamId &&
//         elem.options === e.target.myParamOpt
//       ) {
//         let oldQuant = elem.quantities;
//         let oldGlobal = getTotalQty();
//         letNewGlobal = parseInt(oldGlobal) - parseInt(oldQuant) + newQuant;

//         if (!updateTotalQty(newGlobal)) {
//           error &= true;
//         } else {
//           elem.quantities = newQuant;
//         }

//         if (!error) {
//           let oldPrice = getTotalCart();
//           let NewOldPrice =
//             parseInt(oldPrice) -
//             parseInt(e.target.myParamPrice) * parseInt(oldQuant);

//           let newTotalCart =
//             NewOldPrice +
//             parseInt(elem.quantities) * parseInt(e.target.myParamPrice);

//           if (!updateTotalCart(newTotalCart)) {
//             error &= true;
//           }
//         }
//       }
//     });
//     if (!error) {
//       localStorage.setItem("userCart".JSON.stringify(cart));
//     } else {
//       alert("An error occured while updating the cart!");
//     }
//   }
// }

// function getCartItems() {
//   return getById("cart__items");
// }

// function getTotalCart() {
//   return getById("totalPrice").textContent;
// }

// function updateTotalCart(newTotal) {
//   if (0 > newTotal) {
//     alert("An error occured while loading the cart, the total is not valid!");
//     return false;
//   } else {
//     getById("totalPrice").textContent = newTotal;

//     return true;
//   }
// }

// function getTotalQty() {
//   return getById("totalQuantity").textContent;
// }

// function updateTotalQty(newTotalQty) {
//   if (0 > newTotalQty) {
//     alert("An error occured while loading the cart, the total is not valid!");
//     return false;
//   } else {
//     getById("totalQuantity").textContent = newTotalQty;
//     return true;
//   }
// }

// //retrieve form
// function getElem(e) {
//   e.preventDefault();
//   let contact = {};
//   const selectForm = document.forms[0];

//   const firstName = selectForm.elements.firstName.value;
//   if (checkData("firstName", firstName)) {
//     return false;
//   }
//   contact.firstName = firstName;

//   const lastName = selectForm.elements.lastName.value;
//   if (checkData("lastName", lastName)) {
//     return false;
//   }
//   contact.lastName = lastName;

//   const address = selectForm.elements.address.value;
//   if (checkData("address", address)) {
//     return false;
//   }
//   contact.address = address;

//   const city = selectForm.elements.city.value;
//   if (checkData("city", city)) {
//     return false;
//   }
//   contact.city = city;

//   const email = selectForm.elements.email.value;
//   if (checkData("email", email)) {
//     return false;
//   }
//   contact.email = email;
// }

// //end

// // }else{
// //   box.style.display="none";
// // }
// // }

// function insertAfter(el, referenceNode) {
//   referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
// }

// function createElem(type) {
//   return document.createElement(type);
// }

// function logDebug(cont) {
//   if (DEBUG) {
//     if ("undefined" === typeof cont) {
//       const cont = "UNDEFINED";
//     }
//     console.log(cont);
//   }
// }

// function getById(id) {
//   return document.getElementById(id);
// }

// function getByClass(classe) {
//   return document.getElementsByClassName(classe);
// }

// initPage();
