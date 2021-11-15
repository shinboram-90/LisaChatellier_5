const url = new URL(window.location.href);

console.log(url);

const myOrderId = url.searchParams.get("orderId");
console.log(myOrderId);

const orderId = document.getElementById("orderId");
orderId.innerText = myOrderId;

// localStorage.clear();
