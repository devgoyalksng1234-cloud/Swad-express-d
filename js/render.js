// SWAAD EXPRESS SCREEN BUILDERS
// Each function returns the HTML for one screen. app.js puts it on the page;
// the checks in tests/ read the same HTML, so what the checks see is what customers see.

function rupees(n) {
  return "₹" + Number(n).toFixed(2);
}

// The green or red dot. It appears only when a dish has veg: true or veg: false (CR1).
function vegDot(item) {
  if (item.veg === true) return '<span class="dot veg" title="Vegetarian"></span>';
  if (item.veg === false) return '<span class="dot nonveg" title="Non-vegetarian"></span>';
  return "";
}

function renderMenu(menu) {
  const groups = {};
  menu.forEach((item) => { (groups[item.category] = groups[item.category] || []).push(item); });
  return Object.keys(groups).map((cat) =>
    `<h2 class="cat">${cat}</h2>` +
    groups[cat].map((item) =>
      `<article class="dish">` +
        `<div class="photo">${item.emoji || "🍽️"}</div>` +
        `<div class="info"><h3>${vegDot(item)}${item.name}</h3><p class="price">${item.price}</p></div>` +
        `<button class="add" data-add="${item.id}">Add</button>` +
      `</article>`).join("")
  ).join("");
}

function renderCart(lines) {
  if (!lines.length) return '<p class="empty">Your cart is empty. Add a dish from the menu.</p>';
  return lines.map((l) =>
    `<div class="cart-row"><div class="cart-name">${l.item.name}<small>${l.item.price} each</small></div>` +
    `<div class="qty"><button data-minus="${l.item.id}" aria-label="One less">-</button><span>${l.qty}</span>` +
    `<button data-plus="${l.item.id}" aria-label="One more">+</button></div>` +
    `<div class="line-total">${rupees(l.lineTotal)}</div></div>`).join("");
}

// The bill. A GST line appears as soon as the bill numbers include one (CR2).
function renderBill(summary) {
  let html = `<div class="bill-line"><span>Food total</span><span>${rupees(summary.food)}</span></div>`;
  if (typeof summary.gst === "number") {
    const pct = typeof summary.gstRate === "number" ? Math.round(summary.gstRate * 10000) / 100 : 5;
    html += `<div class="bill-line gst"><span>GST (${pct}%)</span><span>${rupees(summary.gst)}</span></div>`;
  }
  html += `<div class="bill-line grand"><span>Grand total</span><span>${rupees(summary.total)}</span></div>`;
  return html;
}

function renderPayment(methods, note) {
  return methods.map((m, i) =>
    `<label class="pay-option"><input type="radio" name="pay" value="${m.id}"${i === 0 ? " checked" : ""}>` +
    `<span><strong>${m.label}</strong><small>${m.hint}</small></span></label>`).join("") +
    (note ? `<p class="pay-note">${note}</p>` : "");
}

if (typeof module !== "undefined") module.exports = { rupees, vegDot, renderMenu, renderCart, renderBill, renderPayment };
