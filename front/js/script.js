const request = async () => {
  try {
    // await response of fetch call
    const response = await fetch("http://localhost:3000/api/products");
    // only proceed once promise is resolved
    const data = await response.json();
    // only proceed once second promise is resolved
    return data;
  } catch (e) {
    console.error(e);
  }
};

// trigger async function
// log response or catch error of fetch promise
request().then((data) =>
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
  })
);
// .catch((error) => console.error(error));

//The await keyword is used in an async function to ensure that all promises returned in the async function are synchronized, ie. they wait for each other. Await eliminates the use of callbacks in .then() and .catch(). In using async and await, async is prepended when returning a promise, await is prepended when calling a promise. try and catch are also used to get the rejection value of an async function.
