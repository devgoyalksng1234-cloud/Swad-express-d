# Swaad Express work cards

Each card is one small, simplified slice of a feature. Points shown (pts) are the size of the WHOLE feature or change request
from the project backlog (story points = the team's relative size estimate: 1 is tiny, 13 is big).
In GitHub: Issues > New issue > pick a card. The same text is in `.github/ISSUE_TEMPLATE/`.

---

## F1 · Digital menu: add Dal Bati Churma (21 pts)
**Story:** As a hungry customer in Indore, I want to see Dal Bati Churma on the menu with a picture, a name and a price in ₹, so that I can order it.

**Acceptance (Given / When / Then)**
- Given I open the menu, When I look under Thali, Then I see "Dal Bati Churma" with a picture and the price ₹299.
- Given any dish on the menu, When I read its price, Then it starts with ₹.

**Where:** `js/menu.js` (one new line in the menu list).
**Done when:** the "checks" run shows a green tick, and the live site shows the dish.

---

## F2 · Cart and checkout: at most 10 portions of a dish (26 pts)
**Story:** As the Head of Operations, I want customers to be unable to order more than 10 portions of one dish, so that a single order cannot overload a kitchen at rush hour.

**Acceptance**
- Given I have 10 portions of a dish in the cart, When I press +, Then the quantity stays at 10.
- Given any cart, When I read the bill, Then the food total equals the sum of its lines.

**Where:** `js/cart.js` (one number near the top).
**Done when:** green tick, and on the live site the + button stops at 10.

---

## F3 · Online payment: PayKaro reassurance line (34 pts)
**Story:** As a customer paying online, I want to see that my payment is processed by a trusted partner, so that I feel safe paying.

**Acceptance**
- Given I am on the payment screen, When it opens, Then I can choose UPI or Card.
- Given I am on the payment screen, When I read below the options, Then I see "Payments are processed securely by PayKaro."

**Where:** `js/payment.js` (one line near the top).
**Done when:** green tick, and the live site shows UPI, Card and the note.

---

## CR1 · Change request: veg / non-veg tag (5 pts)
**Asked by:** Marketing (Ritu), mid-sprint.
**Story:** As a customer, I want a green dot next to vegetarian dishes and a red dot next to non-vegetarian dishes, so that I can choose food that suits me at a glance.

**Acceptance**
- Given the menu is open, When I look at any dish, Then I see a green dot if it is vegetarian or a red dot if it is not.
- Given every dish on the menu, When the check runs, Then no dish is missing its veg or non-veg tag.

**Where:** `js/menu.js` (every dish gets `veg: true` or `veg: false`). The dot itself is already drawn by `js/render.js`.
**Check that guards it:** "CR1: every menu item has a veg or non-veg tag" (and "...shows a green or red dot").

---

## CR2 · Change request: GST line on the bill (8 pts)
**Asked by:** the CFO (Neha).
**Story:** As the CFO, I want the bill to show restaurant GST of 5% on its own line, so that every invoice is tax-correct.

**Acceptance**
- Given a cart with a food total of ₹827, When I open the bill, Then I see three separate lines: Food total ₹827.00, GST (5%) ₹41.35, Grand total ₹868.35.
- Given any cart, When the bill is built, Then GST = 5% of the food total and Grand total = food total + GST.

**Where:** `js/cart.js`, the function `billSummary`. It must return these named values: `food`, `gstRate` (0.05 means 5%), `gst` and `total`. The bill screen in `js/render.js` already knows how to show the GST line.
**Check that guards it:** "CR2: GST is 5% of the food total", "...shown on its own line" and "grand total = food total + GST".
**Safety rule (AI SOP):** this touches prices, so a person must review the AI's code before it is released.
