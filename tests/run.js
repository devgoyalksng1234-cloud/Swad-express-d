// SWAAD EXPRESS CHECKS
// Run them with:  node tests/run.js
// GitHub runs this file for you on every change. No installs, no extra packages.
//
// Each check has a plain-English name. These are the "acceptance criteria" of the project:
// the site is only allowed to go live if every check passes.
//
// CR1 and CR2 checks start as "NOT BUILT YET" and are skipped (they do not fail).
// They switch on by themselves the moment you add the feature:
//   CR1 switches on when any dish gets a veg: true / veg: false field.
//   CR2 switches on when billSummary() returns a gst amount.

const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");
const MENU = require(path.join(root, "js/menu.js"));
const cart = require(path.join(root, "js/cart.js"));
const render = require(path.join(root, "js/render.js"));
const pay = require(path.join(root, "js/payment.js"));

const results = [];
function check(name, fn) {
  try {
    const problem = fn();            // a check returns nothing when fine, or a sentence describing the problem
    results.push(problem ? { name, status: "FAIL", message: problem } : { name, status: "PASS" });
  } catch (err) {
    results.push({ name, status: "FAIL", message: "The code crashed while running this check: " + err.message });
  }
}
function skip(name, message) { results.push({ name, status: "SKIP", message }); }
const money = (n) => "₹" + n.toFixed(2);
const round2 = (n) => Math.round(n * 100) / 100;

// ---------- Basic menu checks (always on) ----------

check("Every menu item has a name", () => {
  const bad = MENU.filter((i) => !i.name || !String(i.name).trim());
  if (bad.length) return `${bad.length} dish(es) have no name (ids: ${bad.map((i) => i.id).join(", ")}). Give every dish a name.`;
});

check("Every menu item has a price that starts with ₹", () => {
  const bad = MENU.filter((i) => !i.price || !String(i.price).startsWith("₹"));
  if (bad.length) {
    return bad.map((i) => `"${i.name}" has the price "${i.price}"`).join("; ") +
      `. Every price must start with the rupee sign ₹ (for example ₹299), not "Rs" or a plain number.`;
  }
});

check("Every price after the ₹ sign is a real number", () => {
  const bad = MENU.filter((i) => !/^₹\d+(\.\d{1,2})?$/.test(String(i.price)));
  if (bad.length) return bad.map((i) => `"${i.name}": "${i.price}"`).join("; ") + `. Use ₹ followed by digits only, like ₹249.`;
});

// ---------- Cart check (always on) ----------

check("The cart total equals the sum of the items", () => {
  const sample = { 1: 2, 4: 1, 8: 3 };           // 2 x Indori Thali, 1 x Chicken Biryani, 3 x Samosa
  const byHand = cart.priceValue(MENU[0].price) * 2 + cart.priceValue(MENU[3].price) * 1 + cart.priceValue(MENU[7].price) * 3;
  const total = cart.cartTotal(sample, MENU);
  const lines = cart.cartLines(sample, MENU).reduce((s, l) => s + l.lineTotal, 0);
  if (total !== byHand) return `The cart says ${money(total)} but adding the items by hand gives ${money(byHand)}.`;
  if (lines !== total) return `The lines add up to ${money(lines)} but the cart total says ${money(total)}.`;
});

// ---------- Payment check (always on) ----------

check("The payment screen offers UPI and card", () => {
  const html = render.renderPayment(pay.PAYMENT_METHODS, pay.PAYMENT_NOTE);
  const missing = [];
  if (!/UPI/i.test(html)) missing.push("UPI");
  if (!/Card/i.test(html)) missing.push("Card");
  if (missing.length) return `The payment screen does not offer: ${missing.join(" and ")}. Customers must be able to pay by UPI and by card.`;
});

// ---------- CR1: veg / non-veg tag (switches on when any dish has a veg field) ----------

