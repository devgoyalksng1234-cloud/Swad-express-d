// SWAAD EXPRESS PAGE WIRING (runs in the browser only; you rarely need to touch this file)
(function () {
  const cart = {};
  const $ = (id) => document.getElementById(id);
  const screens = ["menu", "cart", "bill", "pay", "done"];

  function show(name) {
    screens.forEach((s) => $("screen-" + s).classList.toggle("active", s === name));
    window.scrollTo(0, 0);
    refresh();
  }

  function refresh() {
    const lines = cartLines(cart, MENU);
    const count = lines.reduce((n, l) => n + l.qty, 0);
    $("cart-count").textContent = count;
    $("cart-bar-total").textContent = rupees(cartTotal(cart, MENU));
    $("cart-bar").classList.toggle("hidden", count === 0 || !$("screen-menu").classList.contains("active"));
    $("cart-list").innerHTML = renderCart(lines);
    $("to-bill").disabled = count === 0;
    $("bill-box").innerHTML = renderBill(billSummary(cart, MENU));
    $("pay-total").textContent = rupees(billSummary(cart, MENU).total);
  }

  $("menu-list").innerHTML = renderMenu(MENU);
  $("pay-list").innerHTML = renderPayment(PAYMENT_METHODS, PAYMENT_NOTE);

  document.addEventListener("click", (e) => {
    const t = e.target;
    if (t.dataset.add) { addToCart(cart, Number(t.dataset.add)); refresh(); }
    if (t.dataset.plus) { changeQty(cart, Number(t.dataset.plus), 1); refresh(); }
    if (t.dataset.minus) { changeQty(cart, Number(t.dataset.minus), -1); refresh(); }
    if (t.dataset.go) show(t.dataset.go);
  });
  $("pay-now").addEventListener("click", () => { Object.keys(cart).forEach((k) => delete cart[k]); show("done"); });
  show("menu");
})();
