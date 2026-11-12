---
name: "F1 · Digital menu: add Dal Bati Churma (21 pts)"
about: Swaad Express work card
title: "F1 · Digital menu: add Dal Bati Churma (21 pts)"
---
**Story:** As a hungry customer in Indore, I want to see Dal Bati Churma on the menu with a picture, a name and a price in ₹, so that I can order it.

**Acceptance (Given / When / Then)**
- Given I open the menu, When I look under Thali, Then I see "Dal Bati Churma" with a picture and the price ₹299.
- Given any dish on the menu, When I read its price, Then it starts with ₹.

**Where:** `js/menu.js` (one new line in the menu list).
**Done when:** the "checks" run shows a green tick, and the live site shows the dish.
