---
name: "CR2 · Change request: GST line on the bill (8 pts)"
about: Swaad Express work card
title: "CR2 · Change request: GST line on the bill (8 pts)"
---
**Asked by:** the CFO (Neha).
**Story:** As the CFO, I want the bill to show restaurant GST of 5% on its own line, so that every invoice is tax-correct.

**Acceptance**
- Given a cart with a food total of ₹827, When I open the bill, Then I see three separate lines: Food total ₹827.00, GST (5%) ₹41.35, Grand total ₹868.35.
- Given any cart, When the bill is built, Then GST = 5% of the food total and Grand total = food total + GST.

**Where:** `js/cart.js`, the function `billSummary`. It must return these named values: `food`, `gstRate` (0.05 means 5%), `gst` and `total`. The bill screen in `js/render.js` already knows how to show the GST line.
**Check that guards it:** "CR2: GST is 5% of the food total", "...shown on its own line" and "grand total = food total + GST".
**Safety rule (AI SOP):** this touches prices, so a person must review the AI's code before it is released.
