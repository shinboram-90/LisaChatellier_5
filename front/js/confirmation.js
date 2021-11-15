function load() {
  const url = new URL(window.location.href);
  const myOrderId = url.searchParams.get("orderId");
  const orderId = document.getElementById("orderId");
  orderId.innerText = myOrderId;
  console.log(orderId);
  localStorage.clear();
}
load();
