function load() {
  const url = new URL(window.location.href);
  const myOrderId = url.searchParams.get("orderId");
  const orderId = document.getElementById("orderId");
  orderId.innerText = myOrderId;

  const thankMessage = document.createElement("span");
  thankMessage.innerText =
    "\n\nNous vous remercions pour vos achats et espérons vous revoir très prochainement chez KANAP !";
  orderId.appendChild(thankMessage);
  thankMessage.style.color = "#3498db";

  localStorage.clear();
}
load();
