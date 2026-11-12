// SWAAD EXPRESS CART AND BILL LOGIC
// The cart is a plain object: { dishId: quantity }.

const MAX_PER_DISH = 99;   // F2 will lower this to 10 (kitchen capacity)

// "₹249" -> 249
function priceValue(price) {
  return Number(String(price).replace(/[^0-9.]/g, "")) || 0;
}

function addToCart(cart, id) {
  const qty = cart[id] || 0;
  if (qty < MAX_PER_DISH) cart[id] = qty + 1;
  return cart;
}

function changeQty(cart, id, delta) {
  const qty = (cart[id] || 0) + delta;
  if (qty <= 0) delete cart[id];
  else if (qty <= MAX_PER_DISH) cart[id] = qty;
  return cart;
}

// Turns the cart into rows: dish, quantity, line total.
function cartLines(cart, menu) {
  return menu
    .filter((item) => cart[item.id])
    .map((item) => ({ item, qty: cart[item.id], lineTotal: priceValue(item.price) * cart[item.id] }));
}
function cartTotal(cart, menu) {
  let total = 0;
  for (const item of menu) {
    const qty = cart[item.id] || 0;
    total += qty * priceValue(item.price);
  }
  return total;
}


// The bill. For now: food total only. (CR2 adds GST to this function.)
function billSummary(cart, menu) {
  const food = cartTotal(cart, menu);
  return { food: food, total: food };
}

if (typeof module !== "undefined") {
  module.exports = { MAX_PER_DISH, priceValue, addToCart, changeQty, cartLines, cartTotal, billSummary };
}
