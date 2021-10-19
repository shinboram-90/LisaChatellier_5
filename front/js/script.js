const url = "http://localhost:3000/api/products";

// CREATING VARIABLES
const ITEMS = document.querySelector("#items");

// const appendAnchorTag = () => {
//   const anchor = document.createElement("a");
//   const article = document.createElement("article");
//   anchor.href = "./product.html?id=42";
//   article.appendChild(anchor);
// };

// CREATING VARIABLES

fetch(url).then((response) => {
  response.json().then((data) => {
    console.log(data);
    data.forEach((result) => {
      const products = `<a href="./product.html?id=${result._id}">
        <article>
        <img src="${result.imageUrl}" alt="${result.altTxt}">
        <h3>${result.name}</h3>
        <p>${result.description}</p>
        </article>
      </a>`;
      ITEMS.insertAdjacentHTML("beforeend", products);
    });
  });
});
