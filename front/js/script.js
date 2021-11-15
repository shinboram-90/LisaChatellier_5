async function load() {
  await fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((result) => {
        const items = document.getElementById("items");
        const anchor = document.createElement("a");
        items.appendChild(anchor);
        anchor.href = `./product.html?id=${result._id}`;

        const article = document.createElement("article");
        anchor.appendChild(article);

        const image = document.createElement("img");
        image.setAttribute("src", result.imageUrl);
        image.setAttribute("alt", result.altTxt);
        article.appendChild(image);

        const h3 = document.createElement("h3");
        h3.innerText = result.name;
        article.appendChild(h3);

        const p = document.createElement("p");
        p.innerText = result.description;
        article.appendChild(p);
      });
    });
}

load();
