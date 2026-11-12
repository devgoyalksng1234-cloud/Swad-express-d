---
name: "F2 · Cart and checkout: at most 10 portions of a dish (26 pts)"
about: Swaad Express work card
title: "F2 · Cart and checkout: at most 10 portions of a dish (26 pts)"
---
**Story:** As the Head of Operations, I want customers to be unable to order more than 10 portions of one dish, so that a single order cannot overload a kitchen at rush hour.

**Acceptance**
- Given I have 10 portions of a dish in the cart, When I press +, Then the quantity stays at 10.
- Given any cart, When I read the bill, Then the food total equals the sum of its lines.

**Where:** `js/cart.js` (one number near the top).
**Done when:** green tick, and on the live site the + button stops at 10.
