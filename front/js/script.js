// send request using fetch API
function req() {
  fetch("http://localhost:3000/api/products").then((response) => {
    response
      .json()
      .then((data) => {
        display(data);
      })

      // action to take if an error occurs
      .catch((error) => {
        console.log(error);
      });
  });
}

/**
 * Display all the data, iteration over the array
 * @param { Object[] } data
 */
function display(data) {
  data.forEach((kanap) => {
    const items = document.getElementById("items");
    const anchor = document.createElement("a");
    items.appendChild(anchor);
    anchor.href = `./product.html?id=${kanap._id}`;

    const article = document.createElement("article");
    anchor.appendChild(article);

    const image = document.createElement("img");
    image.setAttribute("src", kanap.imageUrl);
    image.setAttribute("alt", kanap.altTxt);
    article.appendChild(image);

    const h3 = document.createElement("h3");
    h3.innerText = kanap.name;
    article.appendChild(h3);

    const p = document.createElement("p");
    p.innerText = kanap.description;
    article.appendChild(p);
  });
}

// ensuring DOM is loaded before we can manipulate it
window.onload = function () {
  console.log("DOM is loaded");
  req();
};
