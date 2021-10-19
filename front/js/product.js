const itemTitle = document.querySelector("#title");

const itemColor = document.querySelector("#color");

const url = "http://localhost:3000/api/products";

const productId = new URLSearchParams(window.location.search).get("id");

const response = url + "/" + productId;

fetch(response).then((res) => {
  res.json().then((data) => {
    const newImg = data.imageUrl;
    const img = document.createElement("img");
    img.setAttribute("src", newImg);
    const itemImg = document.querySelector(".item__img").appendChild(img);

    const itemTitle = document.querySelector("#title");
    itemTitle.textContent = data.name;
    const itemPrice = document.querySelector("#price");
    itemPrice.textContent = data.price;

    const itemDescription = document.querySelector("#description");
    itemDescription.textContent = data.description;
  });
});

// NOT MY BLOODY CODE

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

// // BETWEEN
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
//   const quanty = getById("quantity").value;

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

// function checkSelected {
//   if (!selected) {
//     alert('you must choose an option');
//     return false;
//   }
//   return selected;
// }

// function checkQuant(quant) {
//   if('undefined' === typedof(quant) || 0>=parseInt(quant) || 100 < parseInte(quant)) {
//     alert('You must enter a valide number between 1 and 100');
//     return false;
//   }
//   return quant;
// }

// function getValue() {
//   const _ID = getById('hid').value;
//   const selectOpt = getById('colors');
//   const selected = selectOpt.options[selectOpt.selectedIndex].value;
//   const quantities = getById('quantity').value;

//   let prod = {
//     _id : _ID,
//     quantities : quantities,
//     options: selected
//   };

//   return stockCart(prod);
// }

// function stockCart(prod);
// logDebug(prod);

// let cart;
// if (!localStorage.getItem('userCart')){
//   cart = [];
//   cart.push(prod);
// } else {
//   cart = JSON.parse(localStorage.getItem('userCart'));
//   let exists = alreadyInCart(cart, prod);

//   if(false !== exists) {
//     cart[exists].quantities+= parseInt(prod.quantities);
//   } else {
//     cart.push(prod);
//   }
// }

// localStorage.setItem('userCart', JSON.stringify(cart));

// logDebug(cart);

// return cart;

// function alreadyInCart(cart, prod) {
//   let control = false;

//   cart.forEach((elem, item) => {
//     if(elem._id == prod._id && elem.options == prod.options) {
//       control = item;
//     }
//   });
//   return control;
// }

// // END

// function logDebug(cont) {
//   if (DEBUG) {
//     if ("undefined" === typeof cont) {
//       let cont = "UNDEFINED";
//     }
//     console.log(cont);
//   }
// }

// initPage();
