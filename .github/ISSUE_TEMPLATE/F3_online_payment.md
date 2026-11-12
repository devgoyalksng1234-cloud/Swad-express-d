---
name: "F3 · Online payment: PayKaro reassurance line (34 pts)"
about: Swaad Express work card
title: "F3 · Online payment: PayKaro reassurance line (34 pts)"
---
**Story:** As a customer paying online, I want to see that my payment is processed by a trusted partner, so that I feel safe paying.

**Acceptance**
- Given I am on the payment screen, When it opens, Then I can choose UPI or Card.
- Given I am on the payment screen, When I read below the options, Then I see "Payments are processed securely by PayKaro."

**Where:** `js/payment.js` (one line near the top).
**Done when:** green tick, and the live site shows UPI, Card and the note.
