---
name: "CR1 · Change request: veg / non-veg tag (5 pts)"
about: Swaad Express work card
title: "CR1 · Change request: veg / non-veg tag (5 pts)"
---
**Asked by:** Marketing (Ritu), mid-sprint.
**Story:** As a customer, I want a green dot next to vegetarian dishes and a red dot next to non-vegetarian dishes, so that I can choose food that suits me at a glance.

**Acceptance**
- Given the menu is open, When I look at any dish, Then I see a green dot if it is vegetarian or a red dot if it is not.
- Given every dish on the menu, When the check runs, Then no dish is missing its veg or non-veg tag.

**Where:** `js/menu.js` (every dish gets `veg: true` or `veg: false`). The dot itself is already drawn by `js/render.js`.
**Check that guards it:** "CR1: every menu item has a veg or non-veg tag" (and "...shows a green or red dot").