const cr1Started = MENU.some((i) => Object.prototype.hasOwnProperty.call(i, "veg"));
if (!cr1Started) {
  const msg = "CR1 not built yet - skipped. It switches on when you add veg: true or veg: false to the menu items.";
  skip("CR1: every menu item has a veg or non-veg tag", msg);
  skip("CR1: every menu item shows a green or red dot on the menu screen", msg);
} else {
  check("CR1: every menu item has a veg or non-veg tag", () => {
    const bad = MENU.filter((i) => typeof i.veg !== "boolean");
    if (bad.length) return `These dishes have no veg/non-veg tag: ${bad.map((i) => '"' + i.name + '"').join(", ")}. Add veg: true or veg: false to each.`;
  });
  check("CR1: every menu item shows a green or red dot on the menu screen", () => {
    const bad = MENU.filter((i) => !/class="dot (veg|nonveg)"/.test(render.renderMenu([i])));
    if (bad.length) return `No green/red dot is shown for: ${bad.map((i) => '"' + i.name + '"').join(", ")}.`;
  });
}

// ---------- CR2: GST line on the bill (switches on when billSummary returns a gst amount) ----------

const gstCart = { 1: 2, 4: 1 };                                   // 2 x Indori Thali + 1 x Chicken Biryani
const bill = cart.billSummary(gstCart, MENU);
const cr2Started = typeof bill.gst !== "undefined";
if (!cr2Started) {
  const msg = "CR2 not built yet - skipped. It switches on when billSummary() returns a gst amount.";
  skip("CR2: GST is 5% of the food total", msg);
  skip("CR2: GST is shown on its own line on the bill", msg);
  skip("CR2: grand total = food total + GST", msg);
} else {
  const food = cart.cartTotal(gstCart, MENU);
  const rightGst = round2(food * 0.05);
  check("CR2: GST is 5% of the food total", () => {
    if (typeof bill.gst !== "number" || Math.abs(bill.gst - rightGst) > 0.011) {
      const rate = food ? round2((bill.gst / food) * 100) : 0;
      return `On a food total of ${money(food)}, GST should be 5% = ${money(rightGst)}, but the bill shows ${money(Number(bill.gst))}` +
        (isFinite(rate) ? ` (that is ${rate}%)` : "") + `. Restaurant GST is 5%.`;
    }
  });
  check("CR2: GST is shown on its own line on the bill", () => {
    const html = render.renderBill(bill);
    const lines = (html.match(/<div class="bill-line[^"]*">.*?<\/div>/g) || []);
    const gstLine = lines.find((l) => /GST/.test(l));
    if (!gstLine) return `The bill has no separate line that says GST. Add a "GST" line between the food total and the grand total.`;
    if (!gstLine.includes(money(Number(bill.gst)))) return `The GST line does not show the GST amount ${money(Number(bill.gst))}.`;
  });
  check("CR2: grand total = food total + GST", () => {
    const expected = round2(bill.food + bill.gst);
    if (Math.abs(bill.total - expected) > 0.011) {
      return `Grand total is ${money(Number(bill.total))} but food ${money(bill.food)} + GST ${money(Number(bill.gst))} = ${money(expected)}.`;
    }
  });
}

// ---------- Report ----------

const icon = { PASS: "PASS", FAIL: "FAIL", SKIP: "SKIP" };
console.log("\nSWAAD EXPRESS CHECKS\n");
results.forEach((r) => {
  console.log(`  ${icon[r.status]}  ${r.name}`);
  if (r.message) console.log(`        ${r.status === "FAIL" ? "Problem: " : ""}${r.message}`);
});
const n = (s) => results.filter((r) => r.status === s).length;
console.log(`\n${n("PASS")} passed, ${n("FAIL")} failed, ${n("SKIP")} waiting (not built yet)\n`);

if (process.env.GITHUB_ACTIONS) {
  results.filter((r) => r.status === "FAIL").forEach((r) => console.log(`::error title=${r.name}::${r.message}`));
}
if (process.env.GITHUB_STEP_SUMMARY) {
  const rows = results.map((r) => `| ${r.status === "PASS" ? "✅ PASS" : r.status === "FAIL" ? "❌ FAIL" : "⏭ WAITING"} | ${r.name} | ${r.message || ""} |`);
  fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY,
    `## Swaad Express checks\n\n| Result | Check | Message |\n|---|---|---|\n${rows.join("\n")}\n\n**${n("PASS")} passed, ${n("FAIL")} failed, ${n("SKIP")} waiting**\n`);
}
process.exit(n("FAIL") ? 1 : 0);
