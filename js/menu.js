// SWAAD EXPRESS MENU DATA
// One line per dish. Fields: id, category, name, emoji (stands in for the photo), price.
// RULE 1: every price is text that starts with the rupee sign, for example "₹249".
// (CR1 later adds one more field to every dish: veg: true or veg: false.)
const MENU = [
  { id: 1,  category: "Thali",    name: "Indori Veg Thali",      emoji: "🍛", price: "₹249" },
  { id: 2,  category: "Thali",    name: "Maharaja Thali",        emoji: "🍽️", price: "₹349" },
  { id: 3,  category: "Thali",    name: "Kadhai Paneer Thali",   emoji: "🍛", price: "₹279" },
  { id: 4,  category: "Biryani",  name: "Chicken Biryani",       emoji: "🍚", price: "₹329" },
  { id: 5,  category: "Biryani",  name: "Veg Dum Biryani",       emoji: "🍚", price: "₹279" },
  { id: 6,  category: "Biryani",  name: "Mutton Biryani",        emoji: "🍖", price: "₹429" },
  { id: 7,  category: "Snacks",   name: "Poha Jalebi Combo",     emoji: "🥣", price: "₹99"  },
  { id: 8,  category: "Snacks",   name: "Samosa (2 pcs)",        emoji: "🥟", price: "₹60"  },
  { id: 9,  category: "Snacks",   name: "Chicken Seekh Kebab",   emoji: "🍢", price: "₹259" },
  { id: 10, category: "Snacks",   name: "Paneer Tikka",          emoji: "🧀", price: "₹229" },
  { id: 11, category: "Sweets & Drinks", name: "Gulab Jamun (2 pcs)", emoji: "🍮", price: "₹80" },
  { id: 12, category: "Sweets & Drinks", name: "Masala Chaas",   emoji: "🥛", price: "₹50"  },
  { id: 13, category: "Thali",    name: "Dal Bati Churma",       emoji: "🍛", price: "₹299" }
];

if (typeof module !== "undefined") module.exports = MENU;
