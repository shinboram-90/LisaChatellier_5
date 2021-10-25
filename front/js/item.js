// const url = "http://localhost:3000/api/products";
// const productId = new URLSearchParams(window.location.search).get("id");
// const productUrl = url + "/" + productId;

// fetch(productUrl).then((response) => {
//   response.json().then((data) => {
//     // display image
//     const img = document.createElement("img");
//     img.setAttribute("src", data.imageUrl);
//     img.setAttribute("alt", data.altTxt);
//     document.querySelector(".item__img").appendChild(img);

//     // display name
//     document.querySelector("#title").textContent = data.name;

//     // display price
//     document.querySelector("#price").textContent = data.price;

//     // display description
//     document.querySelector("#description").textContent = data.description;

//     // store id
//     // const kanapId = document.createElement("input");
//     // kanapId.setAttribute("type", "hidden");
//     // kanapId.setAttribute("id", "kanapId");
//     // kanapId.value = data._id;
//     // console.log(kanapId);

//     // display colors
//     const colors = data.colors;
//     for (let i = 0; i < colors.length; i++) {
//       // Create more options to display the colors
//       let opt = document.createElement("option");
//       opt.setAttribute("value", colors[i]);
//       opt.textContent = colors[i];
//       document.querySelector("#colors").appendChild(opt);
//     }
//   });
// });

// function addToCart() {
//   //get the product name
//   const kanapName = document.getElementById("title").innerText;

//   // WHY VALUE IS NULL???
//   // const kanapId = document.querySelector("#kanapId").value;
//   // console.log(kanapId);

//   // get the wanted quantity
//   const quantity = document.querySelector("#quantity").value;

//   // get the wanted color
//   const selectedColor = document.querySelector("#colors").value;

//   // create empty cart
//   let cart = [];
//   if(localStorage.getItem('cart')){
//     cart = JSON.parse(localStorage.getItem(cart));
//   }
//   let itemAlreadyAdded = cartUpdate()

//   // if (quantity < 1 || quantity > 100) {
//   //   alert("Hold on a sec, please select a number between 1 and 100");
//   // } else if (selectedColor == "") {
//   //   alert("Please choose a color!");
//   // } else {
//     {
//       let items = {
//         name: kanapName,
//         quantity: quantity,
//         color: selectedColor,
//         _id: productId,
//       };

//       // NEED TO CHECK IF THIS ITEM NOT ALREADY ADDED AT SOME POINT
//       if ((cart = [])) {
//         cart.push(items);
//         console.log(cart);
//         alert(
//           `You've just added ${items.quantity} ${items.name} in ${items.color} to your shopping cart!`
//         );
//       } else {
//         cart = JSON.parse(localStorage.getItem("cart"));
//         cart.forEach((element) => {
//           // console.log(element);
//           if (
//             element.color === items.color &&
//             element.id === items._id &&
//             element.quantity === items.quantity
//           ) {
//             alert("Seems like you already added this poduct to your cart");
//           } else {
//             cart += parseInt(item.quantities);
//             cart.push(items);
//             console.log(cart);
//           }
//         });
//       }
//     }
//   }

//   localStorage.setItem("items", JSON.stringify(cart));
//   // console.log(cart);
// }

// // function alreadyAdded(cart, items) {
// //   if cart

// // }

// const btnAddToCart = document.querySelector("#addToCart");
// btnAddToCart.addEventListener("click", (e) => {
//   e.preventDefault;
//   addToCart();
// });
