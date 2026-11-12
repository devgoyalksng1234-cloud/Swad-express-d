# Swaad Express · ordering site (practice project)

A small, plain website for the fictional restaurant chain Swaad Express (Project Tadka). It is the practice project for **AIP³ Phase 2, Day 2: Run it**. Nobody needs to install anything: you work in the browser on github.com.

## What is in here

| Part | What it is |
|---|---|
| `index.html`, `css/`, `js/` | The website: menu, cart, bill and payment screens |
| `js/menu.js` | The menu data: one line per dish (name, price in ₹) |
| `js/cart.js` | The cart and the bill |
| `js/payment.js` | The payment options (UPI and card) |
| `tests/run.js` | The **checks**: ten plain-English rules the site must obey (the acceptance criteria) |
| `.github/workflows/checks.yml` | The **factory line**: GitHub runs the checks on every change, and publishes the site only if they all pass |
| `cards.md` and `.github/ISSUE_TEMPLATE/` | The work cards F1, F2, F3, CR1, CR2 (Issues > New issue) |
| `demo/` | Snippets used in the teacher's live demo |
| `TEACHER_SETUP.md` | For the teacher only |

## The checks

1. Every menu item has a name
2. Every menu item has a price that starts with ₹
3. Every price after the ₹ sign is a real number
4. The cart total equals the sum of the items
5. The payment screen offers UPI and card
6. **CR1** every menu item has a veg or non-veg tag, and shows a green or red dot
7. **CR2** GST is 5% of the food total, shown on its own line, and grand total = food total + GST

CR1 and CR2 checks say **SKIP ... not built yet** in the log (**WAITING** in the summary table) and do not fail until you build the feature. They switch on by themselves: CR1 as soon as any dish has a `veg:` field, CR2 as soon as the bill includes a `gst` amount. This is the simplest option for students (no file to enable). Once switched on, they must pass.

You can also run the checks on a computer that has Node.js: `node tests/run.js`. Students never need to.

## Reading a result

- Green tick: every check passed.
- Red cross: at least one check failed. Click **Details** and read the line that starts with `FAIL`. It says what is wrong in plain English.
- The site goes live (GitHub Pages) only when the checks pass on the `main` branch.

Everything here is fictional practice material. No real orders or payments happen.
